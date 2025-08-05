import { Button } from "../ui/button";
import { ArrowRightIcon, CubeIcon } from "@radix-ui/react-icons";
import { Typography } from "../ui/typography";
import Container from "./container";
import Image from "next/image";
import clsx from "clsx";
import "../../../src/app/globals.css";
import Link from "next/link";

export default function Hero() {
  return (
    <Container>
      <div className="col-span-12 w-full row-auto flex h-full flex-col items-center justify-start gap-1 text-center py-24">
        <Link
          href="#"
          className={clsx(
            "group mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full px-3 py-1 bg-muted/10"
          )}
        >
          <CubeIcon />
          <p
            className={clsx(
              "text-xs md:text-sm font-semibold [text-wrap:balance]"
            )}
          >
            Latest update details hook here
          </p>
          <ArrowRightIcon className="h-4 w-4" />
        </Link>

        <Typography
          variant="h2"
          className="lg:max-w-7xl mt-2 whitespace-pre text-balance xl:w-[1400px] text-yellow-900"
        >
          A fancy looking hero text to <br />
          catch your attention{" "}
        </Typography>
        <Typography
          variant="subheading"
          className="w-3/4 font-light text-clip lg:max-w-[50%] my-6 mx-auto"
        >
          Great, now that we have your attention, we will actually talk about
          how we help you
        </Typography>

        <Button
          variant={"default"}
          className="bg-yellow-900 shadow-none rounded-none p-2 pl-4"
        >
          <div className="flex w-fit items-center justify-center gap-2">
            <p className="">Get started for free</p>

            <ArrowRightIcon className="h-4 w-6" />
          </div>
        </Button>
      </div>
    </Container>
  );
}
