
import { SwitcherAndToggle } from "@/components/sidebar-components/switcher-and-toggle";
import { SidebarFooterUserNav } from "@/components/sidebar-footer-user-nav";
import { SidebarPlatformNav } from "@/components/sidebar-platform-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  getCachedSlimWorkspaces,
  getCachedSoloWorkspace,
} from "@/rsc-data/user/workspaces";
import { notFound } from "next/navigation";

export async function UserSidebar() {
  try {
    const [workspace, slimWorkspaces] = await Promise.all([
      getCachedSoloWorkspace(),
      getCachedSlimWorkspaces(),
    ]);
    return (
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <SwitcherAndToggle slimWorkspaces={slimWorkspaces} />
        </SidebarHeader>
        <SidebarContent>
          <SidebarPlatformNav />
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
