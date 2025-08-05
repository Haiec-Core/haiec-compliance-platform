import React from "react";
import Container from "./container";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Image from "next/image";

const IMAGES = [
  "https://res.cloudinary.com/dkqrmlxlg/image/upload/h_400,w_600/v1708335100/photo-1600480505021-e9cfb05527f1_pfa95w.webp",
  "https://res.cloudinary.com/dkqrmlxlg/image/upload/h_400,w_600/v1708335096/photo-1506073869338-9d4cc16bae4c_vfz2yl.webp",
];
const Preview = () => {
  return (
    <Container classNames="bg-muted">
      <div className="flex w-full flex-col justify-start items-start py-20 mx-auto">
        <Typography variant={"h2"}>Check Out Our Work</Typography>
        <div className="w-full flex md:flex-row flex-col justify-between gap-8 pt-10 items-center">
          {IMAGES.map((src) => (
            <BrandCard key={src} src={src} />
          ))}
        </div>
      </div>
    </Container>
  );
};

const BrandCard = ({ src }: { src: string }) => {
  return (
    <Card className="flex w-full md:w-1/2 rounded-lg flex-col items-center justify-start border-2 hover:border-transparent overflow-hidden transition-all shadow-none hover:shadow-lg border-gray-100">
      <div className="w-full h-64 overflow-hidden bg-red-500">
        <Image
          alt="Brand Cover"
          width={600}
          height={400}
          className="object-cover max-w-full w-full h-full"
          src={src}
        />
      </div>
      <div className="flex flex-col items-start justify-start space-y-4 p-8">
        <Typography
          variant={"largeText"}
          className=" bg-amber-300 px-2 font-medium text-accent-foreground text-base rounded-md"
        >
          Brand Name
        </Typography>
        <Typography variant={"h5"} className="font-normal">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus,
          assumenda?
        </Typography>
        <Button variant={"link"} className="pl-0">
          Read More
        </Button>
      </div>
    </Card>
  );
};

export default Preview;
