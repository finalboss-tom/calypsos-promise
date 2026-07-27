# Sprint 5 Completion Record — Threat Model and Security Baseline

[Current status](current-status.md) · [Sprint 5 plan](sprint-5-plan.md) · [Security architecture](../security/README.md) · [Cross-contract reconciliation](../security/sprint-5-cross-contract-reconciliation.md) · [Specialist holdpoints](../security/sprint-5-specialist-holdpoint-and-evidence-register.md)

- **Status:** COMPLETE AND MERGED — accepted through PR #36 and present on `main`
- **Tracking issue:** [#35](https://github.com/finalboss-tom/calypsos-promise/issues/35)
- **Pull request:** [#36](https://github.com/finalboss-tom/calypsos-promise/pull/36)
- **Squash commit:** `4d09e8fc5b81f354c4568f97794fd9533ec68048`
- **Entry baseline:** `main` at `d135b2fdf79a3c2cca9bf7cad275fc454d22fa6d`
- **Scope:** architecture, policy, procedures, public synthetic scenarios, founding-steward design tabletops, control status, residual risk, holdpoints, and documentation only

## Completion decision

Sprint 5 produced and merged a coherent threat-model and security baseline for the accepted goal:

> Define defenses before connecting real health data or agents.

The accepted architecture, policy, procedure, risk, control, and synthetic exercise scope is complete and present on `main` through PR #36.

This record does not claim production readiness, security certification, implementation or deployment of private-data controls, legal approval, privacy certification, clinical approval, research approval, accessibility certification, operational readiness, or independent specialist review.

The tracking issue and pull request are closed through the accepted squash merge. Closure records completion of the design sprint; it does not promote designed controls to implemented, deployed, independently reviewed, or operationally verified status.

## Review authority and precedence

The completion review used this order:

1. frozen Product Constitution, Architecture Foundation, Gameplay Foundation, and institutional commitments;
2. accepted decisions, progressive decentralization, and the Institutional Immune System;
3. security, publication, contribution, development, and validation policies;
4. incentive, Living Chronicle, and House of Keys contracts;
5. the accepted Sprint 5 goal, deliverables, and acceptance criteria;
6. Sprint 5 threat, control, lifecycle, procedure, and exercise evidence;
7. the [cross-contract reconciliation](../security/sprint-5-cross-contract-reconciliation.md);
8. the [specialist holdpoint register](../security/sprint-5-specialist-holdpoint-and-evidence-register.md); and
9. this completion record.

A lower layer may implement or test a higher-authority requirement. It may not silently weaken it.

## Accepted deliverable mapping

### 1. Asset and trust-boundary map

**Status:** met at internal architecture level.

Evidence:

- [Asset and Trust-Boundary Map](../security/asset-and-trust-boundary-map.md)
- [Asset, Authority, and Actor Register](../security/asset-authority-register.md)
- [Data-Flow Boundary Register](../security/data-flow-boundary-register.md)

The baseline defines nine authority domains, fourteen actor classes, thirteen trust zones, twenty-three asset classes, eighteen boundary crossings, and twelve principal flows.

### 2. Threat model covering accounts, connectors, uploads, AI, MCP, insiders, supply chain, and research actors

**Status:** met at internal architecture and design-tabletop level.

Evidence:

- [Integrated Threat Model](../security/integrated-threat-model.md)
- [Threat Control Objective Register](../security/threat-control-objective-register.md)
- [Threat and Residual-Risk Register](../security/threat-and-residual-risk-register.md)
- domain-specific control registers and lifecycle models under `docs/security`
- [Synthetic Abuse-Case Register](../security/synthetic-abuse-case-register.md)
- [Tabletop Records 1–8](../security/tabletop-exercise-records-1.md)
- [Tabletop Records 9–15](../security/tabletop-exercise-records-2.md)

The model defines forty-six stable `THR-*` threats, twenty-eight reusable `CTL-TM-*` control objectives, and forty-six stable `RSK-*` residual risks.

### 3. Encryption and key-management baseline

**Status:** met at provider-independent design level.

Evidence:

- [Encryption and Key-Management Baseline](../security/encryption-and-key-management-baseline.md)
- [Encryption, Key, Secret, and Environment Control Register](../security/encryption-key-secret-environment-control-register.md)

The baseline defines encryption boundaries, envelope hierarchy, purpose and environment separation, mediated operations, inventory, rotation, revocation, compromise containment, recovery, destruction, cryptographic agility, bounded cryptographic-erasure claims, and provider replacement without selecting a production provider or algorithm suite.

### 4. Secret-management policy

**Status:** met at policy and design level.

Evidence:

- [Secret-Management Policy](../security/secret-management-policy.md)
- [Encryption, Key, Secret, and Environment Control Register](../security/encryption-key-secret-environment-control-register.md)

The policy covers creation, approved storage, workload delivery, inventory, access, rotation, revocation, decommissioning, emergency use, scanning, indirect exposure paths, redaction, CI and preview isolation, and incident response.

### 5. Environment-isolation design

**Status:** met at provider-independent design level.

Evidence:

- [Environment Isolation and Private-Origin Design](../security/environment-isolation-and-private-origin-design.md)
- [Encryption, Key, Secret, and Environment Control Register](../security/encryption-key-secret-environment-control-register.md)
- [Asset and Trust-Boundary Map](../security/asset-and-trust-boundary-map.md)

The design separates public and synthetic-only environments from future private product, administration, analytics, research, security, and recovery environments. No private origin, database, object store, queue, analytics service, or administrative service requires public exposure.

### 6. Account-recovery design

**Status:** met at provider-independent architecture level.

Evidence:

- [Identity, Account, Session, Tenant, and Authority Model](../security/identity-account-session-tenant-model.md)
- [Identity and Authority Register](../security/identity-and-authority-register.md)
- [Account Recovery and Emergency Access Model](../security/account-recovery-and-emergency-access-model.md)

Recovery restores bounded account access rather than silently expanding Chronicle, House of Keys, representative, legal, or research authority. Production identity proofing and representative-authority classes remain specialist holdpoints.

### 7. Audit-retention and incident-response plans

**Status:** met at procedure and architecture level.

Evidence:

- [Incident Response and Protected Audit Retention Plan](../security/incident-response-and-audit-retention-plan.md)
- [Resilience, Incident, Audit, and Deletion Control Register](../security/resilience-incident-deletion-control-register.md)
- [Security Policy](../../SECURITY.md)

The plan covers private intake, qualitative consequence analysis, containment, eradication or clean rebuild, domain correction, accessible notification, safe public derivatives, restoration, residual harm, minimized audit schemas, separate access authority, integrity, correction, explicit retention, narrow holds, expiry, and deletion.

### 8. Deletion-verification procedure

**Status:** met at procedure and architecture level.

Evidence:

- [Deletion Verification Procedure](../security/deletion-verification-procedure.md)
- [Living Chronicle Dependency and Lifecycle Register](../security/living-chronicle-dependency-lifecycle-register.md)
- [Resilience, Incident, Audit, and Deletion Control Register](../security/resilience-incident-deletion-control-register.md)

The procedure requires verified authority, exact scope, a complete target and dependency graph, regeneration prevention, target-specific execution and evidence, backup and external-recipient uncertainty, non-sensitive tombstones, bounded completion language, challenge, correction, and restoration reconciliation.

### 9. Tabletop exercises

**Status:** met at founding-steward design-tabletop level.

Evidence:

- [Synthetic Abuse-Case and Tabletop Method](../security/synthetic-abuse-case-and-tabletop-method.md)
- [Synthetic Abuse-Case Register](../security/synthetic-abuse-case-register.md)
- [Tabletop Records 1–8](../security/tabletop-exercise-records-1.md)
- [Tabletop Records 9–15](../security/tabletop-exercise-records-2.md)
- [Synthetic Evidence Gap Register](../security/synthetic-evidence-gap-and-follow-up-register.md)

Fifteen stable `SYN-*` scenarios and fifteen paired `TTX-*` records cover every scenario class required by the Sprint 5 plan. The exercises record assumptions, simulated roles, injects, decisions, evidence, gaps, containment, restoration, residual harm, owner roles, and revalidation triggers.

The evidence level is founding-steward design tabletop. It is not multi-party, implementation, operational, provider, or independent evidence.

## Accepted acceptance-criterion mapping

### Cross-user leakage and compromised-agent scenarios have explicit controls

**Status:** met at architecture and founding-steward design-tabletop level.

Cross-user and cross-subject controls include server-derived resource context, layered tenant isolation, dependent-credential containment, retrieval and queue context preservation, exact export and restore binding, notification, challenge, and restoration.

Compromised-agent controls include server-owned tool registries, bounded invocation envelopes, exact resource and action binding, external authority enforcement, prompt and data separation, retrieval isolation, short-lived credentials, cancellation, receipt reconciliation, and compromise containment.

Evidence includes `THR-001`, `THR-002`, `THR-023` through `THR-027`, `THR-031`, corresponding `CTL-TM-*`, `CTL-ID-*`, `CTL-UT-*`, and `CTL-HK-*` controls, plus `SYN-001`, `SYN-002`, `TTX-001`, and `TTX-002`.

Implementation, operational, multi-party, and independent evidence remain pending.

### No private origin, database, or administrative service requires public exposure

**Status:** met at architecture level.

The trust map and environment design keep future private edge, domain application, structured storage, source custody, queues, AI and retrieval, analytics and research, administration and audit, and backup and recovery in private zones. The public site requires no direct public database, queue, object store, analytics service, administrative service, or private provider endpoint.

### Security-disclosure workflow is published

**Status:** met.

`SECURITY.md` provides a private reporting route, public-report prohibitions, synthetic-only reproduction requirements, containment sequence, scope priorities, safe-harbor intent, supported-release boundary, and production-data boundary.

A dedicated security address and production incident organization remain future implementation work rather than missing Sprint 5 evidence.

## Workstream completion mapping

| Workstream | Completion evidence | Status |
| --- | --- | --- |
| 5.1 | Asset, authority, actor, zone, crossing, and flow records | Complete internally |
| 5.2 | Identity, session, tenant, operator, recovery, and emergency models | Complete internally |
| 5.3 | Integrated threats, controls, residual risks, and current dispositions | Complete internally |
| 5.4 | Chronicle source, provenance, inference, export, deletion, custody, and restore controls | Complete internally |
| 5.5 | House of Keys freshness, execution, capacity, receipt, audit, and reconciliation controls | Complete internally |
| 5.6 | Upload, connector, AI, retrieval, MCP, dependency, and untrusted-input isolation | Complete internally |
| 5.7 | Encryption, keys, secrets, environments, private origins, and evidence rules | Complete internally |
| 5.8 | Availability, backups, restoration, incidents, audit retention, and deletion verification | Complete internally |
| 5.9 | Fifteen synthetic abuse cases, fifteen design tabletops, and stable gap records | Complete at founding-steward design-tabletop level |
| 5.10 | Cross-contract review, status truth, public-claim remediation, holdpoints, and this record | Complete and merged |

## Control and evidence status

Sprint 5 registers 236 stable controls or control objectives across these families:

- fourteen `CTL-ID-*` identity controls;
- twenty-eight `CTL-TM-*` integrated threat-control objectives;
- twenty-eight `CTL-LC-*` Living Chronicle controls;
- thirty-six `CTL-HK-*` House of Keys controls;
- thirty-six `CTL-UT-*` untrusted-input controls;
- forty-nine `CTL-KSE-*` encryption, key, secret, and environment controls; and
- forty-five `CTL-RID-*` resilience, incident, audit, and deletion controls.

The truthful status is:

- **required:** established where higher-authority requirements, threats, contracts, or later production gates demand the control;
- **designed:** established for the accepted Sprint 5 architecture and procedure scope;
- **synthetic evidence:** present for the fifteen named design-tabletop scenario families and for earlier deterministic package fixtures where referenced;
- **independently reviewed:** not established for Sprint 5 because no named independent security reviewer is recorded;
- **implemented, deployed, or operationally verified for production private-data scope:** not established;
- **limited current public implementation evidence:** present only for the bounded repository checks, public site, restrictive public-site headers, purpose-limited signup adapter, repository ignore rules, and published disclosure workflow in their stated public scope.

A control is not promoted to a higher status because CI passes, a vendor supports a feature, a design is comprehensive, or a founding-steward tabletop selected a coherent response.