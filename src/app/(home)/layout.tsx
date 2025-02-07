import Footer from "@/components/layout/footer/footer";
import styles from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layout}>
      {children}
      <Footer />
    </div>
  );
}
