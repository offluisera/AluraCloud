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
    <svg style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 3 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="stream-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Main Trunk Streams */}
      <g filter="url(#stream-glow)">
        <circle r="6" fill="#00DF81">
          <animateMotion dur="10s" repeatCount="indefinite" path="M -200 750 L 380 460 L 380 920 L 960 630 L 1530 920 L 2100 630" />
        </circle>
        {/* Fast secondary packet on main trunk, delayed */}
        <circle r="4" fill="#fff">
          <animateMotion dur="6s" begin="2s" repeatCount="indefinite" path="M -200 750 L 380 460 L 380 920 L 960 630 L 1530 920 L 2100 630" />
        </circle>
      </g>

      {/* Secondary Streams */}
      <g filter="url(#stream-glow)">
        <circle r="5" fill="var(--color-caribbean-green)">
          <animateMotion dur="8s" begin="1s" repeatCount="indefinite" path="M 380 920 L 570 1015 L 1150 725" />
        </circle>
        <circle r="5" fill="var(--color-caribbean-green)">
          <animateMotion dur="7s" begin="3s" repeatCount="indefinite" path="M 960 630 L 1340 440 L 1720 630 L 2100 440" />
        </circle>
      </g>

      {/* Upper Web Streams */}
      <g filter="url(#stream-glow)">
        <circle r="4" fill="#fff">
          <animateMotion dur="14s" repeatCount="indefinite" path="M -200 430 L 280 190 L 760 430 L 760 215 L 1150 20 L 1530 215 L 2100 0" />
        </circle>
        <circle r="5" fill="#00DF81">
          <animateMotion dur="12s" begin="5s" repeatCount="indefinite" path="M -200 430 L 280 190 L 760 430 L 760 215 L 1150 20 L 1530 215 L 2100 0" />
        </circle>
        
        <circle r="4" fill="var(--color-caribbean-green)">
          <animateMotion dur="6s" repeatCount="indefinite" path="M 760 430 L 1150 625 L 1530 430" />
        </circle>
      </g>
    </svg>
  );
}
