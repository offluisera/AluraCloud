"use client";
import { useState, useEffect } from "react";
import Logo from "@/components/ui/Logo";

const NAV_ITEMS = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Segmentos", href: "#segmentos" },
  { label: "Contato", href: "#contato" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#inicio");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (href: string) => {
    setActive(href);
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Desktop floating dock */}
      <nav
        className={`nav-dock ${scrolled ? "nav-dock--scrolled" : ""}`}
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <button
          className="nav-logo"
          onClick={() => handleNav("#inicio")}
          aria-label="Ir para o início"
        >
          <span className="nav-logo-icon">
            <Logo size={22} />
          </span>
          <span className="nav-logo-text">AC</span>
        </button>

        {/* Separator */}
        <span className="nav-separator" aria-hidden="true" />

        {/* Links */}
        <div className="nav-links">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className={`nav-item ${active === item.href ? "nav-item--active" : ""}`}
              aria-current={active === item.href ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`nav-overlay ${open ? "nav-overlay--open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <button
          className="nav-overlay-close"
          onClick={() => setOpen(false)}
          aria-label="Fechar menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {NAV_ITEMS.map((item) => (
          <button
            key={item.href}
            onClick={() => handleNav(item.href)}
            className="nav-overlay-link"
          >
            {item.label}
          </button>
        ))}

        <p className="nav-overlay-tag">
          Estúdio de Engenharia Digital
        </p>
      </div>
    </>
  );
}
