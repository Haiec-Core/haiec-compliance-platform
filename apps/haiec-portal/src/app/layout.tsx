import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import "server-only";
import { AppProviders } from "./AppProviders";

export const metadata: Metadata = {
  icons: {
    icon: "/images/logo-black-main.ico",
  },
  title: "Nextbase Ultimate",
  description: "Nextbase Ultimate",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? `https://usenextbase.com`,
  ),
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html className={GeistSans.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
