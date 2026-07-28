import Image from "next/image";
import Link from "next/link";
import { CapabilityStatusGrid } from "@/components/capability-status-grid";
import { ConnectedLoops } from "@/components/connected-loops";
import { PromisePrinciples } from "@/components/promise-principles";
import { StatusBadge } from "@/components/status-badge";
import {
  missionSummary,
  playerPromise,
  productConstitutionUrl,
} from "@/lib/promise";

export default function HomePage() {
  return (
    <>
      <section id="begin" className="hero" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src="/assets/hero-ogygia.webp"
          width={1600}
          height={900}
          sizes="100vw"
          loading="lazy"
          quality={72}
          alt=""
        />
        <div className="hero-content">
          <p className="eyebrow">Welcome, seeker.</p>
          <div className="hero-status-line" aria-label="Current project state">
            <StatusBadge status="experimental" />
            <span>Public website foundation</span>
            <StatusBadge status="live" />
            <span>Open-source repository</span>
          </div>
          <h1 id="hero-title">Your Odyssey Begins Here.</h1>
          <p className="promise-line">{playerPromise}</p>
          <p className="summary">
            {missionSummary} The planned game turns brief health actions,
            learning, reflection, and player-confirmed capture into quests on
            Ogygia.
          </p>
          <div className="actions" aria-label="Primary actions">
            <Link className="button button-primary" href="/promise">
              Read the Promise
            </Link>
            <a
              className="button"
              href="https://github.com/finalboss-tom/calypsos-promise"
              target="_blank"
              rel="noreferrer"
            >
              Explore the repository
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <a className="text-action" href="#capability-status">
              See current status
            </a>
          </div>
        </div>
      </section>

      <section
        className="homepage-section loop-section"
        aria-labelledby="connected-loops-title"
      >
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">The path through Ogygia</p>
            <h2 id="connected-loops-title">
              A Living Chronicle, built one self-chosen step at a time.
            </h2>
          </div>
          <p>
            Building your record and receiving personal value must remain useful
            on their own. Research or compensated use is separate, optional, and
            purpose-specific.
          </p>
        </div>
        <ConnectedLoops />
      </section>

      <section
        id="promise"
        className="homepage-section promise-home"
        aria-labelledby="promise-title"
      >
        <div className="promise-layout">
          <div className="promise-copy">
            <p className="eyebrow">The Promise</p>
            <h2 id="promise-title">
              The software is open. The person’s health data is private.
            </h2>
            <blockquote>{playerPromise}</blockquote>
            <p>
              Personal value, meaningful control, explicit uncertainty, and the
              ability to refuse or return without punishment are product
              requirements—not optional policy language.
            </p>
            <div className="promise-links">
              <Link className="text-action" href="/promise">
                Explore the full Promise
              </Link>
              <a
                className="text-action"
                href={productConstitutionUrl}
                target="_blank"
                rel="noreferrer"
              >
                Inspect the Product Constitution
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
          <PromisePrinciples />
        </div>
      </section>

      <CapabilityStatusGrid />

      <section
        className="homepage-section contribution-callout"
        aria-labelledby="contribution-title"
      >
        <div>
          <p className="eyebrow">Build in the open</p>
          <h2 id="contribution-title">Inspect the work. Challenge it. Help.</h2>
          <p>
            The code, architecture, decisions, roadmap, and public synthetic
            evidence are available now. Private health data, credentials, and
            protected operational records are not part of public contribution.
          </p>
        </div>
        <div className="actions" aria-label="Contribution paths">
          <a
            className="button button-primary"
            href="https://github.com/finalboss-tom/calypsos-promise/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noreferrer"
          >
            Read the contribution guide
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
          <a
            className="button"
            href="https://github.com/finalboss-tom/calypsos-promise/issues"
            target="_blank"
            rel="noreferrer"
          >
            Review public issues
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </div>
      </section>
    </>
  );
}
