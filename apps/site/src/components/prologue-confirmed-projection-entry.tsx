import Link from "next/link";
import type { RefObject } from "react";
import type {
  OpeningState,
  OpeningTransition,
} from "@/lib/prologue-opening-state";
import { projectSyntheticChronicle } from "@/lib/prologue-synthetic-projections";
import styles from "./prologue-chronicle-receipt-panel.module.css";

export type PrologueConfirmedProjectionEntryProps = {
  readonly state: OpeningState;
  readonly move: (transition: OpeningTransition) => void;
  readonly headingRef: RefObject<HTMLHeadingElement | null>;
};

export function PrologueConfirmedProjectionEntry({
  state,
  move,
  headingRef,
}: PrologueConfirmedProjectionEntryProps) {
  if (state.scene !== "confirmed-entry") return null;

  const chronicle = projectSyntheticChronicle(state);
  if (!chronicle) return null;

  return (
    <article className={styles.scene} data-scene="confirmed-entry">
      <p className="eyebrow">Confirmed synthetic demonstration state</p>
      <h2 id="prologue-scene-title" ref={headingRef} tabIndex={-1}>
        You confirmed the example. Nothing was stored.
      </h2>
      <p className={styles.lede}>
        The confirmation exists only in this page memory. You can now inspect
        how the confirmed synthetic fixture would be presented as a temporary
        Chronicle-shaped view before seeing the receipt-shaped explanation.
      </p>

      <div
        className={styles.statusRow}
        aria-label="Confirmed projection status"
      >
        <span>Synthetic</span>
        <span>Visitor confirmed</span>
        <span>Not stored</span>
      </div>

      <dl className={styles.projectionDetails}>
        <div>
          <dt>Selected fixture</dt>
          <dd>{chronicle.fixtureId}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{chronicle.category}</dd>
        </div>
        <div>
          <dt>Confirmed value</dt>
          <dd>{chronicle.value}</dd>
        </div>
        <div>
          <dt>Correction state</dt>
          <dd>
            {chronicle.correctionApplied
              ? `Prepared correction applied: ${chronicle.correctionId}`
              : "Accepted as written"}
          </dd>
        </div>
        <div>
          <dt>Source</dt>
          <dd>{chronicle.sourceLabel}</dd>
        </div>
        <div>
          <dt>Persistence</dt>
          <dd>{chronicle.persistence}</dd>
        </div>
      </dl>

      <p className={styles.sourceDetail}>
        This is not a Chronicle record, permission, health claim, account
        record, audit event, legal consent, or durable game achievement.
      </p>

      <div
        className={styles.actions}
        aria-label="Confirmed synthetic state choices"
      >
        <button
          className="button button-primary"
          type="button"
          onClick={() => move("view-synthetic-chronicle")}
        >
          View the temporary synthetic Chronicle
        </button>
        <button
          className="button"
          type="button"
          onClick={() => move("review-confirmed-entry")}
        >
          Review or correct the synthetic entry
        </button>
        <button
          className="button"
          type="button"
          onClick={() => move("change-synthetic-example")}
        >
          Choose another synthetic example
        </button>
        <button
          className="button"
          type="button"
          onClick={() => move("discard-projection")}
        >
          Discard the confirmed synthetic state
        </button>
        <Link className="text-action" href="/">
          Leave the prologue
        </Link>
      </div>
    </article>
  );
}
