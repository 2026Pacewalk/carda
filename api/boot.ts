import { Hono } from "hono";
import { bodyLimit } from "hono/body-limit";
import type { HttpBindings } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "./router";
import { createContext } from "./context";
import { env } from "./lib/env";

// Dev-server hardening: a single failed request (e.g. a malformed body reaching
// the bodyLimit middleware) must not take down the whole dev server. Register
// once, guarded against duplicate listeners on HMR reloads.
if (!env.isProduction) {
  const g = globalThis as unknown as { __mycardaDevGuards?: boolean };
  if (!g.__mycardaDevGuards) {
    g.__mycardaDevGuards = true;
    process.on("unhandledRejection", (reason) => {
      console.error("[dev] Unhandled rejection (ignored):", reason);
    });
    process.on("uncaughtException", (err) => {
      console.error("[dev] Uncaught exception (ignored):", err);
    });
  }
}

const app = new Hono<{ Bindings: HttpBindings }>();

app.use(bodyLimit({ maxSize: 50 * 1024 * 1024 }));
app.use("/api/trpc/*", async (c) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: c.req.raw,
    router: appRouter,
    createContext,
  });
});
app.all("/api/*", (c) => c.json({ error: "Not Found" }, 404));

export default app;

if (env.isProduction) {
  const { serve } = await import("@hono/node-server");
  const { serveStaticFiles } = await import("./lib/vite");
  serveStaticFiles(app);

  const port = parseInt(process.env.PORT || "3000");
  serve({ fetch: app.fetch, port }, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
