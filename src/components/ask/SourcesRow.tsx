"use client";

import { ArrowOut } from "@/components/primitives/ArrowOut";
import Link from "next/link";
import styles from "./ask.module.css";
import type { Source } from "./wire";

const SITE_HOSTS = new Set(["jasongrant.me", "www.jasongrant.me"]);

/** An address on this site as a path (so the conversation survives the navigation), else null. */
function internalPath(url: string): string | null {
  try {
    const parsed = new URL(url, window.location.origin);
    if (parsed.origin === window.location.origin || SITE_HOSTS.has(parsed.hostname)) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
  } catch {
    // fall through
  }
  return null;
}

/**
 * The "From" row: one to three title-only pills under the reply label, before the
 * text. It renders as soon as `meta` arrives, so it never moves while text streams.
 * A page on this site opens in the same tab and the chat stays open; anything else
 * opens in a new tab (spec FR-026).
 */
export function SourcesRow({ sources }: { sources: Source[] }) {
  if (sources.length === 0) return null;
  return (
    <nav className={styles.sources} aria-label="Sources for this answer">
      <span className={styles.eyebrow} aria-hidden="true">
        From
      </span>
      {sources.map((source) => {
        if (!source.url) {
          return (
            <span key={source.entry_id} className={styles.pill}>
              {source.title}
            </span>
          );
        }
        const path = internalPath(source.url);
        if (path) {
          return (
            <Link key={source.entry_id} href={path} className={styles.pill}>
              {source.title}
            </Link>
          );
        }
        return (
          <a
            key={source.entry_id}
            href={source.url}
            className={styles.pill}
            target="_blank"
            rel="noreferrer"
          >
            {source.title}
            <ArrowOut />
            <span className={styles.srOnly}> (opens in new tab)</span>
          </a>
        );
      })}
    </nav>
  );
}
