# Pre-Sprint 8 Reconciliation Validation Record

[Current status](current-status.md) · [Pre-Sprint 8 review](pre-sprint-8-alignment-review.md) · [Sprint 7 completion](sprint-7-completion-record.md) · [Roadmap index](README.md) · [Issue #58](https://github.com/finalboss-tom/calypsos-promise/issues/58) · [Draft PR #59](https://github.com/finalboss-tom/calypsos-promise/pull/59)

- **Status:** REVIEW CANDIDATE — founding-steward acceptance and squash merge remain open
- **Reviewed baseline:** `main` at Sprint 7 squash commit `f28f054fe16d550fad37663cf234e06c5622dd42`
- **Scope:** post-merge status truth, repository and module ownership, Website Track 0A inventory, Sprint 8 migration constraints, and validation only
- **Implementation boundary:** no Sprint 8 framework or product code is included

## Reconciliation result

The review found no contradiction requiring a new decision record or change to the accepted Sprint 8 goal, deliverables, acceptance criteria, or sequence.

The material repository issues were status and implementation-boundary drift:

- canonical and high-traffic records still described Sprint 7 as active or unmerged;
- persistent roadmap issue #2 was frozen at early Sprint 7;
- module ownership records treated merged Aster or Forge work as future capability;
- the prepared Sprint 8 handoff did not yet bind the actual Track 0A routes, deployment-disabled state, cache behavior, security headers, signup limitations, cutover, or rollback requirements; and
- `apps/site` needed an explicit in-place migration contract before framework implementation.

Those issues are repaired in the review candidate.

## Sprint 8 readiness conclusion

Sprint 8 remains the correct next numbered sprint:

> Publish an honest, accessible gateway to Ogygia.

After this reconciliation is accepted and squash merged, Sprint 8 may begin through its own issue, execution plan, branch, and draft pull request.

The implementation must preserve `apps/site` as the single website owner and migrate Website Track 0A in place. It must not create a duplicate site, CMS, database, account system, private-data path, provider runtime, transaction surface, or Sprint 9 prologue.

## Bound migration controls

The review candidate makes the following explicit before Sprint 8:

- current public routes must be preserved, redirected, or deliberately retired;
- preview, production cutover, official status, rollback ownership, and rollback procedure require evidence;
- the current `git.deploymentEnabled: false` state may not change silently;
- immutable cache claims require fingerprinted assets or correct mutable cache semantics;
- CSP and related security headers must survive or strengthen through migration;
- server-only secrets must remain outside client bundles and public build artifacts;
- signup must be preserved under equivalent or stronger controls or deliberately disabled;
- current in-memory throttling is not distributed rate limiting;
- forwarded client-address headers require an explicit proxy trust model;
- capability and funding views must remain validated derivatives of canonical repository records;
- runtime GitHub fetching and independent website ledgers are prohibited;
- metadata, sitemap, robots, not-found, error, accessibility, and performance contracts are release criteria; and
- no production or private product capability may be activated through public website code.

## Evidence limits

This reconciliation is an internal repository-consistency and implementation-readiness review.

It does not establish independent accessibility, security, privacy, clinical, legal, interoperability, operations, financial, AI-safety, performance, user-research, or production-readiness certification.

Every inherited production, specialist, institutional, signup, accessibility, deployment, release, and measurement holdpoint remains open.

## Validation rule

The accepted review candidate must pass:

- formatting;
- documentation links;
- repository policy;
- economics validation;
- content validation;
- lint;
- typecheck;
- tests; and
- DCO attestation.

Exact-head results are recorded in issue #58 and draft PR #59 after the standard suite completes.
