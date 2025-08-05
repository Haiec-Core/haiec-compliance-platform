import { Button } from "@/components/ui/button";
import { Typography } from "../ui/typography";
import Container from "./container";

export default function ContactCard({ customPlan }: { customPlan: boolean }) {
  return (
    <>
      {customPlan ? (
        <Container
          id="custom_plan"
          className="py-5 bg-black dark:bg-secondary text-white dark:text-black md:ml-40 md:px-8 max-w-[342px] lg:max-w-[820px] xl:max-w-[1050px] 2xl:max-w-[1400px] rounded-2xl md:mb-14 mb-2"
        >
          <div className="flex gap-4 flex-col items-start justify-start">
            <Typography
              variant={"h5"}
              className="text-start text-sm md:text-lg text-balance text-inherit"
            >
              Custom Plan
            </Typography>
            <Typography
              variant={"h3"}
              className="text-start text-balance md:text-4xl text-xl text-inherit mt-2"
            >
              Contact us.
            </Typography>
            <Typography
              variant={"p"}
              className="text-start text-balance text-sm md:text-base font-light text-inherit"
            >
              Suitable for huge organizations with a lot of users.
            </Typography>
            <Button
              variant={"secondary"}
              className="w-full text-lg md:w-full mt-3 md:mt-6 bg-background p-0 text-black font-semibold shadow-none rounded-none"
            >
              Get Started
            </Button>
          </div>
        </Container>
      ) : (
        <Container className="md:py-20 py-6 bg-primary dark:bg-secondary text-white mt-12 px-4 mb-14">
          <div className="flex max-w-3xl gap-4 mx-auto flex-col items-center justify-center">
            <Typography
              variant={"h2"}
              className="text-center text-balance text-inherit"
            >
              Grow with Nextbase
            </Typography>
            <Typography
              variant={"p"}
              className="text-center text-balance text-inherit font-light mb-6"
            >
              Great, now that we have your attention, let's see some of my
              recent work.
            </Typography>
            <Button variant={"secondary"}>Get Started for Free</Button>
          </div>
        </Container>
      )}
    </>
  );
}
