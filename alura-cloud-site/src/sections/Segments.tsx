"use client";
import { useRef, useState } from "react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import TiltCard from "@/components/ui/TiltCard";

/**
 * SEGMENTS — "Expertise comprovada" (inspirado na Magnus Global e Volara).
 * Carrossel com física 3D Tilt, reflexo dinâmico e micro-especificações técnicas.
 */

const SEGMENTS = [
  {
    id: "medicina",
    name: "Medicina & Saúde",
    image: "/images/segments/medicina.jpg",
    category: "Medicina",
    badge: "LGPD & CFM",
    sub: "Prontuários e alta segurança",
    glyph: "M",
  },
  {
    id: "b2b",
    name: "B2B & Enterprise",
    image: "/images/segments/b2b.jpg",
    category: "B2B",
    badge: "SLA 99.99%",
    sub: "APIs e integrações críticas",
    glyph: "B",
  },
  {
    id: "ecommerce",
    name: "E-commerce & Escala",
    image: "/images/segments/ecommerce.jpg",
    category: "Produtos (Baixo Ticket)",
    badge: "< 12ms p95",
    sub: "Checkout com zero latência",
    glyph: "E",
  },
  {
    id: "estetica",
    name: "Estética & Clínicas",
    image: "/images/segments/estetica.jpg",
    category: "Estética & Odontologia",
    badge: "Alta Conversão",
    sub: "Jornada imersiva e agendamento",
    glyph: "O",
  },
  {
    id: "educacao",
    name: "Educação & EdTech",
    image: "/images/segments/educacao.jpg",
    category: "Educação",
    badge: "Escala Massiva",
    sub: "LMS com streaming adaptativo",
    glyph: "D",
  },
];

function goToPortfolioCategory(category: string) {
  window.dispatchEvent(
    new CustomEvent("alura:select-portfolio-category", { detail: category })
  );
  requestAnimationFrame(() => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function SegCard({ seg, tone }: { seg: (typeof SEGMENTS)[number]; tone: number }) {
  const [broken, setBroken] = useState(false);

  const handleActivate = () => goToPortfolioCategory(seg.category);

  return (
    <div
      className="seg-card"
      role="button"
      tabIndex={0}
      aria-label={`Ver projetos de ${seg.name} no portfólio`}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
      style={{
        flex: "0 0 clamp(240px, 26vw, 300px)",
        width: "clamp(240px, 26vw, 300px)",
        minWidth: "clamp(240px, 26vw, 300px)",
        display: "block",
      }}
    >
      <TiltCard maxTilt={8} scale={1.02} spotlight={true}>
        <div
          className="seg-card-media"
          data-tone={tone}
          style={{
            position: "relative",
            width: "100%",
            height: "380px",
            minHeight: "380px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "1.25rem",
            boxSizing: "border-box",
            borderRadius: "1.25rem",
            overflow: "hidden",
            border: "1px solid rgba(0, 223, 129, 0.22)",
            background: "linear-gradient(165deg, #072620 0%, #020f0c 100%)",
            boxShadow: "0 18px 40px rgba(0, 0, 0, 0.5)",
          }}
        >
          {/* Top Row: Tech Badge + Minimal Link Arrow */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 4 }}>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "0.68rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#00DF81",
                background: "rgba(3, 24, 22, 0.9)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(0, 223, 129, 0.35)",
                padding: "0.25rem 0.65rem",
                borderRadius: "6px",
              }}
            >
              {seg.badge}
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: "0.85rem",
                color: "rgba(0, 223, 129, 0.5)",
              }}
            >
              ↗
            </span>
          </div>

          {/* Center Graphic: Blueprint Wireframe Circles + Monogram */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "130px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <svg
              width="140"
              height="140"
              viewBox="0 0 140 140"
              fill="none"
              style={{ position: "absolute", opacity: 0.4 }}
            >
              <circle cx="70" cy="70" r="55" stroke="#00DF81" strokeWidth="1" strokeDasharray="4 5" />
              <circle cx="70" cy="70" r="36" stroke="#00DF81" strokeWidth="0.75" />
              <line x1="10" y1="70" x2="130" y2="70" stroke="#00DF81" strokeWidth="0.5" />
              <line x1="70" y1="10" x2="70" y2="130" stroke="#00DF81" strokeWidth="0.5" />
            </svg>

            <span
              style={{
                fontFamily: "var(--font-display, sans-serif)",
                fontSize: "4.8rem",
                fontWeight: 800,
                color: "rgba(0, 223, 129, 0.28)",
                textShadow: "0 0 35px rgba(0, 223, 129, 0.4)",
                userSelect: "none",
              }}
            >
              {seg.glyph}
            </span>
          </div>

          {/* Photo background if image loads */}
          {!broken && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={seg.image}
              alt={seg.name}
              className="seg-card-img"
              loading="lazy"
              onError={() => setBroken(true)}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 1,
                opacity: 0.45,
              }}
            />
          )}

          {/* Dark gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(2, 11, 10, 0.95) 0%, rgba(2, 11, 10, 0.4) 60%, transparent 100%)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Bottom Row: Name + Subtitle + Action Arrow */}
          <div style={{ position: "relative", zIndex: 4, display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            <span
              style={{
                fontFamily: "var(--font-display, sans-serif)",
                fontWeight: 600,
                fontSize: "1.15rem",
                color: "#f1f7f6",
                lineHeight: 1.2,
              }}
            >
              {seg.name}
            </span>
            <span
              style={{
                fontSize: "0.75rem",
                color: "rgba(170, 203, 196, 0.85)",
                lineHeight: 1.4,
              }}
            >
              {seg.sub}
            </span>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}

export default function Segments() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".seg-card");
    const step = card ? card.offsetWidth + 24 : 320;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="section segments" id="segmentos">
      <div className="container seg-outer">
        <div className="seg-header">
          <div>
            <SectionEyebrow index={4} label="Expertise comprovada" className="reveal" />
            <h2 className="seg-title reveal">
              Resultados reais
              <br />
              <span className="seg-title-accent" style={{ color: "var(--color-caribbean-green, #00df81)" }}>
                nesses segmentos
              </span>
            </h2>
          </div>

          <div className="seg-nav reveal-right">
            <button
              type="button"
              className="seg-nav-btn"
              aria-label="Ver segmento anterior"
              onClick={() => scrollByCard(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              className="seg-nav-btn"
              aria-label="Ver próximo segmento"
              onClick={() => scrollByCard(1)}
            >
              ›
            </button>
          </div>
        </div>

        <div className="seg-track" ref={trackRef}>
          {SEGMENTS.map((seg, i) => (
            <SegCard key={seg.id} seg={seg} tone={i % 4} />
          ))}
        </div>

        <div className="seg-cta">
          <a href="#contato" className="btn">
            Quero resultados assim
            <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
