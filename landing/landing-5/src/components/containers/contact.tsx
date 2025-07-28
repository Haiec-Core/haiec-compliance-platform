import React from "react";
import Container from "../ui/container";
import { Typography } from "../ui/typography";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AVATARS } from "@/lib/enums";
import { Button } from "../ui/button";

export default function ContactCard() {
  return (
    <Container classNames="md:my-10 py-20 bg-primary">
      <div className="col-span-12 w-full max-w-7xl mx-auto h-full px-5 grid grid-cols-1 lg:grid-cols-12  lg:gap-12 ">
        <div className="flex col-span-11 md:col-span-8 flex-col justify-center items-start text-start">
        <div className="flex flex-col items-start justify-start text-start space-y-2">
          <Typography variant="h1" className="font-bold text-fuchsia-50 md:text-[40px] md:leading-[48px] ">
            A fancy looking hero text to catch your attention{" "}
          </Typography>
          <Typography
            variant="p"
            className="max-w-xl text-primary-foreground md:px-0 leading-7 font-extralight text-fuchsia-50 mt-10"
          >
           Great, now that we have your attention, we will actually talk about how we help you
          </Typography>
        </div>
        <div className="w-full flex lg:flex-row flex-col  justify-between items-start gap-8 lg:items-center my-10">
          <div className="relative group">
            <Button className="mt-0 scroll-m-0 relative bg-fuchsia-50 text-primary hover:text-fuchsia-50 font-medium">
            Get started for free
            </Button>
            <Button className="my-3 md:my-0 px-16  md:ms-5  scroll-m-0 relative bg-transparent font-medium border border-fushia-50 text-fuchsia-50">
            Watch Video
            </Button>
           
          </div>
         
        </div>
        </div>
        <div className="order-2 mx-auto col-span-10 md:col-span-4 lg:col-span-4 rounded-lg overflow-hidden shadow-md w-full  flex h-full items-center justify-center">
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
}
