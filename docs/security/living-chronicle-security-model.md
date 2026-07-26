# Living Chronicle Source, Provenance, Inference, Export, Deletion, and Custody Security Model

[Security architecture](README.md) · [Chronicle control register](living-chronicle-control-register.md) · [Chronicle dependency and lifecycle register](living-chronicle-dependency-lifecycle-register.md) · [Integrated threat model](integrated-threat-model.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent security, privacy, accessibility, clinical, legal, and records-governance review pending  
**Workstream:** 5.4  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** provider-independent design only; no production Chronicle persistence, source custody, document processing, export, deletion, backup, inference, or migration runtime is authorized or represented as deployed

## Purpose

This model defines the security properties required to preserve a person-controlled Living Chronicle through capture, confirmation, correction, conflict, derivation, export, deletion, custody migration, backup, and restoration.

It refines the integrated threats `THR-011` through `THR-016` without replacing their stable identities or residual-risk records.

The model prevents these failures:

1. technical access becoming Chronicle truth authority;
2. source bytes or locators being replaced while their identity remains unchanged;
3. AI, connector, import, parser, migration, or operator output becoming silently confirmed;
4. correction or preferred presentation erasing historical evidence;
5. conflict and duplicate handling becoming destructive data cleanup;
6. inference appearing more authoritative than its inputs and method support;
7. export omitting material context without an inspectable reason;
8. deletion of one representation being described as deletion of every related representation;
9. retained exceptions and tombstones becoming hidden copies of intimate information;
10. backups or migrations resurrecting deleted, corrected, retracted, invalidated, or superseded state; and
11. custody providers, object keys, indexes, or proprietary viewers becoming necessary to interpret the Chronicle.

## Decision summary

The Living Chronicle is secured as a versioned meaning graph rather than as one mutable health-data row set.

The graph preserves distinct claims for:

- Chronicle identity;
- subject identity;
- canonical record identity and revision;
- authority state;
- record lifecycle state;
- source artifact identity;
- immutable source-version identity;
- exact or bounded source locator;
- capture and import events;
- transformations and derivations;
- confirmation events;
- correction, amendment, supersession, retraction, invalidation, conflict, duplicate, merge, unmerge, and preferred-presentation relationships;
- attachments and their roles;
- custody references;
- stored and derived representations;
- export requests, plans, manifests, artifacts, and deliveries;
- deletion requests, scope resolutions, retention exceptions, tombstones, and completion evidence; and
- protected operational evidence kept outside Chronicle truth.

A system may show these claims together. It may not collapse them into one authority or one mutable status.

## Governing authority

This model implements and may not weaken:

1. the Product Constitution and Architecture Foundation;
2. the Living Chronicle Sprint 3 architecture and `0.1.0` contract;
3. the House of Keys separation of permission truth from Chronicle truth;
4. the identity, session, isolation, recovery, and operator model from workstream 5.2;
5. the integrated `THR-*`, `CTL-TM-*`, and `RSK-*` records from workstream 5.3;
6. the publication and confidentiality policy; and
7. the Institutional Immune System.

A lower-level implementation may make a rule more concrete. It may not trade away source truth, person control, correction, export, deletion, provider replaceability, or truthful control status for implementation convenience.

## Protected assets and boundaries

The principal protected assets are:

- `AST-006` — account-to-Chronicle pseudonym mapping;
- `AST-007` — confirmed Chronicle records;
- `AST-008` — raw sources, documents, images, payloads, and attachments;
- `AST-009` — provenance, transformations, normalization, associations, and inferences;
- `AST-012` — execution and release state where Chronicle operations are performed;
- `AST-013` — person-visible receipts where later operations require them;
- `AST-014` — protected operational audit evidence;
- `AST-015` — AI prompts, outputs, extraction drafts, and conversation derivatives;
- `AST-016` — embeddings, indexes, caches, retrieval results, and metadata;
- `AST-022` — backups, replicas, snapshots, archives, and recovery records; and
- export, deletion, custody, and migration records represented by the Living Chronicle contract.

The principal crossings are:

- `BX-005` — private edge to domain application;
- `BX-006` — domain application to canonical structured storage;
- `BX-007` — domain application to raw-source custody;
- `BX-008` — domain application to queue;
- `BX-009` and `BX-010` — isolated parsing, AI, and derivation processing;
- `BX-012` — authorized release to an external recipient;
- `BX-013` — private runtime to protected administrative and audit surfaces;
- `BX-014` and `BX-015` — backup and restoration;
- `BX-016` — person-visible receipt delivery; and
- `BX-017` and `BX-018` — isolated analytics, research, and reviewed results.

Every crossing preserves server-derived controlled-resource context. No caller, model, connector, queue message, object key, or export parameter creates Chronicle authority by naming an identifier.

## Chronicle security invariants

### 1. Chronicle identity is stable and provider-independent

A Chronicle identifier is opaque, non-public by default, and independent from email, legal name, authentication-provider subject, object key, database key, connector identifier, wallet, research identifier, or public profile.

Changing an account, identity provider, storage provider, object store, database, queue, operator, model, or hosting vendor must not require rewriting Chronicle identity or historical record identity.

### 2. Authentication is not Chronicle authority

An authenticated session may route a request only through an active server-resolved account-access link and authority profile.

Authentication alone cannot confirm, correct, retract, export, delete, merge, or change the preferred presentation of Chronicle material.

### 3. Canonical confirmation is an explicit event

A confirmed record requires:

- a stable record identity and revision;
- one controlled Chronicle and subject context;
- visible source or proposal context sufficient for meaningful confirmation;
- an authorized human confirmer or later explicitly reviewed authority;
- a confirmation event that matches the record identity, revision, actor, decision, and contract version; and
- deterministic contract validation.

Import success, parser success, connector status, model confidence, source reputation, operator judgment, quest completion, governance approval, or research usefulness cannot substitute for confirmation.

### 4. Source artifacts and source versions are separate

A source artifact identifies an evidence container or origin.

A source version identifies one immutable content version. Any material byte, text, payload, or statement change creates a new source version.

A file name, URL, object key, connector cursor, external resource ID, or custody reference is not sufficient as source-version identity.

### 5. Locators are version-bound

A source locator belongs to one exact source version.

A locator may express page, region, field path, range, timestamp, message position, section, form response, or whole-source scope. It cannot claim more precision than the source supports and cannot float silently to a replacement version.

### 6. Custody is not source truth or Chronicle truth

Custody references identify where a representation is stored or operated.

A custody provider, operator, object store, migration service, or backup service receives no authorship, confirmation, correction, permission, research, or ownership authority from technical possession.

Custody migration replaces custody references and stored representations. It does not replace source identity, source-version identity, locators, record identity, or provenance history.

### 7. Integrity evidence has a narrow meaning

A digest, signature, byte length, verification event, or object-generation identity may support a claim that a representation has not changed since a stated operation.

Integrity evidence does not prove:

- source accuracy;
- clinical correctness;
- completeness;
- person confirmation;
- authorized access;
- safe inference;
- legal validity; or
- deletion completion beyond the identified representation and evidence boundary.

### 8. Untrusted sources remain quarantinable and non-authoritative

Documents, images, audio, video, messages, device payloads, connector payloads, archives, and external exports are untrusted inputs.

A source may be receiving, quarantined, available, partially available, unavailable, corrupt, deletion-requested, deletion-processing, retained under exception, or deleted.

Quarantine or unavailability must not be silently converted into confirmation, omission, or deletion.

### 9. Transformations preserve input and method provenance

Parsing, extraction, transcription, mapping, normalization, redaction, translation, conversion, and deterministic classification identify:

- all required source versions, locators, and record inputs;
- method and version;
- parameters and assumptions;
- responsible actor or service;
- output references;
- time;
- success or failure state; and
- ambiguity or precision effects.

A transformed representation does not replace its inputs.

### 10. Derivations and inferences remain source-linked

Every derived record identifies all required inputs, a method and version, parameters, assumptions, an output record, and invalidation behavior.

Every inference identifies its evidence records, inference class, method, version, limitations, and review requirements.

A derived or inferred claim cannot become source-free merely because the computation succeeded.

### 11. Inference is not observation

An inference, association, model-generated conclusion, or analytical result remains visibly classified as derived or interpretive.

It cannot be displayed, exported, released, or persisted as a direct observation without an explicit governed conversion that preserves the original inference and its evidence.

High-consequence inference presentation requires later clinical, privacy, accessibility, and product review. Sprint 5 does not authorize diagnosis, treatment, causal inference, eligibility, or clinical decision support.

### 12. Corrections are relationship-first

A material correction does not overwrite the historical record.

It identifies the predecessor, successor, changed components, reason, correction type, actor, time, source references, and dependent records.

A revision may correct non-semantic metadata. It cannot conceal a material change to value, time, subject, assertion class, variable, authority, or provenance.

### 13. Conflict is preserved rather than discarded

Validly sourced disagreement remains represented as a conflict relationship.

Conflict detection or preferred presentation cannot automatically delete, retract, merge, or suppress a participating record.

A preferred view is a presentation decision, not a truth judgment.

### 14. Duplicate and merge decisions are reversible where promised

A duplicate candidate does not hide or merge records.

A confirmed duplicate preserves every record identity, source chain, decision actor, reason, retained unique metadata, preferred record where any, and reversal behavior.

A merge may not discard unique provenance. An unmerge must not require reconstructing lost evidence.

### 15. Dependency effects are explicit

Correction, retraction, invalidation, source unavailability, source deletion, record deletion, method withdrawal, merge reversal, and custody failure trigger deterministic dependency evaluation.

A dependent may become:

- unchanged;
- warning-required;
- source-unavailable;
- provenance-degraded;
- recompute-required;
- invalidated;
- quarantined;
- blocked;
- retained under exception; or
- deleted.

No dependent remains silently current when its required support has changed.

### 16. Export is a generated representation

An export remains separate from the canonical Chronicle and from secondary-use permission.

Export planning resolves the request into exact included records, source versions, relationships, provenance, lifecycle evidence, omissions, and dependencies.

The export manifest records what is included, unavailable, omitted, retained under exception, or failed.

### 17. Export omission is inspectable

Every in-scope omission has an allowlisted reason and enough explanation for the person to understand the limitation.

A generic convenience reason cannot hide unsupported, unavailable, corrupt, deleted, security-held, or format-incompatible material.

A narrow export may omit unrelated intimate material while preserving enough schema, unit, time, provenance, and relationship context to interpret the included records.

### 18. Export delivery is distinct from generation

An export is not delivered merely because an artifact exists.

Generation, readiness, delivery, failure, revocation, expiry, and artifact deletion remain separate claims.

Export artifacts use isolated custody, exact delivery identity, integrity evidence where useful, short retention, and explicit deletion behavior.

### 19. Deletion targets are explicit

A deletion request names record, source artifact, source version, attachment, stored representation, derived representation, relationship, export artifact, or whole-Chronicle scope.

Deleting one target kind does not imply deletion of every related target.

Scope resolution identifies dependents, exclusions, proposed retention exceptions, and expected effects before completion is claimed.

### 20. Deletion is not correction, withdrawal, or account closure

Record correction, retraction, permission withdrawal, research withdrawal, account closure, source deletion, export deletion, attachment removal, custody-copy deletion, and whole-Chronicle deletion are distinct operations.

One operation may trigger another through a governed procedure. No operation is inferred merely because it would be convenient.

### 21. Retention exceptions are explicit and minimized

A retention exception identifies:

- the exact deletion request and target;
- authority reference;
- policy and version;
- reason;
- minimum retained fields;
- start, review, and end times where any;
- accountable actor;
- appeal availability; and
- lifecycle state.

The schema can represent an exception. It does not declare the exception legally valid.

### 22. Tombstones retain only bounded non-sensitive evidence

A tombstone may exist only for an explicit purpose such as preventing identifier reuse, preventing accidental resurrection, representing dependency unavailability, or recording bounded completion.

Tombstones cannot retain health values, diagnosis, document names, excerpts, intimate categories, source content, model prompts, or other data that reconstructs the deleted material.

### 23. Deletion completion is bounded and honest

Completion evidence identifies:

- completed targets;
- failed targets and reasons;
- retained exceptions;
- tombstones;
- accountable actor; and
- completion time.

Completion proves the bounded controlled procedure and evidence. It does not prove that every uncontrolled downstream copy, prior recipient, public cache, device backup, or external provider copy ceased to exist.

### 24. Derivatives respond to correction and deletion

Indexes, embeddings, previews, thumbnails, OCR, transcripts, normalized payloads, caches, temporary exports, analytical working state, and other disposable derivatives remain source-linked.

Correction and deletion trigger invalidation, expiry, rebuild, removal, or a visible blocked state according to the dependency register.

A derivative cannot become the only surviving evidence required to interpret a canonical record.

### 25. Restoration replays person and authority history

A restore is isolated and non-authoritative until reconciliation completes.

Restoration must replay or reconcile:

- corrections and supersessions;
- retractions and invalidations;
- conflicts and merge reversals;
- deletion requests and completion evidence;
- retention exceptions and their current state;
- tombstones;
- permission withdrawal and account-authority changes where relevant; and
- later incident containment facts.

A backup snapshot cannot silently reactivate deleted, withdrawn, corrected, invalidated, compromised, or superseded state.

### 26. Public development remains synthetic-only

Public repositories, issues, pull requests, CI, fixtures, examples, and tabletop exercises contain only PUBLIC or explicitly synthetic information.

A source-like fixture may resemble a realistic workflow. It may not contain a real person’s record, document, export, support correspondence, receipt, or incident evidence.

## Canonical lifecycle paths

### Capture and confirmation

```text
untrusted input
  → source artifact
  → immutable source version
  → exact or bounded locator
  → capture or import event
  → optional transformation or extraction proposal
  → visible person review
  → confirmation event
  → deterministic validation
  → confirmed Chronicle record
```

The path may stop, fail, quarantine, remain proposed, or be rejected at any stage. No stage after input can silently skip confirmation when confirmation is required.

### Correction and dependency propagation

```text
new evidence or person correction
  → relationship-first correction, amendment, supersession, retraction, or invalidation
  → preserve predecessor and source chain
  → identify dependent records, exports, indexes, receipts, and recipients
  → recompute, invalidate, warn, correct, notify, or block
  → update preferred presentation without erasing alternatives
```

### Export

```text
person request
  → step-up and exact scope
  → deterministic export plan
  → included and omitted object inventory
  → human-readable and/or machine-readable generation
  → manifest and limitations
  → isolated artifact custody
  → verified delivery
  → expiry and artifact deletion
```

### Deletion

```text
person request or governed trigger
  → exact target resolution
  → dependency and retention-exception review
  → canonical, source, stored, derived, cache, queue, export, backup, and recipient procedures
  → completion, partial completion, retained exception, or failure evidence
  → person-visible result and limitations
  → restoration guard against resurrection
```

### Custody migration

```text
existing source and representation identities
  → new custody destination and integrity plan
  → isolated copy or transfer
  → verification against exact source versions
  → controlled cutover
  → old custody retirement or bounded retention
  → evidence and rollback window
```

A custody migration does not create new Chronicle or source truth.

## Threat and residual-risk crosswalk

### `THR-011` / `RSK-011` — unauthorized confirmation, mutation, or deletion

Primary Chronicle controls:

- `CTL-LC-001` through `CTL-LC-004`;
- `CTL-LC-010`;
- `CTL-LC-017`; and
- identity controls `CTL-ID-002`, `CTL-ID-004`, and `CTL-ID-005`.

Residual risk remains production-blocking until service authorization, persistence transactions, repair tooling, confirmation UX, and synthetic mutation tests exist.

### `THR-012` / `RSK-012` — source substitution, locator tampering, custody confusion, or provenance loss

Primary Chronicle controls:

- `CTL-LC-005` through `CTL-LC-009`;
- `CTL-LC-023`; and
- integrated objectives `CTL-TM-006`, `CTL-TM-007`, and `CTL-TM-012`.

Residual risk remains production-blocking until object custody, integrity, immutable-version behavior, signed access, migration, and restore evidence exist.

### `THR-013` / `RSK-013` — correction, conflict, merge, or invalidation suppression

Primary Chronicle controls:

- `CTL-LC-010` through `CTL-LC-013`;
- `CTL-LC-024`; and
- integrated objectives `CTL-TM-006`, `CTL-TM-023`, and `CTL-TM-027`.

Residual risk remains production-blocking until dependency projection, person-facing review, downstream correction, and reversal tests exist.

### `THR-014` / `RSK-014` — inference, metadata, membership, or linkage leakage

Primary Chronicle controls:

- `CTL-LC-014` through `CTL-LC-016`;
- `CTL-LC-021`;
- `CTL-LC-025`; and
- integrated objectives `CTL-TM-008`, `CTL-TM-015`, `CTL-TM-022`, and `CTL-TM-027`.

Residual risk remains production-blocking and specialist-gated because inference can reveal facts not explicitly supplied and may remain harmful after raw data is removed.

### `THR-015` / `RSK-015` — malicious upload, parser, archive, or document

Workstream 5.4 establishes source-state, quarantine, non-authority, provenance, and dependency requirements through `CTL-LC-005`, `CTL-LC-008`, and `CTL-LC-009`.

Parser isolation, malware controls, resource limits, decompression controls, prompt-injection handling, and connector protections remain workstream 5.6.

### `THR-016` / `RSK-016` — deletion overclaim, hidden retention, or stale derivative

Primary Chronicle controls:

- `CTL-LC-017` through `CTL-LC-022`;
- `CTL-LC-024`; and
- integrated objectives `CTL-TM-006`, `CTL-TM-020`, `CTL-TM-023`, and `CTL-TM-027`.

Residual risk remains production-blocking and specialist-gated because complete downstream erasure may be impossible to prove and legal retention rules remain unresolved.

## Cross-cutting threat relationships

This workstream also refines:

- `THR-001` and `THR-002` for cross-user resource context;
- `THR-023` through `THR-026` for AI, MCP, and retrieval derivatives;
- `THR-031` for queued export, deletion, and processing work;
- `THR-033` and `THR-034` for backup and restoration;
- `THR-036` and `THR-037` for research and analytics copies; and
- `THR-044` for incorrect but well-intentioned automated correction, deletion, or inference.

The integrated records remain the top-level risk ledger. The Chronicle controls and dependency register provide the domain-specific design needed to implement and test them later.

## Current capability truth

At the completion of workstream 5.4:

- the `@calypsos-promise/health-schema` contract, validator, tests, and synthetic fixtures remain pre-stable and public-synthetic only;
- the Chronicle security model, control register, and dependency register are designed and internally reviewed;
- no private Chronicle persistence, object custody, source processing, export, deletion worker, backup, restore, inference service, or migration system exists;
- no `CTL-LC-*` control is implemented, deployed, operationally verified, or independently reviewed merely because it is documented;
- complete JSON Schema decoding from untrusted input remains deferred;
- clinical, privacy, accessibility, legal, records-retention, and research specialist approval remains absent; and
- production health-data work remains blocked.

## Completion evidence

Workstream 5.4 is complete at the internal architecture level when:

- Chronicle and source authority boundaries are explicit;
- stable `CTL-LC-*` controls exist;
- source, provenance, correction, inference, export, deletion, custody, derivative, and restoration dependencies have explicit outcomes;
- the integrated `THR-011` through `THR-016` risks are refined without changing their identity;
- provider and custody replacement preserve Chronicle meaning;
- export and deletion claims are bounded and inspectable;
- restore cannot silently resurrect stale state by design;
- current control status is truthful; and
- unresolved implementation and specialist gates remain explicit.

## Review boundary

Independent review is required before this baseline may be represented as independently reviewed, production-sufficient, legally sufficient, clinically safe, privacy-certified, or operationally verified.

A later change to Chronicle identity, source contracts, confirmation, relationships, inference, export, deletion, custody, backup, or migration must identify and update the affected `AST-*`, `BX-*`, `THR-*`, `CTL-TM-*`, `RSK-*`, `CTL-LC-*`, and lifecycle records.
