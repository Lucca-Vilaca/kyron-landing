import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kyron — Treino é combate. Não rotina.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "radial-gradient(ellipse at 18% 18%, rgba(46,74,94,0.45), transparent 55%), radial-gradient(ellipse at 82% 86%, rgba(127,169,196,0.18), transparent 55%), #0A0D10",
          color: "#E8EEF2",
          padding: "72px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          letterSpacing: "-0.02em",
        }}
      >
        {/* top meta bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 16,
            letterSpacing: 4,
            color: "#5A6B78",
            textTransform: "uppercase",
            borderBottom: "1px solid rgba(232,238,242,0.10)",
            paddingBottom: 16,
          }}
        >
          <span>KYRON</span>
          <span>2026 · BR / PT-BR</span>
        </div>

        {/* body */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            gap: 56,
            marginTop: 32,
          }}
        >
          {/* monogram */}
          <svg width="220" height="220" viewBox="0 0 200 200">
            <rect x="38" y="28" width="34" height="144" fill="#E8EEF2" />
            <polygon points="72,94 148,28 172,28 72,108" fill="#E8EEF2" />
            <polygon points="72,92 148,172 172,172 72,106" fill="#E8EEF2" />
            <rect x="38" y="96" width="150" height="8" fill="#7FA9C4" />
          </svg>

          {/* heading column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 18,
                letterSpacing: 5,
                color: "#7FA9C4",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: 40,
                  height: 2,
                  background: "#7FA9C4",
                }}
              />
              Manifesto · Treino com IA
            </div>
            <div
              style={{
                fontSize: 96,
                fontWeight: 900,
                lineHeight: 0.95,
                color: "#E8EEF2",
                textTransform: "uppercase",
              }}
            >
              Treino
            </div>
            <div
              style={{
                fontSize: 96,
                fontStyle: "italic",
                fontWeight: 500,
                lineHeight: 0.95,
                color: "#7FA9C4",
              }}
            >
              é combate.
            </div>
            <div
              style={{
                fontSize: 96,
                fontWeight: 900,
                lineHeight: 0.95,
                color: "#E8EEF2",
                textTransform: "uppercase",
              }}
            >
              Não rotina.
            </div>
          </div>
        </div>

        {/* footer mono line */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 16,
            letterSpacing: 4,
            color: "#8FA0AE",
            textTransform: "uppercase",
            borderTop: "1px solid rgba(232,238,242,0.10)",
            paddingTop: 20,
          }}
        >
          <span>IA monta a sessão · registra · devolve progresso</span>
          <span style={{ color: "#7FA9C4" }}>KYRON.APP</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
