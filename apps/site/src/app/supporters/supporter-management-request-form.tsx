"use client";

import { useId, useState, type FormEvent } from "react";
import styles from "./management.module.css";

type RequestState =
  | Readonly<{ status: "idle" }>
  | Readonly<{ status: "submitting"; message: string }>
  | Readonly<{ status: "success"; message: string }>
  | Readonly<{ status: "error"; message: string }>;

export function SupporterManagementRequestForm() {
  const formId = useId();
  const [state, setState] = useState<RequestState>({ status: "idle" });
  const submitting = state.status === "submitting";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setState({ status: "submitting", message: "Requesting link…" });

    try {
      const response = await fetch("/api/supporters/manage/start", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") ?? ""),
          website: String(data.get("website") ?? ""),
        }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
      };
      if (!response.ok) {
        throw new Error(result.error || "The request could not be completed.");
      }
      setState({
        status: "success",
        message:
          result.message ??
          "When eligible, the supplied inbox will receive a management link.",
      });
    } catch (error) {
      setState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "The request could not be completed.",
      });
    }
  }

  return (
    <form className={styles.requestForm} onSubmit={submit}>
      <div className={styles.field}>
        <label htmlFor={`${formId}-email`}>Email used for your support</label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
        />
        <small>
          The response is identical whether or not the address is registered.
        </small>
      </div>

      <label className={styles.honeypot} aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <button
        className="button button-secondary"
        type="submit"
        disabled={submitting}
      >
        {submitting ? "Requesting…" : "Email me a management link"}
      </button>

      <p
        className={`${styles.status} ${
          state.status === "error" ? styles.error : ""
        }`}
        role="status"
        aria-live="polite"
      >
        {state.status === "idle" ? "" : state.message}
      </p>
    </form>
  );
}
