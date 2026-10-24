import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let data: Record<string, any> = {};

    if (contentType.includes("application/json")) {
      data = await request.json();
    } else if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        data[key] = value;
      });
    }

    console.log("[Contact API] Received form submission:", data);

    // Persist to Supabase (files can't be stored as JSON — keep only their names)
    const supabase = createServerSupabase();
    if (supabase) {
      const payload: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(data)) {
        if (key.startsWith("_wpcf7")) continue;
        payload[key] = typeof value === "object" && value && "name" in value ? (value as File).name : value;
      }
      const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);
      const name =
        str(payload["your-name"]) ??
        ([str(payload["first-name"]), str(payload["last-name"])].filter(Boolean).join(" ") || null);

      const { error } = await supabase.from("contact_submissions").insert({
        page: request.headers.get("referer"),
        name,
        email: str(payload.email),
        phone: str(payload.phone),
        message: str(payload.msg) ?? str(payload.message),
        payload,
      });
      if (error) console.error("[Contact API] Supabase insert failed:", error.message);
    }

    return NextResponse.json({
      success: true,
      status: "mail_sent",
      message: "Thank you for contacting Impact Healthcare! Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("[Contact API] Error processing contact form:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit form. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Contact endpoint active",
  });
}
