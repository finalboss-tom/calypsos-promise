import assert from "node:assert/strict";
import test from "node:test";
import {
  ASTER_INTENTS,
  ASTER_INTENT_NON_AUTHORITY,
  validateAsterIntentDecision,
} from "../dist/index.js";

function confidence(level = "high") {
  return { level, basis: "Synthetic request evidence.", notAuthority: true };
}

function candidate(intent, level = "high") {
  return {
    intent,
    confidence: confidence(level),
    evidenceReferenceIds: ["request-1"],
    rationale: `Synthetic rationale for ${intent}.`,
  };
}

function baseDecision() {
  return {
    schemaId: "aster.intent.decision",
    schemaRevision: 1,
    decisionId: "intent-decision-1",
    decisionRevision: 1,
    request: { requestId: "request-1", requestRevision: 1 },
    subject: { subjectId: "synthetic-person-1", subjectRevision: null },
    candidates: [candidate("capture")],
    selectedIntent: "capture",
    disposition: "bound",
    consequenceClass: "canonical-change-preparation",
    confidence: confidence(),
    ambiguityCodes: [],
    clarifications: [],
    refusal: {
      status: "not-refused",
      code: null,
      explanation: null,
      manualFallback: null,
    },
    requiresExplicitPlayerChoice: true,
    mayPrepareProposal: true,
    ...ASTER_INTENT_NON_AUTHORITY,
  };
}

test("the public intent taxonomy covers action and safe meta outcomes", () => {
  assert.deepEqual(ASTER_INTENTS, [
    "capture",
    "recall",
    "explanation",
    "navigation",
    "permission-review",
    "correction",
    "export",
    "deletion-preparation",
    "support-routing",
    "non-actionable-conversation",
    "unknown",
    "mixed",
    "conflicting",
    "unsupported",
  ]);
});

test("a safely bound capture intent remains non-authoritative", () => {
  assert.deepEqual(validateAsterIntentDecision(baseDecision()), []);
});

test("unknown and mixed intent require clarification", () => {
  const decision = baseDecision();
  decision.candidates = [candidate("capture"), candidate("correction")];

  assert.ok(
    validateAsterIntentDecision(decision).some(
      (issue) => issue.code === "aster.intent.ambiguity-requires-clarification",
    ),
  );

  decision.selectedIntent = null;
  decision.disposition = "clarification-required";
  decision.consequenceClass = "none";
  decision.ambiguityCodes = ["mixed-intent"];
  decision.clarifications = [
    {
      clarificationId: "clarification-1",
      ambiguityCode: "mixed-intent",
      question: "Should Aster prepare a new capture or a correction?",
      status: "open",
    },
  ];
  decision.requiresExplicitPlayerChoice = false;
  decision.mayPrepareProposal = false;

  assert.deepEqual(validateAsterIntentDecision(decision), []);
});

test("unsupported intent requires refusal and safe fallback", () => {
  const decision = baseDecision();
  decision.candidates = [candidate("unsupported")];
  decision.selectedIntent = null;
  decision.disposition = "refused";
  decision.consequenceClass = "none";
  decision.refusal = {
    status: "refused",
    code: "unsupported-intent",
    explanation: "The requested operation is outside the Aster contract.",
    manualFallback: "Use the direct support route.",
  };
  decision.requiresExplicitPlayerChoice = false;
  decision.mayPrepareProposal = false;

  assert.deepEqual(validateAsterIntentDecision(decision), []);
});

test("non-actionable conversation cannot become proposal work", () => {
  const decision = baseDecision();
  decision.candidates = [candidate("non-actionable-conversation")];
  decision.selectedIntent = "non-actionable-conversation";
  decision.disposition = "non-actionable";
  decision.consequenceClass = "none";
  decision.requiresExplicitPlayerChoice = false;
  decision.mayPrepareProposal = false;

  assert.deepEqual(validateAsterIntentDecision(decision), []);
});

test("numeric confidence and authority escalation are rejected", () => {
  const decision = baseDecision();
  decision.confidence.probability = 0.99;
  decision.canInvokeAuthoritativeAction = true;
  decision.canCreateOrExpandPermission = true;
  decision.canConfirmProposal = true;

  const issues = validateAsterIntentDecision(decision);
  assert.ok(
    issues.some((issue) => issue.code === "aster.intent.numeric-confidence"),
  );
  assert.ok(
    issues.some(
      (issue) => issue.code === "aster.intent.authoritative-invocation",
    ),
  );
  assert.ok(
    issues.some((issue) => issue.code === "aster.intent.permission-authority"),
  );
  assert.ok(
    issues.some(
      (issue) => issue.code === "aster.intent.self-confirmation-authority",
    ),
  );
});
