# Synthetic Evidence Gap and Follow-Up Register

[Security architecture](README.md) · [Exercise method](synthetic-abuse-case-and-tabletop-method.md) · [Abuse-case register](synthetic-abuse-case-register.md) · [Tabletop records 1–8](tabletop-exercise-records-1.md) · [Tabletop records 9–15](tabletop-exercise-records-2.md)

**Status:** ACCEPTED SPRINT 5 BASELINE — internal exercise follow-up register; independent review and closure evidence pending  
**Workstream:** 5.9  
**Revision:** 1  
**Information class:** PUBLIC synthetic-only evidence  
**Production boundary:** gap and evidence planning only; no implementation, provider, operational evidence, real incident, credential, or private report is represented

## Purpose

This register converts design-tabletop findings into stable follow-up obligations for Sprint 5 completion and future implementation work.

A gap is not closed because:

- the architecture describes a control;
- a provider advertises a feature;
- the current public repository has not experienced a known incident;
- a founding-steward tabletop selected a reasonable response;
- a synthetic contract or unit test passes; or
- a future owner role has been named without an accountable person and evidence.

## Coverage summary

| Required scenario class                    | Abuse case | Tabletop  | Design-tabletop status | Primary disposition                                         |
| ------------------------------------------ | ---------- | --------- | ---------------------- | ----------------------------------------------------------- |
| Cross-user Chronicle leakage               | `SYN-001`  | `TTX-001` | Complete               | Production-blocking                                         |
| Compromised agent or MCP client            | `SYN-002`  | `TTX-002` | Complete               | Production-blocking                                         |
| Stolen session and abusive recovery        | `SYN-003`  | `TTX-003` | Complete               | Production-blocking; specialist holdpoint                   |
| Malicious upload and prompt injection      | `SYN-004`  | `TTX-004` | Complete               | Production-blocking                                         |
| Purpose laundering and stale permission    | `SYN-005`  | `TTX-005` | Complete               | Production-blocking; specialist holdpoint                   |
| Revocation during queued or in-flight work | `SYN-006`  | `TTX-006` | Complete               | Production-blocking                                         |
| Receipt omission, duplication, or forgery  | `SYN-007`  | `TTX-007` | Complete               | Production-blocking; specialist holdpoint                   |
| Insider curiosity and emergency abuse      | `SYN-008`  | `TTX-008` | Complete               | Production-blocking; independent holdpoint                  |
| Secret exposure in CI or preview           | `SYN-009`  | `TTX-009` | Complete               | Production-blocking                                         |
| Dependency, build, or release compromise   | `SYN-010`  | `TTX-010` | Complete               | Pilot-blocking                                              |
| Ransomware and backup restoration          | `SYN-011`  | `TTX-011` | Complete               | Production-blocking                                         |
| Deletion with backups and recipients       | `SYN-012`  | `TTX-012` | Complete               | Production-blocking; specialist holdpoint                   |
| Provider outage and regional failure       | `SYN-013`  | `TTX-013` | Complete               | Production-blocking                                         |
| Public-site signup incident                | `SYN-014`  | `TTX-014` | Complete               | Current bounded flow; remediation and revalidation required |
| Research scope expansion                   | `SYN-015`  | `TTX-015` | Complete               | Institutional and specialist holdpoint                      |

## Gap records

### `TTX-001` — Cross-user isolation

| Gap ID          | Gap                                                                              | Consequence                                                                       | Required closure evidence                                                                                                     | Owner role                                            | Trigger                                          |
| --------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------ |
| `GAP-TTX-001-A` | Cross-layer executable tenant and resource isolation evidence is absent.         | Cross-user disclosure through edge, domain, queue, retrieval, export, or restore. | Integration and adversarial negative tests across every layer and derivative, with protected evidence and independent review. | Identity and Chronicle owners.                        | Before any private account or Chronicle runtime. |
| `GAP-TTX-001-B` | Ambiguous-disclosure and missing-receipt notification rules are not implemented. | Affected people may be uninformed or falsely reassured.                           | Privacy- and accessibility-reviewed notification decision tree, delivery tests, correction records, and appeal path.          | Privacy, receipt, accessibility, and incident owners. | Before any sensitive read or release.            |

### `TTX-002` — Agent and MCP compromise

| Gap ID          | Gap                                                                                                                              | Consequence                                                | Required closure evidence                                                                                          | Owner role                                          | Trigger                                   |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- | ----------------------------------------- |
| `GAP-TTX-002-A` | Server-owned tool registry, invocation envelope, stale-authority rejection, and confused-deputy enforcement are not implemented. | Machine-speed cross-user access or hidden tool expansion.  | Versioned executable tool contracts, adversarial registry and envelope tests, and compromise containment evidence. | MCP, identity, House of Keys, and execution owners. | Before remote or private MCP operation.   |
| `GAP-TTX-002-B` | Agent compromise detection and per-tool receipt behavior are unresolved.                                                         | Delayed containment and incomplete person-visible history. | Detection design, synthetic compromise suite, receipt mapping, delivery tests, and incident exercise.              | AI-safety, security, receipt, and incident owners.  | Before protected tools or agent sessions. |

### `TTX-003` — Session theft and recovery

| Gap ID          | Gap                                                                                                   | Consequence                                                    | Required closure evidence                                                                                                     | Owner role                                                | Trigger                              |
| --------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------ |
| `GAP-TTX-003-A` | Production identity proofing, session containment, and recovery implementation are absent.            | Account takeover and unauthorized high-consequence action.     | Provider-independent design, implementation tests, session rotation and revocation evidence, and independent security review. | Identity and recovery owners.                             | Before production accounts.          |
| `GAP-TTX-003-B` | Representative, guardian, caregiver, minor, capacity, and estate authority require specialist review. | Invalid or jurisdictionally inappropriate authority decisions. | Legal, accessibility, privacy, and governance review with exact supported authority classes.                                  | Legal, identity, House of Keys, and accessibility owners. | Before any representative authority. |
| `GAP-TTX-003-C` | Recovery when notification channels are compromised is unresolved.                                    | Attacker intercepts alerts or blocks restoration.              | Multi-channel recovery design, notification-risk tests, and safe support procedures.                                          | Identity, security, support, and accessibility owners.    | Before account recovery launch.      |

### `TTX-004` — Malicious content and prompt injection

| Gap ID          | Gap                                                                                 | Consequence                                                            | Required closure evidence                                                                                                       | Owner role                                                                | Trigger                                       |
| --------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------- |
| `GAP-TTX-004-A` | Parser, scanner, sandbox, resource-bound, and archive controls are not implemented. | Code execution, denial of service, exfiltration, or corrupted sources. | Isolated parser architecture, fuzzing, malware uncertainty tests, expansion and timeout tests, and independent security review. | Upload, source, document-processing, infrastructure, and security owners. | Before any upload or document import.         |
| `GAP-TTX-004-B` | Adversarial prompt, retrieval, and tool-isolation tests are pending.                | Injected content influences actions or disclosures.                    | Repeatable prompt-injection and indirect-instruction test suite with source and tool boundaries.                                | AI-safety, retrieval, MCP, and security owners.                           | Before model-assisted document processing.    |
| `GAP-TTX-004-C` | Provider retention, correction, and deletion evidence is absent.                    | External provider copies remain after correction or deletion.          | Provider review, contract and configuration evidence, deletion tests, and residual-risk acceptance.                             | AI governance, privacy, security, and legal owners.                       | At provider selection and every model change. |

### `TTX-005` — Purpose laundering and stale decisions

| Gap ID          | Gap                                                               | Consequence                                         | Required closure evidence                                                                            | Owner role                                                    | Trigger                                        |
| --------------- | ----------------------------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ---------------------------------------------- |
| `GAP-TTX-005-A` | Production taxonomy, mapping, and revision governance are absent. | Vague or stale language becomes authorization.      | Versioned mapping workflow, conflict tests, independent review, and public correction process.       | House of Keys and privacy owners.                             | Before production policy evaluation.           |
| `GAP-TTX-005-B` | External recipient and purpose specialist review is pending.      | Inappropriate secondary use or onward distribution. | Privacy, legal, accessibility, and recipient review with exact data and purpose classes.             | Privacy, legal, recipient, and House of Keys owners.          | Before each external use class.                |
| `GAP-TTX-005-C` | Incentive and comprehension accessibility testing is absent.      | Coercive consent or exclusion.                      | Product incentive audit, comprehension usability testing, non-AI fallback, and accessibility review. | Product, accessibility, governance, and House of Keys owners. | Before any permission UX or reward connection. |

### `TTX-006` — Revocation and asynchronous execution

| Gap ID          | Gap                                                                                   | Consequence                                          | Required closure evidence                                                                               | Owner role                                           | Trigger                                     |
| --------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------- |
| `GAP-TTX-006-A` | Atomic capacity reservation, commitment, release, and correction are not implemented. | Double use, stale release, or inconsistent capacity. | Transaction design and concurrency, retry, partial-failure, and race tests.                             | House of Keys, execution, and infrastructure owners. | Before bounded-use or external release.     |
| `GAP-TTX-006-B` | Recipient timeout and ambiguous outcome reconciliation protocol is absent.            | Duplicate release or false no-release claim.         | Recipient protocol, idempotency, status reconciliation, receipt correction, and incident tests.         | Recipient, execution, receipt, and privacy owners.   | Before any external recipient.              |
| `GAP-TTX-006-C` | Queue cancellation, replay, and dead-letter evidence is absent.                       | Work executes after withdrawal or expiry.            | Queue integration tests preserving resource, decision, freshness, cancellation, and operation identity. | Queue, execution, and House of Keys owners.          | Before background release or deletion work. |

### `TTX-007` — Receipt and audit integrity

| Gap ID          | Gap                                                                                       | Consequence                                         | Required closure evidence                                                                                                | Owner role                                               | Trigger                                      |
| --------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- | -------------------------------------------- |
| `GAP-TTX-007-A` | Durable receipt intent and missing-receipt detection are absent.                          | Sensitive access is hidden from the person.         | Transactional intent design, reconciliation jobs, alerts, and synthetic omission tests.                                  | Receipt and execution owners.                            | Before any receipt-required operation.       |
| `GAP-TTX-007-B` | Accessible receipt delivery evidence is absent.                                           | People cannot inspect or challenge access.          | Screen-reader, keyboard, low-bandwidth, alternative-channel, and correction-delivery tests.                              | Accessibility, receipt, and support owners.              | Before authenticated receipt UI.             |
| `GAP-TTX-007-C` | Protected audit integrity, correction, retention, and query controls are not implemented. | Surveillance, forged evidence, or shadow authority. | Allowlisted schema, independent access, integrity evidence, correction chains, retention automation, and privacy review. | Audit, security, privacy, and records-governance owners. | Before observability or incident operations. |

### `TTX-008` — Operator and emergency power

| Gap ID          | Gap                                                          | Consequence                                                    | Required closure evidence                                                                    | Owner role                                                    | Trigger                                          |
| --------------- | ------------------------------------------------------------ | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------ |
| `GAP-TTX-008-A` | Private least-capability operator interface is absent.       | Curiosity browsing, arbitrary access, or silent impersonation. | Capability-specific interface, no shared accounts, action tests, and protected audit.        | Security, identity, and operator-governance owners.           | Before support or administration.                |
| `GAP-TTX-008-B` | Independent audit and reviewer path is absent.               | The same actor can abuse power and suppress evidence.          | Separate identities, access paths, reviewers, alerts, and governance challenge process.      | Audit, governance, security, and privacy owners.              | Before emergency or high-privilege access.       |
| `GAP-TTX-008-C` | Founder-independent emergency continuity remains unresolved. | Single-person capture or unavailable response.                 | Named successor roles, multi-party capability, tested handoff, and institutional acceptance. | Governance, security, and institutional immune-system owners. | Phase 0 closure and before protected operations. |

### `TTX-009` — Secret exposure

| Gap ID          | Gap                                                                                    | Consequence                                         | Required closure evidence                                                                                 | Owner role                                              | Trigger                              |
| --------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------ |
| `GAP-TTX-009-A` | Production secret inventory, ownership, revocation, and dependency mapping are absent. | Incomplete containment after exposure.              | Secret manager inventory, owner and service mapping, rotation and revocation tests, and incident runbook. | Secret-management, infrastructure, and security owners. | Before any production credential.    |
| `GAP-TTX-009-B` | Artifact, cache, history, preview, and indirect-path scanning are not fully evidenced. | Public or retained copies escape detection.         | Layered scans, transformed-value tests, artifact and cache review, and protected incident evidence.       | Repository, CI, deployment, and security owners.        | Every workflow or preview change.    |
| `GAP-TTX-009-C` | Redaction of encoded or transformed secret values is untested.                         | Logs and traces expose credentials despite masking. | Encoding, substring, structured-field, trace, and provider-dashboard redaction tests.                     | Telemetry, security, and provider owners.               | Before protected logging or tracing. |

### `TTX-010` — Supply-chain compromise

| Gap ID          | Gap                                                                                   | Consequence                                          | Required closure evidence                                                                              | Owner role                           | Trigger                                       |
| --------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------ | --------------------------------------------- |
| `GAP-TTX-010-A` | Dependency provenance, namespace, script, and action revision evidence is incomplete. | Malicious code enters builds.                        | Policy enforcement, reviewed sources, pinned actions, lockfile controls, and update review.            | Repository and dependency owners.    | Every dependency or action change.            |
| `GAP-TTX-010-B` | Reproducible build and artifact attestation are absent.                               | Signed but compromised artifacts appear trustworthy. | Clean isolated builds, provenance attestations, comparison evidence, and release review.               | Build, release, and security owners. | Before production or downloadable artifacts.  |
| `GAP-TTX-010-C` | Downstream artifact withdrawal and notification process is absent.                    | Compromised releases continue in use.                | Advisory process, artifact revocation or replacement, consumer notification, and residual-risk record. | Release and communications owners.   | Before public binary or package distribution. |

### `TTX-011` — Ransomware and restoration

| Gap ID          | Gap                                                                             | Consequence                                              | Required closure evidence                                                                                   | Owner role                                              | Trigger                              |
| --------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------ |
| `GAP-TTX-011-A` | Isolated, immutable, encrypted, and inventoried backup evidence is absent.      | Live compromise destroys recovery copies.                | Provider-independent backup design, access separation, retention, integrity, and destructive test evidence. | Reliability, security, and key owners.                  | Before production persistence.       |
| `GAP-TTX-011-B` | Post-snapshot authority, deletion, and queue reconciliation is not implemented. | Restore resurrects revoked, corrected, or deleted state. | Deterministic reconciliation tests for all authority and lifecycle domains.                                 | Reliability and all domain owners.                      | Before restore capability.           |
| `GAP-TTX-011-C` | Multi-party activation and founder-independent recovery are unproven.           | Unsafe or captured restoration.                          | Recovery roles, approvals, clean identities, staged activation, rollback, and handoff exercise.             | Reliability, security, governance, and incident owners. | Before disaster-recovery activation. |

### `TTX-012` — Deletion verification

| Gap ID          | Gap                                                                 | Consequence                                          | Required closure evidence                                                                                     | Owner role                                               | Trigger                             |
| --------------- | ------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ----------------------------------- |
| `GAP-TTX-012-A` | Complete target and dependency graph generation is absent.          | Hidden derivatives or regeneration survive deletion. | Domain inventories, dependency resolution, queue and cache tests, and reconciliation evidence.                | Deletion and all data-domain owners.                     | Before deletion claims.             |
| `GAP-TTX-012-B` | Provider and recipient deletion evidence contracts are absent.      | External copies are falsely described as erased.     | Status vocabulary, provider integration, recipient attestation process, escalation, and uncertainty handling. | Provider, recipient, privacy, and legal owners.          | Before external storage or release. |
| `GAP-TTX-012-C` | Retention-exception legal and records-governance review is pending. | Exceptions become indefinite hidden copies.          | Narrow exception policy, fields, purpose, expiry, owner, access, challenge, and specialist approval.          | Legal, privacy, records-governance, and security owners. | Before any retention exception.     |
| `GAP-TTX-012-D` | Deletion-aware backup restoration evidence is absent.               | Deleted data is resurrected.                         | Tombstone and post-snapshot replay tests, restore activation checks, and correction records.                  | Reliability and deletion owners.                         | Before backup activation.           |

### `TTX-013` — Provider and regional failure

| Gap ID          | Gap                                                                                        | Consequence                                                       | Required closure evidence                                                                          | Owner role                                                      | Trigger                                          |
| --------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------ |
| `GAP-TTX-013-A` | Domain service objectives, recovery objectives, and dependency failure budgets are absent. | Priorities and public claims are arbitrary.                       | Accepted domain objectives, measured tests, accessible fallback, and truthful status definitions.  | Reliability, product, and governance owners.                    | Before pilot commitments.                        |
| `GAP-TTX-013-B` | Independently durable rights-request intake is absent.                                     | Revocation or deletion is falsely accepted or lost during outage. | Durable channel, explicit acceptance state, replay, correction, and notification tests.            | Reliability, House of Keys, deletion, and accessibility owners. | Before rights-critical production flows.         |
| `GAP-TTX-013-C` | Regional failover, shared-failure-domain, and provider-exit evidence is absent.            | Redundancy fails during real outage.                              | Isolated failover or restore exercises, provider dependency map, clean credentials, and exit plan. | Reliability, infrastructure, provider, and security owners.     | At provider selection and every topology change. |

### `TTX-014` — Public signup lifecycle

| Gap ID          | Gap                                                                      | Consequence                                             | Required closure evidence                                                                      | Owner role                                               | Trigger                                            |
| --------------- | ------------------------------------------------------------------------ | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------- |
| `GAP-TTX-014-A` | Named private-list owner is absent.                                      | No accountable lifecycle or incident authority.         | Named role acceptance, access inventory, succession, and review schedule.                      | Founding maintainer and future signup owner.             | Immediate Phase 0 follow-up.                       |
| `GAP-TTX-014-B` | Retention, unsubscribe, correction, and deletion workflow is incomplete. | Purpose-limited records persist or cannot be corrected. | Documented schedule, tested workflows, bounded receipts, and challenge path.                   | Signup, privacy, records-governance, and support owners. | Before campaign expansion.                         |
| `GAP-TTX-014-C` | Preview, logging, processor, and copy-inventory evidence is limited.     | Public or uncontrolled disclosure.                      | Processor inventory, minimization tests, preview isolation, log review, and incident evidence. | Website, deployment, signup, and security owners.        | Every site or processor change.                    |
| `GAP-TTX-014-D` | Incident route and affected-person notification process are incomplete.  | Delayed or inconsistent response.                       | Private intake, escalation, notification, safe public derivative, and correction procedure.    | Security, privacy, communications, and incident owners.  | Before collecting beyond the current bounded flow. |

### `TTX-015` — Research scope expansion

| Gap ID          | Gap                                                                                     | Consequence                                            | Required closure evidence                                                                                             | Owner role                                                          | Trigger                                    |
| --------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------ |
| `GAP-TTX-015-A` | Research governance, ethics, and institutional approval structure is absent.            | Research authority is improvised or captured.          | Accepted governance, review roles, conflict rules, appeal, and independent specialist participation.                  | Research governance and institutional owners.                       | Before any research enrollment or dataset. |
| `GAP-TTX-015-B` | Study-specific House of Keys, dataset isolation, and access evidence are unimplemented. | Scope expansion or cross-study reuse.                  | Versioned protocol and grants, isolated datasets, access receipts, withdrawal tests, and provider review.             | Research, House of Keys, data, and security owners.                 | Before any person-level research flow.     |
| `GAP-TTX-015-C` | Output disclosure, small-group, linkage, and re-identification review is absent.        | Published outputs reveal people.                       | Disclosure-control process, specialist review, suppression or generalization tests, and correction plan.              | Privacy, research, publication, and security owners.                | Before every research output.              |
| `GAP-TTX-015-D` | External withdrawal, deletion, and publication-limit evidence is unresolved.            | Use continues after withdrawal and cannot be reversed. | Recipient workflow, contract and technical evidence, publication correction rules, and honest residual-risk language. | Research, recipient, privacy, legal, and records-governance owners. | Before external research delivery.         |

## Aggregate findings

The fifteen design tabletops produced:

- fifteen complete synthetic scenario and tabletop pairs;
- fifteen explicit residual-harm statements;
- fifteen follow-up owner groups;
- fifteen revalidation triggers;
- no scenario with production implementation evidence;
- no scenario with independent specialist review;
- no scenario with a multi-party operational exercise;
- one current bounded-flow disposition for the existing public signup surface; and
- production- or pilot-blocking gaps for every future private, agent, connector, recipient, backup, deletion, or research capability.

## Closure rules

A `GAP-TTX-*` record closes only when:

1. implementation scope is named;
2. accountable owner is a real accepted role, not only a future placeholder;
3. protected evidence demonstrates the specific control behavior;
4. negative, ambiguity, failure, correction, and restoration paths are tested;
5. affected public claims are reconciled;
6. required independent or specialist review is recorded;
7. residual risk has an accountable disposition;
8. the paired tabletop is rerun; and
9. closure does not imply broader production readiness than the evidence supports.

## Workstream result

Workstream 5.9 has complete internal design-tabletop coverage for every required Sprint 5 scenario class.

The exercise set improves architecture evidence from documented requirements to accountable founding-steward design tabletops. It does not prove implementation, provider behavior, operational response, accessibility effectiveness, legal sufficiency, independent review, or production readiness.
