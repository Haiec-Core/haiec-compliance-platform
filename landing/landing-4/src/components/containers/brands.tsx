import React from "react";
import Image from "next/image";
import Marquee from "../ui/marquee";

const Brands = () => {
  const BRANDS = [
    {
      id: "cal",
      src: "/cal.svg",
      alt: "Cal Logo",
    },
    {
      id: "chronicle",
      src: "/chronicle.svg",
      alt: "Chronicle Logo",
    },
    {
      id: "hashnode",
      src: "/hashnode.svg",
      alt: "Hashnode Logo",
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
      id: "tinybird",
      src: "/tinybird.svg",
      alt: "Tinybird Logo",
    },
  ];
  return (
    <div className="flex flex-col row-span-1 col-span-12 items-center md:h-fit justify-start w-full space-y-4">
      <div className="hidden md:flex justify-evenly items-center w-full lg:flex-nowrap mx-auto">
        {BRANDS.map(({ id, src, alt }) => {
          return (
            <Image
              key={id}
              src={src}
              className="h-8 md:h-12 blur-0 text-transparent transition-all col-span-1"
              width={220}
              height={182}
              alt={alt}
            />
          );
        })}
      </div>
      <Marquee className="md:hidden">
        {BRANDS.map(({ id, src, alt }) => {
          return (
            <Image
              key={id}
              src={src}
              className="h-8 md:h-12 blur-0 text-transparent transition-all"
              width={120}
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
