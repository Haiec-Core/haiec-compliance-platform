import React from "react";
import Container from "./container";
import { Typography } from "../ui/typography";
import { PROCESS_FEATURES } from "@/lib/enums";
import { CheckCircledIcon } from "@radix-ui/react-icons";

type FeatureType = {
  title: string;
  features?: string[];
};

export default function ProcessCardList() {
  return (
    <Container classNames="py-0 bg-cyan-50">
      <div className="pt-20 lg:max-w-7xl xl:w-[1400px] mx-auto col-span-12 lg:pt-[15rem] space-y-6 ">
        <Typography className="text-center w-full text-cyan-900" variant={"h2"}>
          Process
        </Typography>
        <Typography
          variant="subheading"
          className="w-3/4 lg:max-w-[50%] my-6 mx-auto text-balance text-center"
        >
          Great, now that we have your attention, we will actually talk about
          how we help you
        </Typography>
        <div className="mt-6 px-6 py-10 lg:max-w-7xl xl:w-[1400px] lg:px-8 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PROCESS_FEATURES.map((feature, idx) => (
            <ProcessCard key={feature.title} id={idx + 1} feature={feature} />
          ))}
        </div>
      </div>
    </Container>
  );
}

const ProcessCard = ({ feature, id }: { feature: FeatureType; id: number }) => {
  return (
    <div className="rounded-3xl p-8 xl:p-10 max-w-[360px] bg-white">
      <Typography className="bg-cyan-50 text-lg font-medium tracking-tight leading-8 px-4 py-2 rounded-md">
        {id}
      </Typography>
      <Typography
        variant={"h3"}
        className="mt-5 text-2xl font-bold tracking-tight"
      >
        {feature.title}
      </Typography>
      <Typography variant={"ul"} className="my-4 list-none">
        {feature.features?.map((feature) => (
          <li
            key={feature}
            className="flex w-full items-start
                   justify-start overflow-hidden text-secondary-foreground"
          >
            <CheckCircledIcon className="mr-2 flex h-6 w-6 items-center justify-center capitalize text-cyan-600" />
            <p className="text-ellipsis text-wrap">{feature}</p>
          </li>
        ))}
      </Typography>
    </div>
  );
};
