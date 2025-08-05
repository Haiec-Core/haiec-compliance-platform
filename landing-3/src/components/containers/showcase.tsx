import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const CAROUSAL_IMAGES = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1705432514/usenextbase/orgs-teams_1_zzemcg.webp",
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1705432528/usenextbase/user-impersonation_h77zul.webp",
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1705432517/usenextbase/stripe-integration_rham5f.webp",
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1705432513/usenextbase/auth_yhrpj6.webp",
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dkqrmlxlg/image/upload/v1705432519/usenextbase/layouts_wmhadw.webp",
  },
];
export function Showcase() {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: "true",
      }}
      className="w-full mx-auto max-w-screen "
    >
      <CarouselContent>
        {CAROUSAL_IMAGES.map((_, index) => (
          <CarouselItem
            key={_.id}
            className="md:basis-1/2 px-8 md:px-0 lg:basis-1/3 rounded-md overflow-hidden"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square md:aspect-video lg:border lg:border-white/5 items-center justify-center p-0 rounded overflow-hidden">
                  <Image
                    alt={"Carousal-Image-"}
                    width={600}
                    height={600}
                    src={_.src}
                    className=" md:object-cover aspect-square md:aspect-video  "
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:block left-10" />
      <CarouselNext className="hidden lg:block right-10" />
    </Carousel>
  );
}
