"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Button from "@/components/ui/Button";
import DigitalCore from "@/components/digital-core/DigitalCore";
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
    <section id="inicio" ref={sectionRef} className="hero">


      {/* Content */}
      <div className="container hero-inner">
        {/* LEFT — Text content */}
        <div className="hero-content">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="hero-eyebrow" style={{ opacity: 0 }}>
            <SectionEyebrow index={1} label="Estúdio de Engenharia Digital" />
          </div>

          {/* Headline */}
          <h1 ref={headlineRef} className="hero-headline" style={{ opacity: 0 }}>
            Engenharia<br />
            Digital Para<br />
            <span className="hero-headline-accent">Ideias Reais.</span>
          </h1>

          {/* Sub */}
          <p ref={subRef} className="hero-sub" style={{ opacity: 0 }}>
            Projetamos, desenvolvemos e estruturamos soluções digitais
            completas para transformar ideias em produtos de verdade.
          </p>

          {/* CTA */}
          <div ref={ctaRef} className="hero-cta" style={{ opacity: 0 }}>
            <Button
              label="Falar com a Alura Cloud"
              onClick={handleCTA}
            />
          </div>
        </div>

        {/* RIGHT — Shape system */}
        <div className="hero-shapes" aria-hidden="true" style={{ right: 0 }}>
          <DigitalCore />
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
