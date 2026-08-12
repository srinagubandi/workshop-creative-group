import {
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const quoteRequests = mysqlTable("quote_requests", {
  id: int("id").autoincrement().primaryKey(),
  companyName: varchar("companyName", { length: 255 }).notNull(),
  contactName: varchar("contactName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  projectType: varchar("projectType", { length: 128 }),
  quantity: varchar("quantity", { length: 128 }),
  sizeSpecs: varchar("sizeSpecs", { length: 255 }),
  deadline: varchar("deadline", { length: 128 }),
  description: text("description"),
  invoiceFileKey: varchar("invoiceFileKey", { length: 512 }),
  invoiceFileUrl: varchar("invoiceFileUrl", { length: 512 }),
  invoiceFileName: varchar("invoiceFileName", { length: 255 }),
  status: mysqlEnum("status", ["new", "reviewed", "quoted", "closed"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type QuoteRequest = typeof quoteRequests.$inferSelect;
export type InsertQuoteRequest = typeof quoteRequests.$inferInsert;

export const blogPosts = mysqlTable("blog_posts", {
  id: int("id").autoincrement().primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 512 }).notNull(),
  excerpt: text("excerpt"),
  content: text("content"),
  audioUrl: varchar("audioUrl", { length: 512 }),
  featured: int("featured").default(0).notNull(),
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = typeof blogPosts.$inferInsert;

/**
 * Contact form submissions from the Contact page.
 */
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 64 }),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["new", "read", "replied"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

/**
 * Daily database backup log.
 */
export const dbBackups = mysqlTable("db_backups", {
  id: int("id").autoincrement().primaryKey(),
  filename: varchar("filename", { length: 512 }).notNull(),
  fileKey: varchar("fileKey", { length: 512 }),
  fileUrl: varchar("fileUrl", { length: 512 }),
  sizeBytes: int("sizeBytes"),
  status: mysqlEnum("status", ["success", "failed"]).default("success").notNull(),
  errorMessage: text("errorMessage"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type DbBackup = typeof dbBackups.$inferSelect;

/**
 * Managed images and videos stored in the private Railway bucket.
 * Originals are preserved via originalKey; public delivery always resolves the active storageKey.
 */
export const mediaAssets = mysqlTable("media_assets", {
  id: int("id").autoincrement().primaryKey(),
  mediaType: mysqlEnum("mediaType", ["image", "video"]).notNull(),
  source: mysqlEnum("source", ["railway", "legacy"]).default("railway").notNull(),
  status: mysqlEnum("status", ["draft", "published", "archived"]).default("draft").notNull(),
  storageKey: varchar("storageKey", { length: 512 }),
  originalKey: varchar("originalKey", { length: 512 }),
  legacyPath: varchar("legacyPath", { length: 512 }),
  originalFilename: varchar("originalFilename", { length: 255 }).notNull(),
  mimeType: varchar("mimeType", { length: 128 }).notNull(),
  sizeBytes: int("sizeBytes").notNull(),
  width: int("width"),
  height: int("height"),
  durationSeconds: int("durationSeconds"),
  title: varchar("title", { length: 255 }),
  caption: text("caption"),
  altText: varchar("altText", { length: 512 }),
  transformJson: text("transformJson"),
  thumbnailMediaId: int("thumbnailMediaId"),
  publishedAt: timestamp("publishedAt"),
  archivedAt: timestamp("archivedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type MediaAsset = typeof mediaAssets.$inferSelect;
export type InsertMediaAsset = typeof mediaAssets.$inferInsert;

/** Genuine, owner-approved customer feedback only. */
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  status: mysqlEnum("status", ["draft", "published", "archived"]).default("draft").notNull(),
  quote: text("quote").notNull(),
  authorName: varchar("authorName", { length: 255 }).notNull(),
  authorTitle: varchar("authorTitle", { length: 255 }),
  company: varchar("company", { length: 255 }),
  mediaId: int("mediaId"),
  sortOrder: int("sortOrder").default(0).notNull(),
  publishedAt: timestamp("publishedAt"),
  archivedAt: timestamp("archivedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

/**
 * A media asset can be placed in a gallery category, a specific page/slot, or both.
 */
export const mediaPlacements = mysqlTable("media_placements", {
  id: int("id").autoincrement().primaryKey(),
  mediaId: int("mediaId").notNull(),
  pageKey: varchar("pageKey", { length: 128 }).notNull(),
  slotKey: varchar("slotKey", { length: 128 }),
  category: varchar("category", { length: 128 }),
  client: varchar("client", { length: 255 }),
  project: varchar("project", { length: 255 }),
  sortOrder: int("sortOrder").default(0).notNull(),
  isActive: int("isActive").default(1).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type MediaPlacement = typeof mediaPlacements.$inferSelect;
export type InsertMediaPlacement = typeof mediaPlacements.$inferInsert;

/**
 * Route-level metadata only. Visible page copy remains outside this table and is not changed without review.
 */
export const siteMetadata = mysqlTable("site_metadata", {
  id: int("id").autoincrement().primaryKey(),
  routePath: varchar("routePath", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 512 }).notNull(),
  canonicalPath: varchar("canonicalPath", { length: 255 }),
  ogTitle: varchar("ogTitle", { length: 255 }),
  ogDescription: varchar("ogDescription", { length: 512 }),
  structuredDataJson: text("structuredDataJson"),
  noIndex: int("noIndex").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type SiteMetadata = typeof siteMetadata.$inferSelect;
export type InsertSiteMetadata = typeof siteMetadata.$inferInsert;

/**
 * Admin sessions — simple password-based auth for the /admin dashboard.
 */
export const adminSessions = mysqlTable("admin_sessions", {
  id: int("id").autoincrement().primaryKey(),
  token: varchar("token", { length: 128 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type AdminSession = typeof adminSessions.$inferSelect;
