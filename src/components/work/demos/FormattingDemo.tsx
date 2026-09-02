"use client";

import { formatLocaleSamples } from "@/components/work/localeFormat";
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
const SSR_PLACEHOLDER: Record<string, Omit<Row, "unsupported">> = {
  "en-US": {
    longDate: "Sep 30, 2023, 07:11:12 PM EDT",
    shortDate: "09/30/2023",
    number: "5,123,456.59",
    percent: "59.76%",
    currency: "$3,456.59",
    compact: "$23K",
  },
  "de-DE": {
    longDate: "30. Sept. 2023, 19:11:12 GMT-4",
    shortDate: "30.09.2023",
    number: "5.123.456,59",
    percent: "59,76 %",
    currency: "3.456,59 €",
    compact: "23.000 €",
  },
  "fr-FR": {
    longDate: "30 sept. 2023, 19:11:12 UTC−4",
    shortDate: "30/09/2023",
    number: "5 123 456,59",
    percent: "59,76 %",
    currency: "3 456,59 €",
    compact: "23 k €",
  },
  "fr-CA": {
    longDate: "30 sept. 2023, 19 h 11 min 12 s HAE",
    shortDate: "2023-09-30",
    number: "5 123 456,59",
    percent: "59,76 %",
    currency: "3 456,59 $",
    compact: "23 k$",
  },
  "it-CH": {
    longDate: "30 set 2023, 19:11:12 GMT-4",
    shortDate: "30.09.2023",
    number: "5’123’456.59",
    percent: "59.76%",
    currency: "CHF 3456.59",
    compact: "CHF 23’000",
  },
  "cs-CZ": {
    longDate: "30. 9. 2023 19:11:12 EDT",
    shortDate: "30. 09. 2023",
    number: "5 123 456,59",
    percent: "59,76 %",
    currency: "3 456,59 Kč",
    compact: "23 tis. Kč",
  },
  "tr-TR": {
    longDate: "30 Eyl 2023 19:11:12 GMT-4",
    shortDate: "30.09.2023",
    number: "5.123.456,59",
    percent: "%59,76",
    currency: "₺3.456,59",
    compact: "23 B ₺",
  },
  "ja-JP": {
    longDate: "2023年9月30日 19:11:12 GMT-4",
    shortDate: "2023/09/30",
    number: "5,123,456.59",
    percent: "59.76%",
    currency: "￥3,457",
    compact: "￥2.3万",
  },
  "ko-KR": {
    longDate: "2023년 9월 30일 오후 07시 11분 12초 GMT-4",
    shortDate: "2023. 09. 30.",
    number: "5,123,456.59",
    percent: "59.76%",
    currency: "₩3,457",
    compact: "₩2.3만",
  },
  "pl-PL": {
    longDate: "30 wrz 2023, 19:11:12 GMT-4",
    shortDate: "30.09.2023",
    number: "5 123 456,59",
    percent: "59,76%",
    currency: "3456,59 zł",
    compact: "23 tys. zł",
  },
  "ar-KW": {
    longDate: "٣٠ سبتمبر ٢٠٢٣، ٠٧:١١:١٢ م غرينتش-٤",
    shortDate: "٣٠‏/٠٩‏/٢٠٢٣",
    number: "٥٬١٢٣٬٤٥٦٫٥٩",
    percent: "٥٩٫٧٦٪؜",
    currency: "‏٣٬٤٥٦٫٥٩٠ د.ك.‏",
    compact: "٢٣ ألف د.ك.‏",
  },
};

interface Row {
  longDate: string;
  shortDate: string;
  number: string;
  percent: string;
  currency: string;
  compact: string;
  unsupported: boolean;
}

function computeLive(localeCode: string): Row {
  const currency = CURRENCY_BY_LOCALE[localeCode] ?? "USD";
  if (Intl.NumberFormat.supportedLocalesOf([localeCode]).length === 0) {
    return {
      longDate: "",
      shortDate: "",
      number: "",
      percent: "",
      currency: "",
      compact: "",
      unsupported: true,
    };
  }
  return { ...formatLocaleSamples({ formatLocale: localeCode, currency }), unsupported: false };
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
    <div className={`workDemoCard ${styles.demo}`}>
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
              <td>Date &amp; time</td>
              <td>
                <bdi>{row.longDate}</bdi>
              </td>
            </tr>
            <tr>
              <td>Short date</td>
              <td>
                <bdi>{row.shortDate}</bdi>
              </td>
            </tr>
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
