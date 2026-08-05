# Longitudinal Intelligence LI-V0 Protected-Invariant Traceability

**Status:** READY FOR FOUNDING-STEWARD ACCEPTANCE  
**Stage:** LI-V0 — doctrine and evidence-kernel consolidation  
**Tracking:** [Issue #73](https://github.com/finalboss-tom/calypsos-promise/issues/73)  
**Governing doctrine:** [Longitudinal Intelligence Doctrine](longitudinal-intelligence-doctrine.md)  
**Machine-readable contract:** [Evidence Kernel v1](longitudinal-intelligence-evidence-kernel.v1.schema.json)

[Architecture documentation](README.md) · [Validation plan](../roadmap/longitudinal-intelligence-validation-plan.md) · [LI-V0 completion](../roadmap/longitudinal-intelligence-li-v0-completion-record.md) · [Pre-Sprint 10 alignment](../roadmap/pre-sprint-10-alignment-review.md)

## Purpose

This record traces the protected Calypso’s Promise invariants into Longitudinal Intelligence doctrine, machine-readable evidence requirements, validation-stage controls, and Sprint 10 inheritance.

It is an architecture traceability record. It does not establish measurement validity, personal causal inference, private-data readiness, clinical authority, or production Longitudinal Intelligence.

## Traceability map

| ID        | Protected invariant           | Longitudinal Intelligence requirement                                                                                    | Evidence-kernel representation                                        | Sprint 10 inheritance                                                                                                | Revalidation trigger                                                        |
| --------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| LI-TR-001 | Personal value first          | Measurement, analysis, and experimentation must justify burden and opportunity cost relative to nonexperimental choices. | `authority`, `result`, `preferences`, and holdpoints                  | The shell may present value and burden states but cannot select an action or experiment.                             | Any new experiment, engagement incentive, or value model                    |
| LI-TR-002 | Private health and life data  | Public contributor workflows remain public or synthetic; private processing requires separate authority.                 | `information_class`, `synthetic`, `subject_scope`                     | Sprint 10 uses public or explicitly synthetic content and state only.                                                | Any private input, account, persistence, telemetry, or provider proposal    |
| LI-TR-003 | Purpose-specific permission   | An evidence packet cannot create permission or expand an existing purpose.                                               | `authority.prohibited_claims`, sources, reviews, holdpoints           | The client cannot infer consent or transfer temporary prologue state into an account.                                | Authentication, synchronization, connector, or sharing work                 |
| LI-TR-004 | Meaningful refusal            | Refusal remains available without punishment and remains distinct from missingness or technical failure.                 | `rights.meaningful_refusal`, protocol refusal rule, result states     | Exit and refusal paths remain complete across platforms and never reduce core access.                                | Any flow that makes completion, account creation, or data entry mandatory   |
| LI-TR-005 | Correction and supersession   | New evidence creates successor records rather than silently rewriting history.                                           | sources, revision, `supersedes`, `superseded_by`, `rights.correction` | Local state cannot overwrite authoritative history; corrected and conflicting states remain explicit.                | State migration, synchronization, scorer, content, or schema revision       |
| LI-TR-006 | Deletion                      | Deletion behavior must be explicit, verifiable, and bounded by the actual storage and provider path.                     | `rights.deletion`, holdpoints, revalidation triggers                  | Sprint 10 introduces no private store; temporary state must have clear clearing behavior.                            | Any persistence, account, backup, provider, cache, or export implementation |
| LI-TR-007 | Usable export                 | Personal records and accepted evidence remain portable and replayable.                                                   | `rights.export`, sources, repository and schema revisions             | Sprint 10 choices must not block future provider-independent export and evidence replay.                             | New proprietary state, platform-only feature, or provider format            |
| LI-TR-008 | Explicit player confirmation  | AI, client state, and statistical output cannot confirm themselves.                                                      | `authority.player_confirmation_required`, preferences, reviews        | Client actions remain presentation events unless separately validated and confirmed.                                 | Any automated action, inference, progression, or account-state transfer     |
| LI-TR-009 | Deterministic authority       | Canonical changes require deterministic domain validation rather than model or client trust.                             | `authority.ai_authority`, claim level, result state                   | No gameplay rule, reward, permission, Chronicle fact, or LI claim depends on client-side trust.                      | New local authority, optimistic completion, device-time rule, or model tool |
| LI-TR-010 | AI is advisory                | AI may propose and explain but cannot create truth, permission, preferences, causality, or clinical action.              | `authority.ai_authority: advisory-only`                               | Aster or another model is optional presentation and cannot become a required path.                                   | Model, memory, retrieval, agent, or provider integration                    |
| LI-TR-011 | Provider independence         | Models, scorers, storage, analytics, and infrastructure remain replaceable adapters.                                     | `authority.provider_independent`, sources, rights, holdpoints         | Sprint 10 avoids a production provider dependency and records tool replacement behavior.                             | Provider selection, credit, sponsorship, egress, or proprietary format      |
| LI-TR-012 | Accessible participation      | Accessibility failure is an implementation state, not refusal, preference, or incapacity.                                | reviews, result states, holdpoints                                    | Keyboard, screen-reader, touch, switch, scaling, reduced-motion, reduced-data, and low-bandwidth paths are required. | New platform, interaction, animation, input, language, or content mode      |
| LI-TR-013 | Non-punitive return           | Missed participation, refusal, deletion, or interruption cannot create shame or loss of essential value.                 | rights and permitted/prohibited claims                                | Offline interruption, restart, exit, and return remain visible and non-punitive.                                     | Progression, streak, reward, notification, or retention mechanic            |
| LI-TR-014 | Complete non-AI path          | Core behavior must remain complete when AI or a provider is unavailable.                                                 | `rights.non_ai_fallback`, provider exit                               | Direct navigation and deterministic manual presentation remain complete.                                             | AI-only interface, provider outage, model migration, or cost constraint     |
| LI-TR-015 | Provenance is part of meaning | Every material claim retains source, revision, time, method, assumption, and authority provenance.                       | sources, measurement, time scope, protocol, result                    | Shared content and client presentation retain stable IDs and source references without creating truth.               | Source, mapping, schema, content, scorer, or protocol change                |
| LI-TR-016 | Uncertainty is a result       | Inconclusive, mixed, invalid, ambiguous, stale, and unknown states remain first-class.                                   | `result.state`, assumptions, uncertainty, counterevidence             | Sprint 10 may implement truthful status primitives but cannot imply the underlying health capability exists.         | New status display, claim copy, confidence, recommendation, or fallback     |
| LI-TR-017 | Experimentation is optional   | Chronicle and gameplay value do not require randomization, measurement, or a protocol.                                   | protocol qualification, preferences, authority, holdpoints            | Sprint 10 contains no personal experiment activation or experimental default.                                        | Experiment framework, outcome capture, randomization, or recommendation     |
| LI-TR-018 | Consequence-scaled authority  | Stronger claims require stronger evidence, review, and explicit scope.                                                   | `validation_stage`, `claim_level`, reviews, holdpoints                | Sprint 10 remains architecture and presentation only; LI-V1 through LI-V8 remain inactive.                           | Any attempt to raise a claim level or validation stage                      |

## Required architecture distinctions

The following distinctions remain mandatory across future implementation:

1. source archive;
2. canonical Chronicle record;
3. derived measurement;
4. hypothesis or interpretation;
5. causal or decision evidence;
6. person choice or action;
7. historical validity;
8. current personal relevance;
9. current applicability;
10. observed interval;
11. current local effect;
12. requested future horizon;
13. statistical stopping;
14. person refusal;
15. burden or adverse stop;
16. technical loss;
17. complete and partial periods;
18. model proposal;
19. player confirmation; and
20. deterministic domain outcome.

No package, client, model, provider, deployment, experiment, or user-interface abstraction may collapse these identities merely to simplify presentation.

## LI-V0 conclusion

The accepted doctrine, staged validation plan, evidence-kernel schema, synthetic fixture, traceability map, holdpoint register, and Sprint 10 inheritance provide sufficient architecture evidence to close LI-V0 after explicit founding-steward acceptance.

LI-V0 acceptance does not activate LI-V1, qualify a measurement, authorize private data, permit a personal experiment, establish causal validity, close institutional Phase 0, or authorize clinical behavior.
