import type { Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import fs from "fs";
import path from "path";

type App = Hono<{ Bindings: HttpBindings }>;

export function serveStaticFiles(app: App) {
  const distPath = path.resolve(import.meta.dirname, "../dist/public");

  app.use("*", serveStatic({ root: "./dist/public" }));

  app.notFound((c) => {
    // SPA fallback: serve index.html for client-side routes so deep links work
    // for browsers, crawlers, and social scrapers (which may send Accept: */*).
    // API routes return their own 404 earlier; real asset requests (paths with a
    // file extension) still 404 so missing assets aren't masked.
    const url = new URL(c.req.url);
    const isAsset = /\.[a-zA-Z0-9]+$/.test(url.pathname);
    if (c.req.method !== "GET" || isAsset) {
      return c.json({ error: "Not Found" }, 404);
    }
    const indexPath = path.resolve(distPath, "index.html");
    const content = fs.readFileSync(indexPath, "utf-8");
    return c.html(content);
  });
}
