import { authRouter } from "./auth-router";
import { cardRouter } from "./card-router";
import { customerAuthRouter } from "./customer-auth-router";
import { customerRouter } from "./customer-router";
import { adminRouter } from "./admin-router";
import { adminAuthRouter } from "./admin-auth-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  card: cardRouter,
  customerAuth: customerAuthRouter,
  customer: customerRouter,
  admin: adminRouter,
  adminAuth: adminAuthRouter,
});

export type AppRouter = typeof appRouter;
