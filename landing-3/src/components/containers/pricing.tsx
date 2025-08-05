import React from "react";
import Container from "./container";
import { Typography } from "@components/ui/typography";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@components/ui/button";

const Pricing = () => {
  return (
    <Container classNames="py-0">
      <div className="pt-20 lg:max-w-7xl xl:w-[1400px] mx-auto col-span-12 lg:pt-[15rem] space-y-6 ">
        <Typography className="text-center w-full" variant={"h2"}>
          Simple and transparent pricing
        </Typography>
        <Typography
          variant="subheading"
          className="w-3/4 lg:max-w-[50%] my-6 mx-auto text-balance text-white/60"
        >
          Great, now that we have your attention, we will actually talk about
          how we help you do the above. Mostly a brief description which
          explains our service to convince you to keep scrolling down.
        </Typography>
        <div className="mt-6 py-10 lg:max-w-7xl xl:w-[1400px] px-6 lg:px-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PricingCard />
          <PricingCard />
          <PricingCard />
        </div>
      </div>
    </Container>
  );
};

export default Pricing;

const PricingCard = () => {
  return (
    <div className="rounded-3xl p-8 xl:p-10 bg-muted">
      <Typography className="text-white text-lg font-medium tracking-tight leading-8 bg-background px-2 rounded-md">
        One-off
      </Typography>
      <Typography
        variant={"h3"}
        className="mt-5 text-4xl font-extrabold text-white tracking-tight"
      >
        $699
      </Typography>
      <p className="text-white/50 mt-4 tracking-wider text-xs">
        High-converting landing page, Branding, Copy
      </p>
      <div className="w-full h-[0.01rem] mt-5 mb-5 bg-[#F8FAFC] opacity-50"></div>
      <ul className="text-gray-300 mt-4 space-y-1 text-sm">
        <li className="flex gap-2 text-base  p-0 py-1 hover:bg-transparent items-center  ">
          <CheckIcon className="text-white size-4 flex-none" />
          Branding
        </li>
        <li className="flex gap-2 text-base  p-0 py-1 hover:bg-transparent items-center  ">
          <CheckIcon className="text-white size-4 flex-none" />
          Custom graphics
        </li>
        <li className="flex gap-2 text-base  p-0 py-1 hover:bg-transparent items-center  ">
          <CheckIcon className="text-white size-4 flex-none" />
          High-converting copy
        </li>
        <li className="flex gap-2 text-base  p-0 py-1 hover:bg-transparent items-center  ">
          <CheckIcon className="text-white size-4 flex-none" />
          2x revisions
        </li>
        <li className="flex gap-2 text-base  p-0 py-1 hover:bg-transparent items-center  ">
          <CheckIcon className="text-white size-4 flex-none" />
          Unlimited stock images
        </li>
        <li className="flex gap-2 text-base  p-0 py-1 hover:bg-transparent items-center  ">
          <CheckIcon className="text-white size-4 flex-none" />
          Updates delivered every 24-72 hours
        </li>
      </ul>
      <Button className="mt-4 w-full">Get started</Button>
    </div>
  );
};
