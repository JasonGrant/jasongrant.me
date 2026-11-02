"use client";

import styles from "./ask.module.css";
import { useAsk } from "./store";

/**
 * The widget's header: the title, the API's disclosure sentence exactly as it
 * sent it, and Close. It is present in every open state, at every width and zoom
 * (spec FR-008). Until health answers, the disclosure line is reserved at its final
 * height so nothing below it moves when the words arrive.
 */
export function Header({ onClose }: { onClose: () => void }) {
  const disclosure = useAsk((s) => s.health?.disclosure ?? "");
  return (
    <header className={styles.header}>
      <div className={styles.titleRow}>
        <h2 id="ask-title" className={styles.title} tabIndex={-1}>
          Ask Jason
        </h2>
        <button
          type="button"
          className={styles.kbdBtn}
          onClick={onClose}
          aria-label="Close chat (esc)"
        >
          esc
        </button>
      </div>
      <p id="ask-disclosure" className={styles.disclosure}>
        {disclosure}
      </p>
    </header>
  );
}
