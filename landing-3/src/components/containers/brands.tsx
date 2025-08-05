import React from "react";
import { Typography } from "../ui/typography";
import Image from "next/image";
import Marquee from "@components/ui/marquee";

const Brands = () => {
  const BRANDS = [
    {
      id: "attio",
      src: "/attio.svg",
      alt: "Attio Logo",
    },
    {
      id: "cal",
      src: "/cal.svg",
      alt: "Cal Logo",
    },
    {
      id: "checkly",
      src: "/checkly.svg",
      alt: "Checkly Logo",
    },
    {
      id: "chronicle",
      src: "/chronicle.svg",
      alt: "Chronicle Logo",
    },
    {
      id: "crowd",
      src: "/crowd.svg",
      alt: "Crowd Logo",
    },
    {
      id: "hashnode",
      src: "/hashnode.svg",
      alt: "Hashnode Logo",
    },
    {
      id: "lugg",
      src: "/lugg.svg",
      alt: "Lugg Logo",
    },
    {
      id: "perplexity",
      src: "/perplexity.svg",
      alt: "Perplexity Logo",
    },
    {
      id: "prisma",
      src: "/prisma.svg",
      alt: "Prisma Logo",
    },
    {
      id: "replicate",
      src: "/replicate.svg",
      alt: "Replicate Logo",
    },
    {
      id: "super",
      src: "/super.svg",
      alt: "Super Logo",
    },
    {
      id: "tinybird",
      src: "/tinybird.svg",
      alt: "Tinybird Logo",
    },
  ];
  return (
    <div className="flex flex-col row-span-1 col-span-12 items-center md:h-fit pt-20 lg:pt-[6rem] justify-start w-full space-y-4">
      <Typography variant={"p"}>Trusted by top companies</Typography>
      <Marquee reverse fade pauseOnHover className="w-full max-w-screen">
        {BRANDS.map(({ id, src, alt }) => {
          return (
            <Image
              key={id}
              src={src}
              className="h-12 md:h-20 blur-0 grayscale text-transparent invert transition-all hover:grayscale-0 col-span-1"
              width={220}
              height={182}
              alt={alt}
            />
          );
        })}
      </Marquee>
    </div>
  );
};

export default Brands;
