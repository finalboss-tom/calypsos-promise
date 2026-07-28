import type { Metadata } from "next";
import { StatusBadge } from "@/components/status-badge";
import {
  asterCurrentLimits,
  asterFallbacks,
  asterGuardrails,
  asterRoles,
} from "@/lib/aster";

const baselineUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/product/aster-contract-baseline.md";
const architectureUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/architecture/aster-contract-boundary.md";

export const metadata: Metadata = {
  title: "Aster and AI",
  description:
    "Aster’s proposal, confirmation, source, uncertainty, memory, fallback, and non-authority boundaries in Calypso’s Promise.",
  alternates: {
    canonical: "/aster",
  },
};

export default function AsterPage() {
  return (
    <article className="guide-page aster-page">
      <header className="guide-page-header">
        <div className="page-status-line">
          <StatusBadge status="experimental" />
          <span>Accepted pre-stable public contracts</span>
          <StatusBadge status="planned" />
          <span>Production AI remains future work</span>
        </div>
        <p className="eyebrow">Aster and AI</p>
        <h1>Aster proposes. The player decides.</h1>
        <blockquote className="guide-quote">
          AI proposes. The player confirms. The domain service validates and
          stores.
        </blockquote>
        <p className="summary">
          Aster is the planned Wayfinder and presentation layer for structured
          drafts, source-linked recall, explanations, route suggestions, and
          approved story phrasing. A role name, model response, retrieval
          result, or confident sentence creates no technical authority.
        </p>
        <p className="source-note">
          The repository contains public, dependency-free contracts and
          synthetic fixtures. It does not contain a production model,
          private-data egress, production memory, or a live AI service.
        </p>
      </header>

      <section className="guide-section" aria-labelledby="roles-title">
        <div className="split-heading">
          <div>
            <p className="eyebrow">Five bounded roles</p>
            <h2 id="roles-title">
              Narrative responsibilities without hidden power.
            </h2>
          </div>
          <p>
            Every role prepares proposals or explanations for review. None can
            create Chronicle truth, permission, completion, progression,
            rewards, clinical authority, provider approval, or institutional
            authority.
          </p>
        </div>
        <div className="role-grid">
          {asterRoles.map((role) => (
            <article className="role-card" key={role.name}>
              <h3>{role.name}</h3>
              <p>{role.purpose}</p>
              <p className="role-boundary">{role.boundary}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="guide-section guardrail-panel"
        aria-labelledby="guardrails-title"
      >
        <p className="eyebrow">Control boundary</p>
        <h2 id="guardrails-title">
          Every consequential step remains inspectable.
        </h2>
        <ul className="guardrail-list">
          {asterGuardrails.map((guardrail) => (
            <li key={guardrail}>{guardrail}</li>
          ))}
        </ul>
      </section>

      <section
        className="guide-section authority-split"
        aria-labelledby="fallbacks-title"
      >
        <div className="split-heading">
          <div>
            <p className="eyebrow">Provider-independent fallback</p>
            <h2 id="fallbacks-title">
              Core rights do not disappear when AI is absent.
            </h2>
          </div>
          <p>
            Missing memory, retrieval, a model, or a provider cannot block
            capture, permission review, correction, export, deletion, or
            ordinary play.
          </p>
        </div>
        <ul className="fallback-grid">
          {asterFallbacks.map((fallback) => (
            <li key={fallback}>{fallback}</li>
          ))}
        </ul>
      </section>

      <section
        className="guide-section current-limits"
        aria-labelledby="aster-limits-title"
      >
        <div className="page-status-line">
          <StatusBadge status="planned" />
          <span>Current production capability</span>
        </div>
        <h2 id="aster-limits-title">No production Aster capability is live.</h2>
        <ul>
          {asterCurrentLimits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </section>

      <footer className="guide-sources" aria-label="Aster sources">
        <a href={baselineUrl} target="_blank" rel="noreferrer">
          Read the Aster Contract Baseline
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a href={architectureUrl} target="_blank" rel="noreferrer">
          Read the Aster architecture boundary
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </footer>
    </article>
  );
}
