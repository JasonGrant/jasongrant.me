"use client";

import styles from "./ResetButton.module.css";
import { useDeckReset } from "./useDeckReset";

// Visible only when the current slide holds interactive state to reset
// (FR-020). Its accessible name carries the shortcut so a screen-reader
// user learns the "R" key from the control itself, not just this label.
export function ResetButton({ resettable }: { resettable: boolean }) {
  const { reset } = useDeckReset();
  if (!resettable) return null;
  return (
    <button type="button" className={styles.button} onClick={reset} aria-keyshortcuts="R">
      Reset slide (R)
    </button>
  );
}
