/**
 * Button — Clean outline button as per referencia.png
 * No glassmorphism, no border-radius, no glow.
 */

interface ButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  arrow?: boolean;
}

export default function Button({ label, onClick, href, arrow = true }: ButtonProps) {
  const inner = (
    <>
      {label}
      {arrow && (
        <span className="btn-arrow" aria-hidden="true">→</span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className="btn">
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className="btn" onClick={onClick}>
      {inner}
    </button>
  );
}
