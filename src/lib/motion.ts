"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

export function useReveal(): void {
  // Re-run on every route change. App Router layouts persist across client-side
  // navigation, so without this dependency the IntersectionObserver would only
  // observe the elements present on initial mount; SectionLabels on subsequent
  // pages would stay hidden behind their reveal transform.
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is intentionally a dependency to re-run the effect on each navigation; it is not read inside the effect body
  useEffect(() => {
    // Opt the document into JS-based reveal hiding. Without this class the
    // [data-reveal] elements are always visible — important for crawlers and
    // no-JS users so content isn't hidden by an animation that never runs.
    document.documentElement.classList.add("js-reveals");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
        el.classList.add("is-in");
      }
      return;
    }
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.01 },
    );
    let i = 0;
    for (const el of els) {
      el.style.setProperty("--reveal-delay", `${(i % 4) * 60}ms`);
      io.observe(el);
      i++;
    }
    return () => io.disconnect();
  }, [pathname]);
}
