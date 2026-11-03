# Two-Column Blog Listing — Production Validation

**November 3, 2026. Application v1.12.0; final evidence v1.12.1.**

## Completed request

The [Blog listing](https://www.workshopcreativegroup.com/blog) now places the photo on the left and the title, publication date, excerpt and Read Article link on the right at 768 CSS px and wider. The photo occupies the smaller two-fifths column, so the headline is visible alongside it rather than below a full-width image. Below 768px, photo and text stack in document order.

The same layout applies to featured and future regular cards. Photos remain uncropped; cards without cover photos have no empty image column. The [full Air Zero article](https://www.workshopcreativegroup.com/blog/how-air-zero-turns-yard-signs-into-neighborhood-marketing) is unchanged, with the approved headline, By Brent, November 3 date, all eight paragraphs/five benefit items, and full-frame photo. Stored article identity, author, publication and update timestamps remain identical to the initial publication (`2026-11-03T17:20:26.000Z`).

## Release and backup evidence

Feature branch `feature/v1.12.0-two-column-blog-20261103` merged in [PR #28](https://github.com/srinagubandi/workshop-creative-group/pull/28) at `8cb37bb976dff0fb0a8a62ac4b7ca47f67461d40`. Railway deployment `a07d2dd8-4183-442a-bd4a-52792f7b691d` reached **SUCCESS** on November 3. Only the listing renderer and package version changed application behavior; no article renderer/text/database migrations changed.

Fresh source archive, full Git-history bundle and complete consistent all-11-table database snapshot (266,883 bytes) were SHA-256 verified before layout edits. Manifest: `/home/ubuntu/backups/workshop-creative-group-prechange-v1120-20261103T173310Z/MANIFEST.md`. The explicitly authorized task-specific SSH key was removed and local key material erased. Existing keys were preserved; no public database port was created. Private database exports and credentials are not committed or included in public evidence. No restore drill was performed.

## Local gates

TypeScript, 58 regression tests, production build and whitespace checks pass. Full fixture-based browser checks retained existing Blog/article content, native keyboard navigation, visible skip/main focus, responsive reflow, metadata transitions, missing-article behavior, and five sampled accessibility checks. Seven targeted geometry cases cover featured cards at five widths plus regular fixtures on mobile/desktop; no-photo fallback passes. `BlogPost.tsx` and approved article source have no diff.

## Live gates

Actual public APIs were used; no live fixture substitution or form submission occurred.

| Check | Outcome |
|---|---|
| Featured card at 320/375px | Photo above title; no horizontal overflow |
| Featured card at 768/1280/1536px | Photo left of title; vertical overlap; image width under 45% of card |
| Photo composition | Loaded, uncropped, square aspect ratio |
| Blog/article reflow at five widths | All 10 cases pass |
| Keyboard skip/article entry and mobile drawer | Pass, including Escape/focus return/current-page dismissal |
| Enlarged text spacing, 375px article | Readable and overflow-free |
| Runtime JavaScript errors | None |
| Article identity/byline/publication/update date | Unchanged |
| Initial Blog/article HTML on Railway and canonical www origin | Correct title, canonical, article type and truthful schema |
| Sitemap and missing record | Blog/article included; missing article HTTP 404/noindex |
| Article photo integrity | HTTP 200, committed SHA-256 match, 268,478 bytes |
| Managed media census | 130/130 HTTP 200, including 30 Home logos |

Playwright Chromium `156.0.8078.4`; axe-core `4.14.0`, WCAG 2.0/2.1/2.2 A/AA tags. Blog, article, Home, Large Format desktop scans and enlarged-spacing mobile article scan all found **0 violations**. Contrast incomplete nodes remain 2/4/9/5 respectively on the desktop samples, plus color-contrast incomplete on the mobile state. These are separately tracked manual-review limitations, not automatic passes.

Raw evidence: `docs/evidence/v1.12.0/live-listing-layout.json`, `live-audit.json`, `live-http-audit.json` and `application-deployment.json`. Desktop/mobile screenshots were visually reviewed for title visibility, photo composition and stacking.

## Boundaries

This is a scoped release test, not a full-site WCAG conformance or legal ADA/litigation guarantee. Native screen-reader/platform-specific sharing/indexing checks and a restore drill were not performed. Earlier publication detail and unrelated follow-up observations remain in `V111_POSTDEPLOY_VALIDATION.md`; this listing release did not change DNS, infrastructure formats, database-backup tooling or add a complete authoring dashboard.
