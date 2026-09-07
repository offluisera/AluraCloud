import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import GSAPAnimations from "@/components/GSAPAnimations";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Segments from "@/sections/Segments";
import Portfolio from "@/sections/Portfolio";
import Contact from "@/sections/Contact";

/**
 * Alura Cloud — V2 Page Structure
 *
 * 01  HERO            → Headline + shapes + CTA
 * 02  SERVIÇOS        → Visual concept 5 columns
 * 03  SEGMENTOS       → Expertise comprovada (prova por segmento)
 * 04  PORTFÓLIO       → Horizontal gallery with Plasma bg
 * 05  CTA / CONTATO   → "TEM UMA IDEIA? VAMOS CONSTRUIR."
 * 06  FOOTER          → Marca + links + status
 */
export default function Home() {
  return (
    <>
      <Nav />
      <GSAPAnimations />
      <main>
        <Hero />
        <div style={{ backgroundColor: "var(--bg-deep)", position: "relative", zIndex: 1 }}>
          <Services />
          <Segments />
          <Portfolio />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
