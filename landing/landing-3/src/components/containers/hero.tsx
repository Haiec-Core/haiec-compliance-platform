import { Button } from "../ui/button";
import clsx from "clsx";
import Link from "next/link";
import { Typography } from "../ui/typography";
import Container from "./container";
import { ArrowRightIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { CubeIcon } from "@radix-ui/react-icons";

export default function Hero() {
  const STARS: number[] = new Array(5).fill(1);
  return (
    <Container classNames="">
      <div className="col-span-12 w-full row-auto flex h-full snap-start flex-col items-center justify-start gap-1 text-center">
        {/* ? Pill */}
        <div className="relative mb-4 flex w-fit items-center justify-center">
          <Link
            href="#"
            className={clsx(
              "group mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-muted px-3 py-2"
            )}
          >
            <CubeIcon />
            <p className={clsx("text-sm font-semibold [text-wrap:balance]")}>
              Latest update details hook here
            </p>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <Typography
          variant="h1"
          className="w-3/4 lg:max-w-[50%] my-6 mx-auto text-balance"
        >
          A fancy looking hero text to catch your attention
        </Typography>
        <Typography
          variant="subheading"
          className="w-3/4 lg:max-w-[50%] my-6 mx-auto text-balance text-white/60"
        >
          Great, now that we have your attention, we will actually talk about
          how we help you do the above. Mostly a brief description which
          explains our service to convince you to keep scrolling down.
        </Typography>

        <div className="flex gap-4 my-6">
          <Button variant={"ghost"}>Learn more</Button>
          <Button variant={"default"}>Get started for free</Button>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 space-x-2 md:flex-row">
          <div className="flex w-fit items-center justify-start gap-2 text[#020817]">
            <CheckCircledIcon className="h-6 w-6" />
            <span>7-day free trial</span>
          </div>
          <div className="flex w-fit items-center justify-start gap-2">
            <CheckCircledIcon className="h-6 w-6" />
            <span>No credit card required</span>
          </div>
        </div>
      </div>
    </Container>
  );
}
