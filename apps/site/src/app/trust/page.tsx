import type { Metadata } from "next";
import { StatusBadge } from "@/components/status-badge";
import {
  openTrustGates,
  publicChallengeRoutes,
  trustAreas,
} from "@/lib/trust-center";

const productConstitutionUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/frozen/product-constitution.md";
const securityUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/SECURITY.md";
const currentStatusUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/current-status.md";

export const metadata: Metadata = {
  title: "Trust Center",
  description:
    "Player rights, privacy, security status, authority boundaries, funding doctrine, open gates, and correction routes for Calypso’s Promise.",
  alternates: {
    canonical: "/trust",
  },
};

export default function TrustCenterPage() {
  return (
    <article className="guide-page trust-page">
      <header className="guide-page-header">
        <div className="page-status-line">
          <StatusBadge status="live" />
          <span>Public rights, policies, records, and challenge routes</span>
          <StatusBadge status="experimental" />
          <span>Designed and synthetically tested controls</span>
          <StatusBadge status="planned" />
          <span>Production operation and independent review</span>
        </div>
        <p className="eyebrow">Trust Center</p>
        <h1>Trust begins with visible limits.</h1>
        <blockquote className="guide-quote">
          A documented control is not a deployed control. A passing test is not
          independent certification. A public promise must remain challengeable.
        </blockquote>
        <p className="summary">
          This page organizes the accepted public rights, privacy boundary,
          security posture, authority separations, provider and connector
          status, funding doctrine, open gates, and correction paths. It is a
          read-only explanation of repository records, not a second policy
          system.
        </p>
        <p className="source-note">
          The site does not process production health data and does not claim
          production security, privacy, accessibility, clinical, legal,
          financial, provider, or institutional certification.
        </p>
      </header>

      <section className="guide-section" aria-labelledby="trust-areas-title">
        <div className="split-heading">
          <div>
            <p className="eyebrow">Evidence by domain</p>
            <h2 id="trust-areas-title">
              What is protected, proven, and still open.
            </h2>
          </div>
          <p>
            Each domain links to its upstream repository authority and carries
            the same controlled status vocabulary used across the public site.
          </p>
        </div>
        <div className="trust-grid">
          {trustAreas.map((area) => (
            <article className="trust-card" key={area.id}>
              <div className="page-status-line">
                <StatusBadge status={area.status} />
              </div>
              <h3>{area.title}</h3>
              <p>{area.summary}</p>
              <p className="trust-boundary">{area.boundary}</p>
              <a href={area.sourceHref} target="_blank" rel="noreferrer">
                {area.sourceLabel}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        className="guide-section challenge-panel"
        aria-labelledby="challenge-title"
      >
        <div className="split-heading">
          <div>
            <p className="eyebrow">Challenge and correction</p>
            <h2 id="challenge-title">
              Use the route that matches the information.
            </h2>
          </div>
          <p>
            A public concern does not need a complete replacement solution. It
            does need an honest description, public-safe evidence, uncertainty,
            affected groups, and the narrowest useful correction or containment
            path available.
          </p>
        </div>
        <div className="challenge-grid">
          {publicChallengeRoutes.map((route) => (
            <article className="challenge-card" key={route.title}>
              <h3>{route.title}</h3>
              <p>{route.action}</p>
              <a href={route.href} target="_blank" rel="noreferrer">
                {route.label}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        className="guide-section current-limits"
        aria-labelledby="trust-gates-title"
      >
        <div className="page-status-line">
          <StatusBadge status="planned" />
          <span>Open operational and review gates</span>
        </div>
        <h2 id="trust-gates-title">No public page closes these gates.</h2>
        <ul>
          {openTrustGates.map((gate) => (
            <li key={gate}>{gate}</li>
          ))}
        </ul>
      </section>

      <footer className="guide-sources" aria-label="Trust Center sources">
        <a href={productConstitutionUrl} target="_blank" rel="noreferrer">
          Read the Product Constitution
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a href={securityUrl} target="_blank" rel="noreferrer">
          Read the security reporting policy
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a href={currentStatusUrl} target="_blank" rel="noreferrer">
          Inspect current project status
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </footer>
    </article>
  );
}
