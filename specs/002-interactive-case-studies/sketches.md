# Layout Sketches: /work/internationalization

**Feature**: 002-interactive-case-studies | **Date**: 2026-08-29 | **Status**: SUPERSEDED —
Jason opted for code-first review (vertical slice, tweak in browser) over wireframe sign-off.
Retained as a layout record. A 2026-08-29 verification pass found the sketch under-drew
several FR-mandated elements (the ~10% i18n-bug stat + 30–35% rule in the expansion demo,
a multilingual-country example in the flags demo, the hero's aria-live result line,
static-state notes on all demos, Pause/Stop in the mobile running state, segment titles
as h2s, anchor names per the schema contract e.g. `business-language-select`, no donut
chart — text rows only). Those are all already mandated by the committed spec/contracts
and flow into implementation from there, not from this sketch.
**Purpose**: wireframe-level layout agreement BEFORE implementation. Companion visual
wireframes are published as a private artifact (link in PR/conversation).

Conventions: `┄┄` = hairline rule; `[ ]` = interactive control; `{anchor}` = replica
`data-anchor` id; all styling flat per FR-013a (no shadows — elevation via background tone).

## 1. Page skeleton (desktop ≥1024px)

```
┌────────────────────────────────────────────────────────────┐
│ (skip link — visually hidden until focused)                │
│ JG ←wordmark, links home          (no TopBar/LeftRail/⌘K)  │
│                                                            │
│  CASE STUDY                        ← mono eyebrow          │
│  Internationalization at Klaviyo   ← h1, display serif     │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄                            │
│  Company   Klaviyo                 ← meta rows, mono       │
│  Role      Design Strategy · Lead · Hands-on · People      │
│  Timeline  Q4 2023 – Q2 2024                               │
│                                                            │
│  ╔══ HERO: LanguageBreakDemo (frame, ~900px) ═══╗          │
│  ║  (see §2)                                    ║          │
│  ╚═══════════════════════════════════════════════╝        │
│                                                            │
│  Prose: Overview ……………………………… ← ~680px measure             │
│  …the initiative had been a long-standing i18n̲ ⓘ …         │
│         (dotted-underline glossary chip, expands inline)   │
│                                                            │
│  ## Text expansion        ← h2 + intro prose               │
│  ╔══ TextExpansionDemo frame ══╗                           │
│  ## Word order                                             │
│  ╔══ WordOrderDemo frame ══╗                               │
│  ## Formatting                                             │
│  ╔══ FormattingDemo frame ══╗                              │
│  ## Cultural elements                                      │
│  ╔══ FlagsRuleDemo frame ══╗                               │
│                                                            │
│  ## The design work       ← walkthrough intro prose        │
│  ╔══ Player: Organization settings ══╗   (see §4)          │
│  ╔══ Player: Personal settings ══╗                         │
│  ╔══ Player: Email translation ══╗                         │
│                                                            │
│  ## Impact                ← prose, published figures       │
│  ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄                            │
│  footer line (© / colophon-style, minimal)                 │
└────────────────────────────────────────────────────────────┘
```

- Prose column: ~680px, left-aligned (Principle IV measure).
- Demo/player frames: single column, may break out to ~900px max → **OPEN QUESTION Q1**.
- Three player blocks share walkthrough state (FR-021 continuity) but each is
  self-contained with its own steps/controls.

## 2. Hero — LanguageBreakDemo

```
╔════════════════════════════════════════════════════════════╗
║  Language:  [ English ▾ ]        ← the ONLY control        ║
║ ┌─────────────┬────────────────────────────┐               ║
║ │ ▦ Meridian  │  Campaign scheduling       │               ║
║ │ Home        │  Send [immediately ▾] after│ ←{inline-     ║
║ │ Campaigns   │  signup                    │   sentence}   ║
║ │ Flows       │  Monthly sends: 5,123,456  │ ←{stat-value} ║
║ │ Audience    │                            │               ║
║ │ ┌─────────┐ │                            │               ║
║ │ │Create an│ │ ←{cta-button}, fixed width │               ║
║ │ │abandoned│ │                            │               ║
║ │ │cart flow│ │                            │               ║
║ │ └─────────┘ │                            │               ║
║ └─────────────┴────────────────────────────┘               ║
╚════════════════════════════════════════════════════════════╝
```

Switching to Deutsch (instant state change — no scripted motion, FR-010b):
`{cta-button}` truncates mid-word · `{inline-sentence}` dropdown strands mid-German
· `{stat-value}` keeps US formatting (wrong). Three numbered annotation pins appear
with one-line labels + "See §…" links (`annotationLinks` → prose/demo block ids).
Static/no-JS state: English, with `staticCaption` beneath.

## 3. Concept demos (each: h2 → intro prose → frame → aria-live result line)

**TextExpansionDemo** — three stacked units:
```
╔══════════════════════════════════════════════════════╗
║ EN  Create an abandoned cart flow            29 chars ║
║ DE  Erstellen Sie einen Ablauf für abgebro…  54 chars ║
║ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄    ║
║ Button width  [══════●═════════] 340px               ║
║ ┌────────────────────────────┐                       ║
║ │ Erstellen Sie einen Ablauf…│ ← tooltip on ⓘ/focus  ║
║ └────────────────────────────┘                       ║
║ ⚠ At this width the label reads as "Create a         ║
║   canceled flow" — meaning silently changed.         ║
║ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄    ║
║ Plan for expansion: [type any UI string_______]      ║
║ 29 chars → reserve 180%  ▓▓▓▓▓▓▓▓▓░░░░░░ (W3C tier)  ║
╚══════════════════════════════════════════════════════╝
```

**WordOrderDemo**: sentence w/ live inline `[dropdown]`, `EN | DE` toggle shows the
German reassembly stranding the control; below, the corrected pattern (label above,
control below) with a ✓.

**FormattingDemo**: `Locale [ en-US ▾ ]` over a fixed-height table — rows: Number /
Percentage / Currency (precise) / Currency (compact); columns: format-name, value.
Unsupported locale row → italic fallback note. `tabular-nums`, `<bdi>` on values.

**FlagsRuleDemo**: two side-by-side mini-panels — "Country ✓" (phone input with
flag, correct) vs "Language ✗" (toggle `[flags on]` shows 🇪🇸/🇲🇽/🇦🇷 ambiguity badges
for "Spanish"; correct version is text-only "Español, Français, 日本語").

## 4. Walkthrough player anatomy

```
╔══ ORGANIZATION SETTINGS ═════ mono segment label ══════════╗
║ ┌────────────────────────────────────────────────────────┐ ║
║ │              REPLICA VIEWPORT (see §5)                 │ ║
║ │        highlight ring = 2px accent, no glow            │ ║
║ │  [toast slot, top-right inside viewport, visual-only]  │ ║
║ └────────────────────────────────────────────────────────┘ ║
║ Step 3 of 8   Business language sets the default for      ║
║               every new teammate.        ← caption (live) ║
║ ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄    ║
║ [◁ Prev] [▷ Play walkthrough] [❚❚ Pause] [◻ Stop] [Next ▷]║
║ ▸ Transcript                 ← disclosure, narrationText  ║
╚════════════════════════════════════════════════════════════╝
```

States: **idle** = first-step static state, only "Play walkthrough" + Prev/Next
active. **running** = Pause/Stop visible (FR-009), caption announces via aria-live.
**paused/complete** = state readable, Restart offered at complete. **Reduced
motion** = Play becomes "Step through"; transitions instant; identical captions.
Arrow keys = Prev/Next when player focused (no Tab capture).

## 5. Replica screens (all inside `.replicaFrame`, flat, fictional "Meridian")

**org-settings** — `{business-language}` select, `{business-format}` select,
`{localization-langs}` checkbox group (French/German/Spanish…), `{preview-card}`
(date/number/currency samples re-rendered per selection), `{save}` button → toast.
**personal-settings** — same panel minus localization group; personal overrides
+ note "Only your account uses this language."
**email-editor** — subject row (idiomatic line: "Knock your socks off ☕"), preview
text row, content-block list, `{translate-btn}` top-right.
**translate modal (overlay of email-editor)** — step 1: audience preferred-language
breakdown (French 22% / German 17% / … + donut placeholder) with checkboxes limited
to org-selected languages (FR-021); step 2: side-by-side source/translation rows,
literal idiom translation flagged + edited; `{stale-badge}` appears on rows after a
source edit; `{retranslate}` action clears it.

## 6. Mobile (≤767px; player framing per FR-012a)

```
┌──────────────────┐  Page: same order, one column, prose
│ JG               │  full-width; demo frames full-bleed to
│ CASE STUDY       │  16px gutters; no horizontal scroll.
│ Internationaliz… │
│ …                │  Player: viewport shows the step's
│ ┌──────────────┐ │  focusRegion ONLY (e.g. just the
│ │ focusRegion  │ │  language field + preview card),
│ │ (cropped     │ │  caption below, controls in a row
│ │  region)     │ │  pinned under the viewport (not
│ └──────────────┘ │  sticky — OPEN QUESTION Q3).
│ Step 3/8 caption │
│ [◁][▷ Play][▻]   │
└──────────────────┘
```

## 7. Open questions for Jason

- **Q1 — Frame breakout width**: RESOLVED BY THE CONSTITUTION, not actually open.
  Principle IV's ~640–720px maximum content measure is a Required invariant, and the
  v1.2.x exceptions relaxed motion and page count only. Frames HOLD the prose measure;
  a ~900px breakout would require a bounded constitution amendment first. Implementation
  default: compliant width; revisit via amendment only if replicas prove cramped.
- **Q2 — Hero position**: break demo immediately after the meta rows (sketched), or
  above the meta rows as the very first thing under the h1?
- **Q3 — Mobile player controls**: pinned under the viewport (sketched) or sticky
  at screen bottom while a segment is engaged?
- **Q4 — Walkthrough presentation**: mostly decided by the committed data model
  (three `WalkthroughSegment` blocks, each titled with its own h2). Only the narrow
  presentation variant remains open: should a visual progress rail connect the three
  segment blocks?
- **Q5 — Meta block**: keep the deck-style Company/Role/Timeline rows (sketched),
  or fold into a single prose intro line?
