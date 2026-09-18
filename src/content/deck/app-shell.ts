import type { DeckSection } from "./types";

// Leadership cut of the App Shell Evolution at Hi Marley case study
// (src/content/studies/app-shell). Numbers and sources match the study
// exactly (contracts/deck-content.md); copy here is deck-authored.
//
// Slide order (reordered 2026-09-13 per Jason's review): ground the audience
// in the concrete "before" state and the sequencing strategy first, then
// land the problem thesis immediately before the live demo that proves it.
export const appShellSection: DeckSection = {
  slug: "app-shell",
  title: "App Shell Evolution at Hi Marley",
  slides: [
    {
      template: "transition",
      slug: "overview",
      title: "App Shell Evolution at Hi Marley",
      kicker: "Hi Marley",
      headline: "App Shell Evolution",
      sub: "A shell that had run out of room for what the platform needed to become.",
      bullets: [
        "Claims messaging for insurance carriers: adjusters text policyholders instead of calling",
        "~6.4M claims a year, about 13% of US and Canada P&C, with major national carriers as customers",
      ],
      staticDescription:
        "Section divider introducing the second case study, App Shell Evolution at Hi Marley. Context: Hi Marley is a claims-messaging platform for insurance carriers, where adjusters text policyholders instead of calling them. It delivers communication for about 6.4 million claims a year, roughly 13% of US and Canada property and casualty, with major national carriers as customers.",
    },
    {
      template: "content",
      slug: "understanding-the-user",
      title: "Understanding the user",
      kicker: "App Shell › Understanding the user",
      headline: "Two gaps, closed before the redesign began.",
      layout: "text-figure",
      body: [
        [
          "In early 2025, two gaps stood between the team and its carriers: conversations weren't captured beyond support tickets, and usage data was fragmented across Pendo and Fullstory.",
        ],
      ],
      bullets: [
        "Introduced Dovetail to retain the full record of carrier feedback, not just what became a ticket",
        "Built a code-tagging approach that keeps usage data tied to features, durable through redesigns",
      ],
      figure: {
        kind: "image",
        image: {
          src: "/work/app-shell/dovetail-supervisor-interview.jpeg",
          alt: "A Dovetail interview session: a video call between two participants alongside a timestamped transcript, with sentiment and topic tags like Pain/Friction, Operations, and Workaround/Manual Process highlighting specific excerpts.",
          width: 2444,
          height: 1954,
          stageFraction: 0.55,
          rounded: true,
        },
      },
      staticDescription:
        "Understanding the user: in early 2025, two gaps stood between the team and its carriers. Conversations weren't captured beyond support tickets, and usage data was fragmented across Pendo and Fullstory. Dovetail was introduced to retain the full record of carrier feedback, not just what became a ticket. A code-tagging approach kept usage data tied to features, durable through redesigns. Beside the text, a Dovetail interview session shows a video call transcript tagged and highlighted by sentiment and topic: pain and friction, operations, and workaround or manual process.",
    },
    {
      template: "content",
      slug: "listening-to-customers",
      title: "Listening to customers",
      kicker: "App Shell › Listening to customers",
      headline: "Two annual traditions keep the loop open.",
      layout: "text-figure",
      body: [
        ["Beyond formal research, two recurring events keep customer input flowing year-round."],
      ],
      bullets: [
        "Customer Forum, now four years running, brings carrier stakeholders together to see what's next and say what's still hard",
        "Adjuster Day, in its second year, brings the adjusters themselves in, the people working every claim",
      ],
      figure: {
        kind: "image",
        image: {
          src: "/deck/app-shell/customer-forum.jpeg",
          alt: "A Hi Marley Customer Forum session: carrier attendees seated at round tables in a conference room, watching a presenter walk through a product screen on a large display.",
          width: 1024,
          height: 768,
          stageFraction: 0.55,
          rounded: true,
        },
      },
      staticDescription:
        "Listening to customers: beyond formal research, two recurring events keep customer input flowing year-round. Customer Forum, now four years running, brings carrier stakeholders together to see what's next and say what's still hard. Adjuster Day, in its second year, brings the adjusters themselves in, the people working every claim. Beside the text, a photo from a Customer Forum session: carrier attendees seated at round tables, watching a presenter walk through a product screen on a large display.",
    },
    {
      template: "content",
      slug: "baseline",
      title: "The vision",
      kicker: "App Shell › The vision",
      headline: "Customer Forum Demo",
      layout: "figure",
      figure: {
        kind: "image",
        image: {
          src: "/work/app-shell/vision-customer-forum-demo.png",
          alt: "A customer forum demo: the inbox thread showing an interactive appointment-reminder card and RCS messaging, alongside a phone mockup of an AI assistant conducting a post-repair satisfaction survey.",
          width: 3600,
          height: 2088,
          stageFraction: 0.85,
        },
      },
      staticDescription:
        "The vision: a customer forum demo showing the inbox thread with an interactive appointment-reminder card and RCS messaging, alongside a phone mockup of an AI assistant, Al Juster, conducting a post-repair satisfaction survey and collecting a written response.",
    },
    {
      template: "content",
      slug: "sequencing-as-risk-strategy",
      title: "Sequencing as risk strategy",
      kicker: "App Shell › Sequencing as risk strategy",
      headline: "Least-accessed surfaces first, most-critical last.",
      layout: "figure",
      figure: { kind: "embed", embed: "shell-sequencing" },
      body: [
        [
          "Deliberately sequenced from the least-accessed surfaces to the most critical, proving the approach and process where user impact was minimal.",
        ],
      ],
      staticDescription:
        "Sequencing as risk strategy: four steps, deliberately ordered from the least-accessed surfaces to the most critical, proving the approach and process where user impact was minimal. Settings and component library (Q4 2025): four component libraries consolidated to one; player, design and engineering. List pages (Q1 2026): the system applied to high-traffic lists; player-coach, design and engineering. Thread design (Q2 2026): the conversation surface reworked; leadership and oversight, design. Application shell (Q3 2026): the culmination, the shell itself; player, design.",
    },
    {
      template: "content",
      slug: "settings-before-after",
      title: "Settings before/after",
      kicker: "App Shell › Settings & Component Library",
      headline: "Building scalability and expansion while addressing debt.",
      layout: "figure",
      figure: { kind: "embed", embed: "settings-before-after" },
      staticDescription:
        "Before and after, side by side. Before: a long, single-page Organization Settings form, scrolling through unrelated settings like Inactivity Auto Reply, System Message Prefix, and User Message Prefix with no grouping. After: the same settings reorganized into a grid of specific cards, including Case types, Active hours, Quiet Hours, Message prefixes, Inactive message reply, and Out of Office Messages.",
    },
    {
      template: "content",
      slug: "outreach-before-after",
      title: "Outreach before/after",
      kicker: "App Shell › List Pages",
      headline: "Enhance experience with sorting and filtering.",
      layout: "figure",
      figure: { kind: "embed", embed: "outreach-before-after" },
      staticDescription:
        "Before and after, side by side. Before: a flat Notifications table listing individual outbound messages with no grouping or campaign context. After: a Bulk messaging table tracking 18 campaigns at once, each with categorized send status, applying the same list-page system proven on high-traffic surfaces.",
    },
    {
      template: "content",
      slug: "inbox-before-after",
      title: "Inbox before/after",
      kicker: "App Shell › Thread Design",
      headline: "Expanding the thread.",
      layout: "figure",
      figure: { kind: "embed", embed: "inbox-before-after" },
      staticDescription:
        "Before and after, side by side. Before: the original Hi Marley inbox, a case's Details panel limited to a simple set of fields. After: a richer case thread with an AI summary, internal partner alerts from AGERO and Copart, and Case Progress, Partner Data, and Workflows sections, giving adjusters the fuller context needed on the conversation surface.",
    },
    {
      template: "content",
      slug: "frame",
      title: "Frame",
      kicker: "App Shell › Frame",
      headline: "The accordion was physically blocking the platform's expansion.",
      layout: "text-figure",
      figure: { kind: "embed", embed: "accordion-example" },
      body: [
        [
          "The platform was expanding into AI agents, workflows, network partners, and FNOL intake. Every new capability meant another accordion section, taking space from data. This was a business problem, not an aesthetic one.",
        ],
        [{ em: "Space utilization extended to global navigation too." }],
      ],
      bullets: [
        "About 10% of the page given to navigation at 1800×1169",
        "Most users had only 2–3 navigation options, leaving unused space",
        "The logo looked clickable but did nothing",
        "Labels wouldn't survive translation as the product moved toward Canada",
      ],
      staticDescription:
        "Frame: the platform was expanding into AI agents, workflows, network partners, and FNOL intake, and the accordion navigation pattern was physically blocking that growth. Each new capability took space from data; this was a business problem, not an aesthetic one. A live illustration shows growing the number of data categories from 5 to 7 to 8 to 9 shrinking the space available for details from 62% to 40% to 30% to 19%. Four secondary problems are listed: navigation consuming about 10% of the page at 1800 by 1169, most users having only 2 to 3 navigation options, a non-clickable logo, and labels that would not survive translation.",
    },
    {
      template: "content",
      slug: "explorations",
      title: "Explorations",
      kicker: "App Shell › Explorations",
      headline: "Three directions, weighed as trade-offs.",
      layout: "figure",
      figure: { kind: "embed", embed: "options-explored" },
      staticDescription:
        "Three explored options, each scored against five success criteria. Scrolling accordion keeps the mental model but doesn't solve density. Every expand or collapse shifts content below it. A title dropdown adds a click, hides state, and can't badge. Vertical navigation buttons met the most criteria: no layout shift, every category visible, full panel height, and were the option chosen.",
    },
    {
      template: "content",
      slug: "enablement-decision",
      title: "The enablement decision",
      kicker: "App Shell › The enablement decision",
      headline: "Enabling the squads to build it themselves.",
      layout: "figure",
      figure: { kind: "embed", embed: "design-handoff" },
      staticDescription:
        "The enablement decision: a full design handoff. Separate engineering teams built most of the shell against a written spec, stepped through here across seven exports covering the details pane's landmark structure and ARIA, every element's token-driven redlines and states, the navigation before-and-after with matching callouts, the sidebar's containers and zones, and the top, center, and bottom zone specifications with markup and ARIA notes. On the settings work the presenter wrote production code directly; here the job was exhaustive specs, focus states, token usage, and accessibility documentation that made the squads' own implementation inevitable.",
    },
    {
      template: "content",
      slug: "risk-management",
      title: "Risk management",
      kicker: "App Shell › Risk management",
      headline: "Identifying and mitigating risks.",
      layout: "text-figure",
      body: [
        [
          "The hard part of a shell change isn't the design, it's shipping it to enterprise users who've memorized where everything is. The highest-risk move, relocating Create Case, affects only a small fraction of customers.",
        ],
      ],
      bullets: [
        "Dovetail surfaced gaps ahead of the rollout; the change went to a couple of customers first, including one known to push back",
        "Pendo tracked usage before and after; all but navigation is live for every customer, with nothing critical raised",
      ],
      figure: { kind: "embed", embed: "pendo-usage-stack" },
      bottomFigure: { kind: "embed", embed: "risk-tiers" },
      staticDescription:
        "Risk management: the hard part of a shell change isn't the design, it's shipping it to enterprise users who've memorized where everything is. The highest-risk move, relocating Create Case, affects only a small fraction of customers, smaller carriers, since the rest create cases via claims-system integrations. Ahead of this rollout, Dovetail surfaced gaps, and the change went to a couple of customers first, including one known to push back. Pendo tracked usage before and after; all but navigation is live for every customer, with nothing critical raised. Beside the text, two Pendo dashboards show 90-day visitor and adoption trends for the inbox and for case creation, both up over the previous period. Below both, changes ranked into three risk tiers: high risk (relocations with muscle memory, like moving Create Case, handled deliberately and absorbed by an internal-only release first), medium risk (consolidations, several areas combined into one without changing where their triggers live), and low risk (component swaps, like replacing overlays with templates and moving legacy components to the design system, in the same location and flow).",
    },
    {
      template: "content",
      slug: "outcome",
      title: "Outcome",
      kicker: "App Shell › Outcome",
      headline: "Final implementation",
      layout: "figure",
      figure: { kind: "embed", embed: "shell-after" },
      staticDescription:
        "Outcome: the success bar was deliberately defensive: no decrease in task speed or task success through the transition, measured with pre and post dashboards watching recovery on the instrumented metrics, and the bar was met. Shells under live enterprise users don't earn improvement claims; they earn invisible transitions. The improvement shows up in what the platform can now absorb: the redesigned shell shows a collapsed icon rail, the inbox and case thread in the center, and a full-height Details panel on the right with room for Customer Information, Case Details, and Incident Details.",
    },
  ],
};
