"use client";

import { useEffect, useState } from "react";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const navItems = [
  { id: "home", en: "Home", kh: "ទំព័រដើម" },
  { id: "about", en: "About", kh: "អំពីខ្ញុំ" },
  { id: "projects", en: "Projects", kh: "គម្រោង" },
  { id: "contact", en: "Contact", kh: "ទំនាក់ទំនង" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { i18n } = useTranslation();
  const locale = i18n.language === "kh" ? "kh" : "en";

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setScrolled(scrollTop > 24);
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const switchLocale = (next: "en" | "kh") => {
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
    document.documentElement.lang = next === "kh" ? "km" : "en";
  };

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1 bg-black/6 dark:bg-white/6">
        <div
          className="h-full origin-left bg-[linear-gradient(90deg,#ff4d6d_0%,#ff8b5d_45%,#54c6b7_100%)] shadow-[0_0_18px_rgba(255,139,93,0.45)] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        className={[
          "mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 sm:px-6",
          scrolled
            ? "border-white/15 bg-background/78 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        ].join(" ")}
      >
        <a href="#home" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-strong)] text-sm font-bold text-[var(--accent-contrast)] shadow-[0_16px_35px_var(--accent-shadow)]">
            SP
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-foreground">
              SIM PENGSEANG
            </p>
            <p className="text-xs text-[var(--muted)]">
              {locale === "kh"
                ? "Full-Stack Developer និង DevOps Learner"
                : "Full-Stack Developer and DevOps Learner"}
            </p>
          </div>
        </a>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-full px-4 py-2 text-sm text-[var(--muted)] transition hover:bg-white/8 hover:text-foreground"
            >
              {locale === "kh" ? item.kh : item.en}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full border border-white/12 bg-white/8 px-2 py-1 backdrop-blur">
            <Languages className="h-4 w-4 text-[var(--muted)]" />
            <button
              type="button"
              onClick={() => switchLocale("en")}
              className={[
                "rounded-full px-2.5 py-1 text-xs font-semibold transition",
                locale === "en"
                  ? "bg-[var(--accent-strong)] text-[var(--accent-contrast)]"
                  : "text-[var(--muted)]",
              ].join(" ")}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => switchLocale("kh")}
              className={[
                "rounded-full px-2.5 py-1 text-xs font-semibold transition",
                locale === "kh"
                  ? "bg-[var(--accent-strong)] text-[var(--accent-contrast)]"
                  : "text-[var(--muted)]",
              ].join(" ")}
            >
              KH
            </button>
          </div>

          <AnimatedThemeToggler className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-foreground backdrop-blur transition hover:bg-white/12" />
        </div>
      </nav>
    </div>
  );
}
