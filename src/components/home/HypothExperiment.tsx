import { ArrowOut } from "@/components/primitives/ArrowOut";
import { MarkTile } from "@/components/primitives/MarkTile";
import type { HypothExperiment as TExperiment } from "@/types/content";
import styles from "./HypothExperiment.module.css";

export function HypothExperiment({ experiment }: { experiment: TExperiment }) {
  const tag = experiment.stage ? `${experiment.index} · ${experiment.stage}` : experiment.index;
  return (
    <div className={styles.sub}>
      <span className={styles.mark}>
        <MarkTile mark={experiment.mark} title={experiment.name} />
      </span>
      <div className={styles.body}>
        <div className={styles.head}>
          <span className={styles.name}>
            <a href={experiment.href} target="_blank" rel="noreferrer">
              {experiment.name}
              <ArrowOut />
            </a>
          </span>
          <span className={styles.tag}>{tag}</span>
        </div>
        <p className={styles.desc}>{experiment.description}</p>
        {experiment.links && experiment.links.length > 0 && (
          <div className={styles.links}>
            {experiment.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {l.label}
                {l.external && <ArrowOut />}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
