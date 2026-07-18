import { SignJWT, jwtVerify } from "jose";
import { eq } from "drizzle-orm";
import { getDb } from "./queries/connection";
import { users } from "@db/schema";
import type { User } from "@db/schema";

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || "mycarda-admin-secret-key-2026"
);

export async function createAdminToken(user: User): Promise<string> {
  return new SignJWT({ sub: String(user.id), email: user.email ?? "", role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

// Returns the user only if the token is valid AND the account is an admin.
export async function verifyAdminToken(token: string): Promise<User | undefined> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, { clockTolerance: 60 });
    const userId = Number(payload.sub);
    if (!userId) return undefined;

    const db = getDb();
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user || user.role !== "admin") return undefined;
    return user;
  } catch {
    return undefined;
  }
}
