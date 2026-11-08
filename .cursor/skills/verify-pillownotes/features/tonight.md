# Tonight path

Tonight path is the 今晚 tab. It walks four skippable steps: dump, wind-down, bedtime, and still awake. The card is not on Dump, sleep, or wind-down.

## Sub-features

- `tonight-show` shows four steps on a fresh day, with Dump active.
- `tonight-skip` marks the active step done and advances the card in place.
- `tonight-hide` tucks the card away and can bring it back.

## How to get to it (user POV)

- Tap 今晚 in the bottom bar. The card `#tonightCard` is on that tab.
- The same card is not on Dump, 睡眠, 放鬆, or 更多.
- Tap `收起` to hide it. Tap `今晚：Dump → 放鬆 → 瞓` to show it again. Both controls stay on the 今晚 tab.

## Driving it with pn-verify

Preconditions:

- Fresh launch. `storage` is `empty: true`. A saved dump already marks step Dump done, and this recipe would be looking at the wrong step.
- `doctor` reports `mobileTab` `dump` and `lang` `zh-Hant`.
- On Dump, `#tonightCard` is not visible. Open 今晚 before reading `#tonightDo`.
- After opening 今晚, `#tonightDo` text is `做呢一步`. If it is not, stop and report that the dump step is already done.

- **Dump has no card.** Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs visible --selector '#tonightCard'` and `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs visible --selector '#tonightRestore'`. Both report `visible: false`. `data-mobile-tab` is `dump`.
- **Open tonight.** Tap 今晚. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '.mtab[data-mobile-tab="tonight"]'`. `mobileTab` is `tonight`. `#tonightCard` is visible.
- **Four steps.** Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs text --selector '#tonightSteps'`. The text contains `第 1 步`, `Dump`, `第 2 步`, `放鬆`, `第 3 步`, `瞓`, `第 4 步`, and `仲醒`.
- **Active action.** Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs text --selector '#tonightDo'`. The text is `做呢一步`. `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs text --selector '#tonightSkip'` is `Skip`.
- **Skip dump.** Tap Skip. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '#tonightSkip'`. `mobileTab` stays `tonight`. `#tonightDo` is now `去放鬆倒數`. `storage` reports `tonight.done.dump` true and `tonight.done.wind` false. `dumps` is still `[]`.
- **Hide.** Tap `收起`. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '#tonightDismiss'`. `#tonightCard` is not visible. `#tonightRestore` is visible and its text is `今晚：Dump → 放鬆 → 瞓`.
- **Restore.** Tap the restore chip. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '#tonightRestore'`. `#tonightCard` is visible again. `#tonightDo` is still `去放鬆倒數`.
- **Dump still empty of the card.** Tap Dump. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '.mtab[data-mobile-tab="dump"]'`. `#pillowDump` is visible. `#tonightCard` and `#tonightRestore` are not visible.
- **Proof.** Return to 今晚 and capture the card. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '.mtab[data-mobile-tab="tonight"]'`, then `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs screenshot --path tonight/skipped.png --selector '#tonightCard'` and `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs aria --path tonight/skipped.aria.txt`. The PNG shows PillowNotes and the tonight card. The ARIA file contains `去放鬆倒數`.

## Gotchas

- Saving a dump, tapping protocol `1` or `0`, tapping `#bedCheckpoint`, or tapping `#stillAwakeBtn` marks the matching tonight step done. Run this recipe on a fresh profile before those actions.
- `#tonightDo` for the dump step leaves 今晚, focuses the composer, and does not create a dump. This recipe uses Skip so the proof does not depend on typed text and the card stays on 今晚.
- Skip marks the active step done and advances the card on 今晚. It does not switch to 放鬆 or 睡眠. The primary button still opens Dump, 放鬆, or 睡眠.
- Skip on the bedtime or still-awake step is a later entry point. On a fresh card the first Skip only completes Dump. Do not report the later skips as verified from this single tap.
- The card is not shown on Dump, 睡眠, 放鬆, or 更多. A missing card there is the tab filter, not a failed hide.
- After `收起`, the restore chip is on 今晚 only. Seeing that chip on Dump is a failure.
