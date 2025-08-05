import React from "react";
import Image from "next/image";
import Marquee from "../ui/marquee";

const Brands = () => {
  const BRANDS = [
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
    <div className="flex mx-auto flex-col row-span-1 gap-16 col-span-12 items-center md:h-fit justify-start w-full lg:max-w-screen-2xl m-auto px-6 md:px-10 lg:px-20 relative z-10 max-w-4xl lg:my-36 mb-20 lg:mb-40 xl:mb-52">
      <div className="hidden md:flex space-x-4 w-full max-w-screen-md lg:max-w-screen-xl justify-center items-center mx-auto">
        {[...BRANDS].map(({ id, src, alt }, idx) => {
          return (
            <Image
              key={`${id}-${idx}`}
              src={src}
              className="h-full min-h-10 blur-0 dark:invert grayscale-0 dark:grayscale text-transparent transition-all"
              width={220}
              height={180}
              alt={alt}
            />
          );
        })}
      </div>

      <Marquee className="flex md:hidden pt-10 mx-auto">
        {BRANDS.map(({ id, src, alt }) => {
          return (
            <Image
              key={id}
              src={src}
              className="h-full min-h-10 blur-0 dark:invert grayscale-0 dark:grayscale text-transparent transition-all"
              width={220}
              height={180}
              alt={alt}
            />
          );
        })}
      </Marquee>

    </div>
  );
};

export default Brands;
