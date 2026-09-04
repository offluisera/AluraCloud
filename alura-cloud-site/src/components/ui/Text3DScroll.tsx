"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Text3DScroll({ 
  text, 
  className = "",
  start = "top 90%",
  end = "center 40%"
}: { 
  text: string; 
  className?: string;
  start?: string;
  end?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // We only animate if the user hasn't requested reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const chars = containerRef.current.querySelectorAll('.ts-char');
    
    // The Skiper31 effect: 3D perspective fold down letter by letter, tied to scroll.
    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          rotateX: -80,
          y: 40,
          z: -100,
          scale: 0.8
        },
        {
          opacity: 1,
          rotateX: 0,
          y: 0,
          z: 0,
          scale: 1,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: start,
            end: end,
            scrub: 1,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [start, end]);

  return (
    <span 
      ref={containerRef} 
      className={className} 
      style={{ perspective: "1000px", display: "inline-block" }}
    >
      {text.split("").map((char, i) => (
        <span 
          key={i} 
          className="ts-char" 
          style={{ 
            display: "inline-block", 
            transformOrigin: "50% 100%", 
            willChange: "transform, opacity",
            whiteSpace: char === " " ? "pre" : "normal"
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
