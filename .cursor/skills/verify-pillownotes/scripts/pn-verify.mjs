#!/usr/bin/env node
// PillowNotes verification harness. Launch, doctor, drive, and clean up
// one isolated static server plus one headless Chrome profile.
import { spawn, execFileSync } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import process from "node:process";

const VIEWPORT = { width: 390, height: 844, deviceScaleFactor: 1, mobile: true };
const ROOT_FILES = ["index.html", "app.js", "styles.css"];

function repoRoot() {
  let dir = path.dirname(new URL(import.meta.url).pathname);
  for (let i = 0; i < 8; i++) {
    if (ROOT_FILES.every((name) => fs.existsSync(path.join(dir, name)))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error("Could not find the PillowNotes repo root (index.html, app.js, styles.css) above this script.");
}

function arg(name) {
  const eq = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (eq) return eq.slice(name.length + 3);
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return undefined;
  const next = process.argv[i + 1];
  if (next === undefined || next.startsWith("--")) return "";
  return next;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function which(bin) {
  try {
    return execFileSync("which", [bin], { encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

function chromeBin() {
  if (process.env.PN_CHROME && fs.existsSync(process.env.PN_CHROME)) return process.env.PN_CHROME;
  for (const name of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]) {
    const found = which(name);
    if (found) return found;
  }
  throw new Error("Chrome not found. Set PN_CHROME to the browser binary.");
}

function freePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

function runId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function scratchRoot() {
  return "/tmp/pillownotes-verify";
}

function evidenceRoot() {
  return "/tmp/pillownotes-verify-evidence";
}

function latestPath() {
  return path.join(scratchRoot(), "latest");
}

function scratchDir(id) {
  return path.join(scratchRoot(), id);
}

function readLatestId() {
  if (process.env.PN_RUN_ID) return process.env.PN_RUN_ID;
  const fromFlag = arg("run");
  if (fromFlag) return fromFlag;
  try {
    return fs.readFileSync(latestPath(), "utf8").trim();
  } catch {
    return "";
  }
}

function loadRun() {
  const id = readLatestId();
  if (!id) throw new Error("No verification run. Launch one, or pass --run <id> / PN_RUN_ID.");
  const file = path.join(scratchDir(id), "run.json");
  if (!fs.existsSync(file)) throw new Error(`Run ${id} has no ${file}. It may already have been cleaned up.`);
  const run = JSON.parse(fs.readFileSync(file, "utf8"));
  if (run.runId !== id) throw new Error(`Run file id ${run.runId} does not match ${id}.`);
  return run;
}

function cmdline(pid) {
  try {
    return fs.readFileSync(`/proc/${pid}/cmdline`).toString("utf8").replaceAll("\0", " ").trim();
  } catch {
    return "";
  }
}

function alive(pid) {
  if (!pid || pid < 2) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function assertOwned(pid, needle, label) {
  if (!pid || pid < 2) throw new Error(`${label} pid is missing.`);
  const cmd = cmdline(pid);
  if (!cmd) throw new Error(`${label} pid ${pid} is not running.`);
  if (!cmd.includes(needle)) {
    throw new Error(`${label} pid ${pid} is not the process this run started (${needle} not in cmdline). Refusing to touch it.`);
  }
  return cmd;
}

function killOwned(pid, needle, label) {
  if (!alive(pid)) return { killed: false, reason: "not-running" };
  assertOwned(pid, needle, label);
  try {
    process.kill(-pid, "SIGTERM");
  } catch {
    try { process.kill(pid, "SIGTERM"); } catch { /* already gone */ }
  }
  const start = Date.now();
  while (alive(pid) && Date.now() - start < 2000) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 50);
  }
  if (alive(pid)) {
    try { process.kill(-pid, "SIGKILL"); } catch { try { process.kill(pid, "SIGKILL"); } catch { /* gone */ } }
  }
  return { killed: true };
}

function spawnLogged(file, args, { cwd, logPath, env }) {
  fs.mkdirSync(path.dirname(logPath), { recursive: true });
  const logFd = fs.openSync(logPath, "a");
  const child = spawn(file, args, {
    cwd,
    env: { ...process.env, ...env },
    detached: true,
    stdio: ["ignore", logFd, logFd],
  });
  child.unref();
  fs.closeSync(logFd);
  return child.pid;
}

async function waitForHttp(url, timeoutMs = 10000) {
  const start = Date.now();
  let last = "no response";
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        const body = await res.text();
        if (body.includes('id="pillowDump"') && body.includes('id="savePillowDump"')) return body;
        last = "HTTP ok but PillowNotes markup missing";
      } else last = `HTTP ${res.status}`;
    } catch (err) {
      last = err.message;
    }
    await sleep(150);
  }
  throw new Error(`Server did not become ready at ${url}: ${last}`);
}

class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.next = 1;
    this.pending = new Map();
    ws.addEventListener("message", (event) => {
      const msg = JSON.parse(String(event.data));
      if (!msg.id || !this.pending.has(msg.id)) return;
      const { resolve, reject, timer } = this.pending.get(msg.id);
      clearTimeout(timer);
      this.pending.delete(msg.id);
      if (msg.error) reject(new Error(`${msg.error.message || "CDP error"} (${JSON.stringify(msg.error)})`));
      else resolve(msg.result || {});
    });
  }

  send(method, params = {}, timeoutMs = 15000) {
    const id = this.next++;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`CDP timeout: ${method}`));
      }, timeoutMs);
      this.pending.set(id, { resolve, reject, timer });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    this.ws.close();
  }
}

async function connectSocket(url) {
  const ws = new WebSocket(url);
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`WebSocket timeout ${url}`)), 10000);
    ws.addEventListener("open", () => { clearTimeout(timer); resolve(); });
    ws.addEventListener("error", () => { clearTimeout(timer); reject(new Error(`WebSocket failed ${url}`)); });
  });
  return new Cdp(ws);
}

async function browserClient(run) {
  const start = Date.now();
  let last = "no response";
  while (Date.now() - start < 10000) {
    try {
      const version = await fetch(`http://127.0.0.1:${run.debugPort}/json/version`).then((r) => r.json());
      if (version.webSocketDebuggerUrl) return connectSocket(version.webSocketDebuggerUrl);
      last = "missing browser websocket";
    } catch (err) {
      last = err.message;
    }
    await sleep(150);
  }
  throw new Error(`Chrome debugging endpoint not ready: ${last}`);
}

async function findPage(run) {
  const start = Date.now();
  let urls = "(none)";
  while (Date.now() - start < 10000) {
    const list = await fetch(`http://127.0.0.1:${run.debugPort}/json/list`).then((r) => r.json());
    const pages = list.filter((t) => t.type === "page" && typeof t.url === "string" && t.url.startsWith(run.url));
    if (pages.length) return pages[0];
    urls = list.map((t) => t.url).join(", ") || "(none)";
    await sleep(150);
  }
  throw new Error(`No PillowNotes page at ${run.url}. Open pages: ${urls}`);
}

async function pageClient(run) {
  const page = await findPage(run);
  const cdp = await connectSocket(page.webSocketDebuggerUrl);
  await cdp.send("Emulation.setDeviceMetricsOverride", VIEWPORT);
  return cdp;
}

const READY_EXPR = `(() => {
  const dump = document.querySelector("#pillowDump");
  const save = document.querySelector("#savePillowDump");
  const app = document.querySelector("#app");
  const tabs = document.querySelector(".mobile-tabbar");
  if (!dump || !save || !app || !tabs) return null;
  if (!document.title.includes("PillowNotes")) return null;
  const tabStyle = getComputedStyle(tabs);
  const tabRect = tabs.getBoundingClientRect();
  if (tabStyle.display === "none" || tabRect.height < 20) return null;
  if (window.innerWidth > 900) return null;
  return {
    title: document.title,
    lang: document.documentElement.lang,
    navigatorLanguage: navigator.language,
    mobileTab: app.dataset.mobileTab || "",
    appClass: app.className,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    serviceWorker: !!(navigator.serviceWorker && navigator.serviceWorker.controller),
    dumpCountText: (document.querySelector("#dumpCountChip") || {}).textContent || "",
    listText: (document.querySelector("#dumpList") || {}).innerText || ""
  };
})()`;

async function evaluate(cdp, expression) {
  const result = await cdp.send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails) {
    const text = result.exceptionDetails.text || result.exceptionDetails.exception?.description || "evaluate failed";
    throw new Error(text);
  }
  return result.result?.value;
}

async function waitUntilStable(cdp, timeoutMs = 20000) {
  const start = Date.now();
  let stable = 0;
  let last = null;
  let lastError = "not ready";
  while (Date.now() - start < timeoutMs) {
    try {
      const info = await evaluate(cdp, READY_EXPR);
      if (info && info.title) {
        stable += 1;
        last = info;
        const held = stable >= 4;
        const swSettled = info.serviceWorker || stable >= 10;
        if (held && swSettled) {
          await sleep(400);
          const again = await evaluate(cdp, READY_EXPR);
          if (again && again.title) return again;
          stable = 0;
        }
      } else {
        stable = 0;
        lastError = "page markup or mobile tab bar not ready";
      }
    } catch (err) {
      stable = 0;
      lastError = err.message;
    }
    await sleep(250);
  }
  throw new Error(`PillowNotes did not stay ready (${lastError}). Last=${JSON.stringify(last)}`);
}

function storageExpr() {
  return `(() => {
    const raw = localStorage.getItem("nexusOS");
    if (!raw) return { empty: true, key: "nexusOS" };
    const state = JSON.parse(raw);
    const pn = state.pillownotes || {};
    return {
      empty: false,
      key: "nexusOS",
      lang: state.settings && state.settings.lang,
      appMode: state.appMode || "",
      dumps: (pn.dumps || []).map((d) => ({
        id: d.id, text: d.text, tags: d.tags || [], forTomorrow: !!d.forTomorrow,
        toCanvas: !!d.toCanvas, source: d.source || ""
      })),
      checkpoints: (pn.checkpoints || []).map((c) => ({ type: c.type, stillAwake: !!c.stillAwake, time: c.time })),
      sleepCount: (pn.sleepEntries || []).length,
      protocolSteps: (pn.protocols || []).map((p) => p.step),
      tonight: pn.tonight || null
    };
  })()`;
}

async function readStorage(cdp) {
  return evaluate(cdp, storageExpr());
}

function emit(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

function fail(err) {
  const message = err && err.message ? err.message : String(err);
  process.stderr.write(`${message}\n`);
  process.exitCode = 1;
}

async function launch() {
  const root = repoRoot();
  const id = runId();
  const dir = scratchDir(id);
  const userDataDir = path.join(dir, "chrome-profile");
  const evidenceDir = path.join(evidenceRoot(), id);
  fs.mkdirSync(userDataDir, { recursive: true });
  fs.mkdirSync(evidenceDir, { recursive: true });
  const port = await freePort();
  const debugPort = await freePort();
  const url = `http://127.0.0.1:${port}/`;
  const serverPid = spawnLogged("python3", ["-m", "http.server", String(port), "--bind", "127.0.0.1"], {
    cwd: root,
    logPath: path.join(dir, "server.log"),
    env: { PYTHONUNBUFFERED: "1" },
  });
  const run = {
    runId: id,
    url,
    port,
    debugPort,
    serverPid,
    chromePid: null,
    userDataDir,
    evidenceDir,
    root,
    viewport: { width: VIEWPORT.width, height: VIEWPORT.height },
    lang: "zh-HK",
    startedAt: new Date().toISOString(),
  };
  try {
    await waitForHttp(url);
    assertOwned(serverPid, "http.server", "server");
    const chrome = chromeBin();
    run.chromeBin = chrome;
    run.chromePid = spawnLogged(chrome, [
      "--headless=new",
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "--disable-sync",
      "--lang=zh-HK",
      "--accept-lang=zh-HK,zh-TW,zh",
      `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
      `--user-data-dir=${userDataDir}`,
      `--remote-debugging-port=${debugPort}`,
      "--remote-allow-origins=*",
      "about:blank",
    ], {
      cwd: root,
      logPath: path.join(dir, "chrome.log"),
      env: { LANG: "zh_HK.UTF-8", LANGUAGE: "zh_HK:zh", TZ: "Asia/Hong_Kong" },
    });
    const browser = await browserClient(run);
    if (!alive(run.chromePid)) {
      const log = path.join(dir, "chrome.log");
      const tail = fs.existsSync(log) ? fs.readFileSync(log, "utf8").slice(-800) : "";
      throw new Error(`Chrome pid ${run.chromePid} exited. ${tail}`);
    }
    assertOwned(run.chromePid, userDataDir, "chrome");
    const created = await browser.send("Target.createTarget", { url });
    browser.close();
    run.targetId = created.targetId;
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "run.json"), JSON.stringify(run, null, 2));
    fs.mkdirSync(scratchRoot(), { recursive: true });
    fs.writeFileSync(latestPath(), id);
    const page = await pageClient(run);
    const ready = await waitUntilStable(page);
    page.close();
    run.ready = ready;
    fs.writeFileSync(path.join(dir, "run.json"), JSON.stringify(run, null, 2));
    emit({ ok: true, ...run, ready });
  } catch (err) {
    try { if (run.chromePid) killOwned(run.chromePid, userDataDir, "chrome"); } catch { /* leave a note below */ }
    try { killOwned(serverPid, "http.server", "server"); } catch { /* may not have started */ }
    throw err;
  }
}

async function doctor() {
  const run = loadRun();
  const serverCmd = assertOwned(run.serverPid, `http.server ${run.port}`, "server");
  if (!serverCmd.includes(String(run.port))) throw new Error("Server port does not match this run.");
  let cwd = "";
  try { cwd = fs.readlinkSync(`/proc/${run.serverPid}/cwd`); } catch { cwd = ""; }
  if (cwd !== run.root) throw new Error(`Server cwd is ${cwd || "unknown"}, expected ${run.root}.`);
  assertOwned(run.chromePid, run.userDataDir, "chrome");
  const res = await fetch(run.url);
  if (!res.ok) throw new Error(`GET ${run.url} returned ${res.status}.`);
  const html = await res.text();
  if (!html.includes('id="pillowDump"') || !html.includes("PillowNotes")) {
    throw new Error("Server is up but the response is not PillowNotes index.html.");
  }
  const version = await fetch(`http://127.0.0.1:${run.debugPort}/json/version`).then((r) => r.json());
  const page = await pageClient(run);
  let info;
  try {
    info = await evaluate(page, READY_EXPR);
    if (!info) throw new Error("Page is open but the mobile Brain Dump UI is not usable.");
    const storage = await readStorage(page);
    emit({
      ok: true,
      runId: run.runId,
      url: run.url,
      port: run.port,
      serverPid: run.serverPid,
      chromePid: run.chromePid,
      root: run.root,
      evidenceDir: run.evidenceDir,
      browser: version.Browser || "",
      title: info.title,
      lang: info.lang,
      navigatorLanguage: info.navigatorLanguage,
      mobileTab: info.mobileTab,
      innerWidth: info.innerWidth,
      innerHeight: info.innerHeight,
      serviceWorker: info.serviceWorker,
      dumpCountText: info.dumpCountText,
      storageEmpty: !!storage.empty,
      dumpCount: storage.empty ? 0 : storage.dumps.length,
    });
  } finally {
    page.close();
  }
}

async function withPage(fn) {
  const run = loadRun();
  assertOwned(run.serverPid, `http.server ${run.port}`, "server");
  assertOwned(run.chromePid, run.userDataDir, "chrome");
  const page = await pageClient(run);
  try {
    return await fn(page, run);
  } finally {
    page.close();
  }
}

async function selectorBox(cdp, selector) {
  const box = await evaluate(cdp, `(() => {
    const sel = ${JSON.stringify(selector)};
    const el = document.querySelector(sel);
    if (!el) return { ok: false, reason: "missing", selector: sel };
    el.scrollIntoView({ block: "center", inline: "nearest" });
    const style = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const visible = style.display !== "none" && style.visibility !== "hidden" && r.width >= 1 && r.height >= 1;
    return {
      ok: true,
      selector: sel,
      visible,
      x: r.x + r.width / 2,
      y: r.y + r.height / 2,
      w: r.width,
      h: r.height,
      text: (el.innerText || el.value || el.textContent || "").trim().slice(0, 500)
    };
  })()`);
  if (!box || !box.ok) throw new Error(`Selector not found: ${selector}`);
  return box;
}

async function clickCmd() {
  const selector = arg("selector");
  if (!selector) throw new Error("click requires --selector");
  await withPage(async (page) => {
    const box = await selectorBox(page, selector);
    if (!box.visible) throw new Error(`Selector is not visible: ${selector}`);
    await page.send("Input.dispatchMouseEvent", { type: "mouseMoved", x: box.x, y: box.y });
    await page.send("Input.dispatchMouseEvent", { type: "mousePressed", x: box.x, y: box.y, button: "left", clickCount: 1 });
    await page.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: box.x, y: box.y, button: "left", clickCount: 1 });
    await sleep(150);
    const toast = await evaluate(page, `(document.querySelector("#toast") || {}).textContent || ""`);
    const mobileTab = await evaluate(page, `(document.querySelector("#app") || {}).dataset?.mobileTab || ""`);
    emit({ ok: true, clicked: selector, text: box.text, toast, mobileTab });
  });
}

async function fillCmd() {
  const selector = arg("selector");
  const value = arg("value");
  if (!selector) throw new Error("fill requires --selector");
  if (value === undefined) throw new Error("fill requires --value");
  await withPage(async (page) => {
    const box = await selectorBox(page, selector);
    if (!box.visible) throw new Error(`Selector is not visible: ${selector}`);
    await page.send("Input.dispatchMouseEvent", { type: "mousePressed", x: box.x, y: box.y, button: "left", clickCount: 1 });
    await page.send("Input.dispatchMouseEvent", { type: "mouseReleased", x: box.x, y: box.y, button: "left", clickCount: 1 });
    const focused = await evaluate(page, `(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return false;
      el.focus();
      if (typeof el.select === "function") el.select();
      return document.activeElement === el;
    })()`);
    if (!focused) throw new Error(`Could not focus ${selector}`);
    await page.send("Input.insertText", { text: value });
    const current = await evaluate(page, `(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      return el ? (el.value ?? el.textContent ?? "") : "";
    })()`);
    if (current !== value) throw new Error(`Fill mismatch for ${selector}. Expected ${JSON.stringify(value)} got ${JSON.stringify(current)}`);
    emit({ ok: true, selector, value: current });
  });
}

async function textCmd() {
  const selector = arg("selector");
  if (!selector) throw new Error("text requires --selector");
  await withPage(async (page) => {
    const text = await evaluate(page, `(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return null;
      return (el.innerText || el.value || el.textContent || "").trim();
    })()`);
    if (text === null) throw new Error(`Selector not found: ${selector}`);
    emit({ ok: true, selector, text });
  });
}

async function attrCmd() {
  const selector = arg("selector");
  const name = arg("name");
  if (!selector || !name) throw new Error("attr requires --selector and --name");
  await withPage(async (page) => {
    const value = await evaluate(page, `(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return { missing: true };
      return { missing: false, value: el.getAttribute(${JSON.stringify(name)}) };
    })()`);
    if (!value || value.missing) throw new Error(`Selector not found: ${selector}`);
    emit({ ok: true, selector, name, value: value.value });
  });
}

async function visibleCmd() {
  const selector = arg("selector");
  if (!selector) throw new Error("visible requires --selector");
  await withPage(async (page) => {
    const box = await evaluate(page, `(() => {
      const sel = ${JSON.stringify(selector)};
      const el = document.querySelector(sel);
      if (!el) return { ok: false, selector: sel, visible: false, reason: "missing" };
      const style = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      const visible = style.display !== "none" && style.visibility !== "hidden" && r.width >= 1 && r.height >= 1;
      return { ok: true, selector: sel, visible, w: r.width, h: r.height };
    })()`);
    emit(box);
    if (!box.ok) process.exitCode = 1;
  });
}

async function storageCmd() {
  await withPage(async (page) => {
    emit({ ok: true, ...(await readStorage(page)) });
  });
}

async function reloadCmd() {
  await withPage(async (page) => {
    await page.send("Page.reload", { ignoreCache: true });
    const ready = await waitUntilStable(page);
    const storage = await readStorage(page);
    emit({ ok: true, reloaded: true, ready, storageEmpty: !!storage.empty, dumpCount: storage.empty ? 0 : storage.dumps.length });
  });
}

function resolveEvidence(run, file) {
  const dest = path.isAbsolute(file) ? file : path.join(run.evidenceDir, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const rel = path.relative(run.evidenceDir, dest);
  if (rel.startsWith("..") || path.isAbsolute(rel)) {
    throw new Error(`Refusing to write outside the evidence dir ${run.evidenceDir}: ${file}`);
  }
  return dest;
}

async function screenshotCmd() {
  const file = arg("path");
  if (!file) throw new Error("screenshot requires --path");
  await withPage(async (page, run) => {
    const dest = resolveEvidence(run, file);
    const focus = arg("selector");
    if (focus) await selectorBox(page, focus);
    const shot = await page.send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(dest, Buffer.from(shot.data, "base64"));
    emit({ ok: true, path: dest, bytes: fs.statSync(dest).size });
  });
}

async function ariaCmd() {
  const file = arg("path");
  if (!file) throw new Error("aria requires --path");
  await withPage(async (page, run) => {
    const dest = resolveEvidence(run, file);
    await page.send("Accessibility.enable");
    const tree = await page.send("Accessibility.getFullAXTree");
    const nodes = new Map((tree.nodes || []).map((node) => [node.nodeId, node]));
    const lines = [];
    function walk(id, depth) {
      const node = nodes.get(id);
      if (!node || depth > 12) return;
      const role = node.role?.value || "";
      const name = node.name?.value || "";
      const interesting = name || ["button", "textbox", "tab", "heading", "link", "navigation", "switch", "combobox"].includes(role);
      if (!node.ignored && interesting) {
        lines.push(`${"  ".repeat(depth)}${role}${name ? ` ${JSON.stringify(name)}` : ""}`);
      }
      for (const child of node.childIds || []) walk(child, interesting ? depth + 1 : depth);
    }
    const root = (tree.nodes || []).find((node) => !node.parentId) || tree.nodes?.[0];
    if (root) walk(root.nodeId, 0);
    const header = `# PillowNotes ARIA snapshot\n# url ${run.url}\n# run ${run.runId}\n`;
    fs.writeFileSync(dest, header + lines.join("\n") + "\n");
    emit({ ok: true, path: dest, lines: lines.length });
  });
}

async function cleanup() {
  const id = readLatestId();
  if (!id) {
    emit({ ok: true, cleaned: false, reason: "no-run" });
    return;
  }
  const file = path.join(scratchDir(id), "run.json");
  if (!fs.existsSync(file)) {
    emit({ ok: true, cleaned: false, reason: "already-clean", runId: id });
    return;
  }
  const run = JSON.parse(fs.readFileSync(file, "utf8"));
  const result = { ok: true, runId: id, evidenceDir: run.evidenceDir, server: null, chrome: null };
  if (run.chromePid) result.chrome = killOwned(run.chromePid, run.userDataDir, "chrome");
  if (run.serverPid) result.server = killOwned(run.serverPid, `http.server ${run.port}`, "server");
  fs.rmSync(scratchDir(id), { recursive: true, force: true });
  try {
    if (fs.readFileSync(latestPath(), "utf8").trim() === id) fs.rmSync(latestPath());
  } catch { /* no pointer */ }
  const evidenceLeft = fs.existsSync(run.evidenceDir);
  result.evidenceKept = evidenceLeft;
  emit(result);
  if (!evidenceLeft) throw new Error(`Cleanup removed evidence at ${run.evidenceDir}.`);
}

const command = process.argv[2];
const commands = {
  launch,
  doctor,
  click: clickCmd,
  fill: fillCmd,
  text: textCmd,
  attr: attrCmd,
  visible: visibleCmd,
  storage: storageCmd,
  reload: reloadCmd,
  screenshot: screenshotCmd,
  aria: ariaCmd,
  cleanup,
};

if (!command || command === "--help" || command === "-h") {
  process.stdout.write(`pn-verify commands: ${Object.keys(commands).join(", ")}\n`);
  process.exit(command ? 0 : 1);
}

if (!commands[command]) {
  fail(new Error(`Unknown command ${command}`));
} else {
  commands[command]().catch(fail);
}
