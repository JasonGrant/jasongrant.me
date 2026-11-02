# Contract: Surfaces — the bar, the panel, the sheet, and where they mount

Spec: FR-001 to FR-004, FR-038, Assumptions (breakpoints). Sketches §1 to §3.

## Mount points

| Layout | Mounts | Notes |
|---|---|---|
| `src/app/(main)/layout.tsx` | `<AskJason />` after `<CommandPalette />` | home, experience, writing, colophon |
| `src/app/work/[slug]/layout.tsx` | `<AskJason />` after `<CommandPalette />` | both studies |
| `src/app/deck/layout.tsx` | nothing | verified unchanged |
| `src/app/layout.tsx` (root) | nothing | verified unchanged |

`<AskJason />` is the client gate module of research D2; it renders `null` in `off`, the bar
plus the key gate in `private`, and the bar in `on`. The panel or sheet mounts lazily from
`AskJasonRoot` on first intent.

## Geometry

| Surface | Width | Height | Position | Radius | Border | Surface tone |
|---|---|---|---|---|---|---|
| Bar (≥ 768 px) | 440 px | 48 px | fixed; bottom 24 px; horizontally centred in the viewport | 12 px | 1 px `--rule-strong` | `--bg-elev` |
| Bar (< 768 px) | 100 % − 32 px | 48 px | fixed; bottom `calc(16px + env(safe-area-inset-bottom))`; 16 px side gutters | 12 px | same | same |
| Panel (≥ 768 px) | 400 px | 100 dvh (100 vh fallback) | fixed; top 0; right 0 | 0 | 1 px `--rule` on the left edge | `--bg-elev` |
| Sheet (< 768 px) | 100 % | `calc(100dvh − 24px)` (vh fallback); inline height from `visualViewport` while the keyboard is up | fixed; bottom 0 | 10 px top corners | 1 px `--rule` top edge | `--bg-elev` |
| Sheet scrim | 100 % | 100 % | the `<dialog>` backdrop | — | — | `rgba(10, 8, 5, 0.5)` as the palette |
| Bot-check surface | panel inner width − 24 px | content (challenge 65 px + 12 px padding + one line) | absolute inside the panel, anchored to the composer's top rule | 6 px | 1 px `--rule-strong` | `--bg-elev` |
| Jump to latest | content | 36 px | absolute, centred, 12 px above the composer rule | 18 px | 1 px `--rule-strong` | `--bg-elev` |

No shadows anywhere (constitution IV). Depth is tone and hairline only.

## Stacking

| Layer | z-index | Rationale |
|---|---|---|
| left rail | 5 | existing |
| bar | 20 | above page content, below everything that opens |
| panel | 30 | above the bar and rail |
| glossary popover (work pages) | 40 | existing; may overlap the panel, acceptable |
| command palette backdrop | 50 | existing; above the panel |
| sheet | top layer (native `<dialog>`) | above all of the above |

## Inside the bar

```
[ field ................................ ] [ ASK JASON → ]
```

- Field: `<input type="text">`, `aria-label="Ask Jason"`, `enterkeyhint="send"`,
  `autocomplete="off"`, `spellcheck` default, 16 px body sans, `--ink`, transparent background,
  no border of its own; the rotating overlay `<span aria-hidden="true">` sits over it while
  `BarMode = rotating`; the native `placeholder` attribute is set only while the overlay is
  inactive.
- Button: `<button type="submit">` with visible text "Ask Jason" and the arrow glyph as
  `aria-hidden`; mono 13 px uppercase; 44 × 44 px hit area (padding), 36 px visual height.
- The whole bar is a `<form>` so Enter submits natively; submit handler reads `draft`.
- On phones the field is `readonly` and `tabindex="-1"`, the form is wrapped in a single
  `<button>`-like control (the bar itself is the control) that opens the sheet; the sheet's
  composer takes focus. The visible layout is identical.
- In `BarMode = closed` the bar is one `<button>` reading "Chat closed · email me"; it opens the
  panel, which shows the ended or call-to-action block.
- Marker attribute `data-ask-jason="bar"` on the root element (used by the build check, D16).

## Inside the panel / sheet

```
header   (ASK JASON) ……………………………… [esc]
         disclosure (reserved 2 lines panel / 3 lines sheet)
         ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
body     transcript (role=log) | empty state | cta block
         [bot-check surface, absolute]  [jump to latest, absolute]
         ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
footer   turn hint (when ≤ 3) · composer · counter · Send/Stop · notice
```

- Header: `<h2 tabindex="-1">` "Ask Jason" (mono 13 px uppercase, visually; still the dialog's
  heading), disclosure `<p>` 13 px `--ink-soft`, Close `<button aria-label="Close">` styled as
  the palette's `esc` key. Header height is fixed once health has answered and the disclosure
  line is reserved before that.
- Body padding 16 px sides, 20 px top/bottom; messages 24 px apart; eyebrow to body 8 px.
- Footer: composer `<textarea>` labelled "Your question", 17 px, 1 → 5 rows then scroll,
  transparent, no border; counter mono 13 px right-aligned above Send; Send/Stop as kbd-style
  mono buttons, 44 px hit area; notice `<p>` 13 px `--ink-mute`.
- Visitor message: `<article>` with `<h3>` "You" (mono 13 uppercase `--ink-mute`), body on an
  `--ink` @ 6 % tone block, 8 px padding, radius 6 px.
- Reply: `<article>` with `<h3>` "Jason · AI" (+ "· Updated" / "· Stopped" / "· Didn't send"),
  optional "From" row, text 17 px `--ink`.
- Sources row: mono 13 px "FROM" label + pills: `<a>` 32 px tall, 10 px side padding, hairline
  border, radius 5 px, 13 px body text, 8 px gap, wrapping; external pills append the `ArrowOut`
  mark and visually hidden "(opens in new tab)" and use `target="_blank" rel="noreferrer"`.
- Option / starter cards: `<button>` full width, min-height 48 px touch / 40 px pointer,
  padding 12 × 14, border 1 px `--rule-strong`, radius 6 px, 8 px gap; title 17 px `--ink`
  (two lines max), summary 13 px `--ink-soft` single line with ellipsis, trailing "→"
  `aria-hidden`. Disabled cards: `--ink-mute` text, no arrow, `aria-disabled="true"`.
- Contact block: tone block, one site line + `<a href="mailto:…">` from `site.email`.

## Page reserve (mode `on` only)

- `.page` in both chrome layouts gets `padding-bottom` + 72 px via a class applied when
  `ASK_JASON_MODE === "on"`.
- `html { scroll-padding-bottom: 96px }` under the same condition.
- In `private` and `off` the public page CSS is unchanged.

## Command palette

- `src/content/palette.ts`: `{ group: "Meta", label: "Ask Jason", hint: "chat", action: { kind: "open-ask-jason" } }`.
- `src/types/content.ts`: `PaletteAction` gains `| { kind: "open-ask-jason" }`.
- `CommandPalette.runAction`: dispatches `window.dispatchEvent(new CustomEvent("open-ask-jason"))`
  after the palette closes (same 50 ms delay as other actions).
- Visibility: filtered out when the store says the widget is unavailable in this browser
  (`mode === "off"`, or `private` and not armed).

## Verified unchanged

`src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/deck/**`, `LeftRail`, `TopBar`, `Footer`
markup (the footer gains no link), fonts, tokens.
