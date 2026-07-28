# `@calypsos-promise/mcp-forge`

`apps/mcp-forge` is the bounded local contributor-tool application for Sprint 7.

Sprint 7.1 establishes the Forge boundary and accepted registry. Sprint 7.2 adds the local `stdio` MCP transport. Sprint 7.3 adds the server-owned source catalogue, allowlisted repository access, and exact provenance. Sprint 7.4 activates four lore and content-schema tools. Sprint 7.5 activates two architecture and decision search tools with conservative authority status. Sprint 7.6 activates three public-standards, mapping-draft, and synthetic-connector-fixture tools. Sprint 7.7 activates deterministic synthetic generation.

## Current public surface

- Forge application and contract identities;
- public and synthetic information classes;
- accepted server-owned tool registry contracts;
- read, validation, synthetic-draft, and prohibited risk classes;
- conservative resource-limit contracts;
- compatibility and migration requirements;
- literal non-authority and funding-neutrality boundaries;
- all ten accepted tool identities enabled through runtime registry revision `4` in accepted registry order;
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
- source-linked lore, architecture, decision, standards, and synthetic-fixture search;
- deterministic public content, quest, and mapping-draft validation;
- fixed quest-schema inspection;
- deterministic quest and mapping-draft generation with generator, schema, and validator evidence;
- balanced, accessibility, and edge-case generation profiles; and
- public tests for runtime activation, backward compatibility, search, validation, authority classification, synthetic generation, cancellation, and fail-closed transport behavior.

## Run locally

Run from the repository root so Forge can discover the server-owned source catalogue:

```bash
pnpm --filter @calypsos-promise/mcp-forge build
pnpm --filter @calypsos-promise/mcp-forge start
```

The server waits for newline-delimited MCP JSON-RPC messages on stdin. Stdout is reserved exclusively for protocol messages; diagnostics use stderr.

## Enabled tools through Sprint 7.7

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

The runtime list preserves the immutable accepted registry order. The six tools validated through Sprint 7.5 and the additional three tools validated in Sprint 7.6 remain operational inside the ten-tool runtime.

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

Search, validation, and generation success do not approve canon, accept a repository change, complete a quest, grant a reward, prove semantic completeness, establish clinical safety, certify interoperability, approve a mapping, activate a connector, establish production readiness, select a provider, create permission, or create institutional authority. Retrieved content and caller-supplied seeds cannot register tools, alter the runtime registry, select roots, authorize calls, suppress evidence, or elevate their own authority.

Ordinary repository contribution remains complete without MCP.
