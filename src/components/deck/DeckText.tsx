import type { DeckRun, DeckText } from "@/content/deck/types";
import styles from "./Slide.module.css";

// Copy of StudyPage's renderRun/renderRichText (src/components/work/StudyPage.tsx)
// minus the glossary-chip branch — the deck's rich text has no glossary terms
// (contracts/deck-content.md).
function renderRun(run: DeckRun, key: number) {
  if (typeof run === "string") return <span key={key}>{run}</span>;
  if ("em" in run) return <em key={key}>{run.em}</em>;
  return (
    <a
      key={key}
      className={styles.sourceLink}
      href={run.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {run.text}
    </a>
  );
}

function paragraphKey(runs: DeckRun[]): string {
  const first = runs[0];
  if (typeof first === "string") return first.slice(0, 40);
  if ("em" in first) return first.em.slice(0, 40);
  return first.href;
}

export function renderDeckText(body: DeckText) {
  return body.map((runs) => (
    <p key={paragraphKey(runs)} className={styles.bodyParagraph}>
      {runs.map(renderRun)}
    </p>
  ));
}
