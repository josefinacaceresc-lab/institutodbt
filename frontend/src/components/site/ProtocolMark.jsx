/**
 * Protocolo DBT-ST · Monograma
 *
 * Custom editorial seal for Instituto DBT Chile's proprietary
 * DBT + Schema Therapy integration protocol.
 *
 * Composition (scientific + editorial luxury):
 *  · Outer ring with 8 cardinal tick marks → scientific-instrument reference
 *  · Inner vesica piscis (two interlocking circles) → dialectical union
 *    of DBT (left) and Schema Therapy (right) — the core of the protocol
 *  · Central rhombus → node / focal point (synthesis)
 *  · Hairline letterform "IDC" below → Instituto DBT Chile mark
 */
export default function ProtocolMark({ size = 40, tone = "gold", className = "", title = "Protocolo DBT-ST" }) {
  const stroke = tone === "gold" ? "#BFA06A" : "#0E2333";
  const fill = tone === "gold" ? "#BFA06A" : "#0E2333";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      {/* Outer ring */}
      <circle cx="40" cy="40" r="36" stroke={stroke} strokeWidth="0.8" opacity="0.55" />
      <circle cx="40" cy="40" r="33" stroke={stroke} strokeWidth="0.5" opacity="0.25" />

      {/* 8 cardinal tick marks (compass / scientific instrument) */}
      <g stroke={stroke} strokeWidth="0.8" strokeLinecap="square">
        {/* N, S, E, W — longer */}
        <line x1="40" y1="2" x2="40" y2="7" />
        <line x1="40" y1="73" x2="40" y2="78" />
        <line x1="2" y1="40" x2="7" y2="40" />
        <line x1="73" y1="40" x2="78" y2="40" />
        {/* Diagonals — shorter */}
        <g opacity="0.55">
          <line x1="13.5" y1="13.5" x2="16.8" y2="16.8" />
          <line x1="66.5" y1="13.5" x2="63.2" y2="16.8" />
          <line x1="13.5" y1="66.5" x2="16.8" y2="63.2" />
          <line x1="66.5" y1="66.5" x2="63.2" y2="63.2" />
        </g>
      </g>

      {/* Vesica piscis — DBT ∩ Schema Therapy */}
      <g stroke={stroke} strokeWidth="1" fill="none">
        <circle cx="32" cy="40" r="14" />
        <circle cx="48" cy="40" r="14" />
      </g>

      {/* Central rhombus (synthesis node) */}
      <g>
        <rect
          x="38.2"
          y="38.2"
          width="3.6"
          height="3.6"
          transform="rotate(45 40 40)"
          fill={fill}
        />
      </g>

      {/* Hairline arcs accent (top & bottom) */}
      <g stroke={stroke} strokeWidth="0.6" fill="none" opacity="0.6">
        <path d="M 22 20 Q 40 10 58 20" />
        <path d="M 22 60 Q 40 70 58 60" />
      </g>
    </svg>
  );
}
