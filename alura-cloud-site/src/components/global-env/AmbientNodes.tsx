"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AmbientNodes() {
  const nodesRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Tech pulse effect: quick flashes like a processor, not smooth sine waves
      gsap.to(".ambient-node", {
        opacity: 0.1,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
        repeatDelay: "random(0.5, 4)" as any,
        stagger: {
          each: 0.1,
          from: "random"
        }
      });
      
      // Smooth pulse for larger nodes
      gsap.to(".core-node", {
        scale: 1.5,
        opacity: 0.4,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "center"
      });
    }, nodesRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg ref={nodesRef} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 4 }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Main Trunk Nodes */}
      <circle className="ambient-node" cx="380" cy="460" r="4" fill="var(--color-caribbean-green)" filter="url(#node-glow)" />
      <circle className="core-node" cx="380" cy="920" r="6" fill="#00DF81" filter="url(#node-glow)" />
      <circle className="core-node" cx="960" cy="630" r="6" fill="#00DF81" filter="url(#node-glow)" />
      <circle className="ambient-node" cx="1530" cy="920" r="4" fill="var(--color-caribbean-green)" filter="url(#node-glow)" />

      {/* Secondary Nodes */}
      <circle className="ambient-node" cx="570" cy="1015" r="3" fill="#fff" />
      <circle className="ambient-node" cx="1150" cy="725" r="3" fill="#fff" />
      <circle className="ambient-node" cx="1340" cy="440" r="3" fill="#fff" />
      <circle className="ambient-node" cx="1720" cy="630" r="3" fill="#fff" />

      {/* Upper Web Nodes */}
      <circle className="ambient-node" cx="280" cy="190" r="3" fill="var(--color-caribbean-green)" filter="url(#node-glow)" />
      <circle className="core-node" cx="760" cy="430" r="5" fill="#00DF81" filter="url(#node-glow)" />
      <circle className="ambient-node" cx="760" cy="215" r="4" fill="var(--color-caribbean-green)" filter="url(#node-glow)" />
      <circle className="ambient-node" cx="1150" cy="20" r="3" fill="#fff" />
      <circle className="ambient-node" cx="1530" cy="215" r="3" fill="#fff" />
      <circle className="ambient-node" cx="1150" cy="625" r="3" fill="#fff" filter="url(#node-glow)" />
      <circle className="ambient-node" cx="1530" cy="430" r="3" fill="#fff" filter="url(#node-glow)" />

    </svg>
  );
}
