import { cn } from "@/lib/cn";

type MonogramProps = {
  size?: number;
  className?: string;
  steel?: string;
  ink?: string;
  title?: string;
};

/**
 * Kyron monogram — canonical "Monolith Balanced" mark.
 *
 * Source of truth: `/Users/luccavilaca/Downloads/Kyron (2)/logo-v2/monolith.jsx`
 * (MonolithBalanced).
 *
 * Anatomy:
 *   • Vertical stem — heavy ink slab.
 *   • Two symmetric arm strokes — equal weight, 45° mirror.
 *   • Horizontal steel band crossing the waist — brand signature.
 *
 * Never alter the steel waist band; it is the mark's identifying gesture.
 */
export function Monogram({
  size = 48,
  className,
  steel = "#7FA9C4",
  ink = "#E8EEF2",
  title = "Kyron monogram",
}: MonogramProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={cn("block", className)}
      role="img"
      aria-label={title}
    >
      <title>{title}</title>
      {/* vertical stem */}
      <rect x="38" y="28" width="34" height="144" fill={ink} />
      {/* upper stroke — trapezoidal */}
      <polygon points="72,94 148,28 172,28 72,108" fill={ink} />
      {/* lower stroke — mirrored */}
      <polygon points="72,92 148,172 172,172 72,106" fill={ink} />
      {/* STEEL BAND — crosses the K's waist horizontally (signature gesture) */}
      <rect x="38" y="96" width="150" height="8" fill={steel} />
    </svg>
  );
}

type WordmarkProps = {
  size?: number;
  className?: string;
  accent?: string;
  color?: string;
};

/**
 * KYRON wordmark — Archivo Black with a Fraunces italic 'y' cut in steel.
 * This is the primary brand lockup. Never alter the italic cut.
 */
export function Wordmark({
  size = 28,
  className,
  accent = "#7FA9C4",
  color,
}: WordmarkProps) {
  return (
    <span
      className={cn("inline-block font-display leading-none", className)}
      style={{
        fontSize: size,
        letterSpacing: "-0.04em",
        color: color ?? "inherit",
        textTransform: "uppercase",
      }}
    >
      K
      <em
        className="font-editorial"
        style={{
          color: accent,
          padding: "0 0.02em",
          fontStyle: "italic",
          fontWeight: 500,
        }}
      >
        y
      </em>
      RON
    </span>
  );
}
