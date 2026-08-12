# Workshop Creative Group Admin Media System Guide

## Overview

The protected **Admin Dashboard** includes a **Media Library** for the entire website. It manages portfolio images, videos, shared brand visuals, site icons, titles, captions, alt text, page placement, publication state, and safe archiving. New files remain private until you explicitly publish them.

## Upload an Image or Video

Open **Admin Dashboard → Media Library → Upload image or video**. The system checks a file before it is accepted and clearly explains any rejection.

| Media type | Accepted formats | Maximum size | Other limit |
|---|---|---:|---|
| Image | JPG, PNG, WebP | 20 MB | No side larger than 6,000 pixels |
| Video | MP4, WebM | 250 MB | Use a web-ready export for reliable playback |

> If a file is too large, in an unsupported format, or has unsuitable image dimensions, it stays on your computer and the Media Library explains why it was not uploaded.

## Prepare, Describe, and Place an Asset

For images, use the rotation controls and crop-zoom preview before upload. Add a clear **title**, useful **alt text**, and an optional **caption**. Alt text should describe the project or visual purpose for someone who cannot see the image; it should not repeat unrelated keywords.

Set the asset’s **page**, **category**, **client**, and **project** fields. For portfolio items, use `gallery` as the page and select the correct category. Save placement before publishing a new asset.

## Publish, Unpublish, and Replace

Every uploaded asset begins as a **draft**. It is not public until you choose **Publish**. Use **Unpublish** to remove a published asset from the public site while keeping it ready for later use.

Use **Replace** on an existing item to retain its current website placement and order. The new file is uploaded as a draft first, then becomes the active version after the replacement is confirmed. The earlier version remains recoverable rather than being permanently deleted.

## Reorder, Archive, and Restore

Use **Move up** and **Move down** to adjust the order within a portfolio category or asset group. Use **Archive** instead of delete. Archiving immediately removes an asset from the public site but retains the record and original file for recovery.

Use the **Archived** tab and choose **Restore** to return an archived asset to its existing placement and order.

## Set or Replace a Thumbnail

Every media item has a **Thumbnail / poster** selector in the Media Library. Images use the source image by default. Videos show their first available source frame until you choose an image poster. Select an active image from the Media Library to use a replacement thumbnail, or reset to **Use source image** / **Use first frame from video source** at any time. Archiving preserves thumbnail choices for recovery.

## Manage Genuine Testimonials

Open **Admin Dashboard → Testimonials** to add only real, approved customer feedback. Enter the approved quote, name, title, and company. You may optionally select an existing Media Library logo or photo. New entries begin as **drafts** and remain private until you select **Publish**. Use **Edit** to correct approved information and **Move up** / **Move down** to control the public Home-page order. Archive instead of delete; restored testimonials return to draft for approval.

## Shared Website Images and Icons

The Media Library includes a **brand and system** group for the header logo, footer logo, touch icons, favicons, and other shared visual assets. These use stable managed slots, so a replacement can update the corresponding web placement without changing code.

## Backups and Private Files

The **Database Backups** tab provides a manual backup action. Backups are stored privately in the Railway bucket and are available only from the authenticated dashboard. Quote invoices and other private administrative files are protected in the same manner.

## Recommended Operating Practice

Before a major gallery refresh, create a manual backup. Upload and review new files as drafts, complete titles/alt text/placement, then publish intentionally. Archive prior assets rather than deleting them. Keep video files short and optimized for the web, and avoid placing sensitive customer information in public captions, filenames, or alt text.
