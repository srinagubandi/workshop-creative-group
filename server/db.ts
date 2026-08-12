import { and, asc, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  adminSessions,
  blogPosts,
  contactSubmissions,
  dbBackups,
  mediaAssets,
  mediaPlacements,
  InsertMediaAsset,
  InsertMediaPlacement,
  InsertBlogPost,
  InsertContactSubmission,
  InsertQuoteRequest,
  InsertUser,
  quoteRequests,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── User helpers ─────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;
  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];
    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);
    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (user.openId === ENV.ownerOpenId) { values.role = "admin"; updateSet.role = "admin"; }
    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ─── Quote request helpers ────────────────────────────────────────────────────

export async function createQuoteRequest(data: InsertQuoteRequest) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(quoteRequests).values(data);
}

export async function getAllQuoteRequests() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(quoteRequests).orderBy(desc(quoteRequests.createdAt));
}

export async function updateQuoteStatus(id: number, status: "new" | "reviewed" | "quoted" | "closed") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(quoteRequests).set({ status }).where(eq(quoteRequests.id, id));
}

// ─── Contact submission helpers ───────────────────────────────────────────────

export async function createContactSubmission(data: InsertContactSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(contactSubmissions).values(data);
}

export async function getAllContactSubmissions() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
}

export async function updateContactStatus(id: number, status: "new" | "read" | "replied") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(contactSubmissions).set({ status }).where(eq(contactSubmissions.id, id));
}

// ─── Blog post helpers ────────────────────────────────────────────────────────

export async function getAllBlogPosts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));
}

export async function getFeaturedBlogPost() {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.featured, 1)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getBlogPostBySlug(slug: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function createBlogPost(data: InsertBlogPost) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(blogPosts).values(data);
}

// ─── Admin session helpers ────────────────────────────────────────────────────

export async function createAdminSession(token: string, expiresAt: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(adminSessions).values({ token, expiresAt });
}

export async function getAdminSession(token: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(adminSessions).where(eq(adminSessions.token, token)).limit(1);
  if (result.length === 0) return null;
  const session = result[0];
  if (new Date() > session.expiresAt) {
    await db.delete(adminSessions).where(eq(adminSessions.token, token));
    return null;
  }
  return session;
}

export async function deleteAdminSession(token: string) {
  const db = await getDb();
  if (!db) return;
  return db.delete(adminSessions).where(eq(adminSessions.token, token));
}

// ─── DB backup log helpers ────────────────────────────────────────────────────

export async function logDbBackup(data: {
  filename: string;
  fileKey?: string;
  fileUrl?: string;
  sizeBytes?: number;
  status: "success" | "failed";
  errorMessage?: string;
}) {
  const db = await getDb();
  if (!db) return;
  return db.insert(dbBackups).values(data);
}

export async function getRecentBackups(limit = 30) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(dbBackups).orderBy(desc(dbBackups.createdAt)).limit(limit);
}

// ─── Managed media helpers ────────────────────────────────────────────────────

export async function createMediaAsset(data: InsertMediaAsset) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(mediaAssets).values(data);
  const insertId = Number((result as any)[0]?.insertId ?? (result as any).insertId);
  return getMediaAsset(insertId);
}

export async function getMediaAsset(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(mediaAssets).where(eq(mediaAssets.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getMediaAssetByStorageKey(storageKey: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(mediaAssets).where(eq(mediaAssets.storageKey, storageKey)).limit(1);
  return rows[0] ?? null;
}

export async function listMediaAssets(status?: "draft" | "published" | "archived") {
  const db = await getDb();
  if (!db) return [];
  return status
    ? db.select().from(mediaAssets).where(eq(mediaAssets.status, status)).orderBy(desc(mediaAssets.updatedAt))
    : db.select().from(mediaAssets).orderBy(desc(mediaAssets.updatedAt));
}

export async function updateMediaAsset(
  id: number,
  data: Partial<Pick<InsertMediaAsset, "title" | "caption" | "altText" | "storageKey" | "originalKey" | "mimeType" | "sizeBytes" | "width" | "height" | "transformJson">>,
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(mediaAssets).set(data).where(eq(mediaAssets.id, id));
  return getMediaAsset(id);
}

export async function setMediaStatus(id: number, status: "draft" | "published" | "archived") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const now = new Date();
  await db.update(mediaAssets).set({
    status,
    publishedAt: status === "published" ? now : undefined,
    archivedAt: status === "archived" ? now : null,
  }).where(eq(mediaAssets.id, id));
  return getMediaAsset(id);
}

export async function listMediaPlacements(mediaId?: number) {
  const db = await getDb();
  if (!db) return [];
  return mediaId === undefined
    ? db.select().from(mediaPlacements).orderBy(asc(mediaPlacements.pageKey), asc(mediaPlacements.sortOrder))
    : db.select().from(mediaPlacements).where(eq(mediaPlacements.mediaId, mediaId)).orderBy(asc(mediaPlacements.sortOrder));
}

export async function saveMediaPlacement(data: InsertMediaPlacement) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(mediaPlacements).values(data);
  const insertId = Number((result as any)[0]?.insertId ?? (result as any).insertId);
  const rows = await db.select().from(mediaPlacements).where(eq(mediaPlacements.id, insertId)).limit(1);
  return rows[0] ?? null;
}

export async function updateMediaPlacement(
  id: number,
  data: Partial<Pick<InsertMediaPlacement, "pageKey" | "slotKey" | "category" | "client" | "project" | "sortOrder" | "isActive">>,
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(mediaPlacements).set(data).where(eq(mediaPlacements.id, id));
  const rows = await db.select().from(mediaPlacements).where(eq(mediaPlacements.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function reorderMediaPlacements(placementIds: number[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await Promise.all(placementIds.map((id, sortOrder) => db.update(mediaPlacements).set({ sortOrder }).where(eq(mediaPlacements.id, id))));
}

export async function getPublishedGalleryMedia(category?: string) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [
    eq(mediaAssets.status, "published"),
    eq(mediaPlacements.pageKey, "gallery"),
    eq(mediaPlacements.isActive, 1),
  ];
  if (category && category !== "all") conditions.push(eq(mediaPlacements.category, category));
  return db
    .select({ asset: mediaAssets, placement: mediaPlacements })
    .from(mediaPlacements)
    .innerJoin(mediaAssets, eq(mediaPlacements.mediaId, mediaAssets.id))
    .where(and(...conditions))
    .orderBy(asc(mediaPlacements.sortOrder), asc(mediaPlacements.id));
}

export async function getPublishedSiteAsset(slotKey: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db
    .select({ asset: mediaAssets, placement: mediaPlacements })
    .from(mediaPlacements)
    .innerJoin(mediaAssets, eq(mediaPlacements.mediaId, mediaAssets.id))
    .where(and(eq(mediaAssets.status, "published"), eq(mediaPlacements.pageKey, "site-assets"), eq(mediaPlacements.slotKey, slotKey), eq(mediaPlacements.isActive, 1)))
    .limit(1);
  return rows[0] ?? null;
}
