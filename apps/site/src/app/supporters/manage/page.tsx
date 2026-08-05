import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supporterMovementEnabled } from "@/lib/supporters/feature";
import { SupporterManagementClient } from "./management-client";
import styles from "../management.module.css";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Manage your Personal Health Data Promise support",
  description:
    "Use a single-use email-control link to manage supporter visibility, public profile fields, or withdrawal.",
  robots: { index: false, follow: false, noarchive: true },
};

export default function SupporterManagementPage() {
  if (!supporterMovementEnabled()) notFound();

  return (
    <article className={styles.managePage}>
      <header className={styles.manageHero}>
        <p className="eyebrow">Email-controlled supporter management</p>
        <h1>Manage your support</h1>
        <p>
          The secret token remains in the URL fragment, is removed from the
          address bar before submission, and authorizes one reviewed change.
        </p>
      </header>
      <SupporterManagementClient />
    </article>
  );
}
