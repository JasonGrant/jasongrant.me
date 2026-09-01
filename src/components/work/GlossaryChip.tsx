"use client";

import { glossary } from "@/content/studies/glossary";
import type { GlossaryTermId } from "@/content/studies/types";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import styles from "./GlossaryChip.module.css";

interface GlossaryChipProps {
  term: GlossaryTermId;
}

interface Pos {
  top: number;
  left: number;
  place: "top" | "bottom";
  arrowLeft: number;
}

const GAP = 10; // trigger→popover gap, leaves room for the caret
const MARGIN = 10; // viewport edge margin

// Inline glossary affordance (FR-015): a click/tap disclosure whose definition
// floats over the prose as an anchored popover (Nord Popout / Porsche Popover
// style) rather than reflowing the paragraph. Fixed-positioned so it never
// shifts layout (CLS 0) and is never clipped by an ancestor; it flips
// above/below by available space and clamps horizontally to stay on-screen,
// re-anchoring on scroll/resize. Focus stays on the trigger — the definition
// is non-interactive and exposed to assistive tech via aria-describedby.
export function GlossaryChip({ term }: GlossaryChipProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<Pos | null>(null);
  const entry = glossary[term];
  const popId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popRef = useRef<HTMLSpanElement>(null);

  const place = useCallback(() => {
    const trigger = triggerRef.current;
    const pop = popRef.current;
    if (!trigger || !pop) return;
    const t = trigger.getBoundingClientRect();
    const pw = pop.offsetWidth;
    const ph = pop.offsetHeight;
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const spaceBelow = vh - t.bottom;
    const placement: "top" | "bottom" =
      spaceBelow < ph + GAP + MARGIN && t.top > ph + GAP + MARGIN ? "top" : "bottom";
    const top = placement === "bottom" ? t.bottom + GAP : t.top - GAP - ph;
    const center = t.left + t.width / 2;
    const left = Math.max(MARGIN, Math.min(center - pw / 2, vw - MARGIN - pw));
    const arrowLeft = Math.max(14, Math.min(center - left, pw - 14));
    setPos({ top, left, place: placement, arrowLeft });
  }, []);

  // Position before the browser paints, then keep it anchored while open.
  useLayoutEffect(() => {
    if (!open) return;
    place();
    let raf = 0;
    const onMove = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        place();
      });
    };
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
    };
  }, [open, place]);

  // Dismiss: Escape (restore focus to the trigger) or a pointer outside.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target) || popRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const toggle = () => {
    setPos(null);
    setOpen((v) => !v);
  };

  return (
    <span className={styles.root}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-describedby={open ? popId : undefined}
        onClick={toggle}
      >
        {entry.label}
      </button>
      {open ? (
        <span
          ref={popRef}
          id={popId}
          role="note"
          className={styles.popover}
          data-place={pos?.place ?? "bottom"}
          data-ready={pos ? "true" : "false"}
          style={pos ? { top: pos.top, left: pos.left } : { top: 0, left: 0 }}
        >
          {entry.definition}
          <span
            className={styles.arrow}
            style={pos ? { left: pos.arrowLeft } : undefined}
            aria-hidden="true"
          />
        </span>
      ) : null}
    </span>
  );
}
