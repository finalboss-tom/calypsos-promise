import type { Metadata } from "next";
import { StatusBadge } from "@/components/status-badge";
import {
  consumerFirstPrinciples,
  currentInstitutionalLimits,
  institutionalLayers,
} from "@/lib/consumer-first";

const decisionUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/decisions/0010-consumer-first-provider-independent-boundary.md";
const architectureUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/architecture/consumer-first-provider-independent-boundary.md";

export const metadata: Metadata = {
  title: "Consumer First, Provider Respectful",
  description:
    "Why Calypso’s Promise centers the person while preserving standards-based, provider-respectful institutional interoperability.",
  alternates: {
    canonical: "/consumer-first",
  },
};

export default function ConsumerFirstPage() {
  return (
    <article className="guide-page consumer-first-page">
      <header className="guide-page-header">
        <div className="page-status-line">
          <StatusBadge status="live" />
          <span>Accepted product and architecture boundary</span>
          <StatusBadge status="planned" />
          <span>Institutional runtime remains future work</span>
        </div>
        <p className="eyebrow">Consumer first, provider respectful</p>
        <h1>Interoperate with healthcare without being captured by it.</h1>
        <p className="summary">
          Clinics, professionals, laboratories, pharmacies, payers, devices,
          standards, and health systems can provide essential evidence and future
          collaboration. They do not automatically own the person’s complete
          longitudinal product experience or the meaning of the Living Chronicle.
        </p>
        <blockquote className="guide-quote">
          Calypso’s Promise will interoperate with institutional healthcare without
          being architected around institutional healthcare.
        </blockquote>
        <p className="source-note">
          This is not anti-clinician or anti-standard. It rejects both enterprise
          capture and consumer isolation.
        </p>
      </header>

      <section className="guide-section" aria-labelledby="continuity-title">
        <div className="split-heading">
          <div>
            <p className="eyebrow">The continuity layer</p>
            <h2 id="continuity-title">The person is the only participant present across a lifetime.</h2>
          </div>
          <p>
            No provider, payer, application, device, standard, insurer, or country
            follows every stage of a person’s life. The Chronicle can preserve the
            sequence while keeping each source’s authority and limitations visible.
          </p>
        </div>
        <div className="principle-grid guide-principle-grid">
          {consumerFirstPrinciples.map((principle) => (
            <article className="principle-card" key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.explanation}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-section standards-panel" aria-labelledby="standards-title">
        <p className="eyebrow">Interoperability rule</p>
        <h2 id="standards-title">Standards at the edges. Provider-independent meaning at the core.</h2>
        <p>
          External payloads, profiles, implementation guides, terminology, local
          fields, mappings, versions, timing, and source artifacts should remain
          inspectable. An export or exchange schema may be useful without becoming
          the complete internal ontology of a person’s health and lived experience.
        </p>
        <p>
          When sources disagree, the Chronicle may preserve multiple assertions and
          a preferred presentation. It must not silently rewrite history to match
          the newest provider, largest institution, sponsoring organization, or most
          convenient connector.
        </p>
      </section>

      <section className="guide-section" aria-labelledby="layers-title">
        <div className="split-heading">
          <div>
            <p className="eyebrow">Separate authority layers</p>
            <h2 id="layers-title">Success in one relationship authorizes nothing else.</h2>
          </div>
          <p>
            Personal exchange, care collaboration, institutional workflow, and
            research each require their own purpose, permission, evidence, and
            review.
          </p>
        </div>
        <ol className="layer-grid">
          {institutionalLayers.map((layer, index) => (
            <li className="layer-card" key={layer.title}>
              <span className="journey-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{layer.title}</h3>
              <p>{layer.explanation}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="guide-section current-limits" aria-labelledby="institutional-limits-title">
        <div className="page-status-line">
          <StatusBadge status="planned" />
          <span>Current institutional capability</span>
        </div>
        <h2 id="institutional-limits-title">No provider or connector capability is live.</h2>
        <ul>
          {currentInstitutionalLimits.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </section>

      <footer className="guide-sources" aria-label="Consumer-first sources">
        <a href={decisionUrl} target="_blank" rel="noreferrer">
          Read Decision 0010
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a href={architectureUrl} target="_blank" rel="noreferrer">
          Read the architecture boundary
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </footer>
    </article>
  );
}
