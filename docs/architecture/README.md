# Architecture Documentation

[Documentation home](../README.md) · [Frozen architecture](../frozen/architecture.md) · [Module boundaries](module-boundaries.md) · [Current status](../roadmap/current-status.md) · [Sprint 8 plan](../roadmap/sprint-8-execution-plan.md) · [Workstream 8.6 record](../roadmap/sprint-8-workstream-8-6-record.md) · [Website foundation](public-website-foundation-and-migration.md)

This directory contains versioned architecture baselines that implement the frozen [Architecture Foundation](../frozen/architecture.md). These records may refine contracts and sequencing, but they may not weaken player rights, private-data boundaries, deterministic authority, provider replaceability, the consumer-first product center, operational legibility, or the rule that AI proposes while people and domain services control authoritative changes.

## Foundation and dependency direction

1. [Repository and Module Boundaries](module-boundaries.md)
2. [Calypso Engine](calypso-engine.md)
3. [Operational Simplicity and Durable Workflows](operational-simplicity-and-durable-workflows.md)
4. [Mission-to-Runtime Traceability](mission-to-runtime-traceability.md)
5. [Consumer-First and Provider-Independent Architecture](consumer-first-provider-independent-boundary.md)
6. [Public Website Foundation and Migration Boundary](public-website-foundation-and-migration.md)

The modular monolith remains the default. A new package, service, provider, queue, database, CMS, or deployment boundary must earn its place through a current consumer, distinct responsibility, explicit trust and failure boundary, tests, ownership, operability, and rollback evidence.

## Public website architecture — Sprint 8

- [Sprint 8 Execution Plan](../roadmap/sprint-8-execution-plan.md)
- [Sprint 8.1 Boundary Record](../roadmap/sprint-8-workstream-8-1-record.md)
- [Sprint 8.2 Next.js Shell Record](../roadmap/sprint-8-workstream-8-2-record.md)
- [Sprint 8.3 Navigation, Status, and Accessibility Record](../roadmap/sprint-8-workstream-8-3-record.md)
- [Sprint 8.4 Homepage and Promise Record](../roadmap/sprint-8-workstream-8-4-record.md)
- [Sprint 8.5 Guide Family Record](../roadmap/sprint-8-workstream-8-5-record.md)
- [Sprint 8.6 Trust Center and Open Forge Record](../roadmap/sprint-8-workstream-8-6-record.md)
- [Public Website Foundation and Migration Boundary](public-website-foundation-and-migration.md)
- [Accepted Pre-Sprint 8 Alignment Review](../roadmap/pre-sprint-8-alignment-review.md)
- [Current Status](../roadmap/current-status.md)
- [Site README](../../apps/site/README.md)
- [Issue #60](https://github.com/finalboss-tom/calypsos-promise/issues/60)
- [Draft PR #61](https://github.com/finalboss-tom/calypsos-promise/pull/61)

`apps/site` remains the single website owner.

Workstream 8.1 established the application, route, authority, rendering, design-token, security, cache, signup, deployment, rollback, accessibility, performance, metadata, validation, and non-scope boundary.

Workstream 8.2 implemented one pinned Next.js App Router shell with exact lockfile evidence, server-rendered compatibility routes, paused signup, application-local design tokens, metadata routes, nonce CSP, public security headers, mutable compatibility-asset caching, shell validation, and disabled Git-triggered deployment.

Workstream 8.3 implemented direct and optional narrative navigation parity, skip links and semantic landmarks, visible-focus and keyboard foundations, controlled status values, canonical source links, server-rendered essential information, resilience media behavior, and deterministic tests.

Workstream 8.4 implemented:

- a migrated cinematic homepage preserving the Ogygia direction;
- a dedicated source-backed `/promise` route;
- the frozen player promise and three connected loops;
- the public-software/private-data boundary;
- private-by-default, meaningful-refusal, player-confirmation, and correction-and-exit explanations;
- the meaningfully-free requirement;
- explicit experimental website, live repository, and planned-game distinctions;
- direct Product Constitution source links;
- ordinary public contribution paths; and
- focused production-build and repository-wide validation evidence.

Focused build commit `790bf9a79a76c28451fefcf959d92aefa59b5d03` passed the site production build, lint, typecheck, and focused tests. Clean source-only head `dc5986d19c691ba4dea95040be5bc5aa34a8d1b2` passed CI 1010 and DCO 1089.

Workstream 8.5 implemented:

- `/laws` with the exact frozen Seven Laws and their non-amendment boundary;
- `/how-it-works` with the planned short daily route, player confirmation, deterministic authority, non-punitive return, and honest planned status;
- `/consumer-first` with provider-respectful interoperability, standards at the edges, provider-independent Chronicle meaning at the core, and explicit absence of live provider or connector capability;
- `/aster` with the accepted pre-stable five-role contract, source and uncertainty rules, visible memory choice, fallback behavior, and explicit absence of production AI or private-data egress;
- canonical metadata, sitemap inclusion, and direct/narrative navigation parity for the four routes;
- server-rendered essential information without a client-component dependency;
- inherited accessibility and resilience behavior; and
- deterministic source, authority, route, signup, and deployment checks.

The focused validation workflow passed formatting, a production site build, site lint, typecheck, focused tests, generated-state cleanup, and self-removal before producing clean candidate `16fe324c508719734b8923a8f99b59fb16712726`.

Workstream 8.6 implemented:

- `/trust` as a source-backed view of rights, public/private information handling, security status, authority separation, provider and connector status, funding doctrine, challenge routes, and open gates;
- `/forge` as a source-backed view of the exact ten local public/synthetic tools, provenance, scopes, receipts, errors, compatibility, holdpoints, unresolved work, and ordinary contribution paths;
- direct and narrative navigation parity, footer links, canonical metadata, and sitemap inclusion;
- server-rendered essential information and inherited accessibility and resilience behavior; and
- focused production-build and deterministic trust, registry, receipt, error, route, signup, deployment, and non-certification validation.

The focused validation workflow passed formatting, a production site build, site lint, typecheck, focused tests, generated-state cleanup, and self-removal before producing clean candidate `e43d0a47186041599674f6608455752a4e3b7319`.

The website may own public routes, server-rendered presentation, navigation, metadata, design tokens, validated view models, build-time public-record adapters, public security headers, accessibility and performance budgets, and the separately gated signup surface.

It may not own Product Constitution, lore canon, Chronicle truth, permission truth, Aster or Forge authority, security policy, funding doctrine, provider policy, clinical policy, legal interpretation, governance authority, private data, providers, connectors, transactions, or Sprint 9 game state.

Website status and funding views remain validated read-only derivatives with canonical source links. They cannot become second ledgers or independent truth.

Workstream 8.7 is next. It may implement roadmap, capability-status, support, and canonical funding-transparency views derived from approved public repository records while preserving frozen authority, accepted public routes, direct and narrative navigation parity, controlled status values, source links, funding neutrality, server-rendered essential information, accessibility and resilience foundations, paused signup, disabled deployment, and permanent non-scope boundaries.

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

Permission truth remains separate from Chronicle truth. The House of Keys does not authenticate actors, execute operations, or convert website, model, or tool confidence into permission.

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

Sprint 7 is complete and merged. Forge exposes exactly ten accepted tools through runtime registry revision `4` and remains local-only, public/synthetic-only, allowlisted, provider-independent, non-mutating, and non-authoritative.

Forge may not become a general shell, repository mutation agent, arbitrary filesystem reader, network client, private Chronicle service, House of Keys service, standards authority, mapping authority, production provider gateway, connector runtime, production synthetic-data platform, production sandbox, or institutional authority without later accepted decisions and evidence.

## Operational simplicity and provider independence

- [Decision 0011](../decisions/0011-operational-simplicity-and-durable-workflows.md)
- [Decision 0010](../decisions/0010-consumer-first-provider-independent-boundary.md)
- [Operational Architecture](operational-simplicity-and-durable-workflows.md)
- [Consumer-First Architecture](consumer-first-provider-independent-boundary.md)
- [Developer Experience and Operability Policy](../policies/developer-experience-and-operability.md)
- [Infrastructure Sponsorship and Exit Policy](../economics/infrastructure-sponsorship-and-exit-policy.md)

Provider, queue, scheduler, model, storage, analytics, observability, CMS, and infrastructure choices remain replaceable adapters rather than domain authority. Sprint 8 remains one public site application with static or build-time public content where practical.

## Legacy and succession architecture

- [Decision 0009](../decisions/0009-health-data-legacy-and-post-mortem-stewardship.md)
- [Health Data Legacy and Succession Architecture](health-data-legacy-and-succession.md)
- [Future Health Data Legacy Workstream](../roadmap/health-data-legacy-workstream.md)
- [AS-0011 — Post-Mortem Chronicle Value](../governance/assumption-AS-0011-health-data-legacy-value.md)
- [Account Recovery and Emergency Access Model](../security/account-recovery-and-emergency-access-model.md)

Legacy and succession remain proposed future capabilities, not extensions of login recovery or Chronicle truth.

## Boundary rule

Architecture documentation describes contracts and dependency direction. Runtime provider selection, production database topology, queue or scheduler selection, event persistence, authentication, permission enforcement, connector rollout, clinical behavior, production synthetic-data assurance, production sandboxing or resource isolation, enterprise integration, offline synchronization, production migrations, estate or incapacity authority, post-mortem release, and real health-data processing remain gated until their roadmap and specialist-review requirements are met.
