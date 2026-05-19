import type { NowLine } from "@/types/content";

export const updated: { month: string; year: string } = {
  month: "May",
  year: "2026",
};

export const nowLines: NowLine[] = [
  ["leading design @ ", { kind: "link", label: "Hi Marley", href: "#hi-marley" }],
  [
    "building ",
    { kind: "link", label: "Wren", href: "https://wrenpod.com", external: true },
    " and ",
    { kind: "link", label: "Olllo", href: "https://hypoth.ai/olllo", external: true },
    " @ Hypoth",
  ],
  [
    "writing ",
    {
      kind: "link",
      label: "Designing Forward",
      href: "https://mrjasongrant.substack.com",
      external: true,
    },
    " on Substack",
  ],
];
