# Content Schema Reconciliation Record

**Status:** BASELINE reconciliation complete for Sprint 2

This record documents how the conflicting Sprint 2 content contracts converged on the authoritative pre-stable `0.1.0` baseline. It describes repository and documentation migration only; no production data or runtime migration occurred.

## Resolved common metadata

| Retired or conflicting variant | Authoritative field        | Resolution                                                       |
| ------------------------------ | -------------------------- | ---------------------------------------------------------------- |
| `version`                      | `revision`                 | Canonical records and validators use a positive integer revision |
| generic `status`               | `reviewState`              | Publication is no longer represented as a source-review state    |
| `canonRefs`                    | `canonReferences`          | Renamed everywhere in active contracts and examples              |
| missing capability label       | `capabilityStatus`         | Required on every content record                                 |
| missing dependency list        | `dependencies`             | Required, using an empty array when none exist                   |
| `reviewers` as labels          | `reviewRequirements`       | Values are explicit review domains                               |
| implied approval               | `reviewApprovals`          | Named human approval evidence is explicit                        |
| missing provenance             | `authorship`               | Responsible humans and material AI assistance are declared       |
| no replacement metadata        | `supersedes`, `replacedBy` | Optional and used only for explicit replacement relationships    |

## Resolved identifiers

| Concept         | Grammar                                                  | Example                           |
| --------------- | -------------------------------------------------------- | --------------------------------- |
| Content ID      | lowercase dotted namespace; segments may contain hyphens | `scene.lantern-shore.arrival`     |
| Slug            | lowercase kebab-case                                     | `lantern-shore-arrival`           |
| Story state     | dotted namespace                                         | `state.met-aster`                 |
| Action          | dotted namespace                                         | `action.begin-prologue`           |
| Requirement     | dotted namespace                                         | `requirement.confirm-observation` |
| Purpose         | dotted namespace                                         | `purpose.core-chronicle`          |
| Canon reference | `canon.` dotted namespace                                | `canon.character.aster`           |
| Event name      | deferred runtime decision                                | no Sprint 2 transport commitment  |

## Lifecycle resolution

The branch now separates:

- `reviewState` — source authoring and review
- `capabilityStatus` — whether the represented capability is live, experimental, planned, long-horizon, or deferred
- publication — membership in an identified immutable content release
- retirement — source eligibility for future publication
- supersession and replacement — explicit prospective relationships
- recall — removal of an unsafe or materially incorrect published release from further distribution

The operational rules are defined in `docs/governance/content-governance.md`.

## Content-kind reconciliation

### Character

Resolved fields include:

- `slug`
- `displayName`
- `role`
- `values`
- `voiceRules`
- `prohibitedBehaviors`
- `zoneIds`

Character content does not create medical, consent, review, or governing authority.

### Zone

Resolved fields include:

- `slug`
- `guideCharacterIds`
- `publicPurpose`
- `inWorldPurpose`
- `playerValue`
- `sceneIds`
- `accessibilityNotes`
- structured `unlock`

The required `playerValue` keeps world-building connected to a concrete benefit for the person using the experience.

### Dialogue

Resolved fields include:

- `speakerId`
- `text`
- optional `plainLanguageText`
- `emotionalIntent`

Dialogue remains authored presentation content. It does not independently grant permissions, rewards, Chronicle mutations, or canon changes.

### Scene and choice

The old boolean refusal marker was replaced by explicit choice disposition:

- `continue`
- `defer`
- `refuse`
- `exit`

Choices also declare visible consequence text and an explicit next scene or action when applicable. Interactive scenes require a defer, refuse, or exit route.

### Quest

The reconciled quest contract now includes:

- public and in-world titles
- connected product loop
- player value
- progress dimension
- structured requirements
- deterministic completion rule
- approved reward types
- estimated time and accessibility variants
- data categories and permission purposes
- safety classification
- feedback and narrative consequence
- decline and deferral paths
- analytics hypothesis

The reward model allows:

- progress in Vitality, Chronicle, Fellowship, or Renown
- non-cash Laurels
- restoration
- story unlocks
- clues

Cash and compensation are excluded from quest rewards. Permission review may be a requirement; granting broader permission may not be rewarded merely because it is granted.

### Lesson

Resolved fields include:

- `learningObjectives`
- `body`
- `plainLanguageBody`
- structured claims
- evidence classification
- source references
- `comprehensionPrompt`

Review domains are expressed through the common review model.

### Notification

Resolved fields include:

- channel and purpose
- body and destination
- urgency and expiration
- interruption behavior
- `shameFree: true`
- `pressureFreeAlternative`

The canonical return notification demonstrates the Broken Lantern principle: return is invited without punishment, urgency, or loss of core access.

## Contract surfaces

The following now target the same `0.1.0` contract:

- `docs/product/content-schema-baseline.md`
- `packages/content-schema/src/types.ts`
- `packages/content-schema/src/validate.ts`
- `packages/content-schema/src/validate-content.mjs`
- `packages/content-schema/schema/content.schema.json`
- reusable validator tests
- canonical content examples

The repository validator is the authoritative executable MVV gate for committed content. The TypeScript validator is the reusable record-level validator. The JSON Schema is the authoring-tool export.

`graph.ts` remains exploratory and outside the package export. It does not redefine the baseline record model.

## Canonical examples

Sprint 2 now includes examples for all seven content kinds:

- character — Aster
- zone — Lantern Shore
- scene — Lantern Shore arrival
- dialogue — Aster’s first-light dialogue
- quest — The First Reflection
- lesson — The Open Hand
- notification — The Lantern Is Still Here

The examples remain in specialist review rather than claiming approvals that have not occurred.

## Validation evidence

The separated MVV workflow exposes:

- formatting
- repository policy
- content validation
- lint
- typecheck
- tests
- DCO

Before the final completion record is frozen, the current branch head must pass every check after the JSON Schema and governance additions.

## Remaining implementation work

The following are outside the reconciliation itself:

- stable `1.0.0` and migration guarantees
- release-manifest schema
- runtime content compatibility
- Story Studio implementation
- content-pack distribution
- localization release coordination
- signed release and recall tooling

These decisions must preserve the baseline contract and incentive invariants.

## Hold point satisfied

The schema, examples, validators, tests, JSON Schema export, and governance terminology are now internally aligned. Runtime, database, event, service, and Story Studio implementation decisions remain deferred to later sprints.
