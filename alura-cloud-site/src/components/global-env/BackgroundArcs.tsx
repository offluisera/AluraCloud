"use client";
import React from "react";

export default function BackgroundArcs() {
  return (
    <svg style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      {/* 
        Large organic curves to contrast with the strict isometric grid.
        These represent macro energy flows or gravity wells in the system.
      */}
      <path 
        d="M -384 1080 Q 768 -216 2304 864" 
        fill="none" 
        stroke="rgba(23, 135, 109, 0.05)" 
        strokeWidth="3" 
        strokeDasharray="8 16" 
      />
      
      <path 
        d="M 192 1296 Q 1344 216 2496 972" 
        fill="none" 
        stroke="rgba(44, 194, 149, 0.03)" 
        strokeWidth="2" 
      />

      <path 
        d="M -576 648 Q 960 1404 2112 216" 
        fill="none" 
        stroke="rgba(44, 194, 149, 0.02)" 
        strokeWidth="4" 
      />
    </svg>
  );
}
