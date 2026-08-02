# Pending Gallery Updates

This file tracks gallery changes that are on hold pending receipt of revised asset files from the client.

---

## Status: ON HOLD — Awaiting Revised Asset Files

---

## Changes to Apply When Assets Are Received

### 1. Rotate Sideways Images in Large Format Gallery (90° Clockwise)

The following images are currently displayed sideways and need to be rotated 90° clockwise. These were identified from the screenshots in `Workshop_Revised_Assets.zip`:

| Screenshot Reference | Likely Filename in Gallery |
|---|---|
| Screenshot 4:33:17 PM — American Heart "Go Red" sponsor banner | `AmericanHeart_*` |
| Screenshot 4:33:47 PM — Geographic Solutions registration sign | `GeographicSolutions_*` |
| Screenshot 4:34:03 PM — Honor Health Care window graphic | `HonorHealth_*` |
| Screenshot 4:34:11 PM — ICare/Optimart/SeaVision acrylic signs | `Optimart_Signs_*` |
| Screenshot 4:34:19 PM — Focus Pointe/ICare/Optimart outdoor sign | `Optimart_Acrylic_*` |
| Screenshot 4:34:42 PM — STIHL Tour des Trees sponsor banner | `TourdesTrees_*` |

**Action:** Run `PIL Image.rotate(-90, expand=True)` on each of the above files in `client/public/gallery/large-format/`.

---

### 2. Replace Client Logos with Revised Logos

The **Client Logos** folder has a **Revised Logos** subfolder with properly sized, RGB-formatted logo files.

**Action needed:** Upload the `Revised Logos` folder from `Workshop Web Assets / Client Logos / Revised Logos`.

**Action:** Replace all files in `client/public/gallery/logos/` with the revised versions. Regenerate `client/src/data/gallery.ts`.

---

### 3. Replace Branding Logos with Revised Logos

The **Graphic Design and Branding / Branding** folder has a **Revised Logos** subfolder with properly sized, RGB-formatted logo files.

**Action needed:** Upload the `Revised Logos` folder from `Workshop Web Assets / Graphic Design and Branding / Branding / Revised Logos`.

**Action:** Replace all files in `client/public/gallery/branding/` with the revised versions. Regenerate `client/src/data/gallery.ts`.

---

### 4. Remove Pellon Pillow Insert Image from Large Format Gallery

The image `Pellon_Pillow_Insert_LargeFormatPrinting.jpg` (the last Pellon image — the decorative pillow insert packaging) should be removed from the gallery.

**File to delete:** `client/public/gallery/large-format/Pellon_Pillow_Insert_LargeFormatPrinting.jpg`

**Action:** Delete the file and remove its entry from `client/src/data/gallery.ts`.

---

### 5. Add Print Procurement Gallery

The **Print Procurement** folder now has images in it.

**Action needed:** Upload the `Print Procurement` folder from `Workshop Web Assets / Print Procurement`.

**Action:** Copy images to `client/public/gallery/print-procurement/`, compress to web size, regenerate `client/src/data/gallery.ts`, add `print-procurement` category to `GALLERY_CATEGORIES`.

---

### 6. Remove "All Files" Folder from Gallery

There is an "All Files" folder that should not appear in the gallery.

**Action:** Identify and remove any folder/category named "All Files" from the gallery data and public directory.

---

## How to Resume

When the revised asset files are ready:

1. Upload a zip containing:
   - `Revised Logos/` from Client Logos
   - `Revised Logos/` from Graphic Design and Branding / Branding
   - `Print Procurement/` folder contents

2. Reference this file and apply all 6 changes above in one pass.

3. Run `python3 /home/ubuntu/compress_gallery.py` to optimize new images.

4. Run `python3 /home/ubuntu/gen_gallery_data.py` to regenerate the gallery data.

5. Commit, push to GitHub, and deploy to Railway.
