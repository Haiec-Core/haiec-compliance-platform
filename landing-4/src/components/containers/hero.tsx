import { Button } from "../ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Typography } from "../ui/typography";
import Container from "./container";
import Banner from "./banner";
import Brands from "./brands";
import Link from "next/link";
import { CubeIcon } from "@radix-ui/react-icons";
import { AVATARS } from "@/lib/enums";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function Hero() {
  return (
    <Container classNames="bg-cyan-50">
      <div className="col-span-8 flex h-full snap-start flex-col justify-center items-start space-y-8 py-4 md:mt-[var(--navbar-height)] pt-20">
        <div className="flex flex-col items-start justify-center space-y-2">
          <Link
            href="#"
            className="group flex max-w-fit justify-center items-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-[#365314]/10 px-3 md:py-2 sm:py-0 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] transition-all hover:border-gray-300 hover:bg-white/50"
          >
            <CubeIcon className="color-black" />
            <p className="text-sm font-semibold text-black">
              Latest update details hook here
            </p>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <Typography
            variant="h1"
            className="text-left text-cyan-900 my-4 tracking-tighter"
          >
            A fancy looking hero text to catch your attention
          </Typography>
          <Typography variant="p" className="max-w-sm md:max-w-lg md:px-0">
            Great, now that we have your attention, we will actually talk about
            how we help you
          </Typography>
        </div>
        <div className="flex justify-start items-center md:gap-2 flex-wrap md:flex-nowrap">
          <Button variant={"default"} size={"sm"} className="md:mr-6">
            Get started for free
          </Button>
          <div className="my-6 md:my-2 flex justify-start -space-x-2">
            {AVATARS.map(({ src, id }) => {
              return (
                <Avatar key={id} className="border-4 border-muted">
                  <AvatarImage src={src} className="object-cover" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              );
            })}
            <div className="group mt-2 flex flex-col items-center md:justify-start md:flex-row">
              <span className="ml-6">Loved by 570+ professionals</span>
            </div>
          </div>
        </div>
      </div>
      <Banner />
      <Brands />
    </Container>
  );
}
