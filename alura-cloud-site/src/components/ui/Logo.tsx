/**
 * Alura Cloud Logo — 3D Geometric Wireframe "A"
 * Identidade visual baseada no modelo tridimensional de engenharia de software
 */
interface LogoProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

export default function Logo({ size = 22, className = "", glow = true }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{
        overflow: "visible",
        filter: glow ? "drop-shadow(0 0 6px rgba(0, 255, 179, 0.45))" : undefined,
      }}
    >
      <defs>
        <filter id="logo-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 1. Malha Wireframe Interna (Triangulações e nervuras 3D) */}
      <g
        stroke="#00FFB3"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.45"
      >
        {/* Topo / Pirâmide superior */}
        <path d="M 430 160 L 500 270" />
        <path d="M 570 160 L 500 270" />
        <path d="M 500 270 L 500 360" />
        <path d="M 380 260 L 620 260" />
        <path d="M 380 260 L 500 360" />
        <path d="M 620 260 L 500 360" />

        {/* Nervuras centrais (Spine) das pernas */}
        <path d="M 475 175 L 230 840" strokeWidth="22" />
        <path d="M 525 175 L 770 840" strokeWidth="22" />

        {/* Nervuras transversais */}
        <path d="M 335 360 L 500 360" />
        <path d="M 500 360 L 665 360" />
        <path d="M 290 460 L 450 460" />
        <path d="M 550 460 L 710 460" />
        <path d="M 162 745 L 358 745" />
        <path d="M 642 745 L 838 745" />

        {/* Diagonais superiores */}
        <path d="M 430 160 L 475 265" />
        <path d="M 475 265 L 335 360" />
        <path d="M 570 160 L 525 265" />
        <path d="M 525 265 L 665 360" />

        {/* Diagonais médias */}
        <path d="M 335 360 L 370 460" />
        <path d="M 450 460 L 335 360" />
        <path d="M 665 360 L 630 460" />
        <path d="M 550 460 L 665 360" />

        {/* X-Bracing interno da Crossbar */}
        <path d="M 246 560 L 266 650" />
        <path d="M 307 560 L 205 650" />
        <path d="M 412 560 L 632 650" strokeWidth="24" />
        <path d="M 588 560 L 368 650" strokeWidth="24" />
        <path d="M 693 560 L 795 650" />
        <path d="M 754 560 L 734 650" />

        {/* Under-arch (vão inferior) */}
        <path d="M 368 650 L 620 745" />
        <path d="M 632 650 L 380 745" />
        <path d="M 380 745 L 620 745" />
        <path d="M 380 745 L 660 840" />
        <path d="M 620 745 L 340 840" />
        <path d="M 340 840 L 660 840" />

        {/* Diagonais inferiores das pernas */}
        <path d="M 205 650 L 260 745" />
        <path d="M 368 650 L 162 745" />
        <path d="M 162 745 L 230 840" />
        <path d="M 260 745 L 120 840" />
        <path d="M 260 745 L 340 840" />

        <path d="M 795 650 L 740 745" />
        <path d="M 632 650 L 838 745" />
        <path d="M 838 745 L 770 840" />
        <path d="M 740 745 L 880 840" />
        <path d="M 740 745 L 660 840" />
      </g>

      {/* 2. Barras Horizontais (Crossbars) */}
      <g
        stroke="#00FFB3"
        strokeWidth="38"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      >
        <path d="M 246 560 L 754 560" />
        <path d="M 205 650 L 795 650" />
      </g>

      {/* 3. Estrutura Mestra (Contornos Principais) */}
      <g
        stroke="#00FFB3"
        strokeWidth="48"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M 430 160 L 570 160" />
        <path d="M 430 160 L 120 840" />
        <path d="M 570 160 L 880 840" />
        <path d="M 500 360 L 340 840" />
        <path d="M 500 360 L 660 840" />
        <path d="M 120 840 L 340 840" strokeWidth="44" />
        <path d="M 660 840 L 880 840" strokeWidth="44" />
      </g>

      {/* 4. Nós Luminosos nas Interseções Chave */}
      <g fill="#00FFB3" filter="url(#logo-glow-filter)">
        {/* Topo */}
        <circle cx="430" cy="160" r="42" />
        <circle cx="570" cy="160" r="42" />
        <circle cx="500" cy="270" r="32" />
        <circle cx="500" cy="360" r="42" />

        {/* Crossbar Superior */}
        <circle cx="246" cy="560" r="38" />
        <circle cx="412" cy="560" r="38" />
        <circle cx="588" cy="560" r="38" />
        <circle cx="754" cy="560" r="38" />

        {/* Crossbar Inferior */}
        <circle cx="205" cy="650" r="38" />
        <circle cx="368" cy="650" r="38" />
        <circle cx="632" cy="650" r="38" />
        <circle cx="795" cy="650" r="38" />

        {/* Base dos pés */}
        <circle cx="120" cy="840" r="46" />
        <circle cx="230" cy="840" r="36" />
        <circle cx="340" cy="840" r="46" />
        <circle cx="660" cy="840" r="46" />
        <circle cx="770" cy="840" r="36" />
        <circle cx="880" cy="840" r="46" />
      </g>
    </svg>
  );
}
