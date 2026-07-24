# Sprint 2 Completion Record

**Status:** BASELINE complete and merged  
**Pull request:** #9  
**Squash commit:** `3cdcc6fc7fe6a500ce57c00530109c2e976c9e70`

## Purpose

This record closes the architecture, vocabulary, ontology, schema, example-content, governance, and minimum viable validation work planned for Sprint 2.

Sprint 2 did not implement a production runtime. It established the content and incentive contracts that later implementation must preserve.

## Core objective preserved

The completed baseline keeps Calypso’s Promise centered on three connected loops:

1. Build the Living Chronicle.
2. Improve health and understanding.
3. Control and optionally share in created value.

The first two loops remain worthwhile without requiring the third.

The baseline protects:

- personal value before secondary use
- Vitality, Chronicle, Fellowship, Renown, and non-cash Laurels
- deterministic eligibility, completion, rewards, and unlocks
- meaningful decline, deferral, refusal, and exit
- non-punitive return through the Broken Lantern principle
- optional Fellowship participation
- separation of compensation from game rewards
- no reward for broader consent
- no reward for unnecessary intimate disclosure

## Deliverables completed

### Vocabulary and ontology

- controlled vocabulary across public, in-world, technical, and governance contexts
- evidence-language and capability-status rules
- retired-terminology warehouse
- content ontology for character, zone, scene, dialogue, quest, lesson, and notification records

### Content contract

- authoritative pre-stable schema version `0.1.0`
- strict dotted namespaced identifiers
- kebab-case slugs
- common metadata and truthful authorship provenance
- explicit review requirements and named review approvals
- separation of source review, capability status, publication, retirement, replacement, recall, and rollback
- TypeScript record contracts
- one reusable record-level validator used by the authoritative repository content gate
- repository-wide duplicate and direct-reference validation
- JSON Schema draft 2020-12 authoring export

### Incentive and agency contract

- connected-loop and player-value declarations for quests
- allowlisted structured requirement types
- deterministic completion rules and requirement references
- approved reward-type and reward-shape validation
- explicit progress dimensions
- no cash or compensation quest reward
- permission review without rewarded permission granting
- scene choice dispositions for continue, defer, refuse, and exit
- required target for continue choices
- shame-free notification requirements

### Canonical examples

Sprint 2 includes one canonical example for every supported content kind:

- character — Aster
- zone — Lantern Shore
- scene — Lantern Shore arrival
- dialogue — Aster’s first-light dialogue
- quest — The First Reflection
- lesson — The Open Hand
- notification — The Lantern Is Still Here

The examples remain in `specialist-review`. No absent specialist approval is represented as complete. Material AI assistance is recorded with a responsible human contributor and the assisting tool.

### Governance and contributor experience

- content review and approval roles
- minimum review-domain matrix
- semantic and safety-critical change classification
- supersession and replacement rules
- publication, recall, and rollback baseline
- AI-assisted content boundaries
- minimum viable validation policy
- separate CI checks so formatting cannot conceal substantive failures
- contributor-facing formatting-fix artifact
- truthful transitional DCO certification with final squash-commit sign-off

## Reconciliation decisions

The following conflicts were resolved:

| Conflicting form                        | Sprint 2 baseline                                                  |
| --------------------------------------- | ------------------------------------------------------------------ |
| `1.0.0` versus `0.1.0`                  | `0.1.0` pre-stable schema                                          |
| `version` versus `revision`             | `revision`                                                         |
| generic `status`                        | `reviewState` plus separate `capabilityStatus`                     |
| `canonRefs` versus `canonReferences`    | `canonReferences`                                                  |
| kebab-only record IDs versus dotted IDs | dotted namespaced IDs; kebab-case slugs                            |
| implied reviewers                       | review requirements plus named approval records                    |
| boolean refusal marker                  | continue, defer, refuse, or exit disposition                       |
| partial quest reward model              | deterministic incentive contract and allowlisted rewards           |
| publication mixed with review           | publication belongs to a release manifest, not source review state |

The detailed record is maintained in `docs/product/content-schema-migration-map.md`.

## Maintainer review remediation

The first formal maintainer review identified three merge blockers:

1. the repository content gate enforced less than the declared reusable contract;
2. identifier validation allowed bare, non-namespaced values;
3. the transitional DCO check verified an inaccurate per-commit claim.

The remediation:

- made `pnpm content:check` build and invoke the reusable TypeScript validator before repository-wide reference checks;
- validated connected loops, progress dimensions, requirement types, completion references, review evidence, reward types, reward shapes, scene agency, and authorship provenance;
- required at least one dot in content, state, action, purpose, requirement, and reward-target identifiers in both the validator and JSON Schema;
- replaced the inaccurate checkbox with a truthful pull-request-level DCO certification and required a `Signed-off-by` trailer on the squash-merge commit;
- added regression tests for every blocker and adjacent incentive invariants.

## Validation and merge evidence

The final reviewed pull-request head was:

```text
90175dae35fdf2bab0c57c3642f21d8d8eb46a5d
```

GitHub Actions evidence:

- CI run `30113496204`, run number `108`: success
- ready-for-review DCO Attestation run `30113628370`, run number `96`: success

The CI run reported success for:

- formatting
- repository policy
- content validation
- lint
- typecheck
- tests

PR #9 was squash merged into `main` as:

```text
3cdcc6fc7fe6a500ce57c00530109c2e976c9e70
```

The squash commit retained the required DCO sign-off trailer.

## Post-merge institutional integration

PR #10 subsequently added progressive decentralization and founder independence as frozen institutional and architectural constraints.

That mandate reinforces rather than replaces Sprint 2. Decision 0003 explicitly protects the deterministic incentive model, meaningful refusal, non-punitive return, and personal-value-first sequence from ordinary governance dilution.

Future governance therefore may not:

- weaken Sprint 2 incentive or refusal boundaries through ordinary policy
- turn broader consent or intimate disclosure into progression or governance power
- allow capital, contribution volume, or popularity to bypass player rights
- use token, blockchain, or DAO mechanisms as substitutes for personal utility and accountable execution

Material changes to those boundaries require constitutional review, an accepted decision record, and supporting evidence.

## Publication gates still open

Sprint completion and merge do not imply content publication approval.

The following remain open for affected records:

- named editorial review where required
- named canon review where required
- qualified privacy, safety, accessibility, clinical, security, research-governance, or economic-claims review where required
- inclusion in a future identified immutable content release

Until qualified reviewers exist, affected records remain in review rather than implying approval.

## Explicitly deferred

Sprint 2 does not establish:

- a completed Calypso Engine
- committed microservice or service boundaries
- a Story Studio implementation commitment
- runtime persistence or event sourcing
- production publication infrastructure
- release-manifest implementation
- content-pack distribution
- localization release coordination
- provider selection
- production health-data flows
- research integrations
- stable `1.0.0` migration guarantees

Calypso Engine, graph, and Story Studio implementation details remain proposals.

## Next planning boundary

The next design-to-build sprint may define the canonical Living Chronicle data model, including identity, observation, interval, variable, unit, provenance, approximate-time, correction, conflict, supersession, deletion, and synthetic-fixture contracts.

That work must remain separate from story and progression state and must not introduce production data flows before its own review gates are established.

It must also preserve the PR #10 institutional constraints by favoring portable records, replaceable infrastructure boundaries, public decision memory, and designs that do not make permanent founder or vendor control necessary.

## Closure evidence

Sprint 2 is complete because:

- the completion record is committed
- final CI and DCO passed on the reviewed pull-request head
- the pull-request description matched the final diff
- the formal maintainer-review blockers were remediated
- no unresolved contradiction with frozen foundations remained
- the pull request was marked ready and squash merged with a DCO sign-off

Content publication and later implementation remain separate gated decisions.
