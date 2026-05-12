import { SectionLabel } from "@/components/primitives/SectionLabel";
import { workEntries } from "@/content/work";
import { WorkEntry } from "./WorkEntry";
import styles from "./WorkShelf.module.css";

export function WorkShelf() {
  return (
    <section className={styles.work} id="work" aria-labelledby="work-heading">
      <SectionLabel>
        <span id="work-heading">Selected work</span>
      </SectionLabel>
      <div className={styles.entries}>
        {workEntries.map((entry, i) => (
          <WorkEntry key={entry.id} entry={entry} first={i === 0} />
        ))}
      </div>
    </section>
  );
}
