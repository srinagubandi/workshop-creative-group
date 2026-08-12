import express from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  getAdminSession: vi.fn(),
  getMediaAsset: vi.fn(),
  getPublishedSiteAsset: vi.fn(),
  createMediaAsset: vi.fn(),
  createStorageKey: vi.fn(),
  storageDelete: vi.fn(),
  storageGetObject: vi.fn(),
  storagePutStream: vi.fn(),
}));

vi.mock("./db", () => ({
  createMediaAsset: mocks.createMediaAsset,
  getAdminSession: mocks.getAdminSession,
  getMediaAsset: mocks.getMediaAsset,
  getPublishedSiteAsset: mocks.getPublishedSiteAsset,
}));
vi.mock("./storage", () => ({
  createStorageKey: mocks.createStorageKey,
  storageDelete: mocks.storageDelete,
  storageGetObject: mocks.storageGetObject,
  storagePutStream: mocks.storagePutStream,
}));

import { registerMediaRoutes } from "./mediaRoutes";

const token = "test-admin-token";
const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function png(width = 1, height = 1) {
  return Buffer.from([
    ...PNG_SIGNATURE,
    0x00, 0x00, 0x00, 0x0d,
    0x49, 0x48, 0x44, 0x52,
    (width >>> 24) & 0xff, (width >>> 16) & 0xff, (width >>> 8) & 0xff, width & 0xff,
    (height >>> 24) & 0xff, (height >>> 16) & 0xff, (height >>> 8) & 0xff, height & 0xff,
    0x08, 0x06, 0x00, 0x00, 0x00,
  ]);
}

async function withServer<T>(work: (baseUrl: string) => Promise<T>) {
  const app = express();
  registerMediaRoutes(app);
  const server = await new Promise<ReturnType<typeof app.listen>>(resolve => {
    const listener = app.listen(0, "127.0.0.1", () => resolve(listener));
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Test server did not expose a TCP port.");
  try {
    return await work(`http://127.0.0.1:${address.port}`);
  } finally {
    await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
  }
}

async function upload(baseUrl: string, form: FormData) {
  return fetch(`${baseUrl}/api/admin/media/upload`, {
    method: "POST",
    headers: { "x-wscg-admin-token": token },
    body: form,
  });
}

describe("admin media upload route", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getAdminSession.mockResolvedValue({ token, expiresAt: new Date(Date.now() + 60_000) });
    let nextKey = 0;
    mocks.createStorageKey.mockImplementation(() => `managed-media/test-${++nextKey}`);
    mocks.storagePutStream.mockImplementation(async ({ key, stream }: { key: string; stream: AsyncIterable<Buffer> }) => {
      for await (const _chunk of stream) { /* consume validation stream */ }
      return { key };
    });
    mocks.storageDelete.mockResolvedValue(undefined);
    mocks.createMediaAsset.mockImplementation(async (input: any) => ({ id: 901, ...input }));
  });

  afterEach(() => vi.restoreAllMocks());

  it("rejects an unsupported MIME type before creating a media record", async () => {
    await withServer(async baseUrl => {
      const form = new FormData();
      form.append("file", new Blob(["not media"], { type: "text/plain" }), "notes.txt");
      const response = await upload(baseUrl, form);
      const body = await response.json();
      expect(response.status).toBe(400);
      expect(body.error).toContain("Unsupported file type");
      expect(mocks.createMediaAsset).not.toHaveBeenCalled();
    });
  });

  it("rejects an image that exceeds the 20 MB server-side limit", async () => {
    await withServer(async baseUrl => {
      const payload = Buffer.concat([Buffer.from([0xff, 0xd8, 0xff]), Buffer.alloc(20 * 1024 * 1024)]);
      const form = new FormData();
      form.append("file", new Blob([payload], { type: "image/jpeg" }), "oversize.jpg");
      const response = await upload(baseUrl, form);
      const body = await response.json();
      expect(response.status).toBe(400);
      expect(body.error).toContain("20 MB limit");
      expect(mocks.createMediaAsset).not.toHaveBeenCalled();
    });
  });

  it("rejects an image whose width exceeds 6,000 pixels", async () => {
    await withServer(async baseUrl => {
      const form = new FormData();
      form.append("file", new Blob([png(6001, 1)], { type: "image/png" }), "wide.png");
      const response = await upload(baseUrl, form);
      const body = await response.json();
      expect(response.status).toBe(400);
      expect(body.error).toContain("6,000 px limit");
      expect(mocks.createMediaAsset).not.toHaveBeenCalled();
    });
  });

  it("stores the edited upload as a draft while retaining the submitted original privately", async () => {
    await withServer(async baseUrl => {
      const form = new FormData();
      form.append("file", new Blob([png(1, 1)], { type: "image/png" }), "edited.png");
      form.append("original", new Blob([png(1, 1)], { type: "image/png" }), "source.png");
      const response = await upload(baseUrl, form);
      const body = await response.json();
      expect(response.status).toBe(201);
      expect(body.asset.status).toBe("draft");
      expect(mocks.storagePutStream).toHaveBeenCalledTimes(2);
      expect(mocks.createMediaAsset).toHaveBeenCalledWith(expect.objectContaining({
        storageKey: "managed-media/test-1",
        originalKey: "managed-media/test-2",
        status: "draft",
      }));
    });
  });
});
