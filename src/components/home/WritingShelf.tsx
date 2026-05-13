import { ArrowOut } from "@/components/primitives/ArrowOut";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { site } from "@/content/site";
import { writing } from "@/content/writing";
import { Newsletter } from "./Newsletter";
import styles from "./WritingShelf.module.css";

export function WritingShelf() {
  const selected = writing.filter((w) => w.selected);
  return (
    <section className={styles.writing} id="writing" aria-labelledby="writing-heading">
      <SectionLabel>
        <span id="writing-heading">Selected writing</span>
      </SectionLabel>
      <ol className={styles.list}>
        {selected.map((entry) => (
          <li key={entry.href} className={styles.item}>
            <a href={entry.href} target="_blank" rel="noreferrer">
              <span className={styles.title}>{entry.title}</span>
              <span className={styles.leader} aria-hidden="true" />
              <time className={styles.date} dateTime={entry.isoDate}>
                {entry.date}
              </time>
            </a>
          </li>
        ))}
      </ol>
      <a href={site.socials.substack} target="_blank" rel="noreferrer" className={styles.archive}>
        All writing on Substack <ArrowOut />
      </a>
      <Newsletter />
    </section>
  );
}
