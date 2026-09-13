"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./DeckSlideFrame.module.css";
import { useDeckReset } from "./useDeckReset";

// Remounts the slide subtree on navigation OR reset (research D10): keying
// on `${pathname}#${nonce}` discards every embedded component's useState —
// stepper positions, the accordion count, SettingsPanel drafts/overrides/
// toast timers, the email flow's step — with no reload. A 160ms opacity
// fade marks the change; reduced motion removes it (research D8). Focus
// moves to the new slide's [data-deck-slide] root, and a reset (but not a
// plain navigation) is announced via a polite live region (FR-021).
export function DeckSlideFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { nonce } = useDeckReset();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [announcement, setAnnouncement] = useState("");
  const prev = useRef({ pathname, nonce });

  useEffect(() => {
    const el = wrapRef.current?.querySelector<HTMLElement>("[data-deck-slide]");
    el?.focus();

    const wasReset = prev.current.pathname === pathname && prev.current.nonce !== nonce;
    setAnnouncement(wasReset ? "Slide reset" : "");
    prev.current = { pathname, nonce };
  }, [pathname, nonce]);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div key={`${pathname}#${nonce}`} className={styles.enter}>
        {children}
      </div>
      <p className={styles.srOnly} role="status" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}
