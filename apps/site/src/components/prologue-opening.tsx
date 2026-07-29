"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  asterIntroduction,
  manualIntroduction,
  prologueGuideFacts,
} from "@/lib/prologue-guide-content";
import {
  initialOpeningState,
  transitionOpening,
  type OpeningTransition,
  type PresentationPath,
} from "@/lib/prologue-opening-state";
import styles from "./prologue-opening.module.css";

const announcements: Readonly<Record<OpeningTransition, string>> =
  Object.freeze({
    "begin-opening": "The opening is complete. Lantern Shore is ready.",
    "skip-opening": "Optional narration skipped. Lantern Shore is ready.",
    "replay-arrival": "Returned to the arrival scene.",
    "continue-to-guide": "Guide choice is ready.",
    "choose-aster": "Deterministic Aster presentation selected.",
    "choose-manual": "Direct manual presentation selected.",
    "return-to-lantern": "Returned to Lantern Shore.",
    "reconsider-guide": "Returned to the guide choice.",
    "switch-to-aster": "Switched to deterministic Aster presentation.",
    "switch-to-manual": "Switched to the direct manual presentation.",
  });

function GuideFacts() {
  return (
    <dl className={styles.guideFacts} aria-label="Shared prologue rules">
      {prologueGuideFacts.map((fact) => (
        <div key={fact.id}>
          <dt>{fact.title}</dt>
          <dd>{fact.detail}</dd>
        </div>
      ))}
    </dl>
  );
}

function pathLabel(path: PresentationPath) {
  return path === "aster" ? "Deterministic Aster" : "Direct manual guide";
}

export function PrologueOpening() {
  const [state, setState] = useState(initialOpeningState);
  const [announcement, setAnnouncement] = useState(
    "Arrival scene. Choose the narrated opening or skip directly to Lantern Shore.",
  );
  const sceneHeading = useRef<HTMLHeadingElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    sceneHeading.current?.focus();
  }, [state.scene]);

  function move(transition: OpeningTransition) {
    const nextState = transitionOpening(state, transition);
    if (nextState === state) return;
    setState(nextState);
    setAnnouncement(announcements[transition]);
  }

  const guideIsCurrent =
    state.scene === "guide-choice" ||
    state.scene === "aster-introduction" ||
    state.scene === "manual-introduction";

  return (
    <section
      className={styles.experience}
      aria-labelledby="prologue-scene-title"
    >
      <div className={styles.progress} aria-label="Prologue progress">
        <span data-current={state.scene === "arrival"}>Arrival</span>
        <span aria-hidden="true">→</span>
        <span data-current={state.scene === "lantern-shore"}>
          Lantern Shore
        </span>
        <span aria-hidden="true">→</span>
        <span data-current={guideIsCurrent}>Choose a guide</span>
      </div>

      <p className={styles.status} role="status" aria-live="polite">
        {announcement}
      </p>

      {state.scene === "arrival" && (
        <article className={styles.scene} data-scene="arrival">
          <p className="eyebrow">The shore before the story</p>
          <h2 id="prologue-scene-title" ref={sceneHeading} tabIndex={-1}>
            A light waits beyond the mist.
          </h2>
          <p className={styles.lede}>
            You have reached Ogygia before an account, before a Chronicle, and
            before any request for personal information. This opening is a
            public synthetic demonstration. Nothing you choose here is stored.
          </p>
          <div
            className={styles.storyPanel}
            aria-label="Optional opening narration"
          >
            <p>
              The sea is quiet. Far ahead, a single lantern marks the edge of an
              island built around a promise: understand your story, improve your
              health, and keep the key.
            </p>
            <p>
              The path is optional. The same boundary and controls remain
              available whether you read the narration or skip it.
            </p>
          </div>
          <div className={styles.actions} aria-label="Arrival choices">
            <button
              className="button button-primary"
              type="button"
              onClick={() => move("begin-opening")}
            >
              Begin the opening
            </button>
            <button
              className="button"
              type="button"
              onClick={() => move("skip-opening")}
            >
              Skip directly to Lantern Shore
            </button>
            <Link className="text-action" href="/">
              Leave the prologue
            </Link>
          </div>
        </article>
      )}

      {state.scene === "lantern-shore" && (
        <article className={styles.scene} data-scene="lantern-shore">
          <p className="eyebrow">Lantern Shore</p>
          <h2 id="prologue-scene-title" ref={sceneHeading} tabIndex={-1}>
            The first lantern illuminates the boundary.
          </h2>
          <p className={styles.lede}>
            This is the first playable place on Ogygia, but it is not a
            health-data intake, account, assessment, or durable game state. The
            shore currently demonstrates arrival, orientation, and meaningful
            choice only.
          </p>

          <dl className={styles.boundaries}>
            <div>
              <dt>Your state</dt>
              <dd>
                Memory-only in this page. Refreshing or leaving starts again.
              </dd>
            </div>
            <div>
              <dt>Your information</dt>
              <dd>
                No personal or health information is requested or accepted.
              </dd>
            </div>
            <div>
              <dt>Your choice</dt>
              <dd>
                You may use Aster framing, use the complete direct guide,
                replay, or leave.
              </dd>
            </div>
            <div>
              <dt>Equal paths</dt>
              <dd>
                Aster and the manual guide expose the same sources, rules, and
                later controls.
              </dd>
            </div>
          </dl>

          <div className={styles.lantern} aria-hidden="true">
            <span />
          </div>

          <div className={styles.actions} aria-label="Lantern Shore choices">
            <button
              className="button button-primary"
              type="button"
              onClick={() => move("continue-to-guide")}
            >
              Choose how to continue
            </button>
            <button
              className="button"
              type="button"
              onClick={() => move("replay-arrival")}
            >
              Replay the arrival
            </button>
            <Link className="text-action" href="/">
              Leave the prologue
            </Link>
          </div>
        </article>
      )}

      {state.scene === "guide-choice" && (
        <article className={styles.scene} data-scene="guide-choice">
          <p className="eyebrow">Choose a guide</p>
          <h2 id="prologue-scene-title" ref={sceneHeading} tabIndex={-1}>
            Two presentations. One set of rules.
          </h2>
          <p className={styles.lede}>
            Both routes use the same repository-authored facts and deterministic
            controls. Choosing Aster changes the voice of the explanation, not
            the source, authority, available choices, or later completion path.
          </p>

          <div className={styles.pathGrid}>
            <article>
              <p className="eyebrow">Optional character framing</p>
              <h3>Meet deterministic Aster</h3>
              <p>
                Aster presents a scripted, source-aware introduction. No model,
                provider, hidden prompt, retrieval service, or remote call is
                involved.
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
                The direct guide presents the same sources, facts, synthetic
                choices, correction controls, and deterministic evidence without
                Aster framing.
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
      )}

      {(state.scene === "aster-introduction" ||
        state.scene === "manual-introduction") &&
        state.presentationPath && (
          <article
            className={styles.scene}
            data-scene={state.scene}
            data-presentation={state.presentationPath}
          >
            <p className="eyebrow">{pathLabel(state.presentationPath)}</p>
            <h2 id="prologue-scene-title" ref={sceneHeading} tabIndex={-1}>
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
              Synthetic text and voice fixture choices are not active yet. They
              arrive in workstream 9.4 and must remain identical across both
              presentation paths.
            </p>

            <div
              className={styles.actions}
              aria-label="Guide presentation choices"
            >
              <button
                className="button button-primary"
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
        )}
    </section>
  );
}
