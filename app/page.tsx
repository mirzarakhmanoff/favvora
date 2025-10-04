import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Products } from "@/components/products";
import { Portfolio } from "@/components/portfolio";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { FloatingCallButton } from "@/components/floating-call-button";
import SiteNav from "@/components/header";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <SiteNav /> */}
      <Hero />
      <About />
      <Products />
      <Portfolio />
      <ContactForm />
      <Footer />
      <FloatingCallButton />
    </main>
  );
}
