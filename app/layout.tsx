import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DigiTel Nexus AI — Digital Home Intelligence Platform",
  description:
    "India's first AI-powered Digital Home Intelligence Platform. Maximize household value with personalized service recommendations, predictive insights, and intelligent cross-selling.",
  keywords: ["DigiTel", "AI", "Digital Home", "Smart Home", "Telecom", "Broadband"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="min-h-screen bg-[#05070a] text-[#f1f5f9] antialiased">
        {children}
      </body>
    </html>
  );
}
