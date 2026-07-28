# Forge MCP Local `stdio` Transport

[Architecture index](README.md) · [Forge boundary and registry](forge-mcp-boundary-and-tool-registry.md) · [Sprint 7 execution plan](../roadmap/sprint-7-execution-plan.md) · [Pre-Sprint 7 review](../roadmap/pre-sprint-7-alignment-review.md) · [Tracking issue #54](https://github.com/finalboss-tom/calypsos-promise/issues/54) · [Draft PR #55](https://github.com/finalboss-tom/calypsos-promise/pull/55)

- **Status:** SPRINT 7.2 BASELINE — local transport implemented; no repository reads or enabled tools
- **Application:** `apps/mcp-forge`
- **Transport contract revision:** `1`
- **Pinned MCP protocol revision:** `2025-11-25`
- **Information boundary:** protocol metadata and public synthetic test messages only
- **Certification boundary:** deterministic local transport and public test evidence; not production security, compatibility, interoperability, availability, or specialist certification

## Decision

Forge uses one local child-process `stdio` transport with newline-delimited UTF-8 JSON-RPC messages.

Sprint 7.2 pins the transport to finalized MCP protocol revision `2025-11-25`. The `2026-07-28` revision remained a release candidate at the implementation review point and requires an explicit later compatibility decision rather than silent wire behavior changes. Sprint 7.9 owns that compatibility and migration review.

The transport remains independent of the MCP TypeScript SDK for this bounded workstream. The server implements only the narrow finalized lifecycle and transport behavior needed to establish a testable local boundary:

- `initialize`;
- `notifications/initialized`;
- `ping`;
- `tools/list` returning an empty list;
- deterministic refusal of `tools/call` because no tools are enabled;
- `notifications/cancelled` for active non-initialize requests;
- EOF shutdown;
- `SIGINT` and `SIGTERM` shutdown; and
- public-safe JSON-RPC errors.

A later SDK adoption or protocol revision change must preserve the contracts and tests in this document rather than replacing them with provider or framework defaults.

## Transport boundary

The public transport contract states:

- local `stdio` only;
- UTF-8 only;
- one JSON-RPC message per newline;
- no embedded newline framing;
- no batch messages;
- stdout contains protocol messages only;
- diagnostics use stderr only;
- no server-initiated requests;
- no enabled Forge tools;
- no repository or filesystem reads;
- no network or provider calls;
- no credentials or private data;
- no repository, Git, or GitHub mutation;
- no shell, subprocess, or dynamic-module authority; and
- cancellation and transport shutdown do not create domain authority.

The process entry point is `apps/mcp-forge/src/stdio-entry.ts`. Ordinary direct tests use the same session implementation without spawning a process.

## Lifecycle

### Created

A new session accepts only `initialize`.

Any other request returns a stable `forge.transport.not-initialized` error. Notifications that are not meaningful before initialization are ignored because notifications do not receive responses.

### Initialize responded

A successful `initialize` request:

- requires a complete client identity and capabilities object;
- accepts only protocol revision `2025-11-25`;
- returns Forge application identity and version;
- advertises tool discovery with `listChanged: false`;
- returns instructions that restate the public, synthetic, non-authoritative boundary; and
- moves the session to `initialize-responded`.

Unsupported protocol revisions fail closed with the supported revision list and do not advance session state.

Duplicate initialization fails with `forge.transport.already-initialized`.

### Ready

`notifications/initialized` moves an initialize-responded session to `ready`.

A ready Sprint 7.2 session supports:

- `ping` with an empty result;
- `tools/list` with `{ "tools": [] }`;
- deterministic `tools/call` refusal using `forge.transport.no-tools-enabled`; and
- server-owned test handlers injected only through application construction or direct harnesses.

Caller content cannot register a handler, expose a planned tool, modify the registry, or expand the session method set.

### Closing and closed

EOF is the normal local client-initiated shutdown path. The process entry point also handles `SIGINT` and `SIGTERM`.

Closing:

- aborts active cancellable requests;
- suppresses cancelled request responses;
- clears active request state;
- emits no protected or host-specific details; and
- is idempotent.

The transport does not define a custom wire-level shutdown request because the finalized MCP lifecycle uses the underlying transport for shutdown.

## Cancellation

The session tracks active non-initialize requests by JSON-RPC request ID.

A valid `notifications/cancelled` message:

- references an active request in the client-to-server direction;
- aborts that request through an `AbortSignal`;
- allows the handler to release resources; and
- suppresses a response after cancellation.

Malformed, unknown, already-completed, or non-cancellable cancellation notifications are ignored. The `initialize` request is never entered into the cancellable active-request map.

Sprint 7.2 has no tasks or long-running public tools. The cancellation surface exists so later bounded handlers inherit the correct transport contract rather than inventing cancellation after tools are exposed.

## Framing and limits

The local server:

- decodes UTF-8 incrementally;
- treats newline as the message delimiter;
- strips an optional carriage return before parsing;
- rejects empty or malformed JSON with a parse error;
- rejects JSON-RPC batch arrays;
- rejects messages larger than 65,536 UTF-8 bytes by default;
- never echoes malformed or oversized input into an error; and
- serializes each response as one JSON object followed by one newline.

Message-size failure uses the stable public identifier `forge.transport.message-too-large`.

The 65,536-byte transport limit is not a tool input limit. Tool-specific input, scan, result, output, timeout, and concurrency limits remain governed by the registry contracts and later enforcement workstreams.

## Error boundary

JSON-RPC standard codes are used for:

- parse error `-32700`;
- invalid request `-32600`;
- method not found `-32601`;
- invalid params `-32602`; and
- internal error `-32603`.

Forge-owned server error codes cover:

- not initialized `-32040`;
- already initialized `-32041`; and
- connection closing `-32042`.

Every error includes a stable `data.forgeCode` value. Public errors do not include:

- raw malformed input;
- absolute paths;
- environment values;
- stack traces;
- credentials;
- provider details;
- private data; or
- protected operational evidence.

Unexpected handler failures collapse to `forge.transport.handler-failed` with a concise public message.

## Tool exposure remains closed

Sprint 7.2 advertises an empty tools list so local clients can complete ordinary capability discovery without exposing any planned tool.

All ten registry tools remain:

- lifecycle `planned`;
- transport exposure `not-exposed`;
- unavailable to `tools/call`; and
- unable to read repository content.

A successful `initialize`, `ping`, or `tools/list` response proves only that the bounded transport handled the request. It does not prove:

- tool correctness;
- source access;
- canon acceptance;
- Chronicle truth;
- permission;
- mapping acceptance;
- gameplay completion;
- provider approval;
- repository mutation;
- deployment; or
- institutional approval.

## Direct harness

`ForgeTransportHarness` drives the exact same session implementation without streams.

It provides deterministic helpers for:

- initialization;
- request IDs;
- notifications;
- starting concurrent requests;
- cancellation; and
- closure.

The harness may inject server-owned request handlers for public synthetic tests. Handler injection is application construction, not caller or retrieved-content authority.

## Public tests

Sprint 7.2 public tests prove:

1. the transport boundary remains local and non-authoritative;
2. finalized protocol initialization succeeds;
3. an unsupported protocol revision fails closed;
4. pre-initialization requests and duplicate initialization fail safely;
5. ping succeeds while tools remain undiscoverable beyond an empty list;
6. tool calls refuse deterministically;
7. unknown methods return public-safe method-not-found errors;
8. cancellation aborts active work and suppresses its response;
9. malformed or unknown cancellation is ignored;
10. closure aborts pending work and remains idempotent;
11. stream framing emits newline-delimited JSON only; and
12. malformed JSON, batches, and oversized messages fail without reflecting sensitive input.

Tests import the built application surface through `dist/index.js`.

## Explicit non-scope

Sprint 7.2 does not implement:

- repository-root discovery;
- filesystem or repository reads;
- source allowlists or prohibited paths;
- path normalization, traversal protection, or symlink isolation;
- provenance, line locators, object locators, or digests;
- enabled search, validation, inspection, or generation tools;
- tool-specific receipt creation;
- runtime enforcement of registry scan and output limits;
- remote MCP or HTTP;
- authentication or accounts;
- database, queue, scheduler, worker, or workflow engine;
- model, provider, connector, or credentials;
- private Chronicle access;
- production deployment; or
- specialist approval.

Those boundaries remain owned by later Sprint 7 workstreams and inherited holdpoints.

## Handoff to Sprint 7.3

Sprint 7.3 may add repository-root resolution and public source access only after it defines:

- exact server-owned source roots;
- explicit prohibited paths and file classes;
- path normalization;
- traversal and encoded-traversal rejection;
- symlink escape prevention;
- deterministic source ordering;
- content digests;
- line and object locators;
- truncation and partial results; and
- public-safe source errors.

Sprint 7.3 must not change transport protocol revision, expose tools, or authorize arbitrary filesystem reads merely to test source resolution.
