import { Button } from "../ui/button";
import { ArrowRightIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { Typography } from "../ui/typography";
import Container from "@ui/container";
import Banner from "./banner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AVATARS } from "@/lib/enums";

export default function Hero() {
  const STARS: number[] = new Array(5).fill(1);
  return (
    <Container classNames="" size="full">
      <div className=" max-w-4xl  col-span-12 flex h-full snap-start flex-col items-start justify-start space-y-8 py-4 text-center md:mt-[var(--navbar-height)] pt-10 md:pt-20">
        <div className="flex flex-col items-start justify-start text-start space-y-2">
          <Typography variant="h1" className="font-bold text-primary">
            A fancy looking hero text to catch your attention{" "}
          </Typography>
          <Typography
            variant="p"
            className="max-w-xl text-primary-foreground md:px-0 leading-7"
          >
           Great, now that we have your attention, we will actually talk about how we help you
          </Typography>
        </div>
        <div className="w-full flex lg:flex-row flex-col  justify-between items-start gap-8 lg:items-center">
          <div className="relative group">
            <Button className="mt-0 scroll-m-0 relative bg-primary">
            Get started for free
            </Button>
           
          </div>
          <div className="w-full h-fit md:flex md:space-x-4 lg:items-center items-start gap-2 justify-basline md:ml-5">
            <div className="flex justify-start -space-x-2 ">
              {AVATARS.map(({ src, id }) => {
                return (
                  <Avatar key={id} className="border-4 border-primary-100/50">
                    <AvatarImage src={src} className="object-cover" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                );
              })}
            </div>
            <div className="group flex flex-col items-start md:items-start justify-start">
              <span className="text-primary-foreground text-base">
                Loved by 570+ professionals
              </span>
            </div>
          </div>
        </div>
      </div>
      <Banner />
    </Container>
  );
}
