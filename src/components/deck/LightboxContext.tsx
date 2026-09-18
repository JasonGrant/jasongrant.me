"use client";

import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Lightbox } from "./Lightbox";

export interface LightboxImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** One or more images shown together — a before/after pair, or a whole set
 *  of screens from one app. Left/right moves between groups, not between
 *  images within a group. */
export type LightboxGroup = LightboxImage[];

interface LightboxState {
  groups: LightboxGroup[];
  index: number;
}

interface LightboxContextValue {
  /** Opens the lightbox on `groups[index]`. `returnFocus` gets focus back
   *  when the lightbox closes — pass the element that was clicked. */
  open: (groups: LightboxGroup[], index: number, returnFocus: HTMLElement | null) => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

// Mounted once by DeckShell, above the scaled Stage (data-model.md /
// research.md D6-D7 precedent: viewport chrome lives outside the transform
// so it isn't capped by --deck-scale). Slide navigation closes it, since an
// open lightbox belongs to the slide that opened it, not the next one.
export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<LightboxState | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname itself isn't read — it's the trigger for closing on navigation, not a value the close logic depends on
  useEffect(() => {
    setState(null);
  }, [pathname]);

  const open = useCallback(
    (groups: LightboxGroup[], index: number, returnFocus: HTMLElement | null) => {
      returnFocusRef.current = returnFocus;
      setState({ groups, index });
    },
    [],
  );

  const close = useCallback(() => {
    setState(null);
    returnFocusRef.current?.focus();
  }, []);

  const step = useCallback((delta: number) => {
    setState((s) =>
      s ? { ...s, index: (s.index + delta + s.groups.length) % s.groups.length } : s,
    );
  }, []);

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}
      {state ? (
        <Lightbox
          group={state.groups[state.index]}
          index={state.index}
          total={state.groups.length}
          onClose={close}
          onNext={() => step(1)}
          onPrev={() => step(-1)}
        />
      ) : null}
    </LightboxContext.Provider>
  );
}

export function useLightbox(): LightboxContextValue {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used within a LightboxProvider");
  return ctx;
}
