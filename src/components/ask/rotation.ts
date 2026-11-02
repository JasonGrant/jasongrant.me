import { ask } from "@/content/ask";

// The entry bar's retyping placeholder (spec FR-004a, constitution v1.4.0).
//
// After 2 s on the page it types one starter question at about 30 ms a character,
// holds it 3 s, clears it, types the next; after the last it rests 8 s and goes
// round again, at most three times per page view, then stays on the static
// placeholder for good. The caller stops it on the visitor's first focus, hover,
// press or keystroke. It pauses while the tab is hidden (a step that fires while
// hidden waits until the tab is visible, so it resumes at the same character) and
// never starts under reduced motion. The counters live at module level so they
// count a page view even if the bar remounts.
const START_AFTER_MS = 2000;
const CHAR_MS = 30;
const HOLD_MS = 3000;
const REST_MS = 8000;
const MAX_CYCLES = 3;

let cyclesDone = 0;
let resting = true;

/** True between cycles and once finished: the moment the nudge may fire. */
export function isRotationResting(): boolean {
  return resting;
}

export function rotationFinished(): boolean {
  return cyclesDone >= MAX_CYCLES;
}

export function startRotation(onText: (text: string) => void): () => void {
  if (cyclesDone >= MAX_CYCLES) return () => {};
  const questions = ask.starters.map((s) => s.label);
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const wait = (ms: number, then: () => void) => {
    timer = setTimeout(() => {
      if (cancelled) return;
      if (document.hidden) return wait(500, then);
      then();
    }, ms);
  };

  const play = (index: number) => {
    resting = false;
    const text = questions[index];
    let shown = 0;
    const type = () => {
      shown += 1;
      onText(text.slice(0, shown));
      if (shown < text.length) return wait(CHAR_MS, type);
      wait(HOLD_MS, () => {
        onText("");
        if (index + 1 < questions.length) return play(index + 1);
        cyclesDone += 1;
        resting = true;
        if (cyclesDone < MAX_CYCLES) wait(REST_MS, () => play(0));
      });
    };
    type();
  };

  wait(Math.max(0, START_AFTER_MS - performance.now()), () => play(0));

  return () => {
    cancelled = true;
    clearTimeout(timer);
    resting = true;
    onText("");
  };
}
