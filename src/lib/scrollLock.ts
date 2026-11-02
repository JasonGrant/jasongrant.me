// Lock page scroll behind a modal surface (the phone sheet).
//
// `overflow: hidden` on <body> also breaks inner scroll containers on iOS Safari,
// so this uses the same position: fixed pattern as the command palette: the body is
// pinned in place, scrollable descendants keep working, and the scroll position is
// restored on unlock.
let locks = 0;
let saved: { scrollY: number; style: Record<string, string> } | null = null;

export function lockBodyScroll(): void {
  locks += 1;
  if (locks > 1) return;
  const body = document.body;
  saved = {
    scrollY: window.scrollY,
    style: {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    },
  };
  body.style.position = "fixed";
  body.style.top = `-${saved.scrollY}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
}

export function unlockBodyScroll(): void {
  locks = Math.max(0, locks - 1);
  if (locks > 0 || !saved) return;
  const body = document.body;
  const { scrollY, style } = saved;
  body.style.position = style.position;
  body.style.top = style.top;
  body.style.left = style.left;
  body.style.right = style.right;
  body.style.width = style.width;
  saved = null;
  window.scrollTo(0, scrollY);
}
