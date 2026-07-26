# Security Asset, Authority, and Actor Register

[Security architecture](README.md) · [Asset and trust-boundary map](asset-and-trust-boundary-map.md) · [Data-flow and boundary register](data-flow-boundary-register.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent security review pending  
**Workstream:** 5.1  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** design record only; it does not authorize or represent a production health-data, account, agent, connector, research, analytics, encryption, or administrative runtime

## Purpose

This register gives stable identities to the authority domains, actor classes, and assets included in the Sprint 5 threat-model boundary.

The register prevents technical possession, network location, provider ownership, operator access, or model access from being mistaken for legitimate authority. Every later threat, control, tabletop, exception, and completion record should reference these IDs where applicable.

## Identifier rules

- Authority domains use `AUTH-*`.
- Actor classes use `ACT-*`.
- Assets use `AST-*`.
- Trust zones and boundary crossings are defined in the [data-flow and boundary register](data-flow-boundary-register.md).
- IDs are stable within Sprint 5. A semantic replacement receives a new ID or explicit revision and supersession record.
- A reference to an ID never grants access or proves that the referenced capability exists.

## Authority domains

| ID | Domain | Owns | Explicitly does not own |
| --- | --- | --- | --- |
| `AUTH-ACCOUNT` | Account and identity | Authentication, account lifecycle, sessions, recovery, verified delegation, internal account-to-pseudonym relationships | Chronicle truth, permission, execution, research authority, clinical truth |
| `AUTH-CHRONICLE` | Living Chronicle | Confirmed records, temporal and value semantics, provenance, correction, conflict, export, deletion, custody references, bounded derivation | Authentication, grants, execution, receipts, rewards, story state, AI memory |
| `AUTH-SOURCE` | Source and custody | Raw artifacts, immutable versions, locators, stored representations, integrity, malware state, custody, controlled access references | Confirmation as Chronicle truth, permission, product state |
| `AUTH-KEYS` | House of Keys | Purposes, categories, recipients, actions, grants, lifecycle, explanations, comprehension, confirmations, capacity, policy requests and decisions, person-visible receipt contracts | Chronicle truth, execution, research approval, reward authority |
| `AUTH-EXECUTION` | Execution and release | Attempts, releases, processing state, idempotency, retries, cancellation, bounded-use consumption, completion and failure | Identity proof, grants, policy expansion, Chronicle confirmation |
| `AUTH-AUDIT` | Protected operational audit | Minimized security and operational evidence for detection, investigation, containment, restoration, and accountability | Shadow Chronicle, shadow permission, unrestricted analytics, universal operator search |
| `AUTH-PRODUCT` | Product and story | Quests, progression, restoration, scenes, choices, notifications, story state | Chronicle truth, permission, clinical truth, arbitrary rewards |
| `AUTH-AI` | AI, retrieval, and disposable derivatives | Drafts, prompts, outputs, embeddings, indexes, caches, retrieval results, approved interaction metadata | Identity proof, Chronicle truth, permission, rewards, arbitrary tools, clinical conclusions |
| `AUTH-INSTITUTION` | Institutional | Public decisions, policies, assumptions, outcomes, challenge, correction, funding transparency, governance state | Personal-data access, person-specific permission, technical override of frozen rights |

## Actor classes

| ID | Actor | Permitted role | Prohibited authority |
| --- | --- | --- | --- |
| `ACT-PERSON` | Controlling person | Confirm records, grant or withdraw authority, inspect receipts, correct, export, delete | Cannot be coerced through blanket, irrevocable, bundled, or punitive choices |
| `ACT-SUBJECT` | Subject | Person described by a record | Must not be assumed identical to owner, author, requester, recipient, or confirmer |
| `ACT-ACCOUNT` | Authenticated account actor or verified delegate | Act through authenticated and capacity-checked context | Cannot select another Chronicle through caller-supplied ownership |
| `ACT-REQUESTER` | Requester | Ask for one bounded operation | Cannot self-authorize, silently become recipient, or broaden purpose |
| `ACT-RECIPIENT` | Recipient | Receive one authorized bounded result | Cannot acquire onward distribution, unrelated purpose, or unlimited retention |
| `ACT-PERFORMER` | Performing actor | Execute an authorized action | Cannot become independent permission authority or arbitrary data browser |
| `ACT-RECEIPT` | Receipt issuer | Record person-visible access evidence | Cannot create permission or prove uncontrolled downstream deletion |
| `ACT-OPERATOR` | Operator, support actor, or security responder | Maintain or protect an identified service under bounded authority | No permanent, universal, founder-only, or unreviewable access |
| `ACT-CONNECTOR` | Connector or imported source adapter | Import or synchronize a separately authorized external source | Cannot confirm Chronicle truth, create permission, or be inherently trusted |
| `ACT-AI` | Model, provider, parser, or retrieval service | Draft, extract, classify, explain, summarize, retrieve | Cannot prove identity, confirm Chronicle truth, grant permission, decide rewards, or choose hidden tools |
| `ACT-MCP` | MCP client or agent | Invoke bounded tools through policy-controlled services | Cannot act as database, filesystem, tenant selector, or policy bypass |
| `ACT-RESEARCH` | Study proposer, recruiter, processor, or analyst | Operate a separately approved bounded study | No generalized future-use, product-improvement, or commercial authority |
| `ACT-GOVERNANCE` | Maintainer, council, community, or institutional actor | Make bounded institutional decisions | Cannot become personal-data controller or unreviewable emergency authority |
| `ACT-BUILD` | Dependency, package, action, build, preview, or artifact actor | Build and validate public code and synthetic artifacts | Not implicitly trusted across environments; cannot receive protected data or secrets by default |

## Asset register

### `AST-001` — Public constitutional and institutional artifacts

- **Classification:** PUBLIC
- **Authority:** `AUTH-INSTITUTION`
- **Controlling authority:** accepted repository governance and change control
- **Purpose:** explain, govern, challenge, and correct the project
- **Recipients:** the public, contributors, reviewers, and future operators
- **Performing actors:** `ACT-GOVERNANCE`, `ACT-BUILD`
- **Source and derived forms:** frozen foundations, decisions, policies, plans, completion records, public derivatives, site copy
- **Expected zones:** `TZ-P0`, `TZ-P1`, `TZ-P2`
- **Lifecycle:** history and supersession preserved; corrections remain visible; public export is inherent; deletion is exceptional and cannot prove removal from clones or archives
- **Current status and evidence:** implemented public baseline; repository validation exists
- **Responsible role:** founding maintainer and later repository governance
- **Unresolved dependencies:** administrative branch-protection evidence, commit-level DCO transition, external-review routing

### `AST-002` — Public synthetic fixtures and tabletop records

- **Classification:** PUBLIC and explicitly synthetic
- **Authority:** owning test, threat, or architecture domain
- **Controlling authority:** repository review and synthetic-data policy
- **Purpose:** deterministic validation, contributor work, and public exercises
- **Recipients:** contributors, reviewers, CI, and the public
- **Performing actors:** `ACT-GOVERNANCE`, `ACT-BUILD`
- **Source and derived forms:** fixtures, scenarios, expected results, observed results, sanitized transcripts, completion evidence
- **Expected zones:** `TZ-P0`, `TZ-P1`
- **Lifecycle:** revisioned; stale scenarios superseded; no real-person correction or deletion semantics because real personal data is prohibited
- **Current status and evidence:** implemented baseline; Sprint 5 expansion in progress
- **Responsible role:** artifact owner and maintainer
- **Unresolved dependencies:** security-scenario schema and repeatable tabletop validation in 5.9

### `AST-003` — Public-site assets, content, and capability status

- **Classification:** PUBLIC
- **Authority:** `AUTH-INSTITUTION` and bounded website presentation authority
- **Controlling authority:** publication governance
- **Purpose:** discovery, trust, lore, truthful status, documentation, contribution
- **Recipients:** public visitors
- **Performing actors:** `ACT-GOVERNANCE`, `ACT-BUILD`
- **Source and derived forms:** HTML, CSS, JavaScript, images, public copy, headers, deployment artifacts
- **Expected zones:** `TZ-P0`, `TZ-P1`, `TZ-P2`
- **Lifecycle:** public correction and deployment replacement; no protected-data retention; assets may remain cached publicly
- **Current status and evidence:** live bounded public repository gateway
- **Responsible role:** website owner and publication reviewer
- **Unresolved dependencies:** later Sprint 8 replacement, fuller accessibility evidence, deployment-provenance and supply-chain controls

### `AST-004` — Founding Expedition interest records

- **Classification:** PROTECTED PERSONAL
- **Authority:** purpose-limited signup process; not House of Keys health-data authority
- **Controlling authority:** the person’s explicit signup choice and published notice
- **Purpose:** project-interest updates only
- **Recipients:** the configured private signup operator
- **Performing actors:** public adapter and bounded private signup processor
- **Source and derived forms:** email, consent flag, source label, policy version, minimal delivery metadata
- **Expected zones:** `TZ-P2` crossing to a bounded private endpoint in `TZ-S8`
- **Lifecycle:** correction, unsubscribe, retention, and deletion must be supported; logs must be minimized; no health, wallet, research, or account expansion
- **Current status and evidence:** live forwarding adapter; full private lifecycle and ownership remain incomplete
- **Responsible role:** founding maintainer until a named private-list owner exists
- **Unresolved dependencies:** storage owner, retention period, unsubscribe path, correction/deletion process, incident route

### `AST-005` — Account identity, credentials, sessions, delegation, and recovery evidence

- **Classification:** PROTECTED PERSONAL and SECRET OR SECURITY-SENSITIVE
- **Authority:** `AUTH-ACCOUNT`
- **Controlling authority:** authenticated person or verified capacity authority
- **Purpose:** authentication, account lifecycle, sessions, recovery, verified delegation
- **Recipients:** identity and session services; bounded operators only when explicitly authorized
- **Performing actors:** `ACT-ACCOUNT`, bounded `ACT-OPERATOR`
- **Source and derived forms:** identifiers, authenticators, tokens, sessions, recovery evidence, delegation and capacity facts, risk signals
- **Expected zones:** `TZ-S0`, `TZ-S1`, `TZ-S2`, `TZ-S7`
- **Lifecycle:** short-lived sessions, revocation, bounded recovery, correction, deletion where lawful and safe, security evidence retention, restoration without authority expansion
- **Current status and evidence:** required, not designed in detail, no runtime
- **Responsible role:** future identity owner
- **Unresolved dependencies:** workstream 5.2, identity provider decision, minor/caregiver and legal authority gates

### `AST-006` — Account-to-Chronicle pseudonym mapping

- **Classification:** PROTECTED PERSONAL
- **Authority:** `AUTH-ACCOUNT` with controlled reference into `AUTH-CHRONICLE`
- **Controlling authority:** authenticated context and verified capacity
- **Purpose:** route an authenticated actor to the correct controlled resource without broad identity exposure
- **Recipients:** identity and domain services only
- **Performing actors:** `ACT-ACCOUNT`, bounded `ACT-PERFORMER`
- **Source and derived forms:** internal account identifier, Chronicle pseudonym, controlled-resource reference, capacity relationship
- **Expected zones:** `TZ-S1`, `TZ-S2`
- **Lifecycle:** correction and relationship changes are revisioned; deletion and recovery preserve necessary linkage evidence without exposing identity broadly
- **Current status and evidence:** required frozen property, no runtime
- **Responsible role:** future identity owner with Chronicle review
- **Unresolved dependencies:** identity matrix, tenant model, recovery and delegation design

### `AST-007` — Confirmed Living Chronicle records

- **Classification:** PROTECTED PERSONAL
- **Authority:** `AUTH-CHRONICLE`
- **Controlling authority:** controlling person or valid domain-specific confirmer
- **Purpose:** personal longitudinal record and separately approved derived use
- **Recipients:** the person and exact authorized recipients
- **Performing actors:** bounded `ACT-PERFORMER`
- **Source and derived forms:** observations, intervals, reflections, goals, structured values, corrections, conflicts, preferred presentation
- **Expected zones:** `TZ-S1`, `TZ-S2`; minimized authorized derivatives may enter `TZ-S5` or `TZ-S6`
- **Lifecycle:** provenance, revision, correction, export, deletion, retention exceptions, tombstones, restoration rules
- **Current status and evidence:** pre-stable contracts and public synthetic fixtures only
- **Responsible role:** future Chronicle domain owner
- **Unresolved dependencies:** 5.4, persistence design, unknown-input decoding, production isolation

### `AST-008` — Raw sources, documents, images, payloads, and attachments

- **Classification:** PROTECTED PERSONAL; may also be SECRET OR SECURITY-SENSITIVE
- **Authority:** `AUTH-SOURCE`
- **Controlling authority:** the controlling person and exact authorized processing purpose
- **Purpose:** preserve original evidence and enable bounded processing
- **Recipients:** source/custody service and exact authorized processors
- **Performing actors:** bounded upload, connector, parser, or document processor
- **Source and derived forms:** original bytes, immutable versions, locators, stored representations, derived representations, malware state, metadata
- **Expected zones:** `TZ-S3`, `TZ-S4`, `TZ-S5`, `TZ-S9`
- **Lifecycle:** integrity and custody history, retention, correction by new version, export, deletion, quarantine, backup-aware restoration
- **Current status and evidence:** pre-stable contracts only; no storage or processing runtime
- **Responsible role:** future source/custody owner
- **Unresolved dependencies:** 5.4, 5.6, 5.7, 5.8, malware and parser design

### `AST-009` — Provenance, transformations, normalization, associations, and inferences

- **Classification:** PROTECTED PERSONAL
- **Authority:** `AUTH-CHRONICLE`; bounded analytics may produce non-authoritative derivatives
- **Controlling authority:** source and Chronicle authority plus the exact permitted analytical purpose
- **Purpose:** explain how records and interpretations were produced
- **Recipients:** the person and exact authorized processors or recipients
- **Performing actors:** Chronicle transformer, bounded analytical worker, approved AI draft service
- **Source and derived forms:** source references, transformations, mappings, associations, inferences, uncertainty, invalidation links
- **Expected zones:** `TZ-S1`, `TZ-S2`, bounded `TZ-S5`, bounded `TZ-S6`
- **Lifecycle:** source-linked revision, invalidation after correction, export, deletion propagation, uncertainty preservation
- **Current status and evidence:** pre-stable contract baseline, no runtime
- **Responsible role:** Chronicle owner with analytics review
- **Unresolved dependencies:** 5.4, 5.6, future Sprint 15 claim governance

### `AST-010` — House of Keys definitions, grants, lifecycle, and comprehension evidence

- **Classification:** PROTECTED PERSONAL for person-specific evidence; PUBLIC for synthetic definitions and fixtures
- **Authority:** `AUTH-KEYS`
- **Controlling authority:** controlling person or valid authority basis
- **Purpose:** represent exact bounded permission
- **Recipients:** policy evaluator, person, and exact authorized performing services
- **Performing actors:** `ACT-PERSON`, bounded `ACT-PERFORMER`, policy evaluator
- **Source and derived forms:** purposes, categories, recipients, actions, grants, lifecycle events, explanations, comprehension, confirmation, capacity facts
- **Expected zones:** `TZ-S1`, `TZ-S2`
- **Lifecycle:** exact revisions, activation, suspension, expiry, exhaustion, withdrawal, supersession, invalidation, correction history
- **Current status and evidence:** pre-stable package, validator, evaluator, receipts, and synthetic evidence only
- **Responsible role:** future House of Keys owner
- **Unresolved dependencies:** 5.5, event-to-state projection, distributed freshness, identity and legal authority

### `AST-011` — Policy requests, findings, and decisions

- **Classification:** PROTECTED PERSONAL plus minimized security metadata
- **Authority:** `AUTH-KEYS`
- **Controlling authority:** explicit request facts and applicable grant authority
- **Purpose:** produce one `allow`, `deny`, or `indeterminate` decision for one bounded request
- **Recipients:** performing service, person-visible receipt service, bounded audit
- **Performing actors:** policy evaluator
- **Source and derived forms:** request, exact definition revisions, findings, reason codes, evidence references, decision identity and freshness
- **Expected zones:** `TZ-S1`; facts may be read from `TZ-S2`; decisions may be consumed by `TZ-S4`
- **Lifecycle:** immutable decision identity; expiry and invalidation; no stale reuse; correction through linked decisions rather than overwrite
- **Current status and evidence:** pre-stable deterministic evaluator and synthetic tests only
- **Responsible role:** House of Keys owner
- **Unresolved dependencies:** 5.5, cache and queue freshness, transactional bounded-use consumption

### `AST-012` — Execution and data-release state

- **Classification:** PROTECTED PERSONAL and security-sensitive operational metadata
- **Authority:** `AUTH-EXECUTION`
- **Controlling authority:** a valid fresh policy decision plus performing-service authority
- **Purpose:** record attempts, releases, completion, failure, cancellation, and bounded-use consumption
- **Recipients:** person-visible receipt service and bounded audit
- **Performing actors:** `ACT-PERFORMER`
- **Source and derived forms:** attempts, release markers, idempotency identities, retries, cancellation, partial outcomes, failures, consumption facts
- **Expected zones:** `TZ-S1`, `TZ-S4`, bounded `TZ-S2`
- **Lifecycle:** append-only or revision-safe evidence; cancellation after authority changes; correction; retention proportionate to accountability needs
- **Current status and evidence:** required, no runtime
- **Responsible role:** future execution owner
- **Unresolved dependencies:** 5.5, queue design, transaction boundary, downstream invalidation

### `AST-013` — Person-visible access receipts

- **Classification:** PROTECTED PERSONAL
- **Authority:** `AUTH-KEYS`
- **Controlling authority:** receipt contract and evidence of the referenced decision or operation
- **Purpose:** let the person inspect requests, decisions, attempts, releases, failures, lifecycle changes, and corrections
- **Recipients:** controlling person and exact authorized support path
- **Performing actors:** `ACT-RECEIPT`
- **Source and derived forms:** requested, decision, attempt, completed access, non-disclosure completion, failure, stopped, lifecycle, and correction receipts
- **Expected zones:** `TZ-S1`, `TZ-S2`, authenticated client through `TZ-S0`
- **Lifecycle:** append-only correction, accessible presentation, export, bounded deletion and retention, integrity and delivery evidence
- **Current status and evidence:** pre-stable contract and one synthetic completed receipt
- **Responsible role:** House of Keys receipt owner
- **Unresolved dependencies:** 5.5, delivery integrity, receipt retention, correction chains

### `AST-014` — Protected operational audit evidence

- **Classification:** RESTRICTED, PROTECTED PERSONAL, and SECRET OR SECURITY-SENSITIVE
- **Authority:** `AUTH-AUDIT`
- **Controlling authority:** explicit security, integrity, incident, or bounded legal obligation
- **Purpose:** detect, investigate, contain, restore, and demonstrate bounded operational events
- **Recipients:** authorized security responders, auditors, and narrowly approved operators
- **Performing actors:** `ACT-OPERATOR`
- **Source and derived forms:** minimized events, access evidence, integrity evidence, incident records, change records, retention holds
- **Expected zones:** `TZ-S7`; minimized inputs from private runtime zones
- **Lifecycle:** allowlisted fields, integrity, correction, restricted access, retention schedule, incident holds, safe public derivatives, deletion boundary
- **Current status and evidence:** required, not designed in production detail
- **Responsible role:** future security owner
- **Unresolved dependencies:** 5.3, 5.7, 5.8, independent review, legal retention gates

### `AST-015` — AI prompts, outputs, extraction drafts, and conversation derivatives

- **Classification:** same as or stricter than source; normally PROTECTED PERSONAL
- **Authority:** `AUTH-AI`
- **Controlling authority:** exact authorized interaction purpose; outputs remain proposals
- **Purpose:** draft capture, extraction, explanation, clarification, retrieval, and narrative interaction
- **Recipients:** the person and bounded domain services
- **Performing actors:** `ACT-AI`
- **Source and derived forms:** minimized context, prompts, structured drafts, responses, tool results, conversation metadata
- **Expected zones:** `TZ-S1`, `TZ-S5`
- **Lifecycle:** retention classes, provider egress limits, visible correction and deletion, no hidden training reuse, disposable drafts unless confirmed
- **Current status and evidence:** frozen rule and future Sprint 6 boundary; no production AI runtime
- **Responsible role:** future AI governance owner
- **Unresolved dependencies:** 5.6, 5.7, Sprint 6 contracts and provider-egress policy

### `AST-016` — Embeddings, indexes, caches, retrieval results, and retrieval metadata

- **Classification:** same as or stricter than the source information
- **Authority:** `AUTH-AI`
- **Controlling authority:** authorized retrieval purpose and source access policy
- **Purpose:** semantic retrieval of approved notes, documents, opted-in conversations, lore, or education
- **Recipients:** authorized person or bounded service
- **Performing actors:** retrieval service
- **Source and derived forms:** embeddings, vector indexes, keyword indexes, caches, result sets, source references, retrieval metadata
- **Expected zones:** `TZ-S5`, bounded `TZ-S2` or `TZ-S6`
- **Lifecycle:** disposable rebuild, tenant isolation, source-linked correction, deletion rebuild, expiry, no structured-value authority
- **Current status and evidence:** architectural direction only
- **Responsible role:** future retrieval owner
- **Unresolved dependencies:** 5.6, Sprint 13 recall and memory contracts

### `AST-017` — Quest, progression, restoration, notification, and story state

- **Classification:** PROTECTED PERSONAL for player state; PUBLIC for schemas and synthetic examples
- **Authority:** `AUTH-PRODUCT`
- **Controlling authority:** deterministic product rules and explicit player actions
- **Purpose:** deliver personal value and narrative progression
- **Recipients:** the player and bounded product services
- **Performing actors:** product domain service
- **Source and derived forms:** requirements, completion evidence, rewards, unlocks, choices, routes, story and notification state
- **Expected zones:** `TZ-S1`, `TZ-S2`, authenticated client
- **Lifecycle:** deterministic revision, correction effects, export/deletion boundaries, non-punitive refusal and return
- **Current status and evidence:** content contracts and synthetic examples; no product runtime
- **Responsible role:** future product-domain owner
- **Unresolved dependencies:** Sprints 10–12 and cross-contract journeys

### `AST-018` — Connector credentials, cursors, source payloads, and synchronization state

- **Classification:** SECRET OR SECURITY-SENSITIVE and PROTECTED PERSONAL
- **Authority:** connector and `AUTH-ACCOUNT`; imported facts remain `AUTH-SOURCE` until accepted by `AUTH-CHRONICLE`
- **Controlling authority:** exact connector authorization and person-controlled synchronization
- **Purpose:** separately authorized import and synchronization
- **Recipients:** connector service, source/custody service, and exact domain processors
- **Performing actors:** `ACT-CONNECTOR`
- **Source and derived forms:** tokens, scopes, cursors, payloads, retries, sync state, source identity, errors
- **Expected zones:** `TZ-S1`, `TZ-S4`, `TZ-S7`, `TZ-S8`
- **Lifecycle:** scope reduction, rotation, revocation, cursor correction, future-sync stop, source retention and deletion, receipt
- **Current status and evidence:** deferred to Sprint 14; included in Sprint 5 threat scope
- **Responsible role:** future connector owner
- **Unresolved dependencies:** 5.6, 5.7, connector SDK and provider decisions

### `AST-019` — Research proposals, enrollment, person-level datasets, aggregates, and outputs

- **Classification:** REVIEW or PUBLIC for protocols and reviewed aggregates; PROTECTED PERSONAL for enrollment and person-level data
- **Authority:** future research governance plus `AUTH-KEYS`
- **Controlling authority:** study-specific person authority and accepted research governance
- **Purpose:** one separately approved public-good study
- **Recipients:** one named study organization and approved processors
- **Performing actors:** `ACT-RESEARCH`
- **Source and derived forms:** protocol, recruitment, enrollment, cohort definition, person-level extract, aggregate, analysis, publication output
- **Expected zones:** `TZ-S1`, isolated `TZ-S6`, `TZ-S8`
- **Lifecycle:** study-specific retention, withdrawal, output review, correction, deletion limits, publication and re-identification review
- **Current status and evidence:** deferred; no research runtime
- **Responsible role:** future research-governance owner
- **Unresolved dependencies:** legal, ethics, privacy, security, House of Keys, economic, and specialist gates

### `AST-020` — Secrets, cryptographic keys, certificates, and private service identities

- **Classification:** SECRET OR SECURITY-SENSITIVE
- **Authority:** security and environment-management domain
- **Controlling authority:** bounded security and service ownership
- **Purpose:** authenticate services, protect data, sign artifacts, establish secure channels
- **Recipients:** approved runtime injection path or cryptographic operation only
- **Performing actors:** bounded `ACT-OPERATOR` and service identities
- **Source and derived forms:** credentials, key hierarchy, certificates, signing identities, rotation and revocation records
- **Expected zones:** `TZ-S7` and approved runtime injection paths
- **Lifecycle:** creation, purpose separation, distribution, access, rotation, revocation, recovery, destruction, incident response
- **Current status and evidence:** Sprint 5 design required; no production key custody
- **Responsible role:** future security owner
- **Unresolved dependencies:** 5.7, provider and environment decisions, independent review

### `AST-021` — Builds, dependencies, CI logs, caches, previews, and artifacts

- **Classification:** PUBLIC by default; protected and secret information is prohibited
- **Authority:** repository and build system
- **Controlling authority:** repository governance and least-privilege workflow permissions
- **Purpose:** build, validate, preview, and publish public code and synthetic artifacts
- **Recipients:** contributors, reviewers, CI, deployment services, public users for released assets
- **Performing actors:** `ACT-BUILD`
- **Source and derived forms:** source tree, dependency graph, lockfiles, actions, logs, caches, artifacts, previews, attestations
- **Expected zones:** `TZ-P0`, `TZ-P1`, external build and deployment providers
- **Lifecycle:** reviewed updates, artifact expiry, cache invalidation, provenance, correction, secret incident handling
- **Current status and evidence:** CI baseline exists; integrated supply-chain model pending
- **Responsible role:** repository maintainer
- **Unresolved dependencies:** 5.6, branch-control evidence, artifact provenance and dependency review

### `AST-022` — Backups, replicas, snapshots, archives, and recovery records

- **Classification:** same as or stricter than source assets
- **Authority:** owning domain plus recovery authority
- **Controlling authority:** bounded disaster-recovery purpose
- **Purpose:** restore authorized and validated state after loss or corruption
- **Recipients:** recovery services and authorized responders
- **Performing actors:** bounded `ACT-OPERATOR`
- **Source and derived forms:** backups, snapshots, replicas, manifests, restore plans, restore evidence, archive metadata
- **Expected zones:** `TZ-S9`
- **Lifecycle:** isolated retention, encryption, inventory, restore tests, deletion-aware recovery, key lifecycle, retirement
- **Current status and evidence:** Sprint 5 design required; no production backup system
- **Responsible role:** future reliability and security owners
- **Unresolved dependencies:** 5.7, 5.8, provider and regional design

### `AST-023` — Personal analytics, approved aggregates, and analytical working state

- **Classification:** PROTECTED PERSONAL for personal calculations and working sets; REVIEW or PUBLIC only after approved aggregation and disclosure review
- **Authority:** `AUTH-CHRONICLE` for personal structured inputs; bounded analytical authority for disposable computations
- **Controlling authority:** personal-core purpose or separately authorized aggregate/research purpose
- **Purpose:** descriptive personal intelligence or separately approved aggregate analysis
- **Recipients:** controlling person or one approved aggregate/research recipient
- **Performing actors:** isolated analytical worker, possibly `ACT-RESEARCH`
- **Source and derived forms:** query inputs, temporary working sets, trends, comparisons, quality indicators, aggregates, reports
- **Expected zones:** isolated `TZ-S6`; authoritative source references remain in `TZ-S2`
- **Lifecycle:** minimization, temporary-state expiry, source-linked correction, deletion propagation, reviewed output release, no shadow warehouse
- **Current status and evidence:** architectural direction only; Sprints 15 and later
- **Responsible role:** future analytics owner with Chronicle and research review
- **Unresolved dependencies:** 5.3, 5.4, 5.7, 5.8, claim taxonomy and research governance

## Register-wide invariants

1. Classification does not grant authority.
2. Network location, database access, provider ownership, and operator role do not grant authority.
3. A controlling person’s authority is purpose-, recipient-, action-, category-, selector-, duration-, and condition-specific where House of Keys applies.
4. Identity, Chronicle, source, permission, policy decision, execution, receipt, audit, product, and AI claims remain distinct.
5. Public and contributor environments contain only PUBLIC or synthetic information.
6. Every derivative carries or can resolve its source, purpose, authority, and deletion/correction obligations.
7. A backup or cache may not silently defeat correction, withdrawal, revocation, or deletion.
8. A receipt records a bounded claim; it does not grant permission or prove universal downstream erasure.
9. Research and commercial authority cannot be inferred from personal-core use.
10. Security compliance, intimate disclosure, retention, receipt volume, or broader permission cannot create rewards or superior rights.
11. Founding-steward review is internal review, not independent specialist review.
12. A design record does not prove implementation or deployment.

## Internal review result

The founding steward approved workstream 5.1 to proceed after the Sprint 5 entry baseline. This revision has been reconciled against the Product Constitution, Architecture Foundation, publication boundary, Living Chronicle, House of Keys, current public site, repository controls, and Sprint 5 plan.

No authority domain is intentionally collapsed into another. The register remains subject to later threat-model findings, correction, specialist review, and implementation-specific revalidation.
