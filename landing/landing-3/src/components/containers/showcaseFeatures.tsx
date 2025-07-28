import React from "react";
import Container from "./container";
import { Typography } from "@components/ui/typography";
import Marquee from "@components/ui/marquee";

const ShowcaseFeatures = () => {
  const FEATURES_ONE = [
    "UI/UX Branding",
    "Branding",
    "Copywriting",
    "Landing Page",
    "Multipage website",
    "Web apps",
  ];
  return (
    <Container>
      <div className="w-full col-span-12 pt-20 lg:pt-[12rem] flex flex-col md:flex-row justify-between items-center">
        <Marquee
          fade
          className="w-full"
          innerClassName="text-center md:text-left overflow-hidden items-center md:items-start bg-[linear-gradient(180deg,#353535,hsla(0,0%,54%,0)_114.95%)] bg-clip-text "
          direction="up"
        >
          {FEATURES_ONE.map((text) => (
            <Typography key={text} variant={"h4"} className="text-transparent">
              {text}
            </Typography>
          ))}
        </Marquee>
        <div className="md:w-[400px] xl:w-[600px]">
          <Typography variant={"h2"} className="text-center text-balance">
            You name it, we ship it supafast
          </Typography>
        </div>

        <Marquee
          fade
          className="w-full "
          innerClassName="text-center md:text-right items-center md:items-end bg-[linear-gradient(180deg,#353535,hsla(0,0%,54%,0)_114.95%)] bg-clip-text "
          direction="up"
        >
          {FEATURES_ONE.map((text) => (
            <Typography key={text} variant={"h4"} className="text-transparent">
              {text}
            </Typography>
          ))}
        </Marquee>
      </div>
    </Container>
  );
};

export default ShowcaseFeatures;
