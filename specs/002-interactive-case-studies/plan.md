# Implementation Plan: Interactive Case Studies (framework + Internationalization study)

**Branch**: `002-interactive-case-studies` | **Date**: 2026-08-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-interactive-case-studies/spec.md`

## Summary

Ship soft-unlisted interactive case studies at `/work/[slug]` under constitution
v1.2.0's two named exceptions: a reusable framework (typed content DSL, walkthrough
player, fictional-brand replica kit, five concept demos) plus the first study,
"Internationalization at Klaviyo." The study opens with a language-switch break
demo, teaches through direct-manipulation concept demos grounded verbatim in
Jason's published Ascent guidelines, and walks through the org-settings →
personal-settings → email-translation design via a scripted, user-initiated player
with a first-class reduced-motion mode and narration-ready step data (audio itself
deferred to the voice-clone pipeline).

Technical approach (research.md D1–D16): a dedicated `src/app/work/` route group
outside `(main)` keeps every byte of case-study JS off the three core pages;
studies are SSG via a typed registry with `dynamicParams=false`; demos and player
are server-rendered to their initial states and hydrated (no-JS fallback + CLS 0
for free); content is compile-checked TypeScript modules whose walkthrough steps
reference replica anchors as typed unions; replicas are flat, Principle
IV-compliant CSS Modules components over native elements; live locale formatting
uses the browser's own `Intl.NumberFormat` (the very API the published guideline
names); CI gains the study URL in both Lighthouse configs and the axe script.

## Technical Context

**Language/Version**: TypeScript 5.8 (strict), React 19.0, Next.js 15.3 App Router
**Primary Dependencies (added)**: none — the no-new-runtime-dependencies default
  holds; native elements + CSS Modules cover every control (research D7)
**Primary Dependencies (kept)**: `next`, `react`, `react-dom`, `classnames`,
  `@vercel/analytics`, `@vercel/speed-insights`, `sharp`, `react-icons`
**Storage**: N/A — typed content modules under `src/content/work/`; no database,
  no CMS, no runtime fetching
**Testing**: No functional test suites (Principle III). Gates: `tsc --noEmit`,
  Biome, Lighthouse ≥95 ×4 categories mobile+desktop incl. the study route,
  axe zero violations, manual keyboard/VoiceOver/reduced-motion passes,
  build-output comparison for core-page isolation (SC-004), line-by-line
  provenance pass (SC-007)
**Target Platform**: Evergreen browsers per repo browserslist (Chrome 105+,
  Safari 15.4+, Firefox 102+); Vercel static hosting
**Project Type**: Web (Next.js App Router, single project, fully SSG; zero new
  network egress — demos run entirely client-side on public browser APIs)
**Performance Goals**: Lighthouse ≥95 all four categories on
  `/work/internationalization`, mobile + desktop; CLS = 0; core pages byte-identical
**Constraints**: WCAG 2.1 AA; constitution v1.2.0 scripted-demonstrations
  exception conditions (a)–(f); Principle IV visual bans inside replicas
  (FR-013a); soft-unlisted (no sitemap, noindex, no nav); no horizontal page
  scroll on mobile (FR-012a); Safari 15.4 floor rules out container queries (D9)
**Scale/Scope**: 1 new route pattern (+1 static page at ship), ~8 replica
  components, 5 concept demos, 3 walkthrough segments (~15–25 steps), 5 glossary
  terms, 1 study registry; framework sized for N studies with study #2 already
  scoped as content-only (contracts/study-content-schema.md)

## Constitution Check

*GATE: evaluated against `.specify/memory/constitution.md` v1.2.1.*

| Principle | Status | Evidence |
|---|---|---|
| **I. WCAG 2.1 AA (NON-NEGOTIABLE)** | PASS | contracts/accessibility.md: native controls, keyboard map with no traps/global hotkeys, aria-live outcome lines (US2.3), focusable dismissible tooltip (1.4.13), reduced-motion first-class (FR-010). axe CI extended to the study route (D14). |
| **II. Performance Budget (NON-NEGOTIABLE)** | PASS | Study route added to both Lighthouse configs via `assertMatrix` — Perf/A11y/BP ≥0.95; SEO at the v1.2.1 deliberate-noindex maximum (D14). CLS 0 via server-rendered initial demo states (D5). Zero JS added to core pages — structural isolation (D1) verified by build comparison (D15/SC-004). No new dependencies, no new egress. |
| **III. Verification Without Functional Tests** | PASS | No test framework added. Build-time content assertions are compile/build failures, not a test suite (data-model.md Validation). Gates enumerated in quickstart.md. |
| **IV. Design-Engineer Craft** | PASS | Scripted-demonstrations exception satisfied condition-by-condition: (a) FR-009 user initiation, (b) FR-009 pause/stop, (c) FR-010/D8 reduced-motion peer variant, (d) FR-011/D12 no audio + in-place transcript, (e) FR-010a demonstration-serving motion only, (f) FR-010b player-scoped — concept demos are direct-manipulation with instant outcomes. Visual bans hold inside replicas (FR-013a/D7: flat, hairline + tone, scoped tokens). Site chrome untouched on work routes. |
| **V. Content Discipline & Network Coherence** | PASS | Unlisted-case-studies exception satisfied: soft-unlisted by default (D3/D4: noindex metadata, sitemap allowlist unchanged, no nav/palette links), fully gated (D14), recreated-content-only (D7 fictional brand; FR-007; proprietary sources stay in private storage per FR-024), deliberate-publicizing path (`listed` flag + PR, FR-003). Three-page IA untouched; quantified outcomes from published figures only (FR-023). |
| **Stack & Delivery Constraints** | PASS | No framework change; no new dependencies; CSS Modules + tokens (permitted styling); fonts untouched; public-repo "view source" quality applies to the framework code itself. |
| **Workflow & Quality Gates** | PASS | All 8 gates + the unlisted-routes-are-shipped-pages clarification honored; quickstart.md is the per-PR checklist; score + build-table recording in PR per constitution practice. |

**Initial Constitution Check: PASS** — no violations, no Complexity Tracking entries
needed.

**Post-Design Constitution Check (after Phase 1): PASS.** The design artifacts
introduce nothing beyond the checked surface:

- Contract surface is one SSG route pattern + zero new endpoints (routes.md);
  the OG image reuses the existing `/api/og` pattern.
- The data model is entirely compile-time TypeScript; the only runtime state is
  the player's in-memory state machine, discarded on navigation.
- The DSL's typed-anchor design mechanically enforces the SC-006 separation the
  spec's US4 requires — the reuse guarantee is a compile error, not a review hope.
- Accessibility contract keeps all interaction on native semantics; the single
  live region per demo avoids announcement storms.
- CI touchpoints: two Lighthouse configs + axe script gain one URL each;
  sitemap.ts and palette.ts are verified-unchanged touchpoints (D4/D14) —
  matching the program plan's five-touchpoint enumeration.

## Project Structure

### Documentation (this feature)

```text
specs/002-interactive-case-studies/
├── spec.md              # Feature specification (committed)
├── plan.md              # This file
├── research.md          # Phase 0 — 16 decisions
├── data-model.md        # Phase 1 — entities, DSL, player state machine
├── quickstart.md        # Phase 1 — dev + gate checklist
├── contracts/
│   ├── routes.md                  # /work/[slug] route + metadata + CI contract
│   ├── study-content-schema.md    # Authoring contract (US4's guarantee)
│   └── accessibility.md           # Keyboard, announcements, motion, no-JS
├── checklists/requirements.md     # Spec quality checklist (16/16)
└── tasks.md             # Phase 2 — /speckit-tasks (not yet created)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── (main)/…                       # UNTOUCHED — three core pages + colophon
│   └── work/                          # NEW route group; no (main) chrome
│       ├── layout.tsx                 # Minimal chrome; robots noindex metadata
│       ├── layout.module.css
│       └── [slug]/
│           └── page.tsx               # SSG; generateStaticParams; dynamicParams=false
├── components/
│   └── work/                          # NEW — framework (no study-specific content)
│       ├── StudyPage.tsx              # Block renderer (prose/demo/walkthrough)
│       ├── GlossaryChip.tsx
│       ├── player/
│       │   ├── Player.tsx             # State machine, controls, transcript, aria-live
│       │   ├── Player.module.css
│       │   └── stepReducer.ts         # steps[0..i] → replica screen props
│       ├── demos/                     # 5 concept demos (client components; pinned guideline facts per SC-006 note)
│       │   ├── LanguageBreakDemo.tsx  #   opening break (FR-014)
│       │   ├── TextExpansionDemo.tsx  #   pair, truncation slider, W3C calculator
│       │   ├── WordOrderDemo.tsx      #   inline-input reassembly
│       │   ├── FormattingDemo.tsx     #   live Intl.NumberFormat table
│       │   ├── FlagsRuleDemo.tsx      #   flags ≠ languages
│       │   └── facts.ts               #   pinned guideline facts (SC-007; claims, not glyph strings)
│       └── replica/                   # Fictional-brand kit (CSS Modules, native els)
│           ├── replica-tokens.css     #   scoped under .replicaFrame
│           ├── SidebarNav.tsx  SettingsPanel.tsx  PreviewCard.tsx
│           ├── EmailEditor.tsx TranslateModal.tsx Toast.tsx
│           └── (Tabs, FieldRow, …)
├── content/
│   └── work/                          # NEW — authorable content only
│       ├── index.ts                   # Study registry + build-time assertions
│       ├── types.ts                   # CaseStudy / ContentBlock / WalkthroughStep
│       ├── glossary.ts
│       └── internationalization/
│           └── index.ts               # The i18n study (blocks + steps)
├── lib/motion.ts                      # EXISTING — reused (useReducedMotion)
└── styles/…                           # UNTOUCHED

lighthouserc.desktop.json              # +1 URL
lighthouserc.mobile.json               # +1 URL
scripts/axe-check.mjs                  # +1 URL
src/app/sitemap.ts                     # verified unchanged (allowlist)
src/content/palette.ts                 # verified unchanged (no study entries)
```

**Structure Decision**: Single project, one new route group. The three-way split —
`app/work` (routing) / `components/work` (framework) / `content/work` (authored
studies) — is the physical form of SC-006: study #2 lands entirely inside
`content/work/` plus any new replica screens it needs.

## Complexity Tracking

No constitution violations to justify. (The second route group is not a violation —
the constitution constrains pages and patterns, not route-group count; it exists
precisely to satisfy FR-012/SC-004.)
