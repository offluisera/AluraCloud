"use client";
import { process } from "@/data";

/**
 * Process — V2
 * Horizontal timeline layout: 01-06 in a single line.
 * Based on referencia.png section 13.
 * Large green numbers with labels, connected by a subtle line.
 */
export default function Process() {
  return (
    <section id="processo" className="section process">
      <div className="container">
        {/* Section header */}
        <div className="process-header">
          <p className="label reveal">Como construímos</p>
          <h2 className="process-title reveal">Processo</h2>
        </div>

        {/* Horizontal timeline */}
        <div className="process-timeline">
          {/* Connecting line */}
          <div className="process-line" aria-hidden="true" />

          {process.map((step, i) => (
            <div
              key={step.number}
              className="process-step reveal"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className="process-number">{step.number}</span>
              <h3 className="process-name">{step.name}</h3>
              <p className="process-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
