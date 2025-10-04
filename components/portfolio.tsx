"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const portfolioItems = [
  {
    id: 1,
    image: "/urban-park-fountain-installation-architectural.jpg",
    title: 'Парк "Центральный"',
    location: "Ташкент",
    year: "2024",
  },
  {
    id: 2,
    image: "/modern-urban-bench-installation-city-square.jpg",
    title: "Городская площадь",
    location: "Самарканд",
    year: "2023",
  },
  {
    id: 3,
    image: "/decorative-planter-urban-landscape-design.jpg",
    title: 'Бульвар "Навои"',
    location: "Бухара",
    year: "2024",
  },
  {
    id: 4,
    image: "/architectural-fountain-night-lighting-urban.jpg",
    title: 'Площадь "Регистан"',
    location: "Самарканд",
    year: "2023",
  },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-32 px-8 md:px-16 bg-background">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-20">
          <div>
            <div className="inline-block px-4 py-2 bg-accent/10 text-accent text-xs tracking-[0.2em] uppercase font-medium rounded-full mb-6">
              Портфолио
            </div>
            <h2 className="text-5xl md:text-6xl font-light tracking-tight leading-tight">
              Реализованные
              <br />
              <span className="italic text-accent">проекты</span>
            </h2>
          </div>
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:border-foreground hover:bg-foreground hover:text-background rounded-full px-8 h-14 font-light bg-transparent"
          >
            Все проекты
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* First item - spans 7 columns */}
          <div className="lg:col-span-7 group relative aspect-[16/11] overflow-hidden rounded-sm cursor-pointer">
            <img
              src={portfolioItems[0].image || "/placeholder.svg"}
              alt={portfolioItems[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="text-xs text-accent mb-2 tracking-wider uppercase font-light">
                {portfolioItems[0].year}
              </div>
              <h3 className="text-3xl font-light tracking-tight mb-2 text-background">{portfolioItems[0].title}</h3>
              <p className="text-background/80 text-sm font-light">{portfolioItems[0].location}</p>
            </div>
          </div>

          {/* Second item - spans 5 columns */}
          <div className="lg:col-span-5 group relative aspect-[16/11] overflow-hidden rounded-sm cursor-pointer">
            <img
              src={portfolioItems[1].image || "/placeholder.svg"}
              alt={portfolioItems[1].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="text-xs text-accent mb-2 tracking-wider uppercase font-light">
                {portfolioItems[1].year}
              </div>
              <h3 className="text-2xl font-light tracking-tight mb-2 text-background">{portfolioItems[1].title}</h3>
              <p className="text-background/80 text-sm font-light">{portfolioItems[1].location}</p>
            </div>
          </div>

          {/* Third item - spans 5 columns */}
          <div className="lg:col-span-5 group relative aspect-[16/11] overflow-hidden rounded-sm cursor-pointer">
            <img
              src={portfolioItems[2].image || "/placeholder.svg"}
              alt={portfolioItems[2].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="text-xs text-accent mb-2 tracking-wider uppercase font-light">
                {portfolioItems[2].year}
              </div>
              <h3 className="text-2xl font-light tracking-tight mb-2 text-background">{portfolioItems[2].title}</h3>
              <p className="text-background/80 text-sm font-light">{portfolioItems[2].location}</p>
            </div>
          </div>

          {/* Fourth item - spans 7 columns */}
          <div className="lg:col-span-7 group relative aspect-[16/11] overflow-hidden rounded-sm cursor-pointer">
            <img
              src={portfolioItems[3].image || "/placeholder.svg"}
              alt={portfolioItems[3].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="text-xs text-accent mb-2 tracking-wider uppercase font-light">
                {portfolioItems[3].year}
              </div>
              <h3 className="text-3xl font-light tracking-tight mb-2 text-background">{portfolioItems[3].title}</h3>
              <p className="text-background/80 text-sm font-light">{portfolioItems[3].location}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
