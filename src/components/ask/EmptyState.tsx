"use client";

import { ask } from "@/content/ask";
import { OptionCards } from "./OptionCards";
import { firstKeystroke, sendMessage } from "./actions";
import styles from "./ask.module.css";

/** First screen: one greeting line and the three starters (spec Story 1, scenario 2). */
export function EmptyState() {
  return (
    <div className={styles.empty}>
      <p className={styles.greeting}>{ask.greeting}</p>
      <p className={`${styles.eyebrow} ${styles.listLabel}`}>Try one of these</p>
      <OptionCards
        flush
        cards={ask.starters.map((s) => ({ key: s.label, title: s.label, prompt: s.prompt }))}
        onPick={(prompt) => {
          firstKeystroke();
          void sendMessage(prompt);
        }}
      />
    </div>
  );
}
