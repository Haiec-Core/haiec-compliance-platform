"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface AuthorProfileImageProps {
    avatarUrl: string;
    name: string;
}

export function AuthorProfileImage({
    avatarUrl,
    name,
}: AuthorProfileImageProps) {
    return (
        <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-full" />
            <Image
                src={avatarUrl}
                alt={name}
                width={32}
                height={32}
                className={cn(
                    "rounded-full object-cover w-full h-full",
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
        </div>
    );
}
