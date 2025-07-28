import "@/styles/globals.css";
import "@/styles/prosemirror.css";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import "server-only";
import { AffonsoWrapper } from "./AffonsoWrapper";
import { AppProviders } from "./AppProviders";

export const metadata: Metadata = {
  icons: {
    icon: "/images/logo-black-main.ico",
  },
  title: "AI Starter Kit",
  description: "AI Starter Kit",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? `https://usenextbase.com`,
  ),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html
      className={GeistSans.className}
      suppressHydrationWarning
    >
      <head>
        <AffonsoWrapper />
      </head>
      <body className="">
        <AppProviders >
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
