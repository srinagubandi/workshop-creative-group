# Blog Release — Production Validation

**Verified November 3, 2026. Application v1.11.1; documentation evidence v1.11.2.**

## Published content

[Blog](https://www.workshopcreativegroup.com/blog) now appears in navigation and the Company footer. All active section branding uses **Blog**; the old Brent’s Blog introduction, voice/audio placeholder, and fictitious featured story have been removed.

[How Air Zero Turns Yard Signs into Neighborhood Marketing](https://www.workshopcreativegroup.com/blog/how-air-zero-turns-yard-signs-into-neighborhood-marketing) is published **By Brent**, dated **November 3, 2026**. The body matches the supplied DOCX after whitespace/list formatting only, without substantive rewrites. All eight paragraphs and the five benefit items remain. The supplied full-frame photo is delivered as a 1024 × 1024 optimized WebP with descriptive alt text.

The first real database publication timestamp is `2026-11-03T17:20:26.000Z`. Its ID, content, author, timestamp and update timestamp were unchanged after corrective redeployment, confirming that unique-slug insertion does not overwrite later data or reset publication dates. Future articles can use the same database-backed list/detail renderer; this release does not add a full Blog authoring dashboard.

## GitHub and Railway

| Release | GitHub | Merge commit | Railway deployment | Result |
|---|---|---|---|---|
| Initial v1.11.0 | [PR #25](https://github.com/srinagubandi/workshop-creative-group/pull/25) | `24497270b277d50dfdde087cc9deed014314774b` | `4af88994-78ee-44ec-ab55-935bfafee2db` | Success; live gates identified corrections |
| Corrective v1.11.1 | [PR #26](https://github.com/srinagubandi/workshop-creative-group/pull/26) | `c7e7a3d6f053795d3af90bb1fb2dc30b8a6623ed` | `427617bd-7ccf-4f9a-a4d1-2f40d3bf5c13` | Success; production retest passed |

The initial live checks caught consumed Express wildcard paths causing Home metadata in initial HTML, plus visible-label/accessible-name mismatch on three existing Home testimonial buttons. Completion was withheld until both were corrected on a separately backed-up branch. The route fix is covered by real production middleware tests. Testimonial controls use native visible text plus a hidden author suffix; pre-render quote normalization and decorative blue quotes remain intact.

## Recovery and access cleanup

Before v1.11.0, source archive/Git-history bundle and protected export were verified, plus a complete consistent 11-table snapshot (264,516 bytes). Before v1.11.1, fresh source/Git backups and a new complete snapshot (266,883 bytes, including the published article) were verified by SHA-256. No views, triggers, procedures or functions required separate export. Database exports remain private; no credentials are committed or included in public evidence.

Both explicitly authorized temporary SSH keys were removed and their local key files erased. Pre-existing archive keys were preserved. No public database port or DNS change was made. The existing protected admin backup still covers nine named tables and omits testimonials/saved text; full backups must continue to use all-table coverage until that separate issue is remediated. No restore drill was performed.

## Live HTTP and publication checks

Both Railway and `https://www.workshopcreativegroup.com` Blog/article routes returned HTTP 200 with correct initial titles, descriptions, canonical URLs, Open Graph article type, photo URL and BlogPosting author/date parity. A deliberately held article API response retained authoritative server metadata throughout loading and resolution. Sitemap includes both the Blog collection and article. A nonexistent article returns HTTP 404 and `noindex,follow`.

The published article photo response matches the committed WebP SHA-256 exactly (268,478 bytes). Every one of **130** published managed media routes returned HTTP 200 with an image/video content type: Large Format 45, Graphic Design 25, Branding 15, Home logos 30, Print Procurement 15.

## Live browser and accessibility sample

Playwright Chromium `156.0.8078.4`, actual public APIs (no fixtures), inspected the Blog/article and representative shared routes. Tests passed for visible branding/headline/byline/date, full-frame image decoding, native keyboard article entry, visible skip link/main focus, metadata transitions, missing-record return path, and zero JavaScript runtime errors. Blog/article had no horizontal overflow at 320, 375, 768, 1280 and 1536 CSS px (10 cases). Mobile drawer keyboard/Space/Enter/Escape, current-page dismissal, and focus return passed. Enlarged text spacing at 375px remained readable and in the viewport.

All three live long-testimonial controls were keyboard expanded/collapsed. Their native names include the exact visible labels; source outer quotation marks remain removed in both states, while two decorative aria-hidden blue quote spans remain per quote.

Axe-core **4.14.0**, WCAG 2.0/2.1/2.2 A/AA tags:

| Route/state | Violations | Passed rules | Incomplete |
|---|---:|---:|---|
| Blog, desktop | 0 | 22 | color-contrast: 2 nodes |
| Article, desktop | 0 | 22 | color-contrast: 4 nodes |
| Home, desktop | 0 | 27 | color-contrast: 9 nodes |
| Large Format, desktop | 0 | 21 | color-contrast: 5 nodes |
| Article, enlarged-spacing mobile | 0 | 22 | color-contrast |

Manual visual checks confirmed readable byline, correct body/list order, uncropped supplied image and wrapped narrow-screen shared CTA. Raw public-only JSON evidence is in `docs/evidence/v1.11.1/` (live browser, HTTP/media, delayed metadata, testimonials, and application deployment). Local records retain the 58-test passing suite and production build.

## Limits and follow-up observations

This is a scoped release evaluation, not a legal ADA conclusion, full-site WCAG conformance claim, lawsuit guarantee, indexing promise or social-preview guarantee. Contrast incomplete results remain separately tracked manual-review limitations. Full native screen-reader testing, Google Rich Results Test/Search Console indexing, and named-platform share previews were not evaluated.

The canonical `www` Blog/article works. An independent read-only check found the bare-apex `/blog` route returned 404; no DNS/redirect change was included in this approved release. Railway CLI also reported a configuration-format migration deadline for existing `railway.json`/`railway.toml`; this unrelated infrastructure migration was not performed here and should be scoped separately.
