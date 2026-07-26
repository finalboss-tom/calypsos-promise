# Sprint 4 Plan — House of Keys Consent Architecture

**Status:** IN PROGRESS  
**Tracking issue:** #32  
**Branch:** `sprint/4-house-of-keys-consent`  
**Canonical scope:** [`docs/roadmap/sprints.md`](sprints.md#sprint-4--house-of-keys-consent-architecture)

## Goal

Make purpose-specific authority a first-class domain.

This plan does not change the accepted Sprint 4 goal, deliverables, or acceptance criteria. It maps the existing sprint into reviewable workstreams while preserving the frozen Product Constitution, Architecture Foundation, deterministic incentive boundary, merged Sprint 3 Chronicle contract, and Institutional Immune System.

## Accepted deliverables

- purpose taxonomy
- data-category taxonomy
- versioned consent grants
- recipient and duration model
- revocation behavior
- access receipt format
- permission explanation templates
- consent comprehension prototype
- policy evaluation library

## Accepted acceptance criteria

- no action can depend on blanket consent
- active grants and receipts are inspectable
- revocation tests verify future access is denied
- essential use remains independent from research or commerce

## Governing boundaries

- Permission truth stays separate from Chronicle truth, source truth, product state, and AI memory.
- House of Keys is a separate bounded capability and must not be added to `packages/health-schema`.
- A grant binds a specific authority, purpose, recipient, data scope, action, and duration.
- Missing, ambiguous, stale, invalid, withdrawn, superseded, or inapplicable authority never silently becomes permission.
- AI, MCP clients, connectors, requesters, recipients, operators, maintainers, and governance bodies cannot grant or expand a person’s permission by themselves.
- Broader permission, extra disclosure, retention, research participation, or commercial use cannot create rewards, progression, compensation, governance weight, or superior core rights.
- Refusal, deferral, withdrawal, correction, export, deletion, and return remain non-punitive.
- Public development uses only public or synthetic data.

## Workstreams

### 4.1 Authority, identity, and domain boundary — complete at baseline level

Define the controlling person, subject, account actor, requester, recipient, processor, policy evaluator, and receipt issuer. Record which actors may propose, evaluate, confirm, revoke, or merely observe permission state.

Baseline artifact: [`docs/architecture/house-of-keys-ontology.md`](../architecture/house-of-keys-ontology.md)

### 4.2 Purpose taxonomy — complete at baseline level

Define stable, versioned purposes with direct explanations, lifecycle status, compatibility rules, and safeguards against purpose substitution or broadening.

Baseline artifact: [`docs/architecture/house-of-keys-purpose-taxonomy.md`](../architecture/house-of-keys-purpose-taxonomy.md)

The baseline establishes non-grantable family nodes, grantable leaf purposes, essential-use and secondary-use classifications, conservative compatibility, lifecycle states, semantic-change rules, direct explanations, and explicit rejection of vague labels such as “improve the product,” “partners,” or “future uses.”

### 4.3 Data-category taxonomy — complete at baseline level

Define stable data categories and selectors without embedding provider identifiers, source custody, or clinical conclusions into permission authority.

Baseline artifact: [`docs/architecture/house-of-keys-data-category-taxonomy.md`](../architecture/house-of-keys-data-category-taxonomy.md)

The baseline separates House of Keys permission categories from Chronicle coded values; establishes non-grantable families, grantable leaves, exact-category compatibility, explicit selector narrowing, lifecycle and mapping rules; and keeps Chronicle content, raw source artifacts, derived calculations, associations, inferences, and permission records independently scoped. Wildcards, family nodes, future descendants, provider labels, and “all health data” cannot silently broaden authority.

### 4.4 Grant, recipient, action, scope, and duration model — complete at baseline level

Define versioned grants that bind authority, purpose, recipient, categories, actions, conditions, start, expiry, and explanation evidence. Reject blanket grants.

Baseline artifact: [`docs/architecture/house-of-keys-grant-recipient-action-duration-model.md`](../architecture/house-of-keys-grant-recipient-action-duration-model.md)

The baseline establishes semantically atomic grants; bounded and replaceable recipient identities; explicit performing-actor constraints; grantable action leaves; category-plus-selector scope intersections; separate data time and grant duration; fixed, delayed, single-use, bounded-count, session-bounded, and review-bounded duration shapes; structured conditions; conservative grant revision; and structural rejection of blanket, wildcard, indefinite, inferred, or bundled secondary-use authority.

### 4.5 Revocation and lifecycle behavior — complete at baseline level

Define withdrawal, expiration, suspension, supersession, invalidation, replacement, and review. Revocation must deny future access without falsely claiming retroactive erasure.

Baseline artifact: [`docs/architecture/house-of-keys-revocation-lifecycle-model.md`](../architecture/house-of-keys-revocation-lifecycle-model.md)

The baseline defines proposed, pending-confirmation, active, suspended, expired, exhausted, withdrawn, declined, superseded, and invalidated states; immutable lifecycle events; closed-state transitions; complete-grant revocation with narrower successors instead of hidden mutation; effective-time and decision-freshness rules; prospective denial of future access; explicit in-flight-operation races; review-bounded renewal; narrow and expiring suspension; successor confirmation; retention and downstream-use hold points; and non-punitive refusal and withdrawal.

### 4.6 Access receipt format and audit boundary — complete at baseline level

Define append-only, player-inspectable receipts for requested and performed access. Separate decisions, attempts, successful access, denial, and failure. A receipt records what occurred; it does not create permission.

Baseline artifact: [`docs/architecture/house-of-keys-access-receipt-audit-boundary.md`](../architecture/house-of-keys-access-receipt-audit-boundary.md)

The baseline defines distinct receipt event kinds for requests, allow, deny, indeterminate decisions, attempts, access completion, non-disclosure completion, partial outcomes, failures, stopped operations, lifecycle changes, and corrections; preserves correlation without collapsing claims; requires exact grant, policy, scope, actor, outcome, and timing references; minimizes duplicated health content; uses append-only correction rather than overwrite; treats missing or defective receipts as failures rather than proof of no access; separates player-facing receipts from protected operational audit records; and keeps cryptographic integrity, production logging, retention, delivery, and incident controls deferred.

### 4.7 Permission explanations and comprehension evidence — complete at baseline level

Define direct and accessible explanations covering purpose, recipient, categories, actions, duration, revocation, consequences, optionality, and uncertainty. Provide a synthetic comprehension prototype with narrative and direct-mode parity.

Baseline artifact: [`docs/architecture/house-of-keys-explanation-comprehension-model.md`](../architecture/house-of-keys-explanation-comprehension-model.md)

The baseline defines immutable explanation snapshots; layered direct presentation; strict narrative and direct-mode parity; plain-language, accessibility, assistance, and non-AI fallback boundaries; versioned comprehension-evidence records, concepts, statuses, and proportionate methods; separation of explanation, comprehension, confirmation, grant activation, policy evaluation, execution, and receipts; material-change re-presentation rules; non-punitive retry, deferral, and decline; and seven synthetic prototype scenarios covering personal export, optional public-good use, invalid blanket requests, narrative mismatch, accessible alternatives, stale evidence, and AI-summary conflict.

### 4.8 Deterministic policy evaluation — complete at baseline level

Define a pure, versioned evaluator that consumes explicit facts and returns `allow`, `deny`, or `indeterminate` with reasons and evidence references. Missing facts must never default to allow.

Baseline artifact: [`docs/architecture/house-of-keys-policy-evaluation-model.md`](../architecture/house-of-keys-policy-evaluation-model.md)

The baseline defines a side-effect-free evaluator with no hidden provider, clock, database, network, model, or session lookups; explicit atomic request, policy, registry, grant, lifecycle, explanation, comprehension, confirmation, condition, and capacity inputs; complete-grant matching without implicit partial-grant composition; ordered evaluation stages; stable reason-code families; point-in-time freshness; fail-closed `deny` and `indeterminate` semantics; multiple independent-grant handling; single-use and bounded-count boundaries; decision, execution, receipt, audit, and Chronicle separation; essential-use independence; mandatory-authority hold points; and fourteen synthetic decision scenarios for deterministic implementation in workstream 4.9.

### 4.9 TypeScript contracts, validators, tests, and public synthetic fixtures

Create a separate House of Keys package with an independent pre-stable contract version, deliberate public exports, deterministic validation, Node tests, and JSON-serializable synthetic fixtures.

### 4.10 Cross-contract review and completion record

Review consistency across frozen rights, vocabulary, Chronicle boundaries, incentives, architecture, contracts, evaluator, receipts, explanations, fixtures, and tests. Record acceptance evidence, compatibility requirements, specialist hold points, and unresolved questions.

## Adversarial evidence within the accepted scope

The grant, revocation, receipt, explanation, comprehension, and evaluation work should cover:

- stale or expired grants
- purpose laundering
- confused-deputy requests
- requester and recipient mismatch
- overbroad recipient classes
- implicit category expansion
- unsupported actions
- omitted or mismatched receipts
- revocation races and stale decisions
- coercive or inaccessible explanations
- failed comprehension evidence
- AI-generated permission misrepresentation

These are test cases for existing deliverables, not additional Sprint 4 deliverables.

## Explicit non-scope

Sprint 4 does not select or implement production accounts, identity proofing, databases, APIs, queues, providers, connectors, real recipients, real-data flows, research enrollment, compensation, marketplaces, legal conclusions, encryption, key management, incident response, clinical behavior, AI providers, remote MCP authorization, treasury, ownership, tokens, blockchain, NFTs, or on-chain governance.

The complete integrated threat model remains Sprint 5. Sprint 4 still preserves consent-specific adversarial evidence and explicit security hold points.

## Stop conditions

Stop and seek a reviewed decision if work would:

- change the accepted Sprint 4 goal, deliverables, or acceptance criteria
- weaken private-by-default behavior, refusal, inspectability, revocation, or essential-use independence
- place consent state inside Chronicle truth
- let an AI, requester, recipient, provider, operator, or governance body create permission independently
- reward permission breadth, disclosure, retention, research, commerce, or receipt volume
- default ambiguous or missing facts to allow
- claim production, privacy, legal, accessibility, security, clinical, or research approval
- introduce protected source material into public repository workflows

## Completion rule

Sprint 4 closes only when every accepted deliverable has a repository artifact, every acceptance criterion has deterministic evidence, cross-contract consistency is reviewed, unresolved questions remain explicit, CI and DCO pass, and no material decision remains only in chat.
