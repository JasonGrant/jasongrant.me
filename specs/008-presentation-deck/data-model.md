# Data Model: Presentation deck (feature 008)

## 1. Deck DSL — `src/content/deck/types.ts`

```ts
import type { DemoId, FigureId } from "@/content/studies/types"; // type-only import (erased)

export type DeckSectionSlug = "intro" | "internationalization" | "app-shell" | "close";

// Reused ids stay compile-bound to the study unions: a rename in studies/types.ts
// is a tsc error here, not a silent registry hole.
export type ReusedDemoId = Extract<DemoId, "language-break">;
export type ReusedFigureId = Extract<
  FigureId,
  | "context-strip" | "shell-before" | "accordion-example" | "options-explored"
  | "design-handoff" | "shell-after" | "risk-tiers"
>;
export type DeckOnlyEmbedId =
  | "career-strip"      // intro figure (new, static)
  | "i18n-timeline"     // MilestoneTimeline over the i18n study's milestones
  | "settings-cascade"  // SettingsPanel(org) + SettingsPanel(personal) on one slide
  | "email-flow";       // EmailTranslationFlow
export type DeckEmbedId = ReusedDemoId | ReusedFigureId | DeckOnlyEmbedId;

export type DeckRun = string | { em: string } | { href: string; text: string };
export type DeckText = DeckRun[][];               // paragraphs of runs; no glossary chips

export interface DeckImage {
  src: string; alt: string; width: number; height: number;
  /** Fraction of the 1920 stage width the image occupies; drives next/image `sizes`. */
  stageFraction: number;
}
export type DeckFigureRef =
  | { kind: "embed"; embed: DeckEmbedId }
  | { kind: "image"; image: DeckImage };

interface SlideBase {
  slug: string;                // ^[a-z0-9]+(-[a-z0-9]+)*$ ; unique within its section
  title: string;               // navigator label + <title>
  staticDescription: string;   // REQUIRED non-visual / no-JS equivalent
}

export interface TransitionSlide extends SlideBase {
  template: "transition";
  kicker?: string;             // "Case 1", "Thank you"
  headline: string;            // the slide's <h1>
  sub?: string;
  links?: { label: string; href: string }[];   // close slide → /work pages
}

export type DeckStat = { figure: string; text: string; source?: { label: string; href: string } };

export type ContentLayout =
  | { layout: "statement"; body: DeckText; bullets?: string[] }
  | { layout: "text-figure"; body: DeckText; bullets?: string[]; figure: DeckFigureRef; figureSide?: "left" | "right" }
  | { layout: "figure"; figure: DeckFigureRef; caption?: string }
  | { layout: "demo"; embed: DeckEmbedId; body?: DeckText; caption?: string }
  | { layout: "numbers"; stats: DeckStat[]; body?: DeckText };

export type ContentSlide = SlideBase & { template: "content"; kicker?: string; headline: string } & ContentLayout;
export type DeckSlide = TransitionSlide | ContentSlide;

export interface DeckSection { slug: DeckSectionSlug; title: string; slides: DeckSlide[] }
export interface Deck { title: string; sections: DeckSection[] }

/** Serializable outline for the client shell — no bodies, no embeds. */
export interface DeckOutline {
  sections: { slug: string; title: string; slides: { slug: string; title: string; resettable: boolean }[] }[];
}
```

## 2. Outline derivation — `src/content/deck/index.ts`

```ts
const INTERACTIVE_EMBEDS: ReadonlySet<DeckEmbedId> = new Set([
  "language-break", "accordion-example", "shell-before", "design-handoff",
  "settings-cascade", "email-flow",
]);
```

`resettable` is `true` when a slide's layout is `demo`, or when its `figure` is an embed in
`INTERACTIVE_EMBEDS`. Static figures (`context-strip`, `options-explored`, `risk-tiers`,
`shell-after`, `career-strip`, `i18n-timeline`) and images are not resettable.

Helpers:

- `getOutline(): DeckOutline`
- `getSlide(section: string, slide: string)` → `{ section, slide, index, total, prev, next } | null`
  where `index` is 0-based across the whole deck and `prev`/`next` are `{ section, slide }` hrefs
  or `null` at the ends.
- `FIRST_SLIDE` and `firstSlideOf(section)` for the redirect pages.

## 3. Embed registry — `src/components/deck/SlideEmbed.tsx`

| id | component | source | interactive |
|---|---|---|---|
| `language-break` | `LanguageBreakDemo` | import `@/components/work/demos` | yes |
| `context-strip` | `ContextStrip` | import `@/components/work/app-shell` | no |
| `accordion-example` | `AccordionExample` | import | yes |
| `options-explored` | `OptionsExplored` | import | no |
| `risk-tiers` | `RiskTiers` | import | no |
| `shell-after` | `ShellAfterScreen` | import | no |
| `shell-before` | `ShellBeforeDeck` → `DeckStepper(SHELL_BEFORE_SLIDES)` | deck wrapper over exported array | yes |
| `design-handoff` | `DesignHandoffDeck` → `DeckStepper(DESIGN_HANDOFF_SLIDES)` | deck wrapper | yes |
| `career-strip` | `CareerStrip` | new, static | no |
| `i18n-timeline` | `I18nTimeline` → `MilestoneTimeline` | deck wrapper | no |
| `settings-cascade` | `SettingsCascade` → two `SettingsPanel`s | deck wrapper | yes |
| `email-flow` | `EmailFlowDeck` → `EmailTranslationFlow arrowKeys` | deck wrapper | yes |

Each embed renders inside a wrapper carrying a visually-hidden `<h2>` (the embed's name) so the
heading outline under the slide `<h1>` stays logical for axe's `heading-order` (replica panels
render `<h3>`).

## 4. Slide inventory (24)

| # | Section | Slide slug | Template / layout | Embed / asset |
|---|---|---|---|---|
| 1 | intro | `cover` | transition | — |
| 2 | intro | `career-strip` | content / figure | `career-strip` |
| 3 | intro | `how-i-work` | content / statement | — |
| 4 | internationalization | `overview` | transition | — |
| 5 | internationalization | `frame` | content / statement | — |
| 6 | internationalization | `the-bet-before-the-bet` | content / numbers | — |
| 7 | internationalization | `audit-as-change-management` | content / text-figure | image `/work/pre-ipo-audit.png` |
| 8 | internationalization | `see-it-break` | content / demo | `language-break` |
| 9 | internationalization | `operating-model` | content / statement | — |
| 10 | internationalization | `team` | content / numbers | — |
| 11 | internationalization | `sequencing` | content / figure | `i18n-timeline` |
| 12 | internationalization | `the-cascade` | content / demo | `settings-cascade` |
| 13 | internationalization | `translation-flow` | content / demo | `email-flow` |
| 14 | internationalization | `outcomes` | content / numbers | sources as on the study |
| 15 | app-shell | `overview` | transition | — |
| 16 | app-shell | `frame` | content / text-figure | `context-strip` |
| 17 | app-shell | `baseline` | content / figure | `shell-before` |
| 18 | app-shell | `sequencing-as-risk-strategy` | content / statement | — |
| 19 | app-shell | `the-problem` | content / text-figure | `accordion-example` |
| 20 | app-shell | `explorations` | content / figure | `options-explored` |
| 21 | app-shell | `enablement-decision` | content / figure | `design-handoff` |
| 22 | app-shell | `risk-management` | content / text-figure | `risk-tiers` |
| 23 | app-shell | `outcome` | content / figure | `shell-after` |
| 24 | close | `thanks` | transition | links → both `/work` pages |

Slugs repeat across sections (`overview`, `frame`) by design; uniqueness is per section.

## 5. Validation

**Compile-time (`tsc --noEmit`)**: `DeckSectionSlug` union; `DeckEmbedId` derived from the study
unions via `Extract<>`; `EMBEDS: Record<DeckEmbedId, ComponentType>` exhaustiveness; discriminated
`template` / `layout` unions.

**Import-time (`assertDeck`, runs when `src/content/deck/index.ts` is imported — i.e. at build)**:

- ≥1 section; section slugs unique.
- Every section has ≥1 slide.
- Slide slugs match `^[a-z0-9]+(-[a-z0-9]+)*$` and are unique within their section.
- Every `staticDescription` is non-empty.
- The deck's first slide is `template: "transition"` (the redirect target is the cover).
- Every `DeckImage.stageFraction` is in (0, 1].
- `bullets`, when present, are non-empty strings.

## 6. What is explicitly NOT added

- No new tokens in `src/styles/tokens.css`; deck type scale lives in `Slide.module.css`.
- No edits to `robots.ts`, `sitemap.ts`, `palette.ts`, `LeftRail`, or `(main)` chrome.
- No `Player` usage and no change to `featureFlags.walkthroughControls`.
- No changes to study content modules or `StudyPage`.
- No env var other than `DECK_SLUG`; no `vercel.json`; no `middleware.ts`.
