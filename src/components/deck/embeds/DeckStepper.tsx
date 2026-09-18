"use client";

import type { StepperSlide } from "@/components/work/app-shell/ImageStepper";
import classNames from "classnames";
import Image from "next/image";
import { type KeyboardEvent, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { LightboxGroup } from "../LightboxContext";
import { LightboxTrigger } from "../LightboxTrigger";
import styles from "./DeckStepper.module.css";
import { stageSizes } from "./stageSizes";

// Copy of src/components/work/app-shell/ImageStepper.tsx (research D11): the
// deck needs stage-fraction-aware `sizes` and its own ←/→ handling via
// data-deck-keys="local", so /work's stepper and its keyboard contract stay
// untouched.
export function DeckStepper({
  slides,
  stageFraction = 0.6,
  footnote,
  enableLightbox = false,
}: {
  slides: StepperSlide[];
  stageFraction?: number;
  /** Short static text under the caption column — e.g. a source note. */
  footnote?: string;
  /** Opt-in: the current screen also opens in the shared lightbox, with all
   *  of `slides` browsable there via left/right — independent of, and in
   *  addition to, this stepper's own Back/Next/dots. */
  enableLightbox?: boolean;
}) {
  const [step, setStep] = useState(0);
  const go = (i: number) => setStep(Math.max(0, Math.min(slides.length - 1, i)));
  const current = slides[step];
  const groups: LightboxGroup[] = slides.map((s) => [s]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(step + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(step - 1);
    }
  }

  const screen = (
    <Image
      src={current.src}
      alt={current.alt}
      fill
      className={styles.img}
      sizes={stageSizes(stageFraction)}
      priority={step === 0}
    />
  );

  return (
    <div className={styles.player} data-deck-keys="local" onKeyDown={onKeyDown}>
      {enableLightbox ? (
        <LightboxTrigger
          groups={groups}
          index={step}
          label={`View ${current.title} larger`}
          className={styles.screen}
        >
          {screen}
        </LightboxTrigger>
      ) : (
        <figure className={styles.screen}>{screen}</figure>
      )}

      <div className={styles.caption} aria-live="polite">
        <div className={styles.captionHead}>
          <span className={styles.num} aria-hidden="true">
            {step + 1}
          </span>
          <span className={styles.stepTitle}>{current.title}</span>
        </div>
        <p className={styles.captionText}>{current.caption}</p>
      </div>

      <div className={styles.bar}>
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => go(step - 1)}
          disabled={step === 0}
        >
          <FiChevronLeft aria-hidden="true" />
          Back
        </button>

        <div className={styles.dots} role="group" aria-label="Go to screen">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              className={classNames(styles.dot, i === step && styles.dotOn)}
              onClick={() => go(i)}
              aria-label={`Screen ${i + 1} of ${slides.length}: ${s.title}`}
              aria-current={i === step ? "step" : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className={styles.navBtn}
          onClick={() => go(step + 1)}
          disabled={step === slides.length - 1}
        >
          Next
          <FiChevronRight aria-hidden="true" />
        </button>
      </div>

      {footnote ? <p className={styles.footnote}>{footnote}</p> : null}
    </div>
  );
}
