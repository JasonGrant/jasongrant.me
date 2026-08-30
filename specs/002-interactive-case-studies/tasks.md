# Tasks: Interactive Case Studies (framework + Internationalization study)

**Input**: Design documents from `/specs/002-interactive-case-studies/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: None (constitution Principle III — no functional test suites). Verification
tasks map to the quickstart's nine gates and the spec's success criteria instead.

**Organization**: Tasks grouped by user story. US1 is the MVP increment; US2/US3/US4
verify and harden surfaces US1 creates.

**Jason-gated tasks** (require Jason personally): T031 (VoiceOver pass), T041
(first-time tester), T042 (brand sign-off + Vercel spot-check). Everything else is
executable autonomously.

## Format: `[ID] [P?] [Story] Description`

## Phase 1: Setup (route group, types, registry, tokens)

- [ ] T001 Create work route group shell: `src/app/work/layout.tsx` + `src/app/work/layout.module.css` — minimal chrome (skip link, small wordmark link home, footer line), no imports from `(main)`; robots metadata is NOT set here — it is per-page, derived from `listed` in T005 (contracts/routes.md, research D1/D3)
- [ ] T002 [P] Define content types in `src/content/studies/types.ts`: `CaseStudy`, `ContentBlock` union (`ProseSection | ConceptDemoBlock | WalkthroughSegment`), `RichText` with inline glossary refs, `WalkthroughStep` (`target, action, highlight, caption, narrationText, durationMs, value?, focusRegion?`), `DemoId`, `ReplicaScreenId` (4 screens — translate modal is an email-editor overlay), `StepAction` (data-model.md)
- [ ] T003 [P] Author glossary content in `src/content/studies/glossary.ts` — 5 terms (i18n, l10n, globalization, translation, locale), definitions traceable per FR-024
- [ ] T004 Create study registry + build-time assertions in `src/content/studies/index.ts`: exports `studies`, throws at build on duplicate slugs / empty blocks / empty steps / missing narrationText / unknown annotationLinks ids (data-model.md Validation); temporary skeleton study entry for T017
- [ ] T005 Create `src/app/work/[slug]/page.tsx`: SSG via `generateStaticParams` from registry, `export const dynamicParams = false`, per-study `generateMetadata` (title/description safe-for-preview; `robots` noindex/nofollow derived from the study's `listed` flag — the FR-003 flip point; OG image), and extend `src/app/api/og/route.tsx` to accept study pages (today a closed enum of the four core pages) (contracts/routes.md, research D2/D3/D16)
- [ ] T006 [P] Create `src/components/work/replica/replica-tokens.css`: fictional-brand tokens scoped under `.replicaFrame` — hairline borders, elevated background tones, NO shadows/gradients/patterns; must not override `outline` (FR-013a, contracts/accessibility.md focus rule)

**Checkpoint**: `npm run build` succeeds; `/work/<skeleton>` renders; unknown slug 404s.

## Phase 2: Foundational (replica kit + player — blocks US1/US2/US4)

- [ ] T007 [P] Local hook `src/components/work/usePrefersReducedMotion.ts` — deliberate five-line duplicate of the `src/lib/motion.ts` hook; MUST NOT import from `src/lib` (research D8 chunk-isolation rationale in a comment)
- [ ] T008 [P] `src/components/work/GlossaryChip.tsx` (+ module.css): button + inline disclosure, `aria-expanded`, works with touch/keyboard (research D13)
- [ ] T009 `src/components/work/StudyPage.tsx` (+ module.css): block renderer — exactly one `<h1>` from `CaseStudy.title`; prose/demo/walkthrough dispatch; every section `<h2>` (demos via `aria-labelledby`); anchor ids on blocks; `staticCaption` + `<noscript>` note per demo region (data-model heading contract, FR-013)
- [ ] T010 [P] `src/components/work/replica/SidebarNav.tsx` (+ module.css): sidebar-break screen — nav items, usage/value-prop slot, exported anchor-id union, `data-anchor` attributes
- [ ] T011 [P] `src/components/work/replica/SettingsPanel.tsx` + `FieldRow.tsx` + `Tabs.tsx` (+ module.css): org-settings and personal-settings screens — business/personal language + regional format fields, localization-language multi-select, save button; anchor unions (FR-020)
- [ ] T012 [P] `src/components/work/replica/PreviewCard.tsx`: regional-format preview values rendered per research D10 CLS rules (fixed heights, `tabular-nums`, effect-phase swap only)
- [ ] T013 [P] `src/components/work/replica/EmailEditor.tsx` + `TranslateModal.tsx` (+ module.css): email-editor screen with the translate modal as an OVERLAY STATE — modal anchors join the email-editor anchor union; audience-language breakdown, language checklist, side-by-side source/translation rows, stale-translation flag state (data-model ReplicaScreen, FR-020/FR-022)
- [ ] T014 [P] `src/components/work/replica/Toast.tsx`: visual only — no aria-live of its own; announced via the player's live region (research D7, contracts/accessibility.md)
- [ ] T015 `src/components/work/player/stepReducer.ts`: pure `steps[0..i] → screen props` — accumulates `selectedLocalizationLanguages` (FR-021 continuity), modal open/close, input values, stale flags
- [ ] T016 `src/components/work/player/Player.tsx` (+ module.css): state machine (idle/running/paused/complete), self-guided + autoplay modes (`durationMs` timers autoplay-only), labeled Play/Pause/Stop/Prev/Next, arrow keys without Tab capture, `aria-live` step captions, transcript disclosure rendering `narrationText`, reduced-motion → discrete manual pacing, mobile `focusRegion` framing (data-model state machine, contracts/accessibility.md, D8/D9)
- [ ] T017 Early TBT check (research D5 guard): point the skeleton study at the player + one replica screen + two placeholder demos; run `npx lhci autorun --config=lighthouserc.mobile.json` against a local prod build (temporarily add the URL); create `specs/002-interactive-case-studies/verification-notes.md` with four section stubs (TBT record, provenance, SC-004 tables, study-2 notes) and record TBT/scores in it

**Checkpoint**: player drives a skeleton segment end to end, keyboard + reduced-motion behavior visible.

## Phase 3: User Story 1 — Explore the study self-guided (P1) 🎯 MVP

**Goal**: The complete Internationalization study — break-demo opening, four concept
demos, three-segment walkthrough — operable start to finish in self-guided mode.

**Independent Test**: US1 acceptance scenarios 1–7 in a clean browser session.

- [ ] T018 [P] [US1] `src/components/work/demos/facts.ts`: pinned guideline facts with source citations — string pair (29/54 chars), W3C tiers (300/200/180/160/140/130), 30–35% rule, ~10%-of-new-i18n-bugs stat, locale linguistic claims (it-CH apostrophe U+2019, TR percent-first, JPY/KRW zero decimals, dinar three decimals, fr-CA compact), flags-rule examples; claims not glyph strings (research D10, SC-007)
- [ ] T019 [P] [US1] `src/components/work/demos/TextExpansionDemo.tsx` (+ module.css): EN/DE pair toggle, truncation slider with meaning-change moment + focusable tooltip (`aria-describedby`), W3C expansion calculator, single `aria-live` result line, phone-first layout (FR-016, contracts/accessibility.md)
- [ ] T020 [P] [US1] `src/components/work/demos/WordOrderDemo.tsx` (+ module.css): sentence with embedded control reassembling wrong in German, corrected pattern shown, `aria-live` outcome (FR-017)
- [ ] T021 [P] [US1] `src/components/work/demos/FormattingDemo.tsx` (+ module.css): locale picker over number/percent/currency rows, `supportedLocalesOf` guard with stated fallback, per-locale precomputed constants for SSR, live `Intl` swap only in `useEffect`, fixed row heights + `tabular-nums` + `<bdi>` (FR-018, research D10)
- [ ] T022 [P] [US1] `src/components/work/demos/FlagsRuleDemo.tsx` (+ module.css): flags-for-countries vs flags-for-languages do/don't, which-flag-is-Spanish ambiguity, multilingual-country example, `aria-live` verdicts (FR-019)
- [ ] T023 [US1] `src/components/work/demos/LanguageBreakDemo.tsx` (+ module.css): hero replica with language switcher — German breaks truncated button + stranded mid-sentence control + wrong number format, three annotations deep-linking via `annotationLinks` (FR-014; depends on T010/T018)
- [ ] T024 [US1] Study content `src/content/studies/internationalization/index.ts`: prose sections with inline glossary refs, demo blocks with `staticCaption` + `annotationLinks`, three walkthrough segments (org-settings → personal-settings → email flow) with ~15–25 steps, every step carrying `narrationText`; email segment: translate → audience breakdown → language selection (exactly the org-selected languages) → side-by-side review → idiom fix → source edit → stale flags → retranslate; label any flow element that is a design proposal rather than shipped behavior (FR-020/FR-021/FR-022/FR-024)
- [ ] T025 [US1] Impact section content: verify each candidate figure against its specific published article (Substack); include only verified figures, at least one quantified (FR-023/FR-024); record verification notes in `specs/002-interactive-case-studies/verification-notes.md` provenance section
- [ ] T026 [US1] Replace skeleton with the real study in `src/content/studies/index.ts`; walk US1 acceptance scenarios 1–7 in the browser and fix findings; also abandon the walkthrough mid-segment and reload — the study restarts cleanly from initial state (spec edge case)
- [ ] T027 [US1] Mobile-fit pass (FR-012a): phone layouts for every demo, player `focusRegion` framing verified at 412px, zero horizontal page scroll

**Checkpoint**: MVP — the study is complete and shareable by direct URL locally.

## Phase 4: User Story 2 — Assistive-tech & reduced-motion parity (P2)

**Goal**: Peer experience for keyboard, screen-reader, and reduced-motion visitors.

**Independent Test**: US1 journey three more times — keyboard-only, VoiceOver, OS reduced motion.

- [ ] T028 [US2] Full keyboard traversal pass per contracts/accessibility.md keyboard map — every chip/demo/player control reachable and operable, visible focus (incl. inside `.replicaFrame`), no traps; fix findings
- [ ] T029 [US2] Announcement audit: one `aria-live` region per demo, player announces captions + state changes, toast announced once via player region (no double announcements); fix findings
- [ ] T030 [US2] Reduced-motion OS-level pass + SC-003 side-by-side review — animated vs reduced sequences carry identical captions/states/outcomes; fix findings
- [ ] T031 [US2] **Jason**: VoiceOver smoke test (Safari/macOS) — one full walkthrough + every demo; log findings for remediation

**Checkpoint**: US2 scenarios pass; remediations merged.

## Phase 5: User Story 3 — Soft-unlisted, core site untouched (P3)

**Goal**: Unlisting properties + CI gates + isolation verified on production builds.

**Independent Test**: build inspection + CI runs.

- [ ] T032 [P] [US3] Restructure `lighthouserc.desktop.json` + `lighthouserc.mobile.json` to `assertMatrix`: core pages all four categories ≥0.95 unchanged; `/work/` pattern Perf/A11y/BP ≥0.95 + SEO at the deliberate-noindex maximum (constitution v1.2.1, research D14); add `http://localhost:3000/work/internationalization` to both URL arrays
- [ ] T033 [P] [US3] Add `http://localhost:3000/work/internationalization` to `URLS` in `scripts/axe-check.mjs`
- [ ] T034 [US3] Unlisting verification (SC-005): built sitemap has no `/work` URL; study HTML carries `noindex, nofollow` meta; `src/content/palette.ts` + LeftRail + all navs contain no study links; `src/app/robots.ts` has NO `/work` Disallow; unknown slug returns the standard 404
- [ ] T035 [US3] SC-004 isolation diff: compare the three core pages' file lists in `.next/app-build-manifest.json` against a fresh `main` build — no work-route file referenced, per-page totals unchanged (runtime-chunk hash exempt); record both route tables in `specs/002-interactive-case-studies/verification-notes.md`
- [ ] T036 [US3] Full gate runs: `npx lhci autorun` desktop + mobile configs and `node scripts/axe-check.mjs` against local prod build — all assertions green, CLS 0 on the study route; then load the study with JavaScript disabled in the prod build — complete narrative renders with a static representative state in every demo region, no blank holes (SC-008); fix regressions

**Checkpoint**: CI configs land green; unlisting is a verified property.

## Phase 6: User Story 4 — Framework reuse guarantee (P4)

**Goal**: The separation property that makes study #2 content-only.

**Independent Test**: artifact review per contracts/study-content-schema.md.

- [ ] T037 [US4] SC-006 separation review: player/replica/scaffold contain zero study-specific copy or branching (study strings only under `src/content/studies/`; `demos/facts.ts` carries pinned guideline facts per the SC-006 note); confirm `listed` is the sole publicizing flip point (no shared-file edits needed to flip one study — FR-003); record the review in the PR description
- [ ] T038 [US4] Authoring dry-check for study #2 (free-to-paid experiments — sources in private cortex corpus): confirm its shapes are representable per contracts/study-content-schema.md (variant-toggle demo, experiment walkthrough screens, per-study CI URLs); note any needed new replica screens in `specs/002-interactive-case-studies/verification-notes.md`

## Phase 7: Polish & release gates

- [ ] T039 SC-007 provenance pass: every factual claim vs its source line by line — live Ascent pages, published articles, private materials referenced by location (never committed); verify every depicted flow is shipped behavior or carries its design-proposal label (FR-024); fix any drift
- [ ] T040 Visual pass + banned-pattern review (constitution gates 7+8, quickstart gates 5+9): visual check of every changed surface in the shipped theme; no gradients/shadows/patterned backgrounds/scale-bounce hovers/scroll-triggered animation anywhere on the work route, inside AND outside `.replicaFrame`; Principle V content rules re-verified, including visual coherence with sibling properties (hypoth.ai, wrenpod.com)
- [ ] T041 **Jason**: first-time tester (SC-001) — one non-author completes every demo + the walkthrough unaided before the URL is shared outside the project
- [ ] T042 **Jason + assistant**: PR prep — run `npx tsc --noEmit && npx @biomejs/biome check .` (constitution gates 1–2); record Lighthouse scores, manifest route tables, SC-006 review; Vercel preview spot-check of the study route; fictional-brand name sign-off (working names: platform "Meridian", customer "Cascara Coffee Co."); squash-merge

## Dependencies

- Phase 1 → Phase 2 → US1 (T018–T027) → US2 (T028–T031)
- US3: T032/T033 after T026 (the study URL 404s until the real study is registered; T017 temporarily adds the skeleton URL for its early check); T034–T036 need US1 complete
- US4: T037/T038 need US1 complete (review the real artifacts)
- Polish: after US1–US4; T041/T042 last
- Within US1: T018 before T019–T023; T023 needs T010; T024 needs T002/T011/T013/T015; T026 needs T024/T025

## Parallel execution examples

- Phase 1: T002 + T003 + T006 together (after T001 exists for imports, or independently — different files)
- Phase 2: T007 + T008 + T010 + T011 + T012 + T013 + T014 in parallel; then T015 → T016
- US1: T018 first, then T019–T022 in parallel (four files); T023/T024 after
- US3: T032 + T033 in parallel

## Implementation strategy

MVP = Phases 1–3 (T001–T027): the study works locally, shareable for feedback.
US2/US3 harden it to constitutional shipping quality; US4 + Polish close the loop.
Suggested checkpoint commits at each phase checkpoint; single PR, squash-merged.
