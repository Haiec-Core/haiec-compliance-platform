"use server";

import { getUserProfile } from "@/data/user/user";
import {
  serverGetLoggedInUserVerified
} from "@/utils/server/serverGetLoggedInUser";
import { cache } from "react";

export const getCachedUserProfile = cache(async () => {
  const user = await serverGetLoggedInUserVerified();
  return await getUserProfile(user.id);
});
