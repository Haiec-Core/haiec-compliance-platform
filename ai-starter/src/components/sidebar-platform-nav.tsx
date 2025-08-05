import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FileText, Users } from "lucide-react";
import Link from 'next/link';

const resourceLinks = [
  {
    label: "Documentation",
    href: "https://usenextbase.com/docs/v3",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    label: "Community",
    href: "https://discord.com/invite/RxNDVewS74",
    icon: <Users className="h-5 w-5" />,
  },
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
