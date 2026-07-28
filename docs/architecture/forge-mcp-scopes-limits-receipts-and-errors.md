# Forge MCP Scopes, Limits, Receipts, and Errors

[Documentation home](../README.md) · [Architecture index](README.md) · [Current status](../roadmap/current-status.md) · [Sprint 7 plan](../roadmap/sprint-7-execution-plan.md) · [Forge boundary](forge-mcp-boundary-and-tool-registry.md) · [Local transport](forge-mcp-local-stdio-transport.md) · [Source catalogue](forge-mcp-source-catalogue-and-provenance.md) · [Deterministic generation](forge-mcp-deterministic-synthetic-generation.md) · [Issue #54](https://github.com/finalboss-tom/calypsos-promise/issues/54) · [Draft PR #55](https://github.com/finalboss-tom/calypsos-promise/pull/55)

- **Status:** ACTIVE BASELINE — implemented and validated in Sprint 7.8
- **Application:** `apps/mcp-forge`
- **Execution contract revision:** `1`
- **Invocation receipt schema:** `forge.invocation-receipt.v1`
- **Stable tool-error schema:** `forge.error.v1`
- **Authority profile:** `forge.non-authority.v1`
- **Runtime tool registry revision:** `4`
- **Transport:** local `stdio` only

## Purpose

Sprint 7.8 makes the resource and disclosure boundary enforceable across every enabled Forge tool. It does not add a tool identity or broaden what any tool may read, validate, inspect, search, or generate.

The execution layer answers five questions for every scoped invocation:

1. Which immutable accepted tool contract governs this call?
2. Which request, scan, result, output, timeout, concurrency, and memory limits apply?
3. What bounded resources were observed?
4. Was the result complete, partial, truncated, or an error?
5. Which facts are deliberately absent from the receipt and error payload?

## Source of authority

The accepted Sprint 7.1 registry remains the source of truth for:

- tool identity and revision;
- risk class and operation;
- allowed public or synthetic information classes;
- input and output schema identities;
- receipt, error, and non-authority profile identities;
- request, scan, result, output, timeout, and concurrency limits; and
- the rule that results create no authority and cannot approve themselves.

`execution-contracts.ts` derives one server-owned execution scope from each enabled accepted tool. A caller cannot register a scope, select a different scope, increase a limit, replace a schema, or supply its own receipt.

The scope validator rejects:

- missing or duplicate scopes;
- scopes for identities outside the enabled registry;
- changed risk classes, operations, source classes, schemas, or transport exposure;
- changed accepted or derived limits; and
- caller control or result authority.

## Accepted limits

The immutable accepted registry defines three risk-class budgets.

| Risk class | Max request | Max files scanned | Max results | Max output | Timeout | Concurrent calls per tool |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `read-public` | 32,768 bytes | 200 | 50 | 524,288 bytes | 5,000 ms | 1 |
| `validate-public` | 1,048,576 bytes | 100 | 100 | 1,048,576 bytes | 10,000 ms | 1 |
| `generate-synthetic-draft` | 131,072 bytes | 50 | 25 | 1,048,576 bytes | 10,000 ms | 1 |

These are ceilings. Individual tool input schemas and source-catalogue entries may impose narrower limits.

### Request limits

The controller serializes the tool input before execution. Non-serializable input and input above the accepted byte ceiling fail before the tool operation begins.

The raw input is not copied into the receipt or stable error.

### Scan limits

Search and source-backed validation results expose bounded scan counts. The controller verifies those counts against the accepted tool ceiling after execution.

The source repository independently enforces server-owned file limits and reports stable reasons such as:

- `file-limit-reached`;
- `output-limit-reached`;
- `symlink-skipped`;
- `unavailable-optional-root`;
- `oversized-file-skipped`; and
- `non-utf8-file-skipped`.

A scan-limit reason may produce a valid truncated result. A tool result claiming a scan count above its accepted ceiling fails closed.

### Result limits

Search tools and generation tools already truncate or reject output according to their accepted result ceilings. The execution controller verifies returned match or generated-record counts before releasing the result.

A result carrying more records than its immutable ceiling fails closed.

### Output limits

The output ceiling applies to the complete MCP tool-call result, including:

- text content;
- structured content;
- the invocation receipt; and
- the public error marker when present.

This prevents a small domain result from bypassing its accepted output budget through an oversized envelope.

### Timeout and cancellation

Each scoped call receives a linked abort signal and races against the accepted timeout.

- A client cancellation propagates through the operation and suppresses the tool response, preserving MCP cancellation behavior.
- An accepted timeout aborts the operation and returns one stable `forge.execution.timeout-reached` tool error with a bounded receipt.
- Timeout and caller cancellation are not conflated.

The controller clears timers, removes abort listeners, and releases concurrency accounting on success, failure, timeout, or cancellation.

### Concurrency

Concurrency is enforced per accepted tool identity. All current tools permit one active call per identity.

A second concurrent call to the same tool returns `forge.execution.concurrency-limit-reached`. A different accepted tool identity may proceed independently.

This is local in-process admission control, not a distributed lock, queue, scheduler, rate limiter, or production workload manager.

## Materialized-memory model

Sprint 7.8 does not claim process-heap isolation or operating-system memory enforcement.

The execution contract instead defines a deterministic serialized materialization budget:

> serialized request + complete serialized result + at most one bounded public source file

For source-backed tools, the source-working allowance is 1,048,576 bytes. Deterministic synthetic generation has a source-working allowance of zero because it performs no repository read.

The receipt exposes:

- accepted request, output, and source-working ceilings;
- the derived materialized-byte ceiling;
- observed request and complete output bytes; and
- the memory model identifier.

This establishes a reviewable contract and postcondition. It does not prove peak JavaScript heap usage, operating-system residency, garbage-collection behavior, or production resource isolation.

## Partial and truncated results

Result state remains one of:

- `complete` — no known limiting or partial condition;
- `partial` — useful evidence returned with a non-ceiling limitation;
- `truncated` — an accepted result, file, or output ceiling stopped further work; or
- `error` — the tool did not return a domain result.

Stable partial reasons are copied into the receipt without source contents. The receipt never upgrades a partial or truncated result to complete.

## Invocation receipts

Every scoped success and stable scoped tool error includes one server-owned receipt.

The receipt contains:

- contract, accepted-registry, runtime-registry, tool, and scope revisions;
- risk class, operation, and allowed information classes;
- input and output schema identities;
- accepted and derived limits;
- observed request, scan, result, output, and serialized-materialization counts;
- completion state and stable partial reasons;
- enforced-control declarations; and
- literal non-authority.

The receipt deliberately contains no:

- raw input;
- absolute host path;
- environment value;
- internal trace;
- credential;
- protected source material; or
- wall-clock timestamp.

No timestamp or duration is included, so identical deterministic operations over unchanged public evidence can produce identical receipts. Repository provenance and synthetic seed digests remain the appropriate reproducibility evidence for their respective tools.

A receipt is execution evidence only. It cannot approve canon, accept a repository change, create Chronicle truth, create or expand permission, complete gameplay, grant rewards, certify interoperability, approve a mapping, select a provider, authorize clinical use, activate a connector, establish production readiness, or create institutional authority.

## Stable errors

Scoped tool errors use `forge.error.v1` and return:

- a stable public code;
- a bounded public message;
- literal non-authority; and
- the invocation receipt when the requested identity has an accepted execution scope.

Sprint 7.8 execution codes include:

- `forge.execution.input-not-serializable`;
- `forge.execution.input-limit-reached`;
- `forge.execution.concurrency-limit-reached`;
- `forge.execution.timeout-reached`;
- `forge.execution.scan-limit-exceeded`;
- `forge.execution.result-limit-exceeded`;
- `forge.execution.output-limit-reached`;
- `forge.execution.materialized-memory-limit-reached`; and
- `forge.execution.invalid-tool-result`.

Existing source, mapping, content, and transport codes remain valid and are not silently replaced.

Errors do not echo arbitrary caller input or reveal host paths, environment values, internal traces, credentials, or protected contents. Unknown unscoped identities receive a bounded error without a fabricated accepted scope or receipt.

## Server-owned result envelope

Tool implementations return their accepted domain result to the controller. The controller rejects a domain result that:

- lacks the exact expected tool identity;
- is not a structured object; or
- already contains a `receipt` field.

This prevents caller-supplied, retrieved, generated, or compromised tool content from impersonating the server-owned execution receipt.

## Validation evidence

Public tests cover:

- exact one-to-one scope coverage for all ten enabled identities;
- immutable scope identity, schemas, limits, and non-authority;
- stable receipts for repeated deterministic calls;
- complete, partial, truncated, and error states;
- request serialization and byte limits before tool execution;
- scan, result, complete-output, and materialized-memory postconditions;
- rejection of caller-owned receipts;
- per-tool concurrency and independent tool identities;
- the accepted timeout boundary;
- caller cancellation without a manufactured receipt;
- raw-seed and caller-marker non-disclosure;
- no host path, environment, internal trace, credential, or protected-source disclosure; and
- receipt preservation through MCP transport dispatch.

## Permanent boundary

Sprint 7.8 does not create production sandboxing, process isolation, distributed admission control, rate limiting, quotas, remote MCP, authentication, private Chronicle tools, repository mutation, network access, provider calls, connector execution, clinical behavior, production deployment, or independent certification.

The ten-tool registry remains unchanged. Ordinary contribution remains complete without MCP.
