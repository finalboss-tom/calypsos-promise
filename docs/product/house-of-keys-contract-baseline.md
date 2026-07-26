# House of Keys Contract and Validation Baseline

**Status:** COMPLETE Sprint 4 implementation baseline on PR #33; pending merge  
**Workstream:** 4.9 — TypeScript contracts, validators, tests, and public synthetic fixtures  
**Package:** `@calypsos-promise/house-of-keys`  
**Contract version:** `0.1.0-pre.1`

## Purpose

This baseline turns the accepted Sprint 4 House of Keys architecture into a small, independently versioned TypeScript contract package without introducing production consent infrastructure.

The package keeps permission truth separate from Chronicle truth and does not add consent state or policy behavior to `packages/health-schema`.

## Package boundary

The package exports:

- stable namespaced identifiers and pre-stable contract-version constants
- purpose, data-category, recipient, action, grant, lifecycle, explanation, comprehension, confirmation, capacity, condition, policy-request, evaluation-input, decision, and access-receipt contracts
- `validateHouseOfKeysSchemaBundle` for deterministic structural validation
- `evaluateHouseOfKeysPolicy` for pure, side-effect-free policy evaluation
- a public synthetic baseline bundle, one synthetic completed-access receipt, and seventeen policy scenarios

The evaluator receives evaluation time, policy revisions, registry definitions, grants, normalized lifecycle state, explanations, comprehension evidence, confirmations, condition facts, and capacity facts explicitly. It performs no database, provider, network, filesystem, clock, session, model, random-number, or environment lookup.

## Validation baseline

The validator checks the minimum contract invariants required before deterministic evaluation:

- supported House of Keys contract, evaluator, and policy revisions
- lowercase dotted namespaced identifiers and global identifier uniqueness
- positive revisions and offset-qualified timestamps
- active grantable purpose, recipient, category, and action leaves
- ordinary grants controlled by a controlling-person authority
- explicit non-empty category, action, subject, and resource scope
- exact purpose, recipient, category, and action revision snapshots
- rejection of wildcard, blanket, future, and family-style authority shortcuts
- finite or reviewable grant duration
- exact explanation-to-grant parity for purpose, recipient, categories, revisions, selectors, actions, conditions, duration, and optionality
- satisfied comprehension evidence covering a non-empty required concept set
- confirmation, explanation, comprehension, actor, grant, lifecycle, receipt, and correction references
- allowed lifecycle transition shapes with transition actor and authority basis
- receipt issuer, grant-revision, outcome, release-boundary, summary, and classification invariants
- JSON serialization
- public or synthetic fixture classification when the public-fixture policy is enabled

Validation does not establish legal consent, identity proofing, accessibility conformance, security approval, recipient compliance, event-store projection, distributed enforcement, or production enforceability.

## Evaluation baseline

The pure evaluator returns exactly one outcome:

- `allow` when one grant revision independently covers the complete atomic request and every required fact is current and applicable
- `deny` when complete facts establish that the request is structurally invalid, mismatched, prohibited, non-applicable, expired, exhausted, withdrawn, or otherwise unauthorized
- `indeterminate` when a material fact is missing, stale, ambiguous, conflicting, unsupported, or unmapped

Partial grants cannot be composed by default. Multiple grants that each independently authorize the complete request remain inspectable and use stable ordering only for deterministic rendering.

An unrestricted grant may cover a request that narrows its scope. A selector-bounded grant cannot authorize a request that omits or exceeds the required narrowing selector. Exact category and action revisions remain part of request and grant matching.

Unrelated denied or malformed optional secondary-use grants do not block an independently valid personal-core grant. Material uncertainty on a potentially authorizing candidate does prevent allow.

Every decision includes caller-supplied decision and correlation identities, ordered reason codes, grant findings, independently authorizing grant identities, the rendering anchor, missing or conflicting facts, receipt requirements, and the requirement to re-evaluate before execution.

The decision remains separate from an operation attempt, operation outcome, access receipt, audit record, lifecycle mutation, or Chronicle change.

## Public synthetic fixtures

The package contains only synthetic fixture data. The seventeen scenarios cover:

1. exact personal-export allow
2. blanket-category denial
3. recipient mismatch
4. withdrawn grant
5. expired grant
6. explicit policy prohibition
7. unresolved recipient
8. unknown category
9. stale comprehension evidence
10. comprehension explicitly not satisfied
11. action mismatch
12. prohibited partial-grant composition
13. multiple independently authorizing grants
14. conflicting bounded-count capacity
15. personal-core authorization remaining independent from an unrelated malformed secondary-use grant
16. denial when a selector-bounded grant is invoked without its narrowing selector
17. indeterminate handling of an unavailable category revision

The fixtures also contain one synthetic completed-access receipt linked to the exact grant, request, decision, actors, purpose, category and action revisions, selector, release boundary, times, and person-visible summary.

The fixtures are JSON-serializable and do not represent real people, organizations, studies, recipients, accounts, or health records.

## Test evidence

Twenty-nine Node tests verify:

- acceptance of the public synthetic baseline bundle
- rejection of private fixture classification
- rejection of blanket category authority
- rejection of incomplete satisfied comprehension evidence
- exact explanation-duration parity
- receipt references to available grant revisions
- controlling-person grant authority
- the expected outcome and reason codes for all seventeen scenarios
- identical output bytes for identical normalized inputs
- evaluator non-mutation
- JSON-serializable decisions
- unrestricted-grant narrowing
- fail-closed handling of an omitted required performing actor
- separation between an allow decision, execution, and receipt issuance

## Lifecycle boundary

The contract includes immutable lifecycle-event records and a normalized current lifecycle state on the evaluated grant. The validator checks event references, transition actor, authority basis, times, and allowed transition shapes. The evaluator uses the explicitly supplied normalized state and denies withdrawn, expired, exhausted, suspended, superseded, invalidated, proposed, pending-confirmation, and declined grants.

Event-to-current-state projection, distributed ordering, cache invalidation, offline synchronization, and production revocation propagation remain deferred.

## Compatibility boundary

The contract is pre-stable. Any change that can alter authority, evaluation outcome, reason-code meaning, required facts, matching behavior, lifecycle behavior, scope semantics, receipt meaning, explanation or comprehension applicability, or public exports requires an explicit contract revision and compatibility review.

Complete JSON Schema, safe decoding from unknown untrusted input, production persistence, provider integration, identity proofing, distributed consistency, cryptographic integrity, real recipient registration, legal policy, and specialist approval remain deferred.

## Success condition

The baseline succeeds when the repository can compile, validate, and deterministically exercise the accepted Sprint 4 permission model using only explicit public or synthetic facts, while missing or conflicting authority fails closed, personal-core use remains independent from optional secondary use, grants and receipts remain inspectable, and no production consent system is implied.
