import { NextResponse } from "next/server";
import {
  buildUserDownloadLink,
  sendEmail,
  verifySignedToken,
  type AdminDecisionPayload,
} from "@/lib/cv-request";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return new NextResponse("Missing token.", { status: 400 });
  }

  const payload = verifySignedToken<AdminDecisionPayload>(token, "admin-approve");
  if (!payload) {
    return new NextResponse("Invalid or expired approval link.", { status: 400 });
  }

  const downloadUrl = buildUserDownloadLink({
    requestId: payload.requestId,
    email: payload.email,
    exp: Date.now() + 1000 * 60 * 60 * 24,
  }, origin);

  await sendEmail({
    to: payload.email,
    subject: "Your CV request was approved",
    html: `
      <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
        <h2 style="margin-bottom: 12px;">Your CV request was approved</h2>
        <p>You can now download the CV using the secure link below.</p>
        <a href="${downloadUrl}" style="display:inline-block;padding:12px 18px;border-radius:999px;background:#d97745;color:#fff;text-decoration:none;">Download CV</a>
        <div style="margin-top: 18px; padding: 14px 16px; border-radius: 14px; background: #f7f8fb;">
          <p style="margin: 0 0 8px; font-weight: 600;">If the button does not open correctly, copy this link:</p>
          <p style="margin: 0; word-break: break-all;">${downloadUrl}</p>
        </div>
        <p style="margin-top: 18px; color:#6b7280;">This download link expires in 24 hours.</p>
      </div>
    `,
  });

  return NextResponse.redirect(
    new URL("/cv-request-status?state=approved", origin)
  );
}
