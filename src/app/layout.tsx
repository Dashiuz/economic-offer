import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Propuesta Económica Edificio Domus · Cotización #I-P.A.11",
  description:
    "Propuesta técnica y económica de control de acceso facial, lectura automática de placas y plataforma HikCentral para el Edificio Domus (Bogotá) por Seguridad Explorer LTDA / IngExpertos.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-[#090A0F] text-[#F8FAFC] selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
        <a
          href="#main-content"
          className="visually-hidden focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-[#D4AF37] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#090A0F]"
        >
          Saltar al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
