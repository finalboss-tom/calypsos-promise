# Aster Prompt-Injection and Untrusted-Input Isolation Contracts

[Architecture index](README.md) · [Aster boundary](aster-contract-boundary.md) · [Role contracts](aster-role-contracts.md) · [Intent contracts](aster-intent-confidence-clarification-refusal.md) · [Source-linked recall contracts](aster-source-linked-recall-and-explanation-contracts.md) · [Memory lifecycle contracts](aster-memory-lifecycle-contracts.md) · [Sprint 5 isolation model](../security/untrusted-input-and-agent-isolation-model.md) · [Product contract baseline](../product/aster-contract-baseline.md) · [Sprint 6 execution plan](../roadmap/sprint-6-execution-plan.md)

- **Status:** ACTIVE PRE-STABLE CONTRACT
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`
- **Evidence boundary:** deterministic public contracts and synthetic tests; not production sandboxing, malware scanning, model safety, privacy, security, provider, tool, or operational certification

## Purpose

Prompt injection is an authority-confusion problem rather than only a text-filtering problem.

Documents, images, imported records, web content, retrieved passages, provider responses, tool results, model output, and prior conversation may contain useful information. They may also contain instructions, identifiers, claims, citations, or requests that attempt to act as policy, permission, subject selection, tool authority, memory authority, clinical authority, or canonical truth.

The permanent boundary remains:

> AI proposes; the player confirms; deterministic domain services validate and store.

Untrusted content remains data after transport, parsing, retrieval, generation, schema validation, or tool completion. Successful processing creates bounded evidence only.

## Relationship to the Sprint 5 security baseline

The accepted [Untrusted Input, Connector, AI, MCP, and Supply-Chain Isolation Model](../security/untrusted-input-and-agent-isolation-model.md) governs future infrastructure, quarantine, decoding, scanning, connector, model, MCP, tool, sandbox, supply-chain, secret, and environment controls.

This Sprint 6 contract does not duplicate or certify those controls. It defines the narrower Aster-facing serialized boundary that must remain true before untrusted information may contribute to a proposal, explanation, or other non-authoritative result.

## Public input classes

The initial Aster classes are:

- `document`;
- `image`;
- `imported-record`;
- `web-content`;
- `retrieved-passage`;
- `provider-response`;
- `tool-result`;
- `model-output`; and
- `prior-conversation`.

Each class has an allowlisted set of data uses such as extraction, summarization, retrieval, quotation, classification, or explanation.

Class membership never makes content trusted. Every class policy states that:

- content is data;
- embedded instructions are data;
- content cannot set policy;
- content cannot modify the tool registry;
- content cannot choose the controlling subject;
- content cannot create or expand permission;
- content cannot invoke resources; and
- content cannot persist itself as memory.

## Server-resolved context

Every isolation envelope binds one exact deterministic application context containing:

- stable context identity and revision;
- one server-resolved subject;
- one declared purpose;
- relevant authority revisions;
- allowed resource references;
- exact server-owned tool identities and revisions; and
- whether later exact player confirmation is required.

Caller-supplied, retrieved, generated, imported, or tool-returned subject and resource identifiers are comparison inputs only. They do not establish the controlling subject, Chronicle, recipient, owner, permission, or execution authority.

## Input references

Every untrusted input reference preserves:

- stable input identity and revision;
- input class;
- optional source reference;
- allowed data uses;
- any claimed subject;
- requested resource or tool identifiers;
- explicit data-only handling;
- explicit embedded-instruction data handling;
- `trusted: false`;
- `subjectClaimAccepted: false`; and
- `authorityClaimsAccepted: false`.

The envelope does not copy secrets, hidden instructions, raw provider logs, or unrestricted content into authority fields.

## Finding taxonomy

The initial finding codes cover:

- embedded policy override;
- tool-registry mutation;
- subject-authority claims;
- permission-authority claims;
- action-scope expansion;
- confirmation bypass;
- source suppression;
- uncertainty suppression;
- cross-subject access;
- arbitrary resource invocation;
- memory persistence;
- secret or hidden-instruction requests;
- canonical-truth claims; and
- clinical-authority claims.

A finding identifies its supporting input references, gives a direct description, and states whether the finding is material.

Material findings cannot be treated as harmless merely because the content was structurally valid, retrieved from an expected corpus, returned by an approved provider, produced by a registered tool, or generated with high confidence.

## Dispositions

The public dispositions are:

- `data-only` — the content may contribute only to a non-authoritative proposal or explanation under the declared use;
- `clarification-required` — no proposal may be prepared until the player resolves the direct ambiguity;
- `blocked` — the material cannot proceed through the Aster proposal path and requires a safe fallback; and
- `manual-fallback` — the interaction continues through a deterministic or human-controlled path without relying on the unsafe content.

Material prompt-injection findings require `blocked` or `manual-fallback`. They cannot prepare a proposal.

## Tool and resource isolation

The application owns the tool registry, schemas, revisions, resource bindings, confirmation rules, permission checks, and execution envelopes.

Untrusted content cannot:

- invent a tool;
- change a tool name, endpoint, schema, or revision;
- invoke a discovered tool;
- turn a tool result into a new invocation;
- request arbitrary files, networks, databases, stores, queues, shells, models, or administrative resources;
- broaden the server-resolved resource set; or
- treat a prior successful invocation as authority for another invocation.

The isolation evaluator itself records no tool invocation or resource access. Later tool execution, where supported, remains a separate deterministic and permission-governed domain transition.

## Subject and cross-user isolation

The controlling subject comes only from the deterministic server context.

A claimed subject that differs from the server-resolved subject requires a `cross-subject-access` finding and containment. It cannot silently redirect retrieval, source lookup, memory, tools, export, deletion, or proposal preparation.

Matching identifiers inside content still do not create identity or authority. They remain data references that require validation against the server-owned context.

## Source, uncertainty, and conflict visibility

Untrusted content cannot instruct Aster to hide:

- source references;
- retrieval and mapping limitations;
- uncertainty;
- conflicts or disagreement;
- correction, supersession, deletion, or unavailability state; or
- public-education labeling.

Every isolation envelope keeps source, uncertainty, and conflict preservation literal and inspectable.

## Memory separation

Prior conversation, retrieved content, documents, provider responses, tool output, or model output cannot persist themselves as memory.

A request inside content to “remember,” retain, profile, or reuse material is treated as data and may produce a `memory-persistence` finding. Material memory still requires the separate visible player-controlled flow defined in [Aster Memory Classes and Lifecycle Contracts](aster-memory-lifecycle-contracts.md).

## Secrets and hidden instructions

Untrusted content cannot obtain or reveal:

- system or developer instructions;
- secrets, credentials, keys, or tokens;
- private endpoints or administrative paths;
- unrelated records or cross-subject identifiers;
- protected operational evidence; or
- internal policy details that would weaken control enforcement.

The contract records only a bounded finding and fallback. It does not place protected material into the public envelope.

## Authority and effect boundaries

The authority boundary encodes literal `false` for the ability to:

- change policy;
- modify the tool registry;
- choose the controlling subject;
- create or expand permission;
- expand action scope;
- bypass confirmation;
- invoke arbitrary resources;
- cross subject boundaries;
- persist itself as memory;
- suppress sources or uncertainty;
- reveal secrets;
- write canonical records; or
- create clinical authority.

The isolation evaluator also records literal `false` for tool invocation, resource access, memory persistence, and canonical-write attempts.

## Validation

`validateAsterUntrustedInputClassPolicies` checks that every public input class remains data-only and non-authoritative.

`validateAsterUntrustedInputIsolation` rejects:

- unknown schemas, identities, input classes, uses, or dispositions;
- non-deterministic or unrevisioned server context;
- tools outside the server-owned registry;
- content treated as trusted instruction;
- duplicate or unresolved input and finding references;
- cross-subject claims without containment findings;
- untrusted resource or tool requests without arbitrary-resource findings;
- material findings represented as data-only or clarification-only;
- blocked flows without a safe fallback;
- proposal preparation after a material finding;
- source, uncertainty, or conflict suppression;
- authority escalation; and
- tool, resource, memory, or canonical-write effects during isolation evaluation.

Public-surface tests cover benign data-only use, permission and confirmation bypass, cross-subject substitution, arbitrary tools and resources, source and uncertainty suppression, and self-persisting conversation or model output.

Validation proves only that the checked public contract preserves the declared separation. It does not prove prompt-injection detection quality, sandbox implementation, provider behavior, model safety, privacy, security, accessibility, legal sufficiency, or production readiness.
