import assert from "node:assert/strict";
import test from "node:test";

import { validateContent } from "../dist/index.js";

const baseMetadata = {
  schemaVersion: "0.1.0",
  revision: 1,
  reviewState: "specialist-review",
  capabilityStatus: "planned",
  title: "The First Reflection",
  summary: "Confirm one useful personal observation.",
  locale: "en-US",
  tags: ["fourteen-lanterns"],
  canonReferences: ["canon.lantern.first-reflection"],
  dependencies: ["zone.lantern-shore", "character.aster"],
  owner: "project-maintainer",
  reviewRequirements: ["editorial", "canon", "privacy", "safety"],
  reviewApprovals: [],
  authorship: {
    mode: "human-authored",
    humanContributors: ["project-maintainer"],
  },
  createdAt: "2026-07-24T00:00:00Z",
  updatedAt: "2026-07-24T00:00:00Z",
};

const validQuest = {
  ...baseMetadata,
  id: "quest.first-reflection",
  kind: "quest",
  publicTitle: "The First Reflection",
  inWorldTitle: "The First Reflection",
  zoneId: "zone.lantern-shore",
  guideCharacterId: "character.aster",
  connectedLoop: "build-chronicle",
  playerValue: "Create one useful, player-confirmed Chronicle entry.",
  objective: "Confirm one personal observation.",
  progressDimension: "chronicle",
  requirements: [
    {
      id: "requirement.confirm-observation",
      type: "player-confirmation",
      description: "The player confirms one structured observation.",
      parameters: { minimumCount: 1 },
    },
  ],
  completionRule: {
    mode: "all",
    requirementIds: ["requirement.confirm-observation"],
  },
  rewards: [{ type: "progress", dimension: "chronicle", amount: 1 }],
  estimatedMinutes: 3,
  accessibilityVariants: [
    {
      id: "variant.text-only",
      label: "Text only",
      description: "Complete the reflection without voice or animation.",
    },
  ],
  dataCategories: ["self-reported-observation"],
  permissionPurposeIds: ["purpose.core-chronicle"],
  safetyClassification: "general",
  feedback: "Your Chronicle now contains one confirmed observation.",
  narrativeConsequence: "The first page of the Chronicle becomes visible.",
  canDefer: true,
  canDecline: true,
  deferralPath: "The quest remains available without penalty.",
  refusalPath: "The player may continue exploring without completing it.",
  analyticsHypothesis:
    "A brief confirmed entry demonstrates immediate personal value.",
};

test("accepts a schema-aligned quest with deterministic incentives", () => {
  const result = validateContent(validQuest);
  assert.equal(result.ok, true);
  assert.deepEqual(result.issues, []);
});

test("accepts approved content only when required domains have named approvals", () => {
  const approved = {
    ...validQuest,
    reviewState: "approved",
    reviewApprovals: validQuest.reviewRequirements.map((domain) => ({
      domain,
      reviewer: `reviewer-${domain}`,
      reviewedAt: "2026-07-24T00:00:00Z",
    })),
  };

  const result = validateContent(approved);
  assert.equal(result.ok, true);
});

test("rejects retired language in active content", () => {
  const result = validateContent({
    ...validQuest,
    summary: "An indoctrination sequence.",
  });

  assert.equal(result.ok, false);
  assert.match(
    result.issues.map((issue) => issue.message).join(" "),
    /Retired language/,
  );
});

test("rejects approved content with a missing named review domain", () => {
  const result = validateContent({
    ...validQuest,
    reviewState: "approved",
    reviewApprovals: [
      {
        domain: "editorial",
        reviewer: "reviewer-editorial",
        reviewedAt: "2026-07-24T00:00:00Z",
      },
    ],
  });

  assert.equal(result.ok, false);
  assert.match(
    result.issues.map((issue) => issue.message).join(" "),
    /Missing named approval/,
  );
});

test("rejects compensation disguised as a quest reward", () => {
  const result = validateContent({
    ...validQuest,
    rewards: [{ type: "cash", amount: 10 }],
  });

  assert.equal(result.ok, false);
  assert.match(
    result.issues.map((issue) => issue.message).join(" "),
    /not allowed by the incentive model/,
  );
});

test("rejects completion rules that reference unknown requirements", () => {
  const result = validateContent({
    ...validQuest,
    completionRule: {
      mode: "all",
      requirementIds: ["requirement.missing"],
    },
  });

  assert.equal(result.ok, false);
  assert.match(
    result.issues.map((issue) => issue.message).join(" "),
    /Unknown completion requirement/,
  );
});

test("rejects scenes without a defer, refusal, or exit route", () => {
  const result = validateContent({
    ...baseMetadata,
    id: "scene.lantern-shore.test",
    kind: "scene",
    zoneId: "zone.lantern-shore",
    sequence: 1,
    speakerIds: ["character.aster"],
    dialogueIds: [],
    choices: [
      {
        id: "choice.continue",
        label: "Continue",
        consequenceText: "Continue forward.",
        disposition: "continue",
        actionId: "action.continue",
      },
    ],
    prerequisiteStateIds: [],
    grantsStateIds: [],
  });

  assert.equal(result.ok, false);
  assert.match(
    result.issues.map((issue) => issue.message).join(" "),
    /defer, refusal, or exit/,
  );
});
