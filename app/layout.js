"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const router = useRouter();


  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch(`https://library-m2k0.onrender.com/auth/me`, {
          credentials: "include",
        });
        if (res.status === 200) {
          router.push('/')
        } else {
          router.push("/login");
        }
      } catch (err) {
        router.push("/login");
      }
    }

    checkAuth();
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/favicon.ico" />
        <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>Maktabty</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} `}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
