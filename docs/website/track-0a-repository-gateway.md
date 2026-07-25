# Website Track 0A — Repository Gateway

**Status:** ACCEPTED IMPLEMENTATION SLICE  
**Date:** 2026-07-25

## Purpose

Create the smallest credible public site that preserves the approved cinematic Ogygia direction, explains the planned game truthfully, routes visitors into the public repository, and collects purpose-limited email interest through a private adapter.

This slice is authorized before the full Sprint 8 website foundation. It must survive into that later architecture rather than become a disconnected microsite.

## Included

- responsive repository gateway in `apps/site`
- cinematic Ogygia hero and repository CTA
- truthful planned-game explanation
- Living Chronicle game loop
- Aster’s frozen proposal-and-confirmation boundary
- canonical zone names and direct functions
- Promise and current-status summaries with source links
- Founding Expedition signup with explicit consent and no health information
- separate signup privacy notice
- provider-agnostic private webhook boundary
- tests for static delivery, required copy, validation, privacy-safe failure, and provider forwarding

## Explicit non-scope

- accounts or sign-in
- real health-data processing
- private Chronicle storage
- production AI interaction
- research enrollment
- compensated opportunities or marketplaces
- governance voting
- donations
- immersive island map interaction
- fictional prologue represented as complete
- analytics or advertising systems
- hosting-vendor selection

## Visual implementation rule

Approved concept imagery may be cropped and composited as decorative assets. Essential information, capability status, navigation, controls, and form behavior must remain live semantic HTML. The public page may not be shipped as one flattened screenshot.

## Email boundary

The site accepts only email plus explicit consent. It does not persist submissions locally. A same-origin endpoint validates and forwards signups to an approved private HTTPS webhook. When that endpoint is absent, the form fails closed and stores nothing.

Production signup remains blocked until provider selection, retention, unsubscribe, correction, and deletion behavior are published.

## Acceptance

- the repository CTA is visible in the top-right header and hero
- planned capabilities are labeled rather than presented as live
- Aster’s constraints match the frozen architecture
- canonical zone names replace exploratory names
- no personal health information is requested
- no signup enters GitHub or a public ledger
- keyboard, reduced-motion, responsive, and direct-information paths exist
- site build, lint, typecheck, tests, and repository checks pass
