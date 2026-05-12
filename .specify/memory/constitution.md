<!--
SYNC IMPACT REPORT
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
  non-text UI) in both color modes. Verify with axe DevTools or equivalent
  before any merge that ships visible changes.
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

- Three-voice type system: Instrument Serif Italic (display), Geist Sans
  with Inter fallback (body/UI), JetBrains Mono (metadata/labels). Maximum
  four type sizes in active use.
- Single-column layout, left-aligned, ~640–700px maximum content measure.
  No sidebars on content pages. No grid layouts on the homepage.
- Light AND dark modes are both first-class. System preference MUST be
  respected by default. The theme toggle MUST transition smoothly
  (~150–200ms ease).
- Hairline (1px, low-contrast) dividers only. No cards or bordered boxes
  around content blocks.

Banned (MUST NOT ship):

- Gradients, drop shadows, hero background images, decorative illustration,
  patterned backgrounds.
- Scale transforms or bounce animations on hover.
- Custom cursors. Parallax. Scroll-triggered animations.

Rationale: The page is judged on the same craft signals that judge a
portfolio piece. Restraint is the proof. Every banned pattern listed above
reads as "designed by a designer who needs to prove they can design" and
actively undermines the spike.

### V. Content Discipline & Network Coherence

Content structure MUST follow the rebuild plan: three pages only — Home (`/`),
Experience (`/experience`), Writing (`/writing`) — plus an optional
`/colophon`. No portfolio pages, no `/about`, no `/contact`.

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
   violations on every changed page in both light and dark modes
   (Principle I).
4. Lighthouse Performance, Accessibility, Best Practices, and SEO each score
   95 or higher on the Vercel preview build for every changed page,
   measured on both mobile and desktop profiles (Principle II).
5. CLS is verified at 0 on every changed page.
6. Manual keyboard and screen-reader smoke pass on changed surfaces
   (Principle III).
7. Light AND dark mode visual check on changed surfaces.
8. The change does not introduce any banned visual pattern (Principle IV)
   or violate content rules (Principle V).

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

**Version**: 1.0.0 | **Ratified**: 2026-05-11 | **Last Amended**: 2026-05-11
