import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supporterMovementEnabled } from "@/lib/supporters/feature";
import { VerificationClient } from "../verification-client";
import styles from "../supporters.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verify Support",
  description: "Complete a single-use supporter verification.",
  robots: { index: false, follow: false, noarchive: true },
};

export default function VerifySupporterPage() {
  if (!supporterMovementEnabled()) notFound();
  return (
    <article className={styles.verifyPage}>
      <p className="eyebrow">Email-control verification</p>
      <h1>Verify your support</h1>
      <p>
        The secret token remains in the URL fragment, is removed from the
        address bar before submission, and is never sent in the initial page
        request.
      </p>
      <VerificationClient />
    </article>
  );
}
