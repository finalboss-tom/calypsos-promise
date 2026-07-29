import Link from "next/link";
import type { RefObject } from "react";
import type {
  OpeningState,
  OpeningTransition,
} from "@/lib/prologue-opening-state";
import {
  houseOfKeysProjectionReferences,
  projectSyntheticChronicle,
  projectSyntheticReceipt,
} from "@/lib/prologue-synthetic-projections";
import styles from "./prologue-chronicle-receipt-panel.module.css";

export type PrologueChronicleReceiptPanelProps = {
  readonly state: OpeningState;
  readonly move: (transition: OpeningTransition) => void;
  readonly headingRef: RefObject<HTMLHeadingElement | null>;
};

function ProjectionLimits({ limitations }: { readonly limitations: readonly string[] }) {
  return (
    <ul className={styles.limitations} aria-label="Projection limitations">
      {limitations.map((limitation) => (
        <li key={limitation}>{limitation}</li>
      ))}
    </ul>
  );
}

export function PrologueChronicleReceiptPanel({
  state,
  move,
  headingRef,
}: PrologueChronicleReceiptPanelProps) {
  if (
    state.scene !== "synthetic-chronicle" &&
    state.scene !== "synthetic-receipt"
  ) {
    return null;
  }

  const chronicle = projectSyntheticChronicle(state);
  if (!chronicle) return null;

  if (state.scene === "synthetic-chronicle") {
    return (
      <article className={styles.scene} data-scene="synthetic-chronicle">
        <p className="eyebrow">Temporary synthetic Chronicle projection</p>
        <h2 id="prologue-scene-title" ref={headingRef} tabIndex={-1}>
          This looks like a Chronicle entry. It is not stored as one.
        </h2>
        <p className={styles.lede}>
          The view below projects the explicitly confirmed synthetic example
          from this page memory. It preserves source, classification,
          correction, confirmation, and discard behavior without creating a
          private Chronicle or authoritative record.
        </p>

        <div className={styles.statusRow} aria-label="Chronicle projection status">
          <span>Synthetic</span>
          <span>Page memory only</span>
          <span>Not stored</span>
        </div>

        <dl className={styles.projectionDetails}>
          <div>
            <dt>Projection ID</dt>
            <dd>{chronicle.projectionId}</dd>
          </div>
          <div>
            <dt>Record ID</dt>
            <dd>{chronicle.recordId}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{chronicle.category}</dd>
          </div>
          <div>
            <dt>Displayed value</dt>
            <dd>{chronicle.value}</dd>
          </div>
          <div>
            <dt>Original synthetic value</dt>
            <dd>{chronicle.originalValue}</dd>
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
            <dt>Context</dt>
            <dd>{chronicle.context}</dd>
          </div>
          <div>
            <dt>Synthetic timestamp</dt>
            <dd>{chronicle.occurredAt}</dd>
          </div>
          <div>
            <dt>Source</dt>
            <dd>{chronicle.sourceLabel}</dd>
          </div>
          <div>
            <dt>Confirmation</dt>
            <dd>{chronicle.confirmationState}</dd>
          </div>
          <div>
            <dt>Persistence</dt>
            <dd>{chronicle.persistence}</dd>
          </div>
          <div>
            <dt>Discard behavior</dt>
            <dd>{chronicle.discardBehavior}</dd>
          </div>
        </dl>

        <p className={styles.sourceDetail}>{chronicle.sourceDetail}</p>
        <ProjectionLimits limitations={chronicle.limitations} />

        <div className={styles.actions} aria-label="Synthetic Chronicle choices">
          <button
            className="button button-primary"
            type="button"
            onClick={() => move("view-synthetic-receipt")}
          >
            View the House of Keys receipt demonstration
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
            onClick={() => move("discard-projection")}
          >
            Discard the temporary projection
          </button>
          <Link className="text-action" href="/">
            Leave the prologue
          </Link>
        </div>
      </article>
    );
  }

  const receipt = projectSyntheticReceipt(chronicle);

  return (
    <article className={styles.scene} data-scene="synthetic-receipt">
      <p className="eyebrow">House of Keys receipt-shaped demonstration</p>
      <h2 id="prologue-scene-title" ref={headingRef} tabIndex={-1}>
        This explains receipt fields. It grants no permission.
      </h2>
      <p className={styles.lede}>
        This illustrative projection borrows selected field meanings from the
        accepted public House of Keys AccessReceipt contract and synthetic
        fixture. It is deliberately not a contract record, policy decision,
        grant, legal consent, audit event, or proof of data release.
      </p>

      <div className={styles.statusRow} aria-label="Receipt projection status">
        <span>Synthetic</span>
        <span>Not evaluated</span>
        <span>No data release</span>
      </div>

      <dl className={styles.projectionDetails}>
        <div>
          <dt>Projection ID</dt>
          <dd>{receipt.projectionId}</dd>
        </div>
        <div>
          <dt>Projection status</dt>
          <dd>{receipt.projectionStatus}</dd>
        </div>
        <div>
          <dt>Contract version reference</dt>
          <dd>{receipt.contractVersionReference}</dd>
        </div>
        <div>
          <dt>Contract shape reference</dt>
          <dd>{receipt.contractShapeReference}</dd>
        </div>
        <div>
          <dt>Accepted fixture reference</dt>
          <dd>{receipt.acceptedFixtureReference}</dd>
        </div>
        <div>
          <dt>Controlled resource</dt>
          <dd>{receipt.controlledResourceId}</dd>
        </div>
        <div>
          <dt>Selected record</dt>
          <dd>{receipt.selectedRecordIds.join(", ")}</dd>
        </div>
        <div>
          <dt>Purpose</dt>
          <dd>{receipt.purpose.label}</dd>
        </div>
        <div>
          <dt>Recipient</dt>
          <dd>{receipt.recipient.label}</dd>
        </div>
        <div>
          <dt>Action</dt>
          <dd>{receipt.action.label}</dd>
        </div>
        <div>
          <dt>Policy decision</dt>
          <dd>{receipt.decisionOutcome}</dd>
        </div>
        <div>
          <dt>Execution state</dt>
          <dd>{receipt.executionState}</dd>
        </div>
        <div>
          <dt>Grant references</dt>
          <dd>none</dd>
        </div>
        <div>
          <dt>Data release boundary crossed</dt>
          <dd>{receipt.dataReleaseBoundaryCrossed ? "yes" : "no"}</dd>
        </div>
        <div>
          <dt>Reason codes</dt>
          <dd>{receipt.reasonCodes.join(", ")}</dd>
        </div>
      </dl>

      <ProjectionLimits limitations={receipt.limitations} />

      <p className={styles.contractSources}>
        Inspect the accepted public references: {" "}
        <a
          href={houseOfKeysProjectionReferences.contractSource}
          target="_blank"
          rel="noreferrer"
        >
          AccessReceipt contract
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
        {" · "}
        <a
          href={houseOfKeysProjectionReferences.acceptedFixtureSource}
          target="_blank"
          rel="noreferrer"
        >
          synthetic receipt fixture
          <span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </p>

      <div className={styles.actions} aria-label="Synthetic receipt choices">
        <button
          className="button button-primary"
          type="button"
          onClick={() => move("return-to-chronicle")}
        >
          Return to the synthetic Chronicle view
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
          onClick={() => move("discard-projection")}
        >
          Discard the temporary projection
        </button>
        <Link className="text-action" href="/">
          Leave the prologue
        </Link>
      </div>
    </article>
  );
}
