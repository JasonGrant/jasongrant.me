import type { DeckSection } from "./types";

// Intro (5 minutes): cover, a personal aside on renovating houses, a note on
// what's being built now, a career strip, a skill-mix chart, and a "how I
// work" slide.
export const introSection: DeckSection = {
  slug: "intro",
  title: "Intro",
  slides: [
    {
      template: "transition",
      slug: "cover",
      title: "Cover",
      kicker: "Jason Grant › Portfolio presentation",
      headline: "Design leadership in complex, regulated, mission-critical products.",
      sub: "Two case studies in design leadership:",
      bullets: [
        { label: "Internationalization at Klaviyo", section: "internationalization" },
        { label: "App Shell Evolution at Hi Marley", section: "app-shell" },
      ],
      staticDescription:
        "Cover slide. Jason Grant, portfolio presentation: two case studies in design leadership, Internationalization at Klaviyo and App Shell Evolution at Hi Marley.",
    },
    {
      template: "content",
      slug: "building-homes",
      title: "Building homes",
      kicker: "Intro › Personal interests",
      headline: "120-year-old house renovation.",
      layout: "text-figure",
      body: [
        [
          "Outside of software, I enjoy renovating very old houses, my first and biggest was a 120-year-old home in Natick, MA that hadn't been touched since the 1960s.",
        ],
      ],
      bullets: [
        "Electrical, plumbing, insulation, kitchen, bathrooms, flooring and windows fully modernized",
        "Front porch rebuilt and enclosed to match the home's original style",
        "Original details restored, after being hidden under aluminum siding by a previous owner",
      ],
      after: [
        ["Same instinct as the product work: respect what's already there, then make it better."],
      ],
      figure: { kind: "embed", embed: "building-homes-gallery" },
      staticDescription:
        "Building homes. Outside of software, the presenter enjoys renovating very old houses; the first and biggest was a 120-year-old home in Natick, MA that hadn't been touched since the 1960s. Work included fully modernizing electrical, plumbing, insulation, kitchen, bathrooms, flooring, and windows; rebuilding and enclosing the front porch to match the home's original style; and restoring original details a previous owner had hidden under aluminum siding. Beside the text, two before/after photo pairs, each in its own shared card: on top, the exterior, from a plain grey house with a bare front porch to a closer view of the same house, mustard-yellow siding, white porch columns, black shutters, and the door numbered 115; underneath, the kitchen, from a dim, dated kitchen with olive-green cabinets to an open, bright kitchen with grey cabinets, stainless appliances, and a wood-topped island. Same instinct as the product work: respect what's already there, then make it better.",
    },
    {
      template: "content",
      slug: "building-things-now",
      title: "What I'm building now",
      kicker: "Intro › Currently building",
      headline: "From renovating houses to shipping software, end to end, with AI.",
      layout: "columns",
      columns: [
        {
          title: "olllo",
          image: {
            src: "/deck/building-things-now/olllo-star-story.png",
            alt: "The olllo web app: a Friday reflection thread that turns a described login-bug fix into a structured STAR story with a situation, action, and measured result.",
            width: 3856,
            height: 2088,
            stageFraction: 0.28,
          },
          rows: [
            {
              label: "What it is",
              text: "A weekly reflection app that replaces the yearly performance review.",
            },
            {
              label: "How it works",
              bullets: [
                "Three prompts, five minutes, every Friday",
                "Weeks roll up into quarterly and yearly summaries automatically",
              ],
            },
            { label: "Status", text: "In active use, refining toward a public launch." },
          ],
        },
        {
          title: "wren",
          images: [
            {
              src: "/deck/building-things-now/wren-queue.jpeg",
              alt: "The Wren mobile app's queue screen: the next episode scheduled, a Generate Now button, and this week's saved articles.",
              width: 602,
              height: 1308,
              stageFraction: 0.07,
            },
            {
              src: "/deck/building-things-now/wren-player.jpeg",
              alt: "The Wren app's now-playing screen for an episode titled 'Argentine Soccer Fandom Collides With Dynamic Ticket Pricing.'",
              width: 602,
              height: 1308,
              stageFraction: 0.07,
            },
            {
              src: "/deck/building-things-now/wren-script.jpeg",
              alt: "The Wren app's script screen, showing the full written script behind a generated episode.",
              width: 602,
              height: 1308,
              stageFraction: 0.07,
            },
            {
              src: "/deck/building-things-now/wren-history.jpeg",
              alt: "The Wren app's history screen, listing past weekly episodes by date and topic.",
              width: 602,
              height: 1308,
              stageFraction: 0.07,
            },
          ],
          rows: [
            {
              label: "What it is",
              text: "Turns saved articles and newsletters into a personalized weekly podcast.",
            },
            {
              label: "How it works",
              bullets: [
                "Save via email, the iOS share sheet, or a Chrome extension",
                "Four tonal styles, nine voices, delivered on a weekly cadence",
              ],
            },
            { label: "Status", text: "Private beta." },
          ],
        },
        {
          title: "wayshell",
          image: {
            src: "/deck/building-things-now/wayshell-app.png",
            alt: "The wayshell app: a file tree, a diff view comparing CLAUDE.md before and after, and a Help panel listing shell commands like 'deploy staging' and 'ls' with plain-language descriptions.",
            width: 2355,
            height: 1397,
            stageFraction: 0.28,
          },
          rows: [
            {
              label: "What it is",
              text: "A terminal with the structure of an IDE, built for PMs and designers working directly in a real codebase.",
            },
            {
              label: "How it works",
              bullets: [
                "File tree and diff views alongside a live AI conversation",
                "Everyday shell commands paired with a plain-language description",
              ],
            },
            { label: "Status", text: "In active use on this deck's own codebase." },
          ],
        },
      ],
      staticDescription:
        "What I'm building now. From renovating houses to shipping software, end to end, with AI. Three columns, each with screenshots: olllo, shown as a Friday reflection thread turning a described login-bug fix into a structured STAR story: a weekly reflection app that replaces the yearly performance review, three prompts, five minutes, every Friday, rolling up into automatic quarterly and yearly summaries; in active use, refining toward a public launch. wren, shown as four mobile screens: the queue, the now-playing screen, a generated episode's script, and episode history: it turns saved articles and newsletters into a personalized weekly podcast, saved via email, the iOS share sheet, or a Chrome extension, with four tonal styles and nine voices; currently in private beta. wayshell, shown as a file tree, a diff view, and a Help panel listing shell commands with plain-language descriptions: a terminal with the structure of an IDE, built for PMs and designers working directly in a real codebase, pairing a live AI conversation with everyday shell commands; in active use on this deck's own codebase.",
    },
    {
      template: "content",
      slug: "career-strip",
      title: "Career strip",
      kicker: "Intro › The thread",
      headline: "Complexity industries: regulated, enterprise, horizontal problems.",
      layout: "figure",
      figure: { kind: "embed", embed: "career-strip" },
      staticDescription:
        "A horizontal career strip: Dassault Systèmes (computer-aided design), where the presenter was PM and design lead for a new industry push into architecture, engineering, and construction: 12 apps, one launched, one in beta, one in development; Vertex Pharmaceuticals (pharma), where the presenter built the Experience Design team from zero to turn 300+ internal apps into platforms across biology, chemistry, clinical trials, and the C-suite; Klaviyo (martech), where the presenter helped build the design org across Design Systems, Content Design, Internationalization, and Growth; and Hi Marley, the current role, leading design and product operations for an insurtech communications platform. Beneath it, the leadership shape in numbers: fifteen years in design, twelve years managing, teams built from zero at three companies, up to fifteen direct reports including managers, and owned design PRD representation and design quality for a team of eighty.",
    },
    {
      template: "content",
      slug: "skill-throughline",
      title: "Skill mix by role",
      kicker: "Intro › The mix",
      headline: "The shape of the work, role by role.",
      layout: "figure",
      figure: { kind: "embed", embed: "skill-throughline" },
      staticDescription:
        "A thread chart: one line per skill area (strategy & definition, design, user research, design systems, coding, and operations), each split into a named top half and bottom half that thicken independently with how much weight that half carried at each of the four roles. At Dassault Systèmes, the mix leaned toward strategy and design handoff, working directly with customers, with no design systems, coding, or reports. At Vertex Pharmaceuticals, the mix broadened across qualitative research, design, prototyping and production code, design systems, and light operations, with six direct reports. At Klaviyo, design feedback, documentation, quantitative research, and operations dominated, coding was minimal, and the org grew to fifteen reports. At Hi Marley, production code, design systems, and operations lead, with a lighter research mix and four direct reports.",
    },
    {
      template: "content",
      slug: "how-i-work",
      title: "How I currently work",
      kicker: "Intro › How I currently work",
      headline: "Fidelity by intent.",
      layout: "columns",
      columns: [
        {
          title: "Figma",
          rows: [
            {
              label: "What it's for",
              bullets: [
                "Low-fidelity vision, diagraming, and workflow exploration",
                "Sketching over screenshots to answer an engineer fast",
              ],
            },
            {
              label: "When it wins",
              bullets: [
                "The decision is directional",
                "Speed of divergence matters",
                "Comparing many, dramatically different options",
              ],
            },
            { label: "Artifact", text: "A real vision frame from the settings exploration." },
            { label: "Effort / value", text: "Low effort, low value." },
          ],
        },
        {
          title: "Live prototype",
          rows: [
            {
              label: "What it's for",
              bullets: [
                "A repo that mimics production, on the same design system",
                "Feature-flag triggers for error and edge states",
              ],
            },
            {
              label: "When it wins",
              bullets: [
                "Real behavior",
                "Real data shapes",
                "End-to-end flow",
                "Iterating on one option, in depth",
              ],
            },
            { label: "Artifact", text: "A prototype screen, with a visible flag toggle." },
            { label: "Effort / value", text: "Medium effort, medium value." },
            {
              label: "In practice",
              bullets: [
                "About 60% of design work happens here",
                "Engineers can point AI tooling at a prototype to recreate the page in production",
              ],
            },
          ],
        },
        {
          title: "Production code",
          rows: [
            {
              label: "What it's for",
              bullets: [
                "Design debt and small refinements, shipped directly",
                "Tickets, tests, and PM communication, like any other change",
              ],
            },
            {
              label: "When it wins",
              bullets: [
                "The decision is straightforward, not exploratory",
                "The fix is smaller than the handoff would be",
              ],
            },
            { label: "Artifact", bullets: ["A shipped screen", "A merged-PR visual"] },
            { label: "Effort / value", text: "High effort, high value." },
          ],
        },
      ],
      staticDescription:
        "Fidelity by intent, in three columns sharing one example: the settings framework, which traversed all three. Figma is for low-fidelity vision, diagraming, and workflow exploration, and wins when the decision is directional, speed of divergence matters, or many dramatically different options need comparing; its artifact is a real vision frame from the settings exploration; low effort, low value. A live prototype is a repo that mimics production on the same design system with feature-flag triggers for error and edge states, and wins when the decision needs real behavior, real data shapes, and end-to-end flow, or when iterating on one option in depth; about 60 percent of design work happens here, and engineers can point AI tooling at a prototype to recreate the page in production; its artifact is a prototype screen with a visible flag toggle; medium effort, medium value. Production code is design debt and small refinements shipped directly with tickets, tests, and PM communication like any change, and wins when the decision is straightforward rather than exploratory and the fix is smaller than the handoff would be; its artifact is a shipped screen or a merged-PR visual; high effort, high value.",
    },
  ],
};
