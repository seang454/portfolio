'use client'
import { useEffect } from "react";
import i18n from "i18n";
import { ThemeProvider } from "next-themes";
import { I18nextProvider } from "react-i18next";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const applyLang = (lang: string) => {
      document.documentElement.lang = lang === "kh" ? "km" : "en";
    };

    const savedLang =
      typeof window !== "undefined" ? localStorage.getItem("lang") || "en" : "en";

    if (savedLang !== i18n.language) {
      void i18n.changeLanguage(savedLang);
    }

    applyLang(savedLang);
    i18n.on("languageChanged", applyLang);

    return () => {
      i18n.off("languageChanged", applyLang);
    };
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={false}
    >
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </ThemeProvider>
  );
}
