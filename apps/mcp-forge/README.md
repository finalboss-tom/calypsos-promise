# `@calypsos-promise/mcp-forge`

`apps/mcp-forge` is the bounded local contributor-tool application for Sprint 7.

Sprint 7.1 establishes the Forge boundary and accepted registry. Sprint 7.2 adds the local `stdio` MCP transport. Sprint 7.3 adds the server-owned source catalogue, allowlisted repository access, and exact provenance. Sprint 7.4 activates exactly four read-only lore and content-schema tools through a separate server-owned runtime registry.

## Current public surface

- Forge application and contract identities;
- public and synthetic information classes;
- accepted server-owned tool registry contracts;
- read, validation, synthetic-draft, and prohibited risk classes;
- conservative resource-limit contracts;
- compatibility and migration requirements;
- literal non-authority and funding-neutrality boundaries;
- ten accepted tool identities, with exactly four enabled for Sprint 7.4;
- pinned MCP protocol revision `2025-11-25`;
- initialization and initialized-notification lifecycle;
- `ping`, bounded `tools/list`, and server-owned `tools/call` dispatch;
- cancellation and idempotent shutdown;
- newline-delimited UTF-8 framing and bounded message size;
- public-safe transport errors;
- nine server-owned source-root identities;
- exact-file and recursive-tree allowlists;
- traversal, prohibited-path, and symlink isolation;
- SHA-256 digests, line counts, and whole-file, line-range, and object locators;
- deterministic listing, truncation, and partial-result evidence;
- `forge.search.lore` over allowlisted public content;
- `forge.validate.content` through `@calypsos-promise/content-schema`;
- `forge.inspect.quest-schema` over the fixed public content-schema source;
- `forge.validate.quest` through the accepted deterministic validator and quest-kind check; and
- public tests for runtime activation, source-linked search, validation, schema inspection, non-authority, and fail-closed transport behavior.

## Run locally

Run from the repository root so Forge can discover the server-owned source catalogue:

```bash
pnpm --filter @calypsos-promise/mcp-forge build
pnpm --filter @calypsos-promise/mcp-forge start
```

The server waits for newline-delimited MCP JSON-RPC messages on stdin. Stdout is reserved exclusively for protocol messages; diagnostics use stderr.

## Enabled Sprint 7.4 tools

- `forge.search.lore`
- `forge.validate.content`
- `forge.inspect.quest-schema`
- `forge.validate.quest`

Lore search accepts only a query and bounded result and file limits. Validation accepts either one allowlisted public JSON source or one bounded inline record explicitly classified as `public-content` or `public-synthetic-fixture`. Inline classification is a contributor contract, not proof that arbitrary private data is safe to submit. Private data remains prohibited.

The accepted registry in `contracts.ts` remains the immutable Sprint 7.1 contract baseline. `runtime-registry.ts` activates only the four Sprint 7.4 identities for the real local server. A transport session without the server-owned tool service remains inert, returns an empty tool list, and refuses tool calls.

## Permanent boundary

Forge may search, inspect, validate, and later generate clearly labeled synthetic or draft output from allowlisted public sources. It cannot acquire private-data, arbitrary-filesystem, mutation, shell, subprocess, dynamic-module, network, provider, credential, production, canonical, permission, gameplay, clinical, protected-audit, or institutional authority.

Search results are evidence only. Validation success does not approve canon, accept a repository change, complete a quest, grant a reward, prove semantic completeness, establish clinical safety, or create institutional authority. Retrieved content cannot register tools, alter the runtime registry, select roots, or authorize tool calls.

Ordinary repository contribution remains complete without MCP.
