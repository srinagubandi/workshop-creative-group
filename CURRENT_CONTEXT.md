# Workshop Creative Group — Current Project Context

> **Purpose:** This is the durable operational record for future updates. Keep it current whenever the production architecture, content policy, asset workflow, deployment state, or user-approved requirement changes.

## Production Overview

| Item | Current state |
|---|---|
| Public website | `https://www.workshopcreativegroup.com` |
| Railway fallback URL | `https://web-production-d7aa.up.railway.app` |
| Railway project | `workshop-creative-group` |
| Source repository | `https://github.com/srinagubandi/workshop-creative-group` |
| Application stack | React, Vite, TypeScript, Express, tRPC, Drizzle ORM, and Railway MySQL |
| Admin area | `/admin`, protected by the configured administrative password |
| Alert email | `brent@workshopcreativegroup.com` via Resend |

## Non-Negotiable Delivery Rules

The public application, its data, media, storage, email delivery, and deployment must use **Railway and GitHub only**. Do not introduce Manus-hosted features, storage, notification services, hosting, or deployment dependencies into the live application.

All production changes must be created on a new Git branch, reviewed and tested, pushed to GitHub, and manually deployed to Railway only after the work is complete.

## Current Approved Work

The owner approved a full pre-change backup and a complete password-protected media-management system covering all public website imagery and video. The system must support upload, in-place replacement, preflight file-size/format/dimension warnings, image crop and rotation with preview, ordering, page and gallery placement, editable title/caption/alt text, explicit publishing, archive instead of deletion, and archive restoration.

Accepted video formats are **MP4** and **WebM**. Newly uploaded media remains unpublished until an administrator explicitly publishes it. Media must be durable in Railway-managed storage, not committed as user uploads to GitHub and not kept in a deploy-ephemeral filesystem.

Visible on-page copy must not change without review. The implementation may apply metadata-only nationwide SEO, AEO, and GEO improvements. A page-by-page list of recommended visible-copy edits must be delivered for review before any visible text is changed.

## Storage and Backup Transition

On 2026-08-12, a private Railway Storage Bucket was created for the production environment and renamed **`workshop-media-backups`**. Its S3-compatible credentials must be injected into the web service via Railway variable references; do not commit or record credentials in this repository.

Railway object storage is private. Public website assets should be delivered through controlled backend routes or short-lived signed links as appropriate. A database backup must include every application table and relevant media-manifest data. The first complete recoverable backup must be completed before schema or public-content changes, then Brent must receive a confirmation email.

## Architecture References

The Railway bucket integration follows the official [Storage Buckets documentation](https://docs.railway.com/storage-buckets) and [Upload and Serving Files guide](https://docs.railway.com/guides/storage-buckets-guide). Railway Buckets are private, S3-compatible object storage and support presigned access, backend proxying, and multipart uploads. The design will use a backend media route for public-site delivery and short-lived signed downloads for sensitive administrative files.

The backup strategy follows Railway’s [MySQL guidance](https://docs.railway.com/databases/mysql) and [Volume Backups reference](https://docs.railway.com/volumes/backups). Railway bucket snapshots are not automatic, so the application must maintain its own backup archive and immutable-style manifests for database exports and recovery records.

## Railway Bucket Connection

The production `web` service now has the secure Railway bucket variables injected as `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_DEFAULT_REGION`, `AWS_ENDPOINT_URL`, and `AWS_S3_BUCKET_NAME`. Values remain private in Railway and must never be written to source control. The replacement storage adapter will use these names only.

## Approved Media System Architecture

| Concern | Implementation decision |
|---|---|
| Storage | Use the private Railway S3-compatible bucket. Do not add any new public-site dependency on Manus storage or services. |
| Upload protocol | The authenticated admin uploads one file at a time through a streaming application endpoint. The server validates file type, detected file signature, size, and image dimensions before storing in Railway. |
| Supported formats | JPG, PNG, and WebP for images; MP4 and WebM for video. The user interface will explain the limits before upload and return actionable validation errors. |
| Limits | Images: 20 MB maximum and 6,000 pixels per side. Video: 250 MB maximum. Any rejected file remains unaltered on the administrator’s device. |
| Image edits | Crop and rotate in the browser with a preview. The original is retained privately; each confirmed edit creates a new bucket version that can be recovered. |
| Publication | Every new asset begins unpublished. Publishing, unpublishing, changing placement, and reordering are distinct authenticated actions. |
| Archive | Archiving removes an asset from public rendering but preserves original and derivative files. Restore returns it to its previous placement and ordering. |
| Public delivery | Public images and videos are supplied by a controlled application media route with cache headers. Private originals, archives, backups, and invoice files are never public. |
| Admin downloads | Invoice and backup downloads use short-lived authenticated access rather than permanent public URLs. |
| Existing assets | The deployed Git commit and all tracked public media are preserved in the Railway backup bucket. Existing static assets will be represented as managed records and migrated into Railway storage before their public references are replaced. |
| Records | Add `media_assets`, `media_placements`, and `site_metadata` tables. Media records carry storage keys, original keys, MIME/size/dimensions, title/caption/alt text, status, and audit timestamps. Placements carry route/slot/category/client/project and sort order. |
| Backups | Per owner decision on 2026-08-12, use the Railway bucket-backed **manual** backup action in the admin dashboard only. Do not operate a scheduled cron service. |

## Metadata Direction

Metadata should target a national B2B print-brokerage audience. Preserve the approved positioning that Workshop Creative Group can save clients **up to 20% on printing costs**. Add valid route-specific title and description data, canonical URLs, Open Graph/Twitter metadata, robots and sitemap directives, media alt text, and appropriate organization/service structured data. Do not make unsupported business or location claims.

## Required Deliverables

Brent must receive emails at `brent@workshopcreativegroup.com` for: the initial backup confirmation, page-by-page visible-copy recommendations, and the new-admin user guide. The admin dashboard must also include a permanent Help section that explains the media workflow.

## Change Log

| Date | Change |
|---|---|
| 2026-08-12 | Created current context record and confirmed Railway-only storage architecture for the upcoming media-management expansion. |
| 2026-08-12 | Created private Railway bucket `workshop-media-backups`; Railway applied AWS SDK-compatible bucket variable references to the production web service and initiated a service rebuild. The rebuild was still in progress during the initial verification; follow with status confirmation and an application-level storage test. |
| 2026-08-12 | Owner approved a temporary protected Railway MySQL TCP proxy solely to create a complete pre-change export. The proxy was enabled only for the export, then removed immediately after verification. |
| 2026-08-12 | Created and uploaded a recoverable MySQL pre-change export to the private Railway bucket: `backups/prechange/workshop-creative-group-prechange-20260812T180407Z.sql.gz`. The SHA-256 is `696002628da10fb3ceac7d32aa17bb3ece98c28611fa94d3a3190e3c9a1ac813`; six existing application tables were verified. Preserved the one historical invoice attachment at `backups/prechange/invoices/7-Invoice_6935.pdf`. |
| 2026-08-12 | Stored a pre-change source archive for deployed commit `7e69b7b985a62815e1f9dbd61328156586baef1a` and a complete tracked-public-media inventory in the private Railway bucket. Archive SHA-256: `1272b75277c649d891bfef2ee01c550444dcaf59104ff385a0c788f0acc39aad`. Media-manifest SHA-256: `760359666562276666eea612b768ddb8f12e82b05ff05eda3198cf85deba0b3e`. |
| 2026-08-12 | Sent the backup confirmation to `brent@workshopcreativegroup.com` through Resend. Confirmed message ID: `965b03bf-488e-4f46-ab75-3289e65921b6`. |
| 2026-08-12 | Local verification confirms the new media schema has seeded 157 managed records: 145 gallery placements and 12 site/brand/system assets. The public gallery is reading the managed database records with a safe static fallback during migration. |
| 2026-08-12 | Verified the protected local `/admin` workflow: the Media Library and permanent Help tabs render after password authentication. The Media Library shows seeded published assets, file-limit guidance, metadata fields, placement controls, publish/unpublish, archive/restore, replacement, and ordering controls. |
| 2026-08-12 | The authenticated local admin now uses an explicit noindex directive. The Media Library supports an image-preparation step before upload and has a searchable status view; the associated Railway upload route retains an unedited original object when a rotated or crop-zoomed image is uploaded. |
| 2026-08-12 | Focused local browser verification confirms the Media Library’s **Archived** view exposes a clearly labeled “Search archived assets” control and an empty-state message when there are no archived records. |
| 2026-08-12 | Focused local browser verification loaded a project image into the Media Library preparation screen, exposed the preview, crop-zoom slider, rotation controls, and edited-upload action, and confirmed that **Rotate right** visibly changed the preview orientation. The image was not submitted, so no test asset was added. |
| 2026-08-12 | Pushed the verified feature branch to GitHub and merged commit `4a1c7cf` into `main` for Railway deployment. The Railway service dashboard was opened to monitor the production rollout. |
| 2026-08-12 | The live Railway site now serves the new sitemap successfully. Production `/admin` accepted the established administrator password and began the authenticated dashboard session for live verification. |
| 2026-08-12 | Live admin verification confirms existing quote records remain visible and the historical invoice now resolves through the protected Railway storage route. The deployed Media Library, file-limit guidance, and search control are present while its managed-asset query completes. |
| 2026-08-12 | The deployed Media Library loaded its managed production assets successfully. The live Help tab includes the permanent operating guide and the owner-approved “Email Guide” action for the copy-recommendation review and media-admin instructions. |
| 2026-08-12 | The live Help action sent the requested copy-recommendation review and media-system guide; the interface confirmed “Sent.” The live Database Backups tab now correctly describes manual Railway bucket backups and lists prior recovery records. |
| 2026-08-12 | A live manual-backup test was initiated from the deployed admin dashboard. The page did not show a new recovery record or completion confirmation within the verification window, so the Railway backup action requires production-log diagnosis before it can be marked verified. |
| 2026-08-12 | Production diagnosis identified the backup failure: the deployed web service does not currently resolve the expected Railway bucket variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_DEFAULT_REGION`, `AWS_ENDPOINT_URL`, and `AWS_S3_BUCKET_NAME`). The secure bucket must be reattached or the service-variable references corrected in Railway before backups and uploads can run. |
| 2026-08-12 | The Railway web-service Variables page did not render its controls in the available browser session, so credential-reference repair must use the Railway API or a refreshed Railway dashboard session. No credentials were exposed or modified during the failed inspection. |
| 2026-08-12 | Railway accepted the authenticated bucket-variable repair and triggered a rebuild, but the live admin still shows the two manual backups from 18:57 UTC as failed. The prior failure timestamps predate the completed repair, so a fresh post-rebuild backup test and precise response inspection are still required. |
| 2026-08-12 | Corrected the Railway Bucket references to the documented bucket-provided names (`ACCESS_KEY_ID`, `SECRET_ACCESS_KEY`, `REGION`, `ENDPOINT`, and `BUCKET`) from `workshop-media-backups`. Railway confirmed all five mapped `AWS_*` variables resolve in the production deployment. |
| 2026-08-12 | Verified the repaired live manual backup procedure. It completed successfully at 19:09 UTC, producing a private Railway bucket object `backups/2026-08-12/815abaff-c1cf-45ac-8e4a-d31c498cf4c7-wscg-manual-backup-2026-08-12-19-09-32.sql` (161,985 bytes). |
| 2026-08-12 | Confirmed `manus-config schedule status` returns no active legacy schedules. The production policy remains manual Railway bucket backups only, with no scheduled cron task. |
| 2026-08-12 | Began an end-to-end live media lifecycle test using a small existing brand image as an unplaced, draft-only test asset. The production upload preparation view rendered the preview, crop-zoom control, rotation controls, and unedited-original recovery notice before submission. |
| 2026-08-12 | The live Railway upload completed successfully after the storage-reference repair. The test image was stored as a draft with no placement and no publication action, confirming that it is not visible on the public site. |
| 2026-08-12 | The unplaced draft test asset (`wscg-icon-edited.jpg`) was archived successfully in production. The Draft tab then returned an empty state, confirming the archive action removed it from active media without deletion. |
| 2026-08-12 | The production Archived view exposed the asset through the searchable archive workflow and restored it successfully. The restore action returned an unplaced asset, so it had no public page placement throughout the test. The asset will be re-archived as the final audit record. |
| 2026-08-12 | Re-archived the restored unplaced test asset to close the lifecycle verification. It remains retained as an internal archived audit record and has no public placement. |
| 2026-08-12 | Final production verification confirms the test asset is absent from the Published view after re-archiving. The public gallery remains limited to the established managed portfolio records. |
| 2026-08-12 | Expanded automated verification now passes 12 tests across four suites, including admin media archive/restore, safe replacement history, manual-backup success/failure, documentation-email authorization, metadata, storage-key, and admin logout coverage. Type-check and production build also pass. |
| 2026-08-12 | The live Help action confirmed successful delivery of the requested guide and copy-recommendation email to `brent@workshopcreativegroup.com`. The email is a review-only document delivery; no visible site copy was changed. |
| 2026-08-12 | Added direct Express route coverage for `/api/admin/media/upload`: unsupported file rejection, server-side 20 MB rejection, 6,000 px dimension rejection, and successful edited-image draft creation with a distinct private original object. Fixed stream-error handling so rejected uploads return controlled errors rather than leaving a rejected stream promise. Final local validation: 16 tests across five suites, TypeScript check, and production build all pass. |

## Metadata-only SEO, AEO, and GEO Strategy

Visible page copy remains unchanged pending Brent’s review. The implementation now gives each indexable public route a concise, distinct title and meta description, canonical URL, Open Graph/Twitter metadata, and crawlable JSON-LD. The public server injects the correct metadata before the single-page application loads, so crawlers receive route-specific HTML rather than a generic shell.

The strategy follows Google’s guidance to use a descriptive title for each page and avoid repeated boilerplate or keyword stuffing, and to use specific page-level descriptions rather than one repeated description. [Google title guidance](https://developers.google.com/search/docs/appearance/title-link) [Google snippet guidance](https://developers.google.com/search/docs/appearance/snippet) Organization JSON-LD is deliberately limited to the home page and only includes site-supported facts; service markup is used only for the relevant service routes. [Google Organization guidance](https://developers.google.com/search/docs/appearance/structured-data/organization)

For answer-engine and generative-engine visibility, the site uses clean canonical URLs, an XML sitemap, open crawl access for public content, semantic page titles, accessible managed-media alt text, and accurate structured data. Bing states that these SEO fundamentals also support eligibility for Copilot grounding and citations, while inaccurate structured data and manipulative language are harmful. [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
