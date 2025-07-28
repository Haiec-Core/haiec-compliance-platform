import React from "react";
import Container from "../ui/container";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const CallToAction = () => {
  return (
    <Container>
      <div className="col-span-12 w-full max-w-7xl mx-auto flex flex-col items-start justify-start py-10 space-y-8 px-5">
        <Typography variant={"h1"} className="w-full text-start">
          Sounds good?
        </Typography>
        <Typography variant={"p"} className="w-full max-w-5xl">
          We think you&apos;ll love it. If you&apos;re anything like us, the
          notion of saving time and skyrocketing productivity is downright
          exciting.
        </Typography>
        <div className="relative group">
          <Button className="mt-0 scroll-m-0 relative">
            <div className="flex w-fit items-center justify-between gap-2">
              <p className="text-primary-foreground">Get nextbase</p>

              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </Button>
          <div className="absolute -z-10 -inset-1 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-xl blur opacity-60 dark:opacity-70 dark:-inset-0.5 group-hover:opacity-80 dark:group-hover:opacity-70 transition-all duration-1000 group-hover:duration-3000 group-hover:-inset-2"></div>
        </div>
        <Typography variant={"mutedText"}>
          Generate unlimited boilerplates & get the updates. You own the code,
          no attribution.
        </Typography>
      </div>
    </Container>
  );
};

export default CallToAction;
