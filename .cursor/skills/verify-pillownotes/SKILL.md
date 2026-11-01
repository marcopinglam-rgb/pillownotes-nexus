---
name: verify-pillownotes
description: "Drive the PillowNotes mobile web app (Brain Dump, sleep checkpoints, wind-down, tonight path) in an isolated Chrome profile and capture proof. Use when changing pillownotes-nexus UI, localStorage, or tab behavior and a user path needs launch, doctor, drive, and screenshot evidence."
---

# Verify PillowNotes

PillowNotes is a static mobile web app. The primary surface is the phone UI: five bottom tabs (Dump, 睡眠, 放鬆, 畫布, 更多) served from `index.html`. There is no CLI and no API. User data is `localStorage` key `nexusOS` (plus `nexusMobileTab`). Canvas, settings, share/export, and the rule helper are the same page. Voice input and the PWA install prompt are real controls, but this harness does not drive them: headless Chrome has no speech engine, and `beforeinstallprompt` is not a required proof.

Read `features/README.md`, then the feature file for the behavior under test. Drive every entry point that file lists. Do not call a different entry point verified.

## Launch

From the repo root:

```bash
.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs launch
```

Launch starts `python3 -m http.server <port> --bind 127.0.0.1` with cwd at the repo root, then headless Chrome with a new profile. It prints JSON. A usable instance has all of these:

- `ready.lang` is `zh-Hant` and `ready.navigatorLanguage` is `zh-HK`
- `ready.mobileTab` is `dump`
- `ready.innerWidth` is `390` and `ready.innerHeight` is `844`
- `ready.dumpCountText` is `0 則`
- `ready.listText` is `未有 dump — 由上面開始寫`
- `ready.serviceWorker` is `true` (the first visit lets `sw.js` claim the page; launch waits through that reload)

`storage` on that fresh instance returns `{ "empty": true }` for key `nexusOS`. Ready means the Dump composer and the bottom tab bar are on screen, not merely that the port accepts HTTP.

The helper forces the Hong Kong locale and clock because that is the app's primary copy: Chrome `--lang=zh-HK --accept-lang=zh-HK,zh-TW,zh`, and `LANG=zh_HK.UTF-8`, `LANGUAGE=zh_HK:zh`, `TZ=Asia/Hong_Kong`. It also passes `--no-sandbox` and `--disable-dev-shm-usage` so Chrome starts in this container. Set `PN_CHROME` if the binary is not `google-chrome`.

Two runs can exist at once. Each gets its own port, profile, and evidence directory. Pass `--run <id>` or `PN_RUN_ID` after the first; the unqualified commands follow `/tmp/pillownotes-verify/latest`. Never attach to a server this run did not start. A process already listening on port 8899 is not a verification instance.

## Doctor

```bash
.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs doctor
```

Run this first whenever the page looks wrong. Exit 0 means this run is worth driving. Doctor checks, and does not click or write `localStorage`:

- The recorded server pid is alive, its cmdline contains `http.server <port>`, and its cwd is the repo root.
- The recorded Chrome pid is alive and its cmdline contains this run's profile directory.
- `GET <url>` is HTML that includes `id="pillowDump"` and `PillowNotes`.
- The page title contains `PillowNotes`, `documentElement.lang` is `zh-Hant`, the bottom tab bar is visible, and the viewport width is at most 900.

Doctor reapplies the 390×844 mobile viewport. Above 900px the tab bar is `display: none` and the desktop layout shows every panel at once. Do not drive that layout for these feature files.

## Drive

Invoke the helper from the repo root. Quote selectors exactly.

```bash
.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '<css>'
.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs fill --selector '<css>' --value '<text>'
.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs text --selector '<css>'
.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs attr --selector '<css>' --name '<attr>'
.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs visible --selector '<css>'
.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs storage
.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs reload
.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs screenshot --path '<relative.png>' [--selector '<css>']
.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs aria --path '<relative.txt>'
```

`click` scrolls the element into view and clicks its center. It fails when the element is missing or `display: none`. `fill` focuses the control and inserts the value; the command fails if the control's value does not match. `storage` reads `localStorage.nexusOS`. It does not write it. `reload` loads the same URL again and waits until the mobile Dump UI is usable.

Stable handles are element ids and data attributes. Many visible labels are hardcoded Chinese in `index.html` and do not follow i18n. Strings that do follow i18n (`#toast`, `#dumpList` empty copy, `#dumpCountChip`, `#checkpointStatus`, `#countdownDisplay`, `#tonightDo`) are the zh pack because launch forces `zh-HK`.

Do not drive `#voiceDumpBtn` or `#flexCountdown`. The first needs speech recognition. The second calls `prompt()` and stalls the page.

## Evidence

Write proof under the `evidenceDir` from launch (default `/tmp/pillownotes-verify-evidence/<runId>/`). Pass relative `--path` values. The helper rejects a path outside that directory.

- Exercise the on-screen control. Do not set `localStorage` or call app functions from the console to simulate a tap.
- Capture the action and the result. A toast alone is not enough. Read the list or status the user sees, then `storage` or `reload` for the persisted row.
- `screenshot` of the Dump tab before scrolling shows the PillowNotes wordmark. For a result that sits below the composer, pass `--selector` so that node is scrolled into view. That shot shows the row, the `1 則` chip, and the Dump tab. The wordmark can sit above the fold, so keep the pre-action shot as well. A viewport shot that does not scroll still shows the tonight card and the composer after a save.
- `aria` writes the accessibility tree. The saved dump text has to appear in that file.
- Default canvas nodes such as `CORE IDEA` ship with an empty profile. They are not dumps. After any `save()`, `storage.empty` becomes false even when `dumps` is `[]`, because the key holds tonight state and the default canvas. Count `dumps`, do not treat a present key as a saved dump.
- `storage` is the side-effect check for dumps, checkpoints, and protocol steps. Reloading the page is the second user-facing view.

## Cleanup

```bash
.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs cleanup
```

Cleanup signals the server pid and the Chrome pid recorded in this run, and only after their cmdlines still contain this run's port or profile path. It then deletes `/tmp/pillownotes-verify/<runId>/` (logs, profile, `run.json`). It does not delete `evidenceDir`. A cleanup that removes proof has failed. Run cleanup after a failed attempt too, so the next launch is not sharing a wedged port. Do not kill Chrome or Python by process name. Leave any server on port 8899 alone.

## Helpers

The only helper is `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs` (executable, `#!/usr/bin/env node`). Run it from the repo root as shown above. `node --check .cursor/skills/verify-pillownotes/scripts/pn-verify.mjs` parses it. Commands: `launch`, `doctor`, `click`, `fill`, `text`, `attr`, `visible`, `storage`, `reload`, `screenshot`, `aria`, `cleanup`.
