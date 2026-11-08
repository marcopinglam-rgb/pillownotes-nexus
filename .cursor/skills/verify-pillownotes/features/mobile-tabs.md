# Mobile tabs

Mobile tabs let a person move between Dump, tonight, sleep, wind-down, and more without leaving the page. Dump is home. It shows the composer and hides the tonight card. Canvas opens from 更多.

## Sub-features

- `tab-dump` shows the composer and hides the tonight card and the restore chip.
- `tab-tonight` shows the four-step tonight card and hides the composer.
- `tab-sleep` shows the bedtime checkpoint and hides the composer and the tonight card.
- `tab-wind` shows the protocol buttons and hides the composer and the tonight card.
- `tab-more` shows reframe, the canvas bridge, and `開畫布`, and hides the tonight card.
- `tab-canvas` opens from 更多 and shows the canvas. There is no 畫布 bottom tab.

## How to get to it (user POV)

- Tap Dump, 今晚, 睡眠, 放鬆, or 更多 in the bottom bar `#mobileTabbar`.
- On 更多, tap `開畫布` (`#openCanvasFromMore`) to open the canvas.

## Driving it with pn-verify

Preconditions:

- `doctor` reports `mobileTab` `dump` and `innerWidth` 390.
- `#mobileTabbar` is visible. If `visible` reports it missing or not visible, stop. The desktop layout is a different screen.

- **Dump panel.** Confirm the home panel. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs visible --selector '#pillowDump'`. It reports `visible: true`. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs visible --selector '#tonightCard'` and `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs visible --selector '#tonightRestore'`. Both report `visible: false`. `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs attr --selector '#app' --name data-mobile-tab` is `dump`. `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs attr --selector '#pillowDump' --name placeholder` is `而家腦入面有咩？`.
- **Tonight tab.** Tap 今晚. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '.mtab[data-mobile-tab="tonight"]'`. `mobileTab` is `tonight`. `#tonightCard` is visible. `#pillowDump` is not visible. `#bedCheckpoint` is not visible.
- **Sleep tab.** Tap 睡眠. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '.mtab[data-mobile-tab="sleep"]'`. `mobileTab` in the command result is `sleep`. `#bedCheckpoint` is visible. `#pillowDump` is not visible. `#tonightCard` is not visible.
- **Wind-down tab.** Tap 放鬆. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '.mtab[data-mobile-tab="wind"]'`. `mobileTab` is `wind`. `#protocolBtns` is visible. `#pillowDump` is not visible. `#tonightCard` is not visible.
- **More tab.** Tap 更多. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '.mtab[data-mobile-tab="more"]'`. `mobileTab` is `more`. `#runReframe`, `#syncDumpsToCanvas`, and `#openCanvasFromMore` are visible. `#tonightCard` is not visible. `#pillowDump` is not visible.
- **Canvas from more.** Tap `開畫布`. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '#openCanvasFromMore'`. `mobileTab` is `canvas`. `#workspaceTitle` is visible and its text contains `NEXUS`. `#brainDumpView` is not visible. `[data-node="n2"]` is present. That node is the built-in CORE IDEA card, not a dump the user saved. There is no `.mtab[data-mobile-tab="canvas"]`.
- **Return home.** Tap Dump. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '.mtab[data-mobile-tab="dump"]'`. `mobileTab` is `dump` and `#pillowDump` is visible. `#tonightCard` is not visible.
- **Proof.** Capture the Dump tab after returning. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs screenshot --path mobile-tabs/dump.png` and `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs aria --path mobile-tabs/dump.aria.txt`. The PNG shows PillowNotes, the composer, and the Dump label in the bottom bar. It does not show the tonight card. The ARIA file contains a button named `Dump` and a button named `今晚`.

## Gotchas

- Above 900px the bottom bar is not displayed. Doctor must report width 390 before this recipe. Desktop Dump hides the tonight card too. The desktop entry is `#openTonightDesk`, which this width does not show.
- Opening the canvas writes `nexusOS` because the canvas saves. `storage.empty` can become false with `dumps` still `[]`. Do not call that a saved dump.
- Canvas hides `#backToBrainDump` on this width. Return with the Dump tab, not that button.
- `#bdToCanvas` and `#openTonightDesk` are desktop-only and are not visible at 390px. They are not entry points for this recipe.
- A restore chip on Dump is a failed isolation check. `#tonightRestore` stays not visible on Dump even after the card has been dismissed on 今晚.
