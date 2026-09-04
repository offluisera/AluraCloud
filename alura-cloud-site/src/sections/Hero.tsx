"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Button from "@/components/ui/Button";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

/**
 * Hero Section — V2
 * Asymmetric layout: content left (55%), shapes right (45%)
 * Headline: "ENGENHARIA DIGITAL PARA IDEIAS REAIS."
 * CTA: outline button with arrow
 * Meta bar at bottom with service categories
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.5,
      });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.5"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCTA = () => {
    const el = document.querySelector("#contato");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="inicio" ref={sectionRef} className="hero" style={{ minHeight: "100svh" }}>


      {/* Content */}
      <div className="container hero-inner" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", minHeight: "100svh" }}>
        {/* CENTERED — Text content */}
        <div className="hero-content" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", maxWidth: "900px", margin: "0 auto", paddingRight: 0 }}>
          
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="hero-eyebrow" style={{ opacity: 0, justifyContent: "center", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "0.75rem", marginBottom: "2rem", color: "var(--text-mute)", fontWeight: 600 }}>
            ALURA CLOUD • ESTÚDIO DE ENGENHARIA DIGITAL
          </div>

          {/* Headline */}
          <h1 ref={headlineRef} className="hero-headline" style={{ opacity: 0, fontSize: "clamp(3rem, 6vw, 5.5rem)", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
            Onde a sua ambição<br />encontra execução.
          </h1>

          {/* Sub */}
          <p ref={subRef} className="hero-sub" style={{ opacity: 0, fontSize: "clamp(1.125rem, 1.5vw, 1.25rem)", maxWidth: "700px", marginBottom: "3rem", color: "var(--text-body)" }}>
            Projetamos, desenvolvemos e estruturamos soluções digitais completas para transformar ideias em produtos de verdade, com excelência técnica e performance.
          </p>

          {/* CTA Group */}
          <div ref={ctaRef} className="hero-cta" style={{ opacity: 0, display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center", alignSelf: "center" }}>
            <Button
              label="Explore um pouco"
              onClick={() => {
                const next = document.querySelector("#manifesto");
                if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />
            <button 
              onClick={handleCTA}
              style={{
                background: "transparent",
                color: "var(--text-main)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                padding: "1rem 2rem",
                borderRadius: "50px",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Fale conosco
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="hero-scroll"
        onClick={() => {
          const next = document.querySelector("#manifesto");
          if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        aria-label="Rolar para baixo"
      >
        <span className="hero-scroll-text">Scroll</span>
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
          <line
            x1="6" y1="0" x2="6" y2="16"
            stroke="var(--text-mute)"
            strokeWidth="1"
          />
          <polyline
            points="2,13 6,17 10,13"
            stroke="var(--text-mute)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </button>
    </section>
  );
}
