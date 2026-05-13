import { writing } from "@/content/writing";
import styles from "./SelectedList.module.css";

export function SelectedList() {
  const selected = writing.filter((w) => w.selected);
  return (
    <div className={styles.list}>
      {selected.map((entry) => (
        <article key={entry.href} className={styles.item}>
          <a href={entry.href} target="_blank" rel="noreferrer" className={styles.title}>
            {entry.title}
          </a>
          <time className={styles.date} dateTime={entry.isoDate}>
            {entry.date}
          </time>
          {entry.blurb && <p className={styles.blurb}>{entry.blurb}</p>}
        </article>
      ))}
    </div>
  );
}
