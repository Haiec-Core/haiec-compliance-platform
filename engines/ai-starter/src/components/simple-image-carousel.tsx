"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Typography } from "./ui/Typography";

interface ImageObject {
  src: string;
  alt: string;
}

interface SimpleImageCarouselProps {
  images: ImageObject[];
}

export function SimpleImageCarousel({ images }: SimpleImageCarouselProps) {
  return (
    <Carousel
      opts={{
        loop: false,
      }}
      className="w-full mx-auto"
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="px-1 pt-2 pb-4 space-y-1">
              <div className="aspect-video relative overflow-hidden rounded-lg ">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={100}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=="
                />
              </div>
              <Typography.Subtle>{image.alt}</Typography.Subtle>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && (
        <>
          <CarouselNext />
          <CarouselPrevious />
        </>
      )}
    </Carousel>
  );
}
