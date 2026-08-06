# Sprint 10.8 — Accessibility and platform parity

- **Status:** IMPLEMENTED — PENDING EXACT CHECKPOINT VALIDATION
- **Parent:** Sprint 10 — universal game shell
- **Tracker:** issue #80
- **Implementation:** draft PR #79

## Decision

Establish one text-first, materially equivalent essential path across browser, iOS, and Android with executable modality, contrast, reflow, and direct-path parity evidence.

## Required modalities

The platform matrix covers:

- keyboard;
- screen reader;
- touch;
- switch access;
- text scaling;
- reflow;
- contrast;
- orientation;
- reduced motion;
- reduced data;
- low bandwidth;
- audio-to-text alternatives;
- haptic alternatives; and
- gesture alternatives.

Essential information uses semantic headings, lists, summaries, alerts, labels, hints, and live-region text. Interactive controls use standard links or buttons with at least 44 logical pixels of height. No essential action depends on animation, audio, haptics, swipe, drag, pinch, long press, multi-touch, a successful write, or a network request.

## Platform parity

Browser, iOS, and Android use the same bundled public content, deterministic rules, direct path, authority ceiling, and account boundary.

Platform assistive technologies remain adapters. Browser screen readers, VoiceOver, TalkBack, Switch Control, Switch Access, hardware keyboards, device orientation, scaling, and focus behavior still require independent testing.

## Contrast and reflow

Named text foreground/background pairs meet at least 4.5:1. The coral text token is darkened to preserve normal-text contrast on paper and parchment surfaces.

Pages use scroll containers, flexible bases, wrapping rows, compact-width title treatment, and no fixed-height essential text containers. No route is locked to portrait or landscape.

## Direct-path parity

Narrative and direct routes retain the same essential concepts:

- no-account public entry;
- the authority boundary;
- meaningful refusal;
- future account capability remains inactive; and
- temporary state is discarded by default.

Choosing the direct path cannot change access, authority, completion, rewards, preference, or progress.

## Residual limitations

The implementation is maintainer source and CI evidence, not independent accessibility certification. Independent assistive-technology, browser, mobile-device, orientation, external-keyboard, switch-access, affected-user comprehension, security, privacy, legal, and field evidence remains open.

Accessibility preferences are not persisted in Sprint 10. Audio and haptic experiences are not implemented because text is the complete primary path.

## Holdpoints preserved

Sprint 10.8 does not authorize claims of WCAG conformance, independent certification, production authentication, private Chronicle operation, analytics, provider egress, deployment, indexing, store distribution, Sprint 11, LI-V1 through LI-V8, or institutional Phase 0 exit.

## Validation target

The exact implementation checkpoint must pass modality coverage, platform matrix, contrast, reflow, direct-path parity, motion/audio/haptic/gesture absence, focused tests, the complete permanent repository suite, existing production-site validation, browser/iOS/Android credential-free export, cleanup, and no tracked build mutation.

## Sprint-level gate

This workstream is an internal Sprint 10 checkpoint in the single draft PR #79. It creates no separate founding-steward acceptance or merge gate. After exact validation is recorded, the next implementation step is Sprint 10.9 on the same branch and PR.
