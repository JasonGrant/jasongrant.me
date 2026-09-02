"use client";

import { useId, useState } from "react";
import styles from "./Tabs.module.css";

export interface TabsProps {
  label: string;
  tabs: { id: string; label: string; panel: React.ReactNode }[];
  initialId?: string;
}

// Native-pattern tabs: role=tablist/tab/tabpanel, arrow-key navigation
// between tabs, one tab in the Tab order at a time.
export function Tabs({ label, tabs, initialId }: TabsProps) {
  const [activeId, setActiveId] = useState(initialId ?? tabs[0]?.id);
  const idBase = useId();

  function handleKeyDown(e: React.KeyboardEvent) {
    const idx = tabs.findIndex((t) => t.id === activeId);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveId(tabs[(idx + 1) % tabs.length].id);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveId(tabs[(idx - 1 + tabs.length) % tabs.length].id);
    }
  }

  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <div>
      <div role="tablist" aria-label={label} className={styles.list} onKeyDown={handleKeyDown}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`${idBase}-tab-${tab.id}`}
            aria-selected={tab.id === activeId}
            aria-controls={`${idBase}-panel-${tab.id}`}
            tabIndex={tab.id === activeId ? 0 : -1}
            className={styles.tab}
            onClick={() => setActiveId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${idBase}-panel-${active.id}`}
        aria-labelledby={`${idBase}-tab-${active.id}`}
      >
        {active.panel}
      </div>
    </div>
  );
}
