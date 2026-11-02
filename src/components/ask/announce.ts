// The widget's one announcement channel. Every spoken update goes through the
// single visually hidden status region (StatusRegion.tsx) so a screen-reader user
// hears a handful of deliberate messages instead of a stream of tokens
// (spec FR-041). Repeated or back-to-back messages are separated: clear the
// region, wait at least 350 ms, then insert, because live regions often ignore a
// change that arrives while the previous text is still in them.
const GAP_MS = 350;
const MAX_LENGTH = 600;

let write: ((text: string) => void) | null = null;
let current = "";
const queue: string[] = [];
let running = false;

export function registerStatusRegion(setter: ((text: string) => void) | null): void {
  write = setter;
  if (setter) {
    current = "";
    void run();
  }
}

export function announce(text: string): void {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return;
  queue.push(clean.length > MAX_LENGTH ? `${clean.slice(0, MAX_LENGTH - 1)}…` : clean);
  void run();
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function run(): Promise<void> {
  if (running || !write) return;
  running = true;
  while (queue.length > 0 && write) {
    const next = queue.shift() as string;
    if (current !== "") {
      write("");
      current = "";
      await sleep(GAP_MS);
    }
    if (!write) break;
    write(next);
    current = next;
    await sleep(GAP_MS);
  }
  running = false;
}

/** The text an answer announces on `done`: the whole reply when short, else a count. */
export function summarizeReply(text: string): string {
  const clean = text.trim();
  if (clean.length <= MAX_LENGTH) return clean;
  const paragraphs = clean.split(/\n{2,}/).filter(Boolean).length;
  return `Answer ready, ${paragraphs} ${paragraphs === 1 ? "paragraph" : "paragraphs"}`;
}
