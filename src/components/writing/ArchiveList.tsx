import { writing } from "@/content/writing";
import styles from "./ArchiveList.module.css";

export function ArchiveList() {
  const sorted = [...writing].sort((a, b) => (a.isoDate < b.isoDate ? 1 : -1));
  return (
    <ol className={styles.list}>
      {sorted.map((entry) => (
        <li key={entry.href} className={styles.item}>
          <a href={entry.href} target="_blank" rel="noreferrer" className={styles.row}>
            <span className={styles.title}>{entry.title}</span>
            <span className={styles.leader} aria-hidden="true" />
            <time className={styles.date} dateTime={entry.isoDate}>
              {entry.date}
            </time>
          </a>
        </li>
      ))}
    </ol>
  );
}
