import Link from "next/link";
import type { RefObject } from "react";
import type {
  OpeningState,
  OpeningTransition,
} from "@/lib/prologue-opening-state";
import styles from "./prologue-departure-panel.module.css";

export type PrologueDeparturePanelProps = {
  readonly state: OpeningState;
  readonly move: (transition: OpeningTransition) => void;
  readonly headingRef: RefObject<HTMLHeadingElement | null>;
};

function RestartButton({
  move,
}: {
  readonly move: (transition: OpeningTransition) => void;
}) {
  return (
    <button
      className="button"
      type="button"
      onClick={() => move("restart-prologue")}
    >
      Restart the prologue
    </button>
  );
}

export function PrologueDeparturePanel({
  state,
  move,
  headingRef,
}: PrologueDeparturePanelProps) {
  if (state.scene === "exit-choice") {
    return (
      <article className={styles.scene} data-scene="exit-choice">
        <p className="eyebrow">Departure from Lantern Shore</p>
        <h2 id="prologue-scene-title" ref={headingRef} tabIndex={-1}>
          Leave with the explanation, not an obligation.
        </h2>
        <p className={styles.lede}>
          End here, inspect the future account boundary, restart, or leave. No
          choice requests contact information or changes the evidence.
        </p>

        <div className={styles.statusRow} aria-label="Departure status">
          <span>No account required</span>
          <span>No email requested</span>
          <span>No state retained</span>
          <span>No conversion reward</span>
        </div>

        <div className={styles.actions} aria-label="Departure choices">
          <button
            className="button button-primary"
            type="button"
            onClick={() => move("complete-without-account")}
          >
            Complete without an account
          </button>
          <button
            className="button"
            type="button"
            onClick={() => move("view-future-account-boundary")}
          >
            Inspect the future account boundary
          </button>
          <RestartButton move={move} />
          <Link className="text-action" href="/">
            Leave for the public site
          </Link>
        </div>
      </article>
    );
  }

  if (state.scene === "future-account") {
    return (
      <article className={styles.scene} data-scene="future-account">
        <p className="eyebrow">Informational future boundary</p>
        <h2 id="prologue-scene-title" ref={headingRef} tabIndex={-1}>
          A future account could hold private state. It does not exist here.
        </h2>
        <p className={styles.lede}>
          Account creation is unavailable in Sprint 9. This screen creates no
          identity, storage, email request, newsletter call, access, or reward.
        </p>

        <dl className={styles.details}>
          <div>
            <dt>Identity and authentication</dt>
            <dd>future separately reviewed boundaries</dd>
          </div>
          <div>
            <dt>Private Chronicle storage</dt>
            <dd>none created in this prologue</dd>
          </div>
          <div>
            <dt>Current state</dt>
            <dd>
              destroyed by leaving or restart; navigation destroys the current
              temporary state
            </dd>
          </div>
        </dl>

        <div className={styles.actions} aria-label="Future account choices">
          <button
            className="button button-primary"
            type="button"
            onClick={() => move("return-to-departure")}
          >
            Return to departure choices
          </button>
          <button
            className="button"
            type="button"
            onClick={() => move("complete-without-account")}
          >
            Complete without an account
          </button>
          <RestartButton move={move} />
          <Link className="text-action" href="/">
            Leave for the public site
          </Link>
        </div>
      </article>
    );
  }

  if (state.scene !== "complete") return null;

  return (
    <article className={styles.scene} data-scene="complete">
      <p className="eyebrow">Public synthetic prologue complete</p>
      <h2 id="prologue-scene-title" ref={headingRef} tabIndex={-1}>
        Nothing follows you off this page.
      </h2>
      <p className={styles.lede}>
        You finished without an account, email, real health information,
        provider, model, payment, or conversion offer.
      </p>

      <div
        className={styles.statusRow}
        aria-label="Completion departure status"
      >
        <span>Complete in page memory</span>
        <span>No conversion</span>
        <span>No retained state</span>
        <span>No durable progression</span>
      </div>

      <p className={styles.boundaryNote}>
        This is not a rank, reward, canonical unlock, Fourteen Lantern
        progression, health outcome, or production account state.
      </p>

      <div className={styles.actions} aria-label="Completed prologue choices">
        <RestartButton move={move} />
        <Link className="button button-primary" href="/">
          Return to the public site
        </Link>
      </div>
    </article>
  );
}
