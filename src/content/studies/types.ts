// Interactive case-study content DSL. Studies author against these types;
// tsc --noEmit is the validator (no runtime schema). See
// specs/002-interactive-case-studies/data-model.md.

// ---------------------------------------------------------------------------
// Glossary

export type GlossaryTermId = "i18n" | "l10n" | "globalization" | "translation" | "locale";

// ---------------------------------------------------------------------------
// Rich text — an array of paragraphs. Each paragraph is either a single run
// (plain string or a glossary chip standing alone) or an array of runs mixed
// inline within one <p> (FR-015: chips appear inline at first use).

export type TextRun =
  | string
  | { term: GlossaryTermId }
  | { href: string; text: string }
  | { em: string };
export type RichText = (TextRun | TextRun[])[];

// ---------------------------------------------------------------------------
// Replica screens + per-screen anchor unions. Anchor ids are compile-checked
// against the screen a WalkthroughSegment declares — a typo in `target` is a
// tsc error naming the valid anchors for that screen. The translate modal is
// an overlay state of the email-editor screen (research D6/data-model.md),
// so its anchors join EmailEditorAnchorId rather than getting their own
// ReplicaScreenId.

export type ReplicaScreenId =
  | "org-settings"
  | "personal-settings"
  | "email-editor"
  | "sidebar-break";

export type OrgSettingsAnchorId =
  | "business-language-select"
  | "business-format-select"
  | "localization-languages"
  | "preview-card"
  | "save-button";

export type PersonalSettingsAnchorId =
  | "personal-language-select"
  | "personal-format-select"
  | "preview-card"
  | "save-button";

export type EmailEditorAnchorId =
  | "subject-field"
  | "preview-text"
  | "content-block-list"
  | "translate-button"
  | "audience-breakdown"
  | "language-checklist"
  | "translation-row"
  | "retranslate-button"
  | "modal-close";

// Used only within LanguageBreakDemo's own pin positioning — no
// WalkthroughSegment ever targets this screen, so it never participates in
// the compile-time step-target check below.
export type SidebarBreakAnchorId = "cta-button" | "inline-sentence" | "stat-value";

export type AnchorIdFor<S extends ReplicaScreenId> = S extends "org-settings"
  ? OrgSettingsAnchorId
  : S extends "personal-settings"
    ? PersonalSettingsAnchorId
    : S extends "email-editor"
      ? EmailEditorAnchorId
      : SidebarBreakAnchorId;

// ---------------------------------------------------------------------------
// Concept demos

export type DemoId =
  | "language-break"
  | "text-expansion"
  | "word-order"
  | "formatting"
  | "flags-rule";

// ---------------------------------------------------------------------------
// Content blocks

export interface ProseSection {
  kind: "prose";
  id: string;
  heading: string;
  /** Optional terse label for the left rail jump-nav; defaults to `heading`
   *  (split on ":"). Keep short so the rail label clears the reading column
   *  on narrow-desktop widths. */
  navLabel?: string;
  /** When true, the study's milestone timeline renders after this section's
   *  prose, breaking out to the walkthrough-panel width. */
  showTimeline?: boolean;
  /** Renders a concept demo (breaking out to the walkthrough-panel width) after
   *  this section's prose — e.g. the language-break screen inside Kickoff. */
  embedDemo?: DemoId;
  /** Deep links passed to the embedded demo's annotations. */
  embedDemoLinks?: Record<string, string>;
  /** Optional standout stat rendered after the prose: a large figure plus a
   *  short completing phrase (same treatment as ConceptDemoBlock.callout). */
  callout?: { figure: string; text: string; source?: { label: string; href: string } };
  /** Optional figure rendered after the prose, breaking out to the wide panel. */
  image?: {
    src: string;
    alt: string;
    caption?: string;
    width: number;
    height: number;
  };
  /** Optional figure rendered between the prose and the list — in the main
   *  (left) column, not beside it like sideFigure. For a compact figure that
   *  belongs right where a specific claim lands, ahead of the list that
   *  follows it. */
  midFigure?: { figure: FigureId; staticDescription: string };
  /** Optional <h3> inserted between two of this section's body paragraphs —
   *  for a secondary point that deserves its own label without breaking out
   *  to a new top-level section. `afterParagraph` is the 0-based index of the
   *  paragraph it follows (0 = right after the first paragraph). */
  subheading?: { text: string; afterParagraph: number };
  /** Optional bullet list rendered after the prose (before callout/image), as
   *  a real <ul>/<li> — plain strings, no inline runs. */
  list?: string[];
  /** Optional figure rendered BESIDE the prose (right column, breaking the
   *  section out to the wide breakout width) rather than stacked below it —
   *  for a compact illustration that supports the argument in place, next to
   *  the text making it. Stacks below on narrow widths. */
  sideFigure?: { figure: FigureId; staticDescription: string };
  body: RichText;
}

/** One row of the project timeline, shown both stacked in the meta block and
 *  horizontally under the Overview. */
export interface Milestone {
  quarter: string;
  year: number;
  /** Only the first quarter of each year prints its year above the node. */
  showYear: boolean;
  label: string;
}

export interface ConceptDemoBlock {
  kind: "demo";
  id: string;
  demo: DemoId;
  intro: RichText;
  /** Optional standout stat rendered between the intro and the demo: a large
   *  figure plus a short completing phrase. */
  callout?: { figure: string; text: string; source?: { label: string; href: string } };
  /** Describes the server-rendered initial state for no-JS/noscript (FR-013). */
  staticCaption: string;
  /** Break demo only: annotation id -> block id, for FR-014's deep links. */
  annotationLinks?: Record<string, string>;
}

export type StepAction = "highlight" | "click" | "input" | "select" | "toast" | "transition";

export interface WalkthroughStep<S extends ReplicaScreenId = ReplicaScreenId> {
  target: AnchorIdFor<S>;
  action: StepAction;
  highlight: boolean;
  caption: string;
  /** Required now (FR-011): rendered as the transcript; becomes the future
   *  narration script unchanged when listen mode ships. */
  narrationText: string;
  /** Autoplay pacing only — self-guided and reduced-motion visitors pace
   *  themselves. */
  durationMs: number;
  /** For input/select/toast actions: the value or message the replica shows. */
  value?: string;
  /** Mobile framing region (FR-012a); defaults to `target`. */
  focusRegion?: AnchorIdFor<S>;
}

export interface WalkthroughSegment<S extends ReplicaScreenId = ReplicaScreenId> {
  kind: "walkthrough";
  id: string;
  title: string;
  screen: S;
  steps: WalkthroughStep<S>[];
}

export type StudyWalkthroughSegment =
  | WalkthroughSegment<"org-settings">
  | WalkthroughSegment<"personal-settings">
  | WalkthroughSegment<"email-editor">;

/** Marks where the scripted email-translation walkthrough renders. The flow's
 *  screens and captions live in EmailTranslationFlow (study-specific), so the
 *  block itself only carries a heading. */
export interface EmailFlowBlock {
  kind: "email-flow";
  id: string;
  heading: string;
}

// ---------------------------------------------------------------------------
// Figure blocks (App Shell study, feature 007)
//
// A generic block that names a recreated/diagram figure the renderer looks up
// in a registry — the same shape as `DemoId`/`embedDemo`, so a new study means
// new figure ids + components, not a fork of StudyPage. Figures are
// static-first (server-rendered final state); animation, if any, is
// progressive enhancement gated on reduced motion (FR-019a).

export type AppShellFigureId =
  | "context-strip" // four-step sequenced thumbnails (beat 1)
  | "shell-before" // recreated accordion shell, cramped/dated (beat 2/3)
  | "accordion-example" // labeled single-panel illustration, beside the problem bullets (beat 2)
  | "nav-footprint-before" // compact standalone 10% panel, beside the problem bullets (beat 2)
  | "options-explored" // three explored options, each with pros/cons + criteria (beat 2b)
  | "design-handoff" // real design-system spec exports, stepped through (beat 2c)
  | "shell-after" // recreated rail + details bar, resolved (beat 3)
  | "risk-tiers"; // high / medium / low positional-memory illustration (beat 4)

/** Widen this union as future studies add figures. */
export type FigureId = AppShellFigureId;

export interface FigureBlock {
  kind: "figure";
  id: string;
  figure: FigureId;
  /** Optional section heading; when set, the block gets a rail-visible <h2>. */
  heading?: string;
  /** Optional terse label for the section rail (only meaningful with heading). */
  navLabel?: string;
  /** Rendered above the figure at the reading measure. */
  intro?: RichText;
  /** Standout stat — reuses the callout treatment (e.g. the two headline numbers). */
  callout?: { figure: string; text: string; source?: { label: string; href: string } };
  /** Figure caption, rendered below at the reading measure. */
  caption?: string;
  /** Non-visual equivalent for no-JS / assistive tech (FR-019a): the
   *  before/after contrast and the exact numbers in words. Required. */
  staticDescription: string;
}

export type ContentBlock =
  | ProseSection
  | ConceptDemoBlock
  | StudyWalkthroughSegment
  | EmailFlowBlock
  | FigureBlock;

// ---------------------------------------------------------------------------
// Case study root

export interface CaseStudy {
  slug: string;
  title: string;
  description: string;
  /** Always false at ship (FR-002). The single flip point for FR-003. */
  listed: boolean;
  company: string;
  role: string;
  /** Optional override for the meta row's Timeline value; defaults to the
   *  computed "Q# YYYY to Q# YYYY" span across all milestones. */
  timelineLabel?: string;
  milestones: readonly Milestone[];
  blocks: ContentBlock[];
}
