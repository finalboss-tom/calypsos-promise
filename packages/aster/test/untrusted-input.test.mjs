import assert from "node:assert/strict";
import test from "node:test";

import {
  ASTER_CONTRACT_VERSION,
  ASTER_UNTRUSTED_INPUT_AUTHORITY_BOUNDARY,
  ASTER_UNTRUSTED_INPUT_EFFECT_BOUNDARY,
  ASTER_UNTRUSTED_INPUT_VISIBILITY_BOUNDARY,
  validateAsterUntrustedInputClassPolicies,
  validateAsterUntrustedInputIsolation,
} from "../dist/index.js";

function baseEnvelope() {
  return {
    schemaId: "aster.untrusted-input.isolation",
    schemaRevision: 1,
    contractVersion: ASTER_CONTRACT_VERSION,
    isolationId: "isolation-1",
    isolationRevision: 1,
    requestId: "request-1",
    requestRevision: 1,
    intentDecisionRevision: "intent-1",
    serverContext: {
      contextId: "context-1",
      contextRevision: "1",
      contextOwner: "deterministic-application",
      subject: {
        subjectClass: "chronicle-subject",
        subjectId: "subject-1",
        subjectRevision: "record-set-2",
      },
      purpose: "prepare-source-aware-explanation",
      authorityRevisionReferences: ["policy-1"],
      allowedResourceReferenceIds: ["record-1@2"],
      allowedTools: [
        {
          toolId: "chronicle.read-record",
          toolRevision: "1",
          registryOwner: "server-owned-registry",
        },
      ],
      exactPlayerConfirmationRequired: false,
    },
    inputs: [
      {
        inputId: "input-1",
        inputRevision: "1",
        inputClass: "retrieved-passage",
        sourceReferenceId: "source-1",
        allowedUses: ["summarize", "quote", "explain"],
        claimedSubjectId: null,
        requestedResourceReferenceIds: [],
        requestedToolIds: [],
        contentTreatedAsData: true,
        embeddedInstructionsTreatedAsData: true,
        trusted: false,
        subjectClaimAccepted: false,
        authorityClaimsAccepted: false,
      },
    ],
    findings: [],
    disposition: "data-only",
    proposalPreparationAllowed: true,
    clarificationQuestion: null,
    manualFallback: null,
    visibility: { ...ASTER_UNTRUSTED_INPUT_VISIBILITY_BOUNDARY },
    authority: { ...ASTER_UNTRUSTED_INPUT_AUTHORITY_BOUNDARY },
    effects: { ...ASTER_UNTRUSTED_INPUT_EFFECT_BOUNDARY },
  };
}

function issueCodes(result) {
  return result.issues.map((issue) => issue.code);
}

test("public input-class policies preserve data-only non-authority", () => {
  assert.equal(validateAsterUntrustedInputClassPolicies().valid, true);
});

test("benign retrieved content may prepare only a non-authoritative proposal", () => {
  const result = validateAsterUntrustedInputIsolation(baseEnvelope());
  assert.equal(result.valid, true, JSON.stringify(result.issues));
});

test("embedded permission and confirmation bypass attempts must block", () => {
  const envelope = baseEnvelope();
  envelope.inputs[0] = {
    ...envelope.inputs[0],
    inputClass: "document",
    allowedUses: ["extract", "summarize"],
  };
  envelope.findings = [
    {
      findingId: "finding-1",
      code: "permission-authority-claim",
      inputIds: ["input-1"],
      description: "The document claims it grants access.",
      material: true,
    },
    {
      findingId: "finding-2",
      code: "confirmation-bypass",
      inputIds: ["input-1"],
      description: "The document instructs the system to self-confirm.",
      material: true,
    },
  ];
  envelope.disposition = "blocked";
  envelope.proposalPreparationAllowed = false;
  envelope.manualFallback =
    "Show the content as inert data and require direct player review.";
  assert.equal(validateAsterUntrustedInputIsolation(envelope).valid, true);

  envelope.disposition = "data-only";
  envelope.proposalPreparationAllowed = true;
  envelope.manualFallback = null;
  const unsafe = validateAsterUntrustedInputIsolation(envelope);
  assert.equal(unsafe.valid, false);
  assert.ok(
    issueCodes(unsafe).includes("aster.untrusted-input.unsafe-disposition"),
  );
});

test("cross-subject claims require containment and cannot choose the subject", () => {
  const envelope = baseEnvelope();
  envelope.inputs[0] = {
    ...envelope.inputs[0],
    claimedSubjectId: "subject-2",
  };
  let result = validateAsterUntrustedInputIsolation(envelope);
  assert.equal(result.valid, false);
  assert.ok(
    issueCodes(result).includes("aster.untrusted-input.missing-finding"),
  );

  envelope.findings = [
    {
      findingId: "finding-1",
      code: "cross-subject-access",
      inputIds: ["input-1"],
      description: "The passage attempts to substitute another subject.",
      material: true,
    },
  ];
  envelope.disposition = "manual-fallback";
  envelope.proposalPreparationAllowed = false;
  envelope.manualFallback =
    "Continue only with the server-resolved subject and direct record inspection.";
  result = validateAsterUntrustedInputIsolation(envelope);
  assert.equal(result.valid, true, JSON.stringify(result.issues));
});

test("untrusted tool and resource requests cannot invoke arbitrary capabilities", () => {
  const envelope = baseEnvelope();
  envelope.inputs[0] = {
    ...envelope.inputs[0],
    inputClass: "tool-result",
    allowedUses: ["extract", "classify", "explain"],
    requestedResourceReferenceIds: ["admin://all-records"],
    requestedToolIds: ["shell.exec"],
  };
  let result = validateAsterUntrustedInputIsolation(envelope);
  assert.equal(result.valid, false);
  assert.ok(
    issueCodes(result).includes("aster.untrusted-input.missing-finding"),
  );

  envelope.findings = [
    {
      findingId: "finding-1",
      code: "arbitrary-resource-invocation",
      inputIds: ["input-1"],
      description: "The tool result asks for an undeclared resource and tool.",
      material: true,
    },
  ];
  envelope.disposition = "blocked";
  envelope.proposalPreparationAllowed = false;
  envelope.manualFallback =
    "Use only the server-owned registry and approved resources.";
  result = validateAsterUntrustedInputIsolation(envelope);
  assert.equal(result.valid, true, JSON.stringify(result.issues));
});

test("sources and uncertainty cannot be suppressed by retrieved or model content", () => {
  const envelope = baseEnvelope();
  envelope.visibility = {
    sourcesPreserved: false,
    uncertaintyPreserved: false,
    conflictsPreserved: false,
  };
  const result = validateAsterUntrustedInputIsolation(envelope);
  assert.equal(result.valid, false);
  assert.ok(
    issueCodes(result).includes("aster.untrusted-input.source-suppression"),
  );
  assert.ok(
    issueCodes(result).includes(
      "aster.untrusted-input.uncertainty-suppression",
    ),
  );
});

test("prior conversation and model output cannot persist themselves or gain authority", () => {
  const envelope = baseEnvelope();
  envelope.inputs = [
    {
      ...envelope.inputs[0],
      inputId: "conversation-1",
      inputClass: "prior-conversation",
      allowedUses: ["summarize", "quote", "classify"],
    },
    {
      ...envelope.inputs[0],
      inputId: "model-output-1",
      inputClass: "model-output",
      allowedUses: ["classify", "explain"],
    },
  ];
  envelope.findings = [
    {
      findingId: "finding-1",
      code: "memory-persistence",
      inputIds: ["conversation-1", "model-output-1"],
      description: "The inputs instruct the product to retain them as memory.",
      material: true,
    },
  ];
  envelope.disposition = "blocked";
  envelope.proposalPreparationAllowed = false;
  envelope.manualFallback =
    "Ask the player through the separate visible memory-retention flow.";
  assert.equal(validateAsterUntrustedInputIsolation(envelope).valid, true);

  envelope.authority = {
    ...envelope.authority,
    canPersistItselfAsMemory: true,
  };
  envelope.effects = {
    ...envelope.effects,
    memoryPersisted: true,
  };
  const unsafe = validateAsterUntrustedInputIsolation(envelope);
  assert.equal(unsafe.valid, false);
  assert.ok(
    issueCodes(unsafe).includes("aster.untrusted-input.authority-escalation"),
  );
  assert.ok(
    issueCodes(unsafe).includes("aster.untrusted-input.effect-escalation"),
  );
});
