from pathlib import Path

CHECKPOINT = "c04161860eed4ab6ecf55d4c48c0f9a363a4e058"
CI = "1480"
DCO = "1582"


def replace_once(path: str, old: str, new: str, label: str) -> None:
    target = Path(path)
    source = target.read_text()
    count = source.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected exactly one match, found {count}")
    target.write_text(source.replace(old, new, 1))


for path in [
    "docs/roadmap/sprint-10.7-authentication-after-prologue-boundary.md",
    "docs/roadmap/sprint-10.8-accessibility-platform-parity.md",
]:
    replace_once(
        path,
        "- **Status:** IMPLEMENTED — PENDING EXACT CHECKPOINT VALIDATION",
        "- **Status:** COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10",
        f"{path} status",
    )

record_107 = "docs/roadmap/sprint-10.7-authentication-after-prologue-boundary.md"
replace_once(
    record_107,
    "## Sprint-level gate\n\nThis workstream is an internal Sprint 10 checkpoint in the single draft PR #79. It creates no separate founding-steward acceptance or merge gate. After exact validation is recorded, the next implementation step is Sprint 10.8 on the same branch and PR.\n",
    f"""## Validated checkpoint

Exact clean implementation checkpoint: `{CHECKPOINT}`

- CI {CI}: success
- DCO {DCO}: success
- focused authentication-boundary validation: success
- public no-account completion and post-presentation offer ordering: success
- discard-by-default, no-silent-transfer, and seven-requirement future-review tests: success
- known and unknown authentication-authority claims fail closed: success
- complete permanent repository suite: success
- existing production-site validation: success
- browser, iOS, and Android credential-free Expo export: success
- generated-state cleanup and no tracked build mutation: success
- temporary implementation and repair transport: removed before clean checkpoint validation

The prior 10.7 completion report had not landed durable implementation or status evidence. This checkpoint repairs that handoff explicitly. Sprint 10.7 and Sprint 10.8 share one atomic clean checkpoint because 10.7 was restored as the required predecessor before 10.8 was validated; no workstream sequence or authority gate was skipped.

This is maintainer source and CI evidence. It is not production authentication readiness, identity-provider selection, account-security qualification, independent accessibility, security, privacy, legal, affected-user, device, field, or operations certification.

## Sprint-level gate

This workstream is an internal Sprint 10 checkpoint in the single draft PR #79. It creates no separate founding-steward acceptance or merge gate. Sprint 10.8 is complete at the same repaired atomic checkpoint; the next implementation step is Sprint 10.9 on the same branch and PR.
""",
    "10.7 validation record",
)

record_108 = "docs/roadmap/sprint-10.8-accessibility-platform-parity.md"
replace_once(
    record_108,
    "## Sprint-level gate\n\nThis workstream is an internal Sprint 10 checkpoint in the single draft PR #79. It creates no separate founding-steward acceptance or merge gate. After exact validation is recorded, the next implementation step is Sprint 10.9 on the same branch and PR.\n",
    f"""## Validated checkpoint

Exact clean implementation checkpoint: `{CHECKPOINT}`

- CI {CI}: success
- DCO {DCO}: success
- focused accessibility and platform-parity validation: success
- fourteen required modality classes across browser, iOS, and Android: success
- named normal-text contrast pairs at or above 4.5:1: success
- responsive scaling, wrapping, compact-width title, scroll, and reflow contracts: success
- direct and narrative essential-concept parity: success
- no essential animation, audio, haptic, gesture-only, storage-write, or network dependency: success
- residual independent-testing limitations remain explicit: success
- complete permanent repository suite: success
- existing production-site validation: success
- browser, iOS, and Android credential-free Expo export: success
- generated-state cleanup and no tracked build mutation: success
- temporary implementation and repair transport: removed before clean checkpoint validation

Sprint 10.8 shares this atomic clean checkpoint with the repaired 10.7 predecessor. The checkpoint proves source, deterministic-contract, CI, and unsigned-export parity only. It does not establish WCAG conformance, independent certification, affected-user comprehension, assistive-technology field performance, device support, or release authorization.

## Sprint-level gate

This workstream is an internal Sprint 10 checkpoint in the single draft PR #79. It creates no separate founding-steward acceptance or merge gate. The next implementation step is Sprint 10.9 on the same branch and PR.
""",
    "10.8 validation record",
)

status = "docs/roadmap/current-status.md"
replace_once(
    status,
    "· [Sprint 10.6 offline resilience](sprint-10.6-offline-resilience-behavior.md) · [Sprint 9 completion]",
    "· [Sprint 10.6 offline resilience](sprint-10.6-offline-resilience-behavior.md) · [Sprint 10.7 authentication boundary](sprint-10.7-authentication-after-prologue-boundary.md) · [Sprint 10.8 accessibility parity](sprint-10.8-accessibility-platform-parity.md) · [Sprint 9 completion]",
    "current status navigation",
)
replace_once(
    status,
    "- **Sprint 10.1 through Sprint 10.6 are complete as validated internal checkpoints.**",
    "- **Sprint 10.1 through Sprint 10.8 are complete as validated internal checkpoints.**",
    "status completed range",
)
replace_once(
    status,
    "- **Sprint 10.6 checkpoint:** `b792a88bdff49283a304fe0f6939306c18cdd049` — CI 1461 / DCO 1561.\n- **PR #79 remains draft",
    f"- **Sprint 10.6 checkpoint:** `b792a88bdff49283a304fe0f6939306c18cdd049` — CI 1461 / DCO 1561.\n- **Sprint 10.7 repaired checkpoint:** `{CHECKPOINT}` — CI {CI} / DCO {DCO}.\n- **Sprint 10.8 checkpoint:** `{CHECKPOINT}` — CI {CI} / DCO {DCO}.\n- **PR #79 remains draft",
    "status checkpoint summary",
)
replace_once(
    status,
    "- **Sprint 10.7 through Sprint 10.10:** not started.",
    "- **Sprint 10.9 through Sprint 10.10:** not started.",
    "status unstarted range",
)
replace_once(
    status,
    "Workstreams 10.1 through 10.6 are complete as validated internal checkpoints; no later workstream, provider choice, deployment, indexing change, store submission, or Sprint 11 work has begun.",
    "Workstreams 10.1 through 10.8 are complete as validated internal checkpoints. Workstream 10.7 was repaired because its prior reported completion had not landed durable implementation. No provider choice, deployment, indexing change, store submission, or Sprint 11 work has begun.",
    "accepted authorization status",
)

insert_anchor = "## Sprint 10 pull-request model\n"
sections = f"""## Sprint 10.7 validated checkpoint

Workstream 10.7 establishes the authentication-after-prologue explanation boundary only:

- the public synthetic experience remains completable without an account;
- the future-account explanation appears only after the public presentation route;
- no identity provider, account, credential, token, recovery flow, or production session is present;
- temporary and synthetic state is discarded by default and never transfers silently;
- any future transfer candidate requires explicit disclosure, review, player confirmation, provenance, purpose, correction, and deletion behavior;
- even a complete seven-requirement review creates no transfer authority in Sprint 10; and
- authentication cannot convert public presentation, dialogue choices, First Lantern or Aster framing, offline state, refusal, direct-path selection, or unknown client claims into Chronicle evidence, permission, progression, completion, rewards, personal progress, health truth, authentic preference, or Longitudinal Intelligence.

The exact clean checkpoint is `{CHECKPOINT}` with CI {CI} and DCO {DCO}. The prior reported 10.7 completion had not landed durable implementation; this checkpoint repairs the predecessor explicitly before recording 10.8. This is maintainer source and CI evidence, not production authentication readiness or independent specialist certification.

## Sprint 10.8 validated checkpoint

Workstream 10.8 establishes accessibility and platform-parity source and CI evidence only:

- browser, iOS, and Android expose the same bundled essential content, deterministic rules, direct path, authority ceiling, and account boundary;
- the executable matrix covers keyboard, screen reader, touch, switch access, scaling, reflow, contrast, orientation, reduced motion, reduced data, low bandwidth, audio-to-text alternatives, haptic alternatives, and gesture alternatives;
- semantic headings, lists, summaries, alerts, labels, hints, live-region text, and standard buttons or links keep essential actions inspectable;
- named normal-text contrast pairs meet at least 4.5:1;
- scroll containers, flexible bases, wrapping rows, compact-width title treatment, and non-fixed-height essential text support reflow;
- narrative and direct routes retain no-account entry, authority, refusal, inactive-account, and discard-by-default concepts without changing access or progress; and
- no essential action depends on animation, audio, haptics, swipe, drag, pinch, long press, multi-touch, successful storage, or a network request.

The exact clean checkpoint is `{CHECKPOINT}` with CI {CI} and DCO {DCO}. Independent browser, assistive-technology, VoiceOver, TalkBack, switch-access, external-keyboard, orientation, scaling, affected-user, device, security, privacy, legal, and field evidence remains open. This is not a WCAG conformance or independent accessibility certification claim.

"""
replace_once(status, insert_anchor, sections + insert_anchor, "status 10.7/10.8 sections")
replace_once(
    status,
    "LI-V0 is complete, Sprint 10 is active under issue #80, and Sprint 10.1 through Sprint 10.6 are complete as validated internal checkpoints.",
    "LI-V0 is complete, Sprint 10 is active under issue #80, and Sprint 10.1 through Sprint 10.8 are complete as validated internal checkpoints.",
    "current next decision completed range",
)
replace_once(
    status,
    "The next implementation step is Sprint 10.7 on the same branch and PR. No separate founding-steward acceptance or merge occurs for Sprint 10.1 through Sprint 10.6.",
    "The next implementation step is Sprint 10.9 on the same branch and PR. No separate founding-steward acceptance or merge occurs for Sprint 10.1 through Sprint 10.8.",
    "current next decision step",
)
replace_once(
    status,
    "- Sprint 10.7 through Sprint 10.10 remain unstarted until entered in sequence;",
    "- Sprint 10.9 through Sprint 10.10 remain unstarted until entered in sequence;",
    "current next decision unstarted range",
)

policy = "tools/policy/check-longitudinal-intelligence.mjs"
replace_once(
    policy,
    'const sprintTenSixPath =\n  "docs/roadmap/sprint-10.6-offline-resilience-behavior.md";\nconst currentStatusPath',
    'const sprintTenSixPath =\n  "docs/roadmap/sprint-10.6-offline-resilience-behavior.md";\nconst sprintTenSevenPath =\n  "docs/roadmap/sprint-10.7-authentication-after-prologue-boundary.md";\nconst sprintTenEightPath =\n  "docs/roadmap/sprint-10.8-accessibility-platform-parity.md";\nconst currentStatusPath',
    "policy paths",
)
replace_once(
    policy,
    "const sprintTenSix = await loadText(sprintTenSixPath);\nconst currentStatus",
    "const sprintTenSix = await loadText(sprintTenSixPath);\nconst sprintTenSeven = await loadText(sprintTenSevenPath);\nconst sprintTenEight = await loadText(sprintTenEightPath);\nconst currentStatus",
    "policy loads",
)
policy_anchor = "  [\n    currentStatusPath,\n    currentStatus,\n"
policy_blocks = """  [
    sprintTenSevenPath,
    sprintTenSeven,
    [
      "COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10",
      "issue #80",
      "draft PR #79",
      "discard",
      "silently",
      "disclosure",
      "review",
      "player confirmation",
      "provenance",
      "purpose",
      "correction",
      "deletion",
      "no identity provider",
      "Sprint 10.8",
      "no separate founding-steward acceptance or merge gate",
    ],
  ],
  [
    sprintTenEightPath,
    sprintTenEight,
    [
      "COMPLETE AND VALIDATED WITHIN ACTIVE SPRINT 10",
      "issue #80",
      "draft PR #79",
      "browser",
      "iOS",
      "Android",
      "keyboard",
      "screen reader",
      "switch access",
      "reduced motion",
      "low bandwidth",
      "Direct-path parity",
      "Residual limitations",
      "Sprint 10.9",
      "no separate founding-steward acceptance or merge gate",
    ],
  ],
"""
replace_once(policy, policy_anchor, policy_blocks + policy_anchor, "policy 10.7/10.8 requirements")
replace_once(
    policy,
    '"Sprint 10.1 through Sprint 10.6 are complete as validated internal checkpoints",',
    '"Sprint 10.1 through Sprint 10.8 are complete as validated internal checkpoints",',
    "policy current status completed range",
)
replace_once(
    policy,
    '"Sprint 10.7 through Sprint 10.10",',
    '"Sprint 10.9 through Sprint 10.10",',
    "policy current status unstarted range",
)
