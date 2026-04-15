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
  const webpSrc = `${basePath}${src}`;
  const avifSrc = srcAvif ? `${basePath}${srcAvif}` : undefined;

  return (
    <div
      className={cn(
        "relative",
        "drop-shadow-[0_40px_120px_rgba(0,0,0,0.7)]",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:shadow-[0_0_120px_rgba(216,178,91,0.18)]",
        className,
      )}
    >
      <picture>
        {avifSrc && <source srcSet={avifSrc} type="image/avif" />}
        <source srcSet={webpSrc} type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={webpSrc}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className="relative block h-auto w-full rounded-[32px]"
        />
      </picture>
    </div>
  );
}
