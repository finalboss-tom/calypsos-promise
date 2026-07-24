# Minimum Viable Validation Policy

**Status:** BASELINE

## Purpose

Minimum viable validation (MVV) is the smallest set of automated and human checks required to keep Calypso’s Promise safe, coherent, contributor-friendly, and aligned with its frozen foundations.

MVV is intentionally modest. It is not an attempt to prove every future property of the platform. It creates a dependable floor that a first-time open-source maintainer and new contributors can understand, run locally, and trust.

## Principles

- Validation must protect the project’s core objective, not merely repository style.
- Checks should be deterministic, fast, local, and credential-free where practical.
- A clean contributor environment must use only public or synthetic data.
- Automated checks enforce objective rules; human review handles context and judgment.
- Failed formatting should not conceal failures in policy, content, types, or tests.
- New checks should be added only when they prevent a concrete class of defect or constitutional drift.
- A check that routinely produces noise should be repaired or removed.

## Required local command

The repository must provide one documented command:

```bash
pnpm check
```

A contributor should not need to know the internal command graph to determine whether a change satisfies the baseline.

## MVV layers

### 1. Repository hygiene

Automated checks should reject:

- likely secrets and private keys
- committed environment files
- production health data or private exports
- unsupported generated artifacts
- malformed repository configuration

This layer protects contributors and the public repository from accidental sensitive material.

### 2. Reproducibility

The baseline requires:

- pinned package-manager version
- committed lockfile
- frozen-lockfile installation in CI
- declared runtime version
- setup instructions that work without private services

A new contributor must be able to install and validate the repository from documentation.

### 3. Formatting and static checks

The baseline includes:

- formatting
- syntax or lint checks
- type checking
- package build validation where required by tests

Formatting is important, but it is not more important than the other checks. CI should report independent failures rather than stop before substantive validation whenever practical.

### 4. Tests

Tests should cover deterministic behavior and invariants introduced by a change.

At the current stage, useful tests include:

- public or synthetic data boundary enforcement
- content identity and metadata validation
- refusal and decline paths
- retired terminology
- reward-type allowlists
- schema fixtures that should pass and fail
- deterministic feedback priority behavior when a policy is implemented
- decision-class, safety-precedence, and override-record invariants
- contribution-credit fixtures that reject raw activity as automatic value or authority

Coverage percentage is not an MVV gate. Meaningful invariant coverage is.

### 5. Content and canon alignment

Active content should be checked for objective requirements such as:

- supported schema version
- unique stable identifiers
- required metadata
- valid references
- approved content kinds
- player-value statement for quests
- deterministic completion and rewards
- refusal, defer, or exit routes
- shame-free notification declaration
- capability status
- retired terminology

Automated validation must not claim to replace canon, safety, accessibility, privacy, clinical, or economic review.

### 6. Core-objective alignment

Every material pull request should identify:

- the connected loop it strengthens
- the progress dimension or player right it affects
- the immediate player or contributor value
- the relevant incentive and consent risks

A change that cannot name its relationship to the project’s core objective should be narrowed, deferred, or justified as necessary enabling work.

### 7. Feedback and governance validation

Decision 0006 and `docs/governance/feedback-to-governed-work.md` extend MVV to public feedback, prioritization, contribution credit, and delegated governance.

Before automation, the public repository should enforce the cheapest objective boundaries:

- issue intake requires a problem, desired outcome, affected area, and public-information certification
- protected health, account, security, conduct, and production information is directed away from public issues
- prioritized work names a decision class and accountable authority
- automated assessments name a policy revision and preserve their inputs
- material overrides record an authority and rationale
- community signals cannot bypass safety, constitutional, privacy, security, clinical, accessibility, legal, consent, or conduct review
- closed work items state whether they were completed, declined, duplicated, superseded, invalid, out of scope, or unable to reproduce
- delivered work links to acceptance evidence and can be reopened or rolled back when the problem persists
- contribution credit names evidence and a validation authority
- issue, reaction, comment, or vote volume cannot directly mint Fellowship credit or universal governance power

Before binding community prioritization, validation must also include synthetic governance fixtures, capture and concentration analysis, participant-comprehension review, a bounded charter, appeal and rollback paths, and published pilot outcomes.

### 8. Human review

At least one maintainer review is required before merge.

Specialist review is required when available for material changes involving:

- privacy or consent
- security
- health or clinical claims
- accessibility
- research governance
- compensation or economic claims
- frozen canon
- binding governance or priority mechanisms

Until a qualified specialist exists, the absence of review must be recorded as an unresolved gate rather than implied approval.

### 9. Contribution provenance

The baseline requires:

- truthful certification that the contributor has the right to submit the contribution under the Developer Certificate of Origin
- a `Signed-off-by` trailer on the final squash-merge commit during the current transitional workflow
- disclosure of material AI assistance
- contributor responsibility for licensing and correctness
- source attribution where a contribution depends on external material

The current pull-request-body DCO certification is a transitional control for the repository’s early maintainer-only phase. Commit-level DCO validation must replace it before external contribution volume grows. The transitional check must not claim that every exploratory commit is signed when it is not.

## Pull-request minimum

A material pull request should state:

- problem and intended outcome
- scope and explicit non-scope
- status impact: FROZEN, BASELINE, PROPOSED, DEFERRED, or RETIRED
- player or contributor value
- core-objective and incentive impact
- privacy, security, health-safety, accessibility, canon, AI, and MCP risks
- validation performed
- remaining uncertainty
- AI assistance
- DCO certification

## Merge gate

A pull request is eligible to merge when:

- its scope is coherent
- required automated checks pass
- canonical examples and documentation agree with changed contracts
- no unresolved contradiction with frozen foundations remains
- at least one maintainer approves
- required specialist gates are satisfied or explicitly block release
- the PR description accurately reflects the final diff

Draft pull requests may intentionally fail while work is incomplete, but they should not be represented as complete.

## CI design baseline

CI should expose separate, stable check results for at least:

- formatting
- repository policy
- content validation
- lint or syntax
- typecheck
- tests
- DCO

Separate checks make failures understandable and prevent a superficial failure from hiding deeper defects.

For a small repository, these checks may share setup through reusable workflows or a matrix. They do not require separate services or complex infrastructure.

## Branch protection baseline

Once check names are stable, `main` should require:

- pull request before merge
- passing required checks
- at least one approval
- conversation resolution where supported
- no force pushes
- no branch deletion

Administrator bypass should be reserved for documented emergencies.

## Release baseline

A release should not be created until:

- `main` is green
- release notes distinguish live, experimental, planned, and long-horizon capabilities
- known security or privacy blockers are recorded
- content and schema versions are identified
- rollback instructions exist for material content or behavior changes

Signed releases, SBOMs, provenance attestations, and stronger supply-chain controls are valuable future improvements but are not required for the current MVV.

## Deferred best practices

The following are good practices to add when justified by project maturity:

- commit-level DCO application
- CODEOWNERS
- signed commits or vigilant mode
- signed releases
- dependency review workflow
- code scanning
- secret-scanning push protection
- SBOM and build provenance
- release automation
- automated issue triage, typed-signal, priority-assessment, and outcome dashboards
- contributor recognition and maintainer succession automation

They should be adopted deliberately, not copied into the repository without an owner and maintenance plan.

## Success condition

MVV succeeds when a new contributor can understand the rules, run one command, receive actionable failures, and make a safe contribution without access to private data or undocumented maintainer knowledge.

For Calypso’s Promise specifically, validation must also preserve the hardcoded incentive model: personal value first, deterministic rewards, meaningful refusal, non-punitive return, optional Fellowship, no reward for broader consent or unnecessary intimate disclosure, and no conversion of raw feedback activity into automatic value or governance authority.