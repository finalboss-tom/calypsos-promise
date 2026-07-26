# Sprint 5 Cross-Contract Security Reconciliation

[Security architecture](README.md) · [Sprint 5 plan](../roadmap/sprint-5-plan.md) · [Sprint sequence](../roadmap/sprints.md#sprint-5--threat-model-and-security-baseline) · [Product Constitution](../frozen/product-constitution.md) · [Architecture Foundation](../frozen/architecture.md) · [Completion record](../roadmap/sprint-5-completion-record.md)

**Status:** COMPLETE ON REVIEW BRANCH — accountable founding-steward reconciliation complete; independent specialist review and merge pending  
**Tracking issue:** [#35](https://github.com/finalboss-tom/calypsos-promise/issues/35)  
**Pull request:** [#36](https://github.com/finalboss-tom/calypsos-promise/pull/36)  
**Scope:** architecture, policy, procedures, public synthetic design-tabletop evidence, control status, residual risk, public claims, and specialist holdpoints only

## Reconciliation decision

Sprint 5 is internally coherent with the accepted Promise, architecture, domain contracts, incentive model, publication boundary, disclosure workflow, Institutional Immune System, repository policies, and bounded public website.

The review found no basis to:

- weaken private-by-default operation;
- broaden authority from authentication, possession, provider access, network location, AI output, technical capability, emergency status, or institutional role;
- collapse Chronicle, source, permission, execution, receipt, audit, product, AI, cryptographic, environment, recovery, deletion, exercise, or institutional truth;
- reward broader permission, unnecessary disclosure, longer retention, research participation, security compliance, or receipt volume;
- authorize production health-data, account, agent, connector, recipient, research, encryption, backup, monitoring, incident, audit, or deletion-verification runtime; or
- describe design documents or founding-steward tabletops as deployed or independently reviewed controls.

The review did identify one stale public-status artifact. `docs/website/website-status.md` still described `apps/site` as an unbuilt local proof server even though the repository and deployed project now contain a bounded public repository gateway and purpose-limited signup adapter. Workstream 5.10 corrects that record while preserving the site's explicit non-scope.

## Review authority and precedence

The reconciliation used this order:

1. [Product Constitution](../frozen/product-constitution.md), [Architecture Foundation](../frozen/architecture.md), [Gameplay Foundation](../product/gameplay-foundation.md), and frozen institutional commitments;
2. accepted decisions, including progressive decentralization and the [Institutional Immune System](../governance/institutional-immune-system.md);
3. [Security Policy](../../SECURITY.md), [Publication and Confidentiality Policy](../policies/publication-and-confidentiality.md), contributor policies, and repository validation policy;
4. [Incentive Model](../product/incentive-model.md), controlled vocabulary, Living Chronicle, and House of Keys contracts;
5. the accepted [Sprint 5 Plan](../roadmap/sprint-5-plan.md);
6. Sprint 5 threat, control, lifecycle, procedure, and exercise artifacts; and
7. this reconciliation and the Sprint 5 completion record.

A lower layer may make a protected requirement more explicit. It may not silently weaken a higher-authority boundary.

## Reviewed Sprint 5 baseline

### Scope, identities, threats, and domains

- [Asset and Trust-Boundary Map](asset-and-trust-boundary-map.md)
- [Asset, Authority, and Actor Register](asset-authority-register.md)
- [Data-Flow Boundary Register](data-flow-boundary-register.md)
- [Identity, Account, Session, Tenant, and Authority Model](identity-account-session-tenant-model.md)
- [Identity and Authority Register](identity-and-authority-register.md)
- [Account Recovery and Emergency Access Model](account-recovery-and-emergency-access-model.md)
- [Integrated Threat Model](integrated-threat-model.md)
- [Threat Control Objective Register](threat-control-objective-register.md)
- [Threat and Residual-Risk Register](threat-and-residual-risk-register.md)

### Chronicle and House of Keys security

- [Living Chronicle Security Model](living-chronicle-security-model.md)
- [Living Chronicle Control Register](living-chronicle-control-register.md)
- [Living Chronicle Dependency and Lifecycle Register](living-chronicle-dependency-lifecycle-register.md)
- [House of Keys Enforcement Model](house-of-keys-enforcement-security-model.md)
- [House of Keys Control Register](house-of-keys-control-register.md)
- [House of Keys Decision and Execution Lifecycle Register](house-of-keys-decision-execution-lifecycle-register.md)
- [House of Keys Enforcement Review Checklist](house-of-keys-enforcement-review-checklist.md)

### Untrusted input, encryption, environments, and resilience

- [Untrusted Input and Agent Isolation Model](untrusted-input-and-agent-isolation-model.md)
- [Untrusted Input Control Register](untrusted-input-control-register.md)
- [Untrusted Input Processing-State Register](untrusted-input-processing-state-register.md)
- [Encryption and Key-Management Baseline](encryption-and-key-management-baseline.md)
- [Secret-Management Policy](secret-management-policy.md)
- [Environment Isolation and Private-Origin Design](environment-isolation-and-private-origin-design.md)
- [Encryption, Key, Secret, and Environment Control Register](encryption-key-secret-environment-control-register.md)
- [Availability, Backup, Restore, and Continuity Model](availability-backup-and-restore-model.md)
- [Incident Response and Protected Audit Retention Plan](incident-response-and-audit-retention-plan.md)
- [Deletion Verification Procedure](deletion-verification-procedure.md)
- [Resilience, Incident, Audit, and Deletion Control Register](resilience-incident-deletion-control-register.md)

### Public synthetic design evidence

- [Synthetic Abuse-Case and Tabletop Method](synthetic-abuse-case-and-tabletop-method.md)
- [Synthetic Abuse-Case Register](synthetic-abuse-case-register.md)
- [Tabletop Records 1–8](tabletop-exercise-records-1.md)
- [Tabletop Records 9–15](tabletop-exercise-records-2.md)
- [Synthetic Evidence Gap Register](synthetic-evidence-gap-and-follow-up-register.md)

## Cross-contract findings

### Product Constitution and frozen rights

**Result:** consistent.

Sprint 5 treats confidentiality, integrity, availability, person control, purpose limitation, refusal, correction, export, deletion, recovery, accessibility, non-AI fallback, and institutional corrigibility as coequal requirements. Security is not used to justify more collection, broader recipients, longer retention, hidden behavior, or reduced rights.

The control baseline preserves the rule that the software may be open while personal health information remains private. Public artifacts and exercises contain only public or explicitly synthetic material.

### Architecture Foundation and dependency direction

**Result:** consistent.

The baseline preserves provider-independent domain services and the dependency direction from public or private clients through bounded application interfaces to separate authority-bearing domains. No private database, object store, queue, analytics service, research service, administrative service, key service, backup service, or security service requires public exposure.

Public origins do not become trusted merely because they belong to the project. Private origins, service identities, resource context, and policy authority remain independently verified.

### Living Chronicle contract

**Result:** consistent.

Chronicle truth remains human-confirmed, source-linked, versioned, correction-aware, conflict-preserving, deletion-aware, and independent from permission, AI, storage, custody, or operational evidence.

Uploads, connectors, parsers, models, retrieval results, migrations, backups, restores, operators, and emergency actors cannot confirm or rewrite Chronicle truth by technical success or possession alone.

Restoration requires post-snapshot reconciliation so deleted, withdrawn, corrected, invalidated, compromised, or tombstoned state is not silently resurrected.

### House of Keys contract

**Result:** consistent.

Permission remains exact, purpose-specific, recipient-specific, action-specific, category-specific, selector-aware, lifecycle-aware, and fail-closed. Authentication, recovery, delegation, comprehension, policy evaluation, execution, receipts, and audit remain separate.

A policy `allow` remains point-in-time evidence rather than a bearer token. Consequential execution requires fresh server-derived context, a bounded execution envelope, recipient and performer binding, replay-safe capacity handling, final pre-release authority verification, and honest partial or unknown outcomes.

### Deterministic incentives and non-punitive refusal

**Result:** consistent.

No Sprint 5 control grants reward, progression, Fellowship, Renown, compensation, governance weight, ownership, or superior core rights for broader permission, unnecessary disclosure, longer retention, security compliance, research participation, receipt volume, or successful comprehension.

Refusal, deferral, withdrawal, correction, export, deletion, recovery, challenge, accessibility needs, non-AI fallback, and return after interruption remain non-punitive.

### Publication and confidentiality

**Result:** consistent.

Sprint 5 publishes reviewed architecture, procedures, synthetic scenarios, minimized findings, and safe institutional records. It does not publish credentials, private endpoints, operational configuration, provider account identities, real personal data, private incident evidence, exploit-enabling reproduction details, recovery material, or unredacted control evidence.

The highest-risk element continues to control classification. Public transparency records institutional facts and outcomes without mirroring protected source systems.

### Security disclosure workflow

**Result:** consistent and accepted criterion met.

`SECURITY.md` provides a private reporting path for vulnerabilities, accidental disclosure, cross-user access, permission bypass, prompt injection, unsafe tools, secret exposure, deletion failure, and protected material entering public systems.

The workflow requires containment, credential revocation before relying on deletion, minimal private evidence, downstream-copy assessment, notification and remediation review, and safe public summaries where appropriate.

A dedicated disclosure address and production incident organization remain future work rather than missing Sprint 5 architecture.

### Institutional Immune System

**Result:** consistent.

Threats, controls, risks, lifecycle states, tabletops, and holdpoints preserve explicit assumptions, uncertainty, challenge, containment, reversibility, appeal, restoration, residual-harm records, provider replacement, and revalidation triggers.

The exercise set tests mechanisms and harmful conditions rather than labeling people or dissenters as threats. Containment remains narrow and temporary rather than becoming a verdict or permanent authority expansion.

### Contributor and repository policies

**Result:** consistent with bounded current evidence.

The repository enforces formatting, documentation-link validation, policy checks, content validation, lint, type checking, tests, and transitional pull-request DCO certification. Public contribution and CI use public or synthetic material only.

Administrative branch-protection evidence and commit-level DCO enforcement remain explicit institutional holdpoints before external contribution volume grows. Repository checks are current preventive evidence; they are not production private-runtime security certification.

### Public website capability claims

**Result:** consistent after status remediation.

The implemented site is a bounded public repository gateway with static public project content, restrictive response headers, a purpose-limited Founding Expedition email adapter, a privacy route, and no account, private Chronicle, health-data intake, research enrollment, production House of Keys, private AI, MCP, connector, analytics, governance-voting, or compensation behavior.

The root README and current-status record already describe that boundary truthfully. Workstream 5.10 updates the stale website-status record to match the implemented and deployed bounded surface.

The signup adapter remains a current bounded flow rather than a completed product subsystem. Its private storage owner, unsubscribe, correction, deletion, retention, incident, provider, and operational evidence remain required follow-up.

### Future Aster, MCP, connector, research, and production boundaries

**Result:** correctly gated.

Sprint 5 defines security requirements that later sprints must satisfy. It does not implement or approve Aster, private retrieval, MCP Chronicle tools, connectors, production permission orchestration, external recipients, research enrollment, analytics, private storage, production encryption, backup, monitoring, incident response, or deletion verification.

Later work must inherit the stable `THR-*`, `RSK-*`, `CTL-*`, `SYN-*`, `TTX-*`, `GAP-TTX-*`, and holdpoint identities rather than starting a parallel security model.

## Control-status reconciliation

The accepted status vocabulary is:

- **required** for controls demanded by the Promise, accepted sprint, contract, threat, or production gate;
- **designed** for documented behavior, boundaries, failure handling, dependencies, and expected evidence;
- **synthetically tested** only where a specific public scenario records expected and observed results and limitations;
- **independently reviewed** only when a named qualified reviewer outside proposing and implementing authority records a bounded review;
- **implemented**, **deployed**, and **operationally verified** only with environment-specific evidence;
- **deferred**, **not applicable**, **rejected**, or **retired** only through explicit records preserving rationale and residual risk.

Sprint 5 establishes required and designed status for its architecture controls. The fifteen `SYN-*` and `TTX-*` records provide founding-steward design-tabletop evidence for the named scenario families. They do not convert every referenced control into implemented, deployed, operationally verified, or independently reviewed status.

Limited current repository and public-site controls have implementation evidence in their bounded public environment. That evidence does not establish a production private-data security program.

## Residual-risk reconciliation

All forty-six `RSK-*` identities remain open and reviewable.

- Production-facing risks remain mitigation-required and production-blocking.
- Research, external-recipient, representative-authority, privacy, accessibility, clinical, legal, records-governance, cryptographic, and deletion claims retain specialist holdpoints.
- Institutional capture, founder dependency, succession, branch protection, DCO transition, and provider-exit risks remain Phase 0 or later gates.
- The current public gateway and purpose-limited signup flow retain only bounded current-flow dispositions with monitoring, correction, and revalidation.
- No risk is closed because a design exists, a founding-steward tabletop reached a coherent answer, CI passed, a vendor advertises a capability, or no incident has been observed.

## Remediations completed in 5.10

- accepted the control-status and risk vocabulary for the Sprint 5 baseline;
- created the final cross-contract reconciliation and specialist-holdpoint register;
- corrected the stale website-status record;
- reconciled root, documentation, roadmap, current-status, security, issue, and pull-request status language;
- mapped accepted deliverables and criteria to inspectable evidence; and
- created the Sprint 5 completion record.

## Completion conclusion

Sprint 5 is complete for its accepted architecture, policy, procedure, risk-register, control-register, public synthetic scenario, and founding-steward design-tabletop scope on the review branch.

This conclusion does not claim:

- production readiness;
- implementation or deployment of private security controls;
- legal, clinical, privacy, research, accessibility, cryptographic, reliability, records-governance, or vendor approval;
- multi-party operational readiness;
- independent specialist certification; or
- completion of institutional Phase 0.

Issue #35 remains open until the completed baseline is explicitly accepted and merged. PR #36 remains draft pending that approval.