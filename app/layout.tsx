import type { Metadata, Viewport } from "next";

import Preloader from "@/components/Preloader/Preloader";
import PreloaderGate from "@/components/Preloader/PreloaderGate";

import "@/styles/fonts.css";
import "./globals.css";
import "@/styles/sections.css";

export const metadata: Metadata = {
  title: "Petrova Crisis — MOSAIC 2026",
  description:
    "ECSSA presents MOSAIC 2026: an interstellar technical event. Briefing inbound.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#03050a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Runs during parsing, before the first paint: hides the intro overlay
            for returning visitors and reduced-motion users without a flash. */}
        <PreloaderGate />
        {/* Full-screen intro film. Server-rendered so it covers the hero from
            the first frame while the hero loads normally underneath. */}
        <Preloader />
        {children}
      </body>
    </html>
  );
}
