import React from "react";
import { Typography } from "../ui/typography";
type FeatureType = {
  title: string;
  subtitle: string;
  desc: string;
  features?: string[];
  navigateTo: string;
  imgSrc: string;
};
const ActionCard = () => {
  return (
    <div className="bg-[#020817] pt-12 pb-12">
      <Typography className="text-center w-full text-card" variant={"h2"}>
        Nextbase makes your life easy
      </Typography>
      <Typography
        variant="subheading"
        className="w-3/4 lg:max-w-[50%] my-6 mx-auto text-balance text-center text-card"
      >
        Nextbase is built for scale. Whether you are building a small app or a
        huge app, Nextbase has all the tools you need.
      </Typography>
    </div>
  );
};

export default ActionCard;
