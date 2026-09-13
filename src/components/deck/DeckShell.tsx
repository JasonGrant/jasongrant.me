"use client";

import type { DeckOutline } from "@/content/deck/types";
import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./DeckShell.module.css";
import { DeckSlideFrame } from "./DeckSlideFrame";
import { Navigator } from "./Navigator";
import { ResetButton } from "./ResetButton";
import { Stage } from "./Stage";
import { useDeckKeyboard } from "./useDeckKeyboard";
import { DeckResetProvider, useDeckReset } from "./useDeckReset";

interface FlatEntry {
  section: string;
  slide: string;
  resettable: boolean;
}

function flatten(outline: DeckOutline): FlatEntry[] {
  return outline.sections.flatMap((s) =>
    s.slides.map((sl) => ({ section: s.slug, slide: sl.slug, resettable: sl.resettable })),
  );
}

// Persists across slide navigations — rendered once by
// src/app/deck/[secret]/layout.tsx, so navigator state, keyboard handling,
// and the reset nonce all survive the page swap below it (research D5).
export function DeckShell({
  secret,
  outline,
  children,
}: {
  secret: string;
  outline: DeckOutline;
  children: React.ReactNode;
}) {
  return (
    <DeckResetProvider>
      <DeckShellInner secret={secret} outline={outline}>
        {children}
      </DeckShellInner>
    </DeckResetProvider>
  );
}

function DeckShellInner({
  secret,
  outline,
  children,
}: {
  secret: string;
  outline: DeckOutline;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  const { reset } = useDeckReset();
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const flat = useMemo(() => flatten(outline), [outline]);
  const currentSection = segments[0] ?? outline.sections[0]?.slug ?? "";
  const currentSlide = segments[1] ?? outline.sections[0]?.slides[0]?.slug ?? "";
  const index = flat.findIndex((e) => e.section === currentSection && e.slide === currentSlide);
  const current = index >= 0 ? flat[index] : null;
  const prev = index > 0 ? flat[index - 1] : null;
  const next = index >= 0 && index < flat.length - 1 ? flat[index + 1] : null;

  const hrefFor = (e: FlatEntry) => `/deck/${secret}/${e.section}/${e.slide}`;

  // Instant keyboard steps: fetch the neighbours' RSC payloads ahead of time.
  // biome-ignore lint/correctness/useExhaustiveDependencies: hrefFor closes over `secret`, which is constant for the life of this component; re-running only on the neighbour slugs is deliberate
  useEffect(() => {
    if (prev) router.prefetch(hrefFor(prev));
    if (next) router.prefetch(hrefFor(next));
  }, [prev?.section, prev?.slide, next?.section, next?.slide, router]);

  useDeckKeyboard({
    onNext: () => next && router.push(hrefFor(next), { scroll: false }),
    onPrev: () => prev && router.push(hrefFor(prev), { scroll: false }),
    onFirst: () => flat[0] && router.push(hrefFor(flat[0]), { scroll: false }),
    onLast: () =>
      flat[flat.length - 1] && router.push(hrefFor(flat[flat.length - 1]), { scroll: false }),
    onReset: current?.resettable ? reset : null,
    onEscape: () => {
      setNavOpen(false);
      const active = document.activeElement;
      if (active instanceof HTMLElement && navRef.current?.contains(active)) {
        active.blur();
      }
    },
  });

  return (
    <div className={styles.root}>
      <Stage>
        <DeckSlideFrame>{children}</DeckSlideFrame>
      </Stage>
      <ResetButton resettable={current?.resettable ?? false} />
      <Navigator
        ref={navRef}
        secret={secret}
        outline={outline}
        currentSection={currentSection}
        currentSlide={currentSlide}
        open={navOpen}
        onToggle={() => setNavOpen((o) => !o)}
      />
    </div>
  );
}
