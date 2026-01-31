import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { AIAssistant } from "@/components/ai-assistant/ai-assistant";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "TalentSage | AI-Native Recruitment Operating System",
  description:
    "TalentSage is the AI-native recruitment operating system that reduces time-to-hire by 60% with intelligent candidate matching, automated screening, and predictive analytics.",
  keywords: ["recruitment", "AI", "hiring", "HR", "talent acquisition", "ATS"],
  authors: [{ name: "Vision Tact LLC" }],
  openGraph: {
    title: "TalentSage | AI-Native Recruitment Operating System",
    description: "Reduce time-to-hire by 60% with AI-powered recruitment",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" style={inter.style}>
      <body
        className="font-sans antialiased min-h-screen bg-background text-foreground"
        suppressHydrationWarning
      >
        {children}
        <AIAssistant />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
