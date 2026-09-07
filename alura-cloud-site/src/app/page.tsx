import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import GSAPAnimations from "@/components/GSAPAnimations";
import BlueprintGrid from "@/components/global-env/BlueprintGrid";
import MouseSpotlight from "@/components/ui/MouseSpotlight";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Segments from "@/sections/Segments";
import Portfolio from "@/sections/Portfolio";
import Contact from "@/sections/Contact";

/**
 * Alura Cloud — V2 Page Structure
 * High-precision engineering & product design
 *
 * 01  ATMOSPHERE      → BlueprintGrid + MouseSpotlight
 * 02  HERO            → 2-Column Asymmetric layout + CloudConsoleHero
 * 03  SERVIÇOS        → 3D Tilt Mockups + Telemetria de engenharia
 * 04  SEGMENTOS       → 3D Parallax Tilt Cards + Badges por vertical
 * 05  PORTFÓLIO       → Horizontal gallery with Plasma bg
 * 06  CTA / CONTATO   → Wireframe 3D Geometric "A" + Glow
 * 07  FOOTER          → Marca + links + status
 */
export default function Home() {
  return (
    <>
      <BlueprintGrid />
      <MouseSpotlight />
      <Nav />
      <GSAPAnimations />
      <main style={{ position: "relative", zIndex: 2 }}>
        <Hero />
        <div style={{ position: "relative", zIndex: 1 }}>
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
