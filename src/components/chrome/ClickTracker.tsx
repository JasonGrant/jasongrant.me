"use client";

import { trackLinkClick } from "@/lib/analytics";
import { useEffect } from "react";

/**
 * Global click delegate that fires a Vercel Analytics `link_click` event for
 * every <a> activation site-wide. One listener for the whole document; no
 * per-component instrumentation required. Lives in (main)/layout.tsx so it
 * spans every page that mounts under the shared layout.
 */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href) return;
      // Skip pure anchor jumps within the same page — they're not interesting
      // and Vercel page-views already cover navigation.
      if (href.startsWith("#")) return;
      const text = anchor.textContent ?? "";
      trackLinkClick(href, text);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
