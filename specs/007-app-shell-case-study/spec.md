# Feature Specification: App Shell Evolution at Hi Marley (case study)

**Feature Branch**: `007-app-shell-case-study`
**Created**: 2026-09-02
**Status**: Draft
**Input**: User description: "Build a new case study page at /work/app-shell titled 'App Shell
Evolution at Hi Marley,' following the established pattern, layout system, and visual language
of the existing case study at /work/internationalization — a portfolio case study for design
leadership interviews. Soft-unlisted/noindexed. Meta block (Hi Marley; Product Architecture,
Front-End Systems, Design Lead; a four-quarter timeline; refined overview). Story: context
strip → the problem (accordion nav fails at scale) → the solution (collapsible rail
10%→2.5%/8.5%, details bar 62%→100%) → managing the risk (tiered by positional-memory
disruption) → details & wins (design tokens, env flag) → outcome (unlocked PLG surfaces;
defensive success bar met). Hard constraint: all product UI recreated (before + after), no real
screenshots, fictional data, layout comparisons as annotated diagrams. Non-goals: no interactive
demo/walkthrough player in v1, no brand-refresh narrative, no changes to other /work pages."

## Clarifications

### Session 2026-09-02

- Q: There is no `/labs` route to copy, and the brief says "password or equivalent" — which
  gate does `/work/app-shell` actually use? → A: **Soft-unlist, matching the i18n study.**
  Excluded from the sitemap, `noindex`/`nofollow` via the study's `listed: false` flag, and
  linked from no navigation surface; reachable only by direct URL. No password/auth wall is
  built (none exists in the codebase, and it would diverge from the established
  reach-by-direct-URL model and the constitution's unlisted-case-studies exception).
- Q: The page's argument is its numbers; Principle V forbids invented operator figures. How are
  the headline figures treated? → A: **Real, owner-cleared.** They are Jason's actual Hi Marley
  figures, cleared by him for this unlisted, noindexed route (constitution v1.2.5 owner-cleared
  exception), carrying no third-party personal data or customer PII. Each is verified against
  its source before ship; any figure that fails verification is dropped, not approximated.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read the App Shell study and grasp the transformation (Priority: P1)

A senior product designer or design leader — interviewing Jason, or evaluating him — opens the
direct link to the App Shell Evolution study. They land on a page that reads unmistakably as
part of jasongrant.me: the same warm-dark surface, serif-italic display title, mono meta labels,
and content-driven section rail as the Internationalization study. The meta block states the
company (Hi Marley), the role (Product Architecture, Front-End Systems, Design Lead), and a
stacked four-quarter timeline, followed by a refined overview paragraph.

They read a compact context strip that frames the shell redesign as the culmination of a
deliberately sequenced platform effort (settings → list pages → thread → shell), then the
problem (the accordion navigation pattern fails as the platform scales), then the solution —
carried by two headline numbers shown prominently: the navigation footprint dropping from 10%
to 2.5% collapsed / 8.5% expanded, and the details area growing from 62% to 100% of vertical
space. Recreated before/after product UI and annotated layout diagrams make the change legible
at a glance. They continue through the risk-tiering approach (change ranked by
positional-memory disruption), the details and wins (design tokens; an out-of-production
environment flag), and the outcome (the shell unlocked product-led-growth surfaces the
accordion could not absorb, against an explicitly defensive success bar that was met). They
leave able to restate the problem, the two headline numbers, and the risk-tiering approach
without any prior Hi Marley context.

**Why this priority**: This is the entire reason the page exists — a proof artifact for design
leadership interviews that must demonstrate visual transformation and reasoned trade-offs, not
merely describe them. Nothing else in the feature has value until this end-to-end read works.

**Independent Test**: Open the study URL in a clean browser session and read it start to finish.
Time the read (target under four minutes). Then, with a reviewer who has no Hi Marley context,
confirm they can restate the problem, both headline numbers, and the three-tier risk approach
from that single read.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the study via direct URL, **When** the page loads, **Then** the
   header renders the serif-italic title "App Shell Evolution at Hi Marley," the meta block
   (Hi Marley; Product Architecture, Front-End Systems, Design Lead; the four-quarter timeline),
   and the refined overview, with no layout shift and no motion before interaction.
2. **Given** the context strip, **When** the visitor reads it, **Then** it presents the four
   sequenced steps (Q4 2025 settings & component-library standardization, four libraries to one
   → Q1 2026 list pages → Q2 2026 thread design → Q3 2026 application shell) as thumbnails with
   one line each, and states the sequencing logic — prove the approach where risk is lowest,
   then move toward the core — in one sentence.
3. **Given** the problem section, **When** the visitor reads it, **Then** it explains that each
   new accordion item reduces space for data exactly when data needs more room (with the small-
   screen "no visible data at all" failure), and lists the secondary problems (unused reserved
   top/left space at ~10% of the page at 1800×1169; sparse role-based left-nav; global CTAs
   mixed with contextual actions; a non-clickable logo against user expectation; inconsistent
   icons; labels that break under internationalization).
4. **Given** the solution section, **When** the visitor reads it, **Then** the two headline
   comparisons — navigation footprint 10% → 2.5% collapsed / 8.5% expanded, and details area
   62% → 100% — are shown prominently as annotated layout diagrams, and the text states that the
   details pattern scales to 20+ categories with a common action area and that templates
   replaced overlays where flows allowed.
5. **Given** the risk section, **When** the visitor reads it, **Then** it explains change tiered
   by positional-memory disruption — high-risk moves (Create-case relocation, case actions)
   handled deliberately; medium-risk consolidations keeping trigger locations stable; low-risk
   swaps changing components but not location or flow.
6. **Given** the outcome section, **When** the visitor reads it, **Then** it states the
   defensive success bar (no decrease in task speed or task success for existing users through
   the transition), that the bar was met, and — in one sentence — how it was verified.

---

### User Story 2 - Equal access with assistive tech and reduced motion (Priority: P2)

A visitor who relies on a keyboard, a screen reader, or the reduced-motion preference opens the
same study and gets a peer experience. Every figure — the recreated before/after screens and the
annotated layout diagrams — carries its meaning in text, not in pixels alone: the before/after
comparison, the two headline percentage changes, and the risk tiers are all reachable and
announced. Any light animation on a figure is suppressed under reduced motion with no loss of
information.

**Why this priority**: Accessibility is a non-negotiable constitution gate (Principle I) and the
site's positioning collapses if the showcase piece itself fails assistive-tech users. It is P2
only because it cannot be tested before US1 exists.

**Independent Test**: Complete the US1 read using only a keyboard; repeat with a screen reader;
repeat with reduced motion enabled at the OS level. All information — both headline numbers, the
before/after contrast, and the risk tiers — is reachable in all three passes.

**Acceptance Scenarios**:

1. **Given** reduced motion is enabled, **When** the visitor views any lightly-animated figure,
   **Then** the figure presents its final, complete state with no transitional motion and no
   information withheld.
2. **Given** a keyboard-only visitor, **When** they traverse the page, **Then** every
   interactive control (section rail, command palette, in-page links, glossary chips if present)
   is reachable in a logical order with a visible focus indicator, and no content requires a
   pointer.
3. **Given** a screen-reader user, **When** they reach the before/after figures and the two
   layout diagrams, **Then** the recreated screens, the "before is accordion/cramped, after is
   resolved" contrast, and the 10%→2.5%/8.5% and 62%→100% comparisons are conveyed in text
   (alt/caption/description), not by visual layout alone.

---

### User Story 3 - Soft-unlisted sharing without touching the core site (Priority: P3)

Jason shares the study URL selectively. The page is absent from the sitemap, carries noindex
directives, and is linked from no navigation surface — yet loads fast and passes every quality
gate. The three core pages (Home, Experience, Writing) and every other `/work` route ship
exactly as before, with no added script weight and no shared-layout changes beyond what reuse
requires.

**Why this priority**: This is the constitutional boundary (Principle V unlisted-case-studies
exception) that makes the page permissible at all, verified as properties of the shipped build
rather than a user journey of its own.

**Independent Test**: Inspect the production build — sitemap contents, robots directives on the
study route, every navigation surface, and the script payloads and file lists of the core pages
and other `/work` routes, compared against the pre-feature build.

**Acceptance Scenarios**:

1. **Given** the production build, **When** the sitemap and navigation surfaces are inspected,
   **Then** the App Shell route appears in no sitemap entry, no command-palette item, and no
   navigation surface, and the page serves `noindex, nofollow` robots metadata.
2. **Given** the pre-feature and post-feature builds, **When** the core pages and other `/work`
   routes are compared, **Then** this feature has added nothing to their script payloads and has
   not modified shared layout components beyond additive reuse.
3. **Given** a visitor opens an unknown work slug, **When** the route resolves, **Then** the
   site's standard not-found experience renders.

---

### User Story 4 - Recreated-UI integrity: the transformation reads instantly (Priority: P4)

Because this is a portfolio surface judged on craft, every piece of product UI on the page is a
purpose-built recreation — both the before and the after states — with invented sample data
(fictional names, claims, carriers). No real product screenshot appears anywhere. The before
states read as visibly dated (accordion, cramped), the after states as visibly resolved, so the
transformation is legible before a word is read. The two footprint/space comparisons are shown
as annotated layout diagrams, not pixel-faithful replicas.

**Why this priority**: The "recreated, never screenshotted, fictional data" rule is a
constitution content gate (Principle V), and the visible before→after contrast is the page's
core rhetorical device. It is P4 because it is enforced as a property of the figures once the
narrative (US1) exists.

**Independent Test**: Audit every figure on the page. Confirm none is a real screenshot, all
sample data is fictional, before-states are visibly accordion/cramped and after-states visibly
resolved, and the two headline comparisons are annotated layout diagrams rather than
pixel-faithful UI.

**Acceptance Scenarios**:

1. **Given** any product-UI figure on the page, **When** it is inspected, **Then** it is a
   recreation (not a screenshot) containing only fictional sample data, rendered in the page's
   own design language at simplified fidelity.
2. **Given** the before/after pairings, **When** they are viewed side by side, **Then** the
   before reads as accordion-driven and cramped and the after as rail-plus-details-bar and
   resolved, making the change readable without the caption.
3. **Given** the footprint and details-space comparisons, **When** they are viewed, **Then** the
   10%→2.5%/8.5% and 62%→100% changes are presented as annotated layout diagrams with the
   figures called out prominently.

---

### Edge Cases

- **Scripting disabled or failed**: the study's prose, headings, meta block, timeline, and
  figures remain a readable static document. Any lightly-animated figure renders its final
  static state; no blank regions.
- **Small screens**: recreated screens and layout diagrams present phone-fit layouts (not
  shrunken desktop captures); no figure forces horizontal scrolling of the page, and no "best on
  desktop" notice substitutes for a working mobile experience. Both headline comparisons stay
  legible at mobile width.
- **Unknown or retired study slug**: standard not-found experience; no empty shell page.
- **Search engines and link previews**: `noindex` on the route; a shared link may still render a
  preview card from page metadata, so the title and description are written to be safe for that
  exposure and to carry no proprietary or PII content.
- **Owner-cleared figure fails verification**: any headline number, tier example, or metric that
  cannot be verified against Jason's own source before ship is dropped or reframed — never
  approximated or invented to fill the gap.
- **Real-brand exposure**: the page names Hi Marley and recreates its shell; because the route
  is unlisted and noindexed, the recreation may carry the real product's branding and chrome
  (constitution unlisted-case-studies exception) while all data shown remains fictional and no
  customer PII appears.

## Requirements *(mandatory)*

### Functional Requirements

**Route, gating & discoverability**

- **FR-001**: The system MUST serve the study at the stable, shareable URL `/work/app-shell`,
  fully functional when opened directly with no referring page, via the existing `/work/[slug]`
  case-study route.
- **FR-002**: The route MUST be soft-unlisted per the constitution's unlisted-case-studies
  exception: excluded from the sitemap, serving `noindex, nofollow` robots metadata (driven by
  the study's `listed: false` flag), and linked from no navigation surface (primary navigation,
  command palette, section rails, home work shelf, or any other). Reach is by direct URL only.
- **FR-002a**: No password or authentication wall is introduced. Gating is the established
  soft-unlist mechanism only; the reach-by-direct-URL model of the Internationalization study is
  preserved. (Clarification 2026-09-02.)
- **FR-003**: The study's unlisted status MUST be an attribute of its own content definition, so
  any future decision to list/index it is a single deliberate per-study flip recorded in the PR
  that makes it, changing nothing shared across studies.
- **FR-004**: Requests for unknown work slugs MUST continue to resolve to the site's standard
  not-found experience.

**Pattern, layout & visual language (reuse of the case-study framework)**

- **FR-005**: The page MUST reuse the shared case-study scaffold and site chrome used by
  `/work/internationalization` — the study renderer, header/meta-block treatment, content-driven
  section rail, timeline component, glossary affordance, and page chrome — so it reads as part of
  jasongrant.me, not a detached page.
- **FR-006**: The page MUST match the Internationalization study in tone, rhythm, and craft:
  warm-dark surface, serif-italic display title, mono meta labels, the established type and
  spacing tokens, and the prose reading measure (with figures permitted to break out wider per
  the constitution's breakout-demonstrations exception).
- **FR-007**: The study MUST be authored primarily as content data consumed by the reused
  framework. Net-new figure and diagram components required by this study (recreated shell
  before/after, annotated layout diagrams, context-strip thumbnails, risk-tier illustration)
  MAY be added following the existing replica-kit and demo component conventions; extending the
  shared content types to admit these figure kinds counts as permitted "reuse requires" change
  and MUST NOT alter the behavior of other `/work` pages or the shared layout.

**Meta block & overview**

- **FR-008**: The meta block MUST present Company "Hi Marley"; Role "Product Architecture,
  Front-End Systems, Design Lead"; and a timeline of stacked rows, in the same component
  treatment as the i18n page: Q4 2025 — Settings framework and component library
  standardization; Q1 2026 — List pages; Q2 2026 — Thread design; Q3 2026 — Application shell.
- **FR-009**: The overview MUST convey, in a tone refined to match the i18n page, that Jason led
  the app-shell redesign and shipped production front-end code for the scalable settings
  framework, network-partner features, and cross-platform UI refinements; built RCS branding-
  enablement workflows and partner configuration tools; and balances near-term delivery with
  long-term platform architecture, working directly in the codebase alongside engineering.

**Story structure & content**

- **FR-010**: The page MUST present the story beats in order: (1) context strip, (1b) the state
  of Hi Marley in early 2025 — a near-exact recreation of the shell as it stood, serving as the
  baseline the study measures against (added 2026-09-02), (2) the problem, (3) the solution,
  (4) managing the risk, (5) details & wins, (6) outcome.
- **FR-011**: The context strip MUST present a compact horizontal four-step sequence —
  Q4 2025 settings & component-library standardization (four libraries consolidated to one) →
  Q1 2026 list pages → Q2 2026 thread design → Q3 2026 application shell — as thumbnails with
  one line each, framed as ~15 seconds of context, and MUST state the sequencing logic (prove
  the approach where risk is lowest, then move toward the core) in one sentence.
- **FR-012**: The problem section MUST establish that the accordion navigation pattern fails at
  scale — each new accordion item reduces space for data exactly when data needs more room, with
  smaller screens able to end up with no visible data at all — as the platform expands (AI
  assistants, partner integrations, workflows, enterprise features). It MUST also cover the
  secondary problems: unused reserved top/left space (~10% of the page consumed by navigation at
  1800×1169, worse on smaller screens); sparse role-based left-nav; global CTAs adjacent to
  contextual actions; a logo with no click action despite user expectation; inconsistent icons;
  and labels that break under internationalization.
- **FR-013**: The solution section MUST present both headline comparisons prominently — the
  collapsible navigation rail (2.5% collapsed, 8.5% expanded, versus 10% before) and the rebuilt
  right details bar (62% → 100% of vertical space available for details) — and MUST state that
  the details pattern scales to 20+ detail categories with a common action area for consistency
  and speed, and that templates replaced overlays where flows allowed.
- **FR-014**: The managing-the-risk section MUST present change tiered by positional-memory
  disruption (the cognitive cost of moving elements users have memorized): high-risk moves
  (Create-case relocation, case actions) handled deliberately; medium-risk consolidations that
  kept trigger locations stable; low-risk swaps that changed components but not location or flow.
  This section carries the product-thinking weight of rolling a shell change to live enterprise
  users without breaking muscle memory.
- **FR-015**: The details & wins section MUST present design tokens implemented across the
  affected surfaces as the delivery mechanism on which the visual refinement rides, and MUST note
  the out-of-production environment flag as an additional win. Tokens are mentioned strictly as
  the delivery mechanism (see Non-Goals) — no brand-refresh narrative.
- **FR-016**: The outcome section MUST state that the shell unlocked product-led-growth surfaces
  (AI agents, workflows, network partners) the accordion could not have absorbed; MUST state the
  explicitly defensive success bar — no decrease in task speed or task success for existing users
  through the transition — and that the bar was met; and MUST include one sentence on how it was
  verified (e.g., feature-key tagging metrics), subject to FR-020 verification.

**Visuals — recreated UI (hard constraint)**

- **FR-017**: All product UI on the page MUST be purpose-built recreation, for both before and
  after states, using invented sample data (fictional names, claims, carriers) at a simplified
  fidelity consistent with the page's design language — **except** the before-state walkthrough,
  which instead uses real screenshots of Jason's own internal demo account (Amended 2026-09-03,
  Jason; see FR-017a). No other real product screenshot, pixel, or export may appear anywhere on
  the page.
- **FR-017a**: The before-state figure MUST present a stepped sequence of real screenshots from
  Jason's own Hi Marley demo account, walked via Back/Next controls with a step indicator
  (matching the site's existing step-through pattern). Every visible contact in these screenshots
  MUST be a pre-existing test/demo entry (never a real customer), and Jason MUST have explicitly
  cleared the specific screenshots used — the constitution's owner-cleared-real-artifact exception
  (v1.2.5), applied here because a single static recreation could not carry the accordion's real
  density across Details, Manage, Media, and Create Case the way authentic captures do.
- **FR-018**: Recreated UI (the after-state shell, and every figure other than the before-state
  walkthrough) MUST use invented sample data. Before-states MUST read as visibly dated (accordion,
  cramped) and after-states as visibly resolved, so the transformation reads instantly. Any
  product-authentic depth styling is confined to the replica frame per the constitution's
  replica-craft exception; the surrounding study chrome keeps the sitewide flat bans.
- **FR-019**: The two footprint/space comparisons (10% → 2.5%/8.5% and 62% → 100%) MUST be shown
  as annotated layout diagrams that call the figures out prominently, rather than pixel-faithful
  UI replicas.
- **FR-019a**: Figures MUST be static-first — server-rendered to their final state so they read
  fully with no JavaScript (SC-008) and add zero cumulative layout shift. Any figure animation
  MUST be progressive enhancement only, suppressed under the reduced-motion preference with no
  loss of information, and every figure MUST carry a text equivalent (the before/after contrast
  and the exact numbers) for assistive technology. On small screens, figures MUST reflow to
  phone-fit layouts without forcing horizontal page scroll.

**Content integrity**

- **FR-020**: Every figure, tier example, and metric on the page MUST be a real, owner-cleared
  fact from Jason's own Hi Marley work — the two headline percentages, the four-to-one library
  consolidation, the 20+ categories, the 1800×1169 measurement, the defensive success bar and
  its verification. Each MUST be verified against Jason's source before ship; any that cannot be
  verified is dropped or reframed, never approximated or invented. The page carries no
  third-party personal data or customer PII, and MUST NOT present unshipped design work as
  shipped behavior (any proposal is labeled as such). (Clarification 2026-09-02; constitution
  v1.2.5 owner-cleared exception.)

**Quality gates**

- **FR-021**: The route is a shipped page for all Workflow & Quality Gates: clean TypeScript
  build, no Biome errors, zero accessibility-scan violations, CLS 0, WCAG 2.1 AA, and the manual
  keyboard/screen-reader/visual passes. Lighthouse targets follow the constitution's `/work/[slug]`
  band — Performance ≥90, Accessibility and Best Practices ≥95, on mobile and desktop; SEO is off
  by the deliberate noindex, asserted at the maximum score achievable with that deduction.

### Key Entities

- **App Shell Case Study**: one narrative work artifact with slug `app-shell`, title "App Shell
  Evolution at Hi Marley," safe share metadata, `listed: false`, company/role, a four-row
  milestone timeline, and an ordered set of content blocks; the second study to use the
  case-study framework.
- **Content Block**: a unit within the study — a prose section (optionally carrying a callout
  stat, a timeline, or an embedded figure) forming the six-beat page.
- **Recreated Screen**: a purpose-built recreation of Hi Marley product UI (the rail-plus-
  details-bar shell after; context-strip thumbnails for settings, list pages, and thread) with
  fictional data and no real screenshot. (The before-state walkthrough is the one exception —
  see Before-State Screenshot below.)
- **Before-State Screenshot**: one of five real screenshots of Jason's own Hi Marley demo
  account (Inbox/Details, Details edit, Manage, Media, Create Case), owner-cleared for this
  unlisted route per FR-017a; every visible contact is a pre-existing test/demo entry, not a
  real customer.
- **Layout Diagram**: an annotated, non-pixel-faithful diagram presenting a headline comparison
  (navigation footprint 10% → 2.5%/8.5%; details space 62% → 100%).
- **Milestone**: one timeline row (quarter, year, label), shown stacked in the meta block and
  horizontally in the context strip.
- **Sample Case Fixture**: one fictional, sanitized case (inbox conversations, the accident chat
  thread, and the right-panel section content — details, manage, FNOL, case progress, notes,
  media) consumed by the after-state recreation. It is the single place that recreation's case
  data and sanitization live; it has no bearing on the before-state screenshots, which show
  Jason's real demo data instead.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time reader with no Hi Marley context, after one read of the page, can
  restate the problem (accordion nav fails at scale), both headline numbers (10% → 2.5%/8.5% and
  62% → 100%), and the three-tier risk approach — verified with at least one such reviewer before
  the URL is shared outside the project.
- **SC-002**: The page reads end-to-end in under four minutes.
- **SC-003**: The route scores Performance ≥90 and Accessibility and Best Practices ≥95 in
  Lighthouse on both mobile and desktop against the production build, with CLS 0; accessibility
  scans report zero violations; the full page is completable with keyboard alone and with a
  screen reader; and the reduced-motion experience conveys 100% of the information of the
  animated one.
- **SC-004**: The production sitemap contains zero `/work/app-shell` entries, the route serves
  `noindex` directives, and no navigation surface links to it.
- **SC-005**: The three core pages and every other `/work` route reference no App-Shell-specific
  module in the production build and their script payloads are unchanged (bundler
  chunk-repartition noise excepted), and no shared layout component's behavior is altered beyond
  additive reuse — verified by diffing build file lists and payloads pre/post feature.
- **SC-006**: Every product-UI figure on the page is a recreation containing only fictional data
  (zero real screenshots), before-states read as accordion/cramped and after-states as resolved,
  and the two headline comparisons are annotated layout diagrams — verified by a figure-by-figure
  audit.
- **SC-007**: Every factual claim on the page (percentages, the four-to-one consolidation, the
  20+ categories, the 1800×1169 measurement, the success bar and its verification) matches
  Jason's own source exactly — verified line by line before ship — and the page contains no
  third-party PII and no unshipped work presented as shipped.
- **SC-008**: With scripting unavailable, the page still presents the complete narrative text,
  meta block, timeline, and a static representative state for every figure region.

## Assumptions

- **Gating**: soft-unlisting (sitemap exclusion + `noindex` via `listed: false` + no nav link)
  fully satisfies "not reachable by crawling the site"; the brief's "password or equivalent" is
  met by that mechanism, and no auth wall is built (Clarification 2026-09-02).
- **Framework reuse**: this is the second study on the existing `/work/[slug]` framework. The page
  scaffold, header/meta treatment, timeline, glossary affordance, section rail, and site chrome
  are reused unchanged; the study's own figure/diagram components are net-new and follow the
  established replica-kit/demo conventions. Extending the shared content types to admit new figure
  kinds is in scope as additive reuse; changing the rendered output of other `/work` pages is not.
- **Recreation branding & data**: because the route is unlisted and noindexed, recreations may
  carry Hi Marley's real branding and product chrome to show the work in context (constitution
  unlisted-case-studies exception), while all sample data shown is fictional and no customer PII
  appears.
- **Figure sourcing**: all numbers and examples are Jason's real, owner-cleared Hi Marley figures
  (Clarification 2026-09-02), verified against his source materials during implementation;
  proprietary source documents are referenced by location from the feature's research notes and
  never committed to this public repository.
- **No interactive demo in v1**: the i18n-style scripted walkthrough player and interactive
  concept demos are out of scope; figures are static or lightly animated only (Non-Goals).
- **Tokens framing**: design tokens are described only as the delivery mechanism for the visual
  refinement; no brand-refresh narrative is told (Non-Goals).
- **Timeline dates**: the Q4 2025–Q3 2026 quarters are stated as given in the brief; the outcome
  and success-bar claims describe the shell rollout as completed work per Jason's owner-cleared
  account.

## Non-Goals

- **No embedded interactive demo in v1**: no walkthrough player and no interactive concept demos;
  static or lightly-animated figures only. (Amended 2026-09-03: the redesigned shell's sidebar
  is the one interactive element — it expands/collapses and toggles per Hi Marley's sidebar
  spec, by direct manipulation, reduced-motion-safe; see research D6.)
- **No brand-refresh narrative**: design tokens are mentioned solely as the delivery mechanism,
  nothing more.
- **No changes to other `/work` pages or shared layout components** beyond what additive reuse of
  the case-study framework requires.
- **No password/authentication gate**: the route is soft-unlisted, not access-controlled.
