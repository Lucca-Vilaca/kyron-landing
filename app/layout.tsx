import type { Metadata, Viewport } from "next";
import { Archivo, Archivo_Black, Fraunces, JetBrains_Mono } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-archivo-black",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://kyron.app",
  ),
  title: "Kyron — Treino é combate. Não rotina.",
  description:
    "Sistema de treino com IA para artes marciais e esportes de combate. Sessões montadas sob seu contexto, score de consistência e progressão visível — sem atalho, só trilha.",
  openGraph: {
    title: "Kyron — Treino é combate. Não rotina.",
    description:
      "IA que monta a sessão, registra a execução e devolve progresso real. Boxe, MMA, muay thai — dentro ou fora da academia.",
    type: "website",
    locale: "pt_BR",
    siteName: "Kyron",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kyron — Treino é combate. Não rotina.",
    description:
      "IA que monta a sessão, registra a execução e devolve progresso real.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0D10",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${archivoBlack.variable} ${fraunces.variable} ${jetbrains.variable}`}
    >
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
