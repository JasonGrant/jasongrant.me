import styles from "./InitiativeVenn.module.css";

// The three initiative owners, Venn'd around the one thing all three roles
// had to agree on. Each name links out to that person's own public
// LinkedIn profile — real, meaningful links, so the <svg> is NOT
// aria-hidden; assistive tech reaches them like any other link. The slide's
// own staticDescription states the "i18n at the center" point in words for
// anyone who can't see the diagram.
const PEOPLE = [
  {
    name: "Daniel Kezerashvili",
    title: "Director of Engineering",
    href: "https://www.linkedin.com/in/dankez/",
    x: 320,
    y: 68,
  },
  {
    name: "Evan Eisert",
    title: "Director of Product",
    href: "https://www.linkedin.com/in/evaneisert/",
    x: 170,
    y: 320,
  },
  {
    name: "Jason Grant",
    title: "Director of Design",
    href: "https://www.linkedin.com/in/mrjasongrant",
    x: 470,
    y: 320,
  },
];

// The three pairwise overlaps — what each two-role intersection actually
// owned on this initiative. The triple overlap (all three circles) carries
// "i18n" instead, below.
const OVERLAPS = [
  { lines: ["Translation", "platform"], x: 229, y: 184 },
  { lines: ["Component", "library team"], x: 405, y: 186 },
  { lines: ["Product", "plan"], x: 315, y: 352 },
];

export function InitiativeVenn() {
  return (
    <figure className={styles.wrap}>
      {/* viewBox y-min is -90, not 0: the drawn content (circles + labels)
          spans y 0–460 inside a nominally 640-tall box, so a 0-0-640-640
          viewBox left 180 units of dead space entirely below the content.
          No amount of CSS centering on the <svg> element fixes that — the
          browser centers the whole declared viewBox rectangle, not the
          content's own bounding box, so the visible drawing always sat near
          the top. Shifting the viewBox origin up by half that slack (90)
          centers the content within the box instead. */}
      <svg viewBox="0 -90 640 640" className={styles.svg}>
        {/* A <title>, not role="img": the SVG holds real links, so it must
            not be flattened into a single opaque image for assistive tech. */}
        <title>
          Venn diagram of the three initiative owners: engineering and product overlap on the
          translation platform, engineering and design overlap on the component library team,
          product and design overlap on the product plan, and all three overlap at
          internationalization
        </title>
        <circle cx="320" cy="160" r="160" className={styles.circle} />
        <circle cx="210" cy="300" r="160" className={styles.circle} />
        <circle cx="420" cy="300" r="160" className={styles.circle} />
        <text x="320" y="255" textAnchor="middle" className={styles.centerLabel}>
          i18n
        </text>
        {OVERLAPS.map((o) => (
          <text
            key={o.lines.join(" ")}
            x={o.x}
            y={o.y}
            textAnchor="middle"
            className={styles.overlapLabel}
          >
            {o.lines.map((line, i) => (
              <tspan x={o.x} dy={i === 0 ? 0 : "1.15em"} key={line}>
                {line}
              </tspan>
            ))}
          </text>
        ))}
        {PEOPLE.map((p) => (
          <g key={p.name}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name}'s LinkedIn profile`}
              className={styles.personLink}
            >
              <text x={p.x} y={p.y} textAnchor="middle" className={styles.personName}>
                {p.name}
              </text>
            </a>
            <text x={p.x} y={p.y + 26} textAnchor="middle" className={styles.personTitle}>
              {p.title}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
