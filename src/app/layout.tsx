import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientProviders from "@/components/ClientProviders";

const englishFont = localFont({
  src: [
    {
      path: "../../public/fonts/english.ttf",
      style: "normal",
      weight: "400 800",
    },
    {
      path: "../../public/fonts/Italic-english.ttf",
      style: "italic",
      weight: "400 800",
    },
  ],
  variable: "--font-english",
  display: "swap",
});

const khmerFont = localFont({
  src: [
    {
      path: "../../public/fonts/khmer.ttf",
      style: "normal",
      weight: "400 800",
    },
    {
      path: "../../public/fonts/Italic-khmer.ttf",
      style: "italic",
      weight: "400 800",
    },
  ],
  variable: "--font-khmer",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SIM PENGSEANG | Full-Stack Developer & DevOps Learner",
  description:
    "Bilingual portfolio for SIM PENGSEANG showcasing Spring Boot, React, Docker, Kubernetes, CI/CD, and modern DevOps-focused project work.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${englishFont.variable} ${khmerFont.variable}`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
