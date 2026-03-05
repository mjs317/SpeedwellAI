/**
 * SpeedwellLogo — inline SVG wordmark
 *
 * Treatment: "Speedwell" (solid, primary colour) + ".AI" (teal, wide tracking)
 * All solid colours — no opacity tricks — works in print, embroidery, any medium.
 *
 * Static SVG exports (for print shops, docs, apparel):
 *   /public/logo-dark.svg        — white + teal  (dark backgrounds)
 *   /public/logo-light.svg       — navy + teal   (light backgrounds)
 *   /public/logo-mono-white.svg  — all white     (dark apparel / printables)
 *   /public/logo-mono-navy.svg   — all navy      (letterhead / engraving)
 *
 * Variant "dark"  → renders on dark/navy backgrounds (nav, footer, contact)
 * Variant "light" → renders on light/white backgrounds
 */

interface SpeedwellLogoProps {
  variant?: "dark" | "light";
  /** CSS height value for the SVG — e.g. "1.1rem", "28px". Width scales automatically. */
  size?: string;
}

export function SpeedwellLogo({
  variant = "dark",
  size = "1.1rem",
}: SpeedwellLogoProps) {
  const primaryColor = variant === "dark" ? "#FAFAF8" : "#0F1B2D";

  return (
    <svg
      viewBox="0 0 340 52"
      style={{
        height: size,
        width: "auto",
        display: "inline-block",
        verticalAlign: "middle",
        flexShrink: 0,
      }}
      aria-label="Speedwell AI"
      role="img"
    >
      <text
        y="40"
        fontFamily="'Geist', 'Inter', -apple-system, 'Helvetica Neue', sans-serif"
        fontWeight={800}
        fontSize={36}
        letterSpacing="-0.025em"
      >
        <tspan fill={primaryColor}>Speedwell</tspan>
        <tspan fill="#00C9A7" fontSize={36} letterSpacing="0.06em">
          .AI
        </tspan>
      </text>
    </svg>
  );
}
