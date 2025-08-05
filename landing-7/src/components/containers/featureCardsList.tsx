import React from "react";
import Container from "./container";
import { Card, CardContent, CardDescription } from "../ui/card";
import { CubeIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Typography } from "../ui/typography";

const FeatureCardsList = () => {
  return (
    <div className="flex relative w-full flex-col justify-start items-start bg-background py-20 ">
      <Container>
        <section className="col-span-12 row-auto grid h-full w-full overflow-visible bg-inherit space-y-8">
          <div className="flex flex-col justify-start items-start space-y-4 ">
            <Typography variant={"h2"} className="text-3xl md:text-4xl lg:text-4xl font-body text-inherit font-bold tracking-tighter">
              Features Portfolio
            </Typography>
            <Typography variant={"p"} className="text-[#020817] font-light text-base lg:text-lg md:text-lg  md:w-2/4">Nextbase is built for scale. Whether you are building a small app or a huge app, Nextbase has all the tools you need.</Typography>
          </div>
          <div className="grid grid-cols-1  lg:grid-cols-4 gap-4 mx-auto">
            {Array(6)
              .fill(1)
              .map((_, idx) => (
                <Card
                  key={idx}
                  className="p-8 overflow-hidden group max-h-[30rem] first-of-type:lg:col-span-2 flex flex-col items-start lg:items-start first-of-type:items-start last-of-type:items-start last-of-type:lg:col-span-2 bg-muted"
                >
                  <div className="size-10 rounded-sm  shadow-md flex items-center justify-center text-primary bg-[#DAE9FD]">
                    <CubeIcon />
                  </div>
                  <CardContent className="p-0 flex group-first-of-type:flex-row group-last-of-type:flex-row flex-row lg:flex-col">
                    <div className="flex flex-col justify-start items-start space-y-8">
                      <Typography
                        variant={"h3"}
                        className="font-body pt-8 group-first-of-type:text-start group-last-of-type:text-start text-start lg:text-start w-full"
                      >
                        Feature {idx + 1}
                      </Typography>

                      <CardDescription className=" text-lg scroll-m-0 group-first-of-type:text-start group-last-of-type:text-start text-start lg:text-start font-light font-base">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores corrupti suscipit !
                      </CardDescription>
                    </div>
                   
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      </Container>
    </div>
  );
};

export default FeatureCardsList;
