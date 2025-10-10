// components/consult-modal.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  trigger?: React.ReactNode;
  productName?: string;
};

export default function ConsultModal({ trigger, productName }: Props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // O'zbek raqam formati (+998 XX XXX-XX-XX) — engil formatlash
  const formatUzPhone = (val: string) => {
    // Raqamlarnigina qoldiramiz
    const digits = val.replace(/\D/g, "");
    // +998 ni boshi qilib qo'yamiz (agar foydalanuvchi kiritmagan bo'lsa ham)
    let out = digits.startsWith("998")
      ? digits
      : digits.startsWith("8")
      ? "998" + digits.slice(1)
      : digits;
    if (!out.startsWith("998")) out = "998" + out;

    // 12 ta raqamdan ortiq bo'lmasin (998 + 9 ta)
    out = out.slice(0, 12);

    const p1 = out.slice(0, 3); // 998
    const p2 = out.slice(3, 5); // XX
    const p3 = out.slice(5, 8); // XXX
    const p4 = out.slice(8, 10); // XX
    const p5 = out.slice(10, 12); // XX

    let formatted = "+";
    if (p1) formatted += p1;
    if (p2) formatted += ` (${p2})`;
    if (p3) formatted += ` ${p3}`;
    if (p4) formatted += `-${p4}`;
    if (p5) formatted += `-${p5}`;
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatUzPhone(e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // oddiy tekshiruv
    const rawDigits = phone.replace(/\D/g, "");
    if (name.trim().length < 2) return setError("Введите имя.");
    if (rawDigits.length !== 12)
      return setError("Введите корректный номер телефона (+998 …).");

    setLoading(true);
    try {
      // Backend bor bo'lsa shu endpointni qildirib qo'y:
      // app/api/consultations/route.ts (quyida berilgan)
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          product: productName ?? null,
          source: "consult-modal",
          createdAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setDone(true);
      setName("");
      setPhone("+998 ");
      setTimeout(() => {
        setOpen(false);
        setDone(false);
      }, 1400);
    } catch (err) {
      // Agar API hali yo'q bo'lsa — emailga yuborish uchun mailto fallback
      setError("Не удалось отправить. Попробуйте позже.");
      // window.location.href = `mailto:info@site.uz?subject=Заявка%20на%20консультацию&body=Имя:%20${encodeURIComponent(name)}%0AТелефон:%20${encodeURIComponent(phone)}%0AТовар:%20${encodeURIComponent(productName ?? "")}`;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="bg-black text-white hover:bg-black/90 rounded-full px-8 shadow-md hover:shadow-lg transition-all">
            Запросить консультацию
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md border-[#E5DCC8] bg-[#F5F1E8]/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="font-light text-2xl">
            Запросить консультацию
          </DialogTitle>
          <DialogDescription className="text-foreground/70">
            Оставьте контакты — мы свяжемся и ответим на все вопросы.
          </DialogDescription>
        </DialogHeader>

        {productName && (
          <div className="text-sm mb-2 bg-[#C17A3F]/10 text-[#C17A3F] inline-flex px-3 py-1 rounded-full">
            {productName}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Имя</Label>
            <Input
              id="name"
              placeholder="Ваше имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-white"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              placeholder="+998 (__) ___-__-__"
              inputMode="tel"
              value={phone || "+998 "}
              onChange={handlePhoneChange}
              required
              className="bg-white"
            />
            <p className="text-xs text-foreground/60">
              Мы перезвоним в рабочее время.
            </p>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex items-center gap-3 pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="rounded-full bg-black text-white hover:bg-black/90 px-6"
            >
              {loading ? "Отправка…" : done ? "Отправлено ✓" : "Отправить"}
            </Button>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-black"
              >
                Отмена
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
