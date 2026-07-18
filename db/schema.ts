import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  int,
  bigint,
  json,
  boolean,
  decimal,
} from "drizzle-orm/mysql-core";

// ── Users (admin / staff — password auth) ──
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }).unique(),
  passwordHash: varchar("passwordHash", { length: 255 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt"),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ── Customers (Password-based auth) ──
export const customers = mysqlTable("customers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  mobile: varchar("mobile", { length: 20 }).notNull(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  emailVerified: boolean("emailVerified").default(false),
  avatar: text("avatar"),
  status: mysqlEnum("status", ["active", "inactive", "suspended"]).default("active").notNull(),
  role: mysqlEnum("role", ["customer"]).default("customer").notNull(),
  packageId: bigint("packageId", { mode: "number", unsigned: true }),
  orderId: bigint("orderId", { mode: "number", unsigned: true }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt"),
});

export type Customer = typeof customers.$inferSelect;
export type InsertCustomer = typeof customers.$inferInsert;

// ── Packages ──
export const packages = mysqlTable("packages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  description: text("description"),
  features: json("features").$type<string[]>(),
  maxCards: int("maxCards").default(1).notNull(),
  maxTemplates: int("maxTemplates").default(5).notNull(),
  allowSocialLinks: boolean("allowSocialLinks").default(false),
  allowPaymentQr: boolean("allowPaymentQr").default(false),
  allowBusinessImages: boolean("allowBusinessImages").default(false),
  allowServicesList: boolean("allowServicesList").default(false),
  prioritySupport: boolean("prioritySupport").default(false),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Package = typeof packages.$inferSelect;

// ── Card Templates ──
export const cardTemplates = mysqlTable("card_templates", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  category: varchar("category", { length: 50 }).default("professional"),
  thumbnailUrl: text("thumbnailUrl"),
  cssStyles: text("cssStyles"),
  htmlStructure: text("htmlStructure"),
  minPackage: varchar("minPackage", { length: 20 }).default("started"),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CardTemplate = typeof cardTemplates.$inferSelect;

// ── PDF Cards ──
export const pdfCards = mysqlTable("pdf_cards", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }),
  customerId: bigint("customerId", { mode: "number", unsigned: true }),
  templateId: bigint("templateId", { mode: "number", unsigned: true }),
  packageId: bigint("packageId", { mode: "number", unsigned: true }),

  // Business Info
  businessName: varchar("businessName", { length: 255 }),
  ownerName: varchar("ownerName", { length: 255 }),
  designation: varchar("designation", { length: 255 }),
  aboutBusiness: text("aboutBusiness"),

  // Contact
  mobileNumber: varchar("mobileNumber", { length: 20 }),
  whatsappNumber: varchar("whatsappNumber", { length: 20 }),
  email: varchar("email", { length: 320 }),
  website: varchar("website", { length: 500 }),
  address: text("address"),
  googleMapLink: varchar("googleMapLink", { length: 500 }),

  // Social Links
  facebook: varchar("facebook", { length: 500 }),
  instagram: varchar("instagram", { length: 500 }),
  linkedin: varchar("linkedin", { length: 500 }),
  twitter: varchar("twitter", { length: 500 }),
  youtube: varchar("youtube", { length: 500 }),

  // Payment
  upiId: varchar("upiId", { length: 100 }),
  paymentQrUrl: text("paymentQrUrl"),

  // Media
  logoUrl: text("logoUrl"),
  profilePhotoUrl: text("profilePhotoUrl"),
  businessImages: json("businessImages").$type<string[]>(),

  // Services
  servicesList: json("servicesList").$type<string[]>(),

  // CTA Buttons
  ctaButtons: json("ctaButtons").$type<{ label: string; link: string }[]>(),

  // Generated PDF
  pdfUrl: text("pdfUrl"),
  downloadCount: int("downloadCount").default(0),
  shareCount: int("shareCount").default(0),

  // Status
  status: mysqlEnum("status", ["draft", "published", "archived"]).default("draft").notNull(),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type PdfCard = typeof pdfCards.$inferSelect;
export type InsertPdfCard = typeof pdfCards.$inferInsert;

// ── Orders ──
export const orders = mysqlTable("orders", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }),
  customerId: bigint("customerId", { mode: "number", unsigned: true }),
  packageId: bigint("packageId", { mode: "number", unsigned: true }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["pending", "paid", "failed", "refunded"]).default("pending").notNull(),
  paymentMethod: varchar("paymentMethod", { length: 50 }),
  transactionId: varchar("transactionId", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Order = typeof orders.$inferSelect;

// ── Support Tickets ──
export const supportTickets = mysqlTable("support_tickets", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }),
  customerId: bigint("customerId", { mode: "number", unsigned: true }),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  status: mysqlEnum("status", ["open", "in_progress", "resolved", "closed"]).default("open").notNull(),
  adminReply: text("adminReply"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type SupportTicket = typeof supportTickets.$inferSelect;

// ── Activity Logs ──
export const activityLogs = mysqlTable("activity_logs", {
  id: serial("id").primaryKey(),
  customerId: bigint("customerId", { mode: "number", unsigned: true }),
  userId: bigint("userId", { mode: "number", unsigned: true }),
  action: varchar("action", { length: 100 }).notNull(),
  details: text("details"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ── Payments (Payment proof uploads) ──
export const payments = mysqlTable("payments", {
  id: serial("id").primaryKey(),
  orderId: bigint("orderId", { mode: "number", unsigned: true }).notNull(),
  customerId: bigint("customerId", { mode: "number", unsigned: true }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: varchar("paymentMethod", { length: 50 }).default("upi").notNull(),
  upiId: varchar("upiId", { length: 100 }),
  screenshotUrl: text("screenshotUrl"),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  adminNote: text("adminNote"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;

// ── Password Resets ──
export const passwordResets = mysqlTable("password_resets", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  used: boolean("used").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
