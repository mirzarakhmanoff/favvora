"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Парк Дружбы Народов",
    location: "Ташкент, Узбекистан",
    year: "2024",
    category: "Парки",
    image:
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80",
    description:
      "Комплексное благоустройство центрального парка с установкой фонтанов, скамеек и малых архитектурных форм",
  },
  {
    id: 2,
    name: "Площадь Независимости",
    location: "Самарканд, Узбекистан",
    year: "2023",
    category: "Площади",
    image:
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80",
    description:
      "Реконструкция главной площади города с установкой монументального фонтана и системы освещения",
  },
  {
    id: 3,
    name: "Бульвар Навои",
    location: "Бухара, Узбекистан",
    year: "2024",
    category: "Бульвары",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    description:
      "Создание пешеходной зоны с современной городской мебелью и элементами озеленения",
  },
  {
    id: 4,
    name: "Сквер Амира Темура",
    location: "Ташкент, Узбекистан",
    year: "2023",
    category: "Скверы",
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
    description:
      "Благоустройство исторического сквера с сохранением культурного наследия",
  },
  {
    id: 5,
    name: "Набережная Анхор",
    location: "Ташкент, Узбекистан",
    year: "2024",
    category: "Набережные",
    image:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    description:
      "Современная набережная с зонами отдыха, фонтанами и велодорожками",
  },
  {
    id: 6,
    name: "Парк Алишера Навои",
    location: "Андижан, Узбекистан",
    year: "2023",
    category: "Парки",
    image:
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&q=80",
    description:
      "Создание современного парка с детскими площадками и зонами для активного отдыха",
  },
];

const categories = [
  "Все",
  "Парки",
  "Площади",
  "Бульвары",
  "Скверы",
  "Набережные",
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Все");
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
    elements.forEach((el) => {
      observerRef.current?.observe(el);
    });
  }, [selectedCategory]);

  const filteredProjects = projects.filter(
    (project) =>
      selectedCategory === "Все" || project.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <div className="pt-[72px]">
        {/* Page Header */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight mb-6">
              Наши <span className="italic text-[#C17A3F]">проекты</span>
            </h1>
            <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
              Реализованные проекты по благоустройству городских пространств в
              Узбекистане. Каждый проект — это уникальное решение, созданное с
              учетом особенностей местности и потребностей жителей.
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="container mx-auto px-4 sm:px-6 pb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleItems(new Set());
                }}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-black text-white shadow-md"
                    : "bg-white text-foreground/70 hover:bg-[#E5DCC8] border border-[#E5DCC8]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                data-animate
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.has(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${(index % 3) * 100}ms` }}
              >
                <Card className="group overflow-hidden border-[#E5DCC8] bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                  <div className="aspect-[4/3] overflow-hidden relative bg-[#F5F1E8]">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 right-4 bg-[#C17A3F] text-white text-xs px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-lg">
                      {project.category}
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-foreground/60 mb-3">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C17A3F]" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C17A3F]" />
                        <span>{project.year}</span>
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-light mb-3 text-balance leading-snug group-hover:text-[#C17A3F] transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="text-sm text-foreground/60 mb-5 line-clamp-2 leading-relaxed flex-1">
                      {project.description}
                    </p>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-full border-black text-black hover:bg-black hover:text-white transition-all duration-300 group/btn bg-white shadow-sm hover:shadow-md"
                    >
                      <Link
                        href={`/projects/${project.id}`}
                        className="flex items-center justify-center gap-2"
                      >
                        Подробнее
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
