"use client";

import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import styles from "./WordOrderDemo.module.css";
import { WORD_ORDER_FACTS as F } from "./facts";

type Lang = "en" | "de" | "fr";

export function WordOrderDemo() {
  const [lang, setLang] = useState<Lang>("en");
  const I = F.inputs;
  const L = F.links;

  return (
    <div className={`workDemoCard ${styles.demo}`}>
      <div className={styles.langRow}>
        <span className={styles.langLabel}>Language</span>
        <div className={styles.segmented} role="group" aria-label="Preview language">
          {F.languages.map((l) => (
            <button
              key={l.code}
              type="button"
              className={styles.seg}
              aria-pressed={lang === l.code}
              onClick={() => setLang(l.code as Lang)}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs in a sentence */}
      <section className={styles.part}>
        <h3 className={styles.partTitle}>An input inside a sentence</h3>
        <div className={styles.pair}>
          <div className={styles.example}>
            <div className={styles.ui}>
              <span className={styles.fieldLabel}>{I.label[lang]}</span>
              <span className={styles.fieldHelp}>{I.labelHelp[lang]}</span>
              <span className={styles.inputRow}>
                <span className={styles.miniInput}>{I.control}</span>
                <span className={styles.unit}>{I.unit[lang]}</span>
              </span>
            </div>
            <div className={styles.verdictRow}>
              <p className={styles.verdict} data-kind="do">
                <span aria-hidden="true">✓</span> Do
              </p>
              <p className={styles.caption}>Labeled, out of the sentence.</p>
            </div>
          </div>

          <div className={styles.example}>
            <div className={styles.ui}>
              <p className={styles.sentence}>
                {I.dont[lang].before} <span className={styles.miniInput}>{I.control}</span>{" "}
                {I.dont[lang].after}
              </p>
            </div>
            <div className={styles.verdictRow}>
              <p className={styles.verdict} data-kind="dont">
                <span aria-hidden="true">✗</span> Don&rsquo;t
              </p>
              <p className={styles.caption}>Word order strands it.</p>
            </div>
          </div>
        </div>
        <p className={styles.helper} aria-live="polite">
          {I.helper[lang]}
        </p>
      </section>

      <hr className={styles.divider} />

      {/* Links in a sentence */}
      <section className={styles.part}>
        <h3 className={styles.partTitle}>A link inside a sentence</h3>
        <div className={styles.pair}>
          <div className={styles.example}>
            <div className={styles.ui}>
              <p className={styles.sentence}>{L.doText[lang]}</p>
              <span className={styles.link}>
                {L.doLink[lang]}
                <FiArrowUpRight aria-hidden="true" />
              </span>
            </div>
            <div className={styles.verdictRow}>
              <p className={styles.verdict} data-kind="do">
                <span aria-hidden="true">✓</span> Do
              </p>
              <p className={styles.caption}>Link on its own line.</p>
            </div>
          </div>

          <div className={styles.example}>
            <div className={styles.ui}>
              <p className={styles.sentence}>
                {L.dont[lang].before}{" "}
                <span className={styles.linkInline}>{L.dont[lang].anchor}</span>{" "}
                {L.dont[lang].after}
              </p>
            </div>
            <div className={styles.verdictRow}>
              <p className={styles.verdict} data-kind="dont">
                <span aria-hidden="true">✗</span> Don&rsquo;t
              </p>
              <p className={styles.caption}>Its text won&rsquo;t hold.</p>
            </div>
          </div>
        </div>
        <p className={styles.helper} aria-live="polite">
          {L.helper[lang]}
        </p>
        <ul className={styles.benefits}>
          {L.benefits.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
