import React from "react";
import Container from "./container";
import { Typography } from "../ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Image from "next/image";
import { SHOWCASE_FEATURES } from "@/lib/enums";

const Preview = () => {
  return (
    <Container classNames="overflow-x-hidden px-1">
      <div className="col-span-12 flex flex-col justify-start py-10 md:py-20 max-w-screen-xl mx-auto">
        <div className="">
          <Typography variant={"h2"} className="tracking-tighter">Built for SAAS creators</Typography>
          <Typography className="w-3/4 ">
          Great, now that we have your attention, we will actually talk about how we help you
          </Typography>
        </div>
        <Tabs
          defaultValue={SHOWCASE_FEATURES[0].title}
          className="w-full mx-auto"
        >
          <div className="w-4/5 md:w-100 overflow-x-hidden">
          <TabsList className="max-w-screen-sm mt-6 flex flex-grow overflow-x-scroll no-scrollbar ps-12 pe-8 md:pe-0 md:ps-0">
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
              <div className="w-4/5 md:w-full h-full flex flex-col lg:flex-row justify-between item-start md:items-center lg:space-x-24 space-y-8 py-5 md:py-10">
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
              
               
              <div className="flex flex-col w-4/5 md:w-full items-start text-start justify-start space-y-4">
                  <Typography variant={"h4"} className="w-fit">
                    {feat.subtitle}
                  </Typography>
                  <Typography className="w-5/5 md:w-3/3 font-base">{feat.desc}</Typography>
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
