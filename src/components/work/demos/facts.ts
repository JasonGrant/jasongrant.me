// Published guideline facts, pinned as linguistic claims — never exact-glyph
// strings compared against live Intl output (research D10). Sourced from
// Jason's Ascent design-system guideline pages (share 38f371b04, captured
// 2026-08-29) and his presentation materials for the one page still
// password-protected (word-order). See specs/002-interactive-case-studies/
// research.md for full provenance notes.

export const TEXT_EXPANSION_FACTS = {
  // Text expansion guideline page (public). One English source label, shown
  // translated into a chosen target language. As the target button narrows it
  // drops whole words and back-translates to progressively different (and
  // wrong) meanings. Each target carries its own `readings`, ordered widest to
  // narrowest by the visible character count (first entry whose minChars <=
  // chars shown wins).
  source: { text: "Create an abandoned cart flow", chars: 29 },
  targets: [
    {
      code: "de",
      label: "German",
      string: "Erstellen Sie einen Ablauf für abgebrochene Warenkörbe",
      chars: 54,
      cancel: "Abbrechen",
      readings: [
        {
          minChars: 50,
          reads: "Create an abandoned cart flow",
          intact: true,
          note: "the full label",
        },
        {
          minChars: 31,
          reads: "Create a canceled flow",
          intact: false,
          note: "“abgebrochene” now reads as “canceled,” and the carts are gone",
        },
        {
          minChars: 20,
          reads: "Create a flow",
          intact: false,
          note: "the abandoned cart has dropped off entirely",
        },
        {
          minChars: 14,
          reads: "Create a…",
          intact: false,
          note: "only the opening of the label survives",
        },
        { minChars: 0, reads: "Create", intact: false, note: "just the verb is left" },
      ],
    },
    {
      code: "fr",
      label: "French",
      string: "Créer un flux de panier abandonné",
      chars: 33,
      cancel: "Annuler",
      readings: [
        {
          minChars: 30,
          reads: "Create an abandoned cart flow",
          intact: true,
          note: "the full label",
        },
        {
          minChars: 23,
          reads: "Create a cart flow",
          intact: false,
          note: "“abandonné” is gone, so nothing marks the carts as abandoned",
        },
        {
          minChars: 13,
          reads: "Create a flow",
          intact: false,
          note: "the cart has dropped off entirely",
        },
        {
          minChars: 8,
          reads: "Create a…",
          intact: false,
          note: "only the opening of the label survives",
        },
        { minChars: 0, reads: "Create", intact: false, note: "just the verb is left" },
      ],
    },
  ],
  // W3C-based expansion tiers by source character count.
  tiers: [
    {
      maxChars: 10,
      label: "Up to 10",
      reserve: "300%",
      components: "Buttons, badges, navigation, tabs",
    },
    { maxChars: 20, label: "11 to 20", reserve: "200%", components: "Filters, inputs, labels" },
    {
      maxChars: 30,
      label: "21 to 30",
      reserve: "180%",
      components: "Page header, form instructions",
    },
    { maxChars: 50, label: "31 to 50", reserve: "160%", components: "Tooltips, titles" },
    {
      maxChars: 70,
      label: "51 to 70",
      reserve: "140%",
      components: "Short paragraphs, informational text",
    },
    {
      maxChars: Number.POSITIVE_INFINITY,
      label: "More than 70",
      reserve: "130%",
      components: "Longer paragraphs",
    },
  ],
} as const;

// Two common UI labels rendered across languages, showing how far a single
// word's width swings. Illustrative translations from Jason's Ascent
// text-expansion guideline (fictional "Meridian" product context).
export const TEXT_EXPANSION_BUTTON = {
  words: ["Edit", "Views"],
  rows: [
    { lang: "English", forms: ["Edit", "Views"] },
    { lang: "Japanese", forms: ["編集", "ビュー"] },
    { lang: "Chinese", forms: ["编辑", "视图"] },
    { lang: "Korean", forms: ["편집", "보기"] },
    { lang: "Spanish", forms: ["Editar", "Vistas"] },
    { lang: "French", forms: ["Modifier", "Vues"] },
    { lang: "Italian", forms: ["Modifica", "Visualizzazioni"] },
    { lang: "German", forms: ["Bearbeiten", "Ansichten"] },
    { lang: "Dutch", forms: ["Bewerken", "Weergaven"] },
    { lang: "Polish", forms: ["Edytuj", "Widoki"] },
    { lang: "Turkish", forms: ["Düzenle", "Görünümler"] },
    { lang: "Greek", forms: ["Επεξεργασία", "Προβολές"] },
  ],
} as const;

// One dropdown menu across four languages: the panel must be sized for the
// widest translation (Italian), or items wrap or clip.
export const TEXT_EXPANSION_MENU = {
  menus: [
    {
      lang: "Korean",
      trigger: "옵션",
      items: [
        "분석 내보내기",
        "이메일 동향 보기",
        "스마트 전송 시간 보고서 보기",
        "보관된 캠페인 보기",
      ],
    },
    {
      lang: "English",
      trigger: "Options",
      items: [
        "Export analytics",
        "View email trends",
        "View Smart Send Time report",
        "View archived campaigns",
      ],
    },
    {
      lang: "French",
      trigger: "Choix",
      items: [
        "Analyse des exportations",
        "Afficher les tendances des e-mails",
        "Afficher le rapport Smart Send Time",
        "Afficher les campagnes archivées",
      ],
    },
    {
      lang: "Italian",
      trigger: "Opzioni",
      items: [
        "Esporta analisi",
        "Visualizza le tendenze della posta elettronica",
        "Visualizza il rapporto sul tempo di invio intelligente",
        "Visualizza le campagne archiviate",
      ],
    },
  ],
} as const;

export const WORD_ORDER_FACTS = {
  // Sourced from Jason's presentation deck; the Ascent word-order page is
  // password-protected as of this capture.
  languages: [
    { code: "en", label: "English" },
    { code: "de", label: "German" },
    { code: "fr", label: "French" },
  ],
  // "Avoid inputs within sentences": the same setting as a labelled field (Do)
  // vs. an input embedded in a sentence (Don't). The Don't string is split
  // around the control so its position moves with each language's word order.
  inputs: {
    control: "5",
    label: { en: "Time window", de: "Zeitraum", fr: "Période" },
    unit: { en: "days", de: "Tage", fr: "jours" },
    dont: {
      en: { before: "Include emails from the last", after: "days" },
      de: { before: "E-Mails der letzten", after: "Tage einschließen" },
      fr: { before: "Inclure les e-mails des", after: "derniers jours" },
    },
    helper: {
      en: "English puts the verb first and the number near the end.",
      de: "German sends the verb “einschließen” to the very end, so the input sits before it, the mirror image of English. A layout built for the English order can’t flip like that.",
      fr: "French keeps the verb first, but “derniers” (last) moves after the number, so the words around the input shift.",
    },
  },
  // "Avoid links within sentences": a sentence with the link on its own line
  // (Do) vs. the link embedded (Don't). The Don't string is split around the
  // anchor so both its wording and its place change per language.
  links: {
    doText: {
      en: "Include an opt-in disclosure with your subscribe link.",
      de: "Fügen Sie einen Opt-in-Hinweis zu Ihrem Anmeldelink hinzu.",
      fr: "Ajoutez un avis d’opt-in à votre lien d’inscription.",
    },
    doLink: {
      en: "Learn about opt-in disclosure",
      de: "Mehr über Opt-in-Hinweise",
      fr: "En savoir plus sur l’opt-in",
    },
    dont: {
      en: { before: "Add your", anchor: "opt-in disclosure", after: "beside the subscribe link." },
      de: { before: "Fügen Sie Ihren", anchor: "Opt-in-Hinweis", after: "beim Anmeldelink hinzu." },
      fr: {
        before: "Ajoutez votre",
        anchor: "avis d’opt-in",
        after: "près du lien d’inscription.",
      },
    },
    helper: {
      en: "Here the link text is one clean phrase.",
      de: "In German the anchor becomes “Opt-in-Hinweis” and the verb “hinzu” jumps to the end, so the link’s wording and its place in the sentence both change.",
      fr: "In French the anchor becomes “avis d’opt-in” and shifts position, so the link text can’t be reused as-is.",
    },
    benefits: [
      "The link keeps one whole, translatable label instead of being cut to fit the grammar.",
      "Word order can change freely without dragging the link around with it.",
      "Screen readers announce a clear, self-contained link, not a mid-sentence fragment.",
    ],
  },
} as const;

export const FORMATTING_FACTS = {
  sampleNumber: 5123456.59,
  samplePercent: 0.5976,
  sampleCurrency: 3456.59,
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
  doRule: "Use flags to represent countries, for example in a phone-number country selector.",
  dontRule: "Never use flags to represent a language.",
  spanishAmbiguity: ["Spain", "Mexico", "Argentina"],
  multilingualCountryExample: {
    country: "Switzerland",
    languages: ["Deutsch", "Français", "Italiano"],
  },
} as const;
