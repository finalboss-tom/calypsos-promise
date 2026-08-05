# Longitudinal Intelligence Doctrine

**Status:** BASELINE — founding-steward accepted on 2026-08-04  
**Authority:** Product and architecture doctrine only  
**Production capability:** Not authorized  
**Related validation plan:** [`../roadmap/longitudinal-intelligence-validation-plan.md`](../roadmap/longitudinal-intelligence-validation-plan.md)

[Architecture documentation](README.md) · [Product Constitution](../frozen/product-constitution.md) · [Architecture Foundation](../frozen/architecture.md) · [Living Chronicle identity and authority](living-chronicle-identity-authority.md) · [Aster contract boundary](aster-contract-boundary.md) · [Current project status](../roadmap/current-status.md)

## Purpose

Longitudinal Intelligence is the capability through which Calypso’s Promise may help a person understand what has happened across their life, identify meaningful changes, ask better questions, evaluate possible explanations, and, where evidence and safeguards permit, conduct bounded personal tests.

Its purpose is not to manufacture certainty. Its purpose is to return useful value from the person’s own Living Chronicle while preserving privacy, correction, deletion, export, refusal, provenance, provider independence, deterministic authority, and the distinction between observation, interpretation, evidence, and action.

The durable product is the person-controlled Living Chronicle. Models, scores, summaries, experiments, forecasts, interpretations, and recommendations are derivative objects.

> Longitudinal Intelligence helps a person gain useful, truthful, and corrigible understanding from their Living Chronicle. The Chronicle remains authoritative; AI remains advisory; personal value comes first; private data remain under the person’s control; uncertainty remains visible; experimentation remains optional; and no causal or health authority expands beyond the exact evidence, context, consequence, and time horizon that earned it.

## Current conclusion

Longitudinal Intelligence is architecturally viable but empirically unvalidated.

The project has a coherent doctrine for preserving longitudinal truth, separating AI from authority, representing uncertainty, maintaining player confirmation, resisting provider capture, preserving measurement and inference provenance, and bounding optional personal experimentation.

The project does not yet have evidence that it can reliably determine what improves an individual’s health, distinguish stable benefit from temporary benefit, transport an earlier personal result into a later context, identify harm when unfavorable experiences cause refusal or missing observations, select the correct outcome or decision policy for a person, or make autonomous health recommendations.

The first defensible form is therefore:

> A private, person-controlled evidence system that helps people preserve, understand, question, and carefully test their longitudinal experience without overstating what the evidence proves.

It is not initially:

> An AI that continuously determines what works for you.

## Protected invariants

Longitudinal Intelligence must never weaken:

- personal value first;
- private-by-default health and life data;
- purpose-specific permission;
- meaningful refusal and stopping;
- correction and supersession;
- deletion where possible;
- usable export;
- explicit player confirmation;
- deterministic domain authority;
- provider independence and replaceability;
- accessible and non-punitive participation;
- complete non-AI personal-core paths; or
- the prohibition on unsupported causal, clinical, research, or commercial claims.

No model, provider, sponsor, institution, score, protocol, benchmark, funding relationship, or deployment may silently override these invariants.

## The Chronicle precedes the intelligence

The system must preserve distinct identities for:

1. **Source archive** — original documents, device payloads, messages, images, recordings, laboratory files, clinical exports, and other artifacts.
2. **Canonical Chronicle records** — structured observations, assertions, corrections, relationships, provenance, conflicts, lifecycle states, and person-confirmed records.
3. **Derived measurements** — scores, transformations, classifications, aggregates, baselines, trends, and calculated episodes.
4. **Hypotheses and interpretations** — possible explanations, associations, questions, and AI-generated proposals.
5. **Causal or decision evidence** — results produced under an explicit protocol and bounded analysis.
6. **Actions and choices** — what the person chooses to do, decline, stop, repeat, or discuss.

No derived layer may silently overwrite the layer beneath it. A summary cannot replace a source. A score cannot replace its item responses. A model interpretation cannot become Chronicle truth. A later analysis cannot erase the question or assumptions that governed the original analysis.

## Personal value comes first

Longitudinal Intelligence must first return value to the person whose Chronicle supports it.

Research value, public benefit, commercial value, product engagement, model improvement, sponsor interests, and institutional relationships remain subordinate.

A measurement or experiment is not justified merely because it creates useful data. Its burden and opportunity cost must be justified by expected personal value.

The person must remain able to:

- use the Chronicle without experimenting;
- decline a proposed question;
- act provisionally without accepting a causal conclusion;
- decline an intervention;
- decline randomization;
- stop participation;
- correct the record;
- export information;
- request deletion where possible; and
- return without punishment or reduced core access.

## AI proposes; people and deterministic domains authorize

AI may suggest questions, identify possible inconsistencies, summarize source-linked material, propose candidate outcomes, explain methods, generate draft protocols, surface uncertainty, and compare bounded alternatives.

AI may not independently:

- create canonical Chronicle truth;
- decide which memory or source is authoritative;
- grant permission;
- confirm its own proposal;
- select a person’s authentic preference;
- decide that missingness is harmless;
- choose an outcome or estimand after viewing results;
- approve an experiment;
- declare clinical significance; or
- direct consequential health action.

The permanent transaction boundary remains:

> AI proposes. The player confirms. Deterministic domain services validate and store.

## Provenance is part of meaning

Every material result must retain the information necessary to understand, challenge, reproduce, correct, and export it.

Material provenance may include:

- source identity and version;
- observation and recording time;
- temporal unit;
- outcome definition;
- instrument and item set;
- recall period;
- scoring engine and revision;
- calibration or reference population;
- language and assistance mode;
- missingness and exclusion rules;
- protocol and randomization version;
- treatment order;
- effect estimate and uncertainty;
- assumptions and sensitivity analyses;
- model or provider version;
- player confirmation;
- correction and supersession history; and
- the exact authority granted to the result.

A score without identity is not a stable longitudinal fact. A conclusion without its assumptions is not a trustworthy decision object.

## Measurement is an authority-bearing subsystem

A measure is not a neutral input field.

Every qualified measure must define:

- the construct being measured;
- exact instrument and version;
- intended population and context;
- item set and recall period;
- temporal unit;
- permitted assistance;
- scoring and calibration;
- measurement uncertainty;
- floor and ceiling behavior;
- known response-shift risks;
- rights, licensing, and continuity;
- provider replacement;
- export and historical replay; and
- changes that invalidate direct comparison.

A weekly measure does not become a daily measure because it is administered daily. Two scores with the same label are not comparable merely because their numbers look alike. A scorer revision creates a successor calculation and must not silently replace history.

## Temporal identity is canonical

Every longitudinal claim must identify the period it describes.

The architecture must distinguish calendar days, waking episodes, sleep episodes, intervention periods, control periods, source protocol periods, confirmation periods, information cutoffs, historical effects, current local effects, requested future horizons, and expiry events.

The following are separate claims:

- benefit across the observed history;
- benefit during the most recent period;
- benefit during a confirmation tail;
- benefit during the next episode;
- benefit during the next seven episodes; and
- indefinite continuing benefit.

No statistical method, model, interface, or copy may silently convert one into another.

## Historical validity, current relevance, and current applicability are independent

A past personal result may remain valid for its source period while losing authority over a current decision.

Every attempted reuse must answer three separate questions:

1. **Historical validity** — Was the source result valid for the original protocol?
2. **Current personal relevance** — Does the original outcome still represent what matters to the person?
3. **Current applicability** — Are the source effect and assumptions transportable to the present context?

Permitted states include historically valid and currently applicable, historically valid but no longer personally relevant, historically valid but currently unconfirmed, current context incompatible, current applicability unknown, and successor evidence required.

Elapsed time alone cannot determine applicability. Measured context similarity cannot prove that every important effect modifier remains unchanged.

## Outcome authority must be established before results

Every causal protocol must distinguish:

- one player-confirmed primary outcome;
- supportive outcomes;
- harm sentinels;
- burden outcomes; and
- descriptive outcomes.

Ordinary benefit authority belongs to the primary outcome established before intervention results exist.

A favorable secondary outcome may not rescue an unresolved, harmed, personally irrelevant, or measurement-invalid primary outcome. Harm sentinels may create mixed, hold, or stop states even when the primary appears favorable.

Multiplicity control may reduce statistical selection. It does not establish that the selected outcome represents personal value.

## Preference uncertainty is a legitimate state

A person’s expressed values may be clearly separated, approximately tied, incomplete, method-sensitive, frame-sensitive, temporally unstable, inaccessible through the current interface, or explicitly revised.

The system may not infer an authentic preference from clicks, adherence, completion time, conversational style, device use, or other behavioral telemetry.

Cross-method or repeated agreement may increase confidence but cannot create authority by itself. Disagreement must not automatically become no-use, experimentation, incapacity, or AI adjudication.

The correct result may be:

> No option robustly dominates under the currently expressed values.

The person may still choose directly.

## Uncertainty is a valid product result

Longitudinal Intelligence must be able to return:

- inconclusive;
- mixed;
- assumption-dependent;
- measurement-invalid;
- observation-invalid;
- benefit unresolved;
- harm unresolved;
- benefit through the current information time;
- future effect unknown;
- historically valid but currently stale;
- current relevance changed;
- current applicability unknown;
- approximately tied;
- preference-sensitive; or
- direct person choice without causal escalation.

A system that always returns a clean answer is overclaiming.

## Experimentation is optional and consequence-scaled

Personal experiments are not the default form of Chronicle use.

For separately reviewed low-consequence choices, a person may act provisionally, not act, defer, record a descriptive experience, or choose a bounded experiment.

The evidence and review burden rise with the consequence of error. A low-risk reminder, optional behavioral prompt, medication change, clinical treatment, and research intervention cannot share one authority ladder.

Diagnosis, treatment, medication management, emergency response, and care-plan authority remain outside ordinary Longitudinal Intelligence unless separately established through appropriate clinical, legal, professional, and institutional governance.

## Confirmation changes the decision

A randomized confirmation procedure is itself an intervention policy.

It determines when the candidate action is delivered, when it is withheld, what uncertainty the person experiences, how long the decision is delayed, how much burden is imposed, and what happens after an unresolved result.

Its value must account for:

- benefit delivered;
- benefit withheld;
- harm exposure;
- delay;
- measurement burden;
- refusal;
- partial observations;
- probability of no answer; and
- the value the person places on reducing uncertainty.

More evidence is not automatically more valuable. A statistically calibrated experiment may be personally dominated by acting provisionally or doing nothing.

## Refusal is both a right and an inferential event

A person may stop or decline without penalty and without providing a reason.

Refusal may also affect what can be inferred. The system must distinguish participant refusal, burden stop, suspected adverse stop, technical failure, accessibility failure, missing observation, incomplete treatment period, incomplete control period, statistical stopping, and administrative expiry.

Refusal does not automatically prove harm. It also cannot be treated as ordinary random missingness. Potentially treatment-related incompleteness must limit benefit authority and remain visible.

## Stability and future authority require separate evidence

A valid conclusion at an early stopping time does not establish that an effect will persist.

The system must distinguish benefit so far, stable benefit across a declared observed horizon, no detected change, drift concern, reversal concern, and future effect unknown.

No change alarm is not proof of stability. A favorable historical average is not the current local effect. A confirmation tail supports only the interval it actually evaluates.

Every future-authority claim must state:

- the last supporting observation;
- the requested future interval;
- how much of that interval is already observed;
- assumptions connecting observed and future periods; and
- the event or time that expires authority.

## Provider and model independence are permanent

No provider, model, scoring service, EHR, connector, research institution, sponsor, or proprietary format may become canonical personal authority.

The architecture must preserve source data and versions, deterministic records, provider-independent exports, replaceable adapters, visible uncertainty, migration and teardown, replay, manual or degraded operation, and the ability to continue the personal core when an external dependency fails.

Provider failure may reduce convenience. It may not destroy the Chronicle or invalidate the person’s rights.

## Corrigibility requires append-only authority history

Corrections, preference revisions, scorer changes, protocol changes, and new evidence create successor records.

They do not silently overwrite the original observation, original question, original preference, original analysis, or a result that was valid under the earlier state.

A later result may contradict an earlier result while both remain valid for their respective contexts. The architecture must preserve what was believed, what evidence existed, which authority was granted, why it changed, and which current state supersedes it.

## Governance must resist favorable-result capture

Product, sponsor, provider, research, fundraising, and engagement incentives may not determine the preferred outcome, prior, utility weights, stopping rule, model, scoring revision, experiment length, missingness assumptions, interpretation, applicability state, or whether an inconclusive result is visible.

Every funded or organizational relationship remains subject to ordinary issue, review, evidence, conflict, replacement, correction, termination, and publication rules.

## Claim and authority ladder

| Level                                            | Permitted result                                               | Required evidence                                                   | Prohibited escalation                                             |
| ------------------------------------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **LI-C0 — Chronicle fact**                       | Person-confirmed observation or sourced record                 | Provenance, correction, lifecycle, authority validation             | No inference or causality                                         |
| **LI-C1 — Descriptive pattern**                  | Change, frequency, co-occurrence, missingness, contradiction   | Reproducible calculations and complete limitations                  | No causal language                                                |
| **LI-C2 — Hypothesis**                           | Possible explanation or question                               | Source-linked reasoning, alternatives, explicit uncertainty         | No optimized action                                               |
| **LI-C3 — Provisional personal choice**          | Person selects a reviewed low-consequence option               | Consequence review, explanation, player confirmation                | No causal or efficacy claim                                       |
| **LI-C4 — Qualified personal experiment result** | Bounded result for one protocol, outcome, context, and horizon | Qualified measurement, protocol, missingness, burden, and analysis  | No indefinite or clinical authority                               |
| **LI-C5 — Current bounded decision support**     | Result may inform a present low-consequence decision           | Current relevance, applicability, consequence, and expiry checks    | No general “works for you” claim                                  |
| **LI-C6 — Clinical or research authority**       | Regulated or professionally governed action                    | Separate clinical, legal, research, and institutional authorization | Cannot arise from product analytics or self-experimentation alone |

Every result must display its claim level. Aster presentation cannot raise it.

## Minimum architecture before production capability

The architecture must define:

1. Chronicle provenance and revision ledger;
2. measurement and scorer registry;
3. temporal identity and waking-episode model;
4. outcome-authority contract;
5. protocol-family registry;
6. observation, missingness, and intercurrent-event ledger;
7. carryover, treatment-order, and partial-period representation;
8. source-to-target applicability receipt;
9. preference and value-envelope provenance;
10. claim-horizon and evidence-consumption receipt;
11. consequence and authority ladder;
12. deterministic claim validator;
13. provider-independent analysis and replay package;
14. personal decision-value and burden ledger;
15. correction, supersession, expiry, and anti-resurrection controls;
16. human-readable result explanations; and
17. machine-readable evidence packets.

No model output may substitute for these components.

## Current product boundary

This doctrine does not authorize:

- production private Chronicles;
- real health or voice capture;
- production House of Keys;
- production Aster;
- a model or provider selection;
- personal experimentation;
- causal health conclusions;
- diagnosis, treatment, medication, triage, or emergency response;
- research enrollment;
- analytics over private health data;
- or clinical decision support.

The accepted public synthetic prologue remains non-authoritative. Future validation stages remain inactive until their explicit entry gates are satisfied.

## Change control

This doctrine is a BASELINE architecture record. It may evolve through ordinary issue, review, evidence, and acceptance processes, but no amendment may silently weaken the protected invariants or expand product authority.

Changes that affect personal rights, private-data boundaries, AI authority, provider independence, causal claims, clinical boundaries, or experimentation authority require explicit cross-contract reconciliation and founding-steward acceptance at minimum, plus independent specialist review where the consequence warrants it.
