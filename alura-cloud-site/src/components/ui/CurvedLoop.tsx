"use client";
import React from "react";

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
  className?: string;
  textPri?: string;
  textAccent?: string;
}

export default function CurvedLoop({
  marqueeText, // kept for backward compatibility if needed
  speed = 10,
  direction = "left",
  interactive = false,
  className = "",
  textPri = "Você traz a ideia",
  textAccent = "e Nós construímos o que é necessário para ela existir."
}: CurvedLoopProps) {
  const animationName = direction === "left" ? "marquee-left" : "marquee-right";
  const duration = `${100 / speed}s`;

  const content = (
    <div className="flex items-center gap-12 px-6">
      <span className="marquee-pri">{textPri}</span>
      <span className="marquee-accent">{textAccent}</span>
      <span className="marquee-separator">✦</span>
    </div>
  );

  return (
    <div className={`marquee-container ${className}`}>
      {/* We duplicate the content multiple times to ensure continuous infinite looping */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`marquee-content ${interactive ? "interactive" : ""}`}
          style={{
            animation: `${animationName} ${duration} linear infinite`,
            display: "flex",
            alignItems: "center"
          }}
        >
          {content}
        </div>
      ))}
    </div>
  );
}
