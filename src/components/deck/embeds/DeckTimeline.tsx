import styles from "./DeckTimeline.module.css";

export interface DeckMilestone {
  quarter: string;
  year: number;
  showYear: boolean;
  title: string;
  description: string;
}

// Copy of src/components/work/Timeline.tsx (data-model.md §3's "copy vs
// import" pattern): the shared component caps its width for the study
// page's own layout, which reads too small and cramped on the deck's much
// wider 1920px stage. Milestone data is the deck's own (I18nTimeline.tsx) —
// a one-word title plus a short description, not the study's plain label.
export function DeckTimeline({ milestones }: { milestones: readonly DeckMilestone[] }) {
  return (
    <div className={styles.timeline} role="list" aria-label="Project timeline">
      {milestones.map((m, i) => (
        <div className={styles.item} role="listitem" key={`${m.quarter}-${m.year}`}>
          <span className={styles.year} aria-hidden={!m.showYear}>
            {m.showYear ? m.year : " "}
          </span>
          <span className={styles.node}>
            <span className={styles.circle}>{m.quarter}</span>
            {i < milestones.length - 1 ? <span className={styles.line} aria-hidden="true" /> : null}
          </span>
          <span className={styles.title}>{m.title}</span>
          <span className={styles.desc}>{m.description}</span>
        </div>
      ))}
    </div>
  );
}
