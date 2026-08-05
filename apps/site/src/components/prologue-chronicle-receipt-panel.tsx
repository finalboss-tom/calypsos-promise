import Link from "next/link";
import type { RefObject } from "react";
import type {
  OpeningState,
  OpeningTransition,
} from "@/lib/prologue-opening-state";
import {
  houseOfKeysProjectionReferences,
  livingChronicleProjectionReferences,
  projectSyntheticChronicle,
  projectSyntheticReceipt,
} from "@/lib/prologue-synthetic-projections";
import styles from "./prologue-chronicle-receipt-panel.module.css";

export type PrologueChronicleReceiptPanelProps = {
  readonly state: OpeningState;
  readonly move: (transition: OpeningTransition) => void;
  readonly headingRef: RefObject<HTMLHeadingElement | null>;
};

function ProjectionLimits({
  limitations,
}: {
  readonly limitations: readonly string[];
}) {
  return (
    <ul className={styles.limitations} aria-label="Projection limitations">
      {limitations.map((limitation) => (
        <li key={limitation}>{limitation}</li>
      ))}
    </ul>
  );
}

function ExternalSourceLink({
  href,
  children,
}: {
  readonly href: string;
  readonly children: string;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
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
          Source, correction, and confirmation stay visible.
        </h2>
        <p className={styles.lede}>
          This page-memory view shows the value, source, correction, and
          confirmation that a real Chronicle would need to preserve. It is not a
          stored record.
        </p>

        <div
          className={styles.statusRow}
          aria-label="Chronicle projection status"
        >
          <span>Synthetic</span>
          <span>Visitor confirmed</span>
          <span>Page memory only</span>
          <span>Not stored</span>
        </div>

        <dl className={styles.projectionDetails}>
          <div>
            <dt>Displayed value</dt>
            <dd>{chronicle.value}</dd>
          </div>
          <div>
            <dt>Original synthetic value</dt>
            <dd>{chronicle.originalValue}</dd>
          </div>
          <div>
            <dt>Correction and confirmation</dt>
            <dd>
              {chronicle.correctionApplied
                ? `Prepared correction applied: ${chronicle.correctionId}; ${chronicle.confirmationDecision}`
                : chronicle.confirmationDecision}
            </dd>
          </div>
          <div>
            <dt>Source</dt>
            <dd>{chronicle.sourceLabel}</dd>
          </div>
        </dl>

        <details>
          <summary>Inspect the mapped Chronicle vocabulary</summary>
          <dl className={styles.projectionDetails}>
            <div>
              <dt>Projection ID</dt>
              <dd>{chronicle.projectionId}</dd>
            </div>
            <div>
              <dt>Schema version reference</dt>
              <dd>{chronicle.schemaVersionReference}</dd>
            </div>
            <div>
              <dt>Contract shape reference</dt>
              <dd>{chronicle.contractShapeReference}</dd>
            </div>
            <div>
              <dt>Record ID</dt>
              <dd>{chronicle.recordId}</dd>
            </div>
            <div>
              <dt>Chronicle ID</dt>
              <dd>{chronicle.chronicleId}</dd>
            </div>
            <div>
              <dt>Subject ID</dt>
              <dd>{chronicle.subjectId}</dd>
            </div>
            <div>
              <dt>Record family</dt>
              <dd>{chronicle.recordFamily}</dd>
            </div>
            <div>
              <dt>Assertion class</dt>
              <dd>{chronicle.assertionClass}</dd>
            </div>
            <div>
              <dt>Authority state</dt>
              <dd>{chronicle.authorityState}</dd>
            </div>
            <div>
              <dt>Lifecycle state</dt>
              <dd>{chronicle.lifecycleState}</dd>
            </div>
            <div>
              <dt>Temporal assertion</dt>
              <dd>{chronicle.temporalAssertionKind}</dd>
            </div>
            <div>
              <dt>Variable ID</dt>
              <dd>{chronicle.variableId}</dd>
            </div>
            <div>
              <dt>Value shape</dt>
              <dd>{chronicle.valueShape}</dd>
            </div>
            <div>
              <dt>Source artifact ID</dt>
              <dd>{chronicle.sourceArtifactId}</dd>
            </div>
            <div>
              <dt>Source version ID</dt>
              <dd>{chronicle.sourceVersionId}</dd>
            </div>
            <div>
              <dt>Synthetic timestamp</dt>
              <dd>{chronicle.occurredAt}</dd>
            </div>
            <div>
              <dt>Discard behavior</dt>
              <dd>{chronicle.discardBehavior}</dd>
            </div>
            <div>
              <dt>Persistence</dt>
              <dd>{chronicle.persistence}</dd>
            </div>
          </dl>
          <p className={styles.sourceDetail}>{chronicle.sourceDetail}</p>
          <p className={styles.contractSources}>
            Canonical public references:{" "}
            <ExternalSourceLink
              href={livingChronicleProjectionReferences.contractSource}
            >
              Living Chronicle record contract
            </ExternalSourceLink>
            {" · "}
            <ExternalSourceLink
              href={livingChronicleProjectionReferences.versionSource}
            >
              schema version
            </ExternalSourceLink>
          </p>
          <ProjectionLimits limitations={chronicle.limitations} />
        </details>

        <div
          className={styles.actions}
          aria-label="Synthetic Chronicle choices"
        >
          <button
            className="button button-primary"
            type="button"
            onClick={() => move("view-synthetic-receipt")}
          >
            Continue to the receipt explanation
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
      <p className="eyebrow">House of Keys receipt-shaped explanation</p>
      <h2 id="prologue-scene-title" ref={headingRef} tabIndex={-1}>
        A receipt explains authority; it does not create it.
      </h2>
      <p className={styles.lede}>
        No policy request ran, no grant exists, and no data crossed a release
        boundary. This view only explains selected AccessReceipt meanings.
      </p>

      <div className={styles.statusRow} aria-label="Receipt projection status">
        <span>Synthetic</span>
        <span>Not an AccessReceipt</span>
        <span>Not evaluated</span>
        <span>No data release</span>
      </div>

      <dl className={styles.projectionDetails}>
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
          <dt>Data release</dt>
          <dd>{receipt.dataReleaseBoundaryCrossed ? "yes" : "no"}</dd>
        </div>
      </dl>

      <details>
        <summary>Inspect the receipt-shaped field mapping</summary>
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
            <dt>Vocabulary use</dt>
            <dd>{receipt.contractVocabularyUse}</dd>
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
            <dt>Purpose ID</dt>
            <dd>{receipt.purpose.id}</dd>
          </div>
          <div>
            <dt>Recipient ID</dt>
            <dd>{receipt.recipient.id}</dd>
          </div>
          <div>
            <dt>Action ID</dt>
            <dd>{receipt.action.id}</dd>
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
            <dt>Reason codes</dt>
            <dd>{receipt.reasonCodes.join(", ")}</dd>
          </div>
        </dl>
        <p className={styles.contractSources}>
          Canonical public references:{" "}
          <ExternalSourceLink
            href={houseOfKeysProjectionReferences.contractSource}
          >
            AccessReceipt contract
          </ExternalSourceLink>
          {" · "}
          <ExternalSourceLink
            href={houseOfKeysProjectionReferences.versionSource}
          >
            contract version
          </ExternalSourceLink>
        </p>
        <ProjectionLimits limitations={receipt.limitations} />
      </details>

      <div className={styles.actions} aria-label="Synthetic receipt choices">
        <button
          className="button button-primary"
          type="button"
          onClick={() => move("complete-first-lantern")}
        >
          Light the First Lantern from this evidence
        </button>
        <button
          className="button"
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
