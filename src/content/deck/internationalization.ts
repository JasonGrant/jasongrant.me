import type { DeckSection } from "./types";

// Leadership cut of the Internationalization at Klaviyo case study
// (src/content/studies/internationalization). Numbers and sources match the
// study exactly (contracts/deck-content.md); copy here is deck-authored.
//
// Slide order (reordered 2026-09-13 per Jason's review): the roadmap comes
// right after the section opener, then the audit/proof/prescience/reveal
// arc, then the operating model, then the two live demos in the order they
// happened, with "team" (the hands-on-to-overseeing shift) moved after both
// demos since it explicitly references having just done that hands-on work.
export const internationalizationSection: DeckSection = {
  slug: "internationalization",
  title: "Internationalization at Klaviyo",
  slides: [
    {
      template: "transition",
      slug: "overview",
      title: "Internationalization at Klaviyo",
      kicker: "Klaviyo",
      headline: "Internationalization",
      sub: "A company bet, co-owned by design from day one.",
      bullets: [
        "Marketing automation for 151,000+ businesses in 80+ countries",
        "IPO'd September 2023 with an English-only app limiting its global expansion",
      ],
      staticDescription:
        "Section divider introducing the first case study, Internationalization at Klaviyo. Context: Klaviyo is marketing automation for more than 151,000 businesses in more than 80 countries. It went public in September 2023 with an English-only app limiting its global expansion.",
    },
    {
      template: "content",
      slug: "sequencing",
      title: "Sequencing",
      kicker: "Internationalization › Sequencing judgment",
      headline:
        "Internationalization was a known future need before it was a funded cross-company initiative.",
      layout: "figure",
      figure: { kind: "embed", embed: "i18n-timeline" },
      staticDescription:
        "Sequencing judgment: internationalization was a known future need before it was a funded cross-company initiative. A six-beat timeline: Q1 2022, Debt, removing blockers like multiple frameworks, inconsistent design-system adoption, and components not built for localization; Q4 2023, Audit, the audit and design-system i18n enablement; Q1 2024, Plan, vendor selection, frameworks, tools, and hiring; Q2 2024, Launch, cross-engineering support for the French launch; Q3 2024, Expand, five more languages (German, Portuguese, Korean, Spanish, Italian); and Q4 2024, Empower, customers localizing for their own customers. French alone first, then five languages together: proving the model once and amortizing everything learned across the batch.",
    },
    {
      template: "content",
      slug: "audit-as-change-management",
      title: "The audit as change management",
      kicker: "Internationalization › The audit as change management",
      headline: "Pre-IPO audit",
      layout: "figure",
      figure: {
        kind: "image",
        image: {
          src: "/work/pre-ipo-audit.png",
          alt: "The Q1 2023 pre-IPO audit spreadsheet: one row per app page, with color-coded columns for design-system adoption, internationalization and RTL issues, accessibility violations, and Lighthouse performance scores.",
          width: 4032,
          height: 2138,
          stageFraction: 0.85,
        },
      },
      body: [
        [
          "Scored every page on four fronts: performance, design-system adoption, internationalization, and accessibility.",
        ],
      ],
      staticDescription:
        "Pre-IPO audit: scored every page on four fronts: performance, design-system adoption, internationalization, and accessibility. A screenshot shows the Q1 2023 audit spreadsheet, with color-coded columns for design-system adoption, internationalization and RTL issues, accessibility violations, and Lighthouse performance scores.",
    },
    {
      template: "content",
      slug: "see-it-break",
      title: "See it break",
      kicker: "Internationalization › See it break",
      headline: "Created examples showing common issues",
      layout: "demo",
      embed: "language-break",
      body: [
        [
          "Switching the interface to German breaks three things at once: a truncated button label, a control stranded mid-sentence, and a number kept in US formatting.",
        ],
      ],
      staticDescription:
        "A live demo: switching the interface language from English to German breaks a button label (truncation), a sentence with an embedded control (word order), and a number format (US formatting kept regardless of locale). Switching back to English restores the correct rendering.",
    },
    {
      template: "content",
      slug: "the-bet-before-the-bet",
      title: "The bet before the bet",
      kicker: "Internationalization › The bet before the bet",
      headline: "Worked towards the future without being asked",
      layout: "numbers",
      figureSide: "right",
      columns: [5, 11],
      figure: {
        kind: "image",
        image: {
          src: "/work/ascent-date-picker.png",
          alt: "The Ascent design system's Date Picker and Date Range Picker documentation, showing its anatomy with numbered callouts for the label, date input, calendar navigation, and day states, plus tabs for Overview, Guidelines, Variants, Content, i18n, and a11y.",
          width: 4040,
          height: 2422,
          stageFraction: 0.6,
        },
      },
      body: [
        [
          "First, converting 54 of about 90 pages from Backbone to React, unblocking the design system roadmap. Then components, like this date picker, built i18n-aware from day one.",
        ],
      ],
      stats: [
        {
          figure: "~2 yrs",
          text: "of design-system globalization and app debt reduction work ahead of the funded initiative",
        },
      ],
      staticDescription:
        "Worked towards the future without being asked: the design system was made internationalization-ready almost two years before the initiative was formally funded, so the product would not start from zero. That work started with converting 54 of about 90 pages from Backbone to React, unblocking the design system roadmap, then building components, like the date picker shown here, i18n-aware from day one.",
    },
    {
      template: "content",
      slug: "frame",
      title: "Frame",
      kicker: "Internationalization › Frame",
      headline: "One of three company-wide initiatives that year.",
      layout: "text-figure",
      figure: { kind: "embed", embed: "initiative-venn" },
      body: [
        [
          "Post-IPO, EMEA growth was constrained by an English-only product. Sending to more than one language at once was difficult too: a manual, confusing process with no real system behind it. Internationalization became one of a handful of initiatives the whole company organized around.",
        ],
        [
          "I was the design representative among the initiative owners, alongside a director of engineering and a director of product, not a downstream stakeholder brought in once scope was set.",
        ],
      ],
      staticDescription:
        "Frame slide: internationalization was one of three company-wide initiatives that year, constraining EMEA growth; sending to more than one language at once was also a manual, confusing process with no real system behind it. The presenter was the design representative among the initiative owners from the start. A Venn diagram shows the three initiative owners, each name linking to their LinkedIn profile: Daniel Kezerashvili, Director of Engineering; Evan Eisert, Director of Product; and Jason Grant, Director of Design. Engineering and product overlap on the translation platform; engineering and design overlap on the component library team; product and design overlap on the product plan; and all three overlap at internationalization, in the center.",
    },
    {
      template: "content",
      slug: "operating-model",
      title: "Operating model",
      kicker: "Internationalization › Operating model and team",
      headline: "How we enabled an org.",
      layout: "text-figure",
      figureSide: "right",
      columns: [5, 11],
      gap: 88,
      figure: { kind: "embed", embed: "org-map" },
      body: [["Operationalizing i18n:"]],
      bullets: [
        "Guidelines integrated into the design system docs, so teams self-served",
        "Intl formatting tooling, so the right thing was the default",
        "Localization added to design review standards",
        "Enforcement in linting, so strings couldn't ship unlocalized",
        "Handoff templates included an i18n checklist and guidelines for documenting in the design spec",
      ],
      staticDescription:
        "Operating model: five moves let us enable an org without being in every room: guidelines built into the design system docs, intl formatting tooling that made the right thing the default, localization added to design review standards, enforcement through linting, and handoff templates that included an i18n checklist and guidelines for documenting in the design spec. The figure is a simplified map of the Klaviyo product design org, eighty people: research and documentation, four product verticals (infrastructure, core product, reporting and AI, new ventures), and the presenter's own vertical, unified experience. Five horizontal rows cross these columns: internationalization (highlighted) and content design each reach from documentation through unified experience; design systems, accessibility, and design reviews each reach from infrastructure through unified experience. Research has no horizontal reaching it at all.",
    },
    {
      template: "content",
      slug: "the-cascade",
      title: "The cascade",
      kicker: "Internationalization › The cascade, live",
      headline: "Org settings cascading into personal preferences.",
      layout: "demo",
      embed: "settings-cascade",
      caption: "Save French on the left, then watch the right panel change.",
      staticDescription:
        "A live two-panel demo: an Organization settings panel on the left and a Personal settings panel on the right. Saving a business language and regional format in Organization publishes it as the inherited default in Personal, which a visitor can then override for their own account only. Both panels start in English, United States format.",
    },
    {
      template: "content",
      slug: "team",
      title: "Team",
      kicker: "Internationalization › Team",
      headline: "A shift from hands-on to overseeing.",
      layout: "figure",
      figure: { kind: "embed", embed: "hiring-timeline" },
      body: [
        [
          "Understanding the work firsthand before stepping back to lead let me determine the skills required, then build the cross-functional team for success.",
        ],
      ],
      staticDescription:
        "Team: a four-phase hiring arc, labeled player, then player-coach twice, then leadership. Pre-Q4 2023, it was Daniel (engineering) and the presenter (design) alone, removing blockers: multiple frameworks, inconsistent design-system adoption, and components not built for localization. Q1 2024: Evan joined as the third owner, Daniel pulled an engineer from Web Platform, and hiring opened for a PM and a London i18n engineering team; by quarter's end the PM was hired and engineering had an engineering manager plus four in London. Q2 2024: cross-engineering support for the first non-English language, French, every engineering team owning its own part of the rollout, proving the model once before scaling to five more. Post-Q2 2024: tooling and frameworks were built for engineering and design to follow, part-time design support answered questions and reviewed bugs while a full-time hire was made; five more languages then shipped (German, Portuguese, Korean, Spanish, Italian) without looping engineers in, who asked how it happened without talking to them, and customers could send one campaign across multiple languages. Understanding the work firsthand before stepping back to lead let the presenter determine the skills required, then build the cross-functional team for success.",
    },
    {
      template: "content",
      slug: "customer-conversations",
      title: "Customer conversations",
      kicker: "Internationalization › Supporting expansion",
      headline: "Supporting expansion.",
      layout: "text-figure",
      figureAlign: "end",
      figure: {
        kind: "image",
        image: {
          src: "/work/ben-brophy-linkedin-post.png",
          alt: "Ben Brophy's public LinkedIn post: 'Watching the growth of Smart Translation is thrilling — Klaviyo sent over a million translated messages every day last week.'",
          width: 1068,
          height: 1742,
          stageFraction: 0.35,
          rounded: true,
        },
      },
      body: [
        [
          "Ben (design) and Iti (PM) met directly with new French customers, and kept talking with country-success teams in France and Germany, both about how localization was landing and about those customers' own need to localize for ",
          { em: "their" },
          " customers.",
        ],
      ],
      bullets: [
        "Klaviyo runs quantitative-first: Heap dashboards tracked localized-market usage against existing benchmarks",
        "Qualitative is typically from customer champions, what PMs heard directly, and support tickets",
      ],
      staticDescription:
        "Customer conversations: Ben, design, and Iti, PM, met directly with new French customers and kept talking with country-success teams in France and Germany, both about how localization was landing and about those customers' own need to localize for their customers. Klaviyo runs quantitative-first: Heap dashboards tracked localized-market usage against existing benchmarks, while qualitative is typically from customer champions, what PMs heard directly, and support tickets. Beside the text, right-aligned, Ben's public LinkedIn post: thrilled at Smart Translation's growth, noting Klaviyo sent over a million translated messages a day the week before.",
    },
    {
      template: "content",
      slug: "translation-flow",
      title: "Translation flow",
      kicker: "Internationalization › Translation flow, live",
      headline: "One campaign, multiple languages, staying in sync.",
      layout: "demo",
      embed: "email-flow",
      staticDescription:
        "A live eight-step click-through: choosing campaign recipients across languages, setting the message, building the email once in English, opening an audience-aware translate picker offering French and German (the languages chosen earlier in Organization settings), reviewing the French and German translations side by side, then catching a source-content edit that leaves a translation stale and retranslating just that field.",
    },
    {
      template: "content",
      slug: "outcomes",
      title: "Outcomes",
      kicker: "Internationalization › Outcomes",
      headline: "France and beyond results.",
      layout: "numbers",
      figureSide: "right",
      columns: [5, 11],
      figure: {
        kind: "image",
        image: {
          src: "/work/klaviyo-french-homepage.png",
          alt: "Klaviyo's own marketing homepage, fully localized into French: navigation, headline, product screenshots, and customer logos all in French.",
          width: 1716,
          height: 2302,
          stageFraction: 0.5,
        },
      },
      stats: [
        {
          figure: "65%",
          text: "France new business, quarter over quarter, immediately after the French launch",
          source: {
            label: "Klaviyo Q2 2024 earnings call",
            href: "https://www.fool.com/earnings/call-transcripts/2024/08/07/klaviyo-kvyo-q2-2024-earnings-call-transcript/",
          },
        },
        {
          figure: "~42%",
          text: "year-over-year growth in international revenue in 2025, outpacing the overall business",
          source: {
            label: "Klaviyo Q4 2025 earnings call",
            href: "https://www.fool.com/earnings/call-transcripts/2026/02/11/klaviyo-kvyo-q4-2025-earnings-call-transcript/",
          },
        },
      ],
      staticDescription:
        "Outcomes: France new business grew 65% quarter over quarter immediately after the French launch, per Klaviyo's Q2 2024 earnings call. International revenue grew about 42% year over year in 2025, outpacing the overall business, per the Q4 2025 earnings call. Beside the stats, Klaviyo's own marketing homepage, fully localized into French.",
    },
  ],
};
