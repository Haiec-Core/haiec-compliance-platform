"use server";

import { getUserProfile } from "@/data/user/user";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import { cache } from "react";

export const getCachedUserProfile = cache(async () => {
  const user = await serverGetLoggedInUser();
  return await getUserProfile(user.id);
});
