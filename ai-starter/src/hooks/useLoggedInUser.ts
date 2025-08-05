import { LoggedInUserContext } from "@/contexts/LoggedInUserContext";
import { User } from "@supabase/supabase-js";
import { useContext } from "react";

/**
 * This is useful for pages that require the user to be logged in.
 * @returns The logged in user or throws an error if the user is not logged in
 */
export const useLoggedInUser = (): User => {
  const { user } = useContext(LoggedInUserContext);
  if (!user) throw new Error("User is not logged in");
  return user;
};
