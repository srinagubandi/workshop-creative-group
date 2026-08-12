/**
 * Startup migrations — runs CREATE TABLE IF NOT EXISTS for all tables.
 * Safe to run on every boot. Uses IF NOT EXISTS so it never drops data.
 * This ensures Railway's database always has the correct schema.
 */

import { getDb } from "./db";

const MIGRATIONS = [
  `CREATE TABLE IF NOT EXISTS \`users\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`openId\` varchar(64) NOT NULL,
    \`name\` text,
    \`email\` varchar(320),
    \`loginMethod\` varchar(64),
    \`role\` enum('user','admin') NOT NULL DEFAULT 'user',
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
    \`lastSignedIn\` timestamp NOT NULL DEFAULT (now()),
    CONSTRAINT \`users_id\` PRIMARY KEY(\`id\`),
    CONSTRAINT \`users_openId_unique\` UNIQUE(\`openId\`)
  )`,
  `CREATE TABLE IF NOT EXISTS \`quote_requests\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`companyName\` varchar(255) NOT NULL,
    \`contactName\` varchar(255) NOT NULL,
    \`email\` varchar(320) NOT NULL,
    \`phone\` varchar(64),
    \`projectType\` varchar(128),
    \`quantity\` varchar(128),
    \`sizeSpecs\` varchar(255),
    \`deadline\` varchar(128),
    \`description\` text,
    \`invoiceFileKey\` varchar(512),
    \`invoiceFileUrl\` varchar(512),
    \`invoiceFileName\` varchar(255),
    \`status\` enum('new','reviewed','quoted','closed') NOT NULL DEFAULT 'new',
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT \`quote_requests_id\` PRIMARY KEY(\`id\`)
  )`,
  `CREATE TABLE IF NOT EXISTS \`blog_posts\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`slug\` varchar(255) NOT NULL,
    \`title\` varchar(512) NOT NULL,
    \`excerpt\` text,
    \`content\` text,
    \`audioUrl\` varchar(512),
    \`featured\` int NOT NULL DEFAULT 0,
    \`publishedAt\` timestamp NOT NULL DEFAULT (now()),
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT \`blog_posts_id\` PRIMARY KEY(\`id\`),
    CONSTRAINT \`blog_posts_slug_unique\` UNIQUE(\`slug\`)
  )`,
  `CREATE TABLE IF NOT EXISTS \`contact_submissions\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`name\` varchar(255) NOT NULL,
    \`email\` varchar(320) NOT NULL,
    \`phone\` varchar(64),
    \`message\` text NOT NULL,
    \`status\` enum('new','read','replied') NOT NULL DEFAULT 'new',
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT \`contact_submissions_id\` PRIMARY KEY(\`id\`)
  )`,
  `CREATE TABLE IF NOT EXISTS \`db_backups\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`filename\` varchar(512) NOT NULL,
    \`fileKey\` varchar(512),
    \`fileUrl\` varchar(512),
    \`sizeBytes\` int,
    \`status\` enum('success','failed') NOT NULL DEFAULT 'success',
    \`errorMessage\` text,
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    CONSTRAINT \`db_backups_id\` PRIMARY KEY(\`id\`)
  )`,
  `CREATE TABLE IF NOT EXISTS \`media_assets\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`mediaType\` enum('image','video') NOT NULL,
    \`source\` enum('railway','legacy') NOT NULL DEFAULT 'railway',
    \`status\` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
    \`storageKey\` varchar(512),
    \`originalKey\` varchar(512),
    \`legacyPath\` varchar(512),
    \`originalFilename\` varchar(255) NOT NULL,
    \`mimeType\` varchar(128) NOT NULL,
    \`sizeBytes\` int NOT NULL,
    \`width\` int,
    \`height\` int,
    \`durationSeconds\` int,
    \`title\` varchar(255),
    \`caption\` text,
    \`altText\` varchar(512),
    \`transformJson\` text,
    \`thumbnailMediaId\` int,
    \`publishedAt\` timestamp NULL,
    \`archivedAt\` timestamp NULL,
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT \`media_assets_id\` PRIMARY KEY(\`id\`)
  )`,
  `ALTER TABLE \`media_assets\` ADD COLUMN IF NOT EXISTS \`thumbnailMediaId\` int`,
  `CREATE TABLE IF NOT EXISTS \`testimonials\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`status\` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
    \`quote\` text NOT NULL,
    \`authorName\` varchar(255) NOT NULL,
    \`authorTitle\` varchar(255),
    \`company\` varchar(255),
    \`mediaId\` int,
    \`sortOrder\` int NOT NULL DEFAULT 0,
    \`publishedAt\` timestamp NULL,
    \`archivedAt\` timestamp NULL,
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT \`testimonials_id\` PRIMARY KEY(\`id\`),
    INDEX \`testimonials_status_sort_idx\` (\`status\`, \`sortOrder\`)
  )`,
  `CREATE TABLE IF NOT EXISTS \`media_placements\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`mediaId\` int NOT NULL,
    \`pageKey\` varchar(128) NOT NULL,
    \`slotKey\` varchar(128),
    \`category\` varchar(128),
    \`client\` varchar(255),
    \`project\` varchar(255),
    \`sortOrder\` int NOT NULL DEFAULT 0,
    \`isActive\` int NOT NULL DEFAULT 1,
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT \`media_placements_id\` PRIMARY KEY(\`id\`),
    INDEX \`media_placements_mediaId_idx\` (\`mediaId\`),
    INDEX \`media_placements_page_category_idx\` (\`pageKey\`, \`category\`)
  )`,
  `CREATE TABLE IF NOT EXISTS \`site_metadata\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`routePath\` varchar(255) NOT NULL,
    \`title\` varchar(255) NOT NULL,
    \`description\` varchar(512) NOT NULL,
    \`canonicalPath\` varchar(255),
    \`ogTitle\` varchar(255),
    \`ogDescription\` varchar(512),
    \`structuredDataJson\` text,
    \`noIndex\` int NOT NULL DEFAULT 0,
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    \`updatedAt\` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT \`site_metadata_id\` PRIMARY KEY(\`id\`),
    CONSTRAINT \`site_metadata_routePath_unique\` UNIQUE(\`routePath\`)
  )`,
  `CREATE TABLE IF NOT EXISTS \`admin_sessions\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`token\` varchar(128) NOT NULL,
    \`expiresAt\` timestamp NOT NULL,
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    CONSTRAINT \`admin_sessions_id\` PRIMARY KEY(\`id\`),
    CONSTRAINT \`admin_sessions_token_unique\` UNIQUE(\`token\`)
  )`,
];

export async function runStartupMigrations(): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Migrations] Database not available — skipping startup migrations");
    return;
  }

  let created = 0;
  for (const sql of MIGRATIONS) {
    try {
      await (db as any).execute(sql);
      created++;
    } catch (err: any) {
      console.warn("[Migrations] Warning:", err?.message?.slice(0, 120));
    }
  }

  console.log(`[Migrations] Startup migrations complete (${created}/${MIGRATIONS.length} tables ensured)`);
}
