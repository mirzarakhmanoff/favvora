"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Send,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <div className="pt-[72px]">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light leading-tight mb-6 animate-fade-in">
              Свяжитесь <span className="italic text-[#C17A3F]">с нами</span>
            </h1>
            <p className="text-base sm:text-lg text-foreground/70 leading-relaxed animate-fade-in-delay-1">
              Готовы обсудить ваш проект? Посетите наш шоурум или напишите нам,
              и мы свяжемся с вами в ближайшее время.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 pb-12">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map */}
            <Card className="overflow-hidden border-[#E5DCC8] shadow-lg animate-fade-in-delay-2">
              <div className="aspect-[4/3] bg-gradient-to-br from-[#E5DCC8] to-[#F5F1E8] relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.3872!2d69.2401!3d41.3111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzQwLjAiTiA2OcKwMTQnMjQuNCJF!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </Card>

            {/* Showroom Info */}
            <div className="space-y-6 animate-fade-in-delay-3">
              <div>
                <h2 className="text-3xl font-light mb-4">
                  Наш <span className="italic text-[#C17A3F]">шоурум</span>
                </h2>
                <p className="text-foreground/70 leading-relaxed">
                  Приглашаем вас посетить наш шоурум, где вы сможете увидеть всю
                  продукцию вживую, оценить качество материалов и получить
                  профессиональную консультацию.
                </p>
              </div>

              <Card className="p-6 bg-white border-[#E5DCC8] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#C17A3F]/10 rounded-full flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#C17A3F]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-lg">Адрес шоурума</h3>
                    <p className="text-foreground/70 leading-relaxed">
                      г. Ташкент, Мирабадский район
                      <br />
                      ул. Нукус, 25А
                      <br />
                      (рядом с метро Алишер Навои)
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border-[#E5DCC8] shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#C17A3F]/10 rounded-full flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#C17A3F]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-lg">Часы работы</h3>
                    <div className="space-y-1 text-foreground/70">
                      <p>Понедельник - Пятница: 9:00 - 19:00</p>
                      <p>Суббота: 10:00 - 16:00</p>
                      <p className="text-[#C17A3F] font-medium">
                        Воскресенье: Выходной
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section
          ref={sectionRef}
          className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20"
        >
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <Card
              className={`p-6 sm:p-8 bg-white border-[#E5DCC8] shadow-lg transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-2xl sm:text-3xl font-light mb-6">
                Отправить{" "}
                <span className="italic text-[#C17A3F]">сообщение</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Имя *
                  </label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="rounded-lg border-[#E5DCC8] focus:border-[#C17A3F] focus:ring-[#C17A3F]"
                    placeholder="Ваше имя"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2"
                  >
                    Телефон
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="rounded-lg border-[#E5DCC8] focus:border-[#C17A3F] focus:ring-[#C17A3F]"
                    placeholder="+998 90 123 45 67"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Сообщение *
                  </label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="rounded-lg border-[#E5DCC8] focus:border-[#C17A3F] focus:ring-[#C17A3F]"
                    placeholder="Расскажите о вашем проекте..."
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-black text-white hover:bg-black/90 rounded-full py-6 text-base flex items-center justify-center gap-2 group"
                >
                  Отправить сообщение
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </Card>

            {/* Contact Info */}
            <div
              className={`space-y-6 transition-all duration-700 delay-150 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                <h2 className="text-2xl sm:text-3xl font-light mb-4">
                  Контактная{" "}
                  <span className="italic text-[#C17A3F]">информация</span>
                </h2>
                <p className="text-foreground/70 leading-relaxed">
                  Мы всегда рады ответить на ваши вопросы и помочь с выбором
                  продукции для вашего проекта.
                </p>
              </div>

              <Card className="p-6 bg-white border-[#E5DCC8] shadow-sm hover:shadow-md transition-all hover:border-[#C17A3F]/30">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#C17A3F]/10 rounded-full flex-shrink-0">
                    <Phone className="w-5 h-5 text-[#C17A3F]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Телефон</h3>
                    <a
                      href="tel:+998712345678"
                      className="text-foreground/70 hover:text-[#C17A3F] transition-colors"
                    >
                      +998 71 234 56 78
                    </a>
                    <br />
                    <a
                      href="tel:+998901234567"
                      className="text-foreground/70 hover:text-[#C17A3F] transition-colors"
                    >
                      +998 90 123 45 67
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border-[#E5DCC8] shadow-sm hover:shadow-md transition-all hover:border-[#C17A3F]/30">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#C17A3F]/10 rounded-full flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#C17A3F]" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Email</h3>
                    <a
                      href="mailto:info@favvora.uz"
                      className="text-foreground/70 hover:text-[#C17A3F] transition-colors"
                    >
                      info@favvora.uz
                    </a>
                    <br />
                    <a
                      href="mailto:sales@favvora.uz"
                      className="text-foreground/70 hover:text-[#C17A3F] transition-colors"
                    >
                      sales@favvora.uz
                    </a>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white border-[#E5DCC8] shadow-sm hover:shadow-md transition-all hover:border-[#C17A3F]/30">
                <h3 className="font-medium mb-4">Мы в социальных сетях</h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/favvora.uz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#C17A3F]/10 rounded-full hover:bg-[#C17A3F] hover:text-white transition-all group"
                  >
                    <Instagram className="w-5 h-5 text-[#C17A3F] group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://facebook.com/favvora.uz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#C17A3F]/10 rounded-full hover:bg-[#C17A3F] hover:text-white transition-all group"
                  >
                    <Facebook className="w-5 h-5 text-[#C17A3F] group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://t.me/favvora_uz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#C17A3F]/10 rounded-full hover:bg-[#C17A3F] hover:text-white transition-all group"
                  >
                    <Send className="w-5 h-5 text-[#C17A3F] group-hover:text-white transition-colors" />
                  </a>
                </div>
                <p className="text-sm text-foreground/60 mt-4">
                  Следите за нашими новостями и проектами в социальных сетях
                </p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-[#C17A3F]/5 to-[#C17A3F]/10 border-[#C17A3F]/20 shadow-sm">
                <h3 className="font-medium mb-2 text-lg">
                  Нужна консультация?
                </h3>
                <p className="text-sm text-foreground/70 mb-4">
                  Наши специалисты помогут подобрать оптимальное решение для
                  вашего проекта
                </p>
                <Button className="w-full bg-[#C17A3F] text-white hover:bg-[#C17A3F]/90 rounded-full">
                  Записаться на консультацию
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
