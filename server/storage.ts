/**
 * Railway Bucket storage adapter.
 *
 * All new uploads, backups, and managed assets are stored in the project's
 * private S3-compatible Railway bucket. Credentials are injected by Railway
 * and never exposed to the browser or committed to Git.
 */

import crypto from "node:crypto";
import { Readable } from "node:stream";
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type RailwayStorageConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  endpoint: string;
  bucket: string;
};

let client: S3Client | null = null;
let clientFingerprint = "";

function getConfig(): RailwayStorageConfig {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID ?? "";
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY ?? "";
  const region = process.env.AWS_DEFAULT_REGION ?? "";
  const endpoint = process.env.AWS_ENDPOINT_URL ?? "";
  const bucket = process.env.AWS_S3_BUCKET_NAME ?? "";

  if (!accessKeyId || !secretAccessKey || !region || !endpoint || !bucket) {
    throw new Error("Railway Bucket storage is not configured. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION, AWS_ENDPOINT_URL, and AWS_S3_BUCKET_NAME.");
  }

  return { accessKeyId, secretAccessKey, region, endpoint, bucket };
}

function getClient() {
  const config = getConfig();
  const fingerprint = `${config.endpoint}|${config.region}|${config.bucket}|${config.accessKeyId}`;
  if (!client || clientFingerprint !== fingerprint) {
    client = new S3Client({
      region: config.region,
      endpoint: config.endpoint,
      forcePathStyle: false,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
    clientFingerprint = fingerprint;
  }
  return { client, config };
}

function safeFilename(filename: string) {
  const clean = filename
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 180);
  return clean || "file";
}

function normalizeKey(key: string) {
  return key.replace(/^\/+/, "").replace(/\.\./g, "");
}

export function createStorageKey(namespace: string, filename: string) {
  const now = new Date();
  const date = now.toISOString().slice(0, 10);
  const id = crypto.randomUUID();
  return `${normalizeKey(namespace)}/${date}/${id}-${safeFilename(filename)}`;
}

export function isRailwayStorageConfigured() {
  return Boolean(
    process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY &&
      process.env.AWS_DEFAULT_REGION &&
      process.env.AWS_ENDPOINT_URL &&
      process.env.AWS_S3_BUCKET_NAME,
  );
}

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream",
): Promise<{ key: string; url: string }> {
  const { client: s3, config } = getClient();
  const key = createStorageKey(relKey.split("/")[0] || "files", relKey.split("/").at(-1) || "file");
  await s3.send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: key,
      Body: data,
      ContentType: contentType,
    }),
  );
  return { key, url: `/api/storage/${encodeURIComponent(key)}` };
}

export async function storagePutStream({
  key,
  stream,
  contentType,
  contentLength,
}: {
  key: string;
  stream: Readable;
  contentType: string;
  contentLength?: number;
}) {
  const { client: s3, config } = getClient();
  const upload = new Upload({
    client: s3,
    params: {
      Bucket: config.bucket,
      Key: normalizeKey(key),
      Body: stream,
      ContentType: contentType,
      ContentLength: contentLength,
    },
    queueSize: 3,
    partSize: 8 * 1024 * 1024,
    leavePartsOnError: false,
  });
  await upload.done();
  return { key: normalizeKey(key) };
}

export async function storageCopy(sourceKey: string, destinationKey: string, contentType?: string) {
  const { client: s3, config } = getClient();
  await s3.send(
    new CopyObjectCommand({
      Bucket: config.bucket,
      Key: normalizeKey(destinationKey),
      CopySource: `${config.bucket}/${encodeURIComponent(normalizeKey(sourceKey)).replace(/%2F/g, "/")}`,
      ...(contentType ? { ContentType: contentType, MetadataDirective: "REPLACE" } : {}),
    }),
  );
  return { key: normalizeKey(destinationKey) };
}

export async function storageGetObject(key: string) {
  const { client: s3, config } = getClient();
  return s3.send(new GetObjectCommand({ Bucket: config.bucket, Key: normalizeKey(key) }));
}

export async function storageHead(key: string) {
  const { client: s3, config } = getClient();
  return s3.send(new HeadObjectCommand({ Bucket: config.bucket, Key: normalizeKey(key) }));
}

export async function storageDelete(key: string) {
  const { client: s3, config } = getClient();
  await s3.send(new DeleteObjectCommand({ Bucket: config.bucket, Key: normalizeKey(key) }));
}

export async function storageGetSignedUrl(key: string, expiresInSeconds = 300) {
  const { client: s3, config } = getClient();
  return getSignedUrl(
    s3,
    new GetObjectCommand({ Bucket: config.bucket, Key: normalizeKey(key) }),
    { expiresIn: expiresInSeconds },
  );
}

export async function storageGet(relKey: string): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);
  return { key, url: `/api/storage/${encodeURIComponent(key)}` };
}
