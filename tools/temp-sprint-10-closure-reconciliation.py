from pathlib import Path

IMPLEMENTATION_MERGE = "28bb5a7ae268d28a67d737777cafdd760c796cd1"
RECONCILIATION_HEAD = "0dc72c6ee35e6209cd06c9a3786cf3a0f1592788"
RECONCILIATION_MERGE = "0119e22e7ba21ec409e5521df44e38a16224d3b4"


def read(path):
    return Path(path).read_text(encoding="utf-8")


def write(path, text):
    Path(path).write_text(text, encoding="utf-8")


def replace_once(path, old, new, label):
    text = read(path)
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{path}: {label}: expected exactly one match, found {count}")
    write(path, text.replace(old, new, 1))


replace_once(
    "README.md",
    "[Issue #80](https://github.com/finalboss-tom/calypsos-promise/issues/80) closes after post-merge verification. The shell remains unhosted, unsigned, undistributed, and blocked from Sprint 11 until a dedicated pre-Sprint 11 alignment is accepted.",
    f"[Issue #80](https://github.com/finalboss-tom/calypsos-promise/issues/80) is closed as completed. Post-merge reconciliation PR #82 was squash merged as `{RECONCILIATION_MERGE}` from validated head `{RECONCILIATION_HEAD}` — CI 1522 / DCO 1627. The shell remains unhosted, unsigned, undistributed, and blocked from Sprint 11 until a dedicated pre-Sprint 11 alignment is accepted.",
    "root issue closure",
)

replace_once(
    "docs/roadmap/current-status.md",
    f"- **Sprint 10 is accepted and squash merged through PR #79 as `{IMPLEMENTATION_MERGE}`; issue #80 closes after post-merge verification.**",
    f"- **Sprint 10 is accepted and squash merged through PR #79 as `{IMPLEMENTATION_MERGE}`; issue #80 is closed as completed.**",
    "status issue closure",
)
replace_once(
    "docs/roadmap/current-status.md",
    "- **Post-Sprint 10 repository reconciliation is complete; no site redeploy, game deployment, distribution, private capability, LI activation, Sprint 11 start, or Phase 0 exit occurred.**",
    f"- **Post-Sprint 10 repository reconciliation is complete through PR #82 as `{RECONCILIATION_MERGE}` from validated head `{RECONCILIATION_HEAD}` — CI 1522 / DCO 1627; no site redeploy, game deployment, distribution, private capability, LI activation, Sprint 11 start, or Phase 0 exit occurred.**",
    "status reconciliation evidence",
)
replace_once(
    "docs/roadmap/current-status.md",
    "Sprint 10 is complete, accepted, merged, and reconciled. Issue #80 closes as completed after post-merge verification.",
    f"Sprint 10 is complete, accepted, merged, and reconciled. Issue #80 is closed as completed. Post-merge reconciliation PR #82 is squash merged as `{RECONCILIATION_MERGE}`.",
    "status next decision closure",
)
replace_once(
    "docs/roadmap/current-status.md",
    "- Issue #80 closes after post-merge reconciliation verification.",
    "- Issue #80 is closed as completed after post-merge reconciliation verification.",
    "status merge outcome closure",
)

replace_once(
    "docs/roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md",
    f"- **Accepted squash commit:** `{IMPLEMENTATION_MERGE}`\n- **Tracking issue:** [#80](https://github.com/finalboss-tom/calypsos-promise/issues/80) — closed after this reconciliation",
    f"- **Accepted squash commit:** `{IMPLEMENTATION_MERGE}`\n- **Post-merge reconciliation pull request:** [#82](https://github.com/finalboss-tom/calypsos-promise/pull/82)\n- **Validated reconciliation head:** `{RECONCILIATION_HEAD}` — CI 1522 / DCO 1627\n- **Post-merge reconciliation squash commit:** `{RECONCILIATION_MERGE}`\n- **Tracking issue:** [#80](https://github.com/finalboss-tom/calypsos-promise/issues/80) — closed as completed",
    "post-merge final evidence",
)
replace_once(
    "docs/roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md",
    f"- The squash commit is `{IMPLEMENTATION_MERGE}`.\n- The squash tree is required to match the accepted aligned-head tree before this reconciliation is published.",
    f"- The Sprint 10 squash commit is `{IMPLEMENTATION_MERGE}`.\n- The squash tree exactly matches the accepted aligned-head tree.\n- Post-merge reconciliation PR #82 was validated at `{RECONCILIATION_HEAD}` — CI 1522 / DCO 1627 — and squash merged as `{RECONCILIATION_MERGE}`.",
    "post-merge merge evidence",
)
replace_once(
    "docs/roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md",
    "This reconciliation must pass:",
    "This reconciliation passed:",
    "post-merge validation tense",
)
replace_once(
    "docs/roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md",
    "Temporary reconciliation scripts and workflows must be removed before the durable checkpoint.",
    "Temporary reconciliation scripts and workflows were removed before the durable checkpoint.",
    "post-merge cleanup tense",
)
replace_once(
    "docs/roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md",
    "- Issue #80 closes as completed after post-merge verification.",
    "- Issue #80 is closed as completed after post-merge verification.",
    "post-merge issue disposition",
)

replace_once(
    "docs/roadmap/sprint-10-completion-record.md",
    "- **Tracking issue:** [#80](https://github.com/finalboss-tom/calypsos-promise/issues/80) — closes after post-merge verification",
    "- **Tracking issue:** [#80](https://github.com/finalboss-tom/calypsos-promise/issues/80) — closed as completed",
    "completion issue closure",
)
replace_once(
    "docs/roadmap/sprint-10-completion-record.md",
    f"- **Accepted aligned head:** `edd954d0e5ce61f53918a74ec804964ad987830f` — CI 1519 / DCO 1624",
    f"- **Accepted aligned head:** `edd954d0e5ce61f53918a74ec804964ad987830f` — CI 1519 / DCO 1624\n- **Post-merge reconciliation:** PR #82 squash merged as `{RECONCILIATION_MERGE}` from validated head `{RECONCILIATION_HEAD}` — CI 1522 / DCO 1627",
    "completion reconciliation evidence",
)

# Strengthen permanent validation for the fully closed tracker state.
replace_once(
    "tools/policy/check-sprint-10-completion.mjs",
    f'''      "{IMPLEMENTATION_MERGE}",
      "Sprint 11 remains unstarted",''',
    f'''      "{IMPLEMENTATION_MERGE}",
      "{RECONCILIATION_MERGE}",
      "closed as completed",
      "Sprint 11 remains unstarted",''',
    "validator current closure evidence",
)
replace_once(
    "tools/policy/check-sprint-10-completion.mjs",
    f'''      "{IMPLEMENTATION_MERGE}",
      "one cross-contract reconciliation with 24 findings",''',
    f'''      "{IMPLEMENTATION_MERGE}",
      "{RECONCILIATION_MERGE}",
      "closed as completed",
      "one cross-contract reconciliation with 24 findings",''',
    "validator completion closure evidence",
)
replace_once(
    "tools/policy/check-sprint-10-completion.mjs",
    f'''      "{RECONCILIATION_HEAD}",
      "{IMPLEMENTATION_MERGE}",
      "Sprint 11 remains unstarted",''',
    f'''      "{RECONCILIATION_HEAD}",
      "{IMPLEMENTATION_MERGE}",
      "{RECONCILIATION_MERGE}",
      "closed as completed",
      "Sprint 11 remains unstarted",''',
    "validator status closure evidence",
)
replace_once(
    "tools/policy/check-sprint-10-completion.mjs",
    '''  [
    paths.rootReadme,
    texts.rootReadme,
    "Complete unmerged Sprint 10 candidate",
  ],''',
    '''  [
    paths.rootReadme,
    texts.rootReadme,
    "closes after post-merge verification",
  ],
  [
    paths.status,
    texts.status,
    "issue #80 closes after post-merge verification",
  ],
  [
    paths.completion,
    texts.completion,
    "closes after post-merge verification",
  ],
  [
    paths.rootReadme,
    texts.rootReadme,
    "Complete unmerged Sprint 10 candidate",
  ],''',
    "validator stale closure phrases",
)
replace_once(
    "tools/policy/check-sprint-10-completion.mjs",
    '''            "temp-sprint-10-post-merge-reconciliation.yml",
          ].includes(entry);''',
    '''            "temp-sprint-10-post-merge-reconciliation.yml",
            "temp-sprint-10-closure-reconciliation.yml",
          ].includes(entry);''',
    "validator temporary closure workflow",
)

for path in [
    "README.md",
    "docs/roadmap/current-status.md",
    "docs/roadmap/post-sprint-10-reconciliation-and-sprint-11-preparation.md",
    "docs/roadmap/sprint-10-completion-record.md",
]:
    content = read(path)
    if "closes after post-merge verification" in content:
        raise SystemExit(f"{path}: stale tracker closure wording remains")
    for expected in [RECONCILIATION_HEAD, RECONCILIATION_MERGE, "closed as completed"]:
        if expected not in content:
            raise SystemExit(f"{path}: missing final closure evidence {expected}")
