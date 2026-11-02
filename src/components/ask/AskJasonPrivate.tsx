"use client";

import { setAskArmed, useAskArmed } from "@/lib/askArmed";
import { Suspense, lazy, useEffect } from "react";
import { checkKey } from "./keyGate";

// Private mode: the page ships only this check. The bar (and everything behind it)
// is a separate chunk fetched after the key matches, so a visitor without the key
// downloads none of it, sees no entry point and makes no request.
const Bar = lazy(() => import("./Bar"));

export default function AskJasonPrivate() {
  const armed = useAskArmed();
  useEffect(() => {
    let alive = true;
    void checkKey().then((ok) => {
      if (alive && ok) setAskArmed(true);
    });
    return () => {
      alive = false;
    };
  }, []);
  return armed ? (
    <Suspense fallback={null}>
      <Bar />
    </Suspense>
  ) : null;
}
