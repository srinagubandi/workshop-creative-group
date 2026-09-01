# Changelog

All notable changes to this project are recorded in this file. The project follows a versioned, branch-first workflow. A release is not considered deployed until its Git branch is published, the change is approved, and the corresponding Railway deployment has been verified.

## [1.9.3] — 2026-09-01

### Added

- Added `V192_POSTDEPLOY_VALIDATION.md` as the durable production record for the v1.9.2 Home color alignment and required testimonial quote normalization.
- Finalized `current.md` with the v1.9.2 feature branch, pull request, merge commit, Railway success, Home icon-link mapping, live normalized testimonial verification, and accessibility evidence.

### Verified

- Published `feature/v1.9.2-home-icon-link-color-alignment-20260901` at `890ea97629242852641a35377e73025fdf724290`.
- Created and cleanly merged [pull request #21](https://github.com/srinagubandi/workshop-creative-group/pull/21) into `main`, producing commit `3ae393f91c8e156dde75142d15aa0d85cdba9491`.
- Railway GitHub deployment status reported **success** for the v1.9.2 merge commit.
- Live production verification confirmed blue/blue, accessible-green/green, and blue/blue matching of Home service icons and Learn More links.
- All five production testimonial text nodes begin and end without source double-quote punctuation; the three expandable testimonials also passed expanded-state verification. Each card retains one decorative blue opening mark and one decorative blue closing mark.
- The live Home axe-core WCAG 2.0/2.1/2.2 A/AA scan reported **0 violations** and 28 passed rules. Nine color-contrast incomplete results remain manual-review items.

## [1.9.2] — 2026-09-01

### Changed

- Matched every Home service-card Learn More link and arrow to its decorative icon color: blue for Large Format Printing and Print Procurement, and accessible dark green for Graphic Design.
- Added a scoped Graphic Design icon filter so the decorative green glyph matches the readable `#497C16` Learn More link on white.
- Added enforced pre-render `normalizeTestimonialQuote` processing before quote length, preview truncation, and expanded full-text rendering.
- Retained the component’s decorative blue quotation marks while removing only duplicated leading/trailing straight or curly double-quote punctuation from imported testimonial text.

### Verified Locally

- Created and checksummed a fresh source archive and complete Git-history bundle from `0629243806cb44c01ac7d951200c2d5269a160d6` before implementation.
- Created and verified a fresh Railway manual database backup at `2026-09-01T21:12:48.000Z`; reported size 253,580 bytes.
- Passed TypeScript, production build, and 38 automated regression tests.
- Added regression coverage for repeated outer quote marks and for preserving internal apostrophes and internal quotation punctuation.
- Confirmed Home icon-link pairs render blue/blue, accessible green/green, and blue/blue respectively; all three images retain decorative semantics and load successfully in view.
- Passed the local Home axe-core WCAG 2.0/2.1/2.2 A/AA scan with 0 violations. Nine color-contrast checks remain axe incomplete/manual-review items.

## [1.9.1] — 2026-09-01

### Added

- Added `V190_POSTDEPLOY_VALIDATION.md` as the durable production record for the v1.9.0 Home service-card icon alignment.
- Finalized `current.md` with the v1.9.0 feature branch, pull request, merge commit, Railway success, verified icon dimensions, image loading, decorative semantics, and live axe-core result.

### Verified

- Published `feature/v1.9.0-home-icon-alignment-20260901` at `9665aafb7f94d81402d233edac62c5b17e35acf1`.
- Created and cleanly merged [pull request #19](https://github.com/srinagubandi/workshop-creative-group/pull/19) into `main`, producing commit `03414445592e38ad4626ecbdc80ee0e030c1687f`.
- Railway GitHub deployment status reported **success** for the v1.9.0 merge commit.
- Live verification confirmed all three Home service cards use white 48px rounded bordered containers, 36px approved glyphs, and retained decorative-image semantics. Deferred images loaded successfully once in view.
- The live Home axe-core WCAG 2.0/2.1/2.2 A/AA scan reported **0 violations** and 28 passed rules. Nine color-contrast incomplete results remain manual-review items.

## [1.9.0] — 2026-09-01

### Changed

- Aligned the Home-page service-card icon presentation with the Graphic Design benefit-card system.
- Replaced the previous 64px colored service icon containers with 48px white rounded containers using the shared gray border.
- Matched the Home service artwork to the Graphic Design page’s 36px decorative icon scale, while retaining the approved blue and green service-specific glyphs.
- Removed the yellow-tinted Print Procurement icon container for the requested green-and-blue visual consistency.

### Verified Locally

- Created and checksummed a fresh source archive and complete Git-history bundle from `f37466d6da39908beaa3c5d957c21b90cdb65df6` before implementation.
- Created and verified a fresh Railway manual database backup at `2026-09-01T20:45:57.000Z`; reported size 252,903 bytes.
- Passed TypeScript, production build, and 36 automated regression tests.
- Confirmed all three rendered Home service icon containers are 48 × 48px white containers with 36 × 36px decorative imagery, matching the Graphic Design benefit-card pattern.
- Passed the local Home axe-core WCAG 2.0/2.1/2.2 A/AA scan with 0 violations. Nine color-contrast checks remain axe incomplete/manual-review items.

## [1.8.3] — 2026-09-01

### Added

- Added `V182_POSTDEPLOY_VALIDATION.md` as the durable production record for the v1.8.2 visible-green Brand Voice icon correction.
- Finalized `current.md` with the v1.8.2 feature branch, pull request, merge commit, Railway success, live image state, visible green rendering, and accessibility evidence.

### Verified

- Published `fix/v1.8.2-visible-green-brand-voice-icon-20260901` at `8464cc38e2d97bed6199240b88e2a5df66de07a0`.
- Created and cleanly merged [pull request #17](https://github.com/srinagubandi/workshop-creative-group/pull/17) into `main`, producing commit `ca0d3e0e703b7bdf8a0a5bdb5cc7a41dfc6fb011`.
- Railway GitHub deployment status reported **success** for the v1.8.2 merge commit.
- Live production verification confirmed the Graphic Design Brand Voice image loads at 1024 × 1024, visibly renders green through the corrected image filter, remains decorative, and preserves the benefit-card layout.
- The live Graphic Design axe-core WCAG 2.0/2.1/2.2 A/AA scan reported **0 violations** and 23 passed rules. Five color-contrast incomplete results remain manual-review items.

## [1.8.2] — 2026-09-01

### Fixed

- Replaced the v1.8.0 CSS-mask implementation after production inspection showed it did not visibly paint the Brand Voice glyph, despite the approved source image loading successfully.
- Retained `branding-828.png` but changed its green treatment to a reliable standard-image filter: `hue-rotate(38deg) saturate(75%) brightness(93%)`, producing a visible green icon in the requested color family.
- Preserved the decorative empty `alt` and `aria-hidden="true"` semantics, existing 36px icon footprint, benefit-card hierarchy, and visible benefit copy.

### Verified Locally

- Created and checksummed a fresh source archive and complete Git-history bundle from `a53701d14ef639101d9997a6e2f250b03a9ae580` before corrective implementation.
- Created and verified a fresh Railway manual database backup at `2026-09-01T14:47:41.000Z`; reported size 251,474 bytes.
- Passed TypeScript, production build, and 36 automated regression tests.
- Confirmed the corrected Brand Voice image loads at 1024 × 1024, visibly renders green, remains decorative, and passes a local Graphic Design axe-core WCAG 2.0/2.1/2.2 A/AA scan with 0 violations. Five color-contrast checks remain axe incomplete/manual-review items.

## [1.8.0] — 2026-09-01

### Changed

- Replaced the yellow decorative icon for the Graphic Design page’s `Consistent Brand Voice` benefit with an approved-silhouette CSS mask rendered in green `#7EBF31`.
- Retained the existing benefit-card layout and accessible visible heading/description; the decorative mask is excluded from assistive-technology output with `aria-hidden="true"`.

### Verified Locally

- Created and checksummed a fresh source archive and complete Git-history bundle from `b3d28dcca81a9640b0651aa6aab534fc6a1fb33f` before implementation.
- Created and verified a fresh Railway manual database backup at `2026-09-01T14:37:40.000Z`; reported size 251,028 bytes.
- Passed TypeScript, production build, and 36 automated regression tests.
- Passed a local Graphic Design axe-core WCAG 2.0/2.1/2.2 A/AA scan with 0 violations. Five color-contrast checks remain axe incomplete/manual-review items.

## [1.7.1] — 2026-08-31

### Added

- Added `V170_POSTDEPLOY_VALIDATION.md` as the durable production record for the v1.7.0 matched-green statistic and supplied blue Print Procurement icon release.
- Finalized `current.md` with the v1.7.0 feature branch, pull request, merge commit, Railway success, live statistic color, icon integrity, and automated accessibility evidence.

### Verified

- Published `feature/v1.7.0-statistic-print-icon-20260831` at `2b0f21ba4c15c2d5610c197ef111e3aa9ea2e7b3`.
- Created and cleanly merged [pull request #14](https://github.com/srinagubandi/workshop-creative-group/pull/14) into `main`, producing commit `58843f11616c63c5422e3cd8c1549025daac96fe`.
- Railway GitHub deployment status reported **success** for the v1.7.0 merge commit.
- Live verification confirmed `100+ Clients Served` renders as `#497C16`, the supplied blue icon returns HTTP 200 with the source SHA-256, and its lazy-loaded Home card decodes at 1024 × 1024 after being brought into view.
- The live Home axe-core WCAG 2.0/2.1/2.2 A/AA scan reported **0 violations** and 28 passed rules. Nine color-contrast incomplete results remain manual-review items.

## [1.7.0] — 2026-08-31

### Changed

- Updated the Home-page `100+ Clients Served` statistic from dark yellow `#7A6100` to `#497C16`, matching the existing `20% Average Savings` green treatment requested by the client.
- Added the supplied 1024 × 1024 blue Print Procurement icon as `service-print-procurement-blue-831.png` and applied it to the Home service card and Print Procurement page visual panel.

### Verified Locally

- Created and checksummed a fresh source archive and complete Git-history bundle from `648157384e1805d736c9cc539f75219782cd8b88` before implementation.
- Created and verified a fresh Railway manual database backup before implementation; reported size 250,350 bytes.
- Passed TypeScript, production build, and 36 automated regression tests.
- Passed Home and Print Procurement axe-core WCAG 2.0/2.1/2.2 A/AA scans with 0 violations. The remaining color-contrast checks are axe incomplete/manual-review items.

## [1.6.1] — 2026-08-31

### Added

- Added `V160_POSTDEPLOY_VALIDATION.md` as the durable production record for the v1.6.0 client color and section-spacing release.
- Finalized `current.md` with the v1.6.0 branch, merge commit, Railway deployment success, live color verification, shared-spacing result, and axe-core evidence.

### Verified

- Published `feature/v1.6.0-client-colors-spacing-20260831` at commit `00493861edb8835e875227607bd1678dfa3bfe78`.
- Created and cleanly merged [pull request #12](https://github.com/srinagubandi/workshop-creative-group/pull/12) into `main`, producing commit `a69b017d30e00239423fee718a08dd3d6f2c3947`.
- Railway GitHub deployment status reported **success** for the v1.6.0 merge commit.
- The live site rendered exact `#1261AE` blue, `#7EBF31` green, and `#EEC509` yellow treatments, while white-text actions retained the dedicated accessible green.
- The first three live shared sections each rendered 88px top/bottom desktop padding, confirming the tightened 5.5rem rhythm.
- The live Home axe-core WCAG 2.0/2.1/2.2 A/AA scan reported **0 violations** and 28 passed rules. Nine color-contrast incomplete results remain manual-review items.

## [1.6.0] — 2026-08-31

### Changed

- Corrected the shared visual brand values to the client-supplied hex codes: yellow `#EEC509`, green `#7EBF31`, and blue `#1261AE`.
- Replaced all retired component-level client color literals so public and administrative interface treatments use the exact shared palette.
- Reduced standard section padding from 5rem/7rem to 4rem/5.5rem on mobile/desktop, tightening the shared vertical rhythm by approximately one fifth.
- Reduced fixed public padding in the quote banner, footer, media panels, featured blog area, page hero, and service-page visual panels while retaining intentional Home hero scale.
- Retained the darker `#497C16` action-green treatment for white button text, preserving accessible contrast while restoring the requested display green.

### Verified Locally

- Created and checksummed a fresh source archive and complete Git-history bundle from `e387bdd7784864acaf081ad1cfd1bff5df61d149` before implementation.
- Created and verified a fresh Railway manual database backup at `2026-08-31T18:11:46.000Z`; reported size 249,442 bytes.
- Confirmed no retired `#1260ae`, `#7dbe31`, or `#efc509` client-source literal remains.
- Confirmed the exact requested values are present in the shared design system.
- `pnpm check`, `pnpm test`, and `pnpm build` completed successfully; **36 tests across 10 files passed**.
- Rendered local Home checks confirmed the client blue and green display treatments, 88px desktop shared-section padding, retained accessible action-green button treatment, visible skip link, and no automatic motion.
- The local Home axe-core WCAG 2.0/2.1/2.2 A/AA scan reported **0 violations**. Nine color-contrast incomplete results remain manual-review items.

## [1.5.1] — 2026-08-31

### Added

- Added `V150_POSTDEPLOY_VALIDATION.md` as the durable production record for the v1.5.0 testimonial redesign.
- Finalized `current.md` with the v1.5.0 merged commit, Railway success, populated-card visual evidence, keyboard interaction, and axe-core findings.

### Verified

- Published `feature/v1.5.0-testimonial-layout-20260831` at commit `76cef21f1ee5903d2ca7241c1c373a3c712406f8`.
- Created and cleanly merged [pull request #10](https://github.com/srinagubandi/workshop-creative-group/pull/10) into `main`, producing commit `d5b2148830540570170dceb7b04b4811b26b050a`.
- Railway’s GitHub deployment status reported **success** for the v1.5.0 merge commit.
- The live populated testimonial section computed as a grid with `align-items: flex-start`; all five cards used author-first structure and variable intrinsic heights rather than the previous stretched rail.
- Long-quote controls updated their visible copy and `aria-expanded` state on click and keyboard activation, had 44-pixel heights, and retained author-specific accessible names.
- The live Home axe-core WCAG 2.0/2.1/2.2 A/AA scan reported **0 violations**. Color-contrast incomplete results remain manual-review items.

## [1.5.0] — 2026-08-31

### Changed

- Replaced the horizontally scrolling, stretched testimonial rail with a responsive one-, two-, or three-column intrinsic-height card grid.
- Moved client identity and professional context to the top of every testimonial card, with a compact circular image or monogram treatment and stronger divider hierarchy.
- Improved quotation typography with a comfortable reading measure, 1.0625rem body size on larger screens, and visual blue quote marks.
- Replaced the text-link treatment for expanded testimonials with a 44-pixel-minimum outlined button that has an author-specific accessible name and visible focus ring.
- Added clear explanatory copy confirming that client perspectives are user-controlled and never rotate or advance automatically.
- Updated `current.md` with the v1.5.0 candidate scope, fresh source/database backup record, and accessibility safeguards.

### Verified Locally

- Created a checksummed source archive and full Git-history bundle from `3f911f3acedb9bb010809b6e4110b330be7ad312` before implementation.
- Created and verified fresh Railway manual database backup `wscg-manual-backup-2026-08-31-05-01-03.sql` before implementation; reported size: 248,996 bytes.
- `pnpm check`, `pnpm test`, and `pnpm build` completed successfully; **36 tests across 10 files passed**.
- The static Home-page axe-core WCAG 2.0/2.1/2.2 A/AA scan reported **0 violations**; remaining color-contrast incomplete results are manual-review items unrelated to the testimonial layout.
- Source review confirmed semantic `figure`, `figcaption`, `blockquote`, and list structure; user-controlled quote expansion; visible keyboard focus; and no automatic movement.

### Deployed and Verified

- Published through [pull request #10](https://github.com/srinagubandi/workshop-creative-group/pull/10), merged to `main`, deployed successfully by Railway, and validated against populated production testimonial data. See `V150_POSTDEPLOY_VALIDATION.md`.

## [1.4.1] — 2026-08-31

### Added

- Added `V140_POSTDEPLOY_VALIDATION.md` as the durable production record for the v1.4.0 brand, icon, and full-logo-gallery release.
- Finalized `current.md` with the v1.4.0 merged commit, Railway deployment success, live CSS and asset checks, full-logo disclosure result, keyboard result, and axe-core evidence.

### Verified

- Published `feature/v1.4.0-aug28-brand-icons-logos-20260831` at commit `7e648ce1d4152829a7887593409324fa2a86abf7`.
- Created and cleanly merged [pull request #8](https://github.com/srinagubandi/workshop-creative-group/pull/8) into `main`, producing commit `5f459e446e584fd685f275d4a6e733d9364e5ebf`.
- Railway’s GitHub deployment status reported **success** for the v1.4.0 merge commit.
- All five supplied August 28 icon assets returned HTTP 200 from the live Railway site.
- The live Home logo control expanded from 6 to 30 published logo figures and updated `aria-expanded` from `false` to `true`; it has no automatic scrolling or animation.
- Live Home and Graphic Design axe-core WCAG 2.0/2.1/2.2 A/AA scans reported **0 violations**. Color-contrast incomplete items remain manual-review items.
- Live keyboard testing confirmed the Home skip link moved focus to `#main-content`.

## [1.4.0] — 2026-08-31

### Added

- Added the five supplied August 28 icon assets for Home service cards and Graphic Design benefit cards.
- Added an accessible, static progressive disclosure to the published Home-page client-logo gallery, allowing all approved currently published logo records to be shown on demand.
- Added `V140_LOCAL_VALIDATION.md` as the local CSS, application, keyboard, and automated accessibility evidence for this candidate.

### Changed

- Restored the exact original visual brand tokens: lime green `#7dbe31`, cobalt blue `#1260ae`, and yellow `#efc509`.
- Retained accessible dark-green and dark-gold variants where text or white-text controls require WCAG-conforming contrast.
- Replaced all three Home service-card icons with the supplied August 28 Large Format, Graphic Design, and Print Procurement assets.
- Replaced Graphic Design benefit-card icons with the supplied Strategy/Design, Large Format Printing, and Branding assets.
- Updated the Home client-logo description to accurately describe the static, keyboard-accessible full-gallery experience.
- Updated `current.md` with fresh source/database backup evidence, release scope, and local validation results.

### Verified Locally

- Created a checksummed source archive and complete Git-history bundle from `248545cea02cc17883685f01975b207c6499f8e8` before implementation.
- Created and verified fresh Railway manual database backup `wscg-manual-backup-2026-08-31-04-35-16.sql` before implementation.
- `pnpm check`, `pnpm test`, and `pnpm build` completed successfully; **36 tests across 10 files passed**.
- All five supplied icon assets returned HTTP 200 from the production-preview server.
- The Home logo disclosure expanded from 6 to 23 logo figures and updated `aria-expanded` from `false` to `true`.
- Local Home and Graphic Design axe-core WCAG 2.0/2.1/2.2 A/AA scans reported **0 violations**; color-contrast incomplete results remain manual-review items.
- Local keyboard testing confirmed the first Tab focused the Skip to main content link and activation moved to `#main-content`.

### Deployed and Verified

- Published through [pull request #8](https://github.com/srinagubandi/workshop-creative-group/pull/8), merged to `main`, deployed successfully by Railway, and validated through live CSS token, supplied-asset, full-logo disclosure, keyboard, and axe-core checks. See `V140_POSTDEPLOY_VALIDATION.md`.

## [1.3.1] — 2026-08-26

### Added

- Added `V130_POSTDEPLOY_VALIDATION.md` as the durable production record for the completed v1.3.0 package release.
- Finalized `current.md` with the verified v1.3.0 merge, Railway success status, fresh backup evidence, live package checks, and remaining limitations.

### Verified

- Published `feature/v1.3.0-remaining-package-layouts-20260826` at commit `8197b4a7b7e3e162810d10da873be9579b71044d`.
- Created and cleanly merged [pull request #6](https://github.com/srinagubandi/workshop-creative-group/pull/6) into `main`, producing commit `cfa49cb80e85e54ef34c46df1d78e437f8892790`.
- Railway’s GitHub deployment status reported **success** for the v1.3.0 merge commit.
- Live validation confirmed the static Home logo section, user-controlled testimonial previews, Large Format selected work, corrected Graphic Design icons and portfolio panel, and the supplied Print Procurement visual panel.
- Live axe-core scans of Home, Graphic Design, and Print Procurement each reported **0 WCAG 2.0/2.1/2.2 A/AA violations**; color-contrast incomplete items remain manual-review items.

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

### Deployed and Verified

- Published through [pull request #6](https://github.com/srinagubandi/workshop-creative-group/pull/6), merged to `main`, deployed successfully by Railway, and validated through live route, keyboard, static-presentation, and axe-core checks. See `V130_POSTDEPLOY_VALIDATION.md`.

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

[1.3.1]: https://github.com/srinagubandi/workshop-creative-group/compare/cfa49cb80e85e54ef34c46df1d78e437f8892790...HEAD
[1.3.0]: https://github.com/srinagubandi/workshop-creative-group/compare/1703b96554b03536034b99696a8fd42aec3e3104...cfa49cb80e85e54ef34c46df1d78e437f8892790
[1.2.1]: https://github.com/srinagubandi/workshop-creative-group/compare/a7e3ee7e5a3c79999d2c3928a72178c1048c93c2...HEAD
[1.2.0]: https://github.com/srinagubandi/workshop-creative-group/compare/a386325d74a5f31462747736ca41975a072a0c72...a7e3ee7e5a3c79999d2c3928a72178c1048c93c2
[1.1.2]: https://github.com/srinagubandi/workshop-creative-group/compare/839ffcb990ac327e94595ed53ad7c08f1ec90b93...HEAD
[1.1.1]: https://github.com/srinagubandi/workshop-creative-group/compare/04f38e4d80a62d4aa5ea54958cc6dd07eacaa025...839ffcb990ac327e94595ed53ad7c08f1ec90b93
[1.1.0]: https://github.com/srinagubandi/workshop-creative-group/compare/8885b5c...04f38e4d80a62d4aa5ea54958cc6dd07eacaa025
[1.0.1]: https://github.com/srinagubandi/workshop-creative-group/compare/8885b5c...5267f13
