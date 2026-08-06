from pathlib import Path

CHECKPOINT = "23dffb031657181d9c0ca42457b95128520f7870"
CI = "1513"
DCO = "1618"


def read(path):
    return Path(path).read_text(encoding="utf-8")


def write(path, text):
    Path(path).write_text(text, encoding="utf-8")


def replace_once(path, old, new, label):
    text = read(path)
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{path}: {label}: expected one match, found {count}")
    write(path, text.replace(old, new, 1))


replace_once(
    "docs/roadmap/current-status.md",
    "- **Pre-acceptance full alignment found and corrected canonical status and module-inventory drift; one new exact candidate must pass permanent validation before review readiness is restored.**",
    f"- **Pre-acceptance full alignment is complete and validated at clean checkpoint `{CHECKPOINT}` — CI {CI} / DCO {DCO}; canonical status and module-inventory drift are corrected.**",
    "current-status alignment evidence",
)

replace_once(
    "docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md",
    "- **Status:** ALIGNMENT RECONCILIATION COMPLETE — READY FOR FOUNDING-STEWARD ACCEPTANCE AFTER EXACT-CANDIDATE VALIDATION; no acceptance or merge occurs through this record",
    "- **Status:** ALIGNMENT RECONCILIATION COMPLETE AND VALIDATED — READY FOR FOUNDING-STEWARD ACCEPTANCE; no acceptance or merge occurs through this record",
    "alignment status",
)

alignment = read("docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md")
marker = "## Quality conclusion\n"
addition = f"""## Validated alignment checkpoint

Clean durable alignment checkpoint: `{CHECKPOINT}` — CI {CI} / DCO {DCO}.

The complete permanent repository suite, strengthened Sprint 10 alignment policy, production-site and rendered-prologue validation, browser/iOS/Android credential-free export, source-bound unsigned artifact evidence, generated-state cleanup, no tracked mutation, and DCO passed after temporary alignment transport was removed.

The exact final durable head and PR review state after evidence-record reconciliation are recorded in issue #80 and PR #79. This checkpoint creates no acceptance, merge, deployment, distribution, release, private capability, Sprint 11 entry, LI activation, or Phase 0 exit.

"""
if alignment.count(marker) != 1:
    raise SystemExit("alignment quality conclusion marker mismatch")
write(
    "docs/roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md",
    alignment.replace(marker, addition + marker, 1),
)

completion_path = "docs/roadmap/sprint-10-completion-record.md"
completion = read(completion_path)
old = """It found no material implementation blocker. It did find contradictory canonical orientation in repository, documentation, architecture, module, and application entry points. Those records and the permanent validator are corrected before the final acceptance candidate is restored to ready-for-review state.
"""
new = f"""It found no material implementation blocker. It did find contradictory canonical orientation in repository, documentation, architecture, module, and application entry points. Those records and the permanent validator were corrected and passed at clean alignment checkpoint `{CHECKPOINT}` — CI {CI} / DCO {DCO}.

The exact final durable head and PR review state after evidence-record reconciliation are recorded in issue #80 and PR #79.
"""
if completion.count(old) != 1:
    raise SystemExit("completion alignment evidence anchor mismatch")
write(completion_path, completion.replace(old, new, 1))

cross_path = "docs/architecture/universal-game-shell-sprint-10-cross-contract-reconciliation.md"
cross = read(cross_path)
old = """The [pre-acceptance full alignment reconciliation](../roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md) corrects that status and module-inventory drift and strengthens permanent validation to reject the same contradiction class. The PR remains draft until the corrected exact candidate is green.
"""
new = f"""The [pre-acceptance full alignment reconciliation](../roadmap/sprint-10-pre-acceptance-alignment-reconciliation.md) corrects that status and module-inventory drift and strengthens permanent validation to reject the same contradiction class. Clean alignment checkpoint `{CHECKPOINT}` passed CI {CI} and DCO {DCO}; the exact final durable head and PR review state are recorded in GitHub.
"""
if cross.count(old) != 1:
    raise SystemExit("cross-contract alignment evidence anchor mismatch")
write(cross_path, cross.replace(old, new, 1))

validator_path = "tools/policy/check-sprint-10-completion.mjs"
validator = read(validator_path)
old = """      "No material implementation blocker remains",
      "Sprint 11 remains unstarted",
"""
new = f"""      "No material implementation blocker remains",
      "{CHECKPOINT}",
      "CI {CI} / DCO {DCO}",
      "Sprint 11 remains unstarted",
"""
if validator.count(old) != 1:
    raise SystemExit("validator alignment checkpoint anchor mismatch")
validator = validator.replace(old, new, 1)
old = """      "Sprint 10 implementation package is complete",
      "Complete unmerged Sprint 10 candidate",
"""
new = f"""      "Sprint 10 implementation package is complete",
      "{CHECKPOINT}",
      "Complete unmerged Sprint 10 candidate",
"""
if validator.count(old) != 1:
    raise SystemExit("validator current status checkpoint anchor mismatch")
write(validator_path, validator.replace(old, new, 1))
