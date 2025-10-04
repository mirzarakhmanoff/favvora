"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    setIsVisible(true);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 lg:px-16 py-4 md:py-5 bg-background/90 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="text-xl sm:text-2xl font-light tracking-tight">
            FAVVORA.UZ
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10 text-sm lg:text-base font-light">
            <a
              href="#about"
              className="hover:text-accent transition-colors duration-300"
            >
              О нас
            </a>
            <a
              href="#products"
              className="hover:text-accent transition-colors duration-300"
            >
              Продукция
            </a>
            <a
              href="#portfolio"
              className="hover:text-accent transition-colors duration-300"
            >
              Проекты
            </a>
            <a
              href="#contact"
              className="hover:text-accent transition-colors duration-300"
            >
              Контакты
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4 py-4 border-t border-border/50">
            <a
              href="#about"
              onClick={handleNavClick}
              className="text-base font-light hover:text-accent transition-colors duration-300 px-2"
            >
              О нас
            </a>
            <a
              href="#products"
              onClick={handleNavClick}
              className="text-base font-light hover:text-accent transition-colors duration-300 px-2"
            >
              Продукция
            </a>
            <a
              href="#portfolio"
              onClick={handleNavClick}
              className="text-base font-light hover:text-accent transition-colors duration-300 px-2"
            >
              Проекты
            </a>
            <a
              href="#contact"
              onClick={handleNavClick}
              className="text-base font-light hover:text-accent transition-colors duration-300 px-2"
            >
              Контакты
            </a>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-16 sm:pt-20 md:pt-24">
        <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-center">
            {/* Left: Large typography */}
            <div
              className={`space-y-5 sm:space-y-6 md:space-y-8 lg:pr-8 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/10 text-accent text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium rounded-full">
                  Городская архитектура
                </div>
                <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight leading-[0.95] text-balance">
                  Создаём
                  <br />
                  <span className="italic font-light text-accent">
                    городские
                  </span>
                  <br />
                  пространства
                </h1>
              </div>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg font-light">
                Проектируем и производим современную городскую мебель и
                архитектурные элементы из фиброцемента
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
                <Button
                  size="lg"
                  className="bg-foreground text-background hover:bg-foreground/90 text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12 md:h-14 rounded-full font-light w-full sm:w-auto transition-all duration-300"
                >
                  Связаться с нами
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12 md:h-14 rounded-full border-border hover:border-foreground hover:bg-foreground hover:text-background font-light bg-transparent w-full sm:w-auto transition-all duration-300"
                >
                  Каталог продукции
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 pt-6 sm:pt-8 md:pt-12 border-t border-border/50">
                <div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-light text-accent mb-0.5 sm:mb-1">
                    150+
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-light">
                    Проектов
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-light text-accent mb-0.5 sm:mb-1">
                    12
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-light">
                    Лет опыта
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-light text-accent mb-0.5 sm:mb-1">
                    25+
                  </div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-light">
                    Городов
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`relative h-[400px] sm:h-[500px] md:h-[550px] lg:h-[650px] xl:h-[700px] transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div
                className="relative h-full rounded-sm overflow-hidden"
                style={{ transform: `translateY(${scrollY * 0.1}px)` }}
              >
                <img
                  src="/modern-urban-fountain-architectural-design-fiber-c.jpg"
                  alt="Urban Architecture"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="absolute -bottom-3 sm:-bottom-6 md:-bottom-8 -left-3 sm:-left-6 md:-left-8 bg-background border border-border p-3 sm:p-4 md:p-6 rounded-sm shadow-xl max-w-[200px] sm:max-w-[250px] md:max-w-xs">
                <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mb-1 sm:mb-2 font-light">
                  FAVVORA.UZ
                </div>
                <div className="text-xs sm:text-sm md:text-base font-light leading-relaxed">
                  Современные формы городской архитектуры
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
