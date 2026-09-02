import classNames from "classnames";
import { FiCheck, FiMail, FiMoreVertical, FiSmile, FiUser } from "react-icons/fi";
import styles from "./CampaignMessage.module.css";
import { CampaignTopBar } from "./CampaignTopBar";
import { EmailPreview } from "./EmailPreview";

// Placeholder template tiles shown beside the selected one (stable keys, no
// index-as-key). Fictional names — the tiles render as blank grey squares.
const OTHER_TEMPLATES = ["welcome", "receipt", "winback", "launch", "digest"];

// A sanitized recreation of the Klaviyo campaign builder's "Message" step
// (constitution v1.2.4: real branding permitted on the unlisted, noindexed
// /work routes; fictional data). Screen 2 of the email-translation flow. The
// selected tile shows the real email creative we'll use; the other tiles are
// grayscale abstractions standing in for the rest of the library.
export function CampaignMessage() {
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
        savedText="1 minute ago"
        showBack
      />

      <div className={styles.body}>
        {/* Left — template picker */}
        <div className={styles.templates}>
          <div className={styles.tHead}>
            <h3 className={styles.tTitle}>Templates</h3>
            <div className={styles.createSplit}>
              <span className={styles.createBtn}>Create</span>
              <span className={styles.createMenu} aria-hidden="true">
                <FiMoreVertical />
              </span>
            </div>
          </div>

          <div className={styles.tGrid}>
            {/* Selected template — the real email creative we'll use. */}
            <div className={classNames(styles.thumb, styles.thumbActive)}>
              <div className={styles.thumbEmail}>
                <EmailPreview />
              </div>
            </div>
            {/* Other templates — grayscale email abstractions. */}
            {OTHER_TEMPLATES.map((id) => (
              <div key={id} className={styles.thumb}>
                <div className={styles.emAb} aria-hidden="true">
                  <div className={styles.emLogo} />
                  <div className={styles.emBar} />
                  <div className={styles.emLine} />
                  <div className={classNames(styles.emLine, styles.emLineShort)} />
                  <div className={styles.emImg} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — message settings */}
        <div className={styles.message}>
          <div className={styles.mHead}>
            <FiMail aria-hidden="true" className={styles.mIcon} />
            <h3 className={styles.mTitle}>Email message</h3>
          </div>

          <div className={styles.mField}>
            <span className={styles.mLabel}>
              Subject line <em className={styles.req}>*</em>
            </span>
            <div className={styles.inputRow}>
              <span className={styles.input}>Your new summer coffee obsession has arrived</span>
              <span className={styles.inputIcon} aria-hidden="true">
                <FiSmile />
              </span>
              <span
                className={classNames(styles.inputIcon, styles.inputIconAccent)}
                aria-hidden="true"
              >
                <FiUser />
              </span>
            </div>
          </div>

          <div className={styles.mField}>
            <span className={styles.mLabel}>Preview text</span>
            <span className={classNames(styles.input, styles.inputSolo)}>Taste the sunshine</span>
          </div>

          <div className={styles.mField}>
            <span className={styles.mLabel}>
              Sender name <em className={styles.req}>*</em>
            </span>
            <span className={classNames(styles.input, styles.inputSolo)}>
              Coastal Brew Coffee Co.
            </span>
          </div>

          <div className={styles.mField}>
            <span className={styles.mLabel}>
              Sender email <em className={styles.req}>*</em>
            </span>
            <span className={classNames(styles.input, styles.inputSolo)}>hello@coastalbrew.co</span>
          </div>

          <div className={styles.checkRow}>
            <span className={styles.checkbox} aria-hidden="true">
              <FiCheck />
            </span>
            <span className={styles.checkLabel}>Use as reply-to</span>
          </div>
        </div>
      </div>
    </div>
  );
}
