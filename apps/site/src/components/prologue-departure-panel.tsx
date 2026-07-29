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
          The bounded public synthetic prologue is complete. You may end here,
          inspect what a future account boundary would need to protect, restart,
          or return to the public site. No option asks for contact information
          or changes your completion evidence.
        </p>

        <div className={styles.statusRow} aria-label="Departure status">
          <span>No account required</span>
          <span>No email requested</span>
          <span>No state retained</span>
          <span>No conversion reward</span>
        </div>

        <dl className={styles.details}>
          <div>
            <dt>Completion</dt>
            <dd>First Lantern evidence satisfied in this page memory only</dd>
          </div>
          <div>
            <dt>Account</dt>
            <dd>not required and not available</dd>
          </div>
          <div>
            <dt>Newsletter</dt>
            <dd>separate from the prologue and not called here</dd>
          </div>
          <div>
            <dt>Leaving</dt>
            <dd>navigation destroys the current temporary state</dd>
          </div>
        </dl>

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
          This screen explains a future separation of responsibility. It does
          not create an account, authenticate anyone, retain the prologue,
          request an email address, call the newsletter, or promise that account
          architecture is complete.
        </p>

        <dl className={styles.details}>
          <div>
            <dt>Account creation</dt>
            <dd>unavailable in Sprint 9</dd>
          </div>
          <div>
            <dt>Identity and authentication</dt>
            <dd>future separately reviewed system boundaries</dd>
          </div>
          <div>
            <dt>Private Chronicle storage</dt>
            <dd>none in this prologue</dd>
          </div>
          <div>
            <dt>Recovery and deletion</dt>
            <dd>future acceptance gates, not implied by this explanation</dd>
          </div>
          <div>
            <dt>Email and newsletter</dt>
            <dd>
              separate contact purpose; not account identity or game state
            </dd>
          </div>
          <div>
            <dt>Current temporary state</dt>
            <dd>still page-memory-only and destroyed by leaving or restart</dd>
          </div>
        </dl>

        <p className={styles.boundaryNote}>
          Inspecting this boundary gives no progression, access, priority,
          eligibility, reward, health benefit, or governance authority.
        </p>

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
        You completed the explanation without creating an account, providing an
        email address, entering real health information, selecting a provider,
        calling a model, making a payment, or accepting a conversion offer.
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

      <dl className={styles.details}>
        <div>
          <dt>Scope completed</dt>
          <dd>bounded public synthetic prologue only</dd>
        </div>
        <div>
          <dt>Persistence</dt>
          <dd>none</dd>
        </div>
        <div>
          <dt>Account</dt>
          <dd>none created</dd>
        </div>
        <div>
          <dt>Next choice</dt>
          <dd>restart locally or return to the public project</dd>
        </div>
      </dl>

      <p className={styles.boundaryNote}>
        This is an honest stopping point. It is not a rank, reward, canonical
        unlock, Fourteen Lantern progression, health outcome, or production
        account state.
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
