import type { ReactNode } from "react";
import styles from "./SectionLabel.module.css";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className={styles.label} data-reveal>
      <span className={styles.text}>{children}</span>
      <span className={styles.rule} aria-hidden="true" />
    </div>
  );
}
