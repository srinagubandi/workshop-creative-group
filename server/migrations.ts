/**
 * Startup migrations — runs CREATE TABLE IF NOT EXISTS for all tables.
 * Safe to run on every boot. Uses IF NOT EXISTS so it never drops data.
 * This ensures Railway's database always has the correct schema.
 */

import { getDb } from "./db";

const MIGRATIONS = [
  // users
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

  // quote_requests
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

  // blog_posts
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

  // contact_submissions
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

  // db_backups
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

  // admin_sessions
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
      // Log but don't crash — table may already exist with slight differences
      console.warn("[Migrations] Warning:", err?.message?.slice(0, 120));
    }
  }

  console.log(`[Migrations] Startup migrations complete (${created}/${MIGRATIONS.length} tables ensured)`);
}
