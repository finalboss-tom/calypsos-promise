# Forge MCP Agent Security, Compatibility, and Operability

[Documentation home](../README.md) · [Architecture index](README.md) · [Sprint 7 plan](../roadmap/sprint-7-execution-plan.md) · [Current status](../roadmap/current-status.md) · [Forge boundary](forge-mcp-boundary-and-tool-registry.md) · [Source catalogue](forge-mcp-source-catalogue-and-provenance.md) · [Execution scopes and receipts](forge-mcp-scopes-limits-receipts-and-errors.md) · [Issue #54](https://github.com/finalboss-tom/calypsos-promise/issues/54) · [Draft PR #55](https://github.com/finalboss-tom/calypsos-promise/pull/55)

- **Status:** active Sprint 7.9 public-contract and local deterministic-evidence baseline
- **Security contract revision:** `1`
- **Compatibility manifest revision:** `1`
- **Operability contract revision:** `1`
- **Accepted registry revision:** `1`
- **Runtime registry revision:** `4`
- **Execution contract revision:** `1`
- **Transport:** local `stdio` only
- **Information classes:** public repository material and explicitly synthetic data only

## Purpose

Sprint 7.9 proves that the completed Forge surface remains useful under adversarial input without becoming a general agent runtime, arbitrary resource browser, provider gateway, mutation service, or institutional authority.

The baseline combines:

- a versioned adversarial scenario matrix;
- pre-operation source and request isolation;
- runtime-integrity checks over server-owned contracts;
- security postconditions over every successful tool result;
- stable compatibility and migration records;
- clean local startup and contributor workflow evidence; and
- a static production-source audit for prohibited execution primitives.

This is public contract, local runtime, and synthetic test evidence. It is not independent penetration testing, production sandbox certification, privacy certification, provider certification, clinical validation, or operational readiness.

## Defense layers

### 1. Server-owned registry and source authority

The accepted registry, runtime registry, source catalogue, descriptors, and execution scopes remain server-owned. Callers and retrieved content cannot choose roots, register tools, add capabilities, expand limits, or replace schemas.

### 2. Request and source isolation

Unknown fields fail closed. Traversal, encoded traversal, absolute paths, URI paths, backslashes, prohibited path classes, exact-file violations, and symlink escape are rejected before protected material can be returned.

### 3. Runtime integrity

Before each real tool operation, Forge verifies SHA-256 fingerprints for:

- the application boundary;
- accepted tool registry;
- source catalogue;
- enabled tool identities;
- MCP descriptors;
- runtime registry; and
- execution scopes.

A post-initialization change fails closed with `forge.security.integrity-violation`. The check protects the in-process server-owned contract surface; it does not claim operating-system attestation, code signing, secure boot, or protection from a fully compromised host process.

### 4. Central execution enforcement

The revision-1 execution controller continues to enforce request, scan, result, output, timeout, cancellation, per-tool concurrency, and serialized-materialization limits before a receipt is assembled.

### 5. Successful-result security postconditions

Every real successful tool result is checked before its invocation receipt is created. Postconditions preserve:

- the complete common non-authority profile;
- source-linked provenance, repository-relative paths, SHA-256 digests, and bounded locators;
- visible complete, partial, and truncated states;
- exact materialized result counts;
- conservative documentation authority;
- standards non-certification and provider neutrality;
- synthetic connector labels and non-production state;
- content, quest, and schema non-authority;
- mapping draft status, human review, and denial of approval or equivalence; and
- deterministic generation labels, validation evidence, and non-authority.

A successful raw result that removes required evidence or claims authority fails with `forge.security.postcondition-failed` and receives only a bounded public-safe error receipt.

## Adversarial matrix

| Scenario                         | Required behavior                                              | Primary evidence                           |
| -------------------------------- | -------------------------------------------------------------- | ------------------------------------------ |
| Path traversal                   | reject during source resolution                                | source isolation tests                     |
| Symlink escape                   | reject during source resolution                                | source isolation tests                     |
| Arbitrary root selection         | reject before operation                                        | strict tool-input tests                    |
| Shell execution                  | absent from production surface                                 | static production-source audit             |
| Network access                   | absent from production surface and unused at runtime           | static audit and fetch trap                |
| Dynamic module loading           | absent from production surface                                 | static production-source audit             |
| Registry mutation                | fail runtime integrity                                         | integrity validator tests                  |
| Scope mutation                   | fail runtime integrity                                         | integrity validator tests                  |
| Confused deputy                  | reject mismatched or authority-bearing result                  | execution and security-postcondition tests |
| Source evidence suppression      | preserve visible evidence or fail closed                       | security-postcondition tests               |
| Oversized input                  | reject before operation                                        | execution-limit tests                      |
| Timeout                          | return stable bounded error                                    | real accepted-timeout test                 |
| Cancellation                     | suppress cancelled response                                    | execution and transport tests              |
| Receipt leakage or impersonation | reject result-owned receipt and disclose no protected material | receipt and security tests                 |
| Synthetic-label removal          | reject successful result                                       | generation postcondition test              |
| Mapping self-approval            | reject successful result                                       | mapping postcondition test                 |
| Funding influence                | reject contract mutation and unknown sponsor fields            | boundary and input tests                   |
| Protected-source access          | reject before read and disclose no path or content             | source isolation and service tests         |

All scenario records are public-or-synthetic-only, evidence-preserving, and explicitly unable to expand authority.

## Static production-source audit

The focused 7.9 test scans `apps/mcp-forge/src/**/*.ts` and fails if production code introduces:

- `node:child_process`, networking sockets, HTTP clients, TLS, VM, or worker-thread imports;
- `fetch`, WebSocket, or XMLHttpRequest calls;
- `eval` or `new Function`;
- dynamic `import()`; or
- CommonJS `require()`.

The test suite itself may spawn the compiled local entrypoint to prove clean startup. That test-only capability is not present in the production Forge source.

The package dependency surface remains exactly `@calypsos-promise/content-schema`. Forge does not depend on a model provider, connector SDK, database, network client, credential manager, or `@calypsos-promise/aster`.

## Compatibility and migration

Forge remains **pre-stable, exact-revision, and fail-closed**.

The compatibility manifest binds:

- application contract `0.1.0-pre.1`;
- accepted registry revision `1`;
- runtime registry revision `4`;
- execution contract revision `1`;
- source catalogue revision `1`;
- MCP protocol `2025-11-25`;
- receipt schema `forge.invocation-receipt.v1`; and
- error schema `forge.error.v1`.

Unknown revisions fail closed. A breaking public change requires migration evidence. Any authority expansion requires an accepted governing decision.

Recorded transitions are additive and non-authoritative:

1. runtime `1` → `2`: architecture and decision search;
2. runtime `2` → `3`: public standards, mapping-draft validation, and synthetic connector search;
3. runtime `3` → `4`: deterministic synthetic generation; and
4. runtime `4` + execution envelope revision `1`: scopes, limits, receipts, and stable errors.

No record removes a tool, replaces an accepted tool schema, or expands authority. Consumers must still recognize the listed tool set and execution envelope for the exact revision they use.

## Clean local startup

The operability contract supports startup from the repository root or any descendant directory. Repository discovery walks ancestors until the accepted repository markers are found; callers do not supply the root.

The focused startup test:

1. builds Forge through the package test workflow;
2. launches `dist/stdio-entry.js` from `apps/mcp-forge/src`;
3. provides an empty environment object;
4. completes MCP initialization;
5. lists exactly ten tools;
6. calls deterministic synthetic generation;
7. receives a bounded invocation receipt; and
8. exits cleanly with no stderr output.

Clean startup requires no credentials, provider, network, database, remote endpoint, authentication service, queue, or scheduler.

## Contributor workflows

From the repository root:

```bash
pnpm --filter @calypsos-promise/mcp-forge build
pnpm --filter @calypsos-promise/mcp-forge test
pnpm --filter @calypsos-promise/mcp-forge start
pnpm check
```

`stdout` is reserved for MCP protocol messages. Public-safe diagnostics use `stderr`. Ordinary contribution remains complete without starting Forge or using MCP.

## Issue #50 disposition

Issue #50 is not activated by Sprint 7.9.

Forge does not import or depend on `@calypsos-promise/aster`, and the adversarial or operability work produced no real Aster public-API friction. The trigger remains evidence-based: review Aster ergonomics only after a genuine consumer uses that package and records concrete coupling, repetition, ambiguity, or issue-code problems.

## Provider and funding neutrality

Forge production source has no provider client or network primitive. A provider name, sponsor field, service credit, funding source, retrieved instruction, generated record, or caller request cannot:

- change the tool set or source catalogue;
- enlarge a scope or limit;
- alter validation or postcondition outcomes;
- suppress provenance or partial evidence;
- approve mappings or synthetic output;
- select a provider or activate a connector; or
- control publication, roadmap, or governance.

## Evidence limits

This workstream does not establish:

- absence of all possible implementation defects;
- independent security or privacy review;
- production sandbox, process, container, or operating-system isolation;
- production rate limits, distributed quotas, monitoring, alerting, or incident response;
- production deployment, authentication, identity, permissions, or private-data handling;
- standards certification, mapping approval, provider approval, or connector readiness;
- clinical, accessibility, statistical, legal, or institutional approval; or
- protection after compromise of the host process, runtime, operating system, or repository checkout.

## Permanent boundary

Forge remains a local contributor tool over public and explicitly synthetic information. Security tests, integrity checks, compatibility records, clean startup, receipts, and passing CI cannot create canon, Chronicle truth, permission, gameplay completion, rewards, mapping approval, provider preference, connector activation, clinical authority, production readiness, repository acceptance, or institutional power.
