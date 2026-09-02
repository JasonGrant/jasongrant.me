import type { CaseStudy } from "../types";

// Sourcing (FR-024): the opening audit, kickoff, and walkthrough flows are
// drawn from Jason's own presentation materials and direct product
// knowledge of the initiative, retained in his private storage and
// referenced by location from specs/002-interactive-case-studies/
// research.md — never committed to this public repository. The four
// concept demos (text expansion, word order, formatting, cultural
// elements/flags) are grounded verbatim in the published Ascent guideline
// pages (see src/components/work/demos/facts.ts for citations); the
// word-order guideline specifically is sourced from Jason's deck, since
// that Ascent page is currently password-protected.
export const internationalizationStudy: CaseStudy = {
  slug: "internationalization",
  title: "Internationalization at Klaviyo",
  description:
    "How a design-system initiative caught a product before it shipped broken in German, and the settings, formats, and translation flow that came out of it.",
  listed: false,
  company: "Klaviyo",
  role: "Design Strategy, Design Lead, Hands-on Design, People Leader, Company Initiative Owner (one of three)",
  milestones: [
    { quarter: "Q4", year: 2023, showYear: true, label: "Audit and design system i18n enablement" },
    {
      quarter: "Q1",
      year: 2024,
      showYear: true,
      label: "Vendor selection, frameworks, tools, and hiring",
    },
    {
      quarter: "Q2",
      year: 2024,
      showYear: false,
      label: "Cross-engineering support for the French launch",
    },
    {
      quarter: "Q3",
      year: 2024,
      showYear: false,
      label: "Five more languages: German, Portuguese, Korean, Spanish, Italian",
    },
    {
      quarter: "Q4",
      year: 2024,
      showYear: false,
      label: "Customers localizing for their own customers",
    },
  ],
  blocks: [
    {
      kind: "prose",
      id: "overview",
      heading: "Overview",
      showTimeline: true,
      body: [
        [
          "This had been an informal, ",
          { term: "i18n" },
          " expectation inside the company for nearly two years before it became an official, funded initiative. In anticipation, the design systems team had already started aligning component work toward ",
          { term: "globalization" },
          ", so that whenever the initiative went official, the product wouldn't be starting from zero.",
        ],
        "Once it was formally established, I took charge of defining what internationalization would mean for the design team specifically: which patterns needed to change, which guidelines didn't exist yet, and how design work would get evaluated for it going forward.",
      ],
    },
    {
      kind: "prose",
      id: "pre-ipo-audit",
      heading: "Pre-IPO audit",
      image: {
        src: "/work/pre-ipo-audit.png",
        alt: "The Q1 2023 pre-IPO audit spreadsheet: one row per app page, with color-coded columns for design-system adoption, internationalization and RTL issues, accessibility violations, and Lighthouse performance scores.",
        caption:
          "The audit itself: one row per page, color-coded across design-system adoption, internationalization, accessibility, and Lighthouse performance.",
        width: 4032,
        height: 2138,
      },
      body: [
        "In Q1 2023, ahead of the IPO, leadership wanted a clear baseline of how far along the product actually was on four fronts: performance (Lighthouse scores), design-system adoption, internationalization, and accessibility compliance.",
        "Every page of the app was scored on all four. The marketing and support sites were scored for accessibility only.",
        "Internationalization was one of those four columns, and it is what set up this initiative: the audit showed how much of the product still assumed one language and one locale, and gave leadership the evidence to fund the work.",
      ],
    },
    {
      kind: "prose",
      id: "kickoff",
      heading: "Kickoff: the audit",
      embedDemo: "language-break",
      embedDemoLinks: {
        truncation: "text-expansion-demo",
        "word-order": "word-order-demo",
        formatting: "formatting-demo",
      },
      body: [
        [
          "As soon as the initiative became official, I ran an audit of the product's actual readiness. Not a spec review, a real one. I switched the interface to German using machine translation and went looking for what broke.",
        ],
        "It didn't take long. Buttons truncated mid-word. Dropdowns embedded inside sentences stranded themselves when the sentence reordered. Numbers kept US formatting regardless of locale. The findings became a company-wide report, and that report became the design team's actual roadmap. Not a wishlist, a punch list.",
        [
          "The rest of this study walks through what came out of that punch list: the guidelines the team adopted (grounded in real, published rules; try the demos below), and the settings and ",
          { term: "translation" },
          " flow the product needed to actually act on a chosen ",
          { term: "locale" },
          ".",
        ],
      ],
    },
    {
      kind: "demo",
      id: "text-expansion-demo",
      demo: "text-expansion",
      intro: [
        "The single biggest source of new bugs. German alone can run 80%+ longer than the English source string. A truncated translation doesn't just look bad; it can silently say something different.",
      ],
      callout: {
        figure: "~10%",
        text: "of new internationalization bugs during the French launch were text-expansion bugs.",
      },
      staticCaption:
        "The English/German string pair renders at full width with no truncation, alongside the W3C expansion-tier table.",
    },
    {
      kind: "demo",
      id: "word-order-demo",
      demo: "word-order",
      intro: [
        "Embedding a live control inside a sentence assumes the sentence's word order never changes. It does, constantly, across languages.",
      ],
      staticCaption:
        "The English sentence with its embedded control renders correctly; the corrected pattern is shown below it.",
    },
    {
      kind: "demo",
      id: "formatting-demo",
      demo: "formatting",
      intro: [
        [
          "Numbers, percentages, and currency don't just translate; they reformat by ",
          { term: "locale" },
          ". This table is live: it's calling your browser's own formatting API, the same one the product uses.",
        ],
      ],
      staticCaption:
        "The table renders pre-formatted English (en-US) figures for number, percentage, currency, and compact currency.",
    },
    {
      kind: "demo",
      id: "flags-demo",
      demo: "flags-rule",
      intro: [
        "A flag represents a country. It has never reliably represented a language, and treating the two as interchangeable causes real problems.",
      ],
      staticCaption:
        "The country-flag example and the corrected text-only language list render statically.",
    },
    {
      kind: "prose",
      id: "design-work-intro",
      heading: "Phase 1 Designs",
      navLabel: "Phase 1 designs",
      body: [
        [
          "Guidelines catch problems inside individual components. The first structural build was the ",
          { term: "locale" },
          " model itself: where a language setting lives and who it applies to. Two levels, an organization default and a personal override, each with a live preview before anything is saved.",
        ],
      ],
    },
    {
      kind: "walkthrough",
      id: "org-settings-segment",
      title: "Organization settings",
      screen: "org-settings",
      steps: [
        {
          target: "business-language-select",
          action: "highlight",
          highlight: true,
          caption:
            "Business language sets the default for every new teammate who joins this account.",
          narrationText:
            "Business language sets the default for every new teammate who joins this account.",
          durationMs: 4000,
        },
        {
          target: "business-language-select",
          action: "select",
          value: "French",
          highlight: true,
          caption:
            "Switching it to French changes what every new signup sees by default, not just this one user.",
          narrationText:
            "Switching it to French changes what every new signup sees by default, not just this one user.",
          durationMs: 4000,
        },
        {
          target: "business-format-select",
          action: "highlight",
          highlight: true,
          caption:
            "Business format is separate; it controls how every report renders numbers, dates, and currency.",
          narrationText:
            "Business format is separate; it controls how every report renders numbers, dates, and currency.",
          durationMs: 4000,
        },
        {
          target: "business-format-select",
          action: "select",
          value: "France",
          highlight: true,
          caption:
            "Set to France, every report across the account switches to French formatting conventions.",
          narrationText:
            "Set to France, every report across the account switches to French formatting conventions.",
          durationMs: 4000,
        },
        {
          target: "preview-card",
          action: "highlight",
          highlight: true,
          caption: "The preview updates immediately, before anyone commits to the change.",
          narrationText: "The preview updates immediately, before anyone commits to the change.",
          durationMs: 3500,
        },
        {
          target: "localization-languages",
          action: "highlight",
          highlight: true,
          caption: "Separate again: which languages can content actually be translated into?",
          narrationText: "Separate again: which languages can content actually be translated into?",
          durationMs: 3500,
        },
        {
          target: "localization-languages",
          action: "select",
          value: "French,German",
          highlight: true,
          caption:
            "French and German are selected here; these are the only languages the email flow will offer later in this study.",
          narrationText:
            "French and German are selected here; these are the only languages the email flow will offer later in this study.",
          durationMs: 5000,
        },
        {
          target: "save-button",
          action: "highlight",
          highlight: true,
          caption: "Save applies every change organization-wide.",
          narrationText: "Save applies every change organization-wide.",
          durationMs: 3000,
        },
        {
          target: "save-button",
          action: "toast",
          value: "Saved",
          highlight: false,
          caption: "Saved. The organization now defaults to French, formatted for France.",
          narrationText: "Saved. The organization now defaults to French, formatted for France.",
          durationMs: 3000,
        },
      ],
    },
    {
      kind: "walkthrough",
      id: "personal-settings-segment",
      title: "Personal settings",
      screen: "personal-settings",
      steps: [
        {
          target: "personal-language-select",
          action: "highlight",
          highlight: true,
          caption:
            "Personal settings override the business default, but only for this one account.",
          narrationText:
            "Personal settings override the business default, but only for this one account.",
          durationMs: 4000,
        },
        {
          target: "personal-language-select",
          action: "select",
          value: "German",
          highlight: true,
          caption: "This teammate prefers German. Nobody else on the team is affected.",
          narrationText: "This teammate prefers German. Nobody else on the team is affected.",
          durationMs: 4000,
        },
        {
          target: "personal-format-select",
          action: "select",
          value: "Germany",
          highlight: true,
          caption:
            "Their personal format follows the same override: German date, number, and currency conventions.",
          narrationText:
            "Their personal format follows the same override: German date, number, and currency conventions.",
          durationMs: 4000,
        },
        {
          target: "preview-card",
          action: "highlight",
          highlight: true,
          caption:
            "The preview reflects their personal choice, independent of the org default set a moment ago.",
          narrationText:
            "The preview reflects their personal choice, independent of the org default set a moment ago.",
          durationMs: 3500,
        },
        {
          target: "save-button",
          action: "toast",
          value: "Saved",
          highlight: true,
          caption:
            "Saved. This account now reads German while the rest of the organization defaults to French.",
          narrationText:
            "Saved. This account now reads German while the rest of the organization defaults to French.",
          durationMs: 3500,
        },
      ],
    },
    {
      kind: "prose",
      id: "phase-1-impact",
      heading: "Phase 1 Impact",
      navLabel: "Phase 1 impact",
      // Metric (FR-023 verification): PUBLIC. On Klaviyo's Q2 2024 earnings call
      // (2024-08-07) CFO Amanda Whalen said France was "our fastest-growing
      // country in new business in the quarter, up more than 65%" quarter over
      // quarter, and credited the French-language product launch ("we have seen
      // extremely strong trends there as a result"). Directly on-point here.
      body: [
        [
          "French shipped first, on its own, in Q2 2024, the first non-English language the platform had ever offered. It ran directly on the model above: an organization default, personal overrides, and formatting that followed the ",
          { term: "locale" },
          " instead of the source string.",
        ],
        "The response was immediate. On its Q2 2024 earnings call, Klaviyo named France its fastest-growing country in new business that quarter and credited the French-language launch.",
      ],
      callout: {
        figure: "65%",
        text: "quarter-over-quarter growth in new business from France the quarter the French product shipped.",
        source: {
          label: "Klaviyo Q2 2024 earnings call",
          href: "https://www.fool.com/earnings/call-transcripts/2024/08/07/klaviyo-kvyo-q2-2024-earnings-call-transcript/",
        },
      },
    },
    {
      kind: "prose",
      id: "phase-2-designs",
      heading: "Phase 2 Designs",
      navLabel: "Phase 2 designs",
      body: [
        "With French proven, the work expanded on two fronts. Five more languages, German, Portuguese, Korean, Spanish, and Italian, scaled together to reach seven by Q3 2024.",
        [
          "The larger design problem was the second front: letting customers localize their own content for their own audiences, not just the app interface they worked in. The clearest case is email, where a marketer writes one campaign for a multilingual list and needs every ",
          { term: "translation" },
          " to stay in sync with the source as it changes. The flow below walks through it, from choosing languages to catching a translation gone stale.",
        ],
      ],
    },
    {
      kind: "email-flow",
      id: "email-flow",
      heading: "Email translation flow",
    },
    {
      kind: "prose",
      id: "impact",
      heading: "Overall impact",
      navLabel: "Overall impact",
      // Metrics (FR-023 verification), all from Klaviyo's public filings/earnings:
      // - International GROWTH: ~42% YoY in 2025 (the hero figure), per the
      //   FY2025 / Q4 2025 call (reported 2026-02-11). NOTE: the corpus draft
      //   mislabeled this ~42% growth rate as a "41.5% share" — the error that
      //   prompted this pass.
      // - International SHARE: the 424B4 prospectus put revenue outside the
      //   Americas at 29.3% (FY2022) / 30.7% (H1 2023); the same Q4 2025 call
      //   put it at "more than one-third" (~34%).
      // - Country new business: France/Germany/Spain each >100% YoY in Q1 2025,
      //   stated on the Q1 2025 earnings call.
      body: [
        "Internationalization shipped as a foundation, not a feature, and the results compounded from there.",
        [
          "France, Germany, and Spain each grew new business more than 100% year over year in ",
          {
            href: "https://finance.yahoo.com/news/klaviyo-inc-kvyo-q1-2025-072159084.html",
            text: "Q1 2025",
          },
          ". Revenue from outside the Americas climbed from about 31% of the total at the ",
          {
            href: "https://www.sec.gov/Archives/edgar/data/1835830/000162828023032570/klaviyoincfinalprospectus.htm",
            text: "IPO",
          },
          " to more than a third by the end of 2025.",
        ],
        "Seven languages were live by Q3 2024, less than a year after the product was English-only. The teams were new too: Design Systems, Content Design, and Internationalization were all built from zero across this window, alongside the Ascent design system the guidelines above live in.",
      ],
      callout: {
        figure: "~42%",
        text: "year-over-year growth in international revenue in 2025, outpacing the overall business.",
        source: {
          label: "Klaviyo Q4 2025 earnings call",
          href: "https://www.fool.com/earnings/call-transcripts/2026/02/11/klaviyo-kvyo-q4-2025-earnings-call-transcript/",
        },
      },
    },
  ],
};
