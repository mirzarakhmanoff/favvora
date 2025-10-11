"use client";

import { useEffect, useRef, useState } from "react";

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="text-sm tracking-[0.3em] text-accent uppercase mb-6">
              О компании
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-balance">
              Инновации в городской архитектуре
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Favora.UZ — ведущая компания в области проектирования и
                производства современной городской мебели и архитектурных
                элементов. Мы специализируемся на создании уникальных решений из
                фиброцемента и других инновационных материалов.
              </p>
              <p>
                Наша миссия — преобразовывать городские пространства, создавая
                функциональные и эстетически совершенные объекты, которые служат
                десятилетиями. Каждое изделие — это сочетание передовых
                технологий, качественных материалов и безупречного дизайна.
              </p>
              <p>
                Мы работаем с муниципалитетами, архитекторами и застройщиками,
                предлагая комплексные решения для благоустройства городских
                территорий, парков, скверов и общественных пространств.
              </p>
            </div>
          </div>
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src="/modern-architectural-bench-design-fiber-cement-urb.jpg"
                alt="Architectural Design"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
