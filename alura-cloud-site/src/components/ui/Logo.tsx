/**
 * Alura Cloud Logo — "A" diamond icon
 * Based on reference image: green diamond with "A" lettermark
 */
export default function Logo({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Diamond shape */}
      <rect
        x="16"
        y="2"
        width="19.8"
        height="19.8"
        rx="3"
        transform="rotate(45 16 2)"
        stroke="var(--accent, #00DF81)"
        strokeWidth="1.5"
        fill="none"
      />
      {/* "A" lettermark */}
      <text
        x="16"
        y="20.5"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontWeight="600"
        fontSize="14"
        fill="var(--accent, #00DF81)"
      >
        A
      </text>
    </svg>
  );
}
