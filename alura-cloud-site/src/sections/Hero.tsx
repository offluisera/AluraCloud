"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Button from "@/components/ui/Button";
import CloudConsoleHero from "@/components/hero/CloudConsoleHero";

/**
 * Hero Section — V2 Premium
 * Asymmetric layout: content left, live interactive cloud console right
 * Live architecture & real-time telemetry demonstration (Volara style)
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.3,
      });

      tl.fromTo(
        statusRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          metaRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          consoleRef.current,
          { opacity: 0, x: 40, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power2.out" },
          "-=0.8"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCTA = () => {
    const el = document.querySelector("#contato");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="inicio" ref={sectionRef} className="hero-premium-section">
      <div className="container hero-grid-layout">
        {/* Left Column — Strategic Typography & CTAs */}
        <div className="hero-left-col">
          {/* Eyebrow */}
          <div ref={statusRef} className="hero-eyebrow-clean" style={{ opacity: 0 }}>
            ALURA CLOUD • ESTÚDIO DE ENGENHARIA DIGITAL
          </div>

          {/* Headline */}
          <h1 ref={headlineRef} className="hero-headline-premium" style={{ opacity: 0 }}>
            Onde a sua ambição<br />
            encontra <span className="text-caribbean-accent">execução.</span>
          </h1>

          {/* Subtitle */}
          <p ref={subRef} className="hero-sub-premium" style={{ opacity: 0 }}>
            Projetamos, desenvolvemos e estruturamos soluções digitais completas para transformar ideias em produtos de verdade, com engenharia sólida e alta performance.
          </p>

          {/* Action CTAs */}
          <div ref={ctaRef} className="hero-cta-row" style={{ opacity: 0 }}>
            <Button
              label="Explore nossos serviços"
              onClick={() => {
                const next = document.querySelector("#servicos");
                if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />
            <button
              type="button"
              onClick={handleCTA}
              className="hero-secondary-btn"
            >
              Fale conosco
            </button>
          </div>

          {/* Engineering Metadata Footer */}
          <div ref={metaRef} className="hero-meta-badges" style={{ opacity: 0 }}>
            <div className="hero-meta-badge">
              <span className="meta-val">99.99%</span>
              <span className="meta-sub">SLA DE UPTIME</span>
            </div>
            <div className="hero-meta-badge">
              <span className="meta-val">&lt; 15ms</span>
              <span className="meta-sub">LATÊNCIA EDGE</span>
            </div>
            <div className="hero-meta-badge">
              <span className="meta-val">MULTI-AZ</span>
              <span className="meta-sub">ALTA RESILIÊNCIA</span>
            </div>
          </div>
        </div>

        {/* Right Column — Interactive Cloud Architecture & Telemetry Console */}
        <div ref={consoleRef} className="hero-right-col" style={{ opacity: 0 }}>
          <CloudConsoleHero />
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        className="hero-scroll-indicator"
        onClick={() => {
          const next = document.querySelector("#servicos");
          if (next) next.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        aria-label="Rolar para baixo"
      >
        <span className="scroll-txt">EXPLORAR</span>
        <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
          <line x1="6" y1="0" x2="6" y2="14" stroke="#00DF81" strokeWidth="1.5" />
          <polyline points="2,11 6,15 10,11" stroke="#00DF81" strokeWidth="1.5" fill="none" />
        </svg>
      </button>

      <style jsx>{`
        .hero-premium-section {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding: 7.5rem 0 5rem;
          overflow: hidden;
        }

        .hero-grid-layout {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 3.5rem;
          align-items: center;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .hero-grid-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
            padding-top: 2rem;
          }
          .hero-left-col {
            text-align: center;
            align-items: center;
          }
          .hero-eyebrow-clean {
            margin: 0 auto 1.5rem;
          }
          .hero-cta-row {
            justify-content: center;
          }
          .hero-meta-badges {
            justify-content: center;
          }
        }

        .hero-left-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          z-index: 2;
        }

        .hero-eyebrow-clean {
          font-family: var(--font-display, sans-serif);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-mute, #707d7d);
          margin-bottom: 1.5rem;
        }

        .hero-headline-premium {
          font-family: var(--font-display, sans-serif);
          font-size: clamp(2.5rem, 4.2vw, 4.4rem);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #f1f7f6;
          margin-bottom: 1.5rem;
        }

        .text-caribbean-accent {
          color: var(--color-caribbean-green, #00df81);
          text-shadow: 0 0 25px rgba(0, 223, 129, 0.25);
        }

        .hero-sub-premium {
          font-size: clamp(1rem, 1.3vw, 1.125rem);
          color: rgba(170, 203, 196, 0.85);
          line-height: 1.65;
          max-width: 540px;
          margin-bottom: 2.25rem;
        }

        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .hero-secondary-btn {
          background: transparent;
          color: #f1f7f6;
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.875rem 1.75rem;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-secondary-btn:hover {
          border-color: rgba(0, 223, 129, 0.5);
          background: rgba(0, 223, 129, 0.08);
          color: #00df81;
          transform: translateY(-1px);
        }

        .hero-meta-badges {
          display: flex;
          gap: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          width: 100%;
          max-width: 520px;
        }

        .hero-meta-badge {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .meta-val {
          font-family: monospace;
          font-size: 0.95rem;
          font-weight: 700;
          color: #00df81;
        }

        .meta-sub {
          font-size: 0.62rem;
          font-family: monospace;
          letter-spacing: 0.05em;
          color: rgba(112, 125, 125, 0.9);
          text-transform: uppercase;
        }

        .hero-right-col {
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
        }

        .hero-scroll-indicator {
          position: absolute;
          bottom: 1.75rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 5;
        }

        .scroll-txt {
          font-family: monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          color: rgba(170, 203, 196, 0.7);
        }
      `}</style>
    </section>
  );
}
