# Sleep checkpoint

Sleep checkpoint lets a person record bedtime from the sleep tab and read that checkpoint back on the same card.

## Sub-features

- `sleep-empty` shows that today has no checkpoint yet.
- `sleep-bed` records a bedtime checkpoint and fills the sleep-start field.
- `sleep-status` shows the bedtime line after the tap.

## How to get to it (user POV)

- Tap 睡眠 in the bottom bar.
- On the 今晚 tab, use the tonight card's bedtime step once Dump and wind-down are done. That card presses the same `#bedCheckpoint` control. Verify it only when the bedtime step is the active step. Do not skip ahead by saving a dump just to reach it. The card is not on the Dump tab.

## Driving it with pn-verify

Preconditions:

- `doctor` reports `lang` `zh-Hant` and `innerWidth` 390.
- `storage` reports `checkpoints` as `[]`.
- This recipe uses the 睡眠 tab. It does not claim the tonight-card entry point unless that step is already active on a fresh tonight card.

- **Open sleep.** Tap 睡眠. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '.mtab[data-mobile-tab="sleep"]'`. `mobileTab` is `sleep`. `#bedCheckpoint` is visible.
- **Empty status.** Read the line under the buttons. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs text --selector '#checkpointStatus'`. The text is `今日未有 checkpoint`.
- **Record bedtime.** Tap `🛏 開始瞓`. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '#bedCheckpoint'`. The command's `toast` is `已記錄瞓覺 Checkpoint`.
- **Status line.** Read the card again. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs text --selector '#checkpointStatus'`. The text starts with `最近 瞓覺:`.
- **Stored checkpoint.** Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs storage`. `checkpoints[0].type` is `bed` and `stillAwake` is false.
- **Start field.** Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs text --selector '#sleepStart'`. The value is a `HH:MM` time. Do not assert a fixed clock.
- **Proof.** Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs screenshot --path sleep-checkpoint/bed.png --selector '#checkpointStatus'` and `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs aria --path sleep-checkpoint/bed.aria.txt`. The PNG shows PillowNotes and a bedtime line. The ARIA file contains `已記錄` or `最近 瞓覺`.

## Gotchas

- Tapping `☀ 起身` immediately after bedtime may not add a sleep-journal row when the two timestamps are equal. This recipe does not treat a journal row as the bedtime proof.
- `#stillAwakeBtn` rewrites the latest bedtime and adds another checkpoint. Do not tap it in this recipe.
- The protocol button `[data-protocol="0"]` also presses `#bedCheckpoint`. A wind-down proof that taps `0` is not this feature's entry point.
- The status clock uses `Asia/Hong_Kong`. Assert the `最近 瞓覺:` prefix, not the timestamp.
