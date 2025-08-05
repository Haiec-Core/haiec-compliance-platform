import { Button } from "@/components/ui/button";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Typography } from "../ui/typography";
import Container from "./container";

export default function ContactCard() {
  return (
    <Container classNames="bg-card/20">
      <div className="col-span-12 relative mx-auto h-full flex flex-col justify-start items-center overflow-x-hidden w-full overflow-hidden">
        <div className=" bottom-0 flex h-[30rem] w-full flex-col items-center justify-center ">
          <Typography
            variant={"h2"}
            className="w-full text-center mx-auto text-lime-900"
          >
            Grow with Nextbase
          </Typography>
          <Typography className="prose my-1 text-pretty px-4 text-center md:px-0 dark:text-gray-300">
            Build your next SAAS project with a modern stack of Next.js 14+,
            Supabase, Stripe and Typescript, and save 4+ months of development
            time ~ $18000
          </Typography>
          <Button className="my-4">
            <div className="flex w-fit items-center justify-between gap-2">
              Get started for free
            </div>
          </Button>
          <div className="gap-4 flex flex-col md:flex-row justify-center items-center">
            <div className="flex items-center">
              <CheckCircledIcon className="mr-2 h-6 w-6" />
              <span>
                7-day free trial
              </span>
            </div>
            <div className="flex items-center">
              <CheckCircledIcon className="mr-2 h-6 w-6" />
              <span>
                No credit card required
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
