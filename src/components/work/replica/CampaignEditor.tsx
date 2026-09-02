import classNames from "classnames";
import type { ReactNode } from "react";
import {
  FiAlertTriangle,
  FiBox,
  FiCheckCircle,
  FiChevronDown,
  FiColumns,
  FiGrid,
  FiHeart,
  FiImage,
  FiLayers,
  FiLayout,
  FiMinus,
  FiMonitor,
  FiMousePointer,
  FiRotateCcw,
  FiRotateCw,
  FiSmartphone,
  FiStar,
  FiType,
} from "react-icons/fi";
import { LuMoveVertical, LuSparkles } from "react-icons/lu";
import { MdTranslate } from "react-icons/md";
import styles from "./CampaignEditor.module.css";
import { CampaignTopBar } from "./CampaignTopBar";
import { EmailPreview } from "./EmailPreview";

const BLOCKS = [
  { icon: FiType, label: "Text" },
  { icon: FiImage, label: "Image" },
  { icon: FiColumns, label: "Split" },
  { icon: FiMousePointer, label: "Button" },
  { icon: FiLayout, label: "Header bar" },
  { icon: FiLayers, label: "Drop shadow" },
  { icon: FiMinus, label: "Divider" },
  { icon: FiHeart, label: "Social links" },
  { icon: LuMoveVertical, label: "Spacer" },
  { icon: FiBox, label: "Product", badge: "New" },
  { icon: FiGrid, label: "Table" },
  { icon: FiStar, label: "Review quote" },
];

// A sanitized recreation of the Klaviyo email editor — the "Message" step's
// content view (constitution v1.2.4: real branding permitted on the unlisted,
// noindexed /work routes; fictional data). Screen 3 of the flow. The email in
// the canvas is the shared, editable <EmailPreview /> component.
export function CampaignEditor({
  overlay,
  translateLabel = "Translate",
  stale = false,
}: {
  overlay?: ReactNode;
  translateLabel?: string;
  stale?: boolean;
}) {
  return (
    <div className={classNames("replicaFrame", styles.app)}>
      <CampaignTopBar
        campaign="Summer Coffee Promo"
        stepLabel="Message"
        steps={[
          { id: "recipients", state: "done" },
          { id: "message", state: "active" },
          { id: "review", state: "todo" },
        ]}
        showBack
        actions={
          <>
            {stale ? (
              <span className={styles.savedInline}>
                Last saved: now
                <FiCheckCircle aria-hidden="true" />
              </span>
            ) : null}
            <span className={styles.manageBtn}>
              Manage template
              <FiChevronDown aria-hidden="true" />
            </span>
            <span className={styles.translateBtn}>
              <MdTranslate aria-hidden="true" />
              {translateLabel}
            </span>
            <span className={styles.nextBtn}>Next</span>
          </>
        }
      />

      {/* When an overlay covers the editor, skip the (hidden) body — a height
          placeholder keeps the frame sized and cuts the page's DOM cost. */}
      {overlay ? (
        <div className={styles.bodyPlaceholder} aria-hidden="true" />
      ) : (
        <div className={styles.body}>
          {/* biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable region needs keyboard access */}
          <aside className={styles.panel} tabIndex={0} aria-label="Content blocks">
            <div className={styles.panelTabs}>
              <span className={classNames(styles.panelTab, styles.panelTabActive)}>Content</span>
              <span className={styles.panelTab}>Styles</span>
            </div>

            <div className={styles.segmented}>
              <span className={classNames(styles.seg, styles.segActive)}>Basic</span>
              <span className={styles.seg}>Pre-built</span>
              <span className={styles.seg}>Universal</span>
            </div>

            <p className={styles.blocksTitle}>Blocks</p>
            <div className={styles.blocks}>
              {BLOCKS.map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.label} className={styles.block}>
                    {b.badge ? <span className={styles.badge}>{b.badge}</span> : null}
                    <span className={styles.handle} aria-hidden="true" />
                    <Icon className={styles.blockIcon} aria-hidden="true" />
                    <span className={styles.blockLabel}>{b.label}</span>
                  </div>
                );
              })}
            </div>
          </aside>

          <main className={styles.editor}>
            <div className={styles.toolbar}>
              <div className={styles.undoRedo}>
                <span className={styles.toolBtn} aria-hidden="true">
                  <FiRotateCcw />
                </span>
                <span className={styles.toolBtn} aria-hidden="true">
                  <FiRotateCw />
                </span>
              </div>
              <div className={styles.viewSeg}>
                <span className={classNames(styles.viewSegBtn, styles.viewSegOn)}>
                  <FiMonitor aria-hidden="true" />
                  Desktop
                </span>
                <span className={styles.viewSegBtn}>
                  <FiSmartphone aria-hidden="true" />
                  Mobile
                </span>
              </div>
              <div className={styles.toolRight}>
                <span className={styles.draftBtn}>
                  <LuSparkles aria-hidden="true" />
                  Draft email content
                </span>
                <span className={styles.previewBtn}>Preview &amp; test</span>
              </div>
            </div>

            {stale ? (
              <div className={styles.staleBanner}>
                <FiAlertTriangle className={styles.staleWarn} aria-hidden="true" />
                <span>Modifications to this content may affect how it&rsquo;s translated.</span>
                <span className={styles.reviewLink}>Review translations</span>
              </div>
            ) : null}

            {/* biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable region needs keyboard access */}
            <div className={styles.canvas} tabIndex={0} aria-label="Email canvas">
              <div className={styles.sheet}>
                <EmailPreview edited={stale} />
              </div>
            </div>
          </main>
        </div>
      )}

      {overlay}
    </div>
  );
}
