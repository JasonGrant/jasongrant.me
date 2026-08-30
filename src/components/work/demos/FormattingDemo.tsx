"use client";

import { useEffect, useState } from "react";
import styles from "./FormattingDemo.module.css";
import { FORMATTING_FACTS as F } from "./facts";

const CURRENCY_BY_LOCALE: Record<string, string> = {
  "en-US": "USD",
  "de-DE": "EUR",
  "fr-FR": "EUR",
  "fr-CA": "CAD",
  "it-CH": "CHF",
  "cs-CZ": "CZK",
  "tr-TR": "TRY",
  "ja-JP": "JPY",
  "ko-KR": "KRW",
  "pl-PL": "PLN",
  "ar-KW": "KWD",
};

// Best-effort SSR-safe placeholders — identical on server and first client
// render, so there is no hydration mismatch. Real Intl.NumberFormat output
// (computed client-side in useEffect below) replaces these once mounted;
// any small inaccuracy here is invisible after that swap (research D10 —
// never compare pinned constants against live output as a correctness
// check, they exist only to avoid a render-time flash of unformatted data).
const SSR_PLACEHOLDER: Record<
  string,
  { number: string; percent: string; currency: string; compact: string }
> = {
  "en-US": { number: "5,123,456.59", percent: "59.8%", currency: "$145.79", compact: "$23K" },
  "de-DE": { number: "5.123.456,59", percent: "59,8 %", currency: "145,79 €", compact: "23.000 €" },
  "fr-FR": { number: "5 123 456,59", percent: "59,8 %", currency: "145,79 €", compact: "23 k€" },
  "fr-CA": { number: "5 123 456,59", percent: "59,8 %", currency: "145,79 $", compact: "23 k$" },
  "it-CH": { number: "5’123’456.59", percent: "59.8%", currency: "CHF 145.79", compact: "CHF 23k" },
  "cs-CZ": {
    number: "5 123 456,59",
    percent: "59,8 %",
    currency: "145,79 Kč",
    compact: "23 tis. Kč",
  },
  "tr-TR": { number: "5.123.456,59", percent: "%59,8", currency: "₺145,79", compact: "23 B ₺" },
  "ja-JP": { number: "5,123,456.59", percent: "59.8%", currency: "¥146", compact: "¥2.3万" },
  "ko-KR": { number: "5,123,456.59", percent: "59.8%", currency: "₩146", compact: "₩2.3만" },
  "pl-PL": {
    number: "5 123 456,59",
    percent: "59,8%",
    currency: "145,79 zł",
    compact: "23 tys. zł",
  },
  "ar-KW": {
    number: "٥٬١٢٣٬٤٥٦٫٥٩",
    percent: "٥٩٫٨٪",
    currency: "١٤٥٫٧٩٠ د.ك.‏",
    compact: "٢٣ ألف د.ك.‏",
  },
};

interface Row {
  number: string;
  percent: string;
  currency: string;
  compact: string;
  unsupported: boolean;
}

function computeLive(localeCode: string): Row {
  const currency = CURRENCY_BY_LOCALE[localeCode] ?? "USD";
  if (Intl.NumberFormat.supportedLocalesOf([localeCode]).length === 0) {
    return { number: "", percent: "", currency: "", compact: "", unsupported: true };
  }
  return {
    number: new Intl.NumberFormat(localeCode).format(F.sampleNumber),
    percent: new Intl.NumberFormat(localeCode, {
      style: "percent",
      minimumFractionDigits: 1,
    }).format(F.samplePercent),
    currency: new Intl.NumberFormat(localeCode, { style: "currency", currency }).format(
      F.sampleCurrency,
    ),
    compact: new Intl.NumberFormat(localeCode, {
      style: "currency",
      currency,
      notation: "compact",
    }).format(F.sampleCompactCurrency),
    unsupported: false,
  };
}

export function FormattingDemo() {
  const [localeCode, setLocaleCode] = useState<string>(F.locales[0].code);
  const [live, setLive] = useState<Row | null>(null);

  useEffect(() => {
    setLive(computeLive(localeCode));
  }, [localeCode]);

  const placeholder = SSR_PLACEHOLDER[localeCode];
  const row = live ?? { ...placeholder, unsupported: false };
  const note = F.notes[localeCode];

  return (
    <div className={styles.demo}>
      <label htmlFor="locale-select">Locale</label>
      <select
        id="locale-select"
        className={styles.select}
        value={localeCode}
        onChange={(e) => setLocaleCode(e.target.value)}
      >
        {F.locales.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>

      {row.unsupported ? (
        <p className={styles.fallback}>This browser can&rsquo;t format {localeCode}.</p>
      ) : (
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>Number</td>
              <td>
                <bdi>{row.number}</bdi>
              </td>
            </tr>
            <tr>
              <td>Percentage</td>
              <td>
                <bdi>{row.percent}</bdi>
              </td>
            </tr>
            <tr>
              <td>Currency</td>
              <td>
                <bdi>{row.currency}</bdi>
              </td>
            </tr>
            <tr>
              <td>Compact</td>
              <td>
                <bdi>{row.compact}</bdi>
              </td>
            </tr>
          </tbody>
        </table>
      )}

      <p className={styles.note} aria-live="polite">
        {note ?? "Formatted live via Intl.NumberFormat in your browser."}
      </p>
    </div>
  );
}
