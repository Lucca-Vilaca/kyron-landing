import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kyron | Treino com IA, disciplina e progressão",
  description:
    "Kyron transforma rotina de treino em sistema de evolução: IA para montar sessões, score de consistência, chat, ranking e histórico de progresso.",
  openGraph: {
    title: "Kyron | Treino com IA, disciplina e progressão",
    description:
      "Plano personalizado, execução guiada, chat esportivo, score de consistência e ranking para transformar rotina em evolução real.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
