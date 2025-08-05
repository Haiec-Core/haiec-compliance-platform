"use client";
import React from "react";
import Container from "./container";
import { Typography } from "@ui/typography";
import { CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@ui/button";
import * as Separator from "@radix-ui/react-separator";

const Pricing = () => {
  return (
    <Container className="md:py-20 py-10 mb-12" id="pricing">
      <div className="px-4 md:px-24">
        <Typography
          className="text-left w-full pb-5 text-primary"
          variant={"h3"}
        >
          Simple and transparent pricing
        </Typography>
        <Typography
          variant="p"
          className="md:w-[100%] lg:w-[50%] w-fit pb-10 font-light"
        >
          Great, now that we have your attention, we will actually talk about
          how we help you do the above.
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PricingCard
            title="Freelancer"
            price="$699"
            desc="Suitable for solo-preneurs, and freelancers"
          />
          <PricingCard
            title="Startup"
            price="$899"
            desc="Suitable for small startups"
          />
          <PricingCard
            title="Enterprise"
            price="$1099"
            desc="Suitable for organizations"
          />
        </div>
      </div>
    </Container>
  );
};

const PricingCard = ({
  title,
  price,
  desc,
}: {
  title: string;
  price: string;
  desc: string;
}) => {
  return (
    <div className="rounded-3xl p-6 md:p-8 bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 cursor-pointer h-full flex flex-col justify-between">
      <div>
        {title.includes("Startup") ? (
          <div className="flex flex-row justify-between items-center">
            <Typography className="text-lg font-medium tracking-tight leading-8 px-1 rounded-md">
              {title}
            </Typography>
            <span className="bg-[hsl(152,82%,89%)] p-2 rounded-md text-black font-normal">
              Most Popular
            </span>
          </div>
        ) : (
          <Typography className="text-lg font-medium tracking-tight leading-8 px-1 rounded-md">
            {title}
          </Typography>
        )}

        <Typography
          variant={"h3"}
          className="mt-5 text-4xl font-extrabold tracking-tight"
        >
          {price}
        </Typography>
        <p className="mt-4 tracking-wider text-sm font-normal">{desc}</p>

        <div className="w-full h-[0.01rem] mt-5 mb-5 opacity-50">
          <Separator.Root className="my-5 h-px bg-gray-300" />
        </div>

        <ul className="mt-4 space-y-1 text-sm">
          {Array.from({ length: 5 }, (_, index) => (
            <li
              key={index}
              className="flex gap-2 text-base p-0 py-1 hover:bg-transparent items-center"
            >
              <CheckIcon className="size-4 flex-none" />
              No Credit card required
            </li>
          ))}
        </ul>
      </div>
      <Button className="mt-6 w-full">Get started</Button>
    </div>
  );
};

export default Pricing;
