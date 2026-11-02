import type { Rect } from "./store";

// The bar <-> panel morph (research D11, contracts/motion.md).
//
// The panel's background box (the "frame") travels from the bar's rectangle to its
// own and back. Only the frame's position and size animate, which is cheap because
// it is one fixed, isolated box; its contents never scale, they crossfade (the
// distortion a scaled box would put on text and hairlines is why this is not a
// transform). The Web Animations API is used instead of view transitions because
// same-document view transitions are above this site's Safari 15.4 floor.
//
// Under reduced motion nothing travels: the frame fades in or out over 100 ms.
const EASE = "cubic-bezier(0.2, 0, 0, 1)";
const OPEN_MS = 320;
const CLOSE_MS = 240;
const BAR_RADIUS = "12px";

export interface Parts {
  frame: HTMLElement;
  content: HTMLElement;
}

let running: Animation[] = [];

const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const px = (n: number) => `${n}px`;

export function rectOf(el: Element): Rect {
  const r = el.getBoundingClientRect();
  return { top: r.top, left: r.left, width: r.width, height: r.height };
}

function geometry(r: Rect, radius: string): Keyframe {
  return {
    top: px(r.top),
    left: px(r.left),
    width: px(r.width),
    height: px(r.height),
    borderRadius: radius,
  };
}

function track(animation: Animation): Animation {
  running.push(animation);
  return animation;
}

function settled(): Promise<void> {
  const all = running.map((a) => a.finished.catch(() => undefined));
  return Promise.all(all).then(() => {
    running = [];
  });
}

function cancelRunning(): void {
  for (const animation of running) animation.cancel();
  running = [];
}

/** Grow the frame out of the bar (or fade it in when there is no bar rect / reduced motion). */
export function openMorph({ frame, content }: Parts, from: Rect | null): Promise<void> {
  cancelRunning();
  const reduced = prefersReduced();
  if (!from || reduced) {
    track(
      frame.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: reduced ? 100 : 200,
        easing: "ease-out",
      }),
    );
    return settled();
  }
  const to = rectOf(frame);
  const finalRadius = getComputedStyle(frame).borderRadius;
  track(
    frame.animate([geometry(from, BAR_RADIUS), geometry(to, finalRadius)], {
      duration: OPEN_MS,
      easing: EASE,
    }),
  );
  // The bar's own label is gone at once; the panel's contents arrive in the second half.
  track(
    content.animate([{ opacity: 0 }, { opacity: 0, offset: 0.5 }, { opacity: 1 }], {
      duration: OPEN_MS,
      easing: "linear",
    }),
  );
  return settled();
}

/** Shrink the frame back into the bar. Starts from wherever the frame is now (so an interrupted open reverses smoothly). */
export function closeMorph({ frame, content }: Parts, to: Rect | null): Promise<void> {
  const now = rectOf(frame);
  const radius = getComputedStyle(frame).borderRadius;
  cancelRunning();
  frame.style.transform = "";
  const reduced = prefersReduced();
  if (!to || reduced) {
    track(
      frame.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: reduced ? 100 : 160,
        easing: "ease-in",
        fill: "forwards",
      }),
    );
    return settled();
  }
  track(
    frame.animate([geometry(now, radius), geometry(to, BAR_RADIUS)], {
      duration: CLOSE_MS,
      easing: EASE,
      fill: "forwards",
    }),
  );
  track(
    content.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 100,
      easing: "linear",
      fill: "forwards",
    }),
  );
  return settled();
}
