import type { Milestone } from "@/content/studies/types";
import styles from "./Timeline.module.css";

// Horizontal milestone timeline for the Overview: quarter circles across the
// top (the year printed above the first node of each year), descriptions
// wrapping beneath. Spans the walkthrough-panel width on desktop; collapses
// to a left-rail list under 720px.
export function MilestoneTimeline({ milestones }: { milestones: readonly Milestone[] }) {
  return (
    <div className={styles.timeline} role="list" aria-label="Project timeline">
      {milestones.map((m, i) => (
        <div className={styles.item} role="listitem" key={`${m.quarter}-${m.year}`}>
          <span className={styles.year} aria-hidden={!m.showYear}>
            {m.showYear ? m.year : " "}
          </span>
          <span className={styles.node}>
            <span className={styles.circle}>{m.quarter}</span>
            {i < milestones.length - 1 ? <span className={styles.line} aria-hidden="true" /> : null}
          </span>
          <span className={styles.desc}>{m.label}</span>
        </div>
      ))}
    </div>
  );
}
