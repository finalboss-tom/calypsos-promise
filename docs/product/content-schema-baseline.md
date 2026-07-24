# Content Schema Baseline

**Status:** BASELINE for Sprint 2

## Purpose

This document is the authoritative Sprint 2 contract for versioned narrative and educational content. It reconciles the content examples, TypeScript contracts, validator, incentive model, and minimum viable validation policy.

The schema is intentionally pre-stable. It defines enough structure to protect canon, player agency, transparent capability claims, review provenance, and the hardcoded incentive model without pretending that the future runtime is complete.

## Authority

When Sprint 2 artifacts conflict, use this order:

1. Frozen Product Constitution, Gameplay Foundation, architecture, and canon
2. Controlled vocabulary and retired terminology
3. Core Objective and Incentive Model
4. This content-schema baseline
5. Canonical content examples
6. Validator implementations and tests
7. Proposed engine, graph, and Story Studio documents

A validator may enforce this specification; it may not redefine it.

## Version decision

The Sprint 2 schema version is:

```text
0.1.0
```

`0.1.0` communicates that the contract is usable but may still change before runtime implementation. `1.0.0` is reserved for a stable, migration-governed contract.

Each content record also carries a positive integer `revision`. A correction to the same conceptual record increments `revision`. A materially different concept receives a new ID.

## Identifier grammar

### Content IDs

Content IDs are lowercase, namespaced, and dotted. Segments may contain hyphens.

Examples:

- `character.aster`
- `zone.lantern-shore`
- `scene.lantern-shore.arrival`
- `quest.first-reflection`

### Slugs

Slugs are lowercase kebab-case and are intended for human-readable routes or filenames.

Examples:

- `aster`
- `lantern-shore`
- `first-reflection`

### State, action, purpose, requirement, and reward-target IDs

These use the same dotted namespace convention as content IDs, but they are not automatically content records.

Examples:

- `state.met-aster`
- `action.begin-prologue`
- `purpose.core-chronicle`
- `requirement.confirm-observation`

### Canon references

Canon references use a dotted namespace beginning with `canon.`. Resolution to exact document anchors remains a later canon-registry decision.

## Common metadata

Every content record contains:

- `id`
- `schemaVersion`
- `revision`
- `reviewState`
- `capabilityStatus`
- `kind`
- `title`
- `summary`
- `locale`
- `tags`
- `canonReferences`
- `dependencies`
- `owner`
- `reviewRequirements`
- `reviewApprovals`
- `authorship`
- `createdAt`
- `updatedAt`

Optional lifecycle metadata:

- `historicalContext`
- `supersedes`
- `replacedBy`

## Lifecycle separation

### Review state

Review state describes the source record:

- `draft`
- `editorial-review`
- `specialist-review`
- `approved`
- `retired`

A record is not `approved` merely because it is committed to the repository.

### Capability status

Capability status describes whether the experience represented by the record is available:

- `live`
- `experimental`
- `planned`
- `long-horizon`
- `deferred`

A planned content record must not be presented publicly as live.

### Publication state

Publication is not a review-state value. A later content-release manifest will identify which approved record revisions are published together.

This distinction allows an approved record to exist without implying that it is deployed.

### Replacement and retirement

`supersedes` and `replacedBy` describe prospective replacement relationships. Retired records remain traceable and are not silently deleted from history.

## Authorship and review

`authorship` records whether content is human-authored or AI-assisted and names the responsible human contributors.

`reviewRequirements` names the review domains required before approval. Initial domains are:

- editorial
- canon
- privacy
- safety
- clinical
- accessibility
- security
- research-governance
- economic-claims

`reviewApprovals` records the domain, named reviewer, and review time.

For `approved` content, every required review domain must have a corresponding named approval. Until qualified reviewers exist, records requiring specialist review remain in a non-approved state rather than implying review that did not occur.

## Content kinds

Sprint 2 defines:

- character
- zone
- scene
- dialogue
- quest
- lesson
- notification

New kinds require an explicit schema decision rather than an ad hoc validator exception.

## Scene agency contract

A scene with choices must include at least one choice whose disposition is:

- `defer`
- `refuse`
- `exit`

Each choice states its visible label and consequence. A `continue` choice must identify a next scene or explicit action.

## Quest incentive contract

A quest is an optional structured invitation. Every quest must declare:

- public and in-world titles
- connected product loop
- player-value statement
- objective
- progress dimension
- structured requirements
- deterministic completion rule
- approved reward types
- estimated time
- accessibility variants
- data categories touched
- permission-purpose requirements
- safety classification
- feedback
- narrative consequence
- deferral and refusal behavior
- analytics hypothesis

The supported connected loops are:

- `build-chronicle`
- `improve-understanding`
- `control-and-share-value`

The supported progress dimensions are:

- vitality
- chronicle
- fellowship
- renown

Laurels are represented as a reward type rather than a progress dimension.

Supported reward types are:

- `progress`
- `laurel`
- `restoration`
- `story-unlock`
- `clue`

A progress reward declares its dimension and positive amount. Compensation is not a quest reward type.

Permission-related quest requirements may require a `permission-review`, meaning the player inspects and makes their own choice. The schema does not define a permission-grant requirement because broader consent must not be rewarded merely for being granted.

## Deterministic boundary

Structured content owns eligibility inputs, completion requirements, reward declarations, unlock references, safety classification, and story ordering.

AI may assist with drafting and presentation but may not decide completion, rewards, permission, review approval, or canon truth.

## Minimum viable validation

The authoritative validator must check at least:

- schema version
- common metadata
- supported content kind
- identifier grammar
- positive revision
- authorship provenance
- approved-content review completeness
- retired terminology in active content
- scene refusal, defer, or exit route
- quest player value
- quest decline support
- structured completion rule
- reward allowlist and progress-reward shape
- shame-free notification declaration
- duplicate content IDs
- dangling content dependencies and direct content references

Automated checks do not replace contextual canon, privacy, safety, accessibility, clinical, research, or economic review.

## Explicit non-scope

This baseline does not select:

- runtime persistence
- event sourcing
- content-pack transport
- Story Studio implementation
- production publication infrastructure
- AI provider
- health-data schema
- research workflow

Those decisions follow only after the Sprint 2 content contract is internally consistent.
