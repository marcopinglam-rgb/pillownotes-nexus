/* PillowNotes PWA — network-first so UI updates land quickly after deploy.
   Bump CACHE whenever a precached asset changes. */
const CACHE = "pillownotes-v8";
const PRECACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/manifest.webmanifest",
  "/assets/icon.svg",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "/assets/icon-maskable-192.png",
  "/assets/icon-maskable-512.png",
  "/assets/icon-apple-180.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

function isNavigationRequest(request) {
  return request.mode === "navigate" ||
    (request.method === "GET" && request.headers.get("accept")?.includes("text/html"));
}

function shouldNetworkFirst(url) {
  const path = url.pathname;
  return (
    path.endsWith(".html") ||
    path.endsWith(".js") ||
    path.endsWith(".css") ||
    path.endsWith(".webmanifest") ||
    path.endsWith("sw.js") ||
    path.endsWith("/") ||
    !path.includes(".")
  );
}

async function store(cache, request, response) {
  if (!response || !response.ok) throw new Error("bad response");
  if (response.redirected) {
    const headers = new Headers(response.headers);
    const blob = await response.clone().blob();
    await cache.put(request, new Response(blob, { status: 200, statusText: "OK", headers }));
    return;
  }
  await cache.put(request, response.clone());
}

async function precache() {
  const cache = await caches.open(CACHE);
  await Promise.all(PRECACHE.map(async (url) => {
    const response = await fetch(new Request(url, { cache: "reload" }));
    await store(cache, url, response);
  }));
}

async function offlineShell() {
  const cache = await caches.open(CACHE);
  const candidates = ["/", "/index.html", "./", "./index.html"];
  for (const url of candidates) {
    const hit = await cache.match(url, { ignoreSearch: true });
    if (hit) return hit;
  }
  return new Response(
    "<!doctype html><meta charset=utf-8><meta name=theme-color content=#0b0d10><title>Nexus</title><p>Nexus is offline.</p>",
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetch(request, { cache: "no-store" });
    if (response && response.ok && request.method === "GET") {
      try { await store(cache, request, response); } catch (err) { /* keep the network response */ }
    }
    return response;
  } catch (err) {
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    if (isNavigationRequest(request)) return offlineShell();
    throw err;
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request, { ignoreSearch: true });
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.ok && request.method === "GET") {
    try { await store(cache, request, response); } catch (err) { /* keep the network response */ }
  }
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  if (url.origin !== self.location.origin) return;

  if (shouldNetworkFirst(url) || isNavigationRequest(request)) {
    event.respondWith(networkFirst(request));
    return;
  }

  event.respondWith(cacheFirst(request));
});
