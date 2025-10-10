"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, MapPin, Calendar, Award } from "lucide-react";

const projectData: Record<
  string,
  {
    id: number;
    name: string;
    location: string;
    year: string;
    category: string;
    client: string;
    area: string;
    duration: string;
    images: string[];
    description: string;
    challenge: string;
    solution: string;
    results: string[];
    products: { name: string; quantity: string }[];
  }
> = {
  "1": {
    id: 1,
    name: "Парк Дружбы Народов",
    location: "Ташкент, Узбекистан",
    year: "2024",
    category: "Парки",
    client: "Хокимият города Ташкента",
    area: "15 гектаров",
    duration: "8 месяцев",
    images: [
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1200&q=80",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
    ],
    description:
      "Комплексное благоустройство центрального парка с установкой современных фонтанов, удобных скамеек и малых архитектурных форм. Проект направлен на создание комфортного пространства для отдыха жителей всех возрастов.",
    challenge:
      "Необходимо было модернизировать устаревшую инфраструктуру парка, сохранив при этом его историческую ценность и зеленые насаждения. Требовалось создать современное пространство, которое бы органично вписалось в существующий ландшафт.",
    solution:
      "Мы разработали комплексное решение, включающее установку энергоэффективных фонтанов с LED-подсветкой, эргономичных скамеек из экологичных материалов и современных урн с раздельным сбором мусора. Все элементы были спроектированы с учетом климатических особенностей региона.",
    results: [
      "Увеличение посещаемости парка на 65%",
      "Создано 120 новых зон для отдыха",
      "Установлено 8 современных фонтанов",
      "Размещено более 200 единиц городской мебели",
      "Получена награда 'Лучший проект благоустройства 2024'",
    ],
    products: [
      { name: 'Фонтан "Каскад"', quantity: "3 шт" },
      { name: 'Фонтан "Минимал"', quantity: "5 шт" },
      { name: 'Скамейка "Модерн"', quantity: "85 шт" },
      { name: 'Скамейка "Парк"', quantity: "120 шт" },
      { name: 'Урна "Эко"', quantity: "150 шт" },
      { name: 'Вазон "Куб"', quantity: "200 шт" },
    ],
  },
  "2": {
    id: 2,
    name: "Площадь Независимости",
    location: "Самарканд, Узбекистан",
    year: "2023",
    category: "Площади",
    client: "Хокимият Самаркандской области",
    area: "8 гектаров",
    duration: "10 месяцев",
    images: [
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&q=80",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&q=80",
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1200&q=80",
    ],
    description:
      "Реконструкция главной площади города с установкой монументального фонтана и современной системы освещения. Проект стал символом обновления исторического центра Самарканда.",
    challenge:
      "Площадь является историческим центром города и местом проведения важных государственных мероприятий. Необходимо было создать современное пространство, не нарушая исторический облик города.",
    solution:
      "Разработан уникальный дизайн центрального фонтана, сочетающий традиционные узбекские орнаменты с современными технологиями. Установлена интеллектуальная система освещения и звукового сопровождения для проведения мероприятий.",
    results: [
      "Создан новый символ города",
      "Площадь стала центром культурных мероприятий",
      "Установлен крупнейший фонтан в регионе",
      "Реализована система динамического освещения",
      "Проект отмечен на международном конкурсе",
    ],
    products: [
      { name: 'Фонтан "Версаль" (кастомный)', quantity: "1 шт" },
      { name: 'Скамейка "Лофт"', quantity: "45 шт" },
      { name: 'Вазон "Цилиндр"', quantity: "80 шт" },
      { name: 'Урна "Модерн"', quantity: "60 шт" },
    ],
  },
  "3": {
    id: 3,
    name: "Бульвар Навои",
    location: "Бухара, Узбекистан",
    year: "2024",
    category: "Бульвары",
    client: "Хокимият города Бухары",
    area: "3.5 километра",
    duration: "6 месяцев",
    images: [
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1200&q=80",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80",
    ],
    description:
      "Создание современной пешеходной зоны с комфортной городской мебелью, элементами озеленения и зонами для отдыха. Бульвар стал любимым местом прогулок жителей и туристов.",
    challenge:
      "Необходимо было создать протяженную пешеходную зону в историческом центре города, обеспечив комфорт для пешеходов и сохранив аутентичность старого города.",
    solution:
      "Разработана концепция бульвара с чередованием активных и тихих зон, установлены скамейки различных типов для разных сценариев использования, создана система навесов для защиты от солнца.",
    results: [
      "Создано 3.5 км комфортной пешеходной зоны",
      "Установлено более 300 единиц городской мебели",
      "Высажено 500 деревьев и кустарников",
      "Посещаемость увеличилась на 80%",
      "Открыто 25 новых кафе и магазинов",
    ],
    products: [
      { name: 'Скамейка "Модерн"', quantity: "150 шт" },
      { name: 'Скамейка "Волна"', quantity: "50 шт" },
      { name: 'Урна "Эко"', quantity: "200 шт" },
      { name: 'Вазон "Прямоугольный"', quantity: "180 шт" },
      { name: 'Фонтан "Минимал"', quantity: "4 шт" },
    ],
  },
  "4": {
    id: 4,
    name: "Сквер Амира Темура",
    location: "Ташкент, Узбекистан",
    year: "2023",
    category: "Скверы",
    client: "Хокимият города Ташкента",
    area: "2 гектара",
    duration: "4 месяца",
    images: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80",
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
    ],
    description:
      "Благоустройство исторического сквера с сохранением культурного наследия и установкой современной инфраструктуры для комфортного отдыха.",
    challenge:
      "Сквер является памятником истории и культуры. Требовалось провести модернизацию, не нарушая исторический облик и сохранив все памятные элементы.",
    solution:
      "Разработан деликатный подход к благоустройству с использованием материалов и форм, гармонирующих с историческим контекстом. Все новые элементы дополняют, но не конкурируют с существующими памятниками.",
    results: [
      "Сохранены все исторические элементы",
      "Улучшена доступность для маломобильных граждан",
      "Создано 40 новых зон для отдыха",
      "Установлена современная система освещения",
      "Получена благодарность от общественных организаций",
    ],
    products: [
      { name: 'Скамейка "Парк"', quantity: "60 шт" },
      { name: 'Урна "Эко"', quantity: "40 шт" },
      { name: 'Вазон "Куб"', quantity: "80 шт" },
      { name: 'Фонтан "Классический"', quantity: "2 шт" },
    ],
  },
  "5": {
    id: 5,
    name: "Набережная Анхор",
    location: "Ташкент, Узбекистан",
    year: "2024",
    category: "Набережные",
    client: "Хокимият города Ташкента",
    area: "5 километров",
    duration: "12 месяцев",
    images: [
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1200&q=80",
    ],
    description:
      "Создание современной набережной с зонами отдыха, фонтанами, велодорожками и спортивными площадками. Проект превратил промышленную зону в любимое место отдыха горожан.",
    challenge:
      "Территория вдоль канала была заброшена и использовалась как промышленная зона. Необходимо было создать современное общественное пространство с нуля.",
    solution:
      "Разработана многофункциональная набережная с разделением на зоны: активного отдыха, тихого отдыха, спорта и детских развлечений. Установлены фонтаны, создающие комфортный микроклимат в жаркие дни.",
    results: [
      "Создано 5 км современной набережной",
      "Установлено 12 фонтанов различных типов",
      "Размещено более 400 единиц городской мебели",
      "Создано 8 спортивных и детских площадок",
      "Ежедневная посещаемость более 10 000 человек",
    ],
    products: [
      { name: 'Фонтан "Каскад"', quantity: "6 шт" },
      { name: 'Фонтан "Минимал"', quantity: "6 шт" },
      { name: 'Скамейка "Модерн"', quantity: "200 шт" },
      { name: 'Скамейка "Волна"', quantity: "80 шт" },
      { name: 'Урна "Модерн"', quantity: "250 шт" },
      { name: 'Вазон "Цилиндр"', quantity: "300 шт" },
    ],
  },
  "6": {
    id: 6,
    name: "Парк Алишера Навои",
    location: "Андижан, Узбекистан",
    year: "2023",
    category: "Парки",
    client: "Хокимият Андижанской области",
    area: "10 гектаров",
    duration: "7 месяцев",
    images: [
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=1200&q=80",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80",
    ],
    description:
      "Создание современного парка с детскими площадками, зонами для активного отдыха, фонтанами и комфортной инфраструктурой для всей семьи.",
    challenge:
      "На месте парка была пустующая территория без инфраструктуры. Необходимо было создать полноценный парк с нуля, учитывая потребности всех возрастных групп.",
    solution:
      "Разработана концепция семейного парка с четким зонированием: детские площадки, зоны для молодежи, тихие зоны для пожилых людей, спортивные площадки. Установлены фонтаны и создана система искусственных водоемов.",
    results: [
      "Создан парк площадью 10 гектаров",
      "Установлено 5 детских площадок",
      "Размещено 6 фонтанов",
      "Установлено более 250 единиц городской мебели",
      "Парк стал центром семейного отдыха города",
    ],
    products: [
      { name: 'Фонтан "Версаль"', quantity: "2 шт" },
      { name: 'Фонтан "Каскад"', quantity: "4 шт" },
      { name: 'Скамейка "Парк"', quantity: "180 шт" },
      { name: 'Скамейка "Модерн"', quantity: "70 шт" },
      { name: 'Урна "Эко"', quantity: "200 шт" },
      { name: 'Вазон "Куб"', quantity: "250 шт" },
    ],
  },
};

export default function ProjectDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const project = projectData[params.id] || projectData["1"];
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set()
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-section");
            if (id) {
              setVisibleSections((prev) => new Set([...prev, id]));
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const elements = document.querySelectorAll("[data-section]");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <div className="pt-[72px]">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <Button
            asChild
            variant="ghost"
            className="gap-2 text-foreground/70 hover:text-foreground"
          >
            <Link href="/projects">
              <ArrowLeft className="w-4 h-4" />
              Назад к проектам
            </Link>
          </Button>
        </div>

        {/* Hero Image */}
        <section
          data-section="hero"
          className={`container mx-auto px-4 sm:px-6 pb-8 sm:pb-12 transition-all duration-1000 ${
            visibleSections.has("hero")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {/* CHANGED: responsiv aspect for mobile/desktop */}
          <div className="aspect-[16/9] lg:aspect-[21/9] rounded-3xl overflow-hidden bg-white shadow-2xl">
            <img
              src={project.images[0] || "/placeholder.svg"}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Project Info */}
        <section className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
          <div className="grid lg:grid-cols-3 gap-8 sm:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8 sm:space-y-12">
              {/* Title & Description */}
              <div
                data-section="title"
                className={`transition-all duration-1000 delay-100 ${
                  visibleSections.has("title")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="inline-block px-4 py-1.5 bg-[#C17A3F]/10 text-[#C17A3F] rounded-full text-xs font-semibold tracking-wide mb-4 uppercase">
                  {project.category}
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight mb-6 text-balance">
                  {project.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-foreground/60 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#C17A3F]" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C17A3F]" />
                    <span>{project.year}</span>
                  </div>
                </div>
                <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Challenge */}
              <Card
                data-section="challenge"
                className={`p-6 sm:p-8 bg-white border-[#E5DCC8] shadow-sm transition-all duration-1000 delay-200 ${
                  visibleSections.has("challenge")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <h2 className="text-xl sm:text-2xl font-light mb-4 flex items-center gap-3">
                  <span className="text-[#C17A3F]">Задача</span>
                </h2>
                <p className="text-base text-foreground/70 leading-relaxed">
                  {project.challenge}
                </p>
              </Card>

              {/* Solution */}
              <Card
                data-section="solution"
                className={`p-6 sm:p-8 bg-white border-[#E5DCC8] shadow-sm transition-all duration-1000 delay-300 ${
                  visibleSections.has("solution")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <h2 className="text-xl sm:text-2xl font-light mb-4 flex items-center gap-3">
                  <span className="text-[#C17A3F]">Решение</span>
                </h2>
                <p className="text-base text-foreground/70 leading-relaxed">
                  {project.solution}
                </p>
              </Card>

              {/* Gallery */}
              <div
                data-section="gallery"
                className={`transition-all duration-1000 delay-400 ${
                  visibleSections.has("gallery")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <h2 className="text-xl sm:text-2xl font-light mb-6">
                  Фотогалерея
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {project.images.slice(1).map((image, index) => (
                    <div
                      key={index}
                      className="aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${project.name} - фото ${index + 2}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Results */}
              <Card
                data-section="results"
                className={`p-6 sm:p-8 bg-white border-[#E5DCC8] shadow-sm transition-all duration-1000 delay-500 ${
                  visibleSections.has("results")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <h2 className="text-xl sm:text-2xl font-light mb-6 flex items-center gap-3">
                  <Award className="w-6 h-6 text-[#C17A3F]" />
                  <span>Результаты</span>
                </h2>
                <ul className="space-y-3">
                  {project.results.map((result, index) => (
                    <li key={index} className="flex gap-3 items-start">
                      <span className="text-[#C17A3F] font-bold mt-1">•</span>
                      <span className="text-base text-foreground/80 leading-relaxed">
                        {result}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Sidebar — CHANGED: butun ustunni sticky + ichida scroll, overlap yo‘q */}
            <div
              className="
                space-y-6
                lg:sticky lg:top-24
                lg:max-h-[calc(100vh-6rem)]
                lg:overflow-auto lg:pr-1
                [--sb:theme(colors.#E5DCC8)]
              "
            >
              {/* Project Details */}
              <Card
                data-section="details"
                className={`p-6 bg-white border-[#E5DCC8] shadow-sm transition-all duration-1000 delay-600 ${
                  visibleSections.has("details")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <h3 className="text-lg font-light mb-4">Детали проекта</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-foreground/60 mb-1">
                      Заказчик
                    </div>
                    <div className="text-sm font-medium">{project.client}</div>
                  </div>
                  <div>
                    <div className="text-xs text-foreground/60 mb-1">
                      Площадь
                    </div>
                    <div className="text-sm font-medium">{project.area}</div>
                  </div>
                  <div>
                    <div className="text-xs text-foreground/60 mb-1">
                      Срок реализации
                    </div>
                    <div className="text-sm font-medium">
                      {project.duration}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-foreground/60 mb-1">
                      Год завершения
                    </div>
                    <div className="text-sm font-medium">{project.year}</div>
                  </div>
                </div>
              </Card>

              {/* Products Used */}
              <Card
                data-section="products"
                className={`p-6 bg-white border-[#E5DCC8] shadow-sm transition-all duration-1000 delay-700 ${
                  visibleSections.has("products")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <h3 className="text-lg font-light mb-4">
                  Использованная продукция
                </h3>
                <div className="space-y-3">
                  {project.products.map((product, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start gap-3 text-sm"
                    >
                      <span className="text-foreground/80">{product.name}</span>
                      <span className="text-[#C17A3F] font-medium whitespace-nowrap">
                        {product.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* CTA */}
              <Card
                data-section="cta"
                className={`p-6 bg-black text-white border-black shadow-lg transition-all duration-1000 delay-800 ${
                  visibleSections.has("cta")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <h3 className="text-lg font-light mb-3">
                  Заинтересованы в сотрудничестве?
                </h3>
                <p className="text-sm text-white/80 mb-4 leading-relaxed">
                  Свяжитесь с нами для обсуждения вашего проекта
                </p>
                <Button
                  asChild
                  className="w-full bg-white text-black hover:bg-white/90 rounded-full shadow-md"
                >
                  <Link href="/contact">Связаться с нами</Link>
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
