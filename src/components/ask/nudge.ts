import { isRotationResting } from "./rotation";

// The entry bar's occasional colour nudge (spec FR-004b, constitution v1.4.0): the
// caller flips a class for 600 ms that moves the border and label to the accent
// colour and back. Nothing moves, scales or shimmers. It never runs in the first
// 20 s on a page, more often than every 45 s, or more than three times per page
// view; only while the placeholder rotation is resting; never while the tab is
// hidden or the panel is open. The caller stops it on the visitor's first
// interaction and never starts it under reduced motion.
const FIRST_AFTER_MS = 20_000;
const SPACING_MS = 45_000;
const MAX_NUDGES = 3;
export const NUDGE_MS = 600;

let count = 0;
let lastAt = Number.NEGATIVE_INFINITY;

export function startNudges(onNudge: () => void, canNudge: () => boolean): () => void {
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const later = (ms: number) => {
    timer = setTimeout(attempt, ms);
  };

  function attempt() {
    if (cancelled || count >= MAX_NUDGES) return;
    const now = performance.now();
    if (now < FIRST_AFTER_MS) return later(FIRST_AFTER_MS - now);
    if (now - lastAt < SPACING_MS) return later(SPACING_MS - (now - lastAt));
    if (document.hidden || !isRotationResting() || !canNudge()) return later(1000);
    count += 1;
    lastAt = now;
    onNudge();
    later(SPACING_MS);
  }

  later(Math.max(0, FIRST_AFTER_MS - performance.now()));
  return () => {
    cancelled = true;
    clearTimeout(timer);
  };
}
