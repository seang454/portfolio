import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

type TokenType = "admin-approve" | "admin-reject" | "user-download";

type BaseTokenPayload = {
  type: TokenType;
  email: string;
  exp: number;
};

export type AdminDecisionPayload = BaseTokenPayload & {
  type: "admin-approve" | "admin-reject";
  location: string;
  reason: string;
  requestId: string;
};

export type UserDownloadPayload = BaseTokenPayload & {
  type: "user-download";
  requestId: string;
};

type SignedPayload = AdminDecisionPayload | UserDownloadPayload;

const DEFAULT_DOWNLOAD_PATH = "/information/image.png";

function getSecret() {
  return process.env.CV_DOWNLOAD_SECRET || "";
}

function base64UrlEncode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signValue(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("base64url");
}

export function isCvEmailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY &&
      getSecret()
  );
}

export function getCvApproverEmail() {
  return process.env.CV_APPROVER_EMAIL || "pengseangsim210@gmail.com";
}

export function getSiteUrl(fallbackOrigin?: string) {
  return (process.env.NEXT_PUBLIC_SITE_URL || fallbackOrigin || "").replace(/\/$/, "");
}

export function getCvDownloadPath() {
  return process.env.CV_DOWNLOAD_PATH || DEFAULT_DOWNLOAD_PATH;
}

export function generateRequestId() {
  return randomUUID();
}

export function createSignedToken(payload: SignedPayload) {
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = signValue(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifySignedToken<T extends SignedPayload>(token: string, expectedType: TokenType) {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature || !getSecret()) {
    return null;
  }

  const expectedSignature = signValue(encodedPayload);
  const incomingBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    incomingBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(incomingBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const parsed = JSON.parse(base64UrlDecode(encodedPayload)) as SignedPayload;
    if (parsed.type !== expectedType || parsed.exp < Date.now()) {
      return null;
    }
    return parsed as T;
  } catch {
    return null;
  }
}

export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "CV Request <onboarding@resend.dev>";

  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to,
      subject,
      html,
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Resend error: ${message}`);
  }

  return response.json();
}

export function buildAdminDecisionLinks(
  payload: Omit<AdminDecisionPayload, "type">,
  fallbackOrigin?: string
) {
  const siteUrl = getSiteUrl(fallbackOrigin);
  const approveToken = createSignedToken({
    ...payload,
    type: "admin-approve",
  });
  const rejectToken = createSignedToken({
    ...payload,
    type: "admin-reject",
  });

  return {
    approveUrl: `${siteUrl}/api/cv-request/approve?token=${encodeURIComponent(approveToken)}`,
    rejectUrl: `${siteUrl}/api/cv-request/reject?token=${encodeURIComponent(rejectToken)}`,
  };
}

export function buildUserDownloadLink(
  payload: Omit<UserDownloadPayload, "type">,
  fallbackOrigin?: string
) {
  const siteUrl = getSiteUrl(fallbackOrigin);
  const downloadToken = createSignedToken({
    ...payload,
    type: "user-download",
  });

  return `${siteUrl}/api/cv-download?token=${encodeURIComponent(downloadToken)}`;
}
