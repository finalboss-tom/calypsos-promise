import type { Metadata } from "next";
import { StatusBadge } from "@/components/status-badge";
import {
  forgeOpenLimits,
  forgeReceiptFacts,
  forgeRuntimeFacts,
  forgeToolGroups,
  ordinaryContributionPaths,
} from "@/lib/open-forge";

const completionUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/sprint-7-completion-record.md";
const boundaryUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/architecture/forge-mcp-boundary-and-tool-registry.md";
const holdpointsUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/architecture/forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md";

export const metadata: Metadata = {
  title: "Open Forge",
  description:
    "The ten bounded local public and synthetic Forge tools, provenance, scopes, receipts, errors, limits, and ordinary contribution path.",
  alternates: {
    canonical: "/forge",
  },
};

export default function OpenForgePage() {
  return (
    <article className="guide-page forge-page">
      <header className="guide-page-header">
        <div className="page-status-line">
          <StatusBadge status="live" />
          <span>Merged local public and synthetic contributor tooling</span>
          <StatusBadge status="planned" />
          <span>Remote, private, and production operation</span>
        </div>
        <p className="eyebrow">The Open Forge</p>
        <h1>Useful tools without hidden authority.</h1>
        <blockquote className="guide-quote">
          Forge retrieves, validates, and generates bounded evidence. People and
          accepted domain processes decide what that evidence means.
        </blockquote>
        <p className="summary">
          Forge is one local MCP application for contributors and agents working
          with allowlisted public repository records and explicitly synthetic
          data. Its ten server-owned tools are versioned, bounded,
          source-linked, non-mutating, provider-independent, and
          non-authoritative.
        </p>
        <p className="source-note">
          Forge is not the product database, a private Chronicle service, a
          House of Keys service, a general shell, a repository-writing agent, a
          provider gateway, a remote MCP service, or a production sandbox.
        </p>
      </header>

      <section className="guide-section" aria-labelledby="forge-tools-title">
        <div className="split-heading">
          <div>
            <p className="eyebrow">Exactly ten tools</p>
            <h2 id="forge-tools-title">
              Every tool has a visible job and denial.
            </h2>
          </div>
          <p>
            Runtime registry revision 4 exposes no hidden general-purpose tool.
            Each identity is server-owned and checked against its accepted
            scope, source, limits, provenance, and non-authority requirements.
          </p>
        </div>
        <div className="forge-group-list">
          {forgeToolGroups.map((group) => (
            <section className="forge-group" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.summary}</p>
              <div className="forge-tool-grid">
                {group.tools.map((tool) => (
                  <article className="forge-tool-card" key={tool.id}>
                    <code>{tool.id}</code>
                    <p>{tool.purpose}</p>
                    <p className="forge-boundary">{tool.boundary}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section
        className="guide-section boundary-panel"
        aria-labelledby="forge-runtime-title"
      >
        <div className="page-status-line">
          <StatusBadge status="live" />
          <span>Accepted local implementation boundary</span>
        </div>
        <h2 id="forge-runtime-title">The runtime is deliberately narrow.</h2>
        <ul>
          {forgeRuntimeFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </section>

      <section
        className="guide-section authority-split"
        aria-labelledby="forge-receipts-title"
      >
        <div className="split-heading">
          <div>
            <p className="eyebrow">Receipts and errors</p>
            <h2 id="forge-receipts-title">
              Evidence without leaking protected state.
            </h2>
          </div>
          <p>
            A receipt records a bounded invocation. It cannot turn tool output
            into canon, architecture approval, permission, Chronicle truth,
            mapping approval, clinical authority, production readiness, or
            institutional legitimacy.
          </p>
        </div>
        <ul className="receipt-list">
          {forgeReceiptFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
      </section>

      <section
        className="guide-section current-limits"
        aria-labelledby="forge-limits-title"
      >
        <div className="page-status-line">
          <StatusBadge status="planned" />
          <span>Open production and specialist gates</span>
        </div>
        <h2 id="forge-limits-title">
          Local success does not imply production safety.
        </h2>
        <ul>
          {forgeOpenLimits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </section>

      <section
        className="guide-section guide-callout"
        aria-labelledby="ordinary-path-title"
      >
        <div>
          <p className="eyebrow">MCP is optional</p>
          <h2 id="ordinary-path-title">
            Contributors do not need Forge to participate.
          </h2>
          <p>
            The repository, issue tracker, documentation, tests, and ordinary
            pull request process remain the primary governed contribution path.
            Forge assists with bounded public evidence; it does not control
            participation or replace human review.
          </p>
        </div>
        <div className="ordinary-paths">
          {ordinaryContributionPaths.map((path) => (
            <a
              key={path.title}
              href={path.href}
              target="_blank"
              rel="noreferrer"
            >
              {path.label}
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          ))}
        </div>
      </section>

      <footer className="guide-sources" aria-label="Open Forge sources">
        <a href={completionUrl} target="_blank" rel="noreferrer">
          Read the Sprint 7 completion record
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a href={boundaryUrl} target="_blank" rel="noreferrer">
          Inspect the Forge boundary and registry
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a href={holdpointsUrl} target="_blank" rel="noreferrer">
          Review open Forge holdpoints
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </footer>
    </article>
  );
}
