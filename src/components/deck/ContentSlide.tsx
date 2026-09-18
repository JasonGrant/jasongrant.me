import type { ContentSlide as ContentSlideData } from "@/content/deck/types";
import classNames from "classnames";
import { renderDeckText } from "./DeckText";
import type { LightboxGroup } from "./LightboxContext";
import { LightboxTrigger } from "./LightboxTrigger";
import styles from "./Slide.module.css";
import { DeckFigure, SlideEmbed } from "./SlideEmbed";
import { DeckImage } from "./embeds/DeckImage";

// A columns-layout thumbnail is one of several sharing a ~500px-wide grid
// column, not a whole figure column — capped much shorter than DeckImage's
// default (tuned for a full text-figure column) so three of them stay
// proportioned to the column width instead of stacking tall. The same cap
// applies whether a column shows one thumbnail or a row of several, so
// every column's images line up at the same height.
const COLUMN_IMAGE_MAX_HEIGHT_PX = 220;

// The deck's five content layouts (data-model.md §1, contracts/deck-content.md):
// statement, text-figure, figure, demo, numbers. One <h1>; the static
// description is the no-JS/assistive-tech equivalent (FR-007); demo layouts
// additionally carry a <noscript> note (FR-012).
export function ContentSlide({
  slide,
  position,
}: {
  slide: ContentSlideData;
  position: { index: number; total: number };
}) {
  return (
    <article
      data-deck-slide
      tabIndex={-1}
      role="group"
      aria-roledescription="slide"
      aria-label={`Slide ${position.index + 1} of ${position.total}: ${slide.title}`}
      className={styles.slideRoot}
    >
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          {slide.kicker ? <p className={styles.kicker}>{slide.kicker}</p> : null}
          <h1 className={styles.contentHeadline}>{slide.headline}</h1>
        </div>
        <div className={styles.contentBody}>{renderLayout(slide)}</div>
      </div>
      <p className={styles.srOnly}>{slide.staticDescription}</p>
      {slide.layout === "demo" ? (
        <noscript>
          <p>{slide.staticDescription} Interactive version requires JavaScript.</p>
        </noscript>
      ) : null}
    </article>
  );
}

function renderLayout(slide: ContentSlideData) {
  switch (slide.layout) {
    case "statement":
      return (
        <div className={styles.statement}>
          {renderDeckText(slide.body)}
          {slide.bullets ? (
            <ul className={styles.bulletList}>
              {slide.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
          {slide.after ? renderDeckText(slide.after) : null}
        </div>
      );

    case "text-figure": {
      const body = (
        <div className={styles.textFigureBody}>
          {renderDeckText(slide.body)}
          {slide.bullets ? (
            <ul className={styles.bulletList}>
              {slide.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
          {slide.after ? renderDeckText(slide.after) : null}
        </div>
      );
      const figure = (
        <div
          className={styles.textFigureFigure}
          style={slide.figureAlign === "end" ? { alignItems: "flex-end" } : undefined}
        >
          <DeckFigure figure={slide.figure} />
        </div>
      );
      const [textFr, figureFr] = slide.columns ?? [7, 9];
      const grid = (
        <div
          className={styles.textFigure}
          style={{
            gridTemplateColumns: `minmax(0, ${textFr}fr) minmax(0, ${figureFr}fr)`,
            gap: slide.gap ? `${slide.gap}px` : undefined,
            flex: slide.bottomFigure ? "5 1 0" : undefined,
          }}
        >
          {slide.figureSide === "left" ? (
            <>
              {figure}
              {body}
            </>
          ) : (
            <>
              {body}
              {figure}
            </>
          )}
        </div>
      );
      if (!slide.bottomFigure) return grid;
      return (
        <div className={styles.textFigureWithBottom}>
          {grid}
          <div className={styles.textFigureBottom}>
            <DeckFigure figure={slide.bottomFigure} />
          </div>
        </div>
      );
    }

    case "figure":
      return (
        <div className={styles.figureOnly}>
          {slide.body ? renderDeckText(slide.body) : null}
          {slide.bullets ? (
            <ul className={styles.bulletList}>
              {slide.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
          <div className={styles.embedFrame}>
            <DeckFigure figure={slide.figure} priority />
          </div>
          {slide.caption ? <p className={styles.caption}>{slide.caption}</p> : null}
        </div>
      );

    case "demo":
      return (
        <div className={styles.demoLayout}>
          {slide.body ? renderDeckText(slide.body) : null}
          <div className={styles.embedFrame}>
            <SlideEmbed id={slide.embed} />
          </div>
          {slide.caption ? <p className={styles.caption}>{slide.caption}</p> : null}
        </div>
      );

    case "columns": {
      // An invisible table: every column is a CSS grid column and every row
      // index is a grid row, so a row's height (and therefore its top edge)
      // matches across all columns regardless of how much text is in any one
      // cell — a category like "Artifact" lines up even when one column
      // carries an extra row before it. When any column carries an image,
      // row 2 is reserved for it (even in columns without one), pushing the
      // data rows down by one so labels still line up across columns.
      const maxRows = Math.max(...slide.columns.map((c) => c.rows.length));
      const imageColumns = slide.columns.filter((c) => c.image || c.images?.length);
      const hasImages = imageColumns.length > 0;
      const rowOffset = hasImages ? 3 : 2;
      // One lightbox group per column that has images (in column order) —
      // clicking any column's thumbnail(s) opens the lightbox on that
      // column's group; left/right in the lightbox cycles the other columns.
      const groups: LightboxGroup[] = imageColumns.map(
        (c) => c.images ?? (c.image ? [c.image] : []),
      );
      return (
        <div className={styles.columnsTable}>
          {slide.columns.map((col, colIndex) => (
            <h2
              key={col.title}
              className={styles.columnTitle}
              style={{ gridColumn: colIndex + 1, gridRow: 1 }}
            >
              {col.title}
            </h2>
          ))}
          {hasImages
            ? slide.columns.map((col, colIndex) => {
                const groupIndex = imageColumns.indexOf(col);
                if (col.images?.length) {
                  return (
                    <LightboxTrigger
                      key={`${col.title}-images`}
                      groups={groups}
                      index={groupIndex}
                      label={`View ${col.title} screenshots larger`}
                      className={classNames(styles.columnImage, styles.columnImagesRow)}
                      style={{ gridColumn: colIndex + 1, gridRow: 2 }}
                    >
                      {col.images.map((image) => (
                        <DeckImage
                          key={image.src}
                          image={image}
                          bare
                          maxHeightPx={COLUMN_IMAGE_MAX_HEIGHT_PX}
                        />
                      ))}
                    </LightboxTrigger>
                  );
                }
                if (!col.image) return null;
                return (
                  <LightboxTrigger
                    key={`${col.title}-image`}
                    groups={groups}
                    index={groupIndex}
                    label={`View ${col.title} screenshot larger`}
                    className={styles.columnImage}
                    style={{ gridColumn: colIndex + 1, gridRow: 2 }}
                  >
                    <DeckImage image={col.image} bare maxHeightPx={COLUMN_IMAGE_MAX_HEIGHT_PX} />
                  </LightboxTrigger>
                );
              })
            : null}
          {Array.from({ length: maxRows }, (_, rowIndex) =>
            slide.columns.map((col, colIndex) => {
              const row = col.rows[rowIndex];
              if (!row) return null;
              return (
                <div
                  key={`${col.title}-${row.label}`}
                  // The first row sits close under the title (tight grid
                  // row-gap); every row after it gets extra top margin, so
                  // spacing between content rows stays roomy without
                  // affecting the title-to-first-row gap.
                  className={classNames(styles.columnCell, rowIndex > 0 && styles.columnCellSpaced)}
                  style={{ gridColumn: colIndex + 1, gridRow: rowIndex + rowOffset }}
                >
                  <p className={styles.columnLabel}>{row.label}</p>
                  {row.bullets ? (
                    <ul className={styles.columnBullets}>
                      {row.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.columnText}>{row.text}</p>
                  )}
                </div>
              );
            }),
          )}
        </div>
      );
    }

    case "numbers": {
      const content = (
        <div className={styles.numbers}>
          <div className={styles.numbersRow}>
            {slide.stats.map((stat) => (
              <div className={styles.stat} key={stat.figure}>
                <span className={styles.statFigure}>{stat.figure}</span>
                <span className={styles.statText}>{stat.text}</span>
                {stat.source ? (
                  <a
                    className={styles.statSource}
                    href={stat.source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {stat.source.label}
                  </a>
                ) : null}
              </div>
            ))}
          </div>
          {slide.body ? renderDeckText(slide.body) : null}
        </div>
      );
      if (!slide.figure) return content;
      const figure = (
        <div className={styles.textFigureFigure}>
          <DeckFigure figure={slide.figure} />
        </div>
      );
      const [textFr, figureFr] = slide.columns ?? [7, 9];
      return (
        <div
          className={styles.textFigure}
          style={{
            gridTemplateColumns: `minmax(0, ${textFr}fr) minmax(0, ${figureFr}fr)`,
            gap: slide.gap ? `${slide.gap}px` : undefined,
          }}
        >
          {slide.figureSide === "left" ? (
            <>
              {figure}
              {content}
            </>
          ) : (
            <>
              {content}
              {figure}
            </>
          )}
        </div>
      );
    }

    default: {
      const exhaustiveCheck: never = slide;
      return exhaustiveCheck;
    }
  }
}
