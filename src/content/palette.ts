import type { CommandPaletteItem } from "@/types/content";
import { site } from "./site";

// "Ask Jason" opens the chat widget. The literal comparison lets a production build
// drop the item with the rest of the widget when the flag is "off"; in "private"
// mode CommandPalette hides it until the browser holds Jason's preview key.
const askItem: CommandPaletteItem[] =
  process.env.NEXT_PUBLIC_ASK_JASON === "on" || process.env.NEXT_PUBLIC_ASK_JASON === "private"
    ? [{ group: "Meta", label: "Ask Jason", hint: "chat", action: { kind: "open-ask-jason" } }]
    : [];

export const paletteItems: CommandPaletteItem[] = [
  // Navigate — page-level only. In-page anchor jumps were removed because
  // labels like "Selected work" / "Experience" and "Writing" / "Writing (page)"
  // are too easy to confuse and miss-click.
  { group: "Navigate", label: "Home", hint: "page", action: { kind: "navigate", href: "/" } },
  {
    group: "Navigate",
    label: "Experience",
    hint: "page",
    action: { kind: "navigate", href: "/experience" },
  },
  {
    group: "Navigate",
    label: "Writing",
    hint: "page",
    action: { kind: "navigate", href: "/writing" },
  },
  {
    group: "Navigate",
    label: "Colophon",
    hint: "page",
    action: { kind: "navigate", href: "/colophon" },
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
  {
    group: "External",
    label: "Olllo",
    hint: "↗",
    action: { kind: "open-external", href: "https://www.hypoth.ai/olllo" },
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
  ...askItem,
  { group: "Meta", label: "View source", hint: "this page", action: { kind: "view-source" } },
  {
    group: "Meta",
    label: "GitHub repo",
    hint: "↗",
    action: { kind: "open-external", href: site.github },
  },
];
