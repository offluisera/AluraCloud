"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";

/**
 * LoadingScreen — V3.1 (Refined High-Engineering Studio Boot Protocol)
 * - Blueprint CAD silhouette + luminous laser trace overlay
 * - Discrete seam flash only during shutter aperture split (zero text overlap)
 * - Calibrated scale, optical vertex bloom, and precision gauge
 * - Escape key instant skip & prefers-reduced-motion
 */

interface TelemetryStep {
  threshold: number;
  label: string;
  code: string;
}

const TELEMETRY_STEPS: TelemetryStep[] = [
  { threshold: 0, label: "CALIBRANDO BLUEPRINT GRID...", code: "SYS.01 // BLUEPRINT_MESH" },
  { threshold: 28, label: "INICIALIZANDO TOPOLOGIA DE NUVEM...", code: "SYS.02 // CLOUD_TOPOLOGY" },
  { threshold: 65, label: "COMPONDO ARQUITETURA DISTRIBUÍDA...", code: "SYS.03 // DISTRIBUTED_KERNEL" },
  { threshold: 92, label: "ESTÚDIO PRONTO • SISTEMAS OPERACIONAIS", code: "SYS.04 // RUNTIME_ACTIVE" },
];

const TARGET_DURATION_MS = 1750;
const EXIT_SHUTTER_MS = 700;

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"running" | "finishing" | "exiting" | "done">("running");
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const currentStep = useMemo(() => {
    for (let i = TELEMETRY_STEPS.length - 1; i >= 0; i--) {
      if (progress >= TELEMETRY_STEPS[i].threshold) {
        return TELEMETRY_STEPS[i];
      }
    }
    return TELEMETRY_STEPS[0];
  }, [progress]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setPhase("done");
      return;
    }

    startTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;
      const t = Math.min(1, elapsed / TARGET_DURATION_MS);

      // Easing com aceleração suave e retenção elegante nos 100%
      const eased = t < 0.75 
        ? Math.pow(t / 0.75, 1.3) * 0.85 
        : 0.85 + Math.pow((t - 0.75) / 0.25, 1.6) * 0.15;
      
      const currentPct = Math.min(100, Math.round(eased * 100));
      setProgress(currentPct);

      if (t < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        setPhase("finishing");
        setTimeout(() => {
          setPhase("exiting");
          setTimeout(() => {
            setPhase("done");
          }, EXIT_SHUTTER_MS);
        }, 220);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        setProgress(100);
        setPhase("exiting");
        setTimeout(() => setPhase("done"), EXIT_SHUTTER_MS);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (phase === "done") return null;

  const normProgress = progress / 100;
  const isExiting = phase === "exiting";
  const isFinishing = phase === "finishing";

  // Fator progressivo para cada camada do monograma
  const mainOffset = Math.max(0, 1 - normProgress / 0.6);
  const crossOffset = Math.max(0, 1 - Math.max(0, (normProgress - 0.25) / 0.5));
  const meshOpacity = Math.min(0.65, Math.max(0, (normProgress - 0.35) * 1.5));
  const nodeScale = Math.min(1, Math.max(0, (normProgress - 0.5) / 0.5));

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label="Carregando Alura Cloud Studio"
      className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
      style={{
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* ============================================================ */}
      {/* SHUTTERS ARQUITETÔNICOS (CORTINA DUPLA VERTICAL BIPARTIDA)   */}
      {/* ============================================================ */}
      {/* Shutter Superior */}
      <div
        className="absolute top-0 left-0 w-full h-1/2 bg-[#020706] transition-transform ease-[cubic-bezier(0.85,0,0.15,1)]"
        style={{
          transform: isExiting ? "translateY(-100%)" : "translateY(0%)",
          transitionDuration: `${EXIT_SHUTTER_MS}ms`,
          willChange: "transform",
        }}
      />
      {/* Shutter Inferior */}
      <div
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#020706] transition-transform ease-[cubic-bezier(0.85,0,0.15,1)]"
        style={{
          transform: isExiting ? "translateY(100%)" : "translateY(0%)",
          transitionDuration: `${EXIT_SHUTTER_MS}ms`,
          willChange: "transform",
        }}
      />

      {/* Laser Aperture Flash: pulsa apenas no momento exato da abertura */}
      <div
        className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 pointer-events-none transition-all duration-300 z-10"
        style={{
          background: "linear-gradient(90deg, transparent 5%, #00FFB3 50%, transparent 95%)",
          opacity: isFinishing ? 1 : isExiting ? 0.3 : 0,
          boxShadow: isFinishing ? "0 0 15px #00FFB3, 0 0 30px #00FFB3" : "none",
        }}
      />

      {/* ============================================================ */}
      {/* MALHA DE BLUEPRINT CARTESIANO DE FUNDO                       */}
      {/* ============================================================ */}
      <div
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{ opacity: isExiting ? 0 : 0.35 }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="loader-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00DF81" strokeWidth="0.5" strokeOpacity="0.15" />
              <path d="M 20 18 L 20 22 M 18 20 L 22 20" stroke="#00FFB3" strokeWidth="0.4" strokeOpacity="0.25" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loader-grid)" />
        </svg>
      </div>

      {/* ============================================================ */}
      {/* HUD DE TELEMETRIA NOS CANTOS (PADRÃO ESTÚDIO DE ENGENHARIA) */}
      {/* ============================================================ */}
      <div
        className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between pointer-events-none transition-all duration-400 z-20"
        style={{
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? "scale(0.98)" : "scale(1)",
        }}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between text-[10px] md:text-[11px] font-mono tracking-wider text-[#4E7068]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#00FFB3] animate-pulse shadow-[0_0_8px_#00FFB3]" />
            <span className="text-[#A3C7BD] font-medium">SYS.INIT // REGION: SA-EAST-1</span>
            <span className="hidden sm:inline text-[#2A423D]">|</span>
            <span className="hidden sm:inline">LATENCY: 12ms</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#2A423D] hidden sm:inline">ENGINE: v4.8.2</span>
            <span className="border border-[#00DF81]/30 px-2 py-0.5 rounded text-[#00FFB3] bg-[#00DF81]/5">
              AUTÔNOMO
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between text-[10px] md:text-[11px] font-mono tracking-wider text-[#4E7068]">
          <div className="flex items-center gap-2">
            <span className="text-[#6E958B]">ALURA CLOUD</span>
            <span className="text-[#2A423D]">•</span>
            <span className="text-[#4E7068]">ESTÚDIO DE ENGENHARIA DIGITAL</span>
          </div>
          <div className="flex items-center gap-2 text-[#3D5C54]">
            <kbd className="px-1.5 py-0.5 bg-[#081714] border border-[#163830] rounded text-[#00FFB3] text-[9px]">
              ESC
            </kbd>
            <span className="hidden sm:inline">PULAR BOOT</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CONTEÚDO CENTRAL: MONOGRAMA CAD 3D + GAUGE + PORCENTAGEM     */}
      {/* ============================================================ */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto transition-all duration-500 z-20"
        style={{
          opacity: isExiting ? 0 : 1,
          transform: isExiting ? "scale(1.05)" : "scale(1)",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Glow de fundo que acompanha a energia acumulada */}
        <div
          className="absolute w-80 h-80 rounded-full pointer-events-none transition-all duration-700 -z-10"
          style={{
            background:
              "radial-gradient(circle, rgba(0,255,179,0.18) 0%, rgba(0,223,129,0.06) 45%, transparent 70%)",
            filter: "blur(45px)",
            transform: `scale(${0.75 + normProgress * 0.45})`,
            opacity: normProgress > 0.05 ? 1 : 0,
          }}
        />

        {/* 1. MONOGRAMA "A" 3D WIREFRAME PARAMÉTRICO VETORIAL */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6">
          <svg
            viewBox="0 0 1000 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible"
            style={{
              filter: "drop-shadow(0 0 20px rgba(0,255,179,0.4))",
            }}
          >
            <defs>
              <filter id="wire-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* CAMADA 0: Esquema Blueprint em Marca d'Água (visível desde o primeiro milissegundo) */}
            <g
              stroke="#00FFB3"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.14"
            >
              {/* Contornos mestres */}
              <path d="M 430 160 L 570 160" />
              <path d="M 430 160 L 120 840" />
              <path d="M 570 160 L 880 840" />
              <path d="M 500 360 L 340 840" />
              <path d="M 500 360 L 660 840" />
              <path d="M 120 840 L 340 840" />
              <path d="M 660 840 L 880 840" />
              {/* Crossbars */}
              <path d="M 246 560 L 754 560" />
              <path d="M 205 650 L 795 650" />
              {/* Malha fina interna */}
              <path d="M 430 160 L 500 270" />
              <path d="M 570 160 L 500 270" />
              <path d="M 500 270 L 500 360" />
              <path d="M 475 175 L 230 840" />
              <path d="M 525 175 L 770 840" />
              <path d="M 335 360 L 500 360" />
              <path d="M 500 360 L 665 360" />
              <path d="M 412 560 L 632 650" />
              <path d="M 588 560 L 368 650" />
            </g>

            {/* CAMADA 1: Traçados Laser Mestres Ativos (Progressivo) */}
            <g
              stroke="#00FFB3"
              strokeWidth="26"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#wire-glow)"
              style={{
                strokeDasharray: "800",
                strokeDashoffset: `${800 * mainOffset}`,
                transition: "stroke-dashoffset 60ms linear",
              }}
            >
              <path d="M 430 160 L 570 160" />
              <path d="M 430 160 L 120 840" />
              <path d="M 570 160 L 880 840" />
              <path d="M 500 360 L 340 840" />
              <path d="M 500 360 L 660 840" />
              <path d="M 120 840 L 340 840" strokeWidth="22" />
              <path d="M 660 840 L 880 840" strokeWidth="22" />
            </g>

            {/* CAMADA 2: Travessas Horizontais (Crossbars) */}
            <g
              stroke="#00FFB3"
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
              filter="url(#wire-glow)"
              style={{
                strokeDasharray: "600",
                strokeDashoffset: `${600 * crossOffset}`,
                transition: "stroke-dashoffset 60ms linear",
              }}
            >
              <path d="M 246 560 L 754 560" />
              <path d="M 205 650 L 795 650" />
            </g>

            {/* CAMADA 3: Malha Wireframe Interna 3D (Desabrochar suave) */}
            <g
              stroke="#00FFB3"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: meshOpacity,
                transition: "opacity 100ms ease",
              }}
            >
              <path d="M 430 160 L 500 270" />
              <path d="M 570 160 L 500 270" />
              <path d="M 500 270 L 500 360" />
              <path d="M 380 260 L 620 260" />
              <path d="M 475 175 L 230 840" strokeWidth="12" />
              <path d="M 525 175 L 770 840" strokeWidth="12" />
              <path d="M 335 360 L 500 360" />
              <path d="M 500 360 L 665 360" />
              <path d="M 412 560 L 632 650" strokeWidth="12" />
              <path d="M 588 560 L 368 650" strokeWidth="12" />
              <path d="M 368 650 L 620 745" />
              <path d="M 632 650 L 380 745" />
            </g>

            {/* CAMADA 4: Nós Luminosos nos Vértices */}
            <g
              fill="#00FFB3"
              filter="url(#wire-glow)"
              style={{
                opacity: nodeScale,
                transform: `scale(${0.6 + nodeScale * 0.4})`,
                transformOrigin: "center",
                transition: "opacity 120ms ease, transform 120ms ease",
              }}
            >
              <circle cx="430" cy="160" r="30" />
              <circle cx="570" cy="160" r="30" />
              <circle cx="500" cy="360" r="26" />
              <circle cx="246" cy="560" r="24" />
              <circle cx="754" cy="560" r="24" />
              <circle cx="205" cy="650" r="24" />
              <circle cx="795" cy="650" r="24" />
              <circle cx="120" cy="840" r="30" />
              <circle cx="340" cy="840" r="30" />
              <circle cx="660" cy="840" r="30" />
              <circle cx="880" cy="840" r="30" />
            </g>
          </svg>
        </div>

        {/* 2. IDENTIDADE DO ESTÚDIO */}
        <div className="flex flex-col items-center gap-1 mb-5 text-center">
          <span className="text-white text-base md:text-lg font-bold tracking-[0.24em] uppercase">
            ALURA CLOUD
          </span>
          <span className="text-[11px] md:text-xs font-mono tracking-[0.16em] uppercase text-[#628A80]">
            ESTÚDIO DE ENGENHARIA DIGITAL
          </span>
        </div>

        {/* 3. DISPLAY NUMÉRICO DE ALTA PRECISÃO (00% -> 100%) */}
        <div className="flex items-baseline gap-1 font-mono mb-4">
          <span className="text-3xl md:text-4xl font-semibold text-[#00FFB3] tracking-wider tabular-nums drop-shadow-[0_0_12px_rgba(0,255,179,0.55)]">
            {progress.toString().padStart(2, "0")}
          </span>
          <span className="text-xs font-mono text-[#00DF81]/70 tracking-wider">
            %
          </span>
        </div>

        {/* 4. GAUGE DE CALIBRAÇÃO TÉCNICA (BARRA COM RÉGUA DE PRECISÃO) */}
        <div className="w-64 md:w-80 flex flex-col gap-2">
          {/* Caixa do Gauge com cantos chanfrados e réguas */}
          <div className="relative h-2 w-full bg-[#05110F] border border-[#143B33] rounded-sm p-[1px] overflow-hidden">
            {/* Ticks de escala métrica dentro do trilho */}
            <div
              className="absolute inset-0 flex justify-between px-1 pointer-events-none opacity-25"
              aria-hidden
            >
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-[1px] h-full bg-[#00FFB3]" />
              ))}
            </div>

            {/* Barra Ativa Laser */}
            <div
              className="h-full rounded-[1px] transition-all duration-75 ease-out relative"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #00995C 0%, #00DF81 60%, #00FFB3 100%)",
                boxShadow: "0 0 10px rgba(0, 255, 179, 0.75)",
              }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white opacity-90 shadow-[0_0_8px_#fff]" />
            </div>
          </div>

          {/* Marcadores de início e fim da régua */}
          <div className="flex justify-between text-[9px] font-mono text-[#3A5C54]">
            <span>[ 000_INIT ]</span>
            <span className="text-[#00FFB3]/80">{currentStep.code}</span>
            <span>[ 100_LOAD ]</span>
          </div>
        </div>

        {/* 5. FEEDBACK TÉCNICO DE ETAPA (DIAGNÓSTICO DINÂMICO) */}
        <div className="mt-4 h-5 flex items-center justify-center">
          <span className="text-[11px] font-mono tracking-wider text-[#A2C7BC] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FFB3] animate-ping" />
            {currentStep.label}
          </span>
        </div>
      </div>
    </div>
  );
}
