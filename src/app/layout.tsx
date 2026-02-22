import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

export const metadata: Metadata = {
  title: "Puzzle Pokémon - Jogo de Quebra-Cabeça",
  description: "Jogo de puzzle 3x3 com tema Pokémon. Combine as peças com o modelo em até 16 movimentos!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${pressStart.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
