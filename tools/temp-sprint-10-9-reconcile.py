from pathlib import Path

CHECKPOINT = "7ef342452d3561151203605a1d6401133d28c86d"
CI = "1496"
DCO = "1600"


def replace_once(source: str, old: str, new: str, label: str) -> str:
    count = source.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected one match, found {count}")
    return source.replace(old, new, 1)


record_path = Path(
    "docs/roadmap/sprint-10.9-build-release-rollback-operations-evidence.md"
)
record = record_path.read_text()
record = replace_once(
    record,
    "- **Status:** IMPLEMENTED — PENDING EXACT CHECKPOINT VALIDATION",
    "- **Status:** COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10",
    "10.9 status",
)
validated = f'''## Validated checkpoint

Exact clean implementation checkpoint: `{CHECKPOINT}`

- CI {CI}: success
- DCO {DCO}: success
- focused build, release, rollback, and operations validation: success
- exact source, lockfile, pinned-toolchain, platform-set, sorted-artifact, byte-size, and SHA-256 provenance checks: success
- real credential-free browser, iOS, and Android export: success
- source-bound unsigned build evidence for 76 exported artifacts: success
- unsigned, credentials-unused, preview-unauthorized, distribution-unauthorized, and release-unauthorized assertions: success
- hosted-preview decision fields and no-active-preview boundary: success
- merge, deployment, routing, navigation, indexing, signing, store, update, beta, release, account, private-capability, and Longitudinal Intelligence gates remain false: success
- seven provider-adapter replacement and manual-fallback contracts: success
- public/synthetic incident ownership and protected-evidence separation: success
- repository, hosted-preview, browser-production, and mobile-distribution rollback contracts: success
- complete permanent repository suite: success
- existing production-site and rendered-prologue validation: success
- generated-state cleanup and no tracked build mutation: success
- temporary implementation and repair transport: removed before clean checkpoint validation

This is maintainer repository, CI, unsigned-export, artifact-provenance, and operations-contract evidence inside active Sprint 10. It is not multi-host byte-for-byte reproducibility evidence, a hosted preview, production deployment, signing or store qualification, an update channel, a monitoring service, independent release-engineering, security, privacy, accessibility, legal, incident-response, device, or affected-user certification, a release authorization, Sprint 11 authorization, activation of LI-V1 through LI-V8, or institutional Phase 0 exit.

## Sprint-level gate'''
record = replace_once(
    record,
    "## Sprint-level gate",
    validated,
    "10.9 validated checkpoint section",
)
record_path.write_text(record)

status_path = Path("docs/roadmap/current-status.md")
status = status_path.read_text()
status = replace_once(
    status,
    "[Sprint 10.8 accessibility parity](sprint-10.8-accessibility-platform-parity.md) · [Sprint 9 completion]",
    "[Sprint 10.8 accessibility parity](sprint-10.8-accessibility-platform-parity.md) · [Sprint 10.9 operations evidence](sprint-10.9-build-release-rollback-operations-evidence.md) · [Sprint 9 completion]",
    "status navigation",
)
status = replace_once(
    status,
    "**Sprint 10.1 through Sprint 10.8 are complete as validated internal checkpoints.**",
    "**Sprint 10.1 through Sprint 10.9 are complete as validated internal checkpoints.**",
    "status summary completion",
)
status = replace_once(
    status,
    "- **Sprint 10.8 checkpoint:** `c04161860eed4ab6ecf55d4c48c0f9a363a4e058` — CI 1480 / DCO 1582.",
    f"- **Sprint 10.8 checkpoint:** `c04161860eed4ab6ecf55d4c48c0f9a363a4e058` — CI 1480 / DCO 1582.\n- **Sprint 10.9 checkpoint:** `{CHECKPOINT}` — CI {CI} / DCO {DCO}.",
    "status checkpoint line",
)
status = replace_once(
    status,
    "**Sprint 10.9 through Sprint 10.10:** not started.",
    "**Sprint 10.10:** not started.",
    "status remaining workstreams",
)
status = replace_once(
    status,
    "Workstreams 10.1 through 10.8 are complete as validated internal checkpoints. Workstream 10.7 was repaired because its prior reported completion had not landed durable implementation. No provider choice, deployment, indexing change, store submission, or Sprint 11 work has begun.",
    "Workstreams 10.1 through 10.9 are complete as validated internal checkpoints. Workstream 10.7 was repaired because its prior reported completion had not landed durable implementation. No hosted game preview, provider selection, deployment, indexing change, signing, store submission, update channel, official release, or Sprint 11 work has begun.",
    "status accepted authorization",
)
section = f'''## Sprint 10.9 validated checkpoint

Workstream 10.9 establishes build provenance, release decision gates, provider replacement, public/synthetic incident ownership, rollback, and generated-state cleanup evidence only:

- permanent CI exports browser, iOS, and Android without credentials and validates the complete 10.1 through 10.9 contract set;
- a temporary versioned build manifest binds exact source revision, lockfile SHA-256, pinned toolchain versions, platform set, sorted artifact paths, byte sizes, and artifact SHA-256 digests;
- the clean checkpoint validated 76 real exported artifacts while recording `signed: false`, `credentialsUsed: false`, `releaseAuthorized: false`, and `distributionAuthorized: false`;
- no hosted game preview exists, and any future preview must separately record source, provider/project, access, discovery, configuration/secrets, limitations, data classes, monitoring and incident ownership, expiry/teardown, and rollback;
- merge, hosted preview, browser deployment, canonical routing, public navigation, indexing, signing, store submission or approval, public beta, over-the-air updates, official release, account activation, private capability, and Longitudinal Intelligence activation remain separate closed gates;
- Expo, EAS, Apple, Google, Vercel, package registries, and monitoring services remain replaceable adapters with manual fallback and no authority;
- current incident ownership covers repository and CI evidence for the public/synthetic shell only, while protected logs, credentials, private provider records, and sensitive incident evidence remain outside the public repository;
- repository, hosted-preview, browser-production, and mobile-distribution rollback scenarios are explicit, with only repository rollback currently applicable; and
- `.expo`, `dist`, generated `android`, and generated `ios` state is removed after validation with no tracked build mutation.

The validated clean checkpoint is `{CHECKPOINT}` with CI {CI} and DCO {DCO}. This is maintainer repository, CI, unsigned-export, provenance, and operations-contract evidence. It is not a hosted preview, production or distribution readiness, signing or store qualification, multi-host byte-for-byte reproducibility, a monitoring or on-call program, independent specialist certification, Sprint 11 authorization, a later Longitudinal Intelligence stage, or institutional Phase 0 exit.

'''
status = replace_once(
    status,
    "## Sprint 10 pull-request model",
    section + "## Sprint 10 pull-request model",
    "status 10.9 section",
)
status = replace_once(
    status,
    "Sprint 10.1 through Sprint 10.8 are complete as validated internal checkpoints. PR #79 remains draft for workstreams 10.1 through 10.10.",
    "Sprint 10.1 through Sprint 10.9 are complete as validated internal checkpoints. PR #79 remains draft for workstreams 10.1 through 10.10.",
    "status next decision summary",
)
status = replace_once(
    status,
    "The next implementation step is Sprint 10.9 on the same branch and PR. No separate founding-steward acceptance or merge occurs for Sprint 10.1 through Sprint 10.8.",
    "The next implementation step is Sprint 10.10 on the same branch and PR. No separate founding-steward acceptance or merge occurs for Sprint 10.1 through Sprint 10.9.",
    "status next implementation",
)
status = replace_once(
    status,
    "Sprint 10.9 through Sprint 10.10 remain unstarted until entered in sequence;",
    "Sprint 10.10 remains unstarted until entered in sequence;",
    "status remaining gate",
)
status_path.write_text(status)

policy_path = Path("tools/policy/check-longitudinal-intelligence.mjs")
policy = policy_path.read_text()
policy = replace_once(
    policy,
    'const sprintTenEightPath =\n  "docs/roadmap/sprint-10.8-accessibility-platform-parity.md";',
    'const sprintTenEightPath =\n  "docs/roadmap/sprint-10.8-accessibility-platform-parity.md";\nconst sprintTenNinePath =\n  "docs/roadmap/sprint-10.9-build-release-rollback-operations-evidence.md";',
    "policy 10.9 path",
)
policy = replace_once(
    policy,
    "const sprintTenEight = await loadText(sprintTenEightPath);",
    "const sprintTenEight = await loadText(sprintTenEightPath);\nconst sprintTenNine = await loadText(sprintTenNinePath);",
    "policy 10.9 load",
)
policy_tuple = '''  [
    sprintTenNinePath,
    sprintTenNine,
    [
      "COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10",
      "issue #80",
      "draft PR #79",
      "Build provenance",
      "unsigned",
      "hosted preview",
      "Signing and distribution",
      "Provider replacement",
      "Monitoring and incident ownership",
      "Rollback",
      "Generated-state cleanup",
      "Sprint 10.10",
      "no separate founding-steward acceptance or merge gate",
    ],
  ],
'''
policy = replace_once(
    policy,
    "  [\n    currentStatusPath,",
    policy_tuple + "  [\n    currentStatusPath,",
    "policy 10.9 tuple",
)
policy = replace_once(
    policy,
    '"Sprint 10.1 through Sprint 10.8 are complete as validated internal checkpoints"',
    '"Sprint 10.1 through Sprint 10.9 are complete as validated internal checkpoints"',
    "policy status completion",
)
policy = replace_once(
    policy,
    '"Sprint 10.9 through Sprint 10.10"',
    '"Sprint 10.10"',
    "policy remaining workstream",
)
policy_path.write_text(policy)
