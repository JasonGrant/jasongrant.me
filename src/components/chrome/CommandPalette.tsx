"use client";

import { paletteItems } from "@/content/palette";
import { trackPaletteAction } from "@/lib/analytics";
import { CMDK_OPEN_EVENT, useEscape, useGlobalCmdK } from "@/lib/keyboard";
import type { CommandPaletteItem, PaletteAction } from "@/types/content";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./CommandPalette.module.css";

function runAction(action: PaletteAction, router: ReturnType<typeof useRouter>) {
  switch (action.kind) {
    case "scroll-to": {
      if (typeof window === "undefined") return;
      if (window.location.pathname === "/") {
        const el = document.getElementById(action.targetId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.location.hash = `#${action.targetId}`;
      } else {
        router.push(`/#${action.targetId}`);
      }
      return;
    }
    case "navigate":
      router.push(action.href);
      return;
    case "open-external":
      window.open(action.href, "_blank", "noopener,noreferrer");
      return;
    case "copy":
      navigator.clipboard?.writeText(action.value).catch(() => {});
      return;
    case "view-source":
      window.open(`view-source:${window.location.href}`, "_blank");
      return;
  }
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const router = useRouter();

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);

  useGlobalCmdK(toggle);
  useEscape(close, open);

  useEffect(() => {
    const onOpen = () => {
      triggerRef.current = document.activeElement;
      setOpen(true);
    };
    window.addEventListener(CMDK_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CMDK_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setIdx(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (triggerRef.current instanceof HTMLElement) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [open]);

  const onQueryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIdx(0);
  }, []);

  // Keep the highlighted palette item in view when arrow-key nav drives it
  // outside the visible scroll area of the listbox.
  useEffect(() => {
    if (!open) return;
    const el = document.getElementById(`cmdk-item-${idx}`);
    el?.scrollIntoView({ block: "nearest" });
  }, [idx, open]);

  const filtered = useMemo<CommandPaletteItem[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return paletteItems;
    return paletteItems.filter((it) =>
      `${it.label} ${it.group} ${it.hint}`.toLowerCase().includes(q),
    );
  }, [query]);

  const run = useCallback(
    (item: CommandPaletteItem) => {
      setOpen(false);
      trackPaletteAction(item.group, item.label);
      setTimeout(() => runAction(item.action, router), 50);
    },
    [router],
  );

  const onInputKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIdx((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const target = filtered[idx];
        if (target) run(target);
      }
    },
    [filtered, idx, run],
  );

  if (!open) return null;

  const groups: { name: string; items: Array<CommandPaletteItem & { _i: number }> }[] = [];
  let lastGroup: string | null = null;
  let flatIdx = 0;
  for (const it of filtered) {
    if (it.group !== lastGroup) {
      groups.push({ name: it.group, items: [] });
      lastGroup = it.group;
    }
    groups[groups.length - 1].items.push({ ...it, _i: flatIdx });
    flatIdx++;
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: backdrop is a click-anywhere-to-close target; Escape is handled by useEscape()
    <div
      className={styles.backdrop}
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: card-level onClick only stops propagation; all real key handling lives on the input */}
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <div className={styles.inputWrap}>
          <span className={styles.prompt} aria-hidden="true">
            ›
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={onQueryChange}
            onKeyDown={onInputKey}
            placeholder="Search or jump to…"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            enterKeyHint="go"
            className={styles.input}
            aria-label="Command palette search"
            aria-activedescendant={filtered[idx] ? `cmdk-item-${idx}` : undefined}
            aria-controls="cmdk-list"
          />
          <span className={styles.kbd}>esc</span>
        </div>
        <div className={styles.list} id="cmdk-list" role="listbox">
          {groups.length === 0 && <div className={styles.empty}>No matches</div>}
          {groups.map((g) => (
            <div key={g.name} className={styles.group}>
              <div className={styles.groupLabel}>{g.name}</div>
              {g.items.map((it) => (
                <button
                  key={`${g.name}-${it.label}`}
                  id={`cmdk-item-${it._i}`}
                  type="button"
                  role="option"
                  aria-selected={it._i === idx}
                  className={classNames(styles.item, { [styles.active]: it._i === idx })}
                  onMouseEnter={() => setIdx(it._i)}
                  onClick={() => run(it)}
                >
                  <span>{it.label}</span>
                  <span className={styles.hint}>{it.hint}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.foot}>
          <span>↑↓ navigate</span>
          <span>⏎ select</span>
          <span>built by hand · Next.js · view source</span>
        </div>
      </div>
    </div>
  );
}
