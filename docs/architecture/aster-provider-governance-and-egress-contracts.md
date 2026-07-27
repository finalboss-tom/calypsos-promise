# Aster Provider Governance and Egress Contracts

[Architecture index](README.md) · [Aster boundary](aster-contract-boundary.md) · [Role contracts](aster-role-contracts.md) · [Untrusted-input isolation](aster-untrusted-input-isolation-contracts.md) · [Responsive and deferred work](aster-responsive-and-deferred-work-contracts.md) · [Infrastructure sponsorship and exit](../economics/infrastructure-sponsorship-and-exit-policy.md) · [Funding conflict policy](../economics/funding-conflict-and-acceptance-policy.md) · [Product contract baseline](../product/aster-contract-baseline.md) · [Sprint 6 execution plan](../roadmap/sprint-6-execution-plan.md)

- **Status:** ACTIVE PRE-STABLE CONTRACT
- **Package:** `@calypsos-promise/aster`
- **Contract version:** `0.1.0-pre.1`
- **Evidence boundary:** deterministic public contracts and synthetic tests; not provider selection, procurement, private-data egress approval, production security, privacy, legal, clinical, interoperability, accessibility, financial-control, or operational certification

## Purpose

Aster may eventually use replaceable external processing services for bounded inference, retrieval, document, speech, image, translation, or safety tasks. A provider remains an outward adapter. Provider capability, credits, sponsorship, account settings, contract language, technical success, or market reputation cannot create product authority.

The permanent transaction boundary remains:

> AI proposes; the player confirms; deterministic domain services validate and store.

Sprint 6 defines the information and governance evidence required before provider use can even be considered. It does not select, endorse, procure, integrate, or approve a production provider.

## Governance states

The public provider-governance states are:

- `not-approved`;
- `synthetic-evaluation-only`;
- `specialist-review-required`;
- `blocked`; and
- `retired`.

There is intentionally no production-approved state in this pre-stable contract.

`synthetic-evaluation-only` permits only public or explicitly synthetic minimum-necessary inputs under a complete provider-neutral policy. Private personal data and protected operational material remain prohibited.

## Provider and adapter identity

Every provider candidate identifies:

- stable provider identity and revision;
- service class;
- provider-independent adapter identity and revision;
- exact Aster role operations being evaluated;
- information classes;
- bounded purpose; and
- output contract identity and revision.

A provider identity does not establish preferred status, source authority, clinical suitability, standards conformance, security, deletion completeness, or production authorization.

## Minimum-necessary egress

The public field taxonomy distinguishes synthetic or public evaluation inputs from authority-bearing or protected material.

Synthetic evaluation may transmit only bounded combinations of:

- task instructions;
- synthetic input;
- public educational excerpts;
- source references; and
- output schemas.

The contract requires the following to remain prohibited:

- real player expressions;
- Chronicle records;
- subject and account identifiers;
- House of Keys facts and policy decisions;
- access receipts;
- retained memory;
- provider operational metadata;
- protected audit; and
- credentials or secrets.

Every egress policy states that it is minimum necessary, carries no authority-bearing context, excludes raw source material and secrets, and does not authorize private data.

## Region, retention, logging, training, and human review

A synthetic-evaluation-eligible policy must declare:

- processing regions;
- request and response retention behavior;
- a zero or bounded retention period;
- request and response logging behavior;
- content logging as disabled;
- training use as prohibited;
- model-improvement use as prohibited;
- provider human review as prohibited;
- abuse-monitoring behavior; and
- subprocessor status with exact references when subprocessors exist.

Unknown region, retention, logging, human-review, training, abuse-monitoring, or subprocessor state cannot silently become acceptable. It requires a specialist hold and a non-eligible governance state.

Provider labels such as “zero retention” are evidence inputs. They are not proof that no uncontrolled copy, human access, abuse-monitoring path, backup, or downstream obligation exists.

## Deletion boundary

The deletion contract records:

- whether deletion requests are supported;
- an explicit processing deadline where applicable;
- the evidence class available;
- unresolved downstream-copy uncertainty; and
- the rule that provider evidence is not universal proof.

A contractual commitment, provider attestation, or verified request and response proves only the bounded procedure represented by that evidence. It does not prove every downstream copy ceased to exist.

## Credential boundary

The public governance envelope never contains secret material.

A future credential reference must remain:

- least privilege;
- environment bound;
- revocable and rotatable;
- absent from public repository records; and
- separable from provider selection, provider evaluation, and application authority.

Provider possession of a credential proves only bounded technical access. It does not create Chronicle identity, permission, recipient authority, source truth, or institutional legitimacy.

## Provider-neutral evaluation

Every candidate evaluation uses one versioned criteria set covering:

- task quality;
- source fidelity;
- uncertainty preservation;
- privacy;
- security;
- accessibility;
- reliability;
- latency;
- cost;
- portability;
- fallback;
- replacement;
- deletion; and
- concentration.

The provider cannot set the controlling criteria or weights, control findings, suppress negative evidence, or control publication.

Negative findings remain publishable through the ordinary reviewed public-record boundary. Provider promises, benchmark scores, rankings, market share, credits, or sponsorship do not substitute for evidence under the common criteria.

## Evaluator independence

The evaluation record distinguishes evaluator funding from evaluation independence.

A provider-funded evaluator:

- cannot be labeled independent merely because the work is technically competent;
- must disclose the conflict;
- requires a separate reviewer; and
- cannot control the only evidence, mapping, benchmark, or public conclusion.

A provider, sponsor, funded implementer, or sponsor-funded evaluator cannot independently certify its own provider suitability, security, privacy, accessibility, clinical safety, source fidelity, interoperability, or outcome.

## Funding and sponsorship conflicts

Provider credits, discounts, waived fees, implementation assistance, data access, professional services, or other benefits are material funding inputs rather than free capacity.

When such support exists, the provider-governance envelope requires an exact public funding-record reference and disclosed conflicts.

Funding cannot determine:

- provider defaults;
- source rank;
- connector rank;
- egress policy;
- benchmark conclusions;
- publication; or
- governance authority.

Support cannot purchase favorable findings, suppress limitations, create product placement, make a provider mandatory for the complete personal-value loop, or remove manual and local alternatives.

## Concentration and critical dependency

The contract records provider concentration separately from nominal price or credits.

Concentration states are:

- `not-material`;
- `watch`;
- `mitigation-required`;
- `pause-or-exception-required`; and
- `unknown`.

Criticality states are:

- `non-critical`;
- `critical-with-exit-plan`; and
- `critical-without-exit-plan`.

A critical dependency without an exit plan is invalid. Unknown concentration and concentration requiring pause or exception cannot remain synthetic-evaluation eligible.

## Replacement, migration, and teardown

Every candidate policy requires exact versioned references for:

- replacement planning;
- migration planning; and
- teardown planning.

The continuity contract also requires:

- a provider-independent adapter;
- a complete local or manual fallback;
- configuration and data export behavior;
- credential rotation and revocation;
- provider-side deletion work; and
- tracking of residual obligations and uncontrolled copies.

Open code, a standard API, or a successful export is not proof of semantic or operational portability.

## Incidents, material changes, and correction

Every provider relationship must support:

- suspension;
- an incident path;
- a public-claim correction path;
- revalidation after material changes;
- review after terms changes; and
- review after acquisition or reorganization.

A provider incident, terms change, ownership change, retention change, subprocessor change, negative finding, or sponsor-pressure attempt may require containment, migration, replacement, or retirement.

## Public-claim boundary

The provider contract cannot claim that a candidate is:

- production approved;
- proven zero retention;
- completely deleted;
- independently reviewed without evidence;
- clinically suitable;
- safe because of standards conformance;
- preferred; or
- a source of Chronicle authority.

Public statements remain correctable and must preserve unresolved limitations and evidence boundaries.

## Specialist holdpoints

The public holdpoint taxonomy includes:

- security;
- privacy;
- legal;
- procurement;
- accessibility;
- clinical;
- interoperability;
- financial control;
- data protection; and
- AI safety.

Private-data proposals, unknown provider handling, unknown funding relationships, unknown concentration, or exception-level concentration require explicit holdpoints and cannot silently become eligible.

## Authority boundary

Provider governance cannot:

- write canonical records;
- create or expand permission;
- confirm an Aster proposal;
- determine provider defaults, source rank, or connector rank;
- authorize production use;
- control benchmark conclusions or publication;
- complete quests; or
- grant rewards.

A provider response remains untrusted proposal input and follows the same source, uncertainty, memory, work-lifecycle, and domain-handoff boundaries as every other Aster result.

## Validation

`validateAsterProviderGovernance` checks:

- schema, policy, provider, adapter, task, and output-contract identity;
- public and synthetic-only evaluation scope;
- minimum-necessary field allowlists and mandatory prohibited fields;
- private and authority-bearing egress rejection;
- declared region, retention, logging, training, human-review, abuse-monitoring, and subprocessor behavior;
- bounded deletion evidence and downstream uncertainty;
- credential separation;
- provider-neutral criteria and evaluation independence;
- funding records and anti-control rules;
- concentration, fallback, replacement, migration, and teardown evidence;
- incident, suspension, correction, terms-change, and acquisition review;
- public-claim overreach;
- specialist holdpoints; and
- authority escalation.

The public synthetic tests cover a valid public-and-synthetic evaluation policy, private and authority-bearing egress, training and provider human review, provider-funded evaluation, credits and sponsor benefits, critical dependency and exit plans, unknown handling and concentration, public claims, and provider authority escalation.

## Non-scope

This contract does not create or select a provider, model, endpoint, provider account, credential, procurement process, private-data path, production egress route, legal agreement, data-processing agreement, business-associate agreement, payment arrangement, provider-placement surface, connector ranking, model gateway, production benchmark, operational migration system, or teardown runtime.

Passing deterministic validation proves only that the checked public contracts preserve the declared boundaries. It does not prove provider quality, safety, privacy, security, accessibility, legal sufficiency, procurement readiness, clinical suitability, interoperability, deletion, portability, financial independence, or production readiness.
