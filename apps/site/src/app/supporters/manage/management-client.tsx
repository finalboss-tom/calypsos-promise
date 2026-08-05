"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import styles from "../management.module.css";

type ManagementRecord = Readonly<{
  supporterRevision: number;
  visibility: "private" | "public";
  foundingNumber: number | null;
  displayName: string | null;
  profileSlug: string | null;
  broadRegion: string | null;
  whyISigned: string | null;
  expiresAt: string;
}>;

type ViewState =
  | Readonly<{ status: "reading"; message: string }>
  | Readonly<{ status: "loading"; message: string }>
  | Readonly<{ status: "ready"; record: ManagementRecord }>
  | Readonly<{ status: "submitting"; record: ManagementRecord; message: string }>
  | Readonly<{ status: "success"; message: string }>
  | Readonly<{ status: "error"; message: string }>;

export function SupporterManagementClient() {
  const started = useRef(false);
  const [token, setToken] = useState("");
  const [view, setView] = useState<ViewState>({
    status: "reading",
    message: "Reading the single-use management fragment…",
  });
  const formId = useId();

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const params = new URLSearchParams(window.location.hash.slice(1));
    const fragmentToken = params.get("token") ?? "";
    window.history.replaceState(null, "", window.location.pathname);

    if (!fragmentToken) {
      setView({
        status: "error",
        message: "This management link is missing its token.",
      });
      return;
    }

    setToken(fragmentToken);
    setView({ status: "loading", message: "Loading supporter record…" });

    void fetch("/api/supporters/manage/state", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: fragmentToken }),
    })
      .then(async (response) => {
        const result = (await response.json().catch(() => ({}))) as
          | ({ ok?: boolean; error?: string } & Partial<ManagementRecord>)
          | undefined;
        if (
          !response.ok ||
          !result?.ok ||
          typeof result.supporterRevision !== "number" ||
          (result.visibility !== "private" && result.visibility !== "public")
        ) {
          throw new Error(
            result?.error || "This management link is invalid or expired.",
          );
        }

        setView({
          status: "ready",
          record: {
            supporterRevision: result.supporterRevision,
            visibility: result.visibility,
            foundingNumber:
              typeof result.foundingNumber === "number"
                ? result.foundingNumber
                : null,
            displayName:
              typeof result.displayName === "string" ? result.displayName : null,
            profileSlug:
              typeof result.profileSlug === "string" ? result.profileSlug : null,
            broadRegion:
              typeof result.broadRegion === "string" ? result.broadRegion : null,
            whyISigned:
              typeof result.whyISigned === "string" ? result.whyISigned : null,
            expiresAt:
              typeof result.expiresAt === "string" ? result.expiresAt : "",
          },
        });
      })
      .catch((error: unknown) => {
        setView({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "This management link is invalid or expired.",
        });
      });
  }, []);

  async function apply(
    record: ManagementRecord,
    payload: Record<string, unknown>,
    message: string,
  ) {
    setView({ status: "submitting", record, message });
    try {
      const response = await fetch("/api/supporters/manage/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token,
          expectedRevision: record.supporterRevision,
          ...payload,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };
      if (!response.ok || !result.ok) {
        throw new Error(result.error || "The change could not be applied.");
      }
      setView({
        status: "success",
        message: result.message || "The supporter record was updated.",
      });
    } catch (error) {
      setView({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "The change could not be applied.",
      });
    }
  }

  function submitPublicProfile(
    event: FormEvent<HTMLFormElement>,
    record: ManagementRecord,
    action: "set_public" | "update_public_profile",
  ) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    void apply(
      record,
      {
        action,
        displayName: String(data.get("displayName") ?? ""),
        profileSlug: String(data.get("profileSlug") ?? ""),
        broadRegion: String(data.get("broadRegion") ?? ""),
        whyISigned: String(data.get("whyISigned") ?? ""),
        publicListingConsent:
          action === "set_public"
            ? data.get("publicListingConsent") === "on"
            : undefined,
      },
      action === "set_public"
        ? "Publishing your profile…"
        : "Updating your public profile…",
    );
  }

  if (view.status === "reading" || view.status === "loading") {
    return <p className={styles.managementStatus}>{view.message}</p>;
  }

  if (view.status === "success" || view.status === "error") {
    return (
      <p
        className={`${styles.managementStatus} ${
          view.status === "error" ? styles.error : ""
        }`}
        role="status"
        aria-live="polite"
      >
        {view.message}
      </p>
    );
  }

  const record = view.record;
  const submitting = view.status === "submitting";
  const foundingLabel =
    typeof record.foundingNumber === "number"
      ? `Founding Supporter #${String(record.foundingNumber).padStart(4, "0")}`
      : "Verified Supporter";

  return (
    <div className={styles.managementWorkspace}>
      <section className={styles.recordSummary} aria-labelledby="record-title">
        <div>
          <p className="eyebrow">Current supporter record</p>
          <h2 id="record-title">{foundingLabel}</h2>
        </div>
        <dl>
          <div>
            <dt>Status</dt>
            <dd>Active</dd>
          </div>
          <div>
            <dt>Visibility</dt>
            <dd>{record.visibility === "public" ? "Public" : "Private"}</dd>
          </div>
          <div>
            <dt>Link expires</dt>
            <dd>
              {record.expiresAt
                ? new Date(record.expiresAt).toLocaleString()
                : "Soon"}
            </dd>
          </div>
        </dl>
      </section>

      {record.visibility === "private" ? (
        <section className={styles.actionCard} aria-labelledby="publish-title">
          <div>
            <p className="eyebrow">Optional public listing</p>
            <h2 id="publish-title">Publish a consented profile</h2>
            <p>
              This changes only your supporter visibility. It does not create an
              account, share health data, or subscribe you to updates.
            </p>
          </div>
          <form
            className={styles.actionForm}
            onSubmit={(event) =>
              submitPublicProfile(event, record, "set_public")
            }
          >
            <PublicProfileFields
              formId={`${formId}-publish`}
              displayName=""
              profileSlug=""
              broadRegion=""
              whyISigned=""
            />
            <label className={styles.checkboxLabel}>
              <input name="publicListingConsent" type="checkbox" required />
              <span>
                I separately consent to publishing only these profile fields.
              </span>
            </label>
            <button
              className="button button-primary"
              type="submit"
              disabled={submitting}
            >
              Publish public profile
            </button>
          </form>
        </section>
      ) : (
        <>
          <section className={styles.actionCard} aria-labelledby="edit-title">
            <div>
              <p className="eyebrow">Public profile</p>
              <h2 id="edit-title">Edit published fields</h2>
            </div>
            <form
              className={styles.actionForm}
              onSubmit={(event) =>
                submitPublicProfile(event, record, "update_public_profile")
              }
            >
              <PublicProfileFields
                formId={`${formId}-edit`}
                displayName={record.displayName ?? ""}
                profileSlug={record.profileSlug ?? ""}
                broadRegion={record.broadRegion ?? ""}
                whyISigned={record.whyISigned ?? ""}
              />
              <button
                className="button button-primary"
                type="submit"
                disabled={submitting}
              >
                Update public profile
              </button>
            </form>
          </section>

          <section className={styles.actionCard} aria-labelledby="private-title">
            <div>
              <p className="eyebrow">Privacy control</p>
              <h2 id="private-title">Return this supporter to private</h2>
              <p>
                The public profile will be removed immediately. Your verified
                support and Founding Supporter number remain active.
              </p>
            </div>
            <form
              className={styles.actionForm}
              onSubmit={(event) => {
                event.preventDefault();
                const data = new FormData(event.currentTarget);
                void apply(
                  record,
                  {
                    action: "set_private",
                    privateVisibilityConfirmation:
                      data.get("privateVisibilityConfirmation") === "on",
                  },
                  "Removing the public profile…",
                );
              }}
            >
              <label className={styles.checkboxLabel}>
                <input
                  name="privateVisibilityConfirmation"
                  type="checkbox"
                  required
                />
                <span>I confirm that my public profile should be removed.</span>
              </label>
              <button
                className="button button-secondary"
                type="submit"
                disabled={submitting}
              >
                Make supporter private
              </button>
            </form>
          </section>
        </>
      )}

      <section
        className={`${styles.actionCard} ${styles.dangerCard}`}
        aria-labelledby="withdraw-title"
      >
        <div>
          <p className="eyebrow">Withdrawal</p>
          <h2 id="withdraw-title">Withdraw support</h2>
          <p>
            This withdraws the Promise signature, removes any public profile,
            and permanently retires the Founding Supporter number. The number
            will never be reassigned.
          </p>
        </div>
        <form
          className={styles.actionForm}
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            void apply(
              record,
              {
                action: "withdraw",
                withdrawalConfirmation:
                  data.get("withdrawalConfirmation") === "on",
              },
              "Withdrawing support…",
            );
          }}
        >
          <label className={styles.checkboxLabel}>
            <input name="withdrawalConfirmation" type="checkbox" required />
            <span>
              I understand that withdrawal is immediate and the designation
              number is permanently retired.
            </span>
          </label>
          <button
            className="button button-secondary"
            type="submit"
            disabled={submitting}
          >
            Withdraw and retire designation
          </button>
        </form>
      </section>

      {submitting ? (
        <p className={styles.managementStatus} role="status" aria-live="polite">
          {view.message}
        </p>
      ) : null}
    </div>
  );
}

function PublicProfileFields({
  formId,
  displayName,
  profileSlug,
  broadRegion,
  whyISigned,
}: {
  formId: string;
  displayName: string;
  profileSlug: string;
  broadRegion: string;
  whyISigned: string;
}) {
  return (
    <>
      <div className={styles.fieldGrid}>
        <div className={styles.field}>
          <label htmlFor={`${formId}-display-name`}>Display name</label>
          <input
            id={`${formId}-display-name`}
            name="displayName"
            type="text"
            maxLength={100}
            defaultValue={displayName}
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
            defaultValue={profileSlug}
            required
          />
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor={`${formId}-region`}>Broad region</label>
        <input
          id={`${formId}-region`}
          name="broadRegion"
          type="text"
          maxLength={100}
          defaultValue={broadRegion}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor={`${formId}-why`}>Why I signed</label>
        <textarea
          id={`${formId}-why`}
          name="whyISigned"
          rows={5}
          maxLength={1000}
          defaultValue={whyISigned}
        />
      </div>
    </>
  );
}
