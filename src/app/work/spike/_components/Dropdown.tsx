"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FiCheck, FiChevronDown } from "react-icons/fi";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}

// Nord/Graphite-style select: a styled trigger + floating listbox, keyboard
// accessible (roving highlight via aria-activedescendant, arrows/enter/esc/
// home/end), click-outside to close, focus returned to the trigger on close.
export function Dropdown({ label, value, options, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => Math.max(0, options.indexOf(value)));
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const baseId = useId();

  useEffect(() => {
    if (!open) return;
    setActive(Math.max(0, options.indexOf(value)));
    listRef.current?.focus();
  }, [open, options, value]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const commit = (i: number) => {
    onChange(options[i]);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + options.length) % options.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      commit(active);
    } else if (e.key === "Escape" || e.key === "Tab") {
      setOpen(false);
      if (e.key === "Escape") triggerRef.current?.focus();
    }
  };

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      >
        {value}
        <FiChevronDown className={styles.chevron} />
      </button>
      {open ? (
        <ul
          ref={listRef}
          className={styles.menu}
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          aria-activedescendant={`${baseId}-${active}`}
          onKeyDown={onListKey}
        >
          {options.map((opt, i) => (
            <li
              key={opt}
              id={`${baseId}-${i}`}
              role="option"
              aria-selected={opt === value}
              data-active={i === active}
              className={styles.option}
              onMouseEnter={() => setActive(i)}
              onClick={() => commit(i)}
            >
              <span className={styles.check}>{opt === value ? <FiCheck /> : null}</span>
              {opt}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
