"use client";
import { p } from "./utils";

export default function CoreGlow() {
  const center = p(0, 0, 3.5);

  return (
    <g className="core-glow">
      <defs>
        <radialGradient id="core-glow-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00DF81" stopOpacity="0.4" />
          <stop offset="30%" stopColor="#00DF81" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#00DF81" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Halo radial amplo */}
      <circle cx={center.x} cy={center.y} r="180" fill="url(#core-glow-grad)" />
      
      {/* Núcleo central intenso */}
      <circle cx={center.x} cy={center.y} r="4" fill="#ffffff" filter="url(#node-glow)" />
      <circle cx={center.x} cy={center.y} r="8" fill="#00DF81" filter="url(#node-glow)" opacity="0.8" />
    </g>
  );
}
