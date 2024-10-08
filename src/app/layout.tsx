import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Country Prueba Tecnica",
  description: "Prueba tecnica desarrollada para la empresa TOTS.",
  authors: [
    {
      name: "Pablo M. Heredia",
      url: "https://www.linkedin.com/in/kabe-heredia/",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
