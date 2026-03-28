import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getCvDownloadPath, verifySignedToken, type UserDownloadPayload } from "@/lib/cv-request";

function getContentType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case ".pdf":
      return "application/pdf";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    default:
      return "application/octet-stream";
  }
}

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

  const downloadPath = getCvDownloadPath();
  const publicRoot = path.join(process.cwd(), "public");
  const normalizedPath = downloadPath.replace(/^\/+/, "");
  const filePath = path.join(publicRoot, normalizedPath);

  try {
    const fileBuffer = await readFile(filePath);
    const fileName = path.basename(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": getContentType(filePath),
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch {
    return new NextResponse(
      `Configured CV file was not found at ${new URL(downloadPath, origin).pathname}.`,
      { status: 500 }
    );
  }
}
