import { z } from "zod";
import { eq, desc, count } from "drizzle-orm";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { pdfCards, orders, packages, supportTickets, payments, cardTemplates, customers } from "@db/schema";
import { verifyCustomerToken } from "./customer-auth";
import { TRPCError } from "@trpc/server";

// Helper to get authenticated customer from token
async function getCustomer(ctx: { req: Request }) {
  const token = ctx.req.headers.get("x-customer-token");
  if (!token) throw new TRPCError({ code: "UNAUTHORIZED", message: "Please login" });
  const customer = await verifyCustomerToken(token);
  if (!customer) throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid session" });
  return customer;
}

export const customerRouter = createRouter({
  // ── My Cards ──
  listMyCards: publicQuery.query(async ({ ctx }) => {
    const customer = await getCustomer(ctx);
    const db = getDb();
    return db.select().from(pdfCards)
      .where(eq(pdfCards.customerId, customer.id))
      .orderBy(desc(pdfCards.createdAt));
  }),

  getCard: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const customer = await getCustomer(ctx);
      const db = getDb();
      const [card] = await db.select().from(pdfCards)
        .where(eq(pdfCards.id, input.id))
        .limit(1);
      if (!card || card.customerId !== customer.id) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Card not found" });
      }
      return card;
    }),

  createCard: publicQuery
    .input(z.object({
      businessName: z.string().optional(),
      ownerName: z.string().optional(),
      designation: z.string().optional(),
      aboutBusiness: z.string().optional(),
      mobileNumber: z.string().optional(),
      whatsappNumber: z.string().optional(),
      email: z.string().optional(),
      website: z.string().optional(),
      address: z.string().optional(),
      googleMapLink: z.string().optional(),
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
      youtube: z.string().optional(),
      upiId: z.string().optional(),
      logoUrl: z.string().optional(),
      profilePhotoUrl: z.string().optional(),
      businessImages: z.array(z.string()).optional(),
      servicesList: z.array(z.string()).optional(),
      templateId: z.number().optional(),
      packageId: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const customer = await getCustomer(ctx);
      const db = getDb();
      const [card] = await db.insert(pdfCards).values({
        customerId: customer.id,
        ...input,
      });
      return { id: Number(card.insertId), success: true };
    }),

  updateCard: publicQuery
    .input(z.object({
      id: z.number(),
      businessName: z.string().optional(),
      ownerName: z.string().optional(),
      designation: z.string().optional(),
      aboutBusiness: z.string().optional(),
      mobileNumber: z.string().optional(),
      whatsappNumber: z.string().optional(),
      email: z.string().optional(),
      website: z.string().optional(),
      address: z.string().optional(),
      googleMapLink: z.string().optional(),
      facebook: z.string().optional(),
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
      youtube: z.string().optional(),
      upiId: z.string().optional(),
      logoUrl: z.string().optional(),
      profilePhotoUrl: z.string().optional(),
      businessImages: z.array(z.string()).optional(),
      servicesList: z.array(z.string()).optional(),
      templateId: z.number().optional(),
      packageId: z.number().optional(),
      status: z.enum(["draft", "published", "archived"]).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const customer = await getCustomer(ctx);
      const db = getDb();
      const { id, ...data } = input;

      const [existing] = await db.select().from(pdfCards)
        .where(eq(pdfCards.id, id)).limit(1);
      if (!existing || existing.customerId !== customer.id) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Card not found" });
      }

      await db.update(pdfCards).set(data).where(eq(pdfCards.id, id));
      return { success: true };
    }),

  deleteCard: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const customer = await getCustomer(ctx);
      const db = getDb();
      const [existing] = await db.select().from(pdfCards)
        .where(eq(pdfCards.id, input.id)).limit(1);
      if (!existing || existing.customerId !== customer.id) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Card not found" });
      }
      await db.delete(pdfCards).where(eq(pdfCards.id, input.id));
      return { success: true };
    }),

  // ── Packages ──
  listPackages: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(packages).where(eq(packages.isActive, true));
  }),

  // ── Templates ──
  listTemplates: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(cardTemplates).where(eq(cardTemplates.isActive, true));
  }),

  // ── Orders ──
  listMyOrders: publicQuery.query(async ({ ctx }) => {
    const customer = await getCustomer(ctx);
    const db = getDb();
    return db.select().from(orders)
      .where(eq(orders.customerId, customer.id))
      .orderBy(desc(orders.createdAt));
  }),

  createOrder: publicQuery
    .input(z.object({
      packageId: z.number(),
      amount: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const customer = await getCustomer(ctx);
      const db = getDb();
      const [order] = await db.insert(orders).values({
        customerId: customer.id,
        packageId: input.packageId,
        amount: input.amount,
        status: "pending",
      });
      return { id: Number(order.insertId) };
    }),

  // ── Payments ──
  submitPayment: publicQuery
    .input(z.object({
      orderId: z.number(),
      amount: z.string(),
      paymentMethod: z.string().default("upi"),
      upiId: z.string().optional(),
      screenshotUrl: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const customer = await getCustomer(ctx);
      const db = getDb();
      const [payment] = await db.insert(payments).values({
        customerId: customer.id,
        ...input,
      });
      return { id: Number(payment.insertId) };
    }),

  listMyPayments: publicQuery.query(async ({ ctx }) => {
    const customer = await getCustomer(ctx);
    const db = getDb();
    return db.select().from(payments)
      .where(eq(payments.customerId, customer.id))
      .orderBy(desc(payments.createdAt));
  }),

  // ── Support Tickets ──
  createTicket: publicQuery
    .input(z.object({
      subject: z.string().min(1),
      message: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      const customer = await getCustomer(ctx);
      const db = getDb();
      const [ticket] = await db.insert(supportTickets).values({
        customerId: customer.id,
        ...input,
      });
      return { id: Number(ticket.insertId) };
    }),

  listMyTickets: publicQuery.query(async ({ ctx }) => {
    const customer = await getCustomer(ctx);
    const db = getDb();
    return db.select().from(supportTickets)
      .where(eq(supportTickets.customerId, customer.id))
      .orderBy(desc(supportTickets.createdAt));
  }),

  // ── Dashboard Stats ──
  getDashboardStats: publicQuery.query(async ({ ctx }) => {
    const customer = await getCustomer(ctx);
    const db = getDb();

    const [cardCount] = await db.select({ value: count() }).from(pdfCards)
      .where(eq(pdfCards.customerId, customer.id));
    const [orderCount] = await db.select({ value: count() }).from(orders)
      .where(eq(orders.customerId, customer.id));
    const [ticketCount] = await db.select({ value: count() }).from(supportTickets)
      .where(eq(supportTickets.customerId, customer.id));

    const recentCards = await db.select().from(pdfCards)
      .where(eq(pdfCards.customerId, customer.id))
      .orderBy(desc(pdfCards.createdAt))
      .limit(5);

    return {
      totalCards: cardCount.value,
      totalOrders: orderCount.value,
      totalTickets: ticketCount.value,
      recentCards,
    };
  }),
});
