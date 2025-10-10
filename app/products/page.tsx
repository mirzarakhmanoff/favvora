"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, SlidersHorizontal } from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: "Фонтаны" | "Скамейки" | "Урны" | "Вазоны";
  price: number;
  priceText: string;
  description: string;
};

// NOTE: Rasmlar local: /public/products/product{1..12}.jpg
const products: Product[] = [
  {
    id: 1,
    name: 'Классический фонтан "Версаль"',
    category: "Фонтаны",
    price: 15000000,
    priceText: "15 000 000 сум",
    description: "Элегантный многоярусный фонтан в классическом стиле",
  },
  {
    id: 2,
    name: 'Скамейка "Модерн"',
    category: "Скамейки",
    price: 450000,
    priceText: "450 000 сум",
    description: "Современная деревянная скамейка с металлическим каркасом",
  },
  {
    id: 3,
    name: 'Урна "Эко"',
    category: "Урны",
    price: 180000,
    priceText: "180 000 сум",
    description: "Стильная урна из композитных материалов",
  },
  {
    id: 4,
    name: 'Фонтан "Минимал"',
    category: "Фонтаны",
    price: 8500000,
    priceText: "8 500 000 сум",
    description: "Минималистичный фонтан для современных пространств",
  },
  {
    id: 5,
    name: 'Скамейка "Парк"',
    category: "Скамейки",
    price: 380000,
    priceText: "380 000 сум",
    description: "Классическая парковая скамейка",
  },
  {
    id: 6,
    name: 'Вазон "Куб"',
    category: "Вазоны",
    price: 220000,
    priceText: "220 000 сум",
    description: "Кубический вазон из фиброцемента",
  },
  {
    id: 7,
    name: 'Фонтан "Каскад"',
    category: "Фонтаны",
    price: 12000000,
    priceText: "12 000 000 сум",
    description: "Каскадный фонтан с несколькими уровнями",
  },
  {
    id: 8,
    name: 'Скамейка "Лофт"',
    category: "Скамейки",
    price: 520000,
    priceText: "520 000 сум",
    description: "Скамейка в индустриальном стиле",
  },
  {
    id: 9,
    name: 'Вазон "Цилиндр"',
    category: "Вазоны",
    price: 280000,
    priceText: "280 000 сум",
    description: "Цилиндрический вазон из нержавеющей стали",
  },
  {
    id: 10,
    name: 'Урна "Модерн"',
    category: "Урны",
    price: 250000,
    priceText: "250 000 сум",
    description: "Современная урна с раздельным сбором",
  },
  {
    id: 11,
    name: 'Скамейка "Волна"',
    category: "Скамейки",
    price: 680000,
    priceText: "680 000 сум",
    description: "Дизайнерская скамейка с волнообразной формой",
  },
  {
    id: 12,
    name: 'Вазон "Прямоугольный"',
    category: "Вазоны",
    price: 320000,
    priceText: "320 000 сум",
    description: "Прямоугольный вазон из композитного материала",
  },
];

const categories = ["Все", "Фонтаны", "Скамейки", "Урны", "Вазоны"] as const;
const priceRanges = [
  { label: "Все цены", min: 0, max: Number.POSITIVE_INFINITY },
  { label: "До 300 000", min: 0, max: 300000 },
  { label: "300 000 - 500 000", min: 300000, max: 500000 },
  { label: "500 000 - 1 000 000", min: 500000, max: 1000000 },
  { label: "Свыше 1 000 000", min: 1000000, max: Number.POSITIVE_INFINITY },
];

const sortOptions = [
  { label: "По умолчанию", value: "default" },
  { label: "Цена: по возрастанию", value: "price-asc" },
  { label: "Цена: по убыванию", value: "price-desc" },
  { label: "Название: А-Я", value: "name-asc" },
] as const;

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]>("Все");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [sortBy, setSortBy] =
    useState<(typeof sortOptions)[number]["value"]>("default");
  const [showFilters, setShowFilters] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observerRef.current?.observe(el));
  }, [selectedCategory, selectedPriceRange, sortBy]);

  const filteredProducts = products
    .filter((product) => {
      const categoryMatch =
        selectedCategory === "Все" || product.category === selectedCategory;
      const priceRange = priceRanges[selectedPriceRange];
      const priceMatch =
        product.price >= priceRange.min && product.price <= priceRange.max;
      return categoryMatch && priceMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <div className="pt-[72px]">
        {/* Page Header */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight mb-6">
              Наша <span className="italic text-[#C17A3F]">продукция</span>
            </h1>
            <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
              Широкий ассортимент городской мебели и архитектурных элементов для
              создания комфортных и эстетичных общественных пространств
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 pb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="rounded-full border-black bg-white text-black hover:bg-black hover:text-white transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Фильтры
            </Button>
            <div className="text-sm text-foreground/60">
              Найдено:{" "}
              <span className="font-medium text-foreground">
                {filteredProducts.length}
              </span>{" "}
              товаров
            </div>
          </div>

          {/* Filters Panel */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              showFilters
                ? "max-h-[800px] opacity-100 mb-8"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#E5DCC8] shadow-sm">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                {/* Category */}
                <div>
                  <h3 className="text-sm font-medium mb-4 text-foreground/80">
                    Категория
                  </h3>
                  <div className="flex flex-col gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`text-left px-4 py-2.5 rounded-lg transition-all text-sm ${
                          selectedCategory === category
                            ? "bg-black text-white shadow-sm"
                            : "bg-[#F5F1E8] text-foreground/70 hover:bg-[#E5DCC8]"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h3 className="text-sm font-medium mb-4 text-foreground/80">
                    Цена
                  </h3>
                  <div className="flex flex-col gap-2">
                    {priceRanges.map((range, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPriceRange(index)}
                        className={`text-left px-4 py-2.5 rounded-lg transition-all text-sm ${
                          selectedPriceRange === index
                            ? "bg-black text-white shadow-sm"
                            : "bg-[#F5F1E8] text-foreground/70 hover:bg-[#E5DCC8]"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <h3 className="text-sm font-medium mb-4 text-foreground/80">
                    Сортировка
                  </h3>
                  <div className="flex flex-col gap-2">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSortBy(option.value)}
                        className={`text-left px-4 py-2.5 rounded-lg transition-all text-sm ${
                          sortBy === option.value
                            ? "bg-black text-white shadow-sm"
                            : "bg-[#F5F1E8] text-foreground/70 hover:bg-[#E5DCC8]"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active filters */}
          {(selectedCategory !== "Все" || selectedPriceRange !== 0) && (
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="text-sm text-foreground/60">
                Активные фильтры:
              </span>
              {selectedCategory !== "Все" && (
                <button
                  onClick={() => setSelectedCategory("Все")}
                  className="px-3 py-1 bg-black text-white text-sm rounded-full hover:bg-black/80 transition-colors"
                >
                  {selectedCategory} ×
                </button>
              )}
              {selectedPriceRange !== 0 && (
                <button
                  onClick={() => setSelectedPriceRange(0)}
                  className="px-3 py-1 bg-black text-white text-sm rounded-full hover:bg.black/80 transition-colors"
                >
                  {priceRanges[selectedPriceRange].label} ×
                </button>
              )}
            </div>
          )}
        </section>

        {/* Products Grid */}
        <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-base sm:text-lg text-foreground/60">
                По выбранным фильтрам ничего не найдено
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory("Все");
                  setSelectedPriceRange(0);
                }}
                className="mt-6 rounded-full bg-black text-white hover:bg-black/90"
              >
                Сбросить фильтры
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product, index) => {
                const imgSrc = `/products/product${product.id}.jpg`; // LOCAL IMG
                return (
                  <div
                    key={product.id}
                    data-animate
                    data-index={index}
                    className={`transition-all duration-700 ${
                      visibleItems.has(index)
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: `${(index % 4) * 100}ms` }}
                  >
                    <Card className="group overflow-hidden border-[#E5DCC8] bg.white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
                      <div className="aspect-[4/3] overflow-hidden relative bg-[#F5F1E8]">
                        <Image
                          src={imgSrc}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                          priority={index < 4} // birinchi qatorni prioritet yuklaymiz
                        />
                        <div className="absolute top-3 right-3 bg-[#C17A3F] text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                          {product.category}
                        </div>
                      </div>
                      <div className="p-4 sm:p-6 flex flex-col flex-1">
                        <div className="text-xs text-[#C17A3F] font-semibold mb-2 uppercase tracking-wide">
                          {product.category}
                        </div>
                        <h3 className="text-base sm:text-lg font-light mb-2 text-balance leading-snug">
                          {product.name}
                        </h3>
                        <p className="text-sm text-foreground/60 mb-4 line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                        <div className="mt-auto">
                          <div className="text-base font-semibold mb-4 text-[#C17A3F]">
                            {product.priceText}
                          </div>
                          <Button
                            asChild
                            variant="outline"
                            className="w-full rounded-full border-black text-black hover:bg-black hover:text-white transition-all duration-300 group/btn bg-white shadow-sm hover:shadow-md"
                          >
                            <Link
                              href={`/products/${product.id}`}
                              className="flex items-center justify-center gap-2"
                            >
                              Подробнее
                              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
