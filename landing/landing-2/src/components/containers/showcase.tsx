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
      className="w-full mx-auto max-w-screen px-6 md:px-0 py-8 bg-gradient-to-b from-transparent to-gray-200/20"
    >
      <CarouselContent>
        {CAROUSAL_IMAGES.map((_, index) => (
          <CarouselItem
            key={_.id}
            className="md:basis-1/2 lg:basis-1/3 rounded-md overflow-hidden"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square md:aspect-video items-center justify-center p-0 rounded overflow-hidden">
                  <Image
                    alt={"Carousal-Image-"}
                    width={600}
                    height={400}
                    src={_.src}
                    className="object-contain md:object-cover m-auto aspect-square md:aspect-video"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-10" />
      <CarouselNext className="absolute right-10" />
    </Carousel>
  );
}
