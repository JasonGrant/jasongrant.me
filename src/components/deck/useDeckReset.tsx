"use client";

import { resetOrgSettings } from "@/components/work/replica/orgSettingsStore";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

// Reset without reload (feature 008, research D10). `nonce` is bumped on
// every reset; DeckSlideFrame keys the slide subtree on it, so every
// embedded component's own useState is discarded on remount. The org-
// settings singleton is cleared FIRST, before the bump, so a freshly
// mounted personal panel's useSyncExternalStore snapshot reads null rather
// than a stale published value.
interface DeckResetContextValue {
  nonce: number;
  reset: () => void;
}

const DeckResetContext = createContext<DeckResetContextValue | null>(null);

export function DeckResetProvider({ children }: { children: React.ReactNode }) {
  const [nonce, setNonce] = useState(0);
  const reset = useCallback(() => {
    resetOrgSettings();
    setNonce((n) => n + 1);
  }, []);
  const value = useMemo(() => ({ nonce, reset }), [nonce, reset]);
  return <DeckResetContext.Provider value={value}>{children}</DeckResetContext.Provider>;
}

export function useDeckReset(): DeckResetContextValue {
  const ctx = useContext(DeckResetContext);
  if (!ctx) throw new Error("useDeckReset must be used within DeckResetProvider");
  return ctx;
}
