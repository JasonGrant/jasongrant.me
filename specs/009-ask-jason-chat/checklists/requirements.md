# Specification Quality Checklist: Ask Jason chat widget

**Purpose**: Validate specification completeness and quality before proceeding to planning
**Created**: 2026-11-01
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Success criteria are technology-agnostic (no implementation details)
- [x] All acceptance scenarios are defined
- [x] Edge cases are identified
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria
- [x] User scenarios cover primary flows
- [x] Feature meets measurable outcomes defined in Success Criteria
- [x] No implementation details leak into specification

## Notes

- Three clarifications resolved in-session (2026-11-01) and recorded in the spec's
  Clarifications section: entry point (top-bar text control, superseded the same day by Jason's
  floating-input proposal, adopted), flag mechanism (a
  build-time variable with a private production mode and a preview key, chosen over the
  recommended preview-alias check) and desktop container (right-docked non-modal panel, as
  drawn). FR-047, FR-047a, FR-047b and FR-048 carry the flag design.
- Revised 2026-11-01 after Jason's proposal: the entry point is a floating bottom-centre input
  with a bounded retyping placeholder and nudge that morphs into the panel (FR-001 to FR-004b,
  FR-006, FR-007, FR-017, FR-039, FR-046; sketches §1, §2.4). The rotation and nudge are the
  site's first motion that runs without a visitor's action; they are bounded for WCAG 2.2.2
  and reduced motion, and the spec asks Jason to record them in the PR or as a constitution
  note.
- Naming note: the API's endpoint names, event names (`meta`, `text`, `correction`, `done`,
  `error`), error codes and the three environment variable names (`NEXT_PUBLIC_ASK_JASON` with its modes
  `off`, `private`, `on`; `ASK_JASON_PREVIEW_SECRET`; `NEXT_PUBLIC_TURNSTILE_SITE_KEY`) appear
  in the spec because they are the contract the widget
  is built against and the operational switch Jason flips, not implementation choices deferred
  to planning. The contracts themselves are cited by path, not restated.
- "Contract notes" lists twelve places where the widget goes beyond, interprets, or cannot
  meet a contract line as written (notably: health carries no message for the capped state, the
  "no other error text" rule needs four site-authored lines, and the live allowlist holds only
  the production origin). None blocks planning; two want a decision from Jason.
- The site ships a single colour mode (warm dark). Contrast requirements are written for every
  shipped mode so a future light mode inherits them without a spec change.
- Verification follows constitution Principle III: no functional test suite. FR-049 requires a
  development stand-in that reproduces every state, which is what makes the manual visual,
  keyboard and screen-reader passes possible for states production cannot produce on demand.
