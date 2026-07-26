import {
  HOUSE_OF_KEYS_CONTRACT_VERSION,
  HOUSE_OF_KEYS_EVALUATOR_ID,
  HOUSE_OF_KEYS_EVALUATOR_REVISION,
  HOUSE_OF_KEYS_POLICY_ID,
  HOUSE_OF_KEYS_POLICY_REVISION,
} from "./version.js";
import type {
  AccessReceipt,
  HouseOfKeysSchemaBundle,
  PermissionGrant,
  PolicyEvaluationInput,
  SyntheticPolicyScenario,
} from "./types.js";

const NOW = "2026-07-26T12:00:00Z";
const START = "2026-07-26T00:00:00Z";
const END = "2026-07-27T00:00:00Z";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

const baseGrant: PermissionGrant = {
  id: "grant.personal-export.synthetic",
  contractVersion: HOUSE_OF_KEYS_CONTRACT_VERSION,
  revision: 1,
  lifecycleState: "active",
  grantingAuthorityId: "actor.person.synthetic",
  controlledResourceId: "chronicle.person.synthetic",
  subjectIds: ["subject.person.synthetic"],
  purposeId: "purpose.personal.chronicle-portability",
  purposeRevision: 1,
  primaryRecipientId: "recipient.person.self",
  primaryRecipientRevision: 1,
  permittedPerformingActorIds: ["actor.service.exporter"],
  dataCategoryIds: ["data.chronicle.symptom", "data.chronicle.laboratory-test"],
  dataCategoryRevisions: {
    "data.chronicle.symptom": 1,
    "data.chronicle.laboratory-test": 1,
  },
  selector: {
    exactRecordIds: ["record.synthetic.symptom", "record.synthetic.lab"],
  },
  actionIds: ["action.export.prepare", "action.export.deliver"],
  actionRevisions: {
    "action.export.prepare": 1,
    "action.export.deliver": 1,
  },
  conditions: [
    {
      id: "condition.receipt.required",
      kind: "player-visible-receipt-required",
      expectedValue: true,
    },
  ],
  duration: {
    kind: "single-use",
    startsAt: START,
    endsAt: END,
  },
  explanationSnapshotId: "explanation.personal-export.synthetic",
  comprehensionEvidenceId: "comprehension.personal-export.synthetic",
  confirmationEvidenceId: "confirmation.personal-export.synthetic",
  requiresComprehension: true,
  optionality: "essential-personal",
  dataClassification: "synthetic",
};

export const syntheticAccessReceipt: AccessReceipt = {
  id: "receipt.personal-export.synthetic",
  contractVersion: HOUSE_OF_KEYS_CONTRACT_VERSION,
  revision: 1,
  eventKind: "receipt.access-completed",
  lifecycleState: "active",
  correlationId: "correlation.personal-export.synthetic",
  controlledResourceId: baseGrant.controlledResourceId,
  subjectIds: baseGrant.subjectIds,
  requesterId: "actor.person.synthetic",
  requesterKind: "controlling-person",
  primaryRecipientId: baseGrant.primaryRecipientId,
  primaryRecipientRevision: baseGrant.primaryRecipientRevision,
  performingActorId: "actor.service.exporter",
  receiptIssuerId: "actor.receipt-issuer.synthetic",
  purposeId: baseGrant.purposeId,
  purposeRevision: baseGrant.purposeRevision,
  dataCategoryIds: baseGrant.dataCategoryIds,
  dataCategoryRevisions: baseGrant.dataCategoryRevisions,
  selector: baseGrant.selector,
  actionIds: baseGrant.actionIds,
  actionRevisions: baseGrant.actionRevisions,
  grantReferences: [{ grantId: baseGrant.id, grantRevision: baseGrant.revision }],
  policyRequestId: "policy-request.personal-export.synthetic",
  policyRequestRevision: 1,
  policyDecisionId: "policy-decision.personal-export.synthetic",
  decisionOutcome: "allow",
  executionState: "complete",
  dataReleaseBoundaryCrossed: true,
  reasonCodes: ["allow.grant.exact-match"],
  requestedAt: "2026-07-26T11:57:00Z",
  decidedAt: "2026-07-26T12:00:00Z",
  attemptedAt: "2026-07-26T12:00:05Z",
  releasedAt: "2026-07-26T12:00:10Z",
  completedAt: "2026-07-26T12:00:12Z",
  recordedAt: "2026-07-26T12:00:13Z",
  unresolvedState: [
    "The receipt does not authorize secondary use of the exported information.",
  ],
  personVisibleSummary:
    "The selected synthetic Chronicle records were delivered to the controlling person under the named single-use export grant.",
  dataClassification: "synthetic",
};

export const syntheticHouseOfKeysBundle: HouseOfKeysSchemaBundle = {
  contractVersion: HOUSE_OF_KEYS_CONTRACT_VERSION,
  actors: [
    {
      id: "actor.person.synthetic",
      kind: "controlling-person",
      displayLabel: "Synthetic person",
    },
    {
      id: "actor.service.exporter",
      kind: "performing-actor",
      displayLabel: "Synthetic export capability",
    },
    {
      id: "actor.service.transmitter",
      kind: "performing-actor",
      displayLabel: "Synthetic transmission capability",
    },
    {
      id: "actor.study.requester",
      kind: "requester",
      displayLabel: "Synthetic study requester",
    },
    {
      id: "actor.receipt-issuer.synthetic",
      kind: "receipt-issuer",
      displayLabel: "Synthetic receipt issuer",
    },
  ],
  policyBundle: {
    contractVersion: HOUSE_OF_KEYS_CONTRACT_VERSION,
    evaluatorId: HOUSE_OF_KEYS_EVALUATOR_ID,
    evaluatorRevision: HOUSE_OF_KEYS_EVALUATOR_REVISION,
    policyId: HOUSE_OF_KEYS_POLICY_ID,
    policyRevision: HOUSE_OF_KEYS_POLICY_REVISION,
    normalizationRevision: 1,
    purposes: [
      {
        id: "purpose.personal.chronicle-portability",
        revision: 1,
        status: "active",
        publicName: "Export selected Chronicle information",
        directExplanation:
          "Prepare and deliver selected Chronicle records to the person.",
        grantable: true,
        familyId: "purpose.personal",
        purposeClass: "personal-core",
        excludedUses: ["research", "commercial use", "model training"],
      },
      {
        id: "purpose.research.study-synthetic",
        revision: 1,
        status: "active",
        publicName: "Synthetic public-good study",
        directExplanation:
          "Transmit selected information to one synthetic public-good study.",
        grantable: true,
        familyId: "purpose.research",
        purposeClass: "secondary-public-good",
        excludedUses: ["advertising", "unrelated studies"],
      },
    ],
    dataCategories: [
      {
        id: "data.chronicle.symptom",
        revision: 1,
        status: "active",
        publicName: "Symptom records",
        directExplanation: "Selected structured symptom records.",
        grantable: true,
        familyId: "data.chronicle",
        truthClass: "chronicle",
        includedContent: ["structured symptom records"],
        excludedContent: ["raw documents", "inferences"],
      },
      {
        id: "data.chronicle.laboratory-test",
        revision: 1,
        status: "active",
        publicName: "Laboratory records",
        directExplanation: "Selected structured laboratory records.",
        grantable: true,
        familyId: "data.chronicle",
        truthClass: "chronicle",
        includedContent: ["structured laboratory records"],
        excludedContent: ["raw reports", "diagnoses"],
      },
    ],
    recipients: [
      {
        id: "recipient.person.self",
        revision: 1,
        status: "active",
        publicName: "You",
        directExplanation: "The controlling person receiving their own export.",
        grantable: true,
        recipientKind: "person-self",
        excludedParties: ["other accounts", "external organizations"],
      },
      {
        id: "recipient.organization.synthetic-study",
        revision: 1,
        status: "active",
        publicName: "Synthetic study organization",
        directExplanation: "One named synthetic public-good study recipient.",
        grantable: true,
        recipientKind: "named-external",
        excludedParties: ["affiliates", "unrelated studies"],
      },
    ],
    actions: [
      {
        id: "action.export.prepare",
        revision: 1,
        status: "active",
        publicName: "Prepare export",
        directExplanation: "Prepare a bounded export from selected records.",
        grantable: true,
        actionFamily: "export",
      },
      {
        id: "action.export.deliver",
        revision: 1,
        status: "active",
        publicName: "Deliver export",
        directExplanation:
          "Deliver the prepared export to the named recipient.",
        grantable: true,
        actionFamily: "export",
      },
      {
        id: "action.transmit.to-recipient",
        revision: 1,
        status: "active",
        publicName: "Transmit to recipient",
        directExplanation:
          "Transmit selected information to the named recipient.",
        grantable: true,
        actionFamily: "transmit",
      },
    ],
    prohibitedPurposeIds: [],
    prohibitedActionIds: [],
    fixtureDataClassification: "synthetic",
  },
  grants: [baseGrant],
  lifecycleEvents: [],
  explanations: [
    {
      id: "explanation.personal-export.synthetic",
      revision: 1,
      grantId: baseGrant.id,
      grantRevision: baseGrant.revision,
      purposeId: baseGrant.purposeId,
      purposeRevision: baseGrant.purposeRevision,
      recipientId: baseGrant.primaryRecipientId,
      recipientRevision: baseGrant.primaryRecipientRevision,
      dataCategoryIds: baseGrant.dataCategoryIds,
      dataCategoryRevisions: baseGrant.dataCategoryRevisions,
      selector: baseGrant.selector,
      actionIds: baseGrant.actionIds,
      actionRevisions: baseGrant.actionRevisions,
      conditionIds: baseGrant.conditions.map((condition) => condition.id),
      duration: baseGrant.duration,
      durationSummary: "One use before 2026-07-27T00:00:00Z.",
      directSummary:
        "Prepare and deliver the two selected synthetic records to you once.",
      narrativeSummary:
        "Use this Key once to carry the two selected entries back to your own archive.",
      materiallyEquivalent: true,
      optionality: "essential-personal",
      locale: "en-US",
      dataClassification: "synthetic",
    },
  ],
  comprehensionEvidence: [
    {
      id: "comprehension.personal-export.synthetic",
      revision: 1,
      grantId: baseGrant.id,
      grantRevision: baseGrant.revision,
      explanationSnapshotId: "explanation.personal-export.synthetic",
      explanationRevision: 1,
      ruleId: "comprehension-rule.personal-export.baseline",
      ruleRevision: 1,
      status: "satisfied",
      requiredConceptIds: [
        "concept.purpose",
        "concept.recipient",
        "concept.data-scope",
        "concept.actions",
        "concept.duration",
      ],
      satisfiedConceptIds: [
        "concept.purpose",
        "concept.recipient",
        "concept.data-scope",
        "concept.actions",
        "concept.duration",
      ],
      recordedAt: "2026-07-26T11:58:00Z",
      dataClassification: "synthetic",
    },
  ],
  confirmations: [
    {
      id: "confirmation.personal-export.synthetic",
      revision: 1,
      grantId: baseGrant.id,
      grantRevision: baseGrant.revision,
      grantingAuthorityId: "actor.person.synthetic",
      confirmedAt: "2026-07-26T11:59:00Z",
      decision: "confirmed",
      dataClassification: "synthetic",
    },
  ],
  receipts: [syntheticAccessReceipt],
};

export const validPersonalExportInput: PolicyEvaluationInput = {
  contractVersion: HOUSE_OF_KEYS_CONTRACT_VERSION,
  evaluatorId: HOUSE_OF_KEYS_EVALUATOR_ID,
  evaluatorRevision: HOUSE_OF_KEYS_EVALUATOR_REVISION,
  policyId: HOUSE_OF_KEYS_POLICY_ID,
  policyRevision: HOUSE_OF_KEYS_POLICY_REVISION,
  decisionId: "policy-decision.personal-export.synthetic",
  correlationId: "correlation.personal-export.synthetic",
  evaluationTime: NOW,
  request: {
    id: "policy-request.personal-export.synthetic",
    revision: 1,
    requesterId: "actor.person.synthetic",
    requesterKind: "controlling-person",
    primaryRecipientId: "recipient.person.self",
    primaryRecipientRevision: 1,
    performingActorId: "actor.service.exporter",
    controlledResourceId: "chronicle.person.synthetic",
    subjectIds: ["subject.person.synthetic"],
    purposeId: "purpose.personal.chronicle-portability",
    purposeRevision: 1,
    dataCategoryIds: [
      "data.chronicle.symptom",
      "data.chronicle.laboratory-test",
    ],
    dataCategoryRevisions: {
      "data.chronicle.symptom": 1,
      "data.chronicle.laboratory-test": 1,
    },
    selector: {
      exactRecordIds: ["record.synthetic.symptom", "record.synthetic.lab"],
    },
    actionIds: ["action.export.prepare", "action.export.deliver"],
    actionRevisions: {
      "action.export.prepare": 1,
      "action.export.deliver": 1,
    },
    requestedConditionIds: ["condition.receipt.required"],
    operationBoundary: "export",
    receiptRequired: true,
    requestedAt: NOW,
  },
  bundle: syntheticHouseOfKeysBundle,
  conditionFacts: [
    {
      conditionId: "condition.receipt.required",
      status: "satisfied",
      actualValue: true,
    },
  ],
  capacitySnapshots: [],
};

function scenario(
  id: SyntheticPolicyScenario["id"],
  description: string,
  mutate: (input: PolicyEvaluationInput) => void,
  expectedOutcome: SyntheticPolicyScenario["expectedOutcome"],
  expectedReasonCodes: ReadonlyArray<string>,
): SyntheticPolicyScenario {
  const input = clone(validPersonalExportInput);
  mutate(input);
  return { id, description, input, expectedOutcome, expectedReasonCodes };
}

function addGrantEvidence(
  bundle: HouseOfKeysSchemaBundle,
  grant: PermissionGrant,
  suffix: string,
): void {
  const explanationId = `explanation.personal-export.${suffix}` as const;
  const comprehensionId = `comprehension.personal-export.${suffix}` as const;
  const confirmationId = `confirmation.personal-export.${suffix}` as const;
  grant.explanationSnapshotId = explanationId;
  grant.comprehensionEvidenceId = comprehensionId;
  grant.confirmationEvidenceId = confirmationId;
  bundle.grants = [...bundle.grants, grant];
  bundle.explanations = [
    ...bundle.explanations,
    {
      ...clone(bundle.explanations[0]),
      id: explanationId,
      grantId: grant.id,
      grantRevision: grant.revision,
      purposeId: grant.purposeId,
      purposeRevision: grant.purposeRevision,
      recipientId: grant.primaryRecipientId,
      recipientRevision: grant.primaryRecipientRevision,
      dataCategoryIds: grant.dataCategoryIds,
      dataCategoryRevisions: grant.dataCategoryRevisions,
      selector: grant.selector,
      actionIds: grant.actionIds,
      actionRevisions: grant.actionRevisions,
      conditionIds: grant.conditions.map((condition) => condition.id),
      duration: grant.duration,
      optionality: grant.optionality,
    },
  ];
  bundle.comprehensionEvidence = [
    ...bundle.comprehensionEvidence,
    {
      ...clone(bundle.comprehensionEvidence[0]),
      id: comprehensionId,
      grantId: grant.id,
      grantRevision: grant.revision,
      explanationSnapshotId: explanationId,
    },
  ];
  bundle.confirmations = [
    ...bundle.confirmations,
    {
      ...clone(bundle.confirmations[0]),
      id: confirmationId,
      grantId: grant.id,
      grantRevision: grant.revision,
      grantingAuthorityId: grant.grantingAuthorityId,
    },
  ];
}

export const syntheticPolicyScenarios: ReadonlyArray<SyntheticPolicyScenario> = [
  scenario(
    "scenario.policy.allow-personal-export",
    "A complete personal export request matches one active confirmed grant.",
    () => {},
    "allow",
    ["allow.grant.exact-match"],
  ),
  scenario(
    "scenario.policy.deny-blanket-category",
    "A request uses an invalid blanket category.",
    (input) => {
      input.request.dataCategoryIds = ["data.chronicle.all"];
      input.request.dataCategoryRevisions = { "data.chronicle.all": 1 };
    },
    "deny",
    ["deny.request.blanket-scope"],
  ),
  scenario(
    "scenario.policy.deny-recipient-mismatch",
    "The request names a recipient not covered by the personal export grant.",
    (input) => {
      input.request.primaryRecipientId =
        "recipient.organization.synthetic-study";
    },
    "deny",
    ["deny.recipient.mismatch"],
  ),
  scenario(
    "scenario.policy.deny-withdrawn-grant",
    "A withdrawn grant cannot authorize future access.",
    (input) => {
      input.bundle.grants[0].lifecycleState = "withdrawn";
    },
    "deny",
    ["deny.grant.withdrawn"],
  ),
  scenario(
    "scenario.policy.deny-expired-grant",
    "Evaluation after the duration ends is denied.",
    (input) => {
      input.evaluationTime = "2026-07-28T00:00:00Z";
    },
    "deny",
    ["deny.grant.expired"],
  ),
  scenario(
    "scenario.policy.deny-explicit-prohibition",
    "An explicit applicable policy prohibition overrides grant coverage.",
    (input) => {
      input.bundle.policyBundle.prohibitedPurposeIds = [
        input.request.purposeId,
      ];
    },
    "deny",
    ["deny.policy.prohibition"],
  ),
  scenario(
    "scenario.policy.indeterminate-recipient",
    "An unresolved recipient identity prevents a safe decision.",
    (input) => {
      input.request.primaryRecipientId = "recipient.unresolved.synthetic";
    },
    "indeterminate",
    ["indeterminate.taxonomy.unresolved"],
  ),
  scenario(
    "scenario.policy.indeterminate-category",
    "An unknown category reference prevents a safe decision.",
    (input) => {
      input.request.dataCategoryIds = ["data.chronicle.unknown"];
      input.request.dataCategoryRevisions = { "data.chronicle.unknown": 1 };
    },
    "indeterminate",
    ["indeterminate.taxonomy.unresolved"],
  ),
  scenario(
    "scenario.policy.indeterminate-stale-comprehension",
    "Comprehension evidence bound to another explanation revision is stale.",
    (input) => {
      input.bundle.comprehensionEvidence[0].explanationRevision = 2;
    },
    "indeterminate",
    ["indeterminate.comprehension.stale"],
  ),
  scenario(
    "scenario.policy.deny-comprehension-not-satisfied",
    "Explicitly not-satisfied comprehension evidence denies confirmation eligibility.",
    (input) => {
      input.bundle.comprehensionEvidence[0].status = "not-satisfied";
    },
    "deny",
    ["deny.comprehension.not-satisfied"],
  ),
  scenario(
    "scenario.policy.deny-action-mismatch",
    "Transmission is not implied by export preparation and delivery.",
    (input) => {
      input.request.actionIds = ["action.transmit.to-recipient"];
      input.request.actionRevisions = { "action.transmit.to-recipient": 1 };
      input.request.operationBoundary = "transmit";
    },
    "deny",
    ["deny.action.mismatch"],
  ),
  scenario(
    "scenario.policy.deny-partial-grant-composition",
    "Two partial grants cannot be combined to manufacture authority over a larger request.",
    (input) => {
      const symptomGrant = clone(input.bundle.grants[0]);
      symptomGrant.id = "grant.partial.symptom";
      symptomGrant.dataCategoryIds = ["data.chronicle.symptom"];
      symptomGrant.dataCategoryRevisions = { "data.chronicle.symptom": 1 };
      const labGrant = clone(input.bundle.grants[0]);
      labGrant.id = "grant.partial.lab";
      labGrant.dataCategoryIds = ["data.chronicle.laboratory-test"];
      labGrant.dataCategoryRevisions = {
        "data.chronicle.laboratory-test": 1,
      };
      input.bundle.grants = [];
      addGrantEvidence(input.bundle, symptomGrant, "partial-symptom");
      addGrantEvidence(input.bundle, labGrant, "partial-lab");
    },
    "deny",
    ["deny.grant.partial-composition-prohibited"],
  ),
  scenario(
    "scenario.policy.allow-multiple-independent-grants",
    "Two grants independently cover the complete request and remain inspectable.",
    (input) => {
      const secondGrant = clone(input.bundle.grants[0]);
      secondGrant.id = "grant.personal-export.synthetic-second";
      addGrantEvidence(input.bundle, secondGrant, "synthetic-second");
    },
    "allow",
    ["allow.multiple-independent-grants"],
  ),
  scenario(
    "scenario.policy.indeterminate-capacity-conflict",
    "Conflicting bounded-count capacity evidence prevents safe authorization.",
    (input) => {
      input.bundle.grants[0].duration = {
        kind: "bounded-count",
        startsAt: START,
        endsAt: END,
        maximumUses: 2,
      };
      input.bundle.explanations[0].duration = input.bundle.grants[0].duration;
      input.bundle.explanations[0].durationSummary =
        "At most two uses before 2026-07-27T00:00:00Z.";
      input.capacitySnapshots = [
        {
          grantId: input.bundle.grants[0].id,
          grantRevision: 1,
          status: "conflicting",
          recordedAt: NOW,
        },
      ];
    },
    "indeterminate",
    ["indeterminate.capacity.conflict"],
  ),
  scenario(
    "scenario.policy.allow-personal-core-independent-secondary-use",
    "An unrelated malformed optional research grant cannot block an independently valid personal-core export.",
    (input) => {
      input.bundle.grants = [
        ...input.bundle.grants,
        {
          ...clone(input.bundle.grants[0]),
          id: "grant.research.unrelated.synthetic",
          purposeId: "purpose.research.study-synthetic",
          primaryRecipientId: "recipient.organization.synthetic-study",
          permittedPerformingActorIds: ["actor.service.transmitter"],
          dataCategoryIds: ["data.chronicle.symptom"],
          dataCategoryRevisions: { "data.chronicle.symptom": 1 },
          selector: { exactRecordIds: ["record.synthetic.symptom"] },
          actionIds: ["action.transmit.to-recipient"],
          actionRevisions: { "action.transmit.to-recipient": 1 },
          optionality: "optional",
          explanationSnapshotId: "explanation.missing.unrelated",
          comprehensionEvidenceId: "comprehension.missing.unrelated",
          confirmationEvidenceId: "confirmation.missing.unrelated",
        },
      ];
    },
    "allow",
    ["allow.grant.exact-match"],
  ),
  scenario(
    "scenario.policy.deny-omitted-selector-broadening",
    "A request cannot omit the narrowing selector from a selector-bounded grant.",
    (input) => {
      input.request.selector = undefined;
    },
    "deny",
    ["deny.scope.selector-conflict"],
  ),
  scenario(
    "scenario.policy.indeterminate-stale-category-revision",
    "A request bound to an unavailable category revision fails closed.",
    (input) => {
      input.request.dataCategoryRevisions = {
        ...input.request.dataCategoryRevisions,
        "data.chronicle.symptom": 2,
      };
    },
    "indeterminate",
    ["indeterminate.taxonomy.unresolved"],
  ),
];
