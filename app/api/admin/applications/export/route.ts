import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin";
import { applicationCsvFilename, buildApplicationCsv } from "@/lib/application-csv";
import { getAdminApplicationForm, getApplicationSubmissionsForExport } from "@/lib/application-form-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  try {
    const [form, submissions] = await Promise.all([
      getAdminApplicationForm(),
      getApplicationSubmissionsForExport(),
    ]);
    return new NextResponse(buildApplicationCsv(form, submissions), {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${applicationCsvFilename()}"`,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Unable to export application submissions", error);
    return NextResponse.json({ error: "Export failed" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
