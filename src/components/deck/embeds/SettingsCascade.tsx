import { SettingsPanel } from "@/components/work/replica/SettingsPanel";
import styles from "./SettingsCascade.module.css";

// Both panels compose directly (no Player, no walkthroughControls flag —
// research D11): the org panel's own Save publishes to orgSettingsStore, and
// the personal panel's own effect picks up the inherited default live, the
// same cascade the study demonstrates via a scripted walkthrough. Two
// visible column titles both label the panels for sighted readers and keep
// the outline logical under the slide's single <h1>; SettingsPanel itself
// renders an <h3>.
export function SettingsCascade() {
  return (
    <div className={styles.grid}>
      <div>
        <h2 className={styles.panelTitle}>Organization</h2>
        <SettingsPanel
          screen="org-settings"
          languageValue="English"
          formatValue="United States"
          localizationLanguages={[]}
          highlighted={null}
          toast={null}
          disabled={false}
        />
      </div>
      <div>
        <h2 className={styles.panelTitle}>Personal</h2>
        <SettingsPanel
          screen="personal-settings"
          languageValue="English"
          formatValue="United States"
          localizationLanguages={[]}
          highlighted={null}
          toast={null}
          disabled={false}
        />
      </div>
    </div>
  );
}
