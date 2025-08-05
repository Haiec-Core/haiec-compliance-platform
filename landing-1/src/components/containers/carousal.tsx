import React from "react";
import FeatureCarousel from "./featureCarousal";
import { Typography } from "../ui/typography";

const Carousal = () => {
  return (
    <section className="my-8 w-full md:my-6">
      <Typography
        variant={"h4"}
        className="mb-8 flex items-center justify-center pb-4 text-center font-bold tracking-tighter"
      >
        Everything else you need
      </Typography>
      <FeatureCarousel />
    </section>
  );
};

export default Carousal;
