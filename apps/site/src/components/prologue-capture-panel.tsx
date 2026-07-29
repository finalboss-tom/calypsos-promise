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
          <dt>Classification</dt>
          <dd>{fixture.dataClassification}</dd>
        </div>
        <div>
          <dt>Source</dt>
          <dd>{fixture.sourceLabel}</dd>
        </div>
        <div>
          <dt>Record ID</dt>
          <dd>{draft.recordId}</dd>
        </div>
        <div>
          <dt>Category</dt>
          <dd>{draft.category}</dd>
        </div>
        <div>
          <dt>Value</dt>
          <dd>{draft.value}</dd>
        </div>
        <div>
          <dt>Context</dt>
          <dd>{draft.context}</dd>
        </div>
        <div>
          <dt>Synthetic timestamp</dt>
          <dd>{draft.occurredAt}</dd>
        </div>
        <div>
          <dt>Demonstration status</dt>
          <dd>{draft.status}</dd>
        </div>
      </dl>
      <p className={styles.sourceDetail}>{fixture.sourceDetail}</p>
      <p className={styles.prohibited}>{fixture.prohibitedInterpretation}</p>
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
          Both choices are repository-authored public fixtures. There is no text box,
          microphone, upload, account, contact request, model call, or health-data
          intake. {presentationLabel(state)} presents the same deterministic result.
        </p>

        <div className={styles.choiceGrid}>
          <article>
            <p className="eyebrow">Synthetic text</p>
            <h3>Use the prepared sleep sentence</h3>
            <p>
              The sentence is already written and visibly synthetic. You cannot
              replace it with personal information.
            </p>
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
            <p>
              No audio exists and no microphone is requested. The transcript is a
              repository-authored visual demonstration only.
            </p>
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
          {presentationLabel(state)} applied a fixed local mapping to the selected
          synthetic fixture. No model generated this draft, and nothing has been
          confirmed or stored.
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
          Confirmation requires an explicit choice.
        </h2>
        <p className={styles.lede}>
          Aster cannot confirm this draft. The manual guide cannot confirm it. Choose
          whether the prepared synthetic value remains as written or uses the one
          prepared correction.
        </p>

        <DraftDetails state={state} />

        <div className={styles.correctionChoices} aria-label="Synthetic correction choices">
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

        <div className={styles.actions} aria-label="Synthetic confirmation choices">
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

  if (state.scene === "confirmed-entry") {
    return (
      <article className={styles.scene} data-scene="confirmed-entry">
        <p className="eyebrow">Confirmed synthetic demonstration state</p>
        <h2 id="prologue-scene-title" ref={headingRef} tabIndex={-1}>
          You confirmed the example. Nothing was stored.
        </h2>
        <p className={styles.lede}>
          This confirmation exists only in this page memory. It is not a Chronicle
          entry, permission, health claim, account record, audit event, or durable
          game achievement.
        </p>
        <DraftDetails state={state} />
        <p className={styles.nextBoundary}>
          Workstream 9.5 will project this confirmed synthetic state into a visibly
          temporary Chronicle view and non-authoritative House of Keys receipt.
        </p>
        <div className={styles.actions} aria-label="Confirmed synthetic state choices">
          <button
            className="button button-primary"
            type="button"
            onClick={() => move("review-confirmed-entry")}
          >
            Review the confirmation again
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

  return null;
}
