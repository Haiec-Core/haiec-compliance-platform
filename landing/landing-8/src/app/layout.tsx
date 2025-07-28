import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/containers/header";
import Footer from "@/components/containers/footer";

export const metadata: Metadata = {
  title: "Nextbase Octa",
  description: "Created by Nextbase Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={(GeistSans.className, "dark")}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
