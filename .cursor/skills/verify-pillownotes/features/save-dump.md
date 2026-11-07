# Save a brain dump

Save a brain dump lets a person type what is on their mind, optionally mark a source tag, store it, see it in the list, and find the same row after a reload.

## Sub-features

- `dump-empty` refuses a save when the composer is blank.
- `dump-save` stores the typed text and the selected tag.
- `dump-persist` shows the same row after a reload.
- `dump-delete` removes that row from the list.

## How to get to it (user POV)

- Open the app. The Dump tab is the home screen.
- Tap the Dump tab (`.mtab[data-mobile-tab="dump"]`) from any other tab.

## Driving it with pn-verify

Preconditions:

- `doctor` reports `lang` `zh-Hant`, `mobileTab` `dump`, and `dumpCount` 0.
- `storage` reports `empty: true`.
- `#dumpList` text is `未有 dump — 由上面開始寫`.

- **Empty state.** Capture the composer before typing. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs screenshot --path save-dump/empty.png`. The shot shows PillowNotes, the Dump tab, and chip `0 則`.
- **Empty save.** Tap `儲存` with a blank composer. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '#savePillowDump'`. The command's `toast` is `未有內容`. `#dumpList` is still `未有 dump — 由上面開始寫`. `storage` is still `empty: true`.
- **Enter text.** Type a sentence. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs fill --selector '#pillowDump' --value '驗證：聽日 meeting 之前要卸低呢句'`. The command's `value` is that sentence.
- **Choose a tag.** Tap `工作`. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '#worryTags .tag[data-tag="工作"]'`. The command's `text` is `工作`.
- **Save.** Tap `儲存`. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '#savePillowDump'`. The command's `toast` is `已儲存 Dump`.
- **List shows the row.** Read the list and the chip. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs text --selector '#dumpList'` and `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs text --selector '#dumpCountChip'`. The list contains `驗證：聽日 meeting 之前要卸低呢句` and `#工作`. The chip is `1 則`.
- **Stored row.** Read the saved record. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs storage`. `dumps` has one object whose `text` is that sentence, `tags` includes `工作`, `forTomorrow` is false, and `toCanvas` is false.
- **Reload.** Load the page again. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs reload`. `dumpCount` is 1. `#dumpList` still contains the sentence and `#工作`.
- **Proof.** Scroll the row into view and capture it. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs screenshot --path save-dump/saved.png --selector '#dumpList'` and `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs aria --path save-dump/saved.aria.txt`. The PNG shows the sentence, `#工作`, chip `1 則`, and the Dump tab. The wordmark is on `save-dump/empty.png`. The ARIA file contains the sentence and `#工作`.
- **Delete.** Tap `Delete` on that row. Run `.cursor/skills/verify-pillownotes/scripts/pn-verify.mjs click --selector '#dumpList [data-dump-del]'`. `#dumpList` is `未有 dump — 由上面開始寫`. `storage` reports `dumps` as `[]`.

## Gotchas

- The composer has no separate title. The proof string is the textarea value.
- `#savePillowDump` stays enabled when the composer is empty. The empty state is the toast plus an unchanged list.
- Do not assert the clock string in the row. It is formatted in `Asia/Hong_Kong`.
- Tapping a tag does not clear `#toast`. After the empty save, the toast still reads `未有內容` until the successful save replaces it.
- A successful save marks tonight step Dump done, so `#tonightDo` changes from `做呢一步` to `去放鬆倒數`. That is one dump, not a second row.
- A viewport shot that does not scroll `#dumpList` into view still shows the composer and chip `1 則`. The sentence itself is below the fold.
- Delete does not set a toast. The list text and `dumps: []` are the proof. `storage.empty` stays false after a delete because tonight state is already stored. Count `dumps`.
- The delete control's visible label is the English word `Delete`.
