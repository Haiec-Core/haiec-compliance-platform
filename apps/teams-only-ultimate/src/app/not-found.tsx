import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <html className={GeistSans.className}>
      <body className="bg-background">
        <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-background to-secondary/20">
          <div className="flex flex-col space-y-4 items-center text-center">
            <Typography.H1>404.</Typography.H1>
            <Typography.P>
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </Typography.P>
            <Button asChild size="lg" className="font-semibold">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
