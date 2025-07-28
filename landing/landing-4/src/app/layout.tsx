import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/containers/header";
import { TailwindIndicator } from "@/components/ui/tailwindIndicator";
import Footer from "@/components/containers/footer";

export const metadata: Metadata = {
  title: "Probably",
  description: "Created by Nextbase Team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Header />
        <TailwindIndicator />
        {children}
        <Footer />
      </body>
    </html>
  );
}
