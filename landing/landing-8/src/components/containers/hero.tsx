import { Button } from "../ui/button";
import { Typography } from "../ui/typography";
import Wrapper from "./wrapper";

export default function Hero() {
  return (
    <Wrapper classNames="relative ">
      <div className="flex w-full h-full flex-col md:flex-row md:justify-between items-start md:items-center gap-16 lg:gap-32">
        <div className="max-w-[580px] mt-12 mb-12 md:mt-24 w-full flex z-20 snap-start flex-col items-start justify-center lg:items-start gap-6 text-start">
          <div className="flex flex-col items-start justify-start w-full text-foreground">
            <Typography variant="h1" className="tracking-tighter">
              A fancy looking hero text to catch your attention
            </Typography>
            <Typography
              variant="subheading"
              className="w-3/4 my-6 text-balance"
            >
              Great, now that we have your attention, we will actually talk
              about how we help you
            </Typography>
          </div>

          <div className="flex justify-start items-center gap-4 pt-8">
            {" "}
            <Button variant={"default"}>
              <div className="flex w-fit items-center justify-between gap-2">
                <p className="font-semibold">Get started for free</p>
              </div>
            </Button>
          </div>
        </div>
        {/* <div className="sm:hidden flex relative w-full h-full min-h-96 justify-items-center justify-center col-span-12 items-center">
            ...right side content will go here...
        </div> */}
      </div>
    </Wrapper>
  );
}
