"use client";
import localFont from "next/font/local";
import "./globals.css";
import FirebaseAnalytics from "./components/firebase/analytics";
// import { usePathname } from "next/navigation";
// import { useTransition, animated } from "@react-spring/web";
import React from "react";
import { AuthProvider } from "./context/AuthContext";
import AuthGuard from "./components/auth-guard/auth-guard";

const uzura = localFont({
  src: "./fonts/uzurafont100/uzura.ttf",
  variable: "--font-uzura",
  weight: "100 900",
});

const marumonica = localFont({
  src: "./fonts/x12y16pxMaruMonica.ttf",
  variable: "--font-marumonica",
  weight: "100 900",
});

const kurobara = localFont({
  src: "./fonts/kurobara-cinderella.ttf",
  variable: "--font-kurobara",
  weight: "100 900",
});
const mplus = localFont({
  src: "./fonts/rounded-mplus-1c-regular.ttf",
  variable: "--font-mplus",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>tetra v1</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#a8a6a3" />
      </head>
      <body
        className={`${mplus.variable} ${uzura.variable} ${marumonica.variable} ${kurobara.variable}`}
      >
        <FirebaseAnalytics />
        <AuthProvider>
          <AuthGuard>{children}</AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
