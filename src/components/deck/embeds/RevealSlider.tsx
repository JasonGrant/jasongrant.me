"use client";

import Image from "next/image";
import { type PointerEvent as ReactPointerEvent, useCallback, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "./RevealSlider.module.css";
import { stageSizes } from "./stageSizes";

// A draggable before/after comparison: the "before" image sits on top,
// clipped to the handle's position, revealing "after" underneath. The
// handle is a real slider (role="slider", arrow-key operable), not just a
// drag target, so it's usable without a mouse. Starts at 50% so the split
// renders correctly even without JS (clip-path is plain CSS).
export interface RevealSliderProps {
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
  /** Natural pixel dimensions of the screenshots — same for both, so the
   *  frame stays one fixed shape and next/image can size correctly. */
  width: number;
  height: number;
  label: string;
}

export function RevealSlider({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  width,
  height,
  label,
}: RevealSliderProps) {
  const [position, setPosition] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, pct)));
  }, []);

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  }
  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (e.buttons !== 1) return;
    setFromClientX(e.clientX);
  }
  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const step = e.shiftKey ? 20 : 5;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setPosition(100);
    }
  }

  return (
    <figure className={styles.wrap} data-deck-keys="local">
      <div ref={frameRef} className={styles.frame} style={{ aspectRatio: `${width} / ${height}` }}>
        <Image
          src={afterSrc}
          alt={afterAlt}
          fill
          className={styles.img}
          sizes={stageSizes(0.85)}
          priority
        />
        <div className={styles.beforeLayer} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            fill
            className={styles.img}
            sizes={stageSizes(0.85)}
          />
        </div>
        <span className={styles.tag} data-side="before">
          Before
        </span>
        <span className={styles.tag} data-side="after">
          After
        </span>
        <div
          className={styles.handle}
          style={{ left: `${position}%` }}
          role="slider"
          tabIndex={0}
          aria-label={`${label}: reveal position between before and after`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onKeyDown={onKeyDown}
        >
          <span className={styles.grip} aria-hidden="true">
            <FiChevronLeft className={styles.gripIcon} />
            <FiChevronRight className={styles.gripIcon} />
          </span>
        </div>
      </div>
    </figure>
  );
}
