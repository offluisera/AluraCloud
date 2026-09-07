"use client";
import React from "react";

export default function ConnectionNetwork() {
  return (
    <svg 
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2 }} 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="path-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <g fill="none" filter="url(#path-glow)">
        
        {/* Main Trunk */}
        <path 
          d="M -200 750 L 380 460 L 380 920 L 960 630 L 1530 920 L 2100 630" 
          stroke="rgba(44, 194, 149, 0.15)" 
          strokeWidth="2" 
        />

        {/* Secondary Branches */}
        <path 
          d="M 380 920 L 570 1015 L 1150 725" 
          stroke="rgba(44, 194, 149, 0.08)" 
          strokeWidth="2" 
        />
        <path 
          d="M 960 630 L 1340 440 L 1720 630 L 2100 440" 
          stroke="rgba(44, 194, 149, 0.12)" 
          strokeWidth="2" 
        />
        
        {/* Upper Web */}
        <path 
          d="M -200 430 L 280 190 L 760 430 L 760 215 L 1150 20 L 1530 215 L 2100 0" 
          stroke="rgba(44, 194, 149, 0.08)" 
          strokeWidth="2" 
        />
        <path 
          d="M 760 430 L 1150 625 L 1530 430" 
          stroke="rgba(44, 194, 149, 0.05)" 
          strokeWidth="2" 
        />

        {/* Vertical/Depth connectors */}
        <path 
          d="M 380 460 L 380 750" 
          stroke="rgba(44, 194, 149, 0.2)" 
          strokeWidth="2" 
          strokeDasharray="4 8"
        />
        <path 
          d="M 960 630 L 960 920" 
          stroke="rgba(44, 194, 149, 0.15)" 
          strokeWidth="2" 
          strokeDasharray="4 8"
        />
        <path 
          d="M 1530 215 L 1530 430" 
          stroke="rgba(44, 194, 149, 0.1)" 
          strokeWidth="2" 
          strokeDasharray="4 8"
        />
      </g>
    </svg>
  );
}
