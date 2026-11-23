
import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
/*el playfair display e spara manejar mejor las fuentes :3 */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Verdium | Descubre el mundo de las plantas",
  description:
    "Explora especies vegetales, conoce sus características y aprende a cuidar tus plantas con Verdium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${lato.variable}`}>
        {children}
      </body>
    </html>
  );
}
