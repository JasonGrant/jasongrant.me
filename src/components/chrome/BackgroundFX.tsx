"use client";

import { useReducedMotion, useReveal } from "@/lib/motion";
import { useEffect, useRef } from "react";
import styles from "./BackgroundFX.module.css";

export function BackgroundFX() {
  const haloRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Mount the document-wide reveal observer here so it's attached exactly once.
  useReveal();

  useEffect(() => {
    if (reducedMotion) return;
    const halo = haloRef.current;
    if (!halo) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let x = tx;
    let y = ty;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      halo.style.setProperty("--mx", `${x}px`);
      halo.style.setProperty("--my", `${y}px`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <div className={styles.bgFx} aria-hidden="true">
      {!reducedMotion && <div ref={haloRef} className={styles.halo} />}
      <div className={styles.grain} />
    </div>
  );
}
