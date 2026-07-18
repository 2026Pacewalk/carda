import { z } from "zod";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { customers } from "@db/schema";
import { createCustomerToken, verifyCustomerToken } from "./customer-auth";
import { TRPCError } from "@trpc/server";

export const customerAuthRouter = createRouter({
  // ── Register ──
  register: publicQuery
    .input(z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Invalid email address"),
      mobile: z.string().min(10, "Mobile must be at least 10 digits"),
      password: z.string().min(6, "Password must be at least 6 characters"),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();

      // Check if email exists
      const [existing] = await db
        .select()
        .from(customers)
        .where(eq(customers.email, input.email))
        .limit(1);

      if (existing) {
        throw new TRPCError({ code: "CONFLICT", message: "Email already registered" });
      }

      // Hash password
      const passwordHash = await bcrypt.hash(input.password, 12);

      // Create customer
      const [customer] = await db.insert(customers).values({
        name: input.name,
        email: input.email,
        mobile: input.mobile,
        passwordHash,
      });

      const customerId = Number(customer.insertId);
      const [newCustomer] = await db
        .select()
        .from(customers)
        .where(eq(customers.id, customerId))
        .limit(1);

      const token = await createCustomerToken(newCustomer);

      return {
        token,
        customer: {
          id: newCustomer.id,
          name: newCustomer.name,
          email: newCustomer.email,
          mobile: newCustomer.mobile,
        },
      };
    }),

  // ── Login ──
  login: publicQuery
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = getDb();

      const [customer] = await db
        .select()
        .from(customers)
        .where(eq(customers.email, input.email))
        .limit(1);

      if (!customer) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      }

      const valid = await bcrypt.compare(input.password, customer.passwordHash);
      if (!valid) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      }

      // Update last sign in
      await db.update(customers)
        .set({ lastSignInAt: new Date() })
        .where(eq(customers.id, customer.id));

      const token = await createCustomerToken(customer);

      return {
        token,
        customer: {
          id: customer.id,
          name: customer.name,
          email: customer.email,
          mobile: customer.mobile,
          status: customer.status,
        },
      };
    }),

  // ── Me ──
  me: publicQuery.query(async ({ ctx }) => {
    const token = ctx.req.headers.get("x-customer-token");
    if (!token) return null;

    const customer = await verifyCustomerToken(token);
    if (!customer) return null;

    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      mobile: customer.mobile,
      avatar: customer.avatar,
      status: customer.status,
      packageId: customer.packageId,
      createdAt: customer.createdAt,
    };
  }),

  // ── Update Profile ──
  updateProfile: publicQuery
    .input(z.object({
      name: z.string().min(2).optional(),
      mobile: z.string().min(10).optional(),
      email: z.string().email().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const token = ctx.req.headers.get("x-customer-token");
      if (!token) throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });

      const customer = await verifyCustomerToken(token);
      if (!customer) throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid token" });

      const db = getDb();
      const updateData: Record<string, unknown> = {};
      if (input.name) updateData.name = input.name;
      if (input.mobile) updateData.mobile = input.mobile;
      if (input.email) updateData.email = input.email;

      await db.update(customers)
        .set(updateData)
        .where(eq(customers.id, customer.id));

      return { success: true };
    }),

  // ── Logout ──
  logout: publicQuery.mutation(() => {
    return { success: true };
  }),

  // ── Change Password ──
  changePassword: publicQuery
    .input(z.object({
      currentPassword: z.string(),
      newPassword: z.string().min(6),
    }))
    .mutation(async ({ ctx, input }) => {
      const token = ctx.req.headers.get("x-customer-token");
      if (!token) throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });

      const customer = await verifyCustomerToken(token);
      if (!customer) throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid token" });

      const valid = await bcrypt.compare(input.currentPassword, customer.passwordHash);
      if (!valid) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Current password is incorrect" });
      }

      const newHash = await bcrypt.hash(input.newPassword, 12);
      const db = getDb();
      await db.update(customers)
        .set({ passwordHash: newHash })
        .where(eq(customers.id, customer.id));

      return { success: true };
    }),
});
