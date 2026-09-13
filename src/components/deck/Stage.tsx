"use client";

import { useEffect, useRef } from "react";
import styles from "./Stage.module.css";

// Sets --deck-scale and the html.deck-js mode class before hydration, so the
// first paint is already scaled (CLS 0). Plain ES5 — runs during HTML
// parsing, ahead of any bundle (research D6). Mirrors the
// dangerouslySetInnerHTML precedent in src/components/chrome/HeadComment.tsx.
const SCALE_SCRIPT = `(function(){
  var d = document.documentElement;
  d.classList.add("deck-js");
  function fit() {
    var scale = Math.min(d.clientWidth / 1920, window.innerHeight / 1080);
    d.style.setProperty("--deck-scale", String(scale));
  }
  fit();
  window.addEventListener("resize", fit);
})();`;

// The fixed 16:9 presentation stage (constitution v1.3.0 presentation-stage
// exception). Mounted once by DeckShell in the [secret] layout, so it
// persists across slide navigations.
export function Stage({ children }: { children: React.ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);

  // Programmatic scroll-leak mitigation (research D7): an overflow:hidden/
  // clip box can still be nudged by focusing an element whose scaled layout
  // position sits outside the visible frame. Snap the offset back to zero.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    function resetScroll() {
      if (el && (el.scrollTop !== 0 || el.scrollLeft !== 0)) {
        el.scrollTop = 0;
        el.scrollLeft = 0;
      }
    }
    el.addEventListener("scroll", resetScroll, { passive: true });
    return () => el.removeEventListener("scroll", resetScroll);
  }, []);

  return (
    <div className={styles.viewport} ref={viewportRef}>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: parser-blocking scale script must run before hydration to avoid CLS; see specs/008-presentation-deck/research.md D6 */}
      <script dangerouslySetInnerHTML={{ __html: SCALE_SCRIPT }} />
      <div className={styles.frame}>{children}</div>
    </div>
  );
}
