import type { Metadata } from "next";
import { StatusBadge } from "@/components/status-badge";
import { sevenLaws } from "@/lib/seven-laws";

const canonUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/frozen/world-and-lore-canon.md#the-seven-laws-of-ogygia";

export const metadata: Metadata = {
  title: "The Seven Laws of Ogygia",
  description:
    "The frozen laws protecting agency, privacy, evidence, correction, and transparent public benefit in Calypso’s Promise.",
  alternates: {
    canonical: "/laws",
  },
};

export default function LawsPage() {
  return (
    <article className="guide-page laws-page">
      <header className="guide-page-header">
        <div className="page-status-line">
          <StatusBadge status="live" />
          <span>Frozen public canon</span>
        </div>
        <p className="eyebrow">The Seven Laws of Ogygia</p>
        <h1>Agency is part of the architecture.</h1>
        <p className="summary">
          The Seven Laws are not rewards, optional flavor, or hidden story
          unlocks. They are immutable canon governing how the planned product,
          narrative, data, evidence, and public-good work must treat people.
        </p>
        <p className="source-note">
          This page is a presentation of the frozen world and lore canon. It
          cannot amend the laws or create a new authority layer.
        </p>
      </header>

      <ol className="law-grid" aria-label="The Seven Laws of Ogygia">
        {sevenLaws.map((law, index) => (
          <li id={law.id} className="law-card" key={law.id}>
            <span className="law-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2>{law.title}</h2>
            <blockquote>{law.law}</blockquote>
            <p>{law.explanation}</p>
          </li>
        ))}
      </ol>

      <section className="guide-callout" aria-labelledby="laws-canon-title">
        <div>
          <p className="eyebrow">Canon boundary</p>
          <h2 id="laws-canon-title">No model, sponsor, or feature outranks them.</h2>
          <p>
            AI may phrase dialogue, but it may not alter the Seven Laws, player
            rights, consent behavior, the meaning of the Promise, or the
            distinction between clues and medical conclusions.
          </p>
        </div>
        <a className="button button-primary" href={canonUrl} target="_blank" rel="noreferrer">
          Read the frozen canon
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </section>
    </article>
  );
}
