# Wind-down

Wind-down lets a person tap a 10-3-2-1-0 step and see that step's instruction on the card.

## Sub-features

- `wind-open` shows the protocol buttons on the 放鬆 tab.
- `wind-step` records one protocol step and shows its instruction.
- `wind-stored` keeps that step in `storage`.

## How to get to it (user POV)

- Tap 放鬆 in the bottom bar.
- On the Dump tab, tap the tonight card when its active step is wind-down (`#tonightDo` reads `去放鬆倒數`). That only switches to this tab. It does not itself record a protocol step.

## Driving it with pn-verify

Preconditions:

- `doctor` reports `lang` `zh-Hant` and `innerWidth` 390.
- `storage` reports `protocolSteps` as `[]`.
- This recipe uses the 放鬆 tab and the `1h · 熄螢幕` button. It does not tap `0 · 瞓覺` or `彈性倒數（OT）`.

- **Open wind-down.** Tap 放鬆. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '.mtab[data-mobile-tab="wind"]'`. `mobileTab` is `wind`. `#protocolBtns` is visible.
- **Tap screens-off.** Tap `1h · 熄螢幕`. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '[data-protocol="1"]'`. The command's `toast` is `1 小時前：熄螢幕 / 藍光`.
- **Instruction line.** Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs text --selector '#countdownDisplay'`. The text is `1 小時前：熄螢幕 / 藍光`.
- **Stored step.** Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs storage`. `protocolSteps` is `["1"]`. `checkpoints` is still `[]`.
- **Proof.** Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs screenshot --path wind-down/screens-off.png --selector '#countdownDisplay'` and `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs aria --path wind-down/screens-off.aria.txt`. The PNG shows PillowNotes and the screens-off instruction. The ARIA file contains `1 小時前：熄螢幕 / 藍光`.

## Gotchas

- `[data-protocol="0"]` records the protocol step and also presses `#bedCheckpoint`, so a bedtime checkpoint appears. That is a different feature's side effect. This recipe stops at protocol `1`.
- `[data-protocol="2"]` moves focus to the Dump composer and changes its placeholder. Do not use it when the proof is the wind-down card.
- `#flexCountdown` calls `prompt()` and will stall the harness. Do not click it.
- The minute buttons `[data-countdown]` start a running timer. They are not this recipe. A 10-minute countdown is not a proof you should wait out.
- If `#protocolBtns` has zero size while `data-mobile-tab` is `wind`, stop. The side column must not carry `data-m-panel="sleep"`, or the tab filter hides the countdown with the bedtime card.
