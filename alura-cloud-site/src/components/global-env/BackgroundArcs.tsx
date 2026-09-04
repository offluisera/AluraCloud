"use client";
import React from "react";

export default function BackgroundArcs() {
  return (
    <svg style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      {/* 
        Large organic curves to contrast with the strict isometric grid.
        These represent macro energy flows or gravity wells in the system.
      */}
      <path 
        d="M -20% 100% Q 40% -20% 120% 80%" 
        fill="none" 
        stroke="rgba(23, 135, 109, 0.05)" 
        strokeWidth="1.5" 
        strokeDasharray="4 8" 
      />
      
      <path 
        d="M 10% 120% Q 70% 20% 130% 90%" 
        fill="none" 
        stroke="rgba(44, 194, 149, 0.03)" 
        strokeWidth="1" 
      />

      <path 
        d="M -30% 60% Q 50% 130% 110% 20%" 
        fill="none" 
        stroke="rgba(44, 194, 149, 0.02)" 
        strokeWidth="2" 
      />
    </svg>
  );
}
