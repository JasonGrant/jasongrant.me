import classNames from "classnames";
import styles from "./ShellSequencing.module.css";

// Deck-only card layout for the platform sequencing story (matches
// HiringTimeline's pattern): the shared ContextStrip figure on /work uses a
// terser arrow-connected strip suited to that page; this slide wants the
// same role/discipline framing already used for the i18n team slide. Not a
// copy of ContextStrip's data — the role and discipline lines are new.
//
// Each card also gets a flat schematic diagram, same technique as
// NavFootprintBefore.tsx on /work/app-shell (plain divs, no SVG: a
// bg-elev/ink-bordered box at a fixed aspect ratio with accent-soft zones
// standing in for real UI regions) — one abstraction per surface, all at
// the same size so they read as a set.
type DiagramType = "cards" | "table" | "thread" | "shell";

type Step = {
  eyebrow: string;
  title: string;
  line: string;
  role: string;
  discipline: string;
  diagram: DiagramType;
  emphasis?: boolean;
};

const STEPS: readonly Step[] = [
  {
    eyebrow: "Q4 2025",
    title: "Settings & component library",
    line: "Four component libraries consolidated to one.",
    role: "Player",
    discipline: "Design & Engineering",
    diagram: "cards",
  },
  {
    eyebrow: "Q1 2026",
    title: "List pages",
    line: "The system applied to high-traffic lists.",
    role: "Player-coach",
    discipline: "Design & Engineering",
    diagram: "table",
  },
  {
    eyebrow: "Q2 2026",
    title: "Thread design",
    line: "The conversation surface reworked.",
    role: "Leadership/Oversight",
    discipline: "Design",
    diagram: "thread",
  },
  {
    eyebrow: "Q3 2026",
    title: "Application shell",
    line: "The culmination, the shell itself.",
    role: "Player",
    discipline: "Design",
    diagram: "shell",
    emphasis: true,
  },
] as const;

function Diagram({ type }: { type: DiagramType }) {
  return (
    <div className={styles.diagram} aria-hidden="true">
      {type === "shell" ? (
        <>
          <div className={styles.diaTopBar} />
          <div className={styles.diaRail} />
        </>
      ) : null}
      {type === "cards" ? (
        <>
          <div className={styles.diaTopBar} />
          <div className={styles.diaCardGrid}>
            {["a", "b", "c", "d", "e", "f"].map((k) => (
              <div className={styles.diaCard} key={k} />
            ))}
          </div>
        </>
      ) : null}
      {type === "table" ? (
        <>
          <div className={styles.diaTopBar} />
          <div className={styles.diaTableHeader} />
          {[
            { top: 28, chip: false },
            { top: 44, chip: true },
            { top: 60, chip: false },
            { top: 76, chip: false },
          ].map((row) => (
            <div className={styles.diaTableRow} style={{ top: `${row.top}%` }} key={row.top}>
              {row.chip ? <span className={styles.diaChip} /> : null}
            </div>
          ))}
        </>
      ) : null}
      {type === "thread"
        ? [
            { top: 10, w: 55, left: true },
            { top: 28, w: 70, left: false },
            { top: 46, w: 40, left: true },
            { top: 62, w: 65, left: false },
            { top: 80, w: 35, left: true },
          ].map((m) => (
            <div
              key={m.top}
              className={styles.diaMessage}
              style={{
                top: `${m.top}%`,
                width: `${m.w}%`,
                left: m.left ? "4%" : undefined,
                right: m.left ? undefined : "4%",
              }}
            />
          ))
        : null}
    </div>
  );
}

export function ShellSequencing() {
  return (
    <ol className={styles.strip}>
      {STEPS.map((s) => (
        <li className={styles.item} key={s.eyebrow}>
          <div className={classNames(styles.card, s.emphasis && styles.cardAccent)}>
            <span className={styles.eyebrow}>{s.eyebrow}</span>
            <h3 className={classNames(styles.title, s.emphasis && styles.titleAccent)}>
              {s.title}
            </h3>
            <Diagram type={s.diagram} />
            <p className={styles.line}>{s.line}</p>
            <div className={classNames(styles.bottom, s.emphasis && styles.bottomAccent)}>
              <span className={classNames(styles.role, s.emphasis && styles.roleAccent)}>
                {s.role}
              </span>
              <span className={styles.discipline}>{s.discipline}</span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
