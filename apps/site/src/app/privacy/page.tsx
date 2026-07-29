import type { Metadata } from "next";
import Link from "next/link";

const providerDescription =
  "Google Apps Script webhook into the project’s private Google Sheet";

export const metadata: Metadata = {
  title: "Newsletter privacy",
  description:
    "How the temporary Phase 0 newsletter signup handles email addresses and consent.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <article className="reading-panel">
      <p className="eyebrow">Founding Expedition newsletter privacy</p>
      <h1>The newsletter accepts an email address and explicit consent only.</h1>
      <p>
        The temporary Phase 0 newsletter exists so people can receive occasional
        public project updates and opportunities to inspect, play, review, or
        contribute. It is not an account, authentication system, game
        registration, health-data intake, research enrollment, provider intake,
        donation flow, or advertising profile.
      </p>

      <h2>What is collected</h2>
      <ul>
        <li>the email address you submit;</li>
        <li>your affirmative consent to receive project updates;</li>
        <li>
          the privacy-policy version, narrow newsletter purpose, source route,
          and submission time; and
        </li>
        <li>
          temporary request information needed for bounded abuse prevention and
          delivery.
        </li>
      </ul>
      <p>
        Do not submit health, medical, genetic, wearable, location, Chronicle, or
        other sensitive information. The form has no field for those categories.
      </p>

      <h2>Where it goes</h2>
      <p>
        The server forwards an accepted signup through the existing private{" "}
        {providerDescription}. The webhook address and any token remain server-only
        Vercel environment variables. Subscriber addresses are not written to
        GitHub, public logs, website analytics, or the open-source repository.
      </p>

      <h2>Retention, correction, and deletion</h2>
      <p>
        The list is retained only for the Founding Expedition update purpose while
        Phase 0 remains active, unless you unsubscribe or request deletion sooner.
        The storage and provider choice must be reviewed again at Phase 0 exit or
        before migration to another newsletter system.
      </p>
      <p>
        To unsubscribe, correct your address, request access, or request deletion,
        reply to any project update or email{" "}
        <a href="mailto:tom@calypsospromise.org">tom@calypsospromise.org</a>.
        Requests will be handled manually while this temporary system is in use.
      </p>

      <h2>Failure, abuse, and incidents</h2>
      <p>
        The form uses explicit consent, email validation, a bot honeypot, bounded
        request size, best-effort per-source throttling, an HTTPS-only server
        webhook, and a delivery timeout. The in-memory throttle is not a durable
        distributed rate limiter and remains an explicit Phase 0 limitation.
        Provider failure returns a public-safe error and does not silently claim a
        successful signup.
      </p>
      <p>
        If the webhook or private sheet is suspected of compromise, intake can be
        disabled by removing the server configuration or restoring the no-intake
        route. Protected incident details and real subscriber records must never be
        posted publicly.
      </p>

      <h2>Open gate</h2>
      <p>
        The preserve-and-activate direction is tracked in{" "}
        <a
          href="https://github.com/finalboss-tom/calypsos-promise/issues/63"
          target="_blank"
          rel="noreferrer"
        >
          issue #63
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        . The issue remains open until implementation, deployed behavior, manual
        verification, limitations, and founding-steward acceptance are reconciled.
      </p>

      <Link href="/support">Review public support and contribution routes</Link>
    </article>
  );
}
