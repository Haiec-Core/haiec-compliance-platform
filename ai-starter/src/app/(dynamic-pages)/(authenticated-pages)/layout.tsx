import { CreateWorkspaceDialogProvider } from "@/contexts/CreateWorkspaceDialogContext";
import { LoggedInUserProvider } from "@/contexts/LoggedInUserContext";
import { serverGetLoggedInUserVerified } from "@/utils/server/serverGetLoggedInUser";
import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import PosthogIdentify from "./PosthogIdentify";

export default async function Layout({ children }: { children: ReactNode }) {
  try {
    const user = await serverGetLoggedInUserVerified();
    return (
      <CreateWorkspaceDialogProvider>
        <LoggedInUserProvider user={user}>
          {children}
          <PosthogIdentify />
        </LoggedInUserProvider>
      </CreateWorkspaceDialogProvider>
    );
  } catch (fetchDataError) {
    console.log("fetchDataError", fetchDataError);
    redirect("/login");
    return null;
  }
}
