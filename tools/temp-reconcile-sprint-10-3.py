from pathlib import Path


def replace_once(path: str, old: str, new: str) -> None:
    file = Path(path)
    text = file.read_text()
    if old not in text:
        raise SystemExit(f"missing expected text in {path}: {old[:160]!r}")
    file.write_text(text.replace(old, new, 1))


sprint = "docs/roadmap/sprint-10.3-universal-shell-and-navigation.md"
replace_once(
    sprint,
    "**Status:** IMPLEMENTED — PENDING EXACT CHECKPOINT VALIDATION",
    "**Status:** COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10",
)
replace_once(
    sprint,
    "## Validation target\n\nThe exact 10.3 checkpoint will be recorded after frozen installation, shell-contract validation, formatting, documentation, repository policy, Longitudinal Intelligence coherence, content validation, economics, lint, typecheck, tests, existing site release validation, browser/iOS/Android credential-free export, generated-state cleanup, CI, and DCO complete.",
    """## Validated checkpoint

Exact clean checkpoint: `1e3139333c469b9d0bfec41532b38165119c6938`

- CI 1421: success
- DCO 1518: success
- frozen Node 24 / pnpm 10.13.1 installation: success
- dedicated shell-contract validation and focused navigation tests: success
- formatting, documentation, repository policy, Longitudinal Intelligence coherence, content validation, economics, lint, typecheck, and tests: success
- existing production-site build and rendered prologue validation: success
- browser, iOS, and Android credential-free Expo export: success
- generated-state cleanup and no tracked build mutation: success
- temporary implementation transport tooling: removed before final checkpoint validation

This is maintainer implementation and CI evidence inside active Sprint 10. It is not independent accessibility, security, privacy, legal, affected-user, field, or device certification; deployment or distribution authorization; personal-data readiness; authority to begin Sprint 11; activation of LI-V1 through LI-V8; or institutional Phase 0 exit.""",
)

status = "docs/roadmap/current-status.md"
replace_once(
    status,
    "· [Sprint 10.2 package](sprint-10.2-versioned-game-content-package.md) · [Sprint 9 completion]",
    "· [Sprint 10.2 package](sprint-10.2-versioned-game-content-package.md) · [Sprint 10.3 shell](sprint-10.3-universal-shell-and-navigation.md) · [Sprint 9 completion]",
)
replace_once(
    status,
    "- **Sprint 10.1 and Sprint 10.2 are complete as validated internal checkpoints.**\n- **Sprint 10.1 checkpoint:** `2a9fef52c128e79ccdd2a2872f893d44b9d3ff3c` — CI 1367 / DCO 1465.\n- **Sprint 10.2 checkpoint:** `d207fcd42b2d781dd60ae5d752bb25f44970842c` — CI 1402 / DCO 1498.\n- **PR #79 remains draft for workstreams 10.1 through 10.10.**\n- **Sprint 10.3 through Sprint 10.10:** not started.",
    "- **Sprint 10.1 through Sprint 10.3 are complete as validated internal checkpoints.**\n- **Sprint 10.1 checkpoint:** `2a9fef52c128e79ccdd2a2872f893d44b9d3ff3c` — CI 1367 / DCO 1465.\n- **Sprint 10.2 checkpoint:** `d207fcd42b2d781dd60ae5d752bb25f44970842c` — CI 1402 / DCO 1498.\n- **Sprint 10.3 checkpoint:** `1e3139333c469b9d0bfec41532b38165119c6938` — CI 1421 / DCO 1518.\n- **PR #79 remains draft for workstreams 10.1 through 10.10.**\n- **Sprint 10.4 through Sprint 10.10:** not started.",
)
replace_once(
    status,
    "Sprint 10 is active through issue #80. PR #79 is the single draft implementation pull request for the entire sprint. Workstreams 10.1 and 10.2 are complete as validated internal checkpoints; no later workstream, provider choice, deployment, indexing change, store submission, or Sprint 11 work has begun.",
    "Sprint 10 is active through issue #80. PR #79 is the single draft implementation pull request for the entire sprint. Workstreams 10.1 through 10.3 are complete as validated internal checkpoints; no later workstream, provider choice, deployment, indexing change, store submission, or Sprint 11 work has begun.",
)
marker = "## Sprint 10 pull-request model"
section = """## Sprint 10.3 validated checkpoint

Workstream 10.3 establishes the universal no-account shell and navigation boundary only:

- `apps/game` exposes public synthetic arrival, island-map, Hearth, direct-information, unavailable-destination, and unknown-route paths;
- narrative, direct, and map entry paths receive equal prominence without account creation or conversion pressure;
- Lantern Shore and the Hearth are available while future places are explicitly planned and inactive rather than behaviorally locked;
- the Hearth uses pre-authored versioned package content without a model provider or generic scene renderer;
- the direct route presents materially equivalent essential authority information without story traversal;
- missing content, inactive destinations, and unknown routes fail closed with visible return and discard paths;
- navigation remains temporary and in memory with no persistence, network request, analytics, identity, permission, progress, reward, Chronicle record, or Longitudinal Intelligence result; and
- generic scene, dialogue, quest, Wayfinder Orb, and deterministic interaction execution remain assigned to Sprint 10.4.

The validated clean checkpoint is `1e3139333c469b9d0bfec41532b38165119c6938` with CI 1421 and DCO 1518. This is maintainer implementation and CI evidence inside the active Sprint 10 PR. It is not a separate founding-steward acceptance or merge gate and does not authorize deployment, mobile distribution, private capability, generic content execution, Sprint 11, a later Longitudinal Intelligence stage, or institutional Phase 0 exit.

"""
text = Path(status).read_text()
if marker not in text:
    raise SystemExit(f"missing insertion marker in {status}")
Path(status).write_text(text.replace(marker, section + marker, 1))
replace_once(
    status,
    "LI-V0 is complete, Sprint 10 is active under issue #80, and Sprint 10.1 and Sprint 10.2 are complete as validated internal checkpoints. PR #79 remains draft for workstreams 10.1 through 10.10.",
    "LI-V0 is complete, Sprint 10 is active under issue #80, and Sprint 10.1 through Sprint 10.3 are complete as validated internal checkpoints. PR #79 remains draft for workstreams 10.1 through 10.10.",
)
replace_once(
    status,
    "The next implementation step is Sprint 10.3 on the same branch and PR. No separate founding-steward acceptance or merge occurs for Sprint 10.1 or Sprint 10.2. Until the complete Sprint 10 package reaches workstream 10.10:",
    "The next implementation step is Sprint 10.4 on the same branch and PR. No separate founding-steward acceptance or merge occurs for Sprint 10.1, Sprint 10.2, or Sprint 10.3. Until the complete Sprint 10 package reaches workstream 10.10:",
)
replace_once(
    status,
    "- Sprint 10.3 through Sprint 10.10 remain unstarted until entered in sequence;",
    "- Sprint 10.4 through Sprint 10.10 remain unstarted until entered in sequence;",
)

policy = "tools/policy/check-longitudinal-intelligence.mjs"
replace_once(
    policy,
    'const sprintTenTwoPath =\n  "docs/roadmap/sprint-10.2-versioned-game-content-package.md";\nconst currentStatusPath',
    'const sprintTenTwoPath =\n  "docs/roadmap/sprint-10.2-versioned-game-content-package.md";\nconst sprintTenThreePath =\n  "docs/roadmap/sprint-10.3-universal-shell-and-navigation.md";\nconst currentStatusPath',
)
replace_once(
    policy,
    "const sprintTenTwo = await loadText(sprintTenTwoPath);\nconst currentStatus",
    "const sprintTenTwo = await loadText(sprintTenTwoPath);\nconst sprintTenThree = await loadText(sprintTenThreePath);\nconst currentStatus",
)
replace_once(
    policy,
    "  [\n    currentStatusPath,\n    currentStatus,",
    """  [
    sprintTenThreePath,
    sprintTenThree,
    [
      "COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10",
      "issue #80",
      "draft PR #79",
      "apps/game",
      "island map",
      "Hearth",
      "direct and narrative",
      "Sprint 10.4",
      "no separate founding-steward acceptance or merge gate",
    ],
  ],
  [
    currentStatusPath,
    currentStatus,""",
)
replace_once(
    policy,
    '      "Sprint 10.1 and Sprint 10.2 are complete as validated internal checkpoints",\n      "PR #79 remains draft for workstreams 10.1 through 10.10",\n      "Sprint 10.3 through Sprint 10.10",',
    '      "Sprint 10.1 through Sprint 10.3 are complete as validated internal checkpoints",\n      "PR #79 remains draft for workstreams 10.1 through 10.10",\n      "Sprint 10.4 through Sprint 10.10",',
)
