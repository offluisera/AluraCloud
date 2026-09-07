"use client";
import { useEffect, useRef } from "react";
import { createTimeline, stagger, onScroll, createScope, splitText, type Scope } from "animejs";
import TiltCard from "@/components/ui/TiltCard";

/* ── SVG Mockups ─────────────────────────────────────────── */

function BrowserChrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="svc-browser">
      <div className="svc-browser-bar">
        <span className="svc-dot" /><span className="svc-dot" /><span className="svc-dot" />
        <span className="svc-browser-url">{url}</span>
      </div>
      <div className="svc-browser-body">{children}</div>
    </div>
  );
}

/* 01 – Landing page mockup */
function MockupLanding() {
  return (
    <BrowserChrome url="suaempresa.com.br">
      <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg">
        {/* nav */}
        <rect x="0" y="0" width="320" height="28" fill="#0d1a14"/>
        <rect x="12" y="9" width="32" height="10" rx="2" fill="#00df81" opacity=".9"/>
        <rect x="220" y="9" width="30" height="10" rx="2" fill="#ffffff" opacity=".07"/>
        <rect x="256" y="9" width="30" height="10" rx="2" fill="#ffffff" opacity=".07"/>
        <rect x="292" y="9" width="16" height="10" rx="2" fill="#00df81" opacity=".8"/>
        {/* hero bg */}
        <rect x="0" y="28" width="320" height="100" fill="#060f0b"/>
        <circle cx="260" cy="78" r="55" fill="url(#lgrd1)" opacity=".25"/>
        {/* hero text lines */}
        <rect x="20" y="46" width="120" height="10" rx="2" fill="#ffffff" opacity=".9"/>
        <rect x="20" y="62" width="90" height="8" rx="2" fill="#ffffff" opacity=".6"/>
        <rect x="20" y="78" width="140" height="8" rx="2" fill="#ffffff" opacity=".4"/>
        <rect x="20" y="96" width="70" height="18" rx="4" fill="#00df81" opacity=".9"/>
        <rect x="98" y="99" width="50" height="12" rx="4" fill="#ffffff" opacity=".06" stroke="#ffffff" strokeWidth=".5" strokeOpacity=".15"/>
        {/* floating card */}
        <rect x="210" y="38" width="90" height="56" rx="8" fill="#0d1a14" stroke="#00df81" strokeWidth=".5" strokeOpacity=".4"/>
        <rect x="220" y="48" width="50" height="6" rx="2" fill="#00df81" opacity=".7"/>
        <rect x="220" y="60" width="70" height="4" rx="2" fill="#ffffff" opacity=".25"/>
        <rect x="220" y="68" width="55" height="4" rx="2" fill="#ffffff" opacity=".15"/>
        <rect x="220" y="78" width="32" height="10" rx="3" fill="#00df81" opacity=".15" stroke="#00df81" strokeWidth=".5"/>
        <text x="224" y="86.5" fill="#00df81" fontSize="6" fontFamily="monospace">+12 leads hoje</text>
        {/* section below */}
        <rect x="0" y="128" width="320" height="72" fill="#07120e"/>
        <rect x="20" y="140" width="60" height="6" rx="2" fill="#00df81" opacity=".5"/>
        <rect x="20" y="152" width="100" height="8" rx="2" fill="#ffffff" opacity=".6"/>
        <rect x="20" y="166" width="130" height="5" rx="2" fill="#ffffff" opacity=".2"/>
        <rect x="20" y="175" width="100" height="5" rx="2" fill="#ffffff" opacity=".12"/>
        {/* cards row */}
        <rect x="170" y="136" width="64" height="56" rx="6" fill="#0d1a14" stroke="#ffffff" strokeWidth=".3" strokeOpacity=".08"/>
        <rect x="180" y="144" width="44" height="4" rx="2" fill="#ffffff" opacity=".5"/>
        <rect x="180" y="152" width="36" height="4" rx="2" fill="#ffffff" opacity=".2"/>
        <rect x="180" y="162" width="44" height="14" rx="3" fill="#00df81" opacity=".08"/>
        <rect x="244" y="136" width="64" height="56" rx="6" fill="#0d1a14" stroke="#ffffff" strokeWidth=".3" strokeOpacity=".08"/>
        <rect x="254" y="144" width="44" height="4" rx="2" fill="#ffffff" opacity=".5"/>
        <rect x="254" y="152" width="30" height="4" rx="2" fill="#ffffff" opacity=".2"/>
        <rect x="254" y="162" width="44" height="14" rx="3" fill="#00df81" opacity=".08"/>
        <defs>
          <radialGradient id="lgrd1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00df81" stopOpacity=".6"/>
            <stop offset="100%" stopColor="#00df81" stopOpacity="0"/>
          </radialGradient>
        </defs>
      </svg>
    </BrowserChrome>
  );
}

/* 02 – Dashboard SaaS mockup */
function MockupDashboard() {
  const pts = "20,80 50,65 80,70 110,48 140,55 170,38 200,42 230,30 260,35";
  return (
    <BrowserChrome url="painel.suaempresa.com.br">
      <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg">
        {/* sidebar */}
        <rect x="0" y="0" width="56" height="200" fill="#050e09"/>
        <rect x="8" y="12" width="40" height="8" rx="2" fill="#00df81" opacity=".8"/>
        {[32,48,64,80,96].map((y,i) => (
          <rect key={i} x="8" y={y} width={i===0?40:28} height="6" rx="2" fill="#ffffff" opacity={i===0?.5:.15}/>
        ))}
        {/* main */}
        <rect x="56" y="0" width="264" height="200" fill="#060f0b"/>
        {/* header */}
        <rect x="64" y="8" width="100" height="7" rx="2" fill="#ffffff" opacity=".6"/>
        <rect x="244" y="6" width="68" height="12" rx="3" fill="#00df81" opacity=".15" stroke="#00df81" strokeWidth=".5"/>
        <text x="248" y="14.5" fill="#00df81" fontSize="6" fontFamily="monospace">+ Novo Relatório</text>
        {/* KPI cards */}
        {[
          {x:64,label:"FATURAMENTO",val:"R$ 82,4k",delta:"+12%"},
          {x:157,label:"CLIENTES",val:"34",delta:"+3"},
          {x:250,label:"TICKET MÉDIO",val:"R$ 2,4k",delta:"+6%"},
        ].map((k,i) => (
          <g key={i}>
            <rect x={k.x} y="24" width="85" height="44" rx="5" fill="#0a1a10" stroke="#ffffff" strokeWidth=".3" strokeOpacity=".1"/>
            <text x={k.x+8} y="35" fill="#ffffff" fontSize="5" fontFamily="monospace" opacity=".4">{k.label}</text>
            <text x={k.x+8} y="50" fill="#ffffff" fontSize="12" fontFamily="monospace" fontWeight="bold" opacity=".9">{k.val}</text>
            <text x={k.x+8} y="62" fill="#00df81" fontSize="6" fontFamily="monospace">{k.delta}</text>
          </g>
        ))}
        {/* chart area */}
        <rect x="64" y="76" width="170" height="84" rx="5" fill="#0a1a10" stroke="#ffffff" strokeWidth=".3" strokeOpacity=".1"/>
        <text x="72" y="88" fill="#ffffff" fontSize="6" fontFamily="monospace" opacity=".5">Faturamento mensal</text>
        {/* chart gridlines */}
        {[100,116,132,148].map((y,i)=>(
          <line key={i} x1="72" y1={y} x2="226" y2={y} stroke="#ffffff" strokeWidth=".3" strokeOpacity=".06"/>
        ))}
        {/* area fill */}
        <path d={`M${pts} L260,160 L20,160 Z`} fill="#00df81" fillOpacity=".06" transform="translate(52,70)"/>
        <polyline points={pts} stroke="#00df81" strokeWidth="1.5" fill="none" transform="translate(52,70)"
          strokeLinecap="round" strokeLinejoin="round"/>
        {/* dots */}
        {pts.split(" ").map((p,i)=>{const[px,py]=p.split(",").map(Number);return(
          <circle key={i} cx={px+52} cy={py+70} r="2" fill="#00df81"/>
        )})}
        {/* table */}
        <rect x="242" y="76" width="72" height="84" rx="5" fill="#0a1a10" stroke="#ffffff" strokeWidth=".3" strokeOpacity=".1"/>
        <text x="250" y="88" fill="#ffffff" fontSize="5" fontFamily="monospace" opacity=".4">CLIENTES</text>
        {[
          {name:"Studio Bela",status:"Ativo",color:"#00df81"},
          {name:"Grupo Andrade",status:"Pendente",color:"#f59e0b"},
          {name:"Nova Tech",status:"Ativo",color:"#00df81"},
          {name:"Clinica X",status:"Ativo",color:"#00df81"},
        ].map((c,i)=>(
          <g key={i}>
            <text x="250" y={101+i*16} fill="#ffffff" fontSize="5.5" fontFamily="monospace" opacity=".7">{c.name}</text>
            <rect x="290" y={94+i*16} width="18" height="9" rx="3" fill={c.color} fillOpacity=".15"/>
            <text x="292" y={100.5+i*16} fill={c.color} fontSize="4.5" fontFamily="monospace">{c.status}</text>
          </g>
        ))}
      </svg>
    </BrowserChrome>
  );
}

/* 03 – Soluções Especializadas: terminal + discord bot */
function MockupSpecialized() {
  return (
    <BrowserChrome url="app.discord.gg / minecraft.server">
      <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg">
        {/* terminal bg */}
        <rect x="0" y="0" width="180" height="200" fill="#030b06"/>
        <rect x="8" y="8" width="70" height="7" rx="2" fill="#00df81" opacity=".6"/>
        <text x="8" y="24" fill="#00df81" fontSize="6.5" fontFamily="monospace" opacity=".8">$ npm run deploy</text>
        <text x="8" y="36" fill="#ffffff" fontSize="6" fontFamily="monospace" opacity=".4">▸ Building project…</text>
        <text x="8" y="48" fill="#ffffff" fontSize="6" fontFamily="monospace" opacity=".4">▸ Optimizing assets…</text>
        <text x="8" y="60" fill="#00df81" fontSize="6" fontFamily="monospace" opacity=".9">✓ Build complete (4.2s)</text>
        <text x="8" y="72" fill="#ffffff" fontSize="6" fontFamily="monospace" opacity=".4">▸ Uploading to server…</text>
        <text x="8" y="84" fill="#00df81" fontSize="6" fontFamily="monospace" opacity=".9">✓ Deployed to prod</text>
        <text x="8" y="96" fill="#ffffff" fontSize="6" fontFamily="monospace" opacity=".3">▸ Running health check…</text>
        <text x="8" y="108" fill="#00df81" fontSize="6" fontFamily="monospace" opacity=".9">✓ All systems online</text>
        <text x="8" y="120" fill="#ffffff" fontSize="6" fontFamily="monospace" opacity=".2">$ _</text>
        {/* progress bar */}
        <rect x="8" y="135" width="160" height="5" rx="2" fill="#ffffff" opacity=".06"/>
        <rect x="8" y="135" width="148" height="5" rx="2" fill="#00df81" opacity=".7"/>
        <text x="8" y="152" fill="#00df81" fontSize="5.5" fontFamily="monospace" opacity=".5">100% · live em produção</text>
        {/* bot card */}
        <rect x="188" y="0" width="132" height="200" fill="#060f0b"/>
        <rect x="196" y="10" width="116" height="90" rx="6" fill="#0d1a14" stroke="#5865f2" strokeWidth=".5" strokeOpacity=".5"/>
        <rect x="204" y="18" width="32" height="32" rx="16" fill="#5865f2" opacity=".8"/>
        <text x="214" y="38" fill="#ffffff" fontSize="12" fontFamily="monospace">🤖</text>
        <text x="244" y="28" fill="#ffffff" fontSize="6" fontFamily="monospace" opacity=".7">AluraBot</text>
        <text x="244" y="38" fill="#5865f2" fontSize="5" fontFamily="monospace">BOT · Online</text>
        <rect x="204" y="56" width="96" height="5" rx="2" fill="#ffffff" opacity=".15"/>
        <text x="204" y="70" fill="#ffffff" fontSize="5.5" fontFamily="monospace" opacity=".5">/ping → Pong! 32ms</text>
        <text x="204" y="80" fill="#00df81" fontSize="5.5" fontFamily="monospace" opacity=".8">/status → Todos os serviços ok</text>
        <text x="204" y="90" fill="#ffffff" fontSize="5.5" fontFamily="monospace" opacity=".3">/players → 12/20 online</text>
        {/* minecraft card */}
        <rect x="196" y="110" width="116" height="82" rx="6" fill="#0d1a14" stroke="#00df81" strokeWidth=".5" strokeOpacity=".3"/>
        <text x="206" y="124" fill="#00df81" fontSize="6" fontFamily="monospace" opacity=".7">MINECRAFT SERVER</text>
        <rect x="206" y="130" width="96" height="4" rx="2" fill="#ffffff" opacity=".06"/>
        <rect x="206" y="130" width="57" height="4" rx="2" fill="#00df81" opacity=".6"/>
        <text x="206" y="145" fill="#ffffff" fontSize="5.5" fontFamily="monospace" opacity=".5">12 / 20 jogadores</text>
        {[
          {n:"Steve_42",ping:"28ms"},
          {n:"CrafterX",ping:"41ms"},
          {n:"NightOwl",ping:"18ms"},
        ].map((p,i)=>(
          <g key={i}>
            <text x="206" y={160+i*12} fill="#ffffff" fontSize="5" fontFamily="monospace" opacity=".5">{p.n}</text>
            <text x="282" y={160+i*12} fill="#00df81" fontSize="5" fontFamily="monospace" opacity=".7">{p.ping}</text>
          </g>
        ))}
      </svg>
    </BrowserChrome>
  );
}

/* 04 – Infraestrutura: server rack + deploy pipeline */
function MockupInfra() {
  return (
    <BrowserChrome url="infra.suaempresa.com.br">
      <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="svc-svg">
        <rect x="0" y="0" width="320" height="200" fill="#060f0b"/>
        {/* Pipeline header */}
        <text x="12" y="20" fill="#ffffff" fontSize="7" fontFamily="monospace" opacity=".6">Pipeline de Deploy</text>
        {/* stages */}
        {[
          {x:12,label:"Build",ok:true},
          {x:88,label:"Test",ok:true},
          {x:164,label:"Stage",ok:true},
          {x:240,label:"Prod",ok:true},
        ].map((s,i)=>(
          <g key={i}>
            <rect x={s.x} y="30" width="68" height="36" rx="5" fill={s.ok?"rgba(0,223,129,.07)":"rgba(239,68,68,.07)"} stroke={s.ok?"#00df81":"#ef4444"} strokeWidth=".6" strokeOpacity=".4"/>
            <text x={s.x+8} y="43" fill={s.ok?"#00df81":"#ef4444"} fontSize="5.5" fontFamily="monospace">{s.ok?"✓":"✗"} {s.label}</text>
            <text x={s.x+8} y="56" fill="#ffffff" fontSize="5" fontFamily="monospace" opacity=".3">{["4.2s","12s","8s","2s"][i]}</text>
            {i<3&&<line x1={s.x+68} y1="48" x2={s.x+88} y2="48" stroke="#00df81" strokeWidth=".8" strokeOpacity=".3" strokeDasharray="3,2"/>}
          </g>
        ))}
        {/* Server rack */}
        <rect x="12" y="80" width="140" height="110" rx="6" fill="#030b06" stroke="#ffffff" strokeWidth=".3" strokeOpacity=".08"/>
        <text x="20" y="95" fill="#ffffff" fontSize="5.5" fontFamily="monospace" opacity=".4">RACK — Slot A</text>
        {[
          {label:"Web 01",cpu:72,status:"ok"},
          {label:"Web 02",cpu:45,status:"ok"},
          {label:"DB Primary",cpu:88,status:"warn"},
          {label:"DB Replica",cpu:31,status:"ok"},
          {label:"Cache",cpu:15,status:"ok"},
        ].map((r,i)=>(
          <g key={i}>
            <rect x="20" y={102+i*17} width="124" height="12" rx="3" fill="#0a1a10" stroke="#ffffff" strokeWidth=".3" strokeOpacity=".07"/>
            <circle cx="28" cy={108+i*17} r="3" fill={r.status==="ok"?"#00df81":"#f59e0b"} opacity=".9"/>
            <text x="35" y={110.5+i*17} fill="#ffffff" fontSize="5.5" fontFamily="monospace" opacity=".6">{r.label}</text>
            <rect x="100" y={104+i*17} width="36" height="6" rx="2" fill="#ffffff" opacity=".05"/>
            <rect x="100" y={104+i*17} width={36*r.cpu/100} height="6" rx="2" fill={r.status==="ok"?"#00df81":"#f59e0b"} opacity=".7"/>
            <text x="139" y={110.5+i*17} fill="#ffffff" fontSize="4.5" fontFamily="monospace" opacity=".4">{r.cpu}%</text>
          </g>
        ))}
        {/* Metrics sidebar */}
        <rect x="164" y="80" width="144" height="110" rx="6" fill="#030b06" stroke="#ffffff" strokeWidth=".3" strokeOpacity=".08"/>
        <text x="172" y="95" fill="#ffffff" fontSize="5.5" fontFamily="monospace" opacity=".4">MÉTRICAS — 30d</text>
        {[
          {label:"Uptime",val:"99.98%",color:"#00df81"},
          {label:"Latência",val:"18ms",color:"#00df81"},
          {label:"Requests",val:"2.4M",color:"#00df81"},
          {label:"Erros",val:"0.01%",color:"#f59e0b"},
        ].map((m,i)=>(
          <g key={i}>
            <text x="172" y={108+i*22} fill="#ffffff" fontSize="5" fontFamily="monospace" opacity=".35">{m.label}</text>
            <text x="172" y={120+i*22} fill={m.color} fontSize="9" fontFamily="monospace" fontWeight="bold" opacity=".9">{m.val}</text>
          </g>
        ))}
      </svg>
    </BrowserChrome>
  );
}

/* ── Service data ─────────────────────────────────────────── */
const SERVICES = [
  {
    num: "01",
    tag: "Presença Digital",
    title: (
      <>
        Sites que fazem o{" "}
        <span className="svc-title-accent" style={{ color: "var(--color-caribbean-green, #00df81)" }}>
          visitante virar contato.
        </span>
      </>
    ),
    description: "Criamos landing pages e sites institucionais focados em conversão — do primeiro clique ao primeiro contato com o seu negócio.",
    chips: ["Landing Pages", "Websites", "Interfaces Web", "Identidade Digital"],
    telemetry: { label: "Performance LCP", value: "98/100", metric: "< 0.8s" },
    mockup: <MockupLanding />,
    reverse: false,
  },
  {
    num: "02",
    tag: "Operação Inteligente",
    title: (
      <>
        Sistemas que organizam{" "}
        <span className="svc-title-accent" style={{ color: "var(--color-caribbean-green, #00df81)" }}>
          o que hoje roda solto.
        </span>
      </>
    ),
    description: "Dashboards, CRMs e plataformas sob medida que substituem planilhas e mensagens dispersas por um painel único e em tempo real.",
    chips: ["Dashboards", "SaaS", "CRM", "Automações", "Integrações"],
    telemetry: { label: "Arquitetura", value: "Micro-frontends", metric: "Multi-tenant" },
    mockup: <MockupDashboard />,
    reverse: true,
  },
  {
    num: "03",
    tag: "Tecnologia Especializada",
    title: (
      <>
        Soluções para o que{" "}
        <span className="svc-title-accent" style={{ color: "var(--color-caribbean-green, #00df81)" }}>
          ninguém mais resolve.
        </span>
      </>
    ),
    description: "Bots, servidores de jogos, automações e integrações avançadas — projetos fora do comum que exigem conhecimento técnico real.",
    chips: ["Bots Discord", "Servidores Minecraft", "Automações", "Integrações"],
    telemetry: { label: "Protocolos", value: "WebSockets & gRPC", metric: "Baixa latência" },
    mockup: <MockupSpecialized />,
    reverse: false,
  },
  {
    num: "04",
    tag: "Infraestrutura",
    title: (
      <>
        Deploy confiável,{" "}
        <span className="svc-title-accent" style={{ color: "var(--color-caribbean-green, #00df81)" }}>
          ambiente robusto.
        </span>
      </>
    ),
    description: "Configuramos e gerenciamos a infraestrutura do seu projeto — servidores Linux, pipelines CI/CD e ambientes de alta disponibilidade.",
    chips: ["Linux", "Deploy", "CI/CD", "Alta Disponibilidade"],
    telemetry: { label: "Disponibilidade", value: "Zero Downtime", metric: "Rollback < 5s" },
    mockup: <MockupInfra />,
    reverse: true,
  },
];

/* ── Component ───────────────────────────────────────────── */
export default function Services() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return; // conteúdo já nasce visível via HTML/CSS normal — nada a fazer.

    // Tudo que a animação for esconder e revelar é registrado aqui.
    // Se qualquer coisa der errado no meio do caminho, o catch força
    // opacity:1 em tudo — nunca fica conteúdo preso invisível.
    const touched: HTMLElement[] = [];
    let scope: Scope | null = null;

    try {
      scope = createScope({ root }).add(() => {
        /* ---- Cada painel de serviço ---- */
        root.querySelectorAll<HTMLElement>(".svc-panel-inner").forEach((panel) => {
          const isReverse = !!panel.closest(".svc-panel--reverse");
          const mockup = panel.querySelector<HTMLElement>(".svc-mockup-col");
          const tag = panel.querySelector<HTMLElement>(".svc-tag");
          const title = panel.querySelector<HTMLElement>(".svc-title");
          const desc = panel.querySelector<HTMLElement>(".svc-desc");
          const chips = panel.querySelectorAll<HTMLElement>(".svc-chip");
          [mockup, tag, desc, ...Array.from(chips)].forEach((el) => el && touched.push(el));

          const panelTl = createTimeline({
            autoplay: onScroll({ target: panel, enter: "bottom top" }),
          });

          if (mockup) {
            panelTl.add(mockup, {
              opacity: [0, 1],
              translateX: [isReverse ? 50 : -50, 0],
              scale: [0.95, 1],
              duration: 900,
              easing: "easeOutExpo",
            }, 0);
          }
          if (tag) {
            panelTl.add(tag, {
              opacity: [0, 1],
              scale: [0.85, 1],
              duration: 450,
              easing: "easeOutQuad",
            }, 0);
          }
          if (title) {
            const split = splitText(title, { words: true });
            touched.push(...split.words);
            panelTl.add(split.words, {
              opacity: [0, 1],
              translateY: [26, 0],
              duration: 600,
              delay: stagger(35),
              easing: "easeOutExpo",
            }, 120);
          }
          if (desc) {
            panelTl.add(desc, {
              opacity: [0, 1],
              translateY: [14, 0],
              duration: 550,
              easing: "easeOutQuad",
            }, 320);
          }
          if (chips.length) {
            panelTl.add(chips, {
              opacity: [0, 1],
              translateY: [10, 0],
              scale: [0.9, 1],
              duration: 500,
              delay: stagger(55),
              easing: "easeOutBack",
            }, 420);
          }
        });

        /* ---- Painel "em breve" (hospedagem) ---- */
        const standby = root.querySelector<HTMLElement>(".svc-panel--standby .svc-panel-inner");
        if (standby) {
          const tag = standby.querySelector<HTMLElement>(".svc-tag");
          const title = standby.querySelector<HTMLElement>(".svc-title");
          const desc = standby.querySelector<HTMLElement>(".svc-desc");
          [tag, title, desc].forEach((el) => el && touched.push(el));

          const standbyTl = createTimeline({
            autoplay: onScroll({ target: standby, enter: "bottom top" }),
          });
          [tag, title, desc].forEach((el, i) => {
            if (!el) return;
            standbyTl.add(el, {
              opacity: [0, 1],
              translateY: [18, 0],
              duration: 600,
              easing: "easeOutQuad",
            }, i * 120);
          });
        }
      });
    } catch (err) {
      // Rede de segurança: nunca deixar conteúdo travado invisível.
      touched.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      console.error("[Services] animação falhou, conteúdo forçado a visível:", err);
    }

    return () => scope?.revert();
  }, []);

  return (
    <section className="services-section" id="servicos" ref={rootRef}>

      {/* SVG diagonal circuit lines layer */}
      <svg className="svc-bg-svg" aria-hidden viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="svc-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        {/* Path 1 — top-left diagonal sweep */}
        <path id="sp1" d="M-40,80 C200,90 400,200 720,220 C1040,240 1280,160 1480,180" fill="none" stroke="rgba(0,223,129,0.15)" strokeWidth="1" strokeDasharray="6,10"/>
        <circle r="3.5" fill="#00df81" filter="url(#svc-glow)" opacity="0.4">
          <animateMotion dur="9s" repeatCount="indefinite" begin="0s"><mpath href="#sp1"/></animateMotion>
        </circle>

        {/* Path 2 — mid descending */}
        <path id="sp2" d="M1480,280 C1200,320 900,380 600,360 C300,340 100,420 -40,460" fill="none" stroke="rgba(0,223,129,0.12)" strokeWidth="1" strokeDasharray="4,14"/>
        <circle r="3" fill="#00df81" filter="url(#svc-glow)" opacity="0.35">
          <animateMotion dur="12s" repeatCount="indefinite" begin="1.5s"><mpath href="#sp2"/></animateMotion>
        </circle>

        {/* Path 3 — steep diagonal top-right */}
        <path id="sp3" d="M-40,340 C300,300 600,450 900,420 C1100,400 1300,320 1480,350" fill="none" stroke="rgba(0,223,129,0.1)" strokeWidth="1" strokeDasharray="8,12"/>
        <circle r="3.2" fill="#00df81" filter="url(#svc-glow)" opacity="0.38">
          <animateMotion dur="10s" repeatCount="indefinite" begin="3s"><mpath href="#sp3"/></animateMotion>
        </circle>

        {/* Path 4 — lower wide arc */}
        <path id="sp4" d="M1480,540 C1100,500 800,600 500,580 C200,560 0,640 -40,660" fill="none" stroke="rgba(0,223,129,0.13)" strokeWidth="1" strokeDasharray="5,10"/>
        <circle r="3" fill="#00df81" filter="url(#svc-glow)" opacity="0.32">
          <animateMotion dur="14s" repeatCount="indefinite" begin="5s"><mpath href="#sp4"/></animateMotion>
        </circle>

        {/* Path 5 — bottom gentle rise */}
        <path id="sp5" d="M-40,760 C300,720 700,800 1100,760 C1280,745 1400,780 1480,770" fill="none" stroke="rgba(0,223,129,0.1)" strokeWidth="1" strokeDasharray="3,12"/>
        <circle r="2.8" fill="#00df81" filter="url(#svc-glow)" opacity="0.34">
          <animateMotion dur="11s" repeatCount="indefinite" begin="2s"><mpath href="#sp5"/></animateMotion>
        </circle>
      </svg>

      {/* Full-screen panels — one per service */}
      {SERVICES.map((s) => (
        <div key={s.num} className={`svc-panel${s.reverse ? " svc-panel--reverse" : ""}`}>
          <div className="svc-panel-inner services-container">
            <div className="svc-mockup-col">
              <TiltCard maxTilt={6} scale={1.01} spotlight={true}>
                {s.mockup}
              </TiltCard>
            </div>
            <div className="svc-text-col">
              <span className="svc-tag">{s.tag}</span>
              <h3 className="svc-title">{s.title}</h3>
              <p className="svc-desc">{s.description}</p>
              
              {/* Telemetria de Engenharia */}
              <div className="svc-telemetry-badge">
                <span className="svc-telemetry-dot" />
                <span className="svc-telemetry-label">{s.telemetry.label}:</span>
                <span className="svc-telemetry-val">{s.telemetry.value}</span>
                <span className="svc-telemetry-metric">({s.telemetry.metric})</span>
              </div>

              <div className="svc-chips">
                {s.chips.map((c) => (
                  <span key={c} className="svc-chip">{c}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="svc-panel-divider" />
        </div>
      ))}

      {/* 05 – Hospedagem standby */}
      <div className="svc-panel svc-panel--standby">
        <div className="svc-panel-inner services-container svc-panel-inner--center">
          <span className="svc-tag">Hospedagem</span>
          <h3 className="svc-title">
            <span className="svc-title-accent" style={{ color: "var(--color-caribbean-green, #00df81)" }}>
              Nossa própria infraestrutura. Em breve.
            </span>
          </h3>
          <p className="svc-desc">Estamos construindo uma plataforma de hospedagem proprietária para entregar mais performance, controle e custo-benefício.</p>
          <span className="svc-chip svc-chip--soon">Em Breve</span>
        </div>
      </div>

    </section>
  );
}
