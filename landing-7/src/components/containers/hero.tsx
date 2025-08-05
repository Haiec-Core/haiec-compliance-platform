import { Button } from "../ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Typography } from "../ui/typography";
import Container from "./container";
import Brands from "./brands";
import Header from "./header";
import Image from "next/image";

export default function Hero() {
  return (
    <Container classNames="relative min-h-[100vh] pb-52 bg-primary-background flex flex-col justify-start lg:justify-between items-center">
      <Header />
      <div className="absolute inset-0 h-full bg-blend-darken w-full items-center px-5 py-24 ">
        <Image
          src="/image.png"
          fill
          alt="Hero Image"
          className="bg-blend-darken object-cover"
        />
      </div>
      <div className=" col-span-12  lg:col-span-6 flex h-[100vh] lg:h-[50vh] z-20 snap-start flex-col items-start justify-start lg:items-start space-y-8 py-4 text-start md:mt-[var(--navbar-height)] pt-40">
        <div className="flex flex-col items-start justify-start space-y-2 w-full md:w-1/2 text-black">
          <Typography variant="h1" className="text-black z-20 font-display ">
            A fancy looking hero text to catch your attention
          </Typography>
          <Typography
            variant="p"
            className="max-w-sm font-body z-30 text-black md:max-w-lg text-start"
          >
            Attention-grabbing alert! Brace yourself for an epic description of
            how we rock at helping you out. Keep scrolling to be convinced.
          </Typography>
        </div>

        <Button className="bg-primary hover:bg-black hover:text-muted">
          <div className="flex w-fit items-center justify-between gap-2">
            <p className=" font-semibold">Get started for free</p>

          </div>
        </Button>

     
      </div>
      <Brands />
    </Container>
  );
}
