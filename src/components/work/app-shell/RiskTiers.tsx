import styles from "./RiskTiers.module.css";

// Static server component: change tiered by positional-memory disruption. Flat
// figure on the dark site page — no props, no state, no interactivity. Cards
// are visually uniform; the tier lives in the label text, not in color.

type Tier = {
  label: string;
  heading: string;
  line: string;
};

const TIERS: readonly Tier[] = [
  {
    label: "High risk",
    heading: "Relocations with muscle memory",
    line: "Create case and case actions move. Handled deliberately and absorbed by an internal-only release before any carrier saw it.",
  },
  {
    label: "Medium risk",
    heading: "Consolidations",
    line: "Several areas combined into one, without changing where their triggers live.",
  },
  {
    label: "Low risk",
    heading: "Component swaps",
    line: "Templates replace overlays: same location, same flow, a different component.",
  },
];

export function RiskTiers() {
  return (
    <div className={styles.wrap}>
      <ol className={styles.tiers}>
        {TIERS.map((tier) => (
          <li className={styles.card} key={tier.label}>
            <span className={styles.label}>{tier.label}</span>
            <h3 className={styles.heading}>{tier.heading}</h3>
            <p className={styles.line}>{tier.line}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
