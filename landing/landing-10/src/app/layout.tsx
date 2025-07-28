import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/container/header";
import Footer from "@/components/container/footer";
import { TailwindIndicator } from "@/components/ui/tailwindIndicator";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Deca",
  description: "Created by nextbase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={(workSans.className, "relative")}>
        <Header />
        {children}
        <Footer />
        <TailwindIndicator />
      </body>
    </html>
  );
}
