from pathlib import Path


def replace_once(source: str, old: str, new: str, label: str) -> str:
    count = source.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected one match, found {count}")
    return source.replace(old, new, 1)


record_path = Path("docs/roadmap/sprint-10.5-state-and-authority-boundaries.md")
record = record_path.read_text()
record = replace_once(
    record,
    "**Status:** IMPLEMENTED — PENDING EXACT CHECKPOINT VALIDATION  ",
    "**Status:** COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10  ",
    "10.5 status",
)
record = replace_once(
    record,
    "## Validation target\n\nThe exact 10.5 checkpoint will be recorded after frozen installation, state-authority validation, formatting, documentation, repository policy, Longitudinal Intelligence coherence, content validation, economics, lint, typecheck, tests, existing site release validation, browser/iOS/Android credential-free export, generated-state cleanup, CI, and DCO complete.\n",
    "## Validated checkpoint\n\nExact clean implementation checkpoint: `ff40e9840328151fc9b3d63623ab6e217dca8ad8`\n\n- CI 1444: success\n- DCO 1543: success\n- frozen Node 24 / pnpm 10.13.1 installation: success\n- exact implementation archive integrity and focused state-authority validation: success\n- deterministic state-machine, authority-denial, quest-evidence, blocked-interaction, and unknown-claim tests: success\n- formatting, documentation, repository policy, Longitudinal Intelligence coherence, content validation, economics, lint, typecheck, and tests: success\n- existing production-site build and rendered prologue validation: success\n- browser, iOS, and Android credential-free Expo export: success\n- generated-state cleanup and no tracked build mutation: success\n- temporary implementation tooling: removed before final checkpoint validation\n\nThis is maintainer implementation and CI evidence inside active Sprint 10. It is not independent accessibility, security, privacy, legal, affected-user, field, or device certification; persistence or private-data readiness; deployment or distribution authorization; authority to begin Sprint 11; activation of LI-V1 through LI-V8; or institutional Phase 0 exit.\n",
    "10.5 validation section",
)
record_path.write_text(record)

status_path = Path("docs/roadmap/current-status.md")
status = status_path.read_text()
status = replace_once(
    status,
    " · [Sprint 10.4 presentation](sprint-10.4-scene-dialogue-quest-presentation.md) · [Sprint 9 completion]",
    " · [Sprint 10.4 presentation](sprint-10.4-scene-dialogue-quest-presentation.md) · [Sprint 10.5 state and authority](sprint-10.5-state-and-authority-boundaries.md) · [Sprint 9 completion]",
    "current-status navigation",
)
status = replace_once(
    status,
    "- **Sprint 10.1 through Sprint 10.4 are complete as validated internal checkpoints.**",
    "- **Sprint 10.1 through Sprint 10.5 are complete as validated internal checkpoints.**",
    "current-status summary completion",
)
status = replace_once(
    status,
    "- **Sprint 10.4 checkpoint:** `5115690810c570111fca10e14070152f0cbb1404` — CI 1432 / DCO 1530.\n",
    "- **Sprint 10.4 checkpoint:** `5115690810c570111fca10e14070152f0cbb1404` — CI 1432 / DCO 1530.\n- **Sprint 10.5 checkpoint:** `ff40e9840328151fc9b3d63623ab6e217dca8ad8` — CI 1444 / DCO 1543.\n",
    "current-status checkpoint list",
)
status = replace_once(
    status,
    "- **Sprint 10.5 through Sprint 10.10:** not started.",
    "- **Sprint 10.6 through Sprint 10.10:** not started.",
    "current-status unstarted range",
)
status = replace_once(
    status,
    "Workstreams 10.1 through 10.4 are complete as validated internal checkpoints; no later workstream, provider choice, deployment, indexing change, store submission, or Sprint 11 work has begun.",
    "Workstreams 10.1 through 10.5 are complete as validated internal checkpoints; no later workstream, provider choice, deployment, indexing change, store submission, or Sprint 11 work has begun.",
    "current-status active sprint paragraph",
)
status = replace_once(
    status,
    "## Sprint 10 pull-request model\n",
    "## Sprint 10.5 validated checkpoint\n\nWorkstream 10.5 establishes deterministic public/synthetic session-state and executable client-authority boundaries only:\n\n- `apps/game` uses a versioned `0.1.0` pure state machine for pending, presented, failed, stale, corrected, superseded, conflict, deferred, refused, and discarded states;\n- state transitions use no clock, randomness, persistence, network, provider, analytics, hidden flags, or ambient authority;\n- only presented and corrected states permit temporary dialogue interaction;\n- pending, failed, stale, superseded, and conflict states leave essential content readable while blocking interaction authority;\n- deferred, refused, and discarded are visible, non-punitive, clearable terminal states;\n- correction, supersession, conflict, restart, and unknown events cannot preserve or expand completion, reward, permission, Chronicle, health, preference, or progress claims;\n- the quest card derives presentation evidence from session state and always reports completion, reward, restoration, unlock, and personal progress as false;\n- the State Authority Panel makes required states and the complete client-authority deny list inspectable; and\n- persistence, offline storage, private data, identity, permission runtime, durable progress, rewards, health results, and Longitudinal Intelligence remain inactive.\n\nThe validated clean checkpoint is `ff40e9840328151fc9b3d63623ab6e217dca8ad8` with CI 1444 and DCO 1543. This is maintainer implementation and CI evidence inside the active Sprint 10 PR. It is not a separate founding-steward acceptance or merge gate and does not authorize persistence, deployment, mobile distribution, private capability, Sprint 11, a later Longitudinal Intelligence stage, or institutional Phase 0 exit.\n\n## Sprint 10 pull-request model\n",
    "current-status 10.5 section",
)
status = replace_once(
    status,
    "LI-V0 is complete, Sprint 10 is active under issue #80, and Sprint 10.1 through Sprint 10.4 are complete as validated internal checkpoints.",
    "LI-V0 is complete, Sprint 10 is active under issue #80, and Sprint 10.1 through Sprint 10.5 are complete as validated internal checkpoints.",
    "current-status next decision completion",
)
status = replace_once(
    status,
    "The next implementation step is Sprint 10.5 on the same branch and PR. No separate founding-steward acceptance or merge occurs for Sprint 10.1, Sprint 10.2, Sprint 10.3, or Sprint 10.4.",
    "The next implementation step is Sprint 10.6 on the same branch and PR. No separate founding-steward acceptance or merge occurs for Sprint 10.1 through Sprint 10.5.",
    "current-status next implementation",
)
status = replace_once(
    status,
    "- Sprint 10.5 through Sprint 10.10 remain unstarted until entered in sequence;",
    "- Sprint 10.6 through Sprint 10.10 remain unstarted until entered in sequence;",
    "current-status remaining range",
)
status_path.write_text(status)

policy_path = Path("tools/policy/check-longitudinal-intelligence.mjs")
policy = policy_path.read_text()
policy = replace_once(
    policy,
    'const sprintTenFourPath =\n  "docs/roadmap/sprint-10.4-scene-dialogue-quest-presentation.md";\nconst currentStatusPath',
    'const sprintTenFourPath =\n  "docs/roadmap/sprint-10.4-scene-dialogue-quest-presentation.md";\nconst sprintTenFivePath =\n  "docs/roadmap/sprint-10.5-state-and-authority-boundaries.md";\nconst currentStatusPath',
    "policy path declaration",
)
policy = replace_once(
    policy,
    "const sprintTenFour = await loadText(sprintTenFourPath);\nconst currentStatus",
    "const sprintTenFour = await loadText(sprintTenFourPath);\nconst sprintTenFive = await loadText(sprintTenFivePath);\nconst currentStatus",
    "policy load declaration",
)
policy = replace_once(
    policy,
    "  [\n    currentStatusPath,\n    currentStatus,",
    "  [\n    sprintTenFivePath,\n    sprintTenFive,\n    [\n      \"COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10\",\n      \"issue #80\",\n      \"draft PR #79\",\n      \"apps/game\",\n      \"pending\",\n      \"failed\",\n      \"stale\",\n      \"corrected\",\n      \"superseded\",\n      \"conflict\",\n      \"no client-authoritative completion or rewards\",\n      \"Sprint 10.6\",\n      \"no separate founding-steward acceptance or merge gate\",\n    ],\n  ],\n  [\n    currentStatusPath,\n    currentStatus,",
    "policy 10.5 requirement block",
)
policy = replace_once(
    policy,
    '"Sprint 10.1 through Sprint 10.4 are complete as validated internal checkpoints",',
    '"Sprint 10.1 through Sprint 10.5 are complete as validated internal checkpoints",',
    "policy current-status completion requirement",
)
policy = replace_once(
    policy,
    '"Sprint 10.5 through Sprint 10.10",',
    '"Sprint 10.6 through Sprint 10.10",',
    "policy current-status range requirement",
)
policy_path.write_text(policy)
