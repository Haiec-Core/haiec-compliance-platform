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
import { getSlimProjectBySlug } from "@/data/user/projects";
import { getWorkspaceById } from "@/data/user/workspaces";
import { getCachedProjectBySlug } from "@/rsc-data/user/projects";
import { getCachedSlimWorkspaces } from "@/rsc-data/user/workspaces";
import { projectSlugParamSchema } from "@/utils/zod-schemas/params";
import { notFound } from "next/navigation";
import { ProjectSidebarGroup } from "./ProjectSidebarGroup";

export async function ProjectSidebar(props: { params: Promise<unknown> }) {
  try {
    const params = await props.params;
    const { projectSlug } = projectSlugParamSchema.parse(params);
    const project = await getSlimProjectBySlug(projectSlug);
    const [slimWorkspaces, fullProject] = await Promise.all([
      getCachedSlimWorkspaces(),
      getCachedProjectBySlug(project.slug),
    ]);
    const workspaceId = fullProject.workspace_id;
    const workspace = await getWorkspaceById(workspaceId);

    return (
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader>
          <SwitcherAndToggle
            workspaceId={workspace.id}
            slimWorkspaces={slimWorkspaces}
          />
        </SidebarHeader>
        <SidebarContent>
          <ProjectSidebarGroup project={fullProject} workspace={workspace} />
          <SidebarWorkspaceNav workspace={workspace} withLinkLabelPrefix />
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
    console.log("error in ProjectSidebar", e);
    return notFound();
  }
}
