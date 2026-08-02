import Link from "next/link";
import type { RefObject } from "react";
import type {
  OpeningState,
  OpeningTransition,
} from "@/lib/prologue-opening-state";
import {
  getSyntheticFixture,
  projectSyntheticDraft,
} from "@/lib/prologue-synthetic-fixtures";
import styles from "./prologue-capture-panel.module.css";

export type PrologueCapturePanelProps = {
  readonly state: OpeningState;
  readonly move: (transition: OpeningTransition) => void;
  readonly headingRef: RefObject<HTMLHeadingElement | null>;
};

function presentationLabel(state: OpeningState) {
  return state.presentationPath === "aster"
    ? "Deterministic Aster presentation"
    : "Direct manual presentation";
}

function DraftDetails({ state }: { readonly state: OpeningState }) {
  if (!state.fixtureId) return null;
  const fixture = getSyntheticFixture(state.fixtureId);
  const draft = projectSyntheticDraft(
    state.fixtureId,
    state.correctionId,
    state.confirmed,
  );

  return (
    <div className={styles.draftCard}>
      <div className={styles.syntheticLabel}>Synthetic demonstration</div>
      <dl className={styles.draftDetails}>
        <div>
          <dt>Source</dt>
          <dd>{fixture.sourceLabel}</dd>
        </div>
        <div>
          <dt>Value</dt>
          <dd>{draft.value}</dd>
        </div>
        <div>
          <dt>Classification</dt>
          <dd>{fixture.dataClassification}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{draft.status}</dd>
        </div>
      </dl>
      <details>
        <summary>Inspect the synthetic fixture details</summary>
        <dl className={styles.draftDetails}>
          <div>
            <dt>Record ID</dt>
            <dd>{draft.recordId}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{draft.category}</dd>
          </div>
          <div>
            <dt>Context</dt>
            <dd>{draft.context}</dd>
          </div>
          <div>
            <dt>Synthetic timestamp</dt>
            <dd>{draft.occurredAt}</dd>
          </div>
        </dl>
        <p className={styles.sourceDetail}>{fixture.sourceDetail}</p>
        <p className={styles.prohibited}>{fixture.prohibitedInterpretation}</p>
      </details>
    </div>
  );
}

export function PrologueCapturePanel({
  state,
  move,
  headingRef,
}: PrologueCapturePanelProps) {
  if (state.scene === "capture-choice") {
    return (
      <article className={styles.scene} data-scene="capture-choice">
        <p className="eyebrow">Public synthetic capture demonstration</p>
        <h2 id="prologue-scene-title" ref={headingRef} tabIndex={-1}>
          Choose a prepared example, not your information.
        </h2>
        <p className={styles.lede}>
          Both choices are public fixtures. There is no text box, microphone,
          upload, account, model call, or health-data intake.
        </p>

        <div className={styles.choiceGrid}>
          <article>
            <p className="eyebrow">Synthetic text</p>
            <h3>Use the prepared sleep sentence</h3>
            <p>Already written and visibly synthetic.</p>
            <button
              className="button button-primary"
              type="button"
              onClick={() => move("choose-synthetic-text")}
            >
              Use the synthetic text example
            </button>
          </article>
          <article>
            <p className="eyebrow">Synthetic voice transcript</p>
            <h3>Use the prepared walking transcript</h3>
            <p>No audio exists and no microphone is requested.</p>
            <button
              className="button button-primary"
              type="button"
              onClick={() => move("choose-synthetic-voice")}
            >
              Use the synthetic voice transcript
            </button>
          </article>
        </div>

        <div className={styles.actions} aria-label="Synthetic capture exits">
          <button
            className="button"
            type="button"
            onClick={() => move("reconsider-guide")}
          >
            Return to the guide choice
          </button>
          <Link className="text-action" href="/">
            Leave the prologue
          </Link>
        </div>
      </article>
    );
  }

  if (!state.fixtureId) return null;
  const fixture = getSyntheticFixture(state.fixtureId);

  if (state.scene === "synthetic-draft") {
    return (
      <article className={styles.scene} data-scene="synthetic-draft">
        <p className="eyebrow">Deterministic synthetic draft</p>
        <h2 id="prologue-scene-title" ref={headingRef} tabIndex={-1}>
          The fixture becomes a draft, not a fact.
        </h2>
        <p className={styles.lede}>
          {presentationLabel(state)} applied a fixed local mapping. No model was
          used, and nothing is confirmed or stored.
        </p>
        <blockquote className={styles.example}>{fixture.example}</blockquote>
        <DraftDetails state={state} />
        <div className={styles.actions} aria-label="Synthetic draft choices">
          <button
            className="button button-primary"
            type="button"
            onClick={() => move("review-draft")}
          >
            Review and correct the draft
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
            onClick={() => move("refuse-draft")}
          >
            Refuse this synthetic draft
          </button>
          <Link className="text-action" href="/">
            Leave the prologue
          </Link>
        </div>
      </article>
    );
  }

  if (state.scene === "review-and-correction") {
    const accepted = state.correctionId === "accept-as-written";
    const corrected = state.correctionId === fixture.correction.id;

    return (
      <article className={styles.scene} data-scene="review-and-correction">
        <p className="eyebrow">Review before confirmation</p>
        <h2 id="prologue-scene-title" ref={headingRef} tabIndex={-1}>
          Confirmation requires your explicit choice.
        </h2>
        <p className={styles.lede}>
          Aster cannot confirm this draft. The manual guide cannot confirm it.
          Keep the prepared synthetic value or apply its prepared correction.
        </p>

        <DraftDetails state={state} />

        <div
          className={styles.correctionChoices}
          aria-label="Synthetic correction choices"
        >
          <button
            className="button"
            type="button"
            aria-pressed={accepted}
            onClick={() => move("accept-as-written")}
          >
            Accept the synthetic value as written
          </button>
          <button
            className="button"
            type="button"
            aria-pressed={corrected}
            onClick={() => move("apply-synthetic-correction")}
          >
            {fixture.correction.label}
          </button>
        </div>

        <p className={styles.selectionStatus} role="status" aria-live="polite">
          {state.correctionId
            ? "A synthetic review choice is selected. You may now confirm or change it."
            : "No review choice is selected. Confirmation remains unavailable."}
        </p>

        <div
          className={styles.actions}
          aria-label="Synthetic confirmation choices"
        >
          <button
            className="button button-primary"
            type="button"
            disabled={!state.correctionId}
            onClick={() => move("confirm-entry")}
          >
            Confirm this synthetic demonstration
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
            onClick={() => move("refuse-draft")}
          >
            Refuse this synthetic draft
          </button>
          <Link className="text-action" href="/">
            Leave the prologue
          </Link>
        </div>
      </article>
    );
  }

  return null;
}
