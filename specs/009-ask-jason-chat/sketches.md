# Layout Sketches: Ask Jason chat widget

**Feature**: 009-ask-jason-chat | **Date**: 2026-11-01 (revised the same day) | **Status**:
DRAFT — for layout agreement before planning. Drawn against the answers recorded in the spec's
Clarifications: a floating bottom-centre input that morphs into the panel (Q1, as revised by
Jason), a build-time flag with a private production mode (Q2), and a right-docked non-modal
panel on desktop with a modal sheet on phones (Q3).
**Purpose**: wireframe-level layout agreement BEFORE implementation. Every frame carries the
header with the disclosure (FR-008), including error and capped states.

Conventions: `┄┄` = hairline rule (`--rule`); `[ ]` = interactive control; `( )` = static mono
label / eyebrow; `▒▒` = reserved space (fixed height, fills later); `░░` = elevated tone block
(no border, no shadow); `⋯` = thinking mark; `↗` = outward link mark; `▔▔` = sheet grabber.
All styling flat per constitution Principle IV: elevation by background tone only, hairline
borders only, no shadows. Phone frames are 360 px wide (inner 328 px); tablet 768 px; desktop
1440 px. Not to scale vertically.

Type in the widget (existing families and sizes only): mono 13 px for eyebrows, labels,
counters and controls; body sans 17 px for messages and card titles; body sans 13 px for the
disclosure, notice and card summaries. No display serif inside the widget: it is a framed device,
not a page.

## 1. Closed entry point: the floating input (FR-001 to FR-004b)

### 1.1 Desktop and tablet (≥ 768 px)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ─ NOW        jasongrant.me                                  [⌘ K]  (portrait) │
│ ─ WORK                                                                       │
│ ─ WRITING    I'm a design leader who ships production code.                  │
│              …                                                               │
│              …page content, unchanged…                                       │
│              …                                                               │
│              GITHUB   LINKEDIN   SUBSTACK   HELLO@JASONGRANT.ME               │
│              Built by hand · Next.js · source on GitHub ↗ · [⌘K]      © 2026  │
│              ▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 72 px reserved below the footer (flag on) ▒▒▒▒▒  │
│                ┌──────────────────────────────────────────────┐              │
│                │ How do you lead and still ship c▍ [ASK JASON →]│              │
│                └──────────────────────────────────────────────┘              │
└──────────────────────────────────────────────────────────────────────────────┘
                   ↑ fixed, bottom 24 px, centred, 440 × 48 px, radius 12 px,
                     hairline border, --bg-elev, no shadow; below the palette's
                     backdrop, above the left rail
```

Bar anatomy:

```
┌──────────────────────────────────────────────────┐
│  How do you lead and still ship c▍  [ASK JASON →] │
└──────────────────────────────────────────────────┘
   ↑ single-line field, body 16 px, --ink;        ↑ the bar's visible label: mono 13 px
     placeholder in --ink-mute, retyping (1.4);     button, 44 px hit area; with text it
     accessible name always "Ask Jason"             sends, without text it opens
```

- The top bar is unchanged (wordmark, ⌘K, portrait). No footer link.
- Server-rendered at final size and out of flow: it never appears late and shifts nothing
  (FR-003). Pages reserve 72 px below their last content when the flag is `on`, and focused
  elements scroll clear of the bar.
- Enter or the button with text: the bar morphs into the panel with the text as the first
  message (§2.4). Without text: the panel opens to the empty state (§4.2).
- While the panel is open the bar is gone (it is the panel). On close it returns reading
  "Ask a follow-up", with no rotation and no nudge; after an ended or call-to-action state it
  returns as a button, "Chat closed · email me", that reopens the panel.
- In `private` mode (production before launch) the bar appears only in a browser armed with
  Jason's preview key, after load; every other visitor sees the page exactly as today (spec
  FR-047b).

### 1.2 Command palette (FR-002)

```
Command palette (⌘K):
  META
   Ask Jason ……………………………………………………………………………… chat
   Email Jason ………………………………………………………………………… copy
   Download resume …………………………………………………………… pdf
```

- One item in the Meta group; choosing it closes the palette, then fades the panel in without
  the morph (FR-046); Close returns focus to the floating input (FR-039).

### 1.3 Phone (< 768 px)

```
┌────────────────────────────────────┐
│ jasongrant.me             [⌘K] (◯) │
│                                    │
│ I'm a design leader who            │
│ ships production code.             │
│ …                                  │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ What do you look f▍[ASK JASON →]│ │  ← full width − 16 px gutters, 48 px tall,
│ └────────────────────────────────┘ │    16 px + safe-area inset above the bottom
└────────────────────────────────────┘
```

- On phones the bar is one tappable control that looks like a field: a tap opens the sheet at
  once (§2.3) with focus in the sheet's composer, so the keyboard never rises under a fixed
  bar. The placeholder still retypes and the nudge still runs (1.4).
- At 320 px the question ellipsizes before the button does; the button never wraps.

### 1.4 Placeholder rotation and nudge (FR-004a, FR-004b)

```
t = 0 s    static placeholder: "Ask about my work, how I lead, or what I've written"
t = 2 s    types "How do you lead and still ship code?"      ≈ 30 ms a character
           holds 3 s · clears
           types "What happened with i18n at Klaviyo?"        holds 3 s · clears
           types "What do you look for when hiring?"          holds 3 s · clears
           rests 8 s · repeats the set · at most three cycles · then static for good
nudge      earliest 20 s; at most every 45 s; at most three per page view; only while the
           rotation rests: border and button text → --accent and back over 600 ms; nothing
           moves, scales or shimmers (a sheen is a moving gradient, banned)
stop       any focus, hover, pointer down or keystroke ends both for the page view and shows
           the static placeholder; a hidden tab pauses both; reduced motion: static, no nudge
```

```
│  How do you lea▍                    [ASK JASON →] │   typing (caret static, not blinking)
│  How do you lead and still ship code?[ASK JASON →] │   holding
│  Ask about my work, how I lead, or… [ASK JASON →] │   static, after focus or three cycles
│  Ask a follow-up                    [ASK JASON →] │   after a close with a live conversation
│  Chat closed · email me                      [→] │   after an ended / call-to-action state
```

- Questions are the empty-state starters, at most 40 characters each, so they fit the desktop
  bar; on phones they ellipsize.
- Nothing the rotation types ever enters the field's value, and nothing is announced.

## 2. Open widget (FR-038, FR-046)

### 2.1 Desktop ≥ 1280 px: right-docked non-modal panel

```
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│ ─ NOW        jasongrant.me                      [⌘K] (◯)      ┃ (ASK JASON)        [esc] │
│ ─ WORK                                                        ┃ You're talking with an   │
│ ─ WRITING   I'm a design leader who ships production code.    ┃ AI trained on Jason      │
│             …                                                 ┃ Grant's writing. It      │
│             I lead product design at Hi Marley, where …       ┃ speaks as Jason, but it  │
│                                                               ┃ isn't him.               │
│             ╔═ now ═══════════════════════════════╗           ┃ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│             ║ — Building …                        ║           ┃                          │
│             ╚═════════════════════════════════════╝           ┃   (transcript)           │
│                                                               ┃                          │
│             SELECTED WORK                                     ┃                          │
│             …                                                 ┃ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│                                                               ┃ [Ask about my work…    ] │
│                                                               ┃                   [SEND] │
│                                                               ┃ Your questions are kept  │
│                                                               ┃ for 30 days to improve   │
│                                                               ┃ the answers.             │
└──────────────────────────────────────────────────────────────────────────────────────────┘
                                                                ↑ 400 px, full height, fixed,
                                                                  1px hairline on its left edge,
                                                                  surface --bg-elev, no backdrop
```

- The page stays scrollable and clickable; nothing dims; the left rail stays. The panel sits
  above the page (z above the rail, below the command palette).
- The floating bar is gone while the panel is open: it became the panel (§2.4). Closing
  shrinks the panel back into the bar.
- At 1440 px the content column (720 px box, centred) ends at 1080 px, so the panel covers only
  margin. Under 1280 px it overlaps the right edge of the column (see 2.2).
- Enter: 200 ms, opacity + 16 px translate from the right; exit 150 ms. Reduced motion: opacity
  only, ≤ 100 ms (FR-044).

### 2.2 Tablet 768–1279 px: same panel, overlapping the column

```
┌──────────────────────────────────────────────────────────────────┐
│ jasongrant.me                    [⌘K] (◯)    ┃ (ASK JASON) [esc] │
│                                              ┃ You're talking    │
│ I'm a design leader who ships                ┃ with an AI …      │
│ production code. I lead design at            ┃ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ Hi Marley and founded Hypoth, …              ┃                   │
│                                              ┃  (transcript)     │
│ I lead product design at Hi Marley,          ┃                   │
│ where I'm consolidating the front-end …      ┃                   │
│                                              ┃ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ ╔═ now ══════════════════════════╗           ┃ [Ask about…     ] │
│ ║ …                              ║           ┃           [SEND]  │
│ ╚════════════════════════════════╝           ┃ Your questions …  │
└──────────────────────────────────────────────────────────────────┘
                                                ↑ still 400 px; covers part of the measure
```

- Accepted overlap: the panel is non-modal and closes with Escape; the visitor can read the page
  by closing or by scrolling what is visible. No pushing of page content (that would reflow the
  page; see §6 C8).

### 2.3 Phone < 768 px: modal bottom sheet

```
┌────────────────────────────────────┐
│ ░░░░░░░░░░ dimmed page ░░░░░░░░░░░ │  ← 24 px strip of the page, dimmed, tap closes
├────────────────────────────────────┤
│                ▔▔▔▔                │  ← grabber, swipe down closes
│ (ASK JASON)                  [esc] │
│ You're talking with an AI trained  │
│ on Jason Grant's writing. It       │
│ speaks as Jason, but it isn't him. │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│                                    │
│          (transcript)              │
│                                    │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ [Ask about my work, how I lead,  ] │
│                             [SEND] │
│ Your questions are kept for 30     │
│ days to improve the answers.       │
└────────────────────────────────────┘
```

- Height: viewport minus the 24 px strip, measured against the visible viewport so the on-screen
  keyboard shrinks the transcript, never hides the composer or the header (Story 6, scenario 3).
- Modal: page inert and scroll-locked; Escape, the Close control, the grabber swipe, and a tap
  on the strip all close it. Top corners 10 px radius; no shadow; surface `--bg-elev`.
- Opens from a tap on the floating bar (§1.3): the frame grows upward from the bar into the
  sheet (§2.4), ≤ 320 ms, interruptible by drag; focus lands in the sheet's composer, which is
  the one place on a phone where the keyboard may rise. From the palette: fade, no morph.
- Reduced motion: fade.

### 2.4 The morph: bar → panel → bar (FR-046)

```
t = 0                        t ≈ 160 ms                       t = 320 ms
page                         page                             page              ┃ (ASK JASON) [esc]
                                                                                ┃ You're talking…
                                                    ┌──────────┐                ┃ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
                                                    │          │                ┃ (YOU)
                                                    │  frame   │                ┃ ░░ How did you
   ┌───────────────────────────┐        ──▶          │  grows   │      ──▶       ┃ ░░ build the…
   │ How did you build…[ASK →] │                    │  and     │                ┃ (JASON · AI) ⋯
   └───────────────────────────┘                    │  travels │                ┃
                                                    └──────────┘                ┃ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
                                                                                ┃ [Ask a follow-up]
```

- Only the frame animates: its position and size go from the bar's box to the panel's box
  (on phones, upward from the bar into the sheet), ≤ 320 ms, standard ease-out, no overshoot.
- Contents crossfade and are never stretched: the bar's text and button fade out in the first
  ~100 ms; the header, the transcript (already holding the sent question as `(YOU)` and the
  thinking mark) and the composer fade in from ~160 ms.
- Close is the reverse in ≤ 240 ms: panel contents fade out first, the frame shrinks to the
  bar, the bar's contents fade in last. On phones a drag down also closes.
- The page never moves or dims on desktop; the phone sheet's scrim fades in with the frame.
- Reduced motion: no frame animation; the bar fades out and the panel fades in, ≤ 100 ms.
- From the command palette: no morph; the panel fades in over ≤ 200 ms.

## 3. Panel anatomy and measurements

```
┌────────────────────────────────────┐
│ (ASK JASON)                  [esc] │ ← header row 44 px: mono 13 uppercase, Close as a kbd
│ You're talking with an AI trained  │ ← disclosure: body 13 px, --ink-soft (6.3:1 on --bg-elev),
│ on Jason Grant's writing. It       │   reserved at 3 lines on phone / 2 on panel until health
│ speaks as Jason, but it isn't him. │   answers (▒▒ skeleton), then filled; never moves
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│                                    │ ← transcript: padding 16 px, messages 24 px apart,
│  (YOU)                             │   role="log", focusable, scrolls, never chains to page
│  ░░ visitor text, body 17 px, on   │
│  ░░ an ink@6% tone block, 8 px pad │
│                                    │
│  (JASON · AI)                      │ ← reply eyebrow = per-message heading
│  (FROM) [Title pill] [Title pill]  │ ← sources row, 32 px pills, only for `answer`
│  Reply text, body 17 px, --ink,    │
│  line-height 1.65, ~40 chars/line. │
│                                    │
│          [↓ JUMP TO LATEST]        │ ← 36 px pill, appears only when not following
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ (3 QUESTIONS LEFT)                 │ ← turn hint, mono 13, only when ≤ 3 remain
│ [Ask about my work, how I lead,  ] │ ← textarea 1→5 lines, 17 px, transparent, no border
│                   (412 LEFT) [SEND]│ ← counter from 80 % of limit; SEND = kbd-style button
│ Your questions are kept for 30     │ ← notice: body 13 px, --ink-mute (5.0:1), always with
│ days to improve the answers.       │   the composer
└────────────────────────────────────┘
```

Measurements:

| Element | Value |
|---|---|
| Panel width (tablet, desktop) | 400 px fixed; full viewport height |
| Sheet height (phone) | visible viewport − 24 px; keyboard shrinks the transcript |
| Header | 44 px row + disclosure (13 px × 1.5 line-height, reserved) + 1 px rule |
| Transcript padding | 16 px sides, 20 px top and bottom |
| Message gap | 24 px between turns; 8 px between eyebrow and body |
| Sources pill | 32 px tall, 10 px side padding, hairline border, radius 5 px, body 13 px |
| Option / starter card | full width, min 48 px (touch) / 40 px (pointer), padding 12 × 14, border `--rule-strong` + tone `--ink` @ 4 %, radius 6 px, 8 px gap |
| Composer | min 56 px; textarea grows to 5 lines; Send 36 × 28 px kbd button (44 px hit area on touch) |
| Jump to latest | 36 px pill, centred, 12 px above the composer rule |
| Bot-check surface | full inner width × 65 px challenge, 12 px padding, overlays the transcript bottom (see 4.3) |
| Focus ring | site default: 2 px `--accent` outline, 2 px offset |
| Floating bar | 440 × 48 px (tablet, desktop), full width − 32 px on phones; bottom 24 px, or 16 px + safe area; radius 12 px; hairline border; `--bg-elev`; field 16 px; button mono 13 px with a 44 px hit area |
| Reserved bottom space | 72 px below the page's last content when the flag is `on`; focused elements scroll clear of the bar |
| Morph | open ≤ 320 ms ease-out, close ≤ 240 ms; frame position and size only; contents crossfade; palette open = 200 ms fade |
| Rotation | starts at 2 s; ≈ 30 ms a character; holds 3 s; rests 8 s; ≤ 3 cycles; stops on first interaction |
| Nudge | 600 ms border + button text to `--accent` and back; earliest 20 s; ≥ 45 s apart; ≤ 3 per page view |
| Motion | message fade 150 ms; word fade ≤ 150 ms; reduced motion ≤ 100 ms opacity only, no rotation, no nudge |

## 4. States at phone width (FR-030)

Every frame below is the sheet body between the header rule and the bottom edge; the header is
drawn once per frame as `(ASK JASON) … disclosure` to keep it present.

### 4.1 Loading (FR-006)

```
┌────────────────────────────────────┐
│ (ASK JASON)                  [esc] │
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │  ← disclosure line reserved (3 lines on phone)
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│                                    │
│                                    │
│  (CONNECTING…)                     │  ← only after 300 ms without health
│                                    │
│                                    │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ [Ask about my work, how I lead,  ] │  ← typing works; Send waits for health
│                             [SEND] │
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │  ← notice reserved (2 lines)
│ ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ │
└────────────────────────────────────┘
```

### 4.2 Empty (Story 1, scenario 2)

```
┌────────────────────────────────────┐
│ (ASK JASON)                  [esc] │
│ You're talking with an AI trained  │
│ on Jason Grant's writing. It       │
│ speaks as Jason, but it isn't him. │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│                                    │
│  Ask me about my work, how I lead, │  ← greeting, body 17, one or two lines, Jason's copy
│  or what I've written.             │
│                                    │
│  (TRY ONE OF THESE)                │
│ ┌────────────────────────────────┐ │
│ │ How do you lead design and     │ │  ← starter card: title 17 px, ≥ 48 px tall
│ │ still ship code?             → │ │
│ └────────────────────────────────┘ │
│ ┌────────────────────────────────┐ │
│ │ What happened with             │ │
│ │ internationalization at        │ │
│ │ Klaviyo?                     → │ │
│ └────────────────────────────────┘ │
│ ┌────────────────────────────────┐ │
│ │ What do you look for when      │ │
│ │ hiring designers?            → │ │
│ └────────────────────────────────┘ │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ [Ask about my work, how I lead,  ] │
│                             [SEND] │  ← disabled while empty (no tooltip)
│ Your questions are kept for 30     │
│ days to improve the answers.       │
└────────────────────────────────────┘
```

- Starters share the option-card component (title only, no summary) and disappear after the
  first send. No bot check is visible yet.

### 4.3 Bot check (FR-013): checking, needs interaction, failed

Checking (silent; most visitors see only this, briefly, after their first keystroke):

```
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ (CHECKING…)                        │  ← replaces the turn-hint slot; mono 13, --ink-mute
│ [How did you build the design te…] │
│                             [SEND] │  ← Send shows a waiting state if pressed now
│ Your questions are kept for 30 …   │
```

Needs interaction (the challenge overlays the bottom of the transcript; nothing in flow moves):

```
┌────────────────────────────────────┐
│ (ASK JASON)                  [esc] │
│ You're talking with an AI trained  │
│ on Jason Grant's writing. It …     │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│  Ask me about my work, how I lead, │
│  or what I've written.             │
│  (TRY ONE OF THESE)                │
│ ┌────────────────────────────────┐ │
│ │ How do you lead design and   → │ │
│ ╔════════════════════════════════╗ │  ← overlay surface, --bg-elev + hairline, 12 px pad,
│ ║ (QUICK CHECK BEFORE WE START)  ║ │    anchored to the composer rule, covers ~110 px
│ ║ ┌────────────────────────────┐ ║ │
│ ║ │ [ ] Verify you are human   │ ║ │  ← Turnstile, flexible width × 65 px, dark theme
│ ║ │     Cloudflare · Privacy   │ ║ │
│ ║ └────────────────────────────┘ ║ │
│ ╚════════════════════════════════╝ │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ [How did you build the design te…] │  ← typing continues underneath
│                             [SEND] │
│ Your questions are kept for 30 …   │
└────────────────────────────────────┘
```

Failed (`bot_check_failed`):

```
│ ╔════════════════════════════════╗ │
│ ║ Couldn't verify this browser.  ║ │  ← error.message from the API, body 13
│ ║ [TRY AGAIN]   or email me ↓    ║ │
│ ╚════════════════════════════════╝ │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ [How did you build the design te…] │
│                             [SEND] │
```

- Status region: "Verification needed" when the challenge appears; the message on failure.

### 4.4 Sending (thinking) and 4.5 Streaming (FR-024)

```
┌────────────────────────────────────┐
│ (ASK JASON)                  [esc] │
│ You're talking with an AI trained  │
│ on Jason Grant's writing. It …     │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│  (YOU)                             │
│  ░░ How did you build the design   │
│  ░░ team at Vertex?                │
│                                    │
│  (JASON · AI)                      │
│  ⋯                                 │  ← 4.4 thinking mark, within 100 ms, ≥ 300 ms
│                                    │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ [                                ] │  ← composer cleared
│                             [STOP] │  ← Send is Stop while in flight
│ Your questions are kept for 30 …   │
└────────────────────────────────────┘

                 ↓ meta, then words

│  (JASON · AI)                      │
│  (FROM) [Vertex · Experience]      │  ← sources row appears at `meta`, before any text
│  I started with two people and a   │  ← words arrive at ≤ 20 ms each, each fading in
│  backlog nobody owned. The first   │    ≤ 150 ms; no caret; text wraps naturally
│  year was mostly                   │
│                                    │
│          [↓ JUMP TO LATEST]        │  ← only if the visitor has scrolled up
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ [                                ] │
│                             [STOP] │
```

- Status region: "Jason is answering" once, on send. Nothing per word.
- Reduced motion: words appear instantly; the thinking mark does not pulse.

### 4.6 Answer with source links (FR-026)

```
┌────────────────────────────────────┐
│ (ASK JASON)                  [esc] │
│ You're talking with an AI trained  │
│ on Jason Grant's writing. It …     │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│  (YOU)                             │
│  ░░ What do you think about design │
│  ░░ systems?                       │
│                                    │
│  (JASON · AI)                      │
│  (FROM) [Post-Figma design ↗]      │  ← external: new tab, outward mark, "(opens in new tab)"
│         [Design systems note ↗]    │    pills wrap to a second line; max three
│  I think of a design system as a   │
│  product with an audience, not a   │
│  library. The teams that treat it  │
│  as a library end up with a very   │
│  tidy graveyard.                   │
│                                    │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ [Ask a follow-up                 ] │  ← placeholder changes after the first reply
│                             [SEND] │
│ Your questions are kept for 30 …   │
└────────────────────────────────────┘
```

- Internal pill (an Experience section): same tab, panel stays open, conversation kept.
- Status region on `done`: the full reply (≤ 600 characters) or "Answer ready, N paragraphs".

### 4.7 Options reply with three cards (FR-027)

```
┌────────────────────────────────────┐
│ (ASK JASON)                  [esc] │
│ You're talking with an AI trained  │
│ on Jason Grant's writing. It …     │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│  (YOU)                             │
│  ░░ What was revenue at Hi Marley  │
│  ░░ last year?                     │
│                                    │
│  (JASON · AI)                      │
│  I don't have anything written on  │  ← fixed options text from the API
│  that. These are the closest       │
│  things I do have:                 │
│ ┌────────────────────────────────┐ │
│ │ App Shell Evolution at Hi      │ │  ← title, body 17 px, up to two lines
│ │ Marley                       → │ │
│ │ How one shell replaced three … │ │  ← summary, 13 px --ink-soft, one line, truncated
│ └────────────────────────────────┘ │
│ ┌────────────────────────────────┐ │
│ │ Designing AI-native claims   → │ │
│ │ What changes when the user is… │ │
│ └────────────────────────────────┘ │
│ ┌────────────────────────────────┐ │
│ │ Leading design at Hi Marley  → │ │
│ │ The first ninety days, and wh… │ │
│ └────────────────────────────────┘ │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ [Ask a follow-up                 ] │
│                             [SEND] │
│ Your questions are kept for 30 …   │
└────────────────────────────────────┘
```

- Always a vertical stack, so nothing wraps at 320 px; cards fade in with a 30 ms stagger
  (none under reduced motion). Accessible name: "Ask about App Shell Evolution at Hi Marley".
- Tapping sends the card's prompt as the next `(YOU)` message; the three cards stay, disabled
  (lower contrast, no arrow), once any next message is sent.

### 4.8 Deflection (FR-028)

```
│  (YOU)                             │
│  ░░ What's your salary?            │
│                                    │
│  (JASON · AI)                      │
│  I keep compensation out of this   │  ← fixed wording from the API; no sources, no cards
│  chat. If we get to that           │
│  conversation, it'll be a direct   │
│  one.                              │
│                                    │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ [Ask a follow-up                 ] │
│                             [SEND] │
```

- `none` renders identically. The example text is illustrative; the real wording comes from
  the API and is never edited by the widget.

### 4.9 Correction (FR-029)

```
│  (JASON · AI · UPDATED)            │  ← eyebrow gains UPDATED (mono, --accent)
│  (FROM) [Internationalization ↗]   │  ← re-rendered from the correction's meta
│  We shipped the first twelve       │  ← text crossfaded in place, opacity only, ≤ 200 ms,
│  languages in two quarters, with   │    never re-streamed; height may change, nothing above
│  the audit as the forcing          │    it moves
│  function.                         │
```

- Status region: "Answer updated" plus the text (same length rule as `done`).
- If the correction carries the options reply, the cards from 4.7 replace the text's sources.

### 4.10 Stopped (FR-021)

```
│  (JASON · AI · STOPPED)            │
│  I started with two people and a   │  ← what arrived stays
│  backlog nobody owned. The first   │
│                                    │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ (2 QUESTIONS LEFT)                 │  ← the turn is spent
│ [Ask a follow-up                 ] │
│                             [SEND] │
```

### 4.11 Network error (FR-037)

```
│  (YOU)                             │
│  ░░ How did you build the design   │
│  ░░ team at Vertex?                │
│                                    │
│  (JASON · AI · DIDN'T SEND)        │
│  The chat didn't respond. Check    │  ← the one site-authored network line
│  your connection and try again.    │
│  [TRY AGAIN]                       │  ← resends only when activated; no auto-retry
│                                    │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ [How did you build the design te…] │  ← the visitor's text is back in the composer
│                             [SEND] │
│ Your questions are kept for 30 …   │
```

- The same frame serves a dropped stream before `done` (the partial text stays above the line)
  and 20 s without `meta`. An `error` event instead shows `error.message` in the same position,
  with no Try again (the turn is spent).

### 4.12 Input rejected: over the limit, and `input_too_long` / `input_not_text` (FR-018, FR-032)

Over the limit, caught locally:

```
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ [I'm writing to ask about the way] │  ← textarea at 5 lines, scrolling
│ [you ran the audit at Klaviyo an…] │
│ […                               ] │
│                    (23 OVER) [SEND]│  ← counter in the error tone; Send disabled; nothing cut
│ Keep it under 500 characters.      │  ← replaces the notice line while over the limit
```

Rejected by the API (a code block or data URL slipped through):

```
│ [```const x = 1```               ] │  ← text kept
│                             [SEND] │
│ Plain text only, please: no code   │  ← error.message under the composer, error tone,
│ blocks or pasted files.            │    hidden "Error:" prefix for assistive technology
```

- Counter appears at 80 % of the limit as "(88 LEFT)" in `--ink-mute`, switches to the error
  tone at the limit. The limit comes from health, not the site.

### 4.13 Address limit (FR-034)

```
┌────────────────────────────────────┐
│ (ASK JASON)                  [esc] │
│ You're talking with an AI trained  │
│ on Jason Grant's writing. It …     │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│  (YOU)                             │
│  ░░ And what about Klaviyo?        │
│                                    │
│  (JASON · AI)                      │
│  That's a lot of questions from    │  ← error.message (illustrative wording)
│  one place today. Come back        │
│  tomorrow, or reach me by email.   │
│                                    │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ ░░ You can reach me directly:      │  ← contact call to action replaces the composer
│ ░░ [hello@jasongrant.me]           │    (FR-035): tone block, mail link, no input
│                                    │
└────────────────────────────────────┘
```

### 4.14 Ended: turn limit (FR-033)

```
┌────────────────────────────────────┐
│ (ASK JASON)                  [esc] │
│ You're talking with an AI trained  │
│ on Jason Grant's writing. It …     │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│  …                                 │  ← the whole transcript stays scrollable
│  (JASON · AI)                      │
│  (FROM) [Hypoth ↗]                 │
│  We write the question first and   │
│  ship narrow. …                    │
│                                    │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│ ░░ That's the end of this          │  ← site line at turns_left 0, or error.message on
│ ░░ conversation.                   │    `turn_limit` / `session_closed`
│ ░░ You can reach me directly:      │  ← contact block (FR-035)
│ ░░ [hello@jasongrant.me]           │
│                                    │
└────────────────────────────────────┘
```

- Status region: "No questions left" once. The turn hint showed "1 question left" before the
  last send.

### 4.15 Capped or unavailable: contact call to action instead of the input (FR-036)

```
┌────────────────────────────────────┐
│ (ASK JASON)                  [esc] │
│ You're talking with an AI trained  │  ← health still returns the disclosure when capped
│ on Jason Grant's writing. It       │
│ speaks as Jason, but it isn't him. │
│ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ │
│                                    │
│  The chat is resting for now. You  │  ← API message when there is one (`chat_capped`,
│  can reach me through the contact  │    `unavailable`); the site line for health capped/
│  info on my site.                  │    down and an unknown api_version
│                                    │
│ ░░ You can reach me directly:      │
│ ░░ [hello@jasongrant.me]           │
│                                    │
│                                    │  ← no starters, no composer, no notice
│                                    │
└────────────────────────────────────┘
```

- If the visitor already had a transcript in this page's lifetime (the cap tripped mid-session),
  it stays above the message, as in 4.13.

## 5. Keyboard and focus (FR-039 to FR-042)

| Where | Key | Result |
|---|---|---|
| Floating bar | Tab | Reaches the field, then the Ask Jason button; the rotation stops on focus |
| Floating bar, with text | Enter / button | Sends; the bar morphs into the panel; focus lands in the panel composer |
| Floating bar, empty | Enter / button | Opens the empty state; focus lands on the panel heading |
| Command palette | "Ask Jason" | Panel fades in; focus on the heading; Close returns focus to the bar |
| Anywhere in the panel | Escape | Closes; the panel shrinks back into the bar; focus returns to the floating input |
| Panel | Tab | Close → transcript (scrollable) → cards / pills in reading order → composer → Send; desktop panel is non-modal, so Tab after Send leaves the panel into the page |
| Composer (keyboard) | Enter / Shift+Enter | Send / new line (hint in the field's description) |
| Composer (touch) | Enter | New line; Send is the only submit |
| Streaming | focus on Stop | Stop ends display; focus moves to the composer when Stop disappears |
| Transcript detached | "Jump to latest" | Scrolls to the newest message; following resumes |

## 6. Choices these sketches make that the spec leaves open

- **C1 — Sources row above the reply text** (spec FR-026, contract note 10). Drawn above so the
  row is known at `meta` and never moves. Alternative: below the text after `done`, which reads
  more conventionally but appears late.
- **C2 — Header title in mono uppercase** (like the Now fence header), not the display serif.
  Alternative: body 17 px medium. Either keeps the disclosure as 13 px body text.
- **C3 — Send and Stop as kbd-style text controls** (`[SEND]`, `[STOP]`), matching the
  palette's `esc` key, rather than an icon button. An icon would need a new asset or library.
- **C4 — Visitor messages left-aligned on a tone block**, replies plain, both under mono
  eyebrows: a transcript, not chat bubbles. Alternative: right-aligned visitor bubbles.
- **C5 — Phone sheet leaves a 24 px strip of the page** with a grabber. Alternative: a
  full-screen sheet with Close only, which gives 24 px more transcript.
- **C6 — Thinking mark is three static dots** (`⋯`) with a slow opacity pulse, static under
  reduced motion. Alternative: the word "Thinking…" in mono.
- **C7 — The bot-check challenge overlays the transcript** above the composer (spec FR-013).
  Drawn covering about 110 px. Alternative: a permanent 65 px slot in the composer area, which
  would be empty space for most visitors.
- **C8 — The panel overlays the page under 1280 px** (spec Assumptions) rather than pushing
  the content column left. Pushing would reflow every page on open; overlaying keeps the page
  still and the panel closable. The centred modal was the Q3 alternative; not chosen.
- **C9 — "Ask a follow-up" placeholder after the first reply**; the first placeholder states the
  scope. Jason's copy.
- **C10 — Starters have titles only** (no summary line), so the empty state stays short on
  phones; option cards from the API keep their summary line.
- **C11 — Bar radius 12 px**, a soft rectangle in the palette card's family, not a full capsule.
- **C12 — The bar's visible label is the trailing "ASK JASON →" button**, not a prefix, so the
  retyping question gets the width; questions are capped at 40 characters.
- **C13 — The nudge is a colour change** of the border and button text to the accent, 600 ms.
  No sheen (a moving gradient is banned), no scale, no bounce.
- **C14 — On phones the bar is a button that opens the sheet**; typing happens in the sheet so
  the keyboard never rises under a fixed element. Desktop and tablet type in the bar.
- **C15 — 72 px reserved below the footer** when the flag is `on`, so the footer's links and
  ⌘K stay reachable above the bar; nothing is reserved in `private` mode for the public.

## 7. Questions resolved with Jason (2026-11-01)

- **Q1 — Entry point**: top-bar text control + footer link + palette item at first; superseded
  the same day by Jason's floating-input proposal, adopted and drawn in §1 and §2.4. The
  palette item stays; the top-bar control and footer link are gone.
- **Q2 — Flag**: build-time variable with a private production mode; Jason arms his own browser
  with a preview key to see the widget on production before launch (spec FR-047 to FR-047b).
  Chosen over the recommended preview-alias check; nothing in these frames changes.
- **Q3 — Desktop container**: right-docked non-modal panel, as drawn.
