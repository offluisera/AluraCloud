"use client";
import React from "react";

export default function GlobalGrid() {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}>
      <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="iso-grid-base" width="100" height="50" patternUnits="userSpaceOnUse">
            <path d="M50 0 L100 25 L50 50 L0 25 Z" fill="none" stroke="rgba(44, 194, 149, 0.05)" strokeWidth="0.5" />
            <path d="M0 25 L50 50 M100 25 L50 50" fill="none" stroke="rgba(44, 194, 149, 0.03)" strokeWidth="0.5" />
          </pattern>
        </defs>

        <rect width="100%" height="100%" fill="url(#iso-grid-base)" opacity="1" />
      </svg>
    </div>
  );
}
