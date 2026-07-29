import type { Metadata } from "next";
import Link from "next/link";
import { PrologueOpening } from "@/components/prologue-opening";

export const metadata: Metadata = {
  title: "Public Synthetic Prologue",
  description:
    "A branch-only, no-account, public synthetic introduction to Ogygia, Lantern Shore, and deterministic guide choices.",
  alternates: {
    canonical: "/prologue",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProloguePage() {
  return (
    <article className="promise-page">
      <header className="promise-page-header">
        <p className="eyebrow">Sprint 9 public synthetic prologue</p>
        <h1>A first step through Ogygia, using synthetic information only.</h1>
        <p className="summary">
          This branch-only experience demonstrates arrival, Lantern Shore, and
          equivalent deterministic Aster and manual guide paths without an account,
          health-data intake, microphone, model provider, analytics, or durable
          state. Refreshing or leaving starts the demonstration again.
        </p>
        <p className="source-note">
          Workstreams 9.1 and 9.2 are validated; workstream 9.3 is under review. The
          route is noindex, absent from public navigation and the sitemap, and is not
          deployed through this pull request.
        </p>
        <div className="actions" aria-label="Prologue sources and exits">
          <a
            className="button"
            href="https://github.com/finalboss-tom/calypsos-promise/blob/agent/sprint-9-public-synthetic-prologue/docs/architecture/public-synthetic-prologue-boundary.md"
            target="_blank"
            rel="noreferrer"
          >
            Inspect the prologue boundary
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
          <Link className="text-action" href="/">
            Return to the public site
          </Link>
        </div>
      </header>

      <noscript>
        <section className="reading-panel" aria-labelledby="prologue-noscript-title">
          <h2 id="prologue-noscript-title">The interactive opening needs JavaScript.</h2>
          <p>
            No information has been collected or stored. You can still read the
            direct explanation of the planned experience or return to the public
            site.
          </p>
          <p>
            <Link href="/how-it-works">Read how the planned experience works</Link>
            {" · "}
            <Link href="/">Leave the prologue</Link>
          </p>
        </section>
      </noscript>

      <PrologueOpening />
    </article>
  );
}
