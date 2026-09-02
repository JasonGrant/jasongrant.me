"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./LeftRail.module.css";

type Section = { id: string; label: string };

// Per-route section lists. Routes not in this map render no rail.
// Section ids must match real DOM ids on each page.
const SECTIONS_BY_PATH: Record<string, Section[]> = {
  "/": [
    { id: "now", label: "Now" },
    { id: "work", label: "Selected work" },
    { id: "writing", label: "Writing" },
  ],
  "/experience": [
    { id: "hi-marley", label: "Hi Marley" },
    { id: "hypoth", label: "Hypoth" },
    { id: "klaviyo", label: "Klaviyo" },
    { id: "vertex", label: "Vertex" },
    { id: "resume", label: "Resume" },
  ],
  "/writing": [
    { id: "selected", label: "Selected" },
    { id: "all-posts", label: "All posts" },
    { id: "subscribe", label: "Subscribe" },
  ],
};

// How long after a click we suppress the IntersectionObserver from overriding
// the click-set active section. Matches typical smooth-scroll duration.
const CLICK_LOCK_MS = 800;
// How close to the bottom of the page (in px) counts as "at the bottom" — when
// triggered, we force-active the last section because short bottom blocks like
// "Resume" or "Subscribe" rarely satisfy the IntersectionObserver's rootMargin.
const BOTTOM_THRESHOLD_PX = 80;

// `sections` overrides the pathname map — used by dynamic routes (e.g.
// /work/[slug]) whose section list is derived from content, not a static
// per-path entry.
export function LeftRail({ sections: sectionsProp }: { sections?: Section[] } = {}) {
  const pathname = usePathname();
  const sections = sectionsProp ?? SECTIONS_BY_PATH[pathname] ?? [];
  const firstId = sections[0]?.id ?? "";
  const lastId = sections[sections.length - 1]?.id ?? "";
  const [active, setActive] = useState<string>(firstId);
  const lockUntilRef = useRef(0);

  // Reset active section to the first one when the route changes so the
  // rail doesn't show a stale highlight from the previous page.
  useEffect(() => {
    setActive(firstId);
  }, [firstId]);

  const onLinkClick = useCallback(
    (id: string) => () => {
      setActive(id);
      lockUntilRef.current = Date.now() + CLICK_LOCK_MS;
    },
    [],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is a deliberate trigger so the observer rebinds on client-side route change; the section list is derived from pathname so referencing both is intentional
  useEffect(() => {
    if (sections.length === 0) return;
    const targets = sections
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const isAtBottom = () =>
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - BOTTOM_THRESHOLD_PX;

    const io = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockUntilRef.current) return;
        // If we're scrolled to the bottom of the page, force-highlight the
        // last section regardless of which one the IntersectionObserver
        // classifies as topmost — short trailing blocks (Resume / Subscribe)
        // never win the topmost contest from inside the rootMargin window.
        if (isAtBottom()) {
          setActive(lastId);
          return;
        }
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    for (const el of targets) io.observe(el);

    // Catch the case where the user scroll-bounces to the bottom without
    // crossing any new IntersectionObserver threshold.
    const onScroll = () => {
      if (Date.now() < lockUntilRef.current) return;
      if (isAtBottom()) setActive(lastId);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname, sections, lastId]);

  if (sections.length === 0) return null;

  return (
    <nav className={styles.rail} aria-label="Section navigation">
      <ul className={styles.list}>
        {sections.map(({ id, label }) => (
          <li key={id} className={classNames(styles.item, { [styles.active]: active === id })}>
            <a href={`#${id}`} className={styles.link} onClick={onLinkClick(id)}>
              <span className={styles.tick} aria-hidden="true" />
              <span className={styles.label}>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
