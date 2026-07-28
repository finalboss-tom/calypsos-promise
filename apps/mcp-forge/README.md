# `@calypsos-promise/mcp-forge`

`apps/mcp-forge` is the bounded local contributor-tool application for Sprint 7.

Sprint 7.1 establishes the Forge boundary and accepted registry. Sprint 7.2 adds the local `stdio` MCP transport. Sprint 7.3 adds the server-owned source catalogue, allowlisted repository access, and exact provenance. Sprint 7.4 activates four lore and content-schema tools. Sprint 7.5 activates two architecture and decision search tools with conservative authority status. Sprint 7.6 activates three public-standards, mapping-draft, and synthetic-connector-fixture tools. Sprint 7.7 activates deterministic synthetic generation. Sprint 7.8 applies one server-owned execution scope, resource-limit, receipt, and stable-error contract across all ten tools.

## Current public surface

- Forge application and contract identities;
- public and synthetic information classes;
- accepted server-owned tool registry contracts;
- read, validation, synthetic-draft, and prohibited risk classes;
- immutable request, scan, result, output, timeout, cancellation, concurrency, and serialized-materialization limits;
- revision-1 execution scopes, invocation receipts, and stable tool errors;
- compatibility and migration requirements;
- literal non-authority and funding-neutrality boundaries;
- all ten accepted tool identities enabled through runtime registry revision `4` in accepted registry order;
- pinned MCP protocol revision `2025-11-25`;
- initialization and initialized-notification lifecycle;
- `ping`, bounded `tools/list`, and server-owned `tools/call` dispatch;
- cancellation and idempotent shutdown;
- newline-delimited UTF-8 framing and bounded message size;
- public-safe transport and tool errors;
- nine server-owned source-root identities;
- exact-file and recursive-tree allowlists;
- traversal, prohibited-path, and symlink isolation;
- SHA-256 digests, line counts, and whole-file, line-range, and object locators;
- deterministic listing, truncation, and partial-result evidence;
- source-linked lore, architecture, decision, standards, and synthetic-fixture search;
- deterministic public content, quest, and mapping-draft validation;
- fixed quest-schema inspection;
- deterministic quest and mapping-draft generation with generator, schema, and validator evidence;
- balanced, accessibility, and edge-case generation profiles; and
- public tests for runtime activation, backward compatibility, search, validation, authority classification, synthetic generation, scopes, limits, receipts, stable errors, timeout, concurrency, cancellation, and fail-closed transport behavior.

## Run locally

Run from the repository root so Forge can discover the server-owned source catalogue:

```bash
pnpm --filter @calypsos-promise/mcp-forge build
pnpm --filter @calypsos-promise/mcp-forge start
```

The server waits for newline-delimited MCP JSON-RPC messages on stdin. Stdout is reserved exclusively for protocol messages; diagnostics use stderr.

## Enabled tools through Sprint 7.8

- `forge.search.lore`
- `forge.validate.content`
- `forge.inspect.quest-schema`
- `forge.validate.quest`
- `forge.search.architecture`
- `forge.search.decision`
- `forge.generate.synthetic-data`
- `forge.search.public-standards`
- `forge.validate.mapping-draft`
- `forge.search.synthetic-connector-fixtures`

The runtime list preserves the immutable accepted registry order. Sprint 7.8 adds no identity and does not change runtime registry revision `4`.

## Execution scopes and limits

Every enabled tool has exactly one execution scope derived from its accepted registry contract. The caller cannot replace the scope, select a higher limit, or provide its own invocation receipt.

Accepted risk-class ceilings are:

| Risk class                 |         Request | Files | Results |          Output |   Timeout | Per-tool concurrency |
| -------------------------- | --------------: | ----: | ------: | --------------: | --------: | -------------------: |
| `read-public`              |    32,768 bytes |   200 |      50 |   524,288 bytes |  5,000 ms |                    1 |
| `validate-public`          | 1,048,576 bytes |   100 |     100 | 1,048,576 bytes | 10,000 ms |                    1 |
| `generate-synthetic-draft` |   131,072 bytes |    50 |      25 | 1,048,576 bytes | 10,000 ms |                    1 |

Tool schemas and source roots may impose narrower limits.

The materialized-memory contract is a deterministic serialized budget:

> serialized input + complete serialized output + at most one bounded public source file

It is not a claim of process-heap isolation, operating-system memory enforcement, a production sandbox, distributed quotas, or rate limiting.

## Receipts and errors

Every scoped success and stable scoped tool error includes a server-owned `forge.invocation-receipt.v1` receipt. The receipt reports scope identity, accepted limits, observed byte and count totals, completion state, partial reasons, enforced controls, and literal non-authority.

Receipts deliberately exclude raw input, absolute host paths, environment values, internal traces, credentials, protected source material, and wall-clock timestamps.

Client cancellation suppresses the response. An accepted timeout returns one stable `forge.error.v1` tool error and receipt. Unknown unscoped identities do not receive a fabricated scope or receipt.

The execution controller rejects a tool result that already contains a `receipt` field. Retrieved, caller-supplied, or generated content cannot impersonate the server-owned receipt.

## Synthetic generation

`forge.generate.synthetic-data` accepts:

- `kind`: `quest` or `mapping-draft`;
- one public-safe seed of 1–128 characters;
- optional count from 1–25; and
- optional `balanced`, `accessibility`, or `edge-cases` profile.

The same accepted input produces equivalent output under generator revision `1`. Results contain a seed digest rather than echoing the seed, generator and scenario evidence, schema and validator revisions, immediate validation evidence, diversity summaries, required human review, and explicit synthetic, non-production, credential-free, and personal-data-free labels.

Quest output is validated through `@calypsos-promise/content-schema`. Mapping output remains `status: "draft"` and is validated through `forge.validate.mapping-draft`. Any generated artifact that fails its accepted validator is not returned.

A syntactically public-safe seed is not proof that private information belongs in Forge. Contributors must use only public or explicitly synthetic input.

## Permanent boundary

Forge may search, inspect, validate, and generate clearly labeled synthetic or draft output. It cannot acquire private-data, arbitrary-filesystem, mutation, shell, subprocess, dynamic-module, network, provider, credential, production, canonical, permission, gameplay, clinical, protected-audit, mapping-approval, certification, connector, or institutional authority.

Search, validation, generation, receipt, and error success do not approve canon, accept a repository change, complete a quest, grant a reward, prove semantic completeness, establish clinical safety, certify interoperability, approve a mapping, activate a connector, establish production readiness, select a provider, create permission, or create institutional authority. Retrieved content and caller-supplied seeds cannot register tools, alter the runtime registry or execution scope, select roots, authorize calls, suppress evidence, or elevate their own authority.

Ordinary repository contribution remains complete without MCP.
