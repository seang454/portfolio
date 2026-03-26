import Link from "next/link";
import { CheckCircle2, MailX, ArrowLeft } from "lucide-react";

export default async function CvRequestStatusPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string }>;
}) {
  const params = await searchParams;
  const isApproved = params.state === "approved";

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-16 text-[var(--foreground)] sm:px-8">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-8 shadow-[0_24px_70px_rgba(17,30,61,0.12)] backdrop-blur-xl">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent-strong)]">
          {isApproved ? (
            <CheckCircle2 className="h-7 w-7" />
          ) : (
            <MailX className="h-7 w-7" />
          )}
        </div>

        <p className="section-kicker">
          {isApproved ? "Request Approved" : "Request Rejected"}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">
          {isApproved ? "The requester has been emailed the CV link." : "The requester has been notified of the rejection."}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-8 text-[var(--muted)]">
          {isApproved
            ? "A secure download link was sent to the requester by email. They can use that link to download the CV."
            : "The request was marked as not approved, and a rejection email was sent to the requester."}
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:border-[var(--ring)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
