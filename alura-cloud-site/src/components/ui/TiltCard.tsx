"use client";
import React, { useRef, useState, useCallback } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // max tilt degrees (e.g. 10)
  scale?: number;   // hover scale (e.g. 1.02)
  spotlight?: boolean; // enable cursor spotlight reflection
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  scale = 1.02,
  spotlight = true,
  onClick,
  style,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Normalized coordinates from -1 to 1
      const xNorm = (clientX / rect.width) * 2 - 1;
      const yNorm = (clientY / rect.height) * 2 - 1;

      // Rotation angles (inverted Y for natural tilt)
      const rotX = -yNorm * maxTilt;
      const rotY = xNorm * maxTilt;

      setTransformStyle(
        `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(${scale}, ${scale}, 1)`
      );

      if (spotlight) {
        setSpotlightPos({
          x: (clientX / rect.width) * 100,
          y: (clientY / rect.height) * 100,
          opacity: 1,
        });
      }
    },
    [maxTilt, scale, spotlight]
  );

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    if (spotlight) {
      setSpotlightPos((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [spotlight]);

  return (
    <div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      style={{
        transform: transformStyle,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
        position: "relative",
        width: "100%",
        display: "block",
        ...style,
      }}
    >
      {spotlight && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            pointerEvents: "none",
            zIndex: 3,
            background: `radial-gradient(circle 240px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(0, 223, 129, 0.12) 0%, transparent 80%)`,
            opacity: spotlightPos.opacity,
            transition: "opacity 0.3s ease",
          }}
        />
      )}
      {children}
    </div>
  );
}
