import styles from "./SkillThroughline.module.css";

// A custom "thread" chart: one continuous line per skill, split into two
// lobes (a named top half and bottom half) that thicken independently with
// how much weight that half carried at each stop in Jason's career. Built as
// a concept sketch first (see the deck's reply), then ported here verbatim —
// same geometry, same 0–3 scale, same self-rated numbers.

interface Company {
  name: string;
  sub: string;
}

interface Lane {
  label: string;
  topLabel: string;
  bottomLabel: string;
  /** 0–3 per company, in COMPANIES order. 0 collapses the lobe into the line. */
  top: number[];
  bottom: number[];
}

const COMPANIES: Company[] = [
  { name: "Dassault Systèmes", sub: "Computer-Aided Design" },
  { name: "Vertex Pharmaceuticals", sub: "Pharma" },
  { name: "Klaviyo", sub: "Martech" },
  { name: "Hi Marley", sub: "Insurtech" },
];

// Dassault only carries strategy/definition and handoff/feedback ratings;
// its other three lanes stay at 0 — no design systems, coding, or reports
// existed in that role.
const LANES: Lane[] = [
  {
    label: "Strategy & definition",
    topLabel: "Strategy",
    bottomLabel: "Definition",
    top: [3, 2, 1, 3],
    bottom: [1, 1, 2, 1],
  },
  {
    label: "Design",
    topLabel: "Handoff",
    bottomLabel: "Feedback",
    top: [2, 2, 1, 2],
    bottom: [0, 1, 3, 2],
  },
  {
    label: "User research",
    topLabel: "Qualitative",
    bottomLabel: "Quantitative",
    top: [3, 3, 1, 1],
    bottom: [1, 1, 3, 1],
  },
  {
    label: "Design systems",
    topLabel: "Components",
    bottomLabel: "Documentation",
    top: [0, 2, 3, 2],
    bottom: [0, 1, 3, 1],
  },
  {
    label: "Coding",
    topLabel: "Prototype",
    bottomLabel: "Production",
    top: [0, 2, 1, 3],
    bottom: [0, 3, 0, 3],
  },
  {
    label: "Operations",
    topLabel: "Career",
    bottomLabel: "Processes",
    top: [0, 1, 2, 1],
    bottom: [0, 1, 3, 3],
  },
];

// Px half-thickness per 0–3 score — 0 collapses the lobe fully into the line.
const HALF = [0, 7, 17, 24];

const CHART_X0 = 230;
const CHART_X1 = 1080;
const SEG_W = (CHART_X1 - CHART_X0) / COMPANIES.length;
const BOUNDARIES = Array.from({ length: COMPANIES.length + 1 }, (_, i) => CHART_X0 + i * SEG_W);
const BELLIES = Array.from({ length: COMPANIES.length }, (_, i) => CHART_X0 + (i + 0.5) * SEG_W);
const KEY_X = COMPANIES.flatMap((_, i) => [BOUNDARIES[i], BELLIES[i]]).concat(
  BOUNDARIES[COMPANIES.length],
);

const ROW_Y0 = 150;
const ROW_STEP = 78;
const LABEL_X = 40;
const CHART_BOTTOM = ROW_Y0 + (LANES.length - 1) * ROW_STEP + 40;

interface Pt {
  x: number;
  y: number;
}

// sign: -1 for the top edge (above centerline), +1 for the bottom edge.
function buildEdge(xs: number[], centerY: number, scores: number[], sign: 1 | -1): Pt[] {
  return xs.map((x, i) => {
    const half = i % 2 === 0 ? HALF[0] : HALF[scores[(i - 1) / 2]];
    return { x, y: centerY + sign * half };
  });
}

// Flat-tangent cubic beziers between consecutive points — the "waist/belly"
// wave shape from the concept sketch, not a hand-drawn curve.
function smoothPath(pts: Pt[], forward: boolean): string {
  const order = forward ? pts : [...pts].reverse();
  let d = `M ${order[0].x},${order[0].y} `;
  for (let i = 1; i < order.length; i++) {
    const p0 = order[i - 1];
    const p1 = order[i];
    const mx = (p0.x + p1.x) / 2;
    d += `C ${mx},${p0.y} ${mx},${p1.y} ${p1.x},${p1.y} `;
  }
  return d;
}

function lobePaths(lane: Lane, cy: number): { top: string; bottom: string } {
  const topPts = buildEdge(KEY_X, cy, lane.top, -1);
  const botPts = buildEdge(KEY_X, cy, lane.bottom, 1);
  const baseline = KEY_X.map((x) => ({ x, y: cy }));
  return {
    top: `${smoothPath(topPts, true)}${smoothPath(baseline, false).replace(/^M /, "L ")}Z`,
    bottom: `${smoothPath(baseline, true)}${smoothPath(botPts, false).replace(/^M /, "L ")}Z`,
  };
}

export function SkillThroughline() {
  return (
    <figure className={styles.wrap}>
      <svg viewBox={`0 0 1100 ${CHART_BOTTOM + 20}`} className={styles.svg} aria-hidden="true">
        <line x1={CHART_X0} y1={108} x2={CHART_X1} y2={108} className={styles.headerRule} />
        {COMPANIES.map((c, i) => (
          <g key={c.name}>
            <text x={BELLIES[i]} y={78} textAnchor="middle" className={styles.coName}>
              {c.name}
            </text>
            <text x={BELLIES[i]} y={96} textAnchor="middle" className={styles.coSub}>
              {c.sub}
            </text>
          </g>
        ))}
        {BOUNDARIES.slice(1, -1).map((x) => (
          <line key={x} x1={x} y1={108} x2={x} y2={CHART_BOTTOM} className={styles.boundaryRule} />
        ))}
        {LANES.map((lane, li) => {
          const cy = ROW_Y0 + li * ROW_STEP;
          const { top, bottom } = lobePaths(lane, cy);
          return (
            <g key={lane.label}>
              <path d={top} className={styles.lobeTop} />
              <path d={bottom} className={styles.lobeBottom} />
              {/* The centerline runs into the label column too, splitting the
                  category name (above) from its two keys (below) — the same
                  divider that splits each lane's lobes. */}
              <line x1={16} y1={cy} x2={CHART_X0} y2={cy} className={styles.laneRule} />
              <text x={LABEL_X} y={cy - 10} className={styles.laneLabel}>
                {lane.label}
              </text>
              <rect x={LABEL_X} y={cy + 8} width={8} height={8} rx={2} className={styles.chipTop} />
              <text x={LABEL_X + 14} y={cy + 16} className={styles.laneSub}>
                {lane.topLabel}
              </text>
              <rect
                x={LABEL_X}
                y={cy + 24}
                width={8}
                height={8}
                rx={2}
                className={styles.chipBottom}
              />
              <text x={LABEL_X + 14} y={cy + 32} className={styles.laneSub}>
                {lane.bottomLabel}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
