"use client";
import localFont from "next/font/local";
import "./globals.css";
import FirebaseAnalytics from "./components/firebase/analytics";
// import { usePathname } from "next/navigation";
// import { useTransition, animated } from "@react-spring/web";
import React from "react";

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
  // const pathname = usePathname();

  // const transitions = useTransition(pathname, {
  //   from: { opacity: 0, transform: "translateX(100%)" },
  //   enter: { opacity: 1, transform: "translateX(0%)" },
  //   leave: { opacity: 0, transform: "translateX(-100%)" },
  // });

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
        {/* {transitions((style, item) => (
          <animated.div key={item} style={style}>
            {children}
          </animated.div>
        ))} */}
         {children}
      </body>
    </html>
  );
}
