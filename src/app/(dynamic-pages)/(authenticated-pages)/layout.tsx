import { NotificationsDialog } from "@/components/notifications-dialog";
import { CreateWorkspaceDialogProvider } from "@/contexts/CreateWorkspaceDialogContext";
import { LoggedInUserProvider } from "@/contexts/LoggedInUserContext";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import { serverGetLoggedInUserVerified } from "@/utils/server/serverGetLoggedInUser";
import { User } from "@supabase/supabase-js";
import { unauthorized } from "next/navigation";
import { type ReactNode } from "react";
import PosthogIdentify from "./PosthogIdentify";

export default async function Layout({ children }: { children: ReactNode }) {
  let user: User | null = null;
  try {
    user = await serverGetLoggedInUserVerified();
  } catch (fetchDataError) {
    console.log("fetchDataError", fetchDataError);
    unauthorized();
  }

  if (!user) {
    unauthorized();
  }

  return (
    <CreateWorkspaceDialogProvider>
      <LoggedInUserProvider user={user}>
        <NotificationsProvider>
          {children}
          <NotificationsDialog />
          <PosthogIdentify />
        </NotificationsProvider>
      </LoggedInUserProvider>
    </CreateWorkspaceDialogProvider>
  );
}
