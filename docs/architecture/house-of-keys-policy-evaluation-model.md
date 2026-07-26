# House of Keys Deterministic Policy Evaluation Model

**Status:** PROPOSED Sprint 4 conceptual baseline  
**Workstream:** 4.8 — Deterministic policy evaluation  
**Tracking issue:** #32

## Purpose

This model defines a pure, versioned House of Keys evaluator that consumes explicit permission facts and returns one inspectable result: `allow`, `deny`, or `indeterminate`.

The evaluator does not authenticate actors, fetch records, mutate grants, consume single-use authority, perform an operation, issue a receipt, write to the Chronicle, or infer missing permission. It evaluates only the facts and contract revisions supplied to it.

An `allow` result means that the stated request matched an applicable authority under the exact policy inputs evaluated. It is not a durable capability, proof of execution, legal conclusion, safety approval, research enrollment, recipient compliance guarantee, or statement that the underlying Chronicle data is true.

## Governing rules

This model implements and may not weaken:

- the frozen Product Constitution
- the frozen Architecture Foundation
- the controlled vocabulary and deterministic incentive contract
- the Sprint 3 separation among Chronicle, source, derived, interpretive, permission, product-state, and AI-memory truth
- the House of Keys ontology
- the purpose and data-category taxonomies
- the grant, recipient, action, scope, and duration model
- the revocation and lifecycle model
- the access receipt and audit boundary
- the permission explanation and comprehension model
- the Institutional Immune System
- the repository and module-boundary rules

Missing, ambiguous, stale, invalid, withdrawn, superseded, conflicting, unsupported, or inapplicable authority never becomes permission by default.

Optional research, compensated, commercial, advertising, profiling, model-training, public-visibility, or other secondary-use authority must never become a prerequisite for personal-core Chronicle use.

## Policy-decision truth

Policy-decision truth answers:

> Given these exact request facts, policy revision, taxonomy revisions, grant revisions, lifecycle facts, explanation and comprehension evidence, confirmation evidence, condition facts, and evaluation time, what outcome did the deterministic evaluator produce and why?

Policy-decision truth does not answer:

- whether an actor is authenticated outside the supplied facts
- whether an operation started or completed
- whether information was released, copied, retained, or deleted
- whether a recipient complied
- whether a grant is legally valid
- whether an explanation was universally accessible
- whether the person understood every consequence
- whether the requested action is clinically appropriate, safe, ethical, or beneficial
- whether a Chronicle assertion is true
- whether production enforcement, logging, or cache invalidation worked

Those claims belong to separate identity, execution, receipt, audit, retention, accessibility, specialist-review, and Chronicle contracts.

## Pure evaluator boundary

The conceptual evaluator is a deterministic function:

```text
evaluate(explicitInput) -> policyDecision
```

For the same normalized input bytes and evaluator revision, it must produce the same normalized decision bytes.

The evaluator:

- has no network, database, filesystem, clock, random-number, model, provider, session, or environment lookup
- receives evaluation time explicitly
- receives every registry, policy, grant, lifecycle, mapping, explanation, evidence, confirmation, condition, and capacity fact explicitly
- does not generate authority-bearing defaults
- does not mutate or persist inputs
- does not perform the requested action
- does not issue a receipt
- does not generate random identifiers
- does not use model confidence, engagement, payment, contribution, progression, health detail, prior access, or recipient status as permission authority

A caller-supplied decision or correlation identity may be echoed in the output. Identity assignment and persistence remain outside the pure evaluator.

## Required evaluation input

A complete policy-evaluation input should contain the following versioned facts.

### Evaluation metadata

- House of Keys contract version
- evaluator identity and revision
- policy identity and revision
- caller-supplied decision or correlation identity
- evaluation time
- requested execution window, when any
- normalization revision

### Atomic policy request

- policy-request identity and revision
- requester identity and kind
- primary recipient identity and revision
- performing actor or processor identity where applicable
- controlled Chronicle or resource identity
- subject identity or identities
- exactly one active grantable purpose identity and revision
- explicit active leaf data-category identities and revisions
- narrowing exact-resource, variable, source, document, attachment, lifecycle, and data-time selectors
- explicit active leaf action identities and revisions
- structured requested conditions
- requested operation boundary
- receipt requirement where applicable
- request time

### Policy and registry bundle

- active policy rules and revision
- constitutional constraints represented by the accepted policy contract
- purpose definitions and compatibility records
- data-category definitions and mappings
- recipient definitions and membership-resolution evidence
- action definitions
- comprehension-rule definitions
- lifecycle-transition rules
- condition definitions
- explicit denial, containment, suspension, or mandatory-holdpoint rules
- review and effective times for every relevant definition

### Authority facts

- candidate grant identities and exact revisions
- grant confirmation evidence
- grant lifecycle events or normalized lifecycle snapshots
- grant duration facts
- single-use or bounded-count capacity facts where applicable
- explanation snapshots
- comprehension-evidence records
- accepted compatibility or migration evidence
- known successor, predecessor, suspension, revocation, invalidation, or containment facts

### Resolution and condition facts

- identity-resolution results supplied by a later integration boundary
- requester, recipient, performing-actor, processor, and class-membership resolution
- exact selector-resolution results
- data-category mapping results
- clock and time-source facts
- condition facts such as person presence, named processor, no onward transmission, no external retention, no model training, or required receipt capability
- known conflicts, uncertainty, stale snapshots, and failed resolution attempts

The evaluator must not fetch a missing fact. A missing fact remains missing.

## Request atomicity

The initial evaluator evaluates one atomic operation request.

A request is not atomic when it combines materially different:

- purposes
- primary recipients
- optionality or refusal consequences
- execution boundaries
- duration or revocation behavior
- research, commercial, compensated, advertising, training, or public-visibility uses
- operations that require separately meaningful person choices

A mixed batch must be decomposed into independently explainable and independently decidable requests. The evaluator must not return one aggregate `allow` when one member would be denied or indeterminate.

Known structural invalidity produces `deny`; it is not repaired by a broad grant, AI summary, recipient request, or user-interface convenience.

## Required policy-decision output

A policy decision should contain:

- caller-supplied decision or correlation identity
- House of Keys contract version
- evaluator identity and revision
- policy identity and revision
- policy-request identity and revision
- outcome: `allow`, `deny`, or `indeterminate`
- evaluation time
- normalized request facts evaluated
- purpose, category, recipient, action, explanation, comprehension-rule, and policy revisions evaluated
- all candidate grant identities and revisions evaluated
- independently authorizing grant identities, when any
- deterministically selected grant basis for rendering, when any
- lifecycle facts relied upon
- confirmation and comprehension-evidence references
- condition and capacity facts relied upon
- ordered reason codes
- direct reason explanations
- missing, stale, ambiguous, conflicting, unsupported, or unmapped facts
- rejected candidate reasons
- explicit policy prohibitions or containment rules applied
- decision freshness and execution-window boundary
- whether re-evaluation is required before execution
- receipt requirement
- uncertainty and evidence references
- challenge, correction, or review path appropriate to the decision

The decision must remain JSON-serializable without requiring a provider SDK, database object, UI framework, authenticated session, model response, or executable callback.

## Outcome semantics

### `allow`

`allow` requires all of the following:

- the policy and evaluator revisions are supported and applicable
- the request is complete, atomic, and structurally valid
- all authority-bearing identities and revisions resolve
- every selected purpose, category, recipient, action, selector, and condition is supported and applicable
- at least one single candidate grant revision independently covers the complete request
- the selected grant is confirmed and in an applicable lifecycle state
- duration, use-count, review, and freshness facts permit the request at evaluation time
- required explanation and comprehension evidence are current and valid
- every required condition is satisfied from explicit facts
- no accepted prohibition, suspension, containment, or constitutional conflict applies
- no material missing, stale, ambiguous, conflicting, unsupported, or unmapped fact could change the outcome

`allow` is point-in-time authorization evidence for the exact request. It does not prove execution and must not be reused after a relevant fact changes.

### `deny`

`deny` means the evaluator has sufficient explicit facts to determine that the exact request is not authorized under the evaluated policy.

Examples include:

- structurally invalid or non-atomic request
- no applicable grant independently covers the complete request
- purpose, recipient, category, selector, action, subject, resource, or condition mismatch
- family node, wildcard, blanket scope, future descendant, or prohibited implicit expansion
- inactive, unstarted, expired, exhausted, withdrawn, declined, superseded, invalidated, or applicable suspended grant
- duration or execution window outside its permitted boundary
- required condition explicitly false
- required current comprehension evidence explicitly not satisfied or declined
- confirmation explicitly absent where the complete record proves it was not supplied
- explicit policy prohibition or containment rule
- single-use or bounded-count authority known to be exhausted
- attempted composition of partial grants when composition is not accepted

A denial is not punishment, a health judgment, a trust score, or a claim that the request was unlawful.

### `indeterminate`

`indeterminate` means the evaluator cannot safely produce an authoritative `allow` or `deny` from the supplied facts.

Examples include:

- unsupported contract, evaluator, or policy revision
- missing material request fact
- unresolved or conflicting actor, recipient, class-membership, subject, or resource identity
- unknown, unmapped, conflicting, stale, or semantically uncertain taxonomy reference
- conflicting lifecycle events or uncertain effective-time ordering
- stale or mismatched explanation or comprehension evidence
- missing or conflicting confirmation evidence where the state cannot be resolved safely
- uncertain single-use or bounded-count consumption
- unresolved compatibility or migration claim
- condition fact missing or untrusted
- a policy bundle that conflicts with the frozen rights or attempts to condition personal-core use on secondary-use permission
- unresolved mandatory, emergency, legal, or safety authority outside the accepted Sprint 4 grant model

`indeterminate` never means “probably allowed.” The operation must not proceed under the unresolved decision.

## Deterministic evaluation order

The evaluator applies the following ordered stages. Each stage produces normalized findings and reason codes.

### Stage 1 — Contract and policy compatibility

Validate:

- House of Keys contract version
- evaluator revision
- policy identity and revision
- registry and rule revisions
- normalization contract

Unsupported or conflicting versions produce `indeterminate`.

A policy bundle that contradicts frozen rights, permits blanket consent, rewards permission breadth, or requires secondary-use authority for personal-core use is invalid. The evaluator must not silently reinterpret it into a compliant policy.

### Stage 2 — Request structure and completeness

Validate:

- request atomicity
- required actor, resource, purpose, category, action, selector, condition, and time fields
- absence of family nodes, wildcards, open-ended predicates, implicit “all,” unspecified future uses, or bundled optional secondary use
- internal consistency among subject, resource, category, selector, recipient, action, and operation boundary

Known invalid structure produces `deny`. Missing or unresolved material facts produce `indeterminate`.

### Stage 3 — Identity and actor resolution

Evaluate the supplied resolution facts for:

- granting authority
- requester
- primary recipient
- performing actor
- processor
- subject
- controlled resource
- recipient-class membership where used

Authentication or technical possession alone does not establish permission authority.

A requester cannot grant its own request. A recipient, processor, operator, custodian, connector, AI system, MCP client, maintainer, or governance body cannot create or expand a person’s grant by appearing in the request.

### Stage 4 — Taxonomy, mapping, and revision applicability

Validate that:

- the purpose is an active grantable leaf
- every data category is an active grantable leaf
- the recipient and action definitions are active and applicable
- any mapping is accepted and exact enough for the requested use
- every compatibility claim is versioned and applicable
- no broader purpose, category, recipient, or action is substituted for a narrower grant

Unknown or unresolved mappings produce `indeterminate`. Known broader or incompatible mappings produce `deny`.

### Stage 5 — Candidate-grant eligibility

Filter candidate grants by:

- controlling authority and authority basis
- controlled resource and subject
- exact purpose or accepted compatible revision
- primary recipient and permitted performing-actor constraints
- explicit category and selector coverage
- explicit action coverage
- condition contract
- confirmation, explanation, and comprehension references

A candidate rejected at this stage remains inspectable with ordered rejection reasons.

### Stage 6 — Lifecycle, duration, capacity, and freshness

For each remaining candidate, evaluate:

- lifecycle state at evaluation time
- effective and recorded lifecycle times
- activation and expiry boundaries
- review deadline
- suspension, withdrawal, supersession, invalidation, or containment
- single-use or bounded-count capacity
- known stale-decision or execution-window facts

Only an applicable active grant may continue.

A suspended, expired, exhausted, withdrawn, superseded, invalidated, declined, proposed, or pending-confirmation grant cannot authorize the request.

Uncertain ordering, stale lifecycle snapshots, or conflicting capacity facts produce `indeterminate` when they could change the result.

### Stage 7 — Complete grant match

A single grant revision must independently cover the complete atomic request in the initial Sprint 4 baseline.

Coverage requires:

- exact or accepted purpose match
- exact or accepted primary-recipient match
- requester and performing-actor constraints satisfied
- every selected category covered
- every narrowing selector within the grant scope
- every requested action covered
- every condition satisfied
- duration and capacity applicable
- no material exclusion violated

Partial grants must not be combined to manufacture broader authority.

Example: one grant covering symptom records and another covering laboratory records do not jointly authorize a request for both categories unless a separately accepted composition rule exists. No such general composition rule exists in the initial Sprint 4 baseline.

### Stage 8 — Explanation, comprehension, and confirmation consistency

Validate that:

- the grant references the exact explanation snapshot presented
- direct and narrative content were materially equivalent where both were used
- required comprehension evidence is current for the exact proposal and rule revisions
- every required concept was satisfied
- accessibility or assistance mode did not transfer authority
- explicit granting-authority confirmation exists and matches the proposal revision
- no material change made the explanation, evidence, or confirmation stale

Explanation, comprehension evidence, and confirmation remain separate claims.

Comprehension evidence cannot cure an invalid grant. Confirmation cannot repair missing required comprehension evidence. AI or human assistance cannot confirm on the person’s behalf.

### Stage 9 — Policy conditions, prohibitions, and containment

Evaluate accepted explicit rules such as:

- person-presence requirement
- requester-equals-recipient
- requester-equals-performing-actor
- named processor only
- no onward transmission
- no external retention
- no model training, advertising, or profiling
- exact transformation method and version
- exact export format
- required player-visible receipt capability
- active suspension or containment rule
- constitutional personal-core independence

An explicit applicable prohibition overrides grant coverage.

A condition cannot cure an invalid purpose, recipient, category, action, scope, duration, lifecycle state, explanation, comprehension record, or confirmation.

### Stage 10 — Outcome and deterministic rendering

The evaluator:

1. collects every normalized finding;
2. identifies all candidate grants that independently authorize the complete request;
3. applies explicit prohibitions and unresolved-material-fact rules;
4. returns `allow`, `deny`, or `indeterminate`;
5. orders reason codes by evaluation stage and stable code order;
6. lists all independently authorizing grants in stable identity-and-revision order;
7. selects the first independently authorizing grant in that stable order only as the canonical rendering anchor;
8. preserves every rejected candidate and conflict needed for inspectability.

The rendering anchor does not grant additional authority or establish privilege priority among equivalent grants.

## Outcome precedence and unresolved facts

The evaluator must not use a simplistic rule that uncertainty always overrides a known denial or that one allow candidate erases material conflict.

The initial boundary is:

- `allow` only when the complete request has at least one independently authorizing grant, no applicable prohibition, and no material unresolved fact that could change the outcome;
- `deny` when complete explicit facts establish that the request is not authorized;
- `indeterminate` when a material missing, stale, ambiguous, conflicting, unsupported, or unmapped fact prevents a safe authoritative result.

A known explicit prohibition remains a denial even when an unrelated fact is missing. A conflict that could determine whether authority exists remains indeterminate.

## Multiple grants and conflict behavior

Multiple grants may appear in one evaluation input.

The evaluator must distinguish:

- **independently authorizing grants** — each one covers the full request by itself;
- **partial grants** — each covers only part of the request and cannot be composed by default;
- **irrelevant grants** — do not match the request;
- **non-applicable grants** — structurally match but fail lifecycle, duration, confirmation, evidence, or condition rules;
- **conflicting facts** — incompatible records about the same authority-bearing identity, revision, lifecycle state, mapping, or condition.

A withdrawn or expired grant does not negate a separate independently valid grant. A later decision must identify all independently authorizing candidates and the deterministic rendering anchor.

Conflicting lifecycle, identity, mapping, or confirmation facts about a material candidate produce `indeterminate` unless another accepted rule conclusively resolves the conflict.

## Reason-code model

Reason codes are stable, versioned, ordered, and suitable for deterministic tests and direct explanations.

Initial reason families include:

### Allow

- `allow.grant.exact-match`
- `allow.grant.compatible-revision`
- `allow.multiple-independent-grants`

### Deny

- `deny.request.invalid-structure`
- `deny.request.non-atomic`
- `deny.request.blanket-scope`
- `deny.authority.self-grant`
- `deny.no-applicable-grant`
- `deny.grant.partial-composition-prohibited`
- `deny.grant.lifecycle-non-applicable`
- `deny.grant.not-started`
- `deny.grant.expired`
- `deny.grant.exhausted`
- `deny.grant.withdrawn`
- `deny.grant.suspended`
- `deny.grant.superseded`
- `deny.grant.invalidated`
- `deny.purpose.mismatch`
- `deny.recipient.mismatch`
- `deny.performing-actor.mismatch`
- `deny.scope.category-mismatch`
- `deny.scope.selector-conflict`
- `deny.action.mismatch`
- `deny.duration.outside-boundary`
- `deny.condition.false`
- `deny.comprehension.not-satisfied`
- `deny.confirmation.absent`
- `deny.policy.prohibition`
- `deny.policy.secondary-use-bundling`

### Indeterminate

- `indeterminate.contract.unsupported`
- `indeterminate.policy.unsupported`
- `indeterminate.policy.constitution-conflict`
- `indeterminate.fact.missing`
- `indeterminate.identity.unresolved`
- `indeterminate.recipient-membership.unresolved`
- `indeterminate.taxonomy.unresolved`
- `indeterminate.mapping.conflict`
- `indeterminate.lifecycle.conflict`
- `indeterminate.time.ambiguous`
- `indeterminate.capacity.conflict`
- `indeterminate.condition.unknown`
- `indeterminate.explanation.mismatch`
- `indeterminate.comprehension.stale`
- `indeterminate.confirmation.conflict`
- `indeterminate.mandatory-authority.holdpoint`

The TypeScript contract may refine names without weakening these semantic distinctions.

## Direct explanation of decisions

Every decision must support a direct explanation that states:

- the outcome
- the exact request evaluated
- the requester, recipient, and performing actor
- the purpose, categories, selectors, and actions
- the grant or grants considered
- the grant basis relied upon for an allow
- the explicit reason for denial
- every material missing or conflicting fact for an indeterminate result
- the lifecycle and time facts that mattered
- whether required explanation, comprehension, and confirmation evidence were current
- whether the decision may be reused or requires re-evaluation
- whether a player-visible receipt is required
- how to challenge, correct, or review the result

An AI system may restyle or summarize the structured decision, but the reason codes and canonical direct explanation remain authoritative.

## Decision freshness and reuse

A policy decision is a point-in-time result, not a bearer token or durable capability.

By default, a decision must be re-evaluated immediately before execution unless an accepted policy supplies a bounded execution window.

Any reusable execution window must end no later than the earliest relevant:

- grant expiry
- review deadline
- single-use or bounded-count capacity boundary
- policy expiry or review time
- purpose, category, recipient, action, mapping, explanation, comprehension-rule, or confirmation applicability boundary
- suspension, containment, revocation, or lifecycle effective time
- explicit decision-freshness deadline

A decision becomes stale when any material input fact or revision changes.

A cached `allow` is not authority independent of the grant. Known revocation, suspension, expiration, exhaustion, supersession, invalidation, condition change, recipient change, policy change, or taxonomy change requires re-evaluation.

## Single-use and bounded-count authority

The pure evaluator does not consume or reserve authority.

For a single-use or bounded-count grant:

- the input must include an explicit accepted capacity snapshot;
- exhausted capacity produces `deny`;
- missing, duplicated, stale, or conflicting capacity evidence produces `indeterminate`;
- an `allow` decision must state that execution still requires the accepted atomic consumption behavior;
- the decision itself does not increment, decrement, reserve, or lock a count;
- retries, idempotency, partial failure, and concurrent execution remain production hold points.

The later execution layer must not treat a preflight allow as an unlimited reusable permission.

## Decision, execution, and receipt separation

The system must preserve separate records for:

1. grant proposal
2. explanation snapshot
3. comprehension evidence
4. granting-authority confirmation
5. applicable grant revision and lifecycle state
6. policy request
7. policy decision
8. operation attempt
9. operation outcome
10. access receipt
11. lifecycle, correction, containment, or restoration event

The evaluator produces only the policy decision.

An `allow` does not start an operation. A denial does not prove no attempt occurred. An indeterminate result does not permit best-effort execution. A completed operation does not retroactively repair an invalid decision. A receipt does not create permission.

When a grant condition requires a player-visible receipt and the supplied execution facts show that the receipt requirement cannot be met, the evaluator must not silently treat receipt generation as optional.

## Essential-use independence

The evaluator must preserve the frozen rule that personal-core use is independent from research and commerce.

It must reject or mark indeterminate any policy bundle that:

- requires a research, compensated, commercial, advertising, profiling, model-training, public-visibility, or broad secondary-use grant before personal-core capture, maintenance, inspection, correction, export, deletion, or permission-history access;
- treats optional secondary-use refusal as a reason to reduce core service, progression, dignity, return behavior, or governance standing;
- uses comprehension success, receipt volume, disclosure breadth, retention duration, or recipient access as a reward signal;
- treats payment, contribution, continued engagement, or account use as permission.

The surrounding application must route personal-core requests through a valid personal-core policy rather than punish the person for an invalid policy bundle.

## Mandatory, legal, safety, and emergency hold point

The initial Sprint 4 evaluator does not invent authority for mandatory, legal, safety, emergency, institutional, caregiver, dependent, minor, estate, or shared-control processing.

A request asserting such authority must include a separately accepted, versioned authority policy with explicit scope, evidence, notice, review, appeal, retention, sunset, and accountability behavior.

Without that accepted authority, the result is `deny` or `indeterminate` according to the supplied facts. The evaluator must not treat urgency, institutional status, operator access, model confidence, or technical capability as permission.

## AI, MCP, and automated-system boundary

AI, MCP clients, connectors, requesters, recipients, processors, operators, and automated systems may:

- construct a proposed policy request from explicit facts
- retrieve candidate facts through separately authorized boundaries
- explain the structured decision
- surface missing or conflicting facts
- draft a challenge, correction, or re-evaluation request

They may not:

- create, expand, confirm, revoke, or restore permission
- select hidden defaults that broaden authority
- convert `indeterminate` into `allow`
- use model confidence as authority
- omit denial or conflict reasons to create a cleaner narrative
- invent identity, mapping, lifecycle, explanation, comprehension, confirmation, capacity, execution, or receipt facts
- perform an operation merely because a natural-language model predicts it is reasonable
- change reason codes or structured outcomes in a summary

The deterministic structured decision remains authoritative over model-generated interpretations.

## Policy versioning and compatibility

A policy definition must preserve an inspectable revision history.

A new policy revision is required for changes to:

- evaluation order that can alter outcomes
- outcome semantics
- reason-code semantics
- required input facts
- grant matching or composition rules
- lifecycle, duration, capacity, condition, or freshness behavior
- purpose, category, recipient, action, mapping, explanation, comprehension, or confirmation applicability
- denial, containment, suspension, or mandatory-authority rules
- essential-use independence behavior

A materially broader allow rule requires a new policy identity or explicitly reviewed major revision and cannot silently apply to prior grants or decisions.

Old decisions preserve the policy and evaluator revisions actually used. A newer policy must not rewrite their historical outcome.

## Synthetic decision scenarios

The initial policy-evaluation prototype includes the following public, synthetic scenarios.

### Scenario A — Exact personal export allowed

A complete atomic request uses:

- `purpose.personal.chronicle-portability`
- `recipient.person.self`
- explicit Chronicle leaf categories and exact record selectors
- export preparation and delivery actions
- a current single-use grant
- current explanation, comprehension, and confirmation evidence
- satisfied receipt condition

Expected result: `allow` with the exact grant, scope, actions, capacity snapshot, and point-in-time freshness boundary.

### Scenario B — No applicable grant

The request is complete and all registries resolve, but no grant independently covers the full purpose, recipient, scope, actions, and duration.

Expected result: `deny` with `deny.no-applicable-grant`.

### Scenario C — Partial grants cannot be combined

One grant covers symptom records and another covers laboratory records. The request asks for both categories in one operation.

Expected result: `deny` with `deny.grant.partial-composition-prohibited` unless a separately accepted composition policy exists.

### Scenario D — Revoked grant and stale allow

An earlier decision allowed access, but the relied-upon grant is withdrawn before the new operation starts.

Expected result: the old decision is stale; re-evaluation returns `deny.grant.withdrawn` unless another independent current grant covers the complete request.

### Scenario E — Confused-deputy request

The requester asks a first-party processor to transmit data to a different external recipient not named in the grant.

Expected result: `deny` for recipient or performing-actor mismatch. Processor status does not expand authority.

### Scenario F — Unknown category mapping

A provider field cannot be resolved exactly to an active House of Keys data category.

Expected result: `indeterminate.taxonomy.unresolved` or `indeterminate.mapping.conflict`; no implicit category broadening.

### Scenario G — Expired or exhausted authority

A fixed-duration grant is past its end time, or a single-use grant has accepted consumption evidence showing it was used.

Expected result: `deny.grant.expired` or `deny.grant.exhausted`.

### Scenario H — Uncertain capacity

Two conflicting consumption records exist for a bounded-count grant.

Expected result: `indeterminate.capacity.conflict`; the evaluator does not assume remaining capacity.

### Scenario I — Stale comprehension evidence

The recipient, category set, duration, downstream-use statement, or explanation meaning changed after evidence was satisfied.

Expected result: `indeterminate.comprehension.stale` or a denial under the current evidence rule; fresh explanation, evidence, and confirmation are required.

### Scenario J — Invalid blanket request

The request uses “all health data,” “partners,” broad access actions, and an indefinite duration.

Expected result: `deny.request.invalid-structure` and `deny.request.blanket-scope`. Comprehension or confirmation cannot cure the request.

### Scenario K — Personal-core use conditioned on research

A policy bundle requires an optional study grant before personal Chronicle export.

Expected result: `indeterminate.policy.constitution-conflict`; the invalid bundle cannot authorize or legitimately block the personal-core path.

### Scenario L — Mandatory-authority claim without accepted policy

An operator labels a request urgent or legally required but supplies no accepted mandatory-authority contract.

Expected result: `indeterminate.mandatory-authority.holdpoint` or an explicit denial. Urgency and operator status do not create authority.

### Scenario M — Multiple independently authorizing grants

Two current grants each independently cover the complete request.

Expected result: `allow.multiple-independent-grants`; both are listed in stable order and one is selected deterministically only as the rendering anchor.

### Scenario N — AI confidence ignored

An AI summary reports high confidence that a broad request is reasonable, but the request lacks a matching active grant.

Expected result: `deny.no-applicable-grant`; model confidence has no authority-bearing effect.

These scenarios become structured fixtures and deterministic tests in workstream 4.9.

## Adversarial review cases

The evaluator contract must support deterministic evidence for:

- missing facts silently defaulting to allow
- non-atomic requests receiving aggregate approval
- family nodes, wildcards, future descendants, or “all records” broadening scope
- requester self-granting or recipient self-expansion
- confused-deputy behavior
- recipient, performing-actor, processor, or downstream-party mismatch
- partial grants being combined into broader authority
- purpose laundering or category substitution
- unsupported action treated as generic access
- stale, suspended, expired, exhausted, withdrawn, superseded, invalidated, or unstarted grants
- stale cached allow after lifecycle or policy change
- single-use and bounded-count ambiguity
- uncertain effective-time ordering
- explanation, comprehension, or confirmation mismatch
- narrative or AI summary overriding canonical facts
- denied or indeterminate decision followed by execution
- receipt requirement ignored
- optional secondary use bundled into personal-core service
- mandatory or emergency authority inferred without an accepted contract
- reason-code ordering or output changing for identical normalized input
- hidden provider, database, clock, environment, or model dependency
- decision mutation or side effects during evaluation

## Initial unresolved register

- exact TypeScript input and output contracts
- safe decoding of untrusted policy inputs
- complete reason-code catalogue and compatibility rules
- normalized serialization and canonical byte representation
- policy-bundle signing, distribution, and rollback
- production identity and recipient resolution
- transaction isolation between evaluation, execution, revocation, and data release
- atomic consumption for single-use and bounded-count grants
- distributed clocks, stale caches, offline operation, and decision propagation
- performance limits and denial-of-service behavior for large candidate sets
- batch, streaming, repeated, and long-running operation decomposition
- accepted composition rules, if any, for multiple grants
- production receipt capability checks and fail-closed execution
- mandatory, legal, safety, emergency, delegated, shared, caregiver, dependent, estate, and minor authority
- privacy, legal, accessibility, security, clinical, research, and retention specialist approval

These are explicit hold points, not authority granted by omission.

## Success condition

The policy-evaluation boundary is sound when the same normalized facts always produce the same inspectable decision; `allow` requires one complete independently applicable grant and no material unresolved fact; `deny` states the exact known reason authority is absent; `indeterminate` fails closed without pretending uncertainty is permission; partial grants, AI confidence, technical access, prior access, payment, engagement, or recipient status cannot broaden authority; optional secondary use never becomes a prerequisite for personal-core rights; and decision, execution, receipt, audit, and Chronicle truth remain separate.
