"use client";

import { dispatchOpenCmdK } from "@/lib/keyboard";

type Props = {
  className?: string;
  ariaLabel?: string;
};

export function CmdKTrigger({ className, ariaLabel = "Open command palette" }: Props) {
  return (
    <button type="button" className={className} onClick={dispatchOpenCmdK} aria-label={ariaLabel}>
      <kbd>⌘</kbd>
      <kbd>K</kbd>
    </button>
  );
}
