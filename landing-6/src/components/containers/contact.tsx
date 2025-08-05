import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Typography } from "../ui/typography";
import Container from "./container";

export default function ContactCard() {
  return (
    <Container classNames="bg-background py-20">
      <div className="col-span-12 relative mx-auto h-fullflex flex-col justify-start items-center overflow-x-hidden w-full overflow-hidden">
        <div className="flex max-w-5xl mx-auto flex-col items-center justify-center px-4 space-y-8  ">
          <div className="flex flex-col justify-center items-start space-y-2 text-inherit">
            <Typography variant={"h2"} className="text-center mx-auto tracking-tighter">
            Grow with Nextbase
            </Typography>
            <Typography variant={"p"} className="text-center mx-auto max-w-3xl">
            Build your next SAAS project with a modern stack of Next.js 14+, Supabase, Stripe and Typescript, and save 4+ months of development time ~ $18000
            </Typography>
          </div>
          <Button className="">
          <div className="flex w-fit items-center justify-between gap-2 text-muted px-4">
            <p className="">Get started for free</p>

          
          </div>
        </Button>
         
        </div>
      </div>
    </Container>
  );
}
