// OrganizationSidebar.tsx (Server Component)

import { SidebarAdminPanelNav } from "@/components/sidebar-admin-panel-nav";
import { SwitcherAndToggle } from "@/components/sidebar-components/switcher-and-toggle";
import { SidebarFooterUserNav } from "@/components/sidebar-footer-user-nav";
import { SidebarPlatformNav } from "@/components/sidebar-platform-nav";
import { SidebarTipsNav } from "@/components/sidebar-tips-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  getCachedDefaultWorkspace,
  getCachedSlimWorkspaces,
} from "@/rsc-data/user/workspaces";
import { notFound } from "next/navigation";

export async function ApplicationAdminSidebar() {
  try {
    const [workspace, slimWorkspaces] = await Promise.all([
      getCachedDefaultWorkspace(),
      getCachedSlimWorkspaces(),
    ]);
    return (
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <SwitcherAndToggle slimWorkspaces={slimWorkspaces} />
        </SidebarHeader>
        <SidebarContent>
          <SidebarAdminPanelNav />
          <SidebarPlatformNav />
          {workspace ? <SidebarTipsNav workspace={workspace} /> : null}
        </SidebarContent>
        <SidebarFooter>
          <SidebarFooterUserNav />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  } catch (e) {
    return notFound();
  }
}
