# Threat Control Objective Register

[Security architecture](README.md) · [Integrated threat model](integrated-threat-model.md) · [Threat and residual-risk register](threat-and-residual-risk-register.md) · [Control status and risk vocabulary](control-status-and-risk-vocabulary.md) · [Identity and authority register](identity-and-authority-register.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent security and privacy review pending  
**Workstream:** 5.3  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** provider-independent control objectives only; no objective is implemented, deployed, operationally verified, or independently reviewed merely because it is documented here

## Purpose

This register defines reusable control objectives for the integrated Sprint 5 threat model. Later workstreams, implementations, synthetic scenarios, tabletops, exceptions, incidents, and completion reviews should reference these IDs rather than inventing inconsistent security requirements.

Control objectives describe required behavior and evidence boundaries. They do not select providers, algorithms, products, frameworks, legal conclusions, or operational configurations.

## Identifier and status rules

- Threat-model control objectives use `CTL-TM-*`.
- The identity-specific `CTL-ID-*` records remain authoritative for their detailed 5.2 scope.
- A later control may refine an objective with a domain-specific ID while retaining traceability to this register.
- Current status for every objective in this revision is **required** and **designed at architecture level** unless a narrower existing artifact is explicitly referenced.
- Existing repository checks, House of Keys tests, or public-site behavior may provide bounded implementation or synthetic evidence for part of an objective; they do not prove the objective is deployed across a production private-data system.
- Independent review remains absent.

## Control objectives

### `CTL-TM-001` — Server-derived resource context and layered isolation

- **Classes:** preventive, limiting, detective, containment
- **Primary threats:** `THR-001`, `THR-002`, `THR-023`, `THR-026`, `THR-031`, `THR-037`
- **Requirement:** derive controlled-resource, subject, tenant, environment, and authority context from authenticated server-side facts; preserve it through edge, domain, storage, object, queue, cache, retrieval, AI, export, receipt, audit, backup, analytics, and research layers; reject missing, ambiguous, conflicting, or stale context
- **Related controls:** `CTL-ID-002`, `CTL-ID-005`
- **Evidence boundary:** design is documented; implementation and cross-user synthetic tests are pending
- **Residual risk:** a single context-loss defect can create concentrated and difficult-to-reverse disclosure
- **Owner:** future identity, domain, infrastructure, AI, analytics, and recovery owners
- **Revalidation:** first private API, queue, retrieval index, AI tool, export, backup, or analytics implementation

### `CTL-TM-002` — Account, credential, session, and dependent-credential containment

- **Classes:** preventive, detective, limiting, containment, recovery
- **Primary threats:** `THR-003`, `THR-004`, `THR-005`, `THR-007`, `THR-023`
- **Requirement:** replay-resistant authentication appropriate to consequence; explicit session state, issuer, audience, environment, expiry, rotation, step-up, revocation, suspension, compromise, and dependent credential invalidation
- **Related controls:** `CTL-ID-003`, `CTL-ID-004`, `CTL-ID-012`
- **Evidence boundary:** identity architecture exists; provider, client, transport, storage, and operational evidence are pending
- **Residual risk:** credential and session compromise can amplify into export, deletion, connector, permission, or agent abuse
- **Owner:** future identity and security owners
- **Revalidation:** authentication, API token, mobile session, browser session, or remote agent credential implementation

### `CTL-TM-003` — Recovery, delegation, representative authority, and contested-control guardrails

- **Classes:** preventive, limiting, recovery, restorative, informational
- **Primary threats:** `THR-005`, `THR-006`, `THR-009`, `THR-010`
- **Requirement:** versioned, scoped, expiring, challengeable authority evidence; restricted recovery sessions; no automatic reactivation of removed links or withdrawn grants; no health or intimate-history proofing; cooling, contest, notification, rollback, and residual-harm records
- **Related controls:** `CTL-ID-006`, `CTL-ID-007`, `CTL-ID-008`, `CTL-ID-011`, `CTL-ID-013`
- **Evidence boundary:** architecture exists; jurisdiction, proofing, service levels, communications, staffing, and exercises are pending
- **Residual risk:** recovery and representative-control decisions can irreversibly displace a legitimate controlling person
- **Owner:** future identity, recovery, privacy, legal, accessibility, and support owners
- **Revalidation:** any delegate, caregiver, dependent, estate, successor, incapacity, or recovery implementation

### `CTL-TM-004` — Private least-capability operator access

- **Classes:** preventive, limiting, detective, containment, deterrent
- **Primary threats:** `THR-008`, `THR-009`, `THR-022`, `THR-032`
- **Requirement:** separate operator identities and sessions, private origins, named capability interfaces, short expiry, purpose and case binding, no shared accounts, silent impersonation, arbitrary SQL, object browsing, universal search, or unrelated data use
- **Related controls:** `CTL-ID-009`, `CTL-ID-014`
- **Evidence boundary:** operator capability classes are designed; tooling, role staffing, separation of duties, audit, and exercises are pending
- **Residual risk:** a compromised or malicious privileged actor may still cause concentrated harm within a legitimate capability
- **Owner:** future operations, security, privacy, and audit owners
- **Revalidation:** first administrative, support, audit, repair, deployment, or key-management surface

### `CTL-TM-005` — Expiring and reviewable emergency containment

- **Classes:** limiting, containment, recovery, restorative, corrective
- **Primary threats:** `THR-009`, `THR-032`, `THR-035`, `THR-042`
- **Requirement:** one named emergency record with exact trigger, purpose, capability, scope, approver, actor, environment, start, automatic expiry, evidence, notification rule, post-action review, restoration, and prohibition on permanent Chronicle or permission change
- **Related controls:** `CTL-ID-010`, `CTL-ID-011`, `CTL-ID-013`
- **Evidence boundary:** emergency capability classes are designed; approvers, service levels, monitoring, tabletop evidence, and independence are pending
- **Residual risk:** urgent action can bypass normal review, normalize exceptional power, or conceal an institutional failure
- **Owner:** future security, incident, governance, privacy, and service owners
- **Revalidation:** emergency-access implementation, material incident, or emergency tabletop

### `CTL-TM-006` — Chronicle, source, provenance, correction, and uncertainty integrity

- **Classes:** preventive, detective, corrective, restorative
- **Primary threats:** `THR-011`, `THR-012`, `THR-013`, `THR-016`, `THR-034`, `THR-043`
- **Requirement:** immutable or revision-safe source and lifecycle evidence; explicit author, source, recorder, confirmer, transformer, and custodian roles; deterministic validation; correction, conflict, supersession, retraction, invalidation, merge, unmerge, and uncertainty preservation
- **Evidence boundary:** Living Chronicle contracts and synthetic validators exist; production persistence, integrity, monitoring, and restoration evidence are pending
- **Residual risk:** technically valid but misleading state can persist when source context, conflict, or correction is lost
- **Owner:** future Chronicle and source/custody owners
- **Revalidation:** workstream 5.4 and any production Chronicle persistence or migration design

### `CTL-TM-007` — Untrusted input quarantine and parser isolation

- **Classes:** preventive, limiting, containment, detective, corrective
- **Primary threats:** `THR-015`, `THR-024`, `THR-027`, `THR-030`
- **Requirement:** type, size, structure, archive, nesting, decompression, resource, timeout, malware, parser, and sandbox boundaries; quarantine before trusted processing; no automatic confirmation; strict derived-output validation and provenance
- **Evidence boundary:** objective and emergency quarantine capability are designed; parser, malware, sandbox, and provider evidence are pending
- **Residual risk:** novel parser, archive, model, or supply-chain defects can escape isolation
- **Owner:** future source, upload, connector, AI, infrastructure, and security owners
- **Revalidation:** workstream 5.6 and first upload, document, image, archive, or connector payload implementation

### `CTL-TM-008` — Minimization, inference, anti-linkage, and re-identification control

- **Classes:** preventive, limiting, detective, informational
- **Primary threats:** `THR-014`, `THR-022`, `THR-025`, `THR-026`, `THR-036`, `THR-037`, `THR-044`, `THR-045`
- **Requirement:** purpose-specific field allowlists, identity separation, source-linked derivation, inference labels and uncertainty, no unrestricted global identity graph, dataset linkage review, output disclosure review, same-or-stricter classification for derivatives, and explicit re-identification residual risk
- **Related controls:** `CTL-ID-014`
- **Evidence boundary:** architecture exists; field definitions, retention, analytical methods, privacy review, and output tests are pending
- **Residual risk:** even minimized or pseudonymous data may permit sensitive inference or linkage
- **Owner:** future privacy, Chronicle, AI, analytics, research, and audit owners
- **Revalidation:** any retrieval, analytics, research, model, identity, or public-output implementation

### `CTL-TM-009` — Exact and fail-closed House of Keys evaluation

- **Classes:** preventive, limiting, informational
- **Primary threats:** `THR-017`, `THR-020`, `THR-023`
- **Requirement:** exact authority, purpose, recipient, performing actor, processor, category, selector, action, duration, condition, revision, explanation, confirmation, comprehension, and capacity facts; complete-grant matching; missing or conflicting material facts produce deny or indeterminate, never allow
- **Evidence boundary:** deterministic House of Keys evaluator and synthetic scenarios exist; production integration and identity facts are pending
- **Residual risk:** incorrect upstream facts or incomplete integration can produce a deterministically wrong decision
- **Owner:** future House of Keys, identity, and domain owners
- **Revalidation:** workstream 5.5 and first production policy integration

### `CTL-TM-010` — Authority freshness and invalidation propagation

- **Classes:** preventive, limiting, containment, corrective
- **Primary threats:** `THR-018`, `THR-019`, `THR-020`, `THR-023`, `THR-027`, `THR-031`, `THR-034`, `THR-045`
- **Requirement:** immutable decision and authority identities, freshness deadlines, re-evaluation before execution and release, invalidation of sessions, caches, queues, connectors, exports, agents, and recipients after relevant changes, and explicit cancellation or stop behavior
- **Related controls:** `CTL-ID-012`
- **Evidence boundary:** architecture exists; distributed ordering, transaction, cache, queue, connector, and downstream-recipient evidence are pending
- **Residual risk:** revocation and correction cannot guarantee instantaneous control of every in-flight or external copy
- **Owner:** future House of Keys, execution, infrastructure, connector, export, and recipient owners
- **Revalidation:** workstream 5.5 and any asynchronous, cached, distributed, or external release implementation

### `CTL-TM-011` — Atomic bounded-use consumption and idempotent execution

- **Classes:** preventive, limiting, detective, corrective
- **Primary threats:** `THR-019`, `THR-020`, `THR-031`
- **Requirement:** stable operation and idempotency identities, atomic single-use or bounded-count consumption, duplicate detection, retry and dead-letter rules, partial-failure handling, and no release without a valid unconsumed authority state
- **Evidence boundary:** House of Keys capacity contracts and execution boundary are documented; transaction and queue implementation are pending
- **Residual risk:** distributed partial failure can release data while consumption or receipt state remains inconsistent
- **Owner:** future execution, House of Keys, and infrastructure owners
- **Revalidation:** workstream 5.5 and queue or release implementation

### `CTL-TM-012` — Decision, execution, receipt, and protected-audit integrity and separation

- **Classes:** detective, deterrent, corrective, restorative, informational
- **Primary threats:** `THR-020`, `THR-021`, `THR-022`, `THR-045`
- **Requirement:** separate immutable or revision-safe identities and claims for request, decision, attempt, release, completion, failure, receipt, audit, and correction; minimized person-visible and operational fields; integrity, delivery, missing-evidence detection, and append-only correction
- **Evidence boundary:** receipt contracts and one synthetic completed receipt exist; production issuance, storage, delivery, integrity, audit, and retention are pending
- **Residual risk:** missing or forged evidence can conceal unauthorized action, while excessive evidence can become surveillance
- **Owner:** future House of Keys receipt, execution, audit, security, and accessibility owners
- **Revalidation:** workstreams 5.5 and 5.8 and any production access or receipt delivery

### `CTL-TM-013` — Agent and MCP capability mediation

- **Classes:** preventive, limiting, containment, detective
- **Primary threats:** `THR-023`, `THR-024`, `THR-026`
- **Requirement:** separate agent or client identity; server-resolved resource context; exact tool allowlist; action, audience, environment, resource, purpose, and expiry binding; no arbitrary SQL, filesystem, object, tenant-selection, permission, or hidden tools; credential revocation and receipt requirements
- **Evidence boundary:** architecture direction exists; agent, MCP, token, and tool contracts are pending Sprints 6, 7, and 16
- **Residual risk:** a permitted high-capability tool may still be abused or confused within its granted scope
- **Owner:** future AI governance, MCP, identity, House of Keys, and domain owners
- **Revalidation:** workstream 5.6 and every remote agent, MCP server, or new tool capability

### `CTL-TM-014` — Prompt, retrieved-content, and tool-output isolation

- **Classes:** preventive, limiting, detective, containment
- **Primary threats:** `THR-015`, `THR-023`, `THR-024`, `THR-026`, `THR-027`
- **Requirement:** treat uploaded, retrieved, connector, tool, and model content as untrusted data; separate instructions from content; strict schemas; provenance and source references; no content-created identity, permission, tenant, tool, or database authority; deterministic validation or person confirmation
- **Evidence boundary:** architecture exists; provider, model, prompt, parser, retrieval, and adversarial synthetic evidence are pending
- **Residual risk:** indirect instruction attacks and semantic ambiguity cannot be eliminated solely through prompt text
- **Owner:** future AI governance, retrieval, connector, source, and domain owners
- **Revalidation:** workstream 5.6 and model, retrieval, connector, or tool changes

### `CTL-TM-015` — AI and provider egress, retention, logging, and training limits

- **Classes:** preventive, limiting, detective, corrective
- **Primary threats:** `THR-025`, `THR-036`
- **Requirement:** exact provider and purpose policy, minimized context, encryption in transit, regional and subcontractor review, retention and deletion terms, no unauthorized training reuse, safe logging and tracing, output handling, replacement path, and evidence before public claims
- **Evidence boundary:** requirement only; no AI provider is selected and no production egress exists
- **Residual risk:** provider-side behavior may be difficult to verify completely and may change over time
- **Owner:** future AI governance, privacy, legal, security, and vendor owners
- **Revalidation:** workstreams 5.6 and 5.7, provider selection, contract change, or model migration

### `CTL-TM-016` — Connector scope, credential, cursor, replay, and revocation control

- **Classes:** preventive, limiting, detective, containment, corrective
- **Primary threats:** `THR-027`, `THR-045`
- **Requirement:** separate connector identity; exact provider scopes; secret isolation; person-visible source relationship; cursor integrity; idempotency and replay protection; payload validation and quarantine; future synchronization stops after revocation; source truth remains distinct from Chronicle confirmation
- **Evidence boundary:** threat and asset boundaries exist; connector implementation is deferred to Sprint 14
- **Residual risk:** external providers may retain data, change APIs, or fail to honor immediate revocation
- **Owner:** future connector, source/custody, identity, House of Keys, and vendor owners
- **Revalidation:** workstream 5.6 and every connector or provider integration

### `CTL-TM-017` — Secret, key, certificate, and service-identity purpose separation

- **Classes:** preventive, limiting, containment, recovery
- **Primary threats:** `THR-028`, `THR-032`, `THR-033`
- **Requirement:** no secrets in public code, fixtures, issues, logs, prompts, previews, or artifacts; environment- and purpose-separated service identities and keys; least access; rotation, revocation, recovery, destruction, scanning, and incident handling
- **Evidence boundary:** public repository policy exists; production key hierarchy and custody are pending 5.7
- **Residual risk:** privileged credentials and recovery material remain concentrated targets
- **Owner:** future security, infrastructure, key-management, and service owners
- **Revalidation:** workstream 5.7 and any secret, certificate, service identity, or key implementation

### `CTL-TM-018` — Environment isolation and public or preview restrictions

- **Classes:** preventive, limiting, containment, detective
- **Primary threats:** `THR-029`, `THR-039`, `THR-040`, `THR-046`
- **Requirement:** synthetic-only contributor and test defaults; separate local, CI, preview, development, test, staging, production, analytics, research, and administrative identities, data, networks, secrets, storage, logs, and origins; no private service requires public exposure
- **Evidence boundary:** current public repository and bounded site follow synthetic and public boundaries; production environments do not exist
- **Residual risk:** future convenience shortcuts can silently connect lower-trust environments to protected systems
- **Owner:** future infrastructure, deployment, security, privacy, and data owners
- **Revalidation:** workstream 5.7 and creation of any non-public environment or preview integration

### `CTL-TM-019` — Supply-chain provenance and minimal build authority

- **Classes:** preventive, detective, limiting, containment, corrective
- **Primary threats:** `THR-030`, `THR-039`, `THR-046`
- **Requirement:** reviewed dependencies and actions, minimum workflow permissions, protected branch and release controls, artifact and build provenance, cache isolation, reproducible validation where practical, vulnerability and secret response, rollback, and provider replacement
- **Evidence boundary:** repository CI and DCO exist; administrative branch evidence, action pinning policy, release provenance, and production pipeline are pending
- **Residual risk:** trusted upstream components and build infrastructure can be compromised outside project control
- **Owner:** repository, dependency, release, infrastructure, and security owners
- **Revalidation:** dependency, action, package-manager, build-provider, release, or deployment changes

### `CTL-TM-020` — Backup isolation and deletion-aware restoration

- **Classes:** preventive, limiting, recovery, restorative, corrective
- **Primary threats:** `THR-016`, `THR-032`, `THR-033`, `THR-034`, `THR-035`
- **Requirement:** isolated encrypted inventory; key separation; ransomware boundary; bounded retention; access evidence; tested point-in-time restore; correction, revocation, deletion, retention-exception, and tombstone replay; isolated reconciliation before activation
- **Evidence boundary:** architecture only; no production backup or restore system exists
- **Residual risk:** complete deletion from immutable or external backups may be impossible within short timeframes, and restore defects can resurrect invalid state
- **Owner:** future recovery, infrastructure, domain, privacy, and security owners
- **Revalidation:** workstreams 5.7 and 5.8, provider selection, restore test, or material schema change

### `CTL-TM-021` — Availability, safe degradation, and non-AI fallback

- **Classes:** limiting, containment, recovery, restorative, informational
- **Primary threats:** `THR-035`, `THR-041`, `THR-043`
- **Requirement:** domain-specific availability expectations; fail closed for unauthorized release; read-only or flow-stop containment; manual and non-AI alternatives; queue and retry bounds; person-visible status; recovery priority; no security or outage state silently erases correction, export, deletion, or appeal
- **Evidence boundary:** architecture and non-AI constitutional rule exist; service levels, operational design, exercises, and accessibility validation are pending
- **Residual risk:** strict fail-closed behavior may reduce availability, while degraded modes can become confusing or inaccessible
- **Owner:** future product, domain, accessibility, infrastructure, support, and incident owners
- **Revalidation:** workstream 5.8 and any private runtime or AI dependency

### `CTL-TM-022` — Research governance, dataset isolation, and output review

- **Classes:** preventive, limiting, detective, corrective, informational
- **Primary threats:** `THR-036`, `THR-037`, `THR-045`
- **Requirement:** study-specific authority, named recipient, exact scope and duration, separate enrollment and permission, isolated dataset, minimization, linkage and re-identification review, retention and withdrawal rules, output disclosure review, publication correction, and no product penalty or reward for participation
- **Evidence boundary:** purpose categories and architecture exist; research governance, recipient, environment, study, and review systems are deferred
- **Residual risk:** aggregate and model outputs can reveal individuals or enable later unauthorized linkage
- **Owner:** future research governance, privacy, House of Keys, security, and publication owners
- **Revalidation:** any research proposal, participant flow, dataset, analysis, or publication

### `CTL-TM-023` — Notification, challenge, appeal, correction, and restoration

- **Classes:** detective, restorative, corrective, informational
- **Primary threats:** `THR-005`, `THR-008`, `THR-009`, `THR-013`, `THR-016`, `THR-021`, `THR-032`, `THR-034`, `THR-042`, `THR-045`
- **Requirement:** safe independent-channel notifications where appropriate; person-visible receipts; challenge and appeal; containment during dispute; correction and downstream propagation; access restoration; explicit residual-harm record when full repair is impossible
- **Related controls:** `CTL-ID-011`
- **Evidence boundary:** Institutional Immune System and design requirements exist; support, communication, incident, receipt, and adjudication operations are pending
- **Residual risk:** some disclosures, external copies, inferences, or trust losses cannot be fully reversed
- **Owner:** future support, privacy, security, domain, accessibility, and governance owners
- **Revalidation:** workstream 5.8, any incident, appeal, receipt, recovery, or external-recipient implementation

### `CTL-TM-024` — Truthful control status, residual-risk ownership, review, and revalidation

- **Classes:** detective, corrective, deterrent, informational
- **Primary threats:** all `THR-*`, especially `THR-042`
- **Requirement:** stable control and risk records; explicit required, designed, synthetically tested, independently reviewed, implemented, deployed, operationally verified, deferred, rejected, retired, and not-applicable states; owner, evidence, limitations, residual risk, expiration, correction, and review trigger
- **Evidence boundary:** control-status vocabulary and Sprint 5 registers exist; independent review and operational evidence are absent
- **Residual risk:** institutional incentives may favor overstating maturity, suppressing uncertainty, or delaying remediation
- **Owner:** founding steward, future security governance, independent reviewers, and institutional oversight
- **Revalidation:** every material design, implementation, deployment, incident, provider change, authority expansion, or public claim

### `CTL-TM-025` — Accessible, non-coercive security, identity, permission, and recovery paths

- **Classes:** preventive, limiting, restorative, informational
- **Primary threats:** `THR-038`, `THR-041`
- **Requirement:** direct language, accessible alternatives, assisted and non-AI paths, proportionate friction, meaningful refusal, no punitive progression or service loss, no intimate disclosure as proof, and safe retry, defer, decline, challenge, and return behavior
- **Evidence boundary:** constitutional rules and House of Keys comprehension architecture exist; specialist accessibility review and production interaction evidence are pending
- **Residual risk:** security friction can exclude people or pressure them toward unsafe workarounds and broader disclosure
- **Owner:** future accessibility, product, identity, House of Keys, support, and security owners
- **Revalidation:** every authentication, recovery, permission, security-warning, or incident-notification interface

### `CTL-TM-026` — Public, synthetic, and protected-reporting boundary

- **Classes:** preventive, limiting, detective, corrective, informational
- **Primary threats:** `THR-039`, `THR-040`, `THR-046`
- **Requirement:** PUBLIC or explicitly synthetic information only in repository, issues, pull requests, public CI, previews, fixtures, and tabletops; protected security reports and incident evidence use private channels; safe minimized public derivatives; no exploit-enabling operational detail
- **Evidence boundary:** repository, confidentiality, development, and security-disclosure policies are published; operational private reporting and incident systems are not implemented
- **Residual risk:** contributors or users may still post protected information publicly before containment
- **Owner:** repository maintainers, security response, publication review, and later community moderation
- **Revalidation:** external contribution growth, incident, public challenge, new CI provider, or reporting-system implementation

### `CTL-TM-027` — Lifecycle, retention, deletion, derivative invalidation, and downstream-use control

- **Classes:** preventive, limiting, corrective, restorative, informational
- **Primary threats:** `THR-014`, `THR-016`, `THR-025`, `THR-026`, `THR-027`, `THR-036`, `THR-037`, `THR-040`, `THR-044`, `THR-045`
- **Requirement:** purpose-specific retention; explicit canonical, source, derived, cache, index, queue, backup, receipt, audit, connector, recipient, research, and public-output deletion boundaries; correction and invalidation propagation; narrow retention exceptions; honest evidence when uncontrolled downstream erasure is impossible
- **Evidence boundary:** Chronicle and House of Keys lifecycle contracts exist; procedures, provider terms, storage inventory, verification, and operational evidence are pending
- **Residual risk:** external recipients, immutable archives, model training, backups, and public copies may remain outside complete control
- **Owner:** future domain, privacy, security, connector, AI, research, recipient, audit, and recovery owners
- **Revalidation:** workstream 5.8 and every new persistent derivative or external recipient

### `CTL-TM-028` — Provider, operator, and founder replaceability and institutional continuity

- **Classes:** limiting, recovery, corrective, deterrent
- **Primary threats:** `THR-010`, `THR-028`, `THR-032`, `THR-035`, `THR-042`
- **Requirement:** portable identities and records, documented authority, separable modules, exportable configuration and evidence, legitimate successor roles, distributed recovery, no founder-only credential or knowledge path, vendor replacement, archive continuity, and founder-absence exercises
- **Related controls:** `CTL-ID-001`, `CTL-ID-013`
- **Evidence boundary:** architecture and institutional mandate exist; key-person register, succession map, credential continuity, legal continuity, vendor exercises, and founder-absence evidence are pending
- **Residual risk:** early Phase 0 operations remain concentrated in the founding steward and current providers
- **Owner:** founding steward and future institutional governance, infrastructure, security, release, archive, and legal owners
- **Revalidation:** Phase 0 exit, provider selection or replacement, leadership transition, or founder-absence exercise

## Cross-control rules

- One control may not silently replace another control class. Detection does not replace prevention; notification does not replace authorization; backup does not replace deletion; encryption does not replace purpose limitation; and audit does not create permission.
- A provider feature is not a Calypso’s Promise control until the environment, configuration, owner, evidence, limitations, rollback, and review boundary are identified.
- Control status is environment-specific and time-bounded.
- Every production-facing implementation must map its controls to applicable `CTL-TM-*`, `CTL-ID-*`, `THR-*`, and `RSK-*` records.
- Exceptions cannot waive the Product Constitution, public/private separation, meaningful refusal, correction, export, deletion, accessibility, or truthful status.

## Review result

The register provides explicit preventive, detective, limiting, containment, recovery, restorative, corrective, deterrent, and informational objectives for the integrated threat scope.

No objective is production-sufficient without implementation evidence, bounded validation, applicable specialist review, operational ownership, and revalidation. Independent security and privacy review remains pending.