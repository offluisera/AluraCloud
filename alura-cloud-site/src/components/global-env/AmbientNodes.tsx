"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AmbientNodes() {
  const nodesRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle pulsing effect for the nodes
      gsap.to(".ambient-node", {
        opacity: 0.3,
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.5,
          from: "random"
        }
      });
    }, nodesRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg ref={nodesRef} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 4 }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Nodes matching connection path vertices and other ambient locations */}
      <circle className="ambient-node" cx="5%" cy="95%" r="1.5" fill="var(--text-pri)" filter="url(#node-glow)" />
      <circle className="ambient-node" cx="20%" cy="80%" r="2" fill="var(--color-caribbean-green)" filter="url(#node-glow)" />
      <circle className="ambient-node" cx="20%" cy="40%" r="1.5" fill="var(--text-pri)" filter="url(#node-glow)" />
      <circle className="ambient-node" cx="40%" cy="20%" r="2" fill="var(--color-caribbean-green)" filter="url(#node-glow)" />
      <circle className="ambient-node" cx="80%" cy="20%" r="1.5" fill="var(--text-pri)" filter="url(#node-glow)" />
      <circle className="ambient-node" cx="95%" cy="5%" r="1.5" fill="var(--text-pri)" filter="url(#node-glow)" />

      <circle className="ambient-node" cx="75%" cy="95%" r="1.5" fill="var(--text-pri)" filter="url(#node-glow)" />
      <circle className="ambient-node" cx="75%" cy="65%" r="2" fill="var(--color-mountain-meadow)" filter="url(#node-glow)" />
      <circle className="ambient-node" cx="45%" cy="35%" r="1.5" fill="var(--text-pri)" filter="url(#node-glow)" />
      <circle className="ambient-node" cx="10%" cy="35%" r="1.5" fill="var(--text-pri)" filter="url(#node-glow)" />
    </svg>
  );
}
