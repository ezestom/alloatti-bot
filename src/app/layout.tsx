import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import type { Viewport } from "next";

// Google Sans alternative - usando Inter que es similar
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Alloatti SRL - Líder en Innovación",
  description: "Chatbot de asistencia técnica y cotización comercial para Alloatti SRL",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  interactiveWidget: "resizes-content", // Importante: ajusta el contenido cuando aparece el teclado
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased -z-10 overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
