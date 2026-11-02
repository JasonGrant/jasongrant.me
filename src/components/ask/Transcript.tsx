"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { ReplyView, VisitorView } from "./Message";
import { sendMessage } from "./actions";
import styles from "./ask.module.css";
import { getAsk, useAsk } from "./store";

/** How far from the bottom still counts as "following" the newest text. */
const FOLLOW_THRESHOLD_PX = 24;

/**
 * The conversation: a named, focusable log region whose contents are NOT announced
 * live (the status region speaks for it, spec FR-040). While a reply streams it
 * follows the newest text until the visitor scrolls up; then it stops following and
 * offers "Jump to latest" until they come back to the bottom (spec FR-023).
 */
export function Transcript() {
  const messages = useAsk((s) => s.messages);
  const inFlight = useAsk((s) => s.inFlight);
  const scroller = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const following = useRef(true);
  const [detached, setDetached] = useState(false);

  const toBottom = useCallback(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  const distanceFromBottom = useCallback(() => {
    const el = scroller.current;
    return el ? el.scrollHeight - el.scrollTop - el.clientHeight : 0;
  }, []);

  const onScroll = useCallback(() => {
    // While the panel is still growing out of the bar the container is tiny and scroll
    // events are the layout settling, not the visitor reading back.
    if (getAsk().phase === "opening") return;
    following.current = distanceFromBottom() <= FOLLOW_THRESHOLD_PX;
    setDetached(!following.current);
  }, [distanceFromBottom]);

  // Follow content as it grows (words arriving, cards appearing, a correction reflowing),
  // and notice when the container itself resizes: if everything now fits, nothing is "below".
  useEffect(() => {
    const target = content.current;
    const box = scroller.current;
    if (!target || !box || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      if (following.current) toBottom();
      else if (distanceFromBottom() <= FOLLOW_THRESHOLD_PX) {
        following.current = true;
        setDetached(false);
      }
    });
    observer.observe(target);
    observer.observe(box);
    return () => observer.disconnect();
  }, [toBottom, distanceFromBottom]);

  // A message the visitor just sent always brings the view back to the bottom.
  const last = messages[messages.length - 1];
  const lastId = last?.id;
  const lastIsVisitor = last?.role === "visitor";
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs when a new message is appended
  useLayoutEffect(() => {
    if (lastIsVisitor || messages.length <= 2) {
      following.current = true;
      setDetached(false);
      toBottom();
    }
  }, [lastId, lastIsVisitor, toBottom]);

  return (
    <>
      <div
        ref={scroller}
        className={styles.log}
        role="log"
        aria-live="off"
        aria-label="Conversation"
        // biome-ignore lint/a11y/noNoninteractiveTabindex: a keyboard-scrollable log must be focusable (spec FR-040)
        tabIndex={0}
        onScroll={onScroll}
      >
        <div ref={content}>
          {messages.map((message) =>
            message.role === "visitor" ? (
              <VisitorView key={message.id} message={message} />
            ) : (
              <ReplyView
                key={message.id}
                reply={message}
                onPick={(prompt) => void sendMessage(prompt)}
                pickDisabled={inFlight}
              />
            ),
          )}
        </div>
      </div>
      {detached ? (
        <button
          type="button"
          className={`${styles.kbdBtn} ${styles.jump}`}
          onClick={() => {
            following.current = true;
            setDetached(false);
            toBottom();
          }}
        >
          Jump to latest
        </button>
      ) : null}
    </>
  );
}
