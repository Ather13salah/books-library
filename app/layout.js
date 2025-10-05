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
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // نقرأ الكوكيز من المتصفح
    const cookies = document.cookie;
    const hasToken = cookies.includes("token=");
    const hasRefresh = cookies.includes("refresh_token=");

    // نتحقق من مكاننا الحالي
    const onLoginPage = pathname === "/login" || pathname === "/signup";

    if (hasToken || hasRefresh) {
      // لو المستخدم عنده توكن وهو في صفحة تسجيل الدخول → نوديه إلى الصفحة الرئيسية
      if (onLoginPage) {
        router.push("/");
      }
    } else {
      // لو مفيش توكن وهو مش في صفحة تسجيل الدخول → نوديه إلى /login
      if (!onLoginPage) {
        router.push("/login");
      }
    }

    setChecked(true);
  }, [pathname, router]);
  if (!checked) {
    // عرض بسيط أثناء التحقق (بدون فلاش أو خلل)
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <div className="h-screen flex items-center justify-center text-lg">
            Checking login status...
          </div>
        </body>
      </html>
    );
  }

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
