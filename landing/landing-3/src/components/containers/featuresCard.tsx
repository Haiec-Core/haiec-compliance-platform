import React from "react";
import Container from "./container";
import { Typography } from "@components/ui/typography";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const Features = () => {
  return (
    <Container classNames="py-0">
      <div className="pt-20 lg:max-w-7xl xl:w-[1400px] mx-auto col-span-12 lg:pt-[15rem] space-y-6 ">
        <Typography className="text-center w-full" variant={"h2"}>
          Process
        </Typography>
        <Typography
          variant="subheading"
          className="w-3/4 lg:max-w-[50%] my-6 mx-auto text-balance text-white/60 text-center"
        >
          Great, now that we have your attention, we will actually talk about
          how we help you
        </Typography>
        <div className="mt-6 px-6 py-10 lg:max-w-7xl xl:w-[1400px] lg:px-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FeaturesCard />
          <FeaturesCard />
          <FeaturesCard />
        </div>
      </div>
    </Container>
  );
};

export default Features;

const FeaturesCard = () => {
  return (
    <div className="rounded-3xl p-8 xl:p-10 bg-muted max-w-[360px]">
      <Typography className="text-white text-lg font-medium tracking-tight leading-8 bg-background px-4 py-2 rounded-md">
        1
      </Typography>
      <Typography
        variant={"h3"}
        className="mt-5 text-2xl font-bold text-white tracking-tight"
      >
        Feature One
      </Typography>
      <Typography variant={"p"} className="text-white mt-5 text-md">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere impedit
        qui autem pariatur architecto distinctio voluptates vero eligendi nisi
        expedita quisquam deserunt nemo amet quo corrupti.
      </Typography>

      <div className="mt-12 font-normal bg-muted outline-none text-[#F8FAFC] flex justify-start items-center hover:cursor-pointer">
        Learn more
        <ArrowRightIcon className="h-4 w-4 ml-2" />
      </div>
    </div>
  );
};
