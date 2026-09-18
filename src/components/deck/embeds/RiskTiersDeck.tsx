import styles from "./RiskTiersDeck.module.css";

// Deck-only copy of work/app-shell/RiskTiers, enlarged for the stage rather
// than the site's three-column body-copy card. Kept as a full copy — not a
// wrapped import — so its type scale can diverge freely from the site's
// without touching the public case study.

type Example = {
  heading: string;
  line: string;
};

type Tier = {
  label: string;
  examples: Example[];
};

const TIERS: readonly Tier[] = [
  {
    label: "High risk",
    examples: [
      {
        heading: "Relocations with muscle memory",
        line: "Create case and case actions move. Handled deliberately and absorbed by an internal-only release before any carrier saw it.",
      },
    ],
  },
  {
    label: "Medium risk",
    examples: [
      {
        heading: "Consolidations",
        line: "Several areas combined into one, without changing where their triggers live.",
      },
    ],
  },
  {
    label: "Low risk",
    examples: [
      {
        heading: "Component swaps",
        line: "Templates replace overlays and legacy components move to the design system: same location, same flow, a different component.",
      },
    ],
  },
];

export function RiskTiersDeck() {
  return (
    <div className={styles.wrap}>
      <ol className={styles.tiers}>
        {TIERS.map((tier) => (
          <li className={styles.card} key={tier.label}>
            <span className={styles.label}>{tier.label}</span>
            {tier.examples.map((example) => (
              <div className={styles.example} key={example.heading}>
                <h3 className={styles.heading}>{example.heading}</h3>
                <p className={styles.line}>{example.line}</p>
              </div>
            ))}
          </li>
        ))}
      </ol>
    </div>
  );
}
