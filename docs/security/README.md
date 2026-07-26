# Security Architecture

[Repository home](../../README.md) · [Security policy](../../SECURITY.md) · [Current status](../roadmap/current-status.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md) · [Publication and confidentiality](../policies/publication-and-confidentiality.md)

**Status:** Sprint 5 working area — architecture, policy, procedure, public synthetic evidence, and tabletop records only  
**Tracking issue:** [#35](https://github.com/finalboss-tom/calypsos-promise/issues/35)  
**Production boundary:** No production health-data, account, agent, connector, research, encryption, key-custody, monitoring, or administrative runtime is authorized or represented as deployed

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

### Scope, assets, actors, and trust boundaries

The [Asset, Authority, Data-Flow, and Trust-Boundary Map](asset-and-trust-boundary-map.md) establishes the initial working scope across public surfaces, identity, Chronicle, sources, House of Keys, execution, receipts, audit, AI, MCP, connectors, research, environments, supply chain, and recovery.

### Integrated threat and residual-risk model

Threat records cover malicious action, accidental failure, coercion, inference, re-identification, insiders, provider failure, compromised clients, supply chain, institutional capture, and incorrect automation.

### Living Chronicle security

The Chronicle model covers sources, provenance, transformations, inferences, corrections, custody, export, deletion, backup, restoration, and cross-user isolation.

### House of Keys enforcement security

The permission model covers authority, scope, purpose, recipient, lifecycle, revocation freshness, capacity, execution, receipts, audit, and downstream invalidation.

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

## Initial navigation

- [Sprint 5 Plan](../roadmap/sprint-5-plan.md)
- [Asset, Authority, Data-Flow, and Trust-Boundary Map](asset-and-trust-boundary-map.md)
- [Control Status and Risk Vocabulary](control-status-and-risk-vocabulary.md)
- [Security Policy](../../SECURITY.md)
- [Pre-Sprint 5 Alignment Review](../roadmap/pre-sprint-5-alignment-review.md)
- [Architecture Foundation](../frozen/architecture.md)
- [Living Chronicle Architecture](../architecture/README.md#living-chronicle-architecture)
- [House of Keys Architecture](../architecture/README.md#house-of-keys-architecture)
- [Institutional Immune System](../governance/institutional-immune-system.md)
