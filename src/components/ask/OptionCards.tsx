"use client";

import classNames from "classnames";
import styles from "./ask.module.css";

export interface Card {
  key: string;
  title: string;
  /** Options show a one-line summary; starters do not. */
  summary?: string;
  prompt: string;
}

/**
 * Three full-width cards: the API's options reply and the empty-state starters.
 * Always a vertical stack so nothing wraps at 320 px. Activating a card sends its
 * prompt as the visitor's next message. Once a later message is sent the cards
 * stay in the transcript but stop being buttons (spec FR-027).
 */
export function OptionCards({
  cards,
  disabled,
  flush,
  onPick,
}: {
  cards: readonly Card[];
  disabled?: boolean;
  flush?: boolean;
  onPick: (prompt: string) => void;
}) {
  return (
    <ul className={classNames(styles.cards, flush && styles.flush)}>
      {cards.map((card, i) => (
        <li key={card.key} className={styles.cardItem} style={{ "--i": i } as React.CSSProperties}>
          <button
            type="button"
            className={styles.card}
            aria-label={`Ask about ${card.title}`}
            aria-disabled={disabled ? "true" : undefined}
            tabIndex={disabled ? -1 : undefined}
            onClick={() => {
              if (!disabled) onPick(card.prompt);
            }}
          >
            <span className={styles.cardTitle}>{card.title}</span>
            <span className={styles.cardArrow} aria-hidden="true">
              →
            </span>
            {card.summary ? <span className={styles.cardSummary}>{card.summary}</span> : null}
          </button>
        </li>
      ))}
    </ul>
  );
}
