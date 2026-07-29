import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Newsletter signup confirmed",
  description: "Founding Expedition newsletter signup confirmation.",
  alternates: {
    canonical: "/joined",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function JoinedPage() {
  return (
    <article className="reading-panel">
      <p className="eyebrow">Founding Expedition updates</p>
      <h1>Your signup was delivered.</h1>
      <p>
        Your email address was sent to the temporary private Phase 0 newsletter
        list. You may receive occasional public project updates and opportunities
        to inspect, play, review, or contribute.
      </p>
      <p>
        This did not create an account, game identity, Chronicle, research
        enrollment, provider relationship, governance role, donation, or payment.
      </p>
      <p>
        To unsubscribe, correct your address, request access, or request deletion,
        reply to any project update or email{" "}
        <a href="mailto:tom@calypsospromise.org">tom@calypsospromise.org</a>.
      </p>
      <p>
        Read the <Link href="/privacy">newsletter privacy notice</Link> or review{" "}
        <a
          href="https://github.com/finalboss-tom/calypsos-promise/issues/63"
          target="_blank"
          rel="noreferrer"
        >
          the open Phase 0 newsletter gate
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        .
      </p>
      <Link href="/">Return to Ogygia</Link>
    </article>
  );
}
