import React from "react";
import Container from "./container";
import { Typography } from "../ui/typography";
import Image from "next/image";
import {
  FigmaLogoIcon,
  GlobeIcon,
  HeartIcon,
  Pencil1Icon,
  StackIcon,
  SunIcon,
} from "@radix-ui/react-icons";

const ShowcaseFeatures = () => {
  const FEATURES_ONE = [
    {
      label: "UI/UX Branding",
      icon: <FigmaLogoIcon />,
    },
    {
      label: "Branding",
      icon: <SunIcon />,
    },
    {
      label: "Copywriting",
      icon: <Pencil1Icon />,
    },
    {
      label: "Landing Page",
      icon: <HeartIcon />,
    },
    {
      label: "Multipage website",
      icon: <StackIcon />,
    },
    {
      label: "Web apps",
      icon: <GlobeIcon />,
    },
  ];
  return (
    <Container id="scope" className="py-16 relative overflow-visible">
      <Image
        aria-hidden
        alt="Wave"
        width={120}
        height={80}
        src={"/assets/asset_9.svg"}
        className="absolute left-1/2 -translate-x-1/2 top-0 w-20 md:w-32 lg:w-48"
      />
      <Image
        aria-hidden
        alt="Wave"
        width={10}
        height={80}
        src={"/assets/arrow_1.svg"}
        className="absolute left-1/2 -translate-x-1/2 -top-10"
      />
      <Image
        aria-hidden
        alt="Wave"
        width={100}
        height={80}
        src={"/assets/arrow_3.svg"}
        className="absolute z-30 left-1/2 -translate-x-1/2  -bottom-10"
      />
      <Image
        aria-hidden
        alt="Wave"
        width={240}
        height={160}
        src={"/assets/asset_12.svg"}
        className="absolute z-30 right-0 -bottom-40 w-20 md:w-32 lg:w-72"
      />
      <Image
        aria-hidden
        alt="Wave"
        width={140}
        height={80}
        src={"/assets/asset_13.svg"}
        className="absolute z-30 left-0 -bottom-40 w-20 md:w-32 lg:w-64"
      />
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
        <div className="grid w-full max-w-lg md:max-w-none grid-cols-2 md:grid-cols-3 border-4 border-orange-200 rounded-lg p-4 md:p-14 gap-6 md:gap-14 justify-between items-start">
          {[
            ...FEATURES_ONE,
            ...FEATURES_ONE,
            ...FEATURES_ONE,
            ...FEATURES_ONE,
          ].map(({ label: feature, icon }, idx) => (
            <p
              className="font-semibold border-b-[4px] pb-4 border-orange-200 flex justify-between items-center"
              key={`${feature}-${idx}`}
            >
              {feature}
              {icon}
            </p>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ShowcaseFeatures;
