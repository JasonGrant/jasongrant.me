"use client";

import classNames from "classnames";
import { useRef } from "react";
import type { LightboxGroup } from "./LightboxContext";
import { useLightbox } from "./LightboxContext";
import styles from "./LightboxTrigger.module.css";

// Wraps whatever markup renders a slide's image(s) — a <DeckImage>, a row of
// them — in a plain button that opens the shared lightbox on this slide's
// `groups`, positioned at this trigger's own `index`. `className` carries
// the caller's own layout rules (flex sizing, margins); this component only
// adds click behavior and undoes default button chrome.
export function LightboxTrigger({
  groups,
  index,
  label,
  className,
  style,
  children,
}: {
  groups: LightboxGroup[];
  index: number;
  label: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const { open } = useLightbox();
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      type="button"
      className={classNames(styles.trigger, className)}
      style={style}
      aria-label={label}
      onClick={() => open(groups, index, ref.current)}
    >
      {children}
    </button>
  );
}
