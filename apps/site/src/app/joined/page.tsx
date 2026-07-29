import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signup status",
  description: "Founding Expedition email signup status.",
  alternates: {
    canonical: "/joined",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function JoinedPage() {
  return (
    <article className="reading-panel">
      <p className="eyebrow">Email signup status</p>
      <h1>No signup was recorded.</h1>
      <p>
        The public newsletter or waitlist signup remains paused and does not
        accept, store, or forward an email address.
      </p>
      <p>
        Its final preserve-or-retire decision is tracked as a Phase 0 completion
        gate in{" "}
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
      <Link href="/support">
        Use the public support and contribution routes
      </Link>
    </article>
  );
}
