"use server";
import { getPublicUserAvatarUrl } from "@/utils/helpers";

import { Skeleton } from "@/components/ui/skeleton";
import { anonGetUserProfile } from "@/data/user/elevatedQueries";
import Image from "next/image";
import { Suspense } from "react";

const blurFallback =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAGklEQVR42mNkMGYgCTCOahjVMKphVANtNQAApZ0E4ZNIscsAAAAASUVORK5CYII=";

async function UserAvatarWithFullname({
  userId,
  size,
}: {
  userId: string;
  size: number;
}) {
  const { avatarUrl, fullName } = await anonGetUserProfile(userId);

  const userAvatarUrl = getPublicUserAvatarUrl(avatarUrl);
  const userFullName = fullName ?? `User ${userId}`;
  return (
    <div className="flex items-center gap-2">
      <div>
        {userAvatarUrl ? (
          <Image
            className="rounded-full border shadow-xs"
            placeholder="blur"
            blurDataURL={blurFallback}
            data-testid="anon-user-avatar"
            data-user-id={userId}
            alt={`${userFullName} avatar`}
            src={userAvatarUrl || ""}
            width={size}
            style={{
              width: size,
              height: size,
            }}
            height={size}
          />
        ) : (
          <div
            className={
              "rounded-full select-none relative border bg-inherit shadow-xs text-sm"
            }
            style={{
              width: size,
              height: size,
            }}
          >
            <span className="absolute top-[50%] left-[50%] -translate-x-1/2 capitalize -translate-y-1/2">
              {userFullName}
            </span>
          </div>
        )}
      </div>
      <span>{userFullName}</span>
    </div>
  );
}
function UserAvatarWithFullnameFallback({ size }: { size: number }) {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton style={{ width: size, height: size, borderRadius: "100%" }} />
      <Skeleton style={{ width: 80, height: size - 10 }} />
    </div>
  );
}
export async function SuspendedUserAvatarWithFullname({
  userId,
  size,
}: {
  userId: string;
  size: number;
}) {
  return (
    <Suspense fallback={<UserAvatarWithFullnameFallback size={size} />}>
      <UserAvatarWithFullname userId={userId} size={size} />
    </Suspense>
  );
}
