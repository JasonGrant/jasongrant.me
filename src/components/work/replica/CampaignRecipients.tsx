import classNames from "classnames";
import { FiChevronDown, FiHelpCircle, FiPlus, FiX } from "react-icons/fi";
import styles from "./CampaignRecipients.module.css";
import { CampaignTopBar } from "./CampaignTopBar";

// A sanitized recreation of the Klaviyo campaign builder's "Recipients" step
// (constitution v1.2.4: real branding is permitted on the unlisted, noindexed
// /work routes; all data here is fictional). Screen 1 of the email-translation
// flow. Display-only, like KlaviyoAppScreen — the crafted UI, no wiring yet.
export function CampaignRecipients() {
  return (
    <div className={classNames("replicaFrame", styles.app)}>
      <CampaignTopBar
        campaign="Summer Coffee Promo"
        stepLabel="Recipients"
        steps={[
          { id: "recipients", state: "active" },
          { id: "message", state: "todo" },
          { id: "review", state: "todo" },
        ]}
        savedText="43 seconds ago"
      />

      <div className={styles.body}>
        <div className={styles.main}>
          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Audience</h3>

            <div className={styles.field}>
              <span className={styles.fieldLabel}>Send to</span>
              <div className={styles.select}>
                <span className={styles.chip}>
                  Multilingual list (34,812)
                  <FiX className={styles.chipX} aria-hidden="true" />
                </span>
                <FiChevronDown className={styles.selectChevron} aria-hidden="true" />
              </div>
            </div>

            <span className={styles.addRow}>
              <FiPlus aria-hidden="true" />
              Don&rsquo;t send to
            </span>

            <div className={styles.toggleRow}>
              <span className={classNames(styles.toggle, styles.toggleOn)} aria-hidden="true">
                <span className={styles.knob} />
              </span>
              <span className={styles.toggleLabel}>Turn on Smart Sending</span>
            </div>
            <p className={styles.explain}>
              This campaign will not be sent to profiles who received a message from you in the past{" "}
              <strong>16 hours</strong>. Smart Sending timeframes can be updated in{" "}
              <span className={styles.link}>account settings</span>.
            </p>
          </section>

          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Tracking</h3>
            <div className={styles.toggleRow}>
              <span className={styles.toggle} aria-hidden="true">
                <span className={styles.knob} />
              </span>
              <span className={styles.toggleLabel}>Include tracking parameters</span>
            </div>
            <p className={styles.explain}>
              Links in this campaign will include additional tracking information, called UTM
              parameters. This allows source tracking within third-party reporting tools such as
              Google Analytics. <span className={styles.link}>Learn more about UTM Tracking</span>
            </p>
          </section>
        </div>

        <aside className={styles.aside}>
          <span className={styles.bigNum}>34,812</span>
          <span className={styles.asideLabel}>
            Estimated recipients
            <FiHelpCircle className={styles.help} aria-hidden="true" />
          </span>
        </aside>
      </div>
    </div>
  );
}
