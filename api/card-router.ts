import { z } from "zod";
import { createRouter, publicQuery, authedQuery, adminQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { pdfCards, cardTemplates, packages, orders, supportTickets, activityLogs } from "@db/schema";
import { eq, desc, and, count } from "drizzle-orm";

export const cardRouter = createRouter({
  // ── Packages ──
  listPackages: publicQuery.query(async () => {
    const db = getDb();
    return db.select().from(packages).where(eq(packages.isActive, true));
  }),

  getPackage: publicQuery
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = getDb();
      const rows = await db.select().from(packages).where(eq(packages.slug, input.slug));
      return rows[0] ?? null;
    }),

  // ── Templates ──
  listTemplates: publicQuery
    .input(z.object({ packageSlug: z.string().optional() }).optional())
    .query(async ({ input }) => {
      const db = getDb();
      const all = await db.select().from(cardTemplates).where(eq(cardTemplates.isActive, true));
      if (!input?.packageSlug) return all;
      const pkgOrder = { started: 1, business: 2, premium: 3 };
      const minLevel = pkgOrder[input.packageSlug as keyof typeof pkgOrder] ?? 1;
      return all.filter((t) => {
        const tLevel = pkgOrder[t.minPackage as keyof typeof pkgOrder] ?? 1;
        return tLevel <= minLevel;
      });
    }),

  // ── PDF Cards (authed) ──
  listMyCards: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db.select().from(pdfCards).where(eq(pdfCards.userId, ctx.user.id)).orderBy(desc(pdfCards.createdAt));
  }),

  getCard: authedQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = getDb();
      const rows = await db.select().from(pdfCards).where(and(eq(pdfCards.id, input.id), eq(pdfCards.userId, ctx.user.id)));
      return rows[0] ?? null;
    }),

  createCard: authedQuery
    .input(z.object({
      templateId: z.number().optional(),
      packageId: z.number().optional(),
      businessName: z.string().max(255).optional(),
      ownerName: z.string().max(255).optional(),
      designation: z.string().max(255).optional(),
      aboutBusiness: z.string().optional(),
      mobileNumber: z.string().max(20).optional(),
      whatsappNumber: z.string().max(20).optional(),
      email: z.string().max(320).optional(),
      website: z.string().max(500).optional(),
      address: z.string().optional(),
      googleMapLink: z.string().max(500).optional(),
      facebook: z.string().max(500).optional(),
      instagram: z.string().max(500).optional(),
      linkedin: z.string().max(500).optional(),
      twitter: z.string().max(500).optional(),
      youtube: z.string().max(500).optional(),
      upiId: z.string().max(100).optional(),
      logoUrl: z.string().optional(),
      profilePhotoUrl: z.string().optional(),
      businessImages: z.array(z.string()).optional(),
      servicesList: z.array(z.string()).optional(),
      ctaButtons: z.array(z.object({ label: z.string(), link: z.string() })).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const [result] = await db.insert(pdfCards).values({
        userId: ctx.user.id,
        ...input,
        status: "draft",
      });
      await db.insert(activityLogs).values({
        userId: ctx.user.id,
        action: "card_created",
        details: `Created card: ${input.businessName ?? "Untitled"}`,
      });
      return { id: Number(result.insertId) };
    }),

  updateCard: authedQuery
    .input(z.object({
      id: z.number(),
      templateId: z.number().optional(),
      businessName: z.string().max(255).optional(),
      ownerName: z.string().max(255).optional(),
      designation: z.string().max(255).optional(),
      aboutBusiness: z.string().optional(),
      mobileNumber: z.string().max(20).optional(),
      whatsappNumber: z.string().max(20).optional(),
      email: z.string().max(320).optional(),
      website: z.string().max(500).optional(),
      address: z.string().optional(),
      googleMapLink: z.string().max(500).optional(),
      facebook: z.string().max(500).optional(),
      instagram: z.string().max(500).optional(),
      linkedin: z.string().max(500).optional(),
      twitter: z.string().max(500).optional(),
      youtube: z.string().max(500).optional(),
      upiId: z.string().max(100).optional(),
      logoUrl: z.string().optional(),
      profilePhotoUrl: z.string().optional(),
      businessImages: z.array(z.string()).optional(),
      servicesList: z.array(z.string()).optional(),
      ctaButtons: z.array(z.object({ label: z.string(), link: z.string() })).optional(),
      status: z.enum(["draft", "published", "archived"]).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const { id, ...data } = input;
      await db.update(pdfCards).set(data).where(and(eq(pdfCards.id, id), eq(pdfCards.userId, ctx.user.id)));
      await db.insert(activityLogs).values({
        userId: ctx.user.id,
        action: "card_updated",
        details: `Updated card #${id}`,
      });
      return { success: true };
    }),

  deleteCard: authedQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      await db.delete(pdfCards).where(and(eq(pdfCards.id, input.id), eq(pdfCards.userId, ctx.user.id)));
      return { success: true };
    }),

  incrementDownload: publicQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      const card = await db.select().from(pdfCards).where(eq(pdfCards.id, input.id));
      if (card[0]) {
        await db.update(pdfCards).set({ downloadCount: (card[0].downloadCount ?? 0) + 1 }).where(eq(pdfCards.id, input.id));
      }
      return { success: true };
    }),

  // ── Support Tickets ──
  createTicket: authedQuery
    .input(z.object({
      subject: z.string().min(3).max(255),
      message: z.string().min(10),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const [result] = await db.insert(supportTickets).values({
        userId: ctx.user.id,
        ...input,
      });
      return { id: Number(result.insertId) };
    }),

  listMyTickets: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    return db.select().from(supportTickets).where(eq(supportTickets.userId, ctx.user.id)).orderBy(desc(supportTickets.createdAt));
  }),

  // ── Admin ──
  listAllCards: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(pdfCards).orderBy(desc(pdfCards.createdAt));
  }),

  listAllTickets: adminQuery.query(async () => {
    const db = getDb();
    return db.select().from(supportTickets).orderBy(desc(supportTickets.createdAt));
  }),

  updateTicketStatus: adminQuery
    .input(z.object({ id: z.number(), status: z.enum(["open", "in_progress", "resolved", "closed"]), adminReply: z.string().optional() }))
    .mutation(async ({ input }) => {
      const db = getDb();
      await db.update(supportTickets).set({ status: input.status, adminReply: input.adminReply }).where(eq(supportTickets.id, input.id));
      return { success: true };
    }),

  getStats: adminQuery.query(async () => {
    const db = getDb();
    const [cardCount] = await db.select({ value: count() }).from(pdfCards);
    const [ticketCount] = await db.select({ value: count() }).from(supportTickets);
    const [orderCount] = await db.select({ value: count() }).from(orders);
    return { cards: cardCount.value, tickets: ticketCount.value, orders: orderCount.value };
  }),
});
