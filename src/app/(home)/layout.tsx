import Footer from "@/components/layout/footer/footer";
import styles from "./layout.module.css";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layout}>
      <SessionProvider>{children}</SessionProvider>
      <Footer />
    </div>
  );
}
