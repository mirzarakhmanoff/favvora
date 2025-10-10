// components/header.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

const NAV_LINKS = [
  { href: "/", label: "О нас" },
  { href: "/products", label: "Продукция" },
  { href: "/projects", label: "Проекты" },
  { href: "/contact", label: "Контакты" },
];

function MobileLayer({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div
      // КЛЮЧ: когда закрыто — полное отключение событий
      className={`fixed inset-0 z-[1000] ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`absolute top-0 right-0 h-full w-[min(88%,360px)]
          bg-[#F5F1E8] border-l border-[#E5DCC8]/60 shadow-2xl
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}
          ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export default function SiteNav() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  // lock body scroll только когда open
  React.useEffect(() => {
    const { style } = document.body;
    const prev = style.overflow;
    style.overflow = open ? "hidden" : prev || "";
    return () => {
      style.overflow = prev || "";
    };
  }, [open]);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  React.useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[500] transition-shadow ${
        scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.06)]" : "shadow-none"
      }`}
    >
      <nav
        className={`px-4 sm:px-8 md:px-16 py-3 sm:py-4 md:py-5 border-b border-[#E5DCC8]/50 ${
          scrolled
            ? "bg-[#F5F1E8]/95 backdrop-blur-md"
            : "bg-[#F5F1E8]/70 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto max-w-[1600px] flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-lg sm:text-xl font-semibold tracking-tight">
              FAVVORA.UZ
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-10 text-sm">
            {NAV_LINKS.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative px-1 py-1 transition-colors ${
                    isActive ? "text-[#C17A3F]" : "text-foreground/90"
                  } hover:text-[#C17A3F]`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden h-11 w-11 rounded-xl border border-[#E5DCC8] bg-[#F5F1E8]/70 backdrop-blur-sm flex items-center justify-center hover:bg-[#E5DCC8]/50 transition-colors"
          >
            <div className="relative h-5 w-5">
              <span
                className={`absolute top-0 inset-x-0 h-0.5 bg-foreground transition ${
                  open ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute top-2 inset-x-0 h-0.5 bg-foreground transition ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute top-4 inset-x-0 h-0.5 bg-foreground transition ${
                  open ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Portal layer */}
      <MobileLayer open={open} onClose={() => setOpen(false)}>
        <div className="px-5 py-4 border-b border-[#E5DCC8]/60 flex justify-between items-center">
          <span className="font-medium">Меню</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Закрыть меню"
            className="text-2xl leading-none hover:text-[#C17A3F] transition-colors"
          >
            ✕
          </button>
        </div>
        <ul className="flex flex-col p-3">
          {NAV_LINKS.map((l) => {
            const isActive = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`block px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? "text-[#C17A3F] bg-[#C17A3F]/5"
                      : "hover:text-[#C17A3F] hover:bg-[#C17A3F]/5"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </MobileLayer>
    </header>
  );
}
