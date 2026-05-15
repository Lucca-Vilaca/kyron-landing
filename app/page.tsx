import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Prova } from "@/components/sections/Prova";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { Diferenciais } from "@/components/sections/Diferenciais";
import { Taglines } from "@/components/sections/Taglines";
import { Faq } from "@/components/sections/Faq";
import { Cta } from "@/components/sections/Cta";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Prova />
        <ComoFunciona />
        <Diferenciais />
        <Taglines />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
