import Link from "next/link";
import type { RefObject } from "react";
import {
  firstLanternCompletionRule,
  projectFirstLanternCompletion,
} from "@/lib/prologue-first-lantern";
import type {
  OpeningState,
  OpeningTransition,
} from "@/lib/prologue-opening-state";
import styles from "./prologue-first-lantern-panel.module.css";

export type PrologueFirstLanternPanelProps = {
  readonly state: OpeningState;
  readonly move: (transition: OpeningTransition) => void;
  readonly headingRef: RefObject<HTMLHeadingElement | null>;
};

export function PrologueFirstLanternPanel({
  state,
  move,
  headingRef,
}: PrologueFirstLanternPanelProps) {
  if (state.scene !== "first-lantern") return null;

  const completion = projectFirstLanternCompletion(state);
  if (!completion) return null;

  return (
    <article className={styles.scene} data-scene="first-lantern">
      <p className="eyebrow">First Lantern — synthetic completion evidence</p>
      <h2 id="prologue-scene-title" ref={headingRef} tabIndex={-1}>
        The First Lantern lights because three visible checks are complete.
      </h2>
      <p className={styles.lede}>
        This completion was calculated locally from explicit synthetic state.
        No model, account, email, newsletter submission, payment, provider,
        health claim, real-world action, analytics event, elapsed timer, or
        hidden signal contributed.
      </p>

      <div className={styles.lantern} aria-hidden="true">
        <span />
      </div>

      <div className={styles.statusRow} aria-label="First Lantern status">
        <span>Synthetic</span>
        <span>Page memory only</span>
        <span>No durable reward</span>
      </div>

      <dl className={styles.completionDetails}>
        <div>
          <dt>Completion ID</dt>
          <dd>{completion.completionId}</dd>
        </div>
        <div>
          <dt>Rule</dt>
          <dd>
            {completion.ruleId} · version {completion.ruleVersion}
          </dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{completion.status}</dd>
        </div>
        <div>
          <dt>Fixture</dt>
          <dd>{completion.fixtureId}</dd>
        </div>
        <div>
          <dt>Review choice</dt>
          <dd>{completion.correctionId}</dd>
        </div>
        <div>
          <dt>Chronicle evidence</dt>
          <dd>{completion.chronicleProjectionId}</dd>
        </div>
        <div>
          <dt>Receipt evidence</dt>
          <dd>{completion.receiptProjectionId}</dd>
        </div>
        <div>
          <dt>Reward</dt>
          <dd>{completion.reward}</dd>
        </div>
        <div>
          <dt>Durable progression</dt>
          <dd>{completion.durableProgression ? "yes" : "no"}</dd>
        </div>
        <div>
          <dt>Authority</dt>
          <dd>{completion.authority}</dd>
        </div>
        <div>
          <dt>Persistence</dt>
          <dd>{completion.persistence}</dd>
        </div>
      </dl>

      <section className={styles.evidence} aria-labelledby="completion-evidence-title">
        <h3 id="completion-evidence-title">Why the lantern lit</h3>
        <ol>
          {completion.evidence.map((item) => (
            <li key={item.id}>
              <strong>{item.id}</strong>
              <span>{item.explanation}</span>
              <small>Satisfied: {item.satisfied ? "yes" : "no"}</small>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.prohibited} aria-labelledby="completion-prohibitions-title">
        <h3 id="completion-prohibitions-title">What did not count</h3>
        <p>
          The rule explicitly excludes: {firstLanternCompletionRule.prohibitedInputs.join(", ")}.
        </p>
      </section>

      <ul className={styles.limitations} aria-label="First Lantern limitations">
        {completion.limitations.map((limitation) => (
          <li key={limitation}>{limitation}</li>
        ))}
      </ul>

      <div className={styles.actions} aria-label="First Lantern choices">
        <button
          className="button button-primary"
          type="button"
          onClick={() => move("return-to-receipt")}
        >
          Review the receipt evidence again
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
          Discard the temporary completion state
        </button>
        <Link className="text-action" href="/">
          Leave the prologue
        </Link>
      </div>
    </article>
  );
}
