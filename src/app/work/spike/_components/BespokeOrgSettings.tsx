"use client";

import { useState } from "react";
import { FiCheck, FiChevronDown, FiGlobe } from "react-icons/fi";
import styles from "./BespokeOrgSettings.module.css";

const LANGS = ["French", "German", "Spanish", "Italian"];

export function BespokeOrgSettings() {
  const [selected, setSelected] = useState<string[]>(["French", "German"]);
  const toggle = (l: string) =>
    setSelected((s) => (s.includes(l) ? s.filter((x) => x !== l) : [...s, l]));

  return (
    <div className={styles.frame}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <FiGlobe />
        </span>
        <div className={styles.headerText}>
          <h3>Localization</h3>
          <p>Set the default language and formats for your organization.</p>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.field}>
          <div className={styles.fieldTop}>
            <span className={styles.label}>Business language</span>
            <span className={styles.hint}>Default for new teammates</span>
          </div>
          <div className={styles.select}>
            <select defaultValue="French" aria-label="Business language">
              <option>English</option>
              <option>French</option>
              <option>German</option>
            </select>
            <FiChevronDown className={styles.chevron} />
          </div>
        </div>

        <div className={styles.field}>
          <div className={styles.fieldTop}>
            <span className={styles.label}>Regional format</span>
            <span className={styles.hint}>Numbers, dates, currency</span>
          </div>
          <div className={styles.select}>
            <select defaultValue="France" aria-label="Regional format">
              <option>United States</option>
              <option>France</option>
              <option>Germany</option>
            </select>
            <FiChevronDown className={styles.chevron} />
          </div>
        </div>

        <div className={styles.field}>
          <div className={styles.fieldTop}>
            <span className={styles.label}>Localization languages</span>
            <span className={styles.hint}>{selected.length} selected</span>
          </div>
          <div className={styles.chips}>
            {LANGS.map((l) => {
              const on = selected.includes(l);
              return (
                <button
                  key={l}
                  type="button"
                  className={styles.chip}
                  data-on={on}
                  aria-pressed={on}
                  onClick={() => toggle(l)}
                >
                  <span className={styles.chipDot}>{on ? <FiCheck /> : null}</span>
                  {l}
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.field}>
          <div className={styles.preview}>
            <div className={styles.previewHead}>Preview · France</div>
            <div className={styles.previewRow}>
              <span className={styles.k}>Date</span>
              <span className={styles.v}>15 sept. 2026</span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.k}>Number</span>
              <span className={styles.v}>5 123 456,59</span>
            </div>
            <div className={styles.previewRow}>
              <span className={styles.k}>Currency</span>
              <span className={styles.v}>145,79 €</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.dirty}>Unsaved changes</span>
        <button type="button" className={styles.save}>
          Save changes
        </button>
      </div>
    </div>
  );
}
