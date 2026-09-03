import styles from "./ContextStrip.module.css";

// Static server component: the four-step platform sequence that led to the
// application shell. Flat figure on the dark site page (not product UI) — no
// props, no state, no interactivity. Data is inline below.

type Step = {
  quarter: string;
  title: string;
  line: string;
  emphasis?: boolean;
};

const STEPS: readonly Step[] = [
  {
    quarter: "Q4 2025",
    title: "Settings & component library",
    line: "Four component libraries consolidated to one.",
  },
  {
    quarter: "Q1 2026",
    title: "List pages",
    line: "The system applied to high-traffic lists.",
  },
  {
    quarter: "Q2 2026",
    title: "Thread design",
    line: "The conversation surface reworked.",
  },
  {
    quarter: "Q3 2026",
    title: "Application shell",
    line: "The culmination, the shell itself.",
    emphasis: true,
  },
];

export function ContextStrip() {
  return (
    <div className={styles.wrap}>
      <ol className={styles.strip}>
        {STEPS.map((step, i) => (
          <li className={styles.item} key={step.quarter}>
            <div className={`${styles.card} ${step.emphasis ? styles.cardAccent : ""}`}>
              <span className={styles.quarter}>{step.quarter}</span>
              <h3 className={`${styles.title} ${step.emphasis ? styles.titleAccent : ""}`}>
                {step.title}
              </h3>
              <p className={styles.line}>{step.line}</p>
            </div>
            {i < STEPS.length - 1 ? (
              <span className={styles.connector} aria-hidden="true">
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      <p className={styles.caption}>
        Deliberately sequenced from the least-accessed areas toward the most critical, proving the
        approach where risk is lowest before touching the core.
      </p>
    </div>
  );
}
