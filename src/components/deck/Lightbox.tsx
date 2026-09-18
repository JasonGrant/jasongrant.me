"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import styles from "./Lightbox.module.css";
import type { LightboxGroup } from "./LightboxContext";

export function Lightbox({
  group,
  index,
  total,
  onClose,
  onNext,
  onPrev,
}: {
  group: LightboxGroup;
  index: number;
  total: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const hasMultiple = total > 1;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rootRef.current?.focus();
  }, []);

  // data-deck-keys="local" makes useDeckKeyboard yield Escape/arrows to this
  // listener instead of closing the navigator or changing slides.
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      } else if (hasMultiple && (e.key === "ArrowRight" || e.key === "ArrowDown")) {
        e.preventDefault();
        onNext();
      } else if (hasMultiple && (e.key === "ArrowLeft" || e.key === "ArrowUp")) {
        e.preventDefault();
        onPrev();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onNext, onPrev, hasMultiple]);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: Escape is handled above; this click target is the dismiss surface, not a control of its own
    <div
      ref={rootRef}
      className={styles.overlay}
      data-deck-keys="local"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={onClose}
    >
      <button type="button" className={styles.close} aria-label="Close" onClick={onClose}>
        <FiX />
      </button>
      {hasMultiple ? (
        <>
          <button
            type="button"
            className={styles.navLeft}
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            <FiChevronLeft />
          </button>
          <button
            type="button"
            className={styles.navRight}
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            <FiChevronRight />
          </button>
        </>
      ) : null}
      <div className={styles.row}>
        {group.map((image) => (
          <div className={styles.item} key={image.src}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={styles.img}
              sizes={`${Math.round(90 / group.length)}vw`}
            />
          </div>
        ))}
      </div>
      {hasMultiple ? (
        <p className={styles.position}>
          {index + 1} / {total}
        </p>
      ) : null}
    </div>
  );
}
