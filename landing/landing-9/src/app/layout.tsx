import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/containers/header";
import Footer from "@/components/containers/footer";
import { TailwindIndicator } from "@/components/ui/tailwindIndicator";

export const metadata: Metadata = {
  title: "Nona | Nextbase",
  description: "Created by Nextbase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased !scroll-smooth">
      <body>
        <Header />
        {children}
        <Footer />
        <TailwindIndicator />
      </body>
    </html>
  );
}
