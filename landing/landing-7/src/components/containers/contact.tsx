import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Typography } from "../ui/typography";


export default function ContactCard() {
  return (
    <div className="flex bg-primary py-3 mx-auto dark:bg-card dark:text-white flex justify-between items-center overflow-hidden">
    <div className="w-4/5 md:w-2/3 mx-auto item-start">
      <div className="my-10">
        <Typography
          variant={"h2"}
          className="text-start tracking-tighter text-primary-foreground dark:text-white"
        >
          Grow with Nextbase
        </Typography>
        <Typography
          variant={"p"}
          className="text-start font-light text-lg text-primary-foreground md:w-2/4 dark:text-white my-4"
        >
         Great, now that we have your attention, we will actually talk about how we help you
        </Typography>
        <Button  className="bg-primary-foreground text-[#020817] text-base py-2 px-4 my-4 hover:bg-[#000] hover:text-primary-foreground">Get started for free</Button>
      </div>
     
    </div>
  </div>
  );
}
