import { NextResponse } from "next/server";
import {
  buildAdminDecisionLinks,
  generateRequestId,
  getCvApproverEmail,
  isCvEmailConfigured,
  sendEmail,
} from "@/lib/cv-request";

export async function POST(request: Request) {
  try {
    const origin = new URL(request.url).origin;
    const { email, location, reason } = (await request.json()) as {
      email?: string;
      location?: string;
      reason?: string;
    };

    if (!email?.trim() || !location?.trim() || !reason?.trim()) {
      return NextResponse.json({ error: "Please fill all required fields." }, { status: 400 });
    }

    if (!isCvEmailConfigured()) {
      return NextResponse.json({
        ok: true,
        fallback: "mailto",
        approverEmail: getCvApproverEmail(),
      });
    }

    const requestId = generateRequestId();
    const exp = Date.now() + 1000 * 60 * 60 * 24;
    const { approveUrl, rejectUrl } = buildAdminDecisionLinks({
      requestId,
      email: email.trim(),
      location: location.trim(),
      reason: reason.trim(),
      exp,
    }, origin);

    await sendEmail({
      to: getCvApproverEmail(),
      replyTo: email.trim(),
      subject: `CV access request from ${email.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
          <h2 style="margin-bottom: 12px;">New CV access request</h2>
          <p><strong>Email:</strong> ${email.trim()}</p>
          <p><strong>Location:</strong> ${location.trim()}</p>
          <p><strong>Reason:</strong><br/>${reason.trim()}</p>
          <div style="margin-top: 24px;">
            <a href="${approveUrl}" style="display:inline-block;padding:12px 18px;border-radius:999px;background:#d97745;color:#fff;text-decoration:none;margin-right:12px;">Approve request</a>
            <a href="${rejectUrl}" style="display:inline-block;padding:12px 18px;border-radius:999px;background:#1f2937;color:#fff;text-decoration:none;">Reject request</a>
          </div>
          <p style="margin-top: 18px; color:#6b7280;">This approval link expires in 24 hours.</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to submit CV request.",
      },
      { status: 500 }
    );
  }
}
