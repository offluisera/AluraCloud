"use client";
import { p, gridLines } from "../digital-core/utils";

interface ServiceCardGraphicProps {
  index: number;
}

const plane = (x: number, y: number, z: number, width: number, height: number) => {
  return `${p(x, y, z).x},${p(x, y, z).y} ${p(x + width, y, z).x},${p(x + width, y, z).y} ${p(x + width, y + height, z).x},${p(x + width, y + height, z).y} ${p(x, y + height, z).x},${p(x, y + height, z).y}`;
};

export default function ServiceCardGraphic({ index }: ServiceCardGraphicProps) {
  return (
    <svg 
      viewBox="100 0 1000 1000" 
      preserveAspectRatio="xMidYMax meet"
      style={{
        width: "100%",
        height: "100%",
        overflow: "visible",
        filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.5))"
      }}
    >
      <defs>
        <radialGradient id="card-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00DF81" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00DF81" stopOpacity="0" />
        </radialGradient>
        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="15" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Base glow for all cards */}
      <circle cx="600" cy="500" r="400" fill="url(#card-glow)" />

      {/* Floor Grid */}
      <g stroke="rgba(44, 194, 149, 0.2)" strokeWidth="1" opacity="0.3">
        {gridLines(0, 4, 8).map((line, i) => (
          <line key={i} {...line} />
        ))}
      </g>

      {/* The base graphics use p() which centers around x:600, y:650 */}
      <g style={{ animation: "float 6s ease-in-out infinite" }}>
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-15px); }
            }
          `}
        </style>

        {index === 0 && (
          // 01: DESENVOLVIMENTO DIGITAL - Floating Wireframe
          <g>
            <polygon points={plane(-3, -2, 1, 6, 4)} fill="#020b0a" stroke="#00DF81" strokeWidth="2" />
            <polygon points={plane(-3, -2, 1.5, 6, 0.5)} fill="#0B453A" stroke="#00DF81" strokeWidth="1" />
            <polygon points={plane(-2.5, -1, 1, 5, 1.5)} fill="rgba(0, 223, 129, 0.15)" stroke="none" />
            <polygon points={plane(-2.5, 0.8, 1, 1.5, 1)} fill="none" stroke="#2CC295" strokeWidth="2" />
            <polygon points={plane(-0.75, 0.8, 1, 1.5, 1)} fill="none" stroke="#2CC295" strokeWidth="2" />
            <polygon points={plane(1, 0.8, 1, 1.5, 1)} fill="none" stroke="#2CC295" strokeWidth="2" />
            
            {/* Mobile next to it */}
            <g transform="translate(40, -20)">
              <polygon points={plane(2, 1, 2.5, 2, 3)} fill="#020b0a" stroke="#00DF81" strokeWidth="2" />
              <polygon points={plane(2.2, 1.2, 2.5, 1.6, 0.5)} fill="#00DF81" opacity="0.9" filter="url(#neon-glow)" />
              <polygon points={plane(2.2, 2, 2.5, 1.6, 1.5)} fill="none" stroke="#2CC295" strokeWidth="1" />
            </g>
          </g>
        )}

        {index === 1 && (
          // 02: PRODUTOS E SISTEMAS - Dashboard Modules
          <g>
            <polygon points={plane(-1, -1, 2, 3, 3)} fill="#020b0a" stroke="#00DF81" strokeWidth="2" />
            <polygon points={plane(-0.5, -0.5, 2.5, 2, 0.5)} fill="#0B453A" />
            <polygon points={plane(-0.5, 0.5, 2.5, 0.8, 1)} fill="none" stroke="#2CC295" strokeWidth="2" />
            <polygon points={plane(0.7, 0.5, 2.5, 0.8, 1)} fill="none" stroke="#2CC295" strokeWidth="2" />
            
            {/* Left Module */}
            <g transform="translate(-40, 10)">
              <polygon points={plane(-3.5, 0, 1.8, 2, 3)} fill="#020b0a" stroke="#00DF81" strokeWidth="2" />
              <polygon points={plane(-3.2, 0.3, 1.9, 1.4, 0.5)} fill="#00DF81" opacity="0.6" filter="url(#neon-glow)" />
              <polygon points={plane(-3.2, 1.1, 1.9, 1.4, 0.5)} fill="#00DF81" opacity="0.4" />
            </g>
            {/* Right Module */}
            <g transform="translate(30, -10)">
              <polygon points={plane(2.5, -2, 1.5, 2, 2.5)} fill="#020b0a" stroke="#2CC295" strokeWidth="2" />
              <polygon points={plane(2.7, -1.8, 2, 1.6, 0.6)} fill="#00DF81" opacity="0.9" filter="url(#neon-glow)" />
              <polygon points={plane(2.7, -0.9, 2, 1.6, 0.6)} fill="#00DF81" opacity="0.5" />
            </g>
          </g>
        )}

        {index === 2 && (
          // 03: SOLUÇÕES ESPECIALIZADAS - Minecraft Blocks & Discord
          <g>
            {/* Stack of dirt/grass blocks */}
            <polygon points={plane(-2, -1, 1, 1, 1)} fill="#0B453A" stroke="#00DF81" strokeWidth="1.5" />
            <polygon points={plane(-2, -1, 1.5, 1, 1)} fill="#2CC295" />
            
            <polygon points={plane(-1, -1, 2, 1, 1)} fill="#0B453A" stroke="#00DF81" strokeWidth="1.5" />
            <polygon points={plane(-1, -1, 2.5, 1, 1)} fill="#2CC295" />
            
            <polygon points={plane(-2, 0, 2, 1, 1)} fill="#0B453A" stroke="#00DF81" strokeWidth="1.5" />
            <polygon points={plane(-2, 0, 2.5, 1, 1)} fill="#2CC295" />
            
            <polygon points={plane(-1, 0, 3, 1, 1)} fill="#0B453A" stroke="#00DF81" strokeWidth="1.5" />
            <polygon points={plane(-1, 0, 3.5, 1, 1)} fill="#00DF81" filter="url(#neon-glow)" />
            
            {/* Discord Logo (abstracted as a floating neon icon) */}
            <g transform="translate(60, -80)">
              <path d="M-15,0 Q-10,-10 0,-10 Q10,-10 15,0 Q18,15 15,20 Q10,20 5,15 Q0,18 -5,15 Q-10,20 -15,20 Q-18,15 -15,0" fill="none" stroke="#5865F2" strokeWidth="3" filter="url(#neon-glow)" />
              <circle cx="-5" cy="5" r="2.5" fill="#5865F2" />
              <circle cx="5" cy="5" r="2.5" fill="#5865F2" />
            </g>
            
            {/* Data lines */}
            <path d={`M ${p(-1, 0, 3.5).x} ${p(-1, 0, 3.5).y} L 60 -70`} stroke="#00DF81" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
          </g>
        )}

        {index === 3 && (
          // 04: INFRAESTRUTURA - Server Racks
          <g>
            {/* Base platform */}
            <polygon points={plane(-3, -2, 0, 6, 4)} fill="rgba(0, 223, 129, 0.1)" stroke="#00DF81" strokeWidth="2" />
            
            {/* Tall Rack Left */}
            <polygon points={plane(-2.5, -1, 4, 2, 2)} fill="#020b0a" stroke="#2CC295" strokeWidth="2" />
            <polygon points={plane(-2.5, -1, 3.5, 2, 0.4)} fill="#00DF81" filter="url(#neon-glow)" />
            <polygon points={plane(-2.5, -0.5, 3.5, 2, 0.4)} fill="#00DF81" opacity="0.8" />
            <polygon points={plane(-2.5, 0, 3.5, 2, 0.4)} fill="#00DF81" opacity="0.6" />
            <polygon points={plane(-2.5, 0.5, 3.5, 2, 0.4)} fill="#0B453A" opacity="0.8" />
            
            {/* Short Rack Right */}
            <polygon points={plane(0.5, -1, 2.5, 2, 2)} fill="#020b0a" stroke="#2CC295" strokeWidth="2" />
            <polygon points={plane(0.5, -1, 2, 2, 0.4)} fill="#00DF81" filter="url(#neon-glow)" />
            <polygon points={plane(0.5, -0.5, 2, 2, 0.4)} fill="#0B453A" opacity="0.8" />
            
            {/* Floor nodes */}
            <circle cx={p(-1.5, 1.5, 0).x} cy={p(-1.5, 1.5, 0).y} r="4" fill="#00DF81" filter="url(#neon-glow)" />
            <circle cx={p(1.5, 1.5, 0).x} cy={p(1.5, 1.5, 0).y} r="4" fill="#00DF81" filter="url(#neon-glow)" />
          </g>
        )}

        {index === 4 && (
          // 05: HOSPEDAGEM - Cloud Layers
          <g>
            {/* Layer 1 (Bottom) */}
            <polygon points={plane(-2, -2, 1, 4, 4)} fill="#020b0a" stroke="#00DF81" strokeWidth="2" />
            {/* Layer 2 */}
            <polygon points={plane(-1.5, -1.5, 2, 3, 3)} fill="rgba(0, 223, 129, 0.2)" stroke="#2CC295" strokeWidth="2" />
            {/* Layer 3 (Top - Cloud) */}
            <g transform="translate(0, -60)">
              {/* Abstract Isometric Cloud Shape */}
              <polygon points={plane(-1, -1, 3, 2, 2)} fill="#00DF81" opacity="0.9" filter="url(#neon-glow)" />
              <polygon points={plane(-0.5, -1.5, 3.5, 1.5, 1.5)} fill="#00DF81" opacity="0.7" />
              <polygon points={plane(-1.5, -0.5, 2.5, 1.5, 1.5)} fill="#00DF81" opacity="0.5" />
              <polygon points={plane(0, 0, 2.5, 1.5, 1.5)} fill="#00DF81" opacity="0.5" />
            </g>
            {/* Connecting beam */}
            <path d={`M ${p(0, 0, 2).x} ${p(0, 0, 2).y} L 0 -50`} stroke="#00DF81" strokeWidth="3" strokeDasharray="4 4" opacity="0.8" filter="url(#neon-glow)" />
          </g>
        )}

      </g>
    </svg>
  );
}
