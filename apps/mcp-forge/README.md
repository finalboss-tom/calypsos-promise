# `@calypsos-promise/mcp-forge`

`apps/mcp-forge` is the bounded local contributor-tool application for Sprint 7.

Sprint 7.1 establishes the Forge boundary and accepted registry. Sprint 7.2 adds local `stdio` MCP transport. Sprint 7.3 adds the server-owned source catalogue and exact provenance. Sprint 7.4–7.7 activate all ten accepted search, inspection, validation, and deterministic-generation tools. Sprint 7.8 applies immutable execution scopes, resource limits, receipts, and stable errors. Sprint 7.9 adds the adversarial security matrix, runtime integrity, successful-result security postconditions, compatibility and migration records, clean-startup evidence, and provider-independent operability.

## Current public surface

- accepted server-owned tool, source, risk, execution, security, compatibility, and operability contracts;
- all ten accepted identities enabled through runtime registry revision `4` in accepted registry order;
- execution contract revision `1` with request, scan, result, output, timeout, cancellation, concurrency, and serialized-materialization limits;
- invocation receipt `forge.invocation-receipt.v1` and stable error `forge.error.v1`;
- MCP protocol revision `2025-11-25` over newline-delimited local `stdio`;
- nine server-owned source roots with exact allowlists, traversal and symlink isolation, and SHA-256 provenance;
- source-linked lore, architecture, decision, standards, and synthetic-connector search;
- deterministic public content, quest, and mapping-draft validation;
- fixed quest-schema inspection;
- deterministic quest and mapping-draft generation;
- runtime-integrity checks over server-owned registries, descriptors, sources, and scopes;
- successful-result security postconditions preserving provenance, partial states, synthetic labels, mapping non-authority, and the common authority boundary;
- versioned compatibility and migration records; and
- public tests for the complete adversarial, compatibility, migration, clean-startup, and operability surface.

## Run and validate locally

Run from the repository root or a descendant directory. Forge discovers the repository through accepted ancestor markers; callers do not provide the root.

```bash
pnpm --filter @calypsos-promise/mcp-forge build
pnpm --filter @calypsos-promise/mcp-forge test
pnpm --filter @calypsos-promise/mcp-forge start
pnpm check
```

The server waits for newline-delimited MCP JSON-RPC messages on stdin. Stdout is reserved exclusively for protocol messages; public-safe diagnostics use stderr.

Clean startup requires no credentials, network, provider, database, authentication service, queue, scheduler, or remote endpoint. The focused startup test launches the compiled entrypoint from `apps/mcp-forge/src` with an empty environment, initializes MCP, lists exactly ten tools, calls deterministic generation, receives a bounded receipt, and exits cleanly.

## Enabled tools through Sprint 7.9

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

Sprint 7.9 adds no identity and does not change runtime registry revision `4` or any accepted tool schema.

## Execution scopes and limits

Every enabled tool has exactly one execution scope derived from its accepted registry contract. The caller cannot replace the scope, select a higher limit, or provide its own invocation receipt.

| Risk class                 |         Request | Files | Results | Complete output |   Timeout | Per-tool concurrency |
| -------------------------- | --------------: | ----: | ------: | --------------: | --------: | -------------------: |
| `read-public`              |    32,768 bytes |   200 |      50 |   524,288 bytes |  5,000 ms |                    1 |
| `validate-public`          | 1,048,576 bytes |   100 |     100 | 1,048,576 bytes | 10,000 ms |                    1 |
| `generate-synthetic-draft` |   131,072 bytes |    50 |      25 | 1,048,576 bytes | 10,000 ms |                    1 |

Tool schemas and source roots may impose narrower limits.

The materialized-memory contract is a deterministic serialized budget:

> serialized input + complete serialized output + at most one bounded public source file

It is not a claim of peak process-heap enforcement, operating-system isolation, production sandboxing, distributed quotas, or rate limiting.

## Receipts and errors

Every scoped success and stable scoped tool error includes one server-owned receipt reporting scope identity, accepted limits, observed byte and count totals, completion state, partial reasons, enforced controls, and literal non-authority.

Receipts exclude raw input, absolute host paths, environment values, internal traces, credentials, protected source material, and wall-clock timestamps. Client cancellation suppresses the response. An accepted timeout returns one stable bounded error and receipt.

## Agent-security postconditions

Before each real tool operation, Forge verifies fingerprints for the boundary, accepted registry, source catalogue, enabled identities, descriptors, runtime registry, and execution scopes.

After each successful raw operation—and before a receipt is assembled—Forge verifies the result still contains the evidence and non-authority required for that tool. The call fails closed if a result:

- loses provenance, a digest, locator, or visible partial state;
- redirects to another tool identity;
- removes the common non-authority profile;
- promotes ambiguous documentation authority;
- claims standards completeness or certification;
- removes synthetic connector or generated-data labels;
- activates a connector or selects a provider;
- removes mapping human review or claims approval or equivalence;
- claims canon, gameplay, reward, clinical, permission, production, or institutional authority; or
- attempts to supply its own receipt.

Stable security failures use `forge.security.integrity-violation` or `forge.security.postcondition-failed` inside the existing bounded error envelope.

## Compatibility and migration

Forge is pre-stable, exact-revision, and fail-closed.

The compatibility manifest binds contract `0.1.0-pre.1`, accepted registry `1`, runtime registry `4`, execution contract `1`, source catalogue `1`, protocol `2025-11-25`, receipt v1, and error v1.

Recorded migrations cover additive runtime revisions `1` → `2`, `2` → `3`, `3` → `4`, and the revision-1 execution envelope. No record removes a tool, replaces an accepted schema, or expands authority. Unknown revisions fail closed; breaking changes require migration evidence; authority expansion requires an accepted governing decision.

## Provider and Aster independence

Production Forge source is statically tested to contain no shell, subprocess, network-client, socket, VM, worker-thread, dynamic-import, `eval`, or `require` primitive. Runtime tests also install a fetch trap and observe no network call.

The package dependency surface remains exactly `@calypsos-promise/content-schema`. Forge does not depend on `@calypsos-promise/aster`, so issue #50 remains untriggered absent a genuine Aster consumer and concrete ergonomics evidence.

## Synthetic generation

`forge.generate.synthetic-data` accepts a `quest` or `mapping-draft` kind, one public-safe seed of 1–128 characters, an optional count from 1–25, and an optional `balanced`, `accessibility`, or `edge-cases` profile.

The same accepted input produces equivalent output under generator revision `1`. Results hash rather than echo the seed, validate every artifact, and retain explicit synthetic, non-production, credential-free, personal-data-free, human-review-required, and non-authoritative state.

A syntactically public-safe seed is not proof that private information belongs in Forge. Contributors must use only public or explicitly synthetic input.

## Evidence limits

The adversarial suite is local public and synthetic evidence. It does not establish independent penetration testing, production deployment, process or operating-system isolation, privacy certification, production monitoring, incident response, provider approval, standards certification, clinical safety, or institutional approval.

## Permanent boundary

Forge may search, inspect, validate, and generate clearly labeled synthetic or draft output. It cannot acquire private-data, arbitrary-filesystem, mutation, shell, subprocess, dynamic-module, network, provider, credential, production, canonical, permission, gameplay, clinical, protected-audit, mapping-approval, certification, connector, or institutional authority.

Search, validation, generation, integrity, security-postcondition, receipt, error, compatibility, startup, and CI success do not approve canon, accept a repository change, complete a quest, grant a reward, establish clinical or statistical safety, certify interoperability, approve a mapping, activate a connector, select a provider, create permission, or create institutional authority.

Ordinary repository contribution remains complete without MCP.
