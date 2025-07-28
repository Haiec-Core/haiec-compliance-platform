"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface BlogPostImageProps {
  src: string;
  alt: string;
}

export function BlogPostImage({ src, alt }: BlogPostImageProps) {
  return (
    <>
      <div className="absolute inset-0 bg-gray-100 animate-pulse" />
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "object-cover",
          "duration-700 ease-in-out",
          "data-[loading=true]:scale-110 data-[loading=true]:blur-2xl data-[loading=true]:grayscale",
        )}
        onLoadingComplete={(img) => {
          img.setAttribute("data-loading", "false");
        }}
        onLoad={(event) => {
          const img = event.target as HTMLImageElement;
          img.setAttribute("data-loading", "false");
        }}
        loading="lazy"
        data-loading="true"
      />
    </>
  );
}
