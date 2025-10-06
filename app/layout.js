"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/favicon.ico" />
        <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>Maktabty</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
