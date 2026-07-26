# Living Chronicle Security Control Register

[Security architecture](README.md) · [Chronicle security model](living-chronicle-security-model.md) · [Chronicle dependency and lifecycle register](living-chronicle-dependency-lifecycle-register.md) · [Threat control objectives](threat-control-objective-register.md) · [Control status vocabulary](control-status-and-risk-vocabulary.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent specialist review pending  
**Workstream:** 5.4  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** control design only; no `CTL-LC-*` control is implemented, deployed, operationally verified, or independently reviewed by being recorded here

## Purpose

This register assigns stable identities to the Living Chronicle security controls required by workstream 5.4.

The controls refine the integrated `CTL-TM-*` objectives for Chronicle records, source custody, provenance, correction, inference, export, deletion, derivatives, migration, and restoration.

Later implementation, threat, tabletop, exception, and completion records should reference these IDs where applicable.

## Identifier and status rules

- Chronicle controls use `CTL-LC-*`.
- IDs are stable. A material semantic replacement receives a new ID or an explicit revision and supersession record.
- Every control is currently **required** and **designed** unless stated otherwise.
- Internal founding-steward review is not independent specialist review.
- Design evidence is not implementation or operational evidence.
- A control may support multiple preventive, limiting, detective, containment, recovery, restorative, corrective, deterrent, informational, and governance functions.

## `CTL-LC-001` — Explicit human confirmation boundary

- **Classes:** preventive, limiting, informational
- **Threats:** `THR-011`, `THR-013`, `THR-044`
- **Protects:** confirmed Chronicle records, person control, source/Chronicle separation
- **Requirement:** a record becomes confirmed only through an authorized human confirmation event and deterministic validation; AI, import, connector, device, parser, operator, migration, story, research, or governance activity cannot substitute
- **Evidence:** Living Chronicle contract, validator, confirmation-event invariants, Chronicle security model
- **Residual risk:** confirmation UX, identity assurance, accessibility, coercion resistance, concurrency, and persistence transactions are not implemented
- **Owner:** future Chronicle, identity, product, accessibility, and security owners
- **Revalidation:** first record-confirmation workflow, confirmer-authority change, schema revision, or production persistence design

## `CTL-LC-002` — Stable provider-independent Chronicle and record identity

- **Classes:** preventive, limiting, recovery
- **Threats:** `THR-001`, `THR-002`, `THR-010`, `THR-011`, `THR-012`
- **Protects:** Chronicle identity, record identity, portability, provider and founder replaceability
- **Requirement:** Chronicle and record identifiers remain opaque and independent from authentication subjects, direct identifiers, object keys, database keys, connector IDs, wallets, research IDs, and public identities
- **Evidence:** Sprint 3 identity baseline and 5.2 identity model
- **Residual risk:** identifier generation, collision resistance, mapping storage, migration, and operational validation remain unresolved
- **Owner:** future Chronicle and identity owners
- **Revalidation:** identifier implementation, account-provider change, storage migration, or schema migration

## `CTL-LC-003` — Server-derived Chronicle, subject, and resource context

- **Classes:** preventive, limiting
- **Threats:** `THR-001`, `THR-002`, `THR-011`, `THR-023`
- **Protects:** cross-user and cross-subject isolation
- **Requirement:** every private Chronicle operation derives controlled Chronicle, subject, and resource scope from authenticated server-side authority rather than caller, model, connector, queue, or client-supplied ownership
- **Evidence:** `CTL-ID-002`, `CTL-ID-005`, 5.1 boundary map, Chronicle security model
- **Residual risk:** repository, object, queue, cache, export, and AI implementation evidence is absent
- **Owner:** future identity, Chronicle, source, export, deletion, and infrastructure owners
- **Revalidation:** every private API, repository method, tool, queue, export, deletion, or restore interface

## `CTL-LC-004` — Authorized relationship-first mutation

- **Classes:** preventive, detective, corrective, restorative
- **Threats:** `THR-011`, `THR-013`, `THR-044`
- **Protects:** Chronicle history, correction, conflict, deletion, and appeal
- **Requirement:** material changes use versioned correction, amendment, supersession, retraction, invalidation, conflict, duplicate, merge, unmerge, preferred-presentation, or deletion records rather than destructive overwrite
- **Evidence:** Sprint 3 relationship contracts and validation baseline
- **Residual risk:** database transaction, event projection, concurrent-write, repair, and operator workflows remain absent
- **Owner:** future Chronicle domain owner
- **Revalidation:** persistence model, migration, bulk repair, correction UI, or relationship-contract change

## `CTL-LC-005` — Immutable source-version identity

- **Classes:** preventive, detective, limiting
- **Threats:** `THR-012`, `THR-015`, `THR-027`
- **Protects:** source truth, provenance, conflict evidence, reproducibility
- **Requirement:** every material source-content change creates a new source version; file names, URLs, object keys, provider IDs, and connector cursors do not define canonical source-version identity
- **Evidence:** source-version contract and provenance model
- **Residual risk:** object custody, immutable-write enforcement, version creation, upload resumption, and provider behavior are not implemented
- **Owner:** future source and custody owner
- **Revalidation:** object-storage implementation, connector import, document update, or custody migration

## `CTL-LC-006` — Exact version-bound source locators

- **Classes:** preventive, detective, informational
- **Threats:** `THR-012`, `THR-013`, `THR-014`
- **Protects:** exact source support, correction review, export interpretability
- **Requirement:** locators address one exact source version, preserve supported precision, and do not float silently across revisions or custody migrations
- **Evidence:** source-locator contract and deterministic cross-reference validation
- **Residual risk:** locator generation, document rendering, page mapping, OCR alignment, and user review are absent
- **Owner:** future source, document-processing, and Chronicle owners
- **Revalidation:** parser, OCR, source-viewer, import mapping, or locator-format change

## `CTL-LC-007` — Source identity separated from custody

- **Classes:** preventive, limiting, recovery
- **Threats:** `THR-010`, `THR-012`, `THR-028`, `THR-033`
- **Protects:** provider replaceability, source truth, custody migration, continuity
- **Requirement:** source artifacts and versions remain authoritative identities while custody references and stored representations may migrate, become unavailable, or retire without rewriting source or Chronicle meaning
- **Evidence:** custody and stored-representation contracts
- **Residual risk:** provider selection, opaque reference protection, migration, dual-custody, integrity, rollback, and failure handling remain unresolved
- **Owner:** future source, custody, infrastructure, security, and recovery owners
- **Revalidation:** object provider selection, migration, failover, backup, or custody-contract change

## `CTL-LC-008` — Narrow integrity-evidence semantics

- **Classes:** detective, informational, deterrent
- **Threats:** `THR-012`, `THR-015`, `THR-030`, `THR-032`
- **Protects:** representation integrity and truthful claims
- **Requirement:** digests, signatures, lengths, verification events, and artifact provenance are used only to support bounded unchanged-since-operation claims and never represented as source accuracy, clinical truth, authorization, or deletion proof
- **Evidence:** integrity-evidence contract and Chronicle security model
- **Residual risk:** algorithms, signing identities, key custody, verification cadence, and operational monitoring are deferred to 5.7 and later implementation
- **Owner:** future source, export, security, and key owners
- **Revalidation:** cryptographic baseline, signing design, source verification, or public integrity claim

## `CTL-LC-009` — Source quarantine and availability lifecycle

- **Classes:** preventive, containment, limiting, recovery
- **Threats:** `THR-012`, `THR-015`, `THR-024`, `THR-027`
- **Protects:** source custody, parsing boundary, service integrity, Chronicle truth
- **Requirement:** untrusted sources have explicit receiving, quarantined, available, partially available, unavailable, corrupt, deletion, exception, and deleted states; quarantine and import success never confirm Chronicle truth
- **Evidence:** source-version availability contract and Chronicle security model
- **Residual risk:** scanning, sandboxing, decompression, parsing, malware, resource, operator, and release controls remain 5.6 work
- **Owner:** future source, upload, connector, document-processing, infrastructure, and security owners
- **Revalidation:** first upload, connector, parser, archive, image, audio, video, or document flow

## `CTL-LC-010` — Complete transformation provenance

- **Classes:** preventive, detective, informational, corrective
- **Threats:** `THR-011`, `THR-012`, `THR-013`, `THR-014`, `THR-024`
- **Protects:** parsing, mapping, normalization, redaction, translation, and conversion integrity
- **Requirement:** every transformation identifies exact inputs, method and version, parameters, assumptions, actor, outputs, time, outcome, warnings, and precision effects; outputs do not replace inputs
- **Evidence:** transformation-event contract and validator
- **Residual risk:** method catalogs, reproducibility, provider output, prompt policy, implementation versioning, and operational replay remain unresolved
- **Owner:** future Chronicle, source, AI, connector, and transformation owners
- **Revalidation:** any parser, mapper, normalization, translation, redaction, conversion, or extraction change

## `CTL-LC-011` — Reproducible derivation and invalidation behavior

- **Classes:** preventive, detective, corrective, recovery
- **Threats:** `THR-013`, `THR-014`, `THR-026`, `THR-044`
- **Protects:** derived records, associations, calculations, source chain, correction propagation
- **Requirement:** derivations identify all required inputs, method and version, parameters, assumptions, outputs, and invalidation behavior; required-input changes trigger recomputation, invalidation, warning, or blocked state
- **Evidence:** derived-record and derivation-event contracts
- **Residual risk:** scheduler, dependency graph, recomputation service, method withdrawal, and concurrent corrections remain absent
- **Owner:** future Chronicle and analytics owners
- **Revalidation:** any derived, association, inference, analytics, or method implementation

## `CTL-LC-012` — Correction, conflict, duplicate, merge, and unmerge preservation

- **Classes:** corrective, restorative, informational, detective
- **Threats:** `THR-011`, `THR-013`, `THR-044`
- **Protects:** historical truth, disagreement, reversibility, person challenge
- **Requirement:** all participating records, sources, actors, reasons, methods, decisions, unique metadata, dependencies, preferred views, and reversal paths remain inspectable; duplicate detection alone never hides or merges
- **Evidence:** relationship contracts and correction architecture
- **Residual risk:** product interaction, bulk projection, downstream notifications, and reversal testing are absent
- **Owner:** future Chronicle, product, accessibility, and support owners
- **Revalidation:** correction UI, duplicate detection, merge workflow, import reconciliation, or downstream release

## `CTL-LC-013` — Preferred presentation without truth suppression

- **Classes:** informational, limiting, restorative
- **Threats:** `THR-013`, `THR-038`, `THR-044`
- **Protects:** visible conflict, uncertainty, person agency, non-coercion
- **Requirement:** a preferred record or view is scoped, reasoned, attributable, appealable, reversible where applicable, and never treated as deletion, retraction, conflict resolution, source truth change, or clinical authority
- **Evidence:** preferred-presentation relationship contract
- **Residual risk:** interface language, accessibility, default ranking, automation, and user understanding are not tested
- **Owner:** future Chronicle, product, accessibility, and governance owners
- **Revalidation:** any default view, ranking, conflict display, or automated preference policy

## `CTL-LC-014` — Explicit inference and association classification

- **Classes:** preventive, informational, limiting
- **Threats:** `THR-014`, `THR-026`, `THR-036`, `THR-037`, `THR-044`
- **Protects:** observation/inference separation, person comprehension, privacy
- **Requirement:** inferences and associations identify evidence, class, method, version, limitations, uncertainty, and review requirements and cannot masquerade as direct observation or confirmed source truth
- **Evidence:** inference and association record contracts
- **Residual risk:** classification taxonomy, clinical safety, presentation, explanation, provider behavior, and downstream interpretation remain unresolved
- **Owner:** future Chronicle, AI governance, analytics, clinical-safety, privacy, and product owners
- **Revalidation:** any inference, association, prediction, summary, insight, or clinical-adjacent feature

## `CTL-LC-015` — Inference release and display holdpoints

- **Classes:** limiting, preventive, informational, governance
- **Threats:** `THR-014`, `THR-020`, `THR-025`, `THR-036`, `THR-038`
- **Protects:** privacy, non-discrimination, clinical safety, meaningful consent
- **Requirement:** high-consequence or sensitive inference display, export, notification, external release, research use, or product action is blocked until exact purpose, recipient, review, evidence, explanation, and specialist gates are satisfied
- **Evidence:** Chronicle security model and integrated threat model
- **Residual risk:** applicable inference classes, clinical review, legal rules, disclosure thresholds, and accessible explanations are unknown
- **Owner:** future Chronicle, House of Keys, privacy, clinical-safety, accessibility, research, and product owners
- **Revalidation:** every inference release, notification, research dataset, or eligibility-like action

## `CTL-LC-016` — Metadata, linkage, and derivative minimization

- **Classes:** preventive, limiting, detective
- **Threats:** `THR-014`, `THR-022`, `THR-025`, `THR-026`, `THR-036`, `THR-037`
- **Protects:** anti-correlation, privacy, deletion, operator restraint
- **Requirement:** identifiers, timing, locators, source relationships, prompts, retrieval metadata, embeddings, logs, and analytical joins use purpose-specific minimization, separate field allowlists, tenant isolation, retention, deletion, and output review
- **Evidence:** `CTL-TM-008`, `CTL-TM-022`, `CTL-TM-024`, `CTL-ID-014`
- **Residual risk:** field schemas, linkage analysis, query controls, statistical disclosure review, and operational evidence are absent
- **Owner:** future Chronicle, privacy, AI, retrieval, analytics, research, audit, and security owners
- **Revalidation:** every metadata store, index, log, analytical join, aggregate, or recipient output

## `CTL-LC-017` — Deterministic export planning and exact scope

- **Classes:** preventive, limiting, informational
- **Threats:** `THR-001`, `THR-002`, `THR-011`, `THR-014`, `THR-016`, `THR-020`
- **Protects:** portability, privacy, completeness, person control
- **Requirement:** export requests resolve to an exact versioned plan covering included records, relationships, sources, provenance, lifecycle evidence, formats, omissions, dependencies, and unresolved holdpoints before artifact generation
- **Evidence:** export request and plan contracts
- **Residual risk:** step-up, scope UX, repository snapshots, transaction consistency, cancellation, and operational generation are absent
- **Owner:** future export, Chronicle, identity, privacy, and accessibility owners
- **Revalidation:** first export implementation, format addition, recipient change, or schema migration

## `CTL-LC-018` — Export manifest, omissions, and interpretability

- **Classes:** informational, detective, restorative
- **Threats:** `THR-012`, `THR-013`, `THR-014`, `THR-016`, `THR-020`
- **Protects:** export truthfulness, migration, correction and conflict history
- **Requirement:** every artifact has a machine-readable manifest, human-readable limitations, provider-independent identifiers, schema and format versions, provenance, lifecycle context, and allowlisted omission reasons
- **Evidence:** export manifest and architecture baseline
- **Residual risk:** formats, completeness verification, schema evolution, accessible rendering, and replacement-import evidence are absent
- **Owner:** future export, Chronicle, product, accessibility, and migration owners
- **Revalidation:** export format, schema, generator, import target, or omission-policy change

## `CTL-LC-019` — Isolated export artifact custody and verified delivery

- **Classes:** preventive, limiting, detective, recovery
- **Threats:** `THR-003`, `THR-016`, `THR-020`, `THR-028`, `THR-031`
- **Protects:** exported copies, delivery identity, short retention, revocation
- **Requirement:** export generation, readiness, delivery, failure, expiry, revocation, and artifact deletion remain separate; artifacts use isolated custody, exact recipient verification, integrity evidence where useful, short expiry, and deletion after purpose
- **Evidence:** export artifact and delivery contracts
- **Residual risk:** packaging, encryption, download authorization, notification, resumability, external devices, and recipient copies remain unresolved
- **Owner:** future export, identity, security, custody, and support owners
- **Revalidation:** export delivery method, storage provider, mobile or browser implementation, or external recipient support

## `CTL-LC-020` — Explicit deletion targets and dependency resolution

- **Classes:** preventive, limiting, corrective, restorative
- **Threats:** `THR-011`, `THR-013`, `THR-016`, `THR-031`, `THR-034`
- **Protects:** deletion scope, dependents, correction, restoration
- **Requirement:** deletion requests identify target kinds and IDs, resolve dependent and excluded objects, distinguish requested from resolved scope, and record proposed effects before completion
- **Evidence:** deletion request and scope-resolution contracts
- **Residual risk:** policy, persistence, queue, source, derivative, recipient, backup, and concurrent-change implementation are absent
- **Owner:** future deletion, Chronicle, source, privacy, and recovery owners
- **Revalidation:** first deletion worker, new target kind, new derivative, backup design, or whole-Chronicle deletion

## `CTL-LC-021` — Governed dependency outcomes after correction or deletion

- **Classes:** corrective, containment, recovery, restorative
- **Threats:** `THR-013`, `THR-014`, `THR-016`, `THR-026`, `THR-034`
- **Protects:** derived records, indexes, exports, downstream recipients, restored state
- **Requirement:** changed or deleted support causes explicit unchanged, warning, source-unavailable, provenance-degraded, recompute-required, invalidated, quarantined, blocked, exception, or deleted outcomes; no dependent silently remains current
- **Evidence:** dependency and lifecycle register
- **Residual risk:** dependency graph implementation, ordering, retries, notification, recipient correction, and tests are absent
- **Owner:** future Chronicle, source, AI, retrieval, analytics, export, deletion, and recipient owners
- **Revalidation:** every derivative, recipient, export, index, cache, backup, or method implementation

## `CTL-LC-022` — Bounded retention exceptions and non-sensitive tombstones

- **Classes:** limiting, informational, governance, restorative
- **Threats:** `THR-016`, `THR-022`, `THR-033`, `THR-038`
- **Protects:** deletion rights, minimization, appeal, anti-resurrection
- **Requirement:** each exception names target, authority, policy, minimum fields, accountable actor, review and expiry, appeal, and state; tombstones retain only allowlisted non-sensitive completion or anti-resurrection evidence
- **Evidence:** retention-exception and tombstone contracts plus validator checks
- **Residual risk:** legal validity, jurisdiction, policy ownership, field allowlists, review process, and operational enforcement remain unresolved
- **Owner:** future privacy, legal, records-governance, deletion, Chronicle, and audit owners
- **Revalidation:** any retention policy, legal hold, exception field, tombstone purpose, or appeal implementation

## `CTL-LC-023` — Honest deletion completion and limitations

- **Classes:** detective, informational, restorative, deterrent
- **Threats:** `THR-016`, `THR-021`, `THR-033`, `THR-034`, `THR-036`
- **Protects:** person trust, exit, downstream transparency
- **Requirement:** completion evidence identifies completed, failed, excepted, and tombstoned targets and never claims uncontrolled downstream erasure; person-visible output explains limitations and residual copies
- **Evidence:** deletion completion contract and Chronicle security model
- **Residual risk:** provider, recipient, model, device, public cache, and legal evidence may remain partially unverifiable
- **Owner:** future deletion, privacy, support, accessibility, audit, connector, AI, and recipient owners
- **Revalidation:** every deletion procedure, provider contract, external recipient, restore, or person-facing completion claim

## `CTL-LC-024` — Deletion-aware backup and restoration reconciliation

- **Classes:** recovery, preventive, corrective, containment
- **Threats:** `THR-016`, `THR-032`, `THR-033`, `THR-034`
- **Protects:** correction, revocation, deletion, tombstones, authority history
- **Requirement:** restores occur in isolation and replay or reconcile corrections, supersessions, retractions, invalidations, merge reversals, deletions, exceptions, tombstones, and relevant authority changes before activation
- **Evidence:** 5.1 backup crossings, Chronicle security model, dependency register
- **Residual risk:** backup topology, point-in-time ordering, replay mechanism, key custody, integrity, restore tests, and incident process remain 5.7–5.9 work
- **Owner:** future recovery, Chronicle, source, deletion, House of Keys, security, and infrastructure owners
- **Revalidation:** backup provider selection, restore test, incident, migration, schema change, or point-in-time recovery design

## `CTL-LC-025` — Disposable derivative lifecycle and rebuildability

- **Classes:** preventive, limiting, corrective, recovery
- **Threats:** `THR-014`, `THR-016`, `THR-025`, `THR-026`, `THR-037`
- **Protects:** source authority, deletion, retrieval isolation, provider replaceability
- **Requirement:** OCR, transcripts, previews, thumbnails, normalized payloads, indexes, embeddings, caches, analytical working state, and temporary outputs remain source-linked, disposable, partitioned, rebuildable, and responsive to correction and deletion
- **Evidence:** derived-representation contract, `ISO-RETRIEVAL`, `ISO-AI`, and `ISO-ANALYTICS`
- **Residual risk:** derivative catalogs, provider retention, rebuild procedures, stale detection, and operational deletion are absent
- **Owner:** future source, AI, retrieval, analytics, privacy, and deletion owners
- **Revalidation:** every new derivative kind, provider, cache, index, embedding, analytical store, or retention change

## `CTL-LC-026` — Versioned custody migration and rollback

- **Classes:** recovery, preventive, detective, corrective
- **Threats:** `THR-010`, `THR-012`, `THR-028`, `THR-033`, `THR-034`
- **Protects:** source identity, stored representations, integrity, continuity, provider exit
- **Requirement:** custody migration inventories exact source versions and representations, verifies copied state, preserves deletion and exception state, controls cutover, records old and new custody, supports rollback, and retires old custody explicitly
- **Evidence:** custody contracts, migration compatibility requirements, Chronicle security model
- **Residual risk:** provider semantics, transfer integrity, dual-write behavior, access revocation, old-copy deletion, and operational exercise are absent
- **Owner:** future source, custody, infrastructure, security, privacy, and recovery owners
- **Revalidation:** every object, storage, archive, backup, or custody-provider migration

## `CTL-LC-027` — Protected Chronicle operational evidence minimization

- **Classes:** detective, limiting, deterrent, corrective
- **Threats:** `THR-008`, `THR-014`, `THR-022`, `THR-028`, `THR-039`
- **Protects:** Chronicle privacy, audit integrity, operator restraint
- **Requirement:** Chronicle operations emit allowlisted metadata sufficient for security, lifecycle, repair, and accountability without copying source content, intimate values, prompts, exports, or unrestricted identity linkage into logs and audit stores
- **Evidence:** `AUTH-AUDIT`, `ISO-AUDIT`, `CTL-TM-024`, `CTL-ID-014`
- **Residual risk:** event schemas, field allowlists, retention, search, correction, access review, and integrity controls remain 5.8 work
- **Owner:** future Chronicle, security, audit, privacy, and operations owners
- **Revalidation:** observability design, audit event, operator query, incident process, or logging-provider change

## `CTL-LC-028` — Chronicle migration and schema compatibility preservation

- **Classes:** preventive, recovery, corrective, informational
- **Threats:** `THR-010`, `THR-011`, `THR-012`, `THR-013`, `THR-016`, `THR-034`, `THR-044`
- **Protects:** identity, source truth, temporal precision, provenance, lifecycle, correction, export, deletion, and rollback
- **Requirement:** every schema or storage migration preserves or explicitly transforms all accepted invariants, produces synthetic evidence, identifies omissions and irreversible effects, and supports rollback where feasible
- **Evidence:** Sprint 3 compatibility and migration baseline
- **Residual risk:** executable migration runner, production fixtures, mixed-version operation, partial failure, and restore interaction are absent
- **Owner:** future Chronicle, migration, infrastructure, security, and release owners
- **Revalidation:** every schema, database, source, export, or provider migration

## Control-to-integrated-objective mapping

The `CTL-LC-*` controls refine these reusable integrated objectives:

- `CTL-TM-001` — server-derived resource context and partition isolation;
- `CTL-TM-006` — authoritative lifecycle, correction, deletion, and restoration;
- `CTL-TM-007` — untrusted-input isolation and source integrity;
- `CTL-TM-008` — minimization and derived-data control;
- `CTL-TM-009` — exact authority, purpose, actor, and scope;
- `CTL-TM-012` — person-visible and protected evidence integrity;
- `CTL-TM-014` — untrusted-output validation and confirmation;
- `CTL-TM-015` — provider egress and derivative retention control;
- `CTL-TM-020` — backup, restore, and recoverability;
- `CTL-TM-022` — research and analytics isolation;
- `CTL-TM-023` — challenge, correction, restoration, and residual harm;
- `CTL-TM-024` — protected audit minimization;
- `CTL-TM-025` — accessible and non-coercive security interaction;
- `CTL-TM-027` — correction and deletion propagation; and
- `CTL-TM-028` — provider, operator, and founder-independent continuity.

## Current evidence boundary

At workstream 5.4 completion:

- all `CTL-LC-*` controls are required and designed;
- the existing Sprint 3 validator and synthetic fixtures provide limited deterministic contract evidence for confirmation, provenance references, relationships, custody references, export chains, deletion targets, exceptions, and tombstones;
- no control is implemented in a production persistence, source, export, deletion, inference, backup, or migration runtime;
- no Chronicle control is operationally verified;
- no named independent security reviewer is recorded; and
- specialist privacy, accessibility, clinical, legal, records-governance, and research review remains pending.

## Review result

The register does not authorize a production Chronicle, inference engine, source processor, export service, deletion worker, backup system, or custody provider.

It defines the minimum design boundary those capabilities must satisfy before implementation or public claims may advance.
