import { type DeckMilestone, DeckTimeline } from "./DeckTimeline";

// The deck's own six-beat version of the i18n rollout, titled and dated
// further back than the study page's timeline: the study starts at the Q4
// 2023 audit, but the deck adds the pre-history (removing blockers, starting
// July 2021) that motivates "A desire since I was hired." No longer the
// study's shared Milestone data (no titles there, and no 2022 entry) — this
// is deck-authored, matching contracts/deck-content.md's copy-not-import
// pattern for anything that needs deck-only framing.
const MILESTONES: readonly DeckMilestone[] = [
  {
    quarter: "Q1",
    year: 2022,
    showYear: true,
    title: "Debt",
    description:
      "Removed blockers: multiple frameworks, inconsistent design-system adoption, components not built for localization.",
  },
  {
    quarter: "Q4",
    year: 2023,
    showYear: true,
    title: "Audit",
    description: "Audit and design-system i18n enablement.",
  },
  {
    quarter: "Q1",
    year: 2024,
    showYear: true,
    title: "Plan",
    description: "Vendor selection, frameworks, tools, and hiring.",
  },
  {
    quarter: "Q2",
    year: 2024,
    showYear: false,
    title: "Launch",
    description: "Cross-engineering support for the French launch.",
  },
  {
    quarter: "Q3",
    year: 2024,
    showYear: false,
    title: "Expand",
    description: "Five more languages: German, Portuguese, Korean, Spanish, Italian.",
  },
  {
    quarter: "Q4",
    year: 2024,
    showYear: false,
    title: "Empower",
    description: "Customers localizing for their own customers.",
  },
];

export function I18nTimeline() {
  return <DeckTimeline milestones={MILESTONES} />;
}
