"use client";

import { site } from "@/content/site";
import { trackNewsletterSubscribe } from "@/lib/analytics";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { useState } from "react";
import styles from "./Newsletter.module.css";

type State =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "done" }
  | { kind: "error"; message: string };

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "sending") return;
    setState({ kind: "sending" });
    const result = await subscribeToNewsletter(email);
    if (result.state === "ok") {
      setState({ kind: "done" });
      trackNewsletterSubscribe();
      return;
    }
    if (result.state === "validation-error") {
      setState({
        kind: "error",
        message:
          result.reason === "empty"
            ? "Please enter an email address."
            : "That doesn't look like an email address.",
      });
      return;
    }
    setState({ kind: "error", message: "Something went wrong. Try again?" });
  }

  return (
    <div className={styles.newsletter} data-reveal>
      <div className={styles.head}>
        <span className={styles.label}>{site.newsletter.name}</span>
        <span className={styles.meta}>{site.newsletter.cadence}</span>
      </div>
      <p className={styles.pitch}>{site.newsletter.pitch}</p>
      {state.kind === "done" ? (
        <div className={styles.done}>Check your inbox to confirm.</div>
      ) : (
        <form className={styles.form} onSubmit={onSubmit} noValidate>
          <input
            type="email"
            required
            placeholder="you@domain.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address"
            className={styles.input}
            autoComplete="email"
          />
          <button type="submit" disabled={state.kind === "sending"} className={styles.button}>
            {state.kind === "sending" ? "Subscribing…" : "Subscribe"}
          </button>
        </form>
      )}
      {state.kind === "error" && <div className={styles.error}>{state.message}</div>}
      <noscript>
        <p className={styles.noscript}>
          JavaScript is required to subscribe inline.{" "}
          <a href={site.socials.substack} target="_blank" rel="noreferrer">
            Subscribe on Substack
          </a>
          .
        </p>
      </noscript>
    </div>
  );
}
