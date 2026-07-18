import { SignJWT, jwtVerify } from "jose";
import { eq } from "drizzle-orm";
import { getDb } from "./queries/connection";
import { customers } from "@db/schema";
import type { Customer } from "@db/schema";

const JWT_SECRET = new TextEncoder().encode(
  process.env.CUSTOMER_JWT_SECRET || "mycarda-customer-secret-key-2026"
);

export async function createCustomerToken(customer: Customer): Promise<string> {
  return new SignJWT({ sub: String(customer.id), email: customer.email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(JWT_SECRET);
}

export async function verifyCustomerToken(token: string): Promise<Customer | undefined> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, { clockTolerance: 60 });
    const customerId = Number(payload.sub);
    if (!customerId) return undefined;

    const db = getDb();
    const [customer] = await db
      .select()
      .from(customers)
      .where(eq(customers.id, customerId))
      .limit(1);

    return customer;
  } catch {
    return undefined;
  }
}
