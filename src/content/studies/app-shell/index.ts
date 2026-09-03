import type { CaseStudy } from "../types";

// Sourcing (research D1/D9/D10): the numbers, tiers, and success bar are Jason's
// own owner-cleared Hi Marley figures, verified against his internal decks
// (Application Shell Async Inform.pptx; nav-release-preview-v8.html) and the
// product screenshots — all retained in his private storage and referenced by
// location from specs/007-app-shell-case-study/research.md, never committed to
// this public repository. All product UI on the page is recreated with
// fictional, sanitized data (Northwind Mutual, Ironline Auto Auctions, invented
// people); no real screenshot, partner name, staff name, URL, or version ships.
// Hi Marley's own branding is permitted here under the unlisted-case-studies
// exception. The change-aversion citations are public.
export const appShellStudy: CaseStudy = {
  slug: "app-shell",
  title: "App Shell Evolution at Hi Marley",
  description:
    "How an accordion-bound insurance platform earned a new application shell, a collapsible nav rail and a rebuilt details bar, without breaking muscle memory for enterprise users.",
  listed: false,
  company: "Hi Marley",
  role: "Product Architecture, Front-End Systems, Design Lead",
  timelineLabel: "Q3 2026",
  milestones: [
    {
      quarter: "Q4",
      year: 2025,
      showYear: true,
      label: "Settings framework and component library standardization",
    },
    { quarter: "Q1", year: 2026, showYear: true, label: "List pages" },
    { quarter: "Q2", year: 2026, showYear: false, label: "Thread design" },
    { quarter: "Q3", year: 2026, showYear: false, label: "Application shell" },
  ],
  blocks: [
    // ── Beat 1: Context ────────────────────────────────────────────────────
    {
      kind: "prose",
      id: "overview",
      heading: "Overview",
      body: [
        "I led the app-shell redesign at Hi Marley, not as a design craft approach alone but using a critical limitation on scalability and product expansion to drive the purpose for the change.",
      ],
    },
    {
      kind: "figure",
      id: "context-strip",
      figure: "context-strip",
      staticDescription:
        "A four-step sequence from Q4 2025 to Q3 2026: settings and component-library standardization (four libraries consolidated to one), then list pages, then thread design, then the application shell, deliberately ordered from the least-accessed areas of the app toward the most critical, so the approach was proven where the risk was lowest before it reached the core.",
    },
    // ── Beat 1b: The baseline ──────────────────────────────────────────────
    {
      kind: "prose",
      id: "state-early-2025",
      heading: "The state of Hi Marley in early 2025",
      navLabel: "Early 2025",
      body: [
        "In early 2025 the product was a claims-messaging platform for adjusters to use SMS to converse with policyholders to deflect calls and increase policyholder experience by getting more timely responses.",
      ],
    },
    {
      kind: "figure",
      id: "shell-before",
      figure: "shell-before",
      caption: "Shell in early 2025, real screens from an internal demo account.",
      staticDescription:
        "Five real screens of the Hi Marley application shell as it stood in early 2025, stepped through with Back/Next controls: the inbox and the Details tab; the Details tab in edit mode; the Manage tab, showing participants and case visibility; the Media section, showing a single voicemail with an AI transcription; and the Create Case modal, opening as a dialog over the whole shell. Across all five, the right panel offers only two tabs, Details and Manage, with every other kind of information competing for the same space.",
    },
    // ── Beat 2: The problem ────────────────────────────────────────────────
    {
      kind: "prose",
      id: "problem",
      heading: "The problem: the accordion limitation",
      body: [
        [
          "The Inbox right panel was using an accordion. Every new capability the platform wanted ",
          { em: "(AI assistants, partner integrations, workflows, enterprise features)" },
          " would require another accordion section, and each addition took vertical space from data. On smaller screens the headers could fill the panel and leave nothing for the data itself, with no fallback.",
        ],
        "The accordion was the primary need, but the shell had accumulated debt too. Reserved space at the top and left of every page was largely unused.",
      ],
      subheading: { text: "Secondary problem", afterParagraph: 0 },
      midFigure: {
        figure: "nav-footprint-before",
        staticDescription:
          "A schematic page rectangle with the top bar and left rail shaded, showing that navigation consumed about 10% of the page, measured at 1800×1169.",
      },
      list: [
        "About 10% of the page given to navigation at 1800×1169, and worse on smaller screens.",
        "Many roles saw only a handful of left-nav options, which leaves a lot of unused space.",
        "Global calls-to-action (CTA) were adjacent to case-specific ones.",
        "Logo looked clickable but did nothing.",
        "Icons had drifted out of sync across the app.",
        "Labels wouldn't survive translation as the product moved toward Canada.",
      ],
      sideFigure: {
        figure: "accordion-example",
        staticDescription:
          "A labeled illustration of the right panel before: Details and Manage as the shell's two tabs, real section rows (FNOL, Media, Notes) stacked beneath them, and a shaded sliver showing the space actually available once one category is opened: 62%, for 5 categories. A segmented control (JavaScript required) lets a visitor grow the category count to 7, 8, or 9, and the available share drops with each: 40%, 30%, 19%.",
      },
    },
    // ── Beat 2b: Options explored ────────────────────────────────────────────
    {
      kind: "prose",
      id: "options-explored",
      heading: "Options explored",
      navLabel: "Options explored",
      body: [],
    },
    {
      kind: "figure",
      id: "options-explored-figure",
      figure: "options-explored",
      staticDescription:
        "Three explored options, each with a description, a pros list, a cons list, a checklist against five success criteria, and a schematic diagram. Scrolling accordion: pros are familiar, minimal engineering change, every category visible; cons are expand/collapse shifts content, actions mixed with content; meets only 'every category visible.' Vertical navigation buttons: pros are full panel height, no layout shift, clear labels; cons are text labels compete with content as categories grow, no separate place for actions; meets 'no layout shift,' 'every category visible,' and 'full panel height.' Dropdown at the title: pros are minimal chrome, scales to any count, one control to learn; cons are hides the full category list, badges not visible until opened; meets 'no layout shift,' 'actions separate,' 'scales past 20 categories,' and 'full panel height.' None of the three met every criterion.",
    },
    // ── Beat 2c: Design handoff ──────────────────────────────────────────────
    {
      kind: "prose",
      id: "design-handoff",
      heading: "Design handoff",
      navLabel: "Design handoff",
      body: [
        "This was a full design handoff: separate engineering teams built most of the shell against a written spec. What follows is that spec: structure, states, and the exact tokens engineering built against. Since accessibility is a deficiency for the app, additional descriptions were provided to help guide the coding to ensure it will be WCAG compliant.",
      ],
    },
    {
      kind: "figure",
      id: "design-handoff-figure",
      figure: "design-handoff",
      staticDescription:
        "Seven real exports from the shell's design-system spec, stepped through with Back/Next controls. Details pane structure: the pane's ARIA landmark structure, labeled region, live-region title, vertical tablist wired to hidden/visible panels. Details pane elements: every measurement in the pane's header and tab list tied to a design token, plus base/hover/active states for a tab list item. Navigation before and after: the old left-nav column beside the new collapsible sidebar, with matching numbered callouts down to the profile menu and Resource Center overlay. Navigation containers: the sidebar's collapsed and expanded widths, its three vertical zones (top, center, bottom) and the container class name each maps to. Top zone: the logo, create button, navigation item, and navigation group, each across collapsed, expanded, hover, and active states, with markup and ARIA notes. Center zone: the six states of the collapse/expand trigger, plus the button markup behind it. Bottom zone: the sound toggle, help trigger, and user-profile trigger, each across collapsed and expanded states with hover, plus the secondary-navigation markup.",
    },
    // ── Beat 3: The solution ───────────────────────────────────────────────
    {
      kind: "prose",
      id: "solution",
      heading: "The solution",
      body: [],
    },
    {
      kind: "figure",
      id: "shell-after",
      figure: "shell-after",
      caption: "The shipped shell, real screen from an internal demo account.",
      staticDescription:
        "A real screen of the new Hi Marley shell: the left application-navigation rail collapsed to icons, an inbox and case thread in the center, and on the right a vertical icon strip of sections beside a single full-height Details panel (Customer Information, Case Details, and Incident Details) with room to breathe and a common action area at the bottom.",
    },
    // ── Beat 4: Managing the risk ──────────────────────────────────────────
    {
      kind: "prose",
      id: "risk",
      heading: "Managing the risk",
      body: [
        "The hard part of a shell change isn't the design; it's shipping it to enterprise users who have memorized where everything is. So change was ranked by positional-memory disruption: the cognitive cost of moving something a user's hand already knows.",
        "The highest-risk moves, relocating Create Case and the case actions, are only used by a small fraction of customers. Most customers create cases in their claims system of record.",
        "To keep an eye on the highest-risk moves specifically, Pendo and Datadog reporting was set up ahead of the release, comparing pre-change analytics against post-change expectations so a regression would surface immediately rather than after enough carriers had complained.",
      ],
    },
    {
      kind: "figure",
      id: "risk-tiers",
      figure: "risk-tiers",
      staticDescription:
        "Three risk tiers, ranked by positional-memory disruption. High: relocations users have muscle memory for (Create Case and case actions), handled deliberately and absorbed by an internal-only release. Medium: consolidations that combine areas without moving their triggers. Low: component swaps that keep the same location and flow.",
    },
    // ── Beat 6: Outcome ────────────────────────────────────────────────────
    {
      kind: "prose",
      id: "outcome",
      heading: "Outcome",
      body: [
        "The shell was never the goal on its own; it was the thing standing between the platform and the expansion: AI agents, workflows, network partners. None of those fit inside an accordion.",
        "The bar for the rollout was deliberately defensive: no decrease in task speed or task success for existing users through the transition.",
      ],
    },
  ],
};
