# Aster Local Synthetic Adapter and Non-AI Fallbacks

[Architecture index](README.md) · [Aster boundary](aster-contract-boundary.md) · [Role contracts](aster-role-contracts.md) · [Responsive and deferred work](aster-responsive-and-deferred-work-contracts.md) · [Provider governance](aster-provider-governance-and-egress-contracts.md) · [Product contract baseline](../product/aster-contract-baseline.md) · [Sprint 6 execution plan](../roadmap/sprint-6-execution-plan.md)

- **Status:** ACTIVE PRE-STABLE CONTRACT
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`
- **Evidence boundary:** deterministic public contracts and synthetic fixtures only; not model-quality, clinical, privacy, security, accessibility, interoperability, production-runtime, latency, or operational certification

## Purpose

Sprint 6 requires Aster to remain testable, replaceable, and useful when no model or provider exists. The local synthetic adapter provides a deterministic reference surface for exercising role, intent, clarification, refusal, prompt-injection, delayed-work, provider-unavailable, stale-result, and fallback behavior without calling a provider.

It is not a fake production model. It is a fixed public scenario catalogue and pure runner used to prove contract behavior.

The permanent transaction boundary remains:

> AI proposes; the player confirms; deterministic domain services validate and store.

A local result remains a proposal, explanation, route, presentation proposal, refusal, clarification, containment record, degraded-state record, or fallback reference. It does not become Chronicle truth, House of Keys authority, gameplay completion, a reward, provider approval, or a production result.

## Deterministic runtime boundary

The local adapter declares literal boundaries:

- deterministic execution;
- public synthetic information only;
- no provider use;
- no network use;
- no credentials;
- no wall-clock dependency;
- no randomness;
- no persistent storage; and
- no production or private-data path.

Repeated execution of the same scenario identifier returns the same serialized result. The runner does not infer from ambient time, environment variables, network state, provider state, previous requests, or hidden memory.

## Scenario catalogue

The public catalogue contains one versioned fixture for each required path:

| Scenario                                   | Contract evidence                                                  |
| ------------------------------------------ | ------------------------------------------------------------------ |
| `scribe-structured-draft`                  | synthetic structured capture draft requiring later player review   |
| `librarian-source-linked-recall`           | recall linked to an exact synthetic Chronicle record revision      |
| `wayfinder-navigation`                     | inspectable route proposal to permission review                    |
| `interpreter-source-aware-explanation`     | non-clinical explanation preserving source and uncertainty         |
| `storykeeper-confirmed-event-presentation` | presentation proposal linked to a synthetic confirmed domain event |
| `unknown-intent`                           | direct clarification instead of action selection                   |
| `ambiguous-intent`                         | multiple consequential candidates require explicit player choice   |
| `clarification-resolved`                   | explicit player choice permits a bounded proposal                  |
| `low-confidence`                           | low qualitative confidence requires clarification                  |
| `unsupported-refusal`                      | clinical or otherwise unsupported authority is refused             |
| `prompt-injection`                         | embedded instructions remain data-only and contained               |
| `timeout`                                  | timeout remains explicit and activates deterministic fallback      |
| `provider-unavailable`                     | provider absence does not block direct source inspection           |
| `stale-work`                               | stale output cannot replace current work                           |
| `superseded-work`                          | superseded output cannot replace its successor                     |
| `manual-capture`                           | structured capture remains available without AI                    |
| `permission-review`                        | deterministic House of Keys review remains available without AI    |

Every scenario carries:

- stable scenario and revision identity;
- public role and operation identity where binding is safe;
- a direct outcome class;
- qualitative confidence;
- player-facing language;
- synthetic payload and exact synthetic source references where required;
- clarification, refusal, security-finding, fallback, and stale-result evidence;
- a literal non-authoritative flag; and
- explicit prohibition on replacing current work where stale or superseded.

## Role coverage

All five narrative roles have a successful deterministic fixture and a provider-independent fallback aligned with their public role contract:

- **Scribe:** manual structured capture;
- **Librarian:** structured Chronicle query and exact source inspection;
- **Wayfinder:** direct deterministic navigation;
- **Interpreter:** direct source and mapping inspection; and
- **Storykeeper:** deterministic authored presentation.

A narrative name creates no technical authority. Local fixtures must use the exact operation assigned to the selected role.

## Core non-AI fallback matrix

The complete personal-value loop retains these visible provider-independent paths:

| Fallback                   | Deterministic owner | Protected capability                             |
| -------------------------- | ------------------- | ------------------------------------------------ |
| `manual-capture`           | Living Chronicle    | enter and review a structured draft              |
| `structured-record-recall` | Living Chronicle    | query and inspect exact records                  |
| `permission-review`        | House of Keys       | inspect current permission facts                 |
| `correction`               | Living Chronicle    | submit correction through the canonical workflow |
| `export`                   | Living Chronicle    | request and inspect export state                 |
| `deletion`                 | Living Chronicle    | request deletion and inspect lifecycle evidence  |
| `ordinary-play`            | gameplay            | continue authored deterministic play             |

Every fallback is:

- player-visible;
- available without AI;
- available without a provider;
- permission-neutral; and
- unable to block the corresponding core right.

A fallback may be less convenient or less expressive than optional enrichment. It cannot silently weaken player rights, source evidence, confirmation, correction, export, deletion, or ordinary play.

## Clarification and refusal

Unknown, ambiguous, and low-confidence consequential requests cannot select the most likely action. They return a direct clarification question and cannot prepare a proposal until an explicit player choice resolves the ambiguity.

Unsupported requests return an inspectable refusal reason. A refusal cannot invoke an authoritative action or become a clinical, permission, canonical, progression, or reward decision.

## Prompt-injection fixture

The prompt-injection scenario proves the contract response, not detection quality:

- instruction-like content remains untrusted data;
- a stable security finding is visible;
- proposal preparation remains blocked;
- manual capture remains available; and
- policy, tools, subject, permission, confirmation, sources, uncertainty, memory, and canonical state remain outside the content's authority.

The fixture does not certify a production prompt firewall, classifier, model, sandbox, or detection rate.

## Timeout, provider absence, stale work, and supersession

Timeout and provider-unavailable scenarios remain explicit degraded outcomes. They activate complete deterministic fallbacks rather than trapping the player in an indeterminate interface.

Stale and superseded scenarios carry `mustNotReplaceCurrentResult: true`. They cannot prepare a proposal, overwrite a newer result, or reuse old authority as current.

## Authority boundary

The local adapter cannot:

- write canonical records;
- create or expand permission;
- confirm proposals;
- invoke authoritative actions;
- authorize provider use;
- complete quests;
- grant rewards;
- retain hidden memory;
- convert synthetic fixtures into model-quality claims; or
- represent a local run as deployment, production readiness, clinical validity, provider approval, or specialist review.

## Validation

`validateAsterLocalSyntheticAdapter` verifies:

- contract-version alignment;
- deterministic synthetic-only runtime boundaries;
- literal non-authority;
- complete and unique scenario coverage;
- exact role-operation alignment;
- recognized outcomes;
- exact source evidence for recall, explanation, and confirmed-event presentation;
- safe clarification and refusal behavior;
- prompt-injection containment;
- fallback presence for degraded paths;
- stale and superseded overwrite prevention;
- all five role fallbacks; and
- all seven visible, non-blocking core non-AI paths.

Public-surface tests verify deterministic repeatability, five-role coverage, exact source evidence, clarification, refusal, prompt injection, timeout, provider unavailability, stale and superseded work, complete fallback coverage, and rejection of runtime, role, fallback, and authority escalation.

## Non-scope

This contract does not create or select:

- a production model or provider;
- a model simulator or quality benchmark;
- a model gateway;
- production prompts;
- private-data fixtures;
- accounts or identity;
- a database, queue, scheduler, workflow engine, worker, event store, vector database, or persistence adapter;
- production voice, image, document, connector, retrieval, or memory processing;
- clinical decision support, diagnosis, treatment, or emergency response; or
- production security, privacy, accessibility, interoperability, reliability, or operational evidence.
