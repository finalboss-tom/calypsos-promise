# Sprint 10.5 — State and authority boundaries

**Status:** COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10  
**Parent:** Sprint 10 — universal game shell  
**Tracker:** issue #80  
**Implementation:** draft PR #79

## Decision

Establish a versioned, deterministic, public/synthetic session-state contract for `apps/game` and make the client authority ceiling executable.

The implementation extends the 10.4 renderer without adding persistence or production authority. It makes pending, failed, stale, corrected, superseded, conflict, deferred, refused, and discarded states explicit while denying every client claim to completion, reward, permission, Chronicle truth, personal progress, health results, authentic preference, or Longitudinal Intelligence.

There is no client-authoritative completion or rewards. Every client claim remains presentation evidence only and fails closed.

## Implemented boundary

1. `synthetic-session-state.mjs` owns the pure session-state machine at state version `0.1.0`.
2. State transitions use no clock, randomness, persistence, network, provider, analytics, hidden flags, or ambient state.
3. Every transition increments an inspectable revision while retaining the same immutable client authority ceiling.
4. Only `presented` and `corrected` allow temporary dialogue interaction.
5. `pending`, `failed`, `stale`, `superseded`, and `conflict` stop interaction authority while leaving essential content readable.
6. `deferred`, `refused`, and `discarded` are visible, non-punitive, clearable terminal states.
7. Correction records the prior temporary revision without converting it into authoritative history.
8. Supersession invalidates prior presentation evidence rather than preserving completion or reward claims.
9. Conflict fails closed and requires an explicit restart or correction path.
10. Unknown state events and unknown future authority claims fail closed.
11. The quest card derives presentation evidence from the session state and always reports completion, reward, restoration, unlock, and personal progress as false.
12. The State Authority Panel visibly demonstrates the bounded states and the complete client-authority deny list.

## Client authority ceiling

The client cannot grant or establish:

- scene completion;
- quest completion;
- rewards;
- restoration;
- unlocks;
- permission;
- Chronicle truth;
- personal or canonical progress;
- health results;
- authentic preferences; or
- Longitudinal Intelligence.

This ceiling applies equally to rendering, dialogue choices, quest cards, Wayfinder navigation, local flags, device time, optimistic UI, cached content, animation completion, offline state, model output, and future unknown client claims.

## State semantics

| State      | Temporary meaning                                     | Interaction | Authority |
| ---------- | ----------------------------------------------------- | ----------- | --------- |
| pending    | bundled presentation requested, not yet presented     | blocked     | none      |
| presented  | scene displayed in this React-memory session          | allowed     | none      |
| failed     | presentation failed closed                            | blocked     | none      |
| stale      | presentation evidence is no longer current            | blocked     | none      |
| corrected  | temporary presentation evidence was visibly corrected | allowed     | none      |
| superseded | prior evidence was replaced                           | blocked     | none      |
| conflict   | incompatible temporary presentation claims exist      | blocked     | none      |
| deferred   | player paused without penalty or inferred preference  | terminal    | none      |
| refused    | player refused while retaining essential information  | terminal    | none      |
| discarded  | temporary presentation state was cleared              | terminal    | none      |

## Executable evidence

The focused validator and tests execute the state machine and confirm that:

- all required states are present;
- all known and unknown authority claims are denied;
- correction, supersession, conflict, stale, failure, deferral, refusal, discard, and restart never expand authority;
- quest evidence never reports completion or reward;
- blocked states cannot continue temporary interaction;
- the renderer uses the state reducer rather than independent optimistic flags; and
- no persistence, time, randomness, provider, analytics, or ambient authority is introduced.

## Holdpoints preserved

Sprint 10.5 does not authorize:

- durable or canonical completion, rewards, restoration, unlocks, or personal progression;
- persistence or offline storage assigned to Sprint 10.6;
- production authentication or identity-provider selection assigned to later gates;
- private Chronicle operation, production House of Keys, production Aster/provider egress, analytics, profiling, or advertising;
- health conclusions, personal causal claims, authentic-preference inference, LI-V1 through LI-V8, clinical behavior, or research status;
- deployment, indexing, public navigation, mobile distribution, official release, Sprint 11, or institutional Phase 0 exit; or
- independent accessibility, security, privacy, legal, affected-user, field, or device certification.

## Validated checkpoint

Exact clean implementation checkpoint: `ff40e9840328151fc9b3d63623ab6e217dca8ad8`

- CI 1444: success
- DCO 1543: success
- frozen Node 24 / pnpm 10.13.1 installation: success
- exact implementation archive integrity and focused state-authority validation: success
- deterministic state-machine, authority-denial, quest-evidence, blocked-interaction, and unknown-claim tests: success
- formatting, documentation, repository policy, Longitudinal Intelligence coherence, content validation, economics, lint, typecheck, and tests: success
- existing production-site build and rendered prologue validation: success
- browser, iOS, and Android credential-free Expo export: success
- generated-state cleanup and no tracked build mutation: success
- temporary implementation tooling: removed before final checkpoint validation

This is maintainer implementation and CI evidence inside active Sprint 10. It is not independent accessibility, security, privacy, legal, affected-user, field, or device certification; persistence or private-data readiness; deployment or distribution authorization; authority to begin Sprint 11; activation of LI-V1 through LI-V8; or institutional Phase 0 exit.

## Sprint-level gate

This workstream is an internal Sprint 10 checkpoint in the single draft PR #79. It creates no separate founding-steward acceptance or merge gate. After exact validation is recorded, the next implementation step is Sprint 10.6 on the same branch and PR.
