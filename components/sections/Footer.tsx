import { content } from "@/lib/content";
import { Monogram, Wordmark } from "@/components/ui/Monogram";

export function Footer() {
  const { tagline, doc, copyright } = content.footer;
  return (
    <footer className="relative z-10 mx-auto mt-0 w-[min(100%-32px,1360px)] border-t border-line px-2 py-14">
      {/* Oversized wordmark — brand signature */}
      <div className="border-b border-line pb-8 md:pb-12">
        <div className="flex items-start justify-between gap-4 md:gap-10">
          <div className="relative min-w-0 flex-1">
            <span
              aria-hidden="true"
              className="block overflow-hidden font-display leading-[0.82] tracking-[-0.05em] text-ink"
              style={{
                fontSize: "clamp(60px, 20vw, 300px)",
                textTransform: "uppercase",
              }}
            >
              K
              <em
                className="font-editorial text-steel"
                style={{
                  fontStyle: "italic",
                  fontWeight: 500,
                  letterSpacing: "-0.03em",
                  padding: "0 0.01em",
                }}
              >
                y
              </em>
              RON
            </span>
          </div>
          <div className="hidden flex-shrink-0 md:block">
            <Monogram size={56} />
          </div>
        </div>
      </div>

      {/* Meta row */}
      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1fr_1fr_auto]">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
            —— Tagline
          </span>
          <p className="font-editorial text-[18px] italic leading-snug text-ink">{tagline}</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
            —— Brand
          </span>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-steel">{doc}</p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
            —— Contato
          </span>
          <a
            href="mailto:lucca.vilaca@gmail.com"
            className="font-mono text-[13px] text-ink-dim transition-colors hover:text-steel"
          >
            lucca.vilaca@gmail.com
          </a>
        </div>
        <div className="flex items-center md:justify-self-end">
          <Wordmark size={16} />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
        <span>{copyright}</span>
        <span className="flex items-center gap-4">
          <span className="text-steel">●</span>
          <span>PT-BR · BR</span>
        </span>
      </div>
    </footer>
  );
}
