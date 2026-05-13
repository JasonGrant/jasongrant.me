import { ArrowOut } from "@/components/primitives/ArrowOut";
import { MarkTile } from "@/components/primitives/MarkTile";
import type { WorkEntry as TWorkEntry } from "@/types/content";
import classNames from "classnames";
import { HypothExperiment } from "./HypothExperiment";
import styles from "./WorkEntry.module.css";

export function WorkEntry({ entry, first = false }: { entry: TWorkEntry; first?: boolean }) {
  return (
    <article className={classNames(styles.entry, { [styles.first]: first })} id={entry.id}>
      <div className={styles.meta}>
        <span className={styles.org}>
          {entry.mark && <MarkTile mark={entry.mark} title={entry.org} />}
          {entry.orgHref ? (
            <a
              href={entry.orgHref}
              {...(entry.external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {entry.org}
              {entry.external && <ArrowOut />}
            </a>
          ) : (
            entry.org
          )}
        </span>
        <span className={styles.role}>{entry.role}</span>
        <span className={styles.dates}>{entry.dates}</span>
        {entry.companyStage && <span className={styles.stage}>{entry.companyStage}</span>}
      </div>
      <div className={styles.body}>
        <p className={styles.desc}>{entry.homeDescription}</p>
        {entry.links && entry.links.length > 0 && (
          <div className={styles.links}>
            {entry.links.map((l) =>
              l.pending ? (
                <span key={l.label} className={classNames(styles.pending)} aria-disabled="true">
                  {l.label} (soon)
                </span>
              ) : (
                <a
                  key={l.label}
                  href={l.href}
                  {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {l.label}
                  {l.external && <ArrowOut />}
                </a>
              ),
            )}
          </div>
        )}
        {entry.experiments && entry.experiments.length > 0 && (
          <div className={styles.sublist}>
            <div className={styles.sublistLabel}>Current experiments</div>
            {entry.experiments.map((exp) => (
              <HypothExperiment key={exp.name} experiment={exp} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
