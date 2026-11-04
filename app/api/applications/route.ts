import { NextResponse } from "next/server";
import { APPLICATION_LIMITS, APPLICATION_MESSAGES, pickMessage, type LocalizedMessage } from "@/lib/application-form";
import { ensureApplicationForm, createApplicationSubmission } from "@/lib/application-form-data";
import { consumeApplicationRateLimit } from "@/lib/application-rate-limit";
import { validateApplicationAnswers } from "@/lib/application-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function errorResponse(
  status: number,
  code: string,
  message: LocalizedMessage,
  extra: Record<string, unknown> = {},
  headers: Record<string, string> = {},
) {
  return NextResponse.json(
    { ok: false, code, messageTr: message.tr, messageEn: message.en, ...extra },
    { status, headers: { "Cache-Control": "no-store", ...headers } },
  );
}

function clientKey(request: Request) {
  // The limiter is best-effort abuse friction and is per serverless instance.
  // Prefer the platform-provided client IP; proxy headers are only a fallback.
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return errorResponse(415, "UNSUPPORTED_MEDIA_TYPE", APPLICATION_MESSAGES.genericError);
  }

  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(declaredLength) && declaredLength > APPLICATION_LIMITS.bodyBytes) {
    return errorResponse(413, "PAYLOAD_TOO_LARGE", APPLICATION_MESSAGES.genericError);
  }

  const rate = consumeApplicationRateLimit(clientKey(request));
  if (!rate.allowed) {
    return errorResponse(
      429,
      "RATE_LIMITED",
      APPLICATION_MESSAGES.rateLimited,
      { retryAfterSeconds: rate.retryAfterSeconds },
      { "Retry-After": String(rate.retryAfterSeconds) },
    );
  }

  const rawBody = await request.text();
  if (Buffer.byteLength(rawBody, "utf8") > APPLICATION_LIMITS.bodyBytes) {
    return errorResponse(413, "PAYLOAD_TOO_LARGE", APPLICATION_MESSAGES.genericError);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return errorResponse(400, "INVALID_JSON", APPLICATION_MESSAGES.genericError);
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return errorResponse(400, "INVALID_PAYLOAD", APPLICATION_MESSAGES.genericError);
  }

  const payload = body as Record<string, unknown>;
  const answers = payload.answers;
  if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
    return errorResponse(400, "INVALID_PAYLOAD", APPLICATION_MESSAGES.genericError);
  }

  if (typeof payload._mvExtra === "string" && payload._mvExtra.trim()) {
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  }

  let submissionKey: string | null = null;
  if (payload.submissionKey !== undefined && payload.submissionKey !== null) {
    if (typeof payload.submissionKey !== "string" || !/^[A-Za-z0-9_-]{1,64}$/.test(payload.submissionKey)) {
      return errorResponse(400, "INVALID_PAYLOAD", APPLICATION_MESSAGES.genericError);
    }
    submissionKey = payload.submissionKey;
  }

  const locale = payload.locale === "en" ? "en" : "tr";

  try {
    const form = await ensureApplicationForm();
    if (!form.isOpen) {
      return errorResponse(403, "FORM_CLOSED", APPLICATION_MESSAGES.closedTitle);
    }
    if (form.questions.length === 0) {
      return errorResponse(409, "FORM_NOT_READY", APPLICATION_MESSAGES.notReadyTitle);
    }

    const validation = validateApplicationAnswers(form.questions, answers as Record<string, unknown>);
    if (!validation.ok) {
      return errorResponse(400, "VALIDATION_ERROR", APPLICATION_MESSAGES.validationSummary, {
        fieldErrors: validation.fieldErrors,
      });
    }

    await createApplicationSubmission({ locale, submissionKey, answers: validation.answers });
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Unable to submit application", error instanceof Error ? error.name : "unknown");
    return errorResponse(503, "SERVICE_UNAVAILABLE", {
      tr: pickMessage(APPLICATION_MESSAGES.formUnavailable, "tr"),
      en: pickMessage(APPLICATION_MESSAGES.formUnavailable, "en"),
    });
  }
}
