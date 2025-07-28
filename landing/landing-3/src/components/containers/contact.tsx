import { Button } from "@/components/ui/button";
import { Typography } from "../ui/typography";

export default function ContactCard() {
  return (
    <div className="bg-muted relative mx-auto grid h-full w-full grid-cols-12 px-8 md:px-16 lg:px-32 overflow-x-hidden overflow-hidden mt-8">
      <div className="bottom-0 col-span-12 flex h-[30rem] w-full flex-col items-center justify-center">
        <Typography
          variant={"h2"}
          className="flex items-center justify-center text-center font-bold tracking-tighter"
        >
          Grow with NextBase
        </Typography>
        <Typography className="prose text-pretty px-4 text-center md:px-0">
          Build your next SAAS project with a modern stack of Next.js 14+,
          Supabase, Stripe and Typescript, and save 4+ months of development
          time ~ $18000
        </Typography>
        <Button className="my-4">
          <div className="flex w-fit items-center justify-between gap-2">
            <p className="">Get started for free</p>
          </div>
        </Button>
      </div>
    </div>
  );
}
