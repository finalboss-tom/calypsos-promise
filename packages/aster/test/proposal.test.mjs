import assert from "node:assert/strict";
import test from "node:test";

import {
  ASTER_CONTRACT_VERSION,
  ASTER_PROPOSAL_AUTHORITY_BOUNDARY,
  ASTER_PROPOSAL_DOMAIN_OUTCOME,
  validateAsterProposalEnvelope,
  validateAsterStructuredExtraction,
} from "../dist/index.js";

function makeExtraction() {
  return {
    schemaId: "aster.extraction.structured",
    schemaRevision: 1,
    state: "draft",
    candidates: [
      {
        candidateId: "candidate-1",
        fieldPath: "observation.value",
        valueClass: "quantity",
        value: { value: 72, unit: "beats/minute" },
        sourceReferenceIds: ["source-1"],
        transformationStepIds: ["step-1"],
        confidence: {
          level: "medium",
          basis: "A synthetic parser matched a quantity and unit.",
          notAuthority: true,
        },
        uncertaintyCodes: ["synthetic-context"],
        requiresClarification: false,
        state: "candidate",
        canonical: false,
        playerConfirmed: false,
        domainAccepted: false,
      },
    ],
    unparsedSegments: [],
    canonicalRecord: false,
  };
}

function makeProposal() {
  const extraction = makeExtraction();

  return {
    schemaId: "aster.proposal.envelope",
    schemaRevision: 1,
    contractVersion: ASTER_CONTRACT_VERSION,
    proposalId: "proposal-synthetic-1",
    proposalRevision: 1,
    role: "scribe",
    operationId: "scribe.prepare-structured-capture",
    proposalKind: "structured-capture",
    subject: {
      subjectClass: "chronicle-subject",
      subjectId: "synthetic-person-1",
      subjectRevision: null,
    },
    request: {
      requestId: "request-1",
      requestRevision: 1,
      intentRevision: null,
      authorityRevisionReferences: [],
    },
    producer: {
      producerClass: "local-synthetic-adapter",
      producerId: "synthetic.aster",
      producerRevision: "1",
      providerReference: null,
      modelReference: null,
    },
    sourceReferences: [
      {
        sourceReferenceId: "source-1",
        sourceClass: "player-expression",
        sourceId: "expression-1",
        sourceRevision: "1",
        purpose: "Prepare a reviewable structured draft.",
        sourceMaterialCopied: false,
      },
    ],
    transformationProvenance: [
      {
        transformationStepId: "step-1",
        transformationClass: "parsed",
        transformerId: "synthetic.aster",
        transformerRevision: "1",
        inputSourceReferenceIds: ["source-1"],
        notes: null,
      },
    ],
    intendedAction: {
      actionId: "chronicle.propose-observation",
      actionOwner: "living-chronicle",
      requiresExactPlayerConfirmation: true,
      description:
        "Prepare a candidate observation for later confirmation and Chronicle validation.",
    },
    confidence: {
      level: "medium",
      basis: "A synthetic parser found a bounded quantity candidate.",
      notAuthority: true,
    },
    uncertainties: [],
    clarifications: [],
    payload: {
      schemaId: "aster.extraction.structured",
      schemaRevision: 1,
      data: extraction,
      canonical: false,
    },
    review: {
      state: "not-reviewed",
      actor: null,
      boundProposalRevision: null,
      decisionReferenceId: null,
    },
    authority: ASTER_PROPOSAL_AUTHORITY_BOUNDARY,
    domainOutcome: ASTER_PROPOSAL_DOMAIN_OUTCOME,
  };
}

test("a structured Scribe proposal validates without domain authority", () => {
  assert.deepEqual(validateAsterProposalEnvelope(makeProposal()), []);
  assert.deepEqual(validateAsterStructuredExtraction(makeExtraction()), []);
});

test("exact player confirmation binds the exact proposal revision", () => {
  const proposal = makeProposal();
  proposal.review = {
    state: "confirmed",
    actor: "player",
    boundProposalRevision: 1,
    decisionReferenceId: "decision-1",
  };

  assert.deepEqual(validateAsterProposalEnvelope(proposal), []);
});

test("confirmation cannot bind a different proposal revision", () => {
  const proposal = makeProposal();
  proposal.review = {
    state: "confirmed",
    actor: "player",
    boundProposalRevision: 2,
    decisionReferenceId: "decision-1",
  };

  assert.ok(
    validateAsterProposalEnvelope(proposal).some(
      (issue) => issue.code === "aster.proposal.review-not-bound-to-revision",
    ),
  );
});

test("proposal validation rejects domain and permission escalation", () => {
  const proposal = makeProposal();
  proposal.authority = {
    ...proposal.authority,
    canWriteCanonicalRecords: true,
    canCreateOrExpandPermission: true,
    canInvokeAuthoritativeAction: true,
  };
  proposal.domainOutcome = {
    invoked: true,
    accepted: true,
    storedOrExecuted: true,
  };

  const issues = validateAsterProposalEnvelope(proposal);

  assert.ok(
    issues.some(
      (issue) => issue.code === "aster.proposal.canonical-write-authority",
    ),
  );
  assert.ok(
    issues.some(
      (issue) => issue.code === "aster.proposal.permission-authority",
    ),
  );
  assert.ok(
    issues.some(
      (issue) => issue.code === "aster.proposal.authoritative-invocation",
    ),
  );
  assert.ok(
    issues.some(
      (issue) => issue.code === "aster.proposal.domain-outcome-authority",
    ),
  );
});

test("extraction candidates remain unconfirmed and non-canonical", () => {
  const extraction = makeExtraction();
  extraction.candidates[0].canonical = true;
  extraction.candidates[0].playerConfirmed = true;
  extraction.candidates[0].domainAccepted = true;

  const issues = validateAsterStructuredExtraction(extraction);

  assert.ok(
    issues.some(
      (issue) => issue.code === "aster.extraction.canonical-candidate",
    ),
  );
  assert.ok(
    issues.some(
      (issue) => issue.code === "aster.extraction.confirmed-candidate",
    ),
  );
  assert.ok(
    issues.some(
      (issue) => issue.code === "aster.extraction.domain-accepted-candidate",
    ),
  );
});

test("proposal role, operation, and kind cannot drift", () => {
  const proposal = makeProposal();
  proposal.proposalKind = "source-linked-recall";
  proposal.operationId = "librarian.prepare-source-linked-recall";

  const issues = validateAsterProposalEnvelope(proposal);

  assert.ok(
    issues.some((issue) => issue.code === "aster.proposal.invalid-operation"),
  );
  assert.ok(
    issues.some(
      (issue) => issue.code === "aster.proposal.role-kind-mismatch",
    ),
  );
});
