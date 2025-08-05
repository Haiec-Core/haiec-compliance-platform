import React from "react";
import Container from "../ui/container";
import { Typography } from "../ui/typography";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AVATARS } from "@/lib/enums";
import { Button } from "../ui/button";
const Showcase = () => {
  return (
    <Container classNames="py-10 ">
      <div className="col-span-12 w-full max-w-7xl mx-auto h-full px-5 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 ">
        <div className="flex col-span-11 md:col-span-7 flex-col justify-center items-start text-start">
          <div className="flex flex-col items-start justify-start text-start space-y-2">
            <Typography
              variant="h1"
              className="font-bold text-primary md:text-[40px] md:leading-[48px] tracking-tighter"
            >
              A fancy looking hero text to catch your attention{" "}
            </Typography>
            <Typography
              variant="p"
              className="max-w-xl text-primary-foreground md:px-0 leading-7"
            >
              Great, now that we have your attention, we will actually talk
              about how we help you
            </Typography>
          </div>
          <div className="w-full flex lg:flex-row flex-col  justify-between items-start gap-8 lg:items-center mt-5">
            <div className="relative group">
              <Button className="mt-0 scroll-m-0 relative bg-primary">
                Get started for free
              </Button>
            </div>
            <div className="w-full h-fit hidden md:flex space-x-4 lg:items-center  items-start gap-2 justify-basline md:ml-5">
              <div className="flex justify-center -space-x-2 ">
                {AVATARS.map(({ src, id }) => {
                  return (
                    <Avatar key={id} className="border-4 border-primary-100/50">
                      <AvatarImage src={src} className="object-cover" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  );
                })}
              </div>
              <div className="group flex flex-col items-center md:items-start justify-start">
                <span className="text-primary-foreground text-base">
                  Loved by 570+ professionals
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="order-2 mx-auto col-span-10 md:col-span-5 lg:col-span-5 rounded-lg overflow-hidden shadow-md w-full  flex h-full items-center justify-center">
          <Image
            width={400}
            height={300}
            alt="expected"
            className="aspect-[4/3] w-full rounded-lg bg-gray-300 object-cover shadow-lg"
            src={
              "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1703582349/admin-dashboard_pzonvt.webp"
            }
          />
        </div>
      </div>
    </Container>
  );
};

export default Showcase;
