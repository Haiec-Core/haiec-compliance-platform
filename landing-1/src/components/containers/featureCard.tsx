import { CardContent, Card } from "@/components/ui/card";
import { CheckCircledIcon, CubeIcon } from "@radix-ui/react-icons";
import { Typography } from "../ui/typography";

type FeatureType = {
  title: string;
  subtitle: string;
  desc: string;
  features?: string[];
  navigateTo: string;
  imgSrc: string;
};
export default function FeatureCard({ feature }: { feature: FeatureType }) {
  return (
    <div className=" odd:to-bg-accent group relative row-span-1 mx-auto w-full rounded-md border-2 border-gray-200/50 bg-card shadow-sm">
      <Card className="relative  z-10 w-full border-none bg-transparent shadow-none ">
        <CardContent
          className={"col-span-2 flex flex-col items-start gap-8 lg:flex-row"}
        >
          <div className="order-2 lg:group-odd:order-1 lg:group-even:order-2">
            <div className="md:min-h-[400px] min-h-[260px]">
              <CubeIcon className="text-blue-900 bg-blue-50 h-4 w-4 mb-4" />
              <Typography variant={"h3"} className="">
                {feature.title}
              </Typography>
              <Typography className="text-pretty text-secondary-foreground">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
                impedit qui autem pariatur architecto distinctio voluptates vero
                eligendi nisi expedita quisquam deserunt nemo amet quo corrupti.{" "}
              </Typography>
              <Typography variant={"ul"} className="my-4 list-none">
                {feature.features?.map((feature) => (
                  <li
                    key={feature}
                    className="flex w-full items-center
                   justify-start overflow-hidden text-secondary-foreground"
                  >
                    <CheckCircledIcon className="mr-2 flex h-4 w-4 items-center justify-center capitalize text-blue-900" />

                    <p className="text-ellipsis text-wrap">{feature}</p>
                  </li>
                ))}
              </Typography>
            </div>
          </div>
          <div className="order-0 col-span-1 flex h-full w-full items-center justify-center lg:group-odd:order-2 lg:group-even:order-1">
            <video
              autoPlay
              loop
              muted
              className="aspect-[4/3] min-h-[260px] w-full rounded-lg bg-gray-300 object-cover object-center shadow-lg md:min-h-[400px] md:min-w-[600px] lg:aspect-[600/400]"
              src={feature.imgSrc}
              preload=""
            ></video>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
