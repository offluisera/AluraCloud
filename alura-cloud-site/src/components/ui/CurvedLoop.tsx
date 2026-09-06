"use client";
import React, { useEffect, useState } from "react";

interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  curveAmount?: number;
  direction?: "left" | "right";
  interactive?: boolean;
  className?: string;
  textPri?: string;
  textAccent?: string;
}

/**
 * Marquee infinito e sem costura.
 * Um único "lap set" (frase repetida algumas vezes, o suficiente para ser
 * mais largo que a tela) é renderizado duas vezes dentro de uma única faixa
 * animada; -50% desloca exatamente um lap set, fechando o loop perfeitamente
 * com apenas UMA animação rodando (em vez de N animações independentes).
 */
export default function CurvedLoop({
  speed = 10,
  direction = "left",
  interactive = false,
  className = "",
  textPri = "Você traz a ideia",
  textAccent = "e Nós construímos o que é necessário para ela existir.",
}: CurvedLoopProps) {
  const [motionOk, setMotionOk] = useState(() =>
    typeof window === "undefined"
      ? true
      : !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setMotionOk(!mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const animationName = direction === "left" ? "marquee-left" : "marquee-right";
  const duration = `${100 / speed}s`;

  const item = (key: string | number) => (
    <div key={key} className="flex items-center gap-12 px-6">
      <span className="marquee-pri">{textPri}</span>
      <span className="marquee-accent">{textAccent}</span>
      <span className="marquee-separator">✦</span>
    </div>
  );

  // Repetições por lap set: largo o bastante para nunca deixar um vão vazio
  // em telas ultra-wide, mesmo com a frase completa.
  const lapSet = (setKey: string) => (
    <div className="marquee-lap" key={setKey}>
      {[0, 1, 2].map((i) => item(`${setKey}-${i}`))}
    </div>
  );

  return (
    <div className={`marquee-container ${className}`}>
      <div
        className={`marquee-content ${interactive ? "interactive" : ""}`}
        style={
          motionOk
            ? { animation: `${animationName} ${duration} linear infinite` }
            : undefined
        }
      >
        {lapSet("a")}
        {lapSet("b")}
      </div>
    </div>
  );
}
