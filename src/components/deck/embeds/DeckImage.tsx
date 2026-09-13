import type { DeckImage as DeckImageData } from "@/content/deck/types";
import Image from "next/image";
import styles from "./DeckImage.module.css";
import { stageSizes } from "./stageSizes";

export function DeckImage({ image, priority }: { image: DeckImageData; priority?: boolean }) {
  return (
    <figure className={styles.frame}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className={styles.img}
        sizes={stageSizes(image.stageFraction)}
        priority={priority}
      />
    </figure>
  );
}
