"use client";
import React from "react";

export default function ConnectionNetwork() {
  return (
    <svg 
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 2 }} 
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        {/* Subtle glow for the paths */}
        <filter id="path-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 
        Paths following isometric angles (slope 0.5). 
        Format: dx = 2 * dy
      */}
      <g fill="none" filter="url(#path-glow)">
        
        {/* Main Trunk - Left to Right */}
        <path 
          d="M -10% 70% L 20% 55% L 20% 85% L 50% 70% L 80% 85% L 110% 70%" 
          stroke="rgba(44, 194, 149, 0.15)" 
          strokeWidth="1" 
        />

        {/* Secondary Branches */}
        <path 
          d="M 20% 85% L 30% 90% L 60% 75%" 
          stroke="rgba(44, 194, 149, 0.08)" 
          strokeWidth="1" 
        />
        <path 
          d="M 50% 70% L 70% 60% L 90% 70% L 110% 60%" 
          stroke="rgba(44, 194, 149, 0.12)" 
          strokeWidth="1" 
        />
        
        {/* Upper Web */}
        <path 
          d="M -10% 40% L 15% 27.5% L 40% 40% L 40% 20% L 60% 10% L 80% 20% L 110% 5%" 
          stroke="rgba(44, 194, 149, 0.08)" 
          strokeWidth="1" 
        />
        <path 
          d="M 40% 40% L 60% 50% L 80% 40%" 
          stroke="rgba(44, 194, 149, 0.05)" 
          strokeWidth="1" 
        />

        {/* Vertical/Depth connectors (simulate dropping down a layer) */}
        <path 
          d="M 20% 55% L 20% 70%" 
          stroke="rgba(44, 194, 149, 0.2)" 
          strokeWidth="1" 
          strokeDasharray="2 4"
        />
        <path 
          d="M 50% 70% L 50% 85%" 
          stroke="rgba(44, 194, 149, 0.15)" 
          strokeWidth="1" 
          strokeDasharray="2 4"
        />
        <path 
          d="M 80% 20% L 80% 40%" 
          stroke="rgba(44, 194, 149, 0.1)" 
          strokeWidth="1" 
          strokeDasharray="2 4"
        />
      </g>
    </svg>
  );
}
