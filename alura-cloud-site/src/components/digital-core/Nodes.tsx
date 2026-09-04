"use client";
import { p } from "./utils";

export default function Nodes() {
  const nodes = [
    // Top antenna points (Z=4.5, protruding)
    { cx: p(3.5, -3.5, 4.5).x, cy: p(3.5, -3.5, 4.5).y, r: 2.5, fill: "#00DF81", filter: "url(#node-glow-sm)", active: true },
    { cx: p(3.5, 3.5, 4.5).x, cy: p(3.5, 3.5, 4.5).y, r: 1.5, fill: "#00DF81" },
    { cx: p(-3.5, 3.5, 4.5).x, cy: p(-3.5, 3.5, 4.5).y, r: 2, fill: "#2CC295" },
    { cx: p(-3.5, -3.5, 4.5).x, cy: p(-3.5, -3.5, 4.5).y, r: 2, fill: "#17876D" },
    
    // Top main plane corners (Z=3, r=3.5)
    { cx: p(3.5, -3.5, 3).x, cy: p(3.5, -3.5, 3).y, r: 3, fill: "#00DF81", filter: "url(#node-glow-sm)", active: true },
    { cx: p(3.5, 3.5, 3).x, cy: p(3.5, 3.5, 3).y, r: 2.5, fill: "#2CC295" },
    { cx: p(-3.5, 3.5, 3).x, cy: p(-3.5, 3.5, 3).y, r: 2, fill: "#17876D" },
    { cx: p(-3.5, -3.5, 3).x, cy: p(-3.5, -3.5, 3).y, r: 2, fill: "#17876D" },
    
    // Core plane nodes (Z=4.5, r=1.5)
    { cx: p(1.5, 1.5, 4.5).x, cy: p(1.5, 1.5, 4.5).y, r: 2.5, fill: "#00DF81", filter: "url(#node-glow-sm)", active: true },
    { cx: p(-1.5, -1.5, 4.5).x, cy: p(-1.5, -1.5, 4.5).y, r: 2, fill: "#2CC295" },
    { cx: p(1.5, -1.5, 4.5).x, cy: p(1.5, -1.5, 4.5).y, r: 1.5, fill: "#17876D" },
    { cx: p(-1.5, 1.5, 4.5).x, cy: p(-1.5, 1.5, 4.5).y, r: 1.5, fill: "#17876D" },

    // Base outer points (Z=-0.5, protruding bottom)
    { cx: p(3.5, -3.5, -0.5).x, cy: p(3.5, -3.5, -0.5).y, r: 2, fill: "#06302B" },
    { cx: p(-3.5, -3.5, -0.5).x, cy: p(-3.5, -3.5, -0.5).y, r: 2, fill: "#06302B" },
    { cx: p(3.5, 3.5, -0.5).x, cy: p(3.5, 3.5, -0.5).y, r: 2, fill: "#06302B" },
    { cx: p(-3.5, 3.5, -0.5).x, cy: p(-3.5, 3.5, -0.5).y, r: 2, fill: "#06302B" },
    
    // Abstract floating data points
    { cx: p(4.5, 2, 2.5).x, cy: p(4.5, 2, 2.5).y, r: 2, fill: "#00DF81", filter: "url(#node-glow-sm)", active: true },
    { cx: p(-2, -4, 5).x, cy: p(-2, -4, 5).y, r: 1.5, fill: "#2CC295" },
    { cx: p(-4, 3, 1).x, cy: p(-4, 3, 1).y, r: 2, fill: "#17876D" },
  ];

  return (
    <g className="nodes">
      {nodes.map((n, i) => (
        <circle 
          key={i} 
          cx={n.cx} cy={n.cy} r={n.r} 
          fill={n.fill} 
          filter={n.filter} 
          className={n.active ? "node-active" : ""} 
          style={{ animationDelay: `${(i * 0.3) % 2}s` }}
        />
      ))}
    </g>
  );
}
