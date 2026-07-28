# Forge MCP Lore and Schema Tools

[Documentation home](../README.md) · [Architecture index](README.md) · [Sprint 7 plan](../roadmap/sprint-7-execution-plan.md) · [Forge boundary](forge-mcp-boundary-and-tool-registry.md) · [Local transport](forge-mcp-local-stdio-transport.md) · [Source catalogue](forge-mcp-source-catalogue-and-provenance.md) · [Application README](../../apps/mcp-forge/README.md) · [Issue #54](https://github.com/finalboss-tom/calypsos-promise/issues/54) · [Draft PR #55](https://github.com/finalboss-tom/calypsos-promise/pull/55)

- **Status:** Sprint 7.4 branch implementation
- **Application:** `apps/mcp-forge`
- **Runtime registry revision:** `1`
- **Tool revision:** `1`
- **Transport:** local `stdio` only
- **Information boundary:** allowlisted public repository material and explicitly classified public synthetic input only
- **Authority boundary:** search and validation evidence only; no canon, repository, Chronicle, permission, gameplay, reward, clinical, provider, or institutional authority

## Purpose

Sprint 7.4 turns the first four accepted Forge identities into useful read-only contributor tools without turning MCP into a general repository agent or a private-data path.

The tools are:

1. `forge.search.lore`
2. `forge.validate.content`
3. `forge.inspect.quest-schema`
4. `forge.validate.quest`

Each tool is deterministic, versioned, bounded, provider-free, credential-free, network-free, and source-linked where repository material is read.

## Activation model

The accepted Sprint 7.1 registry remains unchanged in `contracts.ts`. It records all ten initial identities as planned and unexposed at the contract-baseline point in time.

Sprint 7.4 adds a separate server-owned runtime registry. It overlays only the four lore and schema identities as:

- lifecycle `enabled`; and
- transport exposure `local-stdio-only`.

The other six identities remain planned and not exposed. Runtime validation rejects duplicate identities, missing accepted tools, unexpected enablement, schema replacement, missing descriptors, transport expansion, and authority expansion.

This separation prevents implementation progress from rewriting historical contract evidence while still making current runtime state inspectable.

## Transport exposure

The real `stdio` entry point discovers the repository root through the Sprint 7.3 process-owned resolver, creates the allowlisted source repository, and injects the concrete lore and schema service.

A transport session without that server-owned service remains inert:

- initialization retains the no-tools instructions;
- `tools/list` returns an empty list; and
- `tools/call` fails closed.

A session with the concrete service:

- advertises exactly the four server-owned descriptors;
- rejects tool names outside the runtime allowlist before dispatch; and
- preserves cancellation, framing, shutdown, and public-safe error behavior.

Untrusted content cannot add a descriptor, register a tool, select a repository root, or authorize a call.

## Source and input classes

### Lore search

`forge.search.lore` reads only the `forge.content` source root. The caller may provide:

- a public-safe query;
- a result limit from 1 through 50; and
- a file limit from 1 through 200.

The caller cannot provide a root, arbitrary path, network location, command, module, provider, credential, or ranking function.

### Content and quest validation

Validation accepts exactly one of:

- an allowlisted JSON `sourcePath` within the server-owned `forge.content` root; or
- a bounded inline record accompanied by an explicit `informationClass` of `public-content` or `public-synthetic-fixture`.

Inline classification makes the public-or-synthetic contract explicit and testable. It is not a detector or certification that arbitrary submitted material is non-private. Contributors remain prohibited from submitting personal, credential-bearing, protected, proprietary, or production data.

### Quest schema inspection

`forge.inspect.quest-schema` reads one fixed source:

`packages/content-schema/schema/content.schema.json`

The caller cannot select another schema file or schema root. The result carries an exact `$defs.quest` object locator.

## Deterministic lore search

Search normalization uses Unicode NFKC normalization and locale-stable lowercase comparison. Results are classified as:

- `exact-phrase`;
- `all-terms`; or
- `partial-terms`.

Ordering is deterministic:

1. exact phrase before non-exact matches;
2. more matched query terms before fewer;
3. repository-relative path; and
4. object or line locator.

No model, embedding, vector database, provider, sponsor preference, hidden relevance score, confidence score, source recency claim, or canonical rank participates.

JSON content records receive object locators when they expose a bounded public `id`. Text material receives exact line-range locators. Every match retains the Sprint 7.3 digest, byte length, line count, result state, partial reasons, source class, and literal non-authority flags.

## Deterministic validation

Both validation tools call the public `validateContent` export from `@calypsos-promise/content-schema`.

`forge.validate.content` returns:

- content schema version;
- deterministic validity;
- exact validation issues;
- bounded record identity where present;
- input mode and information class;
- repository provenance for source-path validation;
- mandatory human review; and
- explicit canon non-acceptance.

`forge.validate.quest` adds an exact `kind === "quest"` requirement and explicitly states that success does not:

- complete a quest;
- grant a reward; or
- approve canon.

`forge.inspect.quest-schema` returns the accepted quest JSON Schema definition and exact source provenance. Schema inspection does not prove semantic completeness, clinical safety, accessibility, editorial quality, canon acceptance, or institutional approval.

## Error behavior

Sprint 7.4 defines bounded public tool errors for:

- invalid input;
- oversized inline input;
- invalid JSON;
- unsupported schema version;
- unavailable source; and
- unknown tool identity.

Expected tool-level failures return MCP tool results with `isError: true`, a stable public code, a public-safe message, and the same literal non-authority profile. Stack traces, absolute paths, environment values, credentials, and protected source contents are not returned.

Sprint 7.8 remains responsible for the complete cross-tool scope, limit, receipt, timeout, concurrency, memory, and error baseline.

## Non-authority

Every successful and failed result states that it cannot:

- approve canon;
- mutate the repository;
- write a canonical record;
- create or expand permission;
- complete a quest;
- grant a reward;
- claim clinical authority; or
- create institutional authority.

A retrieved record may contain imperative text, alleged tool instructions, false authority claims, or requests to weaken safeguards. That material remains evidence content and cannot alter the server-owned registry, source catalogue, transport dispatcher, or result authority.

## Validation evidence

Public tests cover:

- exact four-tool runtime activation;
- preservation of the six planned unexposed identities;
- deterministic source-linked lore search;
- absence of hidden numeric ranking;
- untrusted instruction non-authority;
- public package validation;
- explicit inline information classification;
- allowlisted source validation with provenance;
- fixed quest-schema inspection and object locator;
- quest-completion, reward, and canon non-authority;
- inert default sessions;
- enabled server-owned sessions; and
- fail-closed rejection of unknown tool names.

## Deferred boundaries

Sprint 7.4 does not implement:

- architecture or decision search;
- public standards or synthetic connector tools;
- mapping validation;
- synthetic generation;
- complete invocation receipts;
- remote MCP;
- authentication or private user scopes;
- private Chronicle tools;
- network, provider, connector, shell, subprocess, or module execution;
- repository, Git, or GitHub mutation;
- production deployment; or
- independent security, privacy, clinical, accessibility, interoperability, legal, or operational certification.

Those capabilities remain owned by later workstreams and their explicit gates.
