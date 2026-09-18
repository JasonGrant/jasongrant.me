"use client";

import { useEffect, useRef } from "react";

// Local regions where the deck yields arrows/Space/R/Esc to the control's own
// handling (contracts/accessibility.md). PageUp/PageDown/Home/End always move
// slides, even from inside these, so a presenter never has to leave a demo to
// advance (research D9).
const LOCAL_SELECTOR =
  'input, select, textarea, [contenteditable]:not([contenteditable="false"]), [role="listbox"], [role="slider"], [role="tablist"], [role="radiogroup"], [data-deck-keys="local"]';

// Space also yields when it would double-activate a focused control.
const ACTIVATABLE_SELECTOR =
  'button, a, summary, [role="button"], [role="tab"], [role="radio"], [role="option"]';

export interface DeckKeyboardHandlers {
  onNext: () => void;
  onPrev: () => void;
  onFirst: () => void;
  onLast: () => void;
  /** null when the current slide has no interactive state to reset. */
  onReset: (() => void) | null;
  onEscape: () => void;
}

export function useDeckKeyboard(handlers: DeckKeyboardHandlers): void {
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || e.isComposing) return;

      const h = handlersRef.current;
      const target = e.target instanceof Element ? e.target : null;

      // Always deck-wide, even inside a local region.
      if (e.key === "PageDown") {
        e.preventDefault();
        h.onNext();
        return;
      }
      if (e.key === "PageUp") {
        e.preventDefault();
        h.onPrev();
        return;
      }
      if (e.key === "Home") {
        e.preventDefault();
        h.onFirst();
        return;
      }
      if (e.key === "End") {
        e.preventDefault();
        h.onLast();
        return;
      }

      if (target?.closest(LOCAL_SELECTOR)) return;

      if (e.key === "Escape") {
        h.onEscape();
        return;
      }
      if ((e.key === "r" || e.key === "R") && h.onReset) {
        h.onReset();
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        h.onNext();
        return;
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        h.onPrev();
        return;
      }
      if (e.key === " ") {
        if (target?.closest(ACTIVATABLE_SELECTOR)) return;
        e.preventDefault();
        if (e.shiftKey) h.onPrev();
        else h.onNext();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
