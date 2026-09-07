'use client';

import React from 'react';
import { AnimatedGeometricA } from '@/components/ui/AnimatedGeometricA';

/**
 * Contact / CTA Section — Exact match to referencia.png section 15
 */
export default function Contact() {
  return (
    <section id="contato" className="section relative z-10 py-16 md:py-24">
      <div className="container">
        {/* Card principal com cantos arredondados e borda sutil */}
        <div
          className="relative w-full rounded-[24px] md:rounded-[32px] overflow-hidden p-8 sm:p-12 md:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-8"
          style={{
            backgroundColor: '#020e0c',
            border: '1px solid rgba(0, 255, 179, 0.18)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(0, 255, 179, 0.12)',
          }}
        >
          {/* Luz de fundo interna no card */}
          <div
            className="absolute -right-16 top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(0, 255, 179, 0.08) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
          />

          {/* Coluna Esquerda: Informações e CTA */}
          <div className="flex flex-col items-start text-left z-10 w-full max-w-xl">
            {/* Tag / Eyebrow */}
            <div className="flex items-center gap-2 mb-6 sm:mb-8 font-mono text-xs tracking-[0.2em] uppercase">
              <span style={{ color: '#00FFB3' }} className="font-bold">
                15.
              </span>
              <span style={{ color: '#6A8B83' }} className="font-semibold">
                CTA / CONTATO
              </span>
            </div>

            {/* Headline com tipografia imponente e cores exatas */}
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-tight uppercase leading-[1.06] mb-4 sm:mb-6 text-white">
              TEM UMA IDEIA?
              <br />
              <span style={{ color: '#00FFB3' }}>VAMOS CONSTRUIR.</span>
            </h2>

            {/* Subtítulo */}
            <p
              className="text-sm sm:text-base md:text-lg leading-relaxed max-w-sm sm:max-w-md mb-8 sm:mb-10"
              style={{ color: '#8EABA3' }}
            >
              Fale com a Alura Cloud e transforme seu projeto em realidade.
            </p>

            {/* Botão Pill Outlined com seta */}
            <a
              href="mailto:contato@aluracloud.com.br"
              className="inline-flex items-center gap-3.5 sm:gap-4 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 group cursor-pointer"
              style={{
                border: '1px solid rgba(0, 255, 179, 0.35)',
                backgroundColor: 'rgba(0, 255, 179, 0.03)',
                color: '#FFFFFF',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#00FFB3';
                e.currentTarget.style.backgroundColor = 'rgba(0, 255, 179, 0.1)';
                e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 255, 179, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 255, 179, 0.35)';
                e.currentTarget.style.backgroundColor = 'rgba(0, 255, 179, 0.03)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span className="font-display font-bold text-[11px] sm:text-xs tracking-[0.14em] uppercase">
                Falar com a Alura Cloud
              </span>
              <span
                style={{ color: '#00FFB3' }}
                className="transition-transform duration-300 group-hover:translate-x-1.5 text-base sm:text-lg font-bold"
              >
                →
              </span>
            </a>
          </div>

          {/* Coluna Direita: Símbolo A Wireframe Futurista */}
          <div className="w-full flex items-center justify-center relative min-h-[340px] sm:min-h-[400px] md:min-h-[460px]">
            <AnimatedGeometricA intensity={1} />
          </div>
        </div>
      </div>
    </section>
  );
}
