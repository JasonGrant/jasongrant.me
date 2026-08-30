// Published guideline facts, pinned as linguistic claims — never exact-glyph
// strings compared against live Intl output (research D10). Sourced from
// Jason's Ascent design-system guideline pages (share 38f371b04, captured
// 2026-08-29) and his presentation materials for the one page still
// password-protected (word-order). See specs/002-interactive-case-studies/
// research.md for full provenance notes.

export const TEXT_EXPANSION_FACTS = {
  // Text expansion guideline page (public).
  pair: {
    en: "Create an abandoned cart flow",
    enChars: 29,
    de: "Erstellen Sie einen Ablauf für abgebrochene Warenkörbe",
    deChars: 54,
  },
  // The point at which truncating the German string flips its visible
  // meaning: cutting the last ~10 characters leaves "…abgebrochene" gone,
  // reading as "Create a canceled flow" instead of "an abandoned cart flow."
  truncatedMeaningChange: {
    truncated: "Erstellen Sie einen Ablauf für abgebro",
    misreadsAs: "Create a canceled flow",
  },
  // W3C-based expansion tiers by source character count.
  tiers: [
    { maxChars: 10, reserve: "300%" },
    { maxChars: 20, reserve: "200%" },
    { maxChars: 30, reserve: "180%" },
    { maxChars: 50, reserve: "160%" },
    { maxChars: 70, reserve: "140%" },
    { maxChars: Number.POSITIVE_INFINITY, reserve: "130%" },
  ],
  spareSpaceRule: "Leave 30–35% spare space within every block of words to prevent truncation.",
  frenchLaunchStat:
    "Roughly 10% of new internationalization bugs during the French launch were text-expansion bugs.",
} as const;

export const WORD_ORDER_FACTS = {
  // Sourced from Jason's presentation deck (the Ascent word-order page is
  // password-protected as of this capture) — quoted rule, not paraphrased.
  rule: "Do not insert form inputs in the middle of text strings.",
  broken: { prefix: "Senden Sie", control: "5 Minuten", suffix: "nach der Anmeldung eine E-Mail" },
  corrected: { label: "Verzögerung", control: "5 Minuten" },
} as const;

export const FORMATTING_FACTS = {
  sampleNumber: 5123456.59,
  samplePercent: 0.598,
  sampleCurrency: 145.79,
  sampleCompactCurrency: 23000,
  locales: [
    { code: "en-US", label: "English (US)" },
    { code: "de-DE", label: "Deutsch (Germany)" },
    { code: "fr-FR", label: "Français (France)" },
    { code: "fr-CA", label: "Français (Canada)" },
    { code: "it-CH", label: "Italiano (Switzerland)" },
    { code: "cs-CZ", label: "Čeština (Czechia)" },
    { code: "tr-TR", label: "Türkçe (Turkey)" },
    { code: "ja-JP", label: "日本語 (Japan)" },
    { code: "ko-KR", label: "한국어 (Korea)" },
    { code: "pl-PL", label: "Polski (Poland)" },
    { code: "ar-KW", label: "العربية (Kuwait)" },
  ],
  // Linguistic claims, not glyph assertions — the live table renders the
  // real Intl output; these describe what a visitor should notice.
  notes: {
    "tr-TR": "Percent symbol comes before the number (%59,8), not after.",
    "it-CH": "Groups thousands with a typographic apostrophe (’), not a comma or period.",
    "ja-JP": "Yen has no decimal places.",
    "ko-KR": "Won has no decimal places.",
    "ar-KW": "Kuwaiti dinar uses three decimal places, not two.",
    "fr-CA": "Compact currency renders with the symbol trailing the abbreviation, e.g. 23 k$.",
  } as Record<string, string>,
} as const;

export const FLAGS_FACTS = {
  doRule: "Use flags to represent countries — for example, in a phone-number country selector.",
  dontRule: "Never use flags to represent a language.",
  spanishAmbiguity: ["Spain", "Mexico", "Argentina"],
  multilingualCountryExample: {
    country: "Switzerland",
    languages: ["Deutsch", "Français", "Italiano"],
  },
} as const;
