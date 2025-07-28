import React from "react";
import FeatureCard from "./featureCard";
import { SHOWCASE_FEATURES } from "@/lib/enums";
import Container from "./container";
import { Typography } from "../ui/typography";
const FeatureCardsList = () => {
  return (
    <Container classNames="bg-transparent overflow-visible">
      <section className="col-span-12 row-auto grid h-full w-full gap-8 overflow-visible bg-transparent">
        <div className="flex w-full justify-center items-center">
          <Typography
            variant={"h2"}
            className=" text-blue-900 text-center mb-4 text-pretty font-bold tracking-tighter dark:text-white"
          >
            Features
          </Typography>
        </div>
        {SHOWCASE_FEATURES.map((feature) => (
          <FeatureCard key={feature.title} feature={feature} />
        ))}
      </section>
    </Container>
  );
};

export default FeatureCardsList;
