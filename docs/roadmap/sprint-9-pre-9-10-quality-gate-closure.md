# Sprint 9 Pre-9.10 Quality-Gate Closure

[Historical blocking review](sprint-9-pre-9-10-quality-review.md) · [Sprint 9 execution plan](sprint-9-execution-plan.md) · [Cross-contract reconciliation](../architecture/public-synthetic-prologue-sprint-9-cross-contract-reconciliation.md) · [Control and evidence map](../architecture/public-synthetic-prologue-sprint-9-control-and-evidence-map.md) · [Holdpoints and unresolved work](../architecture/public-synthetic-prologue-sprint-9-specialist-holdpoint-and-unresolved-work-register.md) · [Completion record](sprint-9-completion-record.md)

- **Status:** SATISFIED FOR 9.10 ASSEMBLY — historical findings reconciled at their named evidence levels
- **Historical review date:** July 29, 2026
- **Closure date:** August 4, 2026
- **Accepted 9.9 baseline:** `3d7c02f303e052c07fb023ff39673a15c1d62349` — CI 1286 / DCO 1371
- **Scope:** disposition of the sixteen blocking and material findings that prevented 9.10 from beginning
- **Boundary:** this closure authorizes the final completion package only; it does not authorize acceptance, squash merge, public linking, indexing, production deployment, Phase 0 exit, or closure of specialist holdpoints

## Decision

The historical [Pre-9.10 Quality and Coherence Review](sprint-9-pre-9-10-quality-review.md) remains an accurate record of what was true when it was written. Its instruction not to begin 9.10 applied until 9.7–9.9, measurement, stable-source, release, rollback, and tracking requirements were satisfied.

Those prerequisites are now satisfied at the bounded maintainer-evidence level:

- 9.7 is accepted at `a3ac15f32ca098a2955c14bf815af60cccfd56d6` — CI 1257 / DCO 1339;
- 9.8 is accepted at `b1fdba193e1ebaa8096695192ddd5f6965255529` — CI 1280 / DCO 1365;
- 9.9 is accepted through restored-control baseline `0ac02609dc18ab7ff1f2b4f55ba058b6536f505c` — CI 1284 / DCO 1369;
- canonical 9.9 reconciliation is accepted at `3d7c02f303e052c07fb023ff39673a15c1d62349` — CI 1286 / DCO 1371;
- the protected preview is bound to `66979c71732f0bc343000fe143485d06e0bc7fec` and `dpl_DwkovAeCrLjWq2brifBxYXu2UJ7M`;
- Git-triggered Vercel deployment remains disabled for every branch; and
- production remains `dpl_5TMd8mtFNBRsT4sq5dMU85kg6dVp` from `1b25a2e64ff272927c65afa5e1f16aedc5e448d7`.

Workstream 9.10 may therefore assemble the final cross-contract reconciliation, control map, holdpoint register, completion record, and Sprint 10 handoff.

## Finding dispositions

### `QG-01` — Repository truth mismatch

**Disposition:** Closed. Issue #67, PR #68, current status, execution plan, roadmap index, and workstream records now distinguish accepted 9.1–9.9 evidence from unaccepted Sprint 9 completion.

### `QG-02` — Non-functional discard control

**Disposition:** Closed. Deterministic tests and rendered control coverage exercise functional discard and dependent-state clearing.

### `QG-03` — Unreachable duplicate confirmation UI

**Disposition:** Closed. One confirmed-state owner remains and source tests cannot pass against the removed branch.

### `QG-04` — Source-string confidence without interaction evidence

**Disposition:** Closed at maintainer level. Pure state tests and dependency-free rendered click/native-keyboard journeys exercise representative flows and all visible controls; independent AT and affected-user evidence remains open.

### `QG-05` — Stale House of Keys provenance link

**Disposition:** Closed. Canonical sources use stable or commit-pinned links rather than brittle line anchors.

### `QG-06` — Receipt cited an opposite accepted fixture

**Disposition:** Closed. The receipt-shaped explanation represents not-evaluated/no-grant/no-release state and claims no accepted receipt fixture.

### `QG-07` — Chronicle projection lacked accepted vocabulary

**Disposition:** Closed. The temporary projection maps selected accepted Chronicle envelope concepts and remains synthetic, unstored, and non-authoritative.

### `QG-08` — First Lantern evidence under-specified

**Disposition:** Closed. The quest exposes the complete inspectable evidence set and rendered journeys exercise it.

### `QG-09` — First Lantern lacked frozen quest anatomy

**Disposition:** Closed. The bounded quest definition records player value, zone, guide, time, accessibility, data categories, purpose, safety, feedback, reward, narrative consequence, refusal, analytics hypothesis, and review state.

### `QG-10` — First Lantern could be confused with durable canon progression

**Disposition:** Closed. Copy and tests deny reward, rank, canonical zone unlock, Fourteen Lantern progression, account, permission, or durable state.

### `QG-11` — Reversal retained hidden completion

**Disposition:** Closed. Return and dependent-state invalidation clear First Lantern completion until the rule is run again.

### `QG-12` — Progress semantics were visual only

**Disposition:** Closed. Progress is an ordered list with exactly one `aria-current="step"` item.

### `QG-13` — Performance ceilings changed without evidence

**Disposition:** Closed. The playable route is measured against the accepted Sprint 8 route ceilings and no larger Sprint 9 budget is claimed.

### `QG-14` — Under-ten-minute completion not evidenced

**Disposition:** Closed at modeled-maintainer level. Direct paths measure 8.45 and 9.11 minutes; optional exploration is measured separately. Real-user and affected-user timing remains open.

### `QG-15` — Focus and announcement language lacked precision

**Disposition:** Closed. Records distinguish scene-change heading focus from in-scene polite announcements, and rendered evidence exercises both.

### `QG-16` — Branch source links were not stable

**Disposition:** Closed. The public boundary link is commit pinned and 9.9 records exact preview/source provenance.

## Remaining limitations

Closing a quality finding means the original implementation or evidence defect is corrected at the named level. It does not convert maintainer evidence into:

- independent accessibility or security review;
- named screen-reader or assistive-technology validation;
- affected-user or cognitive-accessibility research;
- browser, device, zoom, reflow, touch, or platform coverage;
- real-user completion time or field performance;
- production monitoring, incident response, or rollback exercise;
- legal, privacy, communications, clinical, provider, funding, or institutional approval; or
- production identity, private Chronicle, House of Keys, Aster, analytics, connector, payment, or health-data operation.

Those items remain open in the Sprint 9 holdpoint register.

## Gate conclusion

The pre-9.10 quality gate is satisfied for final package assembly.

Sprint 9 remains unaccepted and unmerged until the 9.10 package passes its exact-head aggregate, the founding steward explicitly accepts the sprint, and the directed squash merge succeeds.
