// Presentation-deck content DSL (feature 008). The deck authors against these
// types; tsc --noEmit plus assertDeck (index.ts) are the validators. See
// specs/008-presentation-deck/data-model.md.

import type { DemoId, FigureId } from "@/content/studies/types";

export type DeckSectionSlug = "intro" | "internationalization" | "app-shell" | "close";

// Reused ids stay compile-bound to the study unions: a rename in
// studies/types.ts is a tsc error here, not a silent registry hole.
export type ReusedDemoId = Extract<DemoId, "language-break">;
export type ReusedFigureId = Extract<
  FigureId,
  | "context-strip"
  | "shell-before"
  | "accordion-example"
  | "options-explored"
  | "design-handoff"
  | "shell-after"
  | "risk-tiers"
>;
export type DeckOnlyEmbedId =
  | "career-strip" // intro figure (new, static)
  | "skill-throughline" // intro figure: skill mix per role, static
  | "building-homes-gallery" // intro figure: exterior and kitchen before/after photo pairs
  | "pendo-usage-stack" // app-shell figure: two Pendo dashboards, side by side
  | "initiative-venn" // the three initiative-owner Venn diagram
  | "org-map" // simplified Klaviyo design org: verticals vs. horizontal teams
  | "hiring-timeline" // the three-phase team-building arc behind the i18n rollout
  | "shell-sequencing" // the four-step platform sequence, with role/discipline per step
  | "settings-before-after" // before/after side by side: settings IA
  | "outreach-before-after" // before/after side by side: outreach/bulk messaging
  | "inbox-before-after" // before/after side by side: case Details panel
  | "i18n-timeline" // MilestoneTimeline over the i18n study's milestones
  | "settings-cascade" // SettingsPanel(org) + SettingsPanel(personal) on one slide
  | "email-flow"; // EmailTranslationFlow
export type DeckEmbedId = ReusedDemoId | ReusedFigureId | DeckOnlyEmbedId;

// Rich text — paragraphs of runs. No glossary chips on the deck.
export type DeckRun = string | { em: string } | { href: string; text: string };
export type DeckText = DeckRun[][];

export interface DeckImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Fraction of the 1920 stage width the image occupies; drives next/image `sizes`. */
  stageFraction: number;
  /** Opt-in rounded corners — for a real screenshot/photo standing beside
   *  body text, not the deck's default for every image (most are flat,
   *  edge-to-edge product recreations). */
  rounded?: boolean;
}

export type DeckFigureRef =
  | { kind: "embed"; embed: DeckEmbedId }
  | { kind: "image"; image: DeckImage };

interface SlideBase {
  /** ^[a-z0-9]+(-[a-z0-9]+)*$ — unique within its section; part of the URL. */
  slug: string;
  /** Navigator label and <title>. */
  title: string;
  /** REQUIRED non-visual / no-JS equivalent of what the slide shows. */
  staticDescription: string;
}

export interface TransitionSlide extends SlideBase {
  template: "transition";
  kicker?: string;
  /** The slide's <h1>. */
  headline: string;
  sub?: string;
  /** Short list under `sub` — e.g. naming the two case studies on the cover.
   *  A plain string renders as text; an object jumps to that section's
   *  first slide (the secret segment is resolved at render time, never
   *  stored in content). */
  bullets?: (string | { label: string; section: DeckSectionSlug })[];
  /** Close slide: the leave-behind links. */
  links?: { label: string; href: string }[];
}

export interface DeckStat {
  figure: string;
  text: string;
  source?: { label: string; href: string };
}

/** One labeled line within a `columns` layout column, e.g. {label: "When it
 *  wins", text: "..."}. A row with two or more distinct points uses
 *  `bullets` instead of `text`. */
export interface DeckColumnRow {
  label: string;
  text?: string;
  bullets?: string[];
}

export interface DeckColumn {
  title: string;
  /** A small real screenshot shown under the title, above the rows. */
  image?: DeckImage;
  /** A short row of small screenshots instead of one — for a column with
   *  more than one worth showing. Takes precedence over `image`. */
  images?: DeckImage[];
  rows: DeckColumnRow[];
}

export type ContentLayout =
  | { layout: "statement"; body: DeckText; bullets?: string[]; after?: DeckText }
  | {
      layout: "text-figure";
      body: DeckText;
      bullets?: string[];
      after?: DeckText; // rendered below the bullets, for a payoff line
      figure: DeckFigureRef;
      figureSide?: "left" | "right";
      /** [text, figure] fr weights; default [7, 9]. Per-slide override, e.g.
       *  to give a wide figure (many columns, an enlarged image) more room. */
      columns?: [number, number];
      /** Column gap in px; default 56. */
      gap?: number;
      /** Cross-axis alignment of the figure column's content; default start
       *  (flush toward the body). "end" flushes a narrower-than-column
       *  image (e.g. a portrait screenshot) toward the far edge instead. */
      figureAlign?: "start" | "end";
      /** A second figure spanning the full width, below the text/figure row
       *  (e.g. a wide comparison chart that doesn't belong in either column). */
      bottomFigure?: DeckFigureRef;
    }
  | {
      layout: "figure";
      figure: DeckFigureRef;
      caption?: string;
      body?: DeckText;
      bullets?: string[];
    }
  | { layout: "demo"; embed: DeckEmbedId; body?: DeckText; caption?: string }
  | {
      layout: "numbers";
      stats: DeckStat[];
      body?: DeckText;
      figure?: DeckFigureRef;
      figureSide?: "left" | "right";
      columns?: [number, number];
      gap?: number;
    }
  | { layout: "columns"; columns: DeckColumn[] };

export type ContentSlide = SlideBase & {
  template: "content";
  kicker?: string;
  headline: string;
} & ContentLayout;

export type DeckSlide = TransitionSlide | ContentSlide;

export interface DeckSection {
  slug: DeckSectionSlug;
  title: string;
  slides: DeckSlide[];
}

export interface Deck {
  title: string;
  sections: DeckSection[];
}

/** Serializable outline for the client shell — no bodies, no embeds. */
export interface DeckOutline {
  sections: {
    slug: string;
    title: string;
    slides: { slug: string; title: string; resettable: boolean }[];
  }[];
}
