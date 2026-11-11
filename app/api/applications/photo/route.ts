import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { APPLICATION_LIMITS, APPLICATION_MESSAGES, type LocalizedMessage } from "@/lib/application-form";
import { consumeApplicationPhotoRateLimit } from "@/lib/application-rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "application/pdf": "pdf",
};

function clientKey(request: Request) {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

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

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("multipart/form-data")) {
    return errorResponse(415, "UNSUPPORTED_MEDIA_TYPE", APPLICATION_MESSAGES.photoUploadError);
  }

  const declaredLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(declaredLength) && declaredLength > APPLICATION_LIMITS.photoBytes + 1024 * 1024) {
    return errorResponse(413, "PAYLOAD_TOO_LARGE", APPLICATION_MESSAGES.fileTooLarge);
  }

  const rate = consumeApplicationPhotoRateLimit(clientKey(request));
  if (!rate.allowed) {
    return errorResponse(
      429,
      "RATE_LIMITED",
      APPLICATION_MESSAGES.rateLimited,
      { retryAfterSeconds: rate.retryAfterSeconds },
      { "Retry-After": String(rate.retryAfterSeconds) },
    );
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!(file instanceof File)) {
    return errorResponse(400, "INVALID_FILE", APPLICATION_MESSAGES.photoUploadError);
  }

  const extension = ALLOWED_TYPES[file.type];
  if (!extension) {
    return errorResponse(415, "INVALID_FILE_TYPE", APPLICATION_MESSAGES.fileInvalidType);
  }
  if (file.size <= 0 || file.size > APPLICATION_LIMITS.photoBytes) {
    return errorResponse(413, "PAYLOAD_TOO_LARGE", APPLICATION_MESSAGES.fileTooLarge);
  }

  try {
    const blob = await put(`applications/${crypto.randomUUID()}.${extension}`, file, {
      access: "public",
      addRandomSuffix: false,
      contentType: file.type,
      cacheControlMaxAge: 31536000,
    });
    return NextResponse.json(
      { ok: true, url: blob.url },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (cause) {
    console.error("Application photo upload failed", cause instanceof Error ? cause.name : "unknown");
    return errorResponse(503, "UPLOAD_UNAVAILABLE", APPLICATION_MESSAGES.photoUploadError);
  }
}
