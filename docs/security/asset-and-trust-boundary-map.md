# Asset, Authority, Data-Flow, and Trust-Boundary Map

[Security architecture](README.md) · [Asset and authority register](asset-authority-register.md) · [Data-flow and boundary register](data-flow-boundary-register.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — workstream 5.1 complete at the internal architecture level; independent security review pending  
**Workstream:** 5.1  
**Revision:** 1  
**Tracking issue:** [#35](https://github.com/finalboss-tom/calypsos-promise/issues/35)  
**Scope:** provider-independent security scope, information classification, authority domains, actor classes, assets, flows, environments, and trust boundaries  
**Production boundary:** design only; no production health-data, account, agent, connector, research, analytics, encryption, key-custody, monitoring, or administrative runtime is authorized or represented as deployed

## Decision summary

Calypso’s Promise must not be secured as one application with one identity, one database, one administrator, and one undifferentiated concept of access.

The Sprint 5 security scope is instead organized around distinct authority domains, purpose-specific operations, explicit recipients and performing actors, minimized boundary crossings, separate execution and evidence claims, and truthful control status.

The baseline establishes:

- nine authority domains;
- fourteen actor classes;
- thirteen trust zones;
- twenty-three asset classes;
- eighteen named boundary crossings;
- twelve principal flows; and
- cross-boundary invariants that later threat, control, tabletop, and implementation records must preserve.

The stable IDs and detailed obligations are maintained in:

1. [`asset-authority-register.md`](asset-authority-register.md); and
2. [`data-flow-boundary-register.md`](data-flow-boundary-register.md).

A referenced asset, actor, zone, crossing, or flow is not authorized or deployed merely because it appears in these records.

## Protected constitutional properties

The map protects these properties together:

- useful personal value;
- private-by-default operation;
- individual control and meaningful refusal;
- purpose-, recipient-, action-, scope-, duration-, and condition-specific authority;
- source and provenance integrity;
- visible uncertainty and correction;
- export, deletion, and restoration;
- cross-user and cross-subject isolation;
- deterministic domain authority;
- AI and MCP as proposal and adapter layers;
- non-AI fallback;
- open code and synthetic development separated from private people;
- provider replaceability;
- truthful capability and control status; and
- challenge, containment, rollback, restoration, and revalidation.

A control that protects one property by silently weakening another is incomplete and must record the tradeoff and residual risk.

## Information classifications

| Classification                   | Public handling rule                                                                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **PUBLIC**                       | May appear in public repository, documentation, website, issues, pull requests, public-safe CI, fixtures, and tabletop records                                            |
| **REVIEW**                       | Candidate public information requiring publication review and minimization                                                                                                |
| **RESTRICTED**                   | Operational or organizational information limited to authorized roles                                                                                                     |
| **PROTECTED PERSONAL**           | Identifiable or linkable person, account, Chronicle, health source, correspondence, support, permission, receipt, research, or related metadata                           |
| **SECRET OR SECURITY-SENSITIVE** | Credentials, keys, tokens, private endpoints, exploit details, security reports, incident evidence, administrative paths, anti-abuse details, and sensitive configuration |

Classification is not authority. A protected record still requires a valid controlling authority, purpose, recipient, actor, and domain operation.

## Authority map

| ID                 | Authority domain             | Core rule                                                                                                            |
| ------------------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `AUTH-ACCOUNT`     | Account and identity         | Authenticates and binds account actors; cannot create Chronicle or permission truth                                  |
| `AUTH-CHRONICLE`   | Living Chronicle             | Owns confirmed records and their provenance, correction, export, and deletion                                        |
| `AUTH-SOURCE`      | Source and custody           | Owns raw artifacts, versions, locators, integrity, and custody; source is not confirmed truth                        |
| `AUTH-KEYS`        | House of Keys                | Owns exact permission definitions, grants, lifecycle, evaluation, and receipt contracts                              |
| `AUTH-EXECUTION`   | Execution and release        | Owns attempts, releases, retries, cancellation, consumption, completion, and failure                                 |
| `AUTH-AUDIT`       | Protected audit              | Owns minimized operational evidence; cannot become a shadow Chronicle or permission system                           |
| `AUTH-PRODUCT`     | Product and story            | Owns quests, progression, restoration, notifications, and story state                                                |
| `AUTH-AI`          | AI and retrieval derivatives | Owns disposable drafts and indexes; cannot create identity, permission, Chronicle truth, or arbitrary tool authority |
| `AUTH-INSTITUTION` | Institutional                | Owns public decisions and governance; cannot use institutional authority as personal-data authority                  |

No service, database, provider, operator, model, client, or governance body owns all domains.

## Actor map

The detailed register defines fourteen actor classes:

- `ACT-PERSON`
- `ACT-SUBJECT`
- `ACT-ACCOUNT`
- `ACT-REQUESTER`
- `ACT-RECIPIENT`
- `ACT-PERFORMER`
- `ACT-RECEIPT`
- `ACT-OPERATOR`
- `ACT-CONNECTOR`
- `ACT-AI`
- `ACT-MCP`
- `ACT-RESEARCH`
- `ACT-GOVERNANCE`
- `ACT-BUILD`

The most important actor rule is that technical capability, organizational role, ownership, popularity, urgency, or governance authority does not create permission.

## Trust-zone map

```text
PUBLIC AND CONTRIBUTOR SURFACES

TZ-P1 local contributor
    │
    └── BX-001 ──> TZ-P0 public repository, CI, documentation, fixtures
                         │
public visitor ── BX-002 ──> TZ-P2 public web and signup adapter
                                      │
                                      └── BX-003 ──> TZ-S8 private signup processor

FUTURE PRIVATE PRODUCT SURFACES

authenticated client
    │
    └── BX-004 ──> TZ-S0 private edge and session
                         │
                         └── BX-005 ──> TZ-S1 domain application
                                            ├── BX-006 <──> TZ-S2 canonical structured data
                                            ├── BX-007 <──> TZ-S3 raw source and object custody
                                            ├── BX-008 ──> TZ-S4 queue and workers
                                            │                  └── BX-009 ──> TZ-S5 AI, retrieval, parsing
                                            │                                      └── BX-010 ──> domain or worker
                                            ├── BX-012 ──> TZ-S8 external recipient
                                            ├── BX-013 ──> TZ-S7 administration and audit
                                            ├── BX-016 ──> authenticated person-visible receipt
                                            └── BX-017 ──> TZ-S6 isolated analytics or research
                                                                    └── BX-018 ──> reviewed result

TZ-S2 / TZ-S3 / bounded TZ-S7
    └── BX-014 ──> TZ-S9 backup and recovery
                         └── BX-015 ──> isolated restoration and reconciliation

external connector in TZ-S8
    └── BX-011 ──> TZ-S4 or bounded TZ-S1 ingestion
```

Public origins do not require public databases, queues, object stores, administrative services, or internal provider endpoints.

## Asset coverage

The asset register covers:

1. public constitutional and institutional artifacts;
2. public synthetic fixtures and tabletop records;
3. public-site content and deployment assets;
4. purpose-limited signup interest records;
5. account identity, credentials, sessions, delegation, and recovery evidence;
6. account-to-Chronicle pseudonym mapping;
7. confirmed Chronicle records;
8. raw sources, documents, images, payloads, and attachments;
9. provenance, transformations, normalization, associations, and inferences;
10. House of Keys definitions, grants, lifecycle, explanations, comprehension, and confirmations;
11. policy requests and decisions;
12. execution and data-release state;
13. person-visible access receipts;
14. protected operational audit evidence;
15. AI prompts, responses, extraction drafts, and conversation derivatives;
16. embeddings, indexes, caches, retrieval results, and metadata;
17. quest, progression, restoration, notification, and story state;
18. connector credentials, cursors, payloads, and synchronization state;
19. research proposals, enrollment, person-level datasets, aggregates, and outputs;
20. secrets, keys, certificates, and private service identities;
21. builds, dependencies, CI logs, previews, caches, and artifacts;
22. backups, replicas, snapshots, archives, and recovery records; and
23. personal analytics, approved aggregates, and analytical working state.

Each asset record identifies classification, authority, controlling authority, purpose, recipients, actors, zones, lifecycle expectations, current status, owner role, and dependencies.

## Principal-flow coverage

The flow register covers:

- `FLOW-001` public documentation and repository publication;
- `FLOW-002` Founding Expedition interest signup;
- `FLOW-003` future Chronicle capture;
- `FLOW-004` future authorized read or release;
- `FLOW-005` future connector import and synchronization;
- `FLOW-006` future personal export;
- `FLOW-007` future deletion and verification;
- `FLOW-008` future AI or MCP-assisted operation;
- `FLOW-009` future backup and restoration;
- `FLOW-010` future security incident response;
- `FLOW-011` future separately authorized research; and
- `FLOW-012` future personal analytics.

Each flow identifies its assets, purpose, recipient, authority, crossings, lifecycle obligations, evidence boundary, and current capability status.

## Cross-boundary invariants

1. Caller-supplied user, subject, owner, tenant, or Chronicle identifiers never create authority.
2. Every sensitive operation has one explicit controlling resource and subject set.
3. Purpose, recipient, performing actor, action, category, selector, duration, conditions, and revisions are exact.
4. Identity, source, Chronicle truth, permission, decision, execution, release, receipt, audit, product, and AI claims remain distinct.
5. Public and contributor environments contain only PUBLIC or synthetic information.
6. Background jobs preserve policy identity and freshness and can be denied or cancelled after authority changes.
7. Derived data preserves source references and responds to correction and deletion.
8. Logs, traces, prompts, metrics, errors, receipts, and audit records use separate minimized field allowlists.
9. External recipients, connectors, providers, operators, models, and private services are not trusted by name, contract, ownership, or network location.
10. Backups and restoration preserve authority, correction, withdrawal, revocation, deletion, and tombstone history.
11. Research and commercial authority cannot be inferred from personal-core use.
12. Security controls cannot become progression, reward, eligibility, compensation, or governance conditions.
13. Every future crossing has a deny, fail-safe, cancellation, containment, or rollback path.
14. A documented, designed, or synthetically tested control is not represented as implemented or deployed.

## Workstream 5.1 completion evidence

Workstream 5.1 is complete at the internal architecture level because:

- security scope and explicit non-scope are recorded;
- stable authority, actor, asset, zone, crossing, and flow IDs exist;
- required public-site, account, Chronicle, source, House of Keys, execution, receipt, audit, AI, MCP, connector, administrative, build, backup, research, and analytics scope is covered;
- assets identify classification, authority, purpose, recipients, actors, zones, lifecycle expectations, current status, owner role, and dependencies;
- principal flows identify exact crossings and required security properties;
- private origins, databases, object stores, queues, analytics, and administrative services require no public exposure;
- cross-user and compromised-agent surfaces are present for later threat and control records;
- control status remains truthful;
- the records contain only PUBLIC architecture and synthetic-only material; and
- the founding steward approved proceeding with 5.1 and its internal baseline.

## Review result and remaining gates

Internal review found no intentional collapse of authority domains and no design requirement for a private database, object store, queue, analytics service, or administrative service to be publicly exposed.

The following remain later Sprint 5 work rather than 5.1 defects:

- detailed identity, session, tenant, recovery, operator, and emergency-power controls in 5.2;
- threat and residual-risk records linked to these IDs in 5.3;
- Chronicle-specific controls in 5.4;
- House of Keys enforcement and freshness controls in 5.5;
- upload, AI, MCP, connector, and supply-chain controls in 5.6;
- encryption, key, secret, and environment controls in 5.7;
- recovery, incident, audit, retention, and deletion procedures in 5.8;
- synthetic scenarios and table tops in 5.9; and
- complete cross-contract and independent-review reconciliation in 5.10.

Independent security review remains pending. Any later artifact that changes an authority, asset, zone, crossing, or flow must update these records and identify affected threats and controls.
