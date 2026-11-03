# v1.12.0 — Two-Column Blog Listing Local Validation

November 3, 2026. Branch: `feature/v1.12.0-two-column-blog-20261103`; baseline main `6ab59b2e3561f0757285f5d29799aa552d6b0505`.

The owner approved listing cards only: photo left and title/excerpt right at larger widths, stacked on mobile. Featured and regular cards use a conditional 2:3 grid at 768px+, intrinsic uncropped photos, and a wrapping text column. Cards without cover photos remain a single block. The full article renderer and approved article source have no diff; author/date/content are unchanged.

Fresh source archive/full Git bundle and complete consistent 11-table database snapshot (266,883 bytes) verified before edits. SHA-256 checks passed; temporary SSH removed. Manifest: `/home/ubuntu/backups/workshop-creative-group-prechange-v1120-20261103T173310Z/MANIFEST.md`.

TypeScript, 58 regression tests, production build and whitespace checks pass. The complete local Blog/article/Home/Large Format browser audit repeats keyboard, reflow, metadata transitions, semantic content, missing-record and five sampled axe checks with 0 violations. API fixtures are used locally; production retest remains required. Contrast incomplete items retain prior manual-review limitations.

A dedicated card-geometry script verified featured cards at 320, 375, 768, 1280 and 1536 CSS px, plus regular-card fixtures at 375/1280 (7 cases). At 768px+ the photo is left of the headline, headline overlaps the photo's vertical span, and photo width is under 45% of the card; below 768px photo precedes title vertically. Every displayed photo retains its square aspect ratio and all cases are overflow-free. A no-photo fixture produces no image or blank grid column. Desktop/mobile screenshots were reviewed to confirm the title is immediately visible without scrolling past a giant image.

Raw evidence: `docs/evidence/v1.12.0/local-audit.json` and `local-listing-layout.json`; reusable geometry script in `scripts/qa/two-column-layout.mjs`. This is a scoped rendering evaluation, not a legal ADA or full WCAG conformance guarantee. Native screen-reader testing and a restore drill were not performed.
