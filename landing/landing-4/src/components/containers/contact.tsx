import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Typography } from "../ui/typography";
import Container from "./container";

export default function ContactCard() {
  return (
    <Container classNames="bg-secondary py-20">
      <div className="col-span-12 relative mx-auto h-fullflex flex-col justify-start items-center overflow-x-hidden w-full overflow-hidden">
        <div className="flex max-w-5xl mx-auto flex-col items-center justify-center px-4 space-y-8  ">
          <div className="flex flex-col justify-center items-start space-y-2">
            <Typography variant={"h2"} className="text-center mx-auto">
              Build your next SAAS project with a modern stack and save 4+
              months of development time ~ $18000
            </Typography>
            <Typography variant={"p"} className="text-center mx-auto max-w-3xl">
              Build your next SAAS project with a modern stack and save 4+
              months of development time ~ $18000
            </Typography>
          </div>
          <Button>
            <div className="flex w-full items-center justify-center gap-2">
              <p className="">Get started for free</p>

              <ArrowRightIcon className="h-4 w-4" />
            </div>
          </Button>
        </div>
      </div>
    </Container>
  );
}
