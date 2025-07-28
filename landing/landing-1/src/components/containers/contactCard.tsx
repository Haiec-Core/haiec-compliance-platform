import { Button } from "@/components/ui/button";
import { Typography } from "../ui/typography";

export default function ContactCard() {
  return (
    <div className="bg-white relative mx-auto grid h-full w-full grid-cols-12 px-8 md:px-16 lg:px-32 overflow-x-hidden from-sky-300 via-blue-200 via-20%  to-transparent dark:from-indigo-800 dark:via-indigo-700 overflow-hidden">
      <div className=" bottom-0 col-span-12 flex h-[30rem] w-full flex-col items-center justify-center  ">
        <Typography
          variant={"h2"}
          className="flex items-center justify-center text-center font-bold tracking-tighter"
        >
          Grow with NextBase
        </Typography>
        <Typography className="prose text-pretty px-4 text-center text-gray-800 md:px-0 dark:text-gray-300">
          Build your next SAAS project with a modern stack of Next.js 14+,
          Supabase, Stripe and Typescript, and save 4+ months of development
          time ~ $18000
        </Typography>
        <Button className="my-4 bg-black">
          <div className="flex w-fit items-center justify-between gap-2">
            <p className="">Get started for free</p>
          </div>
        </Button>
      </div>
    </div>
  );
}
