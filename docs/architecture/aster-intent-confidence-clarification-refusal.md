# Aster Intent, Confidence, Clarification, and Refusal Contracts

[Architecture index](README.md) · [Aster boundary](aster-contract-boundary.md) · [Role contracts](aster-role-contracts.md) · [Proposal contracts](aster-proposal-extraction-contracts.md) · [Product contract baseline](../product/aster-contract-baseline.md) · [Sprint 6 execution plan](../roadmap/sprint-6-execution-plan.md)

- **Status:** ACTIVE PRE-STABLE CONTRACT
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`
- **Evidence boundary:** deterministic public contracts and synthetic tests; not production-model, clinical, legal, privacy, security, accessibility, provider, or operational certification

## Purpose

Intent classification reduces interaction cost without allowing likely language interpretation to become product, permission, clinical, or domain authority.

The permanent transaction boundary remains:

> AI proposes; the player confirms; deterministic domain services validate and store.

An intent decision may determine whether Aster can prepare a non-authoritative proposal, needs a direct clarification, must refuse, or should treat the interaction as non-actionable conversation. It cannot invoke an action, create or expand permission, confirm a proposal, or claim completion.

## Public intent taxonomy

Bindable intents are:

- `capture`;
- `recall`;
- `explanation`;
- `navigation`;
- `permission-review`;
- `correction`;
- `export`;
- `deletion-preparation`; and
- `support-routing`.

Safe meta outcomes are:

- `non-actionable-conversation`;
- `unknown`;
- `mixed`;
- `conflicting`; and
- `unsupported`.

Unknown, mixed, and conflicting intent require clarification. Unsupported intent requires an inspectable refusal and safe manual fallback. Non-actionable conversation cannot silently become proposal or domain work.

## Consequence classes

Intent and consequence remain explicit:

| Intent | Consequence class |
| --- | --- |
| capture | canonical-change preparation |
| recall | informational |
| explanation | informational |
| navigation | navigation |
| permission review | permission review |
| correction | canonical-change preparation |
| export | data rights |
| deletion preparation | data rights |
| support routing | support |
| non-actionable, unknown, mixed, conflicting, unsupported | none |

A consequence class describes what later bounded work might be prepared. It is not proof of authority, permission, confirmation, validation, storage, execution, or completion.

## Intent decisions

Every intent decision binds:

- a stable decision identity and revision;
- the exact request identity and revision;
- the identified subject without choosing or changing subject authority;
- inspectable candidates and supporting evidence references;
- a selected intent or explicit absence of selection;
- a disposition;
- a consequence class;
- qualitative confidence with a written basis;
- ambiguity codes;
- direct clarification questions;
- refusal state and fallback; and
- literal non-authority for action invocation, permission changes, and proposal confirmation.

The dispositions are:

- `bound` — one supported intent is safely bound, no material ambiguity or refusal remains, explicit player choice is required, and Aster may prepare only a non-authoritative proposal;
- `clarification-required` — no intent is selected, at least one material ambiguity and open direct question remain, and no proposal may be prepared;
- `refused` — no intent is selected, a stable refusal reason and safe fallback are present, and no proposal may be prepared; and
- `non-actionable` — the selected outcome is only non-actionable conversation and no proposal or domain work may begin.

## Confidence

Confidence is qualitative: `not-assessed`, `low`, `medium`, or `high`.

Every confidence value requires a written basis and `notAuthority: true`. Numeric probability, percentage, or score fields are rejected because apparent precision must not become a shortcut for truth, safety, permission, or authority.

High confidence does not permit Aster to:

- choose between materially conflicting actions;
- bypass clarification;
- select the controlling person or Chronicle subject;
- expand permission;
- confirm a proposal;
- invoke a domain action; or
- represent validation, storage, execution, progression, or reward.

## Clarification

Material ambiguity is represented, not hidden. The initial ambiguity taxonomy includes:

- unknown, mixed, or conflicting intent;
- ambiguous subject, target, action scope, time, value, or unit;
- insufficient evidence; and
- stale context.

A clarification has a stable identity, ambiguity code, direct question, and lifecycle status. A clarification-required decision must remain unbound, have at least one open question, use consequence class `none`, and set proposal preparation to `false`.

The likely interpretation is not enough when a consequential action cannot be bound safely.

## Refusal

The initial refusal taxonomy includes:

- unsupported intent;
- unsafe authority requests;
- permission-bypass requests;
- cross-subject requests;
- diagnosis or treatment requests;
- emergency-direction requests;
- arbitrary-resource requests;
- untrusted-input authority attempts; and
- no safe path.

A refusal must provide a direct explanation and safe manual fallback. Refusal is not punishment, progression loss, or evidence that the player did something wrong. It cannot be used to coerce broader permission, provider use, retention, payment, or disclosure.

Later safety and product work may define specialist-reviewed emergency and clinical pathways. This contract does not implement or certify them.

## Safe binding rules

A bound decision requires:

1. exactly one selected bindable intent that appears among the candidates;
2. the public consequence class for that intent;
3. no material ambiguity or open clarification;
4. no refusal state;
5. explicit player choice before any later proposal or action; and
6. non-authority flags remaining `false`.

Multiple plausible bindable intents require clarification rather than choosing the most likely. Unknown, mixed, and conflicting candidates also require clarification. Unsupported candidates require refusal.

## Validation

`validateAsterIntentDecision` rejects:

- unknown schemas, invalid identities, and stale or malformed request or subject references;
- missing, duplicate, unsupported, or ungrounded candidates;
- invalid or numerically overstated confidence;
- meta intents selected as actionable intent;
- selected intents absent from the candidate set;
- consequence-class drift;
- unknown, mixed, conflicting, or multiply plausible intent without clarification;
- clarification decisions without ambiguity and an open direct question;
- unsupported intent without refusal and a safe fallback;
- non-actionable conversation represented as proposal work;
- proposal preparation without safe binding and explicit player choice; and
- attempted action, permission, or confirmation authority.

Validation proves only that the checked contract preserves the declared boundary. It does not prove semantic interpretation quality, clinical safety, accessibility, privacy, security, provider compliance, or production readiness.
