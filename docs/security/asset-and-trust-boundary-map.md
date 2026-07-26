# Asset, Authority, Data-Flow, and Trust-Boundary Map

**Status:** WORKING SPRINT 5 BASELINE — internal review pending  
**Workstream:** 5.1  
**Tracking issue:** [#35](https://github.com/finalboss-tom/calypsos-promise/issues/35)  
**Scope:** provider-independent assets, actors, authority, flows, environments, and trust boundaries  
**Production boundary:** design only; no production health-data or agent runtime exists

## Purpose

This map identifies what Calypso’s Promise must protect before production accounts, health data, connectors, agents, research systems, or administrative services are introduced.

It prevents three failures:

1. treating all sensitive information as one undifferentiated database;
2. treating network location or service ownership as proof of authority; and
3. documenting a future flow without identifying purpose, recipient, retention, deletion, receipt, audit, and recovery consequences.

The map defines Sprint 5 threat-model scope. It does not authorize any asset, flow, provider, or environment by describing it.

## Mapping rules

Every material asset and flow must identify:

- authoritative domain
- information classification
- controlling authority
- permitted purpose
- intended recipient or consumer
- performing actor
- trust boundary crossed
- storage, processing, transmission, cache, queue, backup, log, and derivative locations
- retention, correction, export, deletion, restoration, receipt, and audit expectations
- current capability status
- unresolved dependencies and threats

A service that can technically read an asset is not automatically authorized to use it.

## Information classifications

### PUBLIC

Approved for public repository, documentation, website, issue, pull-request, CI, and synthetic-fixture use.

Examples include frozen foundations, public policies, public code, synthetic fixtures, tabletop exercises, and reviewed public institutional derivatives.

### REVIEW

Candidate public information requiring review before publication.

Examples include draft public security architecture, minimized incident summaries, provider comparisons without operational details, and public control-status reports.

### RESTRICTED

Operational or organizational information limited to authorized roles.

Examples include private architecture details, deployment configuration, internal process records, and unpublished risk assessments with sensitive operational context.

### PROTECTED PERSONAL

Information relating to an identifiable or linkable person, account, Chronicle, health source, correspondence, support request, consent, receipt, or research interaction.

### SECRET OR SECURITY-SENSITIVE

Credentials, keys, tokens, private endpoints, exploit details, security reports, incident evidence, anti-abuse controls, administrative access paths, and operational configuration whose disclosure could cause harm.

Classification is not authority. PROTECTED PERSONAL information still requires purpose-specific House of Keys authority and correct domain behavior.

## Authority domains

### Account and identity authority

Owns authentication, account lifecycle, sessions, recovery, verified delegation, and internal account-to-pseudonym relationships.

It does not own Chronicle truth, permission truth, research authority, or clinical truth.

### Living Chronicle authority

Owns confirmed Chronicle records, sources, provenance, transformations, correction, conflict, export, deletion, custody references, and bounded derived records.

It does not own account authentication, permission grants, execution, receipts, rewards, story state, or AI memory.

### Source and custody authority

Owns raw source artifacts, immutable versions, locators, stored representations, custody, integrity, and access references.

Raw source existence does not make its contents confirmed Chronicle truth.

### House of Keys authority

Owns purpose, category, recipient, action, grant, lifecycle, explanation, comprehension, confirmation, capacity, request, decision, and person-visible receipt contracts.

A grant authorizes a bounded operation. It does not alter Chronicle truth or prove that execution occurred.

### Execution authority

Owns attempted and completed operations, release boundaries, processing state, idempotency, retries, and bounded-use consumption.

Execution must use a valid and fresh decision. It cannot create or broaden permission.

### Protected audit authority

Owns minimized operational evidence needed for security, integrity, incident response, accountability, and bounded obligations.

Audit does not become a shadow Chronicle, permission system, analytics warehouse, or unrestricted operator-search surface.

### Product and story authority

Owns quests, progression, restoration, scenes, choices, notifications, and story state.

It may consume explicit domain evidence but cannot create Chronicle truth or permission.

### AI and retrieval derivative authority

Owns drafts, prompts, responses, embeddings, indexes, caches, and model-interaction metadata within approved purpose and retention boundaries.

AI and retrieval artifacts are disposable derivatives unless a separate player-visible record is confirmed through the authoritative domain.

### Institutional authority

Owns public decisions, policies, assumptions, outcomes, challenge, correction, funding transparency, and governance state.

Institutional authority cannot access personal data or alter permission merely because a decision is publicly accepted.

## Actor classes

### Controlling person

May confirm records, grant or withdraw authority, inspect receipts, export, correct, and delete.

Must not be presented with blanket, irrevocable, bundled, or punitive permission choices.

### Subject

Is the person described by a record.

Must not be assumed to be identical to the account owner, author, requester, recipient, or confirmer.

### Account actor

Is an authenticated person or verified delegate acting through an account.

Must not select Chronicle ownership through a caller-supplied identifier.

### Requester

Asks for a bounded operation.

Must not become a self-authorizing recipient or performing actor.

### Recipient

Receives a bounded result.

Must not silently acquire unrelated purpose, onward-distribution, or retention authority.

### Performing actor

Executes an authorized action.

Must not become independent permission authority or an arbitrary data browser.

### Receipt issuer

Records person-visible access evidence.

Must not treat a receipt as proof that permission existed or that every downstream copy was deleted.

### Operator and security responder

Maintains or protects an identified service under bounded authority.

Must not receive permanent, universal, founder-only, or unreviewable access.

### Connector

Imports or synchronizes an external source.

Must remain untrusted as a confirmer, permission authority, and source of canonical truth.

### AI model or provider

May draft, extract, classify, explain, or summarize.

Must not become Chronicle authority, identity proof, permission authority, reward authority, or arbitrary tool caller.

### MCP client

May invoke bounded domain tools.

Must not become a database, filesystem, tenant-selection, or policy-bypass client.

### Research actor

May propose or operate a separately approved study.

Must not receive generalized, future-use, or product-improvement authority.

### Governance actor

May make bounded institutional decisions.

Must not become a personal-data controller or operator of unreviewable emergency power.

### Dependency or build actor

Provides code, packages, actions, images, artifacts, or build steps.

Must not be implicitly trusted across every environment.

## Trust zones

### P0 — Public and synthetic surfaces

Includes the public repository, public issues and pull requests, public CI definitions and safe logs, public documentation and website, public institutional ledgers, and synthetic fixtures and table tops.

Only PUBLIC information belongs here.

### P1 — Local contributor environment

Includes public code and synthetic data. It must not require production credentials, private exports, real user information, or access to protected systems.

### P2 — Public web delivery and interest intake

Includes the public site and separately configured signup-forwarding adapter.

The current boundary accepts only a purpose-limited email-interest record. It is not an account, Chronicle, research, permission, or health-data system.

### S0 — Private edge and authenticated session boundary

Future boundary for authentication, session establishment, request validation, rate limiting, risk signals, and private routing.

Identity must come from authenticated context rather than caller-supplied ownership claims.

### S1 — Domain application boundary

Future modular application containing explicit services for identity, Chronicle, House of Keys, execution, quests, exports, deletion, and other bounded capabilities.

Domain services enforce authority and invariants. They are not arbitrary data-access facades.

### S2 — Canonical structured-data boundary

Future private structured storage for authoritative domain records.

No public exposure is required. Direct client, AI, MCP, or analytics access is prohibited.

### S3 — Raw-source and object-storage boundary

Future encrypted storage for raw documents, images, payloads, immutable versions, and derived representations.

Object identity, signed access, metadata, malware state, and custody require explicit controls.

### S4 — Queue and worker boundary

Future durable background processing for imports, documents, exports, deletion, receipt delivery, notifications, and other bounded jobs.

Queued work must preserve identity, purpose, authority revision, freshness, idempotency, cancellation, revocation, and receipt context.

### S5 — AI, retrieval, and document-processing boundary

Future isolated services for extraction, generation, embeddings, retrieval, and document parsing.

Inputs are minimized and authorized. Outputs remain untrusted drafts. Provider egress, retention, training, logging, and tool use require explicit policy.

### S6 — Analytics boundary

Future isolated analytical workers and stores for approved personal calculations or separately authorized aggregate work.

Analytics cannot become a replica of all raw personal data or an alternate permission system.

### S7 — Administrative and security boundary

Future private operator, incident, key, deployment, and observability surfaces.

These require least privilege, separation of duties, short-lived access, logging, review, recovery, and no public origin.

### S8 — External recipient and connector boundary

Includes external devices, health platforms, document sources, providers, study organizations, and other recipients.

External status and contracts do not make an actor trusted. Inbound data is untrusted; outbound access is purpose-, recipient-, action-, scope-, and duration-specific.

### S9 — Backup, archive, and disaster-recovery boundary

Future isolated backups, replicas, snapshots, archives, and recovery systems.

Restore must preserve correction, revocation, deletion, and authority history. Backups cannot become indefinite hidden retention.

## Boundary principles

- Public origins terminate public traffic; they do not expose databases, queues, object stores, administrative services, or internal provider endpoints.
- Private services use authenticated service identity and least-capability interfaces.
- Domain authority is checked at the service boundary and again at the execution boundary where freshness can change.
- Queues carry references and minimized required facts rather than unnecessary full records.
- Logs, traces, metrics, errors, prompts, and receipts minimize personal content.
- Backups and replicas are separate trust boundaries with explicit deletion and restore behavior.
- External recipients and providers are not trusted merely because they are named.
- Every boundary crossing can fail, duplicate, reorder, delay, broaden, leak, or become stale.

## Asset register

### Public constitutional and institutional artifacts

- **Authority:** institutional and repository governance
- **Classification:** PUBLIC
- **Purpose:** explain and govern the project
- **Current location:** public repository and website
- **Primary threats:** unauthorized change, provenance loss, status overclaim, misleading supersession, supply-chain or account compromise
- **Required controls:** branch and review controls, history, DCO, link and policy validation, correction and decision records, safe publication
- **Status:** implemented public baseline; administrative branch evidence remains pending

### Synthetic fixtures and tabletop records

- **Authority:** owning test or architecture domain
- **Classification:** PUBLIC synthetic only
- **Purpose:** validation, contributor workflow, and design exercises
- **Current location:** public repository and CI
- **Primary threats:** accidental real data, re-identifiable imitation, false production claims, stale fixtures, hidden secrets
- **Required controls:** synthetic-only policy, repository scanning, review, explicit limitations, reproducibility
- **Status:** implemented baseline; Sprint 5 expansion in progress

### Public-site assets and content

- **Authority:** public website and publication governance
- **Classification:** PUBLIC
- **Purpose:** discovery, trust, lore, status, documentation, and contribution
- **Current location:** `apps/site` and public deployment
- **Primary threats:** content injection, dependency compromise, misleading capability claims, asset tampering, accessibility failure
- **Required controls:** CSP and headers, build validation, status labeling, public-content review, deployment isolation
- **Status:** live bounded gateway

### Founding Expedition interest records

- **Authority:** purpose-limited signup process
- **Classification:** PROTECTED PERSONAL
- **Purpose:** receive project-interest updates under the published notice
- **Current flow:** browser to public adapter to separately configured private webhook
- **Primary threats:** disclosure, overcollection, spam, webhook-secret exposure, log retention, unauthorized reuse, inability to correct or unsubscribe
- **Required controls:** field minimization, consent, validation, rate limiting, HTTPS, secret isolation, private storage, retention and deletion process
- **Status:** bounded live adapter; complete private lifecycle remains a gate

### Account identity, credentials, sessions, and recovery evidence

- **Authority:** future identity and account domain
- **Classification:** PROTECTED PERSONAL and SECRET OR SECURITY-SENSITIVE
- **Purpose:** authentication, sessions, recovery, verified delegation, and account lifecycle
- **Expected zones:** S0, S1, S2, and S7
- **Primary threats:** takeover, credential theft, recovery abuse, fixation, replay, enumeration, privilege escalation, identity-linkage exposure
- **Required controls:** provider-independent identity contract, short-lived sessions, revocation, isolation, bounded recovery, audit, emergency review
- **Status:** required and undesigned in detail; no runtime

### Account-to-Chronicle pseudonym mapping

- **Authority:** identity domain with controlled Chronicle reference
- **Classification:** PROTECTED PERSONAL
- **Purpose:** route authenticated authority to the correct controlled resource without broad identity exposure
- **Expected zones:** S1 and S2 only
- **Primary threats:** cross-user leakage, tenant confusion, caller-supplied owner, re-identification, operator browsing
- **Required controls:** internal identifiers, authenticated derivation, strict service boundary, no arbitrary query, access evidence
- **Status:** required architectural property; no runtime

### Confirmed Living Chronicle records

- **Authority:** Living Chronicle
- **Classification:** PROTECTED PERSONAL
- **Purpose:** personal longitudinal record and approved derived use
- **Expected zones:** S1 and S2 with minimized authorized derivatives elsewhere
- **Primary threats:** cross-user leakage, unauthorized change, false confirmation, conflict suppression, inference leakage, deletion overclaim
- **Required controls:** tenant and subject isolation, provenance, revision history, correction, policy enforcement, export and deletion procedures
- **Status:** pre-stable contract and synthetic fixtures only

### Raw sources, documents, images, and attachments

- **Authority:** source and custody domain
- **Classification:** PROTECTED PERSONAL and possibly SECRET OR SECURITY-SENSITIVE
- **Purpose:** preserve original evidence and enable authorized processing
- **Expected zones:** S3, S4, S5, and S9
- **Primary threats:** malware, parser exploitation, decompression abuse, metadata exposure, source substitution, signed-link leakage, indefinite retention
- **Required controls:** untrusted-input isolation, immutable versions, integrity, malware controls, minimized locators, encrypted custody, retention and deletion
- **Status:** pre-stable contracts only; no storage or processing runtime

### Provenance, transformations, associations, and inferences

- **Authority:** Living Chronicle and approved analytical domain
- **Classification:** PROTECTED PERSONAL
- **Purpose:** explain how records and interpretations were produced
- **Expected zones:** S1, S2, and bounded S5 or S6 derivatives
- **Primary threats:** provenance tampering, unsupported claims, source loss, inference leakage, stale derivation after correction
- **Required controls:** exact source references, versioned transformations, invalidation, uncertainty, structured authority, review and deletion propagation
- **Status:** pre-stable contract baseline; no runtime

### House of Keys definitions, grants, lifecycle, and evidence

- **Authority:** House of Keys
- **Classification:** PROTECTED PERSONAL for person-specific records and PUBLIC for synthetic fixtures
- **Purpose:** represent exact authority for bounded actions
- **Expected zones:** S1 and S2
- **Primary threats:** self-grant, purpose laundering, category broadening, stale revisions, coercion, lifecycle tampering
- **Required controls:** controlling authority, exact revisions, atomic scope, lifecycle events, comprehension, confirmation, fail-closed validation
- **Status:** pre-stable contract, validator, evaluator, and synthetic fixtures only

### Policy requests and decisions

- **Authority:** House of Keys policy evaluation
- **Classification:** PROTECTED PERSONAL and minimized security metadata
- **Purpose:** determine allow, deny, or indeterminate for one bounded request
- **Expected zones:** S1 with explicit facts from S2 and consumption by S4 or a performing service
- **Primary threats:** requester or recipient mismatch, stale facts, cache replay, partial-grant composition, `indeterminate` conversion
- **Required controls:** pure evaluator, caller-supplied decision identities, reason codes, freshness, complete-grant matching, execution recheck
- **Status:** pre-stable deterministic evaluator and synthetic evidence only

### Execution and data-release state

- **Authority:** performing domain service
- **Classification:** PROTECTED PERSONAL and security-sensitive operational metadata
- **Purpose:** record attempts, releases, completion, failure, cancellation, and bounded-use consumption
- **Expected zones:** S1, S4, and bounded S2
- **Primary threats:** stale allow, duplicate release, queue replay, revocation race, partial failure, missing cancellation, hidden onward use
- **Required controls:** idempotency, freshness, transactional consumption, release-boundary evidence, cancellation, correction, receipt emission
- **Status:** required; no runtime

### Person-visible access receipts

- **Authority:** House of Keys receipt domain
- **Classification:** PROTECTED PERSONAL
- **Purpose:** let the person inspect requests, decisions, attempts, releases, failures, lifecycle changes, and corrections
- **Expected zones:** S1, S2, and the player-facing client
- **Primary threats:** omission, forgery, duplication, correction suppression, health-content overexposure, inaccessible presentation
- **Required controls:** exact references, append-only correction, minimized summaries, integrity, delivery, export, deletion boundary, accessibility
- **Status:** pre-stable contract and one synthetic completed receipt only

### Protected operational audit evidence

- **Authority:** security and operational audit domain
- **Classification:** RESTRICTED, PROTECTED PERSONAL, and SECRET OR SECURITY-SENSITIVE
- **Purpose:** detect, investigate, contain, restore, and prove bounded operational events
- **Expected zones:** S7 with minimized sources from S0 through S6
- **Primary threats:** shadow surveillance, operator curiosity, log injection, deletion obstruction, secret leakage, overretention
- **Required controls:** minimization, allowlisted fields, integrity, restricted access, retention schedule, correction, incident hold, safe public derivatives
- **Status:** required; no production design or runtime yet

### AI prompts, responses, extraction drafts, and conversation derivatives

- **Authority:** AI interaction and approved product-memory domains
- **Classification:** PROTECTED PERSONAL unless synthetic or public
- **Purpose:** draft capture, explanation, clarification, retrieval, and narrative interaction
- **Expected zones:** S1 and S5 with bounded storage only
- **Primary threats:** provider egress, training reuse, prompt injection, unsupported health claims, authority misrepresentation, hidden retention
- **Required controls:** minimization, purpose and provider policy, isolation, structured outputs, player confirmation, retention classes
- **Status:** frozen rule and future Sprint 6 boundary; no production AI runtime

### Embeddings, indexes, caches, and retrieval results

- **Authority:** retrieval derivative domain
- **Classification:** same or stricter than source information
- **Purpose:** authorized semantic retrieval for approved notes, documents, conversations, lore, or education
- **Expected zones:** S5 and bounded S2 or S6
- **Primary threats:** cross-tenant retrieval, poisoning, stale deletion, source loss, inference and membership leakage
- **Required controls:** tenant isolation, source references, disposable indexes, deletion rebuild, no structured-value authority, access policy
- **Status:** architectural direction only

### Quest, progression, restoration, and story state

- **Authority:** product and story domains
- **Classification:** PROTECTED PERSONAL for player state and PUBLIC for schemas and synthetic examples
- **Purpose:** deliver personal value and narrative progression
- **Expected zones:** S1, S2, and the player client
- **Primary threats:** client-side trust, unauthorized completion, reward manipulation, permission-linked progression, disclosure pressure
- **Required controls:** deterministic evidence, server authority, no permission-derived rewards, correction effects, non-punitive refusal
- **Status:** content contracts and synthetic examples; no product runtime

### Connector credentials, cursors, and source payloads

- **Authority:** connector and identity domains; imported facts remain source truth until accepted by the Chronicle domain
- **Classification:** SECRET OR SECURITY-SENSITIVE and PROTECTED PERSONAL
- **Purpose:** separately authorized import and synchronization
- **Expected zones:** S1, S4, S8, and S7 for secrets
- **Primary threats:** impersonation, token theft, overbroad scopes, replay, cursor corruption, future sync after revocation, source substitution
- **Required controls:** secret isolation, exact scopes, connector identity, revocation, cursor integrity, idempotency, receipts, source review
- **Status:** deferred to Sprint 14; threat modeling in Sprint 5

### Research proposals, enrollment, datasets, and outputs

- **Authority:** future research-governance and House of Keys domains
- **Classification:** REVIEW or PUBLIC for protocols and aggregates; PROTECTED PERSONAL for enrollment and person-level data
- **Purpose:** separately approved public-good research
- **Expected zones:** S1, S6, S8, and an isolated research environment
- **Primary threats:** purpose expansion, coercion, re-identification, uncontrolled linkage, retention drift, publication leakage, commercial reuse
- **Required controls:** study-specific authority, named recipient, minimization, governance review, isolation, output review, withdrawal and retention rules
- **Status:** deferred; actor and boundary included in Sprint 5

### Secrets, cryptographic keys, and certificates

- **Authority:** security and environment-management domains
- **Classification:** SECRET OR SECURITY-SENSITIVE
- **Purpose:** authenticate services, protect data, sign artifacts, and establish secure channels
- **Expected zones:** S7 and approved runtime-injection paths
- **Primary threats:** repository or log exposure, excessive lifetime, shared environments, backup leakage, unrecoverable loss, insider misuse
- **Required controls:** purpose separation, least access, rotation, revocation, recovery, destruction, scanning, incident response, environment isolation
- **Status:** Sprint 5 design required; no production key custody

### Builds, dependencies, CI logs, previews, and artifacts

- **Authority:** repository and build system
- **Classification:** PUBLIC by default and prohibited from containing protected or secret information
- **Purpose:** build, validate, preview, and publish public code and synthetic artifacts
- **Current zones:** P0 and external build providers
- **Primary threats:** dependency compromise, action compromise, malicious artifact, secret exfiltration, cache poisoning, unsafe preview, log disclosure
- **Required controls:** reviewed dependencies, minimal permissions, artifact policy, secret separation, provenance, branch controls, reproducible checks
- **Status:** CI baseline exists; integrated supply-chain threat model pending

### Backups, replicas, snapshots, archives, and recovery records

- **Authority:** owning domain plus disaster-recovery authority
- **Classification:** same or stricter than the source asset
- **Purpose:** restore authorized and validated system state after loss or corruption
- **Expected zones:** S9
- **Primary threats:** hidden retention, stale permissions, restoration of deleted data, ransomware reach, untested restore, key loss, cross-environment contamination
- **Required controls:** isolation, encryption, retention, restore tests, deletion-aware recovery, key management, inventory, access evidence
- **Status:** Sprint 5 design required; no production backup system

## Principal data flows

### Public documentation flow

`maintainer or contributor → branch → pull request → CI and review → main → public website or repository`

Required properties:

- PUBLIC information only
- provenance and review
- no credentials or protected evidence
- truthful capability status
- correction and supersession history

### Founding Expedition signup flow

`visitor browser → public site adapter → validated minimized payload → private webhook → private signup store`

Required properties:

- email and explicit purpose-limited consent only
- no health, account, wallet, research, or clinical fields
- webhook-secret and endpoint isolation
- minimized logs
- correction, unsubscribe, retention, and deletion process

### Future Chronicle capture flow

`authenticated person → text, voice, image, document, or structured input → isolated draft extraction → player review and confirmation → Chronicle validation → canonical record and provenance → optional quest evidence`

Required properties:

- authenticated identity derived at the edge
- imported and model-generated content untrusted
- player confirmation visible and specific
- deterministic domain validation
- exact source and transformation references
- no model requirement for manual capture

### Future authorized read flow

`authenticated requester → bounded request → House of Keys evaluation → fresh decision → domain retrieval → execution and release → person-visible receipt → protected audit evidence`

Required properties:

- exact purpose, recipient, actor, categories, selector, actions, duration, conditions, and revisions
- no caller-supplied owner authority
- no partial-grant composition
- execution freshness and revocation handling
- receipt does not create permission

### Future connector import flow

`external source → connector authentication → isolated ingestion worker → immutable raw source → source review and normalization → player confirmation or approved deterministic import rule → Chronicle record and provenance → receipt`

Required properties:

- connector and external payload untrusted
- future synchronization ends after revocation
- cursor and replay integrity
- source conflicts remain distinguishable
- connector failure cannot corrupt canonical state

### Future export flow

`person request → House of Keys evaluation → export snapshot selection → preparation worker → integrity and completeness checks → delivery → person-visible receipt`

Required properties:

- export does not authorize secondary use
- scope and omissions inspectable
- temporary artifacts minimized and deleted
- delivery identity verified
- receipt and protected audit separate

### Future deletion flow

`person request or domain trigger → authority and dependency review → canonical and source deletion operations → derivative, cache, index, queue, backup, and recipient procedures → verification evidence → person-visible completion and limitations`

Required properties:

- deletion status is explicit
- retention exceptions are narrow and inspectable
- restoration cannot silently reintroduce deleted state
- evidence does not falsely prove uncontrolled downstream erasure

### Future AI and MCP flow

`authenticated client → bounded intent or tool → policy gateway → domain service → minimized authorized context → isolated model or tool execution → untrusted result → deterministic validation or player confirmation → optional receipt`

Required properties:

- no arbitrary SQL, filesystem, tenant selection, or raw-database tools
- caller cannot supply Chronicle-owner authority
- prompt injection cannot grant authority or invoke hidden tools
- stale decisions are not reused
- non-AI fallback remains available

## Cross-boundary invariants

- Identity is derived, not supplied as authority by the caller.
- Every sensitive operation has one explicit controlling resource and subject set.
- Purpose, recipient, action, category, selector, duration, and conditions are exact and versioned.
- Decision, execution, release, receipt, and audit remain separate claims.
- Public logs and artifacts contain no protected or secret information.
- Background jobs preserve policy identity and freshness and can be cancelled or denied after authority changes.
- Derived data retains source references and responds to correction and deletion.
- Backups preserve history without silently defeating valid deletion or revocation.
- Operators receive bounded capabilities, not unrestricted database access.
- Research and commerce remain separately authorized and cannot be inferred from personal-core use.
- Security controls cannot become progression, reward, eligibility, or governance conditions.

## Current gaps and next artifacts

This map establishes the initial scope but does not complete workstream 5.1.

Required follow-up includes:

- assign stable asset and boundary IDs
- produce a structured companion register if justified
- map exact trust-boundary crossings to threat records
- define the identity and isolation matrix
- define environment and origin diagrams
- map control owners and evidence states
- review public-site signup retention, correction, deletion, and unsubscribe ownership
- reconcile the map with encryption, secrets, incident, audit, and deletion procedures
- obtain internal and later independent security review

## Review questions

- Is any authority domain collapsed into another for convenience?
- Can any caller select another person or Chronicle by supplying an identifier?
- Does any queue or cache outlive the authority facts it depends on?
- Can any log, receipt, prompt, trace, or analytics store become a shadow copy of personal data?
- Can a backup or restoration path reverse correction, withdrawal, or deletion?
- Can an operator or emergency actor gain permanent or unreviewable power?
- Can imported content, model output, or a tool response create authority?
- Can a documented flow be mistaken for a deployed capability?
- Does a control protect security by weakening the Promise?
