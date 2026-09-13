import { deck } from "@/content/deck";
import type { TransitionSlide as TransitionSlideData } from "@/content/deck/types";
import Link from "next/link";
import styles from "./Slide.module.css";

// Cover, section divider, and close — the deck's one non-content template
// (contracts/deck-content.md). One <h1>; the static description is the
// no-JS/assistive-tech equivalent (FR-007).
export function TransitionSlide({
  slide,
  position,
  secret,
}: {
  slide: TransitionSlideData;
  position: { index: number; total: number };
  secret: string;
}) {
  return (
    <article
      data-deck-slide
      tabIndex={-1}
      role="group"
      aria-roledescription="slide"
      aria-label={`Slide ${position.index + 1} of ${position.total}: ${slide.title}`}
      className={styles.slideRoot}
    >
      <div className={styles.transition}>
        <div className={styles.transitionHeader}>
          {slide.kicker ? <p className={styles.kicker}>{slide.kicker}</p> : null}
          <h1 className={styles.transitionHeadline}>{slide.headline}</h1>
        </div>
        {slide.sub ? <p className={styles.transitionSub}>{slide.sub}</p> : null}
        {slide.bullets && slide.bullets.length > 0 ? (
          <ul className={styles.transitionBullets}>
            {slide.bullets.map((b) => {
              if (typeof b === "string") return <li key={b}>{b}</li>;
              const section = deck.sections.find((s) => s.slug === b.section);
              const firstSlide = section?.slides[0];
              if (!firstSlide) return <li key={b.label}>{b.label}</li>;
              return (
                <li key={b.label}>
                  <Link
                    href={`/deck/${secret}/${section.slug}/${firstSlide.slug}`}
                    className={styles.bulletLink}
                  >
                    {b.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : null}
        {slide.links && slide.links.length > 0 ? (
          <ul className={styles.links}>
            {slide.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.link}>
                  {l.label} →
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <p className={styles.srOnly}>{slide.staticDescription}</p>
    </article>
  );
}
