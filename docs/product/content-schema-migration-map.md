# Content Schema Reconciliation Map

**Status:** BASELINE migration plan for Sprint 2

This map identifies how current Sprint 2 artifacts should converge on the authoritative `0.1.0` content-schema baseline. It is a migration plan, not a runtime migration.

## Common metadata

| Current variant                     | Baseline field             | Action                                                 |
| ----------------------------------- | -------------------------- | ------------------------------------------------------ |
| `version`                           | `revision`                 | Rename in examples and validator                       |
| `status`                            | `reviewState`              | Rename and remove `published` from source review state |
| `canonRefs`                         | `canonReferences`          | Rename everywhere                                      |
| missing `capabilityStatus`          | `capabilityStatus`         | Add to every active record                             |
| missing `dependencies`              | `dependencies`             | Add, using an empty array where none exist             |
| `reviewers` as review-domain labels | `reviewRequirements`       | Rename and treat values as domains                     |
| no named approvals                  | `reviewApprovals`          | Add explicit named human approval records              |
| no authorship metadata              | `authorship`               | Add mode and responsible humans                        |
| `historicalContext`                 | `historicalContext`        | Retain as optional boolean                             |
| no replacement metadata             | `supersedes`, `replacedBy` | Add only when applicable                               |

## Identifier decisions

| Concept         | Baseline grammar          | Example                       |
| --------------- | ------------------------- | ----------------------------- |
| Content ID      | dotted namespace          | `scene.lantern-shore.arrival` |
| Slug            | kebab-case                | `lantern-shore-arrival`       |
| Story state     | dotted namespace          | `state.met-aster`             |
| Action          | dotted namespace          | `action.begin-prologue`       |
| Canon reference | `canon.` dotted namespace | `canon.character.aster`       |
| Event name      | deferred runtime decision | no Sprint 2 enforcement       |

## Character record

### Retain

- `slug`
- `role`
- `values`
- `voiceRules`
- `prohibitedBehaviors`
- `zoneIds`

### Add

- `displayName`
- reconciled common metadata

### Remove or avoid

- no additional character authority fields beyond approved canon and safety roles

## Zone record

### Retain

- `slug`
- `guideCharacterIds`
- `publicPurpose`
- `inWorldPurpose`
- `sceneIds`
- `accessibilityNotes`

### Rename

- `unlockRuleIds` becomes a structured `unlock` object

### Add

- `playerValue`
- `systemIds`
- reconciled common metadata

The `playerValue` requirement keeps zone design connected to the project’s core objective rather than allowing world-building without a player-facing purpose.

## Dialogue record

### Retain

- `speakerId`
- `text`
- `plainLanguageText`
- `emotionalIntent`

### Add

- reconciled common metadata

Dialogue remains authored content. It does not independently grant rewards, permissions, or Chronicle mutations.

## Scene record

### Retain

- `zoneId`
- `speakerIds`
- `dialogueIds`
- `choices`
- `grantsStateIds`

### Rename

- `prerequisiteIds` becomes `prerequisiteStateIds`

### Add

- `sequence`
- explicit choice `disposition`
- visible `consequenceText`
- reconciled common metadata

### Choice disposition

Each choice uses one of:

- `continue`
- `defer`
- `refuse`
- `exit`

The current boolean `refusal` field should be replaced because it cannot distinguish defer, refuse, and exit.

## Quest record

The existing TypeScript quest contract and test fixture are not aligned with the frozen Gameplay Foundation. The reconciled quest record must include the fuller incentive contract.

### Required identity and meaning

- `publicTitle`
- `inWorldTitle`
- `zoneId`
- `guideCharacterId`
- `connectedLoop`
- `playerValue`
- `objective`

### Required incentive structure

- `progressDimension`
- `requirements`
- `completionRule`
- `rewards`
- `feedback`
- `narrativeConsequence`

### Required agency and burden structure

- `estimatedMinutes`
- `accessibilityVariants`
- `dataCategories`
- `permissionPurposeIds`
- `safetyClassification`
- `canDecline: true`
- `deferralBehavior`
- `refusalBehavior`

### Required review and learning structure

- `analyticsHypothesis`
- reconciled common metadata

### Reward constraints

- `progress` rewards target Vitality, Chronicle, Fellowship, or Renown
- `laurel` rewards are non-cash
- `restoration`, `story-unlock`, and `clue` rewards target explicit IDs
- compensation is excluded from the quest reward model
- permission grants are excluded from completion requirements and rewards

## Lesson record

### Retain

- `learningObjectives`
- `body`
- `plainLanguageBody`
- `claims`
- `comprehensionPrompt`

### Move

- `reviewDomains` is represented through common `reviewRequirements`

### Add

- reconciled common metadata

## Notification record

### Retain

- `channel`
- `purpose`
- `body`
- `destinationRoute`
- `urgency`
- `expiresAfterMinutes`
- `mayInterrupt`
- `shameFree: true`
- `pressureFreeAlternative`

### Add

- reconciled common metadata

## Validator reconciliation

### Repository validator

`validate-content.mjs` currently matches the older examples better than the TypeScript validator, but it uses obsolete metadata names and mixes publication with review state.

It should be revised to target this baseline and remain the initial authoritative executable MVV validator.

### TypeScript validator

`validate.ts` currently targets `1.0.0`, rejects dotted IDs, uses conflicting quest fields, and validates only part of the common metadata.

It should not be treated as authoritative until it implements the same contract as the repository validator.

### TypeScript types

`types.ts` contains useful candidate structures but must be revised to:

- use `0.1.0`
- remove `FoundationStatus` from ordinary content records
- adopt the review requirement and approval model
- adopt the complete quest incentive contract
- distinguish choice dispositions
- align all fields with canonical examples and validator behavior

### Graph types

`graph.ts` remains exploratory and outside the package export. It should not influence the baseline record model during Sprint 2 cleanup.

## Migration order

1. Update TypeScript contracts to match the baseline specification.
2. Update canonical JSON records to use reconciled metadata.
3. Add one canonical quest record that demonstrates the incentive contract.
4. Add lesson and notification examples.
5. Update the repository validator.
6. Update the TypeScript validator and tests.
7. Add dependency and direct-reference validation.
8. Format the branch and run all MVV checks.
9. Update the PR body with actual passing evidence.

## Hold point

Do not create runtime, database, event, service, or Story Studio implementation contracts while this migration is incomplete.
