"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section
      id="contact"
      className="relative py-32 px-6 md:px-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-white to-stone-50/50" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-amber-100/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-stone-100/30 to-transparent blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24 items-start">
          {/* Left side - Contact info */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <div className="inline-block px-4 py-1.5 bg-amber-100/60 rounded-full mb-8">
                <span className="text-xs tracking-[0.25em] text-amber-900 uppercase font-medium">
                  Контакты
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-8 text-stone-900 leading-[0.95]">
                Давайте
                <br />
                <span className="text-amber-700">создадим</span>
                <br />
                вместе
              </h2>
              <p className="text-lg text-stone-600 leading-relaxed max-w-md">
                Готовы обсудить ваш проект? Мы создаём уникальные архитектурные
                решения для городской среды.
              </p>
            </div>

            {/* Contact details */}
            <div className="space-y-8 pt-8 border-t border-stone-200">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-amber-100/60 rounded-xl group-hover:bg-amber-200/60 transition-colors">
                  <Mail className="w-5 h-5 text-amber-900" />
                </div>
                <div>
                  <div className="text-sm text-stone-500 mb-1">Email</div>
                  <a
                    href="mailto:info@favvora.uz"
                    className="text-stone-900 hover:text-amber-700 transition-colors"
                  >
                    info@favvora.uz
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-amber-100/60 rounded-xl group-hover:bg-amber-200/60 transition-colors">
                  <Phone className="w-5 h-5 text-amber-900" />
                </div>
                <div>
                  <div className="text-sm text-stone-500 mb-1">Телефон</div>
                  <a
                    href="tel:+998901234567"
                    className="text-stone-900 hover:text-amber-700 transition-colors"
                  >
                    +998 90 123 45 67
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-amber-100/60 rounded-xl group-hover:bg-amber-200/60 transition-colors">
                  <MapPin className="w-5 h-5 text-amber-900" />
                </div>
                <div>
                  <div className="text-sm text-stone-500 mb-1">Адрес</div>
                  <p className="text-stone-900">Ташкент, Узбекистан</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl shadow-stone-200/50 border border-stone-100">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-stone-700 tracking-wide"
                    >
                      Ваше имя *
                    </label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="h-14 bg-stone-50/50 border-stone-200 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl text-stone-900 placeholder:text-stone-400"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div className="space-y-3">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-stone-700 tracking-wide"
                    >
                      Email *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-14 bg-stone-50/50 border-stone-200 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl text-stone-900 placeholder:text-stone-400"
                      placeholder="ivan@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-stone-700 tracking-wide"
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
                    className="h-14 bg-stone-50/50 border-stone-200 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl text-stone-900 placeholder:text-stone-400"
                    placeholder="+998 XX XXX XX XX"
                  />
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-stone-700 tracking-wide"
                  >
                    Сообщение *
                  </label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="min-h-[180px] bg-stone-50/50 border-stone-200 focus:border-amber-500 focus:ring-amber-500/20 rounded-xl text-stone-900 placeholder:text-stone-400 resize-none"
                    placeholder="Расскажите о вашем проекте..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14  text-white rounded-xl  text-base font-medium tracking-wide shadow-lg shadow-amber-600/25 hover:shadow-xl hover:shadow-amber-600/30 transition-all duration-300"
                >
                  Отправить сообщение
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
