"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import BackgroundArcs from "./BackgroundArcs";
import ConnectionNetwork from "./ConnectionNetwork";
import DataStreams from "./DataStreams";
import AmbientNodes from "./AmbientNodes";

export default function GlobalEnvironment() {
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !containerRef.current || !parallaxRef.current) return;

    // ScrollTrigger Integration for intensity control
    let ctx = gsap.context(() => {});

    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      ctx.add(() => {
        // Change global environment opacity/glow when scrolling through the site
        // This is a subtle overall effect, simulating diving deeper into the system
        ScrollTrigger.create({
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          animation: gsap.to(parallaxRef.current, {
            opacity: 0.7, // Dims slightly as we go down
            ease: "none"
          })
        });
      });
    });

    return () => {
      ctx.revert();
    };
  }, [isMounted]);

  return (
    <div 
      ref={containerRef}
      className="global-environment"
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: -1, background: "var(--bg-deep)", overflow: "hidden" }}
    >
      <div 
        ref={parallaxRef} 
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" }}
      >
        <svg style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" }} xmlns="http://www.w3.org/2000/svg">
          {/* Ambient Glow base */}
          <radialGradient id="globalGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0, 223, 129, 0.08)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>
          <rect width="100%" height="100%" fill="url(#globalGlow)" />
        </svg>

        <BackgroundArcs />
        <ConnectionNetwork />
        <DataStreams />
        <AmbientNodes />
      </div>
    </div>
  );
}
