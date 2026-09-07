'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface AnimatedGeometricAProps {
  className?: string;
  intensity?: number;
}

export function AnimatedGeometricA({ className = '', intensity = 1 }: AnimatedGeometricAProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const backGlowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const paths = svg.querySelectorAll<SVGPathElement>('.geo-path');
    if (!paths || paths.length === 0) return;

    // 1. Configura comprimentos para efeito de traçado fino
    paths.forEach((path) => {
      let length = 400;
      try {
        length = path.getTotalLength();
      } catch {
        length = 400;
      }
      if (!length || isNaN(length)) length = 400;

      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.transition = 'none';
    });

    // 2. Cria a timeline cinematográfica de construção do A (duração total ~1.6s)
    const tl = gsap.timeline({ paused: true });

    // Etapa 1: Linhas mestras estruturais (contornos externos e pernas)
    tl.to(
      svg.querySelectorAll('.geo-main'),
      {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: 'power2.inOut',
        stagger: 0.08,
      },
      0
    );

    // Etapa 2: Barra horizontal central (crossbar)
    tl.to(
      svg.querySelectorAll('.geo-crossbar'),
      {
        strokeDashoffset: 0,
        duration: 0.7,
        ease: 'power2.inOut',
        stagger: 0.06,
      },
      0.35
    );

    // Etapa 3: Malha wireframe interna e triangulações 3D
    tl.to(
      svg.querySelectorAll('.geo-mesh'),
      {
        strokeDashoffset: 0,
        duration: 1.0,
        ease: 'power1.inOut',
        stagger: {
          amount: 0.6,
          from: 'random',
        },
      },
      0.5
    );

    // Etapa 4: Glow estrutural das linhas principais
    tl.to(
      svg.querySelector('#geo-glow-group'),
      {
        opacity: 0.6 * intensity,
        duration: 0.6,
        ease: 'power1.out',
      },
      0.9
    );

    // Etapa 5: Nós luminosos se acendem nas interseções
    tl.to(
      svg.querySelectorAll('.geo-node'),
      {
        opacity: 1 * intensity,
        scale: 1,
        duration: 0.5,
        stagger: {
          amount: 0.4,
          from: 'center',
        },
        ease: 'back.out(2)',
      },
      1.1
    );

    // Etapa 6: Reflexo inferior no chão
    tl.to(
      svg.querySelector('.geo-reflection'),
      {
        opacity: 0.5 * intensity,
        duration: 0.6,
        ease: 'power2.out',
      },
      1.2
    );

    // Etapa 7: Glow volumétrico de fundo floresce quando o A termina de se formar
    if (backGlowRef.current) {
      tl.to(
        backGlowRef.current,
        {
          opacity: 1 * intensity,
          scale: 1,
          duration: 1.1,
          ease: 'power2.out',
        },
        1.1
      );
    }

    // Animação sutil de pulsação perpétua nos nós principais
    const pulseTween = gsap.to(svg.querySelectorAll('.geo-pulse-node'), {
      opacity: 0.6,
      duration: 2.2,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      paused: true,
    });

    // Pulsação suave contínua do glow de fundo
    const glowPulse = backGlowRef.current
      ? gsap.to(backGlowRef.current, {
          opacity: 0.68 * intensity,
          scale: 0.94,
          duration: 3.2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
          paused: true,
        })
      : null;

    tl.eventCallback('onComplete', () => {
      pulseTween.play();
      glowPulse?.play();
    });

    // 3. Controle por ScrollTrigger (se disponível)
    let st: ScrollTrigger | null = null;
    try {
      st = ScrollTrigger.create({
        trigger: container,
        start: 'top 85%',
        end: 'bottom 20%',
        onEnter: () => tl.play(),
        onEnterBack: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      });
    } catch (e) {
      console.warn('ScrollTrigger creation warning:', e);
    }

    // 4. Fallback garantido via IntersectionObserver (nunca falha se o ScrollTrigger for resetado)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tl.play();
          } else if (entry.boundingClientRect.top > 0) {
            tl.reverse();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(container);

    return () => {
      st?.kill();
      observer.disconnect();
      pulseTween.kill();
      glowPulse?.kill();
      tl.kill();
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center w-full max-w-[460px] aspect-square select-none ${className}`}
      aria-hidden="true"
    >
      {/* Luz ambiente de fundo que floresce e pulsa quando o A termina de se formar */}
      <div
        ref={backGlowRef}
        className="absolute inset-0 m-auto w-[82%] h-[82%] rounded-full pointer-events-none opacity-0 scale-75"
        style={{
          background:
            'radial-gradient(circle, rgba(0, 255, 179, 0.28) 0%, rgba(0, 223, 129, 0.12) 40%, rgba(0, 255, 179, 0.02) 65%, transparent 80%)',
          filter: 'blur(45px)',
        }}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 1000 1000"
        className="w-full h-full relative z-10 overflow-visible"
        style={{ filter: 'drop-shadow(0 0 25px rgba(0, 255, 179, 0.18))' }}
      >
        <defs>
          {/* Filtros de Glow */}
          <filter id="a-glow-bright" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="a-glow-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradiente de reflexo no chão */}
          <linearGradient id="reflection-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00FFB3" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#00FFB3" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ============================================================ */}
        {/* GLOW DE FUNDO (Cópias das linhas mestras com blur)           */}
        {/* ============================================================ */}
        <g
          id="geo-glow-group"
          opacity="0"
          stroke="#00FFB3"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#a-glow-bright)"
        >
          <path d="M 430 160 L 120 840" />
          <path d="M 570 160 L 880 840" />
          <path d="M 430 160 L 570 160" />
          <path d="M 500 360 L 340 840" />
          <path d="M 500 360 L 660 840" />
          <path d="M 246 560 L 754 560" />
          <path d="M 205 650 L 795 650" />
        </g>

        {/* ============================================================ */}
        {/* 1. MALHA WIREFRAME INTERNA (Triangulações 3D finas)           */}
        {/* ============================================================ */}
        <g
          stroke="#00FFB3"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={0.35 * intensity}
        >
          {/* Topo / Pirâmide superior */}
          <path className="geo-path geo-mesh" d="M 430 160 L 500 270" />
          <path className="geo-path geo-mesh" d="M 570 160 L 500 270" />
          <path className="geo-path geo-mesh" d="M 500 270 L 500 360" />
          <path className="geo-path geo-mesh" d="M 380 260 L 620 260" />
          <path className="geo-path geo-mesh" d="M 380 260 L 500 360" />
          <path className="geo-path geo-mesh" d="M 620 260 L 500 360" />

          {/* Nervuras centrais (Spine 3D) de cada perna */}
          <path className="geo-path geo-mesh" d="M 475 175 L 230 840" strokeWidth="1.6" />
          <path className="geo-path geo-mesh" d="M 525 175 L 770 840" strokeWidth="1.6" />

          {/* Nervuras transversais - Perna Esquerda */}
          <path className="geo-path geo-mesh" d="M 335 360 L 500 360" />
          <path className="geo-path geo-mesh" d="M 290 460 L 450 460" />
          <path className="geo-path geo-mesh" d="M 162 745 L 358 745" />

          {/* Nervuras transversais - Perna Direita */}
          <path className="geo-path geo-mesh" d="M 500 360 L 665 360" />
          <path className="geo-path geo-mesh" d="M 550 460 L 710 460" />
          <path className="geo-path geo-mesh" d="M 642 745 L 838 745" />

          {/* Diagonais - Y=160 a 360 */}
          <path className="geo-path geo-mesh" d="M 430 160 L 475 265" />
          <path className="geo-path geo-mesh" d="M 475 265 L 335 360" />
          <path className="geo-path geo-mesh" d="M 570 160 L 525 265" />
          <path className="geo-path geo-mesh" d="M 525 265 L 665 360" />

          {/* Diagonais - Y=360 a 460 */}
          <path className="geo-path geo-mesh" d="M 335 360 L 370 460" />
          <path className="geo-path geo-mesh" d="M 450 460 L 335 360" />
          <path className="geo-path geo-mesh" d="M 665 360 L 630 460" />
          <path className="geo-path geo-mesh" d="M 550 460 L 665 360" />

          {/* Diagonais - Y=460 a 560 */}
          <path className="geo-path geo-mesh" d="M 290 460 L 307 560" />
          <path className="geo-path geo-mesh" d="M 450 460 L 246 560" />
          <path className="geo-path geo-mesh" d="M 710 460 L 693 560" />
          <path className="geo-path geo-mesh" d="M 550 460 L 754 560" />

          {/* Triangulações internas da Crossbar (X wireframe) */}
          <path className="geo-path geo-mesh" d="M 246 560 L 266 650" />
          <path className="geo-path geo-mesh" d="M 307 560 L 205 650" />
          <path className="geo-path geo-mesh" d="M 412 560 L 632 650" strokeWidth="1.8" />
          <path className="geo-path geo-mesh" d="M 588 560 L 368 650" strokeWidth="1.8" />
          <path className="geo-path geo-mesh" d="M 693 560 L 795 650" />
          <path className="geo-path geo-mesh" d="M 754 560 L 734 650" />

          {/* Triangulações no Vão Inferior (Under-arch) */}
          <path className="geo-path geo-mesh" d="M 368 650 L 620 745" />
          <path className="geo-path geo-mesh" d="M 632 650 L 380 745" />
          <path className="geo-path geo-mesh" d="M 380 745 L 620 745" />
          <path className="geo-path geo-mesh" d="M 380 745 L 660 840" />
          <path className="geo-path geo-mesh" d="M 620 745 L 340 840" />
          <path className="geo-path geo-mesh" d="M 340 840 L 660 840" />

          {/* Diagonais das Pernas Inferiores - Y=650 a 745 */}
          <path className="geo-path geo-mesh" d="M 205 650 L 260 745" />
          <path className="geo-path geo-mesh" d="M 368 650 L 162 745" />
          <path className="geo-path geo-mesh" d="M 795 650 L 740 745" />
          <path className="geo-path geo-mesh" d="M 632 650 L 838 745" />

          {/* Diagonais das Pernas Inferiores - Y=745 a 840 */}
          <path className="geo-path geo-mesh" d="M 162 745 L 230 840" />
          <path className="geo-path geo-mesh" d="M 260 745 L 120 840" />
          <path className="geo-path geo-mesh" d="M 260 745 L 340 840" />
          <path className="geo-path geo-mesh" d="M 358 745 L 230 840" />

          <path className="geo-path geo-mesh" d="M 838 745 L 770 840" />
          <path className="geo-path geo-mesh" d="M 740 745 L 880 840" />
          <path className="geo-path geo-mesh" d="M 740 745 L 660 840" />
          <path className="geo-path geo-mesh" d="M 642 745 L 770 840" />
        </g>

        {/* ============================================================ */}
        {/* 2. BARRA CENTRAL (CROSSBAR HORIZONTAL)                       */}
        {/* ============================================================ */}
        <g
          stroke="#00FFB3"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={0.8 * intensity}
          filter="url(#a-glow-soft)"
        >
          <path className="geo-path geo-crossbar" d="M 246 560 L 754 560" />
          <path className="geo-path geo-crossbar" d="M 205 650 L 795 650" />
        </g>

        {/* ============================================================ */}
        {/* 3. ESTRUTURA MESTRA (CONTORNOS PRINCIPAIS DO A)              */}
        {/* ============================================================ */}
        <g
          stroke="#00FFB3"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={0.9 * intensity}
          filter="url(#a-glow-soft)"
        >
          {/* Topo plano */}
          <path className="geo-path geo-main" d="M 430 160 L 570 160" />

          {/* Pernas externas */}
          <path className="geo-path geo-main" d="M 430 160 L 120 840" />
          <path className="geo-path geo-main" d="M 570 160 L 880 840" />

          {/* Arco interno / Abertura central */}
          <path className="geo-path geo-main" d="M 500 360 L 340 840" />
          <path className="geo-path geo-main" d="M 500 360 L 660 840" />

          {/* Bases das pernas */}
          <path className="geo-path geo-main" d="M 120 840 L 340 840" strokeWidth="2.8" />
          <path className="geo-path geo-main" d="M 660 840 L 880 840" strokeWidth="2.8" />
        </g>

        {/* ============================================================ */}
        {/* 4. REFLEXO INFERIOR (LUZ SUTIL NO PISO)                      */}
        {/* ============================================================ */}
        <g className="geo-reflection" opacity="0" stroke="url(#reflection-grad)" strokeWidth="2" strokeLinecap="round">
          <line x1="120" y1="840" x2="120" y2="920" />
          <line x1="230" y1="840" x2="230" y2="930" />
          <line x1="340" y1="840" x2="340" y2="920" />
          <line x1="660" y1="840" x2="660" y2="920" />
          <line x1="770" y1="840" x2="770" y2="930" />
          <line x1="880" y1="840" x2="880" y2="920" />
        </g>

        {/* ============================================================ */}
        {/* 5. NODES LUMINOSOS (PONTOS DE LUZ NAS INTERSEÇÕES CHAVE)     */}
        {/* ============================================================ */}
        <g fill="#00FFB3" filter="url(#a-glow-bright)">
          {/* Topo */}
          <circle className="geo-node geo-pulse-node" cx="430" cy="160" r="4.5" opacity="0" />
          <circle className="geo-node geo-pulse-node" cx="570" cy="160" r="4.5" opacity="0" />
          <circle className="geo-node" cx="500" cy="270" r="3.5" opacity="0" />
          <circle className="geo-node geo-pulse-node" cx="500" cy="360" r="4.5" opacity="0" />

          {/* Crossbar Superior */}
          <circle className="geo-node" cx="246" cy="560" r="4" opacity="0" />
          <circle className="geo-node" cx="412" cy="560" r="4" opacity="0" />
          <circle className="geo-node" cx="588" cy="560" r="4" opacity="0" />
          <circle className="geo-node" cx="754" cy="560" r="4" opacity="0" />

          {/* Crossbar Inferior */}
          <circle className="geo-node" cx="205" cy="650" r="4" opacity="0" />
          <circle className="geo-node" cx="368" cy="650" r="4" opacity="0" />
          <circle className="geo-node" cx="632" cy="650" r="4" opacity="0" />
          <circle className="geo-node" cx="795" cy="650" r="4" opacity="0" />

          {/* Base dos pés */}
          <circle className="geo-node geo-pulse-node" cx="120" cy="840" r="5" opacity="0" />
          <circle className="geo-node" cx="230" cy="840" r="4" opacity="0" />
          <circle className="geo-node geo-pulse-node" cx="340" cy="840" r="5" opacity="0" />

          <circle className="geo-node geo-pulse-node" cx="660" cy="840" r="5" opacity="0" />
          <circle className="geo-node" cx="770" cy="840" r="4" opacity="0" />
          <circle className="geo-node geo-pulse-node" cx="880" cy="840" r="5" opacity="0" />
        </g>
      </svg>
    </div>
  );
}
