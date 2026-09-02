"use client";

import { useState } from "react";
import { FiCheck, FiGlobe } from "react-icons/fi";
import styles from "./BespokeOrgSettings.module.css";
import { Dropdown } from "./Dropdown";

const LANGS = ["French", "German", "Spanish", "Italian"];
const REGIONS = ["United States", "France", "Germany"];
const LOCALE: Record<string, { code: string; currency: string }> = {
  "United States": { code: "en-US", currency: "USD" },
  France: { code: "fr-FR", currency: "EUR" },
  Germany: { code: "de-DE", currency: "EUR" },
};
const SAMPLE_DATE = new Date(2026, 8, 15);

export function BespokeOrgSettings() {
  const [businessLang, setBusinessLang] = useState("French");
  const [region, setRegion] = useState("France");
  const [selected, setSelected] = useState<string[]>(["French", "German", "Spanish"]);
  const toggle = (l: string) =>
    setSelected((s) => (s.includes(l) ? s.filter((x) => x !== l) : [...s, l]));

  const { code, currency } = LOCALE[region];
  const preview = [
    ["Date", new Intl.DateTimeFormat(code, { dateStyle: "medium" }).format(SAMPLE_DATE)],
    ["Number", new Intl.NumberFormat(code).format(5123456.59)],
    ["Currency", new Intl.NumberFormat(code, { style: "currency", currency }).format(145.79)],
  ];

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
          <Dropdown
            label="Business language"
            value={businessLang}
            options={["English", "French", "German"]}
            onChange={setBusinessLang}
          />
        </div>

        <div className={styles.field}>
          <div className={styles.fieldTop}>
            <span className={styles.label}>Regional format</span>
            <span className={styles.hint}>Numbers, dates, currency</span>
          </div>
          <Dropdown label="Regional format" value={region} options={REGIONS} onChange={setRegion} />
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
            <div className={styles.previewHead}>Preview · {region}</div>
            {preview.map(([k, v]) => (
              <div key={k} className={styles.previewRow}>
                <span className={styles.k}>{k}</span>
                <span className={styles.v}>{v}</span>
              </div>
            ))}
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
