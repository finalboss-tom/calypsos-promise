"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PrologueCapturePanel } from "@/components/prologue-capture-panel";
import { PrologueChronicleReceiptPanel } from "@/components/prologue-chronicle-receipt-panel";
import { PrologueConfirmedProjectionEntry } from "@/components/prologue-confirmed-projection-entry";
import { PrologueFirstLanternPanel } from "@/components/prologue-first-lantern-panel";
import { PrologueGuidePanel } from "@/components/prologue-guide-panel";
import {
  initialOpeningState,
  transitionOpening,
  type OpeningTransition,
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
    "continue-to-capture": "Synthetic fixture choices are ready.",
    "choose-synthetic-text": "Prepared synthetic text fixture selected.",
    "choose-synthetic-voice": "Prepared synthetic voice transcript selected.",
    "review-draft": "Synthetic draft review is ready.",
    "accept-as-written": "The synthetic value will remain as written.",
    "apply-synthetic-correction":
      "The prepared synthetic correction is selected.",
    "confirm-entry":
      "The synthetic demonstration state is confirmed in page memory only.",
    "refuse-draft":
      "The synthetic draft was refused. No information was retained.",
    "change-synthetic-example": "Returned to the prepared synthetic examples.",
    "review-confirmed-entry": "Returned to synthetic review and correction.",
    "view-synthetic-chronicle":
      "Temporary synthetic Chronicle projection is ready.",
    "view-synthetic-receipt":
      "Non-authoritative House of Keys receipt explanation is ready.",
    "return-to-chronicle": "Returned to the temporary synthetic Chronicle.",
    "discard-projection":
      "The temporary synthetic state was discarded from page memory.",
    "complete-first-lantern":
      "First Lantern completion evidence is satisfied in page memory only.",
    "return-to-receipt": "Returned to the receipt evidence explanation.",
  });

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
  const captureIsCurrent =
    state.scene === "capture-choice" ||
    state.scene === "synthetic-draft" ||
    state.scene === "review-and-correction" ||
    state.scene === "confirmed-entry";
  const projectionIsCurrent =
    state.scene === "synthetic-chronicle" ||
    state.scene === "synthetic-receipt";
  const completionIsCurrent = state.scene === "first-lantern";
  const progressSteps = [
    { id: "arrival", label: "Arrival", current: state.scene === "arrival" },
    {
      id: "lantern-shore",
      label: "Lantern Shore",
      current: state.scene === "lantern-shore",
    },
    { id: "guide", label: "Choose a guide", current: guideIsCurrent },
    {
      id: "review",
      label: "Synthetic review",
      current: captureIsCurrent,
    },
    {
      id: "projections",
      label: "Chronicle and receipt",
      current: projectionIsCurrent,
    },
    {
      id: "first-lantern",
      label: "First Lantern",
      current: completionIsCurrent,
    },
  ] as const;

  return (
    <section
      className={styles.experience}
      aria-labelledby="prologue-scene-title"
    >
      <ol className={styles.progress} aria-label="Prologue progress">
        {progressSteps.map((step, index) => (
          <li key={step.id} aria-current={step.current ? "step" : undefined}>
            <span>{step.label}</span>
            {index < progressSteps.length - 1 && (
              <span aria-hidden="true">→</span>
            )}
          </li>
        ))}
      </ol>

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
                Aster and the manual guide expose the same sources, rules,
                synthetic fixtures, confirmation controls, temporary
                projections, and completion evidence.
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

      <PrologueGuidePanel state={state} move={move} headingRef={sceneHeading} />
      {state.scene !== "confirmed-entry" && (
        <PrologueCapturePanel
          state={state}
          move={move}
          headingRef={sceneHeading}
        />
      )}
      <PrologueConfirmedProjectionEntry
        state={state}
        move={move}
        headingRef={sceneHeading}
      />
      <PrologueChronicleReceiptPanel
        state={state}
        move={move}
        headingRef={sceneHeading}
      />
      <PrologueFirstLanternPanel
        state={state}
        move={move}
        headingRef={sceneHeading}
      />
    </section>
  );
}
