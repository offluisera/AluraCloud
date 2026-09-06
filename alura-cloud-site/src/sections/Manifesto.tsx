import React from "react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import CurvedLoop from "@/components/ui/CurvedLoop";

/**
 * Manifesto Section
 * Banner-marquee horizontal e infinito com a frase-manifesto da Alura Cloud.
 */
export default function Manifesto() {
  return (
    <section id="manifesto" className="manifesto-section manifesto-section--grid">

      {/* SVG diagonal circuit lines */}
      <svg className="manifesto-bg-svg" aria-hidden viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="mg"><feGaussianBlur stdDeviation="3" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
        </defs>
        <path id="mp1" d="M-40,60 C300,50 600,150 900,130 C1150,115 1350,60 1480,80" fill="none" stroke="rgba(0,223,129,0.12)" strokeWidth="1" strokeDasharray="6,10"/>
        <circle r="4.5" fill="#00df81" filter="url(#mg)" opacity="0.9">
          <animateMotion dur="8s" repeatCount="indefinite" begin="0s"><mpath href="#mp1"/></animateMotion>
        </circle>
        <path id="mp2" d="M1480,180 C1100,200 800,280 500,260 C250,245 80,300 -40,320" fill="none" stroke="rgba(0,223,129,0.1)" strokeWidth="1" strokeDasharray="4,12"/>
        <circle r="3.5" fill="#00df81" filter="url(#mg)" opacity="0.75">
          <animateMotion dur="11s" repeatCount="indefinite" begin="2s"><mpath href="#mp2"/></animateMotion>
        </circle>
        <path id="mp3" d="M-40,280 C350,260 700,340 1100,310 C1280,300 1400,330 1480,340" fill="none" stroke="rgba(0,223,129,0.09)" strokeWidth="1" strokeDasharray="5,14"/>
        <circle r="4" fill="#00df81" filter="url(#mg)" opacity="0.8">
          <animateMotion dur="10s" repeatCount="indefinite" begin="4s"><mpath href="#mp3"/></animateMotion>
        </circle>
      </svg>

      <div className="container manifesto-inner">
        <div className="manifesto-eyebrow-container">
          <SectionEyebrow index={2} label="Nosso Propósito" className="reveal" />
        </div>
      </div>

      <CurvedLoop
        textPri="Você traz a ideia e nós construímos o "
        textAccent="que é necessário para ela existir."
        speed={5.2}
        direction="left"
        interactive={true}
      />
    </section>
  );
}
