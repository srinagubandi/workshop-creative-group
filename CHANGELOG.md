# Changelog

All notable changes to this project are recorded in this file. The project follows a versioned, branch-first workflow. A release is not considered deployed until its Git branch is published, the change is approved, and the corresponding Railway deployment has been verified.

## [1.1.2] — 2026-08-26

### Changed

- Corrected the canonical deployment record to distinguish the successful v1.1.0 application rollout from the subsequent successful v1.1.1 documentation-record rollout.

### Verified

- Railway reported `SUCCESS` for the final main commit `839ffcb990ac327e94595ed53ad7c08f1ec90b93` after the deployment-evidence merge.
- The v1.1.0 application release remains deployed and verified at application merge commit `04f38e4d80a62d4aa5ea54958cc6dd07eacaa025`.

## [1.1.1] — 2026-08-26

### Added

- Added `RAILWAY_DEPLOYMENT_VERIFICATION.md` as the durable production evidence record for the v1.1.0 release.

### Verified

- Published `feature/v1.1.0-accessibility-policy-20260825` at commit `4b26c2b29a382c3d8213ecd975fae00b828f78dc`.
- Created and cleanly merged [pull request #1](https://github.com/srinagubandi/workshop-creative-group/pull/1) into `main`, producing commit `04f38e4d80a62d4aa5ea54958cc6dd07eacaa025`.
- Railway deployed web deployment `6b3adfb2-173a-48f7-aba8-f63042d94829` with status `SUCCESS`.
- Rendered production verification passed for `/accessibility`, `/privacy`, `/terms`, `/contact`, and `/request-quote`; live keyboard skip navigation passed on the quote-request page without submitting data.

### Remaining Follow-up

- Have qualified counsel review the Privacy Policy and Terms and Conditions before relying on them as final legal documents.
- Perform a real small-screen device/browser test for mobile navigation.
- Run the Dockerfile build in a Docker-capable validation environment when available.

## [1.1.0] — 2026-08-25

### Added

- Added public **Accessibility Statement**, **Privacy Policy**, and **Terms and Conditions** routes, each with route metadata and global footer links.
- Added an accessibility-support channel through `brent@workshopcreativegroup.com` and the Contact form, with a clear barrier-reporting path.
- Added `ACCESSIBILITY_VALIDATION.md`, which records 20 iterative accessibility review/remediation passes and the 10-test validation suite.
- Added the three supplied service icons to the home-page service cards.

### Changed

- Updated the primary browser title to **Commercial Printing & Graphic Design | Workshop Creative Group**.
- Improved global keyboard access with a skip link, fixed-header-safe main-content target, stronger visible focus treatment, reduced-motion behavior, and a browser-zoom-safe viewport.
- Improved navigation semantics with active-page announcements and a valid, hidden mobile-drawer disclosure target.
- Improved Contact and Request Quote forms with native required state, labels, associated error descriptions, invalid states, alert messages, and a native labeled invoice picker.
- Improved the footer’s readability with high-contrast link text, brand-yellow headings, persistent Accessibility/Privacy/Terms links, and minimum 24px interactive target heights.
- Reworked testimonial presentation to use smaller quotation text and a non-autoplay horizontal review rail.
- Extended routing, lazy-import, and SEO regression tests for the three new public pages.

### Verified

- Fresh source and Railway database backups were created and verified before implementation.
- `pnpm check` completed successfully.
- `pnpm test` completed successfully with **36 tests across 10 files passing**.
- `pnpm build` completed successfully.
- The local production preview returned HTTP 200 for all updated public routes and the three supplied service icons.
- Twenty documented review passes completed. Three issues identified during review were remediated and retested: missing native required attributes, footer target sizes below the 24px screening threshold, and a hidden mobile-drawer `aria-controls` target.
- The branch was published, reviewed through pull request #1, merged to `main`, deployed by Railway, and confirmed through rendered production route testing. See `RAILWAY_DEPLOYMENT_VERIFICATION.md`.

## [1.0.1] — 2026-08-25

### Added

- Added `current.md` as the canonical concise operational-status record for every future change.
- Established a documented branch convention: `type/vX.Y.Z-short-description`.
- Established mandatory local validation, Git review, Railway verification, and rollback-recording gates for production work.

### Changed

- Designated `CURRENT_CONTEXT.md` as the detailed historical and architectural record, with `current.md` serving as the current-state summary.
- Recorded the required Railway application-variable names and the current verification boundaries without disclosing configuration values.

### Verified

- `pnpm run check` completed successfully.
- `pnpm run test` completed successfully with **36 tests across 10 files passing**.
- `pnpm run build` completed successfully.
- Public Railway smoke testing returned HTTP 200 for Home, About, Large Format Printing, Graphic Design, Print Procurement, Request a Quote, Contact, and Blog. Gallery redirected from `/gallery` to `/gallery/`, which returned HTTP 200.

[1.1.2]: https://github.com/srinagubandi/workshop-creative-group/compare/839ffcb990ac327e94595ed53ad7c08f1ec90b93...HEAD
[1.1.1]: https://github.com/srinagubandi/workshop-creative-group/compare/04f38e4d80a62d4aa5ea54958cc6dd07eacaa025...839ffcb990ac327e94595ed53ad7c08f1ec90b93
[1.1.0]: https://github.com/srinagubandi/workshop-creative-group/compare/8885b5c...04f38e4d80a62d4aa5ea54958cc6dd07eacaa025
[1.0.1]: https://github.com/srinagubandi/workshop-creative-group/compare/8885b5c...5267f13
