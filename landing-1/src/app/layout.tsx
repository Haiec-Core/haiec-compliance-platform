import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/containers/header";
import Footer from "@/components/containers/footer";
import { TailwindIndicator } from "@/components/ui/tailwindIndicator";

export const metadata: Metadata = {
  title: "the Boring Company",
  description: "Template for useNextBase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
