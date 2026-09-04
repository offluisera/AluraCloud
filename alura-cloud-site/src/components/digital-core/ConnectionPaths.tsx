"use client";
import { p, lineProps } from "./utils";

interface Connection {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  strokeWidth: number;
  opacity: number;
  dasharray?: string;
}

export default function ConnectionPaths() {
  const connections: Connection[] = [
    // Central glowing core pillar
    { ...lineProps(p(0, 0, 0), p(0, 0, 6)), stroke: "#ffffff", strokeWidth: 1.5, opacity: 0.8 },
    
    // Primary vertical connections (corner pillars for the identical planes r=3.5)
    // Connect Z=-0.5 to Z=4.5 at the 4 corners (protruding slightly like antennas)
    { ...lineProps(p(3.5, -3.5, -0.5), p(3.5, -3.5, 4.5)), stroke: "#00DF81", strokeWidth: 1.5, opacity: 0.7 },
    { ...lineProps(p(3.5, 3.5, -0.5), p(3.5, 3.5, 4.5)), stroke: "#00DF81", strokeWidth: 1, opacity: 0.6, dasharray: "4 6" },
    { ...lineProps(p(-3.5, 3.5, -0.5), p(-3.5, 3.5, 4.5)), stroke: "#2CC295", strokeWidth: 1, opacity: 0.8 },
    { ...lineProps(p(-3.5, -3.5, -0.5), p(-3.5, -3.5, 4.5)), stroke: "#17876D", strokeWidth: 0.5, opacity: 0.7, dasharray: "2 4" },
    
    // Midpoint structural pillars connecting Z=0 to Z=3
    { ...lineProps(p(0, 3.5, 0), p(0, 3.5, 3)), stroke: "#17876D", strokeWidth: 0.5, opacity: 0.5 },
    { ...lineProps(p(3.5, 0, 0), p(3.5, 0, 3)), stroke: "#17876D", strokeWidth: 0.5, opacity: 0.5 },
    { ...lineProps(p(0, -3.5, 0), p(0, -3.5, 3)), stroke: "#17876D", strokeWidth: 0.5, opacity: 0.3 },
    { ...lineProps(p(-3.5, 0, 0), p(-3.5, 0, 3)), stroke: "#17876D", strokeWidth: 0.5, opacity: 0.3 },

    // Data flow paths inside the grid (connecting inner points)
    { ...lineProps(p(1.5, -1.5, 1.5), p(1.5, -1.5, 5)), stroke: "#2CC295", strokeWidth: 0.5, opacity: 0.6, dasharray: "2 3" },
    { ...lineProps(p(-1.5, 1.5, 1.5), p(-1.5, 1.5, 5)), stroke: "#2CC295", strokeWidth: 0.5, opacity: 0.5, dasharray: "2 3" },
    
    // High-tech floating horizontal branches (extending out from top layer)
    { ...lineProps(p(3.5, 3.5, 3), { x: p(3.5, 3.5, 3).x + 100, y: p(3.5, 3.5, 3).y - 50 }), stroke: "#00DF81", strokeWidth: 0.5, opacity: 0.5 },
    { ...lineProps({ x: p(3.5, 3.5, 3).x + 100, y: p(3.5, 3.5, 3).y - 50 }, { x: p(3.5, 3.5, 3).x + 140, y: p(3.5, 3.5, 3).y - 50 }), stroke: "#00DF81", strokeWidth: 0.5, opacity: 0.5 },
    
    { ...lineProps(p(-3.5, 3.5, 3), { x: p(-3.5, 3.5, 3).x - 60, y: p(-3.5, 3.5, 3).y - 30 }), stroke: "#17876D", strokeWidth: 0.5, opacity: 0.6, dasharray: "3 3" },
  ];

  return (
    <g className="connection-paths">
      {connections.map((c, i) => (
        <line 
          key={i} 
          x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} 
          stroke={c.stroke} 
          strokeWidth={c.strokeWidth} 
          strokeDasharray={c.dasharray} 
          opacity={c.opacity} 
        />
      ))}
    </g>
  );
}
