import type { Metadata } from "next";
import { Inter, Oswald, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/presentation/layouts/AppProvider";
import { LenisProvider } from "@/presentation/layouts/LenisProvider";
import { CustomCursor } from "@/presentation/components/CustomCursor";
import { GlobalNav } from "@/presentation/components/navigation/GlobalNav";
import { CustomContextMenu } from "@/presentation/components/ui/ContextMenu";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  title: "RESONATE | Algorithmic Sanctuary",
  description: "Eradicating digital isolation through high-performance, algorithmic empathy.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} ${geistMono.variable} dark antialiased`}>
      <body className="bg-background text-foreground min-h-screen flex flex-col selection:bg-reso selection:text-black">
        <div className="bg-noise" />
        <div className="scanline" />
        <CustomCursor />
        <CustomContextMenu />
        
        <LenisProvider>
          <AppProvider>
            <GlobalNav />
            <main className="flex-1 flex flex-col relative z-10 pt-20">
              {children}
            </main>
          </AppProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
