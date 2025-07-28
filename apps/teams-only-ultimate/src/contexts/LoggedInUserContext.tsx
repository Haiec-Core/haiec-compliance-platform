"use client";
import { User } from "@supabase/supabase-js";
import { createContext } from "react";

/**
 * Context type for managing the logged-in user state.
 */
type LoggedInUserContextType = {
  /**
   * The user object representing the currently logged-in user.
   */
  user: User;
};

/**
 * The context for the logged-in user, initialized with a default value.
 * @returns {LoggedInUserContextType} The context value containing the user.
 */
export const LoggedInUserContext = createContext<LoggedInUserContextType>({
  user: null as unknown as User,
});

/**
 * Provider component for the LoggedInUserContext.
 * @param {Object} props - The props for the provider.
 * @param {User} props.user - The user object to provide to the context.
 * @param {React.ReactNode} props.children - The child components to render within the provider.
 * @returns {JSX.Element} The provider component wrapping the children.
 */
export const LoggedInUserProvider = ({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) => {
  return (
    <LoggedInUserContext.Provider value={{ user }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};
