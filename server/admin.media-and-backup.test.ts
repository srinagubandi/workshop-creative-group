import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getAdminSession: vi.fn(),
  setMediaStatus: vi.fn(),
  getMediaAsset: vi.fn(),
  updateMediaAsset: vi.fn(),
  reorderMediaPlacements: vi.fn(),
  createAdminSession: vi.fn(),
  createContactSubmission: vi.fn(),
  deleteAdminSession: vi.fn(),
  getAllContactSubmissions: vi.fn(),
  getAllQuoteRequests: vi.fn(),
  getRecentBackups: vi.fn(),
  listMediaAssets: vi.fn(),
  listMediaPlacements: vi.fn(),
  logDbBackup: vi.fn(),
  saveMediaPlacement: vi.fn(),
  updateMediaPlacement: vi.fn(),
  updateContactStatus: vi.fn(),
  updateQuoteStatus: vi.fn(),
  setMediaThumbnail: vi.fn(),
  listTestimonials: vi.fn(),
  createTestimonial: vi.fn(),
  updateTestimonial: vi.fn(),
  setTestimonialStatus: vi.fn(),
  reorderTestimonials: vi.fn(),
  saveSiteTextOverride: vi.fn(),
  deleteSiteTextOverride: vi.fn(),
  storageGetSignedUrl: vi.fn(),
  runDatabaseBackup: vi.fn(),
  sendAdminDocumentationEmail: vi.fn(),
}));

vi.mock("./db", () => ({
  createAdminSession: mocks.createAdminSession,
  createContactSubmission: mocks.createContactSubmission,
  deleteAdminSession: mocks.deleteAdminSession,
  getAllContactSubmissions: mocks.getAllContactSubmissions,
  getAllQuoteRequests: mocks.getAllQuoteRequests,
  getAdminSession: mocks.getAdminSession,
  getMediaAsset: mocks.getMediaAsset,
  getRecentBackups: mocks.getRecentBackups,
  listMediaAssets: mocks.listMediaAssets,
  listMediaPlacements: mocks.listMediaPlacements,
  logDbBackup: mocks.logDbBackup,
  reorderMediaPlacements: mocks.reorderMediaPlacements,
  saveMediaPlacement: mocks.saveMediaPlacement,
  setMediaStatus: mocks.setMediaStatus,
  updateMediaAsset: mocks.updateMediaAsset,
  updateMediaPlacement: mocks.updateMediaPlacement,
  updateContactStatus: mocks.updateContactStatus,
  updateQuoteStatus: mocks.updateQuoteStatus,
  setMediaThumbnail: mocks.setMediaThumbnail,
  listTestimonials: mocks.listTestimonials,
  createTestimonial: mocks.createTestimonial,
  updateTestimonial: mocks.updateTestimonial,
  setTestimonialStatus: mocks.setTestimonialStatus,
  reorderTestimonials: mocks.reorderTestimonials,
  saveSiteTextOverride: mocks.saveSiteTextOverride,
  deleteSiteTextOverride: mocks.deleteSiteTextOverride,
}));
vi.mock("./storage", () => ({ storageGetSignedUrl: mocks.storageGetSignedUrl }));
vi.mock("./backup", () => ({ runDatabaseBackup: mocks.runDatabaseBackup }));
vi.mock("./email", () => ({ sendAdminDocumentationEmail: mocks.sendAdminDocumentationEmail }));

import { adminRouter } from "./adminRouter";

const token = "verified-admin-session";
const caller = () => adminRouter.createCaller({} as any);

function media(id: number, status: "draft" | "published" | "archived") {
  return {
    id,
    status,
    storageKey: `managed-media/images/${id}.jpg`,
    originalKey: `managed-media/originals/${id}.jpg`,
    mimeType: "image/jpeg",
    sizeBytes: 1024,
    width: 100,
    height: 100,
    transformJson: null,
  };
}

describe("admin managed-media and backup safeguards", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getAdminSession.mockResolvedValue({ token, expiresAt: new Date(Date.now() + 60_000) });
  });

  it("archives and restores media only for an authenticated administrator", async () => {
    await caller().archiveMedia({ token, id: 41 });
    await caller().restoreMedia({ token, id: 41 });

    expect(mocks.setMediaStatus).toHaveBeenNthCalledWith(1, 41, "archived");
    expect(mocks.setMediaStatus).toHaveBeenNthCalledWith(2, 41, "published");
    expect(mocks.getAdminSession).toHaveBeenCalledWith(token);
  });

  it("preserves the predecessor keys and archives the replacement record after a safe in-place replacement", async () => {
    const target = media(1, "published");
    const replacement = media(2, "draft");
    mocks.getMediaAsset.mockImplementation(async (id: number) => id === 1 ? target : replacement);
    mocks.updateMediaAsset.mockResolvedValue({ id: 1 });

    await caller().replaceMedia({ token, targetId: 1, replacementId: 2 });

    expect(mocks.updateMediaAsset).toHaveBeenCalledWith(1, expect.objectContaining({
      storageKey: replacement.storageKey,
      originalKey: replacement.originalKey,
      transformJson: expect.stringContaining(target.storageKey),
    }));
    expect(mocks.setMediaStatus).toHaveBeenCalledWith(2, "archived");
  });

  it("rejects a replacement that is already public, preventing an unsafe replacement workflow", async () => {
    mocks.getMediaAsset.mockImplementation(async (id: number) => media(id, "published"));
    await expect(caller().replaceMedia({ token, targetId: 1, replacementId: 2 })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    expect(mocks.updateMediaAsset).not.toHaveBeenCalled();
  });

  it("runs a successful manual Railway backup and reports the exact recovery record", async () => {
    const backup = { success: true, filename: "wscg-manual-backup.sql", sizeBytes: 2048, key: "backups/example.sql" };
    mocks.runDatabaseBackup.mockResolvedValue(backup);
    await expect(caller().runBackup({ token })).resolves.toEqual(backup);
    expect(mocks.runDatabaseBackup).toHaveBeenCalledWith("manual");
  });

  it("returns a controlled internal error when a manual backup fails", async () => {
    mocks.runDatabaseBackup.mockRejectedValue(new Error("bucket unavailable"));
    await expect(caller().runBackup({ token })).rejects.toMatchObject({ code: "INTERNAL_SERVER_ERROR", message: "Backup failed: bucket unavailable" });
  });

  it("sends the guide and copy-review email only for an authenticated administrator", async () => {
    mocks.sendAdminDocumentationEmail.mockResolvedValue({ id: "resend-doc-message" });
    await expect(caller().sendDocumentationEmail({ token })).resolves.toEqual({ id: "resend-doc-message" });
    expect(mocks.sendAdminDocumentationEmail).toHaveBeenCalledTimes(1);
  });

  it("rejects invalid media identifiers and excessive metadata lengths before a database mutation", async () => {
    await expect(caller().archiveMedia({ token, id: 0 })).rejects.toBeTruthy();
    await expect(caller().updateMedia({ token, id: 1, altText: "x".repeat(513) })).rejects.toBeTruthy();
    expect(mocks.setMediaStatus).not.toHaveBeenCalled();
    expect(mocks.updateMediaAsset).not.toHaveBeenCalled();
  });

  it("allows a thumbnail to be reset to source media or replaced with an active Media Library image", async () => {
    await caller().setMediaThumbnail({ token, id: 41, thumbnailMediaId: null });
    await caller().setMediaThumbnail({ token, id: 41, thumbnailMediaId: 92 });
    expect(mocks.setMediaThumbnail).toHaveBeenNthCalledWith(1, 41, null);
    expect(mocks.setMediaThumbnail).toHaveBeenNthCalledWith(2, 41, 92);
  });

  it("creates testimonial submissions as drafts and keeps publication and archive actions authenticated", async () => {
    mocks.createTestimonial.mockResolvedValue({ id: 9, status: "draft" });
    await caller().createTestimonial({ token, quote: "A genuine, approved customer testimonial that exceeds the minimum length.", authorName: "Approved Customer", company: "Customer Company", mediaId: null });
    await caller().publishTestimonial({ token, id: 9 });
    await caller().archiveTestimonial({ token, id: 9 });
    expect(mocks.createTestimonial).toHaveBeenCalledWith(expect.objectContaining({ status: "draft", mediaId: null }));
    expect(mocks.setTestimonialStatus).toHaveBeenNthCalledWith(1, 9, "published");
    expect(mocks.setTestimonialStatus).toHaveBeenNthCalledWith(2, 9, "archived");
  });

  it("persists the testimonial order supplied by the administrator without generating testimonial content", async () => {
    await caller().reorderTestimonials({ token, ids: [40, 18, 7] });
    expect(mocks.reorderTestimonials).toHaveBeenCalledWith([40, 18, 7]);
  });

  it("saves and resets public text overrides only through an authenticated administrator session", async () => {
    mocks.saveSiteTextOverride.mockResolvedValue({ routePath: "/", fieldKey: "text|main|0", value: "Verified content" });
    await caller().saveTextOverride({ token, routePath: "/", fieldKey: "text|main|0", value: "Verified content" });
    await caller().resetTextOverride({ token, routePath: "/", fieldKey: "text|main|0" });
    expect(mocks.saveSiteTextOverride).toHaveBeenCalledWith("/", "text|main|0", "Verified content");
    expect(mocks.deleteSiteTextOverride).toHaveBeenCalledWith("/", "text|main|0");
  });
});
