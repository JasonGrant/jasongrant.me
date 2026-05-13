import { ArrowOut } from "@/components/primitives/ArrowOut";
import { MarkTile } from "@/components/primitives/MarkTile";
import type { WorkEntry } from "@/types/content";
import classNames from "classnames";
import { Fragment } from "react";
import styles from "./ExperienceEntry.module.css";

export function ExperienceEntry({ entry, first = false }: { entry: WorkEntry; first?: boolean }) {
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
        {entry.reportingLine && <span className={styles.reporting}>{entry.reportingLine}</span>}
        <span className={styles.dates}>{entry.dates}</span>
        {entry.companyStage && <span className={styles.stage}>{entry.companyStage}</span>}
      </div>
      <div className={styles.body}>
        <ul className={styles.bullets}>
          {entry.experienceBullets.map((bullet) => (
            <li key={bullet.slice(0, 40)} className={styles.bullet}>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        {entry.experiments && entry.experiments.length > 0 && (
          <div className={styles.experimentsLine}>
            Current experiments:{" "}
            {entry.experiments.map((exp, i) => (
              <Fragment key={exp.name}>
                {i > 0 && ", "}
                <a href={exp.href} target="_blank" rel="noreferrer">
                  {exp.name}
                  <ArrowOut />
                </a>{" "}
                <span className={styles.experimentTag}>
                  {exp.index}
                  {exp.stage && ` · ${exp.stage}`}
                </span>
              </Fragment>
            ))}
            .
          </div>
        )}
      </div>
    </article>
  );
}
