"use client";

import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const products = [
  {
    id: 1,
    title: "Фонтаны",
    description:
      "Современные фонтанные комплексы с интегрированными системами освещения",
    image: "/modern-urban-fountain-architectural-design-minimal.jpg",
    size: "large",
  },
  {
    id: 2,
    title: "Скамейки",
    description: "Эргономичные решения для городских пространств",
    image: "/modern-urban-bench-architectural-design-fiber-ceme.jpg",
    size: "medium",
  },
  {
    id: 3,
    title: "Вазоны",
    description: "Декоративные элементы для озеленения",
    image: "/modern-architectural-planter-urban-design-minimali.jpg",
    size: "medium",
  },
];

export function Products() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-8 md:px-16 bg-card"
    >
      <div className="max-w-[1600px] mx-auto">
        <div
          className={`grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/10 text-accent text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium rounded-full mb-4 sm:mb-6">
              Продукция
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight">
              Наши
              <br />
              <span className="italic text-accent">категории</span>
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light max-w-md">
              Широкий ассортимент городской мебели и архитектурных элементов,
              созданных с использованием современных материалов и технологий
            </p>
          </div>
        </div>

        <div
          className={`grid md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Large featured item */}
          <div
            className="md:row-span-2 group relative overflow-hidden rounded-sm cursor-pointer bg-background"
            onMouseEnter={() => setHoveredId(products[0].id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="relative aspect-[3/4] md:aspect-auto md:h-full overflow-hidden">
              <img
                src={products[0].image || "/placeholder.svg"}
                alt={products[0].title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  hoveredId === products[0].id ? "scale-105" : "scale-100"
                }`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent transition-opacity duration-500 ${
                  hoveredId === products[0].id ? "opacity-100" : "opacity-80"
                }`}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12">
              <div className="text-xs sm:text-sm text-accent mb-2 sm:mb-3 tracking-wider uppercase font-light">
                01
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-3 sm:mb-4 text-background">
                {products[0].title}
              </h3>
              <p
                className={`text-background/80 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 font-light transition-all duration-500 ${
                  hoveredId === products[0].id
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                {products[0].description}
              </p>
              <div
                className={`flex items-center text-accent text-xs sm:text-sm font-light transition-all duration-500 ${
                  hoveredId === products[0].id
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
              >
                Подробнее
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </div>
            </div>
          </div>

          {/* Two smaller items */}
          {products.slice(1).map((product, index) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-sm cursor-pointer bg-background"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    hoveredId === product.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent transition-opacity duration-500 ${
                    hoveredId === product.id ? "opacity-100" : "opacity-80"
                  }`}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                <div className="text-[10px] sm:text-xs text-accent mb-1 sm:mb-2 tracking-wider uppercase font-light">
                  0{index + 2}
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-tight mb-2 sm:mb-3 text-background">
                  {product.title}
                </h3>
                <p
                  className={`text-background/80 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 font-light transition-all duration-500 ${
                    hoveredId === product.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  {product.description}
                </p>
                <div
                  className={`flex items-center text-accent text-[10px] sm:text-xs font-light transition-all duration-500 ${
                    hoveredId === product.id
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-4"
                  }`}
                >
                  Подробнее
                  <ArrowRight className="ml-2 h-3 w-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
