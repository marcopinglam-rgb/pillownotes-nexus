# Tonight path

Tonight path is the card at the top of Dump, sleep, and wind-down. It walks four skippable steps: dump, wind-down, bedtime, and still awake.

## Sub-features

- `tonight-show` shows four steps on a fresh day, with Dump active.
- `tonight-skip` marks the active step done and advances.
- `tonight-hide` tucks the card away and can bring it back.

## How to get to it (user POV)

- Land on Dump. The card `#tonightCard` is above the composer.
- The same card is on 睡眠 and 放鬆. It is hidden on 更多.
- Tap `收起` to hide it. Tap `今晚：Dump → 放鬆 → 瞓` to show it again.

## Driving it with pn-verify

Preconditions:

- Fresh launch. `storage` is `empty: true`. A saved dump already marks step Dump done, and this recipe would be looking at the wrong step.
- `doctor` reports `mobileTab` `dump` and `lang` `zh-Hant`.
- `#tonightDo` text is `做呢一步`. If it is not, stop and report that the dump step is already done.

- **Four steps.** Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs text --selector '#tonightSteps'`. The text contains `第 1 步`, `Dump`, `第 2 步`, `放鬆`, `第 3 步`, `瞓`, `第 4 步`, and `仲醒`.
- **Active action.** Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs text --selector '#tonightDo'`. The text is `做呢一步`. `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs text --selector '#tonightSkip'` is `Skip`.
- **Skip dump.** Tap Skip. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '#tonightSkip'`. `#tonightDo` is now `去放鬆倒數`. `storage` reports `tonight.done.dump` true and `tonight.done.wind` false. `dumps` is still `[]`.
- **Hide.** Tap `收起`. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '#tonightDismiss'`. `#tonightCard` is not visible. `#tonightRestore` is visible and its text is `今晚：Dump → 放鬆 → 瞓`.
- **Restore.** Tap the restore chip. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '#tonightRestore'`. `#tonightCard` is visible again. `#tonightDo` is still `去放鬆倒數`.
- **Proof.** Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs screenshot --path tonight/skipped.png --selector '#tonightCard'` and `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs aria --path tonight/skipped.aria.txt`. The PNG shows PillowNotes and the tonight card. The ARIA file contains `去放鬆倒數`.

## Gotchas

- Saving a dump, tapping protocol `1` or `0`, tapping `#bedCheckpoint`, or tapping `#stillAwakeBtn` marks the matching tonight step done. Run this recipe on a fresh profile before those actions.
- `#tonightDo` for the dump step focuses the composer. It does not create a dump. This recipe uses Skip so the proof does not depend on typed text.
- Skip on the bedtime or still-awake step is a later entry point. On a fresh card the first Skip only completes Dump. Do not report the later skips as verified from this single tap.
- The card is not shown on the 更多 tab. A missing card there is the tab filter, not a failed hide.
