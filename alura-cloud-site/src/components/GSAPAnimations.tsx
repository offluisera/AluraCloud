"use client";
import { useEffect, useRef } from "react";

/**
 * GSAPAnimations V2 — ScrollTrigger-based reveal animations.
 * Targets elements with .reveal, .reveal-left, .reveal-right classes.
 * Uses dynamic imports for code splitting.
 */
export default function GSAPAnimations() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Show everything immediately
      document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
      });
      return;
    }

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // --- Reveal up ---
      document.querySelectorAll(".reveal").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      // --- Reveal left ---
      document.querySelectorAll(".reveal-left").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      // --- Reveal right ---
      document.querySelectorAll(".reveal-right").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      });

      // --- Section headings ---
      document.querySelectorAll("section h2").forEach((el) => {
        if (el.closest("#inicio") || el.closest("#manifesto")) return; // Custom animations
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // --- Contact headline dramatic ---
      const contactH = document.querySelector("#contato h2");
      if (contactH) {
        gsap.fromTo(
          contactH,
          { opacity: 0, y: 60, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: contactH,
              start: "top 80%",
            },
          }
        );
      }
    };

    init().catch(console.error);

    return () => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      });
    };
  }, []);

  return null;
}
