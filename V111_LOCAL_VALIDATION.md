# v1.11.0 Local Validation — Blog and Air Zero Article

Date: November 3, 2026. Candidate: `feature/v1.11.0-blog-air-zero-20261103`; source baseline `feff47db9626f33359672a01468c5bd46be79d5b`.

## Pre-change recovery evidence

Verified source archive, full Git-history bundle, protected 255,954-byte database export, and supplementary 264,516-byte all-table consistent snapshot (11 tables). All SHA-256 checks passed. The supplementary snapshot includes testimonials and saved text missing from the existing nine-table admin backup. It was exported inside the Railway private network through an explicitly authorized temporary SSH key; no public MySQL port was created. Backup manifest is `/home/ubuntu/backups/workshop-creative-group-prechange-v1110-20261103T164732Z/MANIFEST.md`. A restore drill was not performed.

## Application gates

`pnpm check`, `pnpm test` (54 passing tests in 12 files), `pnpm build`, and `git diff --check` passed. Sixteen new regression cases cover list/paragraph preservation, date display, visible author, article metadata/schema, script-boundary escaping, missing-article noindex, first-publication insertion, nullable fields, duplicate-column startup, and unexpected migration failures. Locked application dependencies are unchanged.

A direct comparison of the supplied DOCX text with the versioned publication content passed after only whitespace and bullet-format normalization. The 1024 × 1024 supplied photo is re-encoded at 268,478 bytes as WebP without cropping. The original attachment remains unchanged.

## Rendered checks

Playwright with Chromium `156.0.8078.4` tested the production Vite build at `http://127.0.0.1:4173`. Public API responses were controlled fixtures so no production database or private credentials were exposed to the browser. These tests verify rendering, not production database integration.

1. Blog heading/title/navigation use neutral Blog branding; old personal intro, audio promise, and fake story are absent.
2. Exactly one real featured article renders; the full-frame square image decodes at 1024 × 1024 with descriptive alt text.
3. The visible keyboard skip link moves focus to main.
4. Native keyboard article entry displays the approved headline, By Brent, fixture publication date November 3, eight paragraphs, and five native list items.
5. SPA article entry sets the article-specific canonical/title, `og:type=article`, matching author/date/schema, and indexable robots directive.
6. Blog/article have no horizontal overflow at 320, 375, 768, 1280, and 1536 CSS px (10 route-width cases).
7. Mobile navigation exposes Blog, supports Space/Enter/Escape, restores menu-button focus, and closes when selecting the current page.
8. Enlarged text spacing at 375px retains readable text and no horizontal overflow.
9. Empty data produces no invented story; a future nonfeatured fixture remains discoverable.
10. Unavailable articles show a return link/noindex; no JavaScript runtime errors occur.

Manual review caught and corrected a globally colored unclassed author paragraph, the existing shared CTA’s 320px overflow, and same-route mobile drawer dismissal. Desktop/mobile screenshots were visually reviewed for headline hierarchy, complete photo composition, content order, and readable layout.

## Automated accessibility sample

Axe-core **4.14.0**, tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`:

| Route/state | Violations | Passed rules | Incomplete |
|---|---:|---:|---|
| Blog, desktop | 0 | 22 | color-contrast: 2 nodes |
| Article, desktop | 0 | 22 | color-contrast: 4 nodes |
| Home, desktop | 0 | 22 | color-contrast: 9 nodes |
| Large Format, desktop | 0 | 21 | color-contrast: 5 nodes |
| Article, 375px with enlarged text spacing | 0 | 22 | color-contrast |

Raw JSON: `docs/evidence/v1.11.0/local-audit.json`. The reusable audit and public-only fixture are in `scripts/qa/`; Playwright and axe-core were installed in an isolated QA directory, not added to application dependencies. Incomplete results are not passes or violations; they require bounded manual review, particularly gradient/OKLCH/alpha backgrounds. This sample does not constitute a full WCAG conformance claim, legal ADA conclusion, or lawsuit-prevention guarantee. Native screen-reader testing, platform-specific social previews, Google Rich Results Test, Search Console indexing, and a restore drill were not evaluated.

## Production gate pending

The exact GitHub merge/Railway deployment must succeed, then real article data, timestamp persistence, live rendering, source HTML/canonical/schema, sitemap, media responses, keyboard/reflow, and live axe scans must be retested. The local fixture date is not evidence of the actual production publication timestamp.
