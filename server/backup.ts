import { getDb, logDbBackup } from "./db";
import { storagePut } from "./storage";

const TABLES = [
  "users", "quote_requests", "contact_submissions", "blog_posts", "db_backups",
  "admin_sessions", "media_assets", "media_placements", "site_metadata",
];

function sqlValue(value: unknown) {
  if (value === null || value === undefined) return "NULL";
  if (value instanceof Date) return `'${value.toISOString().slice(0, 19).replace("T", " ")}'`;
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return value ? "1" : "0";
  return `'${String(value).replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`;
}

export async function dumpDatabase(): Promise<{ sql: string; sizeBytes: number }> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  let sql = `-- Workshop Creative Group Railway Database Backup\n-- Generated: ${new Date().toISOString()}\n-- Tables: ${TABLES.join(", ")}\n\nSET FOREIGN_KEY_CHECKS=0;\n\n`;

  for (const table of TABLES) {
    const createResult = await (db as any).execute(`SHOW CREATE TABLE \`${table}\``);
    const createRows = Array.isArray(createResult) ? createResult[0] : createResult;
    const createRow = Array.isArray(createRows) ? createRows[0] : undefined;
    const createStatement = createRow ? Object.values(createRow).find(value => typeof value === "string" && String(value).startsWith("CREATE TABLE")) : undefined;
    if (!createStatement) throw new Error(`Unable to read schema for ${table}`);
    sql += `-- Table: ${table}\nDROP TABLE IF EXISTS \`${table}\`;\n${createStatement};\n`;

    const rawRows = await (db as any).execute(`SELECT * FROM \`${table}\``);
    const rows = Array.isArray(rawRows) ? rawRows[0] : rawRows;
    if (Array.isArray(rows) && rows.length) {
      for (const row of rows) {
        const columns = Object.keys(row).map(column => `\`${column}\``).join(", ");
        const values = Object.values(row).map(sqlValue).join(", ");
        sql += `INSERT INTO \`${table}\` (${columns}) VALUES (${values});\n`;
      }
    }
    sql += "\n";
  }

  sql += "SET FOREIGN_KEY_CHECKS=1;\n";
  return { sql, sizeBytes: Buffer.byteLength(sql, "utf8") };
}

export async function runDatabaseBackup(kind: "manual" | "scheduled" = "manual") {
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, "-");
  const filename = `wscg-${kind}-backup-${timestamp}.sql`;
  try {
    const { sql, sizeBytes } = await dumpDatabase();
    const { key, url } = await storagePut(`backups/${filename}`, Buffer.from(sql, "utf8"), "application/sql");
    await logDbBackup({ filename, fileKey: key, fileUrl: url, sizeBytes, status: "success" });
    console.log(`[Backup] ${kind} backup complete: ${filename} (${sizeBytes} bytes)`);
    return { success: true, filename, sizeBytes, key, url };
  } catch (error: any) {
    await logDbBackup({ filename, status: "failed", errorMessage: String(error?.message || error) }).catch(() => {});
    throw error;
  }
}
