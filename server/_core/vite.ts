import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { injectSeoMetadata, resolvePageMetadata } from "../seo";
import { getStaticCacheControl } from "@shared/performance";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const pathname = new URL(url, "http://localhost").pathname;
      const metadata = await resolvePageMetadata(pathname);
      const page = injectSeoMetadata(await vite.transformIndexHtml(url, template), pathname, metadata);
      res.status(metadata === null ? 404 : 200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath, {
    index: false,
    setHeaders(res, filePath) {
      const cacheControl = getStaticCacheControl(filePath);
      if (cacheControl) res.setHeader("Cache-Control", cacheControl);
    },
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", async (req, res, next) => {
    try {
      const indexFile = path.resolve(distPath, "index.html");
      const template = await fs.promises.readFile(indexFile, "utf-8");
      res.setHeader("Cache-Control", "no-cache, max-age=0, must-revalidate");
      // Express consumes req.path inside app.use("*"); originalUrl retains
      // the actual public route and excludes query strings via URL.pathname.
      const pathname = new URL(req.originalUrl, "http://localhost").pathname;
      const metadata = await resolvePageMetadata(pathname);
      res.status(metadata === null ? 404 : 200).type("html").send(injectSeoMetadata(template, pathname, metadata));
    } catch (error) {
      next(error);
    }
  });
}
