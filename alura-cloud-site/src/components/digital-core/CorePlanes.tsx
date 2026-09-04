"use client";
import { plane } from "./utils";

export default function CorePlanes() {
  const planes = [
    // Bottom group (Z=0)
    { cz: 0, r: 3.5, stroke: "#032221", strokeWidth: 2, fill: "rgba(3, 34, 33, 0.5)" },
    { cz: -0.2, r: 3.8, stroke: "#06302B", strokeWidth: 0.5, fill: "none", dasharray: "4 6" },
    
    // Middle group (Z=1.5)
    { cz: 1.5, r: 3.5, stroke: "#06302B", strokeWidth: 1.5, fill: "rgba(6, 48, 43, 0.4)" },
    { cz: 1.5, r: 1.5, stroke: "#095544", strokeWidth: 1, fill: "rgba(9, 85, 68, 0.15)" }, // Inner CPU
    
    // Top group (Z=3)
    { cz: 3, r: 3.5, stroke: "#17876D", strokeWidth: 1, fill: "rgba(23, 135, 109, 0.1)" },
    { cz: 3, r: 2.5, stroke: "#17876D", strokeWidth: 0.5, fill: "none", dasharray: "2 4" },
    
    // Core floating structure
    { cz: 4.5, r: 1.5, stroke: "#2CC295", strokeWidth: 1, fill: "rgba(44, 194, 149, 0.08)" },
    { cz: 5.2, r: 1.0, stroke: "#00DF81", strokeWidth: 0.5, fill: "rgba(0, 223, 129, 0.1)" },
    { cz: 6.0, r: 0.5, stroke: "#00DF81", strokeWidth: 0.5, fill: "rgba(0, 223, 129, 0.25)" }
  ];

  return (
    <g className="core-planes">
      {planes.map((p, i) => (
        <polygon 
          key={i} 
          points={plane(p.cz, p.r)} 
          stroke={p.stroke} 
          strokeWidth={p.strokeWidth} 
          fill={p.fill} 
        />
      ))}
    </g>
  );
}
