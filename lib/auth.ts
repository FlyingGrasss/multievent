import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { prisma } from "@/lib/db";

const authSecret = process.env.BETTER_AUTH_SECRET;
const adminEmails = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

if (!authSecret && process.env.NODE_ENV === "production") {
  throw new Error("BETTER_AUTH_SECRET is required in production.");
}

export const auth = betterAuth({
  secret: authSecret || "development-only-change-me",
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  trustedOrigins: [
    process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  hooks: {
    before: createAuthMiddleware(async (context) => {
      if (context.path === "/sign-up/email") {
        if (adminEmails.length === 0) {
          throw new APIError("FORBIDDEN", { message: "Admin registration is not configured." });
        }
        const email = String(context.body?.email || "").trim().toLowerCase();
        if (!adminEmails.includes(email)) {
          throw new APIError("FORBIDDEN", { message: "Admin registration is restricted." });
        }
      }
    }),
  },
  session: {
    // A long-lived, database-backed session. The session is still revocable server-side.
    expiresIn: 60 * 60 * 24 * 365,
    updateAge: 60 * 60 * 24,
    freshAge: 60 * 15,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false,
      },
    },
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  plugins: [nextCookies()],
});
