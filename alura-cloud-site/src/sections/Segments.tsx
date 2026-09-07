"use client";
import { useRef, useState } from "react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

/**
 * SEGMENTS — "Expertise comprovada" (inspirado na Magnus Global).
 * Carrossel horizontal de segmentos atendidos, com fallback elegante
 * em gradiente caso a foto ainda não exista em /public/images/segments.
 * Basta colocar o arquivo com o mesmo nome do campo `image` que a
 * foto substitui o fallback automaticamente — sem editar código.
 *
 * Clicar num card seleciona a categoria correspondente no Portfólio
 * (via evento global "alura:select-portfolio-category") e rola a
 * página até lá — ver listener em Portfolio.tsx.
 */

const SEGMENTS = [
  { id: "medicina", name: "Medicina", image: "/images/segments/medicina.jpg", category: "Medicina" },
  { id: "b2b", name: "B2B", image: "/images/segments/b2b.jpg", category: "B2B" },
  { id: "ecommerce", name: "E-commerce", image: "/images/segments/ecommerce.jpg", category: "Produtos (Baixo Ticket)" },
  { id: "estetica", name: "Estética & Odontologia", image: "/images/segments/estetica.jpg", category: "Estética & Odontologia" },
  { id: "educacao", name: "Educação", image: "/images/segments/educacao.jpg", category: "Educação" },
];

function goToPortfolioCategory(category: string) {
  window.dispatchEvent(
    new CustomEvent("alura:select-portfolio-category", { detail: category })
  );
  // Dá um instante para o Portfolio processar o evento antes de rolar.
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
    >
      <div className="seg-card-media" data-tone={tone}>
        {!broken && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={seg.image}
            alt={seg.name}
            className="seg-card-img"
            loading="lazy"
            onError={() => setBroken(true)}
          />
        )}
        {broken && (
          <span className="seg-card-mono" aria-hidden="true">
            {seg.name.charAt(0)}
          </span>
        )}
        <div className="seg-card-overlay" />
        <span className="seg-card-label">{seg.name}</span>
      </div>
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
              <span className="seg-title-muted">nesses segmentos</span>
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
