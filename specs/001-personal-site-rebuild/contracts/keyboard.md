# Contract: Keyboard & Cmd+K Palette

**Feature**: 001-personal-site-rebuild
**Related**: FR-060, FR-073, US4

## Global keyboard shortcuts

Available on every page after the first paint.

| Keys                | Action                                        |
|---------------------|-----------------------------------------------|
| `Cmd+K` (macOS) / `Ctrl+K` (Windows/Linux) | Toggle command palette open/closed |
| `Esc` (palette open) | Close command palette                        |
| `↑` / `↓` (palette open) | Move highlighted item                    |
| `Enter` (palette open) | Activate highlighted item                  |
| `Tab` / `Shift+Tab` | Move focus through interactive elements      |

The palette MUST NOT swallow other key events (no global hotkey hijacking
beyond the explicit set above). The Cmd/Ctrl+K listener MUST be removed on
component unmount.

## Palette contents

Items are read from `src/content/palette.ts` and grouped in this fixed
display order: Navigate → Work → External → Meta. Within each group, items
appear in array order.

| Group     | Item                  | Action                            | Hint        |
|-----------|-----------------------|-----------------------------------|-------------|
| Navigate  | Now                   | scroll to `#now`                  | jump        |
| Navigate  | Selected work         | scroll to `#work`                 | jump        |
| Navigate  | Writing               | scroll to `#writing`              | jump        |
| Navigate  | Experience            | navigate `/experience`            | page        |
| Navigate  | Writing (page)        | navigate `/writing`               | page        |
| Navigate  | Colophon              | navigate `/colophon`              | page        |
| Work      | Hi Marley             | scroll to `#hi-marley`            | role        |
| Work      | Hypoth                | scroll to `#hypoth`               | studio      |
| Work      | Klaviyo               | scroll to `#klaviyo`              | role        |
| Work      | Vertex                | scroll to `#vertex`               | role        |
| External  | GitHub                | open external                     | ↗           |
| External  | LinkedIn              | open external                     | ↗           |
| External  | Substack              | open external                     | ↗           |
| External  | Hypoth.ai             | open external                     | ↗           |
| External  | Wren                  | open external                     | ↗           |
| Meta      | Email Jason           | copy `hello@jasongrant.me`        | copy        |
| Meta      | Download resume       | navigate `/resume.pdf`            | pdf         |
| Meta      | View source           | open `view-source:` of current URL| this page   |
| Meta      | GitHub repo           | open external (repo URL)          | ↗           |

`Navigate` items that map to in-page anchors are only valid on `/`. On other
pages, they switch to "navigate to / + anchor" semantics automatically (the
`scroll-to` action checks `location.pathname` first).

## Filter behavior

- Live filter against `label + group + hint` (case-insensitive substring).
- Empty query shows all items in the canonical group order.
- No fuzzy matching, no scoring (the list is short; substring is enough).
- Highlighted index resets to 0 on each keystroke.

## Accessibility (WCAG AA)

- Palette modal has `role="dialog"` and `aria-modal="true"`.
- Focus moves into the search input on open.
- On close, focus returns to the trigger that opened the palette.
- The list has `role="listbox"`; items have `role="option"`; selected item
  carries `aria-selected="true"`.
- The currently highlighted item is communicated via
  `aria-activedescendant` on the input.
- Backdrop click closes the palette (matches Esc semantics).
- The Cmd+K trigger button in TopBar has `aria-label="Open command palette"`.

## Performance

The palette component is `"use client"`. Its bundle MUST be code-split per
React Server Components defaults (Next.js handles this automatically as long
as the import is from a client island, not from a server component's module
graph). The palette is rendered lazily — its DOM is mounted only after the
first open event.
