"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FiCheck, FiChevronDown, FiMinus, FiSearch } from "react-icons/fi";
import styles from "./ContentLanguagePicker.module.css";
import { ALL_CONTENT_LANGUAGES, CONTENT_LANGUAGE_GROUPS } from "./contentLanguages";

export interface ContentLanguagePickerProps {
  selected: string[];
  onToggle: (lang: string) => void;
  onSetLanguages: (langs: string[]) => void;
  disabled?: boolean;
  searchPlaceholder: string;
  noMatchesLabel: string;
  allLabel: string;
  selectLabel: string;
}

// The trigger summarises the selection with the first few languages; anything
// beyond that collapses to a "+N" chip.
const MAX_CHIPS = 3;

// Compact grouped multi-select. Collapsed, the trigger shows a short summary
// (first few languages, then "+N", or "All languages"); opening it reveals a
// Select-all toggle, a search box, and the scrollable grouped list. Native
// buttons keep it keyboard operable without a bespoke listbox.
export function ContentLanguagePicker({
  selected,
  onToggle,
  onSetLanguages,
  disabled,
  searchPlaceholder,
  noMatchesLabel,
  allLabel,
  selectLabel,
}: ContentLanguagePickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  const allSelected = selected.length > 0 && selected.length === ALL_CONTENT_LANGUAGES.length;
  const someSelected = selected.length > 0 && !allSelected;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const q = query.trim().toLowerCase();
  const groups = CONTENT_LANGUAGE_GROUPS.map((grp) => ({
    group: grp.group,
    languages: q ? grp.languages.filter((l) => l.toLowerCase().includes(q)) : grp.languages,
  })).filter((grp) => grp.languages.length > 0);

  const chips = selected.slice(0, MAX_CHIPS);
  const overflow = Math.max(0, selected.length - MAX_CHIPS);

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.control}
        aria-expanded={open}
        aria-controls={panelId}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={styles.summary}>
          {selected.length === 0 ? (
            <span className={styles.placeholder}>{selectLabel}</span>
          ) : allSelected ? (
            <span className={styles.chip}>{allLabel}</span>
          ) : (
            <>
              {chips.map((lang) => (
                <span key={lang} className={styles.chip}>
                  {lang}
                </span>
              ))}
              {overflow > 0 ? <span className={styles.moreChip}>+{overflow}</span> : null}
            </>
          )}
        </span>
        <FiChevronDown className={styles.chevron} data-open={open} aria-hidden="true" />
      </button>

      {open ? (
        <div className={styles.panel} id={panelId}>
          <button
            type="button"
            className={styles.allToggle}
            aria-pressed={allSelected}
            disabled={disabled}
            onClick={() => onSetLanguages(allSelected ? [] : [...ALL_CONTENT_LANGUAGES])}
          >
            <span
              className={styles.allDot}
              data-state={allSelected ? "all" : someSelected ? "some" : "none"}
            >
              {allSelected ? <FiCheck aria-hidden="true" /> : null}
              {someSelected ? <FiMinus aria-hidden="true" /> : null}
            </span>
            {allLabel}
          </button>

          <div className={styles.searchWrap}>
            <FiSearch className={styles.searchIcon} aria-hidden="true" />
            <input
              type="search"
              className={styles.search}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={disabled}
            />
          </div>

          <div className={styles.list}>
            {groups.length === 0 ? (
              <p className={styles.empty}>{noMatchesLabel}</p>
            ) : (
              groups.map((grp) => (
                <div key={grp.group} className={styles.group} role="group" aria-label={grp.group}>
                  <p className={styles.groupHead}>{grp.group}</p>
                  <div className={styles.options}>
                    {grp.languages.map((lang) => {
                      const on = selected.includes(lang);
                      return (
                        <button
                          key={lang}
                          type="button"
                          className={styles.option}
                          data-on={on}
                          aria-pressed={on}
                          disabled={disabled}
                          onClick={() => onToggle(lang)}
                        >
                          <span className={styles.optDot}>
                            {on ? <FiCheck aria-hidden="true" /> : null}
                          </span>
                          {lang}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
