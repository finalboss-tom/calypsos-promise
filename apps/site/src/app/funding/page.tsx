import type { Metadata } from "next";
import { StatusBadge } from "@/components/status-badge";
import {
  concentrationReviewTriggers,
  fundingOpportunities,
  fundingRelationships,
  fundingTransactionBoundary,
  permittedFundingRecognition,
  prohibitedFundingBenefits,
} from "@/lib/funding-transparency";

const economicsUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/economics/README.md";
const fundingRecordsUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/economics/funding-records.yml";
const fundingOpportunitiesUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/economics/funding-opportunities.yml";
const recognitionPolicyUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/economics/sponsor-benefit-and-recognition-policy.md";
const conflictPolicyUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/economics/funding-conflict-and-acceptance-policy.md";
const concentrationPolicyUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/economics/funding-concentration-and-continuity-policy.md";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Funding Transparency",
  description:
    "Canonical public funding registers, honest empty states, recognition limits, anti-capture controls, and disabled transaction boundaries for Calypso’s Promise.",
  alternates: {
    canonical: "/funding",
  },
};

export default function FundingPage() {
  return (
    <article className="guide-page public-record-page funding-page">
      <header className="guide-page-header">
        <div className="page-status-line">
          <StatusBadge status="live" />
          <span>Accepted public funding doctrine and canonical registers</span>
          <StatusBadge status="experimental" />
          <span>Build-time website derivative under review</span>
          <StatusBadge status="planned" />
          <span>No recipient, intake, payment, or treasury runtime</span>
        </div>
        <p className="eyebrow">Funding transparency</p>
        <h1>Support cannot purchase the Promise.</h1>
        <blockquote className="guide-quote">
          Publish the reviewed institutional relationship and effect. Protect
          the raw financial and personal source record.
        </blockquote>
        <p className="summary">
          This page reads the repository’s canonical public relationship and
          opportunity registers at build time. It does not maintain a separate
          sponsor database, accept support, process money, rank providers, or
          create charitable, tax, nonprofit, ownership, or public-benefit
          status.
        </p>
      </header>

      <section
        className="guide-section"
        aria-labelledby="relationship-register-title"
      >
        <div className="split-heading">
          <div>
            <p className="eyebrow">Canonical relationship register</p>
            <h2 id="relationship-register-title">Material relationships.</h2>
          </div>
          <p>
            Schema {fundingRelationships.schemaVersion}, registry revision{" "}
            {fundingRelationships.registryRevision}, reviewed{" "}
            {fundingRelationships.lastReviewed}. Information class:{" "}
            {fundingRelationships.informationClass}.
          </p>
        </div>
        {fundingRelationships.entries.length === 0 ? (
          <div className="empty-state" role="status">
            <StatusBadge status="live" />
            <h3>No accepted funding relationships are recorded.</h3>
            <p>{fundingRelationships.operationalNotice}</p>
          </div>
        ) : (
          <div className="funding-record-grid">
            {fundingRelationships.entries.map((record) => (
              <article className="funding-record-card" key={record.id}>
                <p className="record-id">{record.id}</p>
                <h3>{record.publicCounterparty}</h3>
                <p>
                  {record.relationshipClass} · {record.status}
                </p>
                <p>{record.purpose}</p>
                {record.publicAmount ? <p>{record.publicAmount}</p> : null}
              </article>
            ))}
          </div>
        )}
        <p className="registry-note">
          Registry status: {fundingRelationships.status}. Website rendering
          cannot accept, amend, refund, terminate, or supersede a relationship.
        </p>
      </section>

      <section
        className="guide-section"
        aria-labelledby="opportunity-register-title"
      >
        <div className="split-heading">
          <div>
            <p className="eyebrow">Canonical opportunity register</p>
            <h2 id="opportunity-register-title">Public-good opportunities.</h2>
          </div>
          <p>
            An opportunity is not open merely because a need is documented. It
            requires an explicit open status and approved recipient, custody,
            privacy, accounting, refund, and public-record links.
          </p>
        </div>
        {fundingOpportunities.entries.length === 0 ? (
          <div className="empty-state" role="status">
            <StatusBadge status="live" />
            <h3>No live funding opportunity is published.</h3>
            <p>{fundingOpportunities.operationalNotice}</p>
          </div>
        ) : (
          <div className="funding-record-grid">
            {fundingOpportunities.entries.map((opportunity) => (
              <article className="funding-record-card" key={opportunity.id}>
                <p className="record-id">{opportunity.id}</p>
                <h3>{opportunity.title}</h3>
                <p>{opportunity.status}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section
        className="guide-section"
        aria-labelledby="benefit-boundary-title"
      >
        <div className="split-heading">
          <div>
            <p className="eyebrow">Recognition versus influence</p>
            <h2 id="benefit-boundary-title">Attribution is not authority.</h2>
          </div>
          <p>
            Every material relationship must enumerate exact approved benefits,
            conflicts, restrictions, dependencies, outcomes, correction paths,
            and termination behavior in its canonical record.
          </p>
        </div>
        <div className="funding-boundary-grid">
          <article className="funding-boundary-card">
            <h3>Permitted after review</h3>
            <ul>
              {permittedFundingRecognition.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </article>
          <article className="funding-boundary-card">
            <h3>Never for sale</h3>
            <ul>
              {prohibitedFundingBenefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section
        className="guide-section concentration-panel"
        aria-labelledby="concentration-title"
      >
        <div className="split-heading">
          <div>
            <p className="eyebrow">Anti-capture review</p>
            <h2 id="concentration-title">
              Dependence is more than a percentage.
            </h2>
          </div>
          <p>
            Reviews consider financial, in-kind, restriction, critical-function,
            decision, related-group, and founder-subsidy concentration. The
            thresholds below trigger review; they do not certify safety.
          </p>
        </div>
        <div className="concentration-grid">
          {concentrationReviewTriggers.map((trigger) => (
            <article className="concentration-card" key={trigger.threshold}>
              <h3>{trigger.threshold}</h3>
              <p>{trigger.response}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="guide-section current-limits"
        aria-labelledby="funding-limits-title"
      >
        <div className="page-status-line">
          <StatusBadge status="planned" />
          <span>Transaction and entity gates remain open</span>
        </div>
        <h2 id="funding-limits-title">No payment handoff is available.</h2>
        <ul>
          {fundingTransactionBoundary.map((boundary) => (
            <li key={boundary}>{boundary}</li>
          ))}
        </ul>
      </section>

      <footer className="guide-sources" aria-label="Funding sources">
        <a href={economicsUrl} target="_blank" rel="noreferrer">
          Read the economics baseline
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a href={fundingRecordsUrl} target="_blank" rel="noreferrer">
          Inspect canonical funding records
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a href={fundingOpportunitiesUrl} target="_blank" rel="noreferrer">
          Inspect canonical opportunities
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a href={recognitionPolicyUrl} target="_blank" rel="noreferrer">
          Read recognition limits
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a href={conflictPolicyUrl} target="_blank" rel="noreferrer">
          Read conflict and acceptance rules
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a href={concentrationPolicyUrl} target="_blank" rel="noreferrer">
          Read concentration and continuity rules
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </footer>
    </article>
  );
}
