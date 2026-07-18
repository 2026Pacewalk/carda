import { z } from "zod";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users } from "@db/schema";
import { createAdminToken, verifyAdminToken } from "./admin-auth";
import { TRPCError } from "@trpc/server";

export const adminAuthRouter = createRouter({
  // ── Login ──
  login: publicQuery
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();

      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, input.email))
        .limit(1);

      if (!user || user.role !== "admin" || !user.passwordHash) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      }

      const valid = await bcrypt.compare(input.password, user.passwordHash);
      if (!valid) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      }

      await db.update(users)
        .set({ lastSignInAt: new Date() })
        .where(eq(users.id, user.id));

      const token = await createAdminToken(user);

      return {
        token,
        admin: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      };
    }),

  // ── Me ──
  me: publicQuery.query(async ({ ctx }) => {
    const token = ctx.req.headers.get("x-admin-token");
    if (!token) return null;

    const user = await verifyAdminToken(token);
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };
  }),

  // ── Logout ──
  logout: publicQuery.mutation(() => {
    return { success: true };
  }),

  // ── Change Password ──
  changePassword: publicQuery
    .input(z.object({
      currentPassword: z.string(),
      newPassword: z.string().min(8, "Password must be at least 8 characters"),
    }))
    .mutation(async ({ ctx, input }) => {
      const token = ctx.req.headers.get("x-admin-token");
      if (!token) throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });

      const user = await verifyAdminToken(token);
      if (!user || !user.passwordHash) throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid token" });

      const valid = await bcrypt.compare(input.currentPassword, user.passwordHash);
      if (!valid) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Current password is incorrect" });
      }

      const newHash = await bcrypt.hash(input.newPassword, 12);
      const db = getDb();
      await db.update(users)
        .set({ passwordHash: newHash })
        .where(eq(users.id, user.id));

      return { success: true };
    }),
});
