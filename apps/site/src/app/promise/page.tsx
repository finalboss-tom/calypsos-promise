import type { Metadata } from "next";
import Link from "next/link";
import { ConnectedLoops } from "@/components/connected-loops";
import { PromisePrinciples } from "@/components/promise-principles";
import {
  missionSummary,
  playerPromise,
  productConstitutionUrl,
} from "@/lib/promise";

export const metadata: Metadata = {
  title: "The Promise",
  description:
    "The player promise, non-negotiable rights, and personal-value loops that govern Calypso’s Promise.",
  alternates: {
    canonical: "/promise",
  },
};

export default function PromisePage() {
  return (
    <article className="promise-page">
      <header className="promise-page-header">
        <p className="eyebrow">The Promise</p>
        <h1>The software is open. The person’s health data is private.</h1>
        <blockquote>{playerPromise}</blockquote>
        <p className="summary">{missionSummary}</p>
        <p className="source-note">
          This page summarizes the frozen Product Constitution. The repository
          record remains authoritative.
        </p>
        <div className="actions" aria-label="Promise sources and navigation">
          <a
            className="button button-primary"
            href={productConstitutionUrl}
            target="_blank"
            rel="noreferrer"
          >
            Read the Product Constitution
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
          <Link className="button" href="/">
            Return to Ogygia
          </Link>
        </div>
      </header>

      <section
        className="homepage-section promise-rights"
        aria-labelledby="promise-rights-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Non-negotiable rights</p>
          <h2 id="promise-rights-title">Control is part of the product.</h2>
          <p>
            A person can use the core experience without agreeing to research,
            commercial sharing, public visibility, or compensated opportunities.
          </p>
        </div>
        <PromisePrinciples />
      </section>

      <section
        className="homepage-section loop-section"
        aria-labelledby="promise-loops-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Three connected loops</p>
          <h2 id="promise-loops-title">Personal value comes first.</h2>
          <p>
            Building the Chronicle and receiving personal value must remain
            useful on their own. Research or compensated use is separate,
            optional, and purpose-specific.
          </p>
        </div>
        <ConnectedLoops />
      </section>

      <section
        className="homepage-section meaningful-free"
        aria-labelledby="meaningfully-free-title"
      >
        <p className="eyebrow">Meaningfully free</p>
        <h2 id="meaningfully-free-title">
          The useful core cannot depend on payment or broader consent.
        </h2>
        <p>
          A person must be able to create, maintain, inspect, export, and delete
          a useful Living Chronicle without paying and without agreeing to
          secondary use. Accessibility, privacy controls, safety information,
          export, and deletion cannot become progression rewards.
        </p>
        <p>
          Narrative may welcome and motivate. It may not hide purpose, remove a
          direct path, or turn refusal into punishment.
        </p>
      </section>
    </article>
  );
}
