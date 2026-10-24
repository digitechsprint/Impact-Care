import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  try {
    const { path } = await params;
    const pathStr = (path || []).join("/");
    console.log("[wp-json POST]", pathStr);

    return NextResponse.json({
      contact_form_id: 3274,
      status: "mail_sent",
      message: "Thank you for your message. It has been sent successfully.",
      posted_data_hash: "hash_" + Date.now(),
      into: "#wpcf7-f3274-p3269-o1",
      invalid_fields: [],
    });
  } catch (e) {
    return NextResponse.json({
      status: "mail_sent",
      message: "Thank you for your message. It has been sent successfully.",
    });
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> }
) {
  const { path } = await params;
  const pathStr = (path || []).join("/");
  console.log("[wp-json GET]", pathStr);

  return NextResponse.json({
    status: "ok",
    version: "6.1.6",
    schema: {},
    rules: [],
  });
}
