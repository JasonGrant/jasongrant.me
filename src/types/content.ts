export type MarkRef =
  | { kind: "logo"; key: "marley" }
  | { kind: "monogram"; letter: string; style: "solid" | "outline" | "accent" };

export interface WorkLink {
  label: string;
  href: string;
  external?: boolean;
  pending?: boolean;
}

export interface HypothExperiment {
  index: string;
  name: string;
  href: string;
  stage: string;
  description: string;
  mark: MarkRef;
  links?: WorkLink[];
}

export interface WorkEntry {
  id: string;
  org: string;
  orgHref?: string;
  external?: boolean;
  mark?: MarkRef;
  role: string;
  reportingLine?: string;
  dates: string;
  homeDescription: string;
  experienceBullets: string[];
  links?: WorkLink[];
  experiments?: HypothExperiment[];
}

export interface WritingEntry {
  title: string;
  date: string;
  isoDate: string;
  href: string;
  blurb?: string;
  selected?: boolean;
}

export type NowFragment =
  | string
  | { kind: "link"; label: string; href: string; external?: boolean };

export type NowLine = NowFragment[];

export type PaletteAction =
  | { kind: "scroll-to"; targetId: string }
  | { kind: "navigate"; href: string }
  | { kind: "open-external"; href: string }
  | { kind: "copy"; value: string }
  | { kind: "view-source" };

export interface CommandPaletteItem {
  group: "Navigate" | "Work" | "External" | "Meta";
  label: string;
  hint: string;
  action: PaletteAction;
}

export interface NewsletterSubmission {
  email: string;
  firstReferrer?: string;
}

export type NewsletterSubmitResult =
  | { state: "ok" }
  | { state: "validation-error"; reason: "empty" | "invalid-format" }
  | { state: "network-error"; message?: string };
