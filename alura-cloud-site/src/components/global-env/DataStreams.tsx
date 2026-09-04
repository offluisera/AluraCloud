"use client";
import React from "react";

export default function DataStreams() {
  const paths = {
    mainTrunk: "M -10% 70% L 20% 55% L 20% 85% L 50% 70% L 80% 85% L 110% 70%",
    sec1: "M 20% 85% L 30% 90% L 60% 75%",
    sec2: "M 50% 70% L 70% 60% L 90% 70% L 110% 60%",
    upper: "M -10% 40% L 15% 27.5% L 40% 40% L 40% 20% L 60% 10% L 80% 20% L 110% 5%",
    upperSec: "M 40% 40% L 60% 50% L 80% 40%"
  };

  return (
    <svg style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 3 }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <filter id="stream-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        {/* Laser beam gradient */}
        <linearGradient id="laser" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(0, 223, 129, 0)" />
          <stop offset="50%" stopColor="rgba(0, 223, 129, 1)" />
          <stop offset="100%" stopColor="rgba(0, 223, 129, 0)" />
        </linearGradient>
      </defs>

      {/* Main Trunk Streams */}
      <g filter="url(#stream-glow)">
        <circle r="2.5" fill="#00DF81">
          <animateMotion dur="10s" repeatCount="indefinite" path={paths.mainTrunk} />
        </circle>
        {/* Fast secondary packet on main trunk, delayed */}
        <circle r="1.5" fill="#fff">
          <animateMotion dur="6s" begin="2s" repeatCount="indefinite" path={paths.mainTrunk} />
        </circle>
      </g>

      {/* Secondary Streams */}
      <g filter="url(#stream-glow)">
        <circle r="2" fill="var(--color-caribbean-green)">
          <animateMotion dur="8s" begin="1s" repeatCount="indefinite" path={paths.sec1} />
        </circle>
        <circle r="2" fill="var(--color-caribbean-green)">
          <animateMotion dur="7s" begin="3s" repeatCount="indefinite" path={paths.sec2} />
        </circle>
      </g>

      {/* Upper Web Streams */}
      <g filter="url(#stream-glow)">
        <circle r="1.5" fill="#fff">
          <animateMotion dur="14s" repeatCount="indefinite" path={paths.upper} />
        </circle>
        <circle r="2" fill="#00DF81">
          <animateMotion dur="12s" begin="5s" repeatCount="indefinite" path={paths.upper} />
        </circle>
        
        <circle r="1.5" fill="var(--color-caribbean-green)">
          <animateMotion dur="6s" repeatCount="indefinite" path={paths.upperSec} />
        </circle>
      </g>
    </svg>
  );
}
