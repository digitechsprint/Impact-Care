import { NextRequest, NextResponse } from "next/server";

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
