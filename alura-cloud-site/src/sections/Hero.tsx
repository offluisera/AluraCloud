"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Button from "@/components/ui/Button";
import DigitalCore from "@/components/digital-core/DigitalCore";

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
      {/* Background grid pattern */}
      <div className="hero-grid" aria-hidden="true">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", inset: 0 }}
        >
          <defs>
            <pattern
              id="hero-bg-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <line x1="60" y1="0" x2="60" y2="60" stroke="var(--shape-grid)" strokeWidth="0.3" opacity="0.08" />
              <line x1="0" y1="60" x2="60" y2="60" stroke="var(--shape-grid)" strokeWidth="0.3" opacity="0.08" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-bg-grid)" />
        </svg>

        {/* Subtle radial glow for depth */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "0%",
            width: "800px",
            height: "800px",
            background: "radial-gradient(circle, rgba(0,223,129,0.015) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Content */}
      <div className="container hero-inner">
        {/* LEFT — Text content */}
        <div className="hero-content">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="hero-eyebrow" style={{ opacity: 0 }}>
            <span style={{ color: 'var(--accent)', fontWeight: 600, marginRight: '0.25rem', fontSize: '11px', letterSpacing: '0.1em' }}>01.</span>
            <span className="label" style={{ fontWeight: 600, color: 'var(--text-pri)', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Hero
            </span>
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
