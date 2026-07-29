import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signup privacy",
  description:
    "Current handling status for the public newsletter or waitlist signup surface.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <article className="reading-panel">
      <p className="eyebrow">Email signup privacy</p>
      <h1>Signup remains paused and collects nothing.</h1>
      <p>
        The public website does not accept, store, or forward email addresses.
        No provider, webhook, mailing platform, database, or private destination
        is authorized by this compatibility route.
      </p>
      <p>
        The final decision to safely activate or deliberately retire this email
        surface is a Phase 0 completion gate in{" "}
        <a
          href="https://github.com/finalboss-tom/calypsos-promise/issues/63"
          target="_blank"
          rel="noreferrer"
        >
          issue #63
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        .
      </p>
      <p>
        This is not game registration, account creation, health-data intake,
        research enrollment, provider intake, donation processing, or a marketing
        profile.
      </p>
      <p>
        Follow the{" "}
        <a
          href="https://github.com/finalboss-tom/calypsos-promise"
          target="_blank"
          rel="noreferrer"
        >
          public repository
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>{" "}
        for project updates.
      </p>
      <Link href="/support">Review public support and contribution routes</Link>
    </article>
  );
}
