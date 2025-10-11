// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import SiteNav from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Favora.UZ — Современные формы городской архитектуры",
  description:
    "Проектирование и производство городской мебели и архитектурных элементов из фиброцемента. Фонтаны, скамейки, вазоны для благоустройства городских пространств.",
  generator: "favora.uz",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <meta
          name="google-site-verification"
          content="Dd7jk6Ua5Nk_n0bPEUbDcwCS_R_18SvcHp8WkuMTImg"
        />
      </head>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased bg-[#F5F1E8]`}
      >
        {/* FIX: header faqat body ichida */}
        <SiteNav />

        {/* FIX: kontent header ostiga tushishi uchun padding */}
        <main className="pt-16 sm:pt-[72px]">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
