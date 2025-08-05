"use client";
import Image from "next/image";
import Container from "./container";
import { Typography } from "../ui/typography";
import ScrollingTestimonies from "./scrollingTestimonies";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Testimonials() {
  return (
    <Container>
      <div className="relative col-span-12 isolate bg-transparent pt-24 sm:pt-32">
        <div className="mx-auto max-w-8xl space-y-10">
          <div className="mx-auto text-center flex flex-col justify-start items-center gap-4">
            <Typography variant={"h2"}>
              Loved
              <span className="inline-block pl-2 pr-2 xl:pl-5 xl:pr-5">
                <Image
                  alt="Heart Logo"
                  src="heart-scribble.svg"
                  width={70}
                  height={50}
                  className="w-[30px] lg:w-[40px] xl:w-[50px]"
                />{" "}
              </span>
              by industry leaders
            </Typography>
          </div>
          <ScrollingTestimonies />
        </div>
      </div>
    </Container>
  );
}
