# Security Architecture

[Repository home](../../README.md) · [Security policy](../../SECURITY.md) · [Current status](../roadmap/current-status.md) · [Sprint 5 completion](../roadmap/sprint-5-completion-record.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md) · [Publication and confidentiality](../policies/publication-and-confidentiality.md)

**Status:** SPRINT 5 COMPLETE ON REVIEW BRANCH — workstreams 5.1–5.10 complete; explicit founding-steward approval and merge pending  
**Tracking issue:** [#35](https://github.com/finalboss-tom/calypsos-promise/issues/35)  
**Production boundary:** No production health-data, account, agent, connector, research, encryption, key-custody, monitoring, recovery, incident-response, deletion-verification, or administrative runtime is authorized or represented as deployed  
**Control baseline:** Forty-six threats, twenty-eight integrated control objectives, forty-six residual risks, fourteen identity controls, twenty-eight Chronicle controls, thirty-six House of Keys controls, thirty-six untrusted-input controls, forty-nine encryption/key/secret/environment controls, and forty-five resilience/incident/audit/deletion controls are registered  
**Exercise baseline:** Fifteen required synthetic abuse cases, fifteen paired founding-steward design-tabletop records, and a stable exercise-gap register are complete; no multi-party, independent, implementation, or operational exercise evidence is claimed

## Purpose

This directory is the canonical home for the Sprint 5 threat model and security baseline. It organizes security work around the Product Constitution rather than around one vendor or infrastructure diagram.

Security must protect:

- useful personal value;
- private-by-default operation;
- purpose-specific authority;
- meaningful refusal and withdrawal;
- source and provenance integrity;
- correction, export, deletion, and recovery;
- cross-user and cross-subject isolation;
- deterministic domain authority;
- non-AI fallback;
- public-code and private-person separation;
- resilience without resurrection of stale authority or deleted data; and
- institutional corrigibility and truthful control status.

A control that reduces one risk by silently weakening these rights is incomplete and must record the tradeoff and residual risk.

## Authority order

Use this order when security artifacts conflict:

1. Product Constitution, Architecture Foundation, Gameplay Foundation, and Vision.
2. Accepted decision records and the Institutional Immune System.
3. `SECURITY.md` and publication, contribution, development, and validation policies.
4. Living Chronicle and House of Keys architecture and contracts.
5. The accepted Sprint 5 scope and Sprint 5 plan.
6. Security models, registers, procedures, synthetic scenarios, and tabletop records.
7. Implementation-specific designs accepted in later sprints.

A lower layer may implement or test a higher-layer rule. It may not silently weaken it.

## Core separations

Security reviews preserve the distinction among:

- account identity;
- Chronicle pseudonyms and subjects;
- Chronicle truth;
- raw source and custody truth;
- permission and lifecycle truth;
- policy decisions;
- execution and data-release state;
- person-visible access receipts;
- protected operational audit evidence;
- product and story state;
- AI and retrieval derivatives;
- cryptographic and secret-management evidence;
- environment and deployment state;
- availability, backup, restore, and incident state;
- deletion verification and external-copy uncertainty;
- exercise and simulation evidence; and
- public institutional records.

No single database object, service, identity provider, model, operator, key, secret, environment, network, provider, backup, incident record, tabletop, or audit log becomes the authority for all of these domains.

## Completed internal workstreams

### 5.1 — scope, assets, actors, flows, and trust boundaries

- [Asset, Authority, Data-Flow, and Trust-Boundary Map](asset-and-trust-boundary-map.md)
- [Security Asset, Authority, and Actor Register](asset-authority-register.md)
- [Security Data-Flow and Trust-Boundary Crossing Register](data-flow-boundary-register.md)

Defines nine authority domains, fourteen actor classes, thirteen trust zones, twenty-three asset classes, eighteen boundary crossings, and twelve principal flows. No private origin, database, object store, queue, analytics service, or administrative service requires public exposure.

### 5.2 — identity, accounts, sessions, isolation, recovery, and emergency authority

- [Identity, Account, Session, Tenant, and Authority Model](identity-account-session-tenant-model.md)
- [Identity, Session, Isolation, and Authority Register](identity-and-authority-register.md)
- [Account Recovery and Emergency Access Model](account-recovery-and-emergency-access-model.md)

Defines fourteen identity domains, ten authority profiles, ten session classes, fourteen isolation layers, eight recovery classes, eight operator capabilities, eight emergency capabilities, and fourteen identity controls. Authentication, recovery, operator status, and emergency declaration cannot create Chronicle or permission authority by themselves.

### 5.3 — integrated threat, control, and residual-risk model

- [Integrated Security and Privacy Threat Model](integrated-threat-model.md)
- [Threat Control Objective Register](threat-control-objective-register.md)
- [Threat and Residual-Risk Register](threat-and-residual-risk-register.md)

Defines forty-six stable `THR-*` threats, twenty-eight reusable `CTL-TM-*` objectives, and forty-six stable `RSK-*` residual risks. Production-facing risks remain mitigation-required and blocking rather than implicitly accepted.

### 5.4 — Living Chronicle security

- [Living Chronicle Security Model](living-chronicle-security-model.md)
- [Living Chronicle Security Control Register](living-chronicle-control-register.md)
- [Living Chronicle Dependency and Lifecycle Security Register](living-chronicle-dependency-lifecycle-register.md)

Defines twenty-eight `CTL-LC-*` controls and explicit source, custody, provenance, inference, correction, export, deletion, dependency, and restoration outcomes. It preserves human confirmation, immutable source versions, relationship-first correction, deletion-aware derivatives and restoration, minimized exceptions and tombstones, and provider replacement.

### 5.5 — House of Keys enforcement and receipt integrity

- [House of Keys Enforcement, Freshness, Receipt, and Audit Security Model](house-of-keys-enforcement-security-model.md)
- [House of Keys Enforcement Control Register](house-of-keys-control-register.md)
- [House of Keys Decision, Capacity, Execution, Receipt, and Audit Lifecycle Register](house-of-keys-decision-execution-lifecycle-register.md)
- [House of Keys Enforcement Review Checklist](house-of-keys-enforcement-review-checklist.md)

Defines thirty-six `CTL-HK-*` controls plus decision, propagation, capacity, envelope, queue, operation, ordering, receipt, audit, and reconciliation states. A policy `allow` is point-in-time evidence, not a bearer token.

### 5.6 — untrusted input and external execution isolation

- [Untrusted Input, Connector, AI, MCP, and Supply-Chain Isolation Model](untrusted-input-and-agent-isolation-model.md)
- [Untrusted Input, Connector, AI, MCP, and Supply-Chain Control Register](untrusted-input-control-register.md)
- [Untrusted Input and External Execution Processing-State Register](untrusted-input-processing-state-register.md)

Defines thirty-six `CTL-UT-*` controls and explicit intake, content, connector, AI, retrieval, MCP, tool, build, trust-claim, and terminal-disposition states.

Successful parsing, scanning, synchronization, retrieval, generation, tool execution, building, or testing creates bounded evidence only. It cannot create identity, permission, Chronicle truth, clinical truth, recipient authority, tool authority, or production approval.

### 5.7 — encryption, key management, secrets, and environment isolation

- [Encryption and Key-Management Baseline](encryption-and-key-management-baseline.md)
- [Secret-Management Policy](secret-management-policy.md)
- [Environment Isolation and Private-Origin Design](environment-isolation-and-private-origin-design.md)
- [Encryption, Key, Secret, and Environment Control Register](encryption-key-secret-environment-control-register.md)

Defines forty-nine `CTL-KSE-*` controls for minimization before encryption, authenticated transport, storage and temporary-state protection, envelope key hierarchy, key and secret lifecycle, provider replacement, trusted environment identity, synthetic-only non-production, private origins, network and egress controls, immutable artifact promotion, isolated analytics/research/administration/recovery, teardown, and founder-independent continuity.

Encryption, key or secret possession, network location, provider ownership, successful deployment, and cryptographic integrity do not create identity, permission, Chronicle truth, recipient authority, clinical truth, deletion proof, or institutional legitimacy.

### 5.8 — availability, backup, restore, incident response, audit retention, and deletion verification

- [Availability, Backup, Restore, and Continuity Model](availability-backup-and-restore-model.md)
- [Incident Response and Protected Audit Retention Plan](incident-response-and-audit-retention-plan.md)
- [Deletion Verification Procedure](deletion-verification-procedure.md)
- [Resilience, Incident, Audit, and Deletion Control Register](resilience-incident-deletion-control-register.md)

Defines forty-five `CTL-RID-*` controls and explicit availability, backup, restore, incident, protected-audit, deletion, verification, recipient, and residual-copy states.

The baseline requires fail-closed authority, accessible non-AI fallback, isolated backups and restore environments, post-snapshot authority and deletion reconciliation, queue and bounded-use recovery ordering, private incident response, minimized protected audit, and bounded deletion evidence that does not claim universal downstream erasure.

### 5.9 — synthetic abuse cases and tabletop exercises

- [Synthetic Abuse-Case and Tabletop Exercise Method](synthetic-abuse-case-and-tabletop-method.md)
- [Synthetic Security Abuse-Case Register](synthetic-abuse-case-register.md)
- [Synthetic Tabletop Records 1–8](tabletop-exercise-records-1.md)
- [Synthetic Tabletop Records 9–15](tabletop-exercise-records-2.md)
- [Synthetic Evidence Gap and Follow-Up Register](synthetic-evidence-gap-and-follow-up-register.md)

Defines fifteen stable `SYN-*` abuse cases and fifteen paired `TTX-*` founding-steward design-tabletop records covering:

- cross-user Chronicle leakage;
- compromised agents and MCP clients;
- stolen sessions and abusive recovery;
- malicious uploads and prompt injection;
- purpose laundering and stale permission decisions;
- revocation during queued or in-flight execution;
- receipt omission, duplication, and forgery;
- insider curiosity and emergency-power abuse;
- secret exposure in CI or previews;
- dependency, build, and release compromise;
- ransomware and backup restoration;
- deletion verification with backups and external recipients;
- provider outage and regional failure;
- public-site signup disclosure and retention incidents; and
- research scope expansion.

Each tabletop records assumptions, actual and simulated roles, ordered injects, decisions, architecture evidence, containment, correction, restoration, person-visible behavior, gaps, residual harm, follow-up owners, and revalidation triggers.

All fifteen exercises reached founding-steward design-tabletop evidence only. No exercise proves production control implementation, operational response time, provider behavior, multi-party readiness, accessibility effectiveness, legal sufficiency, independent review, or production readiness.

### 5.10 — cross-contract review, control-status truth, specialist holdpoints, and completion record

- [Sprint 5 Cross-Contract Security Reconciliation](sprint-5-cross-contract-reconciliation.md)
- [Sprint 5 Specialist Holdpoint and Evidence Register](sprint-5-specialist-holdpoint-and-evidence-register.md)
- [Sprint 5 Completion Record](../roadmap/sprint-5-completion-record.md)

The final review maps every accepted deliverable and criterion to evidence, accepts the control-status vocabulary, reconciles all forty-six residual risks and exercise gaps, corrects stale website-status language, names twenty-four specialist and institutional holdpoints, and preserves the distinction between design completion, implementation, deployment, operational verification, and independent review.

Sprint 5 is complete for its accepted architecture, policy, procedure, risk, control, public synthetic scenario, and founding-steward design-tabletop scope. No production capability is authorized.

## Artifact rules

Every material security artifact identifies:

- status and authority;
- scope and explicit non-scope;
- assets, actors, and trust boundaries covered;
- constitutional rights and domain invariants protected;
- assumptions and unresolved dependencies;
- required, designed, tested, reviewed, deployed, deferred, or not-applicable controls;
- residual risks and uncertainty;
- owner or responsible role;
- review and revalidation trigger; and
- public-information and specialist-review boundaries.

## Control-status truth

Use [`control-status-and-risk-vocabulary.md`](control-status-and-risk-vocabulary.md).

A control must not be described as deployed because it is documented, included in a diagram, exercised with synthetic data, accepted by the founding steward, enabled by a provider default, or available from a possible vendor.

A founding-steward design tabletop is stronger than an unexercised requirement and weaker than a multi-party tabletop, executable isolated test, deployed control, protected operational evidence, or independent review.

## Public-information boundary

Only PUBLIC information and synthetic scenarios belong in this directory.

Do not publish:

- credentials, secrets, keys, tokens, private endpoints, or operational configuration;
- provider account identifiers, private origins, network maps, or administrative access paths;
- real vulnerability reproduction details that enable exploitation;
- personal or health information;
- private logs, screenshots, exports, correspondence, or support records;
- security reports or incident evidence;
- recovery material or unredacted control evidence; or
- information that would materially help evade a control.

Protected evidence belongs in an authorized private system. Public artifacts may contain reviewed, minimized institutional derivatives.

## Review boundary

The project currently has no named independent security reviewer. Founding-steward acceptance is accountable internal review, not independent specialist review.

Until a qualified reviewer is named or a separately reviewed temporary exception is accepted, Sprint 5 artifacts remain internal architecture, procedure, and design-tabletop baselines rather than production security certification.

## Navigation

- [Sprint 5 Plan](../roadmap/sprint-5-plan.md)
- [Asset and Trust-Boundary Map](asset-and-trust-boundary-map.md)
- [Asset, Authority, and Actor Register](asset-authority-register.md)
- [Data-Flow Boundary Register](data-flow-boundary-register.md)
- [Identity and Authority Model](identity-account-session-tenant-model.md)
- [Identity and Authority Register](identity-and-authority-register.md)
- [Recovery and Emergency Access Model](account-recovery-and-emergency-access-model.md)
- [Integrated Threat Model](integrated-threat-model.md)
- [Threat Control Register](threat-control-objective-register.md)
- [Threat and Residual-Risk Register](threat-and-residual-risk-register.md)
- [Living Chronicle Security Model](living-chronicle-security-model.md)
- [Living Chronicle Control Register](living-chronicle-control-register.md)
- [Living Chronicle Dependency Register](living-chronicle-dependency-lifecycle-register.md)
- [House of Keys Enforcement Model](house-of-keys-enforcement-security-model.md)
- [House of Keys Control Register](house-of-keys-control-register.md)
- [House of Keys Lifecycle Register](house-of-keys-decision-execution-lifecycle-register.md)
- [House of Keys Review Checklist](house-of-keys-enforcement-review-checklist.md)
- [Untrusted Input Isolation Model](untrusted-input-and-agent-isolation-model.md)
- [Untrusted Input Control Register](untrusted-input-control-register.md)
- [Untrusted Input State Register](untrusted-input-processing-state-register.md)
- [Encryption and Key-Management Baseline](encryption-and-key-management-baseline.md)
- [Secret-Management Policy](secret-management-policy.md)
- [Environment Isolation Design](environment-isolation-and-private-origin-design.md)
- [Encryption, Key, Secret, and Environment Controls](encryption-key-secret-environment-control-register.md)
- [Availability, Backup, Restore, and Continuity Model](availability-backup-and-restore-model.md)
- [Incident Response and Protected Audit Retention Plan](incident-response-and-audit-retention-plan.md)
- [Deletion Verification Procedure](deletion-verification-procedure.md)
- [Resilience, Incident, Audit, and Deletion Controls](resilience-incident-deletion-control-register.md)
- [Synthetic Exercise Method](synthetic-abuse-case-and-tabletop-method.md)
- [Synthetic Abuse-Case Register](synthetic-abuse-case-register.md)
- [Tabletop Records 1–8](tabletop-exercise-records-1.md)
- [Tabletop Records 9–15](tabletop-exercise-records-2.md)
- [Synthetic Evidence Gap Register](synthetic-evidence-gap-and-follow-up-register.md)
- [Sprint 5 Cross-Contract Reconciliation](sprint-5-cross-contract-reconciliation.md)
- [Sprint 5 Specialist Holdpoint Register](sprint-5-specialist-holdpoint-and-evidence-register.md)
- [Sprint 5 Completion Record](../roadmap/sprint-5-completion-record.md)
- [Control Status and Risk Vocabulary](control-status-and-risk-vocabulary.md)
- [Security Policy](../../SECURITY.md)
- [Pre-Sprint 5 Alignment Review](../roadmap/pre-sprint-5-alignment-review.md)
- [Architecture Foundation](../frozen/architecture.md)
- [Living Chronicle Architecture](../architecture/README.md#living-chronicle-architecture)
- [House of Keys Architecture](../architecture/README.md#house-of-keys-architecture)
- [Institutional Immune System](../governance/institutional-immune-system.md)
