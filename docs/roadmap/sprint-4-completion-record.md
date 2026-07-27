# Sprint 4 Completion Record — House of Keys Consent Architecture

[Current status](current-status.md) · [Sprint 4 plan](sprint-4-plan.md) · [House of Keys architecture](../architecture/README.md#house-of-keys-architecture) · [Contract baseline](../product/house-of-keys-contract-baseline.md)

- **Status:** COMPLETE AND MERGED — accepted through PR #33 and present on `main`
- **Tracking issue:** [#32](https://github.com/finalboss-tom/calypsos-promise/issues/32)
- **Pull request:** [#33](https://github.com/finalboss-tom/calypsos-promise/pull/33)
- **Squash commit:** `51e94a19cc21a0da0c57f1ae3b09f57092aee8d1`
- **Contract package:** `@calypsos-promise/house-of-keys`
- **Contract version:** `0.1.0-pre.1`
- **Scope:** architecture, permission contracts, deterministic validation and evaluation, public synthetic fixtures, tests, compatibility boundaries, and documentation only

## Completion decision

Sprint 4 produced and merged a coherent pre-stable House of Keys baseline that makes purpose-specific authority a first-class domain without changing the accepted Sprint 4 goal, deliverables, or acceptance criteria in [the sprint sequence](sprints.md#sprint-4--house-of-keys-consent-architecture).

This record does not claim production consent enforcement, legal validity, specialist approval, real-recipient registration, identity proofing, secure persistence, distributed revocation, production receipt operation, or processing of real health data.

The tracking issue and pull request are closed through the accepted squash merge. Merge status does not promote the contract to a production permission system.

## Review authority and precedence

The cross-contract review used this precedence:

1. the frozen Product Constitution and Architecture Foundation;
2. accepted institutional and governance decisions, including progressive decentralization and the Institutional Immune System;
3. the Controlled Vocabulary and deterministic Incentive Model;
4. the merged Sprint 3 Living Chronicle boundary;
5. the Sprint 4 House of Keys architecture documents;
6. the `0.1.0-pre.1` TypeScript contract and deliberate public exports;
7. deterministic validation and policy evaluation;
8. public synthetic fixtures and tests; and
9. this completion record.

A lower layer may make a protected rule more explicit, but it may not weaken the higher-layer boundary.

## Accepted deliverables

Sprint 4 completed:

1. House of Keys ontology and authority boundary;
2. purpose taxonomy;
3. data-category taxonomy;
4. grant, recipient, action, scope, selector, condition, and duration model;
5. revocation and lifecycle behavior;
6. access-receipt format and protected-audit boundary;
7. permission explanations and comprehension evidence;
8. deterministic policy evaluation;
9. TypeScript contracts, validation, tests, and public synthetic fixtures; and
10. cross-contract reconciliation, compatibility boundaries, and completion evidence.

## Cross-contract findings

### Permission truth and Chronicle truth

**Result:** consistent.

The House of Keys is implemented as the independent package `@calypsos-promise/house-of-keys`. It does not add grants, policy decisions, receipts, comprehension evidence, or permission state to `packages/health-schema`.

Chronicle identifiers may be referenced as controlled resources or exact selectors, but permission truth does not become Chronicle truth, source truth, derived truth, interpretive truth, product state, or AI memory.

### Authority and actor separation

**Result:** consistent at the accepted pre-stable boundary.

The contracts distinguish controlling person, requester, recipient, performing actor, processor, policy evaluator, receipt issuer, AI assistant, connector, operator, and maintainer. Ordinary grants require a controlling-person granting authority.

Requesters, recipients, processors, operators, AI systems, MCP clients, maintainers, funders, providers, and governance bodies cannot create or expand a person’s grant merely by appearing in a request or possessing technical access.

Production authentication, identity proofing, delegation, caregiver, dependent, minor, estate, emergency, and shared-control authority remain explicit holdpoints.

### Purpose and data-category scope

**Result:** consistent.

Purpose and data-category definitions are versioned, directly explained, lifecycle-aware, and divided into non-grantable families and explicit grantable leaves. Requests and grants snapshot exact definition revisions.

Blanket, wildcard, family, future-descendant, provider-label, file-format, “all health data,” “partners,” “improve the product,” and unspecified future-use shortcuts cannot silently create authority.

### Grants and evaluation

**Result:** consistent after cross-contract remediation.

A grant binds one granting authority to a bounded purpose, primary recipient, controlled resource, subjects, category leaves, action leaves, optional performing-actor and processor constraints, structured conditions, narrowing selectors, duration, explanation, comprehension requirement, and confirmation evidence.

`evaluateHouseOfKeysPolicy` is pure and side-effect-free. It receives evaluation time and authority-bearing facts explicitly and performs no database, provider, network, filesystem, session, environment, random-number, or model lookup.

One atomic request returns exactly one inspectable outcome:

- `allow` when at least one single grant revision independently covers the complete request;
- `deny` for known structural, scope, lifecycle, condition, comprehension, confirmation, duration, or policy prohibitions; or
- `indeterminate` when a material fact is missing, stale, ambiguous, conflicting, unsupported, unresolved, or unmapped.

Partial grants are not silently composed into broader authority. `indeterminate` does not become best-effort allow.

### Revocation and lifecycle

**Result:** consistent at the normalized-state contract boundary.

The architecture defines immutable lifecycle events and prospective revocation. Deterministic evidence verifies that a withdrawn grant denies future authorization. Expired, exhausted, suspended, superseded, invalidated, proposed, pending-confirmation, and declined states also cannot authorize.

Event-to-snapshot projection, ordering under concurrency, offline synchronization, cache invalidation, distributed enforcement, and production propagation remain future implementation and security work.

### Explanation, comprehension, confirmation, and accessibility

**Result:** consistent.

Explanation snapshots bind the exact grant revision, purpose, recipient, categories, selectors, actions, conditions, duration, optionality, direct summary, narrative summary, locale, and material-equivalence claim.

Narrative is optional and cannot alter the direct permission meaning. Comprehension evidence remains separate from confirmation and grant activation.

The model preserves plain-language, direct-mode, assistive, translated, human-assisted, and non-AI paths without transferring granting authority or turning comprehension into an intelligence, literacy, health, loyalty, trust, reward, compensation, or governance score.

### Access receipts and audit boundary

**Result:** consistent.

The package includes a deliberate `AccessReceipt` contract, a public synthetic completed-access receipt, and deterministic receipt validation.

Receipts remain separate from grants, decisions, operation attempts, operation outcomes, and protected operational or security audit records. A receipt does not create authority, and the absence of a receipt is not proof that no access occurred.

Production receipt issuance, persistence, delivery, signing, integrity, sequencing, monitoring, retention, incident handling, and recipient acknowledgment remain deferred.

### Incentive and institutional boundaries

**Result:** consistent.

The House of Keys contract contains no reward, progression, compensation, ownership, token, voting-weight, provider-placement, connector-ranking, or governance-power field. Broader permission, extra disclosure, longer retention, research participation, receipt volume, or comprehension success cannot create superior core rights or progress.

Refusal, deferral, misunderstanding, accessibility needs, revocation, correction, challenge, and return remain non-punitive.

## Deterministic evidence

The package provides seventeen public synthetic policy scenarios covering:

- exact personal-export allow;
- blanket-category denial;
- recipient and action mismatch;
- withdrawn and expired grants;
- explicit policy prohibition;
- unresolved recipients and unavailable revisions;
- unknown categories;
- stale or unsatisfied comprehension;
- prohibited partial-grant composition;
- multiple independently authorizing grants;
- conflicting bounded-count capacity;
- personal-core independence from a malformed optional research grant;
- selector-bound grant narrowing; and
- fail-closed unavailable facts.

Twenty-nine Node tests verify those scenarios plus validation, explanation parity, receipt references, controlling-person authority, deterministic output, evaluator non-mutation, JSON serialization, unrestricted-grant narrowing, required actor handling, and decision/execution/receipt separation.

## Acceptance review

- **No action can depend on blanket consent:** met.
- **Active grants are inspectable:** met.
- **Access receipts are inspectable:** met at contract and synthetic-fixture level.
- **Revocation tests verify future access is denied:** met.
- **Essential use remains independent from research or commerce:** met.
- **Missing or conflicting authority never defaults to allow:** met.
- **Permission truth remains separate from Chronicle truth:** met.
- **Public development uses public or synthetic facts:** met.
- **Repository validation passed on the reviewed implementation head:** met.
- **No production capability is implied:** met.

## Interchange and compatibility

The accepted `0.1.0-pre.1` interchange boundary is the strict TypeScript contract plus plain JSON-serializable representations exercised after cloning and serialization.

The contract is pre-stable. A change is compatibility-significant when it can alter authority, scope, outcome, reason-code meaning, required facts, lifecycle behavior, explanation or comprehension applicability, receipt meaning, public exports, or preserved synthetic evidence.

Complete JSON Schema, a safe decoder from unknown hostile input, executable migrations, and production persistence remain deferred. Future work may not weaken fail-closed behavior, exact revisions, actor separation, purpose specificity, selector narrowing, lifecycle history, explanation parity, receipt inspectability, or personal-core independence.

## Deferred and unresolved register

The following remain deliberately unsettled:

- production accounts, authentication, identity proofing, recovery, delegation, and anti-Sybil behavior;
- multi-person, dependent, caregiver, minor, estate, emergency, mandatory, legal, institutional, and shared-control authority;
- event-to-current-state lifecycle projection and distributed revocation enforcement;
- transaction isolation, retries, idempotency, capacity reservation, atomic single-use consumption, and concurrent execution;
- production databases, APIs, repositories, queues, providers, connectors, and real-recipient registration;
- receipt issuance, delivery, signing, integrity, retention, downstream acknowledgment, monitoring, and incident response;
- downstream deletion, restoration, notification, and jurisdiction-specific withdrawal rules;
- complete JSON Schema and safe decoding from unknown or hostile input;
- encryption, key management, malware handling, secure deletion, observability, and deployed Sprint 5 controls;
- accessibility conformance testing, localization governance, plain-language specialist review, and measurable comprehension thresholds;
- privacy, legal, security, clinical, research, accessibility, retention, and regulatory specialist approval;
- research enrollment, compensation, marketplaces, treasury, ownership, tokens, blockchain, NFTs, and on-chain governance; and
- production AI and remote MCP authorization.

These are future gates, not hidden assumptions or authority granted by omission.

## Holdpoints

Later work must stop and seek a reviewed decision if it would:

- place consent state or permission decisions inside Chronicle truth;
- let a requester, recipient, processor, operator, provider, AI system, MCP client, maintainer, founder, donor, or governance body independently create or broaden a person’s permission;
- use blanket, inferred, family-level, wildcard, indefinite, bundled, or future-descendant authority;
- compose partial grants into broader permission without a separately accepted rule;
- convert `indeterminate` into allow;
- reuse a decision after a material lifecycle, identity, policy, taxonomy, scope, condition, capacity, explanation, comprehension, or confirmation change;
- reward permission breadth, disclosure, retention, research, commerce, receipt volume, or comprehension success;
- require optional secondary use for personal-core Chronicle rights;
- represent revocation as retroactive erasure or guaranteed downstream deletion;
- treat a receipt as permission or a missing receipt as proof that no access occurred;
- introduce real health data or protected source material into public fixtures or contributor workflows; or
- represent an unresolved privacy, security, accessibility, legal, clinical, research, retention, or production question as approved.

## Validation evidence

Reviewed implementation head:

```text
365514660f7815f74d9774a64c585a1a9d573d20
```

- CI run `30187656617`: success
- DCO Attestation run `30187656625`: success
- formatting, documentation links, repository policy, content validation, lint, type checking, and tests: success

The authoritative accepted merge is PR #33 and squash commit `51e94a19cc21a0da0c57f1ae3b09f57092aee8d1`.
