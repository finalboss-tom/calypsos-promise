# Architecture Documentation

[Documentation home](../README.md) · [Frozen architecture](../frozen/architecture.md) · [Module boundaries](module-boundaries.md) · [Current status](../roadmap/current-status.md) · [Pre-Sprint 8 review](../roadmap/pre-sprint-8-alignment-review.md) · [Sprint 7 completion](../roadmap/sprint-7-completion-record.md)

This directory contains versioned architecture baselines that implement the frozen [Architecture Foundation](../frozen/architecture.md). These records may refine contracts and sequencing, but they may not weaken player rights, private-data boundaries, deterministic authority, provider replaceability, the consumer-first product center, operational legibility, or the rule that AI proposes while people and domain services control authoritative changes.

## Foundation and dependency direction

1. [Repository and Module Boundaries](module-boundaries.md)
2. [Calypso Engine](calypso-engine.md)
3. [Operational Simplicity and Durable Workflows](operational-simplicity-and-durable-workflows.md)
4. [Mission-to-Runtime Traceability](mission-to-runtime-traceability.md)
5. [Consumer-First and Provider-Independent Architecture](consumer-first-provider-independent-boundary.md)

The modular monolith remains the default. A new package, service, provider, queue, database, CMS, or deployment boundary must earn its place through a current consumer, distinct responsibility, explicit trust and failure boundary, tests, ownership, operability, and rollback evidence.

## Content and story architecture

- [Story Content Ontology](story-content-ontology.md)
- [Story Studio](story-studio.md)
- [Living Chronicle Ontology](living-chronicle-ontology.md)
- [World and Lore Canon](../frozen/world-and-lore-canon.md)
- [Gameplay Foundation](../product/gameplay-foundation.md)

Content and story records remain public or explicitly synthetic. Narrative presentation cannot create Chronicle truth, permission, canon approval, quest completion, rewards, clinical authority, or governance authority.

## Living Chronicle architecture

- [Identity and Authority](living-chronicle-identity-authority.md)
- [Record Model](living-chronicle-record-model.md)
- [Temporal Model](living-chronicle-temporal-model.md)
- [Variables, Values, and Units](living-chronicle-variable-value-unit-model.md)
- [Provenance and Source Chain](living-chronicle-provenance-source-chain.md)
- [Correction, Conflict, and Supersession](living-chronicle-correction-conflict-supersession.md)
- [Documents, Attachments, and Versions](living-chronicle-document-attachment-version-model.md)
- [Export and Deletion Lifecycle](living-chronicle-export-deletion-lifecycle.md)

The Living Chronicle remains the provider-independent longitudinal product model. External standards and institutions remain source-attributed, versioned, mapped, purpose-specific, and replaceable rather than silently becoming Chronicle truth or product authority.

## House of Keys architecture

- [Ontology and Authority Boundary](house-of-keys-ontology.md)
- [Purpose Taxonomy](house-of-keys-purpose-taxonomy.md)
- [Data-Category Taxonomy](house-of-keys-data-category-taxonomy.md)
- [Grant, Recipient, Action, Scope, and Duration Model](house-of-keys-grant-recipient-action-duration-model.md)
- [Revocation and Lifecycle Model](house-of-keys-revocation-lifecycle-model.md)
- [Access Receipt and Audit Boundary](house-of-keys-access-receipt-audit-boundary.md)
- [Permission Explanation and Comprehension Model](house-of-keys-explanation-comprehension-model.md)
- [Deterministic Policy Evaluation Model](house-of-keys-policy-evaluation-model.md)
- [Contract and Validation Baseline](../product/house-of-keys-contract-baseline.md)

Permission truth remains separate from Chronicle truth. The House of Keys does not authenticate actors, execute operations, or convert model or tool confidence into permission.

## Aster architecture

- [Aster Contract Boundary](aster-contract-boundary.md)
- [Aster Role Contracts](aster-role-contracts.md)
- [Aster Proposal and Structured Extraction Contracts](aster-proposal-and-extraction-contracts.md)
- [Aster Intent, Confidence, Clarification, and Refusal Contracts](aster-intent-confidence-clarification-refusal.md)
- [Aster Source-Linked Recall and Explanation Contracts](aster-source-linked-recall-and-explanation-contracts.md)
- [Aster Memory Classes and Lifecycle Contracts](aster-memory-lifecycle-contracts.md)
- [Aster Prompt-Injection and Untrusted-Input Isolation Contracts](aster-untrusted-input-isolation-contracts.md)
- [Aster Responsive and Deferred Work Contracts](aster-responsive-and-deferred-work-contracts.md)
- [Aster Provider Governance and Egress Contracts](aster-provider-governance-and-egress-contracts.md)
- [Aster Local Synthetic Adapter and Non-AI Fallbacks](aster-local-synthetic-adapter-and-non-ai-fallbacks.md)
- [Aster Compatibility, Migration, and Cross-Contract Evidence](aster-compatibility-migration-and-cross-contract-evidence.md)
- [Sprint 6 Cross-Contract Reconciliation](aster-sprint-6-cross-contract-reconciliation.md)
- [Sprint 6 Control and Evidence Map](aster-sprint-6-control-and-evidence-map.md)
- [Sprint 6 Specialist Holdpoints and Unresolved Work](aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md)
- [Sprint 6 Completion Record](../roadmap/sprint-6-completion-record.md)

Aster is a merged pre-stable proposal and explanation capability. It does not own Chronicle truth, House of Keys authority, gameplay completion, rewards, application state, provider logs, retrieval indexes, protected audit, or institutional authority.

> AI proposes. The player confirms. The domain service validates and stores.

## Forge MCP architecture

- [Forge MCP Boundary and Tool Registry](forge-mcp-boundary-and-tool-registry.md)
- [Forge MCP Local `stdio` Transport](forge-mcp-local-stdio-transport.md)
- [Forge MCP Source Catalogue and Provenance](forge-mcp-source-catalogue-and-provenance.md)
- [Forge MCP Lore and Schema Tools](forge-mcp-lore-and-schema-tools.md)
- [Forge MCP Architecture and Decision Tools](forge-mcp-architecture-and-decision-tools.md)
- [Forge MCP Public Standards, Mapping Drafts, and Synthetic Connector Fixtures](forge-mcp-public-standards-mapping-and-synthetic-connectors.md)
- [Forge MCP Deterministic Synthetic Generation](forge-mcp-deterministic-synthetic-generation.md)
- [Forge MCP Scopes, Limits, Receipts, and Errors](forge-mcp-scopes-limits-receipts-and-errors.md)
- [Forge MCP Agent Security, Compatibility, and Operability](forge-mcp-agent-security-compatibility-and-operability.md)
- [Sprint 7 Cross-Contract Reconciliation](forge-sprint-7-cross-contract-reconciliation.md)
- [Sprint 7 Control and Evidence Map](forge-sprint-7-control-and-evidence-map.md)
- [Sprint 7 Specialist Holdpoints and Unresolved Work](forge-sprint-7-specialist-holdpoint-and-unresolved-work-register.md)
- [Sprint 7 Completion Record](../roadmap/sprint-7-completion-record.md)
- [Pre-Sprint 8 Alignment Review](../roadmap/pre-sprint-8-alignment-review.md)
- [Completed issue #54](https://github.com/finalboss-tom/calypsos-promise/issues/54)
- [Merged PR #55](https://github.com/finalboss-tom/calypsos-promise/pull/55)

Sprint 7 is complete and merged as `f28f054fe16d550fad37663cf234e06c5622dd42`.

Forge exposes exactly ten accepted tools through runtime registry revision `4`. Execution, security, compatibility, and operability contracts are revision `1`. Forge remains local-only, public/synthetic-only, allowlisted, provider-independent, non-mutating, and non-authoritative.

Runtime integrity and successful-result postconditions fail closed when server-owned contracts or required evidence change. The completion package records 28 controls, 19 open holdpoints, 18 unresolved-work items, and the bounded Sprint 8 handoff.

Forge may not become a general shell, repository mutation agent, arbitrary filesystem reader, network client, private Chronicle service, House of Keys service, standards authority, mapping authority, production provider gateway, connector runtime, production synthetic-data platform, production resource-control system, production sandbox, or institutional authority without later accepted decisions and evidence.

## Public website architecture entering Sprint 8

The active review is the [Pre-Sprint 8 Repository Alignment Review](../roadmap/pre-sprint-8-alignment-review.md), tracked by [issue #58](https://github.com/finalboss-tom/calypsos-promise/issues/58).

`apps/site` remains the single public website owner. Sprint 8 should migrate Website Track 0A in place into one Next.js foundation rather than create a duplicate site or service.

The public website may explain and render accepted public records. It cannot create product, security, privacy, funding, provider, clinical, permission, legal, or governance authority.

The migration must preserve or deliberately supersede current routes, semantic information access, cinematic Ogygia direction, reduced motion, security-header intent, signup isolation, and rollback capability. Status and funding views must remain derived from canonical repository records rather than becoming independent systems.

## Operational simplicity and provider independence

- [Decision 0011](../decisions/0011-operational-simplicity-and-durable-workflows.md)
- [Decision 0010](../decisions/0010-consumer-first-provider-independent-boundary.md)
- [Operational Architecture](operational-simplicity-and-durable-workflows.md)
- [Consumer-First Architecture](consumer-first-provider-independent-boundary.md)
- [Developer Experience and Operability Policy](../policies/developer-experience-and-operability.md)
- [Infrastructure Sponsorship and Exit Policy](../economics/infrastructure-sponsorship-and-exit-policy.md)

Provider, queue, scheduler, model, storage, analytics, observability, CMS, and infrastructure choices remain replaceable adapters rather than domain authority. Sprint 8 should remain one public site application with static or build-time public content where practical.

## Legacy and succession architecture

- [Decision 0009](../decisions/0009-health-data-legacy-and-post-mortem-stewardship.md)
- [Health Data Legacy and Succession Architecture](health-data-legacy-and-succession.md)
- [Future Health Data Legacy Workstream](../roadmap/health-data-legacy-workstream.md)
- [AS-0011 — Post-Mortem Chronicle Value](../governance/assumption-AS-0011-health-data-legacy-value.md)
- [Account Recovery and Emergency Access Model](../security/account-recovery-and-emergency-access-model.md)

Legacy and succession remain proposed future capabilities, not extensions of login recovery or Chronicle truth.

## Boundary rule

Architecture documentation describes contracts and dependency direction. Runtime provider selection, production database topology, queue or scheduler selection, event persistence, authentication, permission enforcement, connector rollout, clinical behavior, production synthetic-data assurance, production sandboxing or resource isolation, enterprise integration, offline synchronization, production migrations, estate or incapacity authority, post-mortem release, and real health-data processing remain gated until their roadmap and specialist-review requirements are met.
