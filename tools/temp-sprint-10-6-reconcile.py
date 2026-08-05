from pathlib import Path


def replace_once(source: str, old: str, new: str, label: str) -> str:
    count = source.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected one match, found {count}")
    return source.replace(old, new, 1)


record_path = Path("docs/roadmap/sprint-10.6-offline-resilience-behavior.md")
record = record_path.read_text()
record = replace_once(
    record,
    "**Status:** IMPLEMENTED — PENDING EXACT CHECKPOINT VALIDATION  ",
    "**Status:** COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10  ",
    "10.6 status",
)
record = replace_once(
    record,
    "## Validation target\n\nThe exact 10.6 checkpoint will be recorded after dependency and lockfile reconciliation, frozen installation, focused offline-resilience validation, formatting, documentation, repository policy, Longitudinal Intelligence coherence, content validation, economics, lint, typecheck, tests, existing site release validation, browser/iOS/Android credential-free export, generated-state cleanup, CI, and DCO complete.\n",
    "## Validated checkpoint\n\nExact clean implementation checkpoint: `b792a88bdff49283a304fe0f6939306c18cdd049`\n\n- CI 1461: success\n- DCO 1561: success\n- exact AsyncStorage `2.2.0` dependency and lockfile reconciliation: success\n- frozen Node 24 / pnpm 10.13.1 installation: success\n- archive integrity and focused offline-resilience validation: success\n- bundled-content fallback, expiry, clear, migration, corruption, conflict, quota, storage-unavailable, and protected-field tests: success\n- formatting, documentation, repository policy, Longitudinal Intelligence coherence, content validation, economics, lint, typecheck, and tests: success\n- existing production-site build and rendered prologue validation: success\n- browser, iOS, and Android credential-free Expo export: success\n- generated-state cleanup and no tracked build mutation: success\n- temporary implementation tooling: removed before final checkpoint validation\n\nThis is maintainer implementation and CI evidence inside active Sprint 10. It is not independent accessibility, security, privacy, legal, affected-user, field, storage-pressure, or device certification; protected-data or authentication readiness; deployment or distribution authorization; authority to begin Sprint 11; activation of LI-V1 through LI-V8; or institutional Phase 0 exit.\n",
    "10.6 validation section",
)
record_path.write_text(record)

status_path = Path("docs/roadmap/current-status.md")
status = status_path.read_text()
status = replace_once(
    status,
    " · [Sprint 10.5 state and authority](sprint-10.5-state-and-authority-boundaries.md) · [Sprint 9 completion]",
    " · [Sprint 10.5 state and authority](sprint-10.5-state-and-authority-boundaries.md) · [Sprint 10.6 offline resilience](sprint-10.6-offline-resilience-behavior.md) · [Sprint 9 completion]",
    "current-status navigation",
)
status = replace_once(
    status,
    "- **Sprint 10.1 through Sprint 10.5 are complete as validated internal checkpoints.**",
    "- **Sprint 10.1 through Sprint 10.6 are complete as validated internal checkpoints.**",
    "current-status summary completion",
)
status = replace_once(
    status,
    "- **Sprint 10.5 checkpoint:** `ff40e9840328151fc9b3d63623ab6e217dca8ad8` — CI 1444 / DCO 1543.\n",
    "- **Sprint 10.5 checkpoint:** `ff40e9840328151fc9b3d63623ab6e217dca8ad8` — CI 1444 / DCO 1543.\n- **Sprint 10.6 checkpoint:** `b792a88bdff49283a304fe0f6939306c18cdd049` — CI 1461 / DCO 1561.\n",
    "current-status checkpoint list",
)
status = replace_once(
    status,
    "- **Sprint 10.6 through Sprint 10.10:** not started.",
    "- **Sprint 10.7 through Sprint 10.10:** not started.",
    "current-status unstarted range",
)
status = replace_once(
    status,
    "Workstreams 10.1 through 10.5 are complete as validated internal checkpoints; no later workstream, provider choice, deployment, indexing change, store submission, or Sprint 11 work has begun.",
    "Workstreams 10.1 through 10.6 are complete as validated internal checkpoints; no later workstream, provider choice, deployment, indexing change, store submission, or Sprint 11 work has begun.",
    "current-status active sprint paragraph",
)
status = replace_once(
    status,
    "## Sprint 10 pull-request model\n",
    "## Sprint 10.6 validated checkpoint\n\nWorkstream 10.6 establishes bounded offline and resilience behavior for public packaged content and temporary synthetic-session state only:\n\n- the accepted `@calypsos-promise/game-content` revision remains bundled and is the essential offline fallback across browser, iOS, and Android;\n- AsyncStorage `2.2.0` is isolated under the exact three-file `src/offline` boundary and used only for `PUBLIC_SYNTHETIC` records;\n- the optional public-content cache expires after 30 days and the minimized temporary synthetic-session record expires after 24 hours;\n- records are versioned, byte-limited, clearable, migratable, and checked for accidental corruption;\n- expired, stale, corrupt, unsupported, oversized, conflicting, quota-limited, and unavailable storage fails closed;\n- low storage evicts the optional public cache once before falling back to memory-only session state;\n- restore is explicit, and restart or discard clears the stored session;\n- no health, voice, private Chronicle, account, credential, permission, inference, analytics, research, payment, provider, or protected clinical data is eligible for storage; and\n- stored or restored state cannot create completion, reward, restoration, unlock, permission, Chronicle truth, personal progress, health evidence, authentic preference, or Longitudinal Intelligence.\n\nThe validated clean checkpoint is `b792a88bdff49283a304fe0f6939306c18cdd049` with CI 1461 and DCO 1561. This is maintainer implementation and CI evidence inside the active Sprint 10 PR. It is not a separate founding-steward acceptance or merge gate and does not authorize protected persistence, production authentication, deployment, mobile distribution, private capability, Sprint 11, a later Longitudinal Intelligence stage, or institutional Phase 0 exit.\n\n## Sprint 10 pull-request model\n",
    "current-status 10.6 section",
)
status = replace_once(
    status,
    "LI-V0 is complete, Sprint 10 is active under issue #80, and Sprint 10.1 through Sprint 10.5 are complete as validated internal checkpoints.",
    "LI-V0 is complete, Sprint 10 is active under issue #80, and Sprint 10.1 through Sprint 10.6 are complete as validated internal checkpoints.",
    "current-status next decision completion",
)
status = replace_once(
    status,
    "The next implementation step is Sprint 10.6 on the same branch and PR. No separate founding-steward acceptance or merge occurs for Sprint 10.1 through Sprint 10.5.",
    "The next implementation step is Sprint 10.7 on the same branch and PR. No separate founding-steward acceptance or merge occurs for Sprint 10.1 through Sprint 10.6.",
    "current-status next implementation",
)
status = replace_once(
    status,
    "- Sprint 10.6 through Sprint 10.10 remain unstarted until entered in sequence;",
    "- Sprint 10.7 through Sprint 10.10 remain unstarted until entered in sequence;",
    "current-status remaining range",
)
status_path.write_text(status)

policy_path = Path("tools/policy/check-longitudinal-intelligence.mjs")
policy = policy_path.read_text()
policy = replace_once(
    policy,
    'const sprintTenFivePath =\n  "docs/roadmap/sprint-10.5-state-and-authority-boundaries.md";\nconst currentStatusPath',
    'const sprintTenFivePath =\n  "docs/roadmap/sprint-10.5-state-and-authority-boundaries.md";\nconst sprintTenSixPath =\n  "docs/roadmap/sprint-10.6-offline-resilience-behavior.md";\nconst currentStatusPath',
    "policy path declaration",
)
policy = replace_once(
    policy,
    "const sprintTenFive = await loadText(sprintTenFivePath);\nconst currentStatus",
    "const sprintTenFive = await loadText(sprintTenFivePath);\nconst sprintTenSix = await loadText(sprintTenSixPath);\nconst currentStatus",
    "policy load declaration",
)
policy = replace_once(
    policy,
    "  [\n    currentStatusPath,\n    currentStatus,",
    "  [\n    sprintTenSixPath,\n    sprintTenSix,\n    [\n      \"COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10\",\n      \"issue #80\",\n      \"draft PR #79\",\n      \"apps/game\",\n      \"AsyncStorage\",\n      \"PUBLIC_SYNTHETIC\",\n      \"30 days\",\n      \"24 hours\",\n      \"corrupt\",\n      \"conflict\",\n      \"low-storage\",\n      \"Sprint 10.7\",\n      \"no separate founding-steward acceptance or merge gate\",\n    ],\n  ],\n  [\n    currentStatusPath,\n    currentStatus,",
    "policy 10.6 requirement block",
)
policy = replace_once(
    policy,
    '"Sprint 10.1 through Sprint 10.5 are complete as validated internal checkpoints",',
    '"Sprint 10.1 through Sprint 10.6 are complete as validated internal checkpoints",',
    "policy current-status completion requirement",
)
policy = replace_once(
    policy,
    '"Sprint 10.6 through Sprint 10.10",',
    '"Sprint 10.7 through Sprint 10.10",',
    "policy current-status range requirement",
)
policy_path.write_text(policy)
