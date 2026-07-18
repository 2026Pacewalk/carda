import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { User, Customer } from "@db/schema";
import { authenticateRequest } from "./kimi/auth";
import { verifyCustomerToken } from "./customer-auth";

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: User;
  customer?: Customer;
};

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  const ctx: TrpcContext = { req: opts.req, resHeaders: opts.resHeaders };

  // Try OAuth authentication first
  try {
    ctx.user = await authenticateRequest(opts.req.headers);
  } catch {
    // OAuth auth failed, that's ok
  }

  // Try customer JWT authentication
  try {
    const token = opts.req.headers.get("x-customer-token");
    if (token) {
      ctx.customer = await verifyCustomerToken(token);
    }
  } catch {
    // Customer auth failed, that's ok
  }

  return ctx;
}
