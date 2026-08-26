# Changelog

All notable changes to this project are recorded in this file. The project follows a versioned, branch-first workflow. A release is not considered deployed until its Git branch is published, the change is approved, and the corresponding Railway deployment has been verified.

## [1.3.0] — 2026-08-26

### Added

- Added `PublishedMediaStrip`, a static, accessible presentation of approved published portfolio media.
- Added `V130_PACKAGE_COMPLETION.md` and `V130_LOCAL_VALIDATION.md` as the package-completion and local-validation records.
- Added a static Home-page client-logo section using six existing published portfolio logo assets.
- Added static selected-work media panels to the Large Format and Graphic Design service pages, using existing published portfolio work.
- Added a labeled static Print Procurement visual panel using the supplied August 26 service illustration.

### Changed

- Corrected the Graphic Design benefit cards so the approved service-icon set replaces the prior emoji treatment.
- Changed long testimonial presentation to a shorter default preview with a keyboard-accessible **Read full perspective** control; full approved quotation text remains available and testimonials do not auto-advance.
- Updated `current.md` with the v1.3.0 fresh source and database backups, package-completion scope, local validation results, and Railway publication gate.

### Verified Locally

- Fresh source archive and Git-history bundle were created and checksummed from `1703b96554b03536034b99696a8fd42aec3e3104` before implementation.
- Fresh Railway manual database backup `wscg-manual-backup-2026-08-26-20-34-56.sql` was recorded and verified before implementation.
- `pnpm check` completed successfully.
- `pnpm test` completed successfully with **36 tests across 10 files passing**.
- `pnpm build` completed successfully.
- Rendered Home, Large Format, Graphic Design, and Print Procurement reviews passed; the corresponding axe-core WCAG 2.0/2.1/2.2 A/AA scans reported **0 violations**. Color-contrast incomplete results remain manual-review items.

### Pending

- Publish the feature branch, merge the reviewed v1.3.0 release to `main`, verify Railway deployment health, and complete the recorded post-deployment route, keyboard, and axe-core checks.

## [1.2.1] — 2026-08-26

### Added

- Added `V120_POSTDEPLOY_VALIDATION.md` as the durable record of the v1.2.0 Railway rollout and 10-test post-deployment validation suite.
- Finalized `current.md` with the merged pull request, successful Railway deployment status, fresh backup evidence, route checks, automated scan results, and remaining limitations.

### Verified

- Published `feature/v1.2.0-accessibility-content-20260826` at commit `1b71259fb57f20c8f4f204b8fa2800f4eeea8d30`.
- Created and cleanly merged [pull request #4](https://github.com/srinagubandi/workshop-creative-group/pull/4) into `main`, producing commit `a7e3ee7e5a3c79999d2c3928a72178c1048c93c2`.
- Railway’s GitHub deployment status reported **success** for the v1.2.0 merge commit.
- The 10-test post-deployment suite passed: Home and Accessibility Statement content, three live axe-core scans with 0 violations, Contact and Request Quote checks without submitting data, keyboard skip navigation, footer policy links, and public-route smoke tests.

## [1.2.0] — 2026-08-26

### Added

- Added the supplied August 26 Print Procurement service-card icon as `service-print-procurement-826.png`.
- Added `V120_UPDATE_ASSESSMENT.md` to document the supplied update package, implementation decisions, and deferred requests.
- Added the v1.2.0 fresh-backup record and 10-test post-deployment validation plan to `current.md`.

### Changed

- Replaced the Home-page Print Procurement service-card icon with the supplied asset while preserving decorative-image semantics.
- Updated the Accessibility Statement language to explain the WCAG 2.2 AA target, ongoing automated and manual review, assistance path, and non-certification scope.
- Remediated the serious automated color-contrast failures reported on the live v1.1.x site: primary actions, helper text, value-card descriptions, yellow statistics, Print Procurement links, the quote-banner supporting text, and footer copy now use accessible treatments for their rendered backgrounds.
- Increased the visual emphasis of the footer service summary while maintaining explicit readable footer colors.
- Refined the Request Quote invoice control so its programmatic name and descriptive hint are separate from the clickable drop zone.

### Verified Locally

- Fresh source archive and Git-history bundle were created and checksummed before implementation from `a386325d74a5f31462747736ca41975a072a0c72`.
- Fresh Railway manual database backup `wscg-manual-backup-2026-08-26-20-03-53.sql` was recorded and verified before implementation.
- `pnpm check` completed successfully.
- `pnpm test` completed successfully with **36 tests across 10 files passing**.
- `pnpm build` completed successfully.
- Local axe-core scans of `/`, `/accessibility`, and `/request-quote` reported **0 WCAG 2.0/2.1/2.2 A/AA violations** after remediation. Color-contrast incomplete results remain manual-review items.

### Remaining Follow-up

- Perform a real small-screen device/browser test and targeted assistive-technology review, and monitor the reported slow full-file transfer of the 626,522-byte supplied icon from the sandbox environment.

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

[1.3.0]: https://github.com/srinagubandi/workshop-creative-group/compare/1703b96554b03536034b99696a8fd42aec3e3104...HEAD
[1.2.1]: https://github.com/srinagubandi/workshop-creative-group/compare/a7e3ee7e5a3c79999d2c3928a72178c1048c93c2...HEAD
[1.2.0]: https://github.com/srinagubandi/workshop-creative-group/compare/a386325d74a5f31462747736ca41975a072a0c72...a7e3ee7e5a3c79999d2c3928a72178c1048c93c2
[1.1.2]: https://github.com/srinagubandi/workshop-creative-group/compare/839ffcb990ac327e94595ed53ad7c08f1ec90b93...HEAD
[1.1.1]: https://github.com/srinagubandi/workshop-creative-group/compare/04f38e4d80a62d4aa5ea54958cc6dd07eacaa025...839ffcb990ac327e94595ed53ad7c08f1ec90b93
[1.1.0]: https://github.com/srinagubandi/workshop-creative-group/compare/8885b5c...04f38e4d80a62d4aa5ea54958cc6dd07eacaa025
[1.0.1]: https://github.com/srinagubandi/workshop-creative-group/compare/8885b5c...5267f13
