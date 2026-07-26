# Asset, Authority, Data-Flow, and Trust-Boundary Map

**Status:** WORKING SPRINT 5 BASELINE — internal review pending  
**Workstream:** 5.1  
**Tracking issue:** [#35](https://github.com/finalboss-tom/calypsos-promise/issues/35)  
**Scope:** provider-independent assets, actors, authority, flows, environments, and trust boundaries  
**Production boundary:** design only; no production health-data or agent runtime exists

## Purpose

This map identifies what Calypso’s Promise must protect before production accounts, health data, connectors, agents, research systems, or administrative services are introduced.

It prevents three common architectural failures:

1. treating all sensitive information as one undifferentiated database;
2. treating network location or service ownership as proof of authority; and
3. documenting a future flow without identifying purpose, recipient, retention, deletion, receipt, audit, and recovery consequences.

The map is authoritative for Sprint 5 threat-model scope. It does not authorize any asset, flow, provider, or environment by describing it.

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

This map uses the repository’s publication boundary and adds security handling context.

### PUBLIC

Approved for public repository, documentation, website, issue, pull-request, CI, and synthetic-fixture use.

Examples:

- frozen foundations
- public policies and decisions
- public code
- synthetic fixtures and table tops
- reviewed public institutional derivatives

### REVIEW

Candidate public information requiring review before publication.

Examples:

- draft public security architecture
- minimized incident summaries
- provider comparisons without credentials or operational details
- public control-status reports

### RESTRICTED

Operational or organizational information limited to authorized roles.

Examples:

- internal architecture details that materially increase attack capability
- private deployment configuration
- non-secret administrative process records
- unpublished risk assessments with sensitive operational context

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

Owns minimized operational evidence needed for security, integrity, incident response, accountability, and legal or policy obligations.

Audit does not become a shadow Chronicle, permission system, product analytics warehouse, or unrestricted operator-search surface.

### Product and story authority

Owns quests, progression, restoration, scenes, choices, notifications, and story state.

It may consume explicit domain evidence but cannot create Chronicle truth or permission.

### AI and retrieval derivative authority

Owns drafts, prompts, responses, embeddings, indexes, caches, and model interaction metadata within approved retention and purpose boundaries.

AI and retrieval artifacts are disposable derivatives unless a separate player-visible record is confirmed through the authoritative domain.

### Institutional authority

Owns public decisions, policies, assumptions, outcomes, challenge, correction, funding transparency, and governance state.

Institutional authority cannot access personal data or alter permission merely because a decision is publicly accepted.

## Actor classes

| Actor | Legitimate role | Must not become |
| --- | --- | --- |
| Controlling person | confirms records, grants or withdraws authority, inspects receipts, exports, corrects, deletes | a source of blanket or irrevocable consent |
| Subject | person described by a record | automatically identical to account owner, author, requester, or confirmer |
| Account actor | authenticated person or verified delegate acting through an account | caller-supplied Chronicle owner or universal authority |
| Requester | asks for a bounded operation | self-authorizing recipient or performing actor |
| Recipient | receives the bounded result | purpose owner, controller of unrelated use, or silent onward distributor |
| Performing actor | executes an authorized action | independent permission authority or arbitrary data browser |
| Receipt issuer | records person-visible access evidence | proof that permission existed or every downstream copy was deleted |
| Operator | maintains an identified service | unrestricted researcher, support observer, or Chronicle authority |
| Security responder | contains and investigates an incident | permanent emergency administrator or public publisher of raw evidence |
| Connector | imports or synchronizes an external source | trusted confirmer or self-granting tool |
| AI model or provider | drafts, extracts, classifies, explains, or summarizes | Chronicle authority, identity proof, permission authority, reward authority, or arbitrary tool caller |
| MCP client | invokes bounded domain tools | database, filesystem, tenant-selection, or policy-bypass client |
| Research actor | proposes or operates a separately approved study | recipient of generalized future-use authority |
| Governance actor | makes bounded institutional decisions | personal-data controller or operator of unreviewable emergency power |
| Dependency or build actor | provides code, package, action, image, artifact, or build step | implicitly trusted execution inside every environment |

## Trust zones

### Zone P0 — Public and synthetic surfaces

Includes:

- public repository
- public issues and pull requests
- public CI definitions and safe logs
- public documentation and website
- public campaign and governance ledgers
- synthetic fixtures, scenarios, and table tops

Only PUBLIC information belongs here.

### Zone P1 — Local contributor environment

Includes public code and synthetic data. It must not require production credentials, private exports, real user information, or access to protected systems.

Local compromise must not grant access to production or private source systems by default.

### Zone P2 — Public web delivery and purpose-limited interest intake

Includes the static or server-rendered public site and the separately configured signup-forwarding adapter.

The current boundary accepts an email-interest record only. It is not an account, Chronicle, research, permission, or health-data system.

### Zone S0 — Private edge and authenticated session boundary

Future boundary for authentication, session establishment, request validation, rate limiting, device and risk signals, and private routing.

It must derive identity from authenticated context and must not accept caller-supplied ownership authority.

### Zone S1 — Domain application boundary

Future modular application containing explicit domain services for identity, Chronicle, House of Keys, execution, quests, exports, deletion, and other bounded capabilities.

Domain services enforce authority and invariants. They are not arbitrary data-access facades.

### Zone S2 — Canonical structured-data boundary

Future PostgreSQL or replaceable structured storage for authoritative domain records.

No public exposure is required. Direct client, AI, MCP, or analytics access is prohibited.

### Zone S3 — Raw-source and object-storage boundary

Future encrypted storage for raw documents, images, source payloads, immutable versions, and derived representations.

Object identifiers, signed access, metadata, malware state, and custody require explicit controls.

### Zone S4 — Queue and worker boundary

Future durable background processing for imports, documents, exports, deletion, receipt delivery, notifications, and other bounded jobs.

Queued work must preserve identity, purpose, authority revision, freshness, idempotency, cancellation, revocation, and receipt context.

### Zone S5 — AI, retrieval, and document-processing boundary

Future isolated providers or services for extraction, generation, embeddings, retrieval, and document parsing.

Inputs are minimized and authorized. Outputs are untrusted drafts. Provider egress, retention, model training, logging, and tool use require explicit policy.

### Zone S6 — Analytics boundary

Future isolated Python workers and analytical stores for approved personal calculations or separately authorized aggregate work.

Analytics cannot become a replica of all raw personal data or an alternate permission system.

### Zone S7 — Administrative and security boundary

Future private operator, incident, key, deployment, and observability surfaces.

These surfaces require least privilege, separation of duties, short-lived access, logging, review, recovery, and no public origin.

### Zone S8 — External recipient and connector boundary

External devices, health platforms, document sources, providers, study organizations, and other recipients.

External status and contracts do not make an actor trusted. Inbound data is untrusted; outbound access is purpose-, recipient-, action-, scope-, and duration-specific.

### Zone S9 — Backup, archive, and disaster-recovery boundary

Future isolated backups, replicas, snapshots, archives, and recovery systems.

Restore must preserve correction, revocation, deletion, and authority history. Backups cannot become indefinite hidden retention.

## Boundary principles

- Public origins terminate public traffic; they do not expose databases, queues, object stores, administrative services, or internal provider endpoints.
- Private services use authenticated service identity and least-capability interfaces.
- Domain authority is checked at the service boundary and again at the execution boundary where freshness can change.
- Queues carry references and minimized required facts rather than unnecessary full records.
- Logs, traces, metrics, errors, prompts, and receipts minimize personal content.
- Backups and replicas are separate trust boundaries with explicit deletion and restore behavior.
- External recipients and providers are not trusted merely because they are contractually named.
- Every boundary crossing can fail, duplicate, reorder, delay, broaden, leak, or become stale and must be modeled accordingly.

## Asset register

### Public constitutional and institutional artifacts

| Field | Boundary |
| --- | --- |
| Authority | Institutional and repository governance |
| Classification | PUBLIC |
| Purpose | Explain and govern the project |
| Current location | Public repository and website |
| Primary threats | unauthorized change, provenance loss, status overclaim, misleading supersession, supply-chain or account compromise |
| Required controls | branch and review controls, history, DCO, link and policy validation, correction and decision records, safe publication |
| Status | Implemented public baseline; administrative branch evidence still pending |

### Synthetic fixtures and table tops

| Field | Boundary |
| --- | --- |
| Authority | Owning test or architecture domain |
| Classification | PUBLIC synthetic only |
| Purpose | Validation, contributor workflow, design exercises |
| Current location | Public repository and CI |
| Primary threats | accidental real data, re-identifiable imitation, false production claims, stale fixtures, hidden secrets |
| Required controls | synthetic-only policy, repository scanning, review, explicit scenario limits, reproducibility |
| Status | Implemented baseline; Sprint 5 expansion in progress |

### Public-site assets and content

| Field | Boundary |
| --- | --- |
| Authority | Public website and publication governance |
| Classification | PUBLIC |
| Purpose | Discovery, trust, lore, status, documentation, contribution |
| Current location | `apps/site`, public deployment |
| Primary threats | content injection, dependency compromise, misleading capability claims, asset tampering, accessibility failure |
| Required controls | CSP and headers, build validation, status labeling, public-content review, deployment isolation |
| Status | Live bounded gateway |

### Founding Expedition interest records

| Field | Boundary |
| --- | --- |
| Authority | Purpose-limited signup process |
| Classification | PROTECTED PERSONAL |
| Purpose | Receive project-interest updates under the published notice |
| Current flow | Browser → public site adapter → separately configured private webhook |
| Primary threats | disclosure, overcollection, spam, webhook secret exposure, log retention, unauthorized reuse, inability to correct or unsubscribe |
| Required controls | field minimization, consent, validation, rate limiting, HTTPS, secret isolation, private storage, retention and deletion process |
| Status | Bounded live adapter; complete private lifecycle remains a gate |

### Account identity and credentials

| Field | Boundary |
| --- | --- |
| Authority | Future identity and account domain |
| Classification | PROTECTED PERSONAL and SECRET OR SECURITY-SENSITIVE |
| Purpose | Authentication, sessions, recovery, account lifecycle |
| Expected zones | S0, S1, S2, S7 |
| Primary threats | takeover, credential theft, recovery abuse, session fixation, enumeration, privilege escalation, account-to-Chronicle linkage exposure |
| Required controls | provider-independent identity contract, MFA and recovery requirements, short-lived sessions, revocation, isolation, audit, emergency review |
| Status | Required and undesigned in detail; no runtime |

### Account-to-Chronicle pseudonym mapping

| Field | Boundary |
| --- | --- |
| Authority | Identity domain with controlled Chronicle reference |
| Classification | PROTECTED PERSONAL |
| Purpose | Route authenticated authority to the correct controlled resource without exposing identity broadly |
| Expected zones | S1 and S2 only |
| Primary threats | cross-user leakage, tenant confusion, caller-supplied owner, re-identification, operator browsing |
| Required controls | internal identifiers, authenticated derivation, strict service boundary, no arbitrary query, access evidence |
| Status | Required architectural property; no runtime |

### Confirmed Living Chronicle records

| Field | Boundary |
| --- | --- |
| Authority | Living Chronicle |
| Classification | PROTECTED PERSONAL |
| Purpose | Personal longitudinal record and approved derived use |
| Expected zones | S1 and S2; minimized authorized derivatives elsewhere |
| Primary threats | cross-user leakage, unauthorized change, false confirmation, conflict suppression, inference leakage, deletion overclaim |
| Required controls | tenant and subject isolation, provenance, revision history, correction, policy enforcement, export and deletion procedures |
| Status | Pre-stable contract and synthetic fixtures only |

### Raw sources, documents, images, and attachments

| Field | Boundary |
| --- | --- |
| Authority | Source and custody domain |
| Classification | PROTECTED PERSONAL; may include SECRET OR SECURITY-SENSITIVE content |
| Purpose | Preserve original source evidence and enable authorized processing |
| Expected zones | S3, S4, S5, S9 |
| Primary threats | malware, parser exploitation, decompression abuse, metadata exposure, source substitution, signed-link leakage, indefinite retention |
| Required controls | untrusted-input isolation, immutable versions, integrity, malware controls, minimized locators, encrypted custody, retention and deletion |
| Status | Pre-stable contracts only; no storage or processing runtime |

### Provenance, transformations, associations, and inferences

| Field | Boundary |
| --- | --- |
| Authority | Living Chronicle and approved analytical domain |
| Classification | PROTECTED PERSONAL |
| Purpose | Explain how records and interpretations were produced |
| Expected zones | S1, S2, bounded S5 or S6 derivatives |
| Primary threats | provenance tampering, unsupported claims, hidden source loss, inference leakage, stale derivation after correction |
| Required controls | exact source references, versioned transformations, invalidation, uncertainty, structured authority, review and deletion propagation |
| Status | Pre-stable contract baseline; no runtime |

### House of Keys definitions and grants

| Field | Boundary |
| --- | --- |
| Authority | House of Keys |
| Classification | PROTECTED PERSONAL for person-specific grants; PUBLIC synthetic definitions and fixtures |
| Purpose | Represent exact authority for bounded actions |
| Expected zones | S1 and S2 |
| Primary threats | self-grant, purpose laundering, category broadening, stale revisions, coercion, lifecycle tampering |
| Required controls | controlling authority, exact revisions, atomic scope, lifecycle events, comprehension, confirmation, fail-closed validation |
| Status | Pre-stable contract, validator, evaluator, and synthetic fixtures only |

### Policy requests and decisions

| Field | Boundary |
| --- | --- |
| Authority | House of Keys policy evaluation |
| Classification | PROTECTED PERSONAL and minimized security metadata |
| Purpose | Determine allow, deny, or indeterminate for one bounded request |
| Expected zones | S1; explicit facts from S2; consumed by S4 or performing service |
| Primary threats | requester or recipient mismatch, stale facts, cache replay, partial-grant composition, `indeterminate` conversion |
| Required controls | pure evaluator, caller-supplied decision IDs, reason codes, freshness, complete-grant matching, execution recheck |
| Status | Pre-stable deterministic evaluator and synthetic evidence only |

### Execution and data-release state

| Field | Boundary |
| --- | --- |
| Authority | Performing domain service |
| Classification | PROTECTED PERSONAL and security-sensitive operational metadata |
| Purpose | Record attempts, releases, completion, failure, cancellation, and bounded-use consumption |
| Expected zones | S1, S4, bounded S2 |
| Primary threats | stale allow, duplicate release, queue replay, revocation race, partial failure, missing cancellation, hidden onward use |
| Required controls | idempotency, freshness, transactional consumption, release boundary evidence, cancellation, correction, receipt emission |
| Status | Required; no runtime |

### Person-visible access receipts

| Field | Boundary |
| --- | --- |
| Authority | House of Keys receipt domain |
| Classification | PROTECTED PERSONAL |
| Purpose | Let the person inspect requests, decisions, attempts, releases, failures, lifecycle changes, and corrections |
| Expected zones | S1 and S2; player-facing client |
| Primary threats | omission, forgery, duplication, correction suppression, excessive health-content duplication, inaccessible presentation |
| Required controls | exact references, append-only correction, minimized summaries, integrity, delivery, export, deletion boundary, accessibility |
| Status | Pre-stable contract and one synthetic completed receipt only |

### Protected operational audit evidence

| Field | Boundary |
| --- | --- |
| Authority | Security and operational audit domain |
| Classification | RESTRICTED, PROTECTED PERSONAL, and SECRET OR SECURITY-SENSITIVE |
| Purpose | Detect, investigate, contain, restore, and prove bounded operational events |
| Expected zones | S7 with minimized sources from S0–S6 |
| Primary threats | shadow surveillance, operator curiosity, log injection, deletion obstruction, secret leakage, overretention |
| Required controls | minimization, field allowlists, integrity, restricted access, retention schedule, correction, incident hold, safe derivatives |
| Status | Required; no production design or runtime yet |

### AI prompts, responses, extraction drafts, and conversation derivatives

| Field | Boundary |
| --- | --- |
| Authority | AI interaction and approved product-memory domains |
| Classification | PROTECTED PERSONAL unless synthetic or public |
| Purpose | Draft capture, explanation, clarification, retrieval, and narrative interaction |
| Expected zones | S1 and S5; approved bounded storage only |
| Primary threats | provider egress, training reuse, prompt injection, unsupported health claims, authority misrepresentation, hidden retention |
| Required controls | minimization, purpose and provider policy, non-training requirement where applicable, isolation, structured outputs, player confirmation, retention classes |
| Status | Frozen rule and future Sprint 6 boundary; no production AI runtime |

### Embeddings, indexes, caches, and retrieval results

| Field | Boundary |
| --- | --- |
| Authority | Retrieval derivative domain |
| Classification | Same or stricter than source information |
| Purpose | Authorized semantic retrieval for notes, documents, opted-in conversations, lore, or education |
| Expected zones | S5 and bounded S2 or S6 |
| Primary threats | cross-tenant retrieval, poisoning, stale deletion, source loss, inference and membership leakage |
| Required controls | tenant isolation, source references, disposable indexes, deletion rebuild, no structured-value authority, access policy |
| Status | Architectural direction only |

### Quest, progression, restoration, and story state

| Field | Boundary |
| --- | --- |
| Authority | Product and story domains |
| Classification | PROTECTED PERSONAL for player state; PUBLIC for schemas and synthetic examples |
| Purpose | Deliver personal value and narrative progression |
| Expected zones | S1 and S2; player client |
| Primary threats | client-side trust, unauthorized completion, reward manipulation, permission-linked progression, disclosure pressure |
| Required controls | deterministic evidence, server authority, no consent-derived rewards, correction effects, non-punitive refusal |
| Status | Content contracts and synthetic examples; no product runtime |

### Connector credentials, cursors, and source payloads

| Field | Boundary |
| --- | --- |
| Authority | Connector and identity domains; imported facts remain source truth until confirmed or normalized |
| Classification | SECRET OR SECURITY-SENSITIVE and PROTECTED PERSONAL |
| Purpose | Separately authorized import and synchronization |
| Expected zones | S1, S4, S8, S7 for secrets |
| Primary threats | impersonation, token theft, overbroad scopes, replay, cursor corruption, future sync after revocation, source substitution |
| Required controls | secret isolation, exact scopes, connector identity, revocation, cursor integrity, idempotency, receipts, source review |
| Status | Deferred to Sprint 14; threat modeling in Sprint 5 |

### Research proposals, enrollment, datasets, and outputs

| Field | Boundary |
| --- | --- |
| Authority | Future research-governance and House of Keys domains |
| Classification | REVIEW or PUBLIC for protocols and aggregates; PROTECTED PERSONAL for enrollment and person-level data |
| Purpose | Separately approved public-good research |
| Expected zones | S1, S6, S8, isolated research environment |
| Primary threats | purpose expansion, coercion, re-identification, uncontrolled linkage, retention drift, publication leakage, commercial reuse |
| Required controls | study-specific authority, named recipient, minimization, governance review, isolation, output review, withdrawal and retention rules |
| Status | Deferred; actor and boundary included in Sprint 5 model |

### Secrets, cryptographic keys, and certificates

| Field | Boundary |
| --- | --- |
| Authority | Security and environment-management domains |
| Classification | SECRET OR SECURITY-SENSITIVE |
| Purpose | Authenticate services, protect data, sign artifacts, and establish secure channels |
| Expected zones | S7 and approved runtime injection paths |
| Primary threats | repository or log exposure, excessive lifetime, shared environments, backup leakage, unrecoverable loss, insider misuse |
| Required controls | purpose separation, least access, rotation, revocation, recovery, destruction, scanning, incident response, environment isolation |
| Status | Sprint 5 design required; no production key custody |

### Builds, dependencies, CI logs, previews, and artifacts

| Field | Boundary |
| --- | --- |
| Authority | Repository and build system |
| Classification | PUBLIC by default; must never contain protected or secret information |
| Purpose | Build, validate, preview, and publish public code and synthetic artifacts |
| Current zones | P0 and external build providers |
| Primary threats | dependency compromise, action compromise, malicious artifact, secret exfiltration, cache poisoning, unsafe preview, log disclosure |
| Required controls | pinned and reviewed dependencies, minimal permissions, artifact policy, secret separation, provenance, branch controls, reproducible checks |
| Status | CI baseline exists; integrated supply-chain threat model pending |

### Backups, replicas, snapshots, archives, and recovery records

| Field | Boundary |
| --- | --- |
| Authority | Owning domain plus disaster-recovery authority |
| Classification | Same or stricter than source asset |
| Purpose | Restore authorized and validated system state after loss or corruption |
| Expected zones | S9 |
| Primary threats | hidden retention, stale permissions, restoration of deleted data, ransomware reach, untested restore, key loss, cross-environment contamination |
| Required controls | isolation, encryption, retention, restore tests, deletion-aware recovery, key management, inventory, access evidence |
| Status | Sprint 5 design required; no production backup system |

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
- webhook secret and endpoint isolation
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
- retention exceptions narrow and inspectable
- restoration cannot silently reintroduce deleted state
- evidence does not falsely prove uncontrolled downstream erasure

### Future AI and MCP flow

`authenticated client → bounded intent or tool → policy gateway → domain service → minimized authorized context → isolated model or tool execution → untrusted result → deterministic validation or player confirmation → optional receipt`

Required properties:

- no arbitrary SQL, filesystem, tenant selection, or raw database tools
- caller cannot supply Chronicle owner authority
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

This initial map establishes scope but does not complete workstream 5.1. Required follow-up includes:

- assign stable asset and boundary IDs
- produce a machine-checkable or structured companion register if justified
- map exact trust-boundary crossings to threat records
- define the identity and isolation matrix
- define environment and origin diagrams
- map control owners and evidence states
- review public-site signup retention, correction, deletion, and unsubscribe ownership
- reconcile all maps with the encryption, secrets, incident, audit, and deletion procedures
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
