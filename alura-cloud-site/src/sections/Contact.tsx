'use client';

import React, { useRef, useState, useEffect } from 'react';
import { AnimatedGeometricA } from '@/components/ui/AnimatedGeometricA';

/**
 * Contact / CTA Section — High-End Luxury Standard
 * Resilient, bulletproof entrance animation via IntersectionObserver & GPU transitions.
 * Guaranteed never to be hidden by GSAP lifecycle or React StrictMode conflicts.
 */
export default function Contact() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(card);

    // Rede de segurança: garante visibilidade mesmo se o scroll já tiver passado
    const timer = setTimeout(() => setIsVisible(true), 800);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="contato" className="contact-section">
      <div className="container">
        {/* Card Principal */}
        <div ref={cardRef} className={`contact-card ${isVisible ? 'is-visible' : ''}`}>
          {/* Ambient Radial Glow Interior */}
          <div className="contact-ambient-glow" aria-hidden="true" />

          {/* Coluna Esquerda: Conteúdo & CTA */}
          <div className="contact-content-col">
            {/* Eyebrow alinhado opticamente com o título */}
            <span className="contact-eyebrow">
              INICIE SEU PROJETO
            </span>

            {/* Headline com alinhamento rigoroso à esquerda */}
            <h2 className="contact-headline">
              TEM UMA IDEIA?
              <br />
              <span className="contact-accent-text">VAMOS CONSTRUIR.</span>
            </h2>

            {/* Subtítulo */}
            <p className="contact-subtitle">
              Fale com a Alura Cloud e transforme seu projeto em realidade, com engenharia sólida e alta performance.
            </p>

            {/* Botão de Ação Premium */}
            <div className="contact-btn-wrap">
              <a
                href="mailto:contato@aluracloud.com.br"
                className="contact-primary-btn"
              >
                <span>Falar com a Alura Cloud</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="btn-arrow-icon"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

          {/* Coluna Direita: "A" 3D Wireframe */}
          <div className="contact-visual-col">
            <AnimatedGeometricA intensity={1} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .contact-section {
          position: relative;
          z-index: 10;
          padding: 6rem 0;
        }

        .contact-card {
          position: relative;
          width: 100%;
          border-radius: 32px;
          overflow: hidden;
          background-color: #020e0c;
          border: 1px solid rgba(0, 223, 129, 0.22);
          box-shadow: 0 35px 80px rgba(0, 0, 0, 0.75), inset 0 1px 0 rgba(0, 223, 129, 0.15);
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          align-items: center;
          gap: clamp(2.5rem, 5vw, 5rem);
          padding: clamp(3.5rem, 5vw, 5.5rem) clamp(3.5rem, 6.5vw, 6.5rem);
          box-sizing: border-box;
        }

        @media (max-width: 1024px) {
          .contact-card {
            grid-template-columns: 1fr;
            padding: 3rem 2rem;
            gap: 3rem;
          }
        }

        .contact-ambient-glow {
          position: absolute;
          right: -5%;
          top: 50%;
          transform: translateY(-50%);
          width: 550px;
          height: 550px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 223, 129, 0.09) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
        }

        .contact-content-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          width: 100%;
          max-width: 560px;
          position: relative;
          z-index: 2;
          margin: 0;
          padding: 0;
        }

        /* ── Animações de Entrada em Cascata ──────────────────────── */

        .contact-eyebrow,
        .contact-headline,
        .contact-subtitle,
        .contact-btn-wrap {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        .is-visible .contact-eyebrow {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.05s;
        }

        .is-visible .contact-headline {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.15s;
        }

        .is-visible .contact-subtitle {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.25s;
        }

        .is-visible .contact-btn-wrap {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.35s;
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-eyebrow,
          .contact-headline,
          .contact-subtitle,
          .contact-btn-wrap {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }

        .contact-eyebrow {
          font-family: var(--font-display, sans-serif);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #00df81;
          margin: 0 0 1.25rem 0;
          padding: 0;
          display: block;
        }

        .contact-headline {
          font-family: var(--font-display, sans-serif);
          font-weight: 700;
          font-size: clamp(2.4rem, 3.8vw, 3.5rem);
          line-height: 1.12;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: #f1f7f6;
          margin: 0 0 1.5rem 0;
          padding: 0;
          text-align: left;
        }

        .contact-accent-text {
          color: #00df81;
          text-shadow: 0 0 30px rgba(0, 223, 129, 0.35);
        }

        .contact-subtitle {
          font-size: clamp(1rem, 1.2vw, 1.15rem);
          color: rgba(170, 203, 196, 0.85);
          line-height: 1.65;
          max-width: 460px;
          margin: 0 0 2.5rem 0;
          padding: 0;
          text-align: left;
        }

        .contact-btn-wrap {
          margin: 0;
          padding: 0;
        }

        .contact-primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          padding: 1.1rem 2.5rem;
          border-radius: 9999px;
          background: #00df81;
          color: #020e0c;
          font-family: var(--font-display, sans-serif);
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 0 25px rgba(0, 223, 129, 0.3), 0 10px 25px rgba(0, 0, 0, 0.4);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .contact-primary-btn:hover {
          background: #00ffb3;
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(0, 223, 129, 0.5), 0 15px 35px rgba(0, 0, 0, 0.5);
        }

        .contact-primary-btn:active {
          transform: translateY(0);
        }

        .btn-arrow-icon {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact-primary-btn:hover .btn-arrow-icon {
          transform: translateX(4px);
        }

        .contact-visual-col {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          min-height: 380px;
          z-index: 2;
        }
      `}</style>
    </section>
  );
}
