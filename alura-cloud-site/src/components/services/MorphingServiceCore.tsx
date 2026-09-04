"use client";
import { p } from "../digital-core/utils";

interface MorphingServiceCoreProps {
  activeIndex: number;
}

// A helper for isometric polygons (parallelograms in X-Y plane at specific Z)
const plane = (x: number, y: number, z: number, width: number, height: number) => {
  return `${p(x, y, z).x},${p(x, y, z).y} ${p(x + width, y, z).x},${p(x + width, y, z).y} ${p(x + width, y + height, z).x},${p(x + width, y + height, z).y} ${p(x, y + height, z).x},${p(x, y + height, z).y}`;
};

export default function MorphingServiceCore({ activeIndex }: MorphingServiceCoreProps) {
  return (
    <svg 
      viewBox="0 0 1200 1200" 
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: "100%",
        height: "100%",
        overflow: "visible",
        filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.5))"
      }}
    >
      <defs>
        <radialGradient id="service-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00DF81" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00DF81" stopOpacity="0" />
        </radialGradient>
        
        {/* Glow Filters */}
        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Background radial glow */}
      <circle cx="600" cy="600" r="400" fill="url(#service-glow)" opacity={0.6} />

      {/* =========================================
          STAGE 01: DESENVOLVIMENTO DIGITAL
          ========================================= */}
      <g 
        className="stage-01" 
        style={{ 
          opacity: activeIndex === 0 ? 1 : 0,
          transform: activeIndex === 0 ? "translateY(0)" : "translateY(-20px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
          pointerEvents: activeIndex === 0 ? "auto" : "none"
        }}
      >
        {/* Decorative Grid Lines Base */}
        <g stroke="#17876D" strokeWidth="0.5" opacity="0.3">
          <line x1={p(-4, -4, 0).x} y1={p(-4, -4, 0).y} x2={p(4, -4, 0).x} y2={p(4, -4, 0).y} />
          <line x1={p(-4, 0, 0).x} y1={p(-4, 0, 0).y} x2={p(4, 0, 0).x} y2={p(4, 0, 0).y} />
          <line x1={p(-4, 4, 0).x} y1={p(-4, 4, 0).y} x2={p(4, 4, 0).x} y2={p(4, 4, 0).y} />
          
          <line x1={p(-4, -4, 0).x} y1={p(-4, -4, 0).y} x2={p(-4, 4, 0).x} y2={p(-4, 4, 0).y} />
          <line x1={p(0, -4, 0).x} y1={p(0, -4, 0).y} x2={p(0, 4, 0).x} y2={p(0, 4, 0).y} />
          <line x1={p(4, -4, 0).x} y1={p(4, -4, 0).y} x2={p(4, 4, 0).x} y2={p(4, 4, 0).y} />
        </g>

        {/* Main Floating Viewport (Browser/App) */}
        <g transform="translate(0, -160)">
          {/* Shadow/Base Layer */}
          <polygon points={plane(-3, -2, 1, 6, 4)} fill="rgba(6, 48, 43, 0.5)" stroke="#17876D" strokeWidth="1" />
          
          {/* Main Interface Window */}
          <polygon points={plane(-3, -2, 1.5, 6, 4)} fill="#021B1A" stroke="#2CC295" strokeWidth="1.5" />
          
          {/* Browser Top Bar */}
          <polygon points={plane(-3, -2, 1.5, 6, 0.5)} fill="#06302B" stroke="#2CC295" strokeWidth="0.5" />
          {/* Window Buttons */}
          <circle cx={p(-2.6, -1.75, 1.5).x} cy={p(-2.6, -1.75, 1.5).y} r="3" fill="#17876D" />
          <circle cx={p(-2.2, -1.75, 1.5).x} cy={p(-2.2, -1.75, 1.5).y} r="3" fill="#17876D" />
          <circle cx={p(-1.8, -1.75, 1.5).x} cy={p(-1.8, -1.75, 1.5).y} r="3" fill="#17876D" />

          {/* Wireframe UI Elements inside viewport */}
          {/* Hero Banner Area */}
          <polygon points={plane(-2.5, -1, 1.5, 5, 1.5)} fill="#095544" stroke="none" opacity="0.6" />
          {/* Content blocks */}
          <polygon points={plane(-2.5, 0.8, 1.5, 1.5, 1)} fill="none" stroke="#17876D" strokeWidth="1" />
          <polygon points={plane(-0.75, 0.8, 1.5, 1.5, 1)} fill="none" stroke="#17876D" strokeWidth="1" />
          <polygon points={plane(1, 0.8, 1.5, 1.5, 1)} fill="none" stroke="#17876D" strokeWidth="1" />
        </g>

        {/* Floating Mobile Wireframe (Secondary device) */}
        <g transform="translate(0, -130)">
          {/* Mobile Shadow */}
          <polygon points={plane(2, 1, 2, 2, 3)} fill="rgba(6, 48, 43, 0.8)" stroke="#17876D" strokeWidth="0.5" />
          {/* Mobile Body */}
          <polygon points={plane(2, 1, 2.5, 2, 3)} fill="#032221" stroke="#00DF81" strokeWidth="1.5" />
          {/* Mobile Screen Header */}
          <polygon points={plane(2.2, 1.2, 2.5, 1.6, 0.5)} fill="#095544" />
          {/* Mobile Screen Content */}
          <polygon points={plane(2.2, 2, 2.5, 1.6, 1.5)} fill="none" stroke="#2CC295" strokeWidth="0.5" />
        </g>

        {/* Floating Code Blocks / Nodes connecting them */}
        <g transform="translate(0, -120)">
          <path d={`M ${p(-3, -2, 1.5).x} ${p(-3, -2, 1.5).y} L ${p(-4, -3, 3).x} ${p(-4, -3, 3).y}`} stroke="#00DF81" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <circle cx={p(-4, -3, 3).x} cy={p(-4, -3, 3).y} r="4" fill="#00DF81" filter="url(#neon-glow)" />
          
          <path d={`M ${p(3, 3, 2.5).x} ${p(3, 3, 2.5).y} L ${p(4, 4, 1).x} ${p(4, 4, 1).y}`} stroke="#00DF81" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
          <circle cx={p(4, 4, 1).x} cy={p(4, 4, 1).y} r="3" fill="#2CC295" />
        </g>
      </g>
      
      {/* =========================================
          STAGE 02: PRODUTOS E SISTEMAS (Módulos)
          ========================================= */}
      <g 
        className="stage-02" 
        style={{ 
          opacity: activeIndex === 1 ? 1 : 0,
          transform: activeIndex === 1 ? "translateY(0)" : (activeIndex < 1 ? "translateY(20px)" : "translateY(-20px)"),
          transition: "opacity 0.8s ease, transform 0.8s ease",
          pointerEvents: activeIndex === 1 ? "auto" : "none"
        }}
      >
        <g transform="translate(0, -160)">
          {/* Base shadow (ghost of the interface from stage 1) */}
          <polygon points={plane(-3, -2, 1, 6, 4)} fill="rgba(6, 48, 43, 0.2)" stroke="#17876D" strokeWidth="1" strokeDasharray="4 4" />
          
          {/* Module 1: Dashboard Core (Center) */}
          <g transform="translate(0, -20)">
            <polygon points={plane(-1, -1, 2, 3, 3)} fill="#021B1A" stroke="#00DF81" strokeWidth="1.5" />
            <polygon points={plane(-0.5, -0.5, 2.5, 2, 0.5)} fill="#095544" />
            <polygon points={plane(-0.5, 0.5, 2.5, 0.8, 1)} fill="none" stroke="#2CC295" strokeWidth="1" />
            <polygon points={plane(0.7, 0.5, 2.5, 0.8, 1)} fill="none" stroke="#2CC295" strokeWidth="1" />
          </g>

          {/* Module 2: Side Panel (Left) */}
          <g transform="translate(-40, 10)">
            <polygon points={plane(-3.5, 0, 1.8, 2, 3)} fill="#032221" stroke="#2CC295" strokeWidth="1" />
            <polygon points={plane(-3.2, 0.3, 1.9, 1.4, 0.5)} fill="#095544" opacity="0.7" />
            <polygon points={plane(-3.2, 1.1, 1.9, 1.4, 0.5)} fill="#095544" opacity="0.5" />
            <polygon points={plane(-3.2, 1.9, 1.9, 1.4, 0.5)} fill="#095544" opacity="0.3" />
          </g>

          {/* Module 3: Database / Backend Block (Right) */}
          <g transform="translate(40, -10)">
            <polygon points={plane(2.5, -2.5, 1.5, 2, 2.5)} fill="#021B1A" stroke="#17876D" strokeWidth="1.5" />
            <polygon points={plane(2.7, -2.2, 2, 1.6, 0.6)} fill="#00DF81" opacity="0.8" />
            <polygon points={plane(2.7, -1.3, 2, 1.6, 0.6)} fill="#00DF81" opacity="0.5" />
            <polygon points={plane(2.7, -0.4, 2, 1.6, 0.6)} fill="#00DF81" opacity="0.3" />
          </g>

          {/* Connection lines representing APIs between modules */}
          <path d={`M ${p(-1.5, 1.5, 2).x} ${p(-1.5, 1.5, 2).y} L ${p(-1, 0, 2).x} ${p(-1, 0, 2).y}`} stroke="#00DF81" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d={`M ${p(2, 0, 2).x} ${p(2, 0, 2).y} L ${p(2.5, -1, 1.8).x} ${p(2.5, -1, 1.8).y}`} stroke="#00DF81" strokeWidth="1.5" strokeDasharray="3 3" />
          
          <circle cx={p(-1.5, 1.5, 2).x} cy={p(-1.5, 1.5, 2).y} r="4" fill="#00DF81" filter="url(#neon-glow)" />
          <circle cx={p(2.5, -1, 1.8).x} cy={p(2.5, -1, 1.8).y} r="4" fill="#00DF81" filter="url(#neon-glow)" />
        </g>
      </g>
      
      {/* Temporary logic to show other states are empty for now */}
      {activeIndex > 1 && (
        <text x="600" y="600" fill="#17876D" fontSize="16" fontFamily="monospace" textAnchor="middle" opacity="0.5">
          [ STATE 0{activeIndex + 1} - AWAITING IMPLEMENTATION ]
        </text>
      )}

    </svg>
  );
}
