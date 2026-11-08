# PillowNotes verification map

This directory is the maintained source for verifying the user-facing behavior of PillowNotes. Read this index, then use the matching feature file as the recipe.

## Baseline preconditions

- Launch from the repo root with `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs launch`.
- Use the printed `url`, `runId`, and `evidenceDir`. Do not assume port 8899.
- Require `doctor` to report `lang` `zh-Hant`, `mobileTab` `dump`, `innerWidth` 390, and `dumpCount` 0.
- Require `storage` to report `empty: true` before the first save in that profile.
- Never drive an instance that was not started by this verification run.

## Driving conventions

- Start every recipe from the baseline state unless its preconditions say otherwise.
- Prefer ids and `data-*` attributes over visible text. Quote every selector literally.
- Run every browser action through `pn-verify`. There is no CLI surface.
- Relative `screenshot` and `aria` paths are written under that run's `evidenceDir`.
- Pass `--run <id>` when more than one run is alive.
- Restore or delete rows the recipe created when the feature file says to. Do not remove proof artifacts during cleanup.

## Proof and skip reporting

- Capture the user action and the resulting state, not only the final screen.
- UI proof includes an ARIA snapshot and a screenshot with PillowNotes visible.
- Mutation proof includes `storage` or a reload that shows the same row again.
- Record the feature id and the entry point with every artifact.
- Report an unreachable path with the attempted command and the unmet precondition.
- Do not report a skipped entry point as verified through a different path.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior. It then uses exactly four H2 sections in this order.

1. `Sub-features` lists short IDs with one line for each behavior.
2. `How to get to it (user POV)` lists every user entry point.
3. `Driving it with pn-verify` starts with `Preconditions:` and uses labeled bullets that pair each user action with an exact command and observable result.
4. `Gotchas` lists traps that can waste or invalidate a verification run.

Keep implementation details out of the map. Name only user paths, stable handles, required state, commands, and observable proof.

## Features

- [Save a brain dump](./save-dump.md) covers the empty save, a tagged save, reload, and delete.
- [Mobile tabs](./mobile-tabs.md) covers the five bottom tabs (Dump, 今晚, 睡眠, 放鬆, 更多) and the canvas entry under 更多. Dump must not show the tonight card.
- [Sleep checkpoint](./sleep-checkpoint.md) covers bedtime and the checkpoint line the user reads back.
- [Wind-down](./wind-down.md) covers the 10-3-2-1-0 protocol buttons.
- [Tonight path](./tonight.md) covers the four-step card, skip, and hide.
