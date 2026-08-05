import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getMovementTotals,
  getPublishedPromise,
  listPublicSupporters,
} from "@/lib/supporters/database";
import {
  supporterMovementEnabled,
  supporterPagesShouldBeIndexed,
} from "@/lib/supporters/feature";
import managementStyles from "./management.module.css";
import { SupporterEnrollmentForm } from "./supporter-enrollment-form";
import { SupporterManagementRequestForm } from "./supporter-management-request-form";
import styles from "./supporters.module.css";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function generateMetadata(): Metadata {
  const index = supporterPagesShouldBeIndexed();
  return {
    title: "Support the Personal Health Data Promise",
    description:
      "Affirm the Personal Health Data Promise, verify by email, and choose whether your supporter profile is private or public.",
    alternates: { canonical: "/supporters" },
    robots: { index, follow: index, noarchive: !index },
  };
}

export default async function SupportersPage() {
  if (!supporterMovementEnabled()) notFound();

  const [promise, totals, publicSupporters] = await Promise.all([
    getPublishedPromise(),
    getMovementTotals(),
    listPublicSupporters(),
  ]);
  if (!promise)
    throw new Error("The configured Promise version is unavailable.");

  const foundingRemaining = Math.max(
    0,
    1_000 - totals.founding_numbers_assigned,
  );
  const validationMode =
    process.env.VERCEL_ENV !== "production" ||
    promise.version_label.startsWith("validation-");

  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <p className="eyebrow">A public promise, freely affirmed</p>
        <h1>Your body. Your history. Your health data.</h1>
        <p className={styles.lede}>
          Add your verified support for a simple principle: people should be
          able to build, understand, control, and carry their own health history
          without surrendering it as the price of participation.
        </p>
        {validationMode ? (
          <p className={styles.validationBanner}>
            Validation environment: this deployment uses a synthetic Promise
            record and must not be used for real enrollment.
          </p>
        ) : null}
      </header>

      <section
        className={styles.metrics}
        aria-label="Supporter movement totals"
      >
        <div>
          <strong>{totals.active_verified_supporters.toLocaleString()}</strong>
          <span>verified supporters</span>
        </div>
        <div>
          <strong>{totals.public_supporters.toLocaleString()}</strong>
          <span>public profiles</span>
        </div>
        <div>
          <strong>{foundingRemaining.toLocaleString()}</strong>
          <span>Founding Supporter numbers remaining</span>
        </div>
      </section>

      <section
        className={styles.promiseCard}
        aria-labelledby="promise-text-title"
      >
        <div className={styles.promiseMeta}>
          <div>
            <p className="eyebrow">Exact text you are affirming</p>
            <h2 id="promise-text-title">Personal Health Data Promise</h2>
          </div>
          <dl>
            <div>
              <dt>Version</dt>
              <dd>{promise.version_label}</dd>
            </div>
            <div>
              <dt>Content hash</dt>
              <dd className={styles.hash}>{promise.content_hash}</dd>
            </div>
          </dl>
        </div>
        <blockquote className={styles.promiseText}>
          {promise.canonical_text}
        </blockquote>
        <p className={styles.sourceNote}>
          A verified signature is permanently bound to this exact version. A
          later version cannot silently replace it.
        </p>
      </section>

      <section className={styles.boundaries} aria-labelledby="boundaries-title">
        <div>
          <p className="eyebrow">Clear boundaries</p>
          <h2 id="boundaries-title">
            Support does not purchase or surrender anything.
          </h2>
        </div>
        <ul>
          <li>Signing does not create a Calypso account or player profile.</li>
          <li>No health data or Chronicle information is requested.</li>
          <li>
            Research, newsletter, and public-listing consent remain separate.
          </li>
          <li>
            Supporter status does not grant governance or gameplay advantage.
          </li>
          <li>You may remain private and still be counted.</li>
        </ul>
      </section>

      <section
        className={styles.publicSupporters}
        aria-labelledby="public-supporters-title"
      >
        <div className={styles.sectionHeading}>
          <div>
            <p className="eyebrow">Public by separate consent</p>
            <h2 id="public-supporters-title">
              Verified supporters who chose to be named
            </h2>
          </div>
          <p>
            Private supporters are included in the total above but never appear
            here. Public profiles contain only fields the supporter chose to
            publish.
          </p>
        </div>
        {publicSupporters.length > 0 ? (
          <ol className={styles.supporterGrid}>
            {publicSupporters.map((supporter) => (
              <li key={supporter.profile_slug} className={styles.supporterCard}>
                <div className={styles.supporterIdentity}>
                  <strong>{supporter.display_name}</strong>
                  {typeof supporter.founding_number === "number" ? (
                    <span>
                      Founding Supporter #
                      {String(supporter.founding_number).padStart(4, "0")}
                    </span>
                  ) : (
                    <span>Verified Supporter</span>
                  )}
                </div>
                {supporter.broad_region ? (
                  <p>{supporter.broad_region}</p>
                ) : null}
                {supporter.why_i_signed ? (
                  <blockquote>{supporter.why_i_signed}</blockquote>
                ) : null}
              </li>
            ))}
          </ol>
        ) : (
          <p className={styles.emptyState}>
            No verified supporter has chosen a public profile yet. Private
            supporters remain counted without being named.
          </p>
        )}
      </section>

      <section className={styles.enrollment} aria-labelledby="enrollment-title">
        <div className={styles.enrollmentIntro}>
          <p className="eyebrow">Become a verified supporter</p>
          <h2 id="enrollment-title">
            Affirm, verify, and choose your visibility.
          </h2>
          <p>
            The first 1,000 verified supporters receive chronological Founding
            Supporter numbers. Numbers cannot be reserved, transferred, reused,
            or reassigned after withdrawal or invalidation.
          </p>
        </div>
        <SupporterEnrollmentForm promiseVersionLabel={promise.version_label} />
      </section>

      <section
        className={managementStyles.requestSection}
        aria-labelledby="management-request-title"
      >
        <div className={managementStyles.requestIntro}>
          <p className="eyebrow">Already a supporter?</p>
          <h2 id="management-request-title">Manage your supporter record</h2>
          <p>
            Request a single-use email-control link to edit public fields,
            switch between public and private visibility, or withdraw support.
          </p>
        </div>
        <SupporterManagementRequestForm />
      </section>
    </article>
  );
}
