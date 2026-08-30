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
    "How a design-system initiative caught a product before it shipped broken in German — and the settings, formats, and translation flow that came out of it.",
  listed: false,
  company: "Klaviyo",
  role: "Design Strategy, Design Lead, Hands-on Design, People Leader",
  timeline: "Q4 2023 – Q2 2024",
  blocks: [
    {
      kind: "demo",
      id: "break-demo",
      demo: "language-break",
      intro: [
        "Switch the language below. Watch what a straight machine translation actually did to this product before this initiative existed.",
      ],
      staticCaption:
        "In English, the interface renders normally. Switching to German breaks a truncated button label, a form control stranded mid-sentence, and a number kept in US formatting.",
      annotationLinks: {
        truncation: "text-expansion-demo",
        "word-order": "word-order-demo",
        formatting: "formatting-demo",
      },
    },
    {
      kind: "prose",
      id: "overview",
      heading: "Overview",
      body: [
        [
          "This had been an informal, ",
          { term: "i18n" },
          " expectation inside the company for nearly two years before it became an official, funded initiative. In anticipation, the design systems team had already started aligning component work toward ",
          { term: "globalization" },
          " — so that whenever the initiative went official, the product wouldn't be starting from zero.",
        ],
        "Once it was formally established, I took charge of defining what internationalization would mean for the design team specifically: which patterns needed to change, which guidelines didn't exist yet, and how design work would get evaluated for it going forward.",
      ],
    },
    {
      kind: "prose",
      id: "kickoff",
      heading: "Kickoff: the audit",
      body: [
        [
          "As soon as the initiative became official, I ran an audit of the product's actual readiness — not a spec review, a real one. I switched the interface to German using machine translation and went looking for what broke.",
        ],
        "It didn't take long. Buttons truncated mid-word. Dropdowns embedded inside sentences stranded themselves when the sentence reordered. Numbers kept US formatting regardless of locale. The findings became a company-wide report, and that report became the design team's actual roadmap — not a wishlist, a punch list.",
        [
          "The rest of this study walks through what came out of that punch list: the guidelines the team adopted (grounded in real, published rules — try the demos below), and the settings and ",
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
        "The single biggest source of new bugs. German alone can run 80%+ longer than the English source string — and a truncated translation doesn't just look bad, it can silently say something different.",
      ],
      staticCaption:
        "The English/German string pair renders at full width with no truncation, alongside the W3C expansion-tier table.",
    },
    {
      kind: "demo",
      id: "word-order-demo",
      demo: "word-order",
      intro: [
        "Embedding a live control inside a sentence assumes the sentence's word order never changes. It does — constantly, across languages.",
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
          "Numbers, percentages, and currency don't just translate — they reformat by ",
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
        "A flag represents a country. It has never reliably represented a language — and treating the two as interchangeable causes real problems.",
      ],
      staticCaption:
        "The country-flag example and the corrected text-only language list render statically.",
    },
    {
      kind: "prose",
      id: "design-work-intro",
      heading: "The design work",
      body: [
        [
          "Guidelines catch problems in individual components. The bigger structural question was the ",
          { term: "locale" },
          " model itself: where does a language setting live, who does it apply to, and how does a marketer actually get content translated without breaking the source. Here's the flow, end to end.",
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
            "Switching it to French changes what every new signup sees by default — not just this one user.",
          narrationText:
            "Switching it to French changes what every new signup sees by default — not just this one user.",
          durationMs: 4000,
        },
        {
          target: "business-format-select",
          action: "highlight",
          highlight: true,
          caption:
            "Business format is separate — it controls how every report renders numbers, dates, and currency.",
          narrationText:
            "Business format is separate — it controls how every report renders numbers, dates, and currency.",
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
          caption: "The preview updates immediately — before anyone commits to the change.",
          narrationText: "The preview updates immediately — before anyone commits to the change.",
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
            "French and German are selected here — these are the only languages the email flow will offer later in this study.",
          narrationText:
            "French and German are selected here — these are the only languages the email flow will offer later in this study.",
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
            "Personal settings override the business default — but only for this one account.",
          narrationText:
            "Personal settings override the business default — but only for this one account.",
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
            "Their personal format follows the same override — German date, number, and currency conventions.",
          narrationText:
            "Their personal format follows the same override — German date, number, and currency conventions.",
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
      kind: "walkthrough",
      id: "email-segment",
      title: "Email translation",
      screen: "email-editor",
      steps: [
        {
          target: "subject-field",
          action: "highlight",
          highlight: true,
          caption:
            "This subject line leans on an English idiom — exactly the kind of phrase that doesn't survive translation intact.",
          narrationText:
            "This subject line leans on an English idiom — exactly the kind of phrase that doesn't survive translation intact.",
          durationMs: 4000,
        },
        {
          target: "translate-button",
          action: "highlight",
          highlight: true,
          caption: "Translate starts the audience-aware translation flow.",
          narrationText: "Translate starts the audience-aware translation flow.",
          durationMs: 3000,
        },
        {
          target: "translate-button",
          action: "transition",
          highlight: false,
          caption:
            "The flow opens showing who actually reads in which language — not a guess, the real breakdown.",
          narrationText:
            "The flow opens showing who actually reads in which language — not a guess, the real breakdown.",
          durationMs: 3000,
        },
        {
          target: "audience-breakdown",
          action: "highlight",
          highlight: true,
          caption: "Roughly a fifth of this audience prefers French; almost as many prefer German.",
          narrationText:
            "Roughly a fifth of this audience prefers French; almost as many prefer German.",
          durationMs: 4000,
        },
        {
          target: "language-checklist",
          action: "select",
          value: "French,German",
          highlight: true,
          caption:
            "Only French and German are offered here — exactly the two languages Organization settings allowed earlier.",
          narrationText:
            "Only French and German are offered here — exactly the two languages Organization settings allowed earlier.",
          durationMs: 4500,
        },
        {
          target: "translation-row",
          action: "input",
          value: "Knock your socks off ☕|Schlag deine Socken ab",
          highlight: true,
          caption:
            'Machine translation takes the idiom literally — "knock your socks off" becomes a phrase about physically striking socks.',
          narrationText:
            'Machine translation takes the idiom literally — "knock your socks off" becomes a phrase about physically striking socks.',
          durationMs: 5000,
        },
        {
          target: "translation-row",
          action: "input",
          value: "Knock your socks off ☕|Du wirst aus den Socken sein",
          highlight: true,
          caption:
            "The marketer catches it and fixes the line by hand before it ships — this is exactly the moment automated translation alone can't cover.",
          narrationText:
            "The marketer catches it and fixes the line by hand before it ships — this is exactly the moment automated translation alone can't cover.",
          durationMs: 5000,
        },
        {
          target: "subject-field",
          action: "input",
          value: "Knock your socks off ☕ — plus free shipping",
          highlight: true,
          caption: "Later, someone edits the English source line to add a shipping callout.",
          narrationText: "Later, someone edits the English source line to add a shipping callout.",
          durationMs: 4000,
        },
        {
          target: "translation-row",
          action: "highlight",
          highlight: true,
          caption:
            "The existing translation no longer matches the source — it's flagged stale automatically, not silently left wrong.",
          narrationText:
            "The existing translation no longer matches the source — it's flagged stale automatically, not silently left wrong.",
          durationMs: 4500,
        },
        {
          target: "retranslate-button",
          action: "click",
          highlight: true,
          caption: "Retranslate clears the stale flag and regenerates the affected content.",
          narrationText: "Retranslate clears the stale flag and regenerates the affected content.",
          durationMs: 3500,
        },
        {
          target: "retranslate-button",
          action: "transition",
          highlight: false,
          caption: "Translations are back in sync with the current source line.",
          narrationText: "Translations are back in sync with the current source line.",
          durationMs: 3000,
        },
      ],
    },
    {
      kind: "prose",
      id: "impact",
      heading: "Impact",
      body: [
        // NOTE (T025, pending Jason): the candidate figure discussed at spec
        // time — an international revenue share moving 31% -> 41.5% — is
        // NOT currently verifiable against any live published article
        // (checked 2026-08-30: it does not appear on mrjasongrant.substack.com's
        // 12 published posts, nor in the public work.ts Klaviyo entry). Per
        // FR-023, an unverified figure is dropped rather than approximated.
        // This section is qualitative-only until Jason confirms a source or
        // approves a different quantified figure — flagged in the
        // implementation report rather than guessed.
        "The kickoff audit turned a vague company expectation into a concrete, shared punch list — the guidelines above were adopted across the design team, not just documented. The organization/personal/localization settings model and the translation flow shipped as the structural foundation the rest of internationalization work built on.",
        "The team itself was new: Design Systems, Content Design, and Internationalization were all built from zero during this window, alongside the Ascent design system the guidelines above live in.",
      ],
    },
  ],
};
