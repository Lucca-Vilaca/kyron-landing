import { cn } from "@/lib/cn";

type PhoneMockupProps = {
  src: string;
  srcAvif?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  radius?: number;
  showNotch?: boolean;
};

export function PhoneMockup({
  src,
  srcAvif,
  alt,
  className,
  priority = false,
  radius = 44,
  showNotch = true,
}: PhoneMockupProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const mainSrc = `${basePath}${src}`;
  const avifSrc = srcAvif ? `${basePath}${srcAvif}` : undefined;
  const isSvg = src.endsWith(".svg");
  const innerRadius = Math.max(radius - 8, 4);
  const notchScale = Math.min(1, radius / 44);
  const notchTop = Math.round(14 * notchScale);
  const notchHeight = Math.round(22 * notchScale);
  const notchWidth = Math.round(80 * notchScale);

  return (
    <div
      style={{ borderRadius: radius }}
      className={cn(
        "relative p-[8px]",
        "bg-[linear-gradient(160deg,#2c2c2c_0%,#111_55%,#1a1a1a_100%)]",
        "shadow-[0_0_0_1.5px_#050505,0_24px_60px_-20px_rgba(127,169,196,0.22),0_30px_90px_-30px_rgba(0,0,0,0.85),inset_0_0_0_0.5px_rgba(255,255,255,0.08)]",
        className,
      )}
    >
      {showNotch && (
        <span
          aria-hidden="true"
          style={{ top: notchTop, height: notchHeight, width: notchWidth }}
          className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 rounded-full bg-black"
        />
      )}
      <div
        style={{ borderRadius: innerRadius }}
        className="overflow-hidden bg-[#0A0A0A]"
      >
        {isSvg ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={mainSrc}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={priority ? "high" : "auto"}
            className="block h-auto w-full"
          />
        ) : (
          <picture>
            {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
            <source srcSet={mainSrc} type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mainSrc}
              alt={alt}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={priority ? "high" : "auto"}
              className="block h-auto w-full"
            />
          </picture>
        )}
      </div>
    </div>
  );
}
