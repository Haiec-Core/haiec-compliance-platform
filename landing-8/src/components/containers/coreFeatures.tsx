import React from "react";
import Container from "./container";
import { Typography } from "../ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Image from "next/image";
import { SHOWCASE_FEATURES } from "@/lib/enums";
import { CheckCircledIcon } from "@radix-ui/react-icons";

const Preview = () => {
  return (
    <Container classNames="overflow-x-hidden px-1">
      <div className="col-span-12 flex flex-col justify-center py-10 md:py-20">
        <div className="">
          <Typography variant={"h2"} className="text-center w-full">
            Core features
          </Typography>
          <Typography
            variant="subheading"
            className="w-3/4 lg:max-w-[50%] my-6 mx-auto text-balance text-center"
          >
            Great, now that we have your attention, we will actually talk about
            how we help you
          </Typography>
        </div>
        <Tabs
          defaultValue={SHOWCASE_FEATURES[0].title}
          className="w-full mx-auto"
        >
          <div className="w-1/2 mx-auto md:w-100 overflow-x-hidden">
            <TabsList className="bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 mt-6 mb-6 flex flex-grow overflow-x-hidden overflow-y-hidden no-scrollbar ps-12 pe-8 md:pe-0 md:ps-0">
              {SHOWCASE_FEATURES.slice(0, 3).map((feat, idx) => (
                <TabsTrigger
                  key={feat.title}
                  className="w-full flex-grow capitalize"
                  value={feat.title}
                >
                  {feat.subtitle}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {SHOWCASE_FEATURES.map((feat) => (
            <TabsContent key={feat.title} value={feat.title}>
              <div className="bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 w-full mx-auto h-full flex flex-col lg:flex-row justify-center item-center md:items-center lg:space-x-24 space-y-8 p-8 md:py-8">
                <div className="flex flex-col w-1/2 md:w-1/2 items-start text-start justify-start space-y-4">
                  <Typography variant={"h4"} className="w-fit">
                    {feat.title}
                  </Typography>
                  <Typography className="w-5/5 md:w-3/3 font-base">
                    {feat.desc}
                  </Typography>
                  <Typography variant={"ul"} className="my-4 list-none">
                    {feat.features.map((singleFeature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex w-full items-center
                   justify-start overflow-hidden text-secondary-foreground"
                      >
                        <CheckCircledIcon className="mr-2 flex h-4 w-4 items-center justify-center capitalize text-white" />
                        <p className="text-ellipsis text-wrap">
                          {singleFeature}
                        </p>
                      </li>
                    ))}
                  </Typography>
                </div>

                <div className="w-1/2 md:w-1/2">
                  <div className="hidden md:block ">
                    <Image
                      width={600}
                      height={200}
                      alt={feat.subtitle}
                      className="rounded"
                      src={feat.imgSrc}
                    />
                  </div>
                  <div className="block md:hidden ">
                    <Image
                      width={300}
                      height={200}
                      alt={feat.subtitle}
                      className="rounded"
                      src={feat.imgSrc}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Container>
  );
};

export default Preview;
