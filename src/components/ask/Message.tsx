"use client";

import { useReducedMotion } from "@/lib/motion";
import classNames from "classnames";
import { memo, useEffect, useRef, useState } from "react";
import type { Card } from "./OptionCards";
import { OptionCards } from "./OptionCards";
import { SourcesRow } from "./SourcesRow";
import { retryTurn } from "./actions";
import styles from "./ask.module.css";
import type { ReplyMessage, VisitorMessage } from "./store";

/**
 * A reply's text. While words stream each one fades in; once the reply is finished
 * the words collapse into one text node, so a long transcript stays light. A
 * correction crossfades the old text out and the new text in, in place (spec FR-029).
 */
function ReplyText({ reply }: { reply: ReplyMessage }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const [shownEpoch, setShownEpoch] = useState(reply.correctionEpoch);
  const streaming = reply.status === "streaming" && !reduced;

  // Hold the old text until the fade-out ends, then show the corrected text and fade it in.
  const frozen = useRef<string[]>(reply.chunks);
  const changing = shownEpoch !== reply.correctionEpoch;
  if (!changing) frozen.current = reply.chunks;

  useEffect(() => {
    if (!changing) return;
    const el = ref.current;
    if (reduced || !el) {
      setShownEpoch(reply.correctionEpoch);
      return;
    }
    const out = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 100, fill: "forwards" });
    out.onfinish = () => {
      setShownEpoch(reply.correctionEpoch);
      el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 100, fill: "forwards" });
    };
    return () => out.cancel();
  }, [changing, reduced, reply.correctionEpoch]);

  const chunks = changing ? frozen.current : reply.chunks;
  if (chunks.length === 0) return null;
  return (
    <p className={styles.replyText} ref={ref}>
      {streaming
        ? chunks.map((chunk, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: chunks are append-only and never reorder
            <span key={i} className={styles.word}>
              {chunk}
            </span>
          ))
        : chunks.join("")}
    </p>
  );
}

function eyebrowTags(reply: ReplyMessage): string[] {
  const tags: string[] = [];
  if (reply.updated) tags.push("Updated");
  if (reply.status === "stopped") tags.push("Stopped");
  if (reply.status === "failed" && reply.retryable) tags.push("Didn't send");
  return tags;
}

export const VisitorView = memo(function VisitorView({ message }: { message: VisitorMessage }) {
  const id = `ask-m-${message.id}`;
  return (
    <article className={styles.message} aria-labelledby={id}>
      <h3 id={id} className={styles.eyebrow}>
        You
      </h3>
      <p className={styles.visitorText}>{message.text}</p>
    </article>
  );
});

export const ReplyView = memo(function ReplyView({
  reply,
  onPick,
  pickDisabled,
}: {
  reply: ReplyMessage;
  onPick: (prompt: string) => void;
  pickDisabled: boolean;
}) {
  const id = `ask-m-${reply.id}`;
  const tags = eyebrowTags(reply);
  const cards: Card[] = reply.options.map((o) => ({
    key: o.entry_id,
    title: o.title,
    summary: o.summary,
    prompt: o.prompt,
  }));
  return (
    <article className={styles.message} aria-labelledby={id}>
      <h3 id={id} className={styles.eyebrow}>
        Jason · AI
        {tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {" "}
            · {tag}
          </span>
        ))}
      </h3>
      {reply.mode === "answer" ? <SourcesRow sources={reply.sources} /> : null}
      {reply.status === "thinking" ? (
        <span className={styles.thinking} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      ) : null}
      <ReplyText reply={reply} />
      {reply.status === "failed" && reply.errorMessage ? (
        <p className={classNames(styles.replyError)}>{reply.errorMessage}</p>
      ) : null}
      {reply.mode === "options" && cards.length > 0 ? (
        <OptionCards
          cards={cards}
          disabled={reply.optionsUsed || pickDisabled || reply.status !== "complete"}
          onPick={onPick}
        />
      ) : null}
      {reply.status === "failed" && reply.retryable ? (
        <button
          type="button"
          className={classNames(styles.kbdBtn, styles.retry)}
          onClick={() => retryTurn(reply.id)}
        >
          Try again
        </button>
      ) : null}
    </article>
  );
});
