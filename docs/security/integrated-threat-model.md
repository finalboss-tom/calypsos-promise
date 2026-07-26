# Integrated Security and Privacy Threat Model

[Security architecture](README.md) · [Threat and residual-risk register](threat-and-residual-risk-register.md) · [Threat control objectives](threat-control-objective-register.md) · [Asset and authority register](asset-authority-register.md) · [Identity and authority register](identity-and-authority-register.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward review complete; independent security and privacy review pending  
**Workstream:** 5.3  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only scope  
**Production boundary:** design and risk record only; no production health-data, account, agent, connector, research, analytics, security-operations, encryption, or administrative runtime is authorized or represented as deployed

## Purpose

This model connects the assets, authorities, actors, identities, trust zones, boundary crossings, sessions, recovery paths, operator capabilities, and emergency powers established in workstreams 5.1 and 5.2 to explicit security and privacy threats, control objectives, residual risks, owners, and revalidation triggers.

It prevents six failures:

1. treating confidentiality as the only security property;
2. treating malicious outsiders as the only threat actors;
3. treating a documented control as implemented or effective;
4. using a single numerical risk score to hide concentrated, irreversible, or minority harm;
5. accepting one control without examining how it can weaken refusal, correction, export, deletion, accessibility, or non-AI fallback; and
6. allowing unresolved risk to disappear between architecture, implementation, deployment, incident response, and institutional review.

## Decision summary

The Sprint 5 threat model uses stable records for three distinct concepts:

- `THR-*` identifies a threat, abuse case, or failure mode;
- `CTL-TM-*` identifies a provider-independent control objective; and
- `RSK-*` identifies the residual risk that remains after currently documented controls and evidence are considered.

A threat may affect many assets and boundaries. A control may mitigate many threats. A residual risk remains visible until evidence supports a bounded disposition or a later revision supersedes it.

The model does not claim that a control is implemented because its objective is designed. At this revision:

- control objectives are **required** and **designed at architecture level**;
- selected deterministic House of Keys and repository controls have synthetic or implementation evidence already identified in their owning artifacts;
- production implementation and operational verification are absent;
- independent security and privacy review is absent; and
- production-facing residual risks remain mitigation-required gates.

## Authority and conflict order

This model is subordinate to:

1. the Product Constitution, Vision, Architecture Foundation, and Gameplay Foundation;
2. accepted decision records, including progressive decentralization and the Institutional Immune System;
3. `SECURITY.md`, publication and confidentiality policy, contributor policy, and minimum viable validation;
4. Living Chronicle and House of Keys architecture and contracts;
5. the accepted Sprint 5 scope;
6. the 5.1 asset and boundary records; and
7. the 5.2 identity, session, isolation, recovery, operator, and emergency records.

A threat or control record may reveal that a higher-layer design must be revised. It may not silently override that design.

## Protected properties

Every threat review considers these properties together:

- confidentiality and unauthorized disclosure;
- integrity and unauthorized or misleading change;
- availability and recoverability;
- identity, authority, purpose, recipient, actor, and scope correctness;
- cross-user, cross-subject, cross-resource, and cross-environment isolation;
- source, provenance, correction, and uncertainty integrity;
- minimization, retention, deletion, and restoration;
- inference, linkage, membership, metadata, and re-identification exposure;
- meaningful refusal, withdrawal, correction, appeal, exit, and non-punitive return;
- accessibility and non-AI fallback;
- provider, operator, and founder replaceability;
- truthful control and capability status; and
- institutional challenge, containment, rollback, restoration, and revalidation.

A control is incomplete when it improves one property by silently weakening another.

## Threat and failure actors

The model includes deliberate and accidental behavior by:

- unauthenticated outsiders;
- authenticated but unauthorized account actors;
- compromised accounts, sessions, devices, clients, agents, or services;
- abusive requesters, recipients, processors, or research actors;
- malicious or defective connectors and external sources;
- compromised AI providers, models, retrieval systems, MCP clients, or tools;
- curious, coerced, careless, malicious, or compromised operators and maintainers;
- compromised dependencies, packages, build actions, artifacts, deployment systems, or providers;
- destructive insiders, ransomware, provider outages, regional failures, and data corruption;
- governance actors, founders, funders, or institutions attempting authority expansion;
- incorrect but well-intentioned automation;
- confusing, inaccessible, coercive, or misleading interface design; and
- legitimate actors operating with stale, incomplete, conflicting, or misunderstood authority.

No actor is trusted merely because it is authenticated, internal, contracted, popular, expert, urgent, or operated by Calypso’s Promise.

## Modeling method

Each material threat record identifies:

1. the assets and authority domains affected;
2. the actor or failure source;
3. preconditions and entry points;
4. trust zones, boundary crossings, sessions, or flows involved;
5. the rights, security properties, and invariants affected;
6. preventive and limiting controls;
7. detective and evidentiary controls;
8. containment and cancellation controls;
9. recovery and restorative controls;
10. current evidence and control status;
11. residual risk and uncertainty;
12. accountable owner or future owner role;
13. current disposition; and
14. revalidation trigger.

The [Threat and Residual-Risk Register](threat-and-residual-risk-register.md) is the normalized working record. The [Threat Control Objective Register](threat-control-objective-register.md) defines reusable control objectives.

## Qualitative prioritization

The model does not use an aggregate numerical score. Each residual risk is assigned one or more gate labels:

- **PRODUCTION-BLOCKING** — the capability must not process production personal data or authority until required controls and evidence exist;
- **PILOT-BLOCKING** — the capability must not enter a real-user or external-recipient pilot until bounded controls, exercises, and review exist;
- **CURRENT-BOUNDED-FLOW** — a risk exists in a currently operating public or purpose-limited flow and requires a named owner and bounded handling now;
- **INSTITUTIONAL-GATE** — the risk concerns founder independence, governance, public claims, or authority transfer and must be resolved at the applicable institutional gate;
- **SPECIALIST-HOLDPOINT** — security, privacy, accessibility, legal, clinical, research, or another qualified review is required before a claim or implementation decision; and
- **MONITOR-AND-REVALIDATE** — the risk is bounded for the current architecture scope but must be revisited when its trigger occurs.

Prioritization also records affectedness, concentration of harm, persistence, reversibility, detectability, downstream propagation, evidence quality, and institutional-capture potential.

## Principal attack and failure chains

### Cross-user or cross-subject leakage

A caller, client, tool, queue message, cache key, repository method, object reference, retrieval query, export job, audit query, backup restore, or analytics job supplies or loses resource context and accesses another person’s asset.

Required control chain:

1. authenticated actor and session context;
2. server-derived active account-access links;
3. exact controlled-resource and subject context;
4. action-specific authority and policy evaluation;
5. isolation at every storage and processing layer;
6. no default or caller-selected tenant;
7. decision and context freshness through asynchronous execution;
8. minimized receipt and protected audit evidence;
9. immediate containment and affected-person restoration; and
10. synthetic cross-user tests before any real-user pilot.

Primary records: `THR-001`, `THR-002`, `CTL-TM-001`, `CTL-TM-010`, `CTL-ID-002`, and `CTL-ID-005`.

### Account or recovery takeover

An attacker steals a credential or session, abuses weak recovery evidence, intercepts notifications, exploits operator discretion, or converts a recovered account into broad Chronicle control.

Required control chain:

1. replay-resistant authentication appropriate to consequence;
2. explicit session lifecycle and revocation;
3. step-up for high-consequence actions;
4. recovery case identity and evidence threshold;
5. no health or intimate-history proofing;
6. restricted post-recovery session;
7. independent-channel notification where safe;
8. cooling, contest, and rollback paths;
9. no automatic restoration of removed links or withdrawn grants; and
10. restoration and residual-harm evidence after abuse.

Primary records: `THR-003` through `THR-007`, `CTL-TM-002`, `CTL-TM-003`, and `CTL-ID-003` through `CTL-ID-008`.

### Stale permission or authority execution

A previously valid decision, grant, capacity fact, session, delegation, connector authorization, queue job, cache entry, or agent credential is reused after withdrawal, expiry, correction, exhaustion, compromise, or authority change.

Required control chain:

1. immutable authority and decision identity;
2. explicit freshness and execution deadlines;
3. re-evaluation before the release boundary;
4. authority-change invalidation through caches and queues;
5. cancellation and dead-letter behavior;
6. atomic bounded-use consumption;
7. idempotency and duplicate protection;
8. receipt and protected audit separation; and
9. downstream correction or stop instructions where possible.

Primary records: `THR-017` through `THR-020`, `THR-031`, `CTL-TM-009` through `CTL-TM-012`, and `CTL-ID-012`.

### Compromised agent, MCP client, or AI-assisted flow

An agent, MCP client, retrieved document, prompt, tool result, model output, or provider attempts to choose a tenant, expand tools, inject instructions, exfiltrate context, create permission, or write authoritative records.

Required control chain:

1. separate authenticated agent or client identity;
2. bounded capability token or server-resolved tool access;
3. no arbitrary SQL, filesystem, object, tenant, or policy tools;
4. exact House of Keys evaluation for protected operations;
5. minimized authorized context;
6. untrusted-content and prompt-injection isolation;
7. strict input and output schemas;
8. deterministic validation or player confirmation;
9. provider egress, retention, and training restrictions;
10. revocation of agent credentials and dependent sessions;
11. person-visible receipt for consequential access; and
12. synthetic compromised-agent scenarios before real data or remote agents.

Primary records: `THR-022` through `THR-026`, `CTL-TM-013` through `CTL-TM-016`, `CTL-ID-002`, `CTL-ID-005`, and `CTL-ID-012`.

### Operator or emergency-authority abuse

An operator, support actor, responder, maintainer, founder, or emergency declarer obtains broad access, silently impersonates a person, browses raw records, changes permission, suppresses evidence, or retains authority after the incident.

Required control chain:

1. separate operator identity and session;
2. private origin;
3. named least-capability interface;
4. no shared accounts, silent impersonation, arbitrary SQL, or object browsing;
5. separation of duties where consequence requires it;
6. expiring emergency record with exact purpose and scope;
7. stronger authentication and automatic expiry;
8. protected evidence and post-action review;
9. person notification where safe;
10. restoration and residual-harm record; and
11. founder- and vendor-independent continuity.

Primary records: `THR-008` through `THR-010`, `CTL-TM-004`, `CTL-TM-005`, `CTL-ID-009` through `CTL-ID-013`.

### Malicious source, upload, or connector

A document, image, archive, parser input, connector payload, cursor, or source system exploits processing, injects instructions, substitutes evidence, replays state, or corrupts canonical records.

Required control chain:

1. inbound content and connectors remain untrusted;
2. file type, size, structure, archive, and decompression limits;
3. quarantine and parser isolation;
4. immutable source versions and integrity evidence;
5. exact connector identity, scopes, cursor, replay, and revocation;
6. no automatic canonical confirmation from import success;
7. strict derived-output schemas and provenance;
8. deterministic validation or person confirmation; and
9. deletion, correction, and future-sync stop behavior.

Primary records: `THR-012`, `THR-015`, `THR-023`, `THR-027`, `CTL-TM-006`, `CTL-TM-007`, and `CTL-TM-016`.

### Supply-chain, secret, and environment compromise

A dependency, action, build, artifact, preview, log, secret, certificate, cache, deployment identity, or environment boundary leaks protected data or changes code and configuration.

Required control chain:

1. public and synthetic information only in contributor and public CI paths;
2. minimal workflow and token permissions;
3. reviewed and pinned dependencies and actions where justified;
4. build and artifact provenance;
5. secret scanning and environment-specific secret injection;
6. no production credentials in previews or public logs;
7. separate service and deployment identities;
8. environment isolation and cryptographic separation;
9. rapid rotation and containment; and
10. rollback and revalidation.

Primary records: `THR-028` through `THR-030`, `CTL-TM-017` through `CTL-TM-019`.

### Backup, ransomware, and restoration failure

A destructive actor, ransomware event, provider failure, corrupt backup, stale snapshot, or unsafe restore causes loss, prolonged unavailability, cross-environment contamination, or resurrection of deleted, corrected, withdrawn, or invalidated state.

Required control chain:

1. isolated and encrypted backups;
2. inventory, retention, key separation, and access evidence;
3. tested point-in-time restore;
4. correction, revocation, deletion, and tombstone replay;
5. isolated reconciliation before activation;
6. read-only or flow-stop containment;
7. graceful degradation and non-AI fallback;
8. restore evidence and unresolved-gap record; and
9. no claim of deletion beyond the bounded evidence.

Primary records: `THR-032` through `THR-035`, `CTL-TM-020`, `CTL-TM-021`, and later workstream 5.8 procedures.

### Research, analytics, inference, and re-identification expansion

A study, analytics task, recipient, dataset, output, model, or governance actor broadens purpose, links datasets, infers sensitive attributes, re-identifies people, retains data, or publishes unsafe outputs.

Required control chain:

1. personal-core and research authority remain separate;
2. study-specific purpose, recipient, scope, duration, and withdrawal rules;
3. isolated dataset and environment;
4. minimization and linkage controls;
5. no unrestricted raw-data replica;
6. output disclosure and re-identification review;
7. withdrawal and retention behavior;
8. receipt and protected audit evidence;
9. research-governance and specialist review; and
10. no product reward, eligibility, or governance benefit for participation.

Primary records: `THR-014`, `THR-036`, `THR-037`, `THR-040`, `CTL-TM-008`, `CTL-TM-022`, and `CTL-TM-025`.

## Control strategy

The threat model requires layered controls across these classes:

- **preventive** — exact identity, authority, isolation, validation, minimization, and purpose boundaries;
- **detective** — integrity checks, anomaly evidence, receipt gaps, audit events, challenge paths, and safe monitoring;
- **limiting** — time, scope, recipient, action, environment, retention, and capability bounds;
- **containment** — session revocation, flow stop, service isolation, upload quarantine, secret rotation, read-only mode, and recovery freeze;
- **recovery** — credential replacement, account access recovery, service recovery, backup restoration, provider replacement, and institutional continuity;
- **restorative** — correction, access restoration, downstream notification, receipt correction, deletion reprocessing, and residual-harm records;
- **corrective** — code, configuration, policy, contract, provider, training, and governance changes; and
- **informational** — direct explanations, accessible notices, person-visible receipts, uncertainty, and truthful control status.

No informational control substitutes for enforcement where enforcement is required.

## Residual-risk rules

A residual-risk record must state:

- what can still go wrong;
- who or what remains exposed;
- why current controls and evidence are insufficient;
- whether the risk is concentrated, persistent, irreversible, or hard to detect;
- what gate it blocks;
- which later artifact, implementation, exercise, or review can reduce it;
- the accountable owner or future role; and
- the revalidation trigger.

A production-blocking risk cannot be accepted merely because the system has not yet experienced an incident.

## Privacy-specific requirements

Privacy threats are modeled as security and authority threats rather than notice-only concerns. The register includes:

- overcollection and unnecessary disclosure;
- metadata and identity linkage;
- inference and membership leakage;
- re-identification and dataset joining;
- purpose expansion and recipient substitution;
- coercion and dark patterns;
- retention drift and backup resurrection;
- operator and audit surveillance;
- public issue, log, prompt, and artifact disclosure;
- inaccessible consent or recovery paths;
- disclosure or security compliance becoming a product condition; and
- public capability or control overclaim.

## Current acceptance-criteria result

The Sprint 5 criterion requiring explicit controls for cross-user leakage and compromised-agent scenarios is satisfied at the internal architecture level by:

- `THR-001`, `THR-002`, and linked identity and isolation controls for cross-user and cross-subject leakage;
- `THR-022` through `THR-026` and linked capability, prompt-isolation, provider-egress, and revocation controls for compromised agents and AI-assisted flows; and
- the reusable objectives `CTL-TM-001`, `CTL-TM-002`, `CTL-TM-010`, and `CTL-TM-013` through `CTL-TM-016`.

This means the controls are explicit and reviewable. It does not mean they are implemented, operationally effective, independently reviewed, or synthetically exercised. Those evidence gates remain required in workstreams 5.6 and 5.9 and later implementation reviews.

## Workstream 5.3 completion evidence

Workstream 5.3 is complete at the internal architecture level when:

- all required actor and failure classes are represented;
- threats reference the 5.1 assets, flows, boundaries, and authorities and the 5.2 identity controls;
- confidentiality, integrity, availability, authority, privacy, coercion, inference, re-identification, purpose expansion, and institutional capture are covered;
- every threat has preventive, detective, limiting, containment, recovery, restorative, or corrective considerations as applicable;
- reusable control objectives have stable IDs and truthful status;
- residual risks have stable IDs, owners, dispositions, gates, uncertainty, and revalidation triggers;
- cross-user leakage and compromised-agent controls are explicit;
- current public and purpose-limited flows have named current owners;
- production risks remain production-blocking rather than implicitly accepted; and
- independent review remains explicit as absent.

## Remaining gates

The integrated model is a cross-cutting baseline. Later workstreams must refine it rather than create disconnected threat lists:

- 5.4 adds Chronicle and source-specific control detail;
- 5.5 adds House of Keys decision, enforcement, receipt, and freshness detail;
- 5.6 adds upload, connector, AI, MCP, and supply-chain detail;
- 5.7 adds encryption, key, secret, and environment detail;
- 5.8 adds availability, incident, audit, retention, deletion, and restoration procedures;
- 5.9 provides synthetic abuse cases and tabletop evidence; and
- 5.10 reconciles control status, specialist findings, unresolved risk, and completion evidence.

Independent security and privacy review remains pending. A later change to an asset, actor, authority, identity, boundary, crossing, session, recovery class, operator capability, emergency capability, or principal flow must review and update the affected `THR-*`, `CTL-TM-*`, and `RSK-*` records.