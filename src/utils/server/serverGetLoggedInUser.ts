"use server";
import { cache } from "react";
import { getSession, getUser } from "./serverSessionUtils";

/**
 * This only checks the cookie for the session.
 * It does not check the database for the user.
 * Server components only need to use this since the middleware already checks the database for the user.
 */
export const serverGetLoggedInUser = cache(async () => {
  const {
    data: { session },
    error: sessionError,
  } = await getSession();

  if (sessionError) {
    throw sessionError;
  }

  if (!session?.user) {
    throw new Error("serverGetLoggedInUser: Not logged in");
  }

  return session.user;
});

/**
 * This checks the cookie for the session and then the database for the user.
 * This is time consuming and should only be used when necessary.
 */
export const serverGetLoggedInUserVerified = cache(async () => {
  const {
    data: { user },
    error: userError,
  } = await getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    throw new Error("serverGetLoggedInUser: Not logged in");
  }

  return user;
});
