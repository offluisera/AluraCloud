"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import { Plasma } from "@/components/ui/plasma/Plasma";
import LiquidGlassButton from "@/components/ui/LiquidGlassButton";

const PORTFOLIO_CATEGORIES = [
  "Medicina", "Eventos", "B2B", "Serviços", "Produtos (Baixo Ticket)",
  "Educação", "Sites Institucionais", "Estética & Odontologia", "Produtos (Alto Ticket)"
];

const PORTFOLIO_PROJECTS = [
  {
    id: "02",
    title: "Clínica Binder",
    subtitle: "Cirurgia Plástica e Ginecologia",
    category: "Medicina",
    gradient: "from-slate-900 via-stone-800 to-amber-900/40",
  },
  {
    id: "03",
    title: "Biella",
    subtitle: "Cuidamos de você com atenção absoluta.",
    category: "Estética & Odontologia",
    gradient: "from-amber-100 via-stone-200 to-amber-50",
    lightText: true,
  },
  {
    id: "04",
    title: "Luciana Augé",
    subtitle: "Sua beleza realçada com naturalidade e elegância.",
    category: "Medicina",
    gradient: "from-stone-200 via-amber-50 to-stone-100",
    lightText: true,
  },
  {
    id: "05",
    title: "Raulino",
    subtitle: "Inicie sua transformação",
    category: "Medicina",
    gradient: "from-slate-900 via-stone-900 to-stone-800",
  },
  {
    id: "06",
    title: "Thomas Green",
    subtitle: "Transforme seu corpo e sua autoestima com segurança.",
    category: "Medicina",
    gradient: "from-stone-900 via-zinc-900 to-black",
  },
  {
    id: "07",
    title: "Márcio Morroni",
    subtitle: "Descubra como alcançar o corpo dos seus sonhos.",
    category: "Medicina",
    gradient: "from-zinc-900 via-black to-zinc-950",
  }
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Medicina");
  
  // Filter projects by category, or show all if we want. Currently filtering.
  // Actually, the magnus reference seems to show a mix. Let's just show all for now to keep the gallery full.
  const projects = PORTFOLIO_PROJECTS;

  return (
    <section className="relative pt-32 pb-32 overflow-hidden flex flex-col items-center w-full" id="portfolio">
      {/* Background Plasma Effect */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Plasma 
          color="#48ff48"
          speed={1.5}
          direction="forward"
          scale={3}
          opacity={0.7}
          mouseInteractive={false}
          renderScale={0.85}
          maxDpr={2}
          targetFps={60}
          iterations={50}
        />
        {/* Vignette mask to fade out the edges so it blends with the dark background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-deep)_75%)] pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center gap-10 md:gap-14">
        
        {/* Top Header & Filters */}
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center gap-8">
          <div className="flex flex-col items-center gap-6 max-w-3xl">
            <SectionEyebrow index={4} label="PORTFÓLIO ALURA CLOUD" className="reveal" />
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
              Páginas que fazem a marca ser lembrada.
            </h2>
            <p className="text-sm md:text-base text-white/60 font-light max-w-xl">
              Uma seleção viva do que acontece quando estratégia, estética e conversão são pensadas como uma só experiência.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col items-center gap-3 md:gap-4 max-w-5xl">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {PORTFOLIO_CATEGORIES.slice(0, 5).map((cat) => (
                <div key={cat} onClick={() => setActiveCategory(cat)}>
                  <LiquidGlassButton 
                    label={cat} 
                    colors={{
                      fill: activeCategory === cat ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0)",
                      textColor: activeCategory === cat ? "#ffffff" : "rgba(255,255,255,0.6)",
                    }}
                    stroke={{
                      type: "solid",
                      color: activeCategory === cat ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)",
                      width: 1
                    }}
                    padding="8px 16px"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {PORTFOLIO_CATEGORIES.slice(5).map((cat) => (
                <div key={cat} onClick={() => setActiveCategory(cat)}>
                  <LiquidGlassButton 
                    label={cat} 
                    colors={{
                      fill: activeCategory === cat ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0)",
                      textColor: activeCategory === cat ? "#ffffff" : "rgba(255,255,255,0.6)",
                    }}
                    stroke={{
                      type: "solid",
                      color: activeCategory === cat ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)",
                      width: 1
                    }}
                    padding="8px 16px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Gallery */}
        <div className="w-full pb-12">
          <div className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory px-4 md:px-[10vw] pb-16 pt-8 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                className="snap-center shrink-0 w-[80vw] md:w-[280px] h-[380px] md:h-[420px] rounded-[2rem] relative overflow-hidden group border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              >
              {/* Browser/Phone Mockup Top Bar */}
              <div className="absolute top-0 left-0 w-full h-12 flex items-center px-6 gap-2 z-20 bg-black/10 backdrop-blur-md border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                </div>
                <div className="mx-auto text-[10px] uppercase tracking-widest opacity-40 font-mono">
                  alura.cloud/{project.id}
                </div>
              </div>

              {/* Gradient Background (Simulating the image) */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-b transition-transform duration-700 group-hover:scale-105",
                project.gradient
              )}></div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                  <h3 className={cn(
                    "text-3xl font-display font-medium mb-3",
                    project.lightText ? "text-stone-900" : "text-white"
                  )}>
                    {project.title}
                  </h3>
                  <p className={cn(
                    "text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100",
                    project.lightText ? "text-stone-700" : "text-white/70"
                  )}>
                    {project.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="w-full flex justify-center mt-4 mb-16 relative z-20">
          <a 
            href="#contact" 
            style={{ 
              backgroundColor: '#ffffff', 
              color: '#000000', 
              borderRadius: '9999px',
              padding: '16px 36px',
              fontSize: '16px',
              fontWeight: '600'
            }}
            className="inline-flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
          >
            Quero um projeto assim
            <span aria-hidden="true" style={{ fontSize: '18px' }}>→</span>
          </a>
        </div>
      </div>
      </div>
    </section>
  );
}
