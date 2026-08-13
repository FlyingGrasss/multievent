import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";

export const runtime = "nodejs";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

function safeFileName(name: string) {
  const extension = name.toLowerCase().match(/\.(jpe?g|png|webp|avif)$/)?.[1] || "webp";
  return `artist-${crypto.randomUUID()}.${extension === "jpg" ? "jpeg" : extension}`;
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "An image file is required." }, { status: 400 });
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) return NextResponse.json({ error: "Use JPEG, PNG, WebP, or AVIF images." }, { status: 415 });
  if (file.size > MAX_IMAGE_BYTES) return NextResponse.json({ error: "Images must be 8 MB or smaller." }, { status: 413 });

  try {
    const blob = await put(`artists/${safeFileName(file.name)}`, file, {
      access: "public",
      addRandomSuffix: false,
      contentType: file.type,
      cacheControlMaxAge: 31536000,
    });
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Artist image upload failed", error);
    return NextResponse.json({ error: "Image upload is not configured or failed." }, { status: 503 });
  }
}
