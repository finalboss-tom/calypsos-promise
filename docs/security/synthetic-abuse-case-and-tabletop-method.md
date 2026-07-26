# Synthetic Abuse-Case and Tabletop Exercise Method

[Security architecture](README.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md) · [Threat model](integrated-threat-model.md) · [Threat and residual-risk register](threat-and-residual-risk-register.md) · [Incident response plan](incident-response-and-audit-retention-plan.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal founding-steward design-tabletop review complete; independent specialist and operational exercises pending  
**Workstream:** 5.9  
**Revision:** 1  
**Information class:** PUBLIC architecture and synthetic-only evidence  
**Production boundary:** exercise method and synthetic evidence only; no production system, provider, account, health data, incident, credential, vulnerability reproduction, operational access path, or real-person record is used or represented

## Purpose

This document defines how Calypso’s Promise converts the Sprint 5 threat and control architecture into public, inspectable synthetic abuse cases and design-tabletop records.

The exercise set tests whether the documented architecture gives responsible roles enough information to:

- recognize a harmful or ambiguous condition;
- preserve person rights and authority boundaries;
- choose containment without silently expanding surveillance or operator power;
- restore useful service without restoring stale authority or deleted state;
- produce person-visible correction and notification where required;
- record residual harm and uncertainty honestly; and
- identify implementation, review, ownership, and evidence gaps before production work begins.

The exercises do not prove that any production control exists or works.

## Exercise type and review truth

The workstream uses **founding-steward design tabletops**.

For this revision:

- the founding steward is the accountable internal reviewer;
- future security, privacy, identity, Chronicle, House of Keys, execution, reliability, accessibility, legal, records-governance, research, communications, and provider roles are represented as simulated responsible roles;
- no production responder, provider, recipient, researcher, operator, affected person, or independent specialist participated;
- no live system, real credential, real user account, real health information, private report, exploit, provider console, backup, queue, model, connector, or recipient endpoint was accessed;
- decisions are architecture decisions and expected response decisions, not evidence of operational performance; and
- every missing implementation or independent-review dependency remains a gap rather than being converted into a passing result.

The exercise status vocabulary is:

| Status                     | Meaning                                                                                                        |
| -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `DESIGN-TABLETOP-COMPLETE` | The synthetic scenario was walked through against the current architecture and produced an accountable record. |
| `CONTROL-DESIGN-SUPPORTED` | The architecture contains an explicit control or response path for the inject.                                 |
| `CONTROL-EVIDENCE-MISSING` | The design exists, but implementation or effectiveness evidence does not.                                      |
| `DESIGN-GAP`               | The current architecture lacks sufficient detail or produces conflicting obligations.                          |
| `SPECIALIST-HOLDPOINT`     | Qualified external or independent judgment is required before implementation or production use.                |
| `PRODUCTION-BLOCKING`      | Production or pilot use remains prohibited until the named gaps are resolved and evidenced.                    |
| `REVALIDATION-REQUIRED`    | The scenario must be rerun after a named contract, provider, implementation, incident, or governance change.   |

## Public and synthetic-only rules

Every scenario and record must:

- use invented people, accounts, organizations, providers, devices, documents, identifiers, timestamps, payloads, grants, receipts, logs, and outcomes;
- avoid real provider configuration, exploit instructions, precise defensive thresholds, credentials, endpoints, network maps, or administrative access paths;
- avoid copying real incidents, reports, correspondence, screenshots, logs, or protected data;
- use only PUBLIC threat, control, state, and architecture references;
- preserve enough abstraction that the record is useful without becoming an exploitation guide;
- state when a response depends on private evidence that cannot be published; and
- treat public publication as effectively irreversible.

## Stable identifiers

- Synthetic abuse cases use `SYN-001` through `SYN-015`.
- Paired tabletop records use `TTX-001` through `TTX-015`.
- Follow-up gaps use `GAP-TTX-*` identifiers.
- Revisions preserve prior identifiers and link corrections rather than silently replacing exercise history.

## Required abuse-case fields

Every `SYN-*` record identifies:

1. title and required Sprint 5 scenario class;
2. affected threats and residual risks;
3. assets, actors, zones, crossings, and flows;
4. synthetic setup and preconditions;
5. attacker, failure, or misuse path at a safe abstraction level;
6. expected control objectives and control-family references;
7. expected person-visible outcomes;
8. containment and restoration boundaries;
9. evidence that would be needed from a future implementation;
10. residual harm and uncertainty;
11. responsible roles;
12. exercise frequency and revalidation triggers; and
13. production or specialist holdpoints.

## Required tabletop fields

Every `TTX-*` record contains:

- exercise status and date;
- paired `SYN-*` identifier;
- assumptions;
- actual participant and simulated responsible roles;
- opening condition;
- timed or ordered injects;
- decisions made;
- architecture evidence consulted;
- expected containment;
- expected eradication or correction;
- expected restoration;
- person notification, receipt, challenge, and accessibility behavior;
- gaps and unresolved conflicts;
- residual harm and uncertainty;
- follow-up owner;
- revalidation trigger; and
- truthful conclusion.

A record is incomplete when it omits any required field, even when the scenario appears straightforward.

## Exercise sequence

### 1. Establish the bounded world

The facilitator records:

- synthetic identities and controlled resources;
- exact environment and trust zones;
- which services are nominally available;
- current grants, sessions, connector state, source versions, receipts, deletion state, and recovery state;
- the information assumed known at the beginning; and
- facts intentionally withheld until later injects.

### 2. Inject without granting authority

A scenario inject may claim that a system, provider, operator, model, queue, client, recipient, or attacker has done something. That claim does not become domain truth merely because the facilitator states it.

Participants must identify which authority can establish:

- identity;
- Chronicle truth;
- source truth;
- permission and lifecycle state;
- decision freshness;
- execution and release outcome;
- receipt state;
- protected audit evidence;
- incident classification;
- deletion completion; and
- restoration readiness.

### 3. Require a decision record

For every material choice, the tabletop records:

- decision owner;
- facts used;
- facts missing or conflicting;
- affected people and rights;
- action selected;
- action deliberately not selected;
- containment radius;
- time or review boundary;
- evidence expected; and
- rollback, challenge, or correction path.

### 4. Test degraded and ambiguous states

At least one inject in every scenario must create uncertainty, such as:

- incomplete logs;
- conflicting provider evidence;
- a queued or in-flight operation;
- missing receipt delivery;
- uncertain downstream deletion;
- unavailable AI or connector service;
- ambiguous release outcome;
- stale backup state;
- compromised operator or service identity; or
- incomplete notification contact information.

Uncertainty must not be resolved by assuming the safest or most convenient narrative.

### 5. Restore rights before convenience

The exercise must test whether responders preserve or restore:

- refusal, withdrawal, correction, export, deletion, challenge, and recovery rights;
- accessible non-AI and manual paths;
- exact person and resource isolation;
- source and provenance integrity;
- receipt and correction history;
- deletion and tombstone state; and
- founder- and provider-independent continuity.

### 6. Record gaps without converting them into acceptance

A gap must identify:

- stable gap ID;
- affected scenario and controls;
- consequence if unresolved;
- disposition;
- owner role;
- evidence required for closure; and
- revalidation trigger.

The founding steward may accept an internal architecture baseline while leaving production-facing gaps explicitly blocking.

## Tabletop quality gates

A design tabletop passes this workstream only when:

- the scenario uses synthetic-only inputs;
- the required threat class is covered;
- the timeline includes ambiguity or degraded conditions;
- authority boundaries remain distinct;
- decisions are attributable;
- containment is narrower than the harm being prevented where feasible;
- restoration does not resurrect removed authority or deleted state;
- person-visible correction and notification are addressed;
- inaccessible or non-AI fallback is not ignored;
- evidence needs are named;
- implementation and specialist gaps remain explicit;
- residual harm is not described as zero without evidence;
- a follow-up owner and revalidation trigger exist; and
- the conclusion does not claim production readiness.

## Scenario set

The required scenario set is:

| Abuse case | Tabletop  | Scenario class                                             |
| ---------- | --------- | ---------------------------------------------------------- |
| `SYN-001`  | `TTX-001` | Cross-user Chronicle leakage                               |
| `SYN-002`  | `TTX-002` | Compromised agent or MCP client                            |
| `SYN-003`  | `TTX-003` | Stolen session and abusive account recovery                |
| `SYN-004`  | `TTX-004` | Malicious upload and prompt injection                      |
| `SYN-005`  | `TTX-005` | Purpose laundering and stale permission decision           |
| `SYN-006`  | `TTX-006` | Revocation during queued or in-flight execution            |
| `SYN-007`  | `TTX-007` | Receipt omission, duplication, or forgery                  |
| `SYN-008`  | `TTX-008` | Insider curiosity and emergency-power abuse                |
| `SYN-009`  | `TTX-009` | Secret exposure in CI or preview logs                      |
| `SYN-010`  | `TTX-010` | Dependency, build, or release compromise                   |
| `SYN-011`  | `TTX-011` | Ransomware and backup restoration                          |
| `SYN-012`  | `TTX-012` | Deletion verification with backups and external recipients |
| `SYN-013`  | `TTX-013` | Provider outage and regional failure                       |
| `SYN-014`  | `TTX-014` | Public-site signup disclosure or retention incident        |
| `SYN-015`  | `TTX-015` | Research actor attempting scope expansion                  |

## Evidence hierarchy

Evidence strength is ordered as follows:

1. deployed control plus protected operational evidence and independent review;
2. implementation-specific integration or adversarial testing in an isolated environment;
3. executable synthetic contract, fixture, or deterministic test;
4. multi-party tabletop with named accountable roles;
5. founding-steward design tabletop;
6. documented requirement without exercise; and
7. provider marketing, assumption, or undocumented expectation.

This workstream currently reaches level 5 for all required scenarios and references existing level 3 evidence where repository validators or deterministic contract tests already exist. It does not claim levels 1, 2, or 4.

## Revalidation cadence

All scenarios are rerun:

- before any production or pilot use involving their affected domains;
- after a material identity, Chronicle, House of Keys, execution, receipt, audit, AI, MCP, connector, encryption, environment, backup, deletion, research, or public-signup change;
- after provider selection or replacement;
- after any related incident or near miss;
- when independent review changes a control assumption;
- after a tabletop gap is closed; and
- at least once per major release while the affected capability exists.

High-consequence scenarios involving cross-user access, release after revocation, emergency power, key exposure, ransomware, deletion, and research scope expansion require multi-party and specialist reruns before production.

## Internal review result

The method is accepted as the internal Sprint 5 exercise framework. It establishes repeatable public scenario and tabletop requirements without representing any simulated decision as an implemented or effective control.

No production system, real person, real health information, credential, provider account, vulnerability reproduction, recipient, research study, or incident was used.
