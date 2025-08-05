"use client";
import { getUserAvatarUrlClient } from "@/data/user/client/profile";
import { getPublicUserAvatarUrl } from "@/utils/helpers";
import { useQuery } from "@tanstack/react-query";

import Image from "next/image";

const blurFallback =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAGklEQVR42mNkMGYgCTCOahjVMKphVANtNQAApZ0E4ZNIscsAAAAASUVORK5CYII=";

const fallbackSource = `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp`;

export const UserAvatar = ({
  userId,
  size = 24,
}: {
  userId: string;
  size: number;
}) => {
  const { data: avatarUrl, isLoading } = useQuery({
    queryKey: ["user-avatar-url", userId],
    queryFn: () => getUserAvatarUrlClient(userId),
  });
  let imageSource = fallbackSource;
  if (avatarUrl) {
    imageSource = getPublicUserAvatarUrl(avatarUrl);
  }

  return (
    <Image
      className={`rounded-full`}
      placeholder="blur-sm"
      blurDataURL={blurFallback}
      alt={`${userId} avatar`}
      src={imageSource}
      width={size}
      style={{
        width: size,
        height: size,
      }}
      height={size}
    />
  );
};

export function FallbackImage({ size }: { size: number }) {
  return (
    <Image
      className={`rounded-full`}
      placeholder="blur-sm"
      blurDataURL={blurFallback}
      alt={`Fallback`}
      src={blurFallback}
      width={size}
      style={{
        width: size,
        height: size,
      }}
      height={size}
    />
  );
}
