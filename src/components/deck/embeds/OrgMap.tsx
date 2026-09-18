import classNames from "classnames";
import styles from "./OrgMap.module.css";

// Simplified map of the Klaviyo product design org: product verticals as
// columns, horizontal teams/practices as bars spanning a subset of them.
// Vertical names are generalized and per-team headcounts are omitted on
// purpose: the repo is public even though the deck URL is not.
const VERTICALS = [
  "Research",
  "Docs",
  "Infra­structure",
  "Core product",
  "Reporting & AI",
  "New ventures",
];
const MINE = "Unified experience";

// startCol/span are 1-indexed grid-column coordinates: not every row reaches
// every vertical. Internationalization and content design also reach into
// documentation; design reviews and accessibility both reach only from
// infrastructure onward, not into research or documentation.
const HORIZONTALS = [
  { label: "Internationalization", emphasis: true, startCol: 2, span: 6 },
  { label: "Content design", startCol: 2, span: 6 },
  { label: "Design systems", startCol: 3, span: 5 },
  { label: "Accessibility", startCol: 3, span: 5 },
  { label: "Design reviews", startCol: 3, span: 5 },
];

export function OrgMap() {
  const columns = [...VERTICALS, MINE];
  const mineIndex = columns.length - 1;
  const rowCount = HORIZONTALS.length + 2;
  return (
    <figure className={styles.wrap}>
      <p className={styles.eyebrow}>Klaviyo product design, eighty people</p>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
          gridTemplateRows: `auto minmax(115px, 1fr) repeat(${HORIZONTALS.length}, auto)`,
        }}
      >
        {columns.map((name, i) => (
          <div
            key={name}
            className={classNames(styles.column, i === mineIndex && styles.columnMine)}
            style={{ gridColumn: i + 1, gridRow: `1 / span ${rowCount}` }}
          >
            <span className={styles.columnTitle}>{name}</span>
            {i === mineIndex ? <span className={styles.columnNote}>My vertical</span> : null}
          </div>
        ))}
        {HORIZONTALS.map((h, r) => (
          <div
            key={h.label}
            className={classNames(styles.bar, h.emphasis && styles.barOn)}
            style={{
              gridColumn: `${h.startCol} / span ${h.span}`,
              gridRow: r + 3,
              marginBottom: r === HORIZONTALS.length - 1 ? 5 : undefined,
            }}
          >
            {h.label}
          </div>
        ))}
      </div>
    </figure>
  );
}
