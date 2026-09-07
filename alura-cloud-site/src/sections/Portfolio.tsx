"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import MoltenMetal from "@/components/ui/MoltenMetal";
import LiquidGlassButton from "@/components/ui/LiquidGlassButton";
import StarfieldButton from "@/components/ui/starfield-button/StarfieldButton";

const PORTFOLIO_CATEGORIES = [
  "Medicina", "Eventos", "B2B", "Serviços", "Produtos (Baixo Ticket)",
  "Educação", "Sites Institucionais", "Estética & Odontologia", "Produtos (Alto Ticket)"
];

const PORTFOLIO_PROJECTS: {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  gradient: string;
  lightText?: boolean;
  image?: string;
}[] = [
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
  const [isPaused, setIsPaused] = useState(false);
  const [motionOk, setMotionOk] = useState(() =>
    typeof window === "undefined"
      ? true
      : !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setMotionOk(!mq.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // Ponte com a seção de Segmentos: ao clicar num card lá, seleciona
  // aqui a categoria correspondente (o scroll até a seção é feito
  // pelo próprio disparador do evento).
  useEffect(() => {
    const handleSelect = (e: Event) => {
      const category = (e as CustomEvent<string>).detail;
      if (PORTFOLIO_CATEGORIES.includes(category)) {
        setActiveCategory(category);
      }
    };
    window.addEventListener("alura:select-portfolio-category", handleSelect);
    return () => window.removeEventListener("alura:select-portfolio-category", handleSelect);
  }, []);

  // Filtra pela categoria ativa; se a categoria escolhida ainda não tem
  // projetos publicados, mostramos um aviso em vez de uma galeria vazia.
  const projects = PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);
  // Duplicado para permitir o loop contínuo e sem costura do marquee.
  const marqueeProjects = motionOk && projects.length > 1 ? [...projects, ...projects] : projects;

  return (
    <section className="relative pt-32 pb-32 overflow-hidden flex flex-col items-center w-full" id="portfolio">
      <div className="absolute inset-0 z-0 opacity-100">
        <MoltenMetal 
          color1="#34ff27"
          color2="#84CC16"
          color3="#c9ffbe"
          speed={0.35}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          swirl={1}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.3}
          colorMode="molten"
          grain={true}
          grainIntensity={0.05}
          mouseInteraction={true}
          mouseStrength={0.3}
          opacity={1.0}
        />
        {/* Vignette mask to fade out the edges so it blends with the dark background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-deep)_75%)] pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center gap-10 md:gap-14">
        
        {/* Top Header & Filters */}
        <div className="container flex flex-col items-center text-center gap-8">
          <div className="flex flex-col items-center gap-6 max-w-3xl">
            <SectionEyebrow index={5} label="PORTFÓLIO ALURA CLOUD" className="reveal" />
            <h2 className="font-display font-medium text-white leading-[1.05] tracking-tight text-[clamp(2rem,5.5vw,3.75rem)]">
              Páginas que fazem a marca ser lembrada.
            </h2>
            <p className="text-sm md:text-base text-white/55 font-light leading-relaxed tracking-wide max-w-xl">
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

        {/* Auto-scrolling Gallery (marquee, direita → esquerda, estilo Magnus) */}
        {projects.length === 0 ? (
          <p className="text-white/40 text-sm py-12">
            Ainda não temos projetos publicados nesta categoria.
          </p>
        ) : (
        <div
          className="w-full"
          style={{
            overflow: motionOk ? "hidden" : "auto",
            scrollbarWidth: motionOk ? undefined : "none",
            WebkitMaskImage: motionOk
              ? "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)"
              : undefined,
            maskImage: motionOk
              ? "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)"
              : undefined,
          }}
        >
          {/* display/gap fixados via style inline (não dependem de CSS externo)
              para o layout em linha nunca cair para empilhamento vertical. */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              width: motionOk ? "max-content" : undefined,
              gap: "1.25rem",
              padding: "2rem 0 1rem",
              animation: motionOk
                ? "portfolio-marquee-scroll 48s linear infinite"
                : undefined,
              animationPlayState: isPaused ? "paused" : "running",
            }}
          >
            {marqueeProjects.map((project, idx) => (
              <div key={`${project.id}-${idx}`} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div className="shrink-0 w-[78vw] sm:w-[300px] h-[380px] md:h-[420px] rounded-[2rem] relative overflow-hidden group border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
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

                {/* Imagem do projeto (se houver) ou gradiente de placeholder */}
                {project.image ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  </>
                ) : (
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-b transition-transform duration-700 group-hover:scale-105",
                    project.gradient
                  )}></div>
                )}

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

                {/* Legenda abaixo do card (referência Magnus): nº do projeto + categoria */}
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-semibold tracking-wide text-white/80 uppercase">
                    Projeto {project.id}
                  </span>
                  <span className="text-xs tracking-wide text-white/35 uppercase">
                    {project.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Call to Action Button */}
        <div
          className="w-full flex justify-center relative z-20"
          style={{ marginTop: "1rem", marginBottom: "3rem" }}
        >
          <StarfieldButton
            label="Quero um projeto assim"
            link="#contato"
            addIcon
            colors={{ fill: "#0A0F0D", textColor: "#FFFFFF" }}
            border={{ borderColor: "rgba(0,223,129,0.25)", borderWidth: 1 }}
            glow={{ color: "#00DF81", size: 18, opacity: 70 }}
            stroke={{ color: "#00DF81", count: 2, size: 90, thickness: 2, speed: 45 }}
            pixel={{ color: "#00DF81", size: 4, density: 35, brightness: 100 }}
            icon={{ icon: "arrow", side: "right", size: 20, type: "symbol", color: "#FFFFFF", symbol: "→" }}
            font={{ fontSize: 16, fontWeight: 600, fontFamily: "inherit", lineHeight: "1em" }}
            padding="16px 32px"
          />
        </div>
      </div>
    </section>
  );
}
