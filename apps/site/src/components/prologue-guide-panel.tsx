import Link from "next/link";
import type { RefObject } from "react";
import {
  asterIntroduction,
  manualIntroduction,
  prologueGuideFacts,
} from "@/lib/prologue-guide-content";
import type {
  OpeningState,
  OpeningTransition,
  PresentationPath,
} from "@/lib/prologue-opening-state";
import styles from "./prologue-opening.module.css";

export type PrologueGuidePanelProps = {
  readonly state: OpeningState;
  readonly move: (transition: OpeningTransition) => void;
  readonly headingRef: RefObject<HTMLHeadingElement | null>;
};

function GuideFacts() {
  return (
    <details>
      <summary>Review the shared prologue rules</summary>
      <dl className={styles.guideFacts} aria-label="Shared prologue rules">
        {prologueGuideFacts.map((fact) => (
          <div key={fact.id}>
            <dt>{fact.title}</dt>
            <dd>{fact.detail}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}

function pathLabel(path: PresentationPath) {
  return path === "aster" ? "Deterministic Aster" : "Direct manual guide";
}

export function PrologueGuidePanel({
  state,
  move,
  headingRef,
}: PrologueGuidePanelProps) {
  if (state.scene === "guide-choice") {
    return (
      <article className={styles.scene} data-scene="guide-choice">
        <p className="eyebrow">Choose a guide</p>
        <h2 id="prologue-scene-title" ref={headingRef} tabIndex={-1}>
          Two presentations. One set of rules.
        </h2>
        <p className={styles.lede}>
          Aster and the direct guide use the same sources, choices, and
          completion rule. Only the presentation changes.
        </p>

        <div className={styles.pathGrid}>
          <article>
            <p className="eyebrow">Optional character framing</p>
            <h3>Meet deterministic Aster</h3>
            <p>
              A scripted local guide. No model, provider, hidden prompt, or
              remote call is involved.
            </p>
            <button
              className="button button-primary"
              type="button"
              onClick={() => move("choose-aster")}
            >
              Continue with Aster
            </button>
          </article>
          <article>
            <p className="eyebrow">Complete non-AI route</p>
            <h3>Use the direct manual guide</h3>
            <p>
              The same sources, synthetic choices, corrections, and evidence
              without character framing.
            </p>
            <button
              className="button button-primary"
              type="button"
              onClick={() => move("choose-manual")}
            >
              Continue without Aster
            </button>
          </article>
        </div>

        <div className={styles.actions} aria-label="Guide choice exits">
          <button
            className="button"
            type="button"
            onClick={() => move("return-to-lantern")}
          >
            Return to Lantern Shore
          </button>
          <Link className="text-action" href="/">
            Leave the prologue
          </Link>
        </div>
      </article>
    );
  }

  if (
    (state.scene !== "aster-introduction" &&
      state.scene !== "manual-introduction") ||
    !state.presentationPath
  ) {
    return null;
  }

  return (
    <article
      className={styles.scene}
      data-scene={state.scene}
      data-presentation={state.presentationPath}
    >
      <p className="eyebrow">{pathLabel(state.presentationPath)}</p>
      <h2 id="prologue-scene-title" ref={headingRef} tabIndex={-1}>
        {state.presentationPath === "aster"
          ? "Aster can guide the presentation, not the truth."
          : "The direct guide keeps every control in view."}
      </h2>

      <section
        className={styles.guideIntroduction}
        aria-labelledby="guide-introduction-title"
      >
        <h3 id="guide-introduction-title">
          {state.presentationPath === "aster"
            ? asterIntroduction.label
            : manualIntroduction.label}
        </h3>
        {state.presentationPath === "aster" && (
          <p className={styles.speaker}>{asterIntroduction.speaker}</p>
        )}
        <p>
          {state.presentationPath === "aster"
            ? asterIntroduction.opening
            : manualIntroduction.opening}
        </p>
      </section>

      <GuideFacts />

      <p className={styles.pathClosing}>
        {state.presentationPath === "aster"
          ? asterIntroduction.closing
          : manualIntroduction.closing}
      </p>
      <p className={styles.nextBoundary}>
        Both paths continue to the same prepared synthetic examples. No text
        entry or microphone is available.
      </p>

      <div className={styles.actions} aria-label="Guide presentation choices">
        <button
          className="button button-primary"
          type="button"
          onClick={() => move("continue-to-capture")}
        >
          Continue to the synthetic demonstration
        </button>
        <button
          className="button"
          type="button"
          onClick={() =>
            move(
              state.presentationPath === "aster"
                ? "switch-to-manual"
                : "switch-to-aster",
            )
          }
        >
          {state.presentationPath === "aster"
            ? "Switch to the direct guide"
            : "Switch to Aster framing"}
        </button>
        <button
          className="button"
          type="button"
          onClick={() => move("reconsider-guide")}
        >
          Reconsider the guide choice
        </button>
        <button
          className="button"
          type="button"
          onClick={() => move("return-to-lantern")}
        >
          Return to Lantern Shore
        </button>
        <Link className="text-action" href="/">
          Leave the prologue
        </Link>
      </div>
    </article>
  );
}
