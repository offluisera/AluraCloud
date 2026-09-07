/**
 * SectionEyebrow — small uppercase label used at the top of every section.
 * Sem numeração: um marcador discreto na cor de destaque em vez do
 * "01 —", "02 —" etc. (a numeração sequencial quebrava a sensação
 * premium do site e não escalava bem quando seções eram adicionadas
 * ou removidas).
 */
interface SectionEyebrowProps {
  /** Mantido por compatibilidade com chamadas antigas; não é mais renderizado. */
  index?: number;
  label: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionEyebrow({
  label,
  align = "left",
  className = "",
}: SectionEyebrowProps) {
  return (
    <div
      className={`section-eyebrow ${align === "center" ? "section-eyebrow--center" : ""} ${className}`}
    >
      <span className="section-eyebrow-mark" aria-hidden="true" />
      <span className="label section-eyebrow-label">{label}</span>
    </div>
  );
}
