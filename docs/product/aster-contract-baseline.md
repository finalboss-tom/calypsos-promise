# Aster Contract Baseline

[Documentation home](../README.md) · [Architecture boundary](../architecture/aster-contract-boundary.md) · [Role contracts](../architecture/aster-role-contracts.md) · [Proposal and extraction](../architecture/aster-proposal-and-extraction-contracts.md) · [Intent and refusal](../architecture/aster-intent-confidence-clarification-refusal.md) · [Source-linked recall](../architecture/aster-source-linked-recall-and-explanation-contracts.md) · [Memory lifecycle](../architecture/aster-memory-lifecycle-contracts.md) · [Untrusted input](../architecture/aster-untrusted-input-isolation-contracts.md) · [Work lifecycle](../architecture/aster-responsive-and-deferred-work-contracts.md) · [Provider governance](../architecture/aster-provider-governance-and-egress-contracts.md) · [Local adapter](../architecture/aster-local-synthetic-adapter-and-non-ai-fallbacks.md) · [Compatibility and migration](../architecture/aster-compatibility-migration-and-cross-contract-evidence.md) · [Sprint 6 completion](../roadmap/sprint-6-completion-record.md) · [Pre-Sprint 7 review](../roadmap/pre-sprint-7-alignment-review.md)

- **Status:** ACCEPTED PRE-STABLE CONTRACT — merged through PR #48
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`
- **Merge commit:** `5aa3540765e5573f3304ce2b624d7a02c3ba2d13`
- **Evidence boundary:** public contracts, deterministic validation, and public synthetic fixtures; not production implementation or independent review

Sprint 6 established a public, dependency-free Aster contract baseline for five narrative roles. The package owns proposal, explanation, player-controlled memory, untrusted-input, work-lifecycle, provider-governance, local-fixture, compatibility, and migration contracts without owning Chronicle truth, House of Keys permission truth, gameplay completion, application state, provider logs, retrieval indexes, protected audit, or institutional authority.

## Governing transaction

> AI proposes. The player confirms. The domain service validates and stores.

A role result, model output, provider response, retrieval result, memory, fixture, compatibility label, migration plan, queue acknowledgement, test, or CI run cannot become canonical truth, permission, domain completion, progression, reward, clinical authority, provider approval, or institutional authority.

## Role guarantees

- **Scribe:** prepares reviewable structured-capture proposals and extraction candidates but cannot confirm, validate, or store them.
- **Librarian:** prepares source-linked recall from exact Chronicle revisions or clearly labeled public educational material.
- **Wayfinder:** proposes routes and permission-review navigation without creating permission or invoking authoritative actions.
- **Interpreter:** explains source, mapping, lifecycle, and uncertainty limits without diagnosing or implying standards-based completeness or safety.
- **Storykeeper:** presents confirmed domain events without inventing canon, progression, quest completion, or rewards.

Narrative role names create no technical authority.

## Proposal and intent guarantees

- proposal identity, revision, role, operation, subject, request, source, transformation, confidence, uncertainty, clarification, payload, intended action, review, authority, and domain-outcome boundaries remain inspectable;
- confirmation binds the exact proposal revision and the player actor;
- proposal payloads and extraction candidates remain non-canonical, unconfirmed, and not domain-accepted;
- unknown, mixed, conflicting, unsupported, or materially ambiguous consequential intent requires clarification or refusal;
- confidence remains qualitative, explained, and explicitly non-authoritative; and
- unsupported intent includes a safe manual fallback.

## Source-linked recall and explanation

- every person-specific health statement requires an exact Chronicle record and revision reference;
- public educational material remains labeled and cannot establish a person-specific fact;
- source references preserve locator, schema, source version, lifecycle, correction, conflict, deletion, mapping, implementation-guide, and availability state;
- partial, lossy, conflicting, unsupported, stale, or unavailable source states require visible limitations and uncertainty;
- stale semantic retrieval requires a versioned structured-query fallback; and
- standards or implementation-guide conformance cannot prove clinical completeness, semantic equivalence, safety, endorsement, permission, or source authority.

## Memory lifecycle

The public memory classes separate:

- transient request context;
- retained preferences;
- accessibility context;
- separately chosen retained conversation;
- record-linked derived memory;
- narrative presentation state; and
- provider operational metadata.

Material product memory requires a separate visible player choice and remains visible, revision-editable, exportable, and deletable.

Transient context cannot silently become retained memory. Record-linked memory requires exact Chronicle evidence and falls back to recomputation or direct source inspection. Provider operational metadata remains outside product memory. Missing memory cannot block capture, permission review, correction, export, deletion, or ordinary play.

Memory cannot authorize training, research, commerce, secondary use, canonical writes, permission, confirmation, progression, or rewards.

## Untrusted-input isolation

Documents, images, imported records, web content, retrieved passages, provider responses, tool results, model output, and prior conversation remain untrusted data.

Deterministic application context owns the subject, purpose, authority revisions, allowed resources, and server-owned tool identities.

Embedded instructions cannot:

- modify policy or tool registries;
- choose a controlling subject;
- create or expand permission;
- expand action scope;
- bypass confirmation;
- invoke arbitrary resources;
- suppress sources, uncertainty, or conflicts;
- cross subject boundaries;
- persist themselves as memory;
- create canonical truth; or
- create clinical authority.

Material findings require blocking or manual fallback.

## Responsive and deferred work

- responsive, deferred, and manual-fallback work must match the selected role contract;
- work binds exact request, subject, authority, source, input, and policy revisions;
- deferred acceptance means accepted for later processing, not complete;
- only current successfully attempted work may expose a complete or partial proposal-only result;
- retry is explicit, bounded, freshness-preserving, and independent of provider defaults;
- domain duplicate safety cannot rely only on transport de-duplication;
- timeout and cancellation remain visible and cannot claim completion or universal reversal;
- provider unavailability activates a manual, deterministic, or structured-query fallback;
- stale, superseded, corrected, quarantined, or unknown-outcome work cannot overwrite current results or retry automatically under stale authority; and
- replay creates a new work identity while preserving prior evidence.

## Provider governance

The governance taxonomy intentionally omits production approval.

Public or synthetic evaluation:

- permits only minimum-necessary public or synthetic fields;
- rejects private personal data, Chronicle records, identifiers, House of Keys facts, receipts, memory, provider operational content, protected audit, and credentials;
- declares region, retention, logging, abuse monitoring, training, model improvement, human review, and subprocessors;
- prohibits training, model improvement, and provider human review for the Sprint 6 synthetic evaluation state;
- preserves deletion and downstream-copy uncertainty;
- requires provider-neutral criteria, evaluator independence, funding-conflict disclosure, concentration review, replacement, migration, teardown, incident, suspension, and correction paths; and
- prevents provider or sponsor claims from proving preferred status, source authority, clinical suitability, standards-based safety, independent review, zero retention, or complete deletion.

Funding, credits, sponsorship, affiliate terms, related parties, infrastructure support, enterprise distribution, or provider relationships cannot control provider defaults, source rank, connector rank, egress, criteria, findings, benchmark conclusions, publication, compatibility, migration, or governance.

## Local synthetic adapter and non-AI paths

The public adapter includes seventeen stable scenarios covering all five roles, successful drafting, source-linked recall, navigation, explanation, confirmed-event presentation, unknown and ambiguous intent, clarification, low confidence, refusal, prompt injection, timeout, provider unavailability, stale and superseded work, manual capture, and permission review.

The same scenario identifier produces the same serialized result. The adapter uses no provider, network, credentials, wall clock, randomness, or persistent storage.

Five role fallbacks and seven core paths preserve manual capture, structured recall, permission review, correction, export, deletion, and ordinary play without AI or a provider.

Local fixtures do not prove model quality, provider quality, production readiness, or specialist review.

## Compatibility and migration

The manifest covers twelve public components and binds each component to exact schemas, revisions, validators, fixtures, compatibility state, migration state, and non-authority.

- optional additive changes may remain compatible;
- required additions, enum expansion, field removal, semantic change, and revision rebases require migration evidence;
- unknown change fails closed;
- authority expansion is incompatible with ordinary migration and requires a new governing decision;
- migrations preserve source artifacts and prior revisions, create a new revision, declare rollback or forward-only behavior, and cite public synthetic fixtures; and
- compatibility and migration cannot create canonical, permission, confirmation, provider-default, source-ranking, publication, progression, or reward authority.

## Current evidence

- merged package contracts and deliberate public exports;
- deterministic validators with stable issue codes;
- public-surface tests importing only `dist/index.js`;
- public synthetic scenarios and fixture catalogue;
- exact role, operation, proposal-kind, source, fallback, component, provider-state, compatibility, and migration bindings;
- architecture and product documentation;
- twenty-four control objectives;
- nineteen open holdpoints; and
- nineteen unresolved-work records.

## Current limits

This baseline does not establish:

- production provider selection or procurement;
- private-data egress;
- production identity, permission orchestration, persistence, retrieval, memory storage, queueing, scheduling, workflow execution, or tools;
- production connectors, mappings, or clinical workflows;
- production migration or secure deletion;
- representative quality, latency, reliability, cost, accessibility, clinical, safety, or benefit evidence;
- legal, privacy, security, interoperability, clinical, accessibility, or operational approval; or
- independent specialist review.

The controlling open-gate record is the [Sprint 6 Specialist Holdpoint and Unresolved-Work Register](../architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md).

The [Pre-Sprint 7 Alignment Review](../roadmap/pre-sprint-7-alignment-review.md) defines how Forge MCP may consume public repository contracts without gaining private-data, mutation, shell, network, or consequential authority.
