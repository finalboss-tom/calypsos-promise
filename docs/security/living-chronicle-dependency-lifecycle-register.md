# Living Chronicle Dependency and Lifecycle Security Register

[Security architecture](README.md) · [Chronicle security model](living-chronicle-security-model.md) · [Chronicle control register](living-chronicle-control-register.md) · [Threat and residual-risk register](threat-and-residual-risk-register.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent specialist review pending  
**Workstream:** 5.4  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** design register only; no runtime projection, recomputation, export, deletion, custody, backup, or recipient-notification mechanism is authorized or represented as deployed

## Purpose

This register defines the explicit security outcomes required when Chronicle records, sources, methods, relationships, derivatives, exports, custody, retention, or restored state change.

It prevents a dependent record, index, export, inference, receipt, analytical result, or backup from silently remaining current after its support has changed.

## Identifier families

- Dependency outcomes use `LC-DEP-*`.
- Source and custody outcomes use `LC-SRC-*` and `LC-CST-*`.
- Inference handling states use `LC-INF-*`.
- Export outcomes use `LC-EXP-*`.
- Deletion outcomes use `LC-DEL-*`.
- Restoration outcomes use `LC-RST-*`.

These IDs describe architecture and evidence states. They do not perform an operation or prove deployment.

## Dependency outcome vocabulary

### `LC-DEP-UNCHANGED` — dependency remains valid

The supporting state changed, but deterministic review shows the dependent representation and its meaning remain valid.

Required evidence:

- changed dependency identity and revision;
- review method and version;
- responsible actor or deterministic service;
- reason the dependent remains valid;
- review time; and
- next revalidation trigger where applicable.

### `LC-DEP-WARNING` — retained with visible limitation

The dependent remains usable only with an explicit warning, limitation, uncertainty, or degraded-provenance notice.

The warning cannot be hidden from exports, person-facing views, or later high-consequence review.

### `LC-DEP-SOURCE-UNAVAILABLE` — source cannot currently be inspected

The dependent remains addressable, but one or more supporting source versions or locators are unavailable, expired, deleted, or inaccessible.

This state does not claim that the dependent is false. It records that verification is degraded.

### `LC-DEP-PROVENANCE-DEGRADED` — source chain is incomplete

The dependent retains some support, but the complete provenance chain can no longer be resolved.

Required behavior:

- identify missing nodes and relationships;
- preserve remaining chain;
- block any claim of complete provenance;
- review external release and high-consequence use; and
- include the limitation in exports.

### `LC-DEP-RECOMPUTE` — deterministic recomputation required

A required input, method, mapping, unit, temporal interpretation, or source changed and the dependent can be regenerated through a currently accepted method.

The prior dependent remains historical evidence and is not silently overwritten.

### `LC-DEP-INVALIDATED` — unusable for named purpose

A contract, policy, integrity, dependency, or method condition makes the dependent unusable for a specified purpose.

Invalidation records:

- rule and version;
- triggering evidence;
- affected purpose;
- time;
- responsible actor or service;
- replacement or recomputation possibility; and
- downstream effects.

### `LC-DEP-QUARANTINED` — isolated pending review

The dependent or its support is isolated because of integrity, malware, parser, account, subject, custody, or provenance concern.

Quarantine blocks ordinary use and external release. It does not delete the object or confirm that it is malicious.

### `LC-DEP-BLOCKED` — no safe current operation

The system lacks sufficient authority, provenance, integrity, method support, or dependency state to proceed.

Missing or conflicting material facts do not default to use, release, recomputation, or deletion.

### `LC-DEP-EXCEPTION` — retained under explicit exception

The dependent or supporting evidence remains only under a versioned retention exception with minimum fields, accountable actor, review, appeal, and expiry behavior.

### `LC-DEP-DELETED` — controlled target removed

The dependent or representation is deleted within the controlled scope and has completion evidence.

The state does not prove removal from every uncontrolled downstream or recipient-held copy.

## Source lifecycle outcomes

### `LC-SRC-RECEIVING`

The source is entering a controlled workflow and is not available for confirmation, extraction release, or downstream use.

### `LC-SRC-QUARANTINED`

The source is isolated for malware, parser, archive, account, subject, integrity, or provenance review.

### `LC-SRC-AVAILABLE`

The exact source version and required custody representation are available under an authorized purpose.

Availability does not confirm source accuracy or Chronicle truth.

### `LC-SRC-PARTIAL`

Only part of the source or representation is available. Locators, transformations, and dependent claims identify the limitation.

### `LC-SRC-UNAVAILABLE`

The source version identity remains, but content cannot currently be retrieved.

### `LC-SRC-CORRUPT`

Integrity or decoding evidence indicates the representation cannot be trusted as the expected source version.

The source is quarantined or blocked from ordinary use. Corruption is not a clinical truth judgment.

### `LC-SRC-RETAINED-EXCEPTION`

The source remains under an explicit retention exception. Ordinary use does not continue merely because retention is required.

### `LC-SRC-DELETED`

The controlled source representation is deleted, with dependency and completion evidence.

## Custody migration states

### `LC-CST-PLANNED`

Exact source versions, stored representations, integrity expectations, destinations, rollback, retention, and authority are inventoried before transfer.

### `LC-CST-COPYING`

Representations are being copied or transferred. New custody is not yet authoritative for availability.

### `LC-CST-VERIFYING`

Exact source-version inventory, representation type, length, digest where applicable, metadata, deletion state, and exception state are compared.

### `LC-CST-DUAL-BOUNDARY`

Old and new custody coexist for a bounded migration window. Access and deletion procedures name both boundaries.

Dual custody cannot become indefinite hidden retention.

### `LC-CST-CUTOVER`

New custody becomes active only after verification and domain acceptance. Source identity and provenance remain unchanged.

### `LC-CST-ROLLBACK`

Migration is reversed because verification, availability, integrity, deletion, or policy requirements failed.

Rollback preserves evidence and does not silently discard changes that occurred during the migration window.

### `LC-CST-RETIRED`

Old custody is revoked, deleted, retained under explicit exception, or marked unavailable through a bounded reviewed outcome.

### `LC-CST-FAILED`

Migration cannot safely complete. The system returns to a known bounded state or blocks affected operations.

## Inference handling states

### `LC-INF-DRAFT`

The inference is an unconfirmed proposal or private working result. It cannot drive external release, eligibility, clinical action, or canonical observation.

### `LC-INF-PERSONAL-REVIEW`

The inference may be shown to the controlling person with evidence, method, limitations, uncertainty, and non-AI fallback.

Display does not convert it into observation or clinical truth.

### `LC-INF-REVIEW-REQUIRED`

The inference is blocked pending a named privacy, clinical, accessibility, research, product, or other specialist review appropriate to the consequence.

### `LC-INF-RESTRICTED`

The inference may be used only for an exact bounded internal purpose under minimization and no external release.

### `LC-INF-BLOCKED`

Evidence, method, authority, safety, or privacy conditions are insufficient. The inference cannot be displayed, exported, released, notified, persisted as canonical truth, or used for a consequential action.

### `LC-INF-INVALIDATED`

A changed input, method, correction, deletion, conflict, or review finding invalidates the inference for its declared use.

## Export outcome states

### `LC-EXP-PLANNED`

The request has an exact deterministic plan of included, omitted, unavailable, excepted, and dependency objects.

### `LC-EXP-COMPLETE-FOR-REQUEST`

The artifact satisfies the exact accepted request and includes a manifest and limitations.

This state does not imply a full-Chronicle export when the person requested a narrower scope.

### `LC-EXP-PARTIAL`

The artifact is generated with explicit in-scope omissions, unavailable objects, failed representations, or blocked dependencies.

Every material omission has a reason.

### `LC-EXP-BLOCKED`

The export cannot proceed because identity, authority, resource scope, dependency, integrity, delivery, or security conditions are unresolved.

### `LC-EXP-FAILED`

Generation or delivery failed. Failure evidence is distinct from a completed artifact and from delivery.

### `LC-EXP-DELIVERED`

The exact artifact was delivered to the verified actor through the recorded method.

Delivery does not authorize secondary use or prove deletion from the recipient device.

### `LC-EXP-EXPIRED`

The export artifact is no longer available for delivery. Expiration does not delete the canonical Chronicle.

### `LC-EXP-DELETED`

The controlled export artifact is deleted under its own lifecycle.

## Deletion outcome states

### `LC-DEL-RECEIVED`

A deletion request exists but scope and dependencies are not yet resolved.

### `LC-DEL-SCOPE-RESOLVED`

Exact requested targets, dependent objects, excluded objects, possible exceptions, and expected effects are recorded.

### `LC-DEL-AWAITING-REVIEW`

A material authority, dependency, retention, safety, or contested-control question requires review.

Review cannot become a generic delay with no owner or service expectation.

### `LC-DEL-PROCESSING`

Controlled deletion operations are in progress. The system does not claim completion.

### `LC-DEL-COMPLETED-CONTROLLED-SCOPE`

Every target in the resolved controlled scope is completed or accounted for through explicit exception, tombstone, or failure evidence.

### `LC-DEL-PARTIAL`

Some targets completed and others failed, remain blocked, or are retained under exception.

The person-visible result identifies each category.

### `LC-DEL-RETAINED-EXCEPTION`

One or more targets remain under explicit exception. Ordinary use, analysis, training, or disclosure does not continue unless separately authorized.

### `LC-DEL-FAILED`

The procedure could not complete safely or accurately. Failure preserves the request, evidence, owner, next action, and restoration or containment needs.

### `LC-DEL-EXTERNAL-UNVERIFIED`

A recipient, provider, model, connector, public cache, device, or other uncontrolled boundary may retain a copy that cannot be conclusively erased or verified.

This state is a limitation record, not permission for continued use.

### `LC-DEL-CANCELLED`

A valid authorized cancellation stops future deletion work where reversal remains possible.

Cancellation does not restore targets already irreversibly deleted.

## Restoration outcomes

### `LC-RST-ISOLATED`

A snapshot or recovered representation exists only in an isolated recovery environment.

It cannot serve production requests or external releases.

### `LC-RST-INTEGRITY-VERIFIED`

The recovered representation matches the expected backup and format evidence within the bounded verification method.

Integrity verification does not establish current authority or lifecycle correctness.

### `LC-RST-REPLAYING-HISTORY`

Corrections, supersessions, retractions, invalidations, conflicts, unmerges, deletions, exceptions, tombstones, account-link changes, permission changes, and incident containment are being replayed or reconciled.

### `LC-RST-RECONCILED`

Recovered state matches current accepted authority and lifecycle history for the tested scope.

### `LC-RST-BLOCKED`

The recovered state cannot safely activate because ordering, integrity, keys, deletion, authority, provenance, schema, or dependency facts remain unresolved.

### `LC-RST-ACTIVATED`

A reviewed recovery decision activates the reconciled state in an identified environment.

Activation includes rollback, monitoring, person-impact review, and residual-risk evidence.

### `LC-RST-ROLLED-BACK`

A restore activation is reversed because validation or monitored operation failed.

## Dependency trigger rules

## Source version becomes unavailable

Required review includes:

- locators addressing the source version;
- extraction proposals;
- confirmed records using the source;
- transformations and derivations;
- corrections and conflicts;
- exports and manifests;
- indexes, embeddings, previews, and caches; and
- external references.

Candidate outcomes:

- confirmed records may remain with `LC-DEP-SOURCE-UNAVAILABLE` or `LC-DEP-PROVENANCE-DEGRADED` when policy permits;
- derived records may require `LC-DEP-WARNING`, `LC-DEP-RECOMPUTE`, or `LC-DEP-INVALIDATED`;
- new confirmation or external release may be `LC-DEP-BLOCKED`;
- exports record the unavailable source and reason; and
- derivatives that no longer have an authorized source basis are deleted or blocked.

## Source version is corrupt or substituted

Required behavior:

1. quarantine the representation;
2. stop ordinary parsing, confirmation, export, and release;
3. preserve the source-version identity and failed integrity evidence;
4. identify all dependents;
5. compare other custody copies or prior verified versions;
6. invalidate or recompute affected transformations and derived records;
7. notify affected people or recipients where material and safe; and
8. record residual harm when prior use cannot be reversed.

## Source version is deleted

Required behavior:

- locators become unavailable rather than floating to another version;
- source-derived proposals and derivatives receive explicit dependency outcomes;
- confirmed records do not silently lose provenance;
- correction and conflict history remains according to deletion and exception policy;
- exports record deletion or omission state;
- indexes and disposable derivatives are deleted or rebuilt;
- backups and restore processes preserve the deletion state; and
- tombstones contain only bounded non-sensitive evidence where required.

## Chronicle record is corrected

Required behavior:

- preserve predecessor and successor;
- preserve source truth and the correction reason;
- identify changed components;
- evaluate dependent derived records, associations, inferences, preferred presentations, exports, indexes, notifications, receipts, and recipients;
- recompute, warn, invalidate, correct, or block dependents; and
- provide a challenge and reversal path where applicable.

## Chronicle record is retracted or invalidated

Required behavior:

- stop current use for the affected purpose;
- preserve historical existence and triggering evidence;
- evaluate dependents and prior external releases;
- distinguish retraction from source deletion;
- notify or correct downstream recipients where authorized and feasible; and
- record residual harm where prior decisions cannot be undone.

## Conflict is created or changed

Required behavior:

- preserve every participating record and source chain;
- prevent automatic suppression or destructive merge;
- review preferred presentation and dependent summaries;
- block high-consequence use when unresolved conflict is material;
- include the conflict in relevant exports; and
- propagate later resolution or reversal.

## Duplicate or merge decision is reversed

Required behavior:

- restore independent record presentation;
- preserve the prior duplicate or merge decision;
- identify exports and derived records built from the merged representation;
- recompute or invalidate affected outputs; and
- avoid reconstructing provenance from lossy data.

## Transformation or derivation method is withdrawn

Required behavior:

- identify every event and output using the exact method version;
- block new use;
- decide whether outputs remain with warning, require recomputation, or are invalidated;
- preserve prior method and result evidence;
- review exports and recipients; and
- update public or person-facing explanations where material.

## Inference input changes or is deleted

Required behavior:

- invalidate the prior inference for current use unless deterministic review supports another outcome;
- remove or rebuild indexes and caches;
- review notifications, summaries, product actions, research datasets, and external recipients;
- retain the historical inference only under explicit lifecycle and retention rules; and
- never relabel it as observation.

## Export artifact expires or is deleted

Required behavior:

- stop delivery and derived credentials;
- remove controlled temporary copies and caches;
- preserve the request, plan, manifest, delivery, expiry, failure, and deletion evidence according to bounded retention rules; and
- leave canonical Chronicle state unchanged.

## Whole-Chronicle deletion is requested

Scope resolution includes:

- Chronicle records and relationships;
- source artifacts and versions;
- locators and attachments;
- custody and stored representations;
- derived representations;
- exports;
- indexes and caches;
- queued work;
- backups and replicas;
- receipts and protected audit boundaries;
- active exceptions and tombstones;
- connector and provider copies;
- research or analytical copies where separately authorized; and
- external recipients.

Account closure, permission withdrawal, research withdrawal, and governance identity remain separate operations even when coordinated.

## Backup is restored

Required behavior follows:

```text
LC-RST-ISOLATED
  → LC-RST-INTEGRITY-VERIFIED
  → LC-RST-REPLAYING-HISTORY
  → LC-RST-RECONCILED
  → reviewed activation or LC-RST-BLOCKED
```

A restore that cannot prove current deletion, correction, authority, source, and schema reconciliation remains blocked.

## Evidence requirements by operation

### Confirmation

Evidence identifies:

- record ID and revision;
- Chronicle and subject context;
- visible proposal and source references;
- confirmer and authority basis;
- confirmation event;
- contract and validator version; and
- accepted, corrected-and-accepted, rejected, or deferred decision.

### Correction or relationship change

Evidence identifies:

- predecessor and successor or participating records;
- relationship identity and revision;
- actor and reason;
- method and version where applicable;
- dependent records;
- effective and recorded time;
- review state; and
- reversal reference where any.

### Export

Evidence identifies:

- request and requester;
- step-up or authority reference where required;
- exact plan;
- included and omitted inventory;
- manifest and limitations;
- artifact identity and custody;
- delivery actor and method;
- expiry and deletion; and
- failures and unresolved items.

### Deletion

Evidence identifies:

- request and requester;
- exact targets;
- scope resolution;
- dependents and exclusions;
- operations by boundary;
- exceptions;
- tombstones;
- failed targets;
- accountable actor;
- completion time; and
- uncontrolled external limitations.

### Custody migration

Evidence identifies:

- exact source and representation inventory;
- old and new custody boundaries;
- method and transfer time;
- integrity and completeness checks;
- deletion and exception state;
- cutover and rollback decision;
- old-custody disposition; and
- unresolved residual copies.

### Restoration

Evidence identifies:

- backup or snapshot identity;
- isolated environment;
- integrity checks;
- schema and key compatibility;
- correction, deletion, authority, and incident replay;
- reconciliation findings;
- blocked or activated outcome;
- monitoring and rollback; and
- residual harm.

## Security review questions

- Can a source version change without receiving a new identity?
- Can a locator point to different content after migration or update?
- Can custody or provider control become truth or permission authority?
- Can an imported or model-generated proposal become confirmed without an explicit confirmer?
- Can a correction or preferred view hide historical disagreement?
- Can a duplicate candidate delete or merge records automatically?
- Can an inference appear as an observation or drive a consequential action without review?
- Can an export omit material context without a reason?
- Can deletion of one object be represented as deletion of all dependents and copies?
- Can a retention exception become indefinite or retain intimate fields?
- Can a tombstone reconstruct deleted health information?
- Can a derivative remain searchable after source correction or deletion?
- Can a backup restore resurrect deleted or withdrawn state?
- Can a migration discard provenance, correction, or deletion history?
- Can a public fixture or log contain real source material?

## Current control truth

This register is a designed internal baseline.

No dependency engine, lifecycle projector, source store, export service, deletion worker, custody migration, backup system, restoration process, recipient notification, or inference-review service is implemented or deployed.

Independent security, privacy, accessibility, clinical, legal, records-governance, and research review remains pending.
