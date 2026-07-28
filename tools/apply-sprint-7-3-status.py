from pathlib import Path


def read(path: str) -> str:
    return Path(path).read_text()


def write(path: str, text: str) -> None:
    Path(path).write_text(text)


def replace_once(path: str, old: str, new: str) -> None:
    text = read(path)
    if new in text:
        return
    if old not in text:
        raise SystemExit(f"missing expected text in {path}: {old[:100]}")
    write(path, text.replace(old, new, 1))


def replace_section(path: str, start: str, end: str, body: str) -> None:
    text = read(path)
    start_index = text.index(start)
    end_index = text.index(end, start_index)
    write(path, text[:start_index] + body.rstrip() + "\n\n" + text[end_index:])


replace_once(
    "apps/mcp-forge/README.md",
    "Sprint 7.1 establishes the Forge boundary and registry. Sprint 7.2 adds a local `stdio` MCP transport and direct invocation harness while keeping every planned tool unexposed and every repository read disabled.",
    "Sprint 7.1 establishes the Forge boundary and registry. Sprint 7.2 adds the local `stdio` MCP transport. Sprint 7.3 adds a server-owned source catalogue, allowlisted repository access, and provenance while keeping every planned tool unexposed.",
)
replace_once(
    "apps/mcp-forge/README.md",
    "- a direct transport harness and stream-level tests.",
    "- a direct transport harness and stream-level tests;\n- nine server-owned source-root identities;\n- exact-file and recursive-tree allowlists;\n- traversal, prohibited-path, and symlink isolation;\n- SHA-256 digests, line counts, and whole-file, line-range, and object locators;\n- deterministic listing, truncation, and partial-result evidence; and\n- public-safe source errors with no absolute-path leakage.",
)
replace_once(
    "apps/mcp-forge/README.md",
    "All initial tools remain `planned` and `not-exposed`. Sprint 7.2 does not read repository files, resolve roots, inspect paths, search, validate content, or generate data. Later workstreams must implement source catalogues, path isolation, provenance, tool behavior, limits, receipts, compatibility, migration, and agent-security evidence before any tool becomes exposed.",
    "All initial tools remain `planned` and `not-exposed`. Sprint 7.3 can resolve and read only named server-owned public roots through the direct application API; MCP `tools/list` remains empty and `tools/call` remains refused. Later workstreams must implement accepted tool behavior, limits, receipts, compatibility, migration, and agent-security evidence before any tool becomes exposed.",
)

replace_once(
    "README.md",
    "[Local transport](docs/architecture/forge-mcp-local-stdio-transport.md) · [Pre-Sprint 7 review]",
    "[Local transport](docs/architecture/forge-mcp-local-stdio-transport.md) · [Source catalogue](docs/architecture/forge-mcp-source-catalogue-and-provenance.md) · [Pre-Sprint 7 review]",
)
replace_once(
    "README.md",
    "[Local Transport](docs/architecture/forge-mcp-local-stdio-transport.md) → [Sprint Roadmap]",
    "[Local Transport](docs/architecture/forge-mcp-local-stdio-transport.md) → [Source Catalogue](docs/architecture/forge-mcp-source-catalogue-and-provenance.md) → [Sprint Roadmap]",
)
replace_once(
    "README.md",
    "Workstreams 7.1 and 7.2 establish the Forge boundary, registry, finalized-version local `stdio` transport, direct harness, cancellation, shutdown, framing, and transport-safe errors. Every tool remains planned and unexposed; no repository read exists yet. Sprint 7.3 — source catalogue and provenance is next.",
    "Workstreams 7.1–7.3 establish the Forge boundary, registry, finalized-version local `stdio` transport, direct harness, server-owned source catalogue, allowlisted repository access, path and symlink isolation, SHA-256 provenance, locators, deterministic listing, and public-safe errors. Every tool remains planned and unexposed; Sprint 7.4 — lore and schema tools is next.",
)
replace_once(
    "README.md",
    "- Begin Sprint 7.3 on draft PR #55 by defining server-owned repository roots, source allowlists, prohibited paths, traversal and symlink isolation, digests, locators, truncation, and partial results before any tool reads repository content.",
    "- Begin Sprint 7.4 on draft PR #55 by implementing lore search, public content validation, quest-schema inspection, and quest validation through accepted public package exports without granting canon or mutation authority.",
)

replace_once(
    "docs/README.md",
    "[Local transport](architecture/forge-mcp-local-stdio-transport.md) · [Pre-Sprint 7 review]",
    "[Local transport](architecture/forge-mcp-local-stdio-transport.md) · [Source catalogue](architecture/forge-mcp-source-catalogue-and-provenance.md) · [Pre-Sprint 7 review]",
)
replace_section(
    "docs/README.md",
    "## Current orientation",
    "## Mission and non-negotiable boundaries",
    """## Current orientation

1. [Current Project Status](roadmap/current-status.md)
2. [Sprint 7 Execution Plan](roadmap/sprint-7-execution-plan.md)
3. [Forge MCP Boundary and Tool Registry](architecture/forge-mcp-boundary-and-tool-registry.md)
4. [Forge MCP Local `stdio` Transport](architecture/forge-mcp-local-stdio-transport.md)
5. [Forge MCP Source Catalogue and Provenance](architecture/forge-mcp-source-catalogue-and-provenance.md)
6. [Pre-Sprint 7 Repository Alignment Review](roadmap/pre-sprint-7-alignment-review.md)
7. [Sprint Roadmap](roadmap/sprints.md)
8. [Sprint 6 Completion Record](roadmap/sprint-6-completion-record.md)
9. [Aster Contract Baseline](product/aster-contract-baseline.md)
10. [Sprint 6 Cross-Contract Reconciliation](architecture/aster-sprint-6-cross-contract-reconciliation.md)
11. [Sprint 6 Control and Evidence Map](architecture/aster-sprint-6-control-and-evidence-map.md)
12. [Sprint 6 Specialist Holdpoints and Unresolved Work](architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md)
13. [Sprint 5 Completion Record](roadmap/sprint-5-completion-record.md)
14. [Security Architecture](security/README.md)
15. [Phase 0 Funding and Sponsorship Baseline](economics/README.md)
16. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](decisions/0010-consumer-first-provider-independent-boundary.md)
17. [Decision 0011 — Operational Simplicity and Durable Workflows](decisions/0011-operational-simplicity-and-durable-workflows.md)
18. [Repository and Module Boundaries](architecture/module-boundaries.md)
19. [Developer Experience and Operability Policy](policies/developer-experience-and-operability.md)
20. [Minimum Viable Validation](policies/minimum-viable-validation.md)
21. [Decision 0009 — Health Data Legacy and Post-Mortem Stewardship](decisions/0009-health-data-legacy-and-post-mortem-stewardship.md) — proposed future boundary""",
)
replace_once(
    "docs/README.md",
    "A finalized-version local `stdio` transport exists, but all tools remain planned and unexposed and no repository read exists yet. Sprint 7.3 is next.",
    "A finalized-version local `stdio` transport and server-owned allowlisted source core exist, but all tools remain planned and unexposed. Sprint 7.4 is next.",
)

replace_once(
    "docs/architecture/README.md",
    "[Forge boundary](forge-mcp-boundary-and-tool-registry.md) · [Sprint 7 plan]",
    "[Forge boundary](forge-mcp-boundary-and-tool-registry.md) · [Local transport](forge-mcp-local-stdio-transport.md) · [Source catalogue](forge-mcp-source-catalogue-and-provenance.md) · [Sprint 7 plan]",
)
replace_section(
    "docs/architecture/README.md",
    "## Read in this order",
    "## Operational simplicity and durable workflows",
    """## Read in this order

1. [Repository and Module Boundaries](module-boundaries.md)
2. [Calypso Engine](calypso-engine.md)
3. [Operational Simplicity and Durable Workflows](operational-simplicity-and-durable-workflows.md)
4. [Mission-to-Runtime Traceability](mission-to-runtime-traceability.md)
5. [Story Content Ontology](story-content-ontology.md)
6. [Story Studio](story-studio.md)
7. [Living Chronicle Ontology](living-chronicle-ontology.md)
8. [Consumer-First and Provider-Independent Architecture](consumer-first-provider-independent-boundary.md)
9. [House of Keys Ontology and Authority Boundary](house-of-keys-ontology.md)
10. [House of Keys Purpose Taxonomy](house-of-keys-purpose-taxonomy.md)
11. [House of Keys Data-Category Taxonomy](house-of-keys-data-category-taxonomy.md)
12. [House of Keys Grant, Recipient, Action, Scope, and Duration Model](house-of-keys-grant-recipient-action-duration-model.md)
13. [House of Keys Revocation and Lifecycle Model](house-of-keys-revocation-lifecycle-model.md)
14. [House of Keys Access Receipt and Audit Boundary](house-of-keys-access-receipt-audit-boundary.md)
15. [House of Keys Permission Explanation and Comprehension Model](house-of-keys-explanation-comprehension-model.md)
16. [House of Keys Deterministic Policy Evaluation Model](house-of-keys-policy-evaluation-model.md)
17. [House of Keys Contract and Validation Baseline](../product/house-of-keys-contract-baseline.md)
18. [Aster Contract Boundary](aster-contract-boundary.md)
19. [Aster Role Contracts](aster-role-contracts.md)
20. [Aster Proposal and Structured Extraction Contracts](aster-proposal-and-extraction-contracts.md)
21. [Aster Intent, Confidence, Clarification, and Refusal Contracts](aster-intent-confidence-clarification-refusal.md)
22. [Aster Source-Linked Recall and Explanation Contracts](aster-source-linked-recall-and-explanation-contracts.md)
23. [Aster Memory Classes and Lifecycle Contracts](aster-memory-lifecycle-contracts.md)
24. [Aster Prompt-Injection and Untrusted-Input Isolation Contracts](aster-untrusted-input-isolation-contracts.md)
25. [Aster Responsive and Deferred Work Contracts](aster-responsive-and-deferred-work-contracts.md)
26. [Aster Provider Governance and Egress Contracts](aster-provider-governance-and-egress-contracts.md)
27. [Aster Local Synthetic Adapter and Non-AI Fallbacks](aster-local-synthetic-adapter-and-non-ai-fallbacks.md)
28. [Aster Compatibility, Migration, and Cross-Contract Evidence](aster-compatibility-migration-and-cross-contract-evidence.md)
29. [Sprint 6 Cross-Contract Reconciliation](aster-sprint-6-cross-contract-reconciliation.md)
30. [Sprint 6 Control and Evidence Map](aster-sprint-6-control-and-evidence-map.md)
31. [Sprint 6 Specialist Holdpoint and Unresolved-Work Register](aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md)
32. [Forge MCP Boundary and Tool Registry](forge-mcp-boundary-and-tool-registry.md)
33. [Forge MCP Local `stdio` Transport](forge-mcp-local-stdio-transport.md)
34. [Forge MCP Source Catalogue and Provenance](forge-mcp-source-catalogue-and-provenance.md)
35. [Pre-Sprint 7 Repository Alignment Review](../roadmap/pre-sprint-7-alignment-review.md)
36. [Health Data Legacy and Succession Architecture](health-data-legacy-and-succession.md)""",
)
replace_once(
    "docs/architecture/README.md",
    "- [Sprint 7 Execution Plan](../roadmap/sprint-7-execution-plan.md)\n- [Pre-Sprint 7 Alignment Review]",
    "- [Forge MCP Local `stdio` Transport](forge-mcp-local-stdio-transport.md)\n- [Forge MCP Source Catalogue and Provenance](forge-mcp-source-catalogue-and-provenance.md)\n- [Sprint 7 Execution Plan](../roadmap/sprint-7-execution-plan.md)\n- [Pre-Sprint 7 Alignment Review]",
)
replace_once(
    "docs/architecture/README.md",
    "Sprint 7 is active on issue #54 and draft PR #55. Workstream 7.1 defines the application boundary, public source classes, server-owned registry, risk classes, planned tool contracts, prohibited capabilities, compatibility and migration references, resource-limit contracts, literal non-authority, funding neutrality, validators, and public tests.\n\nEvery initial tool remains planned and unexposed. No MCP transport or repository read is implemented yet.",
    "Sprint 7 is active on issue #54 and draft PR #55. Workstreams 7.1–7.3 define the application boundary, planned registry, finalized-version local transport, server-owned source catalogue, allowlisted repository access, path and symlink isolation, SHA-256 provenance, locators, deterministic listing, truncation, public-safe errors, and public tests.\n\nEvery initial tool remains planned and unexposed. The direct source core can read only named public roots; MCP discovery remains empty and tool calls remain refused.",
)

replace_once(
    "docs/roadmap/sprint-7-execution-plan.md",
    "- **Status:** ACTIVE — Sprint 7.1 complete and validated; Sprint 7.2 next",
    "- **Status:** ACTIVE — Sprint 7.1–7.3 implemented; exact-head validation pending; Sprint 7.4 next",
)
plan_path = "docs/roadmap/sprint-7-execution-plan.md"
plan = read(plan_path)
evidence = """## Sprint 7.3 evidence

Sprint 7.3 defines nine server-owned source roots, exact-file and recursive-tree allowlists, public and synthetic information-class coverage, process-root discovery, prohibited path and credential classes, normalized path resolution, plain and encoded traversal rejection, component-level symlink rejection, resolved-path containment, locale-independent ordering, SHA-256 content digests, byte and line counts, whole-file, line-range, and object locators, explicit truncation and partial reasons, public-safe errors, deterministic validators, and public synthetic tests.

The source core is available only through the direct application API. Every accepted MCP tool remains planned and unexposed; `tools/list` remains empty and `tools/call` remains refused.

"""
if evidence not in plan:
    write(plan_path, plan.replace("## Information handling", evidence + "## Information handling", 1))

replace_once(
    "docs/roadmap/current-status.md",
    "- **Current workstream:** 7.1 — Forge boundary and registry",
    "- **Current workstream:** 7.3 implemented; exact-head validation pending; 7.4 next",
)
replace_once(
    "docs/roadmap/current-status.md",
    "Workstream 7.1 defines the contract-only Forge application boundary, public source classes, server-owned tool registry, risk classes, planned tool identities, prohibited capabilities, compatibility, migration references, resource-limit contracts, non-authority, funding neutrality, validators, and public tests.",
    "Workstreams 7.1–7.3 define the Forge boundary, finalized-version local transport, nine server-owned source roots, exact allowlists, prohibited classes, traversal and symlink isolation, SHA-256 provenance, locators, deterministic listing, truncation, public-safe errors, validators, and public tests. All MCP tools remain planned and unexposed.",
)
replace_once(
    "docs/roadmap/current-status.md",
    "| Sprint 7.1 — Forge boundary and registry | issue #54; draft PR #55; [plan](sprint-7-execution-plan.md); [architecture](../architecture/forge-mcp-boundary-and-tool-registry.md) | contract-only application ownership, public source classes, server-owned registry, risk classes, planned tools, prohibitions, validators, and public tests | MCP transport, repository reads, enabled tools, remote hosting, private data, mutation, provider calls, or production readiness |",
    "| Sprint 7.1 — Forge boundary and registry | issue #54; draft PR #55; [plan](sprint-7-execution-plan.md); [architecture](../architecture/forge-mcp-boundary-and-tool-registry.md) | application ownership, public information classes, server-owned registry, risk classes, planned tools, prohibitions, validators, and public tests | enabled tools, private data, mutation, provider calls, or production readiness |\n| Sprint 7.2 — Local transport | [transport](../architecture/forge-mcp-local-stdio-transport.md) | finalized-version local `stdio`, initialization, cancellation, shutdown, framing, direct harness, and transport-safe errors | repository reads, enabled tools, remote hosting, providers, or consequential actions |\n| Sprint 7.3 — Source catalogue and provenance | [source architecture](../architecture/forge-mcp-source-catalogue-and-provenance.md) | server-owned roots, exact allowlists, path and symlink isolation, digests, locators, deterministic listing, truncation, and public-safe errors | MCP tool exposure, arbitrary filesystem access, search behavior, validation execution, generation, or authority |",
)
replace_once(
    "docs/roadmap/current-status.md",
    "- [`apps/mcp-forge`](../../apps/mcp-forge) — active Sprint 7 contract-only Forge boundary; all tools remain planned and unexposed",
    "- [`apps/mcp-forge`](../../apps/mcp-forge) — active Sprint 7 local transport and internal allowlisted source core; all tools remain planned and unexposed",
)

replace_once(
    "docs/roadmap/README.md",
    "[Forge boundary](../architecture/forge-mcp-boundary-and-tool-registry.md) · [Pre-Sprint 7 review]",
    "[Forge boundary](../architecture/forge-mcp-boundary-and-tool-registry.md) · [Local transport](../architecture/forge-mcp-local-stdio-transport.md) · [Source catalogue](../architecture/forge-mcp-source-catalogue-and-provenance.md) · [Pre-Sprint 7 review]",
)
replace_section(
    "docs/roadmap/README.md",
    "## Current orientation",
    "## Completion records and plans",
    """## Current orientation

1. [Current Project Status](current-status.md)
2. [Sprint 7 Execution Plan](sprint-7-execution-plan.md)
3. [Forge MCP Boundary and Tool Registry](../architecture/forge-mcp-boundary-and-tool-registry.md)
4. [Forge MCP Local `stdio` Transport](../architecture/forge-mcp-local-stdio-transport.md)
5. [Forge MCP Source Catalogue and Provenance](../architecture/forge-mcp-source-catalogue-and-provenance.md)
6. [Pre-Sprint 7 Alignment Review](pre-sprint-7-alignment-review.md)
7. [Sprint 6 Completion Record](sprint-6-completion-record.md)
8. [Sprint 6 Cross-Contract Reconciliation](../architecture/aster-sprint-6-cross-contract-reconciliation.md)
9. [Sprint 6 Control and Evidence Map](../architecture/aster-sprint-6-control-and-evidence-map.md)
10. [Sprint 6 Specialist Holdpoints and Unresolved Work](../architecture/aster-sprint-6-specialist-holdpoint-and-unresolved-work-register.md)
11. [Sprint Sequence](sprints.md)
12. [Pre-Sprint 6 Alignment Review](pre-sprint-6-alignment-review.md)
13. [Decision 0011 — Operational Simplicity and Durable Workflows](../decisions/0011-operational-simplicity-and-durable-workflows.md)
14. [Operational Simplicity and Durable Workflows Workstream](operational-simplicity-workstream.md)
15. [Mission-to-Runtime Traceability](../architecture/mission-to-runtime-traceability.md)
16. [Decision 0010 — Consumer-First, Provider-Independent Product Boundary](../decisions/0010-consumer-first-provider-independent-boundary.md)
17. [Consumer-First and Institutional Interoperability Workstream](consumer-first-provider-independent-workstream.md)
18. [Phase 0 Funding and Sponsorship Baseline](../economics/README.md)
19. [Proposed Health Data Legacy Workstream](health-data-legacy-workstream.md)
20. [Sprint 5 Completion Record](sprint-5-completion-record.md)
21. [Security Architecture](../security/README.md)
22. [Public Institutional Roadmap](../../ROADMAP.md)""",
)
replace_once(
    "docs/roadmap/README.md",
    "Workstream 7.1 defines the contract-only local application boundary, public source classes, server-owned registry, risk classes, planned tools, prohibited capabilities, validators, and public tests. It does not activate transport, repository reads, private Chronicle MCP, production agents, credentials, connectors, providers, or consequential actions.",
    "Workstreams 7.1–7.3 define the local application boundary, finalized-version transport, server-owned source catalogue, allowlisted reads, traversal and symlink isolation, SHA-256 provenance, locators, truncation, public-safe errors, validators, and public tests. They do not expose tools, private Chronicle MCP, production agents, credentials, connectors, providers, or consequential actions.",
)
