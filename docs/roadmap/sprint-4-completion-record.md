# Sprint 4 Completion Record — House of Keys Consent Architecture

**Status:** COMPLETE ON REVIEW BRANCH — pending founding-steward approval and merge  
**Tracking issue:** #32  
**Pull request:** #33  
**Contract package:** `@calypsos-promise/house-of-keys`  
**Contract version:** `0.1.0-pre.1`  
**Scope:** architecture, permission contracts, deterministic validation and evaluation, public synthetic fixtures, tests, compatibility boundaries, and documentation only

## Completion decision

Sprint 4 has produced a coherent pre-stable House of Keys baseline that makes purpose-specific authority a first-class domain without changing the accepted Sprint 4 goal, deliverables, or acceptance criteria in [`docs/roadmap/sprints.md`](sprints.md#sprint-4--house-of-keys-consent-architecture).

The baseline is complete for review on branch `sprint/4-house-of-keys-consent`. It is not yet merged, and this record does not claim production consent enforcement, legal validity, specialist approval, real-recipient registration, identity proofing, secure persistence, distributed revocation, or processing of real health data.

## Review authority and precedence

The cross-contract review used this precedence:

1. the frozen [Product Constitution](../frozen/product-constitution.md) and [Architecture Foundation](../frozen/architecture.md);
2. accepted institutional and governance decisions, including progressive decentralization and the Institutional Immune System;
3. the [Controlled Vocabulary](../product/controlled-vocabulary.md) and [Incentive Model](../product/incentive-model.md);
4. the merged Sprint 3 Living Chronicle boundary;
5. the Sprint 4 House of Keys architecture documents;
6. the `0.1.0-pre.1` TypeScript contract and deliberate public exports;
7. deterministic validation and policy evaluation;
8. public synthetic fixtures and tests; and
9. this completion record.

A lower layer may make a protected rule more explicit, but it may not weaken the higher-layer boundary.

## Reviewed artifact set

### Sprint plan and architecture

- [`sprint-4-plan.md`](sprint-4-plan.md)
- [`../architecture/house-of-keys-ontology.md`](../architecture/house-of-keys-ontology.md)
- [`../architecture/house-of-keys-purpose-taxonomy.md`](../architecture/house-of-keys-purpose-taxonomy.md)
- [`../architecture/house-of-keys-data-category-taxonomy.md`](../architecture/house-of-keys-data-category-taxonomy.md)
- [`../architecture/house-of-keys-grant-recipient-action-duration-model.md`](../architecture/house-of-keys-grant-recipient-action-duration-model.md)
- [`../architecture/house-of-keys-revocation-lifecycle-model.md`](../architecture/house-of-keys-revocation-lifecycle-model.md)
- [`../architecture/house-of-keys-access-receipt-audit-boundary.md`](../architecture/house-of-keys-access-receipt-audit-boundary.md)
- [`../architecture/house-of-keys-explanation-comprehension-model.md`](../architecture/house-of-keys-explanation-comprehension-model.md)
- [`../architecture/house-of-keys-policy-evaluation-model.md`](../architecture/house-of-keys-policy-evaluation-model.md)

### Product contract and implementation evidence

- [`../product/house-of-keys-contract-baseline.md`](../product/house-of-keys-contract-baseline.md)
- [`../../packages/house-of-keys/README.md`](../../packages/house-of-keys/README.md)
- `packages/house-of-keys/src/version.ts`
- `packages/house-of-keys/src/types.ts`
- `packages/house-of-keys/src/contract-utils.ts`
- `packages/house-of-keys/src/validate.ts`
- `packages/house-of-keys/src/evaluate.ts`
- `packages/house-of-keys/src/fixtures.ts`
- `packages/house-of-keys/test/validate.test.mjs`
- `packages/house-of-keys/test/evaluate.test.mjs`

## Execution mapping

The accepted Sprint 4 deliverables were executed through ten reviewable workstreams:

1. authority, identity, and domain boundary;
2. purpose taxonomy;
3. data-category taxonomy;
4. grant, recipient, action, scope, and duration model;
5. revocation and lifecycle behavior;
6. access receipt format and audit boundary;
7. permission explanations and comprehension evidence;
8. deterministic policy evaluation;
9. TypeScript contracts, validators, tests, and public synthetic fixtures; and
10. cross-contract review and completion evidence.

This changed execution granularity only. It did not add to or modify the canonical Sprint 4 goal, deliverables, acceptance criteria, or non-scope.

## Cross-contract findings

### Permission truth and Chronicle truth

**Result:** consistent.

The House of Keys is implemented as the independent package `@calypsos-promise/house-of-keys`. It does not add grants, policy decisions, receipts, comprehension evidence, or permission state to `packages/health-schema`.

Chronicle identifiers may be referenced as controlled resources or exact selectors, but permission truth does not become Chronicle truth, source truth, derived truth, interpretive truth, product state, or AI memory.

### Authority and actor separation

**Result:** consistent at the accepted pre-stable boundary.

The contracts distinguish controlling person, requester, recipient, performing actor, processor, policy evaluator, receipt issuer, AI assistant, connector, operator, and maintainer. Ordinary grants require a controlling-person granting authority.

Requesters, recipients, processors, operators, AI systems, MCP clients, maintainers, and governance bodies cannot create or expand a person’s grant merely by appearing in a request or possessing technical access.

Production authentication, identity proofing, delegation, caregiver, dependent, minor, estate, emergency, and shared-control authority remain explicit hold points.

### Purpose and data-category scope

**Result:** consistent.

Purpose and data-category definitions are versioned, directly explained, lifecycle-aware, and divided into non-grantable families and explicit grantable leaves. Requests and grants snapshot exact definition revisions.

Blanket, wildcard, family, future-descendant, provider-label, file-format, “all health data,” “partners,” “improve the product,” and unspecified future-use shortcuts cannot silently create authority.

Data categories remain separate from Chronicle variable codes and distinguish Chronicle, source, derived, interpretive, and permission-truth scope.

### Grants, recipients, actions, selectors, and duration

**Result:** consistent after cross-contract remediation.

A grant binds one granting authority to a bounded purpose, primary recipient, controlled resource, subjects, category leaves, action leaves, optional performing-actor and processor constraints, structured conditions, narrowing selectors, duration, explanation, comprehension requirement, and confirmation evidence.

The review repaired and verified:

- exact purpose, recipient, category, and action revision snapshots;
- exact explanation-to-grant parity for scope, selectors, conditions, duration, optionality, and revisions;
- selector semantics in which an unrestricted grant may cover a narrower request, while a selector-bounded grant cannot authorize a request that omits or exceeds its narrowing selector;
- explicit support for exact permission-record selectors, record-lifecycle selectors, represented-data boundaries, and provenance-closure requirements;
- required performing-actor and processor facts failing closed when omitted; and
- prevention of implicit partial-grant composition.

### Revocation and lifecycle

**Result:** consistent at the normalized-state contract boundary, with projection and orchestration deferred.

The architecture defines immutable lifecycle events and prospective revocation. The TypeScript contract represents a current normalized lifecycle state on the evaluated grant and separately represents lifecycle events with transition actor, authority basis, effective time, recorded time, reason, and validated transition shape.

Deterministic evidence verifies that a withdrawn grant denies future authorization. Expired, exhausted, suspended, superseded, invalidated, proposed, pending-confirmation, and declined states also cannot authorize.

The pure evaluator does not orchestrate lifecycle transitions or derive a distributed current-state projection from an event store. Event-to-snapshot projection, ordering under concurrency, offline synchronization, cache invalidation, and production propagation remain later implementation and security work.

### Explanations, accessibility, comprehension, and confirmation

**Result:** consistent.

Explanation snapshots bind the exact grant revision, purpose, recipient, categories, selectors, actions, conditions, duration, optionality, direct summary, narrative summary, locale, and material-equivalence claim.

Narrative is optional and cannot alter the direct permission meaning. Mismatched explanation facts make the authority indeterminate rather than silently broadening it.

Comprehension evidence remains separate from confirmation and grant activation. Current satisfied evidence must cover a non-empty required concept set exactly. Stale, incomplete, inaccessible, deferred, invalidated, or unresolved evidence cannot become implicit permission.

The model preserves plain-language, direct-mode, assistive, translated, human-assisted, and non-AI paths without transferring granting authority or turning comprehension into an intelligence, literacy, health, loyalty, trust, reward, compensation, or governance score.

### Deterministic policy evaluation

**Result:** consistent after cross-contract remediation.

`evaluateHouseOfKeysPolicy` is pure and side-effect-free. It receives evaluation time and authority-bearing facts explicitly and performs no database, provider, network, filesystem, session, environment, random-number, or model lookup.

One atomic request returns exactly one inspectable outcome: `allow`, `deny`, or `indeterminate`.

- `allow` requires at least one single grant revision that independently covers the complete request.
- `deny` records known structural, scope, lifecycle, condition, comprehension, confirmation, duration, or policy prohibitions.
- `indeterminate` fails closed when a material fact is missing, stale, ambiguous, conflicting, unsupported, unresolved, or unmapped.

Unrelated denied or malformed optional secondary-use grants do not block an independently valid personal-core grant. Material uncertainty on a potentially authorizing candidate does prevent allow. Multiple independently authorizing grants remain inspectable and use deterministic ordering only for rendering.

A policy decision is point-in-time evidence, not a bearer token, execution instruction, operation outcome, lifecycle mutation, receipt, audit record, or Chronicle change.

### Access receipts and audit boundary

**Result:** consistent after cross-contract remediation.

The package includes a deliberate `AccessReceipt` contract, a public synthetic completed-access receipt, and deterministic receipt validation.

A receipt records the exact event kind, correlation identity, controlled resource, subjects, requester, recipient, actors, purpose, category and action revisions, selectors, grant revisions, policy request and decision references, outcome, execution state, release boundary, times, reasons, unresolved state, person-visible summary, correction link, and data classification.

Receipts remain separate from grants, decisions, operation attempts, operation outcomes, and protected operational or security audit records. A receipt does not create authority, and the absence of a receipt is not proof that no access occurred.

Production receipt issuance, persistence, delivery, signing, hash chaining, sequencing, monitoring, retention, incident handling, and recipient acknowledgment remain deferred.

### Incentive and institutional boundaries

**Result:** consistent.

The House of Keys contract contains no reward, progression, compensation, ownership, token, voting-weight, or governance-power field. Broader permission, extra disclosure, longer retention, research participation, receipt volume, or comprehension success cannot create superior core rights or progress.

A dedicated synthetic scenario verifies that an unrelated malformed optional research grant does not block an independently valid personal-core export. Refusal, deferral, misunderstanding, accessibility needs, revocation, correction, challenge, and return remain non-punitive.

The contract also preserves the Institutional Immune System through explicit reason codes, uncertainty, challengeable records, lifecycle containment, correction links, reversibility boundaries, and a visible unresolved register.

### Public synthetic evidence

**Result:** consistent.

The package baseline uses synthetic identities, recipients, records, grants, explanations, evidence, confirmations, receipts, and policy inputs. The validator rejects private fixture classification when the `public-or-synthetic` fixture policy is enabled.

No fixture represents a real person, organization, study, recipient, account, or health record.

## Deterministic evidence

The package now provides seventeen public synthetic policy scenarios:

1. exact personal-export allow;
2. blanket-category denial;
3. recipient mismatch;
4. withdrawn-grant denial;
5. expired-grant denial;
6. explicit policy prohibition;
7. unresolved recipient;
8. unknown category;
9. stale comprehension evidence;
10. comprehension explicitly not satisfied;
11. action mismatch;
12. prohibited partial-grant composition;
13. multiple independently authorizing grants;
14. conflicting bounded-count capacity;
15. personal-core authorization remaining independent from an unrelated malformed secondary-use grant;
16. denial when a selector-bounded grant is invoked without its narrowing selector; and
17. indeterminate handling of an unavailable category revision.

Across the two test files, twenty-nine Node tests verify the seventeen scenarios plus validation, exact explanation parity, receipt references, controlling-person grant authority, deterministic output bytes, evaluator non-mutation, JSON serialization, unrestricted-grant narrowing, required performing-actor handling, and decision/execution/receipt separation.

## Sprint acceptance review

- **No action can depend on blanket consent:** met through structural validation and deterministic blanket-scope denial.
- **Active grants are inspectable:** met through versioned grant contracts, exact revision snapshots, explanations, confirmations, lifecycle state, conditions, selectors, and per-grant evaluation findings.
- **Access receipts are inspectable:** met through the receipt contract, synthetic receipt, receipt validation, correction links, person-visible summaries, and exportable JSON representation.
- **Revocation tests verify future access is denied:** met through the withdrawn-grant policy scenario and lifecycle-state evaluation.
- **Essential use remains independent from research or commerce:** met through constitutional boundaries, contract optionality, absence of incentive coupling, and the personal-core independence scenario.
- **Missing or conflicting authority never defaults to allow:** met through `indeterminate` outcomes, ordered reason codes, and targeted synthetic cases.
- **Permission truth remains separate from Chronicle truth:** met through the independent package and explicit cross-domain references only.
- **Public development uses public or synthetic facts:** met through fixture classification, validation, and synthetic-only evidence.
- **Repository validation passes on the reviewed implementation head:** met.
- **No production capability is implied:** met through package, architecture, current-status, and deferred-work boundaries.

## Interchange and compatibility decision

The accepted `0.1.0-pre.1` interchange boundary is the strict TypeScript contract plus plain JSON-serializable representations exercised after cloning and serialization.

The contract is pre-stable. A change is compatibility-significant when it can alter authority, scope, outcome, reason-code meaning, required facts, lifecycle behavior, explanation or comprehension applicability, receipt meaning, public exports, or preserved synthetic evidence.

Complete JSON Schema, a safe decoder from unknown untrusted input, executable migrations, and production persistence are deferred. A future decoder or schema may not weaken fail-closed behavior, exact revisions, actor separation, purpose specificity, selector narrowing, lifecycle history, explanation parity, receipt inspectability, or personal-core independence.

## Deferred and unresolved register

The following remain deliberately unsettled:

- production accounts, authentication, identity proofing, recovery, delegation, and anti-Sybil behavior;
- multi-person, dependent, caregiver, minor, estate, emergency, mandatory, legal, institutional, and shared-control authority;
- event-to-current-state lifecycle projection and distributed revocation enforcement;
- transaction isolation, retries, idempotency, capacity reservation, atomic single-use consumption, and concurrent execution;
- production databases, APIs, repositories, queues, providers, connectors, and real-recipient registration;
- receipt issuance, delivery, signing, integrity, retention, downstream acknowledgment, monitoring, and incident response;
- retention exceptions, downstream deletion, restoration, notification, and jurisdiction-specific withdrawal rules;
- complete JSON Schema and safe decoding from unknown or hostile input;
- encryption, key management, malware handling, secure deletion, observability, and the integrated Sprint 5 threat model;
- accessibility conformance testing, localization governance, plain-language specialist review, and measurable comprehension thresholds;
- privacy, legal, security, clinical, research, accessibility, retention, and regulatory specialist approval;
- research enrollment, compensation, marketplaces, treasury, ownership, tokens, blockchain, NFTs, and on-chain governance; and
- production AI and remote MCP authorization.

These are future gates, not hidden assumptions or authority granted by omission.

## Hold points

Later work must stop and seek a reviewed decision if it would:

- place consent state or permission decisions inside Chronicle truth;
- let a requester, recipient, processor, operator, provider, AI system, MCP client, maintainer, founder, donor, or governance body independently create or broaden a person’s permission;
- use blanket, inferred, family-level, wildcard, indefinite, bundled, or future-descendant authority;
- compose partial grants into broader permission without a separately accepted rule;
- convert `indeterminate` into best-effort allow;
- reuse a decision after a material lifecycle, identity, policy, taxonomy, scope, condition, capacity, explanation, comprehension, or confirmation change;
- reward permission breadth, disclosure, retention, research, commerce, receipt volume, or comprehension success;
- require optional secondary use for personal-core Chronicle rights;
- represent revocation as retroactive erasure or guaranteed downstream deletion;
- treat a receipt as permission or a missing receipt as proof that no access occurred;
- introduce real health data or protected source material into public fixtures or contributor workflows; or
- represent an unresolved privacy, security, accessibility, legal, clinical, research, retention, or production question as approved.

## Validation evidence

Validated implementation and cross-contract-remediation head:

```text
365514660f7815f74d9774a64c585a1a9d573d20
```

- CI run `30187656617`, run number `333`: success
- DCO Attestation run `30187656625`, run number `366`: success
- formatting: success
- documentation links: success
- repository policy: success
- content validation: success
- lint: success
- typecheck: success
- tests: success

The final completion-record and status-only updates are validated separately on the final PR head and recorded in PR #33 and issue #32 before approval.

## Merge boundary

Sprint 4 is complete on the review branch but is not merged by this record. PR #33 remains the review and merge boundary. Merge requires explicit founding-steward approval, a green final head, and a truthful squash-merge DCO signoff using a GitHub-provided noreply address.

After merge, this record and the current-status record should be updated with the authoritative squash commit if the final merged state differs from the approved review head.
