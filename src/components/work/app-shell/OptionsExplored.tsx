import styles from "./OptionsExplored.module.css";

// Static illustration for the new "Options explored" beat: three directions
// considered before landing on the rail + full-height details bar, each with
// a description, pros/cons, a shared success-criteria checklist, and a small
// schematic diagram of its layout. No interactivity — a first draft for
// review (Jason, 2026-09-03).

type CriterionId = "noShift" | "actionsSeparate" | "scales" | "allVisible" | "fullHeight";

const CRITERIA: { id: CriterionId; label: string }[] = [
  { id: "noShift", label: "No layout shift when switching categories" },
  { id: "actionsSeparate", label: "Actions kept separate from content" },
  { id: "scales", label: "Scales to at least 12 categories" },
  { id: "allVisible", label: "Every category visible at a glance" },
  { id: "fullHeight", label: "Maximize vertical height available for content" },
];

type OptionId = "accordion" | "buttons" | "dropdown";

const OPTIONS: {
  id: OptionId;
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  meets: Record<CriterionId, boolean>;
}[] = [
  {
    id: "accordion",
    title: "Scrolling accordion",
    description:
      "Keep the existing pattern, but let the panel itself scroll instead of trying to make every header fit on screen.",
    pros: [
      "Familiar: no new interaction to learn",
      "Smallest engineering change from the existing shell",
      "Every category stays visible, even collapsed",
    ],
    cons: [
      "Expanding or collapsing a section shifts everything below it",
      "Actions for a category are mixed in with its content, not separated",
    ],
    meets: {
      noShift: false,
      actionsSeparate: false,
      scales: false,
      allVisible: true,
      fullHeight: true,
    },
  },
  {
    id: "buttons",
    title: "Vertical navigation buttons",
    description:
      "An icon button with a hover/focus label for each category is positioned vertically on the left or right, and selecting one swaps the content shown beside it.",
    pros: [
      "One category shown at a time, at full panel height",
      "Switching categories never shifts the page",
      "Consistent location of information triggers",
    ],
    cons: ["Icons take time to learn, slowing adjusters down at first"],
    meets: {
      noShift: true,
      actionsSeparate: true,
      scales: true,
      allVisible: true,
      fullHeight: true,
    },
  },
  {
    id: "dropdown",
    title: "Dropdown at the title",
    description:
      "One dropdown in the panel header; choosing a value swaps the content below it. There is no persistent category list.",
    pros: [
      "Minimal chrome: nearly the whole panel is content",
      "Scales to any number of categories without adding UI",
      "One familiar control to learn",
    ],
    cons: [
      "Hides the full list of categories: nothing to scan without opening it",
      "Per-category badges and counts aren't visible until it's open",
      "Additional clicks are required to expand and trigger",
    ],
    meets: {
      noShift: true,
      actionsSeparate: true,
      scales: true,
      allVisible: false,
      fullHeight: true,
    },
  },
];

function OptionDiagram({ variant }: { variant: OptionId }) {
  if (variant === "accordion") {
    return (
      <div className={styles.diagram} aria-hidden="true">
        <div className={styles.accHeader}>Details</div>
        <div className={styles.accHeaderOpen}>
          <span>Content</span>
          <span className={styles.accActions}>Actions</span>
        </div>
        <div className={styles.accHeader} />
        <div className={styles.accHeader} />
      </div>
    );
  }
  if (variant === "buttons") {
    return (
      <div className={styles.diagram} aria-hidden="true">
        <div className={styles.contentHeader}>
          <span>Details</span>
          <span>Actions</span>
        </div>
        <div className={styles.diagramBody}>
          <div className={styles.iconRail}>
            <span className={styles.iconBtn} />
            <span className={styles.iconBtn} />
            <span className={styles.iconBtn} />
            <span className={styles.iconBtn} />
          </div>
          <div className={styles.btnContent}>Content</div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.diagram} aria-hidden="true">
      <div className={styles.ddHeader}>
        <span className={styles.ddControl}>Details ▾</span>
        <span>Actions</span>
      </div>
      <div className={styles.ddContent}>Content</div>
    </div>
  );
}

export function OptionsExplored() {
  return (
    <div className={styles.root}>
      {OPTIONS.map((option) => (
        <div className={styles.option} key={option.id}>
          <div className={styles.optionMain}>
            <h3 className={styles.optionTitle}>{option.title}</h3>
            <p className={styles.optionDesc}>{option.description}</p>

            <div className={styles.listsRow}>
              <div>
                <p className={styles.listHeading}>Pros</p>
                <ul className={styles.prosList}>
                  {option.pros.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={styles.listHeading}>Cons</p>
                <ul className={styles.consList}>
                  {option.cons.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            <ul className={styles.criteriaList}>
              {CRITERIA.map((c) => {
                const pass = option.meets[c.id];
                return (
                  <li key={c.id} className={styles.criteriaRow}>
                    <span className={`${styles.pill} ${pass ? styles.pillDo : styles.pillDont}`}>
                      <span aria-hidden="true">{pass ? "✓" : "✗"}</span>
                      {pass ? "Meets" : "Doesn't meet"}
                    </span>
                    <span className={styles.criteriaLabel}>{c.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.optionAside}>
            <OptionDiagram variant={option.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
