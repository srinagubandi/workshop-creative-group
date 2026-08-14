import crypto from "node:crypto";
import { Transform } from "node:stream";
import type { Express, Request } from "express";
import Busboy from "busboy";
import { imageSize } from "image-size";
import { createMediaAsset, getAdminSession, getMediaAsset, getPublishedSiteAsset } from "./db";
import { createStorageKey, storageDelete, storageGetObject, storagePutStream } from "./storage";

const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const VIDEO_TYPES = new Set(["video/mp4", "video/webm"]);
const MAX_IMAGE_BYTES = 20 * 1024 * 1024;
const MAX_VIDEO_BYTES = 250 * 1024 * 1024;
const MAX_IMAGE_DIMENSION = 6000;
const HEADER_BYTES = 512 * 1024;

function safeHeader(value: unknown) {
  return typeof value === "string" ? value.slice(0, 512) : undefined;
}

async function requireAdminRequest(req: Request) {
  const token = safeHeader(req.header("x-wscg-admin-token")) ?? safeHeader(req.query.token);
  if (!token) return null;
  return getAdminSession(token);
}

function signatureMatches(mimeType: string, buffer: Buffer) {
  if (mimeType === "image/jpeg") return buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]));
  if (mimeType === "image/png") return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (mimeType === "image/webp") return buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP";
  if (mimeType === "video/mp4") return buffer.subarray(4, 8).toString("ascii") === "ftyp";
  if (mimeType === "video/webm") return buffer.subarray(0, 4).equals(Buffer.from([0x1a, 0x45, 0xdf, 0xa3]));
  return false;
}

function sendStorageError(res: Parameters<Express["get"]>[1] extends (req: any, res: infer R) => unknown ? R : never, err: unknown) {
  console.error("[Media] Storage route error", err);
  return (res as any).status(500).json({ error: "Unable to access the requested file." });
}

export function registerMediaRoutes(app: Express) {
  // Stable managed slots for site-wide visuals such as navigation logos and favicons.
  app.get("/site-asset/:slotKey", async (req, res) => {
    try {
      const record = await getPublishedSiteAsset(req.params.slotKey);
      if (!record) return res.status(404).end();
      const asset = record.asset;
      if (asset.legacyPath && !asset.storageKey) return res.redirect(302, asset.legacyPath);
      if (!asset.storageKey) return res.status(404).end();
      const object = await storageGetObject(asset.storageKey);
      res.setHeader("Content-Type", object.ContentType || asset.mimeType);
      if (object.ContentLength) res.setHeader("Content-Length", String(object.ContentLength));
      res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
      (object.Body as any).pipe(res);
    } catch (err) {
      sendStorageError(res as any, err);
    }
  });

  // Authenticated previews let administrators inspect draft Railway-bucket uploads before publication.
  app.get("/api/admin/media/:id/preview", async (req, res) => {
    try {
      const admin = await requireAdminRequest(req);
      if (!admin) return res.status(401).json({ error: "Admin authentication required" });
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) return res.status(404).end();
      const asset = await getMediaAsset(id);
      if (!asset) return res.status(404).end();
      if (asset.legacyPath && !asset.storageKey) return res.redirect(302, asset.legacyPath);
      if (!asset.storageKey) return res.status(404).end();
      const object = await storageGetObject(asset.storageKey);
      res.setHeader("Content-Type", object.ContentType || asset.mimeType);
      if (object.ContentLength) res.setHeader("Content-Length", String(object.ContentLength));
      res.setHeader("Cache-Control", "private, no-store");
      (object.Body as any).pipe(res);
    } catch (err) {
      sendStorageError(res as any, err);
    }
  });

  // Public published media. Legacy assets remain served from Git-backed static paths until migration.
  app.get("/media/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) return res.status(404).end();
      const asset = await getMediaAsset(id);
      if (!asset || asset.status !== "published") return res.status(404).end();
      if (asset.legacyPath && !asset.storageKey) return res.redirect(302, asset.legacyPath);
      if (!asset.storageKey) return res.status(404).end();

      const object = await storageGetObject(asset.storageKey);
      res.setHeader("Content-Type", object.ContentType || asset.mimeType);
      if (object.ContentLength) res.setHeader("Content-Length", String(object.ContentLength));
      res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
      (object.Body as any).pipe(res);
    } catch (err) {
      sendStorageError(res as any, err);
    }
  });

  // Private uploads, invoice files, and backups are available only with a valid admin session.
  app.get("/api/storage/*", async (req, res) => {
    try {
      const admin = await requireAdminRequest(req);
      if (!admin) return res.status(401).json({ error: "Admin authentication required" });
      const key = String((req.params as any)[0] || "").replace(/\.\./g, "");
      if (!key) return res.status(400).json({ error: "File key required" });
      const object = await storageGetObject(key);
      res.setHeader("Content-Type", object.ContentType || "application/octet-stream");
      if (object.ContentLength) res.setHeader("Content-Length", String(object.ContentLength));
      res.setHeader("Cache-Control", "private, no-store");
      (object.Body as any).pipe(res);
    } catch (err) {
      sendStorageError(res as any, err);
    }
  });

  app.post("/api/admin/media/upload", async (req, res) => {
    const admin = await requireAdminRequest(req);
    if (!admin) return res.status(401).json({ error: "Admin authentication required" });
    if (!req.headers["content-type"]?.includes("multipart/form-data")) {
      return res.status(415).json({ error: "Upload must use multipart/form-data." });
    }

    let uploadPromise: Promise<void> | null = null;
    let originalUploadPromise: Promise<void> | null = null;
    let uploadError: Error | null = null;
    let uploadedKey: string | null = null;
    let originalKey: string | null = null;
    let receivedFile = false;
    let assetDetails: {
      filename: string;
      mimeType: string;
      mediaType: "image" | "video";
      sizeBytes: number;
      width?: number;
      height?: number;
    } | null = null;

    const parser = Busboy({
      headers: req.headers,
      limits: { files: 2, fields: 10, fileSize: MAX_VIDEO_BYTES },
    });

    parser.on("file", (_field, file, info) => {
      const isOriginal = _field === "original";
      if (receivedFile && !isOriginal) {
        file.resume();
        uploadError = new Error("Only one file may be uploaded at a time.");
        return;
      }
      if (!isOriginal) receivedFile = true;
      const mimeType = info.mimeType.toLowerCase();
      const mediaType = IMAGE_TYPES.has(mimeType) ? "image" : VIDEO_TYPES.has(mimeType) ? "video" : null;
      if (!mediaType) {
        file.resume();
        uploadError = new Error("Unsupported file type. Use JPG, PNG, WebP, MP4, or WebM.");
        return;
      }

      const maxBytes = mediaType === "image" ? MAX_IMAGE_BYTES : MAX_VIDEO_BYTES;
      if (isOriginal && mediaType !== "image") {
        file.resume();
        uploadError = new Error("Only image originals can be retained alongside an edited upload.");
        return;
      }
      const key = createStorageKey(`managed-media/${isOriginal ? "originals" : `${mediaType}s`}`, info.filename);
      if (isOriginal) originalKey = key;
      else uploadedKey = key;
      let byteCount = 0;
      let prefix = Buffer.alloc(0);

      const validator = new Transform({
        transform(chunk, _encoding, callback) {
          byteCount += chunk.length;
          if (byteCount > maxBytes) {
            callback(new Error(`${mediaType === "image" ? "Image" : "Video"} exceeds the ${Math.round(maxBytes / 1024 / 1024)} MB limit.`));
            return;
          }
          if (prefix.length < HEADER_BYTES) prefix = Buffer.concat([prefix, chunk.subarray(0, HEADER_BYTES - prefix.length)]);
          callback(null, chunk);
        },
        flush(callback) {
          try {
            if (!signatureMatches(mimeType, prefix)) throw new Error("The file contents do not match the selected file type.");
            let width: number | undefined;
            let height: number | undefined;
            if (mediaType === "image") {
              const dimensions = imageSize(prefix);
              width = dimensions.width;
              height = dimensions.height;
              if (!width || !height) throw new Error("Could not read the image dimensions.");
              if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
                throw new Error(`Image dimensions exceed the ${MAX_IMAGE_DIMENSION.toLocaleString()} px limit.`);
              }
            }
            if (!isOriginal) assetDetails = { filename: info.filename, mimeType, mediaType, sizeBytes: byteCount, width, height };
            callback();
          } catch (err) {
            callback(err as Error);
          }
        },
      });

      file.on("limit", () => validator.destroy(new Error("Video exceeds the 250 MB limit.")));
      validator.on("error", (err) => {
        uploadError = err instanceof Error ? err : new Error(String(err));
        file.unpipe(validator);
        file.resume();
      });
      file.pipe(validator);
      const promise = storagePutStream({ key, stream: validator, contentType: mimeType })
        .then(() => undefined)
        .catch((err: unknown) => {
          uploadError = err instanceof Error ? err : new Error(String(err));
        });
      if (isOriginal) originalUploadPromise = promise;
      else uploadPromise = promise;
    });

    parser.on("error", (err) => { uploadError = err instanceof Error ? err : new Error(String(err)); });
    parser.on("finish", async () => {
      try {
        if (uploadError) throw uploadError;
        if (!receivedFile || !uploadPromise || !assetDetails || !uploadedKey) throw new Error("Select one supported image or video file to upload.");
        await Promise.all([uploadPromise, originalUploadPromise]);
        const asset = await createMediaAsset({
          mediaType: assetDetails.mediaType,
          source: "railway",
          status: "draft",
          storageKey: uploadedKey,
          originalKey: originalKey || uploadedKey,
          originalFilename: assetDetails.filename,
          mimeType: assetDetails.mimeType,
          sizeBytes: assetDetails.sizeBytes,
          width: assetDetails.width,
          height: assetDetails.height,
          title: assetDetails.filename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
          altText: "",
        });
        res.status(201).json({ asset, message: "Upload complete. Add details and publish when ready." });
      } catch (err: any) {
        if (uploadedKey) await storageDelete(uploadedKey).catch(() => {});
        if (originalKey) await storageDelete(originalKey).catch(() => {});
        res.status(400).json({ error: String(err?.message || err) });
      }
    });

    req.pipe(parser);
  });
}
