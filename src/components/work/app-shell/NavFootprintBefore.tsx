import styles from "./NavFootprintBefore.module.css";

// Compact companion to the "About 10% of the page given to navigation"
// bullet in "The problem" — the same schematic page rectangle
// NavFootprintDiagram uses for its before state, shown here beside the
// numbers rather than only later, paired with the after states under "The
// solution". Static, flat, no replicaFrame — a diagram, not product UI.

export function NavFootprintBefore() {
  return (
    <figure className={styles.root}>
      <p className={styles.eyebrow}>Before</p>
      <div className={styles.row}>
        <div className={styles.screen} aria-hidden="true">
          <div className={styles.topBar} />
          <div className={styles.rail} />
        </div>
        <div className={styles.stats}>
          <p className={styles.figure}>10%</p>
          <p className={styles.label}>of the page is navigation</p>
          <p className={styles.note}>measured at 1800×1169</p>
        </div>
      </div>
    </figure>
  );
}
