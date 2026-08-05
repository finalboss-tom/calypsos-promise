"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./supporters.module.css";

type VerificationState =
  | Readonly<{ status: "reading"; message: string }>
  | Readonly<{ status: "working"; message: string }>
  | Readonly<{ status: "success"; message: string }>
  | Readonly<{ status: "error"; message: string }>;

export function VerificationClient() {
  const started = useRef(false);
  const [state, setState] = useState<VerificationState>({
    status: "reading",
    message: "Reading the single-use verification fragment…",
  });

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const params = new URLSearchParams(window.location.hash.slice(1));
    const token = params.get("token");
    window.history.replaceState(null, "", window.location.pathname);

    if (!token) {
      setState({
        status: "error",
        message: "This verification link is missing its token.",
      });
      return;
    }

    setState({ status: "working", message: "Verifying your affirmation…" });
    void fetch("/api/supporters/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then(async (response) => {
        const result = (await response.json().catch(() => ({}))) as {
          ok?: boolean;
          supporterNumber?: number | null;
          wasAlreadyVerified?: boolean;
          error?: string;
        };
        if (!response.ok || !result.ok) {
          throw new Error(
            result.error || "Verification could not be completed.",
          );
        }
        const number = result.supporterNumber;
        setState({
          status: "success",
          message:
            typeof number === "number"
              ? `${result.wasAlreadyVerified ? "Already verified." : "Verification complete."} Your Founding Supporter number is ${String(number).padStart(4, "0")}.`
              : result.wasAlreadyVerified
                ? "This supporter record was already verified."
                : "Verification complete. Your supporter record is active.",
        });
      })
      .catch((error: unknown) => {
        setState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "Verification could not be completed.",
        });
      });
  }, []);

  return (
    <p
      className={`${styles.verificationStatus} ${
        state.status === "error" ? styles.error : ""
      }`}
      role="status"
      aria-live="polite"
    >
      {state.message}
    </p>
  );
}
