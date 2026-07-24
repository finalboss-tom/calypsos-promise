# Living Chronicle Identity and Authority Boundary

**Status:** BASELINE for Sprint 3 workstream 3.1; implementation, legal ownership, delegated control, and recovery mechanisms remain PROPOSED or DEFERRED

## Purpose

This document defines who and what may be identified in the Living Chronicle model, which roles those identities may hold, and which authority follows from each role.

It exists to prevent authentication providers, infrastructure operators, source systems, AI tools, story systems, research systems, or future governance mechanisms from becoming the silent owner of Chronicle truth.

This is an architecture and ontology contract. It does not select an authentication provider, identity-verification service, account-recovery mechanism, legal ownership theory, database key type, custody provider, caregiver workflow, or anti-Sybil system.

## Governing constraints

The identity model must preserve:

- a useful person-controlled Chronicle without secondary-use consent
- private-by-default operation
- correction, export, and deletion rights
- separation between account access and Chronicle authority
- AI proposes; a person confirms; deterministic domain logic validates and stores
- no progression or governance weight from intimate disclosure
- provider and operator replaceability
- founder independence and distributed recovery over time
- public contribution using public or synthetic data only

## Initial baseline

The initial Sprint 3 baseline models:

- one controlling person
- one Living Chronicle under that person’s control
- one primary human subject representing that person
- zero or more replaceable account-access links
- records created by human or system actors under explicit authority
- source, author, recorder, confirmer, transformer, and custodian roles as separate facts

The baseline does not yet authorize shared control, caregiver control, dependent accounts, estate access, institutional chart ownership, or autonomous agent control.

## Identity domains

Identity is not one universal identifier. Each domain answers a different question.

| Domain | Question answered | May become the Chronicle key? |
| --- | --- | --- |
| Person | Which human has constitutional control rights? | No public or provider identity is required |
| Chronicle identity | Which person-controlled Chronicle aggregate is being addressed? | Yes; this is the stable internal aggregate identity |
| Subject identity | Who, what, or which context is an assertion about? | No; subject and Chronicle are not interchangeable |
| Account identity | Which authenticated account may attempt an action? | No; providers and account links must be replaceable |
| Actor identity | Who or what performed a lifecycle action? | No; actors require separate authorization |
| Source identity | Which person, artifact, device, service, or document supplied a claim? | No; a source does not own resulting Chronicle truth |
| Custody identity | Which operator or system stores bytes or operates infrastructure? | No; custody does not confer control or authority |
| External participant identity | Which research, connector, governance, wallet, or external-system identity is involved? | No; external identities remain bounded mappings |

## Person

A person is a human being whose rights are protected by the Product Constitution.

The model does not require the person to expose or use as a canonical identifier:

- a legal name
- email address
- phone number
- government identifier
- authentication-provider subject
- device account
- research participant ID
- wallet or token address
- public profile
- health condition or intimate attribute

A person may use one or more accounts over time without changing the identity of their Chronicle.

## Chronicle identity

A Chronicle identity is the stable pseudonymous internal identity of one Living Chronicle aggregate.

Required properties:

- opaque outside bounded system interfaces
- not derived from direct identifiers
- not meaningful as a public identity
- stable across account-provider replacement
- stable across infrastructure or custody-provider replacement
- separate from record, subject, source, story, consent, research, and governance identities
- exportable as part of the open canonical representation without exposing login credentials or provider subjects

A Chronicle identity is pseudonymous, not anonymous. The system must not claim that separation from direct identifiers makes re-identification impossible.

### Identifier convention

Sprint 3 contracts should use semantic namespaces with opaque payloads, for example:

- `chronicle.<opaque>`
- `subject.<opaque>`
- `actor.<opaque>`
- `source.<opaque>`
- `account-link.<opaque>`

The exact opaque-ID generation algorithm remains an implementation decision. The identifier must not encode email, legal name, provider, diagnosis, birth date, location, governance weight, or other sensitive meaning.

## Chronicle

A Chronicle is the person-controlled aggregate that contains canonical Chronicle records and their source, provenance, lifecycle, correction, export, and deletion relationships.

Control of a Chronicle means the product recognizes the person’s authority to:

- inspect records and provenance
- propose and confirm records
- correct or supersede records
- request export
- request deletion
- review bounded access and permission information through the appropriate domain
- refuse secondary use without losing core Chronicle utility

Control does not mean:

- infrastructure custody
- unrestricted access by every account associated with the person
- legal title to every source document supplied by another party
- authority over another person’s record
- authority to alter audit or receipt evidence outside its governing domain
- authority to convert health disclosure into game or governance power

## Subject identity

A subject identity identifies who, what, or which context an assertion is about.

The initial baseline requires one primary human subject corresponding to the controlling person, but the separate concept prevents hidden assumptions when later records concern:

- a body site
- medication, food, device, or environmental object
- an event or location context
- another person mentioned in a source
- a future dependent or represented person

A subject reference does not grant control over the Chronicle. A Chronicle identity and a subject identity may not be accepted as substitutes merely because the initial baseline often maps them one-to-one.

## Account identity and access links

An account identity belongs to authentication and account administration. It is not Chronicle truth and is not the canonical Chronicle key.

The model uses an account-access link concept to relate an authenticated account boundary to a Chronicle.

An account-access link should record at least:

- stable link identity
- Chronicle identity
- account-boundary reference
- link status
- creation, rotation, suspension, and removal evidence
- authority profile or capability reference
- responsible actor and time

Provider-specific subject IDs remain inside the account boundary or a protected mapping. They should not be copied into every Chronicle record.

### Provider replacement invariant

Changing an authentication provider or rotating credentials must not require:

- changing Chronicle identity
- rewriting Chronicle records
- changing subject identities
- breaking provenance references
- losing export or deletion history
- invalidating record-level correction chains

## Actor identity

An actor is a human or system that performed a specific lifecycle action.

Proposed actor classes:

- controlling person
- account-bound human
- future delegated human
- deterministic domain service
- connector or import process
- source-system adapter
- AI drafting tool
- operator acting under an administrative capability
- migration or repair process

Naming an actor does not authorize the actor. Authority must be evaluated separately for the requested action and purpose.

Every material lifecycle action should preserve:

- actor identity or safely bounded actor reference
- actor class
- action performed
- authority or capability basis
- time
- reason where required
- related confirmation, correction, deletion, or administrative evidence

## Record roles

A Chronicle record may refer to several roles. They must not be collapsed.

### Subject

The entity the assertion is about.

### Author

The human or organization that composed the original statement or document.

### Recorder

The human or system that entered, captured, imported, or transcribed the assertion.

### Source

The evidence origin that supplied the claim.

### Confirmer

The person or explicitly authorized human authority that accepted a proposed record as canonical after domain validation.

### Transformer

The deterministic process or identified method that parsed, normalized, converted, aggregated, or derived a representation.

### Custodian

The service, operator, or infrastructure boundary holding bytes or operating storage.

One actor may hold several roles in a particular action, but the record should state the roles rather than infer that one role grants the others.

## Authority model

Authority is action-specific and must not be inferred from technical access.

| Role or system | Propose record | Confirm record | Correct or supersede | Export | Request deletion | Change permissions | Create game or governance power |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Controlling person | Yes | Yes | Yes | Yes | Yes | Through Consent domain | No |
| Replaceable account boundary | Routes request | No independent authority | No independent authority | Routes request | Routes request | No independent authority | No |
| AI drafting tool | Yes, as `proposed` | No | May propose only | No autonomous authority | No | No | No |
| Connector or import process | Yes, as imported proposal or source claim | No | No autonomous authority | No | No | No | No |
| Deterministic domain service | Validates and stores authorized action | No human confirmation authority | Applies validated transition | Generates authorized export | Executes authorized lifecycle | No | No |
| Infrastructure custodian | No | No | No | No, except executing an authorized process | No discretionary authority | No | No |
| Maintainer or operator | Only under explicit bounded capability | No ordinary authority | Only under audited repair capability | Only through documented support process | Only through documented administrative process | No unilateral authority | No |
| Research or public-good system | No canonical-write authority | No | No | Receives separately authorized representation only | No | No | No |
| Story, quest, or progression system | No canonical-write authority | No | No | No | No | No | May apply only its own deterministic state; health detail may not increase reward |
| Future governance system | No record authority by vote alone | No | No | No | No | Cannot waive person rights | Disclosure and capital may not buy authority |

The table defines constitutional boundaries, not complete runtime policy. Sprint 4 and later work will define purpose-specific permission and receipts.

## Confirmation boundary

A proposed assertion becomes a confirmed Chronicle record only when:

1. the proposal and its source or author context are visible enough for meaningful review;
2. the controlling person, or a future explicitly authorized human authority, confirms it;
3. deterministic domain validation accepts the record shape and invariant requirements; and
4. confirmation evidence is recorded.

High model confidence, successful import, source prestige, operator preference, quest completion, research usefulness, or governance vote cannot replace confirmation.

## Control, custody, and ownership terminology

Use these terms carefully:

- **Control** — product-recognized authority of the person over Chronicle use, correction, export, and deletion.
- **Custody** — technical possession or operation of stored bytes and infrastructure.
- **Authorship** — responsibility for composing a statement or artifact.
- **Source authority** — evidence that a source made a claim, not automatic proof the claim is correct.
- **Legal ownership** — jurisdiction-dependent and unresolved; Sprint 3 does not make a universal legal claim.

Documentation should prefer precise control and custody language over unsupported claims that one actor “owns all data” in every legal sense.

## Operator and administrative authority

Operational access is exceptional and bounded.

An administrative capability must identify:

- specific allowed action
- purpose
- affected Chronicle or scope
- responsible role
- approval or break-glass basis
- expiration
- audit and person-visible evidence where safe
- review and revocation behavior

Administrative access does not grant truth authority. An operator may repair a broken reference under a documented process, but cannot silently alter a person’s asserted history, consent, or rights.

Founder status grants no special Chronicle-record authority.

## Identity lifecycle

### Account-link rotation

An account-access link may be added, rotated, suspended, or removed without rewriting Chronicle identity or record history.

### Chronicle identity stability

A Chronicle identity remains stable through ordinary authentication, provider, operator, and storage changes.

### Chronicle merge and split

Automatic Chronicle merge or split is prohibited in the initial baseline.

Future design must preserve:

- each original Chronicle and provenance chain
- explicit person confirmation
- reversible decisions where possible
- clear subject relationships
- export and deletion effects
- conflict handling
- protection against account-takeover amplification

### Transfer of control

Transfer to a caregiver, estate, delegate, or successor is not implemented by Sprint 3. A future model must define capacity, scope, evidence, duration, review, appeal, removal, emergency behavior, and restoration of direct control.

### Account deletion versus Chronicle deletion

Deleting or disabling an account link and deleting a Chronicle are different operations.

No implementation may treat loss of one login as proof that the person intended Chronicle erasure, or treat Chronicle deletion as permission to erase separately governed receipts or legally retained evidence without an explicit rule.

## Multi-person and represented-person scenarios

The initial baseline deliberately does not solve:

- caregiver or guardian control
- dependent or minor Chronicles
- shared family records
- clinician-operated charts
- delegated capture
- estate and legacy wishes
- emergency access
- incapacity
- contested control

These are not ordinary extensions. They involve privacy, safety, legal, accessibility, consent, and conflict-of-interest risks.

Future work must not assume that the person using an account, the record subject, the legal representative, the source author, and the controlling authority are always the same person.

## Cross-domain identity separation

The Chronicle identity must remain separate from:

- story player or save identity
- quest and progression identity
- notification identity
- consent grant and receipt identity
- AI memory identity
- connector installation identity
- device identity
- research participant identity
- compensation or opportunity identity
- governance membership or voting identity
- donor, investor, token, wallet, or treasury identity

A bounded mapping may exist where a documented workflow needs it. The mapping does not merge the authority domains.

## Privacy and anti-correlation requirements

The model should minimize unnecessary correlation by default:

- do not place direct identifiers in canonical IDs
- do not expose provider subjects in portable record payloads
- do not use one public identifier across unrelated domains merely for convenience
- do not use health attributes as identity proof
- do not require governance identity to access core Chronicle rights
- do not represent pseudonymity as guaranteed anonymity
- preserve enough mapping evidence for correction, export, and recovery without creating an unrestricted global identity graph

Exact identity-proofing and anti-Sybil mechanisms remain deferred.

## Founder independence and provider replacement

A compliant implementation must be able to replace:

- authentication provider
- storage custodian
- hosting operator
- AI provider
- connector vendor
- founding steward or maintainer

without redefining Chronicle identity or transferring Chronicle truth authority to the replacement.

Recovery and continuity procedures must eventually be exercisable by legitimate successor roles, not held only through founder knowledge or credentials.

## Initial invariants for contracts and validation

Sprint 3 types and validators should eventually enforce objective invariants including:

- Chronicle IDs are opaque, namespaced, and do not equal account-provider subjects
- account links reference a Chronicle rather than define it
- every canonical record identifies one Chronicle and one subject
- actor role and authority basis are distinct fields
- AI, connectors, and imports cannot create `confirmed` records without human confirmation evidence
- custody identity cannot appear as the controlling person merely because it stores data
- account-link removal does not imply Chronicle deletion
- story, quest, progression, research, and governance IDs cannot be substituted for Chronicle or subject IDs
- public fixtures use synthetic identity values and contain no direct real-person identifiers

Some privacy, legal, security, caregiver, and identity-proofing questions require specialist review and must not be encoded as settled through a validator shortcut.

## Workstream 3.1 acceptance

This baseline satisfies the workstream’s architecture acceptance when:

- a Chronicle can be represented using a stable pseudonymous internal identity without email, legal name, provider subject, wallet, or public identity as its canonical key;
- account identity and subject identity cannot be supplied as interchangeable values in the model;
- authorship, recording, sourcing, confirmation, transformation, custody, and control remain distinguishable;
- infrastructure custody provides no Chronicle truth authority;
- the controlling person’s core rights do not depend on payment, governance participation, contribution, secondary-use permission, or disclosure volume;
- multi-person and delegated-control risks remain explicit rather than hidden inside the single-person baseline; and
- provider and founder replacement do not require rewriting Chronicle identities or records.

## Deferred decisions

- authentication and identity providers
- exact opaque-ID algorithm
- account recovery and identity proofing
- delegated, caregiver, dependent, estate, and emergency control
- legal data-ownership terminology by jurisdiction
- support and break-glass implementation
- public or private identifier presentation
- identity federation
- anti-Sybil and governance identity
- production authorization policy and receipt formats
