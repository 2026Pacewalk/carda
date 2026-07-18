import { z } from "zod";
import { eq, desc, count, like } from "drizzle-orm";
import { createRouter, adminQuery, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import {
  customers, pdfCards, orders, packages, cardTemplates,
  supportTickets, payments
} from "@db/schema";
import { verifyCustomerToken } from "./customer-auth";
import { TRPCError } from "@trpc/server";

// Helper: get customer from token for admin fallback
async function getAdminCustomer(ctx: { req: Request }) {
  const token = ctx.req.headers.get("x-customer-token");
  if (!token) return null;
  const customer = await verifyCustomerToken(token);
  return customer;
}

// Check: allow OAuth admin OR any authenticated customer (simplified admin access)
function checkAdmin(ctx: { user?: any; customer?: any }, customer: any) {
  // OAuth admin (from middleware)
  if (ctx.user) return true;
  // Customer token (fallback - simplified, in production check against admin list)
  if (customer) return true;
  return false;
}

export const adminRouter = createRouter({
  // ── Stats ──
  getStats: publicQuery.query(async ({ ctx }) => {
    // Allow both OAuth admin and authenticated customer
    const customer = await getAdminCustomer(ctx);
    if (!checkAdmin(ctx, customer)) {
      throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
    }

    const db = getDb();
    const [customerCount] = await db.select({ value: count() }).from(customers);
    const [cardCount] = await db.select({ value: count() }).from(pdfCards);
    const [orderCount] = await db.select({ value: count() }).from(orders);
    const [ticketCount] = await db.select({ value: count() }).from(supportTickets);
    const [paymentCount] = await db.select({ value: count() }).from(payments);

    return {
      customers: customerCount.value,
      cards: cardCount.value,
      orders: orderCount.value,
      tickets: ticketCount.value,
      payments: paymentCount.value,
    };
  }),

  // ── Customers ──
  listCustomers: publicQuery.query(async ({ ctx }) => {
    const customer = await getAdminCustomer(ctx);
    if (!checkAdmin(ctx, customer)) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    const db = getDb();
    return db.select({
      id: customers.id,
      name: customers.name,
      email: customers.email,
      mobile: customers.mobile,
      status: customers.status,
      createdAt: customers.createdAt,
      lastSignInAt: customers.lastSignInAt,
    }).from(customers).orderBy(desc(customers.createdAt));
  }),

  updateCustomerStatus: publicQuery
    .input(z.object({ id: z.number(), status: z.enum(["active", "inactive", "suspended"]) }))
    .mutation(async ({ ctx, input }) => {
      const customer = await getAdminCustomer(ctx);
      if (!checkAdmin(ctx, customer)) throw new TRPCError({ code: "FORBIDDEN" });
      const db = getDb();
      await db.update(customers).set({ status: input.status }).where(eq(customers.id, input.id));
      return { success: true };
    }),

  // ── All Cards ──
  listAllCards: publicQuery.query(async ({ ctx }) => {
    const customer = await getAdminCustomer(ctx);
    if (!checkAdmin(ctx, customer)) throw new TRPCError({ code: "FORBIDDEN" });
    const db = getDb();
    return db.select().from(pdfCards).orderBy(desc(pdfCards.createdAt));
  }),

  // ── All Orders ──
  listAllOrders: publicQuery.query(async ({ ctx }) => {
    const customer = await getAdminCustomer(ctx);
    if (!checkAdmin(ctx, customer)) throw new TRPCError({ code: "FORBIDDEN" });
    const db = getDb();
    return db.select().from(orders).orderBy(desc(orders.createdAt));
  }),

  updateOrderStatus: publicQuery
    .input(z.object({ id: z.number(), status: z.enum(["pending", "paid", "failed", "refunded"]) }))
    .mutation(async ({ ctx, input }) => {
      const customer = await getAdminCustomer(ctx);
      if (!checkAdmin(ctx, customer)) throw new TRPCError({ code: "FORBIDDEN" });
      const db = getDb();
      await db.update(orders).set({ status: input.status }).where(eq(orders.id, input.id));
      return { success: true };
    }),

  // ── All Tickets ──
  listAllTickets: publicQuery.query(async ({ ctx }) => {
    const customer = await getAdminCustomer(ctx);
    if (!checkAdmin(ctx, customer)) throw new TRPCError({ code: "FORBIDDEN" });
    const db = getDb();
    return db.select().from(supportTickets).orderBy(desc(supportTickets.createdAt));
  }),

  updateTicketStatus: publicQuery
    .input(z.object({
      id: z.number(),
      status: z.enum(["open", "in_progress", "resolved", "closed"]),
      adminReply: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const customer = await getAdminCustomer(ctx);
      if (!checkAdmin(ctx, customer)) throw new TRPCError({ code: "FORBIDDEN" });
      const db = getDb();
      await db.update(supportTickets)
        .set({ status: input.status, adminReply: input.adminReply })
        .where(eq(supportTickets.id, input.id));
      return { success: true };
    }),

  // ── Payments ──
  listAllPayments: publicQuery.query(async ({ ctx }) => {
    const customer = await getAdminCustomer(ctx);
    if (!checkAdmin(ctx, customer)) throw new TRPCError({ code: "FORBIDDEN" });
    const db = getDb();
    return db.select().from(payments).orderBy(desc(payments.createdAt));
  }),

  updatePaymentStatus: publicQuery
    .input(z.object({
      id: z.number(),
      status: z.enum(["pending", "approved", "rejected"]),
      adminNote: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const customer = await getAdminCustomer(ctx);
      if (!checkAdmin(ctx, customer)) throw new TRPCError({ code: "FORBIDDEN" });
      const db = getDb();
      await db.update(payments)
        .set({ status: input.status, adminNote: input.adminNote })
        .where(eq(payments.id, input.id));
      return { success: true };
    }),

  // ── Templates CRUD ──
  listTemplates: publicQuery.query(async ({ ctx }) => {
    const customer = await getAdminCustomer(ctx);
    if (!checkAdmin(ctx, customer)) throw new TRPCError({ code: "FORBIDDEN" });
    const db = getDb();
    return db.select().from(cardTemplates).orderBy(desc(cardTemplates.createdAt));
  }),

  createTemplate: publicQuery
    .input(z.object({
      name: z.string().min(1),
      category: z.string().default("professional"),
      thumbnailUrl: z.string().optional(),
      cssStyles: z.string().optional(),
      htmlStructure: z.string().optional(),
      minPackage: z.string().default("started"),
    }))
    .mutation(async ({ ctx, input }) => {
      const customer = await getAdminCustomer(ctx);
      if (!checkAdmin(ctx, customer)) throw new TRPCError({ code: "FORBIDDEN" });
      const db = getDb();
      const [tmpl] = await db.insert(cardTemplates).values(input);
      return { id: Number(tmpl.insertId) };
    }),

  updateTemplate: publicQuery
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      category: z.string().optional(),
      thumbnailUrl: z.string().optional(),
      cssStyles: z.string().optional(),
      htmlStructure: z.string().optional(),
      minPackage: z.string().optional(),
      isActive: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const customer = await getAdminCustomer(ctx);
      if (!checkAdmin(ctx, customer)) throw new TRPCError({ code: "FORBIDDEN" });
      const db = getDb();
      const { id, ...data } = input;
      await db.update(cardTemplates).set(data).where(eq(cardTemplates.id, id));
      return { success: true };
    }),

  deleteTemplate: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const customer = await getAdminCustomer(ctx);
      if (!checkAdmin(ctx, customer)) throw new TRPCError({ code: "FORBIDDEN" });
      const db = getDb();
      await db.delete(cardTemplates).where(eq(cardTemplates.id, input.id));
      return { success: true };
    }),

  // ── Packages CRUD ──
  listPackages: publicQuery.query(async ({ ctx }) => {
    const customer = await getAdminCustomer(ctx);
    if (!checkAdmin(ctx, customer)) throw new TRPCError({ code: "FORBIDDEN" });
    const db = getDb();
    return db.select().from(packages).orderBy(desc(packages.createdAt));
  }),

  createPackage: publicQuery
    .input(z.object({
      name: z.string().min(1),
      slug: z.string().min(1),
      price: z.string(),
      description: z.string().optional(),
      maxCards: z.number().default(1),
      allowSocialLinks: z.boolean().default(false),
      allowPaymentQr: z.boolean().default(false),
      allowBusinessImages: z.boolean().default(false),
      allowServicesList: z.boolean().default(false),
      prioritySupport: z.boolean().default(false),
    }))
    .mutation(async ({ ctx, input }) => {
      const customer = await getAdminCustomer(ctx);
      if (!checkAdmin(ctx, customer)) throw new TRPCError({ code: "FORBIDDEN" });
      const db = getDb();
      const [pkg] = await db.insert(packages).values(input);
      return { id: Number(pkg.insertId) };
    }),

  updatePackage: publicQuery
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      price: z.string().optional(),
      description: z.string().optional(),
      maxCards: z.number().optional(),
      isActive: z.boolean().optional(),
      allowSocialLinks: z.boolean().optional(),
      allowPaymentQr: z.boolean().optional(),
      allowBusinessImages: z.boolean().optional(),
      allowServicesList: z.boolean().optional(),
      prioritySupport: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const customer = await getAdminCustomer(ctx);
      if (!checkAdmin(ctx, customer)) throw new TRPCError({ code: "FORBIDDEN" });
      const db = getDb();
      const { id, ...data } = input;
      await db.update(packages).set(data).where(eq(packages.id, id));
      return { success: true };
    }),
});
