# Architecture Documentation

[Documentation home](../README.md) · [Frozen architecture](../frozen/architecture.md) · [Module boundaries](module-boundaries.md) · [Longitudinal Intelligence](longitudinal-intelligence-doctrine.md) · [Current status](../roadmap/current-status.md) · [Sprint 9 completion](../roadmap/sprint-9-completion-record.md)

This directory contains versioned architecture baselines that implement the frozen [Architecture Foundation](../frozen/architecture.md). These records may refine contracts and sequencing, but they may not weaken player rights, private-data boundaries, deterministic authority, provider replaceability, the consumer-first product center, operational legibility, or the rule that AI proposes while people and domain services control authoritative changes.

## Foundation and dependency direction

1. [Repository and Module Boundaries](module-boundaries.md)
2. [Calypso Engine](calypso-engine.md)
3. [Operational Simplicity and Durable Workflows](operational-simplicity-and-durable-workflows.md)
4. [Mission-to-Runtime Traceability](mission-to-runtime-traceability.md)
5. [Consumer-First and Provider-Independent Architecture](consumer-first-provider-independent-boundary.md)
6. [Longitudinal Intelligence Doctrine](longitudinal-intelligence-doctrine.md)
7. [Public Website Foundation and Migration Boundary](public-website-foundation-and-migration.md)

The modular monolith remains the default. A new package, application, service, provider, queue, database, CMS, measurement engine, experimentation runtime, or deployment boundary must earn its place through a current consumer, distinct responsibility, explicit trust and failure boundary, tests, ownership, operability, provider-exit behavior, and rollback evidence.

## Longitudinal Intelligence

- [Longitudinal Intelligence Doctrine](longitudinal-intelligence-doctrine.md)
- [Staged Validation Plan](../roadmap/longitudinal-intelligence-validation-plan.md)
- [LI-V0 Tracking Issue #73](https://github.com/finalboss-tom/calypsos-promise/issues/73)
- [Living Chronicle Identity and Authority](living-chronicle-identity-authority.md)
- [Living Chronicle Record Model](living-chronicle-record-model.md)
- [Provenance and Source Chain](living-chronicle-provenance-source-chain.md)
- [Correction, Conflict, and Supersession](living-chronicle-correction-conflict-supersession.md)
- [Export and Deletion Lifecycle](living-chronicle-export-deletion-lifecycle.md)
- [Aster Contract Boundary](aster-contract-boundary.md)

The doctrine is an accepted BASELINE architecture direction. It does not activate production measurement, private-data analysis, personal experimentation, causal health claims, clinical behavior, or a production model or provider.

LI-V0 — doctrine and evidence-kernel consolidation — is the only active Longitudinal Intelligence validation stage. LI-V1 through LI-V8 remain inactive until separately accepted.

The architecture requires the following distinctions to remain visible:

- source archive, canonical Chronicle record, derived measurement, hypothesis, causal evidence, and action;
- historical validity, current personal relevance, and current applicability;
- descriptive pattern, hypothesis, provisional choice, personal experiment result, bounded decision support, and clinical or research authority;
- observed period, current local effect, requested future horizon, and expiry;
- statistical stopping, refusal, burden stop, adverse stop, technical loss, and partial periods; and
- person choice, preference ambiguity, and model-selected policy.

> The Chronicle remains authoritative. AI remains advisory. Personal value comes first. Experimentation remains optional. No authority expands beyond the exact evidence, context, consequence, and time horizon that earned it.

## Current public application architecture

`apps/site` remains the single owner of the public website and production-hosted public synthetic prologue.

The site currently owns:

- server-rendered public routes, layouts, navigation, metadata, and design tokens;
- the bounded Founding Expedition newsletter surface;
- validated public status and funding views derived from canonical records;
- public security headers, caching, accessibility foundations, and transfer budgets;
- deterministic public synthetic prologue presentation state; and
- isolated local and deployed release evidence.

It does not own Product Constitution, lore canon, Chronicle truth, House of Keys permission truth, Aster authority, Longitudinal Intelligence causal authority, gameplay authority, provider policy, funding doctrine, clinical policy, legal interpretation, governance authority, private data, accounts, providers, connectors, analytics, research, or payments.

## Sprint 9 — public synthetic prologue

- [Public Synthetic Prologue Boundary](public-synthetic-prologue-boundary.md)
- [Sprint 9 Cross-Contract Reconciliation](public-synthetic-prologue-sprint-9-cross-contract-reconciliation.md)
- [Sprint 9 Control and Evidence Map](public-synthetic-prologue-sprint-9-control-and-evidence-map.md)
- [Sprint 9 Holdpoints and Unresolved Work](public-synthetic-prologue-sprint-9-specialist-holdpoint-and-unresolved-work-register.md)
- [Sprint 9 Completion Record](../roadmap/sprint-9-completion-record.md)
- [Sprint 9 Release, Rollback, and Sprint 10 Handoff](../roadmap/sprint-9-release-rollback-and-sprint-10-handoff.md)
- [Post-Sprint 9 Repository and Production Reconciliation](../roadmap/post-sprint-9-reconciliation-and-sprint-10-preparation.md)

Sprint 9 and its post-merge reconciliation are accepted and merged. Production deployment `dpl_CynKp4xKd3KK5BcMuRjmiZv96Aj6` hosts `/prologue` on the canonical domains.

The prologue remains:

- public and explicitly synthetic;
- no-account and React-memory only;
- destroyed by refresh, navigation, tab close, restart, discard, or exit;
- deterministic and fail-closed;
- complete through Aster framing or a materially equivalent manual path;
- non-authoritative for Chronicle truth, permission, identity, consent, audit, health outcome, Longitudinal Intelligence, rewards, or durable gameplay;
- `noindex, nofollow` and absent from public navigation and the sitemap; and
- free of real health input, arbitrary text, microphone, model provider, analytics, payment, research, and private state.

The protected preview is retained as access-controlled historical evidence, not an active release channel.

## Authority boundaries demonstrated by Sprint 9

### Living Chronicle

The Chronicle-shaped prologue view is temporary explanation only. It creates no subject identity, authoritative record, longitudinal truth, provenance history, export, deletion, private state, derived score, longitudinal pattern, or causal evidence.

### House of Keys

- [Ontology and Authority Boundary](house-of-keys-ontology.md)
- [Grant, Recipient, Action, Scope, and Duration Model](house-of-keys-grant-recipient-action-duration-model.md)
- [Access Receipt and Audit Boundary](house-of-keys-access-receipt-audit-boundary.md)
- [Deterministic Policy Evaluation Model](house-of-keys-policy-evaluation-model.md)
- [Contract and Validation Baseline](../product/house-of-keys-contract-baseline.md)

The receipt-shaped prologue view creates no request, evaluation, grant, consent, recipient authority, audit event, execution, legal permission, or data release.

### Aster

- [Aster Contract Boundary](aster-contract-boundary.md)
- [Aster Role Contracts](aster-role-contracts.md)
- [Aster Proposal and Structured Extraction Contracts](aster-proposal-and-extraction-contracts.md)
- [Aster Intent, Confidence, Clarification, and Refusal Contracts](aster-intent-confidence-clarification-refusal.md)
- [Aster Local Synthetic Adapter and Non-AI Fallbacks](aster-local-synthetic-adapter-and-non-ai-fallbacks.md)
- [Sprint 6 Completion Record](../roadmap/sprint-6-completion-record.md)

Aster changes framing, not authority. It cannot confirm itself, create truth, grant permission, choose a person’s authentic preference, establish causality, or complete the prologue without deterministic player evidence.

Sprint 9 does not import or consume the `@calypsos-promise/aster` package public API. Maintainability issue #50 therefore remains inactive until an actual package consumer produces concrete ergonomics evidence.

> AI proposes. The player confirms. The domain service validates and stores.

## Earlier accepted architecture packages

### Sprint 8 — public website foundation

- [Public Website Foundation and Migration Boundary](public-website-foundation-and-migration.md)
- [Sprint 8 Cross-Contract Reconciliation](public-site-sprint-8-cross-contract-reconciliation.md)
- [Sprint 8 Control and Evidence Map](public-site-sprint-8-control-and-evidence-map.md)
- [Sprint 8 Holdpoints and Unresolved Work](public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md)
- [Sprint 8 Completion Record](../roadmap/sprint-8-completion-record.md)

### Sprint 7 — Forge MCP

- [Forge MCP Boundary and Tool Registry](forge-mcp-boundary-and-tool-registry.md)
- [Forge MCP Local `stdio` Transport](forge-mcp-local-stdio-transport.md)
- [Forge Sprint 7 Cross-Contract Reconciliation](forge-sprint-7-cross-contract-reconciliation.md)
- [Forge Sprint 7 Control and Evidence Map](forge-sprint-7-control-and-evidence-map.md)
- [Forge Sprint 7 Holdpoints and Unresolved Work](forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)

Forge remains local-only, public/synthetic-only, allowlisted, provider-independent, non-mutating, and non-authoritative.

## Content and story architecture

- [Story Content Ontology](story-content-ontology.md)
- [Story Studio](story-studio.md)
- [Living Chronicle Ontology](living-chronicle-ontology.md)
- [World and Lore Canon](../frozen/world-and-lore-canon.md)
- [Gameplay Foundation](../product/gameplay-foundation.md)

Narrative presentation cannot create Chronicle truth, permission, canon approval, quest authority, Longitudinal Intelligence authority, rewards, clinical authority, or governance authority.

## Sprint 10 entry boundary

Sprint 10 may establish the browser, iOS, and Android playable shell only after a dedicated alignment review is accepted.

The review must resolve:

- application and package ownership;
- one versioned content package across platforms;
- server-authoritative versus local presentation state;
- offline, pending, synchronized, failed, stale, corrected, and conflict behavior;
- authentication only after the prologue;
- keyboard, screen-reader, touch, switch, reduced-motion, reduced-data, zoom, reflow, and low-bandwidth paths;
- release, signing, distribution, rollback, monitoring, and incident boundaries; and
- the rule that no gameplay rule depends on client-side trust.

Sprint 10 does not automatically authorize private Chronicles, production House of Keys, production Aster, Longitudinal Intelligence beyond LI-V0, real health or voice capture, providers, connectors, analytics, payments, research, or production health-data operation.

## Operational simplicity, provider independence, and succession

- [Decision 0011](../decisions/0011-operational-simplicity-and-durable-workflows.md)
- [Decision 0010](../decisions/0010-consumer-first-provider-independent-boundary.md)
- [Developer Experience and Operability Policy](../policies/developer-experience-and-operability.md)
- [Infrastructure Sponsorship and Exit Policy](../economics/infrastructure-sponsorship-and-exit-policy.md)
- [Health Data Legacy and Succession Architecture](health-data-legacy-and-succession.md)

Provider, queue, scheduler, model, measurement service, storage, analytics, observability, CMS, and infrastructure choices remain replaceable adapters rather than domain authority. Historical, succession, measurement, inference, and personal-experiment capabilities remain separately gated.
