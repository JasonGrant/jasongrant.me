import type { EmailEditorAnchorId } from "@/content/studies/types";
import classNames from "classnames";
import styles from "./EmailEditor.module.css";
import { Toast } from "./Toast";
import { TranslateModal, type TranslateModalState } from "./TranslateModal";

export interface EmailEditorProps {
  subjectValue: string;
  modal: TranslateModalState;
  highlighted: EmailEditorAnchorId | null;
  toast: string | null;
}

// The email-editor screen. TranslateModal renders as an overlay on top of
// it (data-model.md: "the translate modal is an OVERLAY STATE of the
// email-editor screen, not a screen of its own").
export function EmailEditor({ subjectValue, modal, highlighted, toast }: EmailEditorProps) {
  return (
    <div className="replicaFrame">
      <div className={styles.frame}>
        <div
          data-anchor="subject-field"
          className={classNames(
            styles.field,
            highlighted === "subject-field" && styles.highlighted,
          )}
        >
          <span className={styles.label}>Subject</span>
          <span className={styles.subjectValue}>{subjectValue}</span>
        </div>

        <div
          data-anchor="preview-text"
          className={classNames(styles.field, highlighted === "preview-text" && styles.highlighted)}
        >
          <span className={styles.label}>Preview text</span>
          <div className={styles.previewBar} />
        </div>

        <div
          data-anchor="content-block-list"
          className={classNames(
            styles.field,
            highlighted === "content-block-list" && styles.highlighted,
          )}
        >
          <div className={styles.blockList}>
            <div className={styles.blockBar} style={{ width: "80%" }} />
            <div className={styles.blockBar} style={{ width: "55%" }} />
          </div>
        </div>

        <div className={styles.translateRow}>
          <button
            type="button"
            data-anchor="translate-button"
            className={styles.translateButton}
            style={
              highlighted === "translate-button"
                ? { outline: "2px solid var(--rf-ink)", outlineOffset: 2 }
                : undefined
            }
          >
            Translate
          </button>
        </div>

        {modal.open ? <TranslateModal state={modal} highlighted={highlighted} /> : null}
        <Toast message={toast} />
      </div>
    </div>
  );
}
