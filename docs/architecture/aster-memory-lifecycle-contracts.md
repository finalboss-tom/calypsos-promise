# Aster Memory Classes and Lifecycle Contracts

[Architecture index](README.md) · [Aster boundary](aster-contract-boundary.md) · [Role contracts](aster-role-contracts.md) · [Proposal and extraction contracts](aster-proposal-and-extraction-contracts.md) · [Intent contracts](aster-intent-confidence-clarification-refusal.md) · [Source-linked recall contracts](aster-source-linked-recall-and-explanation.md) · [Product contract baseline](../product/aster-contract-baseline.md) · [Sprint 6 execution plan](../roadmap/sprint-6-execution-plan.md)

- **Status:** ACTIVE PRE-STABLE CONTRACT
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`
- **Evidence boundary:** deterministic public contracts and synthetic tests; not production persistence, privacy, security, legal, provider, retention, deletion, or operational certification

## Purpose

Aster may reduce repeated work by using bounded context, preferences, accessibility settings, separately retained conversation, record-linked derivatives, and narrative presentation state. It may not silently convert interaction history, model output, provider metadata, or inferred patterns into hidden product memory.

The permanent transaction boundary remains:

> AI proposes; the player confirms; deterministic domain services validate and store.

Memory is a separate product claim. It is not Living Chronicle truth, House of Keys permission truth, a proposal confirmation, a receipt, protected audit, provider log, retrieval index, delayed-work state, quest completion, or reward evidence.

## Public memory classes

| Memory class | Owner | Retained | Product memory | Required fallback |
| --- | --- | --- | --- | --- |
| `transient-context` | request context | no | no | continue without memory |
| `retained-preference` | product memory | yes | yes | ask the player |
| `accessibility-context` | product memory | yes | yes | use an accessible default |
| `retained-conversation` | product memory | yes | yes | continue without memory |
| `derived-record-linked-memory` | product memory | yes | yes | recompute from authoritative records |
| `narrative-presentation-state` | gameplay presentation | yes | yes | use deterministic presentation |
| `provider-operational-metadata` | provider operations | yes | no | continue provider-independent operation |

The class name does not create storage authority. Applications still require a separately governed persistence implementation and must preserve the public class policy.

## Material product memory

Retained preferences, accessibility context, retained conversation, record-linked derived memory, and narrative presentation state are material product memory.

Every material product-memory policy requires:

- a separate visible player choice before retention;
- full player visibility;
- editing through an inspectable revision rather than silent overwrite;
- inclusion in a portable export;
- player-requested deletion;
- explicit retention and lifecycle state;
- no secondary-use, provider-training, research, or commercial authority;
- no canonical, permission, progression, or reward authority; and
- a complete fallback when the memory is missing, deleted, expired, unavailable, or declined.

A request, conversation, preference, accessibility need, source record, or narrative event does not persist itself merely by containing an instruction to remember it.

## Transient context

Transient context is request-bounded and not retained product memory. It remains visible in the current interaction where applicable, but it is not silently promoted into retained preference, retained conversation, or derived memory.

When transient context is missing, Aster continues without memory or asks for the minimum information needed for the current request. Missing context cannot expand authority or create a reason to retain broader information.

## Player choice and source evidence

Every retained product-memory entry identifies the player choice that authorized retention. It also preserves a versioned source reference appropriate to its class:

- preferences reference the player choice;
- accessibility context references an accessibility setting;
- retained conversation references the separately selected conversation material;
- record-linked memory references an exact Chronicle record and revision;
- narrative presentation state references current deterministic gameplay state.

The source reference explains where the memory came from. It does not convert the memory into source truth or give Aster authority over the source domain.

## Record-linked derived memory

Record-linked memory is a convenience derivative, never a substitute for authoritative Chronicle records.

It must:

- reference exact Chronicle record identities and revisions;
- remain visibly derived;
- be corrected, superseded, deleted, expired, or marked unavailable when its source relationship changes;
- recompute from current authoritative records when safe and available; and
- fall back to direct record inspection when recomputation is unavailable.

A derived memory cannot outvote a corrected, superseded, conflicted, deleted, or unavailable Chronicle record.

## Correction and supersession

Material memory changes create new inspectable revisions. A correction or supersession identifies the prior revision rather than overwriting it without history.

The lifecycle states are:

- `active`;
- `superseded`;
- `deletion-requested`;
- `deleted`;
- `expired`; and
- `unavailable`.

A superseded entry identifies the later replacing revision. A correcting or superseding entry identifies the earlier revision it changes. Deletion-requested and deleted entries identify the deletion request. Deleted, expired, and unavailable entries do not retain the prior value in the active contract object.

These contracts describe lifecycle evidence. They do not claim secure erasure, backup deletion, legal sufficiency, or completed production deletion infrastructure.

## Export and deletion

Every material product-memory class is exportable and deletable.

A memory export preserves:

- stable memory identity and revision;
- memory class and owner;
- subject reference;
- player-choice reference;
- source references;
- retention policy and expiry where applicable;
- correction, supersession, deletion, expiry, and unavailability state;
- player controls;
- egress and secondary-use boundaries; and
- the declared missing-memory fallback.

Deletion is not inferred from hiding a UI element, clearing a session, removing a provider cache, or deleting one derivative. The production implementation must later distinguish requests, processing, exceptions, completion evidence, and provider obligations.

## Provider operational metadata

Provider operational metadata is explicitly not product memory.

The Aster core may carry only a bounded reference showing that provider-side operational metadata exists under a versioned provider policy and expiry. It does not store raw provider logs, prompts, request bodies, responses, tokens, credentials, human-review records, or other provider-operational content inside the product-memory contract.

Provider operational metadata:

- is owned by provider operations;
- requires an explicit expiry;
- is never canonical Chronicle or House of Keys state;
- cannot become retained product memory by instruction or adapter behavior;
- cannot authorize training, research, commercial use, or broader retention;
- cannot block provider-independent operation when unavailable; and
- remains subject to the provider-governance and teardown requirements defined in Sprint 6.9.

## Egress and secondary use

Retained product memory has no automatic provider egress. Its policy states that a separate provider-egress contract is required before any minimum-necessary transmission can be considered.

Every memory entry declares:

- no authority-bearing context in egress;
- no secondary-use authorization;
- no provider-training authorization;
- no research-use authorization;
- no commercial-use authorization; and
- a separate authorization requirement for any later secondary use.

Memory retention does not imply permission for inference, profiling, advertising, sponsorship benefits, research recruitment, model improvement, or institutional access.

## Missing-memory behavior

Missing memory never blocks core capture, permission review, correction, export, deletion, or ordinary play.

Fallbacks remain deterministic and class-specific:

- continue without transient or retained conversation memory;
- ask the player for a missing preference;
- use an accessible default without requiring disclosure;
- recompute record-linked memory from authoritative records;
- use deterministic narrative presentation; or
- continue provider-independent operation without provider metadata.

A fallback may reduce convenience. It cannot remove core rights, coerce retention, broaden permission, purchase progression, or treat memory absence as a user failure.

## Authority boundary

Memory cannot:

- write or become a canonical Chronicle record;
- create or expand House of Keys permission;
- confirm an Aster proposal;
- complete a quest;
- grant a reward;
- establish a personal-health fact without authoritative record evidence;
- override correction, conflict, deletion, or source-unavailability state;
- become provider or sponsor authority;
- authorize secondary use; or
- block core product paths when absent.

## Validation

`validateAsterMemoryClassPolicies` checks that:

- every public memory class has a recognized policy;
- material product memory is visible, editable, exportable, deletable, and separately chosen;
- provider operational metadata remains outside product memory;
- no class authorizes secondary use, training, research, commerce, canonical writes, permission, progression, rewards, or core blocking; and
- every class has a recognized missing-memory fallback.

`validateAsterMemoryEntry` checks that:

- identity, revision, class, owner, subject, retention, lifecycle, controls, egress, and fallback use recognized contracts;
- entries remain aligned with their class policy;
- retained material memory identifies a separate player choice;
- each class has the required versioned source evidence;
- record-linked memory includes an exact Chronicle source revision;
- correction and supersession reference valid earlier or later revisions;
- deletion and expiry retain inspectable lifecycle evidence without active values;
- provider metadata carries only a bounded external reference, not raw content;
- secondary-use and authority flags remain false; and
- missing memory cannot block core paths.

Validation proves only that the checked contracts preserve these declared boundaries. It does not prove production persistence, privacy, security, deletion, provider compliance, legal sufficiency, accessibility, or operational readiness.
