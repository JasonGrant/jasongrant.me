"use client";

import { useEffect, useState } from "react";

// Deliberate duplicate of src/lib/motion.ts's useReducedMotion. Importing
// the shared hook would pull work-route code into a module also bundled
// for (main)'s client graph, risking webpack chunk re-partitioning that
// would muddy SC-004's core-page isolation diff (research D8). Five lines
// is cheaper than that risk.
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
