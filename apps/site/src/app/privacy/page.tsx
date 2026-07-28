import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signup privacy",
  description:
    "Current handling status for the Founding Expedition signup surface.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <article className="reading-panel">
      <p className="eyebrow">Signup privacy</p>
      <h1>Signup is paused during migration.</h1>
      <p>
        The Sprint 8 compatibility shell does not accept or forward email
        addresses. The previous Founding Expedition endpoint remains behind an
        explicit preserve-or-retire decision in workstream 8.8.
      </p>
      <p>
        No account, health-data intake, research enrollment, donation
        processing, or marketing profile is created by this page.
      </p>
      <p>
        Follow the{" "}
        <a
          href="https://github.com/finalboss-tom/calypsos-promise"
          target="_blank"
          rel="noreferrer"
        >
          public repository
        </a>{" "}
        for project updates.
      </p>
      <Link href="/">Return home</Link>
    </article>
  );
}
