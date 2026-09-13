import styles from "./CareerStrip.module.css";

// New, static intro figure (data-model.md §3): the architecture-to-Hi-Marley
// thread, plus the leadership shape in numbers. No proprietary specifics —
// safe for a repo that is public even though the URL is not.
type Stop = { label: string; title: string; line: string; emphasis?: boolean };

const STOPS: readonly Stop[] = [
  {
    label: "Manufacturing",
    title: "Dassault Systèmes",
    line: "PM and design lead for a new industry push into architecture, engineering, and construction: 12 apps, one launched, one in beta, one in development.",
  },
  {
    label: "Pharma",
    title: "Vertex Pharmaceuticals",
    line: "Built the Experience Design team from zero to turn 300+ internal apps into platforms across biology, chemistry, clinical trials, and the C-suite.",
  },
  {
    label: "MarTech",
    title: "Klaviyo",
    line: "Helped build the design org: Design Systems, Content Design, Internationalization, and Growth.",
  },
  {
    label: "InsurTech",
    title: "Hi Marley",
    line: "Leading design and product operations for an insurtech communications platform.",
    emphasis: true,
  },
];

export function CareerStrip() {
  return (
    <div className={styles.wrap}>
      <ol className={styles.strip} style={{ gridTemplateColumns: `repeat(${STOPS.length}, 1fr)` }}>
        {STOPS.map((s, i) => (
          <li className={styles.item} key={s.title}>
            <div className={`${styles.card} ${s.emphasis ? styles.cardAccent : ""}`}>
              <span className={styles.eyebrow}>{s.label}</span>
              <h3 className={`${styles.title} ${s.emphasis ? styles.titleAccent : ""}`}>
                {s.title}
              </h3>
              <p className={styles.line}>{s.line}</p>
            </div>
            {i < STOPS.length - 1 ? (
              <span className={styles.connector} aria-hidden="true">
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      <p className={styles.caption}>
        Fifteen years in design, twelve leading teams, three built from zero, up to fifteen direct
        reports including managers, an organization of eighty held through a transition. Hypoth runs
        alongside as an independent studio.
      </p>
    </div>
  );
}
