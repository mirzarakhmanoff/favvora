// app/products/versaille/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import ConsultModal from "@/components/consult-modal";

const product = {
  id: 1,
  name: 'Классический фонтан "Версаль"',
  category: "Фонтаны",
  price: "По запросу",
  images: [
    "/products/product5.jpg",
    "/products/product2.jpg",
    "/products/product3.jpg",
  ],
  description:
    "Элегантный многоярусный фонтан в классическом стиле, вдохновленный архитектурой французских дворцов. Идеален для парков, площадей и престижных общественных пространств. Изготовлен из высококачественного фиброцемента с возможностью индивидуальной отделки.",
  features: [
    "Многоярусная конструкция с каскадным водопадом",
    "Устойчивость к перепадам температур от -40°C до +60°C",
    "Встроенная система подсветки (опционально)",
    "Энергоэффективная система циркуляции воды",
    "Антивандальное покрытие",
    "Гарантия 5 лет",
  ],
  specifications: [
    { label: "Высота", value: "3.2 м" },
    { label: "Диаметр основания", value: "2.4 м" },
    { label: "Вес", value: "850 кг" },
    { label: "Материал", value: "Фиброцемент" },
    { label: "Производительность насоса", value: "120 л/мин" },
    { label: "Мощность", value: "0.75 кВт" },
  ],
  materials: [
    "Фиброцемент высокой плотности",
    "Нержавеющая сталь (крепления)",
    "Полимерное защитное покрытие",
  ],
};

export default function ProductVersaillePage() {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      {/* Agar header fixed bo‘lsa, tepaga padding */}
      <div className="pt-[72px]">
        {/* Back */}
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Button
            asChild
            variant="ghost"
            className="gap-2 text-foreground/70 hover:text-foreground"
          >
            <Link href="/products">
              <ArrowLeft className="w-4 h-4" />
              Назад к продукции
            </Link>
          </Button>
        </div>

        {/* Product */}
        <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Images */}
            <Gallery images={product.images} title={product.name} />

            {/* Info */}
            <div>
              <div className="inline-block px-4 py-1.5 bg-[#C17A3F]/10 text-[#C17A3F] rounded-full text-xs font-semibold tracking-wide mb-4 uppercase">
                {product.category}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight mb-4 text-balance">
                {product.name}
              </h1>
              <div className="text-2xl sm:text-3xl font-semibold text-[#C17A3F] mb-8">
                {product.price}
              </div>

              <p className="text-base sm:text-lg text-foreground/70 leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12">
                <ConsultModal
                  productName={product.name}
                  trigger={
                    <Button className="bg-black text-white hover:bg-black/90 rounded-full px-8 shadow-md hover:shadow-lg transition-all">
                      Запросить консультацию
                    </Button>
                  }
                />
                <Button
                  variant="outline"
                  className="rounded-full px-8 border-black text-black hover:bg-black hover:text-white transition-all bg-white"
                >
                  Скачать каталог
                </Button>
              </div>

              {/* Features */}
              <Card className="p-4 sm:p-6 bg-white border-[#E5DCC8] mb-6 sm:mb-8 shadow-sm">
                <h3 className="text-lg sm:text-xl font-light mb-4">
                  Особенности
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex gap-3">
                      <Check className="w-5 h-5 text-[#C17A3F] flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Specifications */}
              <Card className="p-4 sm:p-6 bg-white border-[#E5DCC8] mb-6 sm:mb-8 shadow-sm">
                <h3 className="text-lg sm:text-xl font-light mb-4">
                  Технические характеристики
                </h3>
                <div className="divide-y divide-[#E5DCC8]">
                  {product.specifications.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 gap-4"
                    >
                      <span className="text-sm sm:text-base text-foreground/60">
                        {spec.label}
                      </span>
                      <span className="text-sm sm:text-base font-medium text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Materials */}
              <Card className="p-4 sm:p-6 bg-white border-[#E5DCC8] shadow-sm">
                <h3 className="text-lg sm:text-xl font-light mb-4">
                  Материалы
                </h3>
                <ul className="space-y-2">
                  {product.materials.map((m, i) => (
                    <li
                      key={i}
                      className="text-sm sm:text-base text-foreground/80"
                    >
                      • {m}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ================== Interactive Gallery ================== */
function Gallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [fadeKey, setFadeKey] = useState(0); // crossfade trigger
  const startX = useRef<number | null>(null);

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  // Crossfade on active change
  useEffect(() => {
    setFadeKey((k) => k + 1);
  }, [active]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Touch swipe (mobile)
  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) (dx > 0 ? prev : next)();
    startX.current = null;
  };

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div
        className="relative aspect-square rounded-2xl overflow-hidden bg-white/60 shadow-[0_10px_35px_rgba(0,0,0,0.08)] ring-1 ring-[#E5DCC8]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* soft gradient top overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_50%_-10%,rgba(193,122,63,0.12),transparent_55%)]" />
        {/* image crossfade */}
        <div
          key={fadeKey}
          className="absolute inset-0 animate-[fadein_.45s_ease]"
        >
          <Image
            src={images[active] || "/placeholder.svg"}
            alt={`${title} — изображение ${active + 1}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* Prev / Next controls */}
        <button
          onClick={prev}
          aria-label="Предыдущее фото"
          className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/85 backdrop-blur border border-[#E5DCC8] hover:bg-white transition shadow-sm"
        >
          {/* ‹ */}
          <span className="block text-xl leading-none -mt-0.5">
            {String.fromCharCode(8249)}
          </span>
        </button>
        <button
          onClick={next}
          aria-label="Следующее фото"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/85 backdrop-blur border border-[#E5DCC8] hover:bg-white transition shadow-sm"
        >
          {/* › */}
          <span className="block text-xl leading-none -mt-0.5">
            {String.fromCharCode(8250)}
          </span>
        </button>

        {/* index badge */}
        <div className="absolute bottom-3 right-3 text-xs px-2.5 py-1 rounded-full bg-[#C17A3F]/90 text-white shadow">
          {active + 1}/{images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-4">
        {images.map((img, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Показать изображение ${i + 1}`}
              className={`group relative aspect-square rounded-xl overflow-hidden border transition-all
                ${
                  isActive
                    ? "border-[#C17A3F] ring-2 ring-[#C17A3F]/40"
                    : "border-[#E5DCC8] hover:border-[#C17A3F]/60"
                }`}
            >
              <Image
                src={img || "/placeholder.svg"}
                alt={`${title} — превью ${i + 1}`}
                fill
                sizes="(max-width: 1024px) 33vw, 16vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* active overlay */}
              {isActive && (
                <div className="absolute inset-0 ring-1 ring-inset ring-[#C17A3F]/30 pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      {/* keyframes for fade */}
      <style jsx global>{`
        @keyframes fadein {
          from {
            opacity: 0;
            transform: scale(1.015);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
