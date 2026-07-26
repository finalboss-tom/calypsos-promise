# Pre-Sprint 5 Repository Alignment Review

**Status:** COMPLETE ON REVIEW BRANCH — Sprint 5 entry recommended after this reconciliation merges  
**Reviewed baseline:** `main` at `51e94a19cc21a0da0c57f1ae3b09f57092aee8d1`  
**Scope:** mission, player promise, vision, incentives, governance, architecture, data and permission contracts, public claims, contributor policy, tests, synthetic evidence, repository status, and Sprint 5 handoff  
**Certification boundary:** internal repository consistency review; not legal, privacy, security, accessibility, clinical, research, or production-readiness certification

## Decision summary

The repository remains strongly aligned from mission through implementation boundaries.

The frozen Product Constitution, Vision, Architecture Foundation, Gameplay Foundation, controlled vocabulary, incentive model, public institutional roadmap, governance baseline, Institutional Immune System, Living Chronicle contract, House of Keys contract, contributor policy, content examples, public website, and synthetic tests all preserve the same ordering:

1. return useful personal value first;
2. preserve individual control and meaningful refusal;
3. keep Chronicle truth, permission truth, source truth, product state, and AI proposals distinct;
4. use deterministic domain rules for authority, completion, rewards, and safety gates;
5. enable research, commerce, compensation, and collective benefit only through separate authority and later evidence gates;
6. keep public code and fixtures separate from private personal information; and
7. progressively transfer institutional authority only as evidence, safeguards, capacity, and legitimacy mature.

The review did not identify a mission-level contradiction requiring a frozen-foundation amendment.

It did identify correctable repository drift after the Sprint 4 merge and one material cross-contract vocabulary gap:

- several status records still described Sprint 4 and PR #33 as unmerged;
- the public website still described House of Keys architecture as wholly planned;
- House of Keys package documentation understated the merged receipt and synthetic-test surface;
- the Sprint 2 content example still used pre-Sprint-4 placeholder purpose and data-category identifiers;
- the integrated status needed a truthful execution clarification for the merged Sprint 3 boundary; and
- Sprint 5 needed an explicit handoff from the Chronicle and House of Keys threat surfaces without changing its accepted scope.

This reconciliation repairs those inconsistencies and records the remaining gates explicitly rather than pretending they are complete.

## Review authority and precedence

The review used this order:

1. frozen Product Constitution, Architecture Foundation, Gameplay Foundation, World and Lore Canon, and Vision;
2. accepted decision records;
3. Governance, Public Institutional Roadmap, Security, publication, and other cross-cutting policies;
4. controlled vocabulary and deterministic incentive model;
5. merged Living Chronicle and House of Keys architecture and completion records;
6. TypeScript contracts, validators, policy evaluator, public exports, fixtures, and tests;
7. public website, content examples, contributor documentation, and status records; and
8. this review.

A lower layer may implement, test, or explain a higher-layer rule. It may not silently weaken it.

## Review method

The review examined:

- root mission, vision, governance, roadmap, security, contribution, public-domain, and current-status documents;
- frozen product, architecture, gameplay, and lore foundations;
- accepted decisions through Decision 0007;
- architecture, product, governance, policy, website, public, and roadmap indexes;
- the merged Sprint 3 and Sprint 4 plans, completion records, contracts, fixtures, and hold points;
- `packages/domain`, `packages/content-schema`, `packages/health-schema`, and `packages/house-of-keys` boundaries and public APIs;
- content records and deterministic incentive validation;
- the Track 0A public website’s live and planned claims;
- repository validation, DCO, synthetic-data, publication, review, and security-disclosure controls;
- the persistent roadmap issue and remaining draft dependency migration; and
- the exact accepted Sprint 5 goal, deliverables, and acceptance criteria.

The review tested consistency across language, authority, dependency direction, status honesty, incentives, public/private boundaries, AI limits, refusal, correction, export, deletion, permissions, receipts, and institutional gates.

## Mission-to-implementation traceability

| Protected directive                                      | Canonical source                                                 | Current repository expression                                                                                                               | Result                                         |
| -------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Build a useful longitudinal account                      | Product Constitution; Architecture Foundation                    | Living Chronicle ontology, `@calypsos-promise/health-schema`, provenance, correction, export, deletion, synthetic fixtures                  | Consistent                                     |
| Improve health and understanding without false authority | Product Constitution; Gameplay Foundation; controlled vocabulary | descriptive and uncertain claim language, player-chosen actions, AI drafts, clinical and causal hold points                                 | Consistent at the pre-runtime boundary         |
| Keep the key and preserve personal control               | Product Constitution; House of Keys architecture                 | purpose-specific grants, exact scope, revocation, comprehension, receipts, fail-closed evaluation                                           | Consistent                                     |
| Return personal value before secondary use               | Vision; incentive model; roadmap                                 | first two loops remain independently valuable; research and commerce are optional and separately authorized                                 | Consistent                                     |
| Make refusal meaningful and non-punitive                 | Product Constitution; gameplay; incentive model                  | quest decline and defer requirements, shame-free return, revocation, no consent-derived rewards                                             | Consistent                                     |
| Keep authority deterministic                             | Architecture Foundation; incentive model                         | structured Chronicle confirmation, quest completion, reward rules, House of Keys evaluator, stable reason codes                             | Consistent                                     |
| Keep AI useful but non-authoritative                     | Architecture Foundation; gameplay; House of Keys                 | AI proposes, explains, and drafts; it cannot confirm Chronicle truth, grant permission, decide rewards, or convert `indeterminate` to allow | Consistent                                     |
| Keep open code separate from private people              | Product Constitution; Security; publication policy               | synthetic-only contributor workflows, repository policy, private signup adapter, no production health-data runtime                          | Consistent                                     |
| Enable public benefit without extraction                 | Vision; roadmap; House of Keys                                   | study-specific and offer-specific authority remains gated; no research or commercial runtime exists                                         | Consistent                                     |
| Progress toward founder-independent stewardship          | Vision; Governance; Roadmap                                      | public decisions, issue ledger, phase gates, succession and founder-power work explicitly outstanding                                       | Consistent but incomplete by design            |
| Remain corrigible and challengeable                      | Decision 0007                                                    | assumptions, challenge intake, containment, rollback, restoration, revalidation, explicit unresolved registers                              | Consistent at the documentation and test layer |

## Incentive alignment findings

### Personal value remains first

The quest and content contracts require an immediate player-value statement, deterministic completion evidence, approved reward shapes, and refusal and deferral paths. The canonical first-reflection quest rewards a player-confirmed Chronicle contribution rather than permission breadth or intimate-data volume.

### Permission cannot become a reward condition

Content supports a `permission-review` requirement but does not define a permission-grant requirement. House of Keys grants remain separate from quest completion and rewards. Fellowship remains optional, and personal-core use does not depend on research, commerce, public visibility, payment, or contribution.

### Security work must not create a new extraction incentive

Sprint 5 may not use fear, urgency, risk scoring, recovery friction, or security theater to pressure people into:

- broader data collection;
- longer retention;
- wider recipient access;
- optional analytics or model training;
- research participation;
- public visibility; or
- surrender of export, deletion, correction, refusal, or non-AI fallback rights.

Security controls must protect the Promise rather than become a reason to weaken it.

## Cross-contract alignment repairs in this reconciliation

### Sprint 4 merge truth

Repository, documentation, architecture, roadmap, package, and website records are updated to state that Sprint 4 merged through PR #33 as squash commit `51e94a19cc21a0da0c57f1ae3b09f57092aee8d1`.

The House of Keys contract remains pre-stable and synthetic-only. Merged does not mean production-deployed, legally valid, specialist-approved, or safe for real health-data processing.

### Content-to-permission vocabulary

Quest `dataCategories` and `permissionPurposeIds` are now explicitly House of Keys semantic identifiers.

The first-reflection example uses:

- `data.chronicle.reflection-note`; and
- `purpose.personal.chronicle-capture`.

The content validator now requires quest data-category identifiers to use the same lowercase dotted namespace grammar already required for permission-purpose identifiers. Registry applicability remains an orchestration and cross-contract validation concern rather than a content package authority.

### Sprint 3 execution clarification

The original Sprint 3 list mentioned story, quest, permission, receipt, and Aster-memory entities and database migrations. The merged Sprint 3 completion decision intentionally kept those domains outside Chronicle truth and delivered compatibility and migration requirements without executable production migrations.

The integrated current-status record now preserves that execution clarification without rewriting the historical accepted list.

### House of Keys implementation description

Package and product documentation now match the merged implementation:

- contract version `0.1.0-pre.1`;
- access-receipt contracts and one synthetic completed-access receipt;
- seventeen public synthetic policy scenarios; and
- twenty-nine Node tests.

## Sprint 5 accepted scope

The canonical Sprint 5 scope remains unchanged.

**Goal:** Define defenses before connecting real health data or agents.

Accepted deliverables:

- asset and trust-boundary map;
- threat model covering accounts, connectors, uploads, AI, MCP, insiders, supply chain, and research actors;
- encryption and key-management baseline;
- secret-management policy;
- environment-isolation design;
- account-recovery design;
- audit-retention and incident-response plans;
- deletion-verification procedure; and
- tabletop exercises.

Accepted acceptance criteria:

- cross-user leakage and compromised-agent scenarios have explicit controls;
- no private origin, database, or administrative service requires public exposure; and
- the security-disclosure workflow is published.

This review maps existing boundaries into that scope. It does not add deliverables or authorize production implementation.

### Required Sprint 5 execution-plan adjustments

The canonical scope is broad enough, but the Sprint 5 issue and execution plan should make the following workstreams explicit before implementation begins:

1. **Security and privacy threat analysis:** evaluate confidentiality, integrity, availability, misuse, coercion, inference, re-identification, and purpose-expansion risks rather than treating security as intrusion prevention alone.
2. **Data-flow and authority map:** bind every material flow to its asset classification, controlling authority, purpose, recipient, trust boundary, retention, deletion, backup, logging, and receipt expectations.
3. **Identity and isolation matrix:** cover authentication, sessions, account-to-Chronicle pseudonyms, tenant isolation, delegation and capacity boundaries, recovery, operator access, and emergency powers.
4. **Enforcement and freshness path:** trace policy decisions through execution, revocation, caches, queues, retries, single-use consumption, receipt creation, correction chains, and downstream invalidation.
5. **Untrusted-input and agent isolation:** include documents, images, connectors, prompts, tool results, model output, MCP clients, and dependency artifacts as untrusted inputs that cannot create authority.
6. **Availability and recoverability:** include backup and restore, ransomware, destructive operators, regional or provider failure, queue replay, disaster recovery, and the difference between account recovery, data recovery, and authority recovery.
7. **Control-status and residual-risk register:** label each control as required, designed, tested with synthetic evidence, independently reviewed, deployed, or deferred so documentation cannot be mistaken for an operating safeguard.
8. **Evidence and review gates:** require cross-contract synthetic abuse scenarios, tabletop records, unresolved-risk ownership, revalidation triggers, and a named security-review gate or an explicit statement that independent review remains absent.

These are execution clarifications under the accepted asset map, threat model, recovery, audit, incident-response, deletion-verification, and tabletop deliverables. They do not authorize production systems or silently expand the sprint into provider implementation.

## Sprint 4-to-5 security handoff

Sprint 5 must include the following existing assets and failure modes inside its accepted threat model.

### Living Chronicle assets

- controlling-person and subject identity references;
- canonical records and revision history;
- raw source artifacts, documents, attachments, and locators;
- provenance, transformations, associations, and inferences;
- correction, conflict, supersession, export, deletion, retention-exception, and tombstone evidence; and
- provider-independent identifiers and custody references.

Threats include cross-user leakage, source substitution, provenance tampering, false confirmation, document-parser abuse, malicious uploads, deletion overclaim, export exfiltration, custody confusion, and inference leakage.

### House of Keys assets

- purpose, data-category, recipient, action, and policy revisions;
- grant proposals, explanations, comprehension evidence, confirmations, lifecycle events, and capacity facts;
- policy requests and decisions;
- access receipts and correction chains; and
- decision, correlation, actor, resource, subject, scope, condition, duration, and freshness evidence.

Threats include confused-deputy requests, self-grant, requester/recipient mismatch, purpose laundering, category broadening, omitted selectors, stale decisions, revocation races, partial-grant composition, capacity replay, receipt omission or forgery, explanation substitution, coerced comprehension, cache invalidation failure, and conversion of `indeterminate` into allow.

### AI and MCP boundaries

Threats include prompt injection, tool-confusion attacks, imported content attempting to grant itself authority, caller-supplied owner identifiers, model-generated permission misrepresentation, hidden tool expansion, unauthorized retrieval, model or provider egress, compromised clients, and agents reusing stale decisions.

AI and MCP remain adapters. They cannot become identity proof, permission authority, Chronicle confirmation authority, arbitrary database access, or a substitute for deterministic policy enforcement.

### Accounts, recovery, and operators

Threats include account takeover, recovery abuse, session fixation, credential theft, insider access, operator curiosity, support impersonation, privilege escalation, tenant confusion, emergency-power abuse, and founder-only recovery paths.

Account recovery must not silently grant Chronicle or House of Keys authority, erase receipt history, or weaken meaningful refusal and exit.

### Public site and signup boundary

The current public site collects no health information. Its email-interest adapter remains a separate, purpose-limited flow.

Sprint 5 should treat webhook credentials, provider forwarding, request validation, log minimization, retention, unsubscribe, correction, deletion, abuse, and deployment isolation as a bounded public-site trust boundary without misclassifying it as a health-data runtime.

### Research and compensated actors

Research, recruitment, compensation, and marketplace systems remain deferred. The threat model may analyze future actor classes and trust boundaries, but it may not authorize data access, enrollment, compensation, or retention by documenting them.

## Sprint 5 execution guardrails

Sprint 5 must:

- use only public or synthetic evidence;
- remain architecture, policy, procedure, tests, and tabletop work unless a separate scope decision authorizes implementation;
- distinguish design requirements from deployed controls;
- avoid selecting a provider merely because a design baseline names a capability;
- preserve replaceability and inward dependency direction;
- preserve Chronicle, permission, source, execution, receipt, audit, product-state, and AI-memory separation;
- preserve exact uncertainty rather than inventing confidence;
- define containment, rollback, restoration, residual harm, challenge, and revalidation for material controls;
- treat deletion verification as evidence of the bounded procedure performed, not proof that every downstream copy ceased to exist; and
- keep security and privacy restrictions from becoming punitive progression or consent mechanics.

## Review and governance boundary

The repository currently has one active founding maintainer and no named security reviewer.

This review does not relabel founding-steward approval as independent specialist review. Sprint 5 drafting may begin under current Phase 0 authority, but the resulting security baseline must remain explicit about missing independent review.

Before Sprint 5 can be represented as specialist-reviewed, production-ready, or sufficient for real health-data paths, the project must either:

1. obtain review from a named qualified security reviewer; or
2. accept a separate decision record defining a narrower temporary review exception, its scope, risks, compensating controls, expiration, and replacement condition.

No exception may waive the Product Constitution, public/private boundary, security-disclosure route, or the requirement to record unresolved specialist gates honestly.

## Non-blocking parallel work

The following remain important but do not change the Sprint 5 canonical scope:

- internal decomposition of broad Chronicle type and validator files before material Chronicle expansion;
- cross-contract synthetic user journeys beyond the security-specific handoff;
- measurable first-session, refusal, correction, export, deletion, and return UX contracts;
- Phase 0 key-person, succession, founder-power, historical-source, branch-control, DCO, and exit-review gates;
- public-domain legal migration and contributor dedication;
- the stale TypeScript 7 / Node 26 Dependabot draft PR #8, which requires a separate current-main migration review; and
- future CODEOWNERS or ownership automation after real roles and reviewers exist.

## Sprint 5 entry recommendation

**Recommendation:** GREENLIGHT SPRINT 5 AFTER THIS RECONCILIATION MERGES, WITH THE EXECUTION-PLAN ADJUSTMENTS ABOVE.**

The repository is conceptually aligned and has the required Chronicle, permission, public-information, incentive, AI, MCP, governance, and corrigibility boundaries needed to begin the accepted threat-model and security-baseline work.

Sprint 5 should begin through its own issue, execution plan, branch, and draft pull request. Beginning it does not declare Phase 0 complete and does not authorize accounts, providers, real health-data flows, agents, research, or production security claims.

Any departure from the existing Sprint 5 goal, deliverables, acceptance criteria, or frozen rights requires a separate reviewed decision rather than an implementation edit.
