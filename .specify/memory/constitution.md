<!--
SYNC IMPACT REPORT
==================
Version change: 1.2.0 → 1.2.1
Rationale: PATCH. Resolves an internal contradiction v1.2.0 introduced: the
  unlisted-case-studies exception REQUIRES noindex on /work routes while the
  Workflow gates require Lighthouse SEO 95+ on every shipped page — impossible
  together, because Lighthouse's SEO category contains a crawlability audit
  that fails by design on a deliberately noindexed page. The gates note now
  names the single permitted deduction. No rule inverted; every other gate
  applies to unlisted routes unchanged.

Modified principles: None (Workflow & Quality Gates note clarified).

Templates requiring updates:
  - ✅ specs/002-interactive-case-studies/* — plan artifacts cite the v1.2.1
    gates note; updated in the same change set.
  - ✅ Other templates: generic; no edits required.

Deferred / TODO: None.
==================
PRIOR REPORT (v1.2.0)
==================
Version change: 1.1.1 → 1.2.0
Rationale: MINOR. Two named, bounded exceptions added to enable feature
  002-interactive-case-studies: (1) Principle V gains an "Unlisted interactive
  case studies" exception permitting soft-unlisted, noindexed routes under
  `/work/[slug]`; (2) Principle IV gains a "Scripted demonstrations" exception
  permitting user-initiated walkthrough motion inside the case-study player.
  No rule is removed or inverted; the three-page IA, the proprietary-screens
  ban, and every motion ban remain the sitewide default. Previously compliant
  code remains compliant.

Modified principles:
  - IV. Design-Engineer Craft — added named exception "Scripted demonstrations
    (case-study player)": motion only after explicit user initiation, visible
    pause/stop controls, first-class reduced-motion variant (discrete state
    steps, no transitional motion), gesture-gated narration with in-place
    transcript, demonstration-serving motion only, scoped to the player
    component on `/work/[slug]` routes.
  - V. Content Discipline & Network Coherence — added named exception
    "Unlisted interactive case studies (`/work/[slug]`)": excluded from
    sitemap, robots noindex, not linked from primary navigation; every route
    is a shipped page for all Workflow & Quality Gates; recreated/sanitized
    UI with fictional data only (proprietary-screens rule reaffirmed);
    per-study publicizing is a deliberate decision recorded in the PR.
    Page-count clause updated to reference the exception.

Added sections: None (both exceptions live inside existing principles).
Removed sections: None.
Removed rules: None.

Other changes:
  - Workflow & Quality Gates — clarifying note: unlisted routes are shipped
    pages for the purposes of every gate; soft-unlisting reduces
    discoverability, never the quality bar.

Templates requiring updates:
  - ✅ .specify/templates/plan-template.md — Constitution Check is generic;
    no edits required.
  - ✅ .specify/templates/spec-template.md — generic; no edits required.
  - ✅ .specify/templates/tasks-template.md — generic; no edits required.
  - ✅ .specify/templates/checklist-template.md — generic; no edits required.
  - ✅ CLAUDE.md — points to the active plan; no constitution-specific
    references to reconcile.
  - ✅ specs/001-personal-site-rebuild/spec.md — cites the constitution for
    banned patterns; the new exceptions are enumerated in the constitution
    itself, so no rewrite is needed and 001 scope is untouched.

Deferred / TODO: None.
==================
PRIOR REPORT (v1.1.1)
==================
Version change: 1.1.0 → 1.1.1
Rationale: PATCH. Adds a narrow fourth exception under Principle IV's
  "Subtle-craft exceptions" — a single playful avatar/portrait may scale on
  hover under bounded amplitude and the existing reduced-motion guard. No rule
  removed or inverted; the general ban on scale-on-hover still applies to
  every other interactive element.

Modified principles:
  - IV. Design-Engineer Craft — added "Avatar hover" exception with explicit
    bounds (≤1.15× scale, ≤5° rotation, ≤600ms transition, single element only).

Templates requiring updates:
  - ✅ specs/001-personal-site-rebuild/spec.md — FR-045 banned-pattern list
    cites the constitution; no rewrite needed since the new exception is
    enumerated in the constitution itself.
  - ✅ Other templates: no edits required.
==================
PRIOR REPORT (v1.1.0)
==================
Version change: 1.0.0 → 1.1.0
Rationale: MINOR. Three reconciliations to Principle IV (and one knock-on edit
  to Principle I and the Workflow gates) driven by the supplied design assets
  for feature 001-personal-site-rebuild. None remove or invert prior rules; all
  are additive carve-outs that make the constitution honest about what shipping
  craft texture actually looks like.

  (1) Color modes: dual light+dark is no longer mandatory. A single deliberate
      theme is acceptable when AA contrast holds in that theme.
  (2) Ambient texture exception: low-opacity halos and grain overlays MAY ship
      under a strict opacity ceiling AND `prefers-reduced-motion` guard.
  (3) Reveal-on-enter exception: a single subtle scroll-triggered fade-in MAY
      ship for section labels under the same reduced-motion guard.

Modified principles:
  - I. Accessibility (WCAG 2.1 AA) — narrowed contrast clause from "in both
    color modes" to "in every shipped color mode" to match (1) above.
  - IV. Design-Engineer Craft — color-mode requirement softened (1); banned
    list footnoted with two narrow carve-outs (2) and (3); rationale extended.

Added sections: None.
Removed sections: None.
Removed rules: None — both bans (gradients/patterns, scroll-triggered anims)
  remain the default; the exceptions are explicit and bounded.

Templates requiring updates:
  - ✅ .specify/templates/plan-template.md — generic; no edits required.
  - ✅ .specify/templates/spec-template.md — generic; no edits required.
  - ✅ .specify/templates/tasks-template.md — generic; no edits required.
  - ✅ .specify/templates/checklist-template.md — generic; no edits required.
  - ✅ CLAUDE.md — generic; no edits required.
  - ✅ specs/001-personal-site-rebuild/spec.md — FR-047 and FR-050 updated to
    cite the amended principle and remove [NEEDS CLARIFICATION] markers.

Deferred / TODO: None.
==================
PRIOR REPORT (v1.0.0)
==================
Version change: (uninitialized template) → 1.0.0
Rationale: Initial ratification. First concrete fill of the project constitution
  template — no prior versioned principles existed, so this is a MAJOR baseline.

Modified principles: N/A (initial ratification)
Added principles:
  - I. Accessibility (WCAG 2.1 AA) — NON-NEGOTIABLE
  - II. Performance Budget (Lighthouse 95+) — NON-NEGOTIABLE
  - III. Verification Without Functional Tests
  - IV. Design-Engineer Craft
  - V. Content Discipline & Network Coherence

Added sections:
  - Stack & Delivery Constraints
  - Workflow & Quality Gates

Removed sections: None.

Templates requiring updates:
  - ✅ .specify/templates/plan-template.md — Constitution Check section
    references this file generically; gates here apply (a11y, Lighthouse,
    no functional test requirement). No edits required.
  - ✅ .specify/templates/spec-template.md — generic; no constitution-specific
    references to reconcile.
  - ✅ .specify/templates/tasks-template.md — sample tasks include OPTIONAL
    test phases; this constitution explicitly waives functional tests, which
    the template already accommodates ("Tests are OPTIONAL"). No edits required.
  - ✅ .specify/templates/checklist-template.md — generic; no edits required.
  - ✅ CLAUDE.md — points readers to the current plan; no constitution-specific
    references to reconcile at this time.

Deferred / TODO: None.
-->

# jasongrant.me Constitution

## Core Principles

### I. Accessibility (WCAG 2.1 AA) — NON-NEGOTIABLE

The site MUST meet WCAG 2.1 Level AA in both light and dark modes on every
shipped page. This is a pass/fail gate, not an aspiration.

Concrete requirements:

- Color contrast MUST satisfy WCAG AA (4.5:1 body text, 3:1 large text and
  non-text UI) in every shipped color mode. Verify with axe DevTools or
  equivalent before any merge that ships visible changes.
- Semantic HTML is required: real `<nav>`, `<main>`, `<article>`, `<header>`,
  `<footer>`, and a single, logical heading hierarchy per page.
- Full keyboard navigation MUST be possible. Visible focus rings are required;
  custom focus styles MUST NOT remove focus visibility.
- Interactive controls MUST have accessible names, correct roles, and
  appropriate ARIA only where native semantics are insufficient.
- Reduced-motion preferences MUST be honored (`prefers-reduced-motion`).

Rationale: The site's positioning is "design leader who ships production code."
Failing AA undermines that claim publicly. Internal-jargon target users
(recruiters, hiring execs, peer leaders) include people who use assistive tech.

### II. Performance Budget (Lighthouse 95+) — NON-NEGOTIABLE

Every shipped page MUST score 95 or higher on all four Lighthouse categories
(Performance, Accessibility, Best Practices, SEO) in a production build,
verified before any release that changes user-visible code.

Concrete requirements:

- Cumulative Layout Shift (CLS) MUST be 0 on all pages. Fonts MUST be
  self-hosted via `next/font` (or equivalent) with proper preload, or loaded
  with `font-display: optional`.
- Cold-cache load MUST complete in under 1 second on a mid-tier connection
  for the homepage; other pages MUST stay within the same Lighthouse band.
- No render-blocking third-party scripts on first load. Analytics
  (Vercel Analytics, Speed Insights) MUST be loaded non-blocking.
- Images MUST be served in modern formats (AVIF/WebP) with explicit width and
  height to prevent layout shift.

Verification: a Lighthouse run (CLI or Chrome DevTools, mobile + desktop)
against the Vercel preview or production build is REQUIRED before merging
changes that touch shipped pages, layout, fonts, or images. Record the score
in the PR description or commit message when scores change materially.

Rationale: A design-engineering leader's site that scores 80 in Lighthouse
contradicts its own positioning. The 95+ bar is the published Section 6.5
standard from the rebuild plan and is non-negotiable.

### III. Verification Without Functional Tests

This project does NOT require automated functional tests (no unit, integration,
contract, or end-to-end test suites). Adding such suites is OUT OF SCOPE.

In their place, the following verifications ARE required for any change that
ships user-visible behavior:

- Lighthouse 95+ pass per Principle II.
- axe DevTools (or equivalent) accessibility scan with zero violations per
  Principle I.
- Manual keyboard pass: every interactive element reachable and operable.
- Manual screen-reader smoke test (VoiceOver on macOS/Safari is acceptable)
  for the changed surface.
- Visual check in both light and dark modes.
- TypeScript MUST type-check cleanly (`tsc --noEmit` or equivalent build step).
- Biome (the configured linter/formatter) MUST report no errors.

Rationale: The site is a static personal portfolio with low behavioral
complexity. Functional test infrastructure would be a maintenance tax that
displaces the time the rebuild plan budgets for craft and content. The above
gates catch what actually fails on a portfolio site: a11y regressions,
performance regressions, and visual regressions.

### IV. Design-Engineer Craft

The visual and interaction system MUST follow the rebuild plan's Section 6
constraints. These are project-level invariants, not per-feature suggestions.

Required:

- Three-voice type system: a display serif used italic for hero and major
  emphasis, a body sans for paragraphs and UI, and a mono for metadata,
  dates, and small-caps section labels. The specific families are a
  per-feature design decision (recorded in the feature spec and the
  colophon); maximum four type sizes in active use.
- Single-column layout, left-aligned, ~640–720px maximum content measure.
  No sidebars on content pages. No grid layouts on the homepage.
- Color modes MAY be EITHER dual (light AND dark, both first-class with
  system preference respected via `prefers-color-scheme`) OR a single
  deliberate theme. A single-theme site is acceptable when (a) the chosen
  theme meets WCAG AA contrast on every text and UI surface (Principle I),
  and (b) the choice is the deliberate design direction, not an unfinished
  second mode. If both modes ship, the theme toggle MUST transition smoothly
  (~150–200ms ease).
- Hairline (1px, low-contrast) dividers only. No cards or bordered boxes
  around content blocks, except for deliberate framed devices used sparingly
  (e.g., a "now" terminal fence or an inline newsletter card). Such devices
  MUST use a single hairline border and an elevated background tone — never
  shadows.

Banned (MUST NOT ship):

- Gradients, drop shadows, hero background images, decorative illustration,
  patterned backgrounds.
- Scale transforms or bounce animations on hover.
- Custom cursors. Parallax. Scroll-triggered animations beyond the subtle
  reveal exception below.

**Subtle-craft exceptions** (narrow carve-outs, not loopholes):

- *Ambient background texture*: Low-opacity radial-gradient halos and
  noise/grain overlays MAY ship IF AND ONLY IF every layer is at or below
  ~6% opacity AND every layer disables under `prefers-reduced-motion: reduce`
  (`display: none` or equivalent, AND any pointer/scroll listeners
  detached). This is texture, not effect — it MUST NOT call attention to
  itself or compete with content.
- *Reveal-on-enter*: A single subtle reveal-on-enter animation (≤900ms ease,
  ≤12px translate, fade-in only) MAY be applied to section labels and
  content blocks on first intersection with the viewport, IF AND ONLY IF it
  is suppressed under `prefers-reduced-motion: reduce`. No parallax. No
  staggered cinematic sequences. No scroll-driven typography.
- *Avatar hover*: A single avatar/portrait element MAY scale and slightly
  rotate on hover IF AND ONLY IF (a) scale is ≤1.15×, (b) rotation is ≤5°
  in either direction, (c) transition is ≤600ms ease, (d) the element is
  not part of a list (i.e., not applied to multiple repeated images), and
  (e) it is suppressed under `prefers-reduced-motion: reduce`. This is a
  single deliberate playful moment — the general ban on scale/bounce
  hovers still applies to every other interactive element.

**Named exception — Scripted demonstrations (case-study player)**: Within
the interactive case-study player on `/work/[slug]` routes (see the
Principle V exception), scripted demonstration sequences MAY animate
UI-state transitions IF AND ONLY IF all of the following hold:

- (a) Motion begins only after explicit user initiation via a clearly
  labeled control (e.g., "Play walkthrough"). Nothing animates on page
  load and nothing animates on scroll.
- (b) Visible pause and stop controls are present the entire time a
  sequence is running.
- (c) A first-class reduced-motion variant ships with the player: under
  `prefers-reduced-motion: reduce`, sequences advance as discrete state
  changes with no transitional motion, at a user-controlled pace. This
  variant is a peer experience, not a degraded one.
- (d) Narration audio, where present, is gesture-gated per interaction —
  it never autoplays — and a text transcript is available in place.
- (e) The motion demonstrates the product behavior being explained (state
  changes, highlights, focus movement, screen transitions). Decorative
  motion, parallax, and scroll-driven effects remain banned inside the
  player.
- (f) The exception applies only within the player component on
  case-study routes. Every sitewide ban above stays in force everywhere
  else, including the rest of the case-study page surrounding the player.

Rationale: The page is judged on the same craft signals that judge a
portfolio piece. Restraint is the proof. Every banned pattern listed above
reads as "designed by a designer who needs to prove they can design" and
actively undermines the spike. The exceptions above exist for low-amplitude,
motion-prefs-safe craft texture that warms the surface without performing.
The opacity ceiling and reduced-motion guard are the bright lines — anything
louder is a violation, not an interpretation.

### V. Content Discipline & Network Coherence

Content structure MUST follow the rebuild plan: three pages only — Home (`/`),
Experience (`/experience`), Writing (`/writing`) — plus an optional
`/colophon`. No portfolio pages, no `/about`, no `/contact`. Unlisted
interactive case-study routes under `/work/[slug]` are permitted solely
under the named exception below.

Required:

- Operator work (Hi Marley, Klaviyo, Vertex) is described with quantified
  outcomes; proprietary screens MUST NOT be published. Founder work
  (Hypoth, Wren, Olllo) is linked directly.
- The Home `Now` block MUST carry an "Updated [Month Year]" line and SHOULD
  be refreshed monthly. Stale dates are a content bug.
- Writing entries link out to Substack. Mirroring posts into MDX requires
  an explicit reason (SEO, offline reading, reader experience).
- Visual language MUST stay coherent with sibling properties (hypoth.ai,
  wrenpod.com): same typography family, compatible color treatment, same
  restraint rules. Diverging requires deliberate justification recorded in
  the PR.
- A downloadable resume PDF remains the long-form artifact for recruiters;
  the Experience page is the public-facing chronological proof.

**Named exception — Unlisted interactive case studies (`/work/[slug]`)**:
Interactive case-study routes MAY ship under `/work/[slug]` without
violating the page-count rule, IF AND ONLY IF all of the following hold:

- *Soft-unlisted by default*: each route is excluded from the sitemap,
  carries `noindex` robots metadata, and is not linked from primary
  navigation. Reach is by direct URL. The "no portfolio pages" rule above
  governs the listed, navigable IA — an unlisted case study joins that IA
  only through the deliberate publicizing step below.
- *Fully gated*: every case-study route is a shipped page for the purposes
  of the Workflow & Quality Gates — Lighthouse 95+ in all four categories
  on mobile and desktop, axe zero violations, CLS 0, and the manual
  keyboard/screen-reader/visual passes all apply without exception.
- *Recreated content only*: all product UI shown is a purpose-built
  recreation populated with fictional data. Proprietary screenshots,
  pixels, and customer data MUST NOT be published — this restates, not
  relaxes, the operator-work rule above.
- *Deliberate publicizing*: an individual case study MAY later be linked
  and/or indexed as a per-study content decision recorded in the PR that
  makes the change. The default for every new study remains unlisted and
  noindexed.

Rationale: The information architecture and content rules are load-bearing
for the positioning. Adding a portfolio page, an `/about`, or a `/contact`
dilutes the spike and signals participation in a generic personal-site
trend rather than the design-engineering-leader spike.

## Stack & Delivery Constraints

The shipped stack is constrained to support Principles I, II, and IV:

- **Framework**: Next.js 15 (App Router) + React 19. Already in `package.json`;
  changing the framework requires a constitution amendment.
- **Hosting**: Vercel. Vercel Analytics and Speed Insights are the only
  approved analytics/RUM tools (they are non-blocking and already installed).
- **Styling**: Sass and/or vanilla CSS with custom properties for design
  tokens is acceptable. Tailwind v4 is also acceptable. Either choice MUST
  preserve a single source of truth for color, spacing, and type tokens.
- **Fonts**: Self-hosted via `next/font` with subsetting where possible. No
  third-party font CDNs on the critical path.
- **Content**: MDX for any on-site authored content. Substack RSS or a
  manually curated list is acceptable for the Writing page.
- **Repository**: Public on GitHub. The repo itself is part of the
  credibility surface; dependencies, configuration, and code SHOULD reward
  the curious "view source" reader.

Adding runtime dependencies, new third-party scripts, or new analytics
providers requires explicit justification against Principles I and II.

## Workflow & Quality Gates

Every PR or direct push that changes shipped code MUST pass the following
gates before merge to `main`:

1. TypeScript build is clean.
2. Biome reports no errors.
3. axe DevTools (or equivalent) accessibility scan passes with zero
   violations on every changed page in every shipped color mode
   (Principle I).
4. Lighthouse Performance, Accessibility, Best Practices, and SEO each score
   95 or higher on the Vercel preview build for every changed page,
   measured on both mobile and desktop profiles (Principle II).
5. CLS is verified at 0 on every changed page.
6. Manual keyboard and screen-reader smoke pass on changed surfaces
   (Principle III).
7. Visual check on every changed surface in every shipped color mode.
8. The change does not introduce any banned visual pattern (Principle IV)
   or violate content rules (Principle V).

Unlisted routes (e.g., `/work/[slug]` case studies) are shipped pages for
the purposes of every gate above — soft-unlisting reduces discoverability,
never the quality bar. One measured consequence is acknowledged: the
deliberate noindex directive fails Lighthouse's crawlability audit inside
the SEO category by design. On unlisted routes, gate 4 therefore asserts
Performance, Accessibility, and Best Practices at 95+ unchanged, and asserts
SEO at the maximum score achievable with that noindex deduction — no other
SEO deduction is permitted.

If a Lighthouse score drops below 95 on any category, the change MUST NOT
ship. Either fix the regression or revert. Negotiating the gate downward
is not permitted; amending the gate requires a constitution amendment.

External cleanup items listed in Section 7 of the rebuild plan
(Hypoth → `hypoth.ai` DNS, Hypoth founder framing reconciliation, outbound
link verification, Substack tagline) MUST be resolved before the rebuilt
homepage is shared with any targeted recruiter or peer leader.

## Governance

This constitution governs all work in this repository. Where it conflicts
with personal preference, convenience, or speed, the constitution wins.
Where it conflicts with another document in this repo, the constitution wins
and the other document MUST be reconciled.

**Amendment procedure**: Amendments are made by editing this file in a
commit whose message references the affected principle(s). Each amendment
MUST update the version line, the Last Amended date, and prepend a new
Sync Impact Report comment at the top of the file. Templates referenced
in the report MUST be reviewed and updated in the same change set if their
content depends on the amended principle.

**Versioning policy** (semantic):

- **MAJOR**: Removal of a principle, redefinition that inverts an existing
  rule, or any change that would cause previously compliant code to be
  non-compliant without remediation.
- **MINOR**: Addition of a new principle or section, or material expansion
  of an existing one.
- **PATCH**: Wording clarifications, typo fixes, examples, non-semantic
  refinements.

If the bump type is ambiguous, default to the higher level and explain the
reasoning in the Sync Impact Report.

**Compliance review**: Compliance is verified per-PR via the Workflow &
Quality Gates above. There is no separate periodic audit; the gates ARE
the audit.

**Runtime guidance**: For day-to-day technology, structure, and command
context, refer to `CLAUDE.md` and the active rebuild plan referenced from
it. Those documents MUST defer to this constitution where they overlap.

**Version**: 1.2.1 | **Ratified**: 2026-05-11 | **Last Amended**: 2026-08-29
