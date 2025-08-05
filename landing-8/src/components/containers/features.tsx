import React from "react";
import Wrapper from "./wrapper";
import { Typography } from "../ui/typography";
import { CubeIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

const Features = () => {
  return (
    <Wrapper>
      <div className="flex flex-col justify-center items-center mt-8">
        <div className="flex flex-col justify-center w-full text-center items-center gap-4 m-auto px-6 md:px-10 lg:px-20">
          <Typography variant={"h2"} className="w-full text-center">
            Features
          </Typography>
          <Typography
            variant="subheading"
            className="my-6 mx-auto text-balance text-center"
          >
            Nextbase is built for scale. Whether you are building a small app or
            a huge app, Nextbase has all the tools you need.
          </Typography>
        </div>
        <div className="mx-auto my-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-12 lg:gap-y-20">
          {Array(12)
            .fill(1)
            .map((_, idx) => (
              <FeatureCard key={idx} />
            ))}
        </div>
      </div>
    </Wrapper>
  );
};

const FeatureCard = () => {
  return (
    <div className="bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 p-4 border rounded-md flex col-span-1 flex-col gap-6 text-sm text-slate-800 dark:text-slate-300 tracking-normal font-medium leading-normal">
      <div className="flex flex-col gap-3 items-start text-slate-800/80 dark:text-slate-900">
        <CubeIcon className="text-gray-400 hover:text-white" />
        <span className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          Feature
        </span>
      </div>
      <Typography className="leading-3 text-sm font-normal">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet molestiae
        error eaque, sunt tempora natus doloremque laudantium velit accusantium
        accusamus nobis odio incidunt neque illo provident animi libero magni
        repellendus.
      </Typography>
      <Button
        variant={"link"}
        className="text-indigo-300 dark:text-indigo-500 gap-2 text-start w-fit pl-0 dark:hover:text-white"
      >
        Learn more
      </Button>
    </div>
  );
};
export default Features;
