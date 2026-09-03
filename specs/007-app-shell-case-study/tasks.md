# Tasks: App Shell Evolution at Hi Marley (case study)

**Input**: Design documents from `/specs/007-app-shell-case-study/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: None (constitution Principle III — no functional test suites). Verification tasks map
to the quickstart gates and the spec's success criteria instead.

**Organization**: Tasks grouped by user story. The framework from feature 002 already exists, so
Setup/Foundational are small (extend the DSL, add the shared fixture); US1 is the MVP and carries
the figure kit + content. US2/US3/US4 verify and harden the surfaces US1 creates.

**Jason-gated tasks** (require Jason personally): T017 (screen-reader pass), T022 (before/after
craft + brand sign-off), T023 (figure provenance against the private source decks). Everything
else is executable autonomously.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: US1–US4 (Setup/Foundational/Polish carry no story label)

---

## Phase 1: Setup (DSL extension + registry + tokens + CI)

- [X] T001 Extend the content DSL in `src/content/studies/types.ts`: add `AppShellFigureId` (`context-strip | shell-before | shell-after | nav-footprint | details-space | risk-tiers`), `export type FigureId = AppShellFigureId`, the `FigureBlock` interface (`kind:"figure"`, `id`, `figure`, `heading?`, `navLabel?`, `intro?`, `callout?`, `caption?`, `staticDescription`), and add `FigureBlock` to the `ContentBlock` union — no changes to existing i18n types (data-model.md §1)
- [X] T002 [P] Extend `assertStudy` in `src/content/studies/index.ts`: every `figure` block's `figure` id has a `FIGURE_COMPONENTS` entry and a non-empty `staticDescription` (mirror the walkthrough `narrationText` assertion); register a temporary skeleton `appShellStudy` for T004 (data-model.md §5)
- [X] T003 [P] Create `src/components/work/app-shell/app-shell-tokens.css`: depth tokens (elevation, border, radius) scoped under `.replicaFrame` — no shadows/gradients/patterns leak outside the frame; must not override `outline` (research D5, contracts/accessibility.md)
- [X] T004 Extend `src/components/work/StudyPage.tsx`: add the `FIGURE_COMPONENTS: Record<FigureId, ComponentType>` map, a `block.kind === "figure"` branch, and a `FigureBlock` renderer — optional `<h2>` (when `heading` set, so the rail picks it up), `intro`/`callout` at reading measure, the figure in a `.wide` breakout wrapper, optional `<figcaption>`, and a `<noscript>` note carrying `staticDescription`; do not touch the demo/player/email-flow branches (data-model.md §2, research D7)
- [X] T005 CI wiring: add `http://localhost:3000/work/app-shell` to the `collect.url` list in `lighthouserc.mobile.json`, `lighthouserc.desktop.json`, and the `URLS` array in `scripts/axe-check.mjs` (no assertion change — the existing `/work/` band already encodes v1.2.6); verify `/api/og?study=app-shell` renders a valid card once registered (contracts/routes.md, research D13)

**Checkpoint**: `npm run build` succeeds; `/work/app-shell` renders the skeleton; an unknown work slug 404s; the DSL change leaves the i18n study building unchanged.

---

## Phase 2: Foundational (shared sample-case fixture — blocks US1)

**⚠️ CRITICAL**: The fixture is the single source of case data for both before and after shells; US1 figure work depends on it.

- [X] T006 Create the shared fixture `src/components/work/app-shell/sampleCase.ts`: `sampleInbox` (6 conversations), `sampleThread` (the car-accident exchange), and `sampleDetails` (`details`, `manage`, `fnol` with `ai:true` fields, `caseProgress` salvage timeline, `notes` thread, `media`) — all fictional/sanitized per the map (Northwind Mutual carrier, Ironline Auto Auctions partner, no real names/URLs/versions) (data-model.md §3a, research D9)

**Checkpoint**: fixture compiles under `tsc --noEmit`; it is the only place case data is defined.

---

## Phase 3: User Story 1 — Read the study and grasp the transformation (P1) 🎯 MVP

**Goal**: The complete App Shell study — six beats, recreated before/after shells, two annotated headline diagrams, the risk tiers — readable start to finish in under four minutes.

**Independent Test**: US1 acceptance scenarios 1–6 in a clean browser session; a no-context reviewer restates the problem, both headline numbers, and the risk tiering after one read.

- [X] T007 [P] [US1] `src/components/work/app-shell/ContextStrip.tsx` (+ module.css): four sequenced thumbnails (Q4'25 settings/library 4→1 → Q1'26 list pages → Q2'26 thread → Q3'26 shell), one line each, + the "lowest-risk-first, toward the core" sentence; flat (no `.replicaFrame`) (contracts/figures.md, FR-011)
- [X] T008 [P] [US1] `src/components/work/app-shell/ShellBefore.tsx` (+ module.css): accordion shell inside `.replicaFrame`, consuming `sampleCase` — right panel dominated by stacked section headers with the details cramped beneath, unused reserved top/left space, a mixed global/contextual CTA; reads visibly dated (research D5/D8, FR-018)
- [X] T009 [P] [US1] `src/components/work/app-shell/ShellAfter.tsx` (+ module.css): rail+details shell inside `.replicaFrame`, consuming the SAME `sampleCase` — collapsible icon rail (Details · Manage · Media · Notes — divider — FNOL · Case Progress · Vehicle), right details bar at full height, common action area, Ironline as one rail section; reads visibly resolved (data-model.md §3a, FR-018)
- [X] T010 [P] [US1] `src/components/work/app-shell/NavFootprintDiagram.tsx` (+ module.css): annotated schematic diagram, flat, static-first — 10% before (1800×1169) vs 2.5% collapsed / 8.5% expanded, figures called out prominently; optional bar-growth animation gated on `usePrefersReducedMotion` snapping to final state (contracts/figures.md, research D4/D10, FR-019)
- [X] T011 [P] [US1] `src/components/work/app-shell/DetailsSpaceDiagram.tsx` (+ module.css): annotated schematic diagram, flat — 62% before (5 categories) vs 100% after (20+ categories), prominent; same static-first/reduced-motion rule as T010 (contracts/figures.md, FR-019)
- [X] T012 [P] [US1] `src/components/work/app-shell/RiskTiers.tsx` (+ module.css): high (Create-case relocation, case actions) / medium (three areas consolidated, triggers stable) / low (templates replace overlays; same location/flow) positional-memory illustration; flat (contracts/figures.md, FR-014)
- [X] T013 [US1] Author the study `src/content/studies/app-shell/index.ts`: `appShellStudy` (`slug:"app-shell"`, `listed:false`, company/role, four milestones, preview-safe `description`), six beats as prose + figure blocks in the order in data-model.md §4 — refined overview (FR-009), context strip, problem (accordion-fails-at-scale + six secondary problems, FR-012), solution (rail + details bar, `callout` "10% → 2.5% / 8.5%" and "62% → 100%", 20+ categories, templates-not-overlay, FR-013), risk (positional memory + rollout, FR-014), details & wins (tokens as delivery mechanism + env flag, FR-015), outcome (PLG surfaces + defensive success bar stated/met + one-line verification per research D11, FR-016); every figure block carries `staticDescription` (depends on T004, T007–T012)
- [X] T014 [US1] Replace the skeleton with the real study in `src/content/studies/index.ts`; walk US1 acceptance scenarios 1–6 in the browser and fix findings; time the read against the <4-minute bar (SC-002); have a reviewer with no Hi Marley context restate the problem, both headline numbers, and the risk tiering after one read (SC-001)

**Checkpoint**: `/work/app-shell` reads end to end; the before/after transformation is legible; both headline numbers render prominently.

---

## Phase 4: User Story 2 — Equal access with assistive tech and reduced motion (P2)

**Goal**: Every figure perceivable without sight, color, motion, or a pointer; reduced motion loses nothing.

**Independent Test**: Complete the US1 read keyboard-only, then with a screen reader, then with OS reduced motion — both headline numbers, the before/after contrast, and the three risk tiers reachable in all three passes.

- [ ] T015 [P] [US2] Fill every figure block's `staticDescription` with its non-visual equivalent — the before/after contrast and the exact numbers in words (e.g. "Navigation drops from 10% of the page to 2.5% collapsed, 8.5% expanded"); ensure diagrams expose compared values as text, never color-only (contracts/accessibility.md, FR-019a, WCAG 1.4.1)
- [ ] T016 [US2] Reduced-motion pass: enable OS reduced motion; confirm no figure animates (any bar snaps to final state) and no information is lost versus the animated variant; confirm no scroll-driven/parallax motion anywhere (research D4/D6, US2.1)
- [ ] T017 [US2] Keyboard pass (logical order, visible focus, no trap) and screen-reader pass on `/work/app-shell` — confirm the numbers, before/after contrast, and risk tiers are announced from text; verify WCAG AA contrast and visible focus inside `.replicaFrame`; run `node scripts/axe-check.mjs` for zero violations; disable JavaScript and confirm the full narrative + a static state for every figure region renders (SC-008) *(screen-reader pass Jason-gated: VoiceOver)* (contracts/accessibility.md, SC-003)

**Checkpoint**: US1 journey completable in all three accessibility passes; axe clean.

---

## Phase 5: User Story 3 — Soft-unlisted sharing without touching the core site (P3)

**Goal**: The route is unlisted and noindexed; the core pages and other `/work` routes ship unchanged.

**Independent Test**: Inspect the production build — sitemap, robots on the route, every nav surface, and the core-page/other-`/work` payloads vs. the pre-feature build.

- [ ] T018 [P] [US3] Discoverability check: confirm `study.listed === false` yields `noindex, nofollow`; verify `src/app/sitemap.ts`, `src/content/palette.ts`, `src/components/chrome/LeftRail.tsx`, `TopBar`, and the home work shelf carry NO app-shell reference (contracts/routes.md, SC-004)
- [ ] T019 [US3] Build-isolation check: diff the file lists / script payloads of the three core pages and every other `/work` route pre/post feature (bundler chunk-repartition noise excepted); confirm `layout.tsx`, `sitemap.ts`, `palette.ts`, and all i18n-study files are untouched (SC-005)
- [ ] T020 [US3] Confirm an unknown work slug still resolves to the standard not-found experience (`dynamicParams=false`) (FR-004)

**Checkpoint**: zero app-shell references in sitemap/nav; core + other `/work` builds unchanged.

---

## Phase 6: User Story 4 — Recreated-UI integrity (P4)

**Goal**: Every figure is a recreation with fictional data; before reads dated, after reads resolved; comparisons are annotated diagrams.

**Independent Test**: Audit every figure — no real screenshot, all data fictional, before/after contrast instant, diagrams schematic.

- [ ] T021 [P] [US4] Recreation audit: grep `app-shell/` for `next/image`/`<img>` — none may point at a product screenshot; confirm all sample data is fictional per the sanitization map (no "Copart", no real names/URLs/versions), Hi Marley branding only where the exception allows, no third-party PII (research D9, SC-006)
- [ ] T022 [US4] Before/after craft pass: `shell-before` reads accordion/cramped, `shell-after` reads resolved, legible without the caption; diagrams are schematic, not pixel-faithful; visual check in the shipped color mode *(Jason-gated: craft + Hi Marley brand sign-off)* (FR-018/FR-019)
- [ ] T023 [US4] Provenance pass: verify every headline number, tier example, and the success-bar sentence against the private source decks (research D10/D11/D12); drop anything unverifiable rather than approximating; record the check in the PR *(Jason-gated: needs the private source material)* (SC-007)

**Checkpoint**: every figure confirmed a fictional recreation; numbers verified.

---

## Phase 7: Polish & cross-cutting gates

- [ ] T024 Run Lighthouse on `/work/app-shell` mobile + desktop: Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO off, CLS 0 (quickstart.md); fix any regression or revert
- [ ] T025 [P] Mobile responsive pass: every figure reflows to a phone-fit layout (recreated shells frame the relevant region, not a shrunken desktop), no horizontal page scroll at mobile width (contracts/figures.md, FR/US2)
- [ ] T026 Final gate sweep: `npx tsc --noEmit` and `npx biome check .` clean; record in the PR the four Lighthouse scores (mobile+desktop), the axe result, the build-isolation diff, and a note that all figures are recreations with owner-cleared, verified numbers (quickstart.md)

---

## Dependencies & execution order

- **Setup (T001–T005)** → gates everything; T004 depends on T001.
- **Foundational (T006)** → blocks the shells (T008/T009 consume the fixture).
- **US1 (T007–T014)** = MVP. Figures T007–T012 are parallel; T013 (content) depends on T004 + the figure components; T014 depends on T013.
- **US2 (T015–T017)**, **US3 (T018–T020)**, **US4 (T021–T023)** verify/harden US1's surfaces → after US1; independent of each other.
- **Polish (T024–T026)** → last.

## Parallel opportunities

- Setup: T002, T003 in parallel (T001 first for T002's types).
- US1: T007–T012 all `[P]` (distinct component files) once T004 + T006 land.
- Verification: US2/US3/US4 phases can run concurrently after US1; T018 and T021 are `[P]`.

## Implementation strategy

- **MVP = Phase 1 + Phase 2 + US1 (through T014)** — a complete, readable study at `/work/app-shell`.
- Then layer US2 (access), US3 (isolation), US4 (integrity) as independent verification increments, and close with the Phase 7 gates before the PR.
