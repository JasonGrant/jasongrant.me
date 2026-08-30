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

export type TextRun = string | { term: GlossaryTermId };
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
  body: RichText;
}

export interface ConceptDemoBlock {
  kind: "demo";
  id: string;
  demo: DemoId;
  intro: RichText;
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

export type ContentBlock = ProseSection | ConceptDemoBlock | StudyWalkthroughSegment;

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
  timeline: string;
  blocks: ContentBlock[];
}
