import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import GSAPAnimations from "@/components/GSAPAnimations";
import Hero from "@/sections/Hero";
import Manifesto from "@/sections/Manifesto";
import Services from "@/sections/Services";
import Segments from "@/sections/Segments";
import Portfolio from "@/sections/Portfolio";
import Contact from "@/sections/Contact";

/**
 * Alura Cloud — V2 Page Structure
 *
 * 01  HERO            → Headline + shapes + CTA
 * 02  MANIFESTO       → Editorial text
 * 03  SERVIÇOS        → Visual concept 5 columns
 * 04  SEGMENTOS       → Expertise comprovada (prova por segmento)
 * 05  PORTFÓLIO       → Horizontal gallery with Plasma bg
 * 06  CTA / CONTATO   → "TEM UMA IDEIA? VAMOS CONSTRUIR."
 * 07  FOOTER          → Marca + links + status
 */
export default function Home() {
  return (
    <>
      <Nav />
      <GSAPAnimations />
      <main>
        <Hero />
        <div style={{ backgroundColor: "var(--bg-deep)", position: "relative", zIndex: 1 }}>
          <Manifesto />
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
