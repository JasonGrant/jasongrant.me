"use client";

import { type CSSProperties, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./TextExpansionButtons.module.css";
import { TEXT_EXPANSION_BUTTON as B } from "./facts";

// Layout effect on the client (measure + re-sort before paint, no shift); plain
// effect on the server so SSR doesn't warn.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// Pre-measurement fallback only: CJK / kana / hangul glyphs render about twice
// as wide as a Latin letter. The real order comes from measuring the rendered
// buttons (below), because actual width depends on the viewer's fallback font.
function visualWidth(s: string): number {
  let w = 0;
  for (const ch of s) {
    const cp = ch.codePointAt(0) ?? 0;
    const wide =
      (cp >= 0x1100 && cp <= 0x115f) ||
      (cp >= 0x2e80 && cp <= 0x9fff) ||
      (cp >= 0x3040 && cp <= 0x30ff) ||
      (cp >= 0xac00 && cp <= 0xd7a3) ||
      (cp >= 0xff00 && cp <= 0xff60);
    w += wide ? 2 : 1;
  }
  return w;
}

interface ColLayout {
  order: number[];
  slotPx: number;
}

// Static diagram: one UI label across twelve languages, each button sized to
// its text and dropped into a dashed slot as wide as the column's widest
// translation, so the empty dashed space is the width every button must
// reserve for expansion. The rows are ordered by the buttons' *actual*
// rendered width, measured once fonts are ready (the widths depend on the
// viewer's CJK fallback font, which no static estimate can predict).
export function TextExpansionButtons() {
  const btnRefs = useRef(new Map<string, HTMLElement>());
  const [measured, setMeasured] = useState<ColLayout[] | null>(null);

  useIsoLayoutEffect(() => {
    let cancelled = false;
    const measure = () => {
      if (cancelled) return;
      const cols = B.words.map((_, wi) => {
        const widths = B.rows.map(
          (_, ri) => btnRefs.current.get(`${wi}-${ri}`)?.getBoundingClientRect().width ?? 0,
        );
        const order = B.rows.map((_, ri) => ri).sort((a, b) => widths[a] - widths[b]);
        return { order, slotPx: Math.round(Math.max(...widths)) + 14 };
      });
      setMeasured(cols);
    };
    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
    if (fonts?.ready) fonts.ready.then(measure);
    else measure();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className={`workDemoCard ${styles.card}`}>
      <div className={styles.head}>
        <h3 className={styles.title}>Text expansion in a button</h3>
        <p className={styles.caption}>
          One label across twelve languages. Size a button for English and the longer translations
          clip; the dashed space is the width you have to reserve.
        </p>
      </div>
      <div className={styles.columns}>
        {B.words.map((word, wi) => {
          const col = measured?.[wi];
          const order =
            col?.order ??
            B.rows
              .map((_, ri) => ri)
              .sort((a, b) => visualWidth(B.rows[a].forms[wi]) - visualWidth(B.rows[b].forms[wi]));
          const slot = col
            ? `${col.slotPx}px`
            : `${Math.max(...B.rows.map((r) => visualWidth(r.forms[wi]))) + 2}ch`;
          return (
            <div key={word} className={styles.col} style={{ "--slotw": slot } as CSSProperties}>
              <p className={styles.colHead}>“{word}”</p>
              <ul className={styles.list}>
                {order.map((ri) => {
                  const r = B.rows[ri];
                  return (
                    <li key={r.lang} className={styles.row}>
                      <span className={styles.lang}>{r.lang}</span>
                      <span className={styles.slot}>
                        <span
                          className={styles.btn}
                          ref={(el) => {
                            if (el) btnRefs.current.set(`${wi}-${ri}`, el);
                            else btnRefs.current.delete(`${wi}-${ri}`);
                          }}
                        >
                          {r.forms[wi]}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
