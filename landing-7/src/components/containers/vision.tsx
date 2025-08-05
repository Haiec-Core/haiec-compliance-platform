import React from "react";
import Container from "./container";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import Image from "next/image";

const Vision = () => {
  return (
    
    <Container classNames="flex bg-primary py-3 dark:bg-card dark:text-white flex justify-between items-center overflow-hidden">
      
      <div className=" md:flex ">
        <div className="my-10">
          <Typography
            variant={"h2"}
            className="text-start text-primary-foreground dark:text-white"
          >
            Our goal 
          </Typography>
          <Typography
            variant={"p"}
            className="text-start text-primary-foreground md:w-2/3 dark:text-white my-3"
          >
           Great, now that we have your attention, we will actually talk about how we help you
          </Typography>
          <Button  className="bg-primary-foreground text-[#020817] text-base py-2 px-4 my-3 hover:bg-[#000] hover:text-primary-foreground">Get started for free</Button>
        </div>
        <div className=" ">
          <div className="my-8">
            <Image
              width={320}
              height={300}
              alt="Contact Us Illustration"
              src="/image.png"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Vision;
