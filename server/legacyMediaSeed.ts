import { existsSync, statSync } from "node:fs";
import { basename, join } from "node:path";
import { count, eq } from "drizzle-orm";
import { GALLERY_ITEMS } from "../client/src/data/gallery";
import { mediaAssets, mediaPlacements } from "../drizzle/schema";
import { getDb } from "./db";

const SITE_ASSETS = [
  { path: "/images/wscg-icon.jpg", slotKey: "brand-icon" },
  { path: "/images/wscg-logo-hort-sml.jpg", slotKey: "logo-horizontal-small" },
  { path: "/images/wscg-logo-hort.png", slotKey: "logo-horizontal" },
  { path: "/images/wscg-logo-no-tag.png", slotKey: "logo-no-tagline" },
  { path: "/images/wscg-logo-white-hort.webp", slotKey: "logo-footer-white" },
  { path: "/android-chrome-192x192.png", slotKey: "icon-192" },
  { path: "/android-chrome-512x512.png", slotKey: "icon-512" },
  { path: "/apple-touch-icon.png", slotKey: "apple-touch-icon" },
  { path: "/favicon-16x16.png", slotKey: "favicon-16" },
  { path: "/favicon-32x32.png", slotKey: "favicon-32" },
  { path: "/favicon-48x48.png", slotKey: "favicon-48" },
  { path: "/mstile-150x150.png", slotKey: "tile-150" },
];

function mimeForPath(filePath: string) {
  const extension = filePath.toLowerCase().split(".").at(-1);
  if (extension === "png") return "image/png";
  if (extension === "webp") return "image/webp";
  return "image/jpeg";
}

function sourceRoot() {
  return process.env.NODE_ENV === "production"
    ? join(process.cwd(), "dist", "public")
    : join(process.cwd(), "client", "public");
}

function fileSizeFor(publicPath: string) {
  const filePath = join(sourceRoot(), publicPath.replace(/^\//, ""));
  return existsSync(filePath) ? statSync(filePath).size : 0;
}

export async function seedLegacyMedia() {
  const db = await getDb();
  if (!db) return;
  const [{ total }] = await db.select({ total: count() }).from(mediaAssets);
  if (Number(total) === 0) for (let sortOrder = 0; sortOrder < GALLERY_ITEMS.length; sortOrder++) {
    const item = GALLERY_ITEMS[sortOrder];
    const result = await db.insert(mediaAssets).values({
      mediaType: "image",
      source: "legacy",
      status: "published",
      legacyPath: item.src,
      originalFilename: basename(item.src),
      mimeType: mimeForPath(item.src),
      sizeBytes: fileSizeFor(item.src),
      title: `${item.client} — ${item.project}`,
      altText: item.alt,
      caption: item.project,
      publishedAt: new Date(),
    });
    const mediaId = Number((result as any)[0]?.insertId ?? (result as any).insertId);
    await db.insert(mediaPlacements).values({
      mediaId,
      pageKey: "gallery",
      category: item.category,
      client: item.client,
      project: item.project,
      sortOrder,
      isActive: 1,
    });
  }

  for (let sortOrder = 0; sortOrder < SITE_ASSETS.length; sortOrder++) {
    const siteAsset = SITE_ASSETS[sortOrder];
    const existing = await db.select().from(mediaAssets).where(eq(mediaAssets.legacyPath, siteAsset.path)).limit(1);
    let mediaId = existing[0]?.id;
    if (!mediaId) {
      const result = await db.insert(mediaAssets).values({
        mediaType: "image", source: "legacy", status: "published", legacyPath: siteAsset.path,
        originalFilename: basename(siteAsset.path), mimeType: mimeForPath(siteAsset.path), sizeBytes: fileSizeFor(siteAsset.path),
        title: basename(siteAsset.path).replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "), altText: "Workshop Creative Group brand asset", publishedAt: new Date(),
      });
      mediaId = Number((result as any)[0]?.insertId ?? (result as any).insertId);
    }
    const placement = await db.select().from(mediaPlacements).where(eq(mediaPlacements.mediaId, mediaId)).limit(1);
    if (placement[0]) {
      await db.update(mediaPlacements).set({ slotKey: siteAsset.slotKey, sortOrder }).where(eq(mediaPlacements.id, placement[0].id));
    } else {
      await db.insert(mediaPlacements).values({ mediaId, pageKey: "site-assets", slotKey: siteAsset.slotKey, category: "brand-and-system", project: basename(siteAsset.path), sortOrder, isActive: 1 });
    }
  }
  console.log(`[Media] Ensured managed records for ${GALLERY_ITEMS.length} gallery items and ${SITE_ASSETS.length} site assets.`);
}
