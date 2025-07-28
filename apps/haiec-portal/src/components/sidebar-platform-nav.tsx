import { Link } from "@/components/intl-link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FileText, GitBranch, Map, Users } from "lucide-react";

const resourceLinks = [
  {
    label: "Documentation",
    href: "/docs",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    label: "Community",
    href: "/feedback",
    icon: <Users className="h-5 w-5" />,
  },
  {
    label: "Changelog",
    href: "/changelog",
    icon: <GitBranch className="h-5 w-5" />,
  },
  { label: "Roadmap", href: "/roadmap", icon: <Map className="h-5 w-5" /> },
];

export function SidebarPlatformNav() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Resources</SidebarGroupLabel>
      <SidebarMenu>
        {resourceLinks.map((link) => (
          <SidebarMenuItem key={link.href}>
            <SidebarMenuButton asChild>
              <Link href={link.href} target="_blank">
                {link.icon}
                {link.label}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
