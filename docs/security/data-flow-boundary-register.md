# Security Data-Flow and Trust-Boundary Crossing Register

[Security architecture](README.md) · [Asset and trust-boundary map](asset-and-trust-boundary-map.md) · [Asset and authority register](asset-authority-register.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent security review pending  
**Workstream:** 5.1  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** design record only; future flows are not implemented or authorized by being mapped

## Purpose

This register gives stable identities to trust zones, boundary crossings, and principal flows. Later threats, controls, table tops, and implementation reviews should reference these IDs.

Every boundary crossing is treated as capable of leaking, broadening, duplicating, delaying, reordering, corrupting, replaying, or losing information or authority. A private network location does not remove the need for explicit identity, policy, minimization, freshness, integrity, and evidence.

## Trust zones

| ID | Zone | Capability and information boundary |
| --- | --- | --- |
| `TZ-P0` | Public and synthetic surfaces | Public repository, issues, pull requests, public-safe CI logs and artifacts, documentation, institutional ledgers, website content, synthetic fixtures, public tabletop records |
| `TZ-P1` | Local contributor environment | Public code and synthetic data only; no production credentials, private exports, or protected systems |
| `TZ-P2` | Public web delivery and interest intake | Public site and purpose-limited signup adapter; not an account, Chronicle, research, permission, or health-data system |
| `TZ-S0` | Private edge and authenticated-session boundary | Future authentication, session establishment, request validation, rate limits, risk signals, and private routing |
| `TZ-S1` | Domain application boundary | Future modular services for identity, Chronicle, House of Keys, execution, product state, export, deletion, and other bounded capabilities |
| `TZ-S2` | Canonical structured-data boundary | Future private authoritative storage; no direct public, client, model, MCP, analytics, or arbitrary operator access |
| `TZ-S3` | Raw-source and object-storage boundary | Future encrypted custody of documents, images, payloads, immutable versions, locators, and derived representations |
| `TZ-S4` | Queue and worker boundary | Future durable background processing; jobs preserve identity, purpose, authority revision, freshness, idempotency, cancellation, and receipt context |
| `TZ-S5` | AI, retrieval, and document-processing boundary | Future isolated extraction, generation, indexing, retrieval, and parsing; inputs minimized and outputs untrusted |
| `TZ-S6` | Analytics and isolated research boundary | Future isolated personal analytics or separately authorized aggregate/research work; never an unrestricted replica of raw personal data |
| `TZ-S7` | Administrative, security, deployment, and observability boundary | Future private operator, incident, key, deployment, and monitoring surfaces with least privilege and separation of duties |
| `TZ-S8` | External recipient, connector, and provider boundary | Devices, health platforms, signup processors, storage or AI providers, study organizations, and other recipients; external status does not imply trust |
| `TZ-S9` | Backup, archive, replica, and disaster-recovery boundary | Future isolated recovery systems whose restore behavior preserves correction, authority, withdrawal, and deletion history |

## Boundary crossings

### `BX-001` — Contributor environment to public repository and CI

- **From / to:** `TZ-P1 → TZ-P0`
- **Assets:** `AST-001`, `AST-002`, `AST-003`, `AST-021`
- **Purpose:** public contribution, review, validation, and publication
- **Authority:** repository governance; no personal-data authority
- **Required checks:** PUBLIC or synthetic classification, provenance, review, DCO, secret scanning, repository policy, deterministic validation
- **Evidence:** commit, pull request, CI and DCO results, correction history
- **Current status:** implemented public baseline
- **Residual dependency:** administrative branch-protection evidence and stronger supply-chain provenance

### `BX-002` — Public visitor to public web delivery

- **From / to:** public client `→ TZ-P2`
- **Assets:** `AST-003`
- **Purpose:** view public content and assets
- **Authority:** publication governance
- **Required checks:** request validation, secure headers, static-asset integrity, truthful capability labels, accessibility
- **Evidence:** deployment and site tests
- **Current status:** live bounded public gateway
- **Residual dependency:** full Sprint 8 site and stronger deployment/supply-chain evidence

### `BX-003` — Public signup adapter to private interest processor

- **From / to:** `TZ-P2 → TZ-S8`
- **Assets:** `AST-004`, bounded `AST-020`
- **Purpose:** forward one minimized interest record
- **Authority:** explicit signup consent and published notice
- **Recipient:** configured private signup processor only
- **Performing actor:** public forwarding adapter
- **Required checks:** field allowlist, consent, honeypot and rate limits, HTTPS, endpoint and secret isolation, minimized logs, timeout and failure handling
- **Evidence:** adapter tests and private lifecycle records
- **Current status:** forwarding adapter live; private lifecycle incomplete
- **Residual dependency:** retention, unsubscribe, correction, deletion, incident, and owner records

### `BX-004` — Authenticated client to private edge

- **From / to:** authenticated future client `→ TZ-S0`
- **Assets:** `AST-005`, request metadata
- **Purpose:** establish authenticated session and bounded request context
- **Authority:** `AUTH-ACCOUNT`
- **Required checks:** authentication, anti-replay, session binding, expiry, revocation, rate limits, client and device risk handling
- **Evidence:** future authentication and session records
- **Current status:** required design; no runtime
- **Residual dependency:** workstream 5.2 and provider decision

### `BX-005` — Private edge to domain application

- **From / to:** `TZ-S0 → TZ-S1`
- **Assets:** `AST-005`, `AST-006`, bounded request context
- **Purpose:** invoke one bounded domain capability
- **Authority:** authenticated actor, verified capacity, service identity, and applicable House of Keys facts
- **Required checks:** caller identity derived at edge, tenant and resource binding, intent and schema validation, least-capability route, no caller-supplied owner authority
- **Evidence:** future request, service identity, policy, execution, receipt, and audit references
- **Current status:** required design; no runtime
- **Residual dependency:** 5.2 and application architecture

### `BX-006` — Domain application to canonical structured storage

- **From / to:** `TZ-S1 ↔ TZ-S2`
- **Assets:** `AST-005` through `AST-017` as applicable
- **Purpose:** authorized domain read or write
- **Authority:** owning domain; technical database access is insufficient
- **Required checks:** domain-specific service interfaces, row/tenant/resource isolation, transaction and revision rules, no direct client/model/MCP access
- **Evidence:** future domain operation and audit evidence
- **Current status:** frozen direction; no database runtime
- **Residual dependency:** persistence, tenancy, transaction, encryption, and backup design

### `BX-007` — Domain application to raw-source custody

- **From / to:** `TZ-S1 ↔ TZ-S3`
- **Assets:** `AST-008`, related `AST-009`
- **Purpose:** store or retrieve one authorized source or representation
- **Authority:** `AUTH-SOURCE` plus exact processing purpose
- **Required checks:** object identity, integrity, signed-access minimization, metadata controls, malware state, retention and deletion, custody evidence
- **Evidence:** future source and custody records
- **Current status:** contract direction only
- **Residual dependency:** 5.4, 5.6, 5.7, 5.8

### `BX-008` — Domain application to durable queue

- **From / to:** `TZ-S1 → TZ-S4`
- **Assets:** references to `AST-008`, `AST-011`, `AST-012`, `AST-018`, export/deletion jobs
- **Purpose:** schedule one bounded background operation
- **Authority:** fresh request and policy context
- **Required checks:** minimized payload, explicit resource and subject, decision identity and revision, freshness deadline, idempotency, cancellation, retry and dead-letter behavior
- **Evidence:** future job, execution, receipt, and audit references
- **Current status:** required design; no queue runtime
- **Residual dependency:** 5.5, 5.6, 5.8 and runtime transaction design

### `BX-009` — Queue or domain service to isolated processing

- **From / to:** `TZ-S1` or `TZ-S4 → TZ-S5`
- **Assets:** minimized `AST-008`, `AST-009`, `AST-015`, `AST-016`
- **Purpose:** one authorized extraction, parsing, generation, or retrieval task
- **Authority:** fresh policy and owning-domain purpose
- **Required checks:** input minimization, parser and malware isolation, provider egress and retention policy, tool allowlist, timeout, resource limits, no authority-bearing instructions from content
- **Evidence:** future task manifest, provider policy, result and source references
- **Current status:** required design; no production processing
- **Residual dependency:** 5.6, 5.7, Sprint 6

### `BX-010` — Isolated processing back to domain service

- **From / to:** `TZ-S5 → TZ-S1` or `TZ-S4`
- **Assets:** `AST-015`, `AST-016`, proposed `AST-009`
- **Purpose:** return an untrusted draft or derived result
- **Authority:** result has no independent authority
- **Required checks:** strict output schema, provenance, confidence and uncertainty, prompt-injection containment, deterministic validation or player confirmation, no hidden tool invocation
- **Evidence:** future result, validation, confirmation, correction, and source references
- **Current status:** required design; no runtime
- **Residual dependency:** 5.6 and Sprint 6 contracts

### `BX-011` — External source or connector into ingestion

- **From / to:** `TZ-S8 → TZ-S4` or bounded `TZ-S1`
- **Assets:** `AST-018`, `AST-008`
- **Purpose:** separately authorized import or synchronization
- **Authority:** connector authorization and person-controlled source relationship
- **Required checks:** connector identity, exact scopes, token protection, payload validation, cursor and replay integrity, quarantine, source review, revocation and future-sync stop
- **Evidence:** future connector, source, cursor, receipt, and audit records
- **Current status:** threat-model scope only; implementation deferred to Sprint 14
- **Residual dependency:** 5.6, 5.7, connector SDK and provider gates

### `BX-012` — Authorized release to external recipient

- **From / to:** `TZ-S1` or `TZ-S4 → TZ-S8`
- **Assets:** selected `AST-007`, `AST-008`, `AST-009`, `AST-019`, execution `AST-012`, receipt `AST-013`
- **Purpose:** one exact personal export, connector operation, study release, or other authorized transfer
- **Authority:** fresh `AUTH-KEYS` decision and valid recipient/action/scope/duration
- **Required checks:** recipient identity, performing actor, release boundary, encryption in transit, minimization, bounded-use consumption, failure and cancellation, receipt and protected audit
- **Evidence:** decision, execution, release, receipt, and audit identities
- **Current status:** required design; no production release
- **Residual dependency:** 5.5, 5.7, recipient-specific later gates

### `BX-013` — Private runtime to administrative and audit surfaces

- **From / to:** `TZ-S0` through `TZ-S6 → TZ-S7`
- **Assets:** minimized `AST-014`, configuration and bounded `AST-020`
- **Purpose:** operations, security detection, incident response, deployment, and accountability
- **Authority:** explicit operational or incident purpose
- **Required checks:** allowlisted fields, least privilege, short-lived access, separation of duties, integrity, redaction, retention, query limits, no raw-data browser
- **Evidence:** future operator access, change, incident, and audit records
- **Current status:** required design; no security operations runtime
- **Residual dependency:** 5.2, 5.3, 5.7, 5.8 and independent review

### `BX-014` — Canonical and source systems to backup and recovery

- **From / to:** `TZ-S2`, `TZ-S3`, bounded `TZ-S7 → TZ-S9`
- **Assets:** `AST-022` containing protected source assets
- **Purpose:** recover authorized validated state after loss or corruption
- **Authority:** owning domain plus bounded recovery authority
- **Required checks:** encrypted and isolated backup, inventory, retention, key separation, ransomware boundary, deletion and correction markers, restore compatibility
- **Evidence:** future backup manifests and restore tests
- **Current status:** required design; no backup runtime
- **Residual dependency:** 5.7 and 5.8

### `BX-015` — Backup restoration into authoritative systems

- **From / to:** `TZ-S9 → TZ-S2`, `TZ-S3`, or bounded `TZ-S7`
- **Assets:** `AST-022` restoring source assets
- **Purpose:** restore one approved state after incident or loss
- **Authority:** approved recovery decision and owning-domain validation
- **Required checks:** isolated restore, integrity, point-in-time selection, correction/revocation/deletion replay, stale-authority prevention, reconciliation before activation
- **Evidence:** restore decision, observed result, gaps, and revalidation record
- **Current status:** required design; no runtime
- **Residual dependency:** 5.8 tabletop and provider design

### `BX-016` — Domain service to authenticated person-visible receipt

- **From / to:** `TZ-S1 → TZ-S0 → authenticated client`
- **Assets:** `AST-013`
- **Purpose:** deliver inspectable permission and access evidence
- **Authority:** receipt evidence contract; receipt does not grant permission
- **Required checks:** recipient identity, accessible rendering, minimized content, integrity, correction chain, export and retention behavior
- **Evidence:** future delivery and acknowledgment evidence
- **Current status:** receipt contract and synthetic fixture only
- **Residual dependency:** 5.5 and later client implementation

### `BX-017` — Domain application to isolated analytics or research

- **From / to:** `TZ-S1 → TZ-S6`
- **Assets:** minimized `AST-007`, `AST-009`, `AST-019`, `AST-023`
- **Purpose:** personal-core analytics or one separately authorized aggregate/research task
- **Authority:** exact personal-core purpose or study-specific House of Keys authority
- **Required checks:** minimization, cohort and recipient binding, isolated working set, no arbitrary query, output review, temporary-state expiry, correction and deletion propagation
- **Evidence:** future analytical manifest, source references, policy decision, output review, receipt where applicable
- **Current status:** architectural threat scope; no analytics or research runtime
- **Residual dependency:** 5.3, 5.4, 5.7, 5.8 and later product/research gates

### `BX-018` — Reviewed analytical result back to authoritative or presentation domain

- **From / to:** `TZ-S6 → TZ-S1` or exact `TZ-S8` recipient
- **Assets:** `AST-023`, bounded proposed `AST-009` or research output `AST-019`
- **Purpose:** return a descriptive personal result or release one approved aggregate output
- **Authority:** output review and original bounded purpose; result remains non-authoritative until accepted by its owning domain
- **Required checks:** source references, uncertainty, claim taxonomy, output disclosure review, no re-identification, correction/deletion linkage, exact recipient
- **Evidence:** future result review, source and release records
- **Current status:** required design; no runtime
- **Residual dependency:** Sprint 15, research governance, clinical and privacy review

## Principal flows

### `FLOW-001` — Public documentation and repository publication

`ACT-GOVERNANCE or contributor → TZ-P1 → BX-001 → TZ-P0 → public repository or TZ-P2 website`

- **Assets:** `AST-001`, `AST-002`, `AST-003`, `AST-021`
- **Purpose and recipient:** public governance, explanation, contribution, and publication
- **Retention and correction:** public history retained; correction and supersession visible
- **Receipt and audit:** pull-request, CI, DCO, commit, and publication evidence; no person-visible House of Keys receipt
- **Capability status:** implemented public baseline

### `FLOW-002` — Founding Expedition interest signup

`visitor → BX-002 → TZ-P2 → validation and consent → BX-003 → TZ-S8 private signup processor`

- **Assets:** `AST-004`, bounded `AST-020`
- **Purpose and recipient:** project-interest updates to one configured private processor
- **Retention and correction:** must support unsubscribe, correction, deletion, and bounded retention
- **Receipt and audit:** public form status and private processing evidence; no health-data receipt
- **Capability status:** bounded live adapter; lifecycle incomplete

### `FLOW-003` — Future Chronicle capture

`ACT-ACCOUNT → BX-004 → TZ-S0 → BX-005 → TZ-S1 → optional BX-009/BX-010 draft → ACT-PERSON confirmation → BX-006/BX-007 → authoritative record and provenance`

- **Assets:** `AST-005` through `AST-009`, optional `AST-015`
- **Purpose and recipient:** personal Chronicle capture for the controlling person
- **Retention and correction:** source and record lifecycles remain distinct; manual non-AI capture available
- **Receipt and audit:** Chronicle provenance and bounded operational evidence; access receipt only when a receipt-triggering permission operation occurs
- **Capability status:** contracts and architecture only

### `FLOW-004` — Future authorized read or release

`ACT-REQUESTER → BX-004/BX-005 → House of Keys request and AST-011 decision → BX-006 retrieval → AST-012 execution → BX-012 release or internal result → BX-016 AST-013 receipt → AST-014 audit`

- **Assets:** `AST-006`, `AST-007`, `AST-010` through `AST-014`
- **Purpose and recipient:** exact named purpose, recipient, performing actor, scope, duration, and conditions
- **Retention and correction:** freshness rechecked at execution; corrections and revocation affect future release
- **Receipt and audit:** person-visible receipt and separate protected audit evidence
- **Capability status:** policy contracts and synthetic evidence only

### `FLOW-005` — Future connector import and synchronization

`ACT-CONNECTOR in TZ-S8 → BX-011 → TZ-S4 ingestion → BX-007 raw custody → review and normalization → ACT-PERSON or accepted import rule → BX-006 Chronicle record → receipt`

- **Assets:** `AST-018`, `AST-008`, `AST-009`, `AST-007`, `AST-013`
- **Purpose and recipient:** exact source import for the controlling person
- **Retention and correction:** future sync stops after revocation; cursor and source conflicts remain inspectable
- **Receipt and audit:** connector and access receipts as applicable, separate protected audit
- **Capability status:** deferred to Sprint 14

### `FLOW-006` — Future personal export

`ACT-PERSON request → House of Keys decision → BX-008 export job → selection from BX-006/BX-007 → integrity and completeness checks → BX-012 delivery → BX-016 receipt`

- **Assets:** selected Chronicle and source assets, `AST-011`, `AST-012`, `AST-013`
- **Purpose and recipient:** personal portability to the controlling person
- **Retention and correction:** temporary artifacts expire and are deleted; omissions remain inspectable
- **Receipt and audit:** exact export decision, execution, delivery, and receipt evidence
- **Capability status:** contract direction only

### `FLOW-007` — Future deletion and verification

`ACT-PERSON request or valid domain trigger → authority and dependency review → canonical/source deletion → cache/index/queue procedures → BX-014 backup handling → recipient procedures → bounded verification → completion and limitations`

- **Assets:** `AST-007` through `AST-016`, `AST-018`, `AST-019`, `AST-022`, `AST-023`
- **Purpose and recipient:** person-controlled deletion or exact domain obligation
- **Retention and correction:** narrow retention exceptions; restore cannot silently reverse valid deletion
- **Receipt and audit:** procedure evidence and person-visible limitations; no false claim of uncontrolled downstream erasure
- **Capability status:** required design; no runtime

### `FLOW-008` — Future AI or MCP-assisted operation

`authenticated ACT-ACCOUNT or ACT-MCP → BX-004/BX-005 → policy-controlled domain intent → minimized context → BX-009 → TZ-S5 execution → BX-010 untrusted result → deterministic validation or ACT-PERSON confirmation → optional domain write or receipt`

- **Assets:** `AST-005` through `AST-016`
- **Purpose and recipient:** one bounded personal interaction or tool invocation
- **Retention and correction:** provider and memory retention explicit; non-AI fallback available
- **Receipt and audit:** sensitive operations produce receipts; tool and provider evidence remains separate
- **Capability status:** architecture only; Sprint 6 and Sprint 16 dependencies

### `FLOW-009` — Future backup and restoration

`owning domain → BX-014 → TZ-S9 isolated backup → approved recovery decision → BX-015 → isolated restore and reconciliation → authoritative activation`

- **Assets:** `AST-022` and referenced source assets
- **Purpose and recipient:** disaster recovery for the owning domain
- **Retention and correction:** backup retention bounded; deletion, correction, revocation, and key history reconciled
- **Receipt and audit:** restore exercise, decision, result, gap, and revalidation evidence
- **Capability status:** required design; no runtime

### `FLOW-010` — Future security incident response

`detected event → minimized AST-014 evidence in TZ-S7 → classification → containment across affected zones → eradication and correction → BX-015 recovery if needed → restoration and notification → safe public derivative where appropriate`

- **Assets:** `AST-014`, bounded `AST-020`, affected assets
- **Purpose and recipient:** security response and restoration under bounded authority
- **Retention and correction:** incident holds are narrow; public records are minimized derivatives
- **Receipt and audit:** incident chronology, authority, decisions, containment, restoration, residual harm
- **Capability status:** policy direction; 5.8 design pending

### `FLOW-011` — Future separately authorized research

`ACT-RESEARCH proposal → governance review → ACT-PERSON study-specific authority → BX-017 isolated dataset → analysis → BX-018 reviewed output → exact recipient or public aggregate`

- **Assets:** `AST-019`, selected `AST-007`, `AST-009`, `AST-023`
- **Purpose and recipient:** one named public-good study and approved output recipients
- **Retention and correction:** study-specific retention, withdrawal, correction, deletion, output review
- **Receipt and audit:** enrollment, access, release, withdrawal, and output evidence
- **Capability status:** deferred and unauthorized at Sprint 5

### `FLOW-012` — Future personal analytics

`ACT-PERSON request → personal-core policy → BX-017 minimized structured inputs → isolated computation in TZ-S6 → BX-018 source-linked result → person presentation`

- **Assets:** `AST-007`, `AST-009`, `AST-023`
- **Purpose and recipient:** descriptive personal intelligence for the controlling person
- **Retention and correction:** temporary working sets expire; source correction and deletion propagate
- **Receipt and audit:** source-linked result and bounded operational evidence; no secondary-use authority
- **Capability status:** later Sprint 15 direction

## Crossing-wide invariants

1. Every crossing has explicit source and destination zones.
2. Every sensitive crossing identifies authority, purpose, recipient, performing actor, and asset.
3. External actors, private services, operators, models, queues, and providers are not trusted by location or ownership.
4. Policy decisions are point-in-time facts and are rechecked where delay, queueing, cache, retry, or release can make them stale.
5. Payloads are minimized; references are preferred over unnecessary copies.
6. Logs, traces, prompts, metrics, errors, receipts, and audit evidence use separate allowlists.
7. Derived outputs remain untrusted until accepted by their authoritative domain.
8. Public origins never require direct exposure of databases, queues, object storage, administrative services, or internal provider endpoints.
9. Backup and restore are distinct crossings with deletion and correction reconciliation.
10. Every future crossing has a deny, cancel, contain, fail-safe, or rollback path.
11. A crossing design is not evidence that the crossing is deployed.
12. Independent review remains pending.

## Internal review result

The register covers the public site and signup adapter; account and identity concepts; Living Chronicle; source and custody; House of Keys; execution; receipts; audit; AI, retrieval, and MCP; connectors and uploads; administrative and security surfaces; CI and supply chain; backups and restoration; research actors; and future analytics.

The boundary map now supports stable references for 5.2 through 5.10. Later threat records may add or revise crossings, but they must preserve history and reconcile affected assets, flows, and controls.
