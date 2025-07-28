import { SlimWorkspaces } from "@/types";
import { Home } from "lucide-react";
import { Fragment } from "react";
import { Link } from "../intl-link";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { WorkspaceSwitcher } from "./workspace-switcher";
type Props = {
  workspaceId?: string;
  slimWorkspaces?: SlimWorkspaces;
};

export function SwitcherAndToggle({ workspaceId, slimWorkspaces }: Props) {
  return (
    <Fragment>
      {workspaceId && slimWorkspaces ? (
        <WorkspaceSwitcher
          currentWorkspaceId={workspaceId}
          slimWorkspaces={slimWorkspaces}
        />
      ) : (
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Home className="size-4" />
                </div>
                <span>Nextbase</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      )}
    </Fragment>
  );
}
