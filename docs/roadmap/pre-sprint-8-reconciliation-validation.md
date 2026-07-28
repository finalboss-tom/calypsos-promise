# Pre-Sprint 8 Reconciliation Validation Record

[Current status](current-status.md) · [Accepted Pre-Sprint 8 review](pre-sprint-8-alignment-review.md) · [Sprint 8 plan](sprint-8-execution-plan.md) · [Website architecture](../architecture/public-website-foundation-and-migration.md) · [Sprint 7 completion](sprint-7-completion-record.md) · [Completed issue #58](https://github.com/finalboss-tom/calypsos-promise/issues/58) · [Merged PR #59](https://github.com/finalboss-tom/calypsos-promise/pull/59)

- **Status:** ACCEPTED AND MERGED
- **Reviewed baseline:** Sprint 7 squash commit `f28f054fe16d550fad37663cf234e06c5622dd42`
- **Validated candidate head:** `f6cbcd670fc957be3e0f2c1069e685a7f633f3ea`
- **Validation:** CI run 933 and DCO run 1009 passed
- **Squash commit:** `9da8034220954a1ca50420e71fd94e7795232a35`
- **Scope:** post-merge status truth, repository and module ownership, Track 0A inventory, Sprint 8 migration constraints, and validation only
- **Implementation boundary:** no Sprint 8 framework or product code was included

## Accepted result

The review found no contradiction requiring a new decision record or change to the Sprint 8 goal, deliverables, acceptance criteria, or sequence.

The material repository issues were status and implementation-boundary drift:

- canonical and high-traffic records still described Sprint 7 as active or unmerged;
- persistent roadmap issue #2 was frozen at early Sprint 7;
- module ownership records treated merged Aster or Forge work as future capability;
- the prepared Sprint 8 handoff did not yet bind the actual Track 0A routes, deployment-disabled state, cache behavior, security headers, signup limitations, cutover, or rollback requirements; and
- `apps/site` needed an explicit in-place migration contract before framework implementation.

Those issues were repaired and accepted through issue #58 and PR #59.

## Sprint 8 authorization

Sprint 8 remains the correct next numbered sprint:

> Publish an honest, accessible gateway to Ogygia.

Sprint 8 is now active through issue #60, branch `agent/sprint-8-public-website-foundation`, draft PR #61, and [Sprint 8 Execution Plan](sprint-8-execution-plan.md).

The implementation preserves `apps/site` as the single website owner and migrates Track 0A in place. It may not create a duplicate site, CMS, database, account system, private-data path, provider runtime, transaction surface, or Sprint 9 prologue.

## Bound migration controls

The accepted reconciliation requires:

- current public routes to be preserved, redirected, or deliberately retired;
- preview, official production cutover, status, rollback ownership, and rollback procedure to have evidence;
- the `git.deploymentEnabled: false` entry state not to change silently;
- immutable cache claims to require fingerprinted assets or correct mutable cache semantics;
- CSP and related security headers to survive or strengthen through migration;
- server-only secrets to remain outside client bundles and public build artifacts;
- signup to be preserved under explicit controls or deliberately disabled;
- current in-memory throttling not to be represented as distributed rate limiting;
- forwarded client-address headers to require an explicit proxy trust model;
- capability and funding views to remain validated derivatives of canonical repository records;
- runtime GitHub fetching and independent website ledgers to remain prohibited;
- metadata, sitemap, robots, not-found, error, accessibility, and performance contracts to be release criteria; and
- no production or private product capability to activate through public website code.

## Evidence limits

This reconciliation is an internal repository-consistency and implementation-readiness review.

It does not establish independent accessibility, security, privacy, clinical, legal, interoperability, operations, financial, AI-safety, performance, user-research, or production-readiness certification.

Every inherited production, specialist, institutional, signup, accessibility, deployment, release, and measurement holdpoint remains open.

## Historical validation

The accepted candidate passed:

- formatting;
- documentation links;
- repository policy;
- economics validation;
- content validation;
- lint;
- typecheck;
- tests; and
- DCO attestation.

The record is historical evidence. Active Sprint 8 validation belongs to issue #60 and PR #61.
