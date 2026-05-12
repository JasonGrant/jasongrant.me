"use client";

import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./LeftRail.module.css";

const SECTIONS: { id: string; label: string }[] = [
  { id: "now", label: "Now" },
  { id: "work", label: "Selected work" },
  { id: "writing", label: "Writing" },
];

export function LeftRail() {
  const pathname = usePathname();
  const [active, setActive] = useState("now");

  useEffect(() => {
    if (pathname !== "/") return;
    const targets = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    for (const el of targets) io.observe(el);
    return () => io.disconnect();
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <nav className={styles.rail} aria-label="Section navigation">
      <ul className={styles.list}>
        {SECTIONS.map(({ id, label }) => (
          <li key={id} className={classNames(styles.item, { [styles.active]: active === id })}>
            <a href={`#${id}`} className={styles.link}>
              <span className={styles.tick} aria-hidden="true" />
              <span className={styles.label}>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
