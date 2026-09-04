"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Eixo Z
      gsap.fromTo(
        ".manifesto-axis",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            end: "center center",
            scrub: true,
          },
        }
      );

      // Texto revelando no scroll
      gsap.fromTo(".manifesto-line", 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "center 45%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" ref={sectionRef} className="manifesto">
      {/* Texture & Shapes */}
      <div className="manifesto-shapes" aria-hidden="true">
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <pattern id="dot-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#00DF81" opacity="0.15" />
            </pattern>
            <radialGradient id="vignette" cx="50%" cy="50%" r="50%">
              <stop offset="20%" stopColor="#020b0a" stopOpacity="0" />
              <stop offset="100%" stopColor="#020b0a" stopOpacity="1" />
            </radialGradient>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
          <rect width="100%" height="100%" fill="url(#vignette)" />

          <line 
            className="manifesto-axis"
            x1="50%" y1="0" 
            x2="50%" y2="100%" 
            stroke="#0B453A" 
            strokeWidth="1" 
            strokeDasharray="4 8" 
            opacity="0.6" 
            style={{ transformOrigin: "top" }}
          />
        </svg>
      </div>

      <div className="container manifesto-inner">
        <div className="manifesto-text">
          <h2 className="manifesto-heading" ref={textRef}>
            <span className="manifesto-line manifesto-dim" style={{ display: "inline-block", marginRight: "0.25em" }}>
              Você traz a ideia.
            </span>
            <span className="manifesto-line manifesto-pri" style={{ display: "inline-block", marginRight: "0.25em" }}>
              Nós construímos
            </span>
            <br />
            <span className="manifesto-line manifesto-accent" style={{ display: "inline-block", marginRight: "0.25em" }}>
              a engenharia exata
            </span>
            <span className="manifesto-line manifesto-pri" style={{ display: "inline-block" }}>
              para ela existir.
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
}
