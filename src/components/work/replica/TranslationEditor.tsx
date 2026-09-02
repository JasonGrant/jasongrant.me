import classNames from "classnames";
import Image from "next/image";
import {
  FiAlertTriangle,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiMonitor,
  FiMoreVertical,
  FiSmartphone,
} from "react-icons/fi";
import { EmailPreview } from "./EmailPreview";
import styles from "./TranslationEditor.module.css";

// Field-by-field translation review (a sanitized recreation of the Klaviyo
// translation editor; fictional data). Source = the Coastal Brew email we
// built; targets = French / German. `kind` picks how the translation renders.
type Lang = "fr" | "de";

type Row = {
  label: string;
  sub?: string;
  kind: "input" | "text" | "image";
  source?: string;
  /** Source value after the later edit; when the editor is `stale`, this row
   *  is the one flagged as needing a re-translation. */
  editedSource?: string;
  target?: Record<Lang, string>;
  sourceEmpty?: boolean;
  mono?: boolean;
};

const CSS_SNIPPET_SRC = '<style type="text/css">h1, h2, h3, h4, p, …';
const CSS_SNIPPET_OUT = '<style type="text/css">h1, h2, h3, …';

const ROWS: Row[] = [
  {
    label: "Subject",
    kind: "input",
    source: "Your new summer coffee obsession has arrived",
    target: {
      fr: "Votre nouvelle obsession café estivale est arrivée",
      de: "Ihre neue Sommerkaffee-Obsession ist da",
    },
  },
  {
    label: "Preview Text",
    kind: "input",
    source: "Taste the sunshine",
    target: { fr: "Goûtez au soleil", de: "Schmecken Sie die Sonne" },
  },
  {
    label: "Text 1",
    sub: "Content",
    kind: "text",
    mono: true,
    source: CSS_SNIPPET_SRC,
    target: { fr: CSS_SNIPPET_OUT, de: CSS_SNIPPET_OUT },
  },
  { label: "Image 1", sub: "Alt Text", kind: "input", sourceEmpty: true },
  { label: "Image 1", sub: "Source URL", kind: "image" },
  { label: "Image 1", sub: "Href URL", kind: "input", sourceEmpty: true },
  {
    label: "Text 2",
    sub: "Content",
    kind: "text",
    source: "Free shipping on orders over $50",
    editedSource: "Free shipping on orders over $40",
    target: {
      fr: "Livraison gratuite à partir de 50 $",
      de: "Kostenloser Versand ab 50 $",
    },
  },
  {
    label: "Text 3",
    sub: "Content",
    kind: "text",
    source: "Introducing our new Summer Brew! Fruity, bright, and impossibly smooth…",
    target: {
      fr: "Découvrez notre nouvelle infusion estivale ! Fruité, éclatant et incroyablement doux…",
      de: "Entdecken Sie unseren neuen Sommer-Brew! Fruchtig, spritzig und unglaublich mild…",
    },
  },
];

const LANG_META: Record<Lang, { name: string; page: string }> = {
  fr: { name: "French", page: "1 of 2" },
  de: { name: "German", page: "2 of 2" },
};

function ImageCell() {
  return (
    <div className={styles.imageCell}>
      <Image
        src="/work/CostalBrewTeal-clean.png"
        alt=""
        width={552}
        height={514}
        sizes="48px"
        className={styles.thumb}
      />
      <div className={styles.imageMeta}>
        <span className={styles.imageName}>Coastal Brew logo</span>
        <span className={styles.imageDims}>552 × 514 · 273 kB</span>
      </div>
    </div>
  );
}

function SourceCell({ row, isStale }: { row: Row; isStale: boolean }) {
  if (row.kind === "image") return <ImageCell />;
  if (row.sourceEmpty)
    return <span className={styles.emptyText}>This field is not defined or empty</span>;
  const src = isStale && row.editedSource ? row.editedSource : row.source;
  return <span className={row.mono ? styles.mono : styles.sourceText}>{src}</span>;
}

function TargetCell({ row, lang, isStale }: { row: Row; lang: Lang; isStale: boolean }) {
  if (row.kind === "input") {
    return <span className={styles.input}>{row.target?.[lang] ?? ""}</span>;
  }
  return (
    <div className={styles.targetEdit}>
      {row.kind === "image" ? (
        <ImageCell />
      ) : (
        <span className={row.mono ? styles.mono : styles.targetText}>{row.target?.[lang]}</span>
      )}
      {isStale ? (
        <span className={styles.menuBtn} aria-hidden="true">
          <FiMoreVertical />
        </span>
      ) : (
        <FiEdit2 className={styles.pencil} aria-hidden="true" />
      )}
    </div>
  );
}

// Opens from the editor's Translate button once translations exist. `lang`
// selects which translation is shown; `stale` flags that the source changed
// after translating, highlighting the row that needs an update.
export function TranslationEditor({
  lang = "fr",
  stale = false,
}: { lang?: Lang; stale?: boolean }) {
  const meta = LANG_META[lang];
  return (
    <div className={styles.overlay}>
      <div className={styles.scrim} />
      <div className={styles.panel}>
        <div className={styles.header}>
          <h3 className={styles.title}>Summer Coffee Promo</h3>
          {stale ? (
            <div className={styles.staleBanner}>
              <FiAlertTriangle className={styles.staleWarn} aria-hidden="true" />
              <span className={styles.staleText}>
                There were changes to the content. Update the translation.
              </span>
              <span className={styles.updateBtn}>Update translation</span>
            </div>
          ) : null}
          <span className={styles.doneBtn}>Done</span>
        </div>

        <div className={styles.body}>
          <div className={styles.left}>
            <div className={styles.toolbar}>
              <span className={styles.langSelect}>
                {meta.name}
                <FiChevronDown aria-hidden="true" />
              </span>
              <span className={styles.pager}>
                <span className={styles.pagerBtn} aria-hidden="true">
                  <FiChevronLeft />
                </span>
                <span className={styles.pagerText}>{meta.page}</span>
                <span className={styles.pagerBtn} aria-hidden="true">
                  <FiChevronRight />
                </span>
              </span>
            </div>

            {/* biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable region needs keyboard access */}
            <div className={styles.table} tabIndex={0} aria-label="Translation fields">
              {ROWS.map((row) => {
                const isStale = stale && !!row.editedSource;
                return (
                  <div
                    key={`${row.label}-${row.sub ?? ""}`}
                    className={classNames(styles.row, isStale && styles.rowStale)}
                  >
                    <div className={styles.cellLabel}>
                      <span className={styles.rowLabel}>{row.label}</span>
                      {row.sub ? <span className={styles.rowSub}>{row.sub}</span> : null}
                    </div>
                    <div className={styles.cellSource}>
                      <SourceCell row={row} isStale={isStale} />
                    </div>
                    <div className={styles.cellTarget}>
                      <TargetCell row={row} lang={lang} isStale={isStale} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable region needs keyboard access */}
          <div className={styles.right} tabIndex={0} aria-label="Email preview">
            <div className={styles.viewToggle}>
              <span className={classNames(styles.viewBtn, styles.viewOn)} aria-hidden="true">
                <FiMonitor />
              </span>
              <span className={styles.viewBtn} aria-hidden="true">
                <FiSmartphone />
              </span>
            </div>
            <div className={styles.previewFrame}>
              <EmailPreview lang={lang} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
