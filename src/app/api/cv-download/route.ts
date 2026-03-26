import { NextResponse } from "next/server";
import { getCvDownloadPath, verifySignedToken, type UserDownloadPayload } from "@/lib/cv-request";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return new NextResponse("Missing token.", { status: 400 });
  }

  const payload = verifySignedToken<UserDownloadPayload>(token, "user-download");
  if (!payload) {
    return new NextResponse("Invalid or expired download link.", { status: 400 });
  }

  return NextResponse.redirect(new URL(getCvDownloadPath(), origin));
}
