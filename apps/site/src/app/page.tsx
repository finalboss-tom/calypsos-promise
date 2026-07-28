import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src="/assets/hero-ogygia.webp"
          width={1600}
          height={900}
          sizes="100vw"
          priority
          alt=""
        />
        <div className="hero-content">
          <p className="eyebrow">Sprint 8 foundation</p>
          <h1 id="hero-title">Your Odyssey Begins Here.</h1>
          <p className="promise-line">
            Build your Living Chronicle. Improve your health. Keep the key.
          </p>
          <p className="summary">
            This compatibility shell establishes the Next.js foundation while
            the full public gateway is migrated through deliberate, reviewable
            workstreams. Essential project information remains available without
            animation, audio, or an account.
          </p>
          <div className="actions">
            <a
              className="button button-primary"
              href="https://github.com/finalboss-tom/calypsos-promise"
              target="_blank"
              rel="noreferrer"
            >
              Explore the repository
            </a>
            <a
              className="button"
              href="https://github.com/finalboss-tom/calypsos-promise/blob/main/docs/roadmap/current-status.md"
              target="_blank"
              rel="noreferrer"
            >
              Read current status
            </a>
          </div>
        </div>
      </section>

      <section className="status-grid" aria-label="Capability status">
        <article className="card">
          <span className="status status-live">Live</span>
          <h2>Public repository</h2>
          <p>
            Governance, architecture, roadmap, public contracts, and synthetic
            evidence are inspectable now.
          </p>
        </article>
        <article className="card">
          <span className="status status-foundation">Foundation</span>
          <h2>Website migration</h2>
          <p>
            The App Router shell, security policy, metadata, route
            compatibility, and design tokens are under active review.
          </p>
        </article>
        <article className="card">
          <span className="status status-planned">Planned</span>
          <h2>Private product</h2>
          <p>
            Accounts, private Chronicles, production Aster, providers,
            connectors, transactions, and gameplay are not activated here.
          </p>
        </article>
      </section>
    </>
  );
}
