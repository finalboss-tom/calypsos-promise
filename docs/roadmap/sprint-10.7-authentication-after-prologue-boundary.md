# Sprint 10.7 — Authentication-after-prologue boundary

- **Status:** COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10
- **Parent:** Sprint 10 — universal game shell
- **Tracker:** issue #80
- **Implementation:** draft PR #79

## Decision

Implement the boundary and explanation for a possible future account after the public synthetic presentation. Do not implement production authentication.

The public experience remains completable without an account. The only account-related surface is informational, appears after the presentation route, selects no identity provider, creates no account or session, and transfers no public or synthetic state.

## Boundary behavior

- future account value is described without representing the capability as active;
- the default disposition for temporary or synthetic state is discard;
- no public presentation or offline state transfers silently;
- a future transfer candidate requires disclosure, review, player confirmation, provenance, purpose, correction, and deletion behavior;
- even a complete future review authorizes no transfer in Sprint 10; and
- account creation, recovery, session security, support, abuse, deletion operations, incidents, and production accessibility remain later work.

## Authority ceiling

Authentication cannot convert:

- dialogue choices;
- temporary presentation state;
- synthetic-session storage;
- prologue or First Lantern presentation;
- Aster framing;
- refusal, deferral, or exit;
- direct-path selection; or
- any unknown future client claim

into Chronicle evidence, permission, canonical progression, completion, rewards, personal progress, health truth, authentic preference, or Longitudinal Intelligence.

## Holdpoints preserved

Sprint 10.7 does not authorize a production identity provider, account database, credential, token, recovery flow, production session, private Chronicle, House of Keys execution, provider egress, analytics, deployment, indexing, store distribution, Sprint 11, LI-V1 through LI-V8, or institutional Phase 0 exit.

## Validation target

The exact implementation checkpoint must pass focused authentication-boundary tests, the complete permanent repository suite, existing production-site validation, browser/iOS/Android credential-free export, cleanup, and no tracked build mutation.

## Validated checkpoint

Exact clean implementation checkpoint: `c04161860eed4ab6ecf55d4c48c0f9a363a4e058`

- CI 1480: success
- DCO 1582: success
- focused authentication-boundary validation: success
- public no-account completion and post-presentation offer ordering: success
- discard-by-default, no-silent-transfer, and seven-requirement future-review tests: success
- known and unknown authentication-authority claims fail closed: success
- complete permanent repository suite: success
- existing production-site validation: success
- browser, iOS, and Android credential-free Expo export: success
- generated-state cleanup and no tracked build mutation: success
- temporary implementation and repair transport: removed before clean checkpoint validation

The prior 10.7 completion report had not landed durable implementation or status evidence. This checkpoint repairs that handoff explicitly. Sprint 10.7 and Sprint 10.8 share one atomic clean checkpoint because 10.7 was restored as the required predecessor before 10.8 was validated; no workstream sequence or authority gate was skipped.

This is maintainer source and CI evidence. It is not production authentication readiness, identity-provider selection, account-security qualification, independent accessibility, security, privacy, legal, affected-user, device, field, or operations certification.

## Sprint-level gate

This workstream is an internal Sprint 10 checkpoint in the single draft PR #79. It creates no separate founding-steward acceptance or merge gate. Sprint 10.8 is complete at the same repaired atomic checkpoint; the next implementation step is Sprint 10.9 on the same branch and PR.
