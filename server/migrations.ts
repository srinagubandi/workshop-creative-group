/**
 * Startup migrations — runs CREATE TABLE IF NOT EXISTS for all tables.
 * Safe to run on every boot. Uses IF NOT EXISTS so it never drops data.
 */

import { getDb } from "./db";

const MIGRATIONS = [
  // admin_sessions
  `CREATE TABLE IF NOT EXISTS \`admin_sessions\` (
    \`id\` int AUTO_INCREMENT NOT NULL,
    \`token\` varchar(128) NOT NULL,
    \`expiresAt\` timestamp NOT NULL,
    \`createdAt\` timestamp NOT NULL DEFAULT (now()),
    CONSTRAINT \`admin_sessions_id\` PRIMARY KEY(\`id\`),
    CONSTRAINT \`admin_sessions_token_unique\` UNIQUE(\`token\`)
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
];

export async function runStartupMigrations(): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn("[Migrations] Database not available — skipping startup migrations");
    return;
  }

  for (const sql of MIGRATIONS) {
    try {
      await (db as any).execute(sql);
    } catch (err: any) {
      // Log but don't crash — table may already exist with slight differences
      console.warn("[Migrations] Migration warning:", err?.message?.slice(0, 100));
    }
  }

  console.log("[Migrations] Startup migrations complete");
}
