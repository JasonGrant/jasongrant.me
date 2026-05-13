"use client";

import { dispatchOpenCmdK } from "@/lib/keyboard";
import type { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export function PortraitButton({ className, children }: Props) {
  return (
    <button
      type="button"
      className={className}
      onClick={dispatchOpenCmdK}
      aria-label="Open command palette"
    >
      {children}
    </button>
  );
}
