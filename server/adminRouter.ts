/**
 * Admin Router — password-protected dashboard API
 *
 * Endpoints:
 *   admin.login        — POST with password, returns session token
 *   admin.logout       — clears session
 *   admin.me           — check if session is valid
 *   admin.quotes       — list all quote requests
 *   admin.updateQuote  — update quote status
 *   admin.contacts     — list all contact submissions
 *   admin.updateContact— update contact status
 *   admin.backups      — list recent DB backups
 *   admin.runBackup    — trigger a manual backup
 */

import { TRPCError } from "@trpc/server";
import crypto from "crypto";
import { z } from "zod";
import {
  createAdminSession,
  createContactSubmission,
  deleteAdminSession,
  getAllContactSubmissions,
  getAllQuoteRequests,
  getAdminSession,
  getRecentBackups,
  logDbBackup,
  updateContactStatus,
  updateQuoteStatus,
} from "./db";
import { publicProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";
import { getDb } from "./db";
import { quoteRequests, contactSubmissions, users, blogPosts } from "../drizzle/schema";

// ── Admin password — stored as env var, fallback for dev ──────────────────────
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Workshop2026!";
const SESSION_DURATION_HOURS = 24;

// ── Auth middleware ───────────────────────────────────────────────────────────
async function requireAdmin(token: string | undefined) {
  if (!token) throw new TRPCError({ code: "UNAUTHORIZED", message: "No session token" });
  const session = await getAdminSession(token);
  if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid or expired session" });
  return session;
}

// ── DB dump helper ────────────────────────────────────────────────────────────
async function dumpDatabase(): Promise<{ sql: string; sizeBytes: number }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const tables = ["users", "quote_requests", "contact_submissions", "blog_posts", "db_backups"];
  let sql = `-- Workshop Creative Group Database Backup\n-- Generated: ${new Date().toISOString()}\n-- Tables: ${tables.join(", ")}\n\nSET FOREIGN_KEY_CHECKS=0;\n\n`;

  for (const table of tables) {
    try {
      // Get rows using raw query
      const rows = await (db as any).execute(`SELECT * FROM \`${table}\``);
      const data = Array.isArray(rows) ? rows[0] : rows;
      if (!Array.isArray(data) || data.length === 0) {
        sql += `-- Table: ${table} (empty)\n\n`;
        continue;
      }

      sql += `-- Table: ${table} (${data.length} rows)\n`;
      sql += `TRUNCATE TABLE \`${table}\`;\n`;

      for (const row of data) {
        const cols = Object.keys(row).map(k => `\`${k}\``).join(", ");
        const vals = Object.values(row).map(v => {
          if (v === null || v === undefined) return "NULL";
          if (v instanceof Date) return `'${v.toISOString().slice(0, 19).replace("T", " ")}'`;
          if (typeof v === "number") return String(v);
          return `'${String(v).replace(/'/g, "\\'")}'`;
        }).join(", ");
        sql += `INSERT INTO \`${table}\` (${cols}) VALUES (${vals});\n`;
      }
      sql += "\n";
    } catch (err) {
      sql += `-- Error dumping ${table}: ${err}\n\n`;
    }
  }

  sql += "SET FOREIGN_KEY_CHECKS=1;\n";
  return { sql, sizeBytes: Buffer.byteLength(sql, "utf8") };
}

// ── Router ────────────────────────────────────────────────────────────────────
export const adminRouter = router({

  // ── Login ──
  login: publicProcedure
    .input(z.object({ password: z.string() }))
    .mutation(async ({ input }) => {
      if (input.password !== ADMIN_PASSWORD) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });
      }
      const token = crypto.randomBytes(48).toString("hex");
      const expiresAt = new Date(Date.now() + SESSION_DURATION_HOURS * 60 * 60 * 1000);
      await createAdminSession(token, expiresAt);
      return { token, expiresAt };
    }),

  // ── Logout ──
  logout: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      await deleteAdminSession(input.token);
      return { success: true };
    }),

  // ── Check session ──
  me: publicProcedure
    .input(z.object({ token: z.string().optional() }))
    .query(async ({ input }) => {
      if (!input.token) return null;
      const session = await getAdminSession(input.token);
      return session ? { valid: true, expiresAt: session.expiresAt } : null;
    }),

  // ── Quote requests ──
  quotes: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      await requireAdmin(input.token);
      return getAllQuoteRequests();
    }),

  updateQuote: publicProcedure
    .input(z.object({
      token: z.string(),
      id: z.number(),
      status: z.enum(["new", "reviewed", "quoted", "closed"]),
    }))
    .mutation(async ({ input }) => {
      await requireAdmin(input.token);
      await updateQuoteStatus(input.id, input.status);
      return { success: true };
    }),

  // ── Contact submissions ──
  contacts: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      await requireAdmin(input.token);
      return getAllContactSubmissions();
    }),

  updateContact: publicProcedure
    .input(z.object({
      token: z.string(),
      id: z.number(),
      status: z.enum(["new", "read", "replied"]),
    }))
    .mutation(async ({ input }) => {
      await requireAdmin(input.token);
      await updateContactStatus(input.id, input.status);
      return { success: true };
    }),

  // ── DB Backups ──
  backups: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      await requireAdmin(input.token);
      return getRecentBackups(30);
    }),

  runBackup: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      await requireAdmin(input.token);
      const timestamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, "-");
      const filename = `wscg-backup-${timestamp}.sql`;

      try {
        const { sql, sizeBytes } = await dumpDatabase();
        const buffer = Buffer.from(sql, "utf8");
        const { key, url } = await storagePut(`backups/${filename}`, buffer, "text/plain");

        await logDbBackup({ filename, fileKey: key, fileUrl: url, sizeBytes, status: "success" });
        return { success: true, filename, sizeBytes, url };
      } catch (err: any) {
        await logDbBackup({ filename, status: "failed", errorMessage: String(err?.message || err) });
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: `Backup failed: ${err?.message}` });
      }
    }),

  // ── Send test email ──
  sendTestEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      await requireAdmin(input.token);
      const { sendTestEmail } = await import("./email");
      return sendTestEmail();
    }),

  // ── Stats summary ──
  stats: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      await requireAdmin(input.token);
      const [quotes, contacts, backups] = await Promise.all([
        getAllQuoteRequests(),
        getAllContactSubmissions(),
        getRecentBackups(1),
      ]);
      return {
        totalQuotes: quotes.length,
        newQuotes: quotes.filter(q => q.status === "new").length,
        totalContacts: contacts.length,
        newContacts: contacts.filter(c => c.status === "new").length,
        lastBackup: backups[0]?.createdAt ?? null,
      };
    }),
});
