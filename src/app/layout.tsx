import type { Metadata, Viewport } from "next";
import { Unbounded, Sora, Roboto_Flex } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Robin | Full-Stack Developer & UI/UX Designer",
  description: "Portafolio profesional de Robin (robinzdev). Licenciado en Informática, Desarrollador Full-Stack y Diseñador Gráfico. Arquitectura web neobrutalista y retro-tech.",
  keywords: ["Full-Stack Developer", "Vite", "React", "TypeScript", "Tailwind CSS", "UI/UX Designer", "Neobrutalism", "Castillo", "República Dominicana"],
  authors: [{ name: "Robin" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${unbounded.variable} ${sora.variable} ${robotoFlex.variable} dark`} suppressHydrationWarning>
      <body
        className="min-h-screen flex flex-col font-sans selection:bg-accent selection:text-[#131515]"
        suppressHydrationWarning
      >
        
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
