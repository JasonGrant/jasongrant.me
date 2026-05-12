import type { MarkRef } from "@/types/content";
import classNames from "classnames";
import styles from "./MarkTile.module.css";

function MarleyWaves() {
  return (
    <svg
      aria-hidden="true"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 15c2-2 3-2 5 0s3 2 5 0 3-2 5 0 3 2 5 0" />
      <path d="M3 9c2-2 3-2 5 0s3 2 5 0 3-2 5 0 3 2 5 0" />
    </svg>
  );
}

export function MarkTile({ mark, title }: { mark: MarkRef; title?: string }) {
  if (mark.kind === "logo" && mark.key === "marley") {
    return (
      <span className={classNames(styles.tile, styles.marley)} title={title ?? "Hi Marley"}>
        <MarleyWaves />
      </span>
    );
  }
  if (mark.kind === "monogram") {
    return (
      <span
        className={classNames(styles.tile, {
          [styles.outline]: mark.style === "outline",
          [styles.accent]: mark.style === "accent",
        })}
        title={title}
      >
        {mark.letter}
      </span>
    );
  }
  return null;
}
