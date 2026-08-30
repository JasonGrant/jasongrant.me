"use client";

import { glossary } from "@/content/studies/glossary";
import type { GlossaryTermId } from "@/content/studies/types";
import { useId, useState } from "react";
import styles from "./GlossaryChip.module.css";

interface GlossaryChipProps {
  term: GlossaryTermId;
}

// Inline glossary affordance (FR-015/research D13): a native disclosure
// pattern, not a tooltip-only pattern (which fails on touch) and not a
// modal. Definition renders in place, right after the chip.
export function GlossaryChip({ term }: GlossaryChipProps) {
  const [open, setOpen] = useState(false);
  const entry = glossary[term];
  const disclosureId = useId();

  return (
    <span>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-controls={disclosureId}
        onClick={() => setOpen((v) => !v)}
      >
        {entry.label}
      </button>
      {open ? (
        <span id={disclosureId} className={styles.disclosure} role="note">
          {entry.definition}
        </span>
      ) : null}
    </span>
  );
}
