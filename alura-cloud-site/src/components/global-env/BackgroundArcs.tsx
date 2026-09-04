"use client";
import React from "react";

export default function BackgroundArcs() {
  return (
    <svg style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} xmlns="http://www.w3.org/2000/svg">
      <path d="M -10% 80% Q 50% -10% 110% 80%" fill="none" stroke="rgba(23, 135, 109, 0.08)" strokeWidth="0.8" strokeDasharray="6 6" />
      <path d="M 20% 120% Q 70% 30% 120% 100%" fill="none" stroke="rgba(44, 194, 149, 0.05)" strokeWidth="0.5" />
    </svg>
  );
}
