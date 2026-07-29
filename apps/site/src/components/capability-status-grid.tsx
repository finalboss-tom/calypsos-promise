import { publicCapabilities } from "@/lib/capability-status";
import { StatusBadge } from "./status-badge";

export function CapabilityStatusGrid() {
  return (
    <section
      id="capability-status"
      className="status-section"
      aria-labelledby="capability-status-title"
    >
      <div className="section-heading">
        <p className="eyebrow">Evidence before claims</p>
        <h2 id="capability-status-title">Current capability status</h2>
        <p>
          These labels describe what the public evidence supports today. They do
          not promise production readiness or independent certification.
        </p>
      </div>
      <div className="status-grid">
        {publicCapabilities.map((capability) => (
          <article className="card" key={capability.id}>
            <StatusBadge status={capability.status} />
            <h3>{capability.label}</h3>
            <p>{capability.summary}</p>
            <a
              className="card-link"
              href={capability.sourceHref}
              target="_blank"
              rel="noreferrer"
            >
              {capability.sourceLabel}
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
