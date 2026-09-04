"use client";
import { techIcons } from "@/data";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

/**
 * Tech — V2
 * Grid of monochromatic tech icons.
 * Based on referencia.png section 14.
 * 2 rows of 4 icons, white/green on dark, hover → accent + scale.
 */
export default function Tech() {
  return (
    <section id="tecnologias" className="section tech">
      <div className="container">
        {/* Header */}
        <div className="tech-header">
          <div>
            <SectionEyebrow index={5} label="Tecnologias" className="reveal" />
            <h2 className="tech-title reveal">Engenharia</h2>
          </div>
          <p className="tech-quote reveal-right">
            &ldquo;A tecnologia muda conforme o problema.
            A engenharia continua sendo a mesma.&rdquo;
          </p>
        </div>

        {/* Icons grid */}
        <div className="tech-grid">
          {techIcons.map((tech, i) => (
            <div
              key={tech.name}
              className="tech-icon-cell reveal"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <svg
                className="tech-icon-svg"
                viewBox={tech.viewBox || "0 0 24 24"}
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d={tech.svgPath} />
              </svg>
              <span className="tech-icon-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
