import { cn } from "@/lib/cn";

type PhoneMockupProps = {
  src: string;
  srcAvif?: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function PhoneMockup({ src, srcAvif, alt, className, priority = false }: PhoneMockupProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const mainSrc = `${basePath}${src}`;
  const avifSrc = srcAvif ? `${basePath}${srcAvif}` : undefined;
  const isSvg = src.endsWith(".svg");

  return (
    <div
      className={cn(
        "relative rounded-[44px] p-[8px]",
        "bg-[linear-gradient(160deg,#2c2c2c_0%,#111_55%,#1a1a1a_100%)]",
        "shadow-[0_0_0_1.5px_#050505,0_30px_80px_-20px_rgba(216,178,91,0.18),0_40px_120px_-30px_rgba(0,0,0,0.85),inset_0_0_0_0.5px_rgba(255,255,255,0.08)]",
        "after:pointer-events-none after:absolute after:left-1/2 after:top-[14px] after:z-10 after:h-[22px] after:w-[80px] after:-translate-x-1/2 after:rounded-full after:bg-black",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[36px] bg-[#0A0A0A]">
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
