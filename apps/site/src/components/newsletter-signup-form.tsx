"use client";

import { FormEvent, useState } from "react";
import styles from "./newsletter-signup-form.module.css";

type SubmissionState = "idle" | "submitting" | "success" | "error";

type SignupResponse = {
  readonly error?: string;
  readonly ok?: boolean;
  readonly redirect?: string;
};

export function NewsletterSignupForm() {
  const [state, setState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState("submitting");
    setMessage("Submitting your request…");

    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: data.get("email"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
        }),
      });
      const result = (await response.json()) as SignupResponse;

      if (!response.ok) {
        throw new Error(
          result.error ?? "Newsletter signup is temporarily unavailable.",
        );
      }

      setState("success");
      setMessage("You are on the Founding Expedition update list.");
      form.reset();
      window.location.assign(result.redirect ?? "/joined");
    } catch (error) {
      setState("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Newsletter signup is temporarily unavailable.",
      );
    }
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate={false}>
      <label className={styles.label} htmlFor="newsletter-email">
        Email address
      </label>
      <div className={styles.row}>
        <input
          className={styles.input}
          id="newsletter-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
          placeholder="you@example.com"
          disabled={state === "submitting"}
        />
        <button
          className="button button-primary"
          type="submit"
          disabled={state === "submitting"}
        >
          {state === "submitting" ? "Joining…" : "Join the expedition"}
        </button>
      </div>

      <label className={styles.consent}>
        <input
          name="consent"
          type="checkbox"
          required
          disabled={state === "submitting"}
        />
        <span>
          I consent to receive occasional Calypso’s Promise project updates by
          email. I can unsubscribe or request deletion at any time.
        </span>
      </label>

      <label className={styles.honeypot} aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <p className={styles.note}>
        Submit only an email address. Do not include health or other sensitive
        information. This is not an account, research enrollment, provider
        intake, or game registration. Read the{" "}
        <a href="/privacy">privacy notice</a>.
      </p>
      <p
        className={styles.status}
        data-state={state}
        aria-live="polite"
        role={state === "error" ? "alert" : "status"}
      >
        {message}
      </p>
    </form>
  );
}
