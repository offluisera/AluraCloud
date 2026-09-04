"use client";
import React from "react";

export default function DataStreams() {
  return (
    <svg style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 3 }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <filter id="stream-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Stream 1 traveling along Path 1 */}
      <circle r="2" fill="var(--color-caribbean-green)" filter="url(#stream-glow)">
        <animateMotion 
          dur="12s" 
          repeatCount="indefinite" 
          path="M 5% 95% L 20% 80% L 20% 40% L 40% 20% L 80% 20% L 95% 5%" 
        />
      </circle>

      {/* Stream 2 traveling along Path 2 with offset */}
      <circle r="1.5" fill="var(--text-pri)" filter="url(#stream-glow)">
        <animateMotion 
          dur="18s" 
          repeatCount="indefinite" 
          path="M 85% 105% L 75% 95% L 75% 65% L 45% 35% L 10% 35%" 
        />
      </circle>
    </svg>
  );
}
