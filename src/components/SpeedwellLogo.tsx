/**
 * SpeedwellLogo — reusable wordmark component
 *
 * Variant "dark"  → renders on dark/navy backgrounds (nav, footer, contact)
 * Variant "light" → renders on light/white backgrounds (if ever needed)
 *
 * Design:
 *   "Speed"  — bold, primary colour
 *   "well"   — bold, 28% opacity (visually recedes)
 *   ·        — 5×5 teal dot, ~5px margins, vertically centred
 *   "AI"     — teal, ~55% of body font-size, weight 800, wide tracking
 */

interface SpeedwellLogoProps {
  variant?: "dark" | "light";
  /** Base font-size for the wordmark — default "1.1rem" */
  size?: string;
}

export function SpeedwellLogo({
  variant = "dark",
  size = "1.1rem",
}: SpeedwellLogoProps) {
  const primaryColor =
    variant === "dark" ? "#FAFAF8" : "#0F1B2D";
  const fadedColor =
    variant === "dark"
      ? "rgba(250,250,248,0.28)"
      : "rgba(15,27,45,0.28)";

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontWeight: 800,
        fontSize: size,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      {/* "Speed" — full opacity */}
      <span style={{ color: primaryColor }}>Speed</span>

      {/* "well" — faded */}
      <span style={{ color: fadedColor }}>well</span>

      {/* Teal dot separator */}
      <span
        style={{
          display: "inline-block",
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "#00C9A7",
          margin: "0 5px",
          flexShrink: 0,
          alignSelf: "center",
        }}
        aria-hidden="true"
      />

      {/* "AI" — teal, ~55% font-size, wide tracking */}
      <span
        style={{
          color: "#00C9A7",
          fontWeight: 800,
          fontSize: "0.58em",
          letterSpacing: "0.08em",
        }}
      >
        AI
      </span>
    </span>
  );
}
