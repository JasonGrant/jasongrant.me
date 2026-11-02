"use client";

import { useEffect, useState } from "react";
import { registerStatusRegion } from "./announce";
import styles from "./ask.module.css";

/** The widget's only live region: visually hidden, polite, atomic (spec FR-041). */
export function StatusRegion() {
  const [text, setText] = useState("");
  useEffect(() => {
    registerStatusRegion(setText);
    return () => registerStatusRegion(null);
  }, []);
  return (
    <div role="status" aria-live="polite" aria-atomic="true" className={styles.srOnly}>
      {text}
    </div>
  );
}
