"use client";
import localFont from "next/font/local";
import "./globals.css";
import FirebaseAnalytics from "./components/firebase/analytics";

const uzura = localFont({
  src: "./fonts/uzurafont100/uzura.ttf",
  variable: "--font-uzura",
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
        <title>もずくううううう</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#a8a6a3" />
      </head>
      <body className={`${uzura.variable}`}>
        <FirebaseAnalytics />
        {children}
      </body>
    </html>
  );
}
