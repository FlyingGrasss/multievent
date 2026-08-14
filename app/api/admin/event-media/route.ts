import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";

export const runtime = "nodejs";

const EVENT_MEDIA_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "video/mp4", "video/webm", "video/quicktime"];
const MAX_EVENT_MEDIA_BYTES = 500 * 1024 * 1024;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as HandleUploadBody | null;
  if (!body) return NextResponse.json({ error: "Invalid upload request." }, { status: 400 });

  try {
    const response = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const session = await getAdminSession();
        if (!session) throw new Error("Unauthorized");
        if (!pathname.startsWith("events/")) throw new Error("Invalid event media path.");
        return {
          allowedContentTypes: EVENT_MEDIA_TYPES,
          maximumSizeInBytes: MAX_EVENT_MEDIA_BYTES,
          addRandomSuffix: true,
          cacheControlMaxAge: 31536000,
          tokenPayload: "event-media",
        };
      },
      onUploadCompleted: async () => {},
    });
    return NextResponse.json(response);
  } catch (error) {
    console.error("Event media upload failed", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Upload failed." }, { status: 400 });
  }
}
