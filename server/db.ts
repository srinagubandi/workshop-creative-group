import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  adminSessions,
  blogPosts,
  contactSubmissions,
  dbBackups,
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
  // Clean up expired sessions first
  await db.delete(adminSessions).where(eq(adminSessions.token, ""));
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
