# House of Keys Grant, Recipient, Action, Scope, and Duration Model

**Status:** PROPOSED Sprint 4 conceptual baseline  
**Workstream:** 4.4 — Grant, recipient, action, scope, and duration model  
**Tracking issue:** #32

## Purpose

This model defines the complete shape of a versioned House of Keys grant before revocation, receipts, explanations, policy evaluation, persistence, or production identity systems are implemented.

A grant binds one granting authority to one bounded purpose, one bounded recipient, an explicit set of data categories and narrowing selectors, an explicit set of actions, stated conditions, and a finite or otherwise reviewable duration.

A grant does not prove identity, legal validity, comprehension, safety, access, execution, research enrollment, commercial agreement, or Chronicle truth. It is one permission-truth record used by a later deterministic policy evaluator.

## Governing rules

This model implements and may not weaken:

- the frozen Product Constitution
- the frozen Architecture Foundation
- the controlled vocabulary and deterministic incentive contract
- the Sprint 3 separation of permission truth from Chronicle truth
- the House of Keys authority boundary
- the House of Keys purpose taxonomy
- the House of Keys data-category taxonomy
- the Institutional Immune System
- the repository and module-boundary rules

A direct explanation must remain available without narrative traversal. Narrative may call a grant a **Key**, but narrative language may not hide, broaden, bundle, or replace its actual purpose, recipient, categories, actions, conditions, duration, revocation behavior, or optionality.

## Grant semantics

A grant answers:

> Which authority permits which recipient and performing actors to perform which actions over which bounded data scope, for which purpose, under which conditions, and during which period?

A grant does not answer:

- whether an actor is authenticated now
- whether a recipient is trustworthy in general
- whether a purpose is legal, safe, clinically appropriate, or beneficial
- whether the selected Chronicle or source records are accurate
- whether an operation was attempted or completed
- whether downstream recipients complied
- whether revocation erased prior access
- whether a person fully understood every consequence

Those claims belong to separate identity, purpose-governance, Chronicle, execution, receipt, revocation, comprehension, audit, and specialist-review contracts.

## Required grant record

A grant record should contain:

- stable namespaced grant identity
- independent contract version and grant revision
- lifecycle state reference
- granting-authority identity and authority basis
- controlled Chronicle or resource identity
- subject identity or identities explicitly covered
- exactly one active grantable purpose identity and accepted purpose revision
- exactly one primary recipient identity or accepted bounded recipient-class revision
- optional performing-actor or processor constraints
- explicit grantable data-category identities and accepted revisions
- optional narrowing resource selectors
- explicit grantable action identities and accepted revisions
- start condition
- expiry or review condition
- additional policy conditions
- explanation snapshot reference
- comprehension-evidence reference or explicit pending state
- explicit confirmation evidence from the granting authority
- creation, activation, review, and supersession metadata
- compatibility behavior for later purpose, category, recipient, and action revisions
- uncertainty, conflicts, and unresolved hold points

A grant identifier must not contain an email address, provider subject, recipient URL, database key, wallet address, object-storage key, or other replaceability-breaking value.

The record must remain JSON-serializable without requiring a provider SDK, database object, UI component, or authenticated session object.

## Atomicity and bundling rules

The default grant is semantically atomic:

- one purpose
- one primary recipient
- one controlled resource or Chronicle boundary
- one explicit category set
- one explicit action set
- one duration expression
- one coherent optionality and consequence statement

A grant may contain multiple leaf categories or actions only when they share the same purpose, recipient, conditions, duration, explanation, optionality, and revocation behavior. Every member must be displayed and evaluated explicitly.

Separate grants are required when materially different:

- purposes are involved
- recipients receive different authority
- some categories or actions are optional while others are essential
- duration or revocation differs
- secondary use is combined with personal or service use
- compensation, research, commercial use, or external transmission is introduced
- explanation or comprehension requirements differ

A request cannot reduce screen count or implementation complexity by merging independently meaningful permissions into one grant.

## Granting authority

The granting authority is the actor whose explicit confirmation creates or changes the grant.

In the initial Sprint 4 baseline:

- the controlling person is the only granting authority for ordinary person-controlled Chronicle permissions
- authentication is evidence about the current actor, not permission authority by itself
- AI may draft grant language but cannot confirm, expand, revoke, or interpret a grant authoritatively
- a requester, recipient, processor, connector, operator, maintainer, service, or governance body cannot grant its own request
- payment, contribution, progression, research interest, health detail, or prior access cannot establish granting authority

Delegated, shared, caregiver, dependent, estate, emergency, minor, and institutional authority remain explicit hold points.

## Recipient model

A recipient is the bounded party authorized to receive, use, or act upon the selected information for the selected purpose.

### Recipient record

A recipient definition should contain:

- stable namespaced recipient identity
- revision and lifecycle state
- recipient kind
- direct public name and explanation
- responsible organization or person class where applicable
- jurisdiction or operating context only when reviewed and necessary
- accepted membership or resolution method
- explicitly excluded affiliates, subprocessors, departments, or downstream parties
- replacement and supersession references
- review domains and review time
- uncertainty and unresolved verification state

Recipient identity remains separate from account identity, network location, URL, email address, API credential, provider subject, legal name, or storage tenant. Those may be replaceable resolution facts, not canonical permission identity.

### Initial recipient kinds

#### `recipient.person.self`

The controlling person receiving or using their own selected information through an authorized personal flow.

This does not authorize public visibility, another account, a household member, a caregiver, or an external agent.

#### `recipient.service.first-party-bounded`

A named first-party capability operating only for the selected personal or service purpose under explicit performing-actor and processor constraints.

“Calypso’s Promise,” “the platform,” or “our services” alone is too broad. The grant must identify the bounded capability or accepted recipient definition and excluded uses.

#### `recipient.organization.named-external`

A specifically identified external organization under a reviewed recipient definition.

Sprint 4 may represent this recipient kind synthetically. It does not register, verify, contract with, or authorize any real organization.

#### `recipient.class.reviewed-bounded`

A versioned recipient class whose membership rules, responsible authority, exclusions, review date, and resolution evidence are explicit.

A class grant must not use labels such as “partners,” “providers,” “researchers,” “the community,” “trusted parties,” or “affiliates” without a separately accepted bounded class definition and inspectable membership resolution.

#### `recipient.unresolved`

A non-grantable hold point for unknown, legacy, conflicting, unverified, or unmapped recipients. It cannot produce `allow`.

### Recipient invariants

1. A recipient cannot broaden its own purpose, scope, action, duration, or conditions.
2. A processor, operator, infrastructure provider, or custodian is not automatically a recipient.
3. A recipient class does not include future members automatically unless the class contract, grant explanation, review behavior, and membership snapshot explicitly permit that behavior.
4. Recipient renaming or technical migration does not prove semantic equivalence.
5. Recipient merger, acquisition, departmental transfer, affiliate access, subprocessing, or downstream disclosure requires explicit reviewed behavior.
6. Replacing one recipient with another does not transfer grants automatically.
7. A requester-recipient mismatch must be explicit and deterministically evaluated.
8. Unknown, retired, invalidated, unverified, or conflicting recipients never default to allow.

## Performing actor and processor constraints

The recipient and the actor performing an operation may differ.

A grant may constrain performing actors through:

- exact actor identity
- accepted actor kind
- bounded service capability
- accepted processor identity or class
- requirement that the requester equal the performing actor
- requirement that the performing actor act only on behalf of the named recipient
- prohibited actor identities or kinds
- step-up confirmation or person-presence requirement as a future policy fact

A performing actor can execute only an otherwise allowed operation. Technical access, employment, administration, custody, or possession of a token cannot broaden the grant.

Subprocessor and downstream-recipient behavior remain unresolved unless the grant and later policy explicitly name them. Absence of a downstream rule means no inferred downstream authority.

## Action taxonomy

An action is the bounded operation being evaluated. Action families organize review, but only explicit active leaf actions are grantable.

### Read and inspect

#### `action.read.view`

Present selected information to an authorized recipient without authorizing export, transmission, retention expansion, transformation, or access to unselected linked records.

#### `action.read.retrieve`

Retrieve selected information into an authorized bounded operation. Retrieval does not authorize later storage, transmission, model training, or secondary use.

### Create and propose

#### `action.create.proposed-record`

Create a proposed Chronicle or permission-related draft for person review. It does not confirm Chronicle truth or activate a grant.

#### `action.create.annotation`

Create an explicitly scoped annotation or person-controlled note without altering the source record or unrelated records.

### Transform and derive

#### `action.transform.deterministic`

Apply a named, versioned deterministic transformation to selected inputs for the selected purpose. It does not authorize undisclosed inputs, inferred outputs, external training, or a different recipient.

#### `action.derive.descriptive`

Produce a bounded deterministic or reviewed descriptive output from selected inputs. Associations and inferences require their separately selected output categories and may not be hidden inside this action.

### Transmit and disclose

#### `action.transmit.to-recipient`

Transmit selected information to the named recipient through a later authorized transport. It does not authorize onward transfer, recipient substitution, indefinite retention, or a broader purpose.

### Export and portability

#### `action.export.prepare`

Prepare a person-requested export from selected information.

#### `action.export.deliver`

Deliver the prepared export to the controlling person or another explicitly named recipient. Export does not authorize secondary use of the exported data.

### Maintain, correct, and delete

#### `action.maintain.organize`

Organize or present selected person-controlled records without changing their truth, provenance, or lifecycle.

#### `action.correct.propose`

Propose a correction or supersession for person confirmation. It does not rewrite a prior record or bypass Chronicle correction rules.

#### `action.delete.request`

Create a person-requested deletion instruction for the selected scope. It does not prove deletion completion or bypass retention-exception review.

### Permission administration

#### `action.permission.inspect`

Inspect selected grants, decisions, receipts, or comprehension records without gaining authority over referenced Chronicle content.

#### `action.permission.propose`

Create a proposed grant, amendment, or revocation draft for the granting authority’s review. It does not activate or change permission.

#### `action.permission.confirm`

Record the granting authority’s explicit confirmation through a later validated flow. AI, requesters, recipients, and processors cannot hold this action independently.

#### `action.permission.revoke`

Record a prospective revocation instruction from the granting authority under the accepted lifecycle model. Detailed behavior remains workstream 4.5.

### Action invariants

1. Action families and wildcards are non-grantable.
2. Permission for one action does not imply another.
3. `view` does not imply `retrieve`, `transmit`, `export`, `transform`, `correct`, or `delete`.
4. `retrieve` does not imply retention, training, analytics, or onward disclosure.
5. `transform` does not imply authority over unselected inputs or outputs.
6. `transmit` does not imply recipient onward transfer.
7. `export` does not imply secondary use.
8. `correct.propose` does not imply Chronicle confirmation authority.
9. `delete.request` does not imply completed erasure.
10. Permission-administration actions do not grant access to referenced health data.
11. Unknown, deprecated, retired, invalidated, or unsupported actions never default to allow.

## Data-scope expression

A complete data scope combines explicit semantic categories with narrowing resource facts.

Conceptual fields include:

- controlled Chronicle or resource identity
- explicit subject identity or identities
- explicit active leaf category identities and revisions
- optional exact Chronicle-record identities
- optional exact variable identities
- optional exact source-artifact identities
- optional exact source-version or document-version identities
- optional exact attachment identities
- optional exact grant, decision, receipt, or comprehension-record identities
- optional temporal window
- optional record-lifecycle constraints
- optional provenance-closure requirement
- explicit exclusions

### Set semantics

- Category sets are explicit unions of listed active leaves.
- Intersections with subject, exact-resource, variable, time, and lifecycle selectors narrow the set.
- Empty, contradictory, unresolved, or unmapped scope produces `deny` or `indeterminate`, never implicit expansion.
- Negated selectors, wildcards, provider queries, arbitrary predicates, and open-ended “relevant records” selectors are invalid in the initial baseline.
- An exact identifier outside the declared category, subject, Chronicle, or time boundary does not broaden the scope; it creates a conflict.
- Future records, variables, descendants, linked records, corrections, source artifacts, or derived outputs are excluded unless the grant explicitly and validly defines their inclusion behavior.

### Temporal data selector

A data-time selector limits the time represented by selected records. It is distinct from grant duration.

For example, a grant may be active for seven days while authorizing access only to records representing January through March. Changing one does not change the other.

Approximate and unresolved Chronicle time must remain approximate or unresolved. A data selector may not fabricate precision merely to make evaluation easier.

## Duration model

Grant duration defines when the authority may be used. It is separate from the time represented by the data.

Every grant must use one explicit duration shape:

### Fixed interval

A start instant and end instant with declared boundary behavior.

An absent end instant is invalid unless a separately reviewed duration shape permits it.

### Delayed activation

A named future activation condition plus an expiry or review condition. The activation condition must be observable and versioned; it cannot depend on hidden model judgment.

### Single-use

Authority for at most one accepted operation matching the complete grant. Consumption evidence and concurrency behavior remain later implementation work. Missing consumption evidence must not create unlimited reuse.

### Bounded-count

Authority for no more than a stated number of accepted operations during a stated interval. Count definition, idempotency, retry behavior, and race handling must be explicit before production use.

### Session-bounded

Authority limited to one later-defined authenticated session or person-present interaction and also bounded by an absolute maximum end time. Session identity alone does not create authority.

### Review-bounded

Authority remains active only until a named review time and must be renewed through explicit reviewed behavior. “Until no longer needed” is not a valid review condition.

### Duration invariants

1. “Forever,” “indefinite,” “ongoing,” “as needed,” and “for future uses” are invalid duration shortcuts.
2. Start, expiry, time zone, and boundary semantics must be explicit.
3. Expiry denies future use; it does not erase prior decisions or receipts.
4. Renewal, extension, or conversion to another duration requires explicit reviewed behavior and usually new confirmation.
5. A narrower duration never broadens purpose, recipient, category, action, or conditions.
6. Clock uncertainty, stale caches, concurrency, and distributed enforcement remain hold points and may not be hidden by assuming access is valid.
7. Missing or unresolvable duration facts never default to allow.

## Conditions

Conditions are explicit additional facts required for an otherwise matching grant.

Initial conceptual condition kinds may include:

- person-present confirmation
- requester-equals-recipient
- requester-equals-performing-actor
- named processor only
- no onward transmission
- no external retention
- no model training
- no advertising or profiling
- exact transformation method and version
- exact export format
- maximum operation count
- person-visible receipt required
- renewed explanation or comprehension evidence required after a stated change

Conditions must be structured, inspectable, versioned, and evaluable from explicit facts. Free-text conditions may explain meaning but cannot be the only authority-bearing representation.

A condition cannot cure an invalid purpose, category, recipient, action, granting authority, or duration.

## Grant revision and amendment

A grant’s prior revisions remain inspectable.

A clarification may create a new revision only when it does not broaden authority and the accepted compatibility policy permits it.

The following require a new grant or successor confirmation rather than an in-place edit:

- broader or different purpose
- different recipient or materially changed recipient class
- additional category or removal of a material exclusion
- additional action
- broader subject, Chronicle, exact-resource, variable, or time scope
- longer or renewed duration
- weaker condition
- introduction of research, compensation, commercial use, external transmission, model training, advertising, or downstream access
- conversion from optional to essential use
- change of granting authority

A narrower successor still does not silently replace the earlier grant. Lifecycle, revocation, and supersession behavior remain explicit in workstream 4.5.

## Blanket-grant prohibitions

The following are structurally invalid:

- “all data for all purposes”
- “the whole Chronicle” without active leaf categories and narrowing scope
- all current and future categories, purposes, recipients, actions, or records
- family-node or wildcard purpose, category, recipient, or action selection
- “Calypso’s Promise and partners” as one recipient
- “research,” “support,” “security,” “personalization,” or “improve the product” without a grantable leaf purpose
- “view and use as needed” without explicit actions and conditions
- “until revoked” without an accepted review-bounded duration and direct explanation
- recipient-defined or AI-defined future scope
- consent inferred from account creation, site use, inactivity, prior disclosure, payment, contribution, reward, or continued engagement
- one grant that combines essential personal use with optional research, commerce, compensation, advertising, or public visibility

A grant that is easier to implement but harder for a person to inspect, refuse, compare, or revoke fails the model.

## Evaluation and execution separation

A later policy evaluator consumes the grant and explicit request facts. It does not mutate the grant or perform the action.

The system must preserve separate records for:

1. proposed grant
2. explanation presented
3. comprehension evidence
4. granting-authority confirmation
5. active or otherwise applicable grant revision
6. policy request
7. policy decision
8. operation attempt
9. operation outcome
10. access receipt
11. revocation or lifecycle change

An `allow` decision does not prove execution. A successful operation does not retroactively repair an invalid decision. A receipt does not create authority.

## Adversarial review cases

This model must support deterministic or reviewable evidence for:

- requester granting its own request
- requester-recipient mismatch
- processor or custodian treated as recipient authority
- broad or changing recipient class
- affiliate, merger, subprocessor, or downstream-recipient expansion
- purpose laundering combined with broad actions
- family-node, wildcard, future-descendant, or “all records” scope
- exact selectors outside the selected category or subject
- raw source, derived output, association, inference, or permission records bundled by implication
- `view` silently treated as retrieval, export, retention, training, or transmission
- export treated as secondary-use authority
- a stale, expired, unstarted, exhausted, or unreviewed duration
- single-use or bounded-count race conditions
- condition omission or contradiction
- optional secondary use bundled with essential personal use
- AI-generated grant broadening or false explanation
- prior access, a receipt, account use, or continued engagement treated as consent

These become contract fixtures and deterministic tests in workstreams 4.8 and 4.9.

## Initial unresolved register

- delegated, shared, caregiver, dependent, estate, emergency, minor, and institutional granting authority
- production identity proofing and account recovery
- real recipient registration, verification, ownership, merger, affiliate, and class-membership evidence
- processor, subprocessor, downstream-recipient, and onward-transfer governance
- exact action taxonomy specialist review
- exact scope-expression grammar and serialization
- selector interaction with correction, merge, export, deletion, and provenance closure
- one-time and bounded-count idempotency, retry, and concurrency behavior
- distributed clocks, stale policy caches, offline decisions, and revocation races
- mandatory, legal, safety, or emergency processing outside ordinary grants
- jurisdiction-specific legal basis and consent validity
- retention and deletion obligations after access or revocation
- privacy, legal, accessibility, security, clinical, and research approval

These are explicit hold points, not authority granted by omission.

## Success condition

The grant boundary is sound when a person can inspect one versioned record and understand who grants authority, who receives and performs the operation, why it is requested, what exact categories and resources are affected, which actions are allowed, what conditions apply, when authority starts and ends, how the grant differs from related permissions, and what is not included—without blanket consent, implementation convenience, recipient status, authentication, AI output, or prior access silently expanding authority.
