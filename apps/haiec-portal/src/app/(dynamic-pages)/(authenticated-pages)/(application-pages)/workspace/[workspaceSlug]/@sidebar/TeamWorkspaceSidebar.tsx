// OrganizationSidebar.tsx (Server Component)

import { SidebarAdminPanelNav } from "@/components/sidebar-admin-panel-nav";
import { SwitcherAndToggle } from "@/components/sidebar-components/switcher-and-toggle";
import { SidebarFooterUserNav } from "@/components/sidebar-footer-user-nav";
import { SidebarPlatformNav } from "@/components/sidebar-platform-nav";
import { SidebarTipsNav } from "@/components/sidebar-tips-nav";
import { SidebarWorkspaceNav } from "@/components/sidebar-workspace-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  getCachedSlimWorkspaces,
  getCachedWorkspaceBySlug,
} from "@/rsc-data/user/workspaces";
import { workspaceSlugParamSchema } from "@/utils/zod-schemas/params";
import { notFound } from "next/navigation";

export async function TeamWorkspaceSidebar({
  params,
}: {
  params: Promise<unknown>;
}) {
  try {
    const { workspaceSlug } = workspaceSlugParamSchema.parse(await params);
    const [workspace, slimWorkspaces] = await Promise.all([
      getCachedWorkspaceBySlug(workspaceSlug),
      getCachedSlimWorkspaces(),
    ]);
    return (
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <SwitcherAndToggle
            workspaceId={workspace.id}
            slimWorkspaces={slimWorkspaces}
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarWorkspaceNav workspace={workspace} />
          <SidebarAdminPanelNav />
          <SidebarPlatformNav />
          <SidebarTipsNav workspace={workspace} />
        </SidebarContent>
        <SidebarFooter>
          <SidebarFooterUserNav />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  } catch (e) {
    console.error("Error in TeamWorkspaceSidebar", e);
    return notFound();
  }
}
