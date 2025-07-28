import React from "react";
import Container from "./container";
import { Typography } from "../ui/typography";
import { Card, CardFooter } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { CubeIcon,ChevronRightIcon } from "@radix-ui/react-icons";

const BLOGS = [
  "/gradient.png",
  "/gradient.png",
];

const Blogs = () => {
  return (
    <Container classNames="">
      <div className="flex w-full flex-col justify-start items-start py-20 mx-auto">
        <div className="items-center w-full">
          <Typography variant={"h2"} className="tracking-tighter">Our Blog posts</Typography>
          <Typography>
            Great, now that we have your attention, we will actually talk about how we help you
          </Typography>
        </div>
        <div className="w-full flex flex-col lg:flex-row justify-between gap-8 pt-10 items-center">
          {BLOGS.slice(0, 2).map((blog) => (
            <BlogCard key={blog} src={blog} />
          ))}
        </div>
      </div>
    </Container>
  );
};

const BlogCard = ({ src }: { src: string }) => {
  return (
    <Card className="relative flex w-full lg:w-1/2 rounded-lg flex-col items-center justify-start border-2 hover:border-transparent overflow-hidden transition-all shadow-none hover:shadow-lg">
      <div className="w-full relative overflow-hidden h-64 cursor-pointer">
        <Image
          src={src}
          className="object-cover w-full h-full"
          width={600}
          height={400}
          alt="Blog Image"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <CubeIcon className="text-white opacity-75 w-12 h-12" />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start space-y-4 p-4">
     
        <Typography variant={"h3"} className="tracking-tight font-medium hover:underline">
        Feature
        </Typography>
        <Typography variant={"p"} className="tracking-tight font-normal hover:underline">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores corrupti ea minima sequi ullam facere fugiat suscipit 
        </Typography>
        
        <CardFooter className="p-0">
            <Button
            variant={"link"}
            className="text-start justify-start px-0 decoration-primary text-secondary-foreground/80 hover:text-primary text-sm font-normal "
            size={"sm"}
            >
            Read more <ChevronRightIcon className="size-4" />
            </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default Blogs;
