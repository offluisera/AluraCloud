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
        repeatDelay: "random(0.5, 4)",
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
    <svg ref={nodesRef} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 4 }} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Main Trunk Nodes */}
      <circle className="ambient-node" cx="20%" cy="55%" r="2" fill="var(--color-caribbean-green)" filter="url(#node-glow)" />
      <circle className="core-node" cx="20%" cy="85%" r="3" fill="#00DF81" filter="url(#node-glow)" />
      <circle className="core-node" cx="50%" cy="70%" r="3" fill="#00DF81" filter="url(#node-glow)" />
      <circle className="ambient-node" cx="80%" cy="85%" r="2" fill="var(--color-caribbean-green)" filter="url(#node-glow)" />

      {/* Secondary Nodes */}
      <circle className="ambient-node" cx="30%" cy="90%" r="1.5" fill="#fff" />
      <circle className="ambient-node" cx="60%" cy="75%" r="1.5" fill="#fff" />
      <circle className="ambient-node" cx="70%" cy="60%" r="1.5" fill="#fff" />
      <circle className="ambient-node" cx="90%" cy="70%" r="1.5" fill="#fff" />

      {/* Upper Web Nodes */}
      <circle className="ambient-node" cx="15%" cy="27.5%" r="1.5" fill="var(--color-caribbean-green)" filter="url(#node-glow)" />
      <circle className="core-node" cx="40%" cy="40%" r="2.5" fill="#00DF81" filter="url(#node-glow)" />
      <circle className="ambient-node" cx="40%" cy="20%" r="2" fill="var(--color-caribbean-green)" filter="url(#node-glow)" />
      <circle className="ambient-node" cx="60%" cy="10%" r="1.5" fill="#fff" />
      <circle className="ambient-node" cx="80%" cy="20%" r="1.5" fill="#fff" />
      <circle className="ambient-node" cx="60%" cy="50%" r="1.5" fill="#fff" filter="url(#node-glow)" />
      <circle className="ambient-node" cx="80%" cy="40%" r="1.5" fill="#fff" filter="url(#node-glow)" />

    </svg>
  );
}
