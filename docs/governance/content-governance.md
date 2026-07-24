# Content Governance, Publication, and Recall

**Status:** BASELINE for content operations; publication tooling remains PROPOSED

## Purpose

This document defines how Calypso’s Promise content moves from an authored proposal to an approved, published, superseded, retired, or recalled record.

The goal is not bureaucracy for its own sake. The process protects the player promise, frozen canon, the hardcoded incentive model, accessible participation, and honest capability claims while keeping contribution practical for a small open-source project.

## Governing principles

- Published content is versioned, reviewable, and reversible.
- Repository presence does not equal approval or publication.
- Authors remain accountable for AI-assisted contributions.
- Required specialist review is never implied when it has not occurred.
- Narrative may make the experience memorable but may not conceal purpose, risk, permissions, or unavailable capabilities.
- Quests and rewards preserve personal value, deterministic completion, meaningful refusal, and optional Fellowship.
- Emergency recall preserves history and evidence rather than deleting the record of what happened.
- A prior known-good release remains available when a new release fails.

## Roles

### Accountable content owner

Owns the record’s purpose, scope, status, and correction path. The owner ensures that the record remains aligned with the core objective and has the required review domains.

### Author

Creates or revises content. An author may use approved AI assistance but remains responsible for accuracy, provenance, licensing, canon alignment, and review readiness.

### Editorial reviewer

Reviews clarity, consistency, grammar, plain-language treatment, pressure, and whether the declared player value is legible.

### Canon reviewer

Reviews characters, locations, chronology, Seven Laws, revelation order, voice, and other frozen lore constraints.

### Specialist reviewer

Reviews the domain named in the content record, such as privacy, safety, clinical accuracy, accessibility, security, research governance, or economic claims.

### Release approver

Confirms that approved revisions, validation evidence, compatibility information, and rollback material are complete before publication.

One person may hold more than one role in the early project. The author must not be the sole approver of material privacy, safety, clinical, security, research, economic, or frozen-canon content.

## Review domains

The baseline domains are:

- editorial
- canon
- privacy
- safety
- clinical
- accessibility
- security
- research-governance
- economic-claims

Each record declares `reviewRequirements`. A named `reviewApproval` satisfies exactly one required domain for one identified revision.

An approval records:

- domain
- reviewer
- review time
- optional notes

An approval does not automatically carry forward after a semantic change.

## Minimum review matrix

| Content kind     | Default review expectations                                                                                                                                      |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Character        | editorial and canon; safety or privacy when authority, persuasion, records, or permissions are discussed                                                         |
| Zone             | editorial and canon; accessibility for required navigation or presentation; privacy when data behavior is explained                                              |
| Scene and choice | editorial and canon; accessibility; privacy or safety when permissions, records, sensitive actions, or pressure are involved                                     |
| Dialogue         | editorial and canon; accessibility for plain-language alternatives; specialist review for health, privacy, research, or economic claims                          |
| Quest            | editorial, canon, safety, and accessibility; privacy when data or permissions are touched; clinical for health claims; economic-claims for compensation language |
| Lesson           | editorial and accessibility; domain specialist review matching the claims and sources                                                                            |
| Notification     | editorial, safety, and accessibility; privacy when the destination or message reveals sensitive context                                                          |

The matrix is a minimum. A content owner may require additional domains.

## Source lifecycle

The source record uses one review state:

```text
draft
  → editorial-review
  → specialist-review
  → approved
  → retired
```

### Draft

The record is incomplete or undergoing author revision. It may fail validation and must not be published.

### Editorial review

The record is structurally complete enough for editorial and canon review. Required specialist domains may still be unresolved.

### Specialist review

Editorial preparation is complete and named specialist reviews are in progress or required.

### Approved

Every required domain has a valid named approval for the current revision. Approval makes the record eligible for inclusion in a release; it does not mean the record is live.

### Retired

The record is no longer eligible for new publication. It remains historically traceable.

## Capability status

Capability status is independent from review state:

- `live`
- `experimental`
- `planned`
- `long-horizon`
- `deferred`

Approved content with a `planned` capability status is still not live. Public language and narrative presentation must preserve this distinction.

## Publication model

Publication is represented by a content release, not by changing an ordinary source-review state to `published`.

A release manifest should identify:

- release ID
- content version
- schema version
- compatible runtime contract, once one exists
- world ID
- included record IDs and revisions
- locales
- source commit
- checksums
- approval evidence
- build time
- release status

Publication tooling remains PROPOSED, but the following rules are BASELINE:

- Published bytes are immutable.
- Environment promotion must not rebuild different bytes under the same release ID.
- Active sessions are not silently rewritten by a later release.
- Publication failure leaves the previous release available.
- Every release has an identified rollback target or explicitly states that none exists.

## Change classification

### Editorial, non-semantic

Examples include spelling, punctuation, formatting, and wording that does not change meaning, burden, reward, eligibility, permission, evidence, or narrative consequence.

Required action:

- increment revision
- editorial review
- retain specialist approvals only when reviewers confirm the meaning is unchanged or policy explicitly permits carry-forward

### Semantic

Changes purpose, meaning, player value, choice consequence, requirement, reward, state transition, capability claim, or narrative interpretation.

Required action:

- increment revision
- rerun all affected review domains
- rerun content validation and tests
- document migration or compatibility impact

### Safety-critical

Changes or corrects content that could affect health interpretation, consent, privacy, security, research participation, compensation, accessibility to essential information, coercion, or crisis handling.

Required action:

- block publication until required specialist review is complete
- assess recall of affected releases
- document scope, severity, and player-facing correction
- preserve incident evidence

### Structural or schema

Changes required fields, identifier meaning, lifecycle, review evidence, or validator behavior.

Required action:

- version the schema
- provide a migration plan
- update canonical examples, validators, tests, and documentation together
- define compatibility and rollback behavior before stable `1.0.0`

## Supersession and replacement

Use the same content ID with a higher `revision` when the record remains the same conceptual entity and is being corrected or improved.

Use a new content ID when the concept, purpose, player contract, or narrative identity materially changes.

`supersedes` and `replacedBy` describe explicit prospective relationships between different content identities. They must not create an untraceable loop.

A replacement review must state:

- why the prior record is insufficient
- whether existing story state remains valid
- whether active releases should remain available
- whether a recall is required
- how links, dependencies, and localizations are updated

## Recall

A recall removes a published release or identified record revision from further distribution because continued use is unsafe, materially misleading, unlawful, corrupted, or constitutionally inconsistent.

Recall does not erase history.

A recall record should identify:

- affected release IDs
- affected content IDs and revisions
- reason and severity
- discovery time
- decision owner
- replacement or rollback target
- player communication requirement
- known exposure window
- follow-up review

For urgent privacy, safety, clinical, or security issues, the maintainer may initiate recall before the full retrospective is complete. The retrospective follows when disclosure is safe.

## Rollback

Rollback restores a previously published known-good release.

Rollback must not silently reverse player actions that already occurred. If content caused durable story, quest, reward, permission, or Chronicle consequences, a separate reconciliation plan is required.

A rollback plan should state:

- target release
- compatibility assumptions
- state reconciliation needs
- cache and distribution invalidation
- communication needs
- validation performed after restoration

## AI-assisted content

AI output is always a proposal.

AI may assist with drafting, alternatives, branch summaries, plain-language variants, broken-reference detection, and review preparation.

AI may not:

- approve content
- satisfy a review domain
- alter frozen canon autonomously
- publish or recall a release
- decide quest completion or reward truth
- hide its material contribution

The `authorship` metadata names responsible human contributors and material AI tools where applicable.

## Pull-request evidence

A content pull request should state:

- player or contributor problem
- connected product loop
- player value
- progress dimension or right affected
- content IDs and revisions changed
- change classification
- review domains required and completed
- privacy, safety, accessibility, canon, AI, research, and economic impact
- validation performed
- publication, replacement, recall, and rollback impact
- remaining uncertainty

## Minimum viable release gate

Content is eligible for publication only when:

- every record targets a supported schema version
- identifiers and references validate
- required review domains have named approvals
- active content contains no retired terminology
- capability status is honest
- scene and quest agency paths are present
- quest completion and rewards are deterministic
- the incentive model does not reward broader consent or unnecessary intimate disclosure
- formatting, policy, content validation, lint, typecheck, tests, and DCO checks pass
- the release has a rollback or recall plan appropriate to its risk

## Exceptions

Exceptions must be documented, narrow, time-bounded, owned, and reviewed.

No exception may waive:

- meaningful refusal
- purpose-specific permission
- private-by-default behavior
- the separation of compensation and game rewards
- deterministic reward and completion authority
- the prohibition on unnecessary intimate-disclosure incentives
- the requirement to distinguish planned capabilities from live ones

## Deferred implementation

The following remain future work:

- release-manifest schema
- signed content releases
- automated approval verification
- localization release coordination
- content-pack compatibility and migration tooling
- administrative recall controls
- distribution cache invalidation

These implementation choices must preserve the lifecycle and invariants defined here.
