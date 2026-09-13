"use client";

import type { DeckOutline } from "@/content/deck/types";
import classNames from "classnames";
import Link from "next/link";
import { forwardRef, useId } from "react";
import styles from "./Navigator.module.css";

export interface NavigatorProps {
  secret: string;
  outline: DeckOutline;
  currentSection: string;
  currentSlide: string;
  open: boolean;
  onToggle: () => void;
}

// Subtle progress indicator that discloses two levels on hover/focus/toggle
// (contracts/navigator.md): sections (major), and — within the current
// section only — its slides (minor). All entries are real links so the
// navigator works without scripting.
export const Navigator = forwardRef<HTMLElement, NavigatorProps>(function Navigator(
  { secret, outline, currentSection, currentSlide, open, onToggle },
  ref,
) {
  const panelId = useId();
  const flat = outline.sections.flatMap((s) =>
    s.slides.map((sl) => ({ section: s.slug, slide: sl.slug })),
  );
  const index = flat.findIndex((e) => e.section === currentSection && e.slide === currentSlide);
  const total = flat.length;

  return (
    <nav
      ref={ref}
      className={classNames(styles.nav, open && styles.navOpen)}
      aria-label="Deck navigation"
    >
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className={styles.srOnly}>Slides </span>
        {index >= 0 ? `${index + 1} / ${total}` : `- / ${total}`}
      </button>
      <div id={panelId} className={styles.panel}>
        <ol className={styles.sections}>
          {outline.sections.map((section) => {
            const isCurrentSection = section.slug === currentSection;
            return (
              <li key={section.slug} className={styles.sectionItem}>
                <Link
                  href={`/deck/${secret}/${section.slug}/${section.slides[0].slug}`}
                  prefetch={false}
                  className={styles.sectionLink}
                  aria-current={isCurrentSection ? "true" : undefined}
                >
                  {section.title}
                </Link>
                {isCurrentSection ? (
                  <ol className={styles.slides}>
                    {section.slides.map((slide) => {
                      const isCurrentSlide = slide.slug === currentSlide;
                      return (
                        <li key={slide.slug}>
                          <Link
                            href={`/deck/${secret}/${section.slug}/${slide.slug}`}
                            prefetch={false}
                            className={styles.slideLink}
                            aria-current={isCurrentSlide ? "page" : undefined}
                          >
                            {slide.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
});
