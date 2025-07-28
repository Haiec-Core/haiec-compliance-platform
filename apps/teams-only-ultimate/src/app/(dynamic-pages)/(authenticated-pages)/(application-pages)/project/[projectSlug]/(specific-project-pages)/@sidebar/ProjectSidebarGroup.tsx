"use client";

import { Link } from "@/components/intl-link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DBTable, WorkspaceWithMembershipType } from "@/types";
import { getWorkspaceSubPath } from "@/utils/workspaces";
import {
  ArrowLeft,
  Layers,
  Settings
} from "lucide-react";

interface ProjectSidebarGroupProps {
  project: DBTable<"projects">;
  workspace: WorkspaceWithMembershipType;
}

export function ProjectSidebarGroup({
  project,
  workspace,
}: ProjectSidebarGroupProps) {
  const projectLinks = [
    {
      label: "Back to workspace",
      href: getWorkspaceSubPath(workspace, `/home`),
      icon: <ArrowLeft className="h-5 w-5" />,
    },
    {
      label: "Project Home",
      href: `/project/${project.slug}`,
      icon: <Layers className="h-5 w-5" />,
    },

    {
      label: "Project Settings",
      href: `/project/${project.slug}/settings`,
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Project</SidebarGroupLabel>
      <SidebarMenu>
        {projectLinks.map((link) => (
          <SidebarMenuItem key={link.label}>
            <SidebarMenuButton asChild>
              <Link href={link.href}>
                {link.icon}
                <span>{link.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
