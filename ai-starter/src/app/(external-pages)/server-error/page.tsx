import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "500 - Internal Server Error",
  description: "An unexpected error occurred on our server.",
};

export default function InternalServerError() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-b from-background to-secondary/20">
      <div className="flex flex-col space-y-4 items-center text-center">
        <Typography.H1>500.</Typography.H1>
        <Typography.P>Oops! Something went wrong on our end.</Typography.P>
        <Typography.P className="text-muted-foreground">
          We&apos;re working on fixing the issue. Please try again later.
        </Typography.P>
        <Button asChild size="lg" className="font-semibold">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
