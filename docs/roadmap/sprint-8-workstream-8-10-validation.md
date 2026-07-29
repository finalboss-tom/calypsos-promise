# Sprint 8.10 Final Validation — Completion Readiness

[Current status](current-status.md) · [Sprint 8 completion record](sprint-8-completion-record.md) · [Execution plan](sprint-8-execution-plan.md) · [Release, rollback, and Sprint 9 handoff](sprint-8-release-rollback-and-sprint-9-handoff.md) · [Cross-contract reconciliation](../architecture/public-site-sprint-8-cross-contract-reconciliation.md) · [Control and evidence map](../architecture/public-site-sprint-8-control-and-evidence-map.md) · [Holdpoints and unresolved work](../architecture/public-site-sprint-8-specialist-holdpoint-and-unresolved-work-register.md)

- **Status:** FINAL CANDIDATE UNDER EXACT-HEAD VALIDATION — implementation package ready for founding-steward acceptance if the permanent suite passes
- **Tracking issue:** [#60](https://github.com/finalboss-tom/calypsos-promise/issues/60) — remains open
- **Draft pull request:** [#61](https://github.com/finalboss-tom/calypsos-promise/pull/61) — remains draft and unmerged
- **Entry baseline:** `9da8034220954a1ca50420e71fd94e7795232a35`
- **Pre-marker reconciled head:** `c4f966039c5f9c8378969d319ff767e692918d77`
- **Email-signup Phase 0 gate:** [#63](https://github.com/finalboss-tom/calypsos-promise/issues/63) — remains open

## Candidate contents

The candidate includes:

- the complete workstream 8.1–8.10 public website implementation package;
- one cross-contract reconciliation;
- thirty-six stable controls with evidence levels and revalidation triggers;
- twenty open holdpoints;
- twenty unresolved-work records;
- truthful release, deployment, rollback, and official-release separation;
- a completion record ready for explicit founding-steward acceptance;
- a bounded Sprint 9 public synthetic prologue handoff;
- permanent source and isolated local production-preview validation;
- canonically formatted high-traffic repository indexes and status records; and
- tests that prevent Sprint 8 readiness from being represented as acceptance, deployment, Phase 0 completion, or Sprint 9 activation.

## Required final checks

The exact candidate must pass:

1. formatting;
2. documentation links;
3. repository policy;
4. economics validation;
5. content validation;
6. lint and permanent source validation;
7. typecheck;
8. tests; and
9. `site-release-validation`, including production build, isolated local server, route and supporting-surface checks, evidence artifact generation, generated-state cleanup, and no tracked mutation.

The same exact candidate must pass DCO Attestation.

## Release and authority boundary

A passing candidate proves only the bounded repository implementation, deterministic validation, isolated local-production-preview, measured-transfer, and founding-steward representative-review evidence recorded by Sprint 8.

It does not:

- accept or merge Sprint 8;
- close issue #60;
- mark PR #61 ready;
- deploy or officially release the website;
- activate email signup or close issue #63;
- establish independent accessibility, security, privacy, clinical, legal, financial, provider, interoperability, or production-readiness certification;
- complete institutional Phase 0; or
- start Sprint 9.

## Post-validation action

If the exact-head CI and DCO runs pass, update issue #60, draft PR #61, and roadmap issue #2 with the immutable candidate SHA and run numbers. Keep issue #60 open and PR #61 draft and unmerged pending explicit founding-steward acceptance and squash-merge direction.
