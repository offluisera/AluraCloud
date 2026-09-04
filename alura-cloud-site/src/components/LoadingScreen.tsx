"use client";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";

const MIN_DISPLAY_MS = 2200;
const FADE_MS = 700;

/**
 * LoadingScreen — V2
 * Clean loading with Logo diamond, grid background, and progress bar.
 * Removed OrbNest dependency (glassmorphism era).
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const start = Date.now();

    const dismiss = () => {
      const elapsed = Date.now() - start;
      const delay = Math.max(0, MIN_DISPLAY_MS - elapsed);

      setTimeout(() => {
        setFading(true);
        setTimeout(() => setVisible(false), FADE_MS);
      }, delay);
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
      const fallback = setTimeout(dismiss, 4000);
      return () => {
        window.removeEventListener("load", dismiss);
        clearTimeout(fallback);
      };
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#060C0B",
        opacity: fading ? 0 : 1,
        transition: `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        pointerEvents: fading ? "none" : "all",
        gap: "2rem",
      }}
    >
      {/* Background grid */}
      <svg
        aria-hidden
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }}
      >
        <defs>
          <pattern id="loading-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00DF81" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#loading-grid)" />
      </svg>

      {/* Logo diamond with pulse */}
      <div
        style={{
          opacity: fading ? 0 : 1,
          transform: fading ? "scale(0.9)" : "scale(1)",
          transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
          animation: "loading-pulse 2s ease-in-out infinite",
        }}
      >
        <Logo size={64} />
      </div>

      {/* Brand text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(8px)" : "translateY(0)",
          transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: "1.25rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#EDF5F2",
          }}
        >
          ALURA CLOUD
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            fontSize: "0.6875rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#3D5550",
          }}
        >
          Estúdio de Engenharia Digital
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "1px",
          width: "100%",
          background: "var(--border, #142220)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #00DF81, #2CC295)",
            animation: `loading-bar ${MIN_DISPLAY_MS}ms cubic-bezier(0.4, 0, 0.2, 1) forwards`,
          }}
        />
      </div>

      <style>{`
        @keyframes loading-bar {
          from { width: 0%; opacity: 1; }
          to   { width: 100%; opacity: 1; }
        }
        @keyframes loading-pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
