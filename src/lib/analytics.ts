"use client";

import { track } from "@vercel/analytics";

type LinkKind = "external" | "internal" | "mailto" | "anchor" | "pdf" | "tel";

export function classifyLink(href: string): LinkKind {
  if (href.startsWith("mailto:")) return "mailto";
  if (href.startsWith("tel:")) return "tel";
  if (href.startsWith("#")) return "anchor";
  if (href.endsWith(".pdf")) return "pdf";
  if (href.startsWith("http://") || href.startsWith("https://")) return "external";
  return "internal";
}

/** Truncate user-supplied text so we never push huge strings into analytics. */
function clip(s: string, max = 60): string {
  const t = s.replace(/\s+/g, " ").trim();
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

export function trackLinkClick(href: string, text: string): void {
  try {
    track("link_click", {
      href: clip(href, 200),
      text: clip(text, 60),
      kind: classifyLink(href),
    });
  } catch {
    // Analytics never breaks the page.
  }
}

export function trackPaletteAction(group: string, label: string): void {
  try {
    track("palette_action", { group: clip(group, 30), label: clip(label, 60) });
  } catch {
    // noop
  }
}

