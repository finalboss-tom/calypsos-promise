# Security Architecture

[Repository home](../../README.md) · [Security policy](../../SECURITY.md) · [Current status](../roadmap/current-status.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md) · [Publication and confidentiality](../policies/publication-and-confidentiality.md)

**Status:** Sprint 5 working area — workstreams 5.1–5.4 complete at the internal architecture level; 5.5 next  
**Tracking issue:** [#35](https://github.com/finalboss-tom/calypsos-promise/issues/35)  
**Production boundary:** No production health-data, account, agent, connector, research, encryption, key-custody, monitoring, or administrative runtime is authorized or represented as deployed  
**Threat baseline:** Forty-six threats, twenty-eight integrated control objectives, forty-six residual risks, and twenty-eight Chronicle-specific controls are registered; production-facing risks remain blocking

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
- public institutional records

No single database object, service, identity provider, model, operator, or audit log becomes the authority for all of these domains.

## Current workstreams

### Scope, assets, actors, data flows, and trust boundaries — 5.1 complete at internal baseline

The completed internal 5.1 baseline consists of:

- the [Asset, Authority, Data-Flow, and Trust-Boundary Map](asset-and-trust-boundary-map.md);
- the [Security Asset, Authority, and Actor Register](asset-authority-register.md); and
- the [Security Data-Flow and Trust-Boundary Crossing Register](data-flow-boundary-register.md).

Together they define stable IDs and obligations for nine authority domains, fourteen actor classes, thirteen trust zones, twenty-three asset classes, eighteen boundary crossings, and twelve principal flows. Independent security review remains pending.

### Identity, accounts, sessions, tenants, operators, recovery, and emergency authority — 5.2 complete at internal baseline

The completed internal 5.2 baseline consists of:

- the [Identity, Account, Session, Tenant, and Authority Model](identity-account-session-tenant-model.md);
- the [Identity, Session, Isolation, and Authority Register](identity-and-authority-register.md); and
- the [Account Recovery and Emergency Access Model](account-recovery-and-emergency-access-model.md).

Together they define separate identity domains, account-access links, authority profiles, session lifecycle, server-derived controlled-resource context, layered isolation, delegation and capacity, bounded operator capabilities, recovery classes, restricted post-recovery access, emergency capabilities, founder-independent continuity, and fourteen required identity controls. Independent security, privacy, accessibility, and legal review remains pending.

### Integrated security, privacy, threat, control, and residual-risk model — 5.3 complete at internal baseline

The completed internal 5.3 baseline consists of:

- the [Integrated Security and Privacy Threat Model](integrated-threat-model.md);
- the [Threat Control Objective Register](threat-control-objective-register.md); and
- the [Threat and Residual-Risk Register](threat-and-residual-risk-register.md).

Together they define stable `THR-*`, `CTL-TM-*`, and `RSK-*` records for forty-six threats, twenty-eight reusable control objectives, and forty-six residual risks across accounts, sessions, recovery, operators, emergencies, Chronicle, sources, House of Keys, execution, receipts, audit, uploads, AI, MCP, retrieval, connectors, secrets, environments, supply chain, queues, availability, backups, research, analytics, coercion, accessibility, public surfaces, institutional capture, and incorrect automation.

The cross-user leakage and compromised-agent Sprint acceptance criterion is satisfied at the internal architecture level because the scenarios now have explicit preventive, limiting, detective, containment, recovery, and restorative control objectives. Implementation, independent review, and synthetic exercise evidence remain pending.

### Living Chronicle source, provenance, inference, export, deletion, and custody security — 5.4 complete at internal baseline

The completed internal 5.4 baseline consists of:

- the [Living Chronicle Security Model](living-chronicle-security-model.md);
- the [Living Chronicle Security Control Register](living-chronicle-control-register.md); and
- the [Living Chronicle Dependency and Lifecycle Security Register](living-chronicle-dependency-lifecycle-register.md).

Together they refine `THR-011` through `THR-016` through twenty-eight stable `CTL-LC-*` controls and explicit dependency, source, custody, inference, export, deletion, and restoration outcomes.

The baseline requires explicit human confirmation, immutable source versions, version-bound locators, source/custody separation, narrow integrity claims, transformation and derivation provenance, visible inference classification, relationship-first correction, conflict and merge preservation, export manifests and omissions, exact deletion scope, minimized exceptions and tombstones, derivative invalidation, deletion-aware restoration, provider replacement, and truthful completion limitations.

No Chronicle persistence, source store, document processor, inference service, export service, deletion worker, custody migration, backup, restoration, or recipient-notification runtime is authorized or represented as deployed. Independent security, privacy, accessibility, clinical, legal, records-governance, and research review remains pending.

### House of Keys enforcement, freshness, lifecycle, receipt, and audit security — 5.5 next

The next workstream will refine permission, policy-decision, execution, release, bounded-use consumption, revocation freshness, receipt, and protected-audit threats without rewriting the integrated `THR-*`, `CTL-TM-*`, and `RSK-*` records.

### Untrusted input, AI, MCP, connectors, and supply chain

All imported content and external output are untrusted. Content cannot grant itself identity, permission, Chronicle truth, tool authority, or database access.

### Encryption, secrets, and environments

The baseline defines provider-independent encryption, key, secret, network, origin, and environment-isolation requirements without selecting or deploying a vendor.

### Recovery, incidents, audit, and deletion verification

The baseline covers backup and restore, ransomware, destructive operators, provider failure, incident response, protected audit evidence, deletion verification, restoration, and residual harm.

### Synthetic evidence and tabletop exercises

Public synthetic scenarios test the design boundary. They do not prove a production control exists.

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

A control must not be described as deployed because it is documented, included in a diagram, tested with synthetic data, accepted by the founding steward, or available from a possible vendor.

## Public-information boundary

Only PUBLIC information and synthetic scenarios belong in this directory.

Do not publish:

- credentials, secrets, keys, tokens, private endpoints, or operational configuration
- real vulnerability reproduction details that enable exploitation
- personal or health information
- private logs, screenshots, exports, correspondence, or support records
- security reports or incident evidence
- provider account identifiers or administrative access paths
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
- [Control Status and Risk Vocabulary](control-status-and-risk-vocabulary.md)
- [Security Policy](../../SECURITY.md)
- [Pre-Sprint 5 Alignment Review](../roadmap/pre-sprint-5-alignment-review.md)
- [Architecture Foundation](../frozen/architecture.md)
- [Living Chronicle Architecture](../architecture/README.md#living-chronicle-architecture)
- [House of Keys Architecture](../architecture/README.md#house-of-keys-architecture)
- [Institutional Immune System](../governance/institutional-immune-system.md)
