# Availability, Backup, Restore, and Continuity Model

[Security architecture](README.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md) · [Encryption baseline](encryption-and-key-management-baseline.md) · [Living Chronicle security](living-chronicle-security-model.md) · [House of Keys enforcement](house-of-keys-enforcement-security-model.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent specialist review pending  
**Workstream:** 5.8  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** continuity and recovery requirements only; no production service objective, provider, backup system, replication topology, restore environment, incident platform, or operational runbook is selected, authorized, or represented as deployed

## Purpose

This model defines how Calypso's Promise preserves useful personal value and person rights during service degradation, data loss, corruption, ransomware, provider failure, regional failure, operator error, queue failure, and restoration.

It exists to prevent resilience shortcuts from:

- failing open when authority cannot be verified;
- restoring stale grants, sessions, records, receipts, or execution state;
- resurrecting information a person validly deleted;
- erasing corrections, conflicts, retractions, or tombstones;
- converting backups into hidden indefinite retention;
- treating a replica as an independent source of truth;
- using emergency operations as ordinary administrative access;
- claiming recovery because bytes were copied while domain meaning remained corrupt; or
- prioritizing optional AI and narrative features over core inspection, refusal, correction, export, deletion, and recovery rights.

This is a provider-independent architecture baseline. It does not select an availability target, cloud region, database, object store, queue, backup product, cryptographic service, observability platform, incident vendor, or disaster-recovery topology.

## Governing boundary

> Recovery restores validated authority-bearing domain state, not merely infrastructure availability or stored bytes.

A restored system is not safe to activate until it has reconciled:

- account compromise and session revocation;
- current Chronicle revisions and source versions;
- correction, conflict, supersession, retraction, and invalidation relationships;
- House of Keys lifecycle, capacity, and revocation state;
- execution, release, receipt, and reconciliation state;
- deletion requests, completion evidence, exceptions, and tombstones;
- compromised keys, secrets, services, artifacts, and environments;
- queue cancellations, idempotency identities, and dead-letter state; and
- incident containment decisions and unresolved residual risk.

Backup possession, restore completion, provider recovery, successful health checks, or operator approval does not create Chronicle truth, permission, recipient authority, deletion proof, or production readiness.

## Protected assets and boundaries

This model primarily covers:

- `AST-005` account, session, delegation, and recovery evidence;
- `AST-006` account-to-Chronicle pseudonym mappings;
- `AST-007` confirmed Chronicle records;
- `AST-008` raw source and attachment custody;
- `AST-009` provenance and derivatives;
- `AST-010` House of Keys grants and lifecycle;
- `AST-011` policy decisions;
- `AST-012` execution and release state;
- `AST-013` person-visible receipts;
- `AST-014` protected operational audit evidence;
- `AST-015` and `AST-016` AI and retrieval derivatives;
- `AST-018` connector synchronization state;
- `AST-020` keys, secrets, certificates, and service identities;
- `AST-022` backups, replicas, snapshots, archives, and recovery evidence; and
- `AST-023` analytical working state.

Relevant zones and crossings include `TZ-S0` through `TZ-S9`, especially `BX-008`, `BX-009`, `BX-013`, `BX-014`, and `BX-015`.

The design refines `THR-016`, `THR-021`, `THR-022`, `THR-028`, and `THR-031` through `THR-035`, while preserving the integrated `THR-*` and `RSK-*` identities.

## Availability principles

1. **Rights-critical paths are identified separately.** Inspection, correction, permission history, revocation, deletion request intake, export request intake, recovery, and receipt access are not hidden behind optional AI, story, analytics, or connector availability.
2. **Fail closed for authority; degrade safely for utility.** When identity, resource context, permission freshness, recipient identity, or execution state cannot be verified, sensitive actions stop. Read-only, manual, queued, or non-AI alternatives may continue only within explicit safe boundaries.
3. **Degradation is truthful.** The person can distinguish current data, stale data, unavailable data, queued actions, unresolved outcomes, and features operating through fallback modes.
4. **No stale offline authority.** Offline or disconnected clients cannot reuse stale grants, cached decisions, old sessions, or prior recipient facts to perform sensitive actions.
5. **No silent data loss.** Accepted writes, requests, revocations, corrections, deletion requests, and receipt intents require durable acknowledgment semantics before the interface claims completion.
6. **No unsafe restoration pressure.** Service objectives cannot justify bypassing correction, deletion, revocation, tenant isolation, recipient verification, or incident containment.
7. **Optional systems fail independently.** AI, retrieval, story, analytics, notifications, connectors, and research may degrade without collapsing core personal rights or canonical domain integrity.

## Capability criticality classes

### `continuity.rights-critical`

Capabilities whose unavailability can prevent a person from controlling or understanding their information:

- account recovery and compromise containment;
- Chronicle inspection and correction intake;
- permission inspection, refusal, suspension, and revocation intake;
- access-receipt inspection;
- deletion and export request intake;
- incident and challenge communication; and
- restoration of core account and Chronicle access.

These capabilities require explicit continuity objectives and accessible fallback behavior before production use.

### `continuity.core-value`

Capabilities needed for ordinary personal value but which may degrade without bypassing authority:

- manual Chronicle capture;
- confirmed structured record inspection;
- source and provenance inspection;
- deterministic quest evidence and product state; and
- manual export preparation where technically feasible.

### `continuity.optional-assisted`

Capabilities that may become unavailable without blocking core rights:

- AI drafting and explanation;
- semantic retrieval;
- automated connector synchronization;
- personal analytics;
- narrative presentation;
- nonessential notifications; and
- research or aggregate workflows.

A production design must not silently reclassify an optional assisted feature as rights-critical merely because the interface depends on it.

## Availability states

- `available` — the capability is operating within its accepted evidence boundary.
- `degraded-current` — current authoritative data remains available, but performance or nonessential functionality is impaired.
- `degraded-read-only` — safe inspection remains possible, while mutations and releases are blocked.
- `degraded-manual` — an accessible non-AI or human-assisted path remains available under the same authority rules.
- `queued-confirmed` — an accepted request is durably recorded but not completed; the interface shows its pending state.
- `impaired-unknown` — service behavior or accepted-write durability is uncertain; sensitive follow-on actions stop.
- `unavailable` — the capability cannot currently be used.
- `containment-hold` — security or integrity containment intentionally prevents use.
- `recovering-isolated` — restoration is underway outside active production.
- `validation-hold` — service is technically reachable but not approved for authoritative use.
- `restored-bounded` — the capability is active for a defined scope after reconciliation and validation.

No state may be rendered as fully available when authority, correctness, durability, or deletion status remains unresolved.

## Safe degradation rules

### Identity and account services

When account or session authority is unavailable or uncertain:

- new sensitive sessions and high-consequence actions fail closed;
- existing sessions do not receive broader authority;
- compromise-containment and recovery intake remain separately available where possible;
- cached account-to-Chronicle mappings do not become an offline authority source; and
- support cannot substitute operator judgment for missing identity evidence.

### Chronicle and source services

When canonical or source custody systems are degraded:

- the interface distinguishes cached or stale display data from current authoritative data;
- new confirmations, corrections, merges, deletions, and exports stop if required dependencies cannot be verified;
- temporary capture may be stored only through an explicit draft or pending state with no canonical claim;
- source unavailability does not silently remove provenance warnings; and
- AI or retrieval results do not substitute for structured records.

### House of Keys and execution

When policy evaluation, lifecycle projection, capacity, queue, recipient verification, or receipt capability is unavailable:

- no sensitive release or irreversible operation proceeds on a cached `allow`;
- existing execution envelopes expire at their shortest bound;
- revocation and suspension intake remains separately durable where possible;
- ambiguous queue or external outcomes enter reconciliation rather than automatic retry; and
- inability to create a required receipt blocks release when the policy requires that receipt.

### AI, retrieval, connectors, and analytics

When assisted systems are unavailable:

- manual capture, direct structured inspection, permission administration, correction, and deletion remain possible through non-AI paths;
- connector outage stops future synchronization without corrupting prior accepted records;
- retrieval outage does not affect structured-value authority; and
- analytics or story degradation does not modify Chronicle or House of Keys truth.

## Backup purpose and boundary

A backup is a controlled recovery representation created for a declared disaster-recovery purpose. It is not:

- an analytics warehouse;
- a shadow Chronicle;
- an alternate permission system;
- an indefinite archive;
- a source of current lifecycle truth by itself;
- a recipient release;
- evidence that deletion completed everywhere; or
- permission to retain material beyond its accepted schedule.

Backup scope must be explicit by domain and representation. A recovery plan must identify which of the following are included, excluded, reconstructed, or deliberately disposable:

- account and session evidence;
- Chronicle records and source versions;
- provenance and relationship history;
- House of Keys grants and lifecycle events;
- execution and release state;
- person-visible receipts;
- protected audit evidence;
- connector state;
- indexes, embeddings, caches, and temporary derivatives;
- key and secret metadata without exporting raw protected key material improperly;
- deletion requests, exceptions, tombstones, and completion evidence; and
- schemas, policies, code revisions, manifests, and migration information needed for interpretation.

## Backup requirements

### Scope and manifests

Every backup set must have a versioned manifest identifying:

- environment and recovery boundary;
- owning domains;
- covered time and snapshot boundary;
- included and excluded asset classes;
- schema, policy, and contract revisions;
- integrity evidence and verification status;
- encryption and recovery-key references;
- retention and expiry schedule;
- deletion and exception behavior;
- predecessor, successor, and dependency sets;
- backup creator and accountable service identity; and
- unresolved warnings or partial completion.

### Isolation

Backups require separation from the active failure domain through:

- separate credentials and service identities;
- least-capability write and restore roles;
- encryption and key separation;
- resistance to ordinary application deletion or ransomware reach;
- no public or contributor access;
- no automatic mounting into production; and
- independent inventory and expiry evidence.

Isolation is relative, not absolute. The exact provider, account, region, and key topology remains an implementation decision requiring specialist review.

### Retention

Backup retention must be:

- purpose-limited;
- versioned and reviewable;
- no longer than the accepted recovery need;
- compatible with deletion and retention-exception contracts;
- able to identify expired and destroyed backup sets;
- unable to reset merely because a backup was copied or migrated; and
- explicit about copies outside direct project control.

A backup schedule cannot silently become a new reason to retain data indefinitely.

### Validation and restore testing

A backup is not considered recovery-ready because the provider reports success. Evidence must include:

- manifest completeness;
- integrity verification;
- ability to decrypt through authorized recovery identities;
- schema and contract compatibility;
- restoration into an isolated environment;
- tenant and resource separation checks;
- replay of post-snapshot lifecycle events;
- correction, revocation, deletion, and tombstone reconciliation;
- queue and idempotency reconciliation;
- representative synthetic restoration tests; and
- documented gaps, failures, and residual risk.

Public repository evidence may use only public or synthetic fixtures. Production restore evidence, if later created, remains protected.

## Backup lifecycle states

- `planned`
- `capturing`
- `captured-unverified`
- `integrity-verified`
- `recovery-key-verified`
- `restore-tested-synthetic`
- `restore-tested-protected`
- `degraded-partial`
- `quarantined`
- `expired`
- `destruction-pending`
- `destroyed-bounded`
- `unavailable`
- `unknown`

No backup may be called tested merely because one file or one provider console action succeeded.

## Restore workflow

### 1. Declare the recovery case

A restore begins with a stable recovery-case identity recording:

- trigger and affected environments;
- incident or continuity reference;
- accountable recovery lead and approvers;
- requested scope;
- selected backup set and snapshot boundary;
- source and recovery environment identities;
- expected data-loss and service-impact boundaries;
- key and credential requirements;
- containment requirements; and
- unresolved assumptions.

### 2. Materialize in isolation

The selected backup is restored into a recovery environment that:

- cannot receive ordinary production traffic;
- uses recovery-specific identities and credentials;
- cannot send external releases, notifications, connector writes, model requests, or recipient deliveries by default;
- has bounded egress;
- preserves evidence of every restore action; and
- supports rollback or destruction without affecting active production.

### 3. Validate technical integrity

Validation covers:

- manifest and object completeness;
- integrity and decryption results;
- schema and migration compatibility;
- tenant, Chronicle, subject, source, and recipient isolation;
- reference and provenance resolution;
- queue, cache, index, and derivative treatment;
- key, secret, certificate, and workload-identity state; and
- evidence of corruption, malware, ransomware, or unauthorized modification.

### 4. Reconcile domain authority

Before activation, the recovery environment replays or reconciles every applicable event after the snapshot boundary, including:

- account compromise, recovery, and session revocation;
- Chronicle correction, supersession, retraction, invalidation, and deletion;
- source deletion, custody change, or integrity failure;
- House of Keys suspension, expiry, exhaustion, withdrawal, supersession, and invalidation;
- policy-decision invalidation;
- operation completion, partial release, failure, cancellation, and reconciliation;
- receipt creation, delivery, correction, challenge, or deletion state;
- connector revocation and cursor correction;
- key, secret, service, dependency, artifact, and environment compromise;
- retention exceptions and their expiry; and
- tombstones preventing identifier reuse or accidental resurrection.

A record that cannot be reconciled enters an explicit conflict, unavailable, quarantined, or validation-hold state. Missing ordering evidence never becomes a clean current-state claim.

### 5. Verify deletion and retention behavior

The restore must demonstrate that:

- material deleted before the snapshot is absent or represented only by an allowed tombstone or exception;
- material deleted after the snapshot is removed or blocked before activation;
- derived indexes and caches are rebuilt from reconciled authoritative state;
- expired exports and temporary artifacts do not reappear;
- withdrawn permissions and cancelled jobs remain non-applicable;
- retention exceptions remain narrow, current, and reviewable; and
- deletion completion claims remain bounded to controlled evidence.

### 6. Authorize bounded activation

Activation requires explicit evidence that:

- the recovery scope is understood;
- current authority state has been reconciled;
- required controls are available;
- compromised credentials or components are not reused;
- residual inconsistencies are contained;
- person-facing status language is accurate; and
- rollback remains available for the declared activation window.

No single founder, provider console, operator account, or automated health check may unilaterally declare a high-consequence restore safe.

### 7. Monitor and close

After activation:

- compare restored and expected domain state;
- monitor for resurrected deletions, stale grants, duplicate jobs, missing receipts, cross-tenant references, and integrity drift;
- correct person-visible records and receipts where necessary;
- notify affected people when applicable;
- retire temporary recovery credentials and environments;
- preserve minimized protected evidence; and
- record residual harm and follow-up actions.

## Restore states

- `requested`
- `scoped`
- `authorized-for-isolation`
- `materializing`
- `technical-validation`
- `domain-reconciliation`
- `deletion-reconciliation`
- `validation-hold`
- `activation-review`
- `activated-bounded`
- `monitoring`
- `rolled-back`
- `failed`
- `quarantined`
- `closed-with-residual-risk`

## Ransomware and destructive-operator boundary

Recovery planning must assume that an attacker or privileged actor may:

- encrypt or destroy active data;
- corrupt snapshots or replication streams;
- revoke or steal keys and credentials;
- alter deletion or lifecycle records;
- falsify health checks or audit evidence;
- create malicious backups after compromise;
- delete clean recovery points;
- trigger unauthorized restore operations; or
- pressure the project to restore before reconciliation is complete.

Required design properties include:

- backup and key separation;
- immutable or otherwise protected recovery points where appropriate;
- multi-party high-consequence recovery approval;
- clean credentials and service identities;
- the ability to identify a last-known-good boundary;
- protected evidence independent from ordinary application logs;
- isolated rebuild from reviewed artifacts;
- explicit communication and person-rights preservation; and
- post-restoration correction, notification, and residual-harm handling.

## Provider and regional failure

A future production design must document:

- dependencies that can fail together;
- provider, account, region, network, identity, key, and control-plane failure assumptions;
- whether replication is synchronous, asynchronous, reconstructable, or intentionally absent;
- data-loss and recovery boundaries by domain;
- safe behavior when one region or provider has stale authority state;
- cutover, rollback, and split-brain prevention;
- person-visible status and fallback behavior;
- provider-exit and founder-absence procedures; and
- evidence required before claiming resilience.

Multi-region or multi-provider architecture is not automatically safer. It may multiply data copies, deletion obligations, credentials, attack surfaces, inconsistency, cost, and operational error.

## Current evidence and non-scope

Current evidence is limited to:

- architecture and contract separation;
- public and synthetic fixture policy;
- repository validation;
- deletion-aware Chronicle and House of Keys models;
- encryption, key, secret, and environment requirements; and
- this internal design baseline.

The following do not exist and are not implied:

- production service objectives;
- production monitoring or paging;
- production databases, queues, object stores, replicas, or backups;
- restore-tested protected environments;
- ransomware exercises;
- provider or regional failover;
- operational recovery staff or on-call coverage; or
- independent security, privacy, reliability, accessibility, legal, or records-governance approval.

## Review and revalidation triggers

Revalidate this model when:

- a production or pilot environment is proposed;
- a database, object store, queue, cache, index, backup, or replication provider is selected;
- service objectives or continuity tiers are defined;
- a new persistent derivative or external recipient is introduced;
- an encryption or key topology changes;
- a restore or failover is exercised;
- a deletion or revocation propagation failure occurs;
- an incident reveals a new shared failure domain;
- a provider, region, founder, or critical operator dependency changes; or
- specialist review changes the accepted risk boundary.
