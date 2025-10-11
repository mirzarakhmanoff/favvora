import { Facebook, Instagram, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold tracking-tight mb-4">
              Favora.UZ
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Современные формы городской архитектуры. Проектирование и
              производство городской мебели и архитектурных элементов.
            </p>
            <div className="flex gap-4">
              <a
                href="https://t.me/Favora"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Send className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/Favora"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com/Favora"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Навигация</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#about"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  О компании
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Продукция
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Портфолио
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Контакты</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>г. Ташкент, Узбекистан</li>
              <li>
                <a
                  href="tel:+998973434431"
                  className="hover:text-accent transition-colors"
                >
                  +998973434431
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@Favora.uz"
                  className="hover:text-accent transition-colors"
                >
                  info@Favora.uz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Favora.UZ. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
