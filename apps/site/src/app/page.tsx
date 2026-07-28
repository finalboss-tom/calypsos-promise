import Image from "next/image";
import { CapabilityStatusGrid } from "@/components/capability-status-grid";

export default function HomePage() {
  return (
    <>
      <section id="begin" className="hero" aria-labelledby="hero-title">
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
            This public gateway is being built in reviewable layers. Essential
            project information remains server-rendered and available without
            animation, audio, client JavaScript, an account, or story traversal.
          </p>
          <div className="actions" aria-label="Primary actions">
            <a
              className="button button-primary"
              href="https://github.com/finalboss-tom/calypsos-promise"
              target="_blank"
              rel="noreferrer"
            >
              Explore the repository
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
            <a className="button" href="#capability-status">
              Review capability status
            </a>
          </div>
        </div>
      </section>

      <section className="navigation-parity" aria-labelledby="navigation-parity-title">
        <p className="eyebrow">Two paths, one truth</p>
        <h2 id="navigation-parity-title">Choose direct access or the Ogygia path.</h2>
        <p>
          Primary navigation exposes the essential routes immediately. The optional
          narrative path uses the same destinations and does not unlock hidden or
          more authoritative information.
        </p>
      </section>

      <CapabilityStatusGrid />
    </>
  );
}
