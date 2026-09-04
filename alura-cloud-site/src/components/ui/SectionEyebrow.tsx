/**
 * SectionEyebrow — numbered label used at the top of every section.
 * "01 — Hero", "02 — Manifesto", etc. Mirrors the technical/blueprint
 * numbering language used throughout the brand (coordinates, HUD data,
 * spec sheets), applied consistently to the real order of the page
 * instead of being copy-pasted from the design brief annotations.
 */
interface SectionEyebrowProps {
  index: number;
  label: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionEyebrow({
  index,
  label,
  align = "left",
  className = "",
}: SectionEyebrowProps) {
  return (
    <div
      className={`section-eyebrow ${align === "center" ? "section-eyebrow--center" : ""} ${className}`}
    >
      <span className="section-eyebrow-index">{String(index).padStart(2, "0")}</span>
      <span className="label section-eyebrow-label">{label}</span>
    </div>
  );
}
