# Workshop Creative Group - Project TODO

## Backend & Infrastructure
- [x] DB schema: quote_requests table with file upload support
- [x] tRPC router: submitQuoteRequest procedure (public, stores to DB + S3 + notifies owner)
- [x] tRPC router: getBlogPosts procedure
- [x] Railway-compatible environment setup (Dockerfile)

## Global Layout & Design System
- [x] CSS design tokens (colors, typography, spacing) — elegant/premium theme
- [x] Sticky top navigation with logo, all page links, hamburger mobile menu
- [x] "Get Your Free Quote Comparison" CTA button in nav
- [x] Footer with contact info, nav links, footer CTA
- [x] Google Fonts integration (elegant serif + clean sans-serif)
- [x] Micro-animations (scroll reveal, hover states, button press)

## Pages
- [x] Home page: hero (30% savings), 2-step process, services cards, why choose us, industries, final CTA
- [x] About page: hero, main content, values, CTA
- [x] Large Format Printing page: hero, products list, supporting copy, CTA
- [x] Graphic Design page: hero, services list, supporting copy, CTA
- [x] Print Procurement page: hero, intro, products sourced, CTA
- [x] Brent's Blog page: hero, intro, article listing, featured story, audio section, CTA
- [x] Request a Quote page: hero, invoice upload form, supporting copy
- [x] Contact page: hero, contact prompts, CTA

## SEO
- [x] Unique page titles and meta descriptions per page
- [x] One H1 per page
- [x] Descriptive alt text on all images
- [x] Internal linking per copy deck spec

## Deployment
- [x] Push to new GitHub repo (workshop-creative-group)
- [x] Configure Railway deployment (Dockerfile)
- [x] Deploy to Railway and get live URL — https://web-production-d7aa.up.railway.app

## Admin Media, Metadata, and Documentation Expansion
- [x] Create a complete pre-change backup of the Railway database, media assets, and deployed source state; retain a recoverable record and email confirmation to brent@workshopcreativegroup.com
- [x] Store a verified pre-change source snapshot and complete public-media inventory in the private Railway backup bucket
- [x] Verify the backup confirmation email delivery and retain its Resend message identifier in the backup record
- [x] Add and maintain CURRENT_CONTEXT.md with architecture, Railway/GitHub deployment state, content rules, media-management decisions, metadata strategy, and change history
- [x] Replace public-site Manus media dependencies with Railway-backed persistent media storage and safe media-serving routes
- [x] [Superseded by owner decision] Replace the existing platform-specific daily backup scheduler with a Railway-native 2:00 AM UTC cron service that exits after completion
- [x] Disable the existing legacy scheduled-backup job at final cutover; retain only the Railway-backed manual backup action in the admin dashboard
- [x] Add database models and migrations for images, videos, page placements, categories, SEO metadata, publish state, archive state, ordering, captions, and accessibility text
- [x] Build password-protected admin media management for all website images and videos, including upload, replacement in place, type/size/dimension validation, previews, and pre-publication warnings
- [x] Build image crop and rotation controls with preview and preserve original assets for recovery
- [x] Add per-page placement, gallery category assignment, publish/unpublish workflow, archive, restore, archive search, and explicit ordering controls
- [x] Implement and verify visible crop/rotation controls with preview and non-destructive original preservation for edited assets
- [x] Add and verify searchable archive controls so archived assets can be located and restored efficiently
- [x] Enforce supported media formats and file-size limits: common web images plus MP4/WebM video, with clear client and server validation feedback
- [x] Add editable media title, caption, alt text, and metadata fields to support accessibility, SEO, AEO, and GEO
- [x] Add permanent admin Help guidance for the media workflow
- [x] Apply metadata-only nationwide SEO, AEO, and GEO updates: canonical URLs, robots/sitemap, route titles/descriptions, social metadata, and valid structured data
- [x] Produce a page-by-page, review-only visible-copy recommendation list without changing on-page copy
- [x] Email brent@workshopcreativegroup.com the backup confirmation, copy-recommendation review, and new-admin user guide
- [x] Add Vitest coverage for admin media upload validation, replacement, archive/restore lifecycle flows, manual backup success/failure behavior, and documentation-email delivery behavior
- [x] Verify the live archive/restore and upload workflows with a clearly labeled non-public test asset, then retain the audit trail in the archive
- [x] Document production confirmation for the guide/copy-recommendation email delivery
- [x] Add focused Vitest coverage for `/api/admin/media/upload` validation failures and successful edited-image uploads with private original preservation
- [x] Create a deployment branch, push verified work to GitHub, trigger the connected Railway production deployment, and verify the live application

## Visual-Preserving Performance Optimization
- [x] Establish repeatable baseline measurements for every public route, including first-response, first-content, and user-visible completion signals
- [x] Define and document page-load budgets that preserve the existing website appearance while targeting the fastest practical user-visible experience
- [x] Audit and remove duplicate loading work, redundant rendering, avoidable requests, and unused client-side code without changing site design or copy
- [x] Optimize visual assets, font delivery, script loading, route bundling, and rendering priority while preserving existing page visuals
- [x] Reduce and verify non-critical font transfer while preserving the existing Playfair Display and Inter visual typography
- [x] Run and document ten optimization-and-verification passes across the public pages, keeping a concise current performance context
- [x] Add or update automated tests for performance-related utility and rendering changes, then push verified changes to GitHub and Railway
- [x] Correct and verify immutable cache headers for fingerprinted production JavaScript and CSS assets identified during live performance passes
- [x] Re-run ten live public-route verification passes after deployment until every page returns HTTP 200 in every pass, then record the clean result
- [x] Add automated coverage for rendering-side performance safeguards: lazy public routes, single blog-list query behavior, and shared image loading priority/caching

## Managed Thumbnails and Testimonials
- [x] Create a recoverable pre-change checkpoint and update CURRENT_CONTEXT.md with the approved managed-thumbnail and genuine-testimonial requirements
- [x] Add non-destructive thumbnail relationships to every media asset: source-media default, selectable Media Library replacement, and video-thumbnail support
- [x] Add database models, safe migrations, and protected admin procedures for testimonials with optional Media Library logo/photo, ordering, draft/publish/unpublish, archive, and restore states
- [x] Seed the owner-provided Ian Readman/Radford Motor Company LLC testimonial verbatim as published on the Home page, without fabricating any other feedback
- [x] Build Media Library thumbnail selection, preview, replacement, reset-to-source, and archive-safe behavior for all images and videos
- [x] Build an admin testimonial manager with genuine-content guidance, optional Media Library image selection, publication controls, ordering, archive, and restore actions
- [x] Add a responsive Home-page testimonial section that is hidden without published testimonials and automatically adapts from a featured single testimonial to a multi-testimonial layout
- [x] Add complete existing-testimonial editing and move up/down ordering controls, then verify the Home-page order updates correctly
- [x] Add and verify explicit default video poster behavior with Media Library replacement and reset-to-source controls
- [x] Verify testimonial reordering behavior in the admin and Home query; the current single approved testimonial remains stable, and a second genuine testimonial is required to exercise a visual multi-testimonial order change
- [x] Verify actual managed-video source-frame preview, replacement poster selection, reset-to-source, and archive-safe behavior without affecting existing published media
- [x] Add automated regression coverage for testimonial reorder output and video thumbnail fallback/reset behavior
- [x] Add Vitest coverage and local/live verification for thumbnail selection, testimonial lifecycle behavior, optional media selection, responsive public rendering, and preservation of the current visual design
- [x] Push verified changes to a rollback branch and GitHub main, deploy to Railway, and update the admin user guidance and living context
- [x] [Superseded by compatible startup repair] Apply and verify the missing additive `thumbnailMediaId` column on Railway MySQL through a temporary protected connection, then remove the connection and redeploy
- [x] Replace the unsupported conditional column-add statement with a version-compatible additive startup migration, redeploy, and verify Railway applies the column before media seeding
- [x] Add automated coverage that verifies published testimonial query ordering changes according to persisted sort order after reordering
- [x] Verify live video poster selection/reset and archive-safe cleanup, with automated rendered-preview policy coverage for source-frame and selected-poster states
- [x] Verify the public adaptive testimonial layout for both single and multi-record states using non-fabricated, isolated view-model rendering coverage
- [x] Add a persisted-order integration test proving the public testimonial output reflects the sort order saved by an admin reorder action
- [x] Add router-level coverage that asserts the actual public testimonials procedure returns the persisted admin-reordered sequence

## Client Change Review and Admin Reliability Testing
- [x] Review WSCGWebChanges8.13.26.docx and record each approved change or defect in CURRENT_CONTEXT.md
- [x] Reproduce the client-reported admin workflow and image-preview failures against Railway production and diagnose their root causes
- [x] Reproduce the client-reported admin workflow and image-preview failures against Railway production and diagnose their root causes
- [x] Fix Save Details revert: reinitialize MediaCard local state from server data on each refetch so edits persist visually after saving
- [x] Fix draft-asset preview: serve draft assets through a protected admin preview route so newly uploaded images are visible before publication
- [x] Fix unassigned-upload publication: ensure the Publish button is clearly accessible and the workflow is self-explanatory for newly uploaded assets
- [x] Remove the All Work tab and add a Print Procurement tab between Branding and Client Logos in the public gallery
- [ ] Verify all three fixes and the gallery-tab change against the live Railway site before the 25-loop test run
- [ ] Import the client-approved Print Procurement portfolio images into the new gallery tab once the non-empty source files are supplied or located
- [ ] Verify on live Railway that All Work is absent and the Print Procurement tab renders correctly with client-approved populated assets after import
- [ ] Complete 25 client-style verification loops spanning admin login, media management, thumbnail/preview behavior, form submissions, and public Railway pages
- [ ] Push verified fixes to a rollback branch and GitHub main, deploy to Railway, and record the final live test matrix in CURRENT_CONTEXT.md
