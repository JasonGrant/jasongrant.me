import type { LightboxGroup } from "../LightboxContext";
import { LightboxTrigger } from "../LightboxTrigger";
import styles from "./BuildingHomesGallery.module.css";
import { DeckImage } from "./DeckImage";

// Two before/after pairs, stacked: exterior on top, kitchen underneath.
const ROWS = [
  {
    label: "Exterior",
    images: [
      {
        src: "/deck/building-homes/exterior-before.png",
        alt: "Before: a plain grey house with dated shutters and a bare front porch.",
        width: 972,
        height: 676,
      },
      {
        src: "/deck/building-homes/exterior-after.webp",
        alt: "After: a closer view of the same house, mustard-yellow siding, white porch columns, black shutters, and the door numbered 115.",
        width: 1024,
        height: 712,
      },
    ],
  },
  {
    label: "Kitchen",
    images: [
      {
        src: "/deck/building-homes/kitchen-before.jpg",
        alt: "Before: a dim, dated kitchen with olive-green cabinets and a curtained sink base.",
        width: 1600,
        height: 1112,
      },
      {
        src: "/deck/building-homes/kitchen-after.webp",
        alt: "After: an open, bright kitchen with grey cabinets, stainless appliances, and a wood-topped island.",
        width: 1024,
        height: 712,
      },
    ],
  },
];

// Each row is half of a two-row column (~832 design px tall, minus the row
// gap), so this cap keeps a pair of photos from outgrowing its row without
// depending on percentage-height resolution (see DeckImage.tsx: the figure
// column's height isn't a definite value).
const GALLERY_MAX_HEIGHT_PX = 330;

// One lightbox group per row — clicking any photo in a row opens that row's
// pair together; left/right in the lightbox moves between rows.
const GROUPS: LightboxGroup[] = ROWS.map((row) => row.images);

export function BuildingHomesGallery() {
  return (
    <div className={styles.grid}>
      {ROWS.map((row, rowIndex) => (
        <div className={styles.row} key={row.label}>
          {row.images.map((image) => (
            <LightboxTrigger
              key={image.src}
              groups={GROUPS}
              index={rowIndex}
              label={`View ${row.label.toLowerCase()} photos larger`}
              className={styles.item}
            >
              <DeckImage
                image={{ ...image, stageFraction: 0.24 }}
                bare
                maxHeightPx={GALLERY_MAX_HEIGHT_PX}
              />
            </LightboxTrigger>
          ))}
        </div>
      ))}
    </div>
  );
}
