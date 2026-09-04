"use client";
import { p } from "../digital-core/utils";

const plane = (x: number, y: number, z: number, width: number, height: number) => {
  return `${p(x, y, z).x},${p(x, y, z).y} ${p(x + width, y, z).x},${p(x + width, y, z).y} ${p(x + width, y + height, z).x},${p(x + width, y + height, z).y} ${p(x, y + height, z).x},${p(x, y + height, z).y}`;
};

export default function ServicesHeaderGraphic() {
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
        <radialGradient id="header-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00DF81" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00DF81" stopOpacity="0" />
        </radialGradient>
        
        <filter id="neon-glow-header" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <style>
          {`
            @keyframes floatMacro {
              0%, 100% { transform: translateY(-100px); }
              50% { transform: translateY(-120px); }
            }
            @keyframes floatLayer {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            @keyframes pulseOpacity {
              0%, 100% { opacity: 0.4; }
              50% { opacity: 1; }
            }
            @keyframes dataFlow {
              from { stroke-dashoffset: 0; }
              to { stroke-dashoffset: -24; }
            }
            .macro-group {
              animation: floatMacro 10s ease-in-out infinite;
            }
            .layer-float-1 {
              animation: floatLayer 6s ease-in-out infinite 1s;
            }
            .layer-float-2 {
              animation: floatLayer 8s ease-in-out infinite 0s;
            }
            .node-pulse {
              animation: pulseOpacity 4s ease-in-out infinite;
            }
            .node-pulse-fast {
              animation: pulseOpacity 2s ease-in-out infinite 1s;
            }
            .line-flow {
              animation: dataFlow 1.5s linear infinite;
            }
            .grid-pulse {
              animation: pulseOpacity 8s ease-in-out infinite;
            }
          `}
        </style>
      </defs>
      
      {/* Background radial glow */}
      <circle cx="600" cy="600" r="500" fill="url(#header-glow)" className="grid-pulse" />

      {/* Center the entire structure */}
      <g className="macro-group">
        
        {/* Base Grid Pattern */}
        <g stroke="#17876D" strokeWidth="1" strokeDasharray="4 4" className="grid-pulse" opacity="0.2">
          {Array.from({ length: 9 }).map((_, i) => (
            <g key={`grid-${i}`}>
              <line x1={p(-6, -6 + i*1.5, 0).x} y1={p(-6, -6 + i*1.5, 0).y} x2={p(6, -6 + i*1.5, 0).x} y2={p(6, -6 + i*1.5, 0).y} />
              <line x1={p(-6 + i*1.5, -6, 0).x} y1={p(-6 + i*1.5, -6, 0).y} x2={p(-6 + i*1.5, 6, 0).x} y2={p(-6 + i*1.5, 6, 0).y} />
            </g>
          ))}
        </g>

        {/* =========================================
            ECOSYSTEM MACRO-VIEW
            ========================================= */}
            
        {/* Layer 1: Infrastructure Base (Bottom Right) */}
        <g className="layer-float-1">
          <polygon points={plane(1, 1, 0.5, 4, 4)} fill="rgba(6, 48, 43, 0.6)" stroke="#17876D" strokeWidth="1" />
          <polygon points={plane(1.5, 1.5, 1, 3, 3)} fill="#021B1A" stroke="#2CC295" strokeWidth="1" />
          <path d={`M ${p(1.5, 1.5, 1).x} ${p(1.5, 1.5, 1).y} L ${p(1.5, 1.5, 2).x} ${p(1.5, 1.5, 2).y}`} stroke="#00DF81" strokeWidth="2" opacity="0.5" />
          <path d={`M ${p(4.5, 1.5, 1).x} ${p(4.5, 1.5, 1).y} L ${p(4.5, 1.5, 2).x} ${p(4.5, 1.5, 2).y}`} stroke="#00DF81" strokeWidth="2" opacity="0.5" />
          <path d={`M ${p(1.5, 4.5, 1).x} ${p(1.5, 4.5, 1).y} L ${p(1.5, 4.5, 2).x} ${p(1.5, 4.5, 2).y}`} stroke="#00DF81" strokeWidth="2" opacity="0.5" />
          <polygon points={plane(1.5, 1.5, 2, 3, 3)} fill="rgba(0, 223, 129, 0.15)" stroke="#00DF81" strokeWidth="1.5" />
          {/* Central Data Node */}
          <circle cx={p(3, 3, 2).x} cy={p(3, 3, 2).y} r="8" fill="#00DF81" filter="url(#neon-glow-header)" className="node-pulse" />
        </g>

        {/* Connecting Lines */}
        <path d={`M ${p(3, 3, 2).x} ${p(3, 3, 2).y} L ${p(-1, 0, 3).x} ${p(-1, 0, 3).y}`} stroke="#00DF81" strokeWidth="2" strokeDasharray="4 8" opacity="0.6" className="line-flow" />
        <path d={`M ${p(3, 3, 2).x} ${p(3, 3, 2).y} L ${p(0, -3, 3.5).x} ${p(0, -3, 3.5).y}`} stroke="#00DF81" strokeWidth="2" strokeDasharray="4 8" opacity="0.6" className="line-flow" />
        <path d={`M ${p(-1, 0, 3).x} ${p(-1, 0, 3).y} L ${p(0, -3, 3.5).x} ${p(0, -3, 3.5).y}`} stroke="#00DF81" strokeWidth="1" strokeDasharray="2 4" opacity="0.3" className="line-flow" />

        {/* Layer 2: Logic / Backend (Center Left) */}
        <g className="layer-float-2">
          {/* Base Platform */}
          <polygon points={plane(-4, -1, 2, 4, 3)} fill="rgba(6, 48, 43, 0.4)" stroke="#17876D" strokeWidth="1" />
          
          {/* Server Rack */}
          <polygon points={plane(-3.5, -0.5, 3, 1.5, 2)} fill="#032221" stroke="#2CC295" strokeWidth="1.5" />
          {/* Server Blades */}
          <polygon points={plane(-3.5, -0.5, 3, 1.5, 0.4)} fill="#095544" />
          <polygon points={plane(-3.5, 0, 3, 1.5, 0.4)} fill="#095544" opacity="0.6" />
          <polygon points={plane(-3.5, 0.5, 3, 1.5, 0.4)} fill="#095544" opacity="0.4" />
          <polygon points={plane(-3.5, 1.0, 3, 1.5, 0.4)} fill="#095544" opacity="0.2" />
          {/* Server Lights */}
          <circle cx={p(-3.3, -0.3, 3).x} cy={p(-3.3, -0.3, 3).y} r="1.5" fill="#00DF81" className="node-pulse-fast" />
          <circle cx={p(-3.3, 0.2, 3).x} cy={p(-3.3, 0.2, 3).y} r="1.5" fill="#00DF81" className="node-pulse" />
          <circle cx={p(-3.3, 0.7, 3).x} cy={p(-3.3, 0.7, 3).y} r="1.5" fill="#00DF81" className="node-pulse-fast" />

          {/* API / Code Service Block */}
          <polygon points={plane(-1.5, -0.5, 3.2, 1.2, 2)} fill="rgba(0, 223, 129, 0.05)" stroke="#00DF81" strokeWidth="1" />
          {/* Code Lines */}
          <path d={`M ${p(-1.3, -0.2, 3.2).x} ${p(-1.3, -0.2, 3.2).y} L ${p(-0.7, -0.2, 3.2).x} ${p(-0.7, -0.2, 3.2).y}`} stroke="#00DF81" strokeWidth="1" strokeDasharray="2 2" />
          <path d={`M ${p(-1.3, 0.1, 3.2).x} ${p(-1.3, 0.1, 3.2).y} L ${p(-0.5, 0.1, 3.2).x} ${p(-0.5, 0.1, 3.2).y}`} stroke="#00DF81" strokeWidth="1" strokeDasharray="4 2" opacity="0.8" />
          <path d={`M ${p(-1.3, 0.4, 3.2).x} ${p(-1.3, 0.4, 3.2).y} L ${p(-0.9, 0.4, 3.2).x} ${p(-0.9, 0.4, 3.2).y}`} stroke="#00DF81" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <path d={`M ${p(-1.3, 0.7, 3.2).x} ${p(-1.3, 0.7, 3.2).y} L ${p(-0.6, 0.7, 3.2).x} ${p(-0.6, 0.7, 3.2).y}`} stroke="#00DF81" strokeWidth="1" strokeDasharray="5 2" opacity="0.9" />
          
          <circle cx={p(-1, 1.5, 3).x} cy={p(-1, 1.5, 3).y} r="5" fill="#00DF81" filter="url(#neon-glow-header)" className="node-pulse-fast" />
          
          {/* Vertical connect lines */}
          <path d={`M ${p(-3.5, -0.5, 3).x} ${p(-3.5, -0.5, 3).y} L ${p(-3.5, -0.5, 2).x} ${p(-3.5, -0.5, 2).y}`} stroke="#17876D" strokeWidth="1" />
          <path d={`M ${p(-1, 1.5, 3).x} ${p(-1, 1.5, 3).y} L ${p(-1, 1.5, 2).x} ${p(-1, 1.5, 2).y}`} stroke="#17876D" strokeWidth="1" />
        </g>

        {/* Layer 3: Interfaces (Top Right) */}
        <g>
          {/* Base Platform */}
          <polygon points={plane(-1, -5, 3, 4, 3)} fill="rgba(6, 48, 43, 0.3)" stroke="#17876D" strokeWidth="1" />
          
          {/* Dashboard Window Base */}
          <polygon points={plane(-0.5, -4.5, 3.5, 3, 2)} fill="#021B1A" stroke="#00DF81" strokeWidth="1" />
          
          {/* Dashboard Sidebar */}
          <polygon points={plane(-0.5, -4.5, 3.5, 0.5, 2)} fill="#095544" opacity="0.7" />
          {/* Sidebar Items */}
          <polygon points={plane(-0.3, -4.3, 3.5, 0.1, 0.4)} fill="#00DF81" opacity="0.8" />
          <polygon points={plane(-0.3, -3.7, 3.5, 0.1, 0.4)} fill="#00DF81" opacity="0.4" />
          <polygon points={plane(-0.3, -3.1, 3.5, 0.1, 0.4)} fill="#00DF81" opacity="0.4" />
          
          {/* Dashboard Header */}
          <polygon points={plane(0, -4.5, 3.5, 2.5, 0.3)} fill="#06302B" />
          
          {/* Widget 1 (Top Left) - Bar Chart */}
          <polygon points={plane(0.2, -4.0, 3.5, 1, 0.6)} fill="rgba(23, 135, 109, 0.1)" stroke="#17876D" strokeWidth="1" />
          <polygon points={plane(0.3, -3.9, 3.5, 0.2, 0.4)} fill="#00DF81" />
          <polygon points={plane(0.6, -3.9, 3.5, 0.2, 0.2)} fill="#00DF81" opacity="0.7" />
          <polygon points={plane(0.9, -3.9, 3.5, 0.2, 0.5)} fill="#00DF81" opacity="0.5" />
          
          {/* Widget 2 (Top Right) - Line Graph */}
          <polygon points={plane(1.4, -4.0, 3.5, 1, 0.6)} fill="rgba(23, 135, 109, 0.1)" stroke="#17876D" strokeWidth="1" />
          <path d={`M ${p(1.5, -3.8, 3.5).x} ${p(1.5, -3.8, 3.5).y} L ${p(1.8, -3.6, 3.5).x} ${p(1.8, -3.6, 3.5).y} L ${p(2.2, -3.9, 3.5).x} ${p(2.2, -3.9, 3.5).y}`} stroke="#00DF81" strokeWidth="1.5" fill="none" />
          <circle cx={p(1.5, -3.8, 3.5).x} cy={p(1.5, -3.8, 3.5).y} r="1.5" fill="#00DF81" />
          <circle cx={p(1.8, -3.6, 3.5).x} cy={p(1.8, -3.6, 3.5).y} r="1.5" fill="#00DF81" />
          <circle cx={p(2.2, -3.9, 3.5).x} cy={p(2.2, -3.9, 3.5).y} r="1.5" fill="#00DF81" />
          
          {/* Widget 3 (Bottom) - Data List / Table */}
          <polygon points={plane(0.2, -3.2, 3.5, 2.2, 0.5)} fill="rgba(23, 135, 109, 0.1)" stroke="#17876D" strokeWidth="1" />
          <path d={`M ${p(0.3, -3.0, 3.5).x} ${p(0.3, -3.0, 3.5).y} L ${p(2.3, -3.0, 3.5).x} ${p(2.3, -3.0, 3.5).y}`} stroke="#17876D" strokeWidth="1.5" opacity="0.8" />
          <path d={`M ${p(0.3, -2.8, 3.5).x} ${p(0.3, -2.8, 3.5).y} L ${p(1.8, -2.8, 3.5).x} ${p(1.8, -2.8, 3.5).y}`} stroke="#17876D" strokeWidth="1.5" opacity="0.5" />

          <circle cx={p(0, -3, 3.5).x} cy={p(0, -3, 3.5).y} r="5" fill="#00DF81" filter="url(#neon-glow-header)" className="node-pulse" />
        </g>

        {/* Floating Particles/Nodes */}
        <circle cx={p(2, -4, 2).x} cy={p(2, -4, 2).y} r="2" fill="#2CC295" className="node-pulse-fast" />
        <circle cx={p(-5, 2, 1.5).x} cy={p(-5, 2, 1.5).y} r="3" fill="#00DF81" className="node-pulse" />
        <circle cx={p(5, -1, 3).x} cy={p(5, -1, 3).y} r="2" fill="#17876D" className="node-pulse-fast" />
        <circle cx={p(-2, 4, 1).x} cy={p(-2, 4, 1).y} r="4" fill="#00DF81" opacity="0.5" className="node-pulse" />
      </g>
    </svg>
  );
}
