import type { GlossaryTermId } from "./types";

export interface GlossaryEntry {
  id: GlossaryTermId;
  label: string;
  definition: string;
}

// Definitions traceable to the guideline pages captured for this feature
// (see specs/002-interactive-case-studies/research.md, D-notes on Ascent
// share 38f371b04) and standard i18n/l10n industry usage.
export const glossary: Record<GlossaryTermId, GlossaryEntry> = {
  i18n: {
    id: "i18n",
    label: "internationalization (i18n)",
    definition:
      "Designing and building a product so it CAN be adapted to different languages and regions without further engineering work — the groundwork, not the translation itself.",
  },
  l10n: {
    id: "l10n",
    label: "localization (l10n)",
    definition:
      "Adapting an internationalized product to one specific locale: translating text, adjusting formatting, and fitting cultural conventions for that market.",
  },
  globalization: {
    id: "globalization",
    label: "globalization",
    definition:
      "The broader capability to operate across languages, currencies, and regions at once — internationalization and localization are the two halves that get you there.",
  },
  translation: {
    id: "translation",
    label: "translation",
    definition: "Converting written text from one language to another, as precisely as possible.",
  },
  locale: {
    id: "locale",
    label: "locale",
    definition:
      "A specific language-plus-region combination (e.g. fr-CA is French as used in Canada) — languages and countries don't map one to one.",
  },
};
