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
  getMediaAsset,
  getRecentBackups,
  listMediaAssets,
  listMediaPlacements,
  logDbBackup,
  reorderMediaPlacements,
  saveMediaPlacement,
  setMediaStatus,
  updateMediaAsset,
  updateMediaPlacement,
  updateContactStatus,
  updateQuoteStatus,
} from "./db";
import { publicProcedure, router } from "./_core/trpc";
import { storageGetSignedUrl } from "./storage";
import { runDatabaseBackup } from "./backup";

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
      try {
        return await runDatabaseBackup("manual");
      } catch (err: any) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: `Backup failed: ${err?.message}` });
      }
    }),

  // ── Managed media ──
  mediaAssets: publicProcedure
    .input(z.object({ token: z.string(), status: z.enum(["draft", "published", "archived"]).optional() }))
    .query(async ({ input }) => {
      await requireAdmin(input.token);
      const [assets, placements] = await Promise.all([listMediaAssets(input.status), listMediaPlacements()]);
      return assets.map(asset => ({ ...asset, placements: placements.filter(placement => placement.mediaId === asset.id) }));
    }),

  updateMedia: publicProcedure
    .input(z.object({
      token: z.string(), id: z.number().int().positive(), title: z.string().trim().max(255).optional(),
      caption: z.string().trim().max(2000).optional(), altText: z.string().trim().max(512).optional(),
    }))
    .mutation(async ({ input }) => {
      await requireAdmin(input.token);
      const { token, id, ...data } = input;
      return updateMediaAsset(id, data);
    }),

  addMediaPlacement: publicProcedure
    .input(z.object({
      token: z.string(), mediaId: z.number().int().positive(), pageKey: z.string().trim().min(1).max(128),
      slotKey: z.string().trim().max(128).optional(), category: z.string().trim().max(128).optional(),
      client: z.string().trim().max(255).optional(), project: z.string().trim().max(255).optional(),
      sortOrder: z.number().int().min(0).optional(),
    }))
    .mutation(async ({ input }) => {
      await requireAdmin(input.token);
      const { token, ...placement } = input;
      return saveMediaPlacement({ ...placement, isActive: 1, sortOrder: placement.sortOrder ?? 0 });
    }),

  updateMediaPlacement: publicProcedure
    .input(z.object({
      token: z.string(), id: z.number().int().positive(), pageKey: z.string().trim().min(1).max(128).optional(),
      slotKey: z.string().trim().max(128).nullable().optional(), category: z.string().trim().max(128).nullable().optional(),
      client: z.string().trim().max(255).nullable().optional(), project: z.string().trim().max(255).nullable().optional(),
      sortOrder: z.number().int().min(0).optional(), isActive: z.number().int().min(0).max(1).optional(),
    }))
    .mutation(async ({ input }) => {
      await requireAdmin(input.token);
      const { token, id, ...data } = input;
      return updateMediaPlacement(id, data);
    }),

  publishMedia: publicProcedure.input(z.object({ token: z.string(), id: z.number().int().positive() }))
    .mutation(async ({ input }) => { await requireAdmin(input.token); return setMediaStatus(input.id, "published"); }),
  unpublishMedia: publicProcedure.input(z.object({ token: z.string(), id: z.number().int().positive() }))
    .mutation(async ({ input }) => { await requireAdmin(input.token); return setMediaStatus(input.id, "draft"); }),
  archiveMedia: publicProcedure.input(z.object({ token: z.string(), id: z.number().int().positive() }))
    .mutation(async ({ input }) => { await requireAdmin(input.token); return setMediaStatus(input.id, "archived"); }),
  restoreMedia: publicProcedure.input(z.object({ token: z.string(), id: z.number().int().positive() }))
    .mutation(async ({ input }) => { await requireAdmin(input.token); return setMediaStatus(input.id, "published"); }),

  replaceMedia: publicProcedure
    .input(z.object({ token: z.string(), targetId: z.number().int().positive(), replacementId: z.number().int().positive() }))
    .mutation(async ({ input }) => {
      await requireAdmin(input.token);
      const [target, replacement] = await Promise.all([getMediaAsset(input.targetId), getMediaAsset(input.replacementId)]);
      if (!target || !replacement) throw new TRPCError({ code: "NOT_FOUND", message: "Media asset not found" });
      if (replacement.status !== "draft") throw new TRPCError({ code: "BAD_REQUEST", message: "Replacement media must still be unpublished" });
      const history = target.transformJson ? JSON.parse(target.transformJson) : {};
      const updated = await updateMediaAsset(target.id, {
        storageKey: replacement.storageKey, originalKey: replacement.originalKey || replacement.storageKey, mimeType: replacement.mimeType,
        sizeBytes: replacement.sizeBytes, width: replacement.width, height: replacement.height,
        transformJson: JSON.stringify({ ...history, replacedAt: new Date().toISOString(), priorStorageKey: target.storageKey, priorOriginalKey: target.originalKey }),
      });
      await setMediaStatus(replacement.id, "archived");
      return updated;
    }),

  reorderMedia: publicProcedure
    .input(z.object({ token: z.string(), placementIds: z.array(z.number().int().positive()).min(1).max(500) }))
    .mutation(async ({ input }) => { await requireAdmin(input.token); await reorderMediaPlacements(input.placementIds); return { success: true }; }),

  privateFileUrl: publicProcedure
    .input(z.object({ token: z.string(), key: z.string().min(1).max(512) }))
    .query(async ({ input }) => { await requireAdmin(input.token); return { url: await storageGetSignedUrl(input.key, 300) }; }),

  // ── Send test email ──
  sendTestEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      await requireAdmin(input.token);
      const { sendTestEmail } = await import("./email");
      return sendTestEmail();
    }),

  sendDocumentationEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      await requireAdmin(input.token);
      const { sendAdminDocumentationEmail } = await import("./email");
      return sendAdminDocumentationEmail();
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
