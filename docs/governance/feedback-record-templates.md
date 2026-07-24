# Feedback Operating Record Templates — BASELINE

**Protocol:** `docs/governance/feedback-triage-operating-protocol.md`  
**Decision basis:** Decision 0006

These templates create consistent public records during the manual Phase 0 feedback process.

They are copy-paste structures, not automated forms or a replacement for judgment. Remove unused optional fields, but do not remove material uncertainty, conflicts, safety gates, authority, or rationale.

Never paste protected health information, account records, private correspondence, security details, conduct evidence, legal advice, or production information into these records.

## Initial triage record

```markdown
## Triage record

- Date:
- Triage steward:
- Public-information check: pass / routed privately / correction required
- Primary type:
- Areas:
- Lifecycle state:
- Evidence state:
- Decision class:
- Required reviews:
- Connected loop, player right, progress dimension, or enabling purpose:
- Canonical issue or duplicate cluster:
- Dependencies:
- Current accountable role:
- Next evidence or decision:
- Next review point:

### Normalized problem

<!-- State the problem separately from any proposed solution. -->

### Desired outcome

<!-- Describe observable improvement or acceptance evidence. -->

### Reported impact

<!-- Record what was reported without presenting it as independently verified. -->

### Verified evidence and uncertainty

<!-- Link public or synthetic evidence. State what remains uncertain. -->

### Constitutional, safety, and accessibility boundaries

<!-- Identify relevant rights, privacy, consent, health-safety, security, accessibility, canon, AI, governance, or public-information constraints. -->

### Next action

<!-- Name the action, accountable role, blocker, and review condition. -->
```

## Needs-evidence request

```markdown
## Evidence request

This item remains plausible, but the following public-safe evidence is needed before it can advance:

- Evidence needed:
- Why it matters:
- Safe format:
- Information that must not be submitted:
- Responsible reviewer:
- Review condition:

This request does not ask for personal health information, account details, private correspondence, production data, credentials, conduct evidence, or other protected information.
```

## Duplicate record

```markdown
## Duplicate record

- Canonical issue:
- Relationship: same problem / same desired outcome / dependency / partial overlap
- Evidence preserved from this issue:
- Typed signals preserved from this issue:
- Distinct context that remains relevant:
- Triage steward:
- Date:

This closure consolidates work; it does not state that the report was false or unhelpful.
```

## Manual typed-signal summary

```markdown
## Typed-signal summary

- As of:
- Maintainer recording the summary:
- Method: public comments and explicit issue-form responses
- Identity limitation: GitHub accounts are not verified unique people
- Anti-Sybil status: no identity or anti-Sybil mechanism selected

| Signal                  | Current count or record | Evidence or participants | Limitations |
| ----------------------- | ----------------------- | ------------------------ | ----------- |
| Affected                |                         |                          |             |
| Reproduced or confirmed |                         |                          |             |
| Priority preference     |                         |                          |             |
| Can validate            |                         |                          |             |
| Can contribute          |                         |                          |             |
| Domain evidence         |                         |                          |             |
| Dependency              |                         |                          |             |

Raw reactions and comment volume are discovery activity only and are not included as verified typed signals.
```

## Manual priority and decision record

```markdown
## Priority and decision record

- Date:
- Decision authority:
- Decision class:
- Current lifecycle state:
- Evidence state:
- Conflicts or recusals:
- Required specialist reviews:
- Current capacity or dependency constraints:
- Outcome: commit / candidate / request evidence / defer / decline / escalate
- Next review point:
- Appeal path:

### Affectedness and reach

<!-- Include concentrated or minority impact that raw popularity would miss. -->

### Severity and urgency

<!-- State material impact and the consequence of delay without manufacturing urgency. -->

### Evidence confidence

<!-- Distinguish reports, reproduction, independent confirmation, specialist review, and uncertainty. -->

### Mission and connected-loop alignment

<!-- Explain the relationship to personal value, the three connected loops, player rights, or necessary enabling architecture. -->

### Rights, safety, accessibility, and equity

<!-- State precedence, review gates, and affected groups. -->

### Longitudinal and architectural leverage

<!-- Explain whether this improves continuity, provenance, correction, portability, understanding, repeated work, lock-in, or key-person dependency. -->

### Contributor readiness

<!-- Identify specification quality, implementation capacity, reviewers, validators, and dependencies. -->

### Effort, maintenance burden, and systemic risk

<!-- Use ranges and uncertainty where exact estimates are not justified. -->

### Decision rationale

<!-- Explain why this outcome follows from the evidence and current authority. -->

### Change from prior decision or ordering

<!-- Required when a prior commitment, deferment, or ordering materially changes. -->
```

## Commitment record

```markdown
## Commitment record

- Commitment date:
- Decision authority:
- Work allocation: sprint / release / roadmap / maintenance / bounded pilot / other
- Implementation owner:
- Review owner:
- Validation owner:
- Linked pull request or work branch:
- Acceptance evidence:
- Required specialist gates:
- Dependencies:
- Rollback condition:
- Target review point:

Commitment means the project has allocated accountable work. It does not guarantee a release date or prove the outcome is solved.
```

## Validation record

```markdown
## Validation record

- Date:
- Proposed resolution:
- Validator or review authority:
- Tests or evidence:
- Accessibility review:
- Security, privacy, health-safety, legal, canon, research, or economic review:
- Reporter or participant confirmation invited: yes / no / not appropriate
- Known limitations:
- Regressions or new risks:
- Result: accepted / changes required / blocked / rollback recommended
- Next action:
```

## Release or publication record

```markdown
## Release or publication record

- Date:
- Released or published surface:
- Version, commit, pull request, or publication:
- Capability status:
- Acceptance evidence:
- Known limitations:
- Rollback path:
- Outcome-review owner:
- Outcome-review condition or window:

Release records delivery. Outcome review determines whether the problem was meaningfully resolved.
```

## Outcome-review record

```markdown
## Outcome review

- Review date:
- Reviewer:
- Original problem:
- Intended outcome:
- Evidence collected:
- Reporter or participant validation:
- Accessibility and minority-impact review:
- New risks or regressions:
- Result: resolved / partially resolved / not resolved / harmful / insufficient evidence
- Follow-up: close / retain open / reopen / create follow-up / roll back
- Governance or priority-policy lesson:

### Rationale

<!-- Explain the result and its uncertainty. -->
```

## Closure record

```markdown
## Closure record

- Date:
- Closing authority:
- Resolution: completed / duplicate / declined / superseded / invalid / out of scope / unable to reproduce / withdrawn
- Canonical issue, replacement, or delivered change:
- Evidence considered:
- Typed signals preserved:
- Reason:
- Reopen condition:
- Appeal path:

Closing this issue records the current disposition. It does not erase the report, evidence, contribution, or right to correction.
```

## Reopening record

```markdown
## Reopening record

- Date:
- Reopening authority:
- Prior resolution:
- New or overlooked evidence:
- Problem that persists or regression introduced:
- New lifecycle state:
- Required review:
- Next action and owner:
```

## Rollback record

```markdown
## Rollback record

- Date:
- Accountable authority:
- Released change:
- Triggering harm, regression, or constitutional conflict:
- Evidence:
- Scope of rollback:
- User or contributor impact:
- Private incident process involved: yes / no
- Safe public follow-up:
- Corrective work item:
- Review date:
```

## Contribution-credit record

```markdown
## Contribution-credit record

- Contributor:
- Contribution type: report / reproduction / duplicate consolidation / specification / design / implementation / review / validation / documentation / outcome measurement / correction
- Domain scope:
- Evidence of value:
- Validating authority:
- Related issue, pull request, or release:
- Credit status: proposed / validated / corrected / disputed / superseded
- Dispute or appeal path:

This record recognizes validated value. It does not create transferable property, permanent privilege, universal governance authority, or a claim based on raw activity volume.
```

## Appeal or correction record

```markdown
## Appeal or correction record

- Date:
- Appellant or correcting authority:
- Disputed record or decision:
- New or overlooked evidence:
- Requested correction:
- Conflict or recusal concern:
- Public or private handling:
- Review authority:
- Result:
- Safe rationale:
- Follow-up or review date:
```

## Private-routing public stub

Use only when it is safe to acknowledge that a matter was routed privately.

```markdown
## Private-routing record

- Date:
- Public category: security / privacy / conduct / legal / personnel / person-specific support / other protected matter
- Responsible authority:
- Reason public detail is limited:
- Public work paused or closed:
- Safe next update or review point:

Protected evidence is not stored in this issue. A safe institutional outcome will be recorded when disclosure is appropriate.
```
