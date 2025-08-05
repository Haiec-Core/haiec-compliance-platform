import React from "react";
import Container from "./container";
import Image from "next/image";

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
    <Container>
      <div className="flex flex-col row-span-1 col-span-12 items-center md:h-fit justify-start w-full">
        <div className="mx-auto mt-8 flex overflow-x-scroll md:overflow-auto w-[90vw] md:grid md:w-full max-w-screen-lg max-h-fit items-center px-5 md:grid-cols-6 md:px-0 gap-4 md:gap-0">
          {BRANDS.map(({ id, src, alt }) => {
            return (
              <Image
                key={id}
                src={src}
                className="h-12 md:h-20 blur-0 grayscale text-transparent dark:invert dark:hover:invert-0 transition-all hover:grayscale-0 col-span-1"
                width={520}
                height={182}
                alt={alt}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Brands;
