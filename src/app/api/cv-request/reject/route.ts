import { NextResponse } from "next/server";
import { sendEmail, verifySignedToken, type AdminDecisionPayload } from "@/lib/cv-request";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return new NextResponse("Missing token.", { status: 400 });
  }

  const payload = verifySignedToken<AdminDecisionPayload>(token, "admin-reject");
  if (!payload) {
    return new NextResponse("Invalid or expired rejection link.", { status: 400 });
  }

  await sendEmail({
    to: payload.email,
    subject: "Your CV request was not approved",
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="margin-bottom: 12px;">Your CV request was not approved</h2>
        <p>Thanks for your interest. This request was reviewed but not approved at this time.</p>
      </div>
    `,
  });

  return NextResponse.redirect(
    new URL("/cv-request-status?state=rejected", origin)
  );
}
