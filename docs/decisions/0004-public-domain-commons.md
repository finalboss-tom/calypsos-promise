# Decision 0004 — Public-Domain Commons and Canonical Provenance

- **Status:** Accepted
- **Date:** 2026-07-24
- **Owners:** Founding steward
- **Affected frozen components:** Product Constitution, World and Lore Canon, Vision and Institutional Mandate, governance and licensing direction
- **Related issues or pull requests:** To be linked when opened

## Context

Calypso’s Promise was deliberately built from the Odyssey and related ancient mythology because the source material is part of humanity’s shared cultural inheritance. The project is also intended to become a public-domain inheritance rather than a body of intellectual property controlled indefinitely by a founder, company, foundation, or future governing majority.

The repository did not yet encode that commitment consistently. Decision 0002 proposed AGPL-3.0-or-later for software, and `TRADEMARKS.md` proposed broad reserved identity rights. Those approaches protected reciprocity and official status, but they conflict with the founding steward’s explicit direction that the project itself is public domain.

The contradiction affects the campaign narrative, contributor expectations, governance, fork rights, institutional asset treatment, and the meaning of the Covenant of the Commons.

## Source basis

- Founding-steward direction that Calypso’s Promise is a public-domain project
- `docs/frozen/world-and-lore-canon.md`, especially the Covenant of the Commons
- `docs/frozen/product-constitution.md`, especially private-by-default rights and evidence before expansion
- `VISION.md`, especially founder independence and the hundred-year objective
- Creative Commons guidance distinguishing CC0, which can legally dedicate a rights holder’s work, from the Public Domain Mark, which only labels works already free of known copyright restrictions
- Creative Commons guidance that CC0 may be used for software but does not address patent rights and is not OSI-approved
- Open Source Initiative approval of the Unlicense as a public-domain software dedication with a fallback permission

External sources inform legal implementation but do not replace qualified counsel.

## Decision

### 1. Public-domain status is an institutional constraint

Calypso’s Promise will dedicate original project materials to the public domain to the fullest extent permitted by law. Where a complete waiver is ineffective, the selected instrument must provide a broad, unconditional, irrevocable fallback permission consistent with public-domain use.

The institution may not later revoke permissions already granted or convert the shared foundations into exclusive private property.

### 2. The commitment applies across project surfaces

The direction covers original:

- software
- specifications, schemas, ontologies, and protocols
- documentation and governance materials
- Ogygia lore, characters, quests, dialogue, and educational content
- visual and interaction designs
- synthetic fixtures and demonstrations
- public campaign and website materials
- public-good methods and infrastructure where no separate obligation requires another treatment

The final legal implementation may use more than one instrument when necessary to achieve the same practical public-domain outcome across software and non-software works.

### 3. Personal information is constitutionally excluded

Personal health data, user content, account information, consent records, access receipts, credentials, private correspondence, and production telemetry are not public-domain assets.

Open code and public-domain lore do not create any right to a person’s information.

### 4. Third-party rights are excluded

The project cannot dedicate material it does not control. Dependencies, standards, data sets, publications, fonts, images, music, film material, and other third-party works retain their actual terms and notices.

Ancient source material already in the public domain should be accurately identified rather than presented as newly dedicated by Calypso’s Promise.

### 5. Canonical status is provenance, not ownership

The project may identify canonical repositories, releases, websites, operators, and governance records. Canonical status means that an artifact came through a documented source and review process.

Forks and adaptations do not require permission. They may not truthfully claim safety, privacy, clinical, governance, or release approval they did not receive.

Canonical trust should be supported through signed releases, checksums, manifests, transparent operators, review evidence, incident records, and reproducible processes rather than broad copyright or trademark enclosure.

### 6. The AGPL baseline is retired

Decision 0002 is superseded. AGPL reciprocity uses copyright conditions to require publication of network-service modifications. That protection is incompatible with the decision to permit unrestricted public-domain reuse, including proprietary and commercial derivatives.

The risk of enclosure by downstream actors is accepted and must be answered through product quality, interoperability, provenance, institutional legitimacy, transparent criticism, and public-domain competition.

### 7. The broad reserved-trademark proposal is withdrawn

The current `TRADEMARKS.md` proposal is withdrawn as a project policy. No broad identity reservation may be treated as accepted merely because it was previously drafted.

Qualified review may later recommend a narrow certification, safety, or provenance mechanism. Any such mechanism must:

- protect truthful origin or verified review claims rather than ownership of the world
- permit forks, adaptations, commentary, parody, scholarship, and commercial reuse
- avoid converting the public-domain commitment into de facto brand enclosure
- include governance, appeal, sunset, and anti-capture controls

### 8. Contribution workflow must include dedication

The DCO alone does not create a public-domain dedication. Before accepting external contributions at scale, the repository must adopt an explicit contributor certification or agreement that validly applies the selected dedication to submitted work.

The workflow must remain understandable and must not silently capture rights beyond the public-domain commitment.

### 9. Legal completion must be truthful

Until a canonical legal instrument, notices, contribution process, and authorship audit are complete, public materials may state that Calypso’s Promise is constitutionally a public-domain project and is formalizing the legal dedication.

They must not falsely state that every current file is already free of every possible copyright, patent, privacy, contract, publicity, or third-party restriction worldwide.

## Consequences

### Benefits

- Aligns legal direction with the project’s origin and founder’s intent
- Creates a coherent connection between public-domain mythology and public-domain institutional infrastructure
- Permits unrestricted forks, translations, adaptations, research, education, and commercial implementation
- Reduces the possibility that a future institution or acquirer can monopolize foundational project assets
- Strengthens founder independence by making permission structurally unnecessary
- Makes the campaign’s commons narrative authentic rather than metaphorical

### Costs and tradeoffs

- Downstream actors may create closed, proprietary, or extractive derivatives
- The canonical project cannot compel publication of improvements through copyright
- Attribution may be requested as a norm but cannot be a condition of public-domain reuse
- Brand confusion and impersonation risks require provenance and truthful-claims controls
- Patent issues may require a separate solution
- Existing and future contributions require a careful rights audit and explicit dedication process
- Some funders and partners may prefer exclusivity that the project cannot offer

### Risks

- Overstating legal completion before migration is finished
- Accidentally including third-party material in a dedication notice
- Confusing public-domain software with public personal data
- Unsafe forks implying canonical review or endorsement
- Future governance recreating exclusivity through certification, domains, hosting, or access control
- Commercial capture of community attention even when the underlying work remains free

## Alternatives considered

### AGPL-3.0-or-later

Would require hosted modifications to remain available but relies on enforceable copyright restrictions. Rejected because the founder’s chosen end state is unrestricted public-domain use.

### Permissive software license plus Creative Commons content license

Would permit broad reuse while retaining copyright and often attribution requirements. Rejected as the primary direction because it does not fully express the public-domain commitment.

### Public-domain content with reserved software and brand

Would protect the official implementation but split the philosophical commitment at the most consequential layer. Rejected.

### Public Domain Mark alone

Rejected for new project works because the mark does not legally change their status.

### Broad trademark reservation

Could reduce impersonation but would preserve an exclusive control surface over a project intended to belong to everyone. Rejected as the default. Narrow provenance or certification controls remain open to review.

## Validation or review required

Before declaring the legal migration complete:

- qualified copyright, open-source, patent, trademark, privacy, and nonprofit counsel review
- complete repository authorship and third-party-material audit
- selection of software and non-software dedication instruments
- canonical license and notice files
- updated DCO and contributor-dedication workflow
- machine-readable metadata and file-level exceptions
- dependency and asset notices
- public migration report
- confirmation that website and campaign language match actual status

## Migration and rollback

### Migration

1. Publish `PUBLIC_DOMAIN.md`.
2. Mark Decision 0002 superseded.
3. Withdraw the broad trademark proposal.
4. Select legal instruments and add canonical files.
5. Update contributor certification and PR templates.
6. Audit and mark existing materials.
7. Add signed provenance and release-manifest practices.
8. Publish a legal-completion report.

### Rollback

The public-domain institutional constraint is frozen. Implementation details may change if a legal instrument is ineffective or creates unforeseen harm, but rollback may not replace the commons direction with ordinary proprietary ownership or copyright-based reciprocity without a new constitutional decision and explicit founding-steward approval while that role remains active.

## Freeze impact

This establishes a new frozen institutional constraint and clarifies the Covenant of the Commons. It changes the prior proposed licensing and identity baselines and requires corresponding repository migration.
