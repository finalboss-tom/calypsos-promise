from pathlib import Path


def replace(path: str, old: str, new: str) -> None:
    file = Path(path)
    text = file.read_text()
    if old not in text:
        raise SystemExit(f"missing expected text in {path}: {old[:120]}")
    file.write_text(text.replace(old, new, 1))


replace(
    "docs/architecture/README.md",
    "[Local transport](forge-mcp-local-stdio-transport.md) · [Sprint 7 plan]",
    "[Local transport](forge-mcp-local-stdio-transport.md) · [Source catalogue](forge-mcp-source-catalogue-and-provenance.md) · [Sprint 7 plan]",
)
replace(
    "docs/architecture/README.md",
    "- [Forge MCP Local `stdio` Transport](forge-mcp-local-stdio-transport.md)\n- [Forge MCP Local `stdio` Transport](forge-mcp-local-stdio-transport.md)\n- [Forge MCP Source Catalogue and Provenance]",
    "- [Forge MCP Local `stdio` Transport](forge-mcp-local-stdio-transport.md)\n- [Forge MCP Source Catalogue and Provenance]",
)
replace(
    "docs/architecture/README.md",
    "Sprint 7 is active on issue #54 and draft PR #55. Workstreams 7.1 and 7.2 define the application boundary, public source classes, server-owned registry, risk classes, planned tool contracts, prohibited capabilities, finalized-version local `stdio` transport, direct harness, cancellation, shutdown, framing, public-safe errors, compatibility references, literal non-authority, funding neutrality, validators, and public tests.",
    "Sprint 7 is active on issue #54 and draft PR #55. Workstreams 7.1–7.3 define the application boundary, planned registry, finalized-version local `stdio` transport, server-owned source catalogue, allowlisted repository access, path and symlink isolation, SHA-256 provenance, locators, deterministic listing, truncation, public-safe errors, compatibility references, literal non-authority, funding neutrality, validators, and public tests.",
)
replace(
    "docs/architecture/README.md",
    "Every initial tool remains planned and unexposed. The local transport is implemented, but no repository read is implemented yet. Sprint 7.3 owns source catalogues and provenance.",
    "Every initial tool remains planned and unexposed. The direct source core can read only named public roots; MCP discovery remains empty and tool calls remain refused. Sprint 7.4 owns lore and schema tools.",
)

replace(
    "docs/roadmap/README.md",
    "[Local transport](../architecture/forge-mcp-local-stdio-transport.md) · [Pre-Sprint 7 review]",
    "[Local transport](../architecture/forge-mcp-local-stdio-transport.md) · [Source catalogue](../architecture/forge-mcp-source-catalogue-and-provenance.md) · [Pre-Sprint 7 review]",
)
replace(
    "docs/roadmap/README.md",
    "Sprint 7 — Forge MCP and Agent Safety is active through issue #54 and draft PR #55. Workstreams 7.1 and 7.2 define the bounded application, public source classes, server-owned registry, risk classes, planned tools, prohibited capabilities, finalized-version local `stdio` transport, direct harness, cancellation, shutdown, framing, validators, and public tests. The transport does not activate repository reads, enabled tools, private Chronicle MCP, production agents, credentials, connectors, providers, or consequential actions. Sprint 7.3 is next.",
    "Sprint 7 — Forge MCP and Agent Safety is active through issue #54 and draft PR #55. Workstreams 7.1–7.3 define the bounded application, planned registry, finalized-version local `stdio` transport, nine server-owned source roots, exact allowlists, prohibited classes, traversal and symlink isolation, SHA-256 provenance, locators, deterministic listing, truncation, public-safe errors, validators, and public tests. All MCP tools remain planned and unexposed; Sprint 7.4 is next.",
)

replace(
    "docs/roadmap/current-status.md",
    "[Local transport](../architecture/forge-mcp-local-stdio-transport.md) · [Pre-Sprint 7 review]",
    "[Local transport](../architecture/forge-mcp-local-stdio-transport.md) · [Source catalogue](../architecture/forge-mcp-source-catalogue-and-provenance.md) · [Pre-Sprint 7 review]",
)
replace(
    "docs/roadmap/current-status.md",
    "- **Completed Sprint 7 workstreams:** 7.1 — Forge boundary and registry; 7.2 — local transport\n- **Current workstream:** 7.3 — source catalogue and provenance\n- **Runtime status:** bounded public repository gateway plus local Forge `stdio` transport with no enabled tools or repository reads",
    "- **Completed Sprint 7 workstreams:** 7.1 — Forge boundary and registry; 7.2 — local transport; 7.3 — source catalogue and provenance\n- **Current workstream:** 7.4 — lore and schema tools\n- **Runtime status:** bounded public repository gateway plus local Forge `stdio` transport and internal allowlisted source core; no enabled MCP tools",
)
replace(
    "docs/roadmap/current-status.md",
    "The [Pre-Sprint 7 Alignment Review](pre-sprint-7-alignment-review.md) merged through PR #52 as squash commit `a41ca5ad9d2c0fe8a009946f376705bb7910e223`. Sprint 7 is active through issue #54 and draft PR #55. Workstreams 7.1 and 7.2 define the Forge application boundary, public source classes, server-owned tool registry, risk classes, planned tool identities, prohibited capabilities, finalized-version local `stdio` transport, direct harness, cancellation, shutdown, framing, public-safe errors, compatibility references, non-authority, funding neutrality, validators, and public tests. All tools remain unexposed and no repository read exists yet.",
    "The [Pre-Sprint 7 Alignment Review](pre-sprint-7-alignment-review.md) merged through PR #52 as squash commit `a41ca5ad9d2c0fe8a009946f376705bb7910e223`. Sprint 7 is active through issue #54 and draft PR #55. Workstreams 7.1–7.3 define the Forge application boundary, planned tool registry, finalized-version local `stdio` transport, nine server-owned source roots, exact allowlists, prohibited classes, traversal and symlink isolation, SHA-256 provenance, locators, deterministic listing, truncation, public-safe errors, compatibility references, non-authority, funding neutrality, validators, and public tests. All MCP tools remain planned and unexposed.",
)
replace(
    "docs/roadmap/current-status.md",
    "| Sprint 7.2 — Local transport             | issue #54; draft PR #55; [transport](../architecture/forge-mcp-local-stdio-transport.md)                                             | finalized-version local `stdio`, initialization, empty tool discovery, cancellation, shutdown, framing, errors, direct harness, and tests    | repository reads, enabled tools, source provenance, remote hosting, private data, providers, or production readiness            |",
    "| Sprint 7.2 — Local transport             | issue #54; draft PR #55; [transport](../architecture/forge-mcp-local-stdio-transport.md)                                             | finalized-version local `stdio`, initialization, empty tool discovery, cancellation, shutdown, framing, errors, direct harness, and tests    | repository reads, enabled tools, source provenance, remote hosting, private data, providers, or production readiness            |\n| Sprint 7.3 — Source catalogue and provenance | issue #54; draft PR #55; [source architecture](../architecture/forge-mcp-source-catalogue-and-provenance.md) | server-owned roots, exact allowlists, path and symlink isolation, digests, locators, deterministic listing, truncation, errors, and tests | MCP tool exposure, arbitrary filesystem access, search behavior, validation execution, generation, or authority |",
)
replace(
    "docs/roadmap/current-status.md",
    "- [`apps/mcp-forge`](../../apps/mcp-forge) — active Sprint 7 Forge boundary and local `stdio` transport; all tools remain planned and unexposed and repository reads remain disabled",
    "- [`apps/mcp-forge`](../../apps/mcp-forge) — active Sprint 7 local transport and internal allowlisted source core; all MCP tools remain planned and unexposed",
)

replace(
    "docs/roadmap/sprint-7-execution-plan.md",
    "[Local transport](../architecture/forge-mcp-local-stdio-transport.md) · [Tracking issue #54]",
    "[Local transport](../architecture/forge-mcp-local-stdio-transport.md) · [Source catalogue](../architecture/forge-mcp-source-catalogue-and-provenance.md) · [Tracking issue #54]",
)
replace(
    "docs/roadmap/sprint-7-execution-plan.md",
    "- **Status:** ACTIVE — Sprint 7.1 and 7.2 complete and validated; Sprint 7.3 next",
    "- **Status:** ACTIVE — Sprint 7.1–7.3 implemented; exact-head validation pending; Sprint 7.4 next",
)
replace(
    "docs/roadmap/sprint-7-execution-plan.md",
    "**Exit:** no caller-selected root or arbitrary file can be read; every result has public-safe provenance.",
    "**Exit:** met at the branch evidence level. No caller-selected root or arbitrary file can be read; every result has public-safe provenance. Exact-head CI and DCO remain the closure gate.",
)

replace(
    "docs/README.md",
    "The [Sprint 7 Execution Plan](roadmap/sprint-7-execution-plan.md), [Forge Boundary](architecture/forge-mcp-boundary-and-tool-registry.md), and [Local Transport](architecture/forge-mcp-local-stdio-transport.md) govern the validated 7.1 and 7.2 baselines.",
    "The [Sprint 7 Execution Plan](roadmap/sprint-7-execution-plan.md), [Forge Boundary](architecture/forge-mcp-boundary-and-tool-registry.md), [Local Transport](architecture/forge-mcp-local-stdio-transport.md), and [Source Catalogue](architecture/forge-mcp-source-catalogue-and-provenance.md) govern the implemented 7.1–7.3 baselines.",
)
