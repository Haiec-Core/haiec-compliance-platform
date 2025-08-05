import { Button } from "@/components/ui/button";
import { Typography } from "../ui/typography";
import Wrapper from "./wrapper";

export default function ContactCard() {
  return (
    <Wrapper classNames="bg-[#1E293B80]/50 mt-12 py-20 lg:py-32 relative">
      <div className="col-span-12 mx-auto flex flex-col md:flex-row justify-between items-center overflow-x-hidden w-full overflow-hidden">
        <div className="text-center md:ml-auto w-full flex flex-col justify-start items-center space-y-4">
          <Typography className="from-white" variant={"h2"}>
            Grow with Nextbase
          </Typography>
          <Typography
            variant="subheading"
            className="my-6 mx-auto text-balance text-center"
          >
            Build your next SAAS project with a modern stack of Next.js 14+,
            Supabase, Stripe and Typescript, and save 4+ months of development
            time ~ $18000
          </Typography>
          <Button variant={"secondary"} className="mx-auto bg-white text-black hover:text-white">
            Get started for free
          </Button>
        </div>
      </div>
    </Wrapper>
  );
}
