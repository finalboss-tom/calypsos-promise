# `@calypsos-promise/mcp-forge`

`apps/mcp-forge` is the bounded local contributor-tool application for Sprint 7.

Sprint 7.1 establishes the Forge boundary and registry. Sprint 7.2 adds a local `stdio` MCP transport and direct invocation harness while keeping every planned tool unexposed and every repository read disabled.

## Current public surface

- Forge application and contract identities;
- public and synthetic information classes;
- server-owned tool registry contracts;
- read, validation, synthetic-draft, and prohibited risk classes;
- conservative resource-limit contracts;
- compatibility and migration requirements;
- literal non-authority and funding-neutrality boundaries;
- ten planned accepted tool identities;
- deterministic validators and public synthetic tests;
- pinned MCP protocol revision `2025-11-25`;
- initialization and initialized-notification lifecycle;
- `ping` and empty `tools/list` behavior;
- deterministic refusal of all `tools/call` requests;
- cancellation and idempotent shutdown;
- newline-delimited UTF-8 framing and bounded message size;
- public-safe transport errors; and
- a direct transport harness and stream-level tests.

## Run locally

```bash
pnpm --filter @calypsos-promise/mcp-forge build
pnpm --filter @calypsos-promise/mcp-forge start
```

The server waits for newline-delimited MCP JSON-RPC messages on stdin. Stdout is reserved exclusively for protocol messages; diagnostics use stderr.

## Permanent boundary

Forge may eventually search, inspect, validate, and generate clearly labeled synthetic or draft output from allowlisted public sources. It cannot acquire private-data, arbitrary-filesystem, mutation, shell, subprocess, dynamic-module, network, provider, credential, production, canonical, permission, gameplay, clinical, protected-audit, or institutional authority.

All initial tools remain `planned` and `not-exposed`. Sprint 7.2 does not read repository files, resolve roots, inspect paths, search, validate content, or generate data. Later workstreams must implement source catalogues, path isolation, provenance, tool behavior, limits, receipts, compatibility, migration, and agent-security evidence before any tool becomes exposed.

Ordinary repository contribution remains complete without MCP.
