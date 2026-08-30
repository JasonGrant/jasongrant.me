import classNames from "classnames";
import { type ReactElement, type ReactNode, cloneElement, isValidElement, useId } from "react";
import styles from "./FieldRow.module.css";

export interface FieldRowProps {
  label: string;
  anchor: string;
  highlighted?: boolean;
  help?: string;
  children: ReactNode;
}

// Explicit label/control association via htmlFor+id (Biome's
// noLabelWithoutControl flags an implicit wrap here because `children` is
// opaque to it) — this is also the more robust pattern regardless: it
// doesn't depend on `children` always being exactly one focusable element.
export function FieldRow({ label, anchor, highlighted, help, children }: FieldRowProps) {
  const controlId = useId();
  const control =
    isValidElement(children) && !("id" in (children.props as { id?: unknown }))
      ? cloneElement(children as ReactElement<{ id?: string }>, { id: controlId })
      : children;

  return (
    <div data-anchor={anchor} className={classNames(styles.row, highlighted && styles.highlighted)}>
      <label htmlFor={controlId} className={styles.label}>
        {label}
      </label>
      {control}
      {help ? <span className={styles.help}>{help}</span> : null}
    </div>
  );
}
