# Aster Role Contracts

[Architecture index](README.md) · [Aster boundary](aster-contract-boundary.md) · [Product contract baseline](../product/aster-contract-baseline.md) · [Sprint 6 execution plan](../roadmap/sprint-6-execution-plan.md)

- **Status:** ACTIVE PRE-STABLE CONTRACT
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`
- **Evidence boundary:** deterministic public contracts and synthetic tests; not production-model, provider, clinical, legal, privacy, security, accessibility, or operational certification

## Governing transaction

Aster prepares drafts, recall, explanations, routes, and narrative presentation. It does not create authority.

> AI proposes; the player confirms; deterministic domain services validate and store.

A role result cannot become canonical, invoke an authoritative action, create or expand permission, confirm itself, complete a quest, grant a reward, or silently become retained memory.

## Shared role contract

Every role declares:

- one stable role-specific contract identifier and bounded operation;
- direct accessible language alongside its narrative name;
- allowed input and output classes inherited from the public authority matrix;
- evidence requirements that reference only authority classes allowed for that role;
- conditions that require clarification rather than guessing;
- qualitative confidence and uncertainty rules that cannot create authority;
- stable failure codes and a complete manual or deterministic fallback;
- responsive, deferred, and manual-fallback classifications;
- the deterministic capability that owns any later authoritative action;
- source-link behavior;
- transient request context and no role-owned retained memory;
- separate visible player choice before any retained memory;
- provider egress limited to a future policy-gated minimum-necessary path; and
- explicit role-specific prohibited actions.

The role contracts describe what an application may ask Aster to prepare. They are not provider prompts, remote execution instructions, permission grants, storage commands, or evidence that any model is safe or suitable.

## Role matrix

| Role        | Direct meaning                       | Bounded operation                    | Required evidence                                                                                              | Result                                              | Deterministic owner                                                        | Manual or deterministic fallback                 |
| ----------- | ------------------------------------ | ------------------------------------ | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------ |
| Scribe      | structured capture assistant         | prepare a structured capture draft   | player expression; exact confirmation remains a later separate step                                            | structured draft or clarification request           | Living Chronicle validates and stores only after exact player confirmation | manual structured capture                        |
| Librarian   | source-linked recall assistant       | prepare source-linked recall         | authoritative Chronicle records or clearly labeled public educational material with an inspectable source path | source-linked recall draft or clarification request | none; recall is not canonical action                                       | structured Chronicle query and source inspection |
| Wayfinder   | navigation assistant                 | propose an inspectable product route | explicit player choice and current application state                                                           | navigation proposal or clarification request        | application navigation executes only after player choice                   | direct deterministic navigation                  |
| Interpreter | plain-language explanation assistant | prepare a source-aware explanation   | inspectable records, mappings, or provenance                                                                   | explanation draft or clarification request          | none; explanation is not canonical action                                  | direct source, mapping, and limitation display   |
| Storykeeper | narrative presentation assistant     | prepare narrative presentation       | current gameplay state and a confirmed domain event                                                            | narrative presentation proposal                     | gameplay remains the deterministic owner of progression and rewards        | deterministic narrative presentation             |

## Scribe

The Scribe may structure what a person expressed, preserve approximate time and source uncertainty, and ask for clarification when subject, intent, time, value, unit, or action scope is materially ambiguous.

The Scribe cannot store an unconfirmed draft, invent provenance, discard material uncertainty, treat a conversational acknowledgement as exact confirmation, or persist input as memory merely because the input requests persistence.

The Scribe result remains a draft. The player must review and confirm the exact proposal, the House of Keys must provide a valid and fresh decision where permission is required, and the Living Chronicle validator must independently accept the proposed record before authoritative storage can occur.

## Librarian

The Librarian may prepare recall from authoritative Chronicle records or clearly labeled public educational material. Every health-related recalled statement requires an inspectable source path.

The Librarian cannot treat retrieval score, model confidence, provider rank, newest source, sponsorship, or standards conformance as truth. It cannot hide correction, conflict, retraction, supersession, deletion, mapping loss, provenance, or index-freshness limitations.

Missing or stale source evidence produces clarification, refusal, an unavailable result, or the structured-query fallback. It does not permit unsupported recall.

## Wayfinder

The Wayfinder may propose routes through inspectable application state in response to an explicit player request or choice.

It cannot expand permission to make a route available, frame broader permission as required progression, treat navigation as domain completion, or turn a suggested destination into a completed action. Consequential actions reached through a route remain separately confirmed and owned by their deterministic domain capability.

## Interpreter

The Interpreter may explain records, mappings, source limitations, and uncertainty in plain language.

It cannot diagnose, prescribe, direct emergency care, or imply that standards conformance proves clinical completeness, semantic equivalence, safety, endorsement, or successful mapping. It must preserve material mapping loss, source limitations, approximate time, conflicting evidence, and uncertainty.

Clinical, emergency, or treatment-seeking requests remain outside this contract and require safe product behavior and specialist-reviewed pathways in later gated work.

## Storykeeper

The Storykeeper may prepare narrative presentation only from current deterministic gameplay state and confirmed domain events.

It cannot invent canon, fabricate confirmed events, complete progression, grant rewards, convert uncertain health information into narrative certainty, or persist narrative input as product memory by instruction. Presentation cannot become proof that the underlying domain action occurred.

## Confidence and clarification

Confidence is qualitative and evidence-bounded. It is never a probability of truth, permission, safety, completion, or authority.

A role must clarify or fail safely when a material request has ambiguous subject, intent, time, value, unit, source scope, action scope, conflicting evidence, stale authority, unsupported operation, missing confirmed event, or conflicting narrative state.

Later Sprint 6 work defines the full intent and confidence envelope. This role baseline establishes that a likely interpretation is not enough to select a consequential action.

## Retention and memory

Role request context is transient by default. A role owns no retained product memory.

Any player-visible retained preference, accessibility context, conversation, derived memory, or narrative state requires a separate memory-class contract and, where applicable, a visible player choice. Provider-side operational metadata is not product memory and cannot silently become canonical state.

The detailed memory lifecycle remains Sprint 6.6 scope.

## Provider egress

The core contracts remain locally executable without a provider. Any future provider egress must be policy-gated and minimum necessary, and authority-bearing context cannot be treated as ordinary provider payload.

This baseline does not approve a provider, payload, region, retention term, training term, human-review path, subcontractor, credential route, or production data-processing relationship. Those remain Sprint 6.9 and specialist-gated work.

## Validation

`validateAsterRoleContracts` checks that:

- all five roles are present and no unknown role is added;
- each contract identifier, revision, and operation matches its role;
- detailed inputs, outputs, execution classes, confirmation rule, accessible name, purpose, and deterministic owner remain aligned with the authority matrix;
- evidence requirements use authority classes allowed for that role;
- clarification, confidence, failure, and source-link values use public taxonomies;
- results cannot become canonical or invoke authoritative actions;
- roles cannot own hidden retained memory;
- retained memory requires a separate visible player choice;
- provider egress remains policy-gated and authority-bearing context remains prohibited;
- every role has a manual or deterministic fallback; and
- every role retains the mandatory prohibition against canonical writes, permission changes, self-confirmation, quest completion, and rewards.

Validation proves only that the checked contract objects preserve these declared invariants. It does not prove model quality, semantic accuracy, clinical safety, privacy, security, accessibility, provider compliance, or production readiness.
