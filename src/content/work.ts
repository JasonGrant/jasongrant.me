import { site } from "@/content/site";
import type { WorkEntry } from "@/types/content";

export const workEntries: WorkEntry[] = [
  {
    id: "hi-marley",
    org: "Hi Marley",
    orgHref: site.org.himarley.url,
    external: true,
    mark: { kind: "logo", key: "marley" },
    role: "Director of Product Design",
    dates: "2025 — present",
    homeDescription:
      "Consolidated four component libraries into one design system. Designed the AI Writing Assistant end-to-end, including prompt engineering. Built a live React/Next.js prototype system on Vercel that runs alongside production and Figma. Three fidelity tiers, chosen by intent rather than default.",
    experienceBullets: [
      "Established a three-tier design fidelity model (production code, Figma overlays, and an interactive Vercel prototype site) chosen by intent rather than default. Replaced single-fidelity handoffs with a system where each tier earns its use.",
      "Consolidated four legacy component libraries into one production design system used by every product surface.",
      "Designed the AI Writing Assistant end-to-end — interaction, surface, and prompt engineering — for 26,000+ enterprise users including USAA and Allstate.",
      "Embedded design in engineering workflow by shipping production code alongside the team, not handoffs.",
    ],
    links: [{ label: "Case study", href: "#fidelity", pending: true }],
  },
  {
    id: "hypoth",
    org: "Hypoth",
    orgHref: "https://hypoth.ai/",
    external: true,
    mark: { kind: "monogram", letter: "H", style: "solid" },
    role: "Founder",
    dates: "2025 — present",
    homeDescription:
      "A studio for AI products. We start each one with a question we can't stop thinking about, then build an experiment to test it.",
    experienceBullets: [
      "Founded a studio framed as a sequence of hypothesis-led experiments — write the question first, ship narrow, publish a continuation note or post-mortem either way.",
      "Currently running two experiments in beta (Wren) and ideation (Olllo); deferred a third (AI conversational interface, H-04) until v1 of the studio's public properties is locked.",
    ],
    experiments: [
      {
        index: "H-02",
        name: "Wren",
        href: "https://wrenpod.com",
        stage: "in beta",
        description:
          "Articles you save become a short, private podcast you can listen to anywhere.",
        mark: { kind: "monogram", letter: "W", style: "outline" },
        links: [{ label: "Case study", href: "#wren-case" }],
      },
      {
        index: "H-01",
        name: "Olllo",
        href: "https://olllo.app",
        stage: "",
        description: "A career growth tracker for the people doing the work.",
        mark: { kind: "monogram", letter: "O", style: "outline" },
      },
    ],
  },
  {
    id: "klaviyo",
    org: "Klaviyo",
    orgHref: site.org.klaviyo.url,
    external: true,
    role: "Director of Product Design · fractional interim VP",
    dates: "2023 — 2025",
    homeDescription:
      "Ran 160+ design reviews across an 80-person org. Shipped a free-to-paid conversion test that lifted 28-day conversion +0.7% absolute and went GA. Built three teams from zero (Design Systems, Content Design, Internationalization), including the Ascent Design System.",
    experienceBullets: [
      "Ran 160+ design reviews across an 80-person design org as fractional interim VP of Design.",
      "Shipped a free-to-paid conversion experiment that lifted 28-day conversion +0.7% absolute and went GA.",
      "Built three new teams from zero — Design Systems (Ascent), Content Design, and Internationalization — and hired the leaders for each.",
    ],
  },
  {
    id: "vertex",
    org: "Vertex Pharmaceuticals",
    orgHref: site.org.vertex.url,
    external: true,
    role: "Head of Design",
    dates: "2017 — 2021",
    homeDescription:
      "Built and led the Experience Design team from zero. Created the design system. Interfaced with C-level on platform consolidation across biology, chemistry, clinical, and exec knowledge management.",
    experienceBullets: [
      "Built and led the Experience Design team from zero inside a Fortune 500 biotech.",
      "Created the company's first design system, consolidating tooling across biology, chemistry, clinical, and exec knowledge management.",
      "Reported to and partnered with C-level on platform consolidation strategy.",
    ],
  },
];
