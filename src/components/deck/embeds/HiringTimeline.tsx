import classNames from "classnames";
import styles from "./HiringTimeline.module.css";

// The team-building arc behind "a shift from hands-on to overseeing": four
// phases from a two-person effort to an org-wide rollout. New, deck-only
// content — no public case-study equivalent to reuse.
type Stage = {
  eyebrow: string;
  title: string;
  bullets: readonly string[];
  role: string;
  emphasis?: boolean;
};

const STAGES: readonly Stage[] = [
  {
    eyebrow: "Pre-Q4 2023",
    title: "Two leaders part-time",
    bullets: [
      "Daniel (engineering) and I (design), alone",
      "Removed blockers: multiple frameworks, inconsistent design-system adoption, non-localizable components",
    ],
    role: "Player",
  },
  {
    eyebrow: "Q1 2024",
    title: "Hiring kicks off",
    bullets: [
      "Evan joins as the third owner; Daniel pulls an engineer from Web Platform",
      "Hiring opens for a PM and a London i18n engineering team",
      "By quarter's end: PM hired, an engineering manager plus four in London",
    ],
    role: "Player-coach",
  },
  {
    eyebrow: "Q2 2024",
    title: "Launching French",
    bullets: [
      "Cross-engineering support for the first non-English language",
      "Every engineering team owned its own part of the rollout",
      "Proved the model once, before scaling to five more",
    ],
    role: "Player-coach",
  },
  {
    eyebrow: "Post-Q2 2024",
    title: "Scaling the org",
    bullets: [
      "Tooling, frameworks, and full-time design support scaled to the whole team",
      "Five more languages shipped (German, Portuguese, Korean, Spanish, Italian); engineers asked how we did it without talking to them",
      "Customers could now send one campaign across multiple languages",
    ],
    role: "Leadership",
    emphasis: true,
  },
] as const;

export function HiringTimeline() {
  return (
    <ol className={styles.strip}>
      {STAGES.map((s) => (
        <li className={styles.item} key={s.eyebrow}>
          <div className={classNames(styles.card, s.emphasis && styles.cardAccent)}>
            <span className={styles.eyebrow}>{s.eyebrow}</span>
            <h3 className={classNames(styles.title, s.emphasis && styles.titleAccent)}>
              {s.title}
            </h3>
            <ul className={styles.bullets}>
              {s.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <span className={classNames(styles.role, s.emphasis && styles.roleAccent)}>
              {s.role}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
