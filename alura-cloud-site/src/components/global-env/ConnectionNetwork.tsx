"use client";
import React from "react";

export default function ConnectionNetwork() {
  // SVG viewBox is normalized to percentage-like coordinates using vector-effect for non-scaling stroke
  return (
    <svg 
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2 }} 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <g stroke="rgba(44, 194, 149, 0.15)" strokeWidth="1" fill="none">
        <path d="M 5% 95% L 20% 80% L 20% 40% L 40% 20% L 80% 20% L 95% 5%" />
        <path d="M 85% 105% L 75% 95% L 75% 65% L 45% 35% L 10% 35%" opacity="0.6" />
      </g>
    </svg>
  );
}
