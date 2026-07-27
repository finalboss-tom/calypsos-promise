# Why Calypso’s Promise Is Consumer-First

[Website home](README.md) · [Information architecture](information-architecture.md) · [Decision 0010](../decisions/0010-consumer-first-provider-independent-boundary.md) · [Architecture rationale](../architecture/consumer-first-provider-independent-boundary.md) · [Current status](../roadmap/current-status.md)

- **Status:** PROPOSED WEBSITE CONTENT BASELINE
- **Capability status:** explanation only; no provider, EHR, connector, clinical, research, or enterprise runtime
- **Tracking issue:** [#41](https://github.com/finalboss-tom/calypsos-promise/issues/41)

## Purpose

The public website should explain why Calypso’s Promise begins with the person without suggesting that clinicians, health systems, EHR vendors, payers, laboratories, pharmacies, devices, or interoperability standards are unimportant.

The explanation belongs in direct language within `/what-is-calypso`, `/how-it-works`, or a dedicated `/why-consumer-first` route. A visitor must not need to understand Ogygia lore to find it.

## Approved central statement

> Your health story does not begin and end with one clinic, device, insurer, application, or medical record. Calypso’s Promise begins with you because you are the only person present across the whole journey.

Supporting explanation:

> Hospitals, clinicians, laboratories, pharmacies, payers, devices, and electronic health records can hold important parts of that story. Calypso’s Promise is designed to connect with those sources over time while keeping your Living Chronicle understandable, portable, and under your control.

> The project is not trying to replace medical care or declare that healthcare has no standards. It treats standards and institutional systems as essential ways to exchange information—not as automatic owners of your complete longitudinal record or your choices.

## Required concepts

The public explanation should communicate:

- the person is the continuity layer across providers, technologies, and life stages;
- clinical records are important sources with their own context and authority;
- the Living Chronicle also preserves life between encounters, personal goals, observations, corrections, provenance, and uncertainty;
- healthcare has substantial standards, but implementation, versions, profiles, local variation, and incomplete records still matter;
- external information is mapped through inspectable adapters rather than silently becoming unquestioned truth;
- the first product must provide value without requiring a clinic, employer, payer, researcher, sponsor, or EHR vendor to enroll the person;
- future provider and institutional collaboration remains planned and gated;
- standards support does not mean a connector is live; and
- funding or sponsorship cannot buy provider placement, connector rank, product authority, private access, or favorable findings.

## Historical framing

Permitted:

- Google Health was a consumer personal health record that Google discontinued after limited use did not become widespread daily participation.
- Microsoft HealthVault was also a consumer personal health record and faced adoption and ecosystem challenges.
- Microsoft Amalga and the GE–Microsoft Caradigm venture pursued enterprise integration across care-delivery silos.
- These histories show that storage, standards, integration, and distribution are not enough without sustained usefulness, trust, workflow fit, and governance.

Not permitted:

- “Google and Microsoft proved consumer health records cannot work.”
- “Microsoft failed at B2B healthcare.”
- “Healthcare has no standards.”
- “Providers do not want interoperability.”
- “Clinicians and EHRs are the enemy.”
- “Calypso’s Promise replaces your doctor or medical record.”
- “FHIR makes every health record the same.”

## Suggested page structure

### 1. The continuity problem

Explain that records are divided across institutions, devices, documents, memories, and periods without care.

### 2. Why begin with the person

Explain that the person persists across every transition and can receive value from a coherent account even when institutions do not integrate with one another.

### 3. What providers contribute

Acknowledge clinical expertise, diagnoses, laboratory results, medications, imaging, procedures, and other institutional evidence. Explain that source identity and context remain visible.

### 4. How interoperability works

Use a simple diagram or accessible text equivalent:

```text
Provider / EHR ─┐
Laboratory ─────┤
Pharmacy ───────┤
Device ─────────┤── versioned adapters and provenance ── Living Chronicle
Documents ──────┤
Person input ───┘
```

Clarify that this is a planned architecture, not current production exchange.

### 5. What funding cannot buy

Link to the support and funding transparency surface. State that sponsors cannot purchase connector priority, preferred-provider status, private data, roadmap authority, health placement, or control of findings.

### 6. Current status and future partnership

Link to current status, Sprint 14, Decision 0010, the architecture rationale, and the future partnership workstream.

## Status language

Use:

- **PLANNED** for standards mappings, connectors, provider summaries, and enterprise collaboration before implementation;
- **EXPERIMENTAL** only after a bounded implementation is released under accepted controls;
- **LIVE** only with production evidence, named responsibility, security and privacy controls, specialist review status, and current limitations; and
- **DEFERRED** when the capability is intentionally not on the active release path.

A documentation page is not evidence that a connector exists.

## Funding and recognition treatment

A provider, EHR vendor, payer, laboratory, device company, health information network, cloud provider, or integration company may appear on a funding record when support is accepted under Decision 0008.

The website must keep recognition separate from:

- health recommendations;
- provider directories or rankings;
- connector defaults or setup order;
- permission and consent flows;
- research eligibility;
- safety or clinical claims;
- standards certification;
- current capability status; and
- evaluation findings.

A logo is attribution, not endorsement or authority.

## Accessibility and trust

The explanation must:

- be available in plain language;
- have direct-mode parity with any visual or narrative treatment;
- provide text alternatives to diagrams;
- distinguish source fact, historical evidence, project inference, product hypothesis, and capability status;
- avoid blame or adversarial framing;
- explain uncertainty and known limitations; and
- link to correction and challenge routes.

## Acceptance criteria

- a visitor can explain why the product is consumer-first without concluding that it is anti-provider;
- standards are described accurately as valuable and evolving;
- external systems are described as sources, destinations, and possible partners rather than Chronicle owners;
- the person can receive core value without enterprise enrollment;
- no unavailable connector or clinical capability appears live;
- historical cases are described within their evidence;
- funding and sponsorship cannot purchase placement, authority, or findings; and
- every material claim links to a canonical source, current status, or correction route.
