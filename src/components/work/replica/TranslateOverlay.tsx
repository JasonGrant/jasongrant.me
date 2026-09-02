import classNames from "classnames";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import styles from "./TranslateOverlay.module.css";

// Languages offered here are the org-selected content languages, with the
// audience's preferred-language share (fictional data). French + German are
// pre-checked, matching the study's continuity rule.
const LANGS = [
  { name: "French", pct: "22%", checked: true },
  { name: "German", pct: "17%", checked: true },
  { name: "Spanish", pct: "11%", checked: false },
  { name: "Polish", pct: "11%", checked: false },
  { name: "Italian", pct: "11%", checked: false },
];

const LEGEND = [
  { name: "German", color: "#eab308" },
  { name: "French", color: "#43a878" },
  { name: "English", color: "#3b7dd8" },
  { name: "Default (English)", color: "#cbd0d6" },
];

// The "Select languages" overlay that opens from the editor's Translate button
// (a sanitized recreation of the Klaviyo translate flow; fictional data).
// Rendered inside CampaignEditor's frame so it dims the editor behind it.
export function TranslateOverlay() {
  return (
    <div className={styles.overlay}>
      <div className={styles.scrim} />
      {/* biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable region needs keyboard access */}
      <div className={styles.panel} tabIndex={0} aria-label="Select languages">
        <div className={styles.header}>
          <div className={styles.headText}>
            <h3 className={styles.title}>Select languages</h3>
            <p className={styles.sub}>
              It&rsquo;s recommended you wait until your message is ready to send before
              translating.
            </p>
          </div>
          <div className={styles.headActions}>
            <span className={styles.cancelBtn}>Cancel</span>
            <span className={styles.translateBtn}>Translate</span>
          </div>
        </div>

        <div className={styles.grid}>
          {/* biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable region needs keyboard access */}
          <div className={styles.left} tabIndex={0} aria-label="Language options">
            <p className={styles.fieldLabel}>Written in</p>
            <div className={styles.select}>
              <span>English</span>
              <FiChevronDown aria-hidden="true" />
            </div>

            <p className={styles.fieldLabel}>Translate to</p>
            <div className={styles.langList}>
              {LANGS.map((l) => (
                <div
                  key={l.name}
                  className={classNames(styles.langRow, l.checked && styles.langRowOn)}
                >
                  <span
                    className={classNames(styles.checkbox, l.checked && styles.checkboxOn)}
                    aria-hidden="true"
                  >
                    {l.checked ? <FiCheck /> : null}
                  </span>
                  <span className={styles.langName}>{l.name}</span>
                  <span className={styles.pct}>{l.pct}</span>
                </div>
              ))}
            </div>

            <p className={styles.fieldLabel}>Additional languages</p>
            <div className={styles.select}>
              <span className={styles.selectPh}>Select one or more options</span>
              <FiChevronDown aria-hidden="true" />
            </div>

            <p className={styles.fieldLabel}>Default language</p>
            <p className={styles.fieldHelp}>
              Recipients see the fallback if their preferred language is not available.
            </p>
            <div className={styles.select}>
              <span>English</span>
              <FiChevronDown aria-hidden="true" />
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.card}>
              <h4 className={styles.cardTitle}>Profiles receiving preferred language</h4>
              <div className={styles.legend}>
                {LEGEND.map((it) => (
                  <span key={it.name} className={styles.legendItem}>
                    <span
                      className={styles.legendBox}
                      style={{ background: it.color }}
                      aria-hidden="true"
                    >
                      <FiCheck />
                    </span>
                    {it.name}
                  </span>
                ))}
              </div>
              <div className={styles.donutWrap}>
                <div className={styles.donut} aria-hidden="true" />
                <div className={styles.donutCenter}>
                  <span className={styles.donutPct}>67%</span>
                  <span className={styles.donutLabel}>Profiles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
