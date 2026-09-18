import { appShellSection } from "./app-shell";
import { closeSection } from "./close";
import { internationalizationSection } from "./internationalization";
import { introSection } from "./intro";
import type { Deck, DeckEmbedId, DeckOutline, DeckSection, DeckSlide } from "./types";

// The presentation deck (feature 008). One deck, four sections, authored as
// data; the route tree under src/app/deck enumerates it at build time. See
// specs/008-presentation-deck/data-model.md.
export const deck: Deck = {
  title: "Jason Grant, portfolio presentation",
  sections: [introSection, internationalizationSection, appShellSection, closeSection],
};

// Embeds that hold visitor-changeable state. A slide that renders one of
// these gets the Reset control (data-model.md §2).
export const INTERACTIVE_EMBEDS: ReadonlySet<DeckEmbedId> = new Set<DeckEmbedId>([
  "language-break",
  "accordion-example",
  "options-explored",
  "shell-before",
  "design-handoff",
  "settings-cascade",
  "email-flow",
]);

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isResettable(slide: DeckSlide): boolean {
  if (slide.template !== "content") return false;
  if (slide.layout === "demo") return INTERACTIVE_EMBEDS.has(slide.embed);
  if (slide.layout === "figure" || slide.layout === "text-figure") {
    return slide.figure.kind === "embed" && INTERACTIVE_EMBEDS.has(slide.figure.embed);
  }
  return false;
}

function assertDeck(d: Deck): void {
  if (d.sections.length === 0) throw new Error("Deck has zero sections.");
  const sectionSlugs = new Set<string>();
  for (const section of d.sections) {
    if (sectionSlugs.has(section.slug)) {
      throw new Error(`Duplicate deck section slug "${section.slug}".`);
    }
    sectionSlugs.add(section.slug);
    if (section.slides.length === 0) {
      throw new Error(`Deck section "${section.slug}" has zero slides.`);
    }
    const slideSlugs = new Set<string>();
    for (const slide of section.slides) {
      const at = `${section.slug}/${slide.slug}`;
      if (!SLUG_RE.test(slide.slug))
        throw new Error(`Deck slide slug "${at}" is not a valid slug.`);
      if (slideSlugs.has(slide.slug)) throw new Error(`Duplicate deck slide slug "${at}".`);
      slideSlugs.add(slide.slug);
      if (!slide.staticDescription || slide.staticDescription.trim() === "") {
        throw new Error(`Deck slide "${at}" is missing a staticDescription.`);
      }
      if (slide.template === "content") {
        if (slide.layout === "figure" || slide.layout === "text-figure") {
          const f = slide.figure;
          if (f.kind === "image" && !(f.image.stageFraction > 0 && f.image.stageFraction <= 1)) {
            throw new Error(`Deck slide "${at}" image stageFraction must be in (0, 1].`);
          }
        }
        if ("bullets" in slide && slide.bullets?.some((b) => b.trim() === "")) {
          throw new Error(`Deck slide "${at}" has an empty bullet.`);
        }
      }
    }
  }
  const first = d.sections[0].slides[0];
  if (first.template !== "transition") {
    throw new Error("The deck's first slide must be a transition (it is the cover).");
  }
}

assertDeck(deck);

export function getOutline(): DeckOutline {
  return {
    sections: deck.sections.map((s) => ({
      slug: s.slug,
      title: s.title,
      slides: s.slides.map((sl) => ({
        slug: sl.slug,
        title: sl.title,
        resettable: isResettable(sl),
      })),
    })),
  };
}

export interface SlideRef {
  section: string;
  slide: string;
}

export interface ResolvedSlide {
  section: DeckSection;
  slide: DeckSlide;
  /** 0-based position across the whole deck. */
  index: number;
  total: number;
  prev: SlideRef | null;
  next: SlideRef | null;
}

const FLAT: { section: DeckSection; slide: DeckSlide }[] = deck.sections.flatMap((section) =>
  section.slides.map((slide) => ({ section, slide })),
);

export const FIRST_SLIDE: SlideRef = {
  section: FLAT[0].section.slug,
  slide: FLAT[0].slide.slug,
};

export function firstSlideOf(sectionSlug: string): SlideRef | null {
  const section = deck.sections.find((s) => s.slug === sectionSlug);
  return section ? { section: section.slug, slide: section.slides[0].slug } : null;
}

export function getSlide(sectionSlug: string, slideSlug: string): ResolvedSlide | null {
  const index = FLAT.findIndex((e) => e.section.slug === sectionSlug && e.slide.slug === slideSlug);
  if (index === -1) return null;
  const toRef = (i: number): SlideRef | null =>
    i >= 0 && i < FLAT.length ? { section: FLAT[i].section.slug, slide: FLAT[i].slide.slug } : null;
  return {
    section: FLAT[index].section,
    slide: FLAT[index].slide,
    index,
    total: FLAT.length,
    prev: toRef(index - 1),
    next: toRef(index + 1),
  };
}
