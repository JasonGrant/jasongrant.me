"use client";

import { ask } from "@/content/ask";
import { site } from "@/content/site";
import { useEffect, useRef } from "react";
import { completeFakeChallenge, retryBotCheck } from "./actions";
import styles from "./ask.module.css";
import { useAsk } from "./store";
import { setBotCheckSurface } from "./turnstile";

/**
 * Where the Turnstile challenge appears when a human check is needed. It is
 * absolutely positioned above the composer and overlays the transcript, so a visible
 * challenge pushes nothing in the flow (spec FR-013). Most visitors never see it:
 * until a check needs interaction it takes no space and is hidden.
 */
export function BotCheckSurface() {
  const state = useAsk((s) => s.botCheck);
  const message = useAsk((s) => s.botCheckMessage);
  const fake = useAsk((s) => s.fakeChallenge);
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setBotCheckSurface(host.current);
    return () => setBotCheckSurface(null);
  }, []);

  const visible = state === "interactive" || state === "failed";
  return (
    <div
      className={styles.botSurface}
      role="group"
      aria-label="Verification"
      data-visible={visible ? "true" : "false"}
    >
      {state === "interactive" ? (
        <p className={`${styles.eyebrow} ${styles.botLead}`}>Quick check before we start</p>
      ) : null}
      <div ref={host} className={styles.botHost} data-live={state === "interactive" && !fake} />
      {fake ? (
        <div className={styles.fakeChallenge}>
          <span>Stand-in challenge</span>
          <button type="button" className={styles.kbdBtn} onClick={() => completeFakeChallenge()}>
            Verify
          </button>
        </div>
      ) : null}
      {state === "failed" ? (
        <>
          <p className={styles.botMessage}>{message ?? ask.lines.network}</p>
          <div className={styles.botActions}>
            <button type="button" className={styles.kbdBtn} onClick={() => retryBotCheck()}>
              Try again
            </button>
            <a href={`mailto:${site.email}`}>or email me</a>
          </div>
        </>
      ) : null}
    </div>
  );
}
