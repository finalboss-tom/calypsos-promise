# Aster Proposal and Structured Extraction Contracts

[Architecture index](README.md) · [Aster boundary](aster-contract-boundary.md) · [Role contracts](aster-role-contracts.md) · [Product contract baseline](../product/aster-contract-baseline.md) · [Sprint 6 execution plan](../roadmap/sprint-6-execution-plan.md)

- **Status:** ACTIVE PRE-STABLE CONTRACT
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`
- **Evidence boundary:** deterministic public contracts and synthetic tests; not production-model, provider, clinical, legal, privacy, security, accessibility, interoperability, or operational certification

## Purpose

The proposal envelope keeps Aster output inspectable without allowing a draft to collapse into Chronicle truth, permission truth, product state, gameplay completion, memory, audit, provider logs, retrieval indexes, or delayed-work state.

The permanent transaction boundary remains:

> AI proposes; the player confirms; deterministic domain services validate and store.

A proposal may describe an intended action and its deterministic owner. It cannot invoke that action or claim that validation, storage, execution, progression, or reward occurred.

## Proposal envelope

Every proposal identifies:

- a stable proposal identity and revision;
- the Aster contract version, role, bounded operation, and proposal kind;
- the exact subject and request revision;
- relevant authority-revision references without embedding permission truth;
- the producer class, identity, and model or rule revision;
- minimum-necessary source references without copying source material into the envelope;
- transformation provenance with stable step identities and revisions;
- the intended action, deterministic owner, and exact-confirmation requirement;
- qualitative confidence that is explicitly non-authoritative;
- material uncertainty and clarification state;
- a versioned non-canonical payload;
- review state bound to an exact proposal revision; and
- literal `false` values for canonical writes, permission changes, self-confirmation, authoritative invocation, quest completion, rewards, domain acceptance, storage, and execution.

## Review and confirmation

The proposal review contract distinguishes:

- `not-reviewed`;
- `confirmed`;
- `rejected`;
- `superseded`; and
- `expired`.

A confirmed proposal must identify the player as the review actor, bind the exact proposal revision, and reference the review decision. A conversational acknowledgement, provider response, model output, transport success, queued request, or review of a different revision cannot confirm the proposal.

Confirmation remains evidence about the exact proposal only. It does not prove that permission was valid, the domain validator accepted the action, authoritative storage succeeded, or a later projection or narrative presentation completed.

## Proposal kinds and role alignment

The public proposal kinds are:

| Role | Primary proposal kind |
| --- | --- |
| Scribe | `structured-capture` |
| Librarian | `source-linked-recall` |
| Wayfinder | `product-route` |
| Interpreter | `source-aware-explanation` |
| Storykeeper | `narrative-presentation` |

Any role may instead produce a `clarification-request` when its role contract requires clarification. Validators reject a proposal whose role, bounded operation, primary kind, deterministic owner, or confirmation rule drifts from the role contracts.

## Source and transformation references

Source references are identifiers and revisions, not copied source records. Every reference declares its role-allowed source class, purpose, and whether source material was copied. The baseline requires `sourceMaterialCopied: false`.

Transformation provenance records parsing, normalization, mapping, retrieval, summarization, rule, model, copy, or manual steps with stable transformer and revision identifiers. Every structured candidate points back to its source references and transformation steps.

A model, provider, sponsor, retrieval rank, standard, implementation guide, newest source, or transformation step cannot become automatic truth.

## Structured extraction

Structured extraction produces field candidates, not Chronicle values.

Each candidate declares:

- a stable candidate identity and proposed field path;
- a serialized value class and proposed value;
- source-reference and transformation-step identities;
- qualitative confidence and uncertainty codes;
- whether clarification is required; and
- literal `false` values for canonical status, player confirmation, and domain acceptance.

The extraction envelope also preserves unparsed source segments with an inspectable source reference and reason. Unsupported material remains visible rather than being silently discarded or promoted.

The extraction states are:

- `draft`;
- `clarification-required`; and
- `unsupported`.

A draft or clarification-required extraction needs at least one candidate. An unsupported extraction may contain no candidates but must not claim a canonical record.

## Domain handoff

A Scribe extraction may later support a separate Chronicle proposal. The following remain separate observable facts:

1. Aster produced an extraction candidate.
2. The proposal was presented to the player.
3. The player reviewed and confirmed the exact proposal revision.
4. The required House of Keys decision was valid and fresh.
5. The Living Chronicle validator accepted the proposed record.
6. Authoritative storage succeeded.
7. Any later projection, notification, gameplay presentation, or enrichment completed.

The proposal envelope is not mutated to impersonate those later facts. Applications must record them in the domain, receipt, audit, product-state, or workflow capability that owns them.

## Validation

`validateAsterProposalEnvelope` rejects:

- unknown roles, operations, proposal kinds, subjects, producers, and schemas;
- role, operation, kind, action-owner, or confirmation-rule drift;
- missing or disallowed source classes;
- missing transformation provenance;
- confidence represented as authority;
- canonical payloads;
- review decisions not bound to the exact proposal revision;
- confirmation by anyone other than the player;
- canonical-write, permission, self-confirmation, authoritative-action, progression, or reward authority; and
- claims that domain invocation, validation, storage, or execution occurred.

`validateAsterStructuredExtraction` rejects:

- duplicate or malformed candidates;
- candidates without sources or transformation provenance;
- unsupported value classes or confidence;
- canonical, self-confirmed, or domain-accepted candidates;
- hidden or malformed unparsed segments; and
- extraction represented as a canonical record.

These validators prove only that the checked serialized contracts preserve the declared boundary. They do not prove semantic correctness, model quality, clinical safety, privacy, security, accessibility, provider compliance, or production readiness.
