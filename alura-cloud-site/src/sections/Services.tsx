"use client";
import ServicesHeaderGraphic from "../components/services/ServicesHeaderGraphic";
import ServiceCardGraphic from "../components/services/ServiceCardGraphic";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

const SERVICES_DATA = [
  {
    num: "01",
    title: "DESENVOLVIMENTO DIGITAL",
    description: "Sites, landing pages e interfaces que transformam ideias em experiências digitais.",
    items: ["Websites", "Landing Pages", "Interfaces Web", "Experiências Digitais"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="3" y1="9" x2="21" y2="9"></line>
        <line x1="9" y1="21" x2="9" y2="9"></line>
      </svg>
    )
  },
  {
    num: "02",
    title: "PRODUTOS E SISTEMAS",
    description: "Sistemas, dashboards e plataformas personalizadas para impulsionar seu negócio.",
    items: ["Sistemas Web", "Dashboards", "SaaS", "Plataformas", "Aplicações Personalizadas"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    )
  },
  {
    num: "03",
    title: "SOLUÇÕES ESPECIALIZADAS",
    description: "Soluções específicas para necessidades únicas e integrações avançadas.",
    items: ["Servidores Minecraft", "Bots para Discord", "Automações", "Integrações", "Projetos Especializados"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.439 7.85c-.049.322-.059.648-.089.972-.2 2.115-.436 4.228-.68 6.338-.073.633-.16 1.263-.263 1.888-.13.785-.503 1.455-1.071 1.986-.884.825-2.02 1.157-3.197 1.341-1.895.295-3.805.424-5.717.487-1.196.04-2.394.02-3.59-.028-1.009-.04-1.921-.358-2.673-1.054-.741-.685-1.135-1.547-1.29-2.528-.158-1-.237-2.013-.332-3.023-.178-1.89-.317-3.784-.455-5.677-.075-1.03-.122-2.062-.164-3.093-.016-.412.05-.79.3-1.121.284-.377.67-.589 1.127-.665 1.543-.255 3.1-.383 4.662-.48 2.088-.13 4.18-.18 6.27-.15 1.637.024 3.272.102 4.903.259.98.094 1.801.488 2.378 1.295.127.178.225.378.303.585z"></path>
        {/* Simplified puzzle icon representation */}
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    )
  },
  {
    num: "04",
    title: "INFRAESTRUTURA",
    description: "Infraestrutura sólida, deploys confiáveis e ambientes robustos para seu projeto.",
    items: ["Deploy", "Servidores", "Linux", "Ambientes", "Infraestrutura Digital"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
      </svg>
    )
  },
  {
    num: "05",
    title: "HOSPEDAGEM",
    description: "Estamos construindo nossa própria infraestrutura de hospedagem para entregar ainda mais.",
    items: ["EM BREVE"],
    standby: true,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
      </svg>
    )
  },
];

export default function Services() {
  return (
    <section className="services-section" id="servicos">
      <div className="container services-container">
        
        {/* Header — conceito geral da seção */}
        <div className="services-header-layout">
          <div className="services-header-text">
            <SectionEyebrow index={3} label="Serviços" className="services-eyebrow" />
            <h2 className="services-headline">
              SOLUÇÕES DIGITAIS<br/>
              COMPLETAS PARA<br/>
              <span className="text-accent">PROJETOS REAIS.</span>
            </h2>
            <p className="services-subtext">
              Da criação à infraestrutura, entregamos tudo o que seu projeto precisa para existir, crescer e evoluir.
            </p>
            <button className="services-explore-btn">
              <span className="btn-node"></span>
              EXPLORAR SERVIÇOS
            </button>
          </div>
          <div className="services-header-visual">
            <ServicesHeaderGraphic />
          </div>
        </div>

        {/* Categoria Header */}
        <div className="services-section-eyebrow">
          <p className="label">Categorias · 01—05</p>
        </div>

        {/* LAYOUT CARDS LADO-A-LADO */}
        <div className="services-cards-grid">
          {SERVICES_DATA.map((s, i) => (
            <div key={i} className="service-card">
              
              <div className="service-card-header">
                <div className="service-num">{s.num}</div>
                <div className="service-card-icon">{s.icon}</div>
              </div>
              
              <h3 className="service-title">{s.title}</h3>
              {s.standby && <p className="service-standby-badge">EM BREVE</p>}
              
              <p className="service-desc">{s.description}</p>
              
              <ul className="service-list">
                {s.items.map((item, idx) => (
                  <li key={idx} className={s.standby ? "service-standby" : ""}>{item}</li>
                ))}
              </ul>
              
              {/* The Dedicated 3D Graphic for this specific card */}
              <div className="service-card-graphic">
                <ServiceCardGraphic index={i} />
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
