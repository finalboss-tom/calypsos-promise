import type { Metadata } from "next";
import { StatusBadge } from "@/components/status-badge";
import {
  protectedSupportRoutes,
  publicSupportRoutes,
  supportNonCapabilities,
} from "@/lib/support-routes";

const contributingUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/CONTRIBUTING.md";
const publicationPolicyUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/policies/publication-and-confidentiality.md";
const feedbackUrl =
  "https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/governance/feedback-to-governed-work.md";

export const metadata: Metadata = {
  title: "Support and Contribute",
  description:
    "Public-safe issue, contribution, challenge, security, conduct, and private-information routes for Calypso’s Promise.",
  alternates: {
    canonical: "/support",
  },
};

export default function SupportPage() {
  return (
    <article className="guide-page public-record-page support-page">
      <header className="guide-page-header">
        <div className="page-status-line">
          <StatusBadge status="live" />
          <span>Public repository issue and contribution routes</span>
          <StatusBadge status="experimental" />
          <span>Website support guide under review</span>
          <StatusBadge status="planned" />
          <span>Accounts and private product support are not operating</span>
        </div>
        <p className="eyebrow">Support and contribute</p>
        <h1>Use the route that protects the person.</h1>
        <blockquote className="guide-quote">
          Public-safe work belongs in the open ledger. Personal, security,
          conduct, and protected evidence does not.
        </blockquote>
        <p className="summary">
          GitHub issues are the current public-safe work ledger. This page helps
          route public questions, contributions, challenges, vulnerabilities,
          conduct concerns, and private information without turning the website
          into an account-support, provider-intake, research, or clinical
          system.
        </p>
      </header>

      <section className="guide-section" aria-labelledby="public-support-title">
        <div className="split-heading">
          <div>
            <p className="eyebrow">Public-safe routes</p>
            <h2 id="public-support-title">
              Problems, challenges, and contributions.
            </h2>
          </div>
          <p>
            Use only public repository records and synthetic evidence. Do not
            disclose a diagnosis, disability, account identity, private
            experience, or another person’s information to establish
            affectedness.
          </p>
        </div>
        <div className="support-grid">
          {publicSupportRoutes.map((route) => (
            <article className="support-card" key={route.id}>
              <h3>{route.title}</h3>
              <p>{route.summary}</p>
              <a href={route.href} target="_blank" rel="noreferrer">
                {route.label}
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section
        className="guide-section protected-support-panel"
        aria-labelledby="protected-support-title"
      >
        <div className="split-heading">
          <div>
            <p className="eyebrow">Protected routes</p>
            <h2 id="protected-support-title">
              Do not make private evidence public.
            </h2>
          </div>
          <p>
            A deleted issue, edited comment, closed pull request, or rewritten
            branch may remain copied, cached, emailed, mirrored, or archived.
          </p>
        </div>
        <div className="support-grid">
          {protectedSupportRoutes.map((route) => (
            <article className="support-card" key={route.id}>
              <h3>{route.title}</h3>
              <p>{route.summary}</p>
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
        aria-labelledby="support-limits-title"
      >
        <div className="page-status-line">
          <StatusBadge status="planned" />
          <span>Capabilities that do not exist</span>
        </div>
        <h2 id="support-limits-title">This is not a private support desk.</h2>
        <ul>
          {supportNonCapabilities.map((boundary) => (
            <li key={boundary}>{boundary}</li>
          ))}
        </ul>
      </section>

      <footer className="guide-sources" aria-label="Support sources">
        <a href={contributingUrl} target="_blank" rel="noreferrer">
          Read the contribution guide
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a href={publicationPolicyUrl} target="_blank" rel="noreferrer">
          Read publication and confidentiality rules
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        <a href={feedbackUrl} target="_blank" rel="noreferrer">
          Read the feedback-to-governed-work architecture
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </footer>
    </article>
  );
}
