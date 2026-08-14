import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_COOKIE = "multievent-admin-session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 365;

function configuredPassword() {
  return process.env.ADMIN_PASSWORD || "";
}

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || configuredPassword();
}

function sign(value: string) {
  return createHmac("sha256", sessionSecret()).update(value).digest("base64url");
}

function isValidToken(token: string | undefined) {
  if (!token || !sessionSecret()) return false;
  const [issuedAt, nonce, signature] = token.split(".");
  if (!issuedAt || !nonce || !signature) return false;
  const payload = `${issuedAt}.${nonce}`;
  const expected = sign(payload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) return false;
  const issuedAtMs = Number(issuedAt);
  return Number.isFinite(issuedAtMs) && Date.now() - issuedAtMs >= 0 && Date.now() - issuedAtMs < SESSION_MAX_AGE * 1000;
}

export function isAdminPasswordValid(password: string) {
  const configured = configuredPassword();
  const suppliedBuffer = Buffer.from(password);
  const configuredBuffer = Buffer.from(configured);
  return Boolean(configured) && suppliedBuffer.length === configuredBuffer.length && timingSafeEqual(suppliedBuffer, configuredBuffer);
}

export function createAdminSessionToken() {
  const payload = `${Date.now()}.${randomBytes(32).toString("base64url")}`;
  return `${payload}.${sign(payload)}`;
}

export const adminCookieOptions = {
  httpOnly: true,
  sameSite: "strict" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_MAX_AGE,
};

export async function getAdminSession() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!isValidToken(token)) return null;
  return { user: { name: "Admin" } };
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/sign-in");
  return session;
}

export { ADMIN_COOKIE };
