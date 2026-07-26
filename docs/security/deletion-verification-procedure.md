# Deletion Verification Procedure

[Security architecture](README.md) · [Living Chronicle security](living-chronicle-security-model.md) · [Availability and restore model](availability-backup-and-restore-model.md) · [Incident and audit plan](incident-response-and-audit-retention-plan.md) · [Security policy](../../SECURITY.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent specialist review pending  
**Workstream:** 5.8  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only procedure  
**Production boundary:** procedure and evidence vocabulary only; no production deletion worker, provider integration, recipient workflow, backup expiry automation, verification service, legal retention schedule, or operational completion claim is authorized or represented as deployed

## Purpose

This procedure defines how Calypso's Promise resolves, executes, verifies, communicates, corrects, and challenges deletion across controlled domain objects, derivatives, providers, backups, receipts, protected audit evidence, and external recipients.

It exists to prevent:

- one row or file deletion being represented as universal erasure;
- deletion claims based only on an interface state or provider response;
- stale caches, indexes, queues, exports, prompts, model copies, or analytics surviving silently;
- backups resurrecting deleted material;
- deletion being used as a substitute for correction, retraction, revocation, or consent withdrawal;
- attackers using account takeover to erase evidence or a person's Chronicle;
- retention exceptions being invented or expanded silently;
- tombstones retaining unnecessary sensitive information;
- receipts or audit evidence disappearing in ways that prevent accountability;
- external-recipient uncertainty being hidden; or
- deletion verification becoming a reason to retain the content being deleted.

## Governing principle

> A deletion completion record proves only the bounded procedure and evidence it identifies. It does not prove that every uncontrolled downstream copy ceased to exist.

Deletion truth remains separate from:

- account identity and recovery;
- Chronicle truth and correction;
- source truth and custody;
- House of Keys permission and revocation;
- execution and release state;
- receipt truth;
- protected audit evidence;
- backup and restore state;
- recipient behavior; and
- legal or institutional authority.

## Scope and threat mapping

The procedure refines `THR-002`, `THR-005`, `THR-008`, `THR-016`, `THR-021`, `THR-022`, `THR-025` through `THR-027`, `THR-031`, `THR-033`, `THR-034`, `THR-036`, `THR-037`, `THR-040`, `THR-043`, and `THR-045` without replacing the integrated threat or residual-risk records.

It applies to deletion targets involving:

- Chronicle records and relationships;
- source artifacts, source versions, locators, and attachments;
- stored and derived representations;
- account-to-Chronicle mappings and account closure effects;
- House of Keys records and permission history;
- execution and release state;
- person-visible receipts;
- protected audit evidence;
- AI prompts, outputs, conversations, provider copies, and model-side records;
- indexes, embeddings, caches, retrieval results, and search metadata;
- connector credentials, cursors, payloads, and provider-side copies;
- exports, previews, temporary files, queues, retries, and dead letters;
- analytics and research working sets;
- backups, replicas, snapshots, and archives;
- public, preview, CI, support, and incident artifacts where exposure occurred; and
- external recipient copies and attestations.

## Deletion is not correction or revocation

The procedure preserves these distinctions:

- **Correction** changes the current representation while preserving necessary history.
- **Retraction** withdraws a claim as unreliable.
- **Invalidation** makes an object unusable for a declared purpose.
- **Revocation** removes future permission.
- **Account closure** ends an account relationship under its own contract.
- **Research withdrawal** ends study participation under study-specific rules.
- **Source detachment** removes a relationship without necessarily deleting source bytes.
- **Deletion** erases, detaches, makes unavailable, or minimizes an explicit target under a declared scope.

One action may trigger another, but none silently substitutes for the others.

## Required deletion request

A deletion request must preserve:

- stable request identity and revision;
- requesting actor and verified authority basis;
- Chronicle or controlled-resource identity derived server-side;
- explicit target kinds and identifiers or bounded selectors;
- requested effect;
- request time;
- cancellation state;
- accessibility and communication preferences;
- whether account closure, connector revocation, research withdrawal, or another adjacent action is also requested;
- known legal, security, incident, or technical constraints;
- challenge and support path; and
- current processing state.

The person does not need to provide a persuasive reason for an ordinary supported deletion request.

High-consequence deletion requires proportionate identity and authority verification. Health-history questions, operator familiarity, payment, device possession alone, or technical access do not establish deletion authority.

## Deletion target classes

### `target.canonical`

Authoritative domain objects such as Chronicle records, source artifacts, grants, relationships, receipts, or account mappings.

### `target.custody`

Stored source representations, attachments, objects, provider copies, and custody references.

### `target.derivative`

OCR, transcripts, normalized payloads, thumbnails, previews, embeddings, indexes, caches, summaries, model drafts, analytics, and other recomputable or disposable outputs.

### `target.execution`

Queued work, retries, dead letters, idempotency records, temporary release artifacts, connector jobs, and execution state.

### `target.portability`

Export artifacts, delivery links, temporary packaging, manifests, and generated human-readable or machine-readable copies.

### `target.evidence`

Person-visible receipts, protected audit records, incident evidence, access history, retention exceptions, tombstones, and deletion completion evidence.

### `target.recovery`

Backups, replicas, snapshots, archives, restoration environments, and recovery manifests.

### `target.external`

Connector-provider, model-provider, processor, research, analytics, recipient, public-cache, or other copies outside direct project-controlled storage.

## Control boundary classes

Each resolved target receives one control-boundary class.

### `controlled-direct`

The project can issue and verify the deletion operation directly within an owned domain service or storage boundary.

### `controlled-provider`

The project controls the account or contract but relies on provider APIs, lifecycle evidence, expiry, or support processes.

### `controlled-delayed`

Deletion cannot complete immediately because of backup schedules, queue processing, offline devices, asynchronous providers, or declared technical constraints.

### `retained-exception`

Minimum necessary information remains under a named, scoped, time-bound, reviewable authority or policy.

### `external-cooperative`

A recipient or external actor has agreed to deletion or return obligations, but the project cannot independently verify all copies.

### `external-uncontrolled`

The project cannot compel, observe, or verify deletion of all copies, such as public clones, screenshots, exports held by a person, or onward distribution.

### `unknown-boundary`

Ownership, location, state, or control cannot currently be resolved. Unknown never becomes complete.

## Procedure states

- `received`
- `authority-verification`
- `scope-resolving`
- `dependency-resolving`
- `exception-review`
- `ready-for-execution`
- `processing-active`
- `derivative-invalidation`
- `provider-pending`
- `recipient-pending`
- `backup-expiry-pending`
- `verification-active`
- `partially-completed`
- `retained-under-exception`
- `completed-bounded`
- `failed`
- `blocked-security-hold`
- `challenged`
- `correction-active`
- `cancelled`
- `closed-with-residual-copies`

No interface may collapse these states into one ambiguous `deleted` boolean.

## Step 1 — verify authority without expanding it

Before destructive action:

1. derive the account, Chronicle, subject, and resource context server-side;
2. verify the current actor and authority basis;
3. use action-specific step-up where required;
4. check compromise, recovery, delegation, estate, caregiver, or contested-control state;
5. confirm that the request targets the intended resource and scope;
6. allow safe cancellation before irreversible processing where supported;
7. prevent operators, agents, connectors, providers, or recipients from inventing deletion authority; and
8. record uncertainty and route contested requests to review rather than guessing.

Recovery of account access does not automatically restore deletion authority. Emergency containment may pause deletion, but it cannot silently deny the right permanently.

## Step 2 — resolve the complete target graph

The deletion resolver expands each target into an inspectable dependency graph covering, as applicable:

- predecessor and successor records;
- source artifacts, versions, locators, attachments, and custody copies;
- provenance, transformations, derivations, associations, and inferences;
- corrections, conflicts, duplicate decisions, merges, and preferred presentation;
- account mappings and identity references;
- grants, decisions, execution envelopes, operations, receipts, and audit references;
- exports, temporary downloads, delivery links, and recipient releases;
- queued, retried, dead-lettered, or scheduled work;
- connector cursors, payloads, credentials, and future synchronization;
- prompts, outputs, provider-side data, conversations, embeddings, and indexes;
- analytics, research, and reporting working sets;
- backups, replicas, snapshots, archives, and restoration copies;
- retention exceptions, incident holds, and tombstones; and
- public or external copies known to the project.

Dependency resolution records included, excluded, unavailable, unknown, already deleted, and retained targets with reasons.

The graph must not retain full deleted content merely to prove the graph existed. Stable references, minimized metadata, and non-sensitive tombstones are used where sufficient.

## Step 3 — classify effects

Each target receives an intended effect:

- `erase-content`
- `delete-object`
- `detach-relationship`
- `revoke-access`
- `invalidate-dependent`
- `recompute-without-target`
- `expire-temporary-artifact`
- `remove-from-index`
- `stop-future-sync`
- `destroy-credential`
- `minimize-evidence`
- `retain-under-exception`
- `tombstone-minimum`
- `request-external-deletion`
- `record-uncontrolled-copy`

The procedure states what remains after each effect and why.

## Step 4 — review exceptions and holds

A retention exception or security hold must identify:

- target and minimum retained fields;
- authority or policy reference;
- purpose;
- accountable actor;
- start time;
- review time;
- expected end or condition;
- access restrictions;
- whether appeal or challenge is available;
- deletion behavior when the exception ends; and
- affected completion language.

Exceptions cannot be created from institutional convenience, future analytical interest, vague safety concerns, provider defaults, backup limitations, or the desire to avoid implementation work.

Incident evidence is minimized. A security hold does not authorize retaining unrelated Chronicle or source content.

## Step 5 — stop future creation and propagation

Before or alongside deletion, the system prevents regeneration by:

- stopping connector synchronization;
- revoking provider or processor credentials where applicable;
- cancelling queued and scheduled work;
- invalidating execution envelopes and cached policy decisions;
- removing target membership from retrieval and analytical pipelines;
- blocking model, export, notification, or recipient jobs;
- applying tombstones or non-reimport markers where justified;
- invalidating derivations and dependent records;
- updating source and custody lifecycle state; and
- preventing backup restoration from reactivating the target.

Deletion that leaves the original creation or synchronization path active is incomplete.

## Step 6 — execute controlled deletion

Controlled deletion proceeds by domain with:

- stable operation and idempotency identities;
- exact target and environment binding;
- actor and service identity;
- start, completion, failure, and retry times;
- provider response or local operation evidence;
- before-and-after lifecycle state;
- dependency outcome;
- exception and tombstone references;
- error and unresolved-state handling; and
- no raw content in ordinary operational logs.

Retries must not recreate deleted material or double-delete adjacent targets incorrectly. Unknown outcomes enter reconciliation rather than being represented as success.

## Step 7 — invalidate derivatives and indexes

Derived deletion verification covers:

- caches;
- keyword and vector indexes;
- embeddings;
- thumbnails and previews;
- OCR and transcripts;
- normalized payloads;
- model drafts and conversation derivatives;
- analytical working sets;
- temporary files;
- export artifacts;
- generated summaries; and
- provider-side processing copies.

A disposable derivative is rebuilt from reconciled authoritative state when needed. A deletion event or tombstone must prevent stale derivative restoration.

Successful index removal does not prove source or canonical deletion. Successful canonical deletion does not prove index removal. Both receive separate evidence.

## Step 8 — handle backups and recovery copies

Backup deletion follows one of these explicit outcomes:

- immediate target-level removal where the accepted backup design safely supports it;
- backup-set retirement and destruction;
- cryptographic inaccessibility under a bounded, verified key-destruction claim;
- expiry under a declared schedule with an active deletion tombstone or reconciliation ledger;
- retained-under-exception; or
- unresolved or failed.

Until the relevant backup copies expire or are destroyed, the request remains `backup-expiry-pending` or `partially-completed` unless the accepted architecture defines a bounded completion claim that clearly states the remaining backup condition.

Every restore must replay deletion state before activation. A restored copy that resurrects deleted material is a material incident.

## Step 9 — address external recipients and providers

For an external recipient or provider:

1. identify the exact organization, processor, provider account, recipient, purpose, and released scope;
2. identify the authority or obligation supporting the deletion request;
3. send the bounded request through an approved channel;
4. record acknowledgment, denial, partial compliance, inability, no response, or unknown state;
5. request evidence appropriate to the relationship;
6. record onward recipients or subcontractors when known;
7. update person-visible status without overstating control; and
8. escalate legal, privacy, research, contractual, incident, or governance review when required.

A recipient attestation is evidence of a claim. It is not independent proof that every copy, backup, screenshot, model, or onward disclosure ceased to exist.

Public copies, exported copies held by the person, recipient-controlled systems, and unlawful copies may remain outside project control. Residual risk is explicit.

## Step 10 — verify each target

Verification evidence may include:

- domain-object absence or allowed tombstone state;
- source and custody lifecycle state;
- provider deletion operation identity and response;
- object, index, cache, queue, or export inventory reconciliation;
- derivative rebuild completion;
- connector revocation and future-sync stop evidence;
- model-provider or processor request and acknowledgment;
- backup manifest and expiry state;
- restore test demonstrating non-resurrection;
- receipt and audit correction links;
- retention-exception review;
- recipient response;
- public-artifact removal attempts; and
- unresolved or uncontrolled copy records.

Verification must be repeatable and tied to a target, environment, time, method, and accountable actor. A screenshot, user-interface message, provider marketing claim, or one successful API response is insufficient by itself for a broad completion claim.

## Verification outcome vocabulary

- `verified-controlled-deletion`
- `verified-derivative-invalidation`
- `verified-future-sync-stopped`
- `verified-temporary-artifact-expired`
- `verified-backup-expired`
- `verified-backup-destroyed-bounded`
- `verified-restore-non-resurrection`
- `provider-acknowledged`
- `recipient-attested`
- `retained-under-exception`
- `uncontrolled-copy-known`
- `uncontrolled-copy-possible`
- `verification-failed`
- `verification-unavailable`
- `verification-conflicting`
- `verification-pending`

## Step 11 — issue bounded completion evidence

Deletion completion evidence records:

- request and scope-resolution identities;
- completed targets and effects;
- methods and times;
- accountable actors and services;
- provider and recipient evidence references;
- derivative and backup outcomes;
- retained-under-exception targets;
- tombstones;
- failed, unknown, unavailable, or uncontrolled targets;
- residual copies and uncertainty;
- restoration non-resurrection evidence where available;
- correction and challenge path; and
- plain-language summary.

Allowed completion language includes:

- **Completed for identified active project-controlled copies.**
- **Completed for active copies; identified backups remain pending expiry.**
- **Partially completed; named targets remain under exception or unresolved.**
- **External deletion requested; recipient compliance is not independently verified.**
- **Public exposure removal attempted; downstream copies may remain.**

Prohibited completion language includes:

- “deleted everywhere” without evidence covering every controlled and external copy;
- “permanently erased” when backups, recipients, providers, public copies, or cryptographic dependencies remain uncertain;
- “no one can access it” based only on application-state deletion;
- “revoked and deleted” when only future permission was withdrawn; or
- “no access occurred” because a receipt or audit event is missing.

## Step 12 — person-visible status and challenge

The person can inspect:

- what they asked to delete;
- resolved targets and dependencies;
- what was deleted, detached, invalidated, retained, or left unresolved;
- backup and external-recipient state;
- exceptions and review dates;
- completion evidence and limitations;
- whether future synchronization or processing stopped;
- whether corrections or receipts were created; and
- how to challenge, correct, or escalate the result.

Status must be accessible without story traversal, AI use, payment, research participation, broader consent, or additional health disclosure.

A challenge may produce:

- scope correction;
- additional target discovery;
- exception review;
- renewed provider or recipient request;
- receipt correction;
- incident escalation;
- restoration correction;
- public statement correction; or
- explicit confirmation that the target remains outside project control.

## Tombstone requirements

A tombstone is allowed only for a declared purpose such as:

- preventing identifier reuse;
- preventing accidental resurrection;
- preserving dependent unavailability;
- recording bounded deletion completion; or
- blocking reimport from an unchanged external source.

Tombstones must:

- retain only allowlisted non-sensitive fields;
- avoid raw health values, free text, source bytes, credentials, or identity-provider subjects;
- identify purpose and deletion request;
- be environment and domain scoped;
- have expiry or review behavior where appropriate;
- remain inaccessible to unrelated analytics, product, or AI use; and
- be included in restore reconciliation.

## Receipt and audit handling

Deletion may require preserving a minimized permission-history or incident fact so the person can understand material access. This does not justify retaining full deleted Chronicle content.

Receipt and audit handling must distinguish:

- deletion of referenced content;
- deletion or minimization of the receipt or audit record itself;
- retention under exception;
- correction of a false or incomplete receipt;
- preservation of a non-sensitive reference or omission reason; and
- expiry of operational evidence.

Audit and receipt access remain separately authorized. Neither becomes a shadow copy of deleted content.

## Incident triggers

The following are material incident triggers:

- unauthorized deletion or deletion attempt;
- deletion under a compromised account or operator capability;
- deletion of the wrong Chronicle, subject, source, recipient, or environment;
- claimed completion with known remaining controlled copies;
- backup restoration resurrecting deleted material;
- connector or provider continuing synchronization after deletion or revocation;
- stale indexes, model context, analytics, or exports remaining usable;
- retention exception without authority or review;
- tombstone tampering or excessive sensitive retention;
- false, missing, or inaccessible deletion receipt;
- deletion evidence corruption or forgery;
- external recipient noncompliance with material ongoing harm; or
- public exposure continuing after the project claimed removal.

## Current evidence and non-scope

Current evidence consists of:

- pre-stable Living Chronicle deletion contracts;
- source, dependency, correction, export, and tombstone models;
- House of Keys revocation, execution, receipt, and reconciliation models;
- backup and restore requirements;
- encryption, secret, environment, and protected-audit boundaries;
- public security reporting and confidentiality policies; and
- this internal procedure.

The project does not currently have:

- production personal data or deletion requests;
- production deletion workers or provider integrations;
- production backup expiry or target-level deletion;
- recipient deletion workflows;
- model-provider or connector deletion integrations;
- deletion monitoring or automated reconciliation;
- legal retention schedules;
- protected deletion exercises; or
- independent security, privacy, legal, accessibility, clinical, research, or records-governance approval.

## Review and revalidation triggers

Revalidate this procedure when:

- a persistent production asset or derivative is introduced;
- a provider, connector, model, recipient, research, analytics, backup, or archive system is selected;
- deletion, correction, export, revocation, or account-closure contracts change;
- a retention exception or legal hold is defined;
- a restore test or incident reveals resurrection or stale derivatives;
- a provider or recipient cannot honor a deletion request;
- completion language or person-visible interfaces change;
- a deletion challenge or failure occurs; or
- specialist review changes the accepted boundary.
