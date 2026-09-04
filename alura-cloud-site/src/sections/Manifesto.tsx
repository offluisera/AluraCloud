import React from "react";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import CurvedLoop from "@/components/ui/CurvedLoop";

/**
 * Manifesto Section
 * Transformed into a dynamic, infinite horizontal marquee banner.
 */
export default function Manifesto() {
  return (
    <section id="manifesto" className="manifesto-section" style={{ paddingTop: 0 }}>
      <div className="container manifesto-inner" style={{ paddingBottom: 0 }}>
      </div>

      {/* Interactive Marquee replaces the 100vh block */}
      <CurvedLoop
        textPri="Você traz a ideia e nós construímos o "
        textAccent="que é necessário para ela existir."
        speed={10.2}
        direction="left"
        interactive={true}
      />
    </section>
  );
}
