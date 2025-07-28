import { Button } from "../ui/button";
import { ArrowRightIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Link from "next/link";
import { Typography } from "../ui/typography";
import Container from "./container";
import { CubeIcon } from "@radix-ui/react-icons";

export default function Hero() {
  const STARS: number[] = new Array(5).fill(1);
  return (
    <Container>
      <div className="col-span-12 mt-8 flex h-full snap-start flex-col items-center justify-center gap-1 text-center md:mt-[var(--navbar-height)]">
        {/* ? Pill */}
        <div className="relative mb-8 flex w-fit items-center justify-center gap-2 rounded-full">
          <Link
            href="#"
            className={clsx(
              "group mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-[#3653141A] px-3 py-2 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50"
            )}
          >
            <CubeIcon className="color-black" />
            <p
              className={clsx(
                "text-sm font-semibold text-black [text-wrap:balance]"
              )}
            >
              Latest update details hook here.
            </p>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <Typography
          variant="h1"
          className="text-lime-900 text-center tracking-tighter"
        >
          A fancy looking hero text to catch your attention
        </Typography>
        <Typography
          variant="p"
          className="my-2 max-w-md px-4 text[#020817] md:max-w-lg md:px-0"
        >
          Great, now that we have your attention, we will actually talk about
          how we help you
        </Typography>
        <div className="flex gap-4 my-6">
          <Button variant={"outline"} className="px-4">
            Learn more
          </Button>
          <Button variant={"default"} className="px-4">
            <p>Get started for free</p>
          </Button>
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
