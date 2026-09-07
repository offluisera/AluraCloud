"use client";
import { useEffect, useRef } from "react";
import { process as steps } from "@/data";
import SectionEyebrow from "@/components/ui/SectionEyebrow";

/* ══════════════════════════════════════════════════════════
   SVG COORDINATE SYSTEM
   The canvas is position:relative with height = CANVAS_H px.
   The SVG stretches to fill it via preserveAspectRatio="none".
   Card `top` percentages = nodeY(i)/SVG_H * 100 — always aligned.
   ══════════════════════════════════════════════════════════ */
const SVG_W = 1000;
const PAD_V = 120;          // top/bottom padding (SVG units)
const ROW_H = 310;          // vertical distance between nodes (SVG units)
const SVG_H = PAD_V * 2 + (steps.length - 1) * ROW_H + ROW_H;
// NX_L/R must match the visual center of left/right cards (% of SVG_W)
const NX_L  = 148;          // 14.8% → left card center
const NX_R  = 852;          // 85.2% → right card center
const NX_C  = 500;          // bezier control x (screen center)

const nodeX = (i: number) => i % 2 === 0 ? NX_L : NX_R;
const nodeY = (i: number) => PAD_V + i * ROW_H + ROW_H / 2;

/** Single snaking cubic-bezier path through all 6 nodes */
function buildPath(): string {
  let d = `M ${nodeX(0)},${nodeY(0)}`;
  for (let i = 0; i < steps.length - 1; i++) {
    const x2 = nodeX(i + 1);
    const y1 = nodeY(i);
    const y2 = nodeY(i + 1);
    // S-curve through screen center
    d += ` C ${NX_C},${y1} ${NX_C},${y2} ${x2},${y2}`;
  }
  return d;
}

const PATH_D = buildPath();

/**
 * Scroll progress (0–1) when each card should appear.
 * Trigger slightly before the glow dot arrives so the card
 * is ready when the line reaches it.
 */
const THRESHOLDS = steps.map((_, i) =>
  Math.max(0, nodeY(i) / SVG_H - 0.055)
);

/* ══════════════════════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════════════════════ */
export default function Process() {
  const sectionRef   = useRef<HTMLElement>(null);
  const pathRef      = useRef<SVGPathElement>(null);
  const pathBlurRef  = useRef<SVGPathElement>(null);
  const headRef      = useRef<SVGCircleElement>(null);
  const headGlowRef  = useRef<SVGCircleElement>(null);
  const headCoreRef  = useRef<SVGCircleElement>(null);
  const nodeRefs     = useRef<(SVGGElement | null)[]>([]);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const path     = pathRef.current;
    const pathBlur = pathBlurRef.current;
    const section  = sectionRef.current;
    if (!path || !section) return;

    const totalLen = path.getTotalLength();

    /* ── Initial state ── */
    [path, pathBlur].forEach(p => {
      if (!p) return;
      p.style.strokeDasharray  = `${totalLen}`;
      p.style.strokeDashoffset = `${totalLen}`;
    });
    [headRef, headGlowRef, headCoreRef].forEach(r => {
      if (r.current) r.current.style.opacity = "0";
    });
    nodeRefs.current.forEach(g => { if (g) g.style.opacity = "0"; });

    /* ── Scroll progress: 0 when section enters bottom, 1 when exits top ── */
    const sectionEl = section as HTMLElement;
    const pathEl    = path as SVGPathElement;

    function getProgress(): number {
      const rect = sectionEl.getBoundingClientRect();
      const vh   = window.innerHeight;
      const scrolled = vh - rect.top;
      const total    = rect.height + vh;
      return Math.max(0, Math.min(1, scrolled / total));
    }

    function tick() {
      const p = getProgress();

      /* 1 — Draw path */
      const drawn  = totalLen * p;
      const offset = `${totalLen - drawn}`;
      pathEl.style.strokeDashoffset = offset;
      if (pathBlur) pathBlur.style.strokeDashoffset = offset;

      /* 2 — Glow head */
      const headVisible = drawn > 4;
      const op = headVisible ? "1" : "0";
      if (headRef.current)     headRef.current.style.opacity = op;
      if (headGlowRef.current) headGlowRef.current.style.opacity = op;
      if (headCoreRef.current) headCoreRef.current.style.opacity = op;

      if (headVisible) {
        const pt = pathEl.getPointAtLength(Math.min(drawn, totalLen - 0.1));
        const cx = `${pt.x}`, cy = `${pt.y}`;
        headRef.current?.setAttribute("cx", cx);
        headRef.current?.setAttribute("cy", cy);
        headGlowRef.current?.setAttribute("cx", cx);
        headGlowRef.current?.setAttribute("cy", cy);
        headCoreRef.current?.setAttribute("cx", cx);
        headCoreRef.current?.setAttribute("cy", cy);
      }

      /* 3 — Cards & nodes */
      THRESHOLDS.forEach((threshold, i) => {
        const active = p >= threshold;
        const card   = cardRefs.current[i];
        const node   = nodeRefs.current[i];
        if (card) {
          if (active) card.classList.add("proc-card--active");
          else        card.classList.remove("proc-card--active");
        }
        if (node) node.style.opacity = active ? "1" : "0";
      });
    }

    window.addEventListener("scroll", tick, { passive: true });
    tick(); // run once on mount in case section is already in view

    return () => {
      window.removeEventListener("scroll", tick);
    };
  }, []);

  return (
    <section id="processo" className="section process" ref={sectionRef}>
      {/* Single container wraps header + canvas so cards respect gutters */}
      <div className="container proc-outer">
        {/* ── Header ── */}
        <div className="process-header">
          <div>
            <SectionEyebrow index={4} label="Como construímos" className="reveal" />
            <h2 className="process-title reveal">Processo</h2>
          </div>
          <p className="process-sub reveal-right">
            Cada projeto segue um caminho deliberado — da ideia ao ar.
            Nada é improvisado, nada é genérico. Trabalhamos em etapas
            claras para que você saiba exatamente onde estamos e para onde vamos.
          </p>
        </div>

        {/* ── Scroll canvas (cards + SVG overlay) ── */}
        <div className="proc-canvas">

        {/* SVG — path layer */}
        <svg
          className="proc-svg"
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {/* Glow for the blur path */}
            <filter id="proc-blur-glow" x="-80%" y="-10%" width="260%" height="120%">
              <feGaussianBlur stdDeviation="14" />
            </filter>

            {/* Moving head halo */}
            <filter id="proc-head-halo" x="-300%" y="-300%" width="700%" height="700%">
              <feGaussianBlur stdDeviation="12" />
            </filter>

            {/* Node ambient glow */}
            <filter id="proc-node-halo" x="-400%" y="-400%" width="900%" height="900%">
              <feGaussianBlur stdDeviation="9" />
            </filter>

            {/* Vertical gradient for the main path */}
            <linearGradient
              id="proc-path-grad"
              gradientUnits="userSpaceOnUse"
              x1="0" y1={nodeY(0)}
              x2="0" y2={nodeY(steps.length - 1)}
            >
              <stop offset="0%"   stopColor="#2CC295" />
              <stop offset="100%" stopColor="#00DF81" />
            </linearGradient>
          </defs>

          {/* Ghost route — full path, very dim */}
          <path
            d={PATH_D}
            fill="none"
            stroke="rgba(44,194,149,0.07)"
            strokeWidth="2"
          />

          {/* Soft glow layer (wide blur, drawn in sync) */}
          <path
            ref={pathBlurRef}
            d={PATH_D}
            fill="none"
            stroke="#2CC295"
            strokeWidth="12"
            strokeLinecap="round"
            filter="url(#proc-blur-glow)"
            opacity="0.28"
          />

          {/* Sharp drawn path */}
          <path
            ref={pathRef}
            d={PATH_D}
            fill="none"
            stroke="url(#proc-path-grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* ── Node dots (appear at scroll threshold) ── */}
          {steps.map((_, i) => {
            const cx = nodeX(i);
            const cy = nodeY(i);
            return (
              <g
                key={i}
                ref={el => { nodeRefs.current[i] = el; }}
                style={{ transition: "opacity 0.45s ease", opacity: 0 }}
              >
                {/* Outer ambient halo */}
                <circle
                  cx={cx} cy={cy} r="22"
                  fill="#2CC295"
                  filter="url(#proc-node-halo)"
                  opacity="0.35"
                />
                {/* Mid ring */}
                <circle cx={cx} cy={cy} r="9" fill="#2CC295" opacity="0.55" />
                {/* Core */}
                <circle cx={cx} cy={cy} r="4.5" fill="#00DF81" />
                {/* Bright pin */}
                <circle cx={cx} cy={cy} r="2" fill="#ffffff" />
              </g>
            );
          })}

          {/* ── Moving glow head ── */}
          {/* Outer halo */}
          <circle
            ref={headGlowRef}
            cx={nodeX(0)} cy={nodeY(0)}
            r="24"
            fill="#00DF81"
            filter="url(#proc-head-halo)"
            style={{ opacity: 0 }}
          />
          {/* Dot */}
          <circle
            ref={headRef}
            cx={nodeX(0)} cy={nodeY(0)}
            r="7"
            fill="#00DF81"
            style={{ opacity: 0 }}
          />
          {/* Bright core */}
          <circle
            ref={headCoreRef}
            cx={nodeX(0)} cy={nodeY(0)}
            r="3"
            fill="#ffffff"
            style={{ opacity: 0 }}
          />
        </svg>

        {/* ── Process cards ── */}
        {steps.map((step, i) => {
          const yPct  = (nodeY(i) / SVG_H) * 100;
          const side  = i % 2 === 0 ? "left" : "right";
          return (
            <div
              key={step.number}
              className={`proc-card proc-card--${side}`}
              style={{ top: `${yPct}%` }}
              ref={el => { cardRefs.current[i] = el; }}
            >
              <span className="proc-num">{step.number}</span>
              <h3 className="proc-name">{step.name}</h3>
              <p className="proc-desc">{step.description}</p>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
