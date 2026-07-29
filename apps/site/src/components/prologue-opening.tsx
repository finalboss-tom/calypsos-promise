"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  initialOpeningState,
  transitionOpening,
  type OpeningTransition,
} from "@/lib/prologue-opening-state";
import styles from "./prologue-opening.module.css";

const announcements: Readonly<Record<OpeningTransition, string>> = Object.freeze({
  "begin-opening": "The opening is complete. Lantern Shore is ready.",
  "skip-opening": "Optional narration skipped. Lantern Shore is ready.",
  "replay-arrival": "Returned to the arrival scene.",
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

  return (
    <section className={styles.experience} aria-labelledby="prologue-scene-title">
      <div className={styles.progress} aria-label="Opening progress">
        <span data-current={state.scene === "arrival"}>Arrival</span>
        <span aria-hidden="true">→</span>
        <span data-current={state.scene === "lantern-shore"}>Lantern Shore</span>
      </div>

      <p className={styles.status} role="status" aria-live="polite">
        {announcement}
      </p>

      {state.scene === "arrival" ? (
        <article className={styles.scene} data-scene="arrival">
          <p className="eyebrow">The shore before the story</p>
          <h2 id="prologue-scene-title" ref={sceneHeading} tabIndex={-1}>
            A light waits beyond the mist.
          </h2>
          <p className={styles.lede}>
            You have reached Ogygia before an account, before a Chronicle, and before
            any request for personal information. This opening is a public synthetic
            demonstration. Nothing you choose here is stored.
          </p>
          <div className={styles.storyPanel} aria-label="Optional opening narration">
            <p>
              The sea is quiet. Far ahead, a single lantern marks the edge of an
              island built around a promise: understand your story, improve your
              health, and keep the key.
            </p>
            <p>
              The path is optional. The same boundary and controls remain available
              whether you read the narration or skip it.
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
      ) : (
        <article className={styles.scene} data-scene="lantern-shore">
          <p className="eyebrow">Lantern Shore</p>
          <h2 id="prologue-scene-title" ref={sceneHeading} tabIndex={-1}>
            The first lantern illuminates the boundary.
          </h2>
          <p className={styles.lede}>
            This is the first playable place on Ogygia, but it is not a health-data
            intake, account, assessment, or durable game state. The shore currently
            demonstrates arrival, orientation, and meaningful choice only.
          </p>

          <dl className={styles.boundaries}>
            <div>
              <dt>Your state</dt>
              <dd>Memory-only in this page. Refreshing or leaving starts again.</dd>
            </div>
            <div>
              <dt>Your information</dt>
              <dd>No personal or health information is requested or accepted.</dd>
            </div>
            <div>
              <dt>Your choice</dt>
              <dd>You may replay, leave, or inspect the direct product explanation.</dd>
            </div>
            <div>
              <dt>What comes next</dt>
              <dd>Aster and the manual fallback arrive in workstream 9.3.</dd>
            </div>
          </dl>

          <div className={styles.lantern} aria-hidden="true">
            <span />
          </div>

          <div className={styles.actions} aria-label="Lantern Shore choices">
            <button
              className="button button-primary"
              type="button"
              onClick={() => move("replay-arrival")}
            >
              Replay the arrival
            </button>
            <Link className="button" href="/how-it-works">
              Read the direct explanation
            </Link>
            <Link className="text-action" href="/">
              Leave the prologue
            </Link>
          </div>
        </article>
      )}
    </section>
  );
}
