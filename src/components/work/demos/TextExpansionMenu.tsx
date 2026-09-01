import { FiChevronDown } from "react-icons/fi";
import styles from "./TextExpansionMenu.module.css";
import { TEXT_EXPANSION_MENU as M } from "./facts";

// Static diagram: the same four-item menu in four languages. Each panel is
// sized to its own longest item, so the width swing across languages is the
// point — Italian needs roughly three times the width Korean does.
export function TextExpansionMenu() {
  return (
    <div className={`workDemoCard ${styles.card}`}>
      <div className={styles.head}>
        <h3 className={styles.title}>Text expansion in a menu</h3>
        <p className={styles.caption}>
          The same four-item menu in four languages. The panel has to be as wide as its longest
          item, so a menu sized for Korean or English simply can&rsquo;t hold the Italian.
        </p>
      </div>
      <div
        className={styles.scroll}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: focusable so keyboard users can scroll the wide diagram (WCAG scrollable-region-focusable)
        tabIndex={0}
        role="group"
        aria-label="The same menu across four languages"
      >
        <div className={styles.menus}>
          {M.menus.map((m) => (
            <div key={m.lang} className={styles.menuRow}>
              <span className={styles.lang}>{m.lang}</span>
              <div className={styles.menu}>
                <span className={styles.trigger}>
                  {m.trigger}
                  <FiChevronDown className={styles.chevron} aria-hidden="true" />
                </span>
                <ul className={styles.panel}>
                  {m.items.map((item) => (
                    <li key={item} className={styles.item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
