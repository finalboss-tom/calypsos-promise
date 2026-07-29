import type { Metadata } from "next";
import { StatusBadge } from "@/components/status-badge";
import {
  aiAssistedResponsibilities,
  dailyJourney,
  deterministicResponsibilities,
  resilientCorePaths,
} from "@/lib/how-it-works";

const gameplayUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/product/gameplay-foundation.md";
const constitutionUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/frozen/product-constitution.md";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "The planned short-session, player-confirmed, non-punitive Calypso’s Promise experience and its deterministic authority boundaries.",
  alternates: {
    canonical: "/how-it-works",
  },
};

export default function HowItWorksPage() {
  return (
    <article className="guide-page how-page">
      <header className="guide-page-header">
        <div className="page-status-line">
          <StatusBadge status="planned" />
          <span>Product direction; not a playable release</span>
        </div>
        <p className="eyebrow">How it works</p>
        <h1>A useful Chronicle, built one voluntary step at a time.</h1>
        <p className="summary">
          The planned experience is an illustrated narrative and decision game,
          not a generic dashboard with fantasy decoration. A typical session is
          designed to last roughly three to eight minutes and always provides a
          clear stopping point.
        </p>
        <p className="source-note">
          This page explains accepted product direction. Accounts, private
          Chronicles, production capture, Aster, quests, and gameplay are not
          live.
        </p>
      </header>

      <section className="guide-section" aria-labelledby="daily-route-title">
        <div className="split-heading">
          <div>
            <p className="eyebrow">A planned daily route</p>
            <h2 id="daily-route-title">
              Arrive, choose, confirm, and leave freely.
            </h2>
          </div>
          <p>
            The route adapts to goals, context, accessibility needs, and
            available data. It may be replaced, deferred, or rejected without
            punishment.
          </p>
        </div>
        <ol className="journey-grid">
          {dailyJourney.map((step, index) => (
            <li className="journey-card" key={step.title}>
              <span className="journey-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.explanation}</p>
            </li>
          ))}
        </ol>
      </section>

      <section
        className="guide-section authority-split"
        aria-labelledby="authority-title"
      >
        <div className="split-heading">
          <div>
            <p className="eyebrow">Authority boundary</p>
            <h2 id="authority-title">
              AI may assist. Deterministic services decide.
            </h2>
          </div>
          <p>
            Generative presentation cannot decide eligibility, permission,
            completion, rewards, safety, unlocks, canon, or story order.
          </p>
        </div>
        <div className="boundary-columns">
          <section
            className="boundary-panel"
            aria-labelledby="deterministic-title"
          >
            <h3 id="deterministic-title">Deterministic responsibilities</h3>
            <ul>
              {deterministicResponsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="boundary-panel" aria-labelledby="assisted-title">
            <h3 id="assisted-title">AI-assisted presentation</h3>
            <ul>
              {aiAssistedResponsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section
        className="guide-section return-panel"
        aria-labelledby="return-title"
      >
        <p className="eyebrow">Failure and return</p>
        <h2 id="return-title">No broken-streak punishment.</h2>
        <p>
          A missed day may create a gentle Broken Lantern return path: resume,
          reduce the route, change reminders, or reconsider the goal. Health
          status, body size, symptom absence, or perfection never becomes moral
          worth.
        </p>
        <h3>Core paths must remain available without AI</h3>
        <ul className="inline-list">
          {resilientCorePaths.map((path) => (
            <li key={path}>{path}</li>
          ))}
        </ul>
      </section>

      <footer className="guide-sources" aria-label="How It Works sources">
        <a href={gameplayUrl} target="_blank" rel="noreferrer">
          Read the Gameplay Foundation
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a href={constitutionUrl} target="_blank" rel="noreferrer">
          Read the Product Constitution
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </footer>
    </article>
  );
}
