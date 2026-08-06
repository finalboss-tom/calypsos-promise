"use client";

import { useId, useState, type FormEvent } from "react";
import styles from "./supporters.module.css";

type SubmissionState =
  | Readonly<{ status: "idle" }>
  | Readonly<{ status: "submitting"; message: string }>
  | Readonly<{ status: "success"; message: string }>
  | Readonly<{ status: "error"; message: string }>;

export function SupporterEnrollmentForm({
  promiseVersionLabel,
}: {
  promiseVersionLabel: string;
}) {
  const [visibility, setVisibility] = useState<"private" | "public">("private");
  const [submission, setSubmission] = useState<SubmissionState>({
    status: "idle",
  });
  const formId = useId();
  const publicFieldsId = `${formId}-public-fields`;
  const isSubmitting = submission.status === "submitting";
  const isPublic = visibility === "public";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSubmission({ status: "submitting", message: "Submitting…" });

    const payload = {
      email: String(data.get("email") ?? ""),
      adultAttestation: data.get("adultAttestation") === "on",
      signatureConsent: data.get("signatureConsent") === "on",
      visibility,
      publicListingConsent: data.get("publicListingConsent") === "on",
      displayName: String(data.get("displayName") ?? ""),
      profileSlug: String(data.get("profileSlug") ?? ""),
      broadRegion: String(data.get("broadRegion") ?? ""),
      whyISigned: String(data.get("whyISigned") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/supporters/start", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
      };
      if (!response.ok) {
        throw new Error(result.error || "The request could not be completed.");
      }
      setSubmission({
        status: "success",
        message:
          result.message ??
          "Check the supplied inbox for a single-use verification link.",
      });
    } catch (error) {
      setSubmission({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "The request could not be completed.",
      });
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.field}>
        <label htmlFor={`${formId}-email`}>Email you control</label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
        />
        <small>
          Used only to verify and manage this supporter record. Newsletter
          consent remains separate.
        </small>
      </div>

      <fieldset className={styles.fieldset}>
        <legend>Required affirmations</legend>
        <label className={styles.checkboxLabel}>
          <input name="adultAttestation" type="checkbox" required />
          <span>I attest that I am at least 18 years old.</span>
        </label>
        <label className={styles.checkboxLabel}>
          <input name="signatureConsent" type="checkbox" required />
          <span>
            I affirm the exact Personal Health Data Promise shown on this page,
            version <strong>{promiseVersionLabel}</strong>.
          </span>
        </label>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend>Visibility</legend>
        <label className={styles.radioLabel}>
          <input
            name="visibility"
            type="radio"
            value="private"
            checked={!isPublic}
            onChange={() => setVisibility("private")}
          />
          <span>
            <strong>Private supporter</strong>
            <small>Count me, but do not display my name or profile.</small>
          </span>
        </label>
        <label className={styles.radioLabel}>
          <input
            name="visibility"
            type="radio"
            value="public"
            checked={isPublic}
            onChange={() => setVisibility("public")}
            aria-controls={publicFieldsId}
            aria-expanded={isPublic}
          />
          <span>
            <strong>Public supporter</strong>
            <small>
              Count me and publish only the profile fields I provide below.
            </small>
          </span>
        </label>
      </fieldset>

      {isPublic ? (
        <fieldset id={publicFieldsId} className={styles.fieldset}>
          <legend>Optional public profile</legend>
          <label className={styles.checkboxLabel}>
            <input name="publicListingConsent" type="checkbox" required />
            <span>
              I separately consent to publishing this profile. I understand I
              may later return it to private without surrendering my supporter
              record.
            </span>
          </label>
          <div className={styles.fieldGrid}>
            <div className={styles.field}>
              <label htmlFor={`${formId}-display-name`}>Display name</label>
              <input
                id={`${formId}-display-name`}
                name="displayName"
                type="text"
                maxLength={100}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor={`${formId}-profile-slug`}>Profile slug</label>
              <input
                id={`${formId}-profile-slug`}
                name="profileSlug"
                type="text"
                inputMode="url"
                autoCapitalize="none"
                spellCheck={false}
                maxLength={64}
                pattern="[a-z0-9](?:[a-z0-9-]{0,62}[a-z0-9])?"
                required
              />
              <small>Lowercase letters, numbers, and hyphens.</small>
            </div>
          </div>
          <div className={styles.field}>
            <label htmlFor={`${formId}-region`}>Broad region</label>
            <input
              id={`${formId}-region`}
              name="broadRegion"
              type="text"
              maxLength={100}
              placeholder="For example: Mid-Atlantic, United States"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor={`${formId}-why`}>Why I signed</label>
            <textarea
              id={`${formId}-why`}
              name="whyISigned"
              maxLength={1000}
              rows={5}
            />
          </div>
        </fieldset>
      ) : null}

      <label className={styles.honeypot} aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <button
        className="button button-primary"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending verification…" : "Sign and verify by email"}
      </button>

      <p
        className={`${styles.status} ${
          submission.status === "error" ? styles.error : ""
        }`}
        role="status"
        aria-live="polite"
      >
        {submission.status === "idle" ? "" : submission.message}
      </p>
    </form>
  );
}
