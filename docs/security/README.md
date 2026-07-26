# Security Architecture

[Repository home](../../README.md) · [Security policy](../../SECURITY.md) · [Current status](../roadmap/current-status.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md) · [Publication and confidentiality](../policies/publication-and-confidentiality.md)

**Status:** Sprint 5 working area — workstreams 5.1–5.7 complete at the internal architecture level; 5.8 next  
**Tracking issue:** [#35](https://github.com/finalboss-tom/calypsos-promise/issues/35)  
**Production boundary:** No production health-data, account, agent, connector, research, encryption, key-custody, monitoring, or administrative runtime is authorized or represented as deployed  
**Control baseline:** Forty-six threats, twenty-eight integrated control objectives, forty-six residual risks, fourteen identity controls, twenty-eight Chronicle controls, thirty-six House of Keys controls, thirty-six untrusted-input controls, and forty-nine encryption, key, secret, and environment controls are registered; production-facing risks remain blocking

## Purpose

This directory is the canonical home for the Sprint 5 threat model and security baseline. It organizes security work around the Product Constitution rather than around a vendor or infrastructure diagram.

Security must protect:

- useful personal value
- private-by-default operation
- purpose-specific authority
- meaningful refusal and withdrawal
- source and provenance integrity
- correction, export, deletion, and recovery
- cross-user and cross-subject isolation
- deterministic domain authority
- non-AI fallback
- public-code and private-person separation
- institutional corrigibility and truthful control status

A control that reduces one risk by silently weakening these rights is incomplete and must record the tradeoff and residual risk.

## Authority order

Use this order when security artifacts conflict:

1. Product Constitution, Architecture Foundation, Gameplay Foundation, and Vision
2. accepted decision records and the Institutional Immune System
3. SECURITY.md and publication, contribution, development, and validation policies
4. Living Chronicle and House of Keys architecture and contracts
5. the accepted Sprint 5 scope and Sprint 5 plan
6. security models, registers, procedures, synthetic scenarios, and tabletop records
7. implementation-specific designs accepted in later sprints

A lower layer may implement or test a higher-layer rule. It may not silently weaken it.

## Core separations

Security reviews must preserve the distinction among:

- account identity
- Chronicle pseudonyms and subjects
- Chronicle truth
- raw source and custody truth
- permission and lifecycle truth
- policy decisions
- execution and data-release state
- person-visible access receipts
- protected operational audit evidence
- product and story state
- AI and retrieval derivatives
- cryptographic and secret-management evidence
- environment and deployment state
- public institutional records

No single database object, service, identity provider, model, operator, key, secret, environment, network, provider, or audit log becomes the authority for all of these domains.

## Current workstreams

### 5.1 — scope, assets, actors, flows, and trust boundaries

The completed internal baseline consists of:

- the [Asset, Authority, Data-Flow, and Trust-Boundary Map](asset-and-trust-boundary-map.md);
- the [Security Asset, Authority, and Actor Register](asset-authority-register.md); and
- the [Security Data-Flow and Trust-Boundary Crossing Register](data-flow-boundary-register.md).

Together they define nine authority domains, fourteen actor classes, thirteen trust zones, twenty-three asset classes, eighteen boundary crossings, and twelve principal flows. No private origin, database, object store, queue, analytics service, or administrative service requires public exposure.

### 5.2 — identity, accounts, sessions, tenants, operators, recovery, and emergency authority

The completed internal baseline consists of:

- the [Identity, Account, Session, Tenant, and Authority Model](identity-account-session-tenant-model.md);
- the [Identity, Session, Isolation, and Authority Register](identity-and-authority-register.md); and
- the [Account Recovery and Emergency Access Model](account-recovery-and-emergency-access-model.md).

Together they define fourteen identity domains, ten authority profiles, ten session classes, fourteen isolation layers, eight recovery classes, eight operator capabilities, eight emergency capabilities, and fourteen identity controls. Authentication, recovery, operator status, and emergency declaration cannot create Chronicle or permission authority by themselves.

### 5.3 — integrated security, privacy, threat, control, and residual-risk model

The completed internal baseline consists of:

- the [Integrated Security and Privacy Threat Model](integrated-threat-model.md);
- the [Threat Control Objective Register](threat-control-objective-register.md); and
- the [Threat and Residual-Risk Register](threat-and-residual-risk-register.md).

Together they define forty-six stable `THR-*` threats, twenty-eight reusable `CTL-TM-*` objectives, and forty-six stable `RSK-*` residual risks. Production-facing risks remain mitigation-required and blocking rather than implicitly accepted.

### 5.4 — Living Chronicle source, provenance, inference, export, deletion, and custody security

The completed internal baseline consists of:

- the [Living Chronicle Security Model](living-chronicle-security-model.md);
- the [Living Chronicle Security Control Register](living-chronicle-control-register.md); and
- the [Living Chronicle Dependency and Lifecycle Security Register](living-chronicle-dependency-lifecycle-register.md).

Together they refine `THR-011` through `THR-016` through twenty-eight `CTL-LC-*` controls and explicit source, custody, provenance, inference, correction, export, deletion, dependency, and restoration outcomes.

The baseline preserves human confirmation, immutable source versions, version-bound locators, relationship-first correction, deletion-aware derivatives and restoration, minimized exceptions and tombstones, and provider replacement.

### 5.5 — House of Keys enforcement, freshness, lifecycle, receipt, and audit security

The completed internal baseline consists of:

- the [House of Keys Enforcement, Freshness, Receipt, and Audit Security Model](house-of-keys-enforcement-security-model.md);
- the [House of Keys Enforcement Control Register](house-of-keys-control-register.md);
- the [House of Keys Decision, Capacity, Execution, Receipt, and Audit Lifecycle Register](house-of-keys-decision-execution-lifecycle-register.md); and
- the [House of Keys Enforcement Review Checklist](house-of-keys-enforcement-review-checklist.md).

Together they refine `THR-017` through `THR-022` and `THR-031` through thirty-six `CTL-HK-*` controls plus decision, propagation, capacity, envelope, queue, operation, ordering, receipt, audit, and reconciliation states.

A policy `allow` is point-in-time evidence, not a bearer token. Freshness, bounded-use consumption, revocation races, retries, release, receipts, protected audit, correction, restoration, and residual harm remain separate and inspectable.

### 5.6 — upload, connector, document, AI, MCP, dependency, and untrusted-input isolation

The completed internal baseline consists of:

- the [Untrusted Input, Connector, AI, MCP, and Supply-Chain Isolation Model](untrusted-input-and-agent-isolation-model.md);
- the [Untrusted Input, Connector, AI, MCP, and Supply-Chain Control Register](untrusted-input-control-register.md); and
- the [Untrusted Input and External Execution Processing-State Register](untrusted-input-processing-state-register.md).

Together they refine `THR-015` and `THR-023` through `THR-031` through thirty-six `CTL-UT-*` controls and explicit intake, content, connector, AI, retrieval, MCP, tool, build, trust-claim, and terminal-disposition states.

Successful parsing, scanning, synchronization, retrieval, generation, tool execution, building, or testing creates bounded evidence only. It cannot create identity, permission, Chronicle truth, clinical truth, recipient authority, tool authority, or production approval.

### 5.7 — encryption, key management, secrets, and environment isolation

The completed internal baseline consists of:

- the [Encryption and Key-Management Baseline](encryption-and-key-management-baseline.md);
- the [Secret-Management Policy](secret-management-policy.md);
- the [Environment Isolation and Private-Origin Design](environment-isolation-and-private-origin-design.md); and
- the [Encryption, Key, Secret, and Environment Control Register](encryption-key-secret-environment-control-register.md).

Together they refine `THR-012`, `THR-016`, and `THR-028` through `THR-035` through forty-nine stable `CTL-KSE-*` controls.

The baseline requires minimization before encryption, authenticated transport, protected structured and object storage, queue and temporary-state protection, separate receipt and audit evidence, scoped export protection, encrypted and isolated backups, envelope key hierarchy, environment and purpose key separation, workload-mediated cryptographic operations, key lifecycle and recovery, bounded cryptographic-erasure claims, cryptographic agility, secret inventory and short-lived issuance, no confidential client secrets, CI and preview isolation, secret scanning and exposure response, trusted environment identity, synthetic-only non-production, private origins, network and egress controls, immutable artifact promotion, isolated analytics, research, administration, and recovery, teardown, and founder- and provider-independent continuity.

Encryption, possession of a key or secret, network location, provider ownership, successful deployment, and cryptographic integrity do not create identity, permission, Chronicle truth, clinical truth, recipient authority, deletion proof, or institutional legitimacy.

No production encryption service, key hierarchy, key custodian, secret manager, workload-identity provider, private product origin, protected-data environment, database, object store, queue, cache, analytics service, research environment, administrative service, backup system, or production deployment pipeline is selected, authorized, or represented as deployed. Independent security, privacy, cryptography, infrastructure, legal, and records-governance review remains pending.

### 5.8 — availability, backup, restore, incident response, audit retention, and deletion verification — next

The next workstream will define service and domain availability, graceful degradation, manual fallback, backup and restore evidence, ransomware and destructive-operator response, incident classification and notification, protected-audit retention, deletion verification across controlled copies, and honest restoration and residual-harm procedures.

### 5.9 — synthetic abuse cases and tabletop exercises

Public synthetic scenarios will test the design boundary. They will not prove that production controls exist.

### 5.10 — cross-contract review and completion record

The final workstream will reconcile every accepted deliverable, acceptance criterion, control status, residual risk, specialist hold point, owner, revalidation trigger, and public capability claim.

## Artifact rules

Every material security artifact must identify:

- status and authority
- scope and explicit non-scope
- assets, actors, and trust boundaries covered
- constitutional rights and domain invariants protected
- assumptions and unresolved dependencies
- required, designed, tested, reviewed, deployed, deferred, or not-applicable controls
- residual risks and uncertainty
- owner or responsible role
- review and revalidation trigger
- public-information and specialist-review boundaries

## Control-status truth

Use the vocabulary in [`control-status-and-risk-vocabulary.md`](control-status-and-risk-vocabulary.md).

A control must not be described as deployed because it is documented, included in a diagram, tested with synthetic data, accepted by the founding steward, enabled by a provider default, or available from a possible vendor.

## Public-information boundary

Only PUBLIC information and synthetic scenarios belong in this directory.

Do not publish:

- credentials, secrets, keys, tokens, private endpoints, or operational configuration
- provider account identifiers, private origins, network maps, or administrative access paths
- real vulnerability reproduction details that enable exploitation
- personal or health information
- private logs, screenshots, exports, correspondence, or support records
- security reports or incident evidence
- recovery material or unredacted control evidence
- information that would materially help evade a control

Protected evidence belongs in an authorized private system. Public artifacts may contain reviewed, minimized institutional derivatives.

## Review boundary

The project currently has no named independent security reviewer. Founding-steward acceptance is accountable internal review, not independent specialist review.

Until a qualified reviewer is named or a separately reviewed temporary exception is accepted, Sprint 5 artifacts must remain explicit that they are internal architecture and design baselines rather than production security certification.

## Navigation

- [Sprint 5 Plan](../roadmap/sprint-5-plan.md)
- [Asset, Authority, Data-Flow, and Trust-Boundary Map](asset-and-trust-boundary-map.md)
- [Security Asset, Authority, and Actor Register](asset-authority-register.md)
- [Security Data-Flow and Trust-Boundary Crossing Register](data-flow-boundary-register.md)
- [Identity, Account, Session, Tenant, and Authority Model](identity-account-session-tenant-model.md)
- [Identity, Session, Isolation, and Authority Register](identity-and-authority-register.md)
- [Account Recovery and Emergency Access Model](account-recovery-and-emergency-access-model.md)
- [Integrated Security and Privacy Threat Model](integrated-threat-model.md)
- [Threat Control Objective Register](threat-control-objective-register.md)
- [Threat and Residual-Risk Register](threat-and-residual-risk-register.md)
- [Living Chronicle Security Model](living-chronicle-security-model.md)
- [Living Chronicle Security Control Register](living-chronicle-control-register.md)
- [Living Chronicle Dependency and Lifecycle Security Register](living-chronicle-dependency-lifecycle-register.md)
- [House of Keys Enforcement Security Model](house-of-keys-enforcement-security-model.md)
- [House of Keys Enforcement Control Register](house-of-keys-control-register.md)
- [House of Keys Decision and Execution Lifecycle Register](house-of-keys-decision-execution-lifecycle-register.md)
- [House of Keys Enforcement Review Checklist](house-of-keys-enforcement-review-checklist.md)
- [Untrusted Input and Agent Isolation Model](untrusted-input-and-agent-isolation-model.md)
- [Untrusted Input Control Register](untrusted-input-control-register.md)
- [Untrusted Input Processing-State Register](untrusted-input-processing-state-register.md)
- [Encryption and Key-Management Baseline](encryption-and-key-management-baseline.md)
- [Secret-Management Policy](secret-management-policy.md)
- [Environment Isolation and Private-Origin Design](environment-isolation-and-private-origin-design.md)
- [Encryption, Key, Secret, and Environment Control Register](encryption-key-secret-environment-control-register.md)
- [Control Status and Risk Vocabulary](control-status-and-risk-vocabulary.md)
- [Security Policy](../../SECURITY.md)
- [Pre-Sprint 5 Alignment Review](../roadmap/pre-sprint-5-alignment-review.md)
- [Architecture Foundation](../frozen/architecture.md)
- [Living Chronicle Architecture](../architecture/README.md#living-chronicle-architecture)
- [House of Keys Architecture](../architecture/README.md#house-of-keys-architecture)
- [Institutional Immune System](../governance/institutional-immune-system.md)
