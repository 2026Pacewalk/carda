import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { User, Customer } from "@db/schema";
import { verifyCustomerToken } from "./customer-auth";
import { verifyAdminToken } from "./admin-auth";

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: User;
  customer?: Customer;
  admin?: User;
};

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  const ctx: TrpcContext = { req: opts.req, resHeaders: opts.resHeaders };

  // Try customer JWT authentication
  try {
    const token = opts.req.headers.get("x-customer-token");
    if (token) {
      ctx.customer = await verifyCustomerToken(token);
    }
  } catch {
    // Customer auth failed, that's ok
  }

  // Try admin JWT authentication
  try {
    const adminToken = opts.req.headers.get("x-admin-token");
    if (adminToken) {
      ctx.admin = await verifyAdminToken(adminToken);
    }
  } catch {
    // Admin auth failed, that's ok
  }

  return ctx;
}
