import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { sdk } from "./sdk";
import { logDbBackup } from "../db";
import { storagePut } from "../storage";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  registerStorageProxy(app);
  registerOAuthRoutes(app);

  // ── Scheduled daily database backup endpoint ──────────────────────────────
  app.post("/api/scheduled/daily-backup", async (req, res) => {
    try {
      const user = await sdk.authenticateRequest(req);
      if (!user || !(user as any).isCron) {
        return res.status(403).json({ error: "cron-only" });
      }
    } catch {
      return res.status(403).json({ error: "unauthorized" });
    }

    const timestamp = new Date().toISOString().slice(0, 19).replace(/[T:]/g, "-");
    const filename = `wscg-auto-backup-${timestamp}.sql`;

    try {
      // Simple dump: export key tables as INSERT statements
      const { getDb } = await import("../db");
      const db = await getDb();
      if (!db) throw new Error("DB not available");

      const tables = ["users", "quote_requests", "contact_submissions", "blog_posts"];
      let sql = `-- WSCG Auto Backup ${new Date().toISOString()}\n\n`;

      for (const table of tables) {
        try {
          const rows = await (db as any).execute(`SELECT * FROM \`${table}\``);
          const data = Array.isArray(rows) ? rows[0] : rows;
          if (!Array.isArray(data) || data.length === 0) { sql += `-- ${table}: empty\n`; continue; }
          sql += `-- ${table}: ${data.length} rows\n`;
          for (const row of data) {
            const cols = Object.keys(row).map(k => `\`${k}\``).join(", ");
            const vals = Object.values(row).map(v => {
              if (v === null || v === undefined) return "NULL";
              if (v instanceof Date) return `'${v.toISOString().slice(0,19).replace("T"," ")}'`;
              if (typeof v === "number") return String(v);
              return `'${String(v).replace(/'/g, "\\'")}' `;
            }).join(", ");
            sql += `INSERT INTO \`${table}\` (${cols}) VALUES (${vals});\n`;
          }
          sql += "\n";
        } catch (e) { sql += `-- Error: ${table}: ${e}\n`; }
      }

      const buffer = Buffer.from(sql, "utf8");
      const { key, url } = await storagePut(`backups/${filename}`, buffer, "text/plain");
      await logDbBackup({ filename, fileKey: key, fileUrl: url, sizeBytes: buffer.length, status: "success" });
      console.log(`[Backup] Daily backup complete: ${filename} (${buffer.length} bytes)`);
      res.json({ ok: true, filename, sizeBytes: buffer.length });
    } catch (err: any) {
      console.error("[Backup] Failed:", err);
      await logDbBackup({ filename, status: "failed", errorMessage: String(err?.message || err) }).catch(() => {});
      res.status(500).json({ error: String(err?.message || err), timestamp: new Date().toISOString() });
    }
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
