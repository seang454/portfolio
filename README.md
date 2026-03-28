# SIM PENGSEANG Portfolio

Next.js portfolio with:
- bilingual UI
- theme switching
- CV request + approval flow
- Resend email integration
- secure CV download links

## Local Development

Run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## CV File Path

The current CV download target is:

[`public/information/image.png`](D:\personalInfo\myporfolio\public\information\image.png)

Public URL:

```txt
/information/image.png
```

If you replace it with a PDF later, also update:

```env
CV_DOWNLOAD_PATH=/information/your-cv-file.pdf
```

The secure approval link now returns the configured file as a download attachment, so approved requesters can download it directly from the email link.

## Environment Variables

Create `.env.local` for local development.

Required values:

```env
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=CV Request <your-verified-sender@yourdomain.com>
CV_APPROVER_EMAIL=pengseangsim210@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CV_DOWNLOAD_SECRET=put-a-long-random-secret-here
CV_DOWNLOAD_PATH=/information/image.png
```

Notes:
- `RESEND_API_KEY` must come from your Resend account.
- `RESEND_FROM_EMAIL` should be a sender verified in Resend for production.
- `NEXT_PUBLIC_SITE_URL` must be your real public site URL on Vercel in production.
- `CV_DOWNLOAD_SECRET` should be a long random string.

## Vercel Deployment

Deploy the project to Vercel, then add the same environment variables in:

`Project Settings -> Environment Variables`

Use production values like:

```env
NEXT_PUBLIC_SITE_URL=https://your-portfolio.vercel.app
CV_DOWNLOAD_PATH=/information/image.png
```

Important:
- `localhost` links only work on your machine.
- if you want request approval and secure download links to work for real users, the site must be deployed publicly
- the sender email in Resend must be valid for your account and domain rules

## CV Approval Flow

Current flow:

1. User opens `Download CV`
2. User fills email, location, and reason
3. Site emails the request to `CV_APPROVER_EMAIL`
4. You click `Approve` or `Reject`
5. On approval, the requester receives a secure download link by email
6. Clicking that secure link downloads the configured CV file

Fallback:
- if Resend is not configured, the app falls back to `mailto`
- in that mode, the email is not sent automatically by the website

## Build Note

The project compiles successfully, but on this Windows environment `next build` may end with:

```txt
Error: spawn EPERM
```

That appears to be an environment-specific Windows process issue, not a TypeScript compile error in the app itself.
