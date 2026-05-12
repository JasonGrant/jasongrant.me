import { nowLines, updated } from "@/content/now";
import type { NowFragment } from "@/types/content";
import styles from "./NowBlock.module.css";

function renderFragment(frag: NowFragment, key: number) {
  if (typeof frag === "string") return <span key={key}>{frag}</span>;
  if (frag.external) {
    return (
      <a key={key} href={frag.href} target="_blank" rel="noreferrer">
        {frag.label}
      </a>
    );
  }
  return (
    <a key={key} href={frag.href}>
      {frag.label}
    </a>
  );
}

export function NowBlock() {
  return (
    <section className={styles.now} id="now" aria-labelledby="now-heading">
      <div className={styles.fence}>
        <div className={styles.header} data-reveal>
          <span className={styles.path} id="now-heading">
            ~/now
          </span>
          <span className={styles.updated}>
            updated {updated.month.toLowerCase()} {updated.year}
          </span>
        </div>
        <div className={styles.body}>
          <ul className={styles.list}>
            {nowLines.map((line, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: line array order is stable and authored as data
              <li key={i} className={styles.row}>
                <span>{line.map((frag, j) => renderFragment(frag, j))}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
