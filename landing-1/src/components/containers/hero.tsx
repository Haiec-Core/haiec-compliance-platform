import { Button } from "../ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
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
        <div className="relative mb-8 flex w-fit items-center justify-center gap-2 rounded-full dark:border-gray-400/50 shadow-md">
          <Link
            href="#"
            className={clsx(
              " flex h-8 min-w-[10rem] items-center justify-between p-2 rounded-full dark:bg-gray-950 bg-blue-900/10"
            )}
          >
            <p
              className={clsx(
                "h-full w-fit rounded-full bg-blue-900/10 py-1 px-1.5 flex justify-center items-center text-xs text-secondary-foreground "
              )}
            >
              <CubeIcon className="color-black" />
            </p>
            <p className="text-sm font-medium text-black pr-2">
              Latest update details hook here
            </p>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <Typography variant="h1" className="text-blue-900 tracking-tighter">
          A fancy looking hero text to catch your attention
        </Typography>
        <Typography
          variant="p"
          className="my-2 mb-4 max-w-sm px-4 text-slate-950 md:max-w-lg md:px-0"
        >
          Great, now that we have your attention, we will actually talk about
          how we help you
        </Typography>

        <div className="mb-8">
          <Button className="mx-8" variant={"outline"}>
            Learn more
          </Button>

          <Button>
            <div className="flex w-fit items-center justify-between gap-2">
              <p className="">Get started for free</p>

              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </Button>
        </div>
      </div>
    </Container>
  );
}
