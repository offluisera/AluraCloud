"use client";
import { useEffect, useRef } from "react";
import BackgroundArcs from "./BackgroundArcs";
import TechnicalGrid from "./TechnicalGrid";
import ConnectionPaths from "./ConnectionPaths";
import Nodes from "./Nodes";
import CorePlanes from "./CorePlanes";
import CoreGlow from "./CoreGlow";
import AccentElements from "./AccentElements";

export default function DigitalCore() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current || window.innerWidth < 1024) return;
      
      const rect = svgRef.current.getBoundingClientRect();
      // Calculate mouse position relative to the center of the SVG
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      // Normalized values between -1 and 1 (roughly)
      const nx = x / (window.innerWidth / 2);
      const ny = y / (window.innerHeight / 2);

      // Subtle parallax effect on different groups
      const planes = svgRef.current.querySelector('.core-planes') as SVGGElement;
      const nodes = svgRef.current.querySelector('.nodes') as SVGGElement;
      const grid = svgRef.current.querySelector('.technical-grid') as SVGGElement;

      if (planes) planes.style.transform = `translate(${nx * -8}px, ${ny * -8}px)`;
      if (nodes) nodes.style.transform = `translate(${nx * -15}px, ${ny * -15}px)`;
      if (grid) grid.style.transform = `translate(${nx * -4}px, ${ny * -4}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="digital-core-container" 
      style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }}
    >
      <svg
        ref={svgRef}
        className="digital-core-svg"
        viewBox="0 0 1200 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
          overflow: "visible",
        }}
      >
        {/* Layer 1: Background (Fundo e Órbitas) */}
        <BackgroundArcs />

        {/* Layer 2: Midground (Planos, Grid e Conexões) */}
        <CorePlanes />
        <TechnicalGrid />
        <ConnectionPaths />
        <Nodes />

        {/* Layer 3: Foreground (Núcleo luminoso e detalhes) */}
        <CoreGlow />
        <AccentElements />
      </svg>
      
      <style>{`
        .digital-core-svg {
          opacity: 0;
          animation: core-fade-in 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .core-planes, .nodes, .technical-grid {
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes core-fade-in {
          to { opacity: 1; }
        }

        @keyframes node-pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); filter: brightness(1); }
          50%      { opacity: 1; transform: scale(1.3); filter: brightness(1.5); }
        }

        .node-active {
          transform-origin: center;
          transform-box: fill-box;
          animation: node-pulse 3s infinite ease-in-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .node-active { animation: none; opacity: 1; }
          .digital-core-svg { animation: none; opacity: 1; }
          .core-planes, .nodes, .technical-grid { transition: none; transform: none !important; }
        }
        
        @media (max-width: 768px) {
          /* Simplificação no mobile para performance */
          .technical-grid { opacity: 0.3; }
          .background-arcs { display: none; }
        }
      `}</style>
    </div>
  );
}
