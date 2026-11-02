// Releases streamed text one word at a time at a steady pace, so the reply reads
// as a calm stream even when the network delivers it in bursts. It only changes
// when the visitor sees the words, never when they arrive.
//
//   push(delta)  add text from a `text` event
//   flush()      release everything now (on `done`)
//   cancel()     drop what has not been released (on Stop or a correction)
//
// A word is a run of non-space characters plus the space after it. A delta can end
// mid-word, so the trailing partial word waits for the next delta or the flush.
// Very long unbroken runs (scripts without spaces) are cut with Intl.Segmenter
// where the browser has it.
const INTERVAL_MS = 16;
/** Above this many waiting words, release several per tick so the text never trails by about a second. */
const CATCH_UP_AT = 60;

const segmenter =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new Intl.Segmenter(undefined, { granularity: "word" })
    : null;

function splitLongRun(token: string): string[] {
  if (token.length < 24 || !segmenter) return [token];
  return Array.from(segmenter.segment(token), (s) => s.segment);
}

export interface Pacer {
  push(delta: string): void;
  flush(): void;
  cancel(): void;
}

export function createPacer(release: (chunk: string) => void): Pacer {
  let carry = "";
  let queue: string[] = [];
  let timer: ReturnType<typeof setTimeout> | null = null;

  function take(text: string, final: boolean) {
    const tokens = text.match(/\S+\s*|\s+/g) ?? [];
    const last = tokens[tokens.length - 1];
    // Hold back a trailing word that has no space after it yet: more of it may be coming.
    if (!final && last !== undefined && !/\s$/.test(last)) {
      carry = tokens.pop() as string;
    } else {
      carry = "";
    }
    for (const token of tokens) queue.push(...splitLongRun(token));
  }

  function tick() {
    timer = null;
    const count = queue.length > CATCH_UP_AT ? Math.ceil(queue.length / CATCH_UP_AT) : 1;
    const batch = queue.splice(0, count).join("");
    if (batch) release(batch);
    if (queue.length > 0) timer = setTimeout(tick, INTERVAL_MS);
  }

  function schedule() {
    if (timer === null && queue.length > 0) timer = setTimeout(tick, INTERVAL_MS);
  }

  return {
    push(delta) {
      take(carry + delta, false);
      schedule();
    },
    flush() {
      take(carry, true);
      if (timer !== null) clearTimeout(timer);
      timer = null;
      const rest = queue.join("");
      queue = [];
      if (rest) release(rest);
    },
    cancel() {
      if (timer !== null) clearTimeout(timer);
      timer = null;
      queue = [];
      carry = "";
    },
  };
}
