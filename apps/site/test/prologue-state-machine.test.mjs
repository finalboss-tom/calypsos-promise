import assert from "node:assert/strict";
import test from "node:test";
import {
  getAllowedOpeningTransitions,
  initialOpeningState,
  openingScenes,
  openingTransitions,
  openingTransitionTable,
  transitionOpening,
} from "../src/lib/prologue-opening-state.ts";

function move(state, transition) {
  const next = transitionOpening(state, transition);
  assert.notStrictEqual(
    next,
    state,
    `${transition} should be valid from ${state.scene}`,
  );
  return next;
}

function reachConfirmedEntry({
  presentation = "manual",
  fixture = "text",
  correction = "accept",
} = {}) {
  let state = initialOpeningState;
  state = move(state, "begin-opening");
  state = move(state, "continue-to-guide");
  state = move(
    state,
    presentation === "aster" ? "choose-aster" : "choose-manual",
  );
  state = move(state, "continue-to-capture");
  state = move(
    state,
    fixture === "voice" ? "choose-synthetic-voice" : "choose-synthetic-text",
  );
  state = move(state, "review-draft");
  state = move(
    state,
    correction === "prepared"
      ? "apply-synthetic-correction"
      : "accept-as-written",
  );
  state = move(state, "confirm-entry");
  return state;
}

function reachFirstLantern(options) {
  let state = reachConfirmedEntry(options);
  state = move(state, "view-synthetic-chronicle");
  state = move(state, "view-synthetic-receipt");
  state = move(state, "complete-first-lantern");
  return state;
}

function reachDeparture(options) {
  return move(reachFirstLantern(options), "continue-to-departure");
}

test("declares an exhaustive scene table with known destinations", () => {
  assert.deepEqual(Object.keys(openingTransitionTable), [...openingScenes]);

  for (const [scene, transitions] of Object.entries(openingTransitionTable)) {
    for (const [transition, destination] of Object.entries(transitions)) {
      assert.ok(
        openingTransitions.includes(transition),
        `${transition} is declared`,
      );
      assert.ok(
        openingScenes.includes(destination),
        `${scene} reaches ${destination}`,
      );
    }
  }
});

test("invalid or premature actions fail closed without allocating new state", () => {
  for (const transition of [
    "confirm-entry",
    "view-synthetic-chronicle",
    "view-synthetic-receipt",
    "complete-first-lantern",
    "continue-to-departure",
    "complete-without-account",
    "discard-projection",
  ]) {
    assert.strictEqual(
      transitionOpening(initialOpeningState, transition),
      initialOpeningState,
    );
  }

  let review = reachConfirmedEntry();
  review = move(review, "review-confirmed-entry");
  assert.equal(review.scene, "review-and-correction");
  assert.equal(review.confirmed, false);
  assert.equal(review.chronicleInspected, false);
  assert.equal(review.receiptInspected, false);
  assert.equal(review.firstLanternCompleted, false);

  const withoutReviewChoice = Object.freeze({ ...review, correctionId: null });
  assert.strictEqual(
    transitionOpening(withoutReviewChoice, "confirm-entry"),
    withoutReviewChoice,
  );
});

test("manual text path completes First Lantern only after explicit review and inspection", () => {
  const state = reachFirstLantern({
    presentation: "manual",
    fixture: "text",
    correction: "prepared",
  });

  assert.equal(state.scene, "first-lantern");
  assert.equal(state.presentationPath, "manual");
  assert.equal(state.captureMode, "synthetic-text");
  assert.equal(state.fixtureId, "synthetic-sleep-text-v1");
  assert.equal(state.correctionId, "sleep-duration-six-hours");
  assert.equal(state.confirmed, true);
  assert.equal(state.chronicleInspected, true);
  assert.equal(state.receiptInspected, true);
  assert.equal(state.firstLanternCompleted, true);
});

test("Aster voice path uses the same state and completion authority", () => {
  const state = reachFirstLantern({
    presentation: "aster",
    fixture: "voice",
    correction: "accept",
  });

  assert.equal(state.scene, "first-lantern");
  assert.equal(state.presentationPath, "aster");
  assert.equal(state.captureMode, "synthetic-voice");
  assert.equal(state.fixtureId, "synthetic-walk-voice-v1");
  assert.equal(state.correctionId, "accept-as-written");
  assert.equal(state.firstLanternCompleted, true);
});

test("confirmed-state discard is functional and clears temporary capture evidence", () => {
  const confirmed = reachConfirmedEntry({ correction: "prepared" });
  assert.ok(
    getAllowedOpeningTransitions(confirmed).includes("discard-projection"),
  );

  const discarded = move(confirmed, "discard-projection");
  assert.equal(discarded.scene, "capture-choice");
  assert.equal(discarded.presentationPath, "manual");
  assert.equal(discarded.captureMode, null);
  assert.equal(discarded.fixtureId, null);
  assert.equal(discarded.correctionId, null);
  assert.equal(discarded.confirmed, false);
  assert.equal(discarded.chronicleInspected, false);
  assert.equal(discarded.receiptInspected, false);
  assert.equal(discarded.firstLanternCompleted, false);
});

test("refusal and reconsideration are non-punitive and remove hidden state", () => {
  let state = reachConfirmedEntry();
  state = move(state, "review-confirmed-entry");
  state = move(state, "refuse-draft");
  assert.equal(state.scene, "capture-choice");
  assert.equal(state.presentationPath, "manual");
  assert.equal(state.fixtureId, null);
  assert.equal(state.confirmed, false);

  state = move(state, "reconsider-guide");
  assert.equal(state.scene, "guide-choice");
  assert.equal(state.presentationPath, null);
  assert.equal(state.captureMode, null);
  assert.equal(state.fixtureId, null);
});

test("reversing First Lantern removes completion until the rule is run again", () => {
  let state = reachFirstLantern();
  state = move(state, "return-to-receipt");
  assert.equal(state.scene, "synthetic-receipt");
  assert.equal(state.confirmed, true);
  assert.equal(state.chronicleInspected, true);
  assert.equal(state.receiptInspected, true);
  assert.equal(state.firstLanternCompleted, false);

  state = move(state, "complete-first-lantern");
  assert.equal(state.scene, "first-lantern");
  assert.equal(state.firstLanternCompleted, true);
});

test("departure completes without an account and future-account inspection changes no evidence", () => {
  let state = reachDeparture({ presentation: "aster", fixture: "voice" });
  const evidence = {
    presentationPath: state.presentationPath,
    fixtureId: state.fixtureId,
    correctionId: state.correctionId,
    confirmed: state.confirmed,
    chronicleInspected: state.chronicleInspected,
    receiptInspected: state.receiptInspected,
    firstLanternCompleted: state.firstLanternCompleted,
  };

  state = move(state, "view-future-account-boundary");
  assert.equal(state.scene, "future-account");
  assert.deepEqual(
    {
      presentationPath: state.presentationPath,
      fixtureId: state.fixtureId,
      correctionId: state.correctionId,
      confirmed: state.confirmed,
      chronicleInspected: state.chronicleInspected,
      receiptInspected: state.receiptInspected,
      firstLanternCompleted: state.firstLanternCompleted,
    },
    evidence,
  );

  state = move(state, "return-to-departure");
  state = move(state, "complete-without-account");
  assert.equal(state.scene, "complete");
  assert.equal(state.firstLanternCompleted, true);
  assert.equal(state.presentationPath, "aster");
});

test("restart from every non-arrival scene returns the exact frozen initial state", () => {
  const states = [];
  let state = move(initialOpeningState, "begin-opening");
  states.push(state);
  state = move(state, "continue-to-guide");
  states.push(state);
  const aster = move(state, "choose-aster");
  states.push(aster);
  state = move(state, "choose-manual");
  states.push(state);
  state = move(state, "continue-to-capture");
  states.push(state);
  state = move(state, "choose-synthetic-text");
  states.push(state);
  state = move(state, "review-draft");
  states.push(state);
  state = move(state, "accept-as-written");
  state = move(state, "confirm-entry");
  states.push(state);
  state = move(state, "view-synthetic-chronicle");
  states.push(state);
  state = move(state, "view-synthetic-receipt");
  states.push(state);
  state = move(state, "complete-first-lantern");
  states.push(state);
  state = move(state, "continue-to-departure");
  states.push(state);
  state = move(state, "view-future-account-boundary");
  states.push(state);
  state = move(state, "complete-without-account");
  states.push(state);

  for (const restartable of states) {
    assert.strictEqual(
      transitionOpening(restartable, "restart-prologue"),
      initialOpeningState,
      `restart clears ${restartable.scene}`,
    );
  }
});

test("every scene exposes at least one currently valid transition", () => {
  const representativeStates = new Map([["arrival", initialOpeningState]]);

  let state = move(initialOpeningState, "begin-opening");
  representativeStates.set("lantern-shore", state);
  state = move(state, "continue-to-guide");
  representativeStates.set("guide-choice", state);
  representativeStates.set("aster-introduction", move(state, "choose-aster"));
  state = move(state, "choose-manual");
  representativeStates.set("manual-introduction", state);
  state = move(state, "continue-to-capture");
  representativeStates.set("capture-choice", state);
  state = move(state, "choose-synthetic-text");
  representativeStates.set("synthetic-draft", state);
  state = move(state, "review-draft");
  representativeStates.set("review-and-correction", state);
  state = move(state, "accept-as-written");
  state = move(state, "confirm-entry");
  representativeStates.set("confirmed-entry", state);
  state = move(state, "view-synthetic-chronicle");
  representativeStates.set("synthetic-chronicle", state);
  state = move(state, "view-synthetic-receipt");
  representativeStates.set("synthetic-receipt", state);
  state = move(state, "complete-first-lantern");
  representativeStates.set("first-lantern", state);
  state = move(state, "continue-to-departure");
  representativeStates.set("exit-choice", state);
  representativeStates.set(
    "future-account",
    move(state, "view-future-account-boundary"),
  );
  representativeStates.set("complete", move(state, "complete-without-account"));

  for (const scene of openingScenes) {
    const representative = representativeStates.get(scene);
    assert.ok(representative, `representative state exists for ${scene}`);
    assert.ok(
      getAllowedOpeningTransitions(representative).length > 0,
      `${scene} exposes a valid transition`,
    );
  }
});
