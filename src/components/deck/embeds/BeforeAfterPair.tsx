import type { LightboxGroup } from "../LightboxContext";
import { LightboxTrigger } from "../LightboxTrigger";
import styles from "./BeforeAfterPair.module.css";
import { DeckImage } from "./DeckImage";

export interface BeforeAfterImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Sized to its own aspect ratio (DeckImage's `bare` mode) rather than
// stretched to fill the row: a stretched box lets object-fit:contain
// letterbox the image inside it, which would leave the Before/After tag
// pinned to an empty corner instead of the image's own edge.
const MAX_HEIGHT_PX = 700;

// Before and after, side by side. Each opens alone in the lightbox — not as
// a pair — so left/right there flips between the two, the same way a
// drag-reveal's handle used to.
export function BeforeAfterPair({
  context,
  before,
  after,
}: {
  context: string;
  before: BeforeAfterImage;
  after: BeforeAfterImage;
}) {
  const groups: LightboxGroup[] = [[before], [after]];
  return (
    <div className={styles.row}>
      <div className={styles.itemWrap}>
        <LightboxTrigger
          groups={groups}
          index={0}
          label={`View ${context} before, larger`}
          className={styles.item}
        >
          <DeckImage image={{ ...before, stageFraction: 0.42 }} bare maxHeightPx={MAX_HEIGHT_PX} />
        </LightboxTrigger>
        <span className={styles.tag} aria-hidden="true">
          Before
        </span>
      </div>
      <div className={styles.itemWrap}>
        <LightboxTrigger
          groups={groups}
          index={1}
          label={`View ${context} after, larger`}
          className={styles.item}
        >
          <DeckImage image={{ ...after, stageFraction: 0.42 }} bare maxHeightPx={MAX_HEIGHT_PX} />
        </LightboxTrigger>
        <span className={styles.tag} aria-hidden="true">
          After
        </span>
      </div>
    </div>
  );
}
