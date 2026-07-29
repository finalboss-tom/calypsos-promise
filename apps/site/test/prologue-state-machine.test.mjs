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

test("declares an exhaustive scene table with known destinations", () => {
  assert.deepEqual(Object.keys(openingTransitionTable), [...openingScenes]);

  for (const [scene, transitions] of Object.entries(openingTransitionTable)) {
    for (const [transition, destination] of Object.entries(transitions)) {
      assert.ok(openingTransitions.includes(transition), `${transition} is declared`);
      assert.ok(openingScenes.includes(destination), `${scene} reaches ${destination}`);
    }
  }
});

test("invalid or premature actions fail closed without allocating new state", () => {
  for (const transition of [
    "confirm-entry",
    "view-synthetic-chronicle",
    "view-synthetic-receipt",
    "complete-first-lantern",
    "discard-projection",
  ]) {
    assert.strictEqual(transitionOpening(initialOpeningState, transition), initialOpeningState);
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

test("manual text path completes only after explicit review and both inspections", () => {
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

test("confirmed-state discard is functional and clears all temporary capture evidence", () => {
  const confirmed = reachConfirmedEntry({ correction: "prepared" });
  assert.ok(getAllowedOpeningTransitions(confirmed).includes("discard-projection"));

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

test("reversing First Lantern removes completion until the explicit rule is run again", () => {
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

test("every scene exposes at least one currently valid transition", () => {
  const representativeStates = new Map([
    ["arrival", initialOpeningState],
    ["lantern-shore", move(initialOpeningState, "begin-opening")],
  ]);

  let state = representativeStates.get("lantern-shore");
  state = move(state, "continue-to-guide");
  representativeStates.set("guide-choice", state);
  state = move(state, "choose-manual");
  representativeStates.set("manual-introduction", state);
  representativeStates.set(
    "aster-introduction",
    move(representativeStates.get("guide-choice"), "choose-aster"),
  );
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

  for (const scene of openingScenes) {
    const representative = representativeStates.get(scene);
    assert.ok(representative, `representative state exists for ${scene}`);
    assert.ok(
      getAllowedOpeningTransitions(representative).length > 0,
      `${scene} exposes a valid transition`,
    );
  }
});
