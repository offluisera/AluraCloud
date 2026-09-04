"use client";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

/**
 * Hosting — V2 (replaces Horizon)
 * "Hospedagem Em Breve" section.
 * Based on referencia.png section 12.
 * Server visual + heading + subtitle.
 * Communicates future, not a promise.
 */
export default function Hosting() {
  return (
    <section id="hospedagem" className="section hosting">
      <div className="container">
        <div className="hosting-grid">
          {/* Left — Server visual (SVG) */}
          <div className="hosting-visual reveal-left" aria-hidden="true">
            <svg
              viewBox="0 0 320 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="hosting-server-svg"
            >
              {/* Ambient glow */}
              <defs>
                <radialGradient id="hosting-glow" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.06" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="320" height="400" fill="url(#hosting-glow)" />

              {/* Server rack frame */}
              <rect x="60" y="40" width="200" height="320" rx="6" stroke="var(--shape-stroke)" strokeWidth="1" opacity="0.5" />

              {/* Server units */}
              {[60, 120, 180, 240, 300].map((y, i) => (
                <g key={y}>
                  <rect x="72" y={y} width="176" height="48" rx="3"
                    stroke="var(--accent)" strokeWidth="0.5" opacity={0.2 + i * 0.08} />
                  {/* Status LED */}
                  <circle cx="88" cy={y + 24} r="3"
                    fill="var(--accent)" opacity={0.3 + i * 0.1}>
                    <animate attributeName="opacity"
                      values={`${0.3 + i * 0.1};${0.6 + i * 0.08};${0.3 + i * 0.1}`}
                      dur={`${3 + i * 0.5}s`} repeatCount="indefinite" />
                  </circle>
                  {/* Horizontal lines (drive bays) */}
                  <line x1="100" y1={y + 24} x2="236" y2={y + 24}
                    stroke="var(--accent)" strokeWidth="0.3" opacity="0.15" />
                  <line x1="100" y1={y + 16} x2="200" y2={y + 16}
                    stroke="var(--accent)" strokeWidth="0.3" opacity="0.1" />
                  <line x1="100" y1={y + 32} x2="220" y2={y + 32}
                    stroke="var(--accent)" strokeWidth="0.3" opacity="0.1" />
                </g>
              ))}

              {/* Subtle grid on background */}
              <pattern id="hosting-grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <line x1="20" y1="0" x2="20" y2="20" stroke="var(--shape-grid)" strokeWidth="0.3" opacity="0.1" />
                <line x1="0" y1="20" x2="20" y2="20" stroke="var(--shape-grid)" strokeWidth="0.3" opacity="0.1" />
              </pattern>
              <rect x="60" y="40" width="200" height="320" rx="6" fill="url(#hosting-grid-pattern)" />
            </svg>
          </div>

          {/* Right — Content */}
          <div className="hosting-content">
            <SectionEyebrow index={6} label="Hospedagem" className="reveal" />
            <h2 className="hosting-heading reveal">
              Hospedagem
              <br />
              <span className="hosting-heading-accent">Em Breve</span>
            </h2>
            <p className="hosting-body reveal">
              Infraestrutura própria para levar seus projetos ainda mais longe.
              Estamos construindo nosso próprio ecossistema.
            </p>

            {/* Progression */}
            <div className="hosting-progression reveal">
              {[
                { label: "Desenvolvimento", active: true },
                { label: "Produto", active: true },
                { label: "Infraestrutura", active: true },
                { label: "Hospedagem", active: false },
              ].map((step, i) => (
                <div key={step.label} className="hosting-step">
                  <span className={`hosting-dot ${step.active ? "hosting-dot--active" : ""}`} />
                  <span className={`hosting-step-label ${step.active ? "" : "hosting-step-label--muted"}`}>
                    {step.label}
                  </span>
                  {i < 3 && (
                    <span className="hosting-arrow" aria-hidden="true">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
