# Sprint 5 Plan — Threat Model and Security Baseline

**Status:** IN PROGRESS on issue #35  
**Entry baseline:** `main` at `d135b2fdf79a3c2cca9bf7cad275fc454d22fa6d`  
**Canonical scope:** [`docs/roadmap/sprints.md`](sprints.md#sprint-5--threat-model-and-security-baseline)  
**Entry review:** [`pre-sprint-5-alignment-review.md`](pre-sprint-5-alignment-review.md)  
**Tracking issue:** [#35](https://github.com/finalboss-tom/calypsos-promise/issues/35)

## Goal

Define defenses before connecting real health data or agents.

This plan does not change the accepted Sprint 5 goal, deliverables, or acceptance criteria. It maps the existing sprint into reviewable workstreams while preserving the Product Constitution, Architecture Foundation, deterministic incentive boundary, Institutional Immune System, Living Chronicle contract, House of Keys contract, public-information boundary, and pre-Sprint 5 reconciliation.

## Accepted deliverables

- asset and trust-boundary map
- threat model covering accounts, connectors, uploads, AI, MCP, insiders, supply chain, and research actors
- encryption and key-management baseline
- secret-management policy
- environment-isolation design
- account-recovery design
- audit-retention and incident-response plans
- deletion-verification procedure
- tabletop exercises

## Accepted acceptance criteria

- cross-user leakage and compromised-agent scenarios have explicit controls
- no private origin, database, or administrative service requires public exposure
- the security-disclosure workflow is published

## Security thesis

Security exists to protect the Promise. It may not become a justification for collecting more information, retaining it longer, broadening recipients, hiding system behavior, restricting correction or exit, or making optional secondary use a condition of personal value.

The baseline must therefore defend confidentiality, integrity, availability, person control, purpose limitation, truthful capability status, and institutional corrigibility together. A control that protects one property by silently weakening another is incomplete and must record the tradeoff and residual risk.

## Governing boundaries

- Chronicle truth, permission truth, source truth, execution state, receipts, protected audit evidence, product state, and AI memory remain separate authorities.
- Caller identity comes from authenticated context, never a caller-supplied Chronicle owner or subject identifier.
- AI and MCP remain proposal and adapter layers. They cannot create identity, permission, Chronicle truth, policy authority, or arbitrary database access.
- Missing, stale, ambiguous, conflicting, unsupported, or unmapped material authority never defaults to allow.
- Broader permission, additional disclosure, longer retention, security compliance, receipt volume, research participation, or commercial use cannot create rewards, progression, compensation, governance weight, or superior core rights.
- Refusal, deferral, withdrawal, correction, export, deletion, recovery, and non-AI fallback remain non-punitive.
- Public development uses only public or synthetic information.
- Designed controls must not be represented as deployed controls.
- Provider choices remain unfrozen unless a separate decision accepts them.
- Sprint completion will not equal production readiness, legal approval, privacy certification, clinical approval, research approval, or independent specialist certification.

## Security and privacy properties

Every workstream must consider:

- confidentiality and unauthorized disclosure
- integrity and unauthorized or misleading change
- availability and recoverability
- identity, authority, and purpose correctness
- tenant and person isolation
- minimization, retention, and deletion
- inference, linkage, re-identification, and metadata exposure
- coercion, dark patterns, and security theater
- observability without unnecessary surveillance
- correction, appeal, containment, restoration, and revalidation
- provider replaceability and dependency containment
- truthful distinction between required, designed, tested, reviewed, deployed, and deferred controls

## Workstreams

### 5.1 Security scope, assets, classification, authority, and trust-boundary map

Create the canonical asset and data-flow inventory. Each entry must identify:

- asset or information class
- authoritative domain and owner
- source and derived forms
- data classification
- controlling authority and permitted purpose
- expected recipients and performing actors
- trust boundaries crossed
- storage, processing, transmission, cache, queue, backup, log, and receipt locations
- retention, correction, export, deletion, and restoration expectations
- current capability status and unresolved dependencies

The map must cover the public site and signup adapter, account and identity concepts, Living Chronicle, raw sources and attachments, House of Keys, execution services, receipts, protected audit evidence, AI and retrieval derivatives, MCP clients and tools, connectors, uploads, administrative surfaces, CI and supply chain, research actors, and future analytics.

### 5.2 Identity, account, session, tenant, operator, recovery, and emergency-power boundaries

Define provider-independent requirements for:

- account identity versus Chronicle pseudonyms and subjects
- authentication and session establishment
- session fixation, theft, replay, expiry, and revocation
- tenant and person isolation
- delegation, capacity, guardianship, and recovery authority
- account recovery without silent Chronicle or House of Keys authority expansion
- administrator, support, operator, maintainer, and emergency access
- least privilege, separation of duties, time-bounded elevation, and break-glass review
- founder absence and removal of founder-only recovery paths
- immutable evidence for authority changes without exposing protected details publicly

No identity provider or authentication vendor is selected in this sprint.

### 5.3 Integrated security and privacy threat model and residual-risk register

For every actor, asset, boundary, and flow, record:

- threat or abuse case
- attacker or failure actor
- preconditions and entry point
- affected constitutional right, security property, and domain invariant
- likely impact and affectedness
- preventive, detective, containment, recovery, and restorative controls
- control owner and dependency
- evidence state
- residual risk and uncertainty
- review trigger and expiration

Threats must include accidental failure, malicious outsiders, insiders, compromised operators, compromised clients, coercive recipients, abusive requesters, provider failure, supply-chain compromise, institutional capture, and incorrect but well-intentioned automation.

Risk records may not collapse uncertainty into a single false-precision score. Priority may use transparent qualitative dimensions while preserving affectedness, minority harm, reversibility, exploitability, and evidence quality.

### 5.4 Living Chronicle source, provenance, inference, export, deletion, and custody threats

Cover at least:

- cross-user and cross-subject leakage
- source substitution and provenance tampering
- false confirmation or actor confusion
- duplicate, conflict, correction, supersession, merge, and unmerge abuse
- malicious document and attachment processing
- locator and metadata exposure
- transformation and normalization corruption
- inference leakage and unsupported derived claims
- custody confusion and provider lock-in
- unauthorized export and export exfiltration
- deletion overclaim, retention-exception abuse, and tombstone tampering
- backup, replica, cache, index, and derived-copy deletion boundaries
- recovery that restores data a person validly deleted

Structured Chronicle records remain authoritative over semantic retrieval derivatives.

### 5.5 House of Keys enforcement, freshness, lifecycle, receipt, and audit threats

Cover at least:

- self-grant, requester and recipient mismatch, and confused-deputy behavior
- purpose laundering and category or action broadening
- omitted or widened selectors
- stale definitions, grants, comprehension, confirmations, capacity, and decisions
- revocation races and cache invalidation failure
- partial-grant composition and bounded-use replay
- single-use or bounded-count double consumption
- explanation substitution and coerced comprehension
- conversion of `indeterminate` into allow
- lifecycle ordering and event-to-state projection errors
- receipt omission, forgery, duplication, correction suppression, or health-content overexposure
- audit records becoming shadow permission or surveillance systems
- downstream recipients continuing use after future authority ends

The model must distinguish authorization decisions, execution, data release, person-visible receipts, protected operational audit, and correction chains.

### 5.6 Upload, connector, document, AI, MCP, dependency, and untrusted-input isolation

Treat all imported content and external output as untrusted. Define requirements for:

- file type, size, structure, archive, parser, decompression, and malware boundaries
- connector authentication, impersonation, synchronization, cursor, replay, and revocation
- prompt injection and indirect instruction attacks
- model and provider egress
- tool-confusion and hidden tool expansion
- MCP client compromise and stale authorization reuse
- caller-supplied owner or subject identifiers
- retrieval poisoning and untrusted citations
- generated permission or clinical misrepresentation
- dependency, build, package, action, artifact, and CI compromise
- secret exposure through logs, prompts, traces, previews, artifacts, and error messages
- sandboxing and least-capability execution

Retrieved or uploaded content cannot grant itself tool, permission, identity, or Chronicle authority.

### 5.7 Encryption, key management, secrets, and environment isolation

Define provider-independent baselines for:

- encryption in transit and at rest
- field, object, database, backup, and log protection boundaries
- key hierarchy, purpose separation, rotation, revocation, recovery, and destruction
- envelope and per-environment separation requirements without selecting an implementation
- secret creation, storage, distribution, access, rotation, revocation, scanning, and incident response
- local, CI, preview, development, test, staging, production, analytics, and administrative isolation
- synthetic-only development and test defaults
- private origins and non-public administrative services
- network and service trust assumptions
- cryptographic agility and provider replaceability
- evidence needed before claiming a control is deployed

Keys, credentials, and operational configuration never belong in public fixtures, branches, issues, logs, previews, or artifacts.

### 5.8 Availability, backup, restore, incident response, audit retention, and deletion verification

Define:

- service and domain availability expectations
- graceful degradation and manual or non-AI fallback
- backup scope, encryption, isolation, testing, retention, and restore evidence
- ransomware, destructive operator, provider, region, and dependency failure responses
- queue replay, idempotency, duplicate execution, and recovery ordering
- incident classification, containment, eradication, restoration, notification, correction, and revalidation
- protected audit minimization, access, integrity, retention, correction, and deletion boundaries
- deletion-verification procedures for canonical, source, derived, cache, index, queue, backup, receipt, audit, and recipient-held copies
- honest evidence language when complete downstream erasure cannot be proven
- restoration that does not silently reverse valid withdrawal, correction, or deletion

A deletion receipt proves the bounded procedure and evidence completed; it must not falsely claim that every uncontrolled downstream copy ceased to exist.

### 5.9 Synthetic abuse cases and tabletop exercises

Create public, synthetic scenarios covering at least:

- cross-user Chronicle leakage
- compromised agent or MCP client
- stolen session and abusive account recovery
- malicious upload and prompt injection
- purpose laundering and stale permission decision
- revocation during queued or in-flight execution
- receipt omission or forgery
- insider curiosity and emergency-power abuse
- secret exposure in CI or preview logs
- dependency or build compromise
- ransomware and backup restoration
- deletion verification with backups and external recipients
- provider outage and regional failure
- public-site signup disclosure or retention incident
- research actor attempting scope expansion

Each tabletop must record assumptions, participants or responsible roles, timeline, decisions, evidence, gaps, containment, restoration, residual harm, follow-up owner, and revalidation trigger. Synthetic exercises do not prove production controls exist.

### 5.10 Cross-contract review, control-status truth, specialist hold points, and completion record

Reconcile the complete security baseline against:

- Product Constitution and frozen rights
- Architecture Foundation and dependency direction
- Living Chronicle and House of Keys contracts
- deterministic incentives and non-punitive refusal
- publication and confidentiality policy
- SECURITY.md disclosure workflow
- Institutional Immune System
- contributor and repository policies
- public website capability claims
- future Aster, MCP, connector, research, and production boundaries

Create a completion record that maps every accepted deliverable and criterion to artifacts and evidence, records control status and residual risk, identifies unresolved specialist gates and owners, and prevents design documents from being represented as deployed controls.

## Control-status vocabulary

Sprint 5 uses these distinct statuses:

- **required** — a higher-authority rule or accepted design requires the control
- **designed** — the control behavior and boundary are documented
- **synthetically tested** — public synthetic evidence exercises the documented behavior
- **independently reviewed** — a named qualified reviewer has reviewed the bounded control
- **deployed** — the control exists in an identified operating environment with evidence
- **deferred** — the control is intentionally postponed with a reason, owner, risk, and entry condition
- **not applicable** — a reviewed explanation shows the control does not apply to the bounded system

Statuses are not cumulative by implication. A designed or tested control is not deployed. Founding-steward acceptance is not independent review.

## Expected artifacts

The sprint should produce, at minimum:

- `docs/security/README.md`
- asset, data-flow, actor, and trust-boundary maps
- integrated threat and residual-risk register
- Chronicle security model
- House of Keys enforcement security model
- untrusted-input, AI, MCP, connector, and supply-chain model
- encryption and key-management baseline
- secret-management policy
- environment-isolation design
- account-recovery and emergency-access design
- audit-retention and incident-response plans
- deletion-verification procedure
- synthetic scenario and tabletop records
- control-status and review register
- Sprint 5 completion record

Exact filenames may be refined for cohesion. New packages or runtime modules are not required merely to mirror the planned topology.

## Evidence and review gates

- Every material control identifies its status, owner, dependencies, evidence, residual risk, and revalidation trigger.
- Every threat identifies preventive, detective, containment, recovery, and restorative considerations where applicable.
- Every cross-user leakage and compromised-agent scenario has explicit controls and synthetic evidence.
- Every private origin, database, and administrative service is designed so public exposure is unnecessary.
- The security-disclosure workflow remains published and cross-linked.
- No protected vulnerability detail, secret, private record, or operational exploit path enters public artifacts.
- Named independent security review is required before the baseline can be described as independently reviewed or production-sufficient.

## Explicit non-scope

Sprint 5 does not implement production accounts, identity proofing, databases, APIs, queues, providers, connectors, real recipients, real-data flows, production agents, research enrollment, compensation, marketplaces, production encryption, operational key custody, deployed monitoring, clinical behavior, treasury, ownership, token, blockchain, NFT, or on-chain governance.

It may define requirements, interfaces, procedures, public synthetic evidence, and tabletop exercises for future systems. Documentation does not authorize deployment.

## Stop conditions

Stop and seek a reviewed decision if work would:

- change the accepted Sprint 5 goal, deliverables, or acceptance criteria
- weaken private-by-default behavior, purpose-specific authority, meaningful refusal, correction, export, deletion, accessibility, or non-AI fallback
- collapse Chronicle, permission, execution, receipt, audit, product-state, or AI-memory authority
- let an AI, client, requester, recipient, provider, operator, or governance body create authority independently
- reward security compliance, permission breadth, disclosure, retention, receipt volume, research, or commerce
- convert missing or uncertain facts into permission
- claim a designed control is deployed
- claim legal, privacy, accessibility, clinical, research, security, or production approval without the required evidence
- introduce protected source material, vulnerability details, credentials, or operational secrets into public workflows

## Completion boundary

Sprint 5 is complete only when every accepted deliverable has a repository artifact, every acceptance criterion has inspectable evidence, synthetic scenarios and tabletop results are recorded, control status and residual risks are truthful, unresolved specialist gates have owners, and the completion record reconciles the full baseline.
