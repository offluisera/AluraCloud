"use client";
import Logo from "@/components/ui/Logo";

/**
 * Footer — V2
 * Clean footer with brand, nav links, status.
 * Removed "Redes Sociais" (brief: don't invent social media).
 * Removed "Projetos" link (section removed).
 */
export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { label: "Início", href: "#inicio" },
    { label: "Serviços", href: "#servicos" },
    { label: "Processo", href: "#processo" },
    { label: "Tecnologias", href: "#tecnologias" },
    { label: "Contato", href: "#contato" },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Top row */}
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-brand-mark">
              <Logo size={20} />
              <p className="footer-brand-name">Alura Cloud</p>
            </div>
            <p className="label" style={{ marginBottom: "1rem" }}>
              Estúdio de Engenharia Digital
            </p>
            <p className="footer-brand-desc">
              Projetamos e construímos produtos digitais,
              sistemas e infraestrutura.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Links do rodapé">
            <p className="label" style={{ marginBottom: "1.25rem" }}>
              Navegação
            </p>
            <ul className="footer-nav-list">
              {links.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="footer-nav-link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="label" style={{ marginBottom: "1.25rem" }}>
              Contato
            </p>
            <a
              href="mailto:contato@aluracloud.com.br"
              className="footer-contact-link"
            >
              contato@aluracloud.com.br
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="line" />

        {/* Bottom row */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} Alura Cloud. Todos os direitos reservados.
          </p>
          <div className="footer-status">
            <span className="footer-status-dot" />
            <span className="footer-status-text">Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
