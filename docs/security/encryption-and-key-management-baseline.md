# Encryption and Key-Management Baseline

[Security architecture](README.md) · [Asset and authority register](asset-authority-register.md) · [Integrated threat model](integrated-threat-model.md) · [Control-status vocabulary](control-status-and-risk-vocabulary.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent security, privacy, cryptography, legal, and records-governance review pending  
**Workstream:** 5.7  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** provider-independent requirements only; no production encryption service, key hierarchy, key custodian, certificate authority, hardware security module, backup-key system, signing service, or protected-data runtime is selected, authorized, or represented as deployed

## Purpose

This baseline defines how Calypso’s Promise must protect data and cryptographic operations without turning encryption into a substitute for authorization, minimization, deletion, or institutional accountability.

It refines:

- `THR-012` source substitution, custody confusion, and integrity overclaim;
- `THR-016` hidden retention and deletion overclaim;
- `THR-028` secret, key, certificate, token, endpoint, and service-identity exposure;
- `THR-029` environment crossover;
- `THR-032` destructive compromise and bulk corruption;
- `THR-033` backup compromise and weak key separation; and
- `THR-034` restoration of stale, deleted, or invalid state.

It protects `AST-005` through `AST-023`, with particular attention to `AST-008`, `AST-014`, `AST-018`, `AST-020`, `AST-022`, and `AST-023`.

## Governing invariants

1. **Encryption is not authority.** Possessing ciphertext, a key identifier, a decryption capability, or provider administration does not create account, Chronicle, source, House of Keys, execution, receipt, audit, research, or institutional authority.
2. **Integrity evidence is not truth evidence.** A digest, signature, certificate, or authenticated-encryption result may establish bounded technical properties. It does not prove a health claim, person identity, permission, legal validity, clinical correctness, recipient compliance, or deletion completion.
3. **Minimize before encrypting.** Encryption does not justify collecting, retaining, logging, indexing, exporting, or backing up unnecessary protected data.
4. **No universal key.** One key, certificate, service identity, or provider account may not unlock every environment, domain, asset, purpose, backup, export, or audit surface.
5. **Purpose and environment separation are mandatory.** Keys for production, staging, development, preview, CI, analytics, research, administration, recovery, signing, transport, storage, exports, and backups remain distinct unless a reviewed exception proves an equal or stronger boundary.
6. **Keys remain replaceable.** Canonical identities, Chronicle records, sources, permissions, receipts, and exports may reference cryptographic metadata, but they may not depend on one provider-specific key identifier or one founder-held secret for interpretation or portability.
7. **Plaintext exposure is a separate event.** Successful encryption at rest does not erase plaintext that appeared in memory, logs, exports, clients, prompts, provider systems, downstream recipients, or prior versions.
8. **Loss is a security failure too.** Confidentiality controls must not create an unreviewed single point of irreversible data loss.
9. **Cryptographic erasure must be bounded and honest.** Destroying a key may make identified controlled ciphertext unreadable. It does not prove that every plaintext, backup, export, screenshot, recipient copy, model copy, or uncontrolled derivative ceased to exist.
10. **Designed is not deployed.** This document defines requirements and review gates. It does not establish that any production control exists or is effective.

## Protection boundaries

### Data in transit

Protected and restricted traffic must use an approved authenticated secure channel appropriate to the client, service, provider, and administrative boundary.

The channel design must:

- authenticate the intended service or workload;
- prevent silent downgrade to an unprotected transport;
- reject invalid, expired, revoked, mismatched, or untrusted service identities;
- bind private service traffic to the intended environment and service class;
- preserve request identity and authorization outside the transport layer;
- avoid treating network location as permission;
- support rotation and replacement without rewriting canonical records; and
- expose only safe public certificate metadata.

Transport encryption does not authorize a request, validate Chronicle truth, or permit a private origin to become publicly reachable.

### Structured records and databases

Structured stores holding protected or restricted information must have encryption at rest plus domain authorization, tenant isolation, query controls, minimization, and deletion behavior.

A database-level control alone is insufficient because it may leave data visible to:

- privileged database actors;
- application services with broad access;
- snapshots and replicas;
- query logs and diagnostics;
- exports and analytical copies;
- caches and queues; or
- compromised runtime identities.

Additional field- or object-level protection may be required where consequence, access concentration, or provider exposure justifies it. Field-level encryption must not be adopted in a way that silently breaks correction, export, deletion, indexing, accessibility, portability, or source provenance.

### Raw sources, objects, attachments, and derived representations

Source bytes, immutable versions, stored representations, attachments, OCR, transcripts, previews, embeddings, and other derived representations must be encrypted with keys separated from public assets and ordinary build systems.

Object identity, source identity, custody identity, and encryption-key identity remain distinct.

A storage URL, bucket, object key, provider object identifier, encryption status, or successful integrity check does not become the canonical source identity or proof of authorization.

### Queues, caches, temporary files, and memory-adjacent state

Sensitive queue payloads, cache entries, temporary files, processing workspaces, crash artifacts, and intermediate outputs must be minimized before protection is considered.

Where protected material remains necessary, the design must provide:

- environment and tenant separation;
- short retention;
- restricted service identities;
- encryption appropriate to the storage or transport boundary;
- revocation and deletion propagation;
- safe failure and cleanup;
- no plaintext spill into public artifacts or diagnostics; and
- evidence that expired work cannot be replayed with stale authority.

Encryption does not cure an over-broad queue payload or a cache key that loses tenant context.

### Logs, receipts, protected audit, traces, and diagnostics

Logs, person-visible receipts, protected audit evidence, traces, metrics, and diagnostics must be minimized and field-allowlisted before encryption.

They must not become:

- a shadow Chronicle;
- a shadow permission system;
- a global identity graph;
- an unrestricted analytical warehouse;
- a plaintext secret store; or
- an excuse for indefinite retention.

Receipt integrity, audit integrity, confidentiality, access, correction, retention, and deletion are separate properties. Encryption protects stored representations; it does not establish completeness or accuracy.

### Export artifacts

Export packages containing protected information require their own bounded protection and lifecycle.

The design must support:

- one export request and plan;
- one scoped artifact identity;
- short availability and explicit expiry;
- delivery to the exact authorized actor or recipient;
- protection independent from the canonical Chronicle store;
- deletion of the export artifact without deleting the Chronicle;
- integrity metadata that does not overclaim truth; and
- no reusable export key embedded in clients, URLs, receipts, or logs.

A download link, delivery token, or package password is a secret or capability and follows the secret-management policy.

### Backups, replicas, snapshots, and archives

Backups and recovery copies inherit the highest classification and authority obligations of their contents.

They require:

- encryption separate from ordinary live-service access;
- key and credential separation from the primary failure domain;
- inventory and retention boundaries;
- tested restoration with authorized key recovery;
- deletion-aware reconciliation after restoration;
- ransomware and destructive-operator resistance;
- explicit retirement and destruction behavior; and
- no claim that encryption alone makes an indefinite backup acceptable.

Detailed backup, restoration, and deletion-verification procedures remain workstream 5.8.

## Key hierarchy

The baseline requires a versioned hierarchy with separate key classes. Exact provider products and implementation details remain unresolved.

### Institutional trust and recovery roots

Institutional trust roots may govern access to key-management administration, recovery, and migration. They must not be usable directly by ordinary application code.

High-consequence roots require:

- named institutional ownership;
- separation from routine deployment identities;
- multi-party or independently reviewable control;
- no founder-only possession;
- protected recovery evidence;
- automatic or procedural containment after compromise; and
- tested succession and provider-replacement behavior.

### Environment key-encryption keys

Each protected environment requires a distinct key-encryption boundary. A development, preview, CI, staging, analytics, research, administrative, or recovery key must not decrypt production material.

Environment key identifiers must be derived from trusted configuration, never from caller-supplied environment names.

### Domain and purpose key-encryption keys

Within an environment, high-consequence domains or purposes may require separate key-encryption keys, including:

- account and identity mappings;
- Living Chronicle structured records;
- raw sources and attachments;
- House of Keys permission state;
- receipts;
- protected audit;
- connector credentials;
- exports;
- analytics or research working state; and
- backups and recovery.

The final granularity must balance blast-radius reduction, performance, portability, recovery, deletion, and operational complexity. A provider default is not sufficient evidence that the chosen boundary is appropriate.

### Data-encryption keys

Data-encryption keys protect bounded data units or storage partitions and are wrapped by an applicable key-encryption key.

A data-encryption key must be bound to:

- one environment;
- one approved purpose or asset class;
- one key version;
- one authorized cryptographic operation class;
- one lifecycle record; and
- sufficient authenticated context to detect substitution across incompatible resources.

Raw data-encryption keys must not be persisted in ordinary application configuration, logs, receipts, caches, queues, issue trackers, source code, or client applications.

### Signing and attestation keys

Signing keys for releases, receipts, audit evidence, public advisories, or other attestations remain separate from encryption keys, transport identities, and ordinary application authentication.

A valid signature establishes only the statement and signer relationship defined by the signed contract. It does not make the statement true, authorized, clinically correct, or legally sufficient.

### Transport and workload identities

Transport certificates and workload-identity keys authenticate bounded services or channels. They do not grant domain permission and must not be reused as data-encryption or signing keys.

### Export and session protection keys

Short-lived export, delivery, or session protection keys must be narrowly scoped, automatically expire where possible, and remain incapable of decrypting the canonical Chronicle or unrelated exports.

### Backup and recovery keys

Backup and recovery keys require a failure domain, custody path, and retention lifecycle distinct from live service keys.

Recovery material must be available enough to meet an accepted restore objective while remaining protected against the same actor, malware, account, or provider compromise that affected the primary environment.

## Key metadata record

Every managed key class requires an inventory record containing non-secret metadata such as:

- stable project key identity;
- key class and cryptographic purpose;
- environment and domain boundary;
- provider or implementation class;
- provider-specific opaque reference, protected where necessary;
- current version;
- lifecycle state;
- owner and accountable reviewer roles;
- creation, approval, activation, rotation, review, retirement, and destruction times;
- allowed cryptographic operations;
- service identities permitted to invoke those operations;
- backup or recovery class;
- dependent assets and services;
- compromise, incident, migration, or exception references;
- evidence status; and
- next revalidation trigger.

The inventory must never contain raw private key material, plaintext secrets, recovery codes, or unredacted provider credentials.

## Key lifecycle

### `requested`

A bounded need is documented with purpose, environment, owner, data class, operation class, rotation expectation, and recovery requirement.

### `approved`

The key design has accountable review, but no key material is represented as provisioned.

### `provisioned`

Key material exists through an approved private mechanism but is not yet accepted for active use.

### `active`

The key version may perform only its approved operations for its approved services and environment.

### `rotation-pending`

A successor is being prepared. New encryption must not silently continue under an obsolete key when policy requires migration.

### `decrypt-only` or `verify-only`

The key remains temporarily available to read or verify historical material but may not protect new material.

### `suspended`

Use is temporarily blocked while integrity, ownership, environment, or compromise evidence is reviewed.

### `revoked`

The key must not be used for new operations. Dependent sessions, credentials, artifacts, and services require containment and replacement according to consequence.

### `compromised`

Exposure or unauthorized use is suspected or confirmed. The key is unsafe even if a provider still reports it as enabled.

### `destruction-pending`

Dependencies, backups, recovery copies, legal or records obligations, and restoration consequences are being resolved before destruction.

### `destroyed`

The bounded destruction procedure completed for all controlled copies in scope. This does not prove universal downstream erasure.

### `unavailable`

The key cannot currently perform a required operation. The state must not be misrepresented as deletion, revocation, or proof that ciphertext is irrecoverable.

### `recovery-hold`

Use is restricted to an accepted recovery process. Recovery authority does not permit ordinary data browsing or authority expansion.

## Generation and provisioning

Key material must be generated by an approved cryptographic mechanism appropriate to the operation and consequence.

Requirements include:

- no human-selected private key material;
- no raw key values in source code, configuration files, issue trackers, public branches, prompts, logs, screenshots, or ordinary support systems;
- no plaintext copy-and-paste distribution;
- no unreviewed provider default that permits key export or broad administration;
- explicit environment and purpose binding;
- generation and activation evidence without exposing key material;
- service access through an approved operation interface rather than raw-key retrieval where feasible; and
- validation that test and synthetic keys cannot be used in production.

## Custody and access

Key administration and cryptographic use must be least-capability and attributable.

The design must distinguish:

- key-policy administration;
- cryptographic operation invocation;
- application deployment;
- ordinary operations;
- audit review;
- backup and recovery;
- incident containment;
- migration; and
- destruction approval.

No shared administrator account or founder-only credential may serve as the sole custody path.

High-consequence access requires proportionate step-up, bounded duration, protected audit, and post-use review. A person who can deploy ordinary application code should not automatically be able to export, replace, disable, or destroy high-consequence keys.

## Cryptographic operation boundary

Application services should invoke a bounded cryptographic operation through an approved service identity and policy rather than receive reusable raw key material.

An operation request must bind:

- environment;
- service identity;
- key identity and version;
- operation type;
- asset or purpose class;
- resource context where applicable;
- authenticated contextual data needed to prevent substitution;
- request and correlation identity;
- decision or execution evidence where required; and
- safe failure behavior.

A successful cryptographic operation does not grant access to the plaintext result beyond the domain authorization that already applies.

## Rotation and migration

Rotation may be scheduled, consequence-triggered, provider-triggered, incident-triggered, or migration-triggered.

A rotation plan must define:

- reason and owner;
- predecessor and successor key identities and versions;
- activation and cutoff times;
- whether data is rewrapped, re-encrypted, regenerated, or left under a decrypt-only predecessor;
- service rollout ordering;
- cache, queue, backup, export, and long-running-job effects;
- rollback limits;
- how stale clients or workers are rejected;
- how completion is measured; and
- remaining old-key dependencies.

A rotation is not complete merely because a new key exists. New writes, reads, restores, exports, background jobs, and recovery paths must use the intended version according to the accepted transition.

## Revocation and compromise

Suspected or confirmed compromise requires consequence-aware containment.

The response must consider:

- immediate suspension or revocation;
- stopping new cryptographic operations;
- rotating dependent secrets, certificates, sessions, service identities, and credentials;
- identifying affected data and operations;
- rewrapping or re-encrypting controlled ciphertext where useful;
- invalidating stale deployments, queues, caches, and artifacts;
- preserving minimized protected evidence;
- reviewing provider, personnel, repository, CI, preview, support, and logging exposure;
- notification and restoration obligations; and
- residual harm that cannot be reversed.

Deleting a leaked file, rotating only one visible credential, or disabling one provider account is not automatically complete containment.

## Key backup and recovery

Key recovery must preserve both confidentiality and availability.

Requirements include:

- recovery material separated from ordinary service operation;
- independent failure domains appropriate to the accepted recovery objective;
- no unprotected plaintext export;
- least-capability and multi-party controls for high-consequence recovery;
- explicit inventory of what can and cannot be recovered;
- test restoration using synthetic or otherwise authorized evidence;
- provider- and founder-independent continuity;
- recovery that does not silently restore revoked, deleted, superseded, or compromised authority; and
- clear behavior when a key is lost permanently.

Recovery testing does not authorize production data use in contributor, preview, CI, or public systems.

## Destruction and cryptographic erasure

Key destruction is a high-consequence lifecycle event.

Before destruction, the owner must resolve:

- all controlled active and recovery copies;
- dependent live data, backups, replicas, exports, queues, caches, receipts, audit evidence, and legal or records holds;
- migration or portability obligations;
- whether destruction would make required person rights impossible;
- rollback and mistaken-destruction risk;
- notification or incident implications; and
- the exact claim that completion evidence may support.

A cryptographic-erasure record may state that named controlled ciphertext is no longer decryptable through identified controlled key copies. It may not state that every copy of the underlying information no longer exists unless separate evidence supports that stronger claim.

## Cryptographic agility and provider replacement

The design must support controlled replacement of algorithms, providers, key stores, certificate systems, and signing services.

Required properties include:

- a versioned cryptographic-suite policy;
- explicit algorithm and protocol metadata where needed for interpretation;
- no silent downgrade;
- compatibility and migration rules;
- separation of project key identity from provider key identity;
- ability to operate predecessor and successor versions during a bounded transition;
- safe failure when an unsupported version is encountered;
- export and restore compatibility;
- provider exit and institutional succession procedures; and
- revalidation when provider guarantees, contracts, regions, APIs, or trust assumptions change.

This baseline intentionally does not publish production configuration, key identifiers, provider accounts, internal endpoints, exact anti-abuse thresholds, or operational recovery material.

## Evidence required before a control is called deployed

At minimum, a deployed encryption or key-management claim requires reviewed evidence for the applicable scope:

- complete key and protected-surface inventory;
- approved configuration captured without exposing secrets;
- environment and purpose separation;
- access-policy and service-identity tests;
- plaintext-exposure review;
- rotation and predecessor-retirement test;
- revocation and compromise-containment test;
- backup-key and restoration test;
- destruction or cryptographic-erasure procedure where claimed;
- provider and region assumptions;
- alerting and protected-audit coverage;
- application failure behavior;
- portability and provider-replacement evidence;
- independent security or cryptographic review appropriate to consequence; and
- unresolved residual-risk ownership.

Provider marketing, default encryption, a configuration screenshot, one successful API call, or synthetic documentation alone is insufficient.

## Current control status

At this revision:

- encryption and key-management controls are **required and designed**;
- no production key or protected-data environment is represented as provisioned;
- no control is independently reviewed;
- no control is represented as deployed or operationally verified;
- production-facing residual risks remain production-blocking; and
- workstream 5.8 must refine backup, restoration, incident, audit-retention, and deletion-verification procedures.

## Specialist holdpoints

Specific review is required before:

- selecting production algorithms, protocol versions, providers, regions, hardware or software key stores, or certificate authorities;
- determining which fields require additional cryptographic separation;
- creating person-controlled, client-held, escrowed, recoverable, or non-recoverable encryption;
- using cryptographic destruction as a deletion mechanism;
- signing receipts, audit records, research outputs, releases, or public claims;
- making legal, evidentiary, regulatory, clinical, or research claims based on cryptographic evidence;
- storing protected data in analytics, research, or provider-managed AI systems; or
- accepting a temporary exception that crosses environment or purpose boundaries.

## Revalidation triggers

Revalidate this baseline when:

- a protected environment, database, object store, cache, queue, log, backup, export, analytics, research, AI, or administrative store is introduced;
- a provider, region, key hierarchy, algorithm suite, certificate system, workload identity, or recovery path changes;
- a key is exposed, unavailable, rotated, revoked, migrated, restored, or destroyed;
- a new asset class or higher consequence is introduced;
- a new recipient, connector, processor, model, or external storage boundary is added;
- a deletion or restoration claim relies on key behavior; or
- independent review identifies a weaker assumption or missing control.

## Public-information boundary

This public baseline contains control objectives and safe architectural relationships only.

Do not place in public systems:

- key values, secrets, tokens, private certificates, recovery material, or provider credentials;
- provider account identifiers or private key references;
- internal endpoints, network paths, administrative access methods, or emergency procedures that enable misuse;
- production configuration exports or screenshots;
- unredacted key inventories, access logs, or incident evidence; or
- detailed exploit or bypass information.

Protected evidence belongs in an authorized private system. Public artifacts may contain reviewed, minimized institutional derivatives.
