# Living Chronicle Correction, Conflict, Duplicate, and Supersession Model

**Status:** BASELINE for Sprint 3 workstream 3.6; runtime workflows, specialist policy, retention law, database transactions, and operational review interfaces remain PROPOSED or DEFERRED

## Purpose

This document defines how the Living Chronicle changes its understanding of a claim without silently rewriting history.

It covers:

- correction
- amendment
- supersession
- retraction
- invalidation
- conflict
- duplicate detection
- merge and unmerge
- preferred presentation
- dependency and derivation effects

It exists to prevent convenient implementation shortcuts from erasing source disagreement, hiding who changed a record, treating duplicate detection as deletion, or allowing an AI model, connector, operator, quest, or governance body to revise a person-controlled Chronicle without explicit authority and provenance.

This is an architecture and ontology contract. It does not select a database, event store, conflict-resolution algorithm, duplicate-detection model, user-interface pattern, retention policy, legal rule, clinical adjudication process, or synchronization protocol.

## Governing constraints

The model must preserve:

- person control over Chronicle truth
- inspectable source truth and provenance
- explicit separation between authority state and lifecycle state
- correction without silent mutation of historical evidence
- coexistence of validly sourced conflicting claims
- reversible duplicate and merge decisions where technically possible
- deterministic invalidation and derivation effects
- clear distinction between presentation preference and truth authority
- export of correction, conflict, duplicate, and supersession history
- deletion semantics that do not silently masquerade as correction
- provider, connector, operator, and founder replaceability
- no requirement for research, commerce, governance participation, payment, or broader consent to correct or inspect a record
- no progression or governance advantage for accepting a suggested correction, disclosing more detail, or resolving a conflict
- public or synthetic data only in contributor fixtures

## Core principle

> The current preferred view may change. The historical evidence must not disappear merely because the preferred view changed.

A Chronicle may present one record as current, preferred, or resolved while preserving:

- the prior record
- the source versions
- the relationship that changed presentation
- the responsible actor
- the stated reason
- the effective time
- any affected derived records
- any later reversal

The model distinguishes correction from deletion. A corrected record is not the same as an erased record, and deletion is not a shortcut for resolving disagreement.

## Relationship-first change model

Sprint 3 treats material record changes as explicit relationships or decisions rather than in-place edits that destroy prior meaning.

A relationship conceptually records:

- `id`
- `schemaVersion`
- `revision`
- `relationshipType`
- `sourceRecordIds`
- `targetRecordIds`
- `actorId`
- `recordedAt`
- optional `effectiveAt`
- `reasonCode`
- optional `reasonText`
- optional `sourceReferenceIds`
- optional `decisionMethodId`
- optional `decisionMethodVersion`
- optional `reviewState`
- optional `reversesRelationshipId`
- creation and update metadata

The exact contract shape remains later Sprint 3 work. The required principle is that the relationship is independently addressable, provenance-bearing, inspectable, and exportable.

## Terms and boundaries

### Revision

A revision is a new representation of the same conceptual record identity when the change does not replace the underlying assertion with a materially different claim.

Candidate revision examples:

- adding an omitted source locator
- correcting a display label
- adding a previously unavailable recorder reference
- fixing non-semantic metadata

A revision must not be used to conceal a material change to value, time, subject, assertion class, variable, authority, or provenance.

Material changes require a correction, amendment, supersession, retraction, or other explicit relationship.

### Amendment

An amendment adds or clarifies information without asserting that the prior record was wrong.

Examples:

- adding context to a reflection
- adding a body-site qualifier that was not previously recorded
- adding a source discovered later
- adding a more precise time while preserving the earlier uncertainty claim

An amendment must preserve the prior record and state whether the new information changes interpretation or only enriches context.

### Correction

A correction asserts that some material part of a prior Chronicle record should no longer be used as the current representation because it was wrong, misparsed, misnormalized, incomplete in a material way, or later revised by an authorized human.

Examples:

- `180 lb` was entered as `180 kg`
- a date was parsed in the wrong locale
- a person corrects a remembered year
- an extracted laboratory value came from the wrong table row
- a unit conversion used the wrong source unit

A correction must identify:

- the record being corrected
- the corrected successor or replacement record
- what field or semantic component changed
- why it changed
- the correcting actor
- the correction time
- whether source truth, parsing, mapping, normalization, or human recollection was wrong
- effects on dependent records

A correction does not automatically erase the corrected record or its source.

### Supersession

Supersession identifies a newer record that replaces a prior record for current use while the prior record remains historically valid and inspectable.

Examples:

- a current medication-use interval supersedes an earlier open interval
- a newer goal supersedes a prior goal
- a corrected variable definition supersedes an earlier project definition
- a later summary supersedes an earlier summary without declaring the earlier summary false at its original time

Supersession is not necessarily an error judgment. The prior record may have been correct for its original context.

### Retraction

Retraction is an explicit withdrawal of a claim by an authorized human or responsible authority because it should no longer be represented as reliable Chronicle truth.

Examples:

- a person withdraws a recollection they no longer believe
- an operator retracts an import after discovering the payload belonged to the wrong account
- a specialist-supported process retracts an unsafe or materially misleading inference

Retraction requires:

- a responsible actor
- a reason
- the retraction time
- the affected record
- an indication of whether the source remains retained, deleted, or unavailable
- dependency evaluation

Retraction does not mean the historical fact that the claim once existed is denied.

### Invalidation

Invalidation is a deterministic or policy-governed conclusion that a record cannot be used for a specified purpose because it violates an objective contract or no longer has valid dependencies.

Examples:

- a derived record references a deleted required input
- a quantity uses a unit incompatible with the variable dimension
- a record fails the schema version required by a declared workflow
- a transformation method was withdrawn and its outputs must be recomputed
- a source version fails an integrity check

Invalidation must identify:

- the invalidated record
- the rule or policy identifier
- the rule version
- the triggering evidence
- the invalidation time
- the affected purpose or scope
- whether recomputation or replacement is possible

Invalidation is not a clinical truth judgment unless an explicit specialist-governed policy says so.

### Conflict

Conflict represents disagreement among two or more validly sourced assertions.

Conflict is not permission to discard one side.

Examples:

- two devices report different step totals for the same period
- a person’s recollection differs from a document date
- two imported records disagree about a medication dose
- a normalized value differs because source units are ambiguous
- two source documents report different results

A conflict relationship may record:

- participating record IDs
- conflict type
- detection method and version
- relevant temporal overlap
- relevant variable or concept
- review state
- optional preferred presentation
- preference reason
- responsible actor
- resolution or non-resolution status
- reversal history

### Duplicate candidate

A duplicate candidate states that two or more records may represent the same underlying assertion or source event.

A duplicate candidate is not a confirmed duplicate and must not hide, merge, delete, or suppress records automatically.

Candidate detection may be based on:

- source identifier similarity
- matching variable, value, and time
- matching document locators
- connector replay evidence
- identical integrity digests
- deterministic import identifiers
- probabilistic similarity

The detection method and confidence are provenance, not authority.

### Confirmed duplicate

A confirmed duplicate relationship records an explicit decision that two or more records represent the same claim for a declared purpose.

Confirmation must preserve:

- all source chains
- all source versions and locators
- all record identities
- the confirmation actor
- the decision method
- the reason
- the selected preferred record, if any
- any unique metadata retained from each record
- reversal behavior

Confirmed duplication does not require physical data merging.

### Merge

A merge creates a composite or preferred representation from records judged sufficiently equivalent or complementary under a declared merge policy.

Merge must not mean destructive overwrite.

A merge decision conceptually identifies:

- input record IDs
- output or preferred record ID
- merge policy identifier and version
- fields or evidence retained from each input
- fields that remained unresolved
- actor and decision time
- duplicate relationship references
- conflict relationship references
- dependency effects
- reversibility information

The merged representation may be a presentation construct, a new canonical record, or a governed relationship. The contract must state which.

### Unmerge

Unmerge reverses a prior merge decision when the records should again be treated independently.

Unmerge must preserve:

- the prior merge relationship
- the reason for reversal
- the responsible actor
- the reversal time
- restored preferred-presentation behavior
- affected derived records and exports

Unmerge must not require reconstructing provenance from lossy merged data. Therefore a merge cannot discard unique source chains.

### Preferred presentation

Preferred presentation chooses which record or representation should appear by default in a view.

Preference is not equivalent to:

- declaring other records false
- deleting other records
- retracting other records
- resolving every conflict
- granting clinical authority
- changing source truth

A preference decision conceptually records:

- the preferred record ID
- the alternative record IDs
- the presentation scope
- the reason
- the responsible actor or deterministic policy
- the policy version
- the effective period
- appeal or reversal behavior

## Correction decision matrix

| Situation | Required representation | What remains visible |
| --- | --- | --- |
| Typographical metadata fix with no semantic effect | revision | prior revision according to version policy |
| Added context that does not make the prior claim wrong | amendment | prior record, amendment relationship, new context |
| Wrong value, unit, time, subject, or mapping | correction | prior record, successor, reason, actor, provenance |
| Newer state replaces an older still-valid state | supersession | both records and supersession relationship |
| Claim withdrawn as unreliable | retraction | prior claim existence, retraction reason, source state |
| Contract rule makes record unusable | invalidation | record, rule, scope, trigger, recomputation status |
| Valid sources disagree | conflict | all participating records and source chains |
| Records may represent the same claim | duplicate candidate | all records and detection evidence |
| Human or governed process confirms sameness | confirmed duplicate | all records, decision, preference, reversibility |
| Composite representation is created | merge | all inputs, merge policy, output, unresolved differences |
| Merge decision is reversed | unmerge | original records, merge and unmerge history |
| One record is shown by default | preferred presentation | alternatives, reason, scope, reversal path |
| Person requests erasure | deletion lifecycle | deletion request, scope, processing, exceptions, evidence |

## Correction types

A correction should classify the source of error. Candidate correction types include:

- `source-error` — the original source itself was wrong
- `recording-error` — a human or system recorded the source incorrectly
- `parsing-error` — source representation was parsed incorrectly
- `mapping-error` — source field or code mapped to the wrong internal concept
- `unit-error` — unit was missing, misidentified, or incompatible
- `normalization-error` — deterministic conversion or normalization was wrong
- `temporal-error` — date, time, offset, zone, interval, or approximation was wrong
- `subject-error` — record was linked to the wrong subject
- `chronicle-error` — record was linked to the wrong Chronicle
- `provenance-error` — source, locator, actor, or transformation chain was wrong
- `recollection-revision` — a person changes a retrospective recollection
- `classification-error` — assertion or record family was misclassified
- `other-documented` — a specific reason outside the initial allowlist

The type describes the change mechanism. It does not assign blame or moral judgment.

## Actor and authority rules

### Controlling person

The controlling person may:

- propose corrections
- confirm corrections affecting their Chronicle
- retract their own self-reports, recollections, reflections, or goals
- dispute imported or derived claims
- select a preferred presentation where the domain contract permits
- request duplicate review
- request merge reversal

The controlling person’s authority does not convert a source document into saying something it did not say. Source truth remains preserved even when the person rejects its use as Chronicle truth.

### Connector or import process

A connector or import process may:

- report a source replacement
- report replay or duplicate evidence
- report source-system deletion or correction
- propose a mapping correction
- trigger deterministic validation

A connector may not independently confirm a material Chronicle correction, destructive merge, retraction, or deletion.

### Deterministic domain service

A deterministic service may:

- validate objective contract rules
- create invalidation proposals or decisions within a declared policy
- recompute derived records
- detect exact duplicates under a declared rule
- identify affected dependencies

It may not infer human intent or resolve ambiguous source conflict without an explicit policy and required human review.

### AI tool

An AI tool may:

- propose a correction
- explain why records may conflict
- identify possible duplicate candidates
- draft a human-readable comparison
- suggest source locations to inspect

An AI tool may not:

- confirm a correction
- retract a canonical record
- resolve a conflict
- merge records destructively
- choose a preferred record as authoritative
- erase a source or Chronicle record
- invent a reason or reviewer

Model confidence is never correction authority.

### Operator or maintainer

An operator may act only under an explicit administrative capability and must preserve:

- actor identity
- reason
- scope
- incident or request reference
- affected-person notice where appropriate
- appeal or correction path
- least-privilege access

Routine operator convenience is not authority to revise Chronicle truth.

### Research, commercial, and governance systems

These systems may not correct, retract, merge, prefer, or delete a person’s Chronicle record merely because the record affects:

- study eligibility
- compensation
- marketplace value
- reporting convenience
- governance weight
- institutional reputation
- funding outcomes

They may submit a bounded dispute or correction proposal through the same accountable process available to other legitimate sources.

## Source truth versus Chronicle truth during correction

A source artifact and its source version preserve what the source asserted.

When the Chronicle corrects an imported claim:

- the source version remains evidence of the original assertion
- the Chronicle record may be corrected, superseded, retracted, or invalidated
- the relationship states why Chronicle use changed
- the source is not rewritten to match the corrected Chronicle record

When the source itself later issues a correction:

- the corrected source becomes a new source version or new source artifact according to source semantics
- the old source version remains immutable evidence unless deletion rules apply
- a new Chronicle proposal may reference the corrected source
- the prior Chronicle record is related through correction or supersession

## Dependency effects

A material record change may affect:

- normalized records
- derived records
- associations
- inferences
- summaries
- exports
- bounded quest facts
- notifications
- cached read models
- search or vector indexes

The canonical model must identify affected dependents without allowing those dependent systems to become Chronicle authority.

### Derived-record dependency states

Candidate dependency states include:

- `current` — all required inputs remain valid for the declared method
- `recompute-required` — one or more inputs changed and deterministic recomputation is possible
- `recomputation-pending` — recomputation has been requested but not completed
- `superseded-by-recalculation` — a new derived record replaces the prior output
- `invalidated-input-missing` — a required input was deleted or became unavailable
- `invalidated-method-withdrawn` — the declared method may no longer be used
- `invalidated-contract-failure` — the output violates a required contract
- `unresolved` — the effect cannot be determined automatically

A derived record cannot remain represented as current when a required input is corrected, deleted, or invalidated unless a declared policy proves the change is irrelevant to the output.

### Association and inference effects

Associations and inferences may require:

- recomputation
- reclassification
- uncertainty increase
- withdrawal from presentation
- specialist review
- invalidation

An inference must never be silently edited to conceal that its evidence changed.

## Conflict semantics

### Conflict types

Candidate conflict types include:

- `value-disagreement`
- `unit-disagreement`
- `category-disagreement`
- `temporal-disagreement`
- `subject-disagreement`
- `source-identity-disagreement`
- `provenance-disagreement`
- `duplicate-disagreement`
- `classification-disagreement`
- `scope-disagreement`
- `method-disagreement`
- `other-documented`

### Conflict states

Candidate conflict states include:

- `detected`
- `under-review`
- `acknowledged-unresolved`
- `presentation-preference-set`
- `resolved-by-correction`
- `resolved-by-supersession`
- `resolved-as-non-conflict`
- `closed-after-deletion`

A conflict may remain acknowledged and unresolved indefinitely. The model must not force a false resolution.

### Conflict resolution

A conflict resolution identifies:

- participating records
- resolution type
- responsible actor
- evidence reviewed
- reason
- time
- whether any record was corrected, retracted, invalidated, or merely deprioritized
- whether the resolution is reversible

A resolution may determine that both records remain valid because they describe different methods, contexts, temporal scopes, or subjects.

## Duplicate semantics

### Exact duplicate

An exact duplicate may be deterministically established when a declared rule proves the records represent the same source assertion and no unique provenance would be lost.

Examples may include:

- identical stable source event identity under the same connector contract
- identical source version and locator imported twice
- identical deterministic record identity generated from the same immutable inputs under the same method version

Even exact duplicates preserve import and capture history where it matters for audit or explanation.

### Probable duplicate

A probable duplicate is a candidate requiring review.

Similarity may consider:

- variable
- value
- unit
- temporal overlap
- subject
- source
- method
- location
- free-text similarity

Probabilistic similarity does not authorize automatic merge or deletion.

### Duplicate group

A duplicate group may collect multiple records that are candidates or confirmed duplicates.

A group records:

- member records
- group state
- detection evidence
- confirmation decisions
- preferred record
- merge relationships
- reversal history

Membership must remain explainable and exportable.

## Merge semantics

### Safe merge requirements

A merge is permitted only when:

- every input record remains identifiable
- every source and provenance chain remains reachable
- unique information is preserved
- unresolved conflicts are represented explicitly
- the output contract is declared
- the decision actor and reason are recorded
- unmerge behavior is defined
- affected dependents are evaluated
- deletion scope remains distinguishable for each input

### Prohibited merge behavior

A merge must not:

- overwrite source truth
- discard unique provenance
- fabricate precision
- choose a clinical interpretation without required review
- combine different subjects
- combine records solely because they improve a metric or quest outcome
- combine records to increase research value, compensation, progression, or governance weight
- hide a data-quality problem
- make later deletion impossible to scope

### Merge output forms

The later contract may select one or more of these forms:

1. **Presentation-only merge** — a view composes records but creates no new canonical claim.
2. **Composite canonical record** — a new record references all inputs and declares merge semantics.
3. **Preferred-record merge** — one record is preferred while other records remain independently canonical.
4. **Source-artifact merge** — source containers are grouped without merging Chronicle claims.

The form must be explicit. Implementations may not treat all forms as equivalent.

## Supersession chains

A supersession chain must be:

- acyclic
- inspectable
- exportable
- consistent with record family and variable semantics
- explicit about current preferred record

A record may have multiple successors only when the relationship states whether the successors represent:

- branching corrections
- different scopes
- different subjects
- competing proposals
- unresolved alternatives

A single linear “latest record” pointer is insufficient when history branches.

## Retraction and invalidation boundaries

Retraction and invalidation differ:

- retraction is an accountable withdrawal of a claim
- invalidation is a rule-governed conclusion about contract or purpose usability

A retracted record may still be valid source evidence that a person once made the claim.

An invalidated record may still be historically accurate but unusable for a specific calculation or workflow.

Neither term is a synonym for deletion.

## Interaction with deletion

Deletion may affect correction and conflict history, but deletion must remain a separate lifecycle.

The model must distinguish:

- deletion of a source artifact
- deletion of one source version
- deletion of a Chronicle record
- deletion of a correction reason containing sensitive text
- deletion of a relationship
- deletion of a derived output
- retention of a minimal non-sensitive tombstone

A tombstone may preserve only what is necessary for:

- referential integrity
- proof that a deletion was processed
- prevention of accidental resurrection
- explanation that a dependency is unavailable

The minimum tombstone content remains specialist and implementation work. It must not silently retain sensitive values, source text, intimate reason details, or provider identifiers.

## Export requirements

A machine-readable export must be able to represent:

- current records
- prior records
- revisions
- amendments
- corrections
- supersession chains
- retractions
- invalidations
- conflicts
- duplicate candidates
- confirmed duplicates
- merge and unmerge decisions
- preferred-presentation decisions
- dependency states
- deletion-related omissions and reasons

A human-readable export should explain current presentation without hiding unresolved conflict or historical change.

An export must not imply that a preferred record is the only record that ever existed.

## Quest, progression, and notification boundaries

Story, quest, progression, and notification systems may consume bounded facts such as:

- a requirement remains satisfied
- a previously satisfied requirement is under review
- a derived fact is invalidated
- a person-facing review is available

They must not:

- pressure a person to accept a correction
- remove rewards as punishment for exercising correction or deletion rights
- grant extra rewards for resolving a conflict through more intimate disclosure
- treat duplicate volume as contribution
- convert record acceptance into governance authority
- copy sensitive conflict details into product-state storage

A previously applied deterministic reward may require its own governed compensation or correction rule, but the Chronicle correction model does not silently mutate progression balances.

## AI boundaries

AI may assist with explanation and proposal, but every AI-assisted change must preserve:

- model or tool identity
- model or tool version where available
- prompt or task class where policy permits
- source inputs
- generated proposal
- confidence or uncertainty
- human acceptance or rejection

AI-generated duplicate or conflict suggestions remain proposals.

AI must not optimize toward:

- increased disclosure
- increased record volume
- increased research eligibility
- quest completion
- governance influence
- reduced deletion
- institutional reputation

## Governance and institutional constraints

The correction model supports founder independence by ensuring no founder, maintainer, provider, or proprietary interface is required to understand or repair history.

The following are prohibited:

- founder-only correction keys
- provider-only record identity
- undocumented administrative mutation
- private, non-exportable conflict decisions
- capital-purchased authority over another person’s correction
- governance votes that override correction, export, deletion, privacy, or safety rights
- contributor reputation that grants unrestricted Chronicle-edit authority
- automatic preference for institutionally convenient records

Any delegated correction authority must be bounded, reviewable, revocable, and represented independently from Chronicle ownership.

## Minimum validation invariants

Later deterministic validation should enforce at least:

1. A material correction references both prior and successor records.
2. A correction identifies an actor, time, and reason.
3. A correction cannot reference the same record as both prior and successor.
4. Supersession chains are acyclic.
5. A retraction identifies the responsible actor and reason.
6. An invalidation identifies a rule or policy and version.
7. A conflict references at least two distinct records.
8. A duplicate candidate cannot suppress or delete records by itself.
9. A confirmed duplicate decision preserves every member record reference.
10. A merge references all inputs and a declared merge policy.
11. An unmerge references the merge it reverses.
12. A preferred-presentation decision identifies its scope and alternatives.
13. Derived records affected by changed required inputs cannot remain silently current.
14. AI actors cannot be recorded as the sole confirming authority.
15. Quest, progression, research, or governance systems cannot be recorded as Chronicle correction owners.
16. Deleted or unavailable dependencies produce explicit dependency state.
17. Relationship identifiers and record references use the approved dotted grammar.
18. Public fixtures declare public or synthetic classification.

## Required synthetic scenarios

Sprint 3 fixtures should later cover:

### Manual unit correction

A person records `180 kg`, then corrects the source unit to `lb`. The original manual source assertion remains inspectable, the corrected Chronicle record becomes preferred, and normalized derivatives are recomputed.

### Date-locale correction

A source date `03/04/2025` was parsed using the wrong locale. The correction preserves source text, parser version, prior normalized date, replacement date, and affected records.

### Recollection revision

A person changes “around 2019” to “around spring 2020.” Both approximate assertions and the correction reason remain represented without fabricated exact dates.

### Conflicting device values

Two devices report different step totals for the same period. Both records remain confirmed with separate provenance. A conflict is acknowledged without deleting either value.

### Imported medication disagreement

A service export and a document report different dose values. The model records a conflict and later a presentation preference without claiming the alternative source is false.

### Connector replay duplicate

A connector imports the same immutable source event twice. An exact duplicate is confirmed, one record is preferred, and both capture events remain inspectable.

### Probable duplicate rejected

Two similar observations are flagged as probable duplicates but later determined to be separate events. The candidate relationship is closed as non-duplicate without altering either record.

### Merge and unmerge

Two complementary records are merged into a composite presentation. Later review reveals different subjects, so the merge is reversed and dependent outputs are reevaluated.

### Derived-record invalidation

A normalized or aggregated record loses a required input after correction or deletion. It becomes recompute-required or invalidated rather than remaining silently current.

### Retraction

A person retracts a self-reported claim. The retraction is visible, the prior claim is no longer current, and the source history remains subject to separate deletion rules.

### Method withdrawal

A deterministic normalization method is withdrawn. Outputs identify the method version, become invalidated or recompute-required, and replacement outputs preserve the prior derivation chain.

### Deletion with tombstone

A deleted source and record leave only the minimum non-sensitive dependency marker needed to prevent accidental resurrection and explain why a derivative is unavailable.

## Questions requiring later specialist or implementation review

The architecture baseline does not settle:

1. Which correction actions require privacy, clinical, legal, accessibility, or research-governance review?
2. Which source and correction metadata may remain after deletion?
3. When may an operator correct a wrong-Chronicle import without prior person confirmation?
4. Which duplicate rules are safe for automatic confirmation?
5. Which merge forms should exist in the first TypeScript contract?
6. How should concurrent offline corrections be represented?
7. How should corrections synchronize across independently operated instances?
8. Which derived records require automatic recomputation versus explicit review?
9. How should a retracted inference remain visible without causing continuing harm?
10. Which preferred-presentation decisions may be made deterministically?
11. What appeal and audit process is required for administrative corrections?
12. What minimal tombstone fields are necessary and privacy-preserving?
13. How should external standard amendments map into internal correction relationships?
14. How are export consumers told that a relationship was reversed after an earlier export?
15. How should correction history be localized and explained accessibly?

These questions remain explicit hold points. No database trigger, UI shortcut, model prompt, or connector rule may silently answer them.

## Workstream 3.6 acceptance

Workstream 3.6 is complete at the architecture-baseline level when:

- correction, amendment, supersession, retraction, and invalidation are distinct
- conflict does not erase validly sourced disagreement
- duplicate candidates do not authorize automatic deletion or merge
- confirmed duplicates preserve all source and record identities
- merge behavior preserves provenance and supports reversal
- preferred presentation is separated from truth authority
- changed inputs produce explicit dependent-record effects
- deletion remains a separate lifecycle
- exports can represent the full change history
- AI, connectors, operators, research, quests, progression, capital, and governance cannot independently revise Chronicle truth
- unresolved specialist and implementation questions remain explicit
