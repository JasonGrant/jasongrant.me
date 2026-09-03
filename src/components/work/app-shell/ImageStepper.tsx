"use client";

import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "./ImageStepper.module.css";

// ImageStepper — cycles through real screenshots via the same Back/dots/Next
// pattern as the internationalization study's EmailTranslationFlow (identical
// nav-bar and dot markup/CSS, so the control reads as one site-wide pattern).
// Unlike the rest of this study's figures, these are genuine product
// screenshots, not recreations: permitted here under the constitution's
// owner-cleared-real-artifact exception (Jason's own demo account, seeded
// with this study's fictional cast — no third-party data). See research D8a.
export interface StepperSlide {
  src: string;
  alt: string;
  title: string;
  caption: string;
  width: number;
  height: number;
}

export function ImageStepper({ slides }: { slides: StepperSlide[] }) {
  const [step, setStep] = useState(0);
  const go = (i: number) => setStep(Math.max(0, Math.min(slides.length - 1, i)));
  const current = slides[step];

  return (
    <div className={styles.player}>
      <figure className={styles.screen}>
        <Image
          src={current.src}
          alt={current.alt}
          width={current.width}
          height={current.height}
          className={styles.img}
          sizes="(min-width: 900px) 1080px, 100vw"
          priority={step === 0}
        />
      </figure>

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

      <p className={styles.caption} aria-live="polite">
        <span className={styles.num} aria-hidden="true">
          {step + 1}
        </span>
        <span className={styles.captionText}>
          <span className={styles.stepTitle}>{current.title}.</span> {current.caption}
        </span>
      </p>
    </div>
  );
}
