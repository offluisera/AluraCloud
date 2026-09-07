"use client";
import React from "react";

/**
 * BlueprintGrid
 * Continuous technical grid with coordinate crosshairs and hairline rules,
 * establishing the high-precision software engineering aesthetic.
 */
export default function BlueprintGrid() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <svg
        style={{
          width: "100%",
          height: "100%",
          opacity: 0.85,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Sub-grid pattern (20px fine lines) */}
          <pattern id="bp-fine-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              stroke="rgba(0, 223, 129, 0.012)"
              strokeWidth="0.5"
            />
          </pattern>

          {/* Major grid pattern (100px with crosshairs at corners) */}
          <pattern id="bp-major-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="rgba(0, 223, 129, 0.035)"
              strokeWidth="1"
            />
            {/* Precision crosshairs at intersection */}
            <path
              d="M -4 0 L 4 0 M 0 -4 L 0 4"
              stroke="rgba(0, 223, 129, 0.1)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* Base Fine Grid */}
        <rect width="100%" height="100%" fill="url(#bp-fine-grid)" />
        {/* Major Coordinate Grid */}
        <rect width="100%" height="100%" fill="url(#bp-major-grid)" />
      </svg>
    </div>
  );
}
