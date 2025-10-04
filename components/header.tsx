"use client";

import * as React from "react";
import Portal from "@/components/ui/portal";

const NAV_LINKS = [
  { href: "#about", label: "О нас" },
  { href: "#products", label: "Продукция" },
  { href: "#portfolio", label: "Проекты" },
  { href: "#contact", label: "Контакты" },
];

export default function SiteNav() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState<string | null>(null);
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  //@ts-expect-error
  React.useEffect(() => {
    const { style } = document.body;
    const prev = style.overflow;
    style.overflow = open ? "hidden" : prev || "";
    return () => (style.overflow = prev || "");
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

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // active link observer
  React.useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href).filter((h) => h.startsWith("#"));
    const sections = ids
      .map((id) => document.querySelector(id))
      .filter(Boolean) as Element[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.01, 0.1, 0.25, 0.5] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <Portal>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0, // ← muhim
          zIndex: 2147483646,
        }}
        className={`pointer-events-auto transition-shadow ${
          scrolled ? "shadow-[0_2px_16px_rgba(0,0,0,0.06)]" : "shadow-none"
        }`}
      >
        <nav
          className={`px-4 sm:px-8 md:px-16 py-3 sm:py-4 md:py-5 border-b border-border/50 ${
            scrolled
              ? "bg-background/95 backdrop-blur-md"
              : "bg-background/70 backdrop-blur-md"
          }`}
        >
          <div className="mx-auto max-w-[1600px] flex items-center justify-between">
            <a
              href="#hero"
              onClick={(e) => onNavClick(e, "#hero")}
              className="inline-flex items-center gap-2"
            >
              <span className="text-lg sm:text-xl font-semibold tracking-tight">
                FAVVORA.UZ
              </span>
            </a>

            <div className="hidden md:flex items-center gap-6 lg:gap-10 text-sm">
              {NAV_LINKS.map((l) => {
                const isActive = active === l.href;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={(e) => onNavClick(e, l.href)}
                    className={`relative px-1 py-1 transition-colors ${
                      isActive ? "text-accent" : "text-foreground/90"
                    } hover:text-accent`}
                  >
                    {l.label}
                  </a>
                );
              })}
            </div>

            <button
              type="button"
              aria-label={open ? "Закрыть меню" : "Открыть меню"}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden h-11 w-11 rounded-xl border border-border/60 bg-background/70 backdrop-blur-sm flex items-center justify-center"
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

          {/* Backdrop */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 2147483600,
              background: "rgba(0,0,0,.35)",
              opacity: open ? 1 : 0,
              pointerEvents: open ? "auto" : "none",
              transition: "opacity .3s",
            }}
          />

          {/* Drawer */}
          <div
            id="mobile-nav"
            ref={panelRef}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              height: "100%",
              width: "min(88%,360px)",
              zIndex: 2147483620,
              transform: open ? "translateX(0)" : "translateX(100%)",
              transition: "transform .3s ease-out",
            }}
            className="bg-background/95 border-l border-border/50 md:hidden"
          >
            <div className="px-5 py-4 border-b border-border/50 flex justify-between items-center">
              <span>Меню</span>
              <button onClick={() => setOpen(false)} aria-label="Закрыть меню">
                ✕
              </button>
            </div>
            <ul className="flex flex-col p-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => onNavClick(e, l.href)}
                    className={`block px-4 py-3 rounded-xl ${
                      active === l.href
                        ? "text-accent bg-accent/5"
                        : "hover:text-accent hover:bg-accent/5"
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </Portal>
  );
}
