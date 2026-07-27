# Aster Compatibility, Migration, and Cross-Contract Evidence

[Architecture index](README.md) · [Aster boundary](aster-contract-boundary.md) · [Local synthetic adapter](aster-local-synthetic-adapter-and-non-ai-fallbacks.md) · [Provider governance](aster-provider-governance-and-egress-contracts.md) · [Product contract baseline](../product/aster-contract-baseline.md) · [Sprint 6 execution plan](../roadmap/sprint-6-execution-plan.md)

- **Status:** ACTIVE PRE-STABLE CONTRACT
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`
- **Evidence boundary:** deterministic public contracts and synthetic fixtures; not production migration readiness, deployed backward compatibility, provider certification, or specialist assurance

## Purpose

Sprint 6.11 makes the Aster public surface inspectable as one versioned system rather than a collection of independently passing files.

The compatibility manifest answers:

- which serialized components are public;
- which revision governs each component;
- which validator and public synthetic fixtures cover it;
- how role, operation, proposal-kind, local-scenario, provider-state, and fallback contracts align;
- which changes may remain additive;
- which changes require an explicit migration;
- which changes are incompatible without a new governing decision; and
- which authority boundaries migration and compatibility evidence can never create.

The permanent transaction boundary remains:

> AI proposes; the player confirms; deterministic domain services validate and store.

A compatibility label, fixture, migration plan, validator result, package version, or passing test cannot create permission, canonical truth, provider approval, domain completion, progression, rewards, clinical authority, or institutional authority.

## Public component manifest

The current manifest covers twelve public components:

| Component | Public responsibility |
| --- | --- |
| `authority` | role authority matrix and mandatory prohibitions |
| `role-contracts` | detailed role operations, evidence, failure, retention, egress, and fallback |
| `proposal` | proposal identity, provenance, review, authority, and domain-outcome separation |
| `structured-extraction` | non-canonical extraction candidates and unsupported material |
| `intent` | intent, confidence, clarification, ambiguity, and refusal |
| `source-recall` | source-linked recall, explanation, provenance, mapping, lifecycle, and uncertainty |
| `memory` | player-controlled memory classes and lifecycle |
| `untrusted-input` | prompt-injection and untrusted-input isolation |
| `work-lifecycle` | responsive, deferred, retry, duplicate, cancellation, stale, correction, and replay behavior |
| `provider-governance` | synthetic-only provider evaluation, egress, funding conflicts, concentration, and exit |
| `local-synthetic-adapter` | deterministic scenarios and complete non-AI fallback evidence |
| `package-public-surface` | current compatibility, fixture, validator, and migration evidence |

Every component entry declares:

- stable component identity;
- component revision;
- one or more serialized schema identifiers;
- validator identity and revision;
- one or more public fixture identifiers;
- current compatibility state;
- whether an active migration is required; and
- literal non-authority.

Missing, duplicate, unknown, unvalidated, or fixture-free components fail validation.

## Public synthetic fixture catalogue

Every public component has a fixture entry that is:

- explicitly synthetic;
- public-safe;
- credential-free;
- non-authoritative;
- bound to a validator revision; and
- linked to one or more current deterministic local-scenario identifiers.

The catalogue reuses the seventeen 6.10 scenarios rather than inventing a second fixture runtime. This keeps success, clarification, refusal, prompt-injection, timeout, provider-unavailable, stale, superseded, manual-capture, and permission-review evidence on one stable deterministic spine.

A fixture is evidence that the declared contract behaves as tested. It is not proof of model quality, production reliability, clinical safety, privacy assurance, accessibility conformance, interoperability, legal sufficiency, deletion completeness, or public benefit.

## Role cross-contract bindings

Each role binds four public facts:

| Role | Operation | Primary proposal kind | Success fixture |
| --- | --- | --- | --- |
| Scribe | `scribe.prepare-structured-capture` | `structured-capture` | `scribe-structured-draft` |
| Librarian | `librarian.prepare-source-linked-recall` | `source-linked-recall` | `librarian-source-linked-recall` |
| Wayfinder | `wayfinder.propose-product-route` | `product-route` | `wayfinder-navigation` |
| Interpreter | `interpreter.prepare-source-aware-explanation` | `source-aware-explanation` | `interpreter-source-aware-explanation` |
| Storykeeper | `storykeeper.prepare-narrative-presentation` | `narrative-presentation` | `storykeeper-confirmed-event-presentation` |

Validation rejects:

- role-operation drift;
- role-proposal-kind drift;
- a success scenario bound to the wrong role or operation;
- a success scenario that cannot prepare a bounded proposal; and
- missing AI-free or provider-free role fallback.

## Complete local and fallback coverage

The manifest must contain the exact current set of:

- seventeen local synthetic scenario identifiers; and
- seven core non-AI paths.

The core paths remain:

1. manual capture;
2. structured record recall;
3. permission review;
4. correction;
5. export;
6. deletion; and
7. ordinary play.

Compatibility work may add evidence around these paths. It cannot remove, hide, paywall, weaken, or make them dependent on AI, a provider, broader consent, funding, or retained memory.

## Provider-state compatibility

The manifest binds the exact provider-governance state taxonomy:

- `not-approved`;
- `synthetic-evaluation-only`;
- `specialist-review-required`;
- `blocked`; and
- `retired`.

A `production-approved` state is intentionally absent and rejected. Compatibility or migration work cannot silently create provider approval, provider default, source rank, connector rank, egress authority, benchmark authority, or publication control.

## Compatibility classifications

A change is classified as one of:

- `additive-optional`;
- `additive-required`;
- `enum-expansion`;
- `field-removal`;
- `semantic-change`;
- `authority-boundary-change`; or
- `revision-rebase`.

Its declared compatibility status is one of:

- `exact-compatible`;
- `additive-compatible`;
- `migration-required`;
- `incompatible`; or
- `unknown`.

The baseline rules are:

- an optional additive field may remain `additive-compatible`;
- required additions, enum expansion, field removal, semantic changes, and revision rebases require migration evidence;
- authority-boundary changes are incompatible with ordinary migration and require a new governing decision; and
- unknown changes fail closed.

Pre-stable versioning does not mean unreviewed changes are harmless. The package version is one input to compatibility review, not a substitute for component revisions, migration evidence, fixtures, or cross-contract validation.

## Migration contract

A required migration identifies:

- stable migration identity and revision;
- affected public component;
- exact source and target package versions;
- exact source and target component revisions;
- deterministic, manual-review, or forward-only mode;
- source-artifact preservation;
- prior-revision evidence preservation;
- creation of a new revision rather than silent overwrite;
- rollback or forward-only behavior;
- public synthetic fixture evidence; and
- literal non-authority.

Migration cannot:

- write canonical records;
- create or expand permission;
- confirm a proposal;
- choose a provider default;
- establish source rank;
- control publication;
- erase prior revisions;
- disguise field removal as an additive change;
- use funding or provider preference to determine compatibility; or
- authorize an authority-boundary change.

## Validation

`validateAsterCompatibilityManifest` checks:

- manifest identity and current package version;
- complete, unique public component coverage;
- validator and fixture coverage;
- synthetic, credential-free, non-authoritative fixture handling;
- fixture-to-scenario references;
- exact role-operation-proposal-scenario bindings;
- role fallback coverage;
- exact local-scenario and core non-AI path coverage;
- exact provider-governance state coverage and the absence of production approval;
- fail-closed migration policy; and
- compatibility authority separation.

`validateAsterCompatibilityChange` checks:

- known change classes and increasing revisions;
- compatibility status classification;
- migration requirements;
- exact migration-plan bindings;
- prior evidence and source preservation;
- synthetic fixture evidence;
- field-removal handling; and
- migration or authority escalation.

The public tests cover:

- complete current manifest validation;
- fixture safety and non-authority;
- additive optional compatibility;
- semantic and field-removal migration requirements;
- authority-boundary incompatibility;
- missing components and unsafe fixtures;
- role-operation-proposal-scenario drift;
- scenario, fallback, provider-state, and authority coverage; and
- migration authority escalation.

## Non-scope

This contract does not create or prove:

- deployed backward compatibility;
- a production data migration;
- production persistence or rollback;
- real-record transformation;
- provider selection or approval;
- private-data egress;
- production identity or permission enforcement;
- queue, scheduler, workflow, or event-store migration;
- clinical, privacy, security, accessibility, legal, procurement, financial, or interoperability certification; or
- Sprint 6 completion or production readiness.

Those claims remain gated by their owning capabilities, specialist reviews, implementation evidence, and later roadmap decisions.
