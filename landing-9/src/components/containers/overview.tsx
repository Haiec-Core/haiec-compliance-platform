import React from "react";
import Container from "./container";
import { Typography } from "../ui/typography";
import Image from "next/image";
import { TESTIMONIES } from "@/lib/enums";

const Overview = () => {
  return (
    <Container className="py-16 relative overflow-visible bg-secondary-background">
      <div className="flex col-span-12 max-w-screen-xl mx-auto flex-col items-center justify-between gap-24 py-16">
        <div className="flex mx-auto flex-col items-center max-w-screen-md justify-between gap-4">
          <Typography variant={"h2"}>
            it&apos;s &quot;you&apos;ll never go back&quot; better
          </Typography>
          <Typography className="text-center max-w-screen-md">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem ex
            quaerat nemo iure repudiandae nam, mollitia similique voluptate
            beatae neque.
          </Typography>
        </div>
        <div className="flex flex-col md:flex-row gap-16 h-max justify-between items-start">
          <div className="bg-white flex flex-grow flex-col max-w-full md:max-w-[50%] h-full max-h-full px-10 py-8">
            <span className="text-9xl text-amber-500">&quot;</span>
            <Typography className="text-black" variant={"h3"}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non,
              dicta.
            </Typography>
            <div className="flex flex-row gap-4 w-full items-center font-medium mt-8">
              <div className="size-12 rounded-full overflow-hidden">
                <Image
                  width={48}
                  height={48}
                  src={TESTIMONIES[0].profilePic}
                  alt={TESTIMONIES[0].author}
                />
                <div className="grow text-sm">
                  <Typography variant={"lead"} className="font-semibold">
                    {TESTIMONIES[0].author}
                  </Typography>
                  <Typography variant={"lead"} className="font-semibold">
                    @{TESTIMONIES[0].author}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col h-full items-start justify-start gap-8">
            {Array(3)
              .fill(1)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-start justify-start gap-4"
                >
                  <Typography variant={"h5"} className=" font-semibold">
                    Totally async
                  </Typography>

                  <Typography className="">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Quae, similique.
                  </Typography>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Image
        aria-hidden
        alt="Wave"
        width={16}
        height={80}
        src={"/assets/arrow_1.svg"}
        className="absolute z-30 -top-20 left-1/2 -translate-x-1/2"
      />
      <Image
        aria-hidden
        alt="Wave"
        width={80}
        height={80}
        src={"/assets/arrow_2.svg"}
        className="absolute z-30 -bottom-10 left-1/2 -translate-x-1/2"
      />
    </Container>
  );
};

export default Overview;
