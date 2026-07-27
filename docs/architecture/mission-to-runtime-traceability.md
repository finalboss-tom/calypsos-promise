# Mission-to-Runtime Traceability

[Architecture index](README.md) · [Product Constitution](../frozen/product-constitution.md) · [Vision](../../VISION.md) · [Decision 0011](../decisions/0011-operational-simplicity-and-durable-workflows.md) · [Operational architecture](operational-simplicity-and-durable-workflows.md)

- **Status:** PROPOSED traceability baseline
- **Purpose:** Connect protected mission commitments to architecture ownership, implementation evidence, user-visible behavior, guardrails, and revalidation
- **Runtime effect:** None

## Why this exists

A local module can pass its own tests while the assembled system still violates the Promise.

This record connects the project’s highest-order commitments to the runtime boundaries that must carry them. It is intentionally human-readable during Phase 0. A machine-readable registry should be introduced only when a current Forge, validation, documentation, or status consumer justifies the contract.

## Reading rule

- A **constitutional commitment** is not invalidated by weak product evidence.
- An **implementation hypothesis** may be narrowed, replaced, or invalidated.
- A **runtime mechanism** must identify the commitment it protects and the evidence that it actually does so.
- Passing repository checks establishes repository consistency, not clinical, legal, privacy, security, accessibility, product-market, reliability, or production readiness.

## Traceability matrix

| Mission or right | Runtime constraint | Primary owner | Evidence before live use | Player-visible outcome | Guardrail or failure response | Revalidation trigger |
| --- | --- | --- | --- | --- | --- | --- |
| Build a useful Living Chronicle | Structured records, sources, time, provenance, correction, conflict, export, and deletion remain authoritative domain concepts | Chronicle capability | Contract tests, cross-contract journeys, persistence and migration evidence | The person can capture, inspect, correct, export, and delete an understandable record | Derivatives cannot silently overwrite source truth; failure preserves inspectable state | Material schema, persistence, migration, or custody change |
| Improve health without false clinical authority | Personal analytics and feedback remain descriptive, sourced, uncertainty-aware, and separable from diagnosis or treatment | Personal analytics, learning, clinical and safety governance | Claim benchmarks, source citation, uncertainty comprehension, specialist review | The person sees what was observed, calculated, associated, or inferred | Unsupported claims are blocked, narrowed, corrected, or removed | New claim class, high-risk workflow, or adverse evidence |
| Keep the key | Purpose-specific permission precedes sensitive operations and remains separate from Chronicle truth | House of Keys and enforcement orchestration | Policy fixtures, revocation propagation, receipt, identity, and execution tests | The person can understand, deny, withdraw, and inspect relevant access | Missing or stale authority fails closed; retries cannot broaden permission | New recipient, purpose, action, delegation, or authority class |
| Private by default | Public and contributor surfaces remain public or synthetic; production paths minimize access and disclosure | Security, publication, applications, operators | Threat model implementation, environment isolation, logging review, incident exercises | Ordinary use does not require public disclosure | Quarantine, containment, incident routing, deletion, and correction | New data flow, provider, public surface, or incident |
| Meaningful refusal without punishment | Core personal progress and return remain available after decline, defer, withdrawal, or missed time | Quest, progression, story, notification, House of Keys | Synthetic and participant journeys for refusal, return, and route replacement | Refusal does not remove the complete personal product or shame the player | Remove or roll back coercive mechanics; restore affected state where possible | New progression, reminder, monetization, research, or governance mechanic |
| Meaningfully free personal product | Core manual capture, permission history, correction, export, deletion, safety, accessibility, and controlled infrastructure do not require payment or secondary use | Product, applications, operations, economics | Cost model, provider-failure tests, hosted-versus-manual journey evidence | A person can receive durable personal value without premium compute or broader consent | Narrow premium features, preserve manual fallback, replace dependencies | Pricing, provider, storage, model, subsidy, or cost change |
| AI proposes; the player confirms | AI output creates drafts, explanations, or bounded requests rather than canonical records or authority | AI Gateway, application orchestration, domain services | Structured extraction tests, confirmation journeys, unsafe-output benchmarks, provider failure tests | The person can see, change, reject, or bypass an AI draft | Fall back to manual paths; quarantine unsafe output; no direct canonical write | Model, provider, memory, tool, or prompt-policy change |
| Consumer-first and provider-independent continuity | External institutional systems are source-attributed adapters, not automatic Chronicle authority or product owners | Connectors, Chronicle mappings, House of Keys, interoperability governance | Versioned mapping fixtures, conflict and loss behavior, connector replacement evidence | Institutional records can help without controlling the complete personal product | Expose mapping limits; preserve manual paths; disable or replace adapters | New standard, implementation guide, provider, enterprise relationship, or mapping |
| Brief, ergonomic daily play | Immediate interactions remain small; optional enrichment and reconciliation do not block truthful acknowledgement | Game, orchestration, jobs, projections | Interaction timing, degraded-mode, accessibility, and daily-route journey evidence | The player can capture or act and leave with a clear stopping point | Show pending or failed state; continue without optional providers; reduce route | First vertical slice, latency regression, or journey redesign |
| Accessible participation | Essential information and control remain available through direct, nonvisual, low-motion, low-bandwidth, manual, and non-AI paths | Experience clients, content, accessibility governance | Keyboard, screen-reader, reduced-motion, low-bandwidth, comprehension, and fallback tests | Different abilities and preferences do not remove basic product rights | Block release or provide equivalent path; do not use narrative as concealment | New client, interaction mode, content system, or major UI redesign |
| Correctable system | Material mechanisms expose assumptions, outcomes, challenge, containment, appeal, rollback, restoration, and revalidation | Institutional Immune System and owning capability | Challenge fixtures, incident and rollback exercises, outcome review | A person or contributor can challenge consequential behavior and see correction status | Contain harm, preserve evidence, restore where possible, supersede rather than erase | Credible challenge, guardrail breach, concentrated harm, or scheduled review |
| Provider and technology replacement | Domain contracts remain provider-independent; derivatives are rebuildable; source and export are portable | Architecture, adapters, operations, release and succession owners | Clean-machine setup, adapter contract tests, replay, migration, teardown, and replacement exercises | Records and rights survive technology change | Block unbounded dependency; fund replacement; preserve source and exports | Major vendor selection, renewal, outage, price change, acquisition, or exit |
| Founder independence | Critical build, release, operation, recovery, and migration knowledge is documented and exercisable by others | Governance, maintainers, operations, institutional succession | Key-person register, ownership map, second-operator exercise, founder-absence exercise | Product and rights continue through leadership transition | Pause expansion, transfer credentials and knowledge, reduce founder-only paths | Phase exit, maintainer transition, incapacity, or founder-absence exercise |
| Public-domain and forkable institution | Public code, contracts, public-safe history, and documentation remain usable without private data or proprietary authority | Repository governance, licensing, publication, architecture | Clean setup, synthetic demonstration, provenance and legal implementation review | Others can study, contribute, operate synthetic paths, and eventually fork lawfully | Preserve public/private boundary; disclose dependency and official-status limits | License, dependency, brand, hosted-service, or institutional transition |
| Sustainable public-good institution | Infrastructure, funding, and enterprise support cannot purchase product, data, provider, research, or governance authority | Economics, governance, procurement, architecture | Public relationship records, conflict review, concentration and exit evidence | Support can fund work without silently changing player rights or product ranking | Decline, suspend, terminate, replace, correct, or publish conflicts | New funding, credit, sponsor, procurement, provider, or concentration trigger |
| Hundred-year stewardship | Source provenance, contract versions, archives, migrations, succession, and institutional history survive technology and leadership change | Chronicle, governance, archive, operations, successor institution | Migration and restoration exercises, archive review, provider replacement, continuity evidence | Long-lived records and institutional purpose remain understandable across change | Preserve source, pause destructive migration, support export, fork, merger, or wind-down | Major generation change, archive migration, succession, merger, fork, or dissolution |

## Operational traceability pattern

A material runtime capability should eventually identify:

```text
constitutional commitment
→ accepted decision or baseline
→ owning bounded capability
→ command, event, projection, or job contract
→ automated and human evidence
→ user-visible behavior
→ guardrail and failure response
→ outcome metric
→ challenge and correction path
→ revalidation trigger
```

## Initial vertical-slice trace

The first private value-loop implementation should demonstrate this sequence:

### 1. Player proposes an observation

- **Commitment:** Personal utility, accessible participation, AI proposes.
- **Owner:** Experience client and Aster draft boundary.
- **Evidence:** Manual and assisted synthetic input fixtures.
- **Visible state:** Draft, source, uncertainty, and confirmation options.
- **Failure:** AI unavailable or unsafe output returns to a complete manual path.

### 2. Player confirms or rejects the draft

- **Commitment:** Individual control, correction, meaningful refusal.
- **Owner:** Application orchestration and Chronicle command boundary.
- **Evidence:** Confirm, edit, reject, duplicate, and approximate-time journeys.
- **Visible state:** Nothing becomes authoritative before confirmation.
- **Failure:** Ambiguity remains a draft or is clarified; it is not silently stored as fact.

### 3. Domain service validates and stores

- **Commitment:** Structured authoritative record and provenance.
- **Owner:** Chronicle capability.
- **Evidence:** Contract, persistence, version, and source-chain tests.
- **Visible state:** Saved record with source and correction path.
- **Failure:** Validation errors are actionable and do not create partial truth.

### 4. Deferred enrichment is requested

- **Commitment:** Responsive daily play, operational simplicity, provider independence.
- **Owner:** Application work port and durable job contract.
- **Evidence:** Stable operation identity, local fake adapter, failure and retry fixture.
- **Visible state:** Authoritative capture is complete; enrichment is honestly pending.
- **Failure:** Optional work may fail without corrupting the Chronicle or blocking continued use.

### 5. Quest or projection updates

- **Commitment:** Deterministic incentives, no duplicate reward, clear fact-versus-derivative boundary.
- **Owner:** Quest and progression capabilities.
- **Evidence:** Duplicate-delivery, stale-input, correction, and replay tests.
- **Visible state:** The player sees why a quest or restoration changed.
- **Failure:** Retry does not duplicate completion or rewards; stale evidence is rejected or corrected.

### 6. Player corrects the source later

- **Commitment:** Correction, institutional corrigibility, inspectable history.
- **Owner:** Chronicle, affected projections, and job orchestration.
- **Evidence:** Supersession, derived invalidation, and projection rebuild journey.
- **Visible state:** Prior assertion and correction remain understandable.
- **Failure:** The system does not silently rewrite history or claim all downstream effects vanished.

## Pull-request application

A material implementation pull request should answer:

- Which row or commitment does this change implement?
- Which bounded capability owns the behavior?
- Is the work responsive, deferred, scheduled, or mixed?
- Which state is authoritative?
- Which derivatives may be stale or rebuilt?
- What evidence protects the player-visible outcome?
- What happens when the provider, queue, network, model, or worker is unavailable?
- How are correction, retry, replay, cancellation, and rollback handled?
- What new operational burden or dependency is introduced?
- What event or evidence would trigger revalidation?

## Future machine-readable form

A future typed registry may include:

- stable commitment identifier;
- authority level;
- source document and clause;
- owning capability;
- linked decision and assumption identifiers;
- implementation paths;
- evidence identifiers;
- user journey identifiers;
- guardrail and metric identifiers;
- review owner;
- status;
- and revalidation trigger.

It should be introduced only with a public contract, current consumer, validation, and migration path. Markdown remains authoritative until then.
