import type { Metadata } from "next";
import { CapabilityStatusGrid } from "@/components/capability-status-grid";
import { StatusBadge } from "@/components/status-badge";
import { capabilityStatusDefinitions } from "@/lib/capability-status";
import { futureRoadmap, sprint8Roadmap } from "@/lib/public-roadmap";

const currentStatusUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/current-status.md";
const sprintRoadmapUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/sprints.md";
const institutionalRoadmapUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/ROADMAP.md";

export const metadata: Metadata = {
  title: "Roadmap and Capability Status",
  description:
    "Evidence-based capability status, active Sprint 8 work, future sprint sequencing, and institutional gates for Calypso’s Promise.",
  alternates: {
    canonical: "/roadmap",
  },
};

export default function RoadmapPage() {
  return (
    <article className="guide-page public-record-page roadmap-page">
      <header className="guide-page-header">
        <div className="page-status-line">
          <StatusBadge status="live" />
          <span>Canonical public repository roadmap</span>
          <StatusBadge status="experimental" />
          <span>Website presentation under review</span>
          <StatusBadge status="planned" />
          <span>Future product and release work</span>
        </div>
        <p className="eyebrow">Roadmap and capability status</p>
        <h1>Evidence decides what comes next.</h1>
        <blockquote className="guide-quote">
          A roadmap is a sequence of evidence gates, not a promise of dates,
          production readiness, funding, or institutional authority.
        </blockquote>
        <p className="summary">
          This page is a typed, source-linked presentation of accepted public
          roadmap records. It does not replace the repository roadmap, create a
          release commitment, or convert planned work into live capability.
        </p>
      </header>

      <section
        className="guide-section"
        aria-labelledby="status-language-title"
      >
        <div className="split-heading">
          <div>
            <p className="eyebrow">Controlled language</p>
            <h2 id="status-language-title">Four labels, one evidence rule.</h2>
          </div>
          <p>
            The same status vocabulary applies across homepage, roadmap, Trust
            Center, Forge, support, and funding views.
          </p>
        </div>
        <div className="definition-grid">
          {Object.entries(capabilityStatusDefinitions).map(
            ([status, definition]) => (
              <article className="definition-card" key={status}>
                <StatusBadge
                  status={status as keyof typeof capabilityStatusDefinitions}
                />
                <h3>{definition.label}</h3>
                <p>{definition.explanation}</p>
              </article>
            ),
          )}
        </div>
      </section>

      <CapabilityStatusGrid />

      <section
        className="guide-section"
        aria-labelledby="sprint-8-roadmap-title"
      >
        <div className="split-heading">
          <div>
            <p className="eyebrow">Active public website sprint</p>
            <h2 id="sprint-8-roadmap-title">Sprint 8 remains open.</h2>
          </div>
          <p>
            Completed workstreams are implementation evidence inside the draft
            Sprint 8 pull request. The sprint does not close until 8.10 and
            explicit founding-steward acceptance.
          </p>
        </div>
        <div className="roadmap-grid">
          {sprint8Roadmap.map((item) => (
            <article className="roadmap-card" key={item.id}>
              <StatusBadge status={item.status} />
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <a href={item.sourceHref} target="_blank" rel="noreferrer">
                {item.sourceLabel}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="guide-section" aria-labelledby="future-roadmap-title">
        <div className="split-heading">
          <div>
            <p className="eyebrow">Later evidence gates</p>
            <h2 id="future-roadmap-title">Beyond the public website.</h2>
          </div>
          <p>
            Later work remains subordinate to private-data protection,
            deterministic authority, provider independence, specialist review,
            and progressive institutional legitimacy.
          </p>
        </div>
        <div className="roadmap-grid">
          {futureRoadmap.map((item) => (
            <article className="roadmap-card" key={item.id}>
              <StatusBadge status={item.status} />
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <a href={item.sourceHref} target="_blank" rel="noreferrer">
                {item.sourceLabel}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <footer className="guide-sources" aria-label="Roadmap sources">
        <a href={currentStatusUrl} target="_blank" rel="noreferrer">
          Read current project status
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a href={sprintRoadmapUrl} target="_blank" rel="noreferrer">
          Read the design-to-build sprint roadmap
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a href={institutionalRoadmapUrl} target="_blank" rel="noreferrer">
          Read the institutional roadmap
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </footer>
    </article>
  );
}
