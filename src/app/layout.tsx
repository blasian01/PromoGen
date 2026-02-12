import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Sociably | Your Social Command Center",
  description:
    "One platform to manage social accounts across all your projects. Publish everywhere at once, generate AI ads and UGC — built for solo devs shipping fast.",
  keywords:
    "social media management, indie dev tools, multi-account posting, AI ads, UGC creator, solopreneur, SaaS marketing, content automation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
