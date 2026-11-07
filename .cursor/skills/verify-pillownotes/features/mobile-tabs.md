# Mobile tabs

Mobile tabs let a person move between Dump, sleep, wind-down, canvas, and more without leaving the page. Each tab shows its own panel and hides the others.

## Sub-features

- `tab-dump` shows the composer and the tonight card.
- `tab-sleep` shows the bedtime checkpoint and hides the composer.
- `tab-wind` shows the protocol buttons and hides the composer.
- `tab-canvas` shows the canvas and hides the Brain Dump view.
- `tab-more` shows reframe and the canvas bridge, and hides the tonight card.

## How to get to it (user POV)

- Tap Dump, 睡眠, 放鬆, 畫布, or 更多 in the bottom bar `#mobileTabbar`.

## Driving it with pn-verify

Preconditions:

- `doctor` reports `mobileTab` `dump` and `innerWidth` 390.
- `#mobileTabbar` is visible. If `visible` reports it missing or not visible, stop. The desktop layout is a different screen.

- **Dump panel.** Confirm the home panel. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs visible --selector '#pillowDump'` and `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs visible --selector '#tonightCard'`. Both report `visible: true`. `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs attr --selector '#app' --name data-mobile-tab` is `dump`.
- **Sleep tab.** Tap 睡眠. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '.mtab[data-mobile-tab="sleep"]'`. `mobileTab` in the command result is `sleep`. `#bedCheckpoint` is visible. `#pillowDump` is not visible.
- **Wind-down tab.** Tap 放鬆. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '.mtab[data-mobile-tab="wind"]'`. `mobileTab` is `wind`. `#protocolBtns` is visible. `#pillowDump` is not visible.
- **Canvas tab.** Tap 畫布. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '.mtab[data-mobile-tab="canvas"]'`. `mobileTab` is `canvas`. `#workspaceTitle` is visible and its text contains `NEXUS`. `#brainDumpView` is not visible. `[data-node="n2"]` is present. That node is the built-in CORE IDEA card, not a dump the user saved.
- **More tab.** Tap Dump, then 更多. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '.mtab[data-mobile-tab="dump"]'` and `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '.mtab[data-mobile-tab="more"]'`. `mobileTab` is `more`. `#runReframe` and `#syncDumpsToCanvas` are visible. `#tonightCard` is not visible.
- **Return home.** Tap Dump. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '.mtab[data-mobile-tab="dump"]'`. `mobileTab` is `dump` and `#pillowDump` is visible.
- **Proof.** Capture the Dump tab after returning. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs screenshot --path mobile-tabs/dump.png` and `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs aria --path mobile-tabs/dump.aria.txt`. The PNG shows PillowNotes and the Dump label in the bottom bar. The ARIA file contains a button named `Dump`.

## Gotchas

- Above 900px the bottom bar is not displayed and every Brain Dump panel is shown together. Doctor must report width 390 before this recipe.
- Opening 畫布 writes `nexusOS` because the canvas saves. `storage.empty` can become false with `dumps` still `[]`. Do not call that a saved dump.
- The canvas tab hides `#backToBrainDump` on this width. Return with the Dump tab, not that button.
- `#bdToCanvas` is desktop-only and is not visible at 390px. It is not an entry point for this recipe.
