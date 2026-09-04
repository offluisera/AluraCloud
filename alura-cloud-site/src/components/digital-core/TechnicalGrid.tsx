"use client";
import { gridLines } from "./utils";

export default function TechnicalGrid() {
  // Grids inside the planes for technical depth
  const grids = [
    { cz: 0, r: 3.5, steps: 14, stroke: "#17876D", strokeWidth: 0.5, opacity: 0.15 },
    { cz: 1.5, r: 3.5, steps: 10, stroke: "#17876D", strokeWidth: 0.5, opacity: 0.25 },
    { cz: 3, r: 3.5, steps: 8, stroke: "#17876D", strokeWidth: 0.5, opacity: 0.35 }
  ];

  return (
    <g className="technical-grid">
      {grids.map((grid, i) => (
        <g key={i} opacity={grid.opacity}>
          {gridLines(grid.cz, grid.r, grid.steps).map((l, j) => (
            <line 
              key={j} 
              x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} 
              stroke={grid.stroke} 
              strokeWidth={grid.strokeWidth} 
            />
          ))}
        </g>
      ))}
    </g>
  );
}
