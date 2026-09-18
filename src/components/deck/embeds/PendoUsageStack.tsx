import { DeckImage } from "./DeckImage";
import styles from "./PendoUsageStack.module.css";

// Two Pendo dashboards, side by side, standing in as direct evidence for the
// "Pendo tracked usage before and after" line on the risk-management slide.
const IMAGES = [
  {
    src: "/work/app-shell/pendo-inbox.jpeg",
    alt: "A Pendo dashboard for the Inbox chats page: 33.9k visitors and 92.7% visitor adoption over the last 90 days, both up from the previous period.",
    width: 2218,
    height: 2322,
  },
  {
    src: "/work/app-shell/pendo-case-creation.jpeg",
    alt: "A Pendo dashboard for the case-creation page: 3,760 visitors and 10.3% visitor adoption over the last 90 days, tracked the same way as the inbox.",
    width: 2222,
    height: 2320,
  },
];

export function PendoUsageStack() {
  return (
    <div className={styles.row}>
      {IMAGES.map((image) => (
        <div className={styles.item} key={image.src}>
          <DeckImage image={{ ...image, stageFraction: 0.28, rounded: true }} />
        </div>
      ))}
    </div>
  );
}
