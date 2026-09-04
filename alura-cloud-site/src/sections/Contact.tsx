"use client";
import Button from "@/components/ui/Button";

/**
 * Contact / CTA — V2
 * "TEM UMA IDEIA? VAMOS CONSTRUIR." — direct, clean, impactful.
 * Based on referencia.png section 15.
 * No form inline — CTA directs to email/WhatsApp.
 */
export default function Contact() {
  return (
    <section id="contato" className="section contact">
      <div className="container">
        <div className="contact-inner">
          {/* Label */}
          <p className="label reveal" style={{ marginBottom: "2rem" }}>
            Contato
          </p>

          {/* Headline */}
          <h2 className="contact-heading reveal">
            Tem uma ideia?
            <br />
            <span className="contact-heading-accent">Vamos construir.</span>
          </h2>

          {/* Subtitle */}
          <p className="contact-sub reveal">
            Fale com a Alura Cloud e transforme seu projeto em realidade.
          </p>

          {/* CTA */}
          <div className="contact-cta reveal">
            <Button
              label="Falar com a Alura Cloud"
              href="mailto:contato@aluracloud.com.br"
            />
          </div>

          {/* Secondary link */}
          <a
            href="mailto:contato@aluracloud.com.br"
            className="contact-email reveal"
          >
            contato@aluracloud.com.br
          </a>
        </div>
      </div>
    </section>
  );
}
