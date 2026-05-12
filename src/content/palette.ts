import type { CommandPaletteItem } from "@/types/content";
import { site } from "./site";

export const paletteItems: CommandPaletteItem[] = [
  // Navigate
  { group: "Navigate", label: "Now", hint: "jump", action: { kind: "scroll-to", targetId: "now" } },
  {
    group: "Navigate",
    label: "Selected work",
    hint: "jump",
    action: { kind: "scroll-to", targetId: "work" },
  },
  {
    group: "Navigate",
    label: "Writing",
    hint: "jump",
    action: { kind: "scroll-to", targetId: "writing" },
  },
  {
    group: "Navigate",
    label: "Experience",
    hint: "page",
    action: { kind: "navigate", href: "/experience" },
  },
  {
    group: "Navigate",
    label: "Writing (page)",
    hint: "page",
    action: { kind: "navigate", href: "/writing" },
  },
  {
    group: "Navigate",
    label: "Colophon",
    hint: "page",
    action: { kind: "navigate", href: "/colophon" },
  },

  // Work
  {
    group: "Work",
    label: "Hi Marley",
    hint: "role",
    action: { kind: "scroll-to", targetId: "hi-marley" },
  },
  {
    group: "Work",
    label: "Hypoth",
    hint: "studio",
    action: { kind: "scroll-to", targetId: "hypoth" },
  },
  {
    group: "Work",
    label: "Klaviyo",
    hint: "role",
    action: { kind: "scroll-to", targetId: "klaviyo" },
  },
  {
    group: "Work",
    label: "Vertex",
    hint: "role",
    action: { kind: "scroll-to", targetId: "vertex" },
  },

  // External
  {
    group: "External",
    label: "GitHub",
    hint: "↗",
    action: { kind: "open-external", href: site.socials.github },
  },
  {
    group: "External",
    label: "LinkedIn",
    hint: "↗",
    action: { kind: "open-external", href: site.socials.linkedin },
  },
  {
    group: "External",
    label: "Substack",
    hint: "↗",
    action: { kind: "open-external", href: site.socials.substack },
  },
  {
    group: "External",
    label: "Hypoth.ai",
    hint: "↗",
    action: { kind: "open-external", href: "https://hypoth.ai/" },
  },
  {
    group: "External",
    label: "Wren",
    hint: "↗",
    action: { kind: "open-external", href: "https://wrenpod.com" },
  },

  // Meta
  {
    group: "Meta",
    label: "Email Jason",
    hint: "copy",
    action: { kind: "copy", value: site.email },
  },
  {
    group: "Meta",
    label: "Download resume",
    hint: "pdf",
    action: { kind: "navigate", href: "/resume.pdf" },
  },
  { group: "Meta", label: "View source", hint: "this page", action: { kind: "view-source" } },
  {
    group: "Meta",
    label: "GitHub repo",
    hint: "↗",
    action: { kind: "open-external", href: site.github },
  },
];
