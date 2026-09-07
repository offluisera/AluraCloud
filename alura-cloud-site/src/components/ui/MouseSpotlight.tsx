"use client";
import React, { useEffect, useRef } from "react";

/**
 * MouseSpotlight
 * Ambient cursor-following radial light with CSS custom properties
 * updates (--mouse-x, --mouse-y) for interactive border-lighting across cards.
 */
export default function MouseSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only activate on devices with a fine pointer (mouse/trackpad)
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      posRef.current.targetX = e.clientX;
      posRef.current.targetY = e.clientY;

      // Immediately set documentElement custom properties for instant CSS calculations
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    const updateSmoothPosition = () => {
      const p = posRef.current;
      // Smooth interpolation for the ambient glow
      p.x += (p.targetX - p.x) * 0.15;
      p.y += (p.targetY - p.y) * 0.15;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${p.x - 300}px, ${p.y - 300}px, 0)`;
      }

      rafId.current = requestAnimationFrame(updateSmoothPosition);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    rafId.current = requestAnimationFrame(updateSmoothPosition);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <div
        ref={spotlightRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle closest-side, rgba(0, 223, 129, 0.05) 0%, rgba(3, 98, 76, 0.015) 50%, transparent 100%)",
          willChange: "transform",
          transform: "translate3d(-1000px, -1000px, 0)",
          filter: "blur(20px)",
        }}
      />
    </div>
  );
}
