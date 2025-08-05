import { CheckCircledIcon } from "@radix-ui/react-icons";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
type FeatureType = {
  title: string;
  subtitle: string;
  desc: string;
  features?: string[];
  navigateTo: string;
  imgSrc: string;
};
export default function FeatureCard({
  feature,
  id,
}: {
  feature: FeatureType;
  id: number;
}) {
  return (
    <div className=" group relative  md:h-[85vh] lg:h-[100vh] row-span-1 pb-8 md:pb-0 mx-auto w-full rounded-md bg-inherit flex justify-center items-center">
      <div className="relative lg:h-3/4 h-full max-h-none  z-10 w-full border-none bg-transparent  ">
        <div
          className={"col-span-1 flex flex-col mx-auto items-center gap-8 lg:flex-row"}
        >
          <div className="order-2 md:order-0 w-full md:w-2/4 col-span-2 flex h-full items-center justify-center">
            <video
              autoPlay
              loop
              muted
              className="aspect-[4/3] min-h-[260px] w-full rounded-lg bg-gray-300 object-cover object-center shadow-lg md:min-h-[400px] md:min-w-[600px] lg:aspect-[900/700]"
              src={feature.imgSrc}
              preload=""
            ></video>
          </div>
          <div className="order-0 md:order-2 md:w-2/4 w-full flex flex-col justify-center items-start space-y-4">
            <div className="text-sm flex  ">
              <Typography variant={"p"} className="text-sm  font-semibold">
              {feature.title} {id}
            </Typography>
            </div>
            <Typography variant="h1" className="font-bold text-primary md:text-[40px] md:leading-[48px] ">
            A fancy looking hero text to catch your attention{" "}
            </Typography>
            <Typography className=" text-lg font-normal text-pretty text-secondary-foreground">
            Great, now that we have your attention, we will actually talk about how we help you
            </Typography>
            <Typography variant={"ul"} className="my-4 list-none">
              {feature.features?.map((feature) => (
                <li
                  key={feature}
                  className="flex w-full items-center
                   justify-start overflow-hidden text-secondary-foreground  py-2"
                >
                  <CheckCircledIcon className="mr-2 flex h-6 w-6 items-center text-primary justify-center capitalize text-green-500" />

                  <p className="text-ellipsis text-wrap text-base ">{feature}</p>
                </li>
              ))}
            </Typography>
            <div className="relative group">
            <Button className="mt-0 scroll-m-0 relative bg-primary">
            Get started for free
            </Button>
           
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
