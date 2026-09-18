import type { DeckImage as DeckImageData } from "@/content/deck/types";
import classNames from "classnames";
import Image from "next/image";
import styles from "./DeckImage.module.css";
import { stageSizes } from "./stageSizes";

// A "text-figure" figure column's available height is architecturally
// near-constant (measured ~832 design px against the deck's fixed
// 1920x1080 stage and ContentSlide's header sizing) — capped a bit under
// that so a portrait image can't overflow into a scroll. width:min(100%,…)
// picks whichever is tighter: full column width for a landscape image,
// or this height-derived width for a tall one, with no percentage-height
// resolution involved (that path collapsed to ~0 — the figure column's
// own height comes from a grid stretch, not a definite `height`, so a
// descendant's `max-height: 100%` had nothing reliable to resolve against).
// A smaller cap is passed explicitly for a thumbnail-sized use (e.g. a
// per-column screenshot), where the default column figure's cap would
// blow out a three-column grid.
const DEFAULT_ROUNDED_MAX_HEIGHT_PX = 760;

export function DeckImage({
  image,
  priority,
  maxHeightPx = DEFAULT_ROUNDED_MAX_HEIGHT_PX,
  bare = false,
}: {
  image: DeckImageData;
  priority?: boolean;
  maxHeightPx?: number;
  /** Same aspect-ratio-capped sizing as `rounded`, but without the white
   *  card border/background/padding — for a photo sharing someone else's
   *  card (e.g. two photos inside one shared frame) instead of getting its
   *  own. */
  bare?: boolean;
}) {
  const sized = image.rounded || bare;
  const roundedWidth = maxHeightPx * (image.width / image.height);
  return (
    <figure
      className={classNames(
        styles.frame,
        sized && styles.sized,
        image.rounded && !bare && styles.rounded,
      )}
      style={
        sized
          ? {
              aspectRatio: `${image.width} / ${image.height}`,
              width: `min(100%, ${roundedWidth}px)`,
            }
          : undefined
      }
    >
      <div className={styles.inner}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className={styles.img}
          sizes={stageSizes(image.stageFraction)}
          priority={priority}
        />
      </div>
    </figure>
  );
}
