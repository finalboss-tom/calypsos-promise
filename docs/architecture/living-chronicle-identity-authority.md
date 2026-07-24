# Living Chronicle Identity and Authority Boundary

**Status:** BASELINE for Sprint 3 workstream 3.1; implementation, legal ownership, delegated control, and recovery mechanisms remain PROPOSED or DEFERRED

## Purpose

This document defines the identities and roles required by the Living Chronicle and the authority that does—or does not—follow from them.

It prevents authentication providers, infrastructure operators, source systems, AI tools, story systems, researchers, funders, or future governance mechanisms from becoming the silent owner of Chronicle truth.

This is an architecture and ontology contract. It does not select an authentication provider, identity-verification service, recovery mechanism, database key type, custody provider, caregiver workflow, legal ownership theory, or anti-Sybil system.

## Governing constraints

The model must preserve:

- useful person-controlled records without secondary-use consent
- private-by-default operation
- correction, export, and deletion rights
- account access separated from Chronicle authority
- AI proposes; a person confirms; deterministic domain logic validates and stores
- no progression or governance weight from intimate disclosure
- replaceable providers and operators
- founder independence and distributed recovery over time
- public contribution using public or synthetic data only

## Initial baseline

Sprint 3 initially models:

- one controlling person
- one Living Chronicle under that person’s control
- one primary human subject representing that person
- zero or more replaceable account-access links
- human and system actors operating under explicit authority
- separate subject, author, recorder, source, confirmer, transformer, and custodian roles

It does not yet authorize shared control, caregiver control, dependent accounts, estate access, institutional chart ownership, or autonomous agent control.

## Identity domains

Identity is not one universal identifier.

### Person

A person is the human whose constitutional rights the product protects.

The model does not require a legal name, email address, phone number, government identifier, provider subject, device account, research participant ID, wallet, public profile, or health attribute to serve as the canonical identity of the Chronicle.

### Chronicle identity

A Chronicle identity is the stable pseudonymous internal identity of one Living Chronicle aggregate.

It must be:

- opaque outside bounded system interfaces
- independent of direct identifiers
- non-public by default
- stable across account-provider changes
- stable across infrastructure and custody-provider changes
- separate from record, subject, source, story, consent, research, and governance identities
- portable without exposing login credentials or provider subjects

Pseudonymous does not mean anonymous. The product must not claim that re-identification is impossible.

### Subject identity

A subject identity identifies who, what, or which context an assertion concerns.

The initial baseline uses the controlling person as the primary human subject, but the concept remains distinct because future assertions may concern a body site, medication, device, environment, event, dependent, or another person mentioned in a source.

Subject identity does not grant control over the Chronicle.

### Account identity

Account identity belongs to authentication and account administration. It is not Chronicle truth and is not the canonical Chronicle key.

### Actor identity

Actor identity records which human or system performed a lifecycle action. Naming an actor does not authorize that actor.

### Source identity

Source identity records the person, artifact, device, service, document, or prior record that supplied a claim or evidence.

### Custody identity

Custody identity records the service, operator, or infrastructure boundary storing bytes or operating infrastructure. Custody does not confer authorship, truth authority, control, permission authority, or ownership.

### External identities

Research, connector, device, story, governance, donor, investor, wallet, token, and treasury identities remain separate bounded domains. They may be mapped where a documented workflow requires it, but they do not become Chronicle identity.

## Identifier conventions

Sprint 3 contracts should use semantic namespaces with opaque payloads, such as:

- `chronicle.<opaque>`
- `subject.<opaque>`
- `actor.<opaque>`
- `source.<opaque>`
- `account-link.<opaque>`

The exact generation algorithm remains an implementation decision.

Identifiers must not encode email, legal name, provider, diagnosis, birth date, location, governance weight, or other sensitive meaning.

## Chronicle control

A Chronicle is the person-controlled aggregate containing canonical records and their source, provenance, lifecycle, correction, export, and deletion relationships.

Person control includes authority to:

- inspect records and provenance
- propose and confirm records
- correct or supersede records
- request export
- request deletion
- review bounded access through the appropriate permission and receipt domains
- refuse secondary use without losing core Chronicle utility

Person control does not imply:

- infrastructure custody
- access by every account associated with the person
- legal title to every third-party source document
- authority over another person’s record
- authority to alter separately governed audit or receipt evidence
- authority to convert disclosure into game or governance power

## Account-access links

An account-access link relates an authenticated account boundary to a Chronicle.

It should record:

- stable link identity
- Chronicle identity
- protected account-boundary reference
- link status
- creation, rotation, suspension, and removal evidence
- capability or authority-profile reference
- responsible actor and time

Provider-specific subjects remain inside the account boundary or a protected mapping. They should not be copied into every Chronicle record.

Changing authentication providers or rotating credentials must not require changing Chronicle identity, rewriting records, changing subjects, breaking provenance, losing export or deletion history, or invalidating correction chains.

## Actors and record roles

Proposed actor classes include:

- controlling person
- account-bound human
- future delegated human
- deterministic domain service
- connector or import process
- source-system adapter
- AI drafting tool
- operator with a bounded administrative capability
- migration or repair process

Every material lifecycle action should preserve actor identity or a safely bounded reference, actor class, action, authority basis, time, reason when required, and related confirmation or lifecycle evidence.

Record roles remain distinct:

- **Subject:** the entity the assertion is about.
- **Author:** composed the original statement or document.
- **Recorder:** entered, captured, imported, or transcribed the assertion.
- **Source:** supplied the evidence or claim.
- **Confirmer:** accepted a proposal as canonical after domain validation.
- **Transformer:** parsed, normalized, converted, aggregated, or derived a representation.
- **Custodian:** stores bytes or operates infrastructure.

One actor may hold several roles, but roles must be stated rather than inferred.

## Authority boundaries

Authority is action-specific and must not be inferred from technical access.

### Controlling person

May propose, confirm, correct, supersede, export, and request deletion. Permission changes occur through the Consent domain. Health detail does not create game or governance authority.

### Account boundary

May authenticate and route a request. It has no independent truth, correction, deletion, or permission authority.

### AI drafting tool

May create a `proposed` draft, ask clarifying questions, and explain provenance. It may not confirm, directly store, correct, delete, change permissions, export autonomously, or create progression or governance power.

### Connector or import process

May introduce source claims or proposed records. Successful import does not make a claim confirmed.

### Deterministic domain service

May validate and store authorized actions, apply valid lifecycle transitions, and generate authorized exports. It does not possess human confirmation authority.

### Infrastructure custodian

May execute authorized storage operations. Custody provides no discretionary record authority.

### Maintainer or operator

May act only through a documented, bounded, audited administrative capability. Founder or maintainer status grants no ordinary Chronicle truth authority.

### Research or public-good system

May receive only a separately authorized representation. It has no canonical-write, confirmation, correction, or deletion authority.

### Story, quest, or progression system

May apply its own deterministic product state. It may not create or copy Chronicle truth, and health detail may not increase reward.

### Future governance system

A vote cannot confirm, correct, expose, delete, or transfer another person’s Chronicle. Capital and disclosure cannot purchase Chronicle authority.

## Confirmation boundary

A proposed assertion becomes confirmed only when:

1. the proposal and its source or author context are visible enough for meaningful review;
2. the controlling person, or a future explicitly authorized human authority, confirms it;
3. deterministic domain validation accepts the record; and
4. confirmation evidence is recorded.

Model confidence, import success, source prestige, operator preference, quest completion, research usefulness, or governance vote cannot replace confirmation.

## Control, custody, and ownership language

Use these terms precisely:

- **Control:** product-recognized authority over Chronicle use, correction, export, and deletion.
- **Custody:** technical possession or operation of bytes and infrastructure.
- **Authorship:** responsibility for composing a statement or artifact.
- **Source authority:** evidence that a source made a claim, not proof that the claim is correct.
- **Legal ownership:** jurisdiction-dependent and unresolved; Sprint 3 makes no universal legal claim.

Documentation should prefer precise control and custody language over unsupported claims that one actor “owns all data” in every legal sense.

## Administrative authority

An administrative capability must identify its allowed action, purpose, affected scope, responsible role, approval or break-glass basis, expiration, audit evidence, person-visible evidence where safe, and review and revocation behavior.

Administrative access does not grant truth authority. An operator may repair a broken reference under a documented process but cannot silently alter a person’s asserted history, permission, or rights.

## Identity lifecycle

### Account-link rotation

Links may be added, rotated, suspended, or removed without rewriting Chronicle identity or record history.

### Chronicle stability

Chronicle identity remains stable through ordinary authentication, provider, operator, and storage changes.

### Merge and split

Automatic Chronicle merge or split is prohibited in the initial baseline.

Future design must preserve each original Chronicle, provenance, person confirmation, reversibility where possible, subject relationships, export and deletion effects, conflict handling, and protection against account-takeover amplification.

### Transfer of control

Caregiver, estate, delegate, successor, and emergency control are deferred. Future design must define capacity, scope, evidence, duration, review, appeal, removal, emergency behavior, and restoration of direct control.

### Account deletion versus Chronicle deletion

Removing a login and deleting a Chronicle are different operations. Loss of one account cannot be treated as proof that the person intended Chronicle erasure.

## Multi-person scenarios

The initial baseline deliberately does not solve caregiver or guardian control, minors, shared family records, clinician-operated charts, delegated capture, estates, emergency access, incapacity, or contested control.

Future work must not assume that account user, subject, legal representative, source author, and controlling authority are always the same person.

## Privacy and anti-correlation

The model should:

- keep direct identifiers out of canonical IDs
- keep provider subjects out of portable record payloads
- avoid one public identifier across unrelated domains
- avoid health attributes as identity proof
- preserve core Chronicle rights without governance identity
- avoid claiming pseudonymity is anonymity
- preserve enough protected mapping evidence for correction, export, and recovery without creating an unrestricted global identity graph

Identity proofing and anti-Sybil mechanisms remain deferred.

## Founder independence and provider replacement

A compliant implementation must be able to replace authentication, storage, hosting, AI, connector, operator, maintainer, and founding-steward dependencies without redefining Chronicle identity or transferring truth authority.

Recovery must eventually be exercisable by legitimate successor roles rather than depend on founder knowledge or credentials.

## Initial validation invariants

Sprint 3 contracts and validators should eventually enforce:

- Chronicle IDs are opaque and namespaced
- Chronicle IDs do not equal account-provider subjects
- account links reference a Chronicle rather than define it
- every canonical record identifies one Chronicle and one subject
- actor role and authority basis are distinct
- AI, connectors, and imports cannot produce `confirmed` records without human confirmation evidence
- custody identity cannot become controlling identity merely because it stores data
- account-link removal does not imply Chronicle deletion
- story, quest, progression, research, and governance IDs cannot substitute for Chronicle or subject IDs
- public fixtures use synthetic identity values and no direct real-person identifiers

Privacy, legal, security, caregiver, and identity-proofing questions requiring specialist review must remain explicit rather than being smuggled into validators.

## Workstream 3.1 acceptance

The architecture baseline is satisfied when:

- a Chronicle uses a stable pseudonymous key without requiring email, legal name, provider subject, wallet, or public identity;
- account and subject identities cannot be supplied interchangeably;
- authorship, recording, sourcing, confirmation, transformation, custody, and control remain distinct;
- infrastructure custody provides no Chronicle truth authority;
- core rights do not depend on payment, contribution, governance participation, secondary-use permission, or disclosure volume;
- multi-person and delegated-control risks remain explicit; and
- provider and founder replacement do not require rewriting Chronicle identities or records.

## Deferred decisions

- authentication and identity providers
- exact opaque-ID algorithm
- account recovery and identity proofing
- delegated, caregiver, dependent, estate, and emergency control
- legal ownership terminology by jurisdiction
- support and break-glass implementation
- public or private identifier presentation
- identity federation
- anti-Sybil and governance identity
- production authorization policy and receipt formats
