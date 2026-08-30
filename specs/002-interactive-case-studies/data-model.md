# Data Model: Interactive Case Studies

**Feature**: 002-interactive-case-studies | **Date**: 2026-08-29
**Source**: spec.md Key Entities + research.md D6/D7/D12

All content is version-controlled TypeScript under `src/content/work/` — no
database, no CMS, no runtime fetching. Types live in `src/content/work/types.ts`;
`tsc --noEmit` is the validator.

## Entity: CaseStudy

The root artifact, one per study, registered in the study registry.

| Field | Type | Rules |
|---|---|---|
| `slug` | `string` | URL segment under `/work/`; unique in registry; kebab-case |
| `title` | `string` | Page + OG title; safe for link previews (D16) |
| `description` | `string` | Meta/OG description; safe for link previews |
| `listed` | `boolean` | ALWAYS `false` at ship (FR-002); flipping is a per-study PR decision (FR-003) |
| `company` | `string` | e.g. "Klaviyo" |
| `role` | `string` | e.g. "Design Strategy, Design Lead, Hands-on Design, People Leader" |
| `timeline` | `string` | e.g. "Q4 2023 – Q2 2024" |
| `blocks` | `ContentBlock[]` | Ordered page composition (FR-005) |

**Registry**: `src/content/work/index.ts` exports `studies: CaseStudy[]`.
`generateStaticParams` and the 404 rule (D2) derive from it. `listed` drives
nothing today (all unlisted) but is the single flip point FR-003 requires.

## Union: ContentBlock

`ProseSection | ConceptDemoBlock | WalkthroughSegment` (discriminated on `kind`).
Glossary terms bind inside prose via inline markers (below).

### ProseSection

| Field | Type | Rules |
|---|---|---|
| `kind` | `'prose'` | — |
| `id` | `string` | Anchor for the break-demo annotations (FR-014 deep links) |
| `heading` | `string` | One `<h2>` per section; single logical hierarchy (Principle I) |
| `body` | `RichText` | Paragraph runs; inline `GlossaryRef` and emphasis only |

`RichText` = array of paragraph nodes; a node is a string or `{ term: GlossaryTermId }`
(renders the glossary chip, FR-015/D13). No arbitrary HTML in content modules.

### ConceptDemoBlock

| Field | Type | Rules |
|---|---|---|
| `kind` | `'demo'` | — |
| `id` | `string` | Anchor id; break-demo annotations link here |
| `demo` | `DemoId` | `'language-break' \| 'text-expansion' \| 'word-order' \| 'formatting' \| 'flags-rule'` |
| `intro` | `RichText` | Framing prose rendered above the demo |
| `staticCaption` | `string` | Describes the server-rendered initial state for no-JS/noscript (FR-013) |
| `annotationLinks` | `Record<string, string>?` | Break demo: annotation id → block id for FR-014's deep links; build-time assertion verifies every referenced block id exists |

Demo configs (strings, locales, tier tables) are code-level constants owned by each
demo component, sourced verbatim from the published guidelines (FR-024, SC-007) —
they are implementation constants, not authorable content, so studies can't
accidentally alter published facts. They are pinned to their documented
sources — public Ascent pages where public; Jason's deck for word-order,
referenced by location per research.md provenance (FR-024, SC-007) — as
linguistic claims, never exact-glyph strings to compare against live output
(research D10).

### WalkthroughSegment

| Field | Type | Rules |
|---|---|---|
| `kind` | `'walkthrough'` | — |
| `id` | `string` | Anchor id |
| `title` | `string` | e.g. "Organization settings" |
| `screen` | `ReplicaScreenId` | Which replica screen this segment drives |
| `steps` | `WalkthroughStep[]` | ≥1; ordered |

### WalkthroughStep

| Field | Type | Rules |
|---|---|---|
| `target` | `AnchorId<screen>` | Compile-time-checked replica anchor (D6) |
| `action` | `StepAction` | `'highlight' \| 'click' \| 'input' \| 'select' \| 'toast' \| 'transition'` |
| `highlight` | `boolean` | Draw the attention ring on `target` |
| `caption` | `string` | Rendered caption; also the aria-live announcement |
| `narrationText` | `string` | REQUIRED now (FR-011/D12); transcript source; future MP3 script |
| `durationMs` | `number` | Autoplay pacing only; ignored in self-guided + reduced-motion modes |
| `value` | `string?` | For `input`/`select` actions: the value the replica shows |
| `focusRegion` | `AnchorId<screen>?` | Mobile framing region (FR-012a/D9); defaults to `target` |

## Entity: ReplicaScreen (component-level, not authorable)

`ReplicaScreenId` = `'org-settings' | 'personal-settings' | 'email-editor' |
'sidebar-break'`. The translate modal is an OVERLAY STATE of the
`'email-editor'` screen, not a screen of its own: the `TranslateModal`
component's anchors join email-editor's anchor union, and steps open/close it
via actions (`click` on the translate control, `transition`). This keeps each
WalkthroughSegment on a single screen and the `AnchorId<screen>` typing sound
while the email segment spans editor + modal (FR-020/FR-021). Each replica
component exports its anchor-id union type + renders `data-anchor` attributes. Adding a screen = adding a component
and its anchor union; no player changes (SC-006).

Replica state is driven entirely by the player from step data (a pure
`reduce(steps[0..i])` → screen props). Replicas hold no study knowledge.

**Continuity rule (FR-021)**: the walkthrough state accumulates
`selectedLocalizationLanguages` from the org-settings segment; the translate-modal
replica receives exactly that list. Enforced in the state reducer, verifiable in
US1 scenario 7.

## Entity: GlossaryTerm

| Field | Type | Rules |
|---|---|---|
| `id` | `GlossaryTermId` | `'i18n' \| 'l10n' \| 'globalization' \| 'translation' \| 'locale'` |
| `label` | `string` | Chip text as it appears inline |
| `definition` | `string` | Disclosure body; sourced per FR-024 |

Stored once in `src/content/work/glossary.ts`; studies reference by id.

## Page heading contract (Principle I)

StudyPage renders exactly one `<h1>` from `CaseStudy.title`. `ProseSection.heading`,
`WalkthroughSegment.title`, and each concept demo's section label render as `<h2>`
(demos via `aria-labelledby` pointing at their `<h2>`), preserving a single logical
heading hierarchy.

## Player state machine

```
idle ──play──▶ running ──pause──▶ paused ──play──▶ running
  ▲              │  ▲               │
  └────stop──────┘  └────step-advance (timer OR user)───┘
running at last step ──▶ complete (state persists, restart offered)
```

- `mode`: `'self-guided' | 'autoplay'`; reduced motion forces `self-guided` pacing
  (timers disabled) regardless of mode (D8).
- `stepIndex` moves ±1 (US1 scenario 5: backward always allowed).
- No persistence: leaving the page discards state (spec edge case).
- `idle` renders the segment's first-step static state (server-renderable, D5).

## Validation

- Type-level: anchor ids, demo ids, glossary ids are unions — invalid references
  fail `tsc --noEmit` (existing gate).
- Registry-level: a tiny build-time assertion module (imported by the registry, no
  test framework — Principle III) throws at build on: duplicate slugs, empty
  `blocks`, empty `steps`, missing `narrationText`, and `annotationLinks`
  referencing a block id that does not exist in the study.
