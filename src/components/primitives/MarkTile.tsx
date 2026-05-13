import type { MarkRef } from "@/types/content";
import classNames from "classnames";
import styles from "./MarkTile.module.css";

function MarleyBubble() {
  // Cropped from https://www.himarley.com/wp-content/themes/himarley/dist/img/logo-red.svg
  // — speech bubble + "hi" letters only (omits the "marley" wordmark).
  return (
    <svg aria-hidden="true" viewBox="0 0 55 55" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M27.12 0A27.086 27.086 0 008.175 46.474a11.323 11.323 0 01-3.448 5.977c-3.839 3.836 8.172 2.923 12.918.033A27.1 27.1 0 1027.12 0z"
        fill="#f2685f"
      />
      <path
        d="M27.997 37.972a2.613 2.613 0 01-2.87-2.837v-6.947c0-2.772-1.51-3.876-3.368-3.876-1.324 0-3.057 1.009-3.057 4v9.642h-1.389a2.575 2.575 0 01-2.9-2.837V15.291h1.309c2.015 0 2.991 1.134 2.991 2.709v4.849a4.814 4.814 0 013.686-2.267c4.388 0 6.947 2.614 6.947 7.434v9.957zm8.089-18.209a2.49 2.49 0 01-2.443-2.49 2.461 2.461 0 012.457-2.457 2.49 2.49 0 012.49 2.457 2.516 2.516 0 01-2.504 2.49zm2.995 18.367c-3.291 0-5.072-1.858-5.072-5.291V21.336h1.2c1.89 0 3.024 1.006 3.024 3.148v7.942c0 1.7.731 2.238 2.585 2.238h.786v.914c-.004 1.828-.728 2.552-2.524 2.552z"
        fill="#fff"
      />
    </svg>
  );
}

function KlaviyoFlag() {
  // Klaviyo's pennant/flag mark. Uses currentColor so it inherits the chip
  // text color (set to --ink in the .klaviyo CSS rule).
  return (
    <svg aria-hidden="true" viewBox="0 0 266 178" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill="currentColor" d="M266 178H0V0h266l-55.835 89z" />
    </svg>
  );
}

function VertexMark() {
  // The two purple geometric pieces of the Vertex Pharmaceuticals lockup
  // — triangle (above wordmark) and bar (below wordmark). Wordmark itself
  // is omitted because the surrounding "Vertex Pharmaceuticals" text already
  // names the brand. Purple sampled from the brand mark.
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4 L20 16 L4 16 Z" fill="#4D2C84" />
      <rect x="4" y="19" width="16" height="2" fill="#4D2C84" />
    </svg>
  );
}

function HypothIcon() {
  // Port of /Users/jasongrant/Repos/hypoth/public/favicon.svg — the actual
  // Hypoth brand favicon. Cream chip, "ai" mono tag top-left, "Hy" wordmark
  // centered. Hardcoded brand colors so the chip reads as Hypoth regardless
  // of the surrounding warm-dark theme.
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="39" height="39" fill="#FAF7F0" stroke="#1A1A14" rx="9" />
      <text
        x="6"
        y="14"
        fontFamily="ui-monospace, 'SF Mono', monospace"
        fontSize="5"
        fill="#7E7869"
        letterSpacing="0.2"
      >
        ai
      </text>
      <text
        x="20"
        y="28"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif"
        fontSize="20"
        fontWeight="300"
        letterSpacing="-1"
        textAnchor="middle"
        fill="#14140F"
      >
        Hy
      </text>
    </svg>
  );
}

function OllloIcon() {
  // From /Users/jasongrant/Repos/hypoth/design/olllo/project/assets/olllo-icon-black.svg
  // — two interlocking incomplete circles. Uses currentColor so it picks up
  // the chip's color (set to --ink in .olllo CSS rule).
  return (
    <svg aria-hidden="true" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="none">
      <path
        d="M532.88,278.95c34.68-17.15,73.74-26.79,115.05-26.79,143.51,0,259.84,116.34,259.84,259.84s-116.34,259.84-259.84,259.84-259.84-116.34-259.84-259.84c0-42.85,10.37-83.28,28.74-118.91"
        stroke="currentColor"
        strokeWidth="80"
        strokeLinecap="round"
      />
      <path
        d="M503.12,745.05c-34.68,17.15-73.74,26.79-115.05,26.79-143.51,0-259.84-116.34-259.84-259.84S244.57,252.16,388.08,252.16s259.84,116.34,259.84,259.84c0,42.85-10.37,83.28-28.74,118.91"
        stroke="currentColor"
        strokeWidth="80"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WrenBird() {
  // /public/wren-mark.png — the Wren brand mark (bird in a speech bubble).
  // 128×128 PNG, Retina-safe headroom for the 22px chip. Uses <img> rather
  // than next/image because the chip is too small for that pipeline to pay off.
  return (
    <img src="/wren-mark.png" alt="" width="128" height="128" aria-hidden="true" decoding="async" />
  );
}

export function MarkTile({ mark, title }: { mark: MarkRef; title?: string }) {
  if (mark.kind === "logo") {
    if (mark.key === "marley") {
      return (
        <span className={classNames(styles.tile, styles.logo)} title={title ?? "Hi Marley"}>
          <MarleyBubble />
        </span>
      );
    }
    if (mark.key === "klaviyo") {
      return (
        <span
          className={classNames(styles.tile, styles.logo, styles.klaviyo)}
          title={title ?? "Klaviyo"}
        >
          <KlaviyoFlag />
        </span>
      );
    }
    if (mark.key === "vertex") {
      return (
        <span
          className={classNames(styles.tile, styles.logo)}
          title={title ?? "Vertex Pharmaceuticals"}
        >
          <VertexMark />
        </span>
      );
    }
    if (mark.key === "hypoth") {
      return (
        <span
          className={classNames(styles.tile, styles.logo, styles.hypoth)}
          title={title ?? "Hypoth"}
        >
          <HypothIcon />
        </span>
      );
    }
    if (mark.key === "olllo") {
      return (
        <span
          className={classNames(styles.tile, styles.logo, styles.olllo)}
          title={title ?? "Olllo"}
        >
          <OllloIcon />
        </span>
      );
    }
    if (mark.key === "wren") {
      return (
        <span className={classNames(styles.tile, styles.logo, styles.wren)} title={title ?? "Wren"}>
          <WrenBird />
        </span>
      );
    }
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
