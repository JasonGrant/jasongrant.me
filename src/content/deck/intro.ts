import type { DeckSection } from "./types";

// Intro (5 minutes): cover, a career strip, and a "how I work" slide. Two
// content slides by design; resist a third.
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
      slug: "career-strip",
      title: "Career strip",
      kicker: "Intro › The thread",
      headline: "Complexity industries: regulated, enterprise, horizontal problems.",
      layout: "figure",
      figure: { kind: "embed", embed: "career-strip" },
      staticDescription:
        "A horizontal career strip: Dassault Systèmes (manufacturing), where the presenter was PM and design lead for a new industry push into architecture, engineering, and construction: 12 apps, one launched, one in beta, one in development; Vertex Pharmaceuticals (pharma), where the presenter built the Experience Design team from zero to turn 300+ internal apps into platforms across biology, chemistry, clinical trials, and the C-suite; Klaviyo (martech), where the presenter helped build the design org across Design Systems, Content Design, Internationalization, and Growth; and Hi Marley, the current role, leading design and product operations for an insurtech communications platform. Hypoth runs alongside as an independent studio. Beneath it, the leadership shape in numbers: fifteen years in design, twelve years managing, teams built from zero at three companies, up to fifteen direct reports including managers, and an organization of eighty held through a transition.",
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
                "Low-fidelity vision and workflow exploration",
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
        "Fidelity by intent, in three columns sharing one example: the settings framework, which traversed all three. Figma is for low-fidelity vision and workflow exploration, and wins when the decision is directional, speed of divergence matters, or many dramatically different options need comparing; its artifact is a real vision frame from the settings exploration; low effort, low value. A live prototype is a repo that mimics production on the same design system with feature-flag triggers for error and edge states, and wins when the decision needs real behavior, real data shapes, and end-to-end flow, or when iterating on one option in depth; about 60 percent of design work happens here, and engineers can point AI tooling at a prototype to recreate the page in production; its artifact is a prototype screen with a visible flag toggle; medium effort, medium value. Production code is design debt and small refinements shipped directly with tickets, tests, and PM communication like any change, and wins when the decision is straightforward rather than exploratory and the fix is smaller than the handoff would be; its artifact is a shipped screen or a merged-PR visual; high effort, high value.",
    },
  ],
};
