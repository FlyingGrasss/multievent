import { NextResponse } from "next/server";
import { adminCookieOptions, createAdminSessionToken, isAdminPasswordValid, ADMIN_COOKIE } from "@/lib/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { password?: unknown } | null;
  const password = typeof body?.password === "string" ? body.password : "";
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Admin password is not configured." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  if (!isAdminPasswordValid(password)) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }
  const response = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(ADMIN_COOKIE, createAdminSessionToken(), adminCookieOptions);
  return response;
}
