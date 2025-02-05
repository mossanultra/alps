import Footer from "@/components/layout/footer/footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        {children}
        <Footer></Footer>
    </div>
  );
}
