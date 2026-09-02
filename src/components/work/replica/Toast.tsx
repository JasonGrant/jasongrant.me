import styles from "./Toast.module.css";

export interface ToastProps {
  message: string | null;
}

// Visual only — deliberately carries no aria-live of its own. The player
// owns the single aria-live region for the whole segment (research D7,
// contracts/accessibility.md) so a toast never double-announces.
export function Toast({ message }: ToastProps) {
  if (!message) return null;
  return <div className={styles.toast}>{message}</div>;
}
